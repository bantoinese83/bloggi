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
