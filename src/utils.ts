import { Bundle, ZObject } from 'zapier-platform-core'
import { API_HOST } from './settings'

export function composeURL(path: string, host: string = API_HOST): string {
    return `${host.replace(/[/]+$/, '')}/${path.replace(/(^[/]+)|([/]+$)/, '')}/`
}

export function composeAPIURL(path: string, host: string = API_HOST): string {
    return composeURL(`api/${path.replace(/(^[/]+)|([/]+$)/, '')}/`, host)
}

export function subscribeHookCreator(
    event: string,
    reqBodyToInputDataMapping?: { [reqBodyKey: string]: any }
): (z: ZObject, bundle: Bundle) => Promise<object | undefined> {
    return async function (z: ZObject, bundle: Bundle) {
        const body: { [reqBodyKey: string]: any } = {
            target: bundle.targetUrl,
            event,
        }
        if (reqBodyToInputDataMapping)
            for (const reqBodyKey in reqBodyToInputDataMapping) {
                body[reqBodyKey] = bundle.inputData[reqBodyToInputDataMapping[reqBodyKey]]
            }
        const response = await z.request({
            url: composeAPIURL('hook'),
            method: 'POST',
            body,
        })
        return response.data
    }
}

export async function unsubscribeHook(z: ZObject, bundle: Bundle): Promise<object | undefined> {
    // bundle.subscribeData contains the parsed response JSON from the subscribe request made initially
    const hookId = bundle.subscribeData!.id
    const response = await z.request({
        url: composeAPIURL(`hook/${hookId}`),
        method: 'DELETE',
    })
    return response.data
}
