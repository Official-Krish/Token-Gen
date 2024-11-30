'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Progress } from "@/components/progress"
import { Loader2, Info, Copy, CheckCircle2, Wallet, Check } from 'lucide-react'
import axios from 'axios'

export default function CreateWalletPage() {
  const [tokenAddress, setTokenAddress] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [creationProgress, setCreationProgress] = useState(0)
  const [tokenAccount, setTokenAccount] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setCreationProgress(0)

    try{
        for (let i = 0; i <= 100; i += 20) {
            setCreationProgress(i)
            await new Promise(resolve => setTimeout(resolve, 500))
        }
        const res = await axios.post("/api/v1/create-wallet", {
            tokenAddress,
            publicKey,
        })
        if(res.status === 200){
            console.log('Wallet created successfully')
            setTokenAccount(res.data.tokenAccount)
            setIsDialogOpen(true)
            setCreationProgress(100)
        }
    } catch (error){
        console.error('Error creating wallet:', error)
    } finally {
        setIsLoading(false)
        setCreationProgress(0)
    }
  }
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }


  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Create Token Wallet</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Wallet Creation Form</CardTitle>
            <CardDescription>Enter the token address and a public key to create a new wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenAddress">Token Address</Label>
                <div className="relative">
                  <Input
                    id="tokenAddress"
                    type="text"
                    placeholder="Enter token address"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    required
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 absolute right-3 top-3 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter the address of the token you want to create a wallet for</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicKey">Public Key</Label>
                <div className="relative">
                  <Input
                    id="publicKey"
                    type="text"
                    placeholder="Enter public key"
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 absolute right-3 top-3 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter a public key to associate with this wallet</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Wallet...
                  </>
                ) : (
                  'Create Wallet'
                )}
              </Button>
            </form>
          </CardContent>
          {isLoading && (
            <CardFooter>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Creation Progress</span>
                  <span>{creationProgress}%</span>
                </div>
                <Progress value={creationProgress} className="w-full" />
              </div>
            </CardFooter>
          )}
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Wallet Creation Guide</CardTitle>
            <CardDescription>Learn about the wallet creation process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Enter Token Address</h3>
                  <p className="text-sm text-gray-500">Provide the address of the token you want to create a wallet for.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Add Public Key</h3>
                  <p className="text-sm text-gray-500">If you have a specific public key, you can associate it with this wallet.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Wallet Generation</h3>
                  <p className="text-sm text-gray-500">Our system will generate a unique wallet address for the specified token.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure Your Private Key</h3>
                  <p className="text-sm text-gray-500">Once generated, make sure to securely store your private key. Never share it with anyone.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Start Using Your Wallet</h3>
                  <p className="text-sm text-gray-500">Your new wallet is ready to receive and send the specified token.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wallet Created Successfully!</DialogTitle>
            <DialogDescription>
                <div className='flex items-center justify-center my-4'>
                    <Check className='h-28 w-28 text-green-500' />
                </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2 text-green-800">Wallet Details</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-green-700"><strong>Wallet Address:</strong></p>
                  <div className="flex items-center space-x-2">
                    <Input value={tokenAccount} readOnly className="bg-white" />
                    <Button size="icon" variant="outline" onClick={() => copyToClipboard(tokenAccount || '')}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-2 p-4 bg-yellow-50 rounded-lg">
              <Wallet className="h-5 w-5 text-yellow-500 mt-0.5" />
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> Store your private key securely. Never share it with anyone. Losing your private key means losing access to your wallet.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

