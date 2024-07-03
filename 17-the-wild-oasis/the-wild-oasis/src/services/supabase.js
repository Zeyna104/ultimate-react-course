import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://afcofqoyoavfzctgfqvx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmY29mcW95b2F2ZnpjdGdmcXZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNDg4NDUsImV4cCI6MjAzMjkyNDg0NX0.0iRGjburiy2hRxNpW0JwFvfhuvhmRU08uDCBGxABtoE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
