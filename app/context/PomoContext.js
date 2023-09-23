'use client'
import React, { useEffect, useState, useRef, createContext, useContext, } from "react"
import { useDataContext } from "./DataContext"
import { UserAuth } from "./AuthContext"

const PomoContext = createContext()

// create context provider
export const PomoProvider = ({ children }) => {
  const { data, setData } = useDataContext()
  const [mode, setMode] = useState("none")
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const [times, setTimes] = useState({ 'pomo': data.timer, 'break': data.breakTime, 'longbreak': data.longBreakTime, "none": 0 })

  let minutes = Math.floor(secondsLeft / 60);
  if (minutes < 10) minutes = '0' + minutes;
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;
  let totalSeconds = times[`${mode}`] * 60;
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
    minutes = Math.floor(secondsLeft / 60);
    seconds = secondsLeft % 60;
    totalSeconds = times[`${mode}`] * 60;
    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
  }
  useEffect(() => {
    setTimes({ 'pomo': data.timer, 'break': data.breakTime, 'longbreak': data.longBreakTime, "none": 0 })
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
  }, [mode, data])

  return (
    <PomoContext.Provider value={{ mode, setMode, isPaused, setIsPaused, secondsLeft, setSecondsLeft, secondsLeftRef, isPausedRef, modeRef, times, setTimes, minutes, seconds, totalSeconds, tick }}>
      {children}
    </PomoContext.Provider>
  )
}

export const usePomoContext = () => {
  return useContext(PomoContext)
}


