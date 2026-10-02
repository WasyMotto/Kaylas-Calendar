import {supabaseServer} from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const body = await req.json();
  const{user_id: user_id, date, notes, client_hours, admin_hours} = body;

    const supabase = supabaseServer();
    
    const { data, error } = await supabase
        .from('time_entries')
        .insert({
            user_id,
            date,
            client_hours,
            admin_hours,
            notes,
        })
        .select();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
}