export interface User {
    id: string;
    username: string;
    email: string;
    bio?: string;
    avatar_url?: string;
    role: string; // 'user' | 'author' | 'admin'
    is_verified: boolean;
    google_id?: string;
    facebook_id?: string;
    points: number;
    level: number;
    tenant_id: string;
}

export interface Post {
    id: string;
    user_id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    cover_image_url?: string;
    is_published: boolean;
    is_draft: boolean;
    published_at?: string; // ISO Date string
    created_at: string;    // ISO Date string
    updated_at: string;    // ISO Date string
    reading_time_minutes?: number;
    language?: string;
    view_count?: number;
    visibility: 'public' | 'unlisted' | 'private';
    scheduled_at?: string; // ISO Date string
    embedded_content?: never; // Define a more specific type if needed
    tenant_id: string;
    ai_generated_score?:number
    price?: number;
    ai_suggestions?:string,
    publish_schedule?: string
}

export interface Tag {
    id: string;
    name: string;
    description?: string;
    image_url?: string;
    created_at: string; // ISO Date string
    tenant_id: string;
}

export interface Comment {
    id: string;
    post_id: string;
    user_id: string;
    content: string;
    parent_comment_id?: string;
    is_edited: boolean;
    created_at: string; // ISO Date string
    updated_at: string; // ISO Date string
    upvotes: number;
    downvotes: number;
    is_reported: boolean;
    tenant_id: string;
    media_url?: string
}

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

export interface Subscription {
    id: string;
    user_id: string;
    plan: string;
    starts_at: string;
    ends_at: string;
    is_active: boolean;
    payment_method?: string;
    renewal_date?: string;
    stripe_subscription_id?: string;
    stripe_customer_id?: string;
    subscription_tier?: string;
    trial_start?: string;
    trial_end?: string;
    tenant_id: string;
}

export interface Tipp {
    id: string;
    sender_id: string;
    receiver_id: string;
    post_id: string;
    amount: number;
    created_at: string; // ISO Date string
    is_anonymous: boolean;
    tenant_id: string;
}
//Table types for new tables.

export interface Community {
    id: string;
    name: string;
    description?: string;
    created_by: string;
    created_at: string;
    private: boolean;
    tenant_id: string;
}

export interface Files {
    id: string;
    user_id: string;
    post_id: string;
    bucket_name?: string;
    file_path?: string;
    tenant_id: string;
}