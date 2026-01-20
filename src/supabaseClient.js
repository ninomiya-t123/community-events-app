import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jbhqplcnlwxxxrqfbgmp.supabase.co';
const supabaseAnonKey = 'sb_publishable_zSmucfz8OlKHaqjK0P71hA_11ywvysY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
