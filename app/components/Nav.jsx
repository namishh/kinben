'use client';
import { UserAuth } from "../context/AuthContext"
import { useEffect, React } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Image from 'next/image'
import { useDataContext } from "../context/DataContext";
import Link from "next/link";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const Nav = () => {
  const { setData } = useDataContext()
  const { user, logOut } = UserAuth();
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };
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
    const d = async () => {
      if (user) {
        const dataa = user.providerData[0]
        const col = collection(db, 'users')
        const a = await getDocs(col)
        const b = []
        a.docs.forEach(doc => {
          b.push(doc.data())
        })
        let exists = b.find(c => c.email === dataa.email)
        if (!exists) {
          setDoc(doc(db, 'users', (dataa.email)), { email: dataa.email, timer: 20, todos: [], breakTime: 5, longBreakTime: 15, cats: ["doing", "done", "to do"] }).then(_ => toast("Account Added"))
          setData({ email: dataa.email, timer: 20, todos: [], breakTime: 5, longBreakTime: 15, cats: ["doing", "done", "to do"] })
        } else {
          setData({ email: exists.email, timer: exists.timer, todos: exists.todos, breakTime: exists.breakTime, longBreakTime: exists.longBreakTime, cats: exists.cats })
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
        {!user && (
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
              <li><Link onClick={handleClick} href="/dash" className="p-2 px-4">Dashboard</Link></li>
              <li><Link onClick={handleClick} href="/pomo" className="p-2 px-4">Pomodoro</Link></li>
              <li><Link onClick={handleClick} href="/todo" className="p-2 px-4">Todo List</Link></li>
              <li><a onClick={() => { handleClick(); handleSignOut() }} className="p-2 px-4">Sign Out</a></li>
            </ul>
          </div>
        }
      </ul>
    </div>
  </div>
}

export default Nav
