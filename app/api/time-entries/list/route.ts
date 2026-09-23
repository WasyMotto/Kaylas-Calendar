import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const body = await req.json();
  const { user_id, start_date, end_date } = body;

  if (!user_id) {
    return Response.json(
      { error: 'Missing required field: user_id' },
      { status: 400 }
    );
  }

  const supabase = supabaseServer();

  let query = supabase
    .from('time_entries')
    .select('*')
    .eq('user_id', user_id);

  // Optional date filtering
  if (start_date) {
    query = query.gte('date', start_date);
  }

  if (end_date) {
    query = query.lte('date', end_date);
  }

  // Sort by date, then start_time
  query = query.order('date', { ascending: true })
               .order('start_time', { ascending: true });

  const { data, error } = await query;

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ data });
}
