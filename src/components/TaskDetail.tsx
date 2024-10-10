import { Task } from "../types"
import { toast, Slide } from "react-toastify"
import TaskDetailItem from "./TaskDetailItem"
import { useTaskStore } from "../store"

type TaskDetailProps = {
  task: Task
}

export default function TaskDetail({ task }: TaskDetailProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const getTaskById = useTaskStore((state) => state.getTaskById)

  const handleClick = () => {
    deleteTask(task.id)
    toast("Tarea eliminada con éxito", { type: "success", transition: Slide })
  }

  return (
    <div className="mx-5 my-10 px-5 py-5 bg-white rounded-lg shadow-md">
      <TaskDetailItem label="Actividad" data={task.activity} />
      <TaskDetailItem label="Descripción" data={task.description} />
      <TaskDetailItem label="Fecha" data={task.date.toString()} />
      <div className="flex flex-col lg:flex-row justify-between gap-3 mt-10">
        <button
          className="py-2 px-10 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-lg shadow-lg"
          type="button"
          onClick={() => getTaskById(task.id)}
        >
          Editar
        </button>

        <button
          className="py-2 px-10 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow-lg"
          type="button"
          onClick={handleClick}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
