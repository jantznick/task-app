import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initial-data';
import { Column } from './column';

const App = () => {
	const [columns, setColumns] = useState(initialData.columns)

	const finishDrag = (result) => {
		console.log(result);
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId &&
			destination.index === source.index) {
				return;
		}

		const sourceColumn = columns[source.droppableId]; // {id: '', title: '', taskIds: ['', '']}
		const destColumn = columns[destination.droppableId] ||
			{
				id: `column-${Object.keys(columns).length + 1}`,
				title: 'An extra column',
				taskIds: []
			}
		sourceColumn.taskIds.splice(source.index, 1);
		destColumn.taskIds.splice(destination.index, 0, draggableId);
		setColumns({
			...columns,
			[sourceColumn.id]: sourceColumn,
			[destColumn.id]: destColumn
		})
	}

    // columns: {
	// 	'column-1': {
	// 	  id: 'column-1',
	// 	  title: 'To do',
	// 	  taskIds: ['task-1', 'task-2'],
	// 	},
	// 	'column-2': {
	// 	  id: 'column-2',
	// 	  title: 'Done',
	// 	  taskIds: ['task-3', 'task-4'],
	// 	}
	//   }

	return (
		<div className='flex'>
			<DragDropContext
				onDragEnd={finishDrag}
			>
				{Object.keys(columns).map(columnId => {
					const column = columns[columnId];
					const columnTasks = column.taskIds.map(taskId => initialData.tasks[taskId]);
					return <Column key={column.id} column={column} tasks={columnTasks} />;
				})}
			</DragDropContext>
		</div>
	)
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<App />
);

