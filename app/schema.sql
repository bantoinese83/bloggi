-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tenants Table (IMPORTANT: Keep this simple)
CREATE TABLE tenants (
                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                         name VARCHAR(255) NOT NULL,
                         description TEXT,
                         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                       tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,  -- Required, not optional.  Enforce tenant context
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password_hash TEXT NOT NULL,
                       bio TEXT,
                       avatar_url TEXT,
                       github_url TEXT,
                       website_url TEXT,
                       is_verified BOOLEAN DEFAULT FALSE,
                       verification_token UUID,
                       verification_token_expiry TIMESTAMP WITH TIME ZONE,
                       password_reset_token UUID,
                       password_reset_token_expiry TIMESTAMP WITH TIME ZONE,
                       last_login TIMESTAMP WITH TIME ZONE,
                       login_ip INET,
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'author', 'admin')), -- ENUM-like behavior with CHECK
                       google_id VARCHAR(255) UNIQUE,
                       facebook_id VARCHAR(255) UNIQUE,
                       is_active BOOLEAN DEFAULT TRUE,
                       deactivated_at TIMESTAMP WITH TIME ZONE,
    -- REMOVE ARRAY TYPES: Blocked/Muted IDs should be handled with relationship tables (see below)
                       contact_info JSONB,  -- Consider specific columns instead of a generic JSONB
                       points INTEGER DEFAULT 0 CHECK (points >= 0),  -- Enforce non-negative points
                       level INTEGER DEFAULT 1 CHECK (level >= 1),
                       CONSTRAINT chk_username_length CHECK (length(username) >= 3 AND length(username) <= 50), -- More username validation
                       CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$') -- Basic email validation.
    );

-- Relationship Tables for Blocked/Muted Users (replacing UUID arrays)
CREATE TABLE blocked_users (
                               blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
                               blocked_id UUID REFERENCES users(id) ON DELETE CASCADE,
                               created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               PRIMARY KEY (blocker_id, blocked_id),
                               CONSTRAINT unique_block UNIQUE (blocker_id, blocked_id)
);

CREATE TABLE muted_users (
                             muter_id UUID REFERENCES users(id) ON DELETE CASCADE,
                             muted_id UUID REFERENCES users(id) ON DELETE CASCADE,
                             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             PRIMARY KEY (muter_id, muted_id),
                             CONSTRAINT unique_mute UNIQUE (muter_id, muted_id)
);

-- Indexes for Users Table
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_facebook_id ON users(facebook_id);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_points ON users(points);
CREATE INDEX idx_users_level ON users(level);
CREATE INDEX idx_users_tenant_id ON users(tenant_id);

-- Posts Table
CREATE TABLE posts (
                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                       tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,  -- Required, not optional
                       user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                       title VARCHAR(255) NOT NULL,
                       slug VARCHAR(255) UNIQUE NOT NULL,
                       content TEXT NOT NULL,
                       excerpt TEXT,
                       cover_image_url TEXT,
                       is_published BOOLEAN DEFAULT FALSE,
                       is_draft BOOLEAN DEFAULT TRUE,
                       published_at TIMESTAMP WITH TIME ZONE,
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       reading_time_minutes INTEGER CHECK (reading_time_minutes > 0),
                       language VARCHAR(10) DEFAULT 'en' CHECK (language IN ('en', 'es', 'fr')),
    view_count INTEGER DEFAULT 0 CHECK (view_count >= 0),
    content_version INTEGER DEFAULT 1 CHECK (content_version >= 1),
    original_post_id UUID REFERENCES posts(id) ON DELETE SET NULL,  -- Self-reference for forked posts
    visibility VARCHAR(50) DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    embedded_content JSONB, -- Be specific if possible, avoid generic JSONB
    edited_by UUID REFERENCES users(id) ON DELETE SET NULL,
    edited_at TIMESTAMP WITH TIME ZONE,
    ai_generated_score NUMERIC(3, 2) CHECK (ai_generated_score >= 0 AND ai_generated_score <= 1), -- Validate score
    ai_content_warning TEXT,
    ai_analysis_details JSONB,
    price DECIMAL(10, 2) CHECK (price >= 0),
    ai_suggestions JSONB,
    publish_schedule JSONB
);

