const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_KEY } = require("../config");

// this gets created once at build time for all users to access?
const dbClient = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = dbClient;
