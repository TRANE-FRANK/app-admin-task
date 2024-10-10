import { useTaskStore } from "../store"
import TaskDetail from "./TaskDetail"

export default function TaskList() {
  const task = useTaskStore((state) => state.task)
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {task.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Lista Tareas ✏ </h2>
          <p className="text-xl mt-5 text-center mb-5">
            Administra tus{" "}
            <span className="font-bold text-cyan-500">Tareas 📚 </span>
          </p>
          {task.map((task) => (
            <TaskDetail key={task.id} task={task} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Tareas</h2>
          <p className="text-center text-xl mt-5 mb-10">
            Agrega una tarea{" "}
            <span className="text-cyan-600 font-bold">y aparecerán aqui</span>
          </p>
        </>
      )}
    </div>
  )
}
