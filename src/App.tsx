/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3Ccu2UEoSrZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Image } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../src/assets/logo.png";
import landing_page from "../src/assets/landing_page.webp";

// https://ide.betteridea.dev/import?id=NJa2cC8gYN9riAvrPFoMuDUbhyV3y4kf7woeGKdFEgg

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 mt-8 lg:px-6 h-14 flex justify-center items-center">
        <Link to="/" className="flex items-center justify-center">
          <Image className="h-12 sm:h-14 md:h-16 lg:h-20" src={logo} alt="Logo" />
          <span className="sr-only">Public Infrastructure App</span>
        </Link>
        {/* <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            Examples
          </Link>
          <Link to="#" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav> */}
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-24 lg:py-24">
          <div className="m-auto container px-4 md:px-6 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Crowdsource Public Infrastructure Monitoring</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Empowering citizens to document and report the state of their local infrastructure using the Arweave blockchain to cause real change.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  to="/map"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                >
                  See Current Issues
                </Link>
              </div>
            </div>
            <img src={landing_page} width="550" height="550" alt="Hero" className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last" />
          </div>
        </section>
      </main>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 Public Infrastructure App. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer> */}
    </div>
  );
}
