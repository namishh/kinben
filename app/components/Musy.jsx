'use client'
import { useEffect, useState, useRef } from "react"
import * as id3 from 'id3js';
import { Play, SkipForward, SkipBack, Pause, Headphones } from "@phosphor-icons/react";
const Musy = () => {
  let l = ""
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "prod") {
    l = "https://kinben.vercel.app"
  } else {
    l = "http://localhost:3000"
  }
  let tracks = []
  for (let i = 1; i <= 25; i++) {
    if (i < 10) {
      tracks.push(`m0${i}`)
    } else {
      tracks.push(`m${i}`)
    }
  }
  const [track, setTrack] = useState(0)
  const [metadata, setMetadata] = useState({})
  const [open, setOpen] = useState(false)
  const [play, setPlay] = useState(false)
  const [volume, setVolume] = useState(1)
  const [timeInfo, setTimeInfo] = useState({
    current: 0,
    max: 0
  })
  const audioRef = useRef();
  useEffect(() => {
    id3.fromUrl(`${l}/${tracks[track]}.mp3`).then((tags) => setMetadata(tags)).catch(err => console.log(""));
  }, [track])

  const nextTrack = async () => {
    try {
      if (track === (tracks.length - 1)) {
        setTrack(0)
      } else {
        setTrack(track + 1)
      }
      await audioRef.current.load();
      await audioRef.current.play()
      setPlay(true)
    } catch (err) {
      // 
    }
  }

  const prevTrack = async () => {
    try {
      if (track === 0) {
        setTrack(tracks.length - 1)
      } else {
        setTrack(track - 1)
      }
      await audioRef.current.load();
      await audioRef.current.play()
      setPlay(true)
    } catch (err) { }
  }

  const playPause = () => {
    if (!play) {
      audioRef.current.play();
      setPlay(true)
    } else {
      audioRef.current.pause();
      setPlay(false)
    }

  }
  const sliderChange = (e) => {
    const { value } = e.target
    setTimeInfo({ ...timeInfo, current: value })
    audioRef.current.currentTime = value;
  }
  const songTimeHandler = async (e) => {
    const { currentTime, duration } = e.target
    setTimeInfo({ current: currentTime, max: duration })
  }

  const volumeHandler = (e) => {
    const { value } = e.target
    setVolume(value)
    audioRef.current.volume = value / 100
  }
  return <div className="musy absolute bottom-[1rem] right-[1rem]">
    <audio autoPlay onTimeUpdate={songTimeHandler} onEnded={async () => await nextTrack()} onLoadedMetadata={songTimeHandler} ref={audioRef} src={`${l}/${tracks[track]}.mp3`}>
    </audio>
    <div className={`musicplayer ${open ? 'translate-x-[32rem]  sm:translate-x-[100rem]' : 'translate-x-[0rem] sm:translate-x-[0rem]'} absolute bottom-[3.9rem] flex justify-between flex-col rounded-lg -right-[1rem] z-[123123] md:right-0 h-[20rem] transition-all w-screen p-4 md:w-[28rem] bg-contain`} style={{ background: 'linear-gradient(to bottom right, #000000dd, #000000aa), url("./musicpic.png")', backgroundPosition: "top" }}>
      <div className="flex-col flex ">
        <p className="text-xl">{metadata.title}</p>
        <p className="text-lg">{metadata.artist}</p>
      </div>
      <div className="flex flex-col">
        <input type="range" min={0} max={timeInfo.max} value={timeInfo.current} className="range range-xs mb-4 range-accent" onChange={sliderChange} />
        <div className="flex gap-5 items-center justify-center">
          <SkipBack onClick={prevTrack} className="cursor-pointer" size={22} weight="fill" />
          {!play ? <Play className="cursor-pointer" onClick={playPause} size={24} weight="fill" /> :
            <Pause className="cursor-pointer" onClick={playPause} size={24} weight="fill" />}
          <SkipForward className="cursor-pointer" onClick={nextTrack} size={22} weight="fill" />
          <input type="range" min={1} max={100} value={volume} className="range range-success range-xs w-[8rem]" onChange={volumeHandler} />
        </div>
      </div>
    </div>
    <div onClick={() => setOpen(!open)} className="container py-3 px-8 rounded-lg cursor-pointer flex gap-4 items-center" style={{ background: 'url("./musicpic.png")', backgroundPosition: "top" }}>
      <Headphones size={24} weight="fill" /> <span> {metadata.title} </span>
    </div>
  </div >
}

export default Musy
