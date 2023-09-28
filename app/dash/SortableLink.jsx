import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSix, PencilSimple, Trash } from '@phosphor-icons/react';
import { useLinksContext } from '../context/LinksContext';

export const SortableLink = ({ item }) => {
  const { deleteLink, setEdit, setShowModal } = useLinksContext()
  const sortable = useSortable({ id: item.url });
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = sortable;


  const [win, setWin] = useState(null)
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  useEffect(() => {
    setWin(window)
  }, [])

  return (
    <div
      className='group p-8 px-12 bg-neutral relative'
    >
      <div ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="absolute right-[1px] top-[1px] z-[100] p-2 text-white"><DotsSix size={24} /></div>
      <div onClick={() => { setEdit({ name: item.name, url: item.url, id: item.id }); setShowModal(true) }} className="absolute right-[1px] opacity-0 group-hover:opacity-100 cursor-pointer bottom-[1px] z-[100] p-2 text-white"><PencilSimple size={20} /></div>
      <div onClick={() => { deleteLink(item.id) }} className="absolute left-[1px] opacity-0 group-hover:opacity-100 cursor-pointer bottom-[1px] z-[100] text-error p-2 text-white"><Trash size={20} /></div>
      <a href={item.url} ref={setNodeRef}
        style={style}
        {...attributes}
        className="dashlink relative flex z-[100] flex-col rounded-md items-center justify-center">
        <p className="font-bold text-2xl">{item.name.length > 6 ? `${item.name.slice(0, 5)}..` : item.name}</p>
      </a>
    </div>
  );
};

