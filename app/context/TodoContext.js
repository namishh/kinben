'use client'
import React, { createContext, useContext, useMemo, useState, useEffect } from "react"
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { useDataContext } from "./DataContext"
import { arrayMove } from "@dnd-kit/sortable";
const cols = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];
const TodoContext = createContext()
// create context provider
export const TodoProvider = ({ children }) => {
  const { data, setData } = useDataContext()
  const [columns, setColumns] = useState(cols)
  const columnsId = useMemo(() => columns.map(col => col.id), [columns])
  const [tasks, setTasks] = useState([])
  const [activeCol, setActiveCol] = useState(null)
  const [activeTask, setActiveTask] = useState(null)

  useEffect(() => {
    //setTasks(data.todos)
  }, [tasks, data])
  const generateId = () => {
    return Math.floor(Math.random() * 1000000001);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const createTasks = id => {
    const newTask = {
      id: generateId(),
      columnId: id,
      title: "Task title",
      content: `Tasks ${tasks.length + 1}`
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = id => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  const updateTitle = (id, title) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, title };
    });

    setTasks(newTasks);
  }
  const updateTask = (id, content) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  const onDragStart = (event) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  const onDragEnd = event => {
    setActiveTask(null)
  }

  const onDragOver = event => {
    console.log("ok")
    const { active, over } = event;
    console.log(over)
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return (
    <TodoContext.Provider value={{ data, setData, onDragStart, onDragEnd, onDragOver, updateTask, deleteTask, createTasks, sensors, tasks, setTasks, setActiveTask, activeTask, activeCol, setActiveCol, columns, setColumns, columnsId, updateTitle }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => {
  return useContext(TodoContext)
}

