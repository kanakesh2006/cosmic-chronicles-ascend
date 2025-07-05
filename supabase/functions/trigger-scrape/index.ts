
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'scrape';
    
    console.log(`Proxy request received for action: ${action}`);

    // Get the service role key from environment
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    
    if (!serviceKey || !supabaseUrl) {
      throw new Error('Missing required environment variables');
    }

    // Make internal request to the scrape-space-events function
    const internalUrl = `${supabaseUrl}/functions/v1/scrape-space-events?action=${action}`;
    
    console.log(`Making internal request to: ${internalUrl}`);
    
    const response = await fetch(internalUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Internal function call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log(`Internal function response:`, data);

    // Return the response to the frontend
    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Proxy function error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error',
        message: 'Failed to trigger scraping function'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
