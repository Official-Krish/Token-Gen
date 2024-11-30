import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { tokenAddress, publicKey } = await req.json();
    const connection = new Connection("https://api.devnet.solana.com");
    const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SECRET_KEY!)));
    const mintPublicKey = new PublicKey(tokenAddress);
    const key = new PublicKey(publicKey);
    if (!tokenAddress || !publicKey) {
        return { msg: "Invalid input parameters" };
    }
    try{
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mintPublicKey,
            key
        );
        return NextResponse.json({
            msg: "Wallet created successfully",
            tokenAccount: tokenAccount.address.toBase58(),
        });
    } catch (e: any) {
        return NextResponse.json({ msg: e.message }, { status: 400 });
    }
}