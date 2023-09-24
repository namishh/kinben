'use client'
import { useEffect } from "react"
import 'react-circular-progressbar/dist/styles.css';
import { redirect } from "next/navigation";
import { Pause, Play, ArrowCounterClockwise, Gear } from "@phosphor-icons/react";
import { usePomoContext } from "../context/PomoContext";

const PomoPage = () => {
  const { mode, setMode, isPaused, setIsPaused, setSecondsLeft, isPausedRef, times, minutes, seconds } = usePomoContext()
  useEffect(() => {
    const n = localStorage.getItem("user")
    if (n != "yes") {
      redirect("/")
    }
  }, [])
  return <div className="w-screen flex flex-col justify-center items-center mb-32" style={{ flex: "1 1 auto" }}>
    <div className="self-center flex flex-col jutsify-center items-center gap-3">
      <div className="flex gap-4 justify-center">
        <div onClick={() => { setMode("pomo"); setIsPaused(true); isPausedRef.current = true; }} className={`break px-4 sm:px-8 text-lg py-2 ${mode === 'pomo' ? 'bg-gradient-to-r from-indigo-400 to-pink-400 text-black' : "bg-[#1f1f1f]"} rounded-lg cursor-pointer`}>Focus</div>
        <div onClick={() => { setMode("break"); setIsPaused(true); isPausedRef.current = true; }} className={`break px-4 sm:px-8 text-lg py-2 ${mode === 'break' ? 'bg-gradient-to-r from-indigo-400 to-pink-400 text-black' : "bg-[#1f1f1f]"} rounded-lg cursor-pointer`}>Break</div>

        <div onClick={() => { setMode("longbreak"); setIsPaused(true); isPausedRef.current = true; }} className={`break px-4 sm:px-8 text-lg py-2 ${mode === 'longbreak' ? 'text-black bg-gradient-to-r from-indigo-400 to-pink-400' : "bg-[#1f1f1f]"} rounded-lg cursor-pointer`}>Long Break</div>
      </div>
      <div className="-z-[100]">
        <p className="text-[10rem] m-[0] leading-0 font-extrabold">{minutes}:{seconds}</p>
      </div>
      <div style={{ margin: '0px 0' }} className="flex gap-5">
        {isPaused
          ?
          <p className="cursor-pointer bg-primary text-black p-5 rounded-full flex items-center" onClick={() => { if (mode != "none") setIsPaused(false); isPausedRef.current = false; }} ><Play size={24} weight="fill" /></p>
          :
          <p className="cursor-pointer bg-error text-black p-5 rounded-full flex items-center" onClick={() => { if (mode != "none") setIsPaused(true); isPausedRef.current = true; }} ><Pause size={24} weight="fill" /></p>
        }
        <p className="cursor-pointer bg-accent text-black p-5 rounded-full flex items-center" onClick={() => { setIsPaused(true); isPausedRef.current = true; setSecondsLeft(times[`${mode}`] * 60) }} ><ArrowCounterClockwise size={24} weight="bold" /></p>
        <p className="cursor-pointer bg-[#1f1f1f] p-5 rounded-full flex items-center" onClick={() => { console.log("settings") }} ><Gear size={24} weight="fill" /></p>
      </div>
    </div>
  </div>
}

export default PomoPage
