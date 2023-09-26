import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSix } from '@phosphor-icons/react';

export const SortableLink = ({ item }) => {
  const sortable = useSortable({ id: item.url });
  const {
    attributes,
    listeners,
    isDragging,
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
      className=' p-8 px-12 bg-neutral relative'
    >
      <div ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="absolute right-[1px] top-[1px] z-[100] p-2 text-white"><DotsSix size={24} /></div>
      <a href={item.url} ref={setNodeRef}
        style={style}
        {...attributes}
        className="dashlink relative flex z-[100] flex-col rounded-md items-center justify-center">
        <p className="font-bold text-2xl">{item.name}</p>
      </a>
    </div>
  );
};

