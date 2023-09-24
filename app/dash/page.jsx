'use client'
import { useEffect, React } from "react";
import { redirect } from "next/navigation";
const DashPage = () => {
  useEffect(() => {
    const n = localStorage.getItem("user")
    if (n != "yes") {
      redirect("/")
    }
  }, [])
  return <>dash</>
}


export default DashPage
