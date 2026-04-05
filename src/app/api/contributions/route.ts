import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { guest_name, activity, amount_cents } = await req.json()

    if (!activity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await supabase.from('honeymoon_contributions').insert({
      guest_name: guest_name ?? null,
      activity,
      amount_cents,
    })

    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contributions] insert error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
