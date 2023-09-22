'use client'
import React, { createContext, useContext, useState } from "react"

const DataContext = createContext()

// create context provider
export const DataProvider = ({ children }) => {
  const [data, setData] = useState({})
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  return useContext(DataContext)
}

