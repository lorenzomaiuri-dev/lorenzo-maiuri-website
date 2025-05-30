import Link from 'next/link';
import { SiLinkedin, SiGithub, SiKaggle, SiHuggingface } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-800 text-white py-8">
      <div className="container-custom mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {currentYear} Lorenzo Maiuri. All rights reserved.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Link di navigazione principali */}
            <div className="flex space-x-6">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-200">
                Home
              </Link>
              <Link href="/services" className="text-white hover:text-gray-300 transition-colors duration-200">
                Services
              </Link>
              <Link href="/projects" className="text-white hover:text-gray-300 transition-colors duration-200">
                Projects
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