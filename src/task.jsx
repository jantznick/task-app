import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import classNames from "classnames";

export const Task = ({task, index}) => {

    return (
        <Draggable 
            draggableId={task.id}
            index={index}
        >{(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classNames(
                "border",
                "border-blue-900",
                "p-2",
                "mb-2",
                "rounded",
                { 'bg-green-400': snapshot.draggingOver }
            )}>
                <div>{task.content}</div>
            </div>
        )}
        </Draggable>
    )
}
