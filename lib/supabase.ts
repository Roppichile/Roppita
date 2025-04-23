import { createClient } from "@supabase/supabase-js"

// NOTA: Hardcodear credenciales es solo para desarrollo
// En producción, usa variables de entorno
const supabaseUrl = "https://jjrcvdenjuivwlyxtemd.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqcmN2ZGVuanVpdndseXh0ZW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDAzNjEsImV4cCI6MjA2MDkxNjM2MX0.L52jZPoH1zRRXqdXsHqLRh4AuD__jkWxeTQaCO5YjB8"

export const supabase = createClient(supabaseUrl, supabaseKey)
