import { DiscordLogo, GithubLogo } from "@phosphor-icons/react"
import Link from "next/link";
import { UserAuth } from "../context/AuthContext"
const Header = () => {
  const { ghSignIn, user } = UserAuth();
  const handleSignIn = async () => {
    try {
      await ghSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return <div>
    <section className="flex relative flex-col items-center">
      <div className="absolute left-4 w-72 h-72 w-96 h-96 bg-purple-300 rounded-full opacity-10 animate-blob blur-3xl animation-delay-2000 filter blur-xl"></div>
      <div className="absolute -right-4 w-96 h-96 w-60 h-96 bg-primary rounded-full opacity-20 filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full opacity-10 filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="z-[40] flex max-w-xl flex-col items-center pb-16 pt-8 text-center lg:pb-32 lg:pt-16">
        <p className="mb-2 font-semibold text-primary md:mb-4 md:text-lg xl:text-xl">Introducing Kinben, </p>

        <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl md:mb-8 md:text-6xl">A quick and easy way to organize your day</h1>

        <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
          {user == undefined ?
            <Link href="/signin" className="cursor-pointer inline-block rounded-lg px-4 md:px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-zinc-900 bg-neutral md:text-base">Sign In To Start</Link> :
            <Link href="/dash" className="cursor-pointer inline-block rounded-lg px-4 md:px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-zinc-900 bg-neutral md:text-base">Continue To Dashboard</Link>
          }

          <a href="#" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Contribute To Us</a>
        </div>
      </div>

      <div className="z-[40] flex items-center justify-center gap-4 lg:justify-start">
        <span className="text-sm font-semibold uppercase tracking-widest text-gray-400 sm:text-base">Meet Me!</span>
        <span className="h-px w-12 bg-gray-200"></span>

        <div className="flex gap-4">
          <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
            <DiscordLogo size={22} weight="fill" />
          </a>
          <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
            <GithubLogo size={22} weight="fill" />
          </a>
        </div>
      </div>
    </section >
  </div >
}

export default Header
