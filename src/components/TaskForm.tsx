import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Error from "./Error"
import type { DraftTask } from "../types"
import { useTaskStore } from "../store"
import { useEffect } from "react"

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask)
  const activeId = useTaskStore((state) => state.activeId)
  const task = useTaskStore((state) => state.task)
  const updateTask = useTaskStore((state) => state.updateTask)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DraftTask>()

  useEffect(() => {
    if (activeId) {
      const activeTask = task.filter((task) => task.id === activeId)[0]
      setValue("activity", activeTask.activity)
      setValue("description", activeTask.description)
      setValue("date", activeTask.date)
    }
  }, [activeId])

  const registerTask = (data: DraftTask) => {
    if (activeId) {
      updateTask(data)
      toast("Tarea actualizada con éxito", { type: "success" })
    } else {
      addTask(data)
      toast("Tarea guardada con éxito", { type: "success" })
    }
    reset()
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento de Tareas</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade tus <span className="font-bold text-cyan-500">Tareas 📚 </span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg px-5 py-10 pb-8 mb-10"
        noValidate
        onSubmit={handleSubmit(registerTask)}
      >
        <div className="mb-5">
          <label htmlFor="activity" className="text-lg font-bold">
            Actividad
          </label>
          <input
            id="activity"
            type="text"
            className="w-full p-2 border rounded-lg bg-gray-100 "
            placeholder="Escribe una actividad o tarea..."
            {...register("activity", {
              required: "El de actividad es requerido",
            })}
          />
          {errors.activity && <Error>{errors.activity.message?.toString()}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="text-lg font-bold">
            Descripción
          </label>
          <textarea
            id="description"
            placeholder="Escribe una descripción de la tarea o actividad..."
            className="w-full p-2 border rounded-lg bg-gray-100 "
            {...register("description", {
              required: "El de actividad es requerido",
            })}
          />
          {errors.description && <Error>{errors.description.message?.toString()}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="activity" className="text-lg font-bold">
            Actividad
          </label>
          <input
            id="date"
            type="date"
            className="w-full p-2 border rounded-lg bg-gray-100 "
            {...register("date", { required: "La fecha es requerida" })}
          />
          {errors.date && <Error>{errors.date.message?.toString()}</Error>}
        </div>
        <input
          type="submit"
          value="Gudardar Tarea"
          className="bg-cyan-500 w-full p-3 text-white font-bold hover:bg-cyan-600 cursor-pointer rounded-lg transition-colors"
        />
      </form>
    </div>
  )
}
