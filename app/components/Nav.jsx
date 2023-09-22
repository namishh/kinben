'use client';
import { UserAuth } from "../context/AuthContext"
import { useState, useEffect, React } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Image from 'next/image'
import { useDataContext } from "../context/DataContext";
import Link from "next/link";
const Nav = () => {
  const { data, setData } = useDataContext()
  const { user, ghSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await ghSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
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
      if (user != null) {
        const dataa = user.providerData[0]
        console.log(user)
        const col = collection(db, 'users')
        const a = await getDocs(col)
        const b = a.docs.map(doc => ({ data: doc.data() }))
        const exists = b.find(c => c.data.email === dataa.email)
        if (!exists) {
          setDoc(doc(db, 'users', (dataa.email)), { email: dataa.email, timer: 20, todos: [], breakTime: 5 }).then(a => console.log(a))
          setData({ email: dataa.email, timer: 20, todos: [], breakTime: 5 })
        } else {
          setData({ email: exists.email, timer: exists.timer, todos: exists.todos, streak: exists.streak, breakTime: exists.breakTime })
        }
      }
    }
    d()
    return () => {
    };
  }, [user]);

  return <div className="navbar bg-neutral">
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
            <ul tabIndex="0" className="menu menu-sm dropdown-content mt-8 z-[1] p-4 text-lg shadow bg-neutral rounded-box w-64">
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
