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
  return <div className="p-16">
    todo
  </div>
}


export default TodoPage
