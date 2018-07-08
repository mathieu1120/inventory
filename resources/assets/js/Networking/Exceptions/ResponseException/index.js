/**
 * @class ResponseException
 * @description This error represents an error thrown during a request
 */
class ResponseException extends Error {

    /**
     * Construct exception
     * @param rawResponse
     * @param responseBody
     */
    constructor(rawResponse, responseBody) {
        const message = (responseBody.error && responseBody.error.message)
            ? responseBody.error.message
            : 'Error occurred while making a request.'
        super(message)
        this.response    = responseBody
        this.rawResponse = rawResponse
    }
}

export default ResponseException
