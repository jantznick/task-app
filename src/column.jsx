import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import classNames from "classnames";

import { Task } from './task';

export const Column = ({ column, tasks }) => {

    return (
        <div className='p-4 m-2 border-black border rounded w-1/2'>
            <h3 className='p-2'>{column.title}</h3>
            <Droppable droppableId={column.id} >
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={classNames(
                        "taskList",
                        "p-2",
                        { 'bg-gray-300': snapshot.isDraggingOver }
                    )}>
                        {tasks.map((task, i) => {
                            return <Task key={task.id} task={task} index={i} />
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div className='border border-black rounded'>
                <h3 className='p-2'>Extra</h3>
                <Droppable droppableId={column.id + 'extra'} >
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={classNames(
                            "taskList",
                            "p-2",
                            "min-h-96",
                            { 'bg-gray-300': snapshot.isDraggingOver }
                        )}>
                            <div>Drop Here</div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    )
}
