import { createClient } from '@supabase/supabase-js'

// Use SERVICE ROLE KEY on server to perform secure queries when necessary
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default supabase
