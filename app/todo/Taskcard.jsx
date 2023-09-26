import { Trash, PencilSimple } from "@phosphor-icons/react"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

const Taskcard = ({ task }) => {
  const { updateTask, deleteTask, updateTitle } = useTodoContext()
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: false,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };


  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-20 bg-gradient-to-r from-[#161f26] to-[#21121b] p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-accent  cursor-grab relative"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[#191919] px-4 py-2 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-accent cursor-grab relative task"

      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <dialog id="editmodal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  bg-neutral">
          <h3 className="font-bold text-xl mb-4">Configure Todo</h3>
          <form autoFocus={false}>
            <div className="flex gap-4 flex-col">
              <input
                className="input input-bordered input-md w-full"
                value={task.title}
                placeholder="Task content here"
                onChange={(e) => updateTitle(task.id, e.target.value)}
              />
              <textarea
                className="textarea textarea-bordered textarea-md w-full"
                value={task.content}
                placeholder="Task content here"
                onChange={(e) => updateTask(task.id, e.target.value)}
              />
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-[#1f1f1f]">Save</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="flex flex-col">
        <p className="font-bold text-lg w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.title}
        </p>
        <p className="my-auto w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.content}
        </p>
      </div>
      {mouseIsOver && (
        <div className="stroke-white absolute right-4 flex flex-col justify-center" >
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
            className="bg-[#222] p-2 rounded opacity-60 hover:opacity-100"
          >
            <Trash size={16} weight="duotone" />
          </button>
          <button onClick={() => document.getElementById('editmodal').showModal()}

            className=" bg-[#222] p-2 rounded opacity-60 hover:opacity-100"
          >
            <PencilSimple size={16} weight="duotone" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Taskcard
