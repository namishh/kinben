'use client'
import { useEffect, React, useState } from "react";
import { redirect } from "next/navigation";
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import moment from 'moment'
import Links from "./Links";
import { UserAuth } from "../context/AuthContext";
const DashPage = () => {
  const [quote, setQuote] = useState("")
  const { user } = UserAuth()
  const [time, setTime] = useState(moment().format("HH:mm A"))
  const getQuote = () => {
    let url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let dataQuotes = data.quotes;
        let randomNum = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = dataQuotes[randomNum];

        setQuote(randomQuote.quote);
      })
    setInterval(() => {
      setTime(moment().format("HH:mm A"))
    }, 1000);
  }

  useEffect(() => {
    getQuote()
    if (!user) {
      redirect("/")
    }
  }, [user])
  return <div className="p-16 flex justify-center items-center h-full w-full" style={{ flex: "1 1 auto" }}>
    <Modal />
    <div className="dash mb-24 flex justify-center flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <time className="text-6xl font-bold">{time}</time>
        <p className="text-xl sm:w-[24rem] w-[100%] lg:w-[45rem] md:w-[30rem] text-center">{quote}</p>
      </div>
      <SearchBar />
      <Links />
    </div>
  </div>
}


export default DashPage
