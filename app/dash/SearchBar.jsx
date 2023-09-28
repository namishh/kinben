import { Plus } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { useLinksContext } from "../context/LinksContext"
const SearchBar = () => {
  const [engine, setEngine] = useState("google")
  const [query, setQuery] = useState("")
  const [win, setWin] = useState(null)
  const { createLink } = useLinksContext()
  const [tempName, setTempName] = useState("")
  const [tempURL, setTempURL] = useState("")
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
    <dialog id="addlinkmodal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box  bg-neutral">
        <h3 className="font-bold text-xl mb-4">Modiy Links</h3>
        <form autoFocus={false}>
          <div className="flex gap-4 flex-col">
            <input
              className="input input-bordered input-md w-full"
              value={tempName}
              placeholder="Enter name here"
              onChange={(e) => setTempName(e.target.value)}
            />
            <input
              className="input input-bordered input-md w-full"
              value={tempURL}
              placeholder="Enter URL here (with https://)"
              onChange={(e) => setTempURL(e.target.value)}
            />
          </div>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => { createLink(tempURL, tempName) }} className="btn bg-[#1f1f1f]">Save</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => { createLink(setTempURL, tempName) }}>close</button>
      </form>
    </dialog>
    <form onSubmit={handleSubmit}>
      <div className="flex items-start">
        <button type="button" onClick={() => document.getElementById('addlinkmodal').showModal()} className="p-2.5 h-full text-sm font-medium text-black bg-secondary rounded-l-lg border border-blue-700 hover:bg-blue-800 focus:ring-0 !outline-none focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700"><Plus size={18} /></button>
        <div className="relative sm:w-[24rem] w-[100%] lg:w-[45rem] md:w-[30rem]">
          <input autoFocus={true} type="text" id="search-dropdown" className="block border-transparent focus:border-transparent focus:ring-0 !outline-none p-2.5 w-full z-20 text-sm text-white bg-neutral rounded-r-lg" placeholder="Search" required value={query} onChange={(e) => setQuery(e.target.value)} />
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
