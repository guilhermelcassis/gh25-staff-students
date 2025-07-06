# Supabase Setup Guide for GH25 Check-in System

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Project settings:
   - **Name**: `gh25-checkin-system`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your event location
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `supabase-schema.sql` file
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema
5. Verify that tables were created in **Table Editor**

## Step 3: Get API Keys

1. Go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (the long JWT token)

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Replace the values with your actual Supabase URL and anon key

## Step 5: Import Your Data

### Option A: Manual Upload (Recommended)
1. Go to **Table Editor** in Supabase
2. Select the **staff** table
3. Click **Insert** > **Insert row**
4. Manually add a few test records first
5. For bulk import, use **Import data** feature with CSV

### Option B: Use Migration Script
1. Edit `scripts/migrate-data.ts` with your full CSV data
2. Run the migration script (after completing setup)

## Step 6: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. The app should now connect to Supabase instead of localStorage
3. Test checking someone in/out - it should sync across all devices!

## Step 7: Enable Real-time Features

Real-time is already configured in the code. When someone checks in on any device, all other devices will see the update immediately.

## Security Notes

- The current setup allows all operations (good for development)
- For production, you may want to add authentication
- Row Level Security (RLS) is enabled but with permissive policies

## Features You'll Get

✅ **Real-time sync** - All devices see changes instantly
✅ **Dual mode** - Switch between Staff and Student check-in
✅ **Persistent data** - No more data loss on refresh
✅ **Multi-device** - Multiple people can check-in simultaneously
✅ **Audit trail** - All actions are logged
✅ **Search** - Works across both staff and students
✅ **Statistics** - Real-time counts and progress

## Troubleshooting

### Connection Issues
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure you're using the correct URL format

### Data Not Showing
- Check the browser console for errors
- Verify data exists in Supabase Table Editor
- Ensure RLS policies are set correctly

### Real-time Not Working
- Check browser console for WebSocket errors
- Verify real-time is enabled in Supabase (it should be by default)

## Next Steps

After setup is complete, you'll have a fully functional multi-device check-in system that works for both staff and students with real-time synchronization! 