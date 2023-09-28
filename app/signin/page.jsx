'use client'
import { useEffect, React } from "react";
import { UserAuth } from "../context/AuthContext"
import { redirect } from "next/navigation";
const SignPage = () => {
  const { ghSignIn, googleSignIn, user } = UserAuth();
  const handleGh = async () => {
    try {
      await ghSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      redirect("/dash")
    }
    return () => {
    };
  }, [user]);
  return <div className="relative flex flex-col min-h-[60vh] justify-center items-center">
    <div className="flex flex-col bg-[#0f0f0f] rounded-lg gap-10 items-center justify-center p-16">
      <p className="text-4xl">Sign In To Make Your Life Better!</p>
      <div className="relative flex gap-5 rounded-lg">
        <a onClick={handleGh} className="cursor-pointer inline-block rounded-lg px-4 md:px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-zinc-900 bg-neutral md:text-base">Sign In With Github</a>
        <a onClick={handleGoogle} className="cursor-pointer inline-block rounded-lg px-4 md:px-8 py-3 text-center text-sm font-semibold text-white outline-none transition duration-100 hover:bg-secondary bg-primary md:text-base">Sign In With Gooogle</a>
      </div>
    </div>
  </div >
}


export default SignPage

