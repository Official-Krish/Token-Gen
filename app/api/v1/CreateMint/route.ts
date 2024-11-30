import { NextRequest, NextResponse } from "next/server";
import { createMint } from "@solana/spl-token"
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

export const POST = async (req : NextRequest, res: NextResponse) => {
    const connection = new Connection("https://api.devnet.solana.com")
    const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SECRET_KEY!)));
    const { decimals, publicKey } = await req.json();
    const mintAuthority = new PublicKey(publicKey);

    try{
        const mint = await createMint(
            connection,
            payer,
            mintAuthority,
            null,
            decimals
        );
        return NextResponse.json({ mint: mint.toBase58() });
    } catch(e: any){
        return NextResponse.json({ msg : e.message }, { status: 400 });
    }
}