import { useDispatch, useSelector } from 'react-redux'
import { del, add, update, completed } from './store/reducer/todolist/todolistSlice.js'
import { useState } from 'react'

export default function App() {
	const data = useSelector(store => store.todolist.data)
	const dispatch = useDispatch()
	
	const [addTitle, setAddTitle] = useState('')
	const [addDescription, setAddDescription] = useState('')
	const [addStatus, setAddStatus] = useState(false)
	const [open, setOpen] = useState(false)

	const [editId, setEditId] = useState(null)
	const [editTitle, setEditTitle] = useState('')
	const [editDescription, setEditDescription] = useState('')
	const [editStatus, setEditStatus] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)

	const handleAdd = () => {
		const newTodo = {
			id: Date.now(),
			title: addTitle,
			description: addDescription,
			status: addStatus,
		}
		dispatch(add(newTodo))

		setAddTitle('')
		setAddDescription('')
		setAddStatus(false)
		setOpen(false)
	}
	const editCLick = todo => {
		setEditId(todo.id)
		setEditTitle(todo.title)
		setEditDescription(todo.description)
		setEditStatus(todo.status)
		setOpenEdit(true)
	}
	const handleUpdate = () => {
		dispatch(
			update({
				id: editId,
				title: editTitle,
				description: editDescription,
				status: editStatus,
			})
		)
		setOpenEdit(false)
	}
	return (
		<div className='w-[40%] m-auto mt-10'>
			<h1 className='text-2xl font-bold text-center my-4'>TODO LIST</h1>
			{open && (
				<div className='fixed m-auto top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
					<div className='flex flex-col items-center gap-3 rounded-lg bg-white	border-black border-2 p-10'>
						<p className='font-bold'>Add todo</p>
						<div className='flex gap-5'>
							<input
								type='text'
								value={addTitle}
								onChange={e => setAddTitle(e.target.value)}
								placeholder='Enter title'
								className='p-2 border rounded-md'
							/>
							<input
								type='text'
								value={addDescription}
								onChange={e => setAddDescription(e.target.value)}
								placeholder='Enter description'
								className='p-2 border rounded-md'
							/>
						</div>
						<button
							onClick={handleAdd}
							className='border-blue-500 border-[1px] text-blue-500 font-bold rounded-md hover:bg-blue-200 py-2 px-5'
						>
							Add
						</button>
					</div>
				</div>
			)}
			<button
				onClick={() => setOpen(true)}
				className='mt-4 border-green-900 text-green-900 border-[1px] py-2 px-4 rounded-md hover:bg-green-900 hover:text-white font-bold  w-[20%]'
			>
				Add +
			</button>
			<div className='mt-6 space-y-4'>
				{data.map(todo => (
					<div
						key={todo.id}
						className='flex justify-between items-center p-4 bg-gray-200 rounded-lg'
					>
						<div>
							<p className='text-lg font-semibold'>{todo.title }</p>
							<p className='text-gray-600'>{todo.description}</p>
						<p className=''>{todo.status?"done":"not done"}</p>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								className='w-[15px]'
								checked={todo.status}
								onChange={()=>dispatch(completed(todo.id))}
							/>
							<button
								onClick={() => dispatch(del(todo.id))}
								className='bg-red-500 text-white py-[4px] px-[10px] text-[12px] rounded-md hover:bg-red-600 '
							>
								Delete
							</button>
							<button
								onClick={() => dispatch(editCLick(todo))}
								className='bg-red-500 text-white py-[4px] px-[10px] text-[12px] rounded-md hover:bg-red-600 '
							>
								edit
							</button>
						</div>
					</div>
				))}
			</div>

			{openEdit && (
				<div className='fixed m-auto top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
					<div className='flex flex-col items-center gap-3 rounded-lg bg-white	border-black border-2 p-10'>
						<p className='font-bold'>edit todo</p>
					<div className='flex gap-5'>
						<input
							type='text'
							value={editTitle}
							onChange={e => setEditTitle(e.target.value)}
							placeholder='Edit title'
							className='p-2 border rounded-md'
						/>
						<input
							type='text'
							value={editDescription}
							onChange={e => setEditDescription(e.target.value)}
							placeholder='Edit description'
							className='p-2 border rounded-md'
						/>
					</div>
					<button
						onClick={handleUpdate}
						className='border-blue-500 border-[1px] text-blue-500 font-bold rounded-md hover:bg-blue-200 py-2 px-5'
					>
						Update
					</button>
				</div>
				</div>
			)}
		</div>
	)
}
