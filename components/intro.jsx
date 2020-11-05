import Link from "next/link";
import UserButtons from "./user-buttons";
import Nav from "./nav";

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-start md:justify-between mt-20 mb-4 md:mb-12 justify-start">
      <h1 className="text-6xl -mt-8 md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/">Games.</Link>
      </h1>
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row w-full md:w-auto items-start mt-2 md:mt-0">
        <Nav />
        <UserButtons />
      </div>
    </section>
  );
}
