'use client'

import { useState } from 'react'
import { useWallet } from '../components/WalletProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function MyProducts() {
  const { address } = useWallet()
  const { toast } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    image: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setNewProduct({ ...newProduct, image: event.target.result as string })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const productId = `PROD-${Date.now()}`
    const product = { ...newProduct, id: productId }
    setProducts([...products, product])
    setNewProduct({ name: '', description: '', image: '' })
    toast({
      title: "Product Added",
      description: `${product.name} has been added successfully.`,
    })
  }

  const generateEmbedCode = (productId: string) => {
    return `<div id="blockmonials" data-product-id="${productId}"></div>
<script src="https://blockmonials.com/embed.js"></script>`
  }

  if (!address) {
    return <div className="text-center text-gray-600">Please connect your wallet to view your products.</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">My BlockMonials Products</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Add New Product</CardTitle>
          <CardDescription>Enter the details of your new product</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>
            <Button type="submit">Add Product</Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-primary">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {product.image && (
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
              )}
              <p className="text-gray-600">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(generateEmbedCode(product.id))
                toast({
                  title: "Embed Code Copied",
                  description: "The embed code has been copied to your clipboard.",
                })
              }}>
                Copy Embed Code
              </Button>
              <Button variant="outline">View Testimonials</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

