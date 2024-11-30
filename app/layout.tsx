import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from './components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { WalletProvider } from './components/WalletProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BlockMonials',
  description: 'A blockchain-based testimonial service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <WalletProvider>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="mt-auto">
              <div className="container mx-auto px-4">
                <div className="border-t border-gray-200 py-6 text-center text-gray-500">
                  Built with ❤️ by Stanish4Ever
                </div>
              </div>
            </footer>
            <Toaster />
          </WalletProvider>
        </div>
      </body>
    </html>
  )
}

