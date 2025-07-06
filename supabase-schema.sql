-- Supabase Schema for GH25 Check-in System

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create enum for check-in types
CREATE TYPE checkin_type AS ENUM ('staff', 'student');

-- Staff table (based on staffs.csv)
CREATE TABLE staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  cellphone TEXT,
  igreja TEXT, -- church in Portuguese
  country TEXT,
  nationality TEXT,
  area TEXT,
  kit_cama TEXT, -- bed kit
  quarto TEXT, -- room
  healthy_form TEXT,
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Students table (based on STUDENTS.csv)
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT,
  gender TEXT,
  email TEXT,
  phone TEXT,
  age TEXT,
  country TEXT, -- Note: CSV has "CONTRY" typo
  nationality TEXT,
  language TEXT,
  church TEXT,
  room TEXT,
  bed_kit TEXT,
  bus TEXT,
  documents TEXT,
  underage_doc TEXT,
  healthy_form TEXT,
  obs TEXT,
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Check-in log table (optional - for audit trail)
CREATE TABLE checkin_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person_id UUID NOT NULL,
  person_type checkin_type NOT NULL,
  person_name TEXT NOT NULL,
  action TEXT NOT NULL, -- 'checked_in' or 'unchecked'
  performed_by TEXT, -- device/user identifier
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_staff_name ON staff(name);
CREATE INDEX idx_staff_checked_in ON staff(checked_in);
CREATE INDEX idx_students_name ON students(name);
CREATE INDEX idx_students_checked_in ON students(checked_in);
CREATE INDEX idx_checkin_log_created_at ON checkin_log(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin_log ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now - you can restrict later)
CREATE POLICY "Allow all operations on staff" ON staff FOR ALL USING (true);
CREATE POLICY "Allow all operations on students" ON students FOR ALL USING (true);
CREATE POLICY "Allow all operations on checkin_log" ON checkin_log FOR ALL USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to auto-update updated_at
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 