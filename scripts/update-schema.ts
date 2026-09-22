import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addColumn() {
    console.log('Attempting to add menu_pdf_url to settings table...');

    // Supabase JS doesn't have a direct DDL execution method for security reasons.
    // However, if we don't have the CLI or psql, we can try to call a stored RPC
    // or just instruct the user to run it in the SQL Editor.
    // Let's try to query it first to confirm the error.

    const { data, error } = await supabase.from('settings').select('menu_pdf_url').limit(1);

    if (error) {
        console.error('Error confirming column missing (expected):', error.message);

        // Let's try to do a raw REST POST if possible, or just fail gracefully and
        // tell the user to use the dashboard since we can't run raw DDL via the anon/service key API easily.
        console.log('\n======================================================');
        console.log('ACTION REQUIRED:');
        console.log('Please run the following SQL in your Supabase Dashboard SQL Editor:');
        console.log('');
        console.log('ALTER TABLE public.settings ADD COLUMN menu_pdf_url text;');
        console.log('======================================================\n');
    } else {
        console.log('Column already exists! Data:', data);
    }
}

addColumn();
