'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader } from 'lucide-react';

// Schema di validazione
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Insert a valid email' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error sending the message. Retry.');
      }

      // Successo
      setSuccess(true);
      reset();

      // Reset del messaggio di successo dopo 5 secondi
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected problem. Retry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> {/* Aumentato lo spazio tra gli elementi */}
      {/* Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2"> {/* Testo label grigio chiaro */}
          Name
        </label>
        <input
          id="name"
          type="text"
          className={`bg-zinc-800 border border-zinc-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.name ? 'border-red-500' : ''}`}
          {...register('name')}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2"> {/* Testo label grigio chiaro */}
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`bg-zinc-800 border border-zinc-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.email ? 'border-red-500' : ''}`} 
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p> 
        )}
      </div>

      {/* Messaggio */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2"> {/* Testo label grigio chiaro */}
          Message
        </label>
        <textarea
          id="message"
          className={`bg-zinc-800 border border-zinc-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.message ? 'border-red-500' : ''}`}
          rows={4}
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Messaggi di stato */}
      {error && (
        <div className="p-3 bg-red-900 border border-red-700 text-red-400 rounded-md"> {/* Errore scuro */}
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-900 border border-green-700 text-green-400 rounded-md"> {/* Successo scuro */}
          Your message has been sent!
        </div>
      )}

      {/* Pulsante di invio */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`inline-flex items-center justify-center py-3 px-6 rounded-md shadow-sm text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`} 
      >
        {isSubmitting ? (
          <>
            <Loader className="animate-spin mr-2 h-4 w-4" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}