import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const body = await req.json();
  const {
    id,
    user_id,
    date,
    start_time,
    end_time,
    hours_worked,
    category,
    notes
  } = body;

  if (!id) {
    return Response.json(
      { error: 'Missing required field: id' },
      { status: 400 }
    );
  }

  // Recompute hours if start/end provided
  let computedHours = hours_worked;
  if (start_time && end_time) {
    const start = new Date(`1970-01-01T${start_time}:00`);
    const end = new Date(`1970-01-01T${end_time}:00`);
    computedHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }

  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('time_entries')
    .update({
      user_id,
      date,
      start_time,
      end_time,
      hours_worked: computedHours,
      category,
      notes,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ data });
}
