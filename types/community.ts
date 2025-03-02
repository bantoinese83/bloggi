export interface Community {
    id: string;
    name: string;
    description?: string;
    created_by: string;
    created_at: string;
    private: boolean;
    tenant_id: string;
    link: string;
    title: string;
}
