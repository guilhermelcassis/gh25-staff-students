import { createClient } from '@supabase/supabase-js';
import { csvData } from '../data/staffData';
import { parseCSVToStaff } from '../utils/csvParser';
import * as dotenv from 'dotenv';
import * as path from 'path';

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

async function importStudentData() {
  console.log('Starting data import...');
  
  try {
    // Parse CSV data
    const students = parseCSVToStaff(csvData);
    console.log(`Parsed ${students.length} students from CSV`);

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

    // Insert data in batches (Supabase has a limit of 1000 rows per insert)
    const batchSize = 100;
    let inserted = 0;

    for (let i = 0; i < supabaseStudents.length; i += batchSize) {
      const batch = supabaseStudents.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('students')
        .insert(batch);

      if (error) {
        console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
        throw error;
      }

      inserted += batch.length;
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${inserted}/${supabaseStudents.length} students`);
    }

    console.log(`✅ Successfully imported ${inserted} students to Supabase!`);

    // Verify the import
    const { count, error: countError } = await supabase
      .from('students')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Error verifying import:', countError);
    } else {
      console.log(`📊 Total students in database: ${count}`);
    }

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

async function clearExistingData() {
  console.log('Clearing existing student data...');
  
  const { error } = await supabase
    .from('students')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine
    console.error('Error clearing data:', error);
    throw error;
  }

  console.log('✅ Existing data cleared');
}

// Main execution
async function main() {
  console.log('🚀 Starting Supabase data import process...');
  
  // Ask user if they want to clear existing data
  const shouldClear = process.argv.includes('--clear');
  
  if (shouldClear) {
    await clearExistingData();
  }
  
  await importStudentData();
  
  console.log('🎉 Import process completed successfully!');
  process.exit(0);
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { importStudentData, clearExistingData }; 