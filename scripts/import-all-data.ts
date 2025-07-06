import { createClient } from '@supabase/supabase-js';
import { csvData } from '../data/staffData';
import { parseCSVToStaff } from '../utils/csvParser';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Make sure .env.local contains:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=your_url');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Parse staff CSV data
function parseStaffCSV(csvContent: string) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(';');
  
  const staff = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';');
    if (values[0] && values[0].trim()) { // Skip empty rows
      staff.push({
        name: values[0]?.trim() || '',
        email: values[1]?.trim() || '',
        cellphone: values[2]?.trim() || '',
        igreja: values[3]?.trim() || '', // church in Portuguese
        country: values[4]?.trim() || '',
        nationality: values[5]?.trim() || '',
        area: values[6]?.trim() || '',
        kit_cama: values[7]?.trim() || '', // bed kit
        quarto: values[8]?.trim() || '', // room
        healthy_form: values[9]?.trim() || '',
        checked_in: false
      });
    }
  }
  
  return staff;
}

async function importStudentData() {
  console.log('📚 Starting student data import...');
  
  try {
    // Parse CSV data from existing data file
    const students = parseCSVToStaff(csvData);
    console.log(`Parsed ${students.length} students from STUDENTS.csv`);

    // Transform data for Supabase
    const supabaseStudents = students.map(student => ({
      name: student.name,
      status: student.status,
      gender: student.gender,
      email: student.email,
      phone: student.phone,
      age: student.age,
      country: student.country,
      nationality: student.nationality,
      language: student.language,
      church: student.church,
      room: student.room,
      bed_kit: student.bedKit,
      bus: student.bus,
      documents: student.documents,
      underage_doc: student.underageDoc,
      healthy_form: student.healthyForm,
      obs: student.obs,
      checked_in: false
    }));

    // Insert data in batches
    const batchSize = 100;
    let inserted = 0;

    for (let i = 0; i < supabaseStudents.length; i += batchSize) {
      const batch = supabaseStudents.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('students')
        .insert(batch);

      if (error) {
        console.error(`Error inserting student batch ${Math.floor(i / batchSize) + 1}:`, error);
        throw error;
      }

      inserted += batch.length;
      console.log(`Inserted student batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${supabaseStudents.length} students`);
    }

    console.log(`✅ Successfully imported ${inserted} students to Supabase!`);
    return inserted;

  } catch (error) {
    console.error('❌ Student import failed:', error);
    throw error;
  }
}

async function importStaffData() {
  console.log('👥 Starting staff data import...');
  
  try {
    // Read staff CSV file
    const staffCsvPath = path.join(process.cwd(), 'staffs.csv');
    const staffCsvContent = fs.readFileSync(staffCsvPath, 'utf-8');
    
    // Parse staff CSV
    const staff = parseStaffCSV(staffCsvContent);
    console.log(`Parsed ${staff.length} staff members from staffs.csv`);

    if (staff.length === 0) {
      console.log('No staff data to import');
      return 0;
    }

    // Insert staff data in batches
    const batchSize = 50;
    let inserted = 0;

    for (let i = 0; i < staff.length; i += batchSize) {
      const batch = staff.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('staff')
        .insert(batch);

      if (error) {
        console.error(`Error inserting staff batch ${Math.floor(i / batchSize) + 1}:`, error);
        throw error;
      }

      inserted += batch.length;
      console.log(`Inserted staff batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${staff.length} staff`);
    }

    console.log(`✅ Successfully imported ${inserted} staff members to Supabase!`);
    return inserted;

  } catch (error) {
    console.error('❌ Staff import failed:', error);
    throw error;
  }
}

async function clearExistingData() {
  console.log('🧹 Clearing existing data...');
  
  try {
    // Clear students
    const { error: studentsError } = await supabase
      .from('students')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (studentsError && studentsError.code !== 'PGRST116') {
      console.error('Error clearing students:', studentsError);
      throw studentsError;
    }

    // Clear staff
    const { error: staffError } = await supabase
      .from('staff')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (staffError && staffError.code !== 'PGRST116') {
      console.error('Error clearing staff:', staffError);
      throw staffError;
    }

    console.log('✅ Existing data cleared');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
    throw error;
  }
}

async function verifyImport() {
  console.log('🔍 Verifying import...');
  
  try {
    // Count students
    const { count: studentCount, error: studentError } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true });

    if (studentError) {
      console.error('Error counting students:', studentError);
    } else {
      console.log(`📊 Total students in database: ${studentCount}`);
    }

    // Count staff
    const { count: staffCount, error: staffError } = await supabase
      .from('staff')
      .select('*', { count: 'exact', head: true });

    if (staffError) {
      console.error('Error counting staff:', staffError);
    } else {
      console.log(`👥 Total staff in database: ${staffCount}`);
    }

    return { students: studentCount || 0, staff: staffCount || 0 };
  } catch (error) {
    console.error('❌ Verification failed:', error);
    return { students: 0, staff: 0 };
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting comprehensive data import process...');
  console.log('📁 Files to import:');
  console.log('   - STUDENTS.csv (281 records)');
  console.log('   - staffs.csv (87 records)');
  console.log('');
  
  // Check if user wants to clear existing data
  const shouldClear = process.argv.includes('--clear');
  
  if (shouldClear) {
    await clearExistingData();
  }
  
  try {
    // Import both datasets
    const studentsImported = await importStudentData();
    const staffImported = await importStaffData();
    
    // Verify the import
    await verifyImport();
    
    console.log('');
    console.log('🎉 Import process completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Students imported: ${studentsImported}`);
    console.log(`   - Staff imported: ${staffImported}`);
    console.log(`   - Total records: ${studentsImported + staffImported}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Import process failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { importStudentData, importStaffData, clearExistingData }; 