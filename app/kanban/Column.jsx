import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import Taskcard from "./Taskcard";
import { Plus } from "@phosphor-icons/react"
import { useTodoContext } from "../context/TodoContext";


const Column = ({ tasks, column }) => {
  const { createTasks } = useTodoContext()

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: true,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-neutral w-[350px] lg:w-[420px] h-[580px] max-h-[580px] rounded-md flex flex-col">
      {/* Column title */}
      <div         {...attributes}
        {...listeners}
        className="bg-gradient-to-r from-[#161f26] to-[#21121b] cursor-default  text-md  h-[60px]  rounded-md rounded-b-none p-3 font-bold  border-neutral border-4  flex items-center justify-between" >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex justify-center items-center bg-netral px-2 py-1 text-sm rounded-full "  >
            {tasksIds.length}
          </div>
          {column.title}
        </div>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task, j) => (
            <Taskcard key={j} task={task} />
          ))}
        </SortableContext>
      </div>
      {/* Column footer */}
      <button
        className="flex gap-2 items-center border-neutral border-2 rounded-md p-4 border-x-neutral hover:bg-base-100 hover:text-accent active:bg-base-100"
        onClick={() => {
          createTasks(column.id);
        }}
      >
        <p className="p-2"><Plus size={32} /></p>
        Add task
      </button>
    </div>
  )
}

export default Column
