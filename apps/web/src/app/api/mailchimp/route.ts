import mailchimp from '@mailchimp/mailchimp_marketing'
import { NextRequest, NextResponse } from 'next/server'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
})

export async function GET() {
  return NextResponse.json({ message: 'Mailchimp API route is working' })
}

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.MAILCHIMP_API_KEY) {
      console.log('ERROR: MAILCHIMP_API_KEY not configured');
      return NextResponse.json({ error: 'Mailchimp API key not configured' }, { status: 400 })
    }
    if (!process.env.MAILCHIMP_API_SERVER) {
      console.log('ERROR: MAILCHIMP_API_SERVER not configured');
      return NextResponse.json({ error: 'Mailchimp API server not configured' }, { status: 400 })
    }
    if (!process.env.MAILCHIMP_AUDIENCE_ID) {
      console.log('ERROR: MAILCHIMP_AUDIENCE_ID not configured');
      return NextResponse.json({ error: 'Mailchimp audience ID not configured' }, { status: 400 })
    }

    const body = await request.json()
    console.log('Received request body:', body)
    
    if (!body.email) {
      console.log('Email validation failed - body:', body)
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Only include merge fields that have values
    const mergeFields: any = {}
    if (body.name && body.name.trim()) {
      mergeFields.FNAME = body.name.trim()
    }

    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: body.email,
        status: 'subscribed',
        merge_fields: mergeFields
      },
    )

    return NextResponse.json({ success: true, data: response })
  } catch (error: any) {
    console.error('Mailchimp API error:', error)
    
    // Handle different types of errors
    if (error.response?.text) {
      try {
        const errorData = JSON.parse(error.response.text)
        console.log('Mailchimp error details:', errorData)
        return NextResponse.json({ error: errorData }, { status: error.response.status || 500 })
      } catch (parseError) {
        return NextResponse.json({ error: 'Invalid response from Mailchimp' }, { status: 500 })
      }
    }
    
    return NextResponse.json({ error: 'An unexpected error occurred', details: error.message }, { status: 500 })
  }
}
