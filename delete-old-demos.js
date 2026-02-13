#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const OLD_SLUGS = [
  'asml-mechanical-engineer-1',
  'exact-senior-full-stack-developer-1',
  'vdl-groep-cnc-draaier-1',
  'mitsubishi-electric-servicemonteur-koeltechniek-1',
  'bolcom-warehouse-teamlead-1',
  'philips-engineering-manager-1'
];

async function deleteOldDemos() {
  console.log('🗑️  Deleting old 6 template demos...\n');

  const { data, error } = await supabase
    .from('landing_pages')
    .delete()
    .in('slug', OLD_SLUGS)
    .select('slug, page_title');

  if (error) {
    console.error('❌ Error deleting demos:', error);
    return;
  }

  console.log(`✅ Deleted ${data?.length || 0} old demos:`);
  data?.forEach(page => {
    console.log(`   - ${page.slug}: ${page.page_title}`);
  });
}

deleteOldDemos();
