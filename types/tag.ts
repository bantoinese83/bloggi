export interface Tag {
    id: string;
    name: string;
    description?: string;
    image_url?: string;
    created_at: string; // ISO Date string
    tenant_id: string;
}
