import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yjapdyafcvnatxzkqtcx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqYXBkeWFmY3ZuYXR4emtxdGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4Mjk1ODUsImV4cCI6MjAwNjQwNTU4NX0._xTjlSZw-oNqVs9A-3G9IygOHsknxVCR3FUmeJ1gZGk';

const supabase = createClient(supabaseUrl, supabaseKey);

export {supabase};