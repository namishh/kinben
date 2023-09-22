'use client'
import { useEffect, useState, useRef } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDataContext } from "../context/DataContext";
import GradientSVG from "./gradient";
import { UserAuth } from "../context/AuthContext"
import { redirect } from "next/navigation";

const PomoPage = () => {
  const { data, setData } = useDataContext()
  const [mode, setMode] = useState("break")
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const { user } = UserAuth();
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }
  console.log(data)
  let times = { 'pomo': data.timer, 'break': data.breakTime, 'longbreak': data.longBreakTime }
  useEffect(() => {
    if (user == null) {
      redirect("/")
    }
    secondsLeftRef.current = times[`${mode}`] * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return
      }

      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [mode])
  const totalSeconds = times[`${mode}`] * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);
  const idCSS = "hello";

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return <div className="w-screen min-h-[84vh] flex flex-col justify-center items-center">
    <div className="self-center flex flex-col jutsify-center items-center gap-8 mb-8">
      <div className="flex mt-2 justify-center">
        <div onClick={() => { setMode("pomo"); setIsPaused(true); isPausedRef.current = true; }} className={`break px-6 text-lg py-2 ${mode === 'pomo' && 'bg-gradient-to-r from-blue-200 to-pink-400 text-black'} rounded-lg cursor-pointer`}>Go on a grind</div>
        <div onClick={() => { setMode("break"); setIsPaused(true); isPausedRef.current = true; }} className={`break px-6 text-lg py-2 ${mode === 'break' && 'bg-gradient-to-r from-blue-200 to-pink-400 text-black'} rounded-lg cursor-pointer`}>On a break</div>

        <div onClick={() => { setMode("longbreak"); setIsPaused(true); isPausedRef.current = true; }} className={`break px-6 text-lg py-2 ${mode === 'longbreak' && 'text-black bg-gradient-to-r from-blue-200 to-pink-400'} rounded-lg cursor-pointer`}>On a loong break</div>
      </div>
      <div style={{ width: 360, height: 360 }} className="mt-4">
        <GradientSVG />

        <CircularProgressbar
          value={percentage}
          text={minutes + ':' + seconds}
          styles={{
            path: { stroke: `url(#${idCSS})`, height: "100%" },
            trail: {
              stroke: "#2e2e2e"
            },
            text: {
              fill: '#5c7cfa',
              fontSize: '24px',
              fontWeight: 'bold'
            },
          }}
        />
      </div>
      <div style={{ margin: '10px 0' }} className="flex gap-4">
        {isPaused
          ?
          <p className="cursor-pointer bg-[#1f1f1f] px-8 py-3" onClick={() => { setIsPaused(false); isPausedRef.current = false; }} >Resume Timer</p>
          :
          <p className="cursor-pointer bg-[#1f1f1f] px-8 py-3" onClick={() => { setIsPaused(true); isPausedRef.current = true; }} >Stop Timer</p>
        }
        <p className="cursor-pointer bg-[#1f1f1f] px-8 py-3" onClick={() => { setIsPaused(true); isPausedRef.current = true; setSecondsLeft(times[`${mode}`] * 60) }} >Restart Timer</p>
      </div>
    </div>
  </div>
}

export default PomoPage
