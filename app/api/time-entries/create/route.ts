import {supabaseServer} from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const body = await req.json();
  const{user_id: user_id, date, start_time, end_time, hours_worked, category, notes, created_at, updated_at} = body;

  if(!hours_worked && !start_time && !end_time){
    return Response.json(
        {error: "Must input either Hours Worked or Start and End Time."},
        {status: 400}
    );
  }

  let computedHoursWorked = hours_worked;
  if(start_time && end_time){
    const startTime = new Date('1970-01-01T${start_time}:00');
    const endTime = new Date('1970-01-01T${end_time}:00');
    const timeDifference = endTime.getTime() - startTime.getTime();
    computedHoursWorked = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
  }

    const supabase = supabaseServer();
    const { data, error } = await supabase
        .from('time_entries')
        .insert({
            user_id,
            date,
            start_time, 
            end_time,
            hours_worked: computedHoursWorked,
            category,
            notes,
            updated_at: new Date().toISOString(),
        })
        .select();

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
}