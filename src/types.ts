// Main repo frontend/src/lib/constants.ts

export enum PluginsAccessLevel {
    None = 0,
    Config = 3,
    Install = 6,
    Root = 9,
}

export enum OrganizationMembershipLevel {
    Member = 1,
    Admin = 8,
    Owner = 15,
}

// Main repo frontend/src/types.ts

export type Optional<T, K extends string | number | symbol> = Omit<T, K> & { [K in keyof T]?: T[K] }

export enum AvailableFeature {
    ZAPIER = 'zapier',
    ORGANIZATIONS_PROJECTS = 'organizations_projects',
    PER_PROJECT_ACCESS = 'per_project_access',
    GOOGLE_LOGIN = 'google_login',
    SAML = 'saml',
    DASHBOARD_COLLABORATION = 'dashboard_collaboration',
    INGESTION_TAXONOMY = 'ingestion_taxonomy',
}

export interface ColumnConfig {
    active: string[] | 'DEFAULT'
}

export interface UserType {
    uuid: string
    date_joined: string
    first_name: string
    email: string
    email_opt_in: boolean
    events_column_config: ColumnConfig
    anonymize_data: boolean
    distinct_id: string
    toolbar_mode: 'disabled' | 'toolbar'
    has_password: boolean
    is_staff: boolean
    is_impersonated: boolean
    organization: OrganizationType | null
    team: TeamBasicType | null
    organizations: OrganizationBasicType[]
    realm: 'cloud' | 'hosted' | 'hosted-clickhouse'
    posthog_version?: string
}

/* Type for User objects in nested serializers (e.g. created_by) */
export interface UserBasicType {
    id: number
    uuid: string
    distinct_id: string
    first_name: string
    email: string
}

export interface PluginAccess {
    view: boolean
    install: boolean
    configure: boolean
}

export interface PersonalAPIKeyType {
    id: string
    label: string
    value?: string
    created_at: string
    last_used_at: string
    team_id: number
    user_id: string
}

export interface OrganizationBasicType {
    id: string
    name: string
}

export interface OrganizationType extends OrganizationBasicType {
    created_at: string
    updated_at: string
    personalization: PersonalizationData
    setup: SetupState
    setup_section_2_completed: boolean
    per_project_access: boolean
    plugins_access_level: PluginsAccessLevel
    teams: TeamBasicType[] | null
    available_features: AvailableFeature[]
    domain_whitelist: string[]
    is_member_join_email_enabled: boolean
    membership_level: OrganizationMembershipLevel | null
    only_allowed_team_ids: TeamType['id'][] | null
}

export interface TeamBasicType {
    id: number
    uuid: string
    organization: string // Organization ID
    api_token: string
    name: string
    completed_snippet_onboarding: boolean
    ingested_event: boolean
    is_demo: boolean
    timezone: string
}

export interface TeamType extends TeamBasicType {
    anonymize_ips: boolean
    app_urls: string[]
    slack_incoming_webhook: string
    session_recording_opt_in: boolean
    session_recording_retention_period_days: number | null
    test_account_filters: AnyPropertyFilter[]
    data_attributes: string[]
}

export interface ActionType {
    count?: number
    created_at: string
    deleted?: boolean
    id: number
    is_calculating?: boolean
    last_calculated_at?: string
    name: string
    post_to_slack?: boolean
    steps?: ActionStepType[]
    created_by: UserBasicType | null
}

/** Sync with plugin-server/src/types.ts */
export enum ActionStepUrlMatching {
    Contains = 'contains',
    Regex = 'regex',
    Exact = 'exact',
}

export interface ActionStepType {
    event?: string
    href?: string
    id?: number
    name?: string
    properties?: []
    selector?: string
    tag_name?: string
    text?: string
    url?: string
    url_matching?: ActionStepUrlMatching
    isNew?: string
}

export interface ElementType {
    attr_class?: string[]
    attr_id?: string
    attributes: Record<string, string>
    href: string
    nth_child: number
    nth_of_type: number
    order: number
    tag_name: string
    text?: string
}

export type ToolbarUserIntent = 'add-action' | 'edit-action'

export type EditorProps = {
    apiURL?: string
    jsURL?: string
    temporaryToken?: string
    actionId?: number
    userIntent?: ToolbarUserIntent
    instrument?: boolean
    distinctId?: string
    userEmail?: boolean
    dataAttributes?: string[]
}

export type PropertyFilterValue = string | number | (string | number)[] | null

export interface PropertyFilter {
    key: string
    operator: PropertyOperator | null
    type: string
    value: PropertyFilterValue
}

export type EmptyPropertyFilter = Partial<PropertyFilter>

export type AnyPropertyFilter = PropertyFilter | EmptyPropertyFilter

/** Sync with plugin-server/src/types.ts */
export enum PropertyOperator {
    Exact = 'exact',
    IsNot = 'is_not',
    IContains = 'icontains',
    NotIContains = 'not_icontains',
    Regex = 'regex',
    NotRegex = 'not_regex',
    GreaterThan = 'gt',
    LessThan = 'lt',
    IsSet = 'is_set',
    IsNotSet = 'is_not_set',
}

export enum SavedInsightsTabs {
    All = 'all',
    Yours = 'yours',
    Favorites = 'favorites',
}

export interface BillingType {
    should_setup_billing: boolean
    is_billing_active: boolean
    plan: PlanInterface | null
    billing_period_ends: string
    event_allocation: number | null
    current_usage: number | null
    subscription_url: string
    current_bill_amount: number | null
    should_display_current_bill: boolean
}

