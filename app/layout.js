import './globals.css'
import { Dosis } from 'next/font/google'
import Nav from './components/Nav'
import Musy from './components/Musy';
import { AuthContextProvider } from "./context/AuthContext";
import { DataProvider } from './context/DataContext';
const dosis = Dosis({ subsets: ['latin'] })

export const metadata = {
  title: 'kinben',
  description: 'organize your life',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dosis.className} overflow-x-hidden`}>
        <AuthContextProvider>
          <DataProvider>
            <Nav />
            <Musy />
            {children}
          </DataProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
