import { useState } from "react";
import { DragAndDrop } from "../class/Content";
import "./DragAndDrop.css";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DragAndDropQuestion({ page }: { page: DragAndDrop }) {
  const content = page.content;
  const draggableObject = page.draggable;
  const [parents, setParents] = useState<{ [key: string]: string | null }>({});

  const draggableKeys = Object.keys(draggableObject);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>Drag and Drop to complete the sentence.</div>
      <p className="blank-container">
        {content.map((option, index) => {
          if (typeof option === "string") {
            return <span key={index}>{option}</span>;
          } else {
            const blankId = `blank-${index}`;
            return (
              <Droppable key={blankId} id={blankId}>
                {parents[blankId] ? (
                  <Draggable id={parents[blankId]}>
                    <b>{parents[blankId]}</b>
                  </Draggable>
                ) : (
                  "Blank"
                )}
              </Droppable>
            );
          }
        })}
      </p>
      <div className="options-container">
        {draggableKeys.map(
          (option) =>
            !Object.values(parents).includes(option) && (
              <Draggable key={option} id={option}>
                <b>{option}</b>
              </Draggable>
            )
        )}
      </div>
    </DndContext>
  );

  function handleDragEnd(event: { active: any; over: any }) {
    const { active, over } = event;
    if (over) {
      setParents((prevParent) => ({
        ...prevParent,
        [over.id]: active.id,
      }));
    } else {
      // If there's no `over` element, remove the item from the parent
      setParents((prevParent) => {
        const newParent = { ...prevParent };
        for (const key in newParent) {
          if (newParent[key] === active.id) {
            newParent[key] = null;
          }
        }
        return newParent;
      });
    }
  }
}

function Droppable(props: { id: any; children: any }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <span ref={setNodeRef} className="droppable">
      {props.children}
    </span>
  );
}

function Draggable(props: { id: any; children: any }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    cursor: "grab",
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
