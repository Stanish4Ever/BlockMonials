'use client'

import Link from 'next/link'
import { useWallet } from './WalletProvider'
import { Button } from '@/components/ui/button'
import { Logo } from './Logo'

export function Navbar() {
  const { address, connectWallet, disconnectWallet } = useWallet()

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Logo />
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
          <div>
            {address ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
                <Button variant="outline" onClick={disconnectWallet}>Disconnect</Button>
              </div>
            ) : (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