-- Indexes for Posts Table
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_language ON posts(language);
CREATE INDEX idx_posts_visibility ON posts(visibility);
CREATE INDEX idx_posts_scheduled_at ON posts(scheduled_at);
CREATE INDEX idx_posts_tenant_id ON posts(tenant_id);
CREATE INDEX idx_posts_is_published ON posts(is_published);  -- Common filter

-- Tags Table
CREATE TABLE tags (
                      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                      tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- Required
                      name VARCHAR(50) UNIQUE NOT NULL,
                      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                      description TEXT,
                      image_url TEXT,
                      CONSTRAINT chk_tag_name_length CHECK (length(name) >= 2 AND length(name) <= 50)
);

-- Indexes for Tags Table
CREATE INDEX idx_tags_name ON tags(name);
CREATE INDEX idx_tags_tenant_id ON tags(tenant_id);

-- PostTags Table (Many-to-Many Relationship)
CREATE TABLE post_tags (
                           post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                           tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
                           tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,  -- Required
                           PRIMARY KEY (post_id, tag_id),
                           CONSTRAINT unique_post_tag UNIQUE (post_id, tag_id)  -- Redundant with PK, but good practice for clarity.
);

CREATE INDEX idx_post_tags_tenant_id ON post_tags(tenant_id);

-- Comments Table
CREATE TABLE comments (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- Required
                          post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                          content TEXT NOT NULL,
                          parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
                          is_edited BOOLEAN DEFAULT FALSE,
                          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                          upvotes INTEGER DEFAULT 0 CHECK (upvotes >= 0),
                          downvotes INTEGER DEFAULT 0 CHECK (downvotes >= 0),
                          is_reported BOOLEAN DEFAULT FALSE,
                          is_highlighted BOOLEAN DEFAULT FALSE,
                          media_url TEXT
);

-- Indexes for Comments Table
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_comment_id ON comments(parent_comment_id);
CREATE INDEX idx_comments_is_reported ON comments(is_reported);
CREATE INDEX idx_comments_tenant_id ON comments(tenant_id);

-- Likes Table
CREATE TABLE likes (
                       post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                       user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                       tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,  -- Required
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       PRIMARY KEY (post_id, user_id)
);

-- Indexes for Likes Table
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_tenant_id ON likes(tenant_id);

-- Followers Table
CREATE TABLE followers (
                           follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
                           followee_id UUID REFERENCES users(id) ON DELETE CASCADE,
                           tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,  -- Required
                           created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                           PRIMARY KEY (follower_id, followee_id)
);

-- Indexes for Followers Table
CREATE INDEX idx_followers_follower_id ON followers(follower_id);
CREATE INDEX idx_followers_followee_id ON followers(followee_id);
CREATE INDEX idx_followers_tenant_id ON followers(tenant_id);

-- Notifications Table
CREATE TABLE notifications (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                               user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                               type VARCHAR(50) NOT NULL,
                               source_id UUID,
                               is_read BOOLEAN DEFAULT FALSE,
                               created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
                               post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
                               grouping_key VARCHAR(255),
                               group_count INT DEFAULT 1,
                               CHECK (type IN ('like', 'comment', 'follow', 'subscription', 'tip')) -- ENUM with CHECK
);

-- Indexes for Notifications Table
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_related_user_id ON notifications(related_user_id);
CREATE INDEX idx_notifications_grouping_key ON notifications(grouping_key);
CREATE INDEX idx_notifications_tenant_id ON notifications(tenant_id);

-- Bookmarks Table
CREATE TABLE bookmarks (
                           user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                           post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                           tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                           created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                           PRIMARY KEY (user_id, post_id)
);

-- Indexes for Bookmarks Table
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_post_id ON bookmarks(post_id);
CREATE INDEX idx_bookmarks_tenant_id ON bookmarks(tenant_id);

-- Reading History Table
CREATE TABLE reading_history (
                                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                 tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                                 user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                 post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                                 read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                 scroll_percentage NUMERIC(5,2) DEFAULT 0.00 CHECK (scroll_percentage >= 0 AND scroll_percentage <= 100),
                                 time_spent_seconds INTEGER DEFAULT 0 CHECK (time_spent_seconds >= 0)
);

