'use client'
import { useEffect, useState, useRef } from "react"
import { Play, SkipForward, SkipBack, Pause, Headphones } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import jsmediatags from "jsmediatags"
const getShuffledArr = arr => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
};
const Musy = () => {
  let l = ""
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "prod") {
    l = "https://kinben.vercel.app"
  } else {
    l = "http://localhost:3000"
  }
  let songs = []
  for (let i = 1; i <= 54; i++) {
    if (i < 10) {
      songs.push(`m0${i}`)
    } else {
      songs.push(`m${i}`)
    }
  }
  const songsComp = getShuffledArr(songs)
  const [track, setTrack] = useState(0)
  const [tracks, setTracks] = useState(songsComp)
  const [metadata, setMetadata] = useState({ tags: {} })
  const [open, setOpen] = useState(false)
  const [play, setPlay] = useState(false)
  const [volume, setVolume] = useState(100)
  const [timeInfo, setTimeInfo] = useState({
    current: 0,
    max: 0
  })
  const audioRef = useRef();
  useEffect(() => {
    jsmediatags.read(`${l}/${tracks[track]}.mp3`, {
      onSuccess: function(tag) {
        setMetadata(tag);
      },
      onError: function(error) {
        toast(`Error: ${error}`);
      }
    });
  }, [track, l])

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

  const playPause = async () => {
    if (!play) {
      await audioRef.current.play();
      setPlay(true)
    } else {
      await audioRef.current.pause();
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
  return <div className={`musy z-[12312312312312313] fixed bottom-0 sm:bottom-[1rem] w-screen sm:w-max right-0 sm:right-[1rem]`}>
    <audio autoPlay onTimeUpdate={songTimeHandler} onEnded={async () => await nextTrack()} onLoadedMetadata={songTimeHandler} ref={audioRef} src={`/${tracks[track]}.mp3`}>
    </audio>
    <div className={`musicplayer ${!open ? 'translate-x-[32rem] collapse sm:translate-x-[100rem]' : 'translate-x-[0rem] visible sm:translate-x-[0rem]'} absolute bottom-[3rem] sm:bottom-[3.9rem] flex justify-between flex-col sm:rounded-lg right-[0rem] z -[123123] sm:right-0 h-[20rem] transition-all w-screen p-4 sm:w-[28rem] bg - contain`} style={{ background: 'linear-gradient(to bottom right, #000000dd, #000000aa), url("./musicpic.png")', backgroundPosition: "top" }}>
      <div className="flex-col flex ">
        <p className="text-xl">{metadata.tags.title}</p>
        <p className="text-lg">{metadata.tags.artist}</p>
      </div>
      <div className="flex flex-col">
        <input type="range" min={0} max={timeInfo.max} value={timeInfo.current} className="range range-xs mb-4 range-accent" onChange={sliderChange} />
        <div className="flex gap-5 items-center justify-center">
          <SkipBack onClick={prevTrack} className="cursor-pointer" size={22} weight="fill" />
          {!play ? <Play className="cursor-pointer" onClick={playPause} size={24} weight="fill" /> :
            <Pause className="cursor-pointer" onClick={playPause} size={24} weight="fill" />}
          <SkipForward className="cursor-pointer" onClick={nextTrack} size={22} weight="fill" />
          <input type="range" min={1} max={100} value={volume} className="range range-xs range-success w-[6rem]" onChange={volumeHandler} />
        </div>
      </div>
    </div>
    <div onClick={() => setOpen(!open)} className="container py-3 px-8  rounded-0 sm:rounded-lg cursor-pointer flex gap-4 items-center" style={{ background: 'url("./musicpic.png")', backgroundPosition: "top" }}>
      <Headphones size={24} weight="fill" /> <span> {metadata.tags.title} </span>
    </div>
  </div >
}

export default Musy
