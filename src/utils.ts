import { API_HOST } from './settings'

export function composeURL(path: string, host: string = API_HOST): string {
    return `${host.replace(/[/]+$/, '')}/${path.replace(/(^[/]+)|([/]+$)/, '')}/`
}

export function composeAPIURL(path: string, host: string = API_HOST): string {
    return composeURL(`api/${path.replace(/(^[/]+)|([/]+$)/, '')}/`, host)
}
