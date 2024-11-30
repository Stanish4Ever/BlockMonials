'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useToast } from "@/hooks/use-toast"

interface WalletContextType {
  address: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const { toast } = useToast()

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        })
      } catch (error) {
        console.error('Failed to connect wallet:', error)
        toast({
          title: "Connection Failed",
          description: "Failed to connect wallet. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Ethereum wallet.",
        variant: "destructive",
      })
    }
  }

  const disconnectWallet = () => {
    setAddress(null)
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
        } else {
          setAddress(null)
        }
      })
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners('accountsChanged')
      }
    }
  }, [])

  return (
    <WalletContext.Provider value={{ address, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

