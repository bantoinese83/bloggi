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
