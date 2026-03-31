import Link from "next/link";
import { shopMenu } from "@/data/menu";

export default function Menu() {
    return (
        <nav className="flex gap-6">
            {shopMenu.map((item, index) => (
                <Link key={index} href={item.href} className="hover:text-blue-500">
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}