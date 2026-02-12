import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://vaiikkhaulkqdknwvroj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaWlra2hhdWxrcWRrbnd2cm9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNDM2MzcsImV4cCI6MjA4NTkxOTYzN30.pJLsXDZvwNdMBQXVZQpU0EaF_7QVeXOQZm0_lqE5H8I'
);

async function publishPage() {
  const { data, error } = await supabase
    .from('landing_pages')
    .update({ 
      status: 'published',
      published_at: new Date().toISOString()
    })
    .eq('slug', 'asml-service-engineer')
    .select();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('✅ Page published:', data);
  }
}

publishPage();