export interface PlanInterface {
    key: string
    name: string
    custom_setup_billing_message: string
    image_url: string
    self_serve: boolean
    is_metered_billing: boolean
    event_allowance: number
    price_string: string
}

export interface DashboardItemType {
    id: number
    name: string
    short_id: string
    description?: string
    filters: Record<string, any>
    filters_hash: string
    order: number
    deleted: boolean
    saved: boolean
    created_at: string
    layouts: Record<string, any>
    color: string | null
    last_refresh: string
    refreshing: boolean
    created_by: UserBasicType | null
    is_sample: boolean
    dashboard: number
    dive_dashboard?: number
    result: any | null
    updated_at: string
    tags: string[]
}

export interface DashboardType {
    id: number
    name: string
    description: string
    pinned: boolean
    items: DashboardItemType[]
    created_at: string
    created_by: UserBasicType | null
    is_shared: boolean
    share_token: string
    deleted: boolean
    filters: Record<string, any>
    creation_mode: 'default' | 'template' | 'duplicate'
    tags: string[]
}

export type DashboardLayoutSize = 'lg' | 'sm' | 'xs' | 'xxs'

export interface OrganizationInviteType {
    id: string
    target_email: string
    first_name: string
    is_expired: boolean
    emailing_attempt_made: boolean
    created_by: UserBasicType | null
    created_at: string
    updated_at: string
}

export interface PluginConfigType {
    id?: number
    plugin: number
    team_id: number
    enabled: boolean
    order: number
    config: Record<string, any>
    error?: PluginErrorType
}

export interface PluginErrorType {
    message: string
    time: string
    stack?: string
    name?: string
    event?: Record<string, any>
}

export enum PluginLogEntryType {
    Debug = 'DEBUG',
    Log = 'LOG',
    Info = 'INFO',
    Warn = 'WARN',
    Error = 'ERROR',
}

export interface PluginLogEntry {
    id: string
    team_id: number
    plugin_id: number
    plugin_config_id: number
    timestamp: string
    type: PluginLogEntryType
    is_system: boolean
    message: string
    instance_id: string
}

export enum AnnotationScope {
    DashboardItem = 'dashboard_item',
    Project = 'project',
    Organization = 'organization',
}

export interface AnnotationType {
    id: string
    scope: AnnotationScope
    content: string
    date_marker: string
    created_by?: UserBasicType | 'local' | null
    created_at: string
    updated_at: string
    dashboard_item?: number
    deleted?: boolean
    creation_type?: string
}

export enum ChartDisplayType {
    ActionsLineGraphLinear = 'ActionsLineGraph',
    ActionsLineGraphCumulative = 'ActionsLineGraphCumulative',
    ActionsTable = 'ActionsTable',
    ActionsPieChart = 'ActionsPie',
    ActionsBarChart = 'ActionsBar',
    ActionsBarChartValue = 'ActionsBarValue',
    PathsViz = 'PathsViz',
    FunnelViz = 'FunnelViz',
}

export type BreakdownType = 'cohort' | 'person' | 'event'
export type IntervalType = 'minute' | 'hour' | 'day' | 'week' | 'month'

// NB! Keep InsightType and ViewType in sync!
export type InsightType = 'TRENDS' | 'SESSIONS' | 'FUNNELS' | 'RETENTION' | 'PATHS' | 'LIFECYCLE' | 'STICKINESS'

export enum ViewType {
    TRENDS = 'TRENDS',
    STICKINESS = 'STICKINESS',
    LIFECYCLE = 'LIFECYCLE',
    SESSIONS = 'SESSIONS',
    FUNNELS = 'FUNNELS',
    RETENTION = 'RETENTION',
    PATHS = 'PATHS',
    // Views that are not insights:
    HISTORY = 'HISTORY',
}

export enum PathType {
    PageView = '$pageview',
    AutoCapture = '$autocapture',
    Screen = '$screen',
    CustomEvent = 'custom_event',
}

export enum FunnelVizType {
    Steps = 'steps',
    TimeToConvert = 'time_to_convert',
    Trends = 'trends',
}

export type QuerySummary = { duration: string } & Record<string, string>

export interface SystemStatusQueriesResult {
    postgres_running: QuerySummary[]
    clickhouse_running?: QuerySummary[]
    clickhouse_slow_log?: QuerySummary[]
}

export interface SystemStatusAnalyzeResult {
    query: string
    timing: {
        query_id: string
        event_time: string
        query_duration_ms: number
        read_rows: number
        read_size: string
        result_rows: number
        result_size: string
        memory_usage: string
    }
    flamegraphs: Record<string, string>
}

export type PersonalizationData = Record<string, string | string[] | null>

interface EnabledSetupState {
    is_active: true // Whether the onbarding setup is currently active
    current_section: number
    any_project_ingested_events: boolean
    any_project_completed_snippet_onboarding: boolean
    non_demo_team_id: number | null
    has_invited_team_members: boolean
}

interface DisabledSetupState {
    is_active: false
    current_section: null
}

export type SetupState = EnabledSetupState | DisabledSetupState

export interface EventDefinition {
    id: string
    name: string
    description: string
    tags?: string[]
    volume_30_day: number | null
    query_usage_30_day: number | null
    owner?: UserBasicType | null
    updated_at?: string
    updated_by?: UserBasicType | null
}

export interface PropertyDefinition {
    id: string
    name: string
    description: string
    tags?: string[]
    volume_30_day: number | null
    query_usage_30_day: number | null
    updated_at?: string
    updated_by?: UserBasicType | null
    is_numerical?: boolean // Marked as optional to allow merge of EventDefinition & PropertyDefinition
}

export interface PersonProperty {
    name: string
    count: number
}
