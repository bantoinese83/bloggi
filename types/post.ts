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
