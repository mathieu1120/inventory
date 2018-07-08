import 'whatwg-fetch'
import SDK from './SDK'
import resources from './Resources'

const sdk = new SDK(fetch)
sdk.registerResources({
    ...resources
})

export {
    sdk
}
