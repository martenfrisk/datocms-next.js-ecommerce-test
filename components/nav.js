import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [burgerVisible, setBurgerVisible] = useState(false);
  return (
        <ul className="flex w-full md:w-auto justify-between space-x-10 md:mr-16">
            <li>
                <Link href="/all-games">
                    <a className="hover:underline">Products</a>
                </Link>
            </li>
            <li>
                <Link href="/studios">
                    <a className="hover:underline">Studios</a>
                </Link>
            </li>
            <li>
                <Link href="/discounts">
                    <a className="hover:underline">Discounts</a>
                </Link>
            </li>
        </ul>
  );
}
