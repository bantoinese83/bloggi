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
