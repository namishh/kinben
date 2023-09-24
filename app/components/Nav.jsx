'use client';
import { UserAuth } from "../context/AuthContext"
import { useState, useEffect, React } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Image from 'next/image'
import { useDataContext } from "../context/DataContext";
import Link from "next/link";
import { redirect } from "next/navigation";

const Nav = () => {
  const { data, setData } = useDataContext()
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    try {
      await logOut();
      localStorage.setItem("user", "no")
      redirect("/")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
    const d = async () => {
      if (user) {
        const dataa = user.providerData[0]
        const col = collection(db, 'users')
        const a = await getDocs(col)
        const b = a.docs.map(doc => ({ data: doc.data() }))
        let exists = b.find(c => c.data.email === dataa.email).data
        if (!exists) {
          setDoc(doc(db, 'users', (dataa.email)), { email: dataa.email, timer: 20, todos: [], breakTime: 5, longBreakTime: 15 }).then(a => console.log("ok"))
          setData({ email: dataa.email, timer: 20, todos: [], breakTime: 5, longBreakTime: 15 })
        } else {
          setData({ email: exists.email, timer: exists.timer, todos: exists.todos, breakTime: exists.breakTime, longBreakTime: exists.longBreakTime })
        }
        localStorage.setItem("user", "yes")
      }
    }
    d()
    return () => {
    };
  }, [user]);

  return <div className="navbar bg-neutral" style={{ flex: "0 1 auto" }}>
    <div className="flex-1 px-4">
      {/* <a className="btn btn-ghost normal-case text-2xl">勤勉</a> */}
      <Link href={"/"}> <Image
        src="/logo.png"
        height={10}
        width={56}
        alt="Picture of the author"
      /></Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal py-0 px-1">
        {loading ? null : !user && (
          <ul className="flex">
            <Link href="/signin" className="p-1 px-4 text-lg bg-[#1c1c1c] rounded-lg cursor-pointer">
              Sign in            </Link>

          </ul>
        )}
        {user &&
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="avatar cursor-pointer flex items-center gap-4">
              <p className="text-lg">Hi {user.displayName.split(" ")[0]}!</p>
              <div className="w-8 rounded-full">
                <img src={user.providerData[0].photoURL} />
              </div>
            </label>
            <ul tabIndex="0" className="menu menu-sm dropdown-content mt-8 z-[100000000] p-4 text-lg shadow bg-neutral rounded-box w-64">
              <li><Link href="/dash" className="p-2 px-4">Dashboard</Link></li>
              <li><Link href="/pomo" className="p-2 px-4">Pomodoro</Link></li>
              <li><Link href="/todo" className="p-2 px-4">Todo List</Link></li>
              <li><a onClick={handleSignOut} className="p-2 px-4">Sign Out</a></li>
            </ul>
          </div>
        }
      </ul>
    </div>
  </div>
}

export default Nav
