'use client'
import { useEffect, React, useState } from "react";
import { redirect } from "next/navigation";
import { useDate } from "../hooks/useDate";
import SearchBar from "./SearchBar";
import Links from "./Links";
// https://s2.googleusercontent.com/s2/favicons?domain_url=https://www.stackoverflow.com
const DashPage = () => {
  const { date, time, wish } = useDate()
  const [quote, setQuote] = useState()
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
  }

  useEffect(() => {
    getQuote()
    const n = localStorage.getItem("user")
    if (n != "yes") {
      redirect("/")
    }
  }, [localStorage.getItem("user")])
  return <div className="p-16 flex justify-center items-center h-full w-full" style={{ flex: "1 1 auto" }}>
    <div className="dash mb-24 flex justify-center flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-3">
        <p className="text-6xl font-bold">{time}</p>
        <p className="text-xl sm:w-[24rem] w-[100%] lg:w-[45rem] md:w-[30rem] text-center">{quote}</p>
      </div>
      <SearchBar />
      <Links />
    </div>
  </div>
}


export default DashPage
