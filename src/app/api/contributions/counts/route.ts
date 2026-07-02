import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { fetchContributionsForCounts } from '@/lib/contributionInsert'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { global: { fetch: (url, opts) => fetch(url, { ...opts, cache: 'no-store' }) } }
    )

    const data = await fetchContributionsForCounts(supabase)

    const counts: Record<string, number> = {}
    for (const row of data) {
      const completed =
        row.payment_status === 'completed' ||
        row.payment_status == null ||
        row.paypal_order_id != null
      if (!completed) continue
      counts[row.activity] = (counts[row.activity] ?? 0) + 1
    }

    return NextResponse.json(counts, {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (err) {
    console.error('[contributions/counts] fetch error:', err)
    return NextResponse.json({}, { status: 500 })
  }
}
