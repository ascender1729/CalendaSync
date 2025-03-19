/*
  # Fix Events Table RLS Policies

  1. Security Changes
    - Enable RLS on events table
    - Drop existing policies to avoid conflicts
    - Add policies for CRUD operations:
      - Users can create their own events
      - Users can read their own events
      - Users can update their own events
      - Users can delete their own events
*/

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can create own events" ON events;
  DROP POLICY IF EXISTS "Users can view own events" ON events;
  DROP POLICY IF EXISTS "Users can update own events" ON events;
  DROP POLICY IF EXISTS "Users can delete own events" ON events;
END $$;

-- Create policies
CREATE POLICY "Users can create own events"
ON events
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own events"
ON events
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own events"
ON events
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own events"
ON events
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);