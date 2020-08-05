import { Bundle, ZObject } from 'zapier-platform-core'
import { API_HOST } from './settings'

export function composeURL(path: string[], host: string = API_HOST): string {
    return `${host.replace(/[/]+$/, '')}/${path.map(encodeURI).join('/')}${
        path[path.length - 1].includes('?') ? '' : '/'
    }`
}

export function subscribeHookCreator(
    event: string,
    reqBodyToInputDataMapping?: { [reqBodyKey: string]: string }
): (z: ZObject, bundle: Bundle) => Promise<object | undefined> {
    return async function (z: ZObject, bundle: Bundle) {
        const body: { [key: string]: any } = {
            target: bundle.targetUrl,
            event,
        }
        if (reqBodyToInputDataMapping)
            for (const reqBodyKey in reqBodyToInputDataMapping) {
                body[reqBodyKey] = bundle.inputData[reqBodyToInputDataMapping[reqBodyKey]]
            }
        const response = await z.request({
            url: composeURL(['api', 'hooks']),
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
        url: composeURL(['api', 'hooks', hookId]),
        method: 'DELETE',
    })
    return response.data
}
