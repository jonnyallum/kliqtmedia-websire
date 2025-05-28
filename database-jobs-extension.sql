-- Jobs Board Extension for KLIQT Media
-- Add this to your existing database schema

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('wanted', 'available')),
  category TEXT,
  tags TEXT[],
  budget_min INTEGER,
  budget_max INTEGER,
  currency TEXT DEFAULT 'GBP',
  location TEXT,
  remote BOOLEAN DEFAULT true,
  posted_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  views INTEGER DEFAULT 0,
  applications INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT,
  portfolio_url TEXT,
  proposed_budget INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_id, applicant_id)
);

-- Create job categories table
CREATE TABLE IF NOT EXISTS job_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default job categories
INSERT INTO job_categories (name, description, icon, color) VALUES
('Web Development', 'Frontend, backend, and full-stack web development', 'Code', '#8AFF00'),
('Mobile Apps', 'iOS, Android, and cross-platform mobile development', 'Smartphone', '#FF008F'),
('Design', 'UI/UX design, graphic design, and branding', 'Palette', '#00BFFF'),
('Marketing', 'Digital marketing, content creation, and SEO', 'TrendingUp', '#FFD700'),
('Video Editing', 'Video production, editing, and motion graphics', 'Video', '#FF6B6B'),
('AI & Automation', 'AI development, workflow automation, and integrations', 'Bot', '#9B59B6'),
('E-commerce', 'Online stores, dropshipping, and marketplace setup', 'ShoppingCart', '#FF8C00'),
('Content Writing', 'Copywriting, blog posts, and technical documentation', 'FileText', '#32CD32');

-- Enable RLS on jobs tables
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for jobs
CREATE POLICY "Jobs are viewable by everyone" ON jobs
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own jobs" ON jobs
  FOR INSERT WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Users can update their own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = posted_by);

CREATE POLICY "Users can delete their own jobs" ON jobs
  FOR DELETE USING (auth.uid() = posted_by);

-- RLS Policies for job applications
CREATE POLICY "Applications viewable by job poster and applicant" ON job_applications
  FOR SELECT USING (
    auth.uid() = applicant_id OR 
    auth.uid() IN (SELECT posted_by FROM jobs WHERE id = job_id)
  );

CREATE POLICY "Users can apply to jobs" ON job_applications
  FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Applicants can update their applications" ON job_applications
  FOR UPDATE USING (auth.uid() = applicant_id);

-- RLS Policies for job categories
CREATE POLICY "Categories are viewable by everyone" ON job_categories
  FOR SELECT USING (true);

-- Create admin user (run this manually in Supabase SQL editor)
-- First create the auth user in Supabase Auth, then run:
/*
INSERT INTO profiles (id, email, full_name, role, created_at)
VALUES (
  '[REPLACE_WITH_ACTUAL_AUTH_UUID]',
  'admin@kliqtmedia.co.uk',
  'KLIQT Admin',
  'admin',
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role;
*/

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for jobs table
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(type);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(featured);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_applicant_id ON job_applications(applicant_id);

-- =====================================================
-- API KEYS TABLE FOR PUBLIC API ACCESS
-- =====================================================

-- Table for managing API keys for external integrations
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL, -- Friendly name for the API key
  scopes TEXT[] DEFAULT ARRAY['read_jobs'], -- Available scopes: read_jobs, post_jobs, manage_jobs
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS for API keys
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Users can only see their own API keys
CREATE POLICY "Users can view own API keys" ON api_keys
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own API keys
CREATE POLICY "Users can create own API keys" ON api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own API keys
CREATE POLICY "Users can update own API keys" ON api_keys
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own API keys
CREATE POLICY "Users can delete own API keys" ON api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- Function to generate secure API keys
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TEXT AS $$
BEGIN
  RETURN 'kliqt_' || encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Indexes for API keys
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key);
CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(is_active);