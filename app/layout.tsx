import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar';

export const metadata: Metadata = {
  title: 'Airbnb',
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
        <Navbar />
        {children}
      </body>
    </html>
  )
}
