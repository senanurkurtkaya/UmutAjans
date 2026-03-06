'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const GOLD = '#c9a86a';

const links = [
  {
    href: 'https://wa.me/905XXXXXXXXX?text=Merhaba%20web%20sitesinden%20yazıyorum',
    label: 'WhatsApp',
    icon: FaWhatsapp,
    external: true,
  },
  {
    href: 'tel:+905XXXXXXXXX',
    label: 'Phone',
    icon: Phone,
    external: false,
  },
  {
    href: 'mailto:info@umutajans.com',
    label: 'Email',
    icon: Mail,
    external: false,
  },
  {
    href: 'https://instagram.com/umutajans',
    label: 'Instagram',
    icon: Instagram,
    external: true,
  },
] as const;

function FloatingContact() {
  return (
  <aside
    className="fixed bottom-6 right-4 z-[9999] flex flex-col gap-3 md:bottom-8 md:right-6"
    aria-label="Contact options"
  >
      {links.map(({ href, label, icon: Icon, external }) => (
        <motion.a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c9a86a] [&>svg]:h-6 [&>svg]:w-6"
          style={{ color: GOLD }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon aria-hidden />
        </motion.a>
      ))}
    </aside>
  );
}

export { FloatingContact };
export default FloatingContact;