import 'whatwg-fetch';
import ResponseException from '../Exceptions/ResponseException';

class SDK {

    /**
     * Instantiate SDK object
     *
     * @param {object} fetchClient - window.fetch or polyfill
     */
    constructor(fetchClient) {
        const _client = fetchClient

        this.getClient = () => _client

        this.middlewares = [];
        this.resources = {};
        this.defaultOptions = {
            credentials: 'include',
            multipart: false,
        };

        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.request = this.request.bind(this)
        this.registerResource = this.registerResource.bind(this)
        this.registerResources = this.registerResources.bind(this)
        this.getRequestOptions = this.getRequestOptions.bind(this)
        this.composeMiddlewareStack = this.composeMiddlewareStack.bind(this)
    }

    /**
     * Adds a resource to resources object
     *
     * @param {string} name - name of resource
     * @param {object} resource - constructor to instantiate for resource
     */
    registerResource(name, resource) {
        this.resources[name] = new resource(this)
    }

    /**
     * Sets all resources
     *
     * @param {object} resources - key-value pair of all resources to register
     */
    registerResources(resources) {
        const register = this.registerResource
        Object.keys(resources)
            .forEach(key => register(key, resources[key]))
    }

    /**
     * Add middleware. Method signature must have request and next. The most basic
     * middleware will look like:
     *    (request, next) => next(request)
     *
     * @param {Function} middleware - middleware to add.
     */
    registerMiddleware(middleware) {
        this.middlewares.push(middleware)
    }

    /**
     * Sets all middleware
     *
     * @param {Array} middlewares - list of middleware to add
     */
    registerMiddlewares(middlewares) {
        middlewares.forEach(middleware => {
            this.registerMiddleware(middleware)
        })
    }

    /**
     * Combines default options and options for requests
     *
     * @param {object} options - options to pass to fetch request
     */
    getRequestOptions(options) {
        let requestOptions = Object.assign({}, this.defaultOptions, options)
        if (!requestOptions.multipart) {
            requestOptions = SDK.addJsonContentType(requestOptions)
        }
        return requestOptions
    }

    /**
     * Checks response for non-ok http statuses to throw an error
     *
     * @param {Response} response - from fetch client
     * @return {Response|Promise} - response if ok status, rejected promise if not
     */
    checkResponse(response) {
        if (response.ok || response.status === 302) {
            return response
        }
        return response.json().then(body => {
            return Promise.reject(new ResponseException(response, body))
        })
    }

    /**
     * Make a GET request
     *
     * @param {string} url - url to make request to
     * @param {object} queryParams - object containing key-value pair of query params
     * @param {object} options - object additional values to pass through to fetch
     * @return {Promise} - fetch's Promise
     */
    get(url, queryParams = {}, options = {}) {
        let fullUrl = url
        const queryString = SDK.buildQueryString(queryParams)
        if (queryString.length) {
            if (fullUrl.indexOf('?') !== -1) {
                fullUrl += '&'
            } else {
                fullUrl += '?'
            }

            fullUrl += queryString
        }
        if (fullUrl.indexOf('//') === 0) {
            fullUrl = window.location.protocol + fullUrl
        }
        return this.request('GET', fullUrl, options)
    }

    /**
     * Make a POST request. Note: expects body and content-type headers to be already
     * set by caller
     *
     * @param {string} url - url to make request to
     * @param {object} options - options to pass through to fetch
     * @return {Promise} - fetch's Promise
     */
    post(url, options = {}) {
        return this.request('POST', url, options)
    }

    /**
     * Make a POST request. Note: expects body and content-type headers to be already
     * set by caller
     *
     * @param {string} url - url to make request to
     * @param {object} options - options to pass through to fetch
     * @return {Promise} - fetch's Promise
     */
    delete(url, options = {}) {
        return this.request('DELETE', url, options)
    }

    /**
     * Make a request
     *
     * @param {string} method - HTTP request method to use
     * @param {string} url - url to make request to
     * @param {object} options - options to pass through to fetch
     */
    request(method, url, options = {}) {
        const client = this.getClient()
        const requestOptions = this.getRequestOptions({
            method: method,
            ...options
        })

        const request = {
            url,
            options: requestOptions,
        }

        const r = new Request(request.url, request.options);

        r.headers.append('X-CSRF-TOKEN', document.head.querySelector('meta[name="csrf-token"]').content);
        r.headers.append('X-Requested-With', 'XMLHttpRequest');

        return this.composeMiddlewareStack(
            this.middlewares,
            request => client(r).then(this.checkResponse)
        )(request)
    }

    /**
     * Composes all middleware methods so that they can get executed
     *
     * @param {Array}     middlewares - array of middleware set by registerMiddleware
     * @param {Function}  end - method to execute at the end of the middleware chain
     * @return {Function} method that executes middleware stack
     */
    composeMiddlewareStack(middlewares, end) {
        if (middlewares.length === 0) {
            return request => {
                return end(request);
            }
        }
        const current = middlewares[0];
        const next = this.composeMiddlewareStack(middlewares.slice(1), end);
        return request => current(request, next)
    }

    /**
     * Adds an application/json Content-Type header if one doesn't already exist
     * @param {object} options - options passed in to fetch
     */
    static addJsonContentType(options) {
        const requestOptions = options
        requestOptions.headers = requestOptions.headers || {}
        if (!requestOptions.headers['Content-Type']) {
            requestOptions.headers['Content-Type'] = 'application/json'
        }
        return requestOptions
    }

    /**
     * Builds query string from object
     * @param queryParams
     * @returns {string}
     */
    static buildQueryString(queryParams) {
        let queryParts = []

        Object.keys(queryParams)
            .forEach(key => queryParts.push(key + '=' + encodeURIComponent(queryParams[key])))

        return queryParts.join('&')
    }
}

export default SDK
