'use client'

import Link from 'next/link'
import { useWallet } from './WalletProvider'
// import { Button } from '@shadcn/ui'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const { address, connectWallet, disconnectWallet } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link href="/my-products" className="text-gray-600 hover:text-primary">
              My Products
            </Link>
            <Link href="/explore" className="text-gray-600 hover:text-primary">
              Explore Products
            </Link>
          </div>
          <div className="hidden md:block">
            {address ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
                <Button variant="destructive" onClick={disconnectWallet}>Disconnect</Button>
              </div>
            ) : (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            </Button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-4 space-y-2">
              <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white rounded">
                Home
              </Link>
              <Link href="/my-products" className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white rounded">
                My Products
              </Link>
              <Link href="/explore" className="block px-4 py-2 text-gray-600 hover:bg-primary hover:text-white rounded">
                Explore Products
              </Link>
            </div>
            <div className="pb-4">
              {address ? (
                <div className="px-4 space-y-2">
                  <span className="block text-sm text-gray-600">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
                  <Button variant="destructive" onClick={disconnectWallet} className="w-full">Disconnect</Button>
                </div>
              ) : (
                <div className="px-4">
                  <Button onClick={connectWallet} className="w-full">Connect Wallet</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
