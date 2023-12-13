import { Bundle, ZObject } from 'zapier-platform-core'

export const POSTHOG_CLOUD_HOST: string = 'app.posthog.com' // DO NOT CHANGE

export const DEFAULT_API_HOST: string = POSTHOG_CLOUD_HOST // You can change to something like: posthog.hogflix.com
export const DEFAULT_LABEL: string = 'PostHog Cloud' // You can change to something like: Hogflix

const ORGANIZATION_FIELD = {
    key: 'organization_id',
    label: 'Organization',
    required: true,
    dynamic: 'organization_created.id.name',
    altersDynamicFields: true,
}

const PROJECT_FIELD = {
    key: 'project_id',
    label: 'Project',
    required: true,
    dynamic: 'project_created.id.name',
    altersDynamicFields: true,
}

export const ORGANIZATION_AND_PROJECTS_FIELDS = [ORGANIZATION_FIELD, PROJECT_FIELD] as const

export function composeUrl(path: (string | number)[], hostOrBundle: string | Bundle = DEFAULT_API_HOST): string {
    let host: string | undefined =
        typeof hostOrBundle === 'string' ? hostOrBundle : (hostOrBundle as Partial<Bundle>).authData?.apiHost
    if (!host) host = DEFAULT_API_HOST
    if (!host.includes('://')) host = `https://${host}`
    let composedUrl: string = `${host.replace(/[/]+$/, '')}/${path
        .map((component) => encodeURI(component.toString()))
        .join('/')}`
    if (composedUrl[composedUrl.length - 1] !== '/' && !composedUrl.includes('?')) composedUrl += '/'
    return composedUrl
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
            url: composeUrl(['api', 'projects', bundle.inputData.project_id, 'hooks'], bundle),
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
