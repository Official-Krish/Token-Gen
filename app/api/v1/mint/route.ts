import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const connection = new Connection("https://api.devnet.solana.com");
    const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.SECRET_KEY!)));

    try {
        const { amount, destination, mint } = await req.json();

        if (!amount || !destination || !mint) {
            return NextResponse.json({ msg: "Invalid input parameters" }, { status: 400 });
        }

        // Convert parameters to PublicKey
        const mintPublicKey = new PublicKey(mint);
        const destinationPublicKey = new PublicKey(destination);

        // Get or create the associated token account
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mintPublicKey,
            destinationPublicKey
        );
        
        // Mint tokens to the associated account
        await mintTo(
            connection,
            payer,
            mintPublicKey,
            tokenAccount.address,
            payer,
            amount
        );

        return NextResponse.json({
            msg: "Minted successfully",
            tokenAccount: tokenAccount.address.toBase58(),
        });
    } catch (e: any) {
        return NextResponse.json({ msg: e.message || String(e) }, { status: 400 });
    }
};
