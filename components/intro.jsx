import { CMS_NAME, CMS_URL } from "../lib/constants";
import UserButtons from "./user-buttons";

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-4 md:mb-12 justify-start">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Games.
      </h1>
      <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
        <h4 className="text-center md:text-right w-64  text-sm  md:mr-6 order-last md:order-first mt-4 md:mt-0 ">
          A statically generated e-commerce site using{" "}
          <a
            href="https://nextjs.org/"
            className="underline hover:text-success duration-200 transition-colors"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            href={CMS_URL}
            className="underline hover:text-success duration-200 transition-colors"
          >
            {CMS_NAME}
          </a>
          .
        </h4>
        <UserButtons />
      </div>
    </section>
  );
}
