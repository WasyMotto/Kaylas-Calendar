import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return Response.json(
      { error: 'Missing required field: id' },
      { status: 400 }
    );
  }

  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from('time_entries')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ data });
}
