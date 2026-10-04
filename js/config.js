// Cloud accounts (Supabase). Leave the keys empty to keep accounts and progress in this browser only.
// The anon key is public by design; row-level security in supabase/schema.sql protects each learner's row.
DJ.config = {
  supabaseUrl: 'https://fjecrnxhnykwkcleegvc.supabase.co',
  supabaseAnonKey: 'sb_publishable_dQ0xHThS4Ez6TrPb5qZ0DA_uGaOmYj-',
  // Cloud login runs only on these hosts (the claude.ai preview cannot reach Supabase).
  cloudHosts: ['olzhaa.github.io']
};
