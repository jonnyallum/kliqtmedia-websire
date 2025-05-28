-- KLIQT Media Admin Setup Script
-- Run this after the main database-jobs-extension.sql

-- =====================================================
-- ADMIN USER SETUP FOR KLIQT MEDIA JOBS BOARD
-- =====================================================

-- Step 1: Create admin user in Supabase Auth Dashboard first
-- Email: admin@kliqtmedia.co.uk
-- Password: Aprilia100!69.
-- Then get the UUID and replace [ADMIN_UUID] below

-- Step 2: Insert admin profile (replace [ADMIN_UUID] with actual UUID from auth.users)
-- INSERT INTO profiles (id, email, role, full_name, created_at, updated_at) 
-- VALUES (
--   '[ADMIN_UUID]', 
--   'admin@kliqtmedia.co.uk', 
--   'admin',
--   'KLIQT Admin',
--   NOW(),
--   NOW()
-- );

-- Step 3: Update sample jobs to be owned by admin user
-- UPDATE jobs SET user_id = '[ADMIN_UUID]' WHERE user_id IS NULL;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check admin user exists
-- SELECT * FROM profiles WHERE email = 'admin@kliqtmedia.co.uk';

-- Check jobs are assigned to admin
-- SELECT COUNT(*) as admin_jobs FROM jobs j 
-- JOIN profiles p ON j.user_id = p.id 
-- WHERE p.email = 'admin@kliqtmedia.co.uk';

-- Check job categories
-- SELECT * FROM job_categories ORDER BY name;

-- Check total jobs count
-- SELECT 
--   type,
--   COUNT(*) as count,
--   AVG(budget_min) as avg_min_budget,
--   AVG(budget_max) as avg_max_budget
-- FROM jobs 
-- GROUP BY type;

-- =====================================================
-- ADMIN DASHBOARD QUERIES (for future use)
-- =====================================================

-- Get all jobs with application counts
-- SELECT 
--   j.id,
--   j.title,
--   j.type,
--   jc.name as category,
--   j.budget_min,
--   j.budget_max,
--   j.views_count,
--   j.applications_count,
--   j.status,
--   j.created_at
-- FROM jobs j
-- JOIN job_categories jc ON j.category_id = jc.id
-- ORDER BY j.created_at DESC;

-- Get application statistics
-- SELECT 
--   j.title,
--   COUNT(ja.id) as total_applications,
--   COUNT(CASE WHEN ja.status = 'pending' THEN 1 END) as pending,
--   COUNT(CASE WHEN ja.status = 'accepted' THEN 1 END) as accepted,
--   COUNT(CASE WHEN ja.status = 'rejected' THEN 1 END) as rejected
-- FROM jobs j
-- LEFT JOIN job_applications ja ON j.id = ja.job_id
-- GROUP BY j.id, j.title
-- ORDER BY total_applications DESC;

-- =====================================================
-- MANUAL SETUP INSTRUCTIONS
-- =====================================================

/*
STEP-BY-STEP ADMIN SETUP:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter:
   - Email: admin@kliqtmedia.co.uk
   - Password: Aprilia100!69.
   - Confirm Password: Aprilia100!69.
4. Click "Create User"
5. Copy the User ID (UUID) from the created user
6. Replace [ADMIN_UUID] in the INSERT statements above
7. Run the uncommented INSERT statements
8. Run verification queries to confirm setup

ALTERNATIVE: Use Supabase CLI
supabase auth signup --email admin@kliqtmedia.co.uk --password Aprilia100!69.
*/