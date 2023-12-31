import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences',
}

const font = Nunito({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        
        <ClientOnly>
          {/* <Modal actionLabel="Submit" title="Hello World" isOpen /> */}
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        
        {children}
      </body>
    </html>
  )
}
