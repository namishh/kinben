'use client'
import { useEffect, React } from "react";
import { redirect } from "next/navigation";
const TodoPage = () => {
  useEffect(() => {
    const n = localStorage.getItem("user")
    if (n != "yes") {
      redirect("/")
    }
  }, [])
  return <>todo</>
}


export default TodoPage
