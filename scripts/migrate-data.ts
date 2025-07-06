// Data migration script to populate Supabase with CSV data
import { DatabaseService } from '../lib/database'

// Staff data from staffs.csv
const staffData = [
  {
    name: "Agrippino Giuseppe Aiello",
    email: "Aiello.giuseppe2002@gmail.com",
    cellphone: "+39 3927213178",
    igreja: "Sabaoth Busto",
    country: "Italy",
    nationality: "Italy",
    area: "worship + Apoio",
    kit_cama: "YES",
    quarto: "47",
    healthy_form: "YES"
  },
  {
    name: "Ailyn Torres",
    email: "aylinxe@gmail.com",
    cellphone: "+34 658533143",
    igreja: "",
    country: "Spain",
    nationality: "Colombia",
    area: "Multimidia + intercessão",
    kit_cama: "",
    quarto: "55",
    healthy_form: "YES"
  },
  // Add all your staff data here...
  // I'll show you how to convert the full CSV below
]

// Student data from STUDENTS.csv
const studentData = [
  {
    name: "Amy Dal Buono Diabaté",
    status: "FULLY PAID",
    gender: "Female / Feminino",
    email: "diabate.amy412@gmail.com",
    phone: "662333623",
    age: "30",
    country: "France",
    nationality: "France",
    language: "English, French, Italian",
    church: "",
    room: "RUTH - 29",
    bed_kit: "0",
    bus: "TRUE",
    documents: "TRUE",
    underage_doc: "N/A",
    healthy_form: "TRUE",
    obs: ""
  },
  // Add all your student data here...
]

export async function migrateStaffData() {
  console.log('Migrating staff data...')
  const success = await DatabaseService.insertStaffData(staffData)
  if (success) {
    console.log(`Successfully migrated ${staffData.length} staff members`)
  } else {
    console.error('Failed to migrate staff data')
  }
  return success
}

export async function migrateStudentData() {
  console.log('Migrating student data...')
  const success = await DatabaseService.insertStudentData(studentData)
  if (success) {
    console.log(`Successfully migrated ${studentData.length} students`)
  } else {
    console.error('Failed to migrate student data')
  }
  return success
}

// Helper function to convert CSV row to staff object
export function csvRowToStaff(csvRow: string): any {
  const [name, email, cellphone, igreja, country, nationality, area, kit_cama, quarto, healthy_form] = csvRow.split(';')
  return {
    name: name?.trim() || '',
    email: email?.trim() || null,
    cellphone: cellphone?.trim() || null,
    igreja: igreja?.trim() || null,
    country: country?.trim() || null,
    nationality: nationality?.trim() || null,
    area: area?.trim() || null,
    kit_cama: kit_cama?.trim() || null,
    quarto: quarto?.trim() || null,
    healthy_form: healthy_form?.trim() || null
  }
}

// Helper function to convert CSV row to student object
export function csvRowToStudent(csvRow: string): any {
  const [name, status, gender, email, phone, age, country, nationality, language, church, room, bed_kit, bus, documents, underage_doc, healthy_form, obs] = csvRow.split(';')
  return {
    name: name?.trim() || '',
    status: status?.trim() || null,
    gender: gender?.trim() || null,
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    age: age?.trim() || null,
    country: country?.trim() || null,
    nationality: nationality?.trim() || null,
    language: language?.trim() || null,
    church: church?.trim() || null,
    room: room?.trim() || null,
    bed_kit: bed_kit?.trim() || null,
    bus: bus?.trim() || null,
    documents: documents?.trim() || null,
    underage_doc: underage_doc?.trim() || null,
    healthy_form: healthy_form?.trim() || null,
    obs: obs?.trim() || null
  }
}

// Run migration (you'll call this once after setting up Supabase)
async function runMigration() {
  await migrateStaffData()
  await migrateStudentData()
  console.log('Migration completed!')
}

if (require.main === module) {
  runMigration().catch(console.error)
} 