'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "@/components/ui/use-toast"
import { Check, Copy, Info } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function CreateTokenPage() {
  const router = useRouter();
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [decimals, setDecimals] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [publicKey, setPublicKey] = useState('')
  const [description, setDescription] = useState('')
  const [mintAddress, setMintAddress] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleSubmit = async () => {
    if(!publicKey) return;
    if(!decimals) return;
    console.log("Creating mint");
    const res = await axios.post("/api/v1/CreateMint", { 
        decimals : decimals,
        publicKey: publicKey 
    });
    if(res.status === 200){
        setMintAddress(res.data.mint);
        setIsDialogOpen(true);
        alert("Mint created successfully");
    }
    else{
        console.error("Error creating mint");
    }
}

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mintAddress)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Your Token</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Token Details</CardTitle>
            <CardDescription>Enter the details for your new token</CardDescription>
          </CardHeader>
          <CardContent>
            <div onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenName">Token Name</Label>
                <Input
                  id="tokenName"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="e.g., My Awesome Token"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenSymbol">Token Symbol</Label>
                <Input
                  id="tokenSymbol"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  placeholder="e.g., MAT"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decimals">Decimal Places</Label>
                <Input
                  id="decimals"
                  type="number"
                  value={decimals}
                  onChange={(e) => setDecimals(e.target.value)}
                  placeholder="e.g., 18"
                  min="0"
                  max="18"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalSupply">Total Supply</Label>
                <Input
                  id="totalSupply"
                  type="number"
                  value={totalSupply}
                  onChange={(e) => setTotalSupply(e.target.value)}
                  placeholder="e.g., 1000000"
                  min="1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicKey">Public Key</Label>
                <Input
                  id="publicKey"
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                  placeholder="Enter your public key"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your token's purpose and features"
                />
              </div>
              <Button type="submit" onClick={handleSubmit} className="w-full">Create Token</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Token Preview</CardTitle>
              <CardDescription>See how your token will appear</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {tokenName || 'My Awesome Token'}</p>
                <p><strong>Symbol:</strong> {tokenSymbol || 'MAT'}</p>
                <p><strong>Decimals:</strong> {decimals || '18'}</p>
                <p><strong>Total Supply:</strong> {totalSupply || '1,000,000'}</p>
                <p><strong>Features:</strong> {[
                   'Mintable',
                    'Burnable'
                ].filter(Boolean).join(', ') || 'Standard'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token Creation Guide</CardTitle>
              <CardDescription>Learn about creating your own token</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-token">
                  <AccordionTrigger>What is a token?</AccordionTrigger>
                  <AccordionContent>
                    A token is a digital asset that represents value on a blockchain. Tokens can represent various things, such as currency, assets, or even voting rights in a decentralized organization.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="token-standards">
                  <AccordionTrigger>Token Standards</AccordionTrigger>
                  <AccordionContent>
                    Common token standards include ERC-20 for fungible tokens and ERC-721 for non-fungible tokens (NFTs). These standards ensure compatibility across different platforms and wallets.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="token-properties">
                  <AccordionTrigger>Token Properties</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside">
                      <li>Name: The full name of your token</li>
                      <li>Symbol: A short identifier for your token</li>
                      <li>Decimals: The number of decimal places for token amounts</li>
                      <li>Total Supply: The total number of tokens in circulation</li>
                      <li>Mintable: Allows creation of new tokens after initial distribution</li>
                      <li>Burnable: Allows tokens to be permanently removed from circulation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Token Created Successfully!</DialogTitle>
            <DialogDescription>
              Your token has been created. Here are the details:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Mint Address</h4>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gray-100 rounded-md flex-grow">
                  <p className="text-sm font-mono break-all">{mintAddress}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-shrink-0"
                  onClick={handleCopy}
                >
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Token Details</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Name: {tokenName}</li>
                <li>Symbol: {tokenSymbol}</li>
                <li>Decimal Places: {decimals}</li>
                <li>Total Supply: {totalSupply}</li>
                <li>Creator Public Key: {publicKey}</li>
                <li>Network: Mainnet (simulated)</li>
                <li>Token Standard: ERC-20 (simulated)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Next Steps</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Add liquidity to your token</li>
                <li>Create a token logo and metadata</li>
                <li>List your token on decentralized exchanges</li>
                <li>Promote your token to potential holders</li>
              </ol>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            <Button onClick={() =>router.push("/mint")}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}





