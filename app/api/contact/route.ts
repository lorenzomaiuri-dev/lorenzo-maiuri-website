import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation scheme
const contactSchema = z.object({
  user_name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
  user_email: z.string().email('Invalid email address'),
  user_company: z.string().max(50, 'Company name cannot exceed 50 characters').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message cannot exceed 5000 characters'),
});

export async function POST(req: Request) {
  try {    
    const body = await req.json();
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      console.error('Invalid form data:', result.error.format());
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { user_name, user_email, user_company, message } = result.data;
    
    // Environment variable checks
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error('Email service environment variables are not fully configured.');
      return NextResponse.json(
        { error: 'Email service not configured. Please check server environment variables.' },
        { status: 500 }
      );
    }
    
    // Construct the payload for EmailJS REST API
    const emailJsPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        user_name,
        user_email,
        // Ensure user_company is an empty string if not provided, as templates expect a string
        user_company: user_company || '', 
        message,
      },
    };
    
    // Send email using native fetch to EmailJS REST API endpoint
    const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailJsPayload),
    });
    
    if (emailJsResponse.ok) {
      console.log('Email sent successfully via EmailJS');
      return NextResponse.json({ success: true });
    } else {
      const errorText = await emailJsResponse.text();
      console.error(`EmailJS API error: Status ${emailJsResponse.status}, Response: ${errorText}`);
      return NextResponse.json(
        { error: `Failed to send message via EmailJS. Server responded with status ${emailJsResponse.status}.` },
        { status: emailJsResponse.status }
      );
    }
  } catch (error) {
    console.error('Contact form API handler error:', error);
    // Generic error message to client for security
    return NextResponse.json(
      { error: 'Failed to send message due to an internal server error.' },
      { status: 500 }
    );
  }
}