export interface Notification {
    id: string;
    user_id: string;
    type: 'like' | 'comment' | 'follow' | 'subscription' | 'tip';
    source_id?: string;
    is_read: boolean;
    created_at: string; // ISO Date string
    related_user_id?: string;
    post_id?: string;
    grouping_key?: string;
    group_count: number;
    tenant_id: string;
}
