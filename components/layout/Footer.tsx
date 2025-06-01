import Link from 'next/link';
import { SiLinkedin, SiGithub, SiKaggle, SiHuggingface } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-800 text-white py-8">
      <div className="container-custom mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">&copy; {currentYear} Lorenzo Maiuri. All rights reserved.</p>                        
            {process.env.NEXT_PUBLIC_USE_CAPTCHA === 'true' && (
              <p className="text-xs mt-2 opacity-75">
                This site is protected by reCAPTCHA and the Google
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  className="text-primary-light underline hover:text-gray-300 ml-1"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                {' '}and
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  className="text-primary-light underline hover:text-gray-300 ml-1"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>
                {' '}apply.
              </p>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-6">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-200">
                Home
              </Link>
              <Link href="/services" className="text-white hover:text-gray-300 transition-colors duration-200">
                Services
              </Link>
              <Link href="/projects" className="text-white hover:text-gray-300 transition-colors duration-200">
                Project
              </Link>
            </div>
            
            <div className="w-16 h-px bg-gray-700 md:hidden"></div>
            
            <div className="flex space-x-6">
              <Link
                href="https://www.linkedin.com/in/maiurilorenzo/"
                className="text-white hover:text-[#0A66C2] transition-colors duration-200"
                aria-label="LinkedIn Profile Lorenzo Maiuri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiLinkedin size={24} />
              </Link>
              <Link
                href="https://github.com/lorenzomaiuri-dev"
                className="text-white hover:text-[#333333] transition-colors duration-200"
                aria-label="Github Profile Lorenzo Maiuri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub size={24} />
              </Link>
              <Link
                href="https://huggingface.co/maiurilorenzo"
                className="text-white hover:text-[#FFC107] transition-colors duration-200"
                aria-label="Hugging Face Profile Lorenzo Maiuri"
                target="_blank"
                rel="noopener noreferrer"
              >                
                <SiHuggingface size={24} />
              </Link>
              <Link
                href="https://www.kaggle.com/lorenzomaiuri"
                className="text-white hover:text-[#20BEFF] transition-colors duration-200"
                aria-label="Kaggle Profile Lorenzo Maiuri"
                target="_blank"
                rel="noopener noreferrer"
              >                
                <SiKaggle size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}