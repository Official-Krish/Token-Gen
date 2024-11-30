import { Bitcoin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Appbar() {
    return <div>
        <header className="px-4 lg:px-6 h-16 flex items-center">
            <Link className="flex items-center justify-center" href="/">
                <Bitcoin className="h-6 w-6 mr-2 text-blue-600" />
                <span className="font-bold text-xl text-gray-900">CryptoGen</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900" href="#features">
                    Features
                </Link>
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900" href="#how-it-works">
                    How It Works
                </Link>
                <Link className="text-sm font-medium text-gray-600 hover:text-gray-900" href="#pricing">
                    Pricing
                </Link>
            </nav>
            <Button className="ml-4" variant="outline">Get Started</Button>
      </header>
    </div>
}