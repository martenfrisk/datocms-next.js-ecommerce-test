import { CMS_NAME, CMS_URL } from "../lib/constants";
import UserButtons from "./user-buttons";

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 justify-start">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Shop.
      </h1>
      <div className="flex items-center">
        <h4 className="text-center md:text-right w-64 text-sm  md:mr-6 invisible sm:visible">
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
