import { useState, useMemo, useEffect } from "react"
import {
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Grid } from "./Grid";
import { SortableLink } from "./SortableLink";
import { useLinksContext } from "../context/LinksContext";

const Links = () => {
  const { sensors, handleDragStart, handleDragEnd, handleDragCancel, items, itemsIds } = useLinksContext()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShow(true)
    }
  }, [])
  return (show ? <div>
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
  </div> : <div className="loading">Loading</div>
  )
}

export default Links
