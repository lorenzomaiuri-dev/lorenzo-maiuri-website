
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader } from 'lucide-react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react19-google-recaptcha-v3';

// Validation schema for the contact form
const contactSchema = z.object({
  user_name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50, { message: 'Name must be at most 50 characters' }),
  user_email: z.string().email({ message: 'Insert a valid email' }),
  user_company: z.string().max(50, { message: 'Company must be at most 50 characters' }).optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }).max(5000, { message: 'Message must be at most 5000 characters' }),
  recaptchaToken: z.string().min(1, { message: 'reCAPTCHA verification failed. Please try again.' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

function InnerContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });


  const generateRecaptchaToken = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    const token = await executeRecaptcha('contact_form_submission');
    setValue('recaptchaToken', token);
  }, [executeRecaptcha, setValue]);

  useEffect(() => {
    generateRecaptchaToken();
  }, [generateRecaptchaToken]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await generateRecaptchaToken();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error sending the message. Retry.');
      }
      
      setSuccess(true);
      reset();
      generateRecaptchaToken();
      
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <input
          id="user_name"
          type="text"
          className={`bg-zinc-800 border border-zinc-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.user_name ? 'border-red-500' : ''}`}
          {...register('user_name')}
        />
        {errors.user_name && (
          <p className="mt-1 text-sm text-red-500">{errors.user_name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="user_company" className="block text-sm font-medium text-gray-300 mb-2">
          Company
        </label>
        <input
          id="user_company"
          type="text"
          className={`bg-zinc-800 border border-zinc-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.user_company ? 'border-red-500' : ''}`}
          {...register('user_company')}
        />
        {errors.user_company && (
          <p className="mt-1 text-sm text-red-500">{errors.user_company.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="user_email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <input
          id="user_email"
          type="email"
          className={`bg-zinc-800 border border-zinc-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.user_email ? 'border-red-500' : ''}`} 
          {...register('user_email')}
        />
        {errors.user_email && (
          <p className="mt-1 text-sm text-red-500">{errors.user_email.message}</p> 
        )}
      </div>      
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
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
      
      <input type="hidden" {...register('recaptchaToken')} />
      {errors.recaptchaToken && (
        <p className="mt-1 text-sm text-red-500">{errors.recaptchaToken.message}</p>
      )}
      
      {error && (
        <div className="p-3 bg-red-900 border border-red-700 text-red-400 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-900 border border-green-700 text-green-400 rounded-md">
          Your message has been sent! I will get back to you as soon as possible. You can chat with LorenzoBot as well while you wait.
        </div>
      )}
      
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

export default function ContactForm() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined. reCAPTCHA will not work.');
    return (
      <div className="text-red-500 text-center">
        Error: reCAPTCHA site key is missing. Please configure your environment variables.
      </div>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <InnerContactForm />
    </GoogleReCaptchaProvider>
  );
}