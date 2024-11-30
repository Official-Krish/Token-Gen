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
import { toast } from "@/components/ui/use-toast"
import { Loader2, Info, CheckCircle2 } from 'lucide-react'
import axios from 'axios'

export default function MintTokensPage() {
  const [amount, setAmount] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [mintResult, setMintResult] = useState<{ txHash: string; amount: string; walletAddress: string; }>()
  const [mintProgress, setMintProgress] = useState(0)

  const handleSubmit = async () => {
    setIsLoading(true)
    setMintProgress(0)
    if (!amount) return;
    if (!destinationAddress) return;
    try {
    const res = await axios.post(`/api/v1/mint`, {
        amount: amount,
        destination: destinationAddress,
        mint: tokenAddress,
    });
    for (let i = 0; i <= 100; i += 20) {
        setMintProgress(i)
        await new Promise(resolve => setTimeout(resolve, 500))
    }
    if (res.status === 200) {
        const fakeTxHash = `0x${Math.random().toString(36).substr(2, 64)}`
        setMintResult({txHash: fakeTxHash, amount: amount, walletAddress: res.data.tokenAccount});
        setIsDialogOpen(true);
        console.log("Minted");
    } else {
        console.error("Error minting");
    }
    } catch (e: any) {
        console.error(e.message);
        return;
    }finally {
        setIsLoading(false)
        setMintProgress(0)
    }
};

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Mint Your Tokens</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Token Minting Form</CardTitle>
            <CardDescription>Fill in the details to mint your tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount to Mint</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount to mint"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 absolute right-3 top-3 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter the number of tokens you want to mint</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationAddress">Destination Address</Label>
                <div className="relative">
                  <Input
                    id="destinationAddress"
                    type="text"
                    placeholder="Enter destination address"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    required
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 absolute right-3 top-3 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>The address where the minted tokens will be sent</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
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
                        <p>The address of the token contract you want to mint</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Button type="submit" onClick={handleSubmit} className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Minting...
                  </>
                ) : (
                  'Mint Tokens'
                )}
              </Button>
            </div>
          </CardContent>
          {isLoading && (
            <CardFooter>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Minting Progress</span>
                  <span>{mintProgress}%</span>
                </div>
                <Progress value={mintProgress} className="w-full" />
              </div>
            </CardFooter>
          )}
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Minting Guide</CardTitle>
            <CardDescription>Learn about the token minting process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Enter Minting Amount</h3>
                  <p className="text-sm text-gray-500">Specify the number of tokens you want to create.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Provide Destination Address</h3>
                  <p className="text-sm text-gray-500">Enter the wallet address where the new tokens will be sent.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Specify Token Address</h3>
                  <p className="text-sm text-gray-500">Input the address of the token contract you're minting from.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Confirm and Mint</h3>
                  <p className="text-sm text-gray-500">Review your inputs and click 'Mint Tokens' to start the process.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tokens Minted Successfully!</DialogTitle>
            <DialogDescription>
              Your tokens have been minted and sent to the specified address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2 text-green-800">Transaction Details</h4>
              <p className="text-sm text-green-700"><strong>Amount:</strong> {mintResult?.amount} tokens</p>
              <p className="text-sm text-green-700"><strong>Destination:</strong> {destinationAddress}</p>
              <p className="text-sm text-green-700"><strong>Token Address:</strong> {tokenAddress}</p>
              <p className="text-sm text-green-700 break-all"><strong>Transaction Hash:</strong> {mintResult?.txHash}</p>
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

