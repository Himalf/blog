import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wbjgvyzeqirlsfebwzri.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indiamd2eXplcWlybHNmZWJ3enJpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjUwNjQ0NCwiZXhwIjoyMDYyMDgyNDQ0fQ.AxekTqHepn86Vd3bP0w5IIXRHzkH-g-iqVad3ozv6WY";

export const supabase = createClient(supabaseUrl, supabaseKey);
