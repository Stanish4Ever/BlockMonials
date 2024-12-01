'use client'

import { useState } from 'react'
import { useWallet } from '../components/WalletProvider'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { StarRating } from '../components/StarRating'
import Image from 'next/image'

// Mock data for products
const mockProducts = [
  { id: 'PROD-1', name: 'Product 1', description: 'Description for Product 1', image: '/placeholder.svg' },
  { id: 'PROD-2', name: 'Product 2', description: 'Description for Product 2', image: '/placeholder.svg' },
  { id: 'PROD-3', name: 'Product 3', description: 'Description for Product Product 3', image: '/placeholder.svg' },
]

export default function ExploreProducts() {
  const { address } = useWallet()
  const { toast } = useToast()
  const [products] = useState(mockProducts)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [testimonial, setTestimonial] = useState('')

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to submit a testimonial.",
        variant: "destructive",
      })
      return
    }
    if (!selectedProduct) {
      toast({
        title: "No Product Selected",
        description: "Please select a product to submit a testimonial.",
        variant: "destructive",
      })
      return
    }
    // Here you would typically send this data to your blockchain
    console.log({
      productId: selectedProduct,
      rating,
      testimonial,
      userAddress: address,
    })
    toast({
      title: "Testimonial Submitted",
      description: "Your testimonial has been submitted successfully.",
    })
    setRating(0)
    setTestimonial('')
    setSelectedProduct(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Explore BlockMonials Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-primary">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src={product.image}
          alt={product.name}
          layout="responsive"
          width={400} 
          height={300} className="w-full h-48 object-cover mb-4 rounded-md" />
              <p className="text-gray-600">{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setSelectedProduct(product.id)}>
                Provide Testimonial
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedProduct && (
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Submit Testimonial</CardTitle>
            <CardDescription>
              for {products.find(p => p.id === selectedProduct)?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTestimonial} className="space-y-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testimonial">Your Testimonial</Label>
                <Textarea
                  id="testimonial"
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Submit Testimonial</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

