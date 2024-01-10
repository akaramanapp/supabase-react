import { createClient } from '@supabase/supabase-js';

const supabase = createClient('xxxxx.supabase.co','api-key');

export {
    supabase
};