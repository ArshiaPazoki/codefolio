import Link from 'next/link'
import { ContactForm } from '../../features/contact/ui/ContactForm'
import { VscMail, VscGithub, } from 'react-icons/vsc'
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter,FaLinkedin  } from "react-icons/fa6";
import { TbBrandGravatar } from 'react-icons/tb';
export const metadata = {
  title: 'Contact | CodeFolio',
  description: 'Get in touch with Arshia Pazoki',
}

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2">Contact Me</h1>
      <p className="text-gray-400 mb-8 text-center max-w-xl">
        Have a question, a project idea or just want to say hi? Fill out the form below
        or reach me directly at{' '}
        <a
          href="mailto:arshia@example.com"
          className="text-[#569CD6] hover:underline inline-flex items-center space-x-1"
        >
          <VscMail /> <span>arshiapazoki2000@gmail.com</span>
        </a>
      </p>

      <div className="w-full max-w-xl">
        <ContactForm />
      </div>

      <div className="p-4 flex space-x-6 text-[#858585]">
        <div className="flex space-x-1 hover:text-white"> 
        <VscGithub size={24} />
        <Link
          href="https://github.com/ArshiaPazoki"
          target="_blank"
          className="transition"
          >
          GitHub
        </Link>
            </div>
        <div className="flex space-x-1 hover:text-white"> 
        <FaLinkedin  size={24} />
        <Link
          href="https://linkedin.com/in/arshia-pazoki"
          target="_blank"
          className="transition"
          >
          LinkedIn
        </Link>
            </div>
        <div className="flex space-x-1 hover:text-white"> 
        <FaXTwitter size={24} />
        <Link
          href="https://x.com/ArshiaPazoki"
          target="_blank"
          className="transition"
          >
          X
        </Link>
            </div>
        <div className="flex space-x-1 hover:text-white"> 
        <FaTelegramPlane size={24} />
        <Link
          href="https://t.me/ArshiaPazoki"
          target="_blank"
          className="transition"
          >
          Telegram
        </Link>
            </div>
        <div className="flex space-x-1 hover:text-white"> 
        <TbBrandGravatar size={24} />
        <Link
          href="https://gravatar.com/arshiapazoki"
          target="_blank"
          className="transition"
          >
          Gravatar
        </Link>
            </div>
      </div>
    </section>
  )
}
