import { NextResponse } from 'next/server'
import { z } from 'zod'
import emailjs from '@emailjs/browser'

// Validation scheme
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
})

export async function POST(req: Request) {
  try {    
    const body = await req.json()
    const result = contactSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.format() },
        { status: 400 }
      )
    }
    
    const { name, email, message } = result.data
    
    // Qui inserisci la logica per inviare l'email
    // Esempio con EmailJS (richiede configurazione)
    /*
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        name,
        email,
        message,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
      }
    )
    */
    
    // Per ora simuliamo un invio di successo
    // TODO: Implementare il vero servizio email
    
    // Simula un ritardo di rete
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}