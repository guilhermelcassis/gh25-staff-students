-- Setup script for Staff Check-in Database
-- Run this in your Supabase SQL Editor

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT,
  gender TEXT,
  email TEXT,
  phone TEXT,
  age TEXT,
  country TEXT,
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
  checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
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
  checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checkin_logs table for audit trail
CREATE TABLE IF NOT EXISTS checkin_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  person_id UUID NOT NULL,
  person_type TEXT NOT NULL CHECK (person_type IN ('staff', 'student')),
  person_name TEXT NOT NULL,
  action TEXT NOT NULL,
  performed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_students_updated_at 
  BEFORE UPDATE ON students 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at 
  BEFORE UPDATE ON staff 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on students" ON students
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on staff" ON staff
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on checkin_logs" ON checkin_logs
  FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_students_checked_in ON students(checked_in);
CREATE INDEX IF NOT EXISTS idx_staff_name ON staff(name);
CREATE INDEX IF NOT EXISTS idx_staff_checked_in ON staff(checked_in);
CREATE INDEX IF NOT EXISTS idx_checkin_logs_person_id ON checkin_logs(person_id);
CREATE INDEX IF NOT EXISTS idx_checkin_logs_created_at ON checkin_logs(created_at);

-- Insert sample data (optional - remove if you don't want sample data)
-- INSERT INTO students (name, status, gender, email, phone, age, country, nationality, language, church, room, bed_kit, bus, documents, underage_doc, healthy_form, obs)
-- VALUES 
--   ('John Doe', 'FULLY PAID', 'Male / Masculino', 'john@example.com', '+1234567890', '25', 'USA', 'American', 'English', 'First Baptist', '101', '1', 'TRUE', 'TRUE', 'FALSE', 'TRUE', 'No special requirements'),
--   ('Maria Silva', 'ONGOING PAYMENT', 'Female / Feminino', 'maria@example.com', '+5511999999999', '22', 'Brazil', 'Brazilian', 'Portuguese, English', 'Igreja Batista', '102', '2', 'FALSE', 'TRUE', 'N/A', 'TRUE', 'Vegetarian meals');

COMMIT; 