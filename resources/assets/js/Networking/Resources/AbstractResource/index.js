/**
 * @class AbstractResource
 */
export default class AbstractResource {
    constructor(sdk) {
        this.sdk = sdk

        this.host     = window.location.hostname || 'inventory.shoprachaels.com';
        this.protocol = window.location.protocol || 'https:';

        this.getResourceDomain   = this.getResourceDomain.bind(this)
        this.getResourcePath     = this.getResourcePath.bind(this)
        this.getResourceProtocol = this.getResourceProtocol.bind(this)
        this.getFullPath         = this.getFullPath.bind(this)
        this.get                 = this.get.bind(this)
        this.post                = this.post.bind(this)
        this.request             = this.get.bind(this)
    }

    /**
     * Default behaviour for getting resource domain
     * @returns {string}
     */
    getResourceDomain() {
        return this.host;
    }

    /**
     * Abstract method that resources must define
     */
    getResourcePath() {
        throw Error("getResourcePath must be implemented")
    }

    /**
     * Default behaviour for getting resource protocol
     * @returns {string}
     */
    getResourceProtocol() {
        return this.protocol;
    }

    /**
     * Get full path from resource
     * @param path
     * @returns {string} full path
     */
    getFullPath(path) {
        const protocol = this.getResourceProtocol();
        const domain   = this.getResourceDomain();
        const basePath = this.getResourcePath();
        return `${protocol}//${domain}/${basePath}${path ? '/'+path : ''}`
    }

    get(path, queryParams = {}) {
        const fullPath = this.getFullPath(path)

        return this.sdk.get(fullPath, queryParams)
    }

    post(path, params = {}) {
        const fullPath = this.getFullPath(path)

        return this.sdk.post(fullPath, params)
    }

    delete(path, params = {}) {
        const fullPath = this.getFullPath(path)

        return this.sdk.delete(fullPath, params)
    }

    request(method, path, params = {}) {
        const fullPath = this.getFullPath(path)

        return this.sdk.request(method, fullPath, params)
    }
}
