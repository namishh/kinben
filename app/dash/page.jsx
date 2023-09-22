'use client'
import { useEffect, React } from "react";
import { UserAuth } from "../context/AuthContext"
import { redirect } from "next/navigation";
const DashPage = () => {
  const { user } = UserAuth();
  useEffect(() => {
    if (user == null) {
      redirect("/")
    }
    return () => {
    };
  }, [user]);
  return <>dash</>
}


export default DashPage
