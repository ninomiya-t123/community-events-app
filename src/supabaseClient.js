import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://agnhgorpujrowcgsccqm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmhnb3JwdWpyb3djZ3NjY3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTYyMzYsImV4cCI6MjA3NDUzMjIzNn0.FqjiOtVV5wMdF3O1iTF86Y9b0GU3pgk4qR3RI1iV3VM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
