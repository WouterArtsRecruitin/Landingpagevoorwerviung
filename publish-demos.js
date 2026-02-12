import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vaiikkhaulkqdknwvroj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaWlra2hhdWxrcWRrbnd2cm9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNDM2MzcsImV4cCI6MjA4NTkxOTYzN30.pJLsXDZvwNdMBQXVZQpU0EaF_7QVeXOQZm0_lqE5H8I'
);

async function publishDemos() {
  console.log('📢 Publishing demo pages...');

  const { data, error } = await supabase
    .from('landing_pages')
    .update({
      status: 'published',
      published_at: new Date().toISOString()
    })
    .or('slug.ilike.%techvision%,slug.ilike.%greencapital%,slug.ilike.%careplus%,slug.ilike.%precision%,slug.ilike.%supernova%')
    .select('slug, page_title');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`✅ Published ${data.length} pages:`);
  data.forEach(page => {
    console.log(`   • ${page.page_title}`);
    console.log(`     → http://localhost:3002/v/${page.slug}`);
  });
}

publishDemos();
