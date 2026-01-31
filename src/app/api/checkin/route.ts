import { NextRequest, NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { trail_id, party_size, activity_type } = body

    // Validate required fields
    if (!trail_id) {
      return NextResponse.json(
        { error: 'trail_id is required' },
        { status: 400 }
      )
    }

    if (!party_size || party_size < 1 || party_size > 50) {
      return NextResponse.json(
        { error: 'party_size must be between 1 and 50' },
        { status: 400 }
      )
    }

    // TODO: Uncomment when Supabase is configured
    // const supabase = await createClient()
    //
    // const { data, error } = await supabase
    //   .from('check_ins')
    //   .insert({
    //     trail_id,
    //     party_size,
    //     activity_type,
    //   })
    //   .select()
    //   .single()
    //
    // if (error) {
    //   console.error('Check-in error:', error)
    //   return NextResponse.json(
    //     { error: 'Failed to record check-in' },
    //     { status: 500 }
    //   )
    // }

    // Mock response for development
    const mockData = {
      id: crypto.randomUUID(),
      trail_id,
      party_size,
      activity_type,
      checked_in_at: new Date().toISOString(),
    }

    // Get today's count (mock)
    const todayCount = Math.floor(Math.random() * 20) + 5

    return NextResponse.json({
      success: true,
      data: mockData,
      today_count: todayCount,
    })
  } catch (error) {
    console.error('Check-in error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const trail_id = searchParams.get('trail_id')

    // TODO: Uncomment when Supabase is configured
    // const supabase = await createClient()
    //
    // // Get today's check-ins for a trail
    // const today = new Date()
    // today.setHours(0, 0, 0, 0)
    //
    // let query = supabase
    //   .from('check_ins')
    //   .select('party_size')
    //   .gte('checked_in_at', today.toISOString())
    //
    // if (trail_id) {
    //   query = query.eq('trail_id', trail_id)
    // }
    //
    // const { data, error } = await query
    //
    // if (error) {
    //   console.error('Error fetching check-ins:', error)
    //   return NextResponse.json({ error: 'Failed to fetch check-ins' }, { status: 500 })
    // }
    //
    // const totalVisitors = data.reduce((sum, c) => sum + c.party_size, 0)

    // Mock response
    const totalVisitors = Math.floor(Math.random() * 30) + 5

    return NextResponse.json({
      today_count: totalVisitors,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
