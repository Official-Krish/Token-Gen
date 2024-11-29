import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, Cpu, Lock, Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 flex items-center justify-center">
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Create Your Own <span className="text-blue-600">Cryptocurrency</span>
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Generate custom cryptocurrencies with ease. No coding required. Launch your token in minutes.
                            </p>
                        </div>
                        <div className="space-x-4">
                            <Button size="lg">Get Started</Button>
                            <Button size="lg" variant="outline">Learn More</Button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                            <Cpu className="h-8 w-8 mb-2 text-blue-600" />
                            <CardTitle>Custom Token Generation</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-gray-500">Create your own token with customizable parameters and features.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                            <Lock className="h-8 w-8 mb-2 text-blue-600" />
                            <CardTitle>Secure & Compliant</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-gray-500">Built-in security features and regulatory compliance checks.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                            <Zap className="h-8 w-8 mb-2 text-blue-600" />
                            <CardTitle>Instant Deployment</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <p className="text-gray-500">Deploy your cryptocurrency to the blockchain in minutes.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
                            <h3 className="text-xl font-bold mb-2">Configure</h3>
                            <p className="text-gray-500">Set your token's name, symbol, supply, and other parameters.</p>
                        </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
                            <h3 className="text-xl font-bold mb-2">Customize</h3>
                            <p className="text-gray-500">Add features like minting, burning, or transfer restrictions.</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
                            <h3 className="text-xl font-bold mb-2">Launch</h3>
                            <p className="text-gray-500">Deploy your token to the blockchain with one click.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">Pricing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                            <CardTitle>Basic</CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold">$99</span> / month
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Standard ERC-20 Token
                                </li>
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Basic Customization
                                </li>
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Deployment to Testnet
                                </li>
                            </ul>
                            <Button className="w-full">Choose Basic</Button>
                            </CardContent>
                        </Card>
                        <Card className="border-blue-600">
                            <CardHeader>
                            <CardTitle className="text-blue-600">Pro</CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold">$299</span> / month
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Advanced ERC-20 Token
                                </li>
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Full Customization
                                </li>
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Deployment to Mainnet
                                </li>
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Priority Support
                                </li>
                            </ul>
                            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Choose Pro</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                            <CardTitle>Enterprise</CardTitle>
                            <CardDescription>
                                <span className="text-3xl font-bold">Custom</span> pricing
                            </CardDescription>
                            </CardHeader>
                            <CardContent>
                            <ul className="space-y-2 mb-4">
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Custom Token Development
                                </li>
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Advanced Features
                                </li>
                                <li className="flex items-center">
                                <ChevronRight className="mr-2 h-4 w-4 text-blue-600" />
                                    Dedicated Support Team
                                </li>
                            </ul>
                            <Button className="w-full" variant="outline">Contact Sales</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Create Your Cryptocurrency?</h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
                            Get started now and launch your custom token in minutes.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input
                                    className="max-w-lg flex-1"
                                    placeholder="Enter your email"
                                    type="email"
                                />
                                <Button type="submit">Get Started</Button>
                            </form>
                            <p className="text-xs text-gray-500">
                                By signing up, you agree to our{" "}
                                <Link className="underline underline-offset-2 hover:text-blue-500" href="#">
                                    Terms & Conditions
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
  )
}

