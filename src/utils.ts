import { API_HOST } from './settings'

export function composeAPIURL(apiPath: string): string {
    return `${API_HOST.replace(/[/]+$/, '')}/${apiPath.replace(/^[/]+/, '')}`
}
