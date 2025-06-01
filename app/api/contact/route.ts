import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation scheme
const contactSchema = z.object({
  user_name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
  user_email: z.string().email('Invalid email address'),
  user_company: z.string().max(50, 'Company name cannot exceed 50 characters').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message cannot exceed 5000 characters'),
  recaptchaToken: process.env.NEXT_PUBLIC_USE_CAPTCHA == "true"
    ? z.string().min(1, 'reCAPTCHA token is missing.')
    : z.string().optional(),
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
    
    if (process.env.NEXT_PUBLIC_USE_CAPTCHA == "true") {
      const { recaptchaToken } = result.data; 
      const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!recaptchaSecretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not defined.');
      return NextResponse.json(
        { error: 'Server configuration error: reCAPTCHA secret key is missing.' },
        { status: 500 }
      );
    }

    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const recaptchaResponse = await fetch(recaptchaVerifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.2) {
      console.error('reCAPTCHA verification failed:', recaptchaData);
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 403 }
      );
    }
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
    return NextResponse.json(
      { error: 'Failed to send message due to an internal server error.' },
      { status: 500 }
    );
  }
}