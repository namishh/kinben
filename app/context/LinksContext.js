'use client'
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useDataContext } from "./DataContext"
import { UserAuth } from "./AuthContext"
import React, { createContext, useContext, useMemo, useState, useEffect } from "react"
import { useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

const LinksContext = createContext()

export const LinksProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState({ name: "", url: "", id: "" })
  const [showModal, setShowModal] = useState(false)

  const { data } = useDataContext()
  const { user } = UserAuth();
  const [activeId, setActiveId] = useState(null);
  const itemsIds = useMemo(() => {
    return items.map((item) => item.url);
  }, [items]);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const saveItems = (data, items) => {
    setDoc(doc(db, 'users', (data.email)), { ...data, links: items })
  }
  useEffect(() => {

    if (user != undefined) {
      setItems(data.links)
    }
  }, [data])
  const updateLink = () => {
    const index = items.findIndex(x => x.id === edit.id);
    let newArr = items
    newArr[index] = edit
    setItems(newArr)
    saveItems(data, newArr)
  }

  const createLink = (url, name) => {
    if (url != "" && name != "") {
      const newTask = {
        name,
        id: uuidv4(),
        url
      }
      setItems([...items, newTask])
      saveItems(data, [...items, newTask])
    }
  }
  const deleteLink = id => {
    const newTasks = items.filter((task) => task.id !== id);
    setItems(newTasks);
    saveItems(data, newTasks)
  }
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const activeIndex = items.findIndex((t) => t.url === active.id);
        const overIndex = items.findIndex((t) => t.url === over.id);

        if (items[activeIndex].link != items[overIndex].link) {
          items[activeIndex].link = items[overIndex].link;
          return arrayMove(items, activeIndex, overIndex - 1);
        }
        saveItems(data, arrayMove(items, activeIndex, overIndex))
        return arrayMove(items, activeIndex, overIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  return (
    <LinksContext.Provider value={{ items, setItems, activeId, deleteLink, setActiveId, itemsIds, handleDragCancel, handleDragEnd, handleDragStart, sensors, createLink, updateLink, edit, setEdit, showModal, setShowModal, saveItems }}>
      {children}
    </LinksContext.Provider>
  )
}

export const useLinksContext = () => {
  return useContext(LinksContext)
}
