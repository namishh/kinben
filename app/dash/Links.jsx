import { useState, useMemo, useEffect } from "react"
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Grid } from "./Grid";
import { SortableLink } from "./SortableLink";

const defaultLinks = [
  {
    name: "pomo",
    url: "https://kinben.vercel.app/pomo",
    letters: "pom"
  },
  {
    name: "kanban",
    url: "https://kinben.vercel.app/kanban",
    letters: "kan"
  },
  {
    name: "reddit",
    url: "https://reddit.com",
    letters: "rd"
  },
  {
    name: "discord",
    url: "https://discord.com/app",
    letters: "dc"
  },
]

const Links = () => {
  const [items, setItems] = useState(defaultLinks);
  const [activeId, setActiveId] = useState(null);
  const itemsIds = useMemo(() => {
    return items.map((item) => item.url);
  }, [items]);
  useEffect(() => {

  }, [])
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={itemsIds} strategy={rectSortingStrategy}>
        <Grid>
          {items.map((item, index) => (
            <SortableLink key={index} item={item} />
          ))}
        </Grid>
      </SortableContext>

    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const activeIndex = items.findIndex((t) => t.url === active.id);
        console.log(activeIndex)
        const overIndex = items.findIndex((t) => t.url === over.id);

        if (items[activeIndex].link != items[overIndex].link) {
          items[activeIndex].link = items[overIndex].link;
          return arrayMove(items, activeIndex, overIndex - 1);
        }
        console.log(arrayMove(items, activeIndex, overIndex))
        return arrayMove(items, activeIndex, overIndex);
        //const oldIndex = items.indexOf(active.id);
        //const newIndex = items.indexOf(over.id);

        //return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
}

export default Links
