import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ShieldCheck, Star, Zap } from 'lucide-react'
import { Logo } from './components/Logo'

export default function Home() {
  return (
<div className="flex flex-col items-center justify-start py-2 px-4 sm:px-6 lg:px-8">
<div className="mb-4">
        <Logo />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Welcome to BlockMonials</h1>
      <p className="text-xl mb-12 text-center max-w-2xl text-gray-600">
        Revolutionizing trust in e-commerce with blockchain-verified product reviews
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="mr-2 h-6 w-6 text-blue-500" />
              Verified Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Every testimonial is securely stored on the blockchain, ensuring authenticity and preventing fraud.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-6 w-6 text-yellow-500" />
              Boost Credibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Showcase genuine customer experiences to build trust and increase conversions for your products.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-6 w-6 text-green-500" />
              Easy Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Seamlessly embed blockchain-verified testimonials on your website with our simple embed code.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/my-products">
          <Button variant="outline"className="w-full sm:w-auto">
            For Sellers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link href="/explore">
          <Button className="w-full sm:w-auto">
            For Buyers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">How BlockMonials Works</h2>
        <ol className="list-decimal list-inside text-left max-w-2xl mx-auto space-y-2 text-gray-600">
          <li>Sellers list their products and receive a unique embed code.</li>
          <li>Buyers purchase products and leave blockchain-verified reviews.</li>
          <li>Testimonials are securely stored and displayed on the seller's website.</li>
          <li>Future customers can trust the authenticity of the reviews.</li>
        </ol>
      </div>
      
    </div>
  )
}

