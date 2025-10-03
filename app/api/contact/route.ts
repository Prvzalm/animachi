import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Create transporter for Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'animejahaan@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = contactSchema.parse(body)

    // Check if Gmail credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials not configured')
      return NextResponse.json(
        { error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      )
    }

    // Send email using Gmail SMTP
    const mailOptions = {
      from: `"AniMachi Contact" <${process.env.GMAIL_USER || 'animejahaan@gmail.com'}>`,
      to: 'animejahaan@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            This message was sent from the AniMachi contact form.
          </p>
        </div>
      `,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      messageId: info.messageId,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('Email sending error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}