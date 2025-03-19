/*
  # Create events table and security policies

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `events` table
    - Add policies for:
      - Users can read their own events
      - Users can insert their own events
      - Users can update their own events
      - Users can delete their own events
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy for reading own events
CREATE POLICY "Users can read own events"
  ON events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for creating events
CREATE POLICY "Users can create own events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for updating own events
CREATE POLICY "Users can update own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for deleting own events
CREATE POLICY "Users can delete own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);