-- Indexes for Reading History Table
CREATE INDEX idx_reading_history_user_id ON reading_history(user_id);
CREATE INDEX idx_reading_history_post_id ON reading_history(post_id);
CREATE INDEX idx_reading_history_tenant_id ON reading_history(tenant_id);

-- Subscriptions Table (For Premium Content)
CREATE TABLE subscriptions (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                               user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                               plan VARCHAR(50) NOT NULL,
                               starts_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               ends_at TIMESTAMP WITH TIME ZONE,
                               is_active BOOLEAN DEFAULT TRUE,
                               created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               payment_method VARCHAR(50),
                               renewal_date TIMESTAMP WITH TIME ZONE,
                               stripe_subscription_id VARCHAR(255),
                               stripe_customer_id VARCHAR(255),
                               stripe_payment_intent_id VARCHAR(255),
                               subscription_tier VARCHAR(50),
                               trial_start TIMESTAMP WITH TIME ZONE,
                               trial_end TIMESTAMP WITH TIME ZONE
);

-- Indexes for Subscriptions Table
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_tenant_id ON subscriptions(tenant_id);

-- Reports Table (For Reporting Inappropriate Content)
CREATE TABLE reports (
                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                         tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                         reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
                         post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                         comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
                         reason TEXT NOT NULL,
                         status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
                         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         resolution_notes TEXT,
                         resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
                         resolved_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for Reports Table
CREATE INDEX idx_reports_reporter_id ON reports(reporter_id);
CREATE INDEX idx_reports_post_id ON reports(post_id);
CREATE INDEX idx_reports_comment_id ON reports(comment_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_tenant_id ON reports(tenant_id);

-- Analytics Table
CREATE TABLE analytics (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                           post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                           views INT DEFAULT 0 CHECK (views >= 0),
                           likes INT DEFAULT 0 CHECK (likes >= 0),
                           comments INT DEFAULT 0 CHECK (comments >= 0),
                           shares INT DEFAULT 0 CHECK (shares >= 0),
                           created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                           unique_views INT DEFAULT 0 CHECK (unique_views >= 0),
                           average_time_spent_seconds INTEGER DEFAULT 0 CHECK (average_time_spent_seconds >= 0),
                           bounce_rate NUMERIC(5,2) DEFAULT 0.00 CHECK (bounce_rate >= 0 AND bounce_rate <= 100),
                           exit_rate NUMERIC(5,2) DEFAULT 0.00 CHECK (exit_rate >= 0 AND exit_rate <= 100),
                           organic_search INT DEFAULT 0 CHECK (organic_search >= 0),
                           referral INT DEFAULT 0 CHECK (referral >= 0),
                           social_media INT DEFAULT 0 CHECK (social_media >= 0),
                           direct INT DEFAULT 0 CHECK (direct >= 0),
                           signups INT DEFAULT 0 CHECK (signups >= 0),
                           subscriptions INT DEFAULT 0 CHECK (subscriptions >= 0),
                           country VARCHAR(50),
                           device VARCHAR(50),
                           demographics JSONB
);

-- Indexes for Analytics Table
CREATE INDEX idx_analytics_post_id ON analytics(post_id);
CREATE INDEX idx_analytics_country ON analytics(country);
CREATE INDEX idx_analytics_device ON analytics(device);
CREATE INDEX idx_analytics_tenant_id ON analytics(tenant_id);

-- Audit Log Table (Track important actions in the system)
CREATE TABLE audit_log (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                           user_id UUID REFERENCES users(id) ON DELETE SET NULL,
                           action VARCHAR(255) NOT NULL,
                           table_name VARCHAR(255),
                           record_id UUID,
                           old_values JSONB,
                           new_values JSONB
);

CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_audit_log_table_name ON audit_log(table_name);
CREATE INDEX idx_audit_log_tenant_id ON audit_log(tenant_id);

-- Content Moderation Table
CREATE TABLE content_moderation (
                                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                                    post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
                                    comment_id UUID REFERENCES comments(id) ON DELETE SET NULL,
                                    report_id UUID REFERENCES reports(id) ON DELETE SET NULL,
                                    reason TEXT,
                                    moderated_by UUID REFERENCES users(id) ON DELETE SET NULL,
                                    moderated_at TIMESTAMP WITH TIME ZONE,
                                    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
                                    notes TEXT
);

CREATE INDEX idx_content_moderation_post_id ON content_moderation(post_id);
CREATE INDEX idx_content_moderation_comment_id ON content_moderation(comment_id);
CREATE INDEX idx_content_moderation_status ON content_moderation(status);
CREATE INDEX idx_content_moderation_tenant_id ON content_moderation(tenant_id);

-- User Preferences Table
CREATE TABLE user_preferences (
                                  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                                  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                                  theme VARCHAR(50) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
                                  font_size VARCHAR(20) DEFAULT 'medium' CHECK (font_size IN ('small', 'medium', 'large')),
                                  email_notifications BOOLEAN DEFAULT TRUE,
                                  push_notifications BOOLEAN DEFAULT TRUE,
                                  language VARCHAR(10) DEFAULT 'en' CHECK (language IN ('en', 'es', 'fr')), -- or a lookup table
    interests TEXT[],
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    filtered_tags TEXT[]
);

-- Saved Searches Table
CREATE TABLE saved_searches (
                                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                search_query TEXT NOT NULL,
                                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                name VARCHAR(255)
);

CREATE INDEX idx_saved_searches_user_id ON saved_searches(user_id);
CREATE INDEX idx_saved_searches_tenant_id ON saved_searches(tenant_id);

-- Series Table
CREATE TABLE series (
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                        name VARCHAR(255) NOT NULL,
                        description TEXT,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                        user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_series_user_id ON series(user_id);

CREATE TABLE post_series (
                             post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                             series_id UUID REFERENCES series(id) ON DELETE CASCADE,
                             tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                             series_order INTEGER NOT NULL CHECK (series_order > 0),  -- Series order should be positive.
                             PRIMARY KEY (post_id, series_id),
                             CONSTRAINT unique_series_order UNIQUE (series_id, series_order)
);

CREATE INDEX idx_post_series_series_id ON post_series(series_id);

-- Tipping Table
CREATE TABLE tipps (
                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                       tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                       sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
                       receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
                       post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                       amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       is_anonymous BOOLEAN DEFAULT FALSE
);

-- Indexes for Tipping Table
CREATE INDEX idx_tipps_sender_id ON tipps(sender_id);
CREATE INDEX idx_tipps_receiver_id ON tipps(receiver_id);
CREATE INDEX idx_tipps_post_id ON tipps(post_id);
CREATE INDEX idx_tipps_tenant_id ON tipps(tenant_id);

-- Earnings Table
CREATE TABLE earnings (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                          source_type VARCHAR(50) NOT NULL,
                          source_id UUID NOT NULL,
                          amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
                          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_earnings_user_id ON earnings(user_id);
CREATE INDEX idx_earnings_source_type ON earnings(source_type);
CREATE INDEX idx_earnings_tenant_id ON earnings(tenant_id);

-- Payouts Table
CREATE TABLE payouts (
                         id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                         tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                         user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                         amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
                         payout_method VARCHAR(50) NOT NULL,
                         payout_details JSONB,
                         status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
                         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         processed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_payouts_user_id ON payouts(user_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_tenant_id ON payouts(tenant_id);

-- Tax Information Table
CREATE TABLE tax_information (
                                 id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                 tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                                 user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                 tax_id VARCHAR(255),
                                 address JSONB,
                                 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tax_information_user_id ON tax_information(user_id);
CREATE INDEX idx_tax_information_tenant_id ON tax_information(tenant_id);

-- Referral Table
CREATE TABLE referrals (
                           id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                           tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                           referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
                           referred_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                           created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                           reward_applied BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_referred_user_id ON referrals(referred_user_id);
CREATE INDEX idx_referrals_tenant_id ON referrals(tenant_id);

-- Badges Table
CREATE TABLE badges (
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                        name VARCHAR(255) NOT NULL,
                        description TEXT,
                        image_url TEXT,
                        criteria JSONB,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- UserBadges Table (NEW - Many-to-Many Relationship)
CREATE TABLE user_badges (
                             user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                             badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
                             tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                             awarded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             PRIMARY KEY (user_id, badge_id)
);

CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON user_badges(badge_id);

-- Level Thresholds Table
CREATE TABLE level_thresholds (
                                  level INTEGER PRIMARY KEY,
                                  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                                  points_required INTEGER NOT NULL CHECK (points_required > 0),
                                  description TEXT
);

-- PointsLog Table - Tracks points earned/deducted
CREATE TABLE points_log (
                            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                            tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                            points INTEGER NOT NULL,
                            reason VARCHAR(255) NOT NULL,
                            source_type VARCHAR(50),
                            source_id UUID,
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_points_log_user_id ON points_log(user_id);

-- Feature Flags Table
CREATE TABLE feature_flags (
                               id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                               tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                               name VARCHAR(255) UNIQUE NOT NULL,
                               description TEXT,
                               is_enabled BOOLEAN DEFAULT FALSE,
                               created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                               user_group VARCHAR(255),
                               user_list UUID[]
);

-- Files Table
CREATE TABLE files (
                       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                       tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                       user_id UUID REFERENCES users(id) ON DELETE SET NULL,
                       post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
                       bucket_name VARCHAR(255) NOT NULL,
                       file_path VARCHAR(255) NOT NULL,
                       original_filename VARCHAR(255),
                       file_size INTEGER CHECK (file_size > 0), --Enforce the file size to be larger than 0
                       mime_type VARCHAR(255),
                       upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       CONSTRAINT unique_file_path UNIQUE (bucket_name, file_path)
);

CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_post_id ON files(post_id);

-- Post Access Table
CREATE TABLE post_access (
                             id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                             tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                             user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                             post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                             access_granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             transaction_id UUID
);

CREATE INDEX idx_post_access_user_id ON post_access(user_id);
CREATE INDEX idx_post_access_post_id ON post_access(post_id);
CREATE INDEX idx_post_access_tenant_id ON post_access(tenant_id);

-- Communities Table
CREATE TABLE communities (
                             id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                             tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                             name VARCHAR(255) NOT NULL,
                             description TEXT,
                             created_by UUID REFERENCES users(id) ON DELETE CASCADE,
                             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                             private BOOLEAN DEFAULT FALSE
);

-- Community Members Table
CREATE TABLE community_members (
                                   community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
                                   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                   joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                                   role VARCHAR(50) DEFAULT 'member',
                                   PRIMARY KEY (community_id, user_id)
);

-- Content Suggestions Table
CREATE TABLE content_suggestions (
                                     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                     tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                                     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                     content TEXT NOT NULL,
                                     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                        type VARCHAR(255) NOT NULL,
                        data JSONB,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sponsors Table
CREATE TABLE sponsors (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                          name VARCHAR(255) NOT NULL,
                          website_url TEXT,
                          logo_url TEXT,
                          description TEXT
);

-- Post Sponsors Table
CREATE TABLE post_sponsors (
                               post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
                               sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
                               tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                               PRIMARY KEY (post_id, sponsor_id)
);

CREATE INDEX idx_post_sponsors_tenant_id ON post_sponsors(tenant_id);

-- Transactions Table
CREATE TABLE transactions (
                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                              tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                              user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                              type VARCHAR(50) NOT NULL,
                              amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
                              currency VARCHAR(10) DEFAULT 'USD',
                              status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
                              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                              processed_at TIMESTAMP WITH TIME ZONE,
                              details JSONB
);

-- Author Affiliates Table
CREATE TABLE author_affiliates (
                                   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                   tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, --Required
                                   author_id UUID REFERENCES users(id) ON DELETE CASCADE,
                                   name VARCHAR(255) NOT NULL,
                                   description TEXT,
                                   link TEXT NOT NULL,
                                   clicks INTEGER DEFAULT 0 CHECK (clicks >= 0),
                                   conversions INTEGER DEFAULT 0 CHECK (conversions >= 0),
                                   earnings DECIMAL(10, 2) DEFAULT 0.00 CHECK (earnings >= 0),
                                   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Added index
CREATE INDEX idx_post_access_tenant_id ON post_access(tenant_id);

-- Community Member Check
-- This requires a function to implement efficiently and correctly, and could impact perf.  Consider a different design.
-- ALTER TABLE comments ADD CONSTRAINT community_member CHECK (user_id IN (SELECT user_id FROM community_members WHERE community_id = (SELECT community_id FROM posts WHERE posts.id = comments.post_id) ));