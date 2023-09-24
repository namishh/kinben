'use client'
import React, { useEffect, useState, useRef, createContext, useContext, } from "react"
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useDataContext } from "./DataContext"
import { toast } from "react-toastify"
const PomoContext = createContext()

// create context provider
export const PomoProvider = ({ children }) => {
  const { data, setData } = useDataContext()
  const [mode, setMode] = useState("none")
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [pomoTime, setPomoTime] = useState(0)
  const [breakTime, setBreakTime] = useState(0)
  const [longBreakTime, setLongBreakTime] = useState(0)
  const [times, setTimes] = useState({ 'pomo': data.timer, 'break': data.breakTime, 'longbreak': data.longBreakTime, "none": 0 })

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  let minutes = Math.floor(secondsLeft / 60);
  if (minutes < 10) minutes = '0' + minutes;
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;
  let totalSeconds = times[`${mode}`] * 60;

  const resetTimes = () => {
    setPomoTime(data.timer)
    setBreakTime(data.breakTime)
    setLongBreakTime(data.longBreakTime)
  }

  const setTimesPerm = () => {
    setTimes({ 'pomo': pomoTime, 'break': breakTime, 'longbreak': longBreakTime, none: 0 })
    setDoc(doc(db, 'users', (data.email)), { email: data.email, timer: Number(pomoTime), breakTime: Number(breakTime), todos: data.todos, longBreakTime: Number(longBreakTime) }).then(a => console.log("ok"))
    setData({ ...data, timer: pomoTime, breakTime: breakTime, longBreakTime: longBreakTime })
  }

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
    function reset() {
      if (mode != "none") {
        setMode(mode)
        secondsLeftRef.current = times[`${mode}`] * 60;
        setSecondsLeft(secondsLeftRef.current);
        isPausedRef.current = true
        setIsPaused(true)
        if (mode === "pomo") {
          toast("Study Time Over! Take a break now")
        } else {
          toast("Break Is Over! Go back to study")
        }
      }
    }
    setTimes({ 'pomo': data.timer, 'break': data.breakTime, 'longbreak': data.longBreakTime, "none": 0 })
    setPomoTime(data.timer)
    setBreakTime(data.breakTime)
    setLongBreakTime(data.longBreakTime)
    secondsLeftRef.current = times[`${mode}`] * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        reset()
      } else {
        tick();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, data])

  return (
    <PomoContext.Provider value={{ mode, setMode, isPaused, setIsPaused, secondsLeft, setSecondsLeft, secondsLeftRef, isPausedRef, modeRef, times, setTimes, minutes, seconds, totalSeconds, tick, pomoTime, setPomoTime, longBreakTime, breakTime, setLongBreakTime, setBreakTime, resetTimes, setTimesPerm }}>
      {children}
    </PomoContext.Provider>
  )
}

export const usePomoContext = () => {
  return useContext(PomoContext)
}


