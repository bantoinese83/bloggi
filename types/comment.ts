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
    media_url?: string;
    author: string;
    date: string;
}
