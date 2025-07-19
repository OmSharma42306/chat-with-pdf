import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  MessageSquare, 
  Zap, 
  Shield, 
  Upload, 
  Brain,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SignInButton,SignUpButton,SignedIn,SignedOut,UserButton} from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <header className="flex justify-between items-center p-4 h-16">
  {/* Left: Logo */}
  <div className="flex items-center space-x-2">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
      <FileText className="h-6 w-6 text-white" />
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      ChatPDF
    </span>
  </div>

  {/* Right: Auth Buttons */}
  <div className="flex items-center space-x-4">
    <SignedOut>
      <SignInButton>
        <button className="bg-gray-100 text-gray-800 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
          Sign In
        </button>
      </SignInButton>
      <SignUpButton>
        <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
          Sign Up
        </button>
      </SignUpButton>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </div>
</header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full">
                  <Brain className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Chat with Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PDFs
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload any PDF document and have intelligent conversations with it. 
              Extract insights, ask questions, and get instant answers from your documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload & Chat Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-2 hover:bg-gray-50">
                <Sparkles className="mr-2 h-5 w-5" />
                See Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ChatPDF?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of document interaction with our advanced AI-powered platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="bg-blue-600 p-3 rounded-lg w-fit">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Intelligent Conversations</CardTitle>
                <CardDescription>
                  Ask questions in natural language and get accurate answers from your PDFs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <div className="bg-purple-600 p-3 rounded-lg w-fit">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
                <CardDescription>
                  Get instant responses with our optimized AI processing engine
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <div className="bg-green-600 p-3 rounded-lg w-fit">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Secure & Private</CardTitle>
                <CardDescription>
                  Your documents are processed securely with end-to-end encryption
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to start chatting with your documents
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Upload Your PDF</h3>
              <p className="text-gray-600">
                Simply drag and drop or click to upload your PDF document
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. AI Processing</h3>
              <p className="text-gray-600">
                Our AI analyzes and understands your document content
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-600 to-red-600 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Start Chatting</h3>
              <p className="text-gray-600">
                Ask questions and get intelligent answers from your PDF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your PDF Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already chatting with their documents
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              <Upload className="mr-2 h-5 w-5" />
              Start Chatting Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">ChatPDF</span>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2024 ChatPDF. Built for learning purposes.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}