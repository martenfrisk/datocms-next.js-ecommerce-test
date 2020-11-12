// import { useState } from "react";
import Link from 'next/link';

export default function Nav() {
//   const [burgerVisible, setBurgerVisible] = useState(false);
  return (
    <ul className="flex justify-center w-full space-x-10 md:w-auto md:mr-4">
      <li>
        <Link href="/all-games">
          <a className="hover:underline">Browse</a>
        </Link>
      </li>
      {/* <li>
        <Link href="/studios">
          <a className="hover:underline">Studios</a>
        </Link>
      </li>
      <li>
        <Link href="/discounts">
          <a className="hover:underline">Discounts</a>
        </Link>
      </li> */}
    </ul>
  );
}
