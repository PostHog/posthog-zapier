import { Bundle, ZObject } from 'zapier-platform-core'

export const DEFAULT_API_HOST: string = 'app.posthog.com'

export const TRIGGER_PREMIUM_NOTICE = {
    key: 'premium_notice',
    helpText: '**Important:** Triggers are a premium PostHog feature. Make sure that you are on a paid plan.',
    type: 'copy',
}

export function composeUrl(path: string[], hostOrBundle?: string | Bundle): string {
    let host: string =
        (hostOrBundle as Partial<Bundle>).authData?.apiHost ?? (hostOrBundle as string) ?? DEFAULT_API_HOST
    if (!host.includes('://')) host = `https://${host}`
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
            for (const [reqBodyKey, inputDataKey] of Object.entries(reqBodyToInputDataMapping)) {
                body[reqBodyKey] = bundle.inputData[inputDataKey]
            }
        const response = await z.request({
            url: composeUrl(['api', 'hooks'], bundle),
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
        url: composeUrl(['api', 'hooks', hookId], bundle),
        method: 'DELETE',
    })
    return response.data
}
