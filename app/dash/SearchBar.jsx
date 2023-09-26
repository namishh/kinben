import { Plus } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
const SearchBar = () => {
  const [engine, setEngine] = useState("google")
  const [query, setQuery] = useState("")
  const [win, setWin] = useState(null)
  useEffect(() => {
    setWin(window)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    if (engine === "duckduckgo") {
      win.location.assign(`https://www.${engine}.com/${query}`)
    } else {
      win.location.assign(`https://www.${engine}.com/search?q=${query}`)
    }
  }
  return <div className="search w-full" >
    <form onSubmit={handleSubmit}>
      <div className="flex items-start">
        <button type="button" onClick={() => console.log("add button")} className="p-2.5 h-full text-sm font-medium text-black bg-secondary rounded-l-lg border border-blue-700 hover:bg-blue-800 focus:ring-0 !outline-none focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700"><Plus size={18} /></button>
        <div className="relative sm:w-[24rem] w-[100%] lg:w-[45rem] md:w-[30rem]">
          <input autoComplete={false} autoFocus={true} type="text" id="search-dropdown" className="block border-transparent focus:border-transparent focus:ring-0 !outline-none p-2.5 w-full z-20 text-sm text-white bg-neutral rounded-r-lg" placeholder="Search" required value={query} onChange={(e) => setQuery(e.target.value)} />
          <details className="dropdown top-0 right-0 absolute bg-[#1f1f1f] mb-32  rounded-r-lg">
            <summary className="px-4  py-2 cursor-pointer  rounded-r-lg">{engine}</summary>
            <ul className="p-0 shadow menu dropdown-content z-[123] bg-neutral rounded-lg mt-4 w-52">
              <li><p onClick={() => { setEngine("google") }}>google</p></li>
              <li><p onClick={() => { setEngine("duckduckgo") }}>duckduckgo</p></li>
              <li><p onClick={() => { setEngine("ecosia") }}>ecosia</p></li>
              <li><p onClick={() => { setEngine("bing") }}>bing</p></li>
            </ul>
          </details>
        </div>
      </div>
    </form>
  </div >
}

export default SearchBar
