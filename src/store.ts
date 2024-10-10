import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { DraftTask, Task } from "./types"
import { v4 as uuidv4 } from "uuid"

type TaskState = {
  task: Task[]
  activeId: Task["id"]

  addTask: (data: DraftTask) => void
  deleteTask: (id: Task["id"]) => void
  getTaskById: (id: Task["id"]) => void
  updateTask: (data: DraftTask) => void
}

const createTask = (task: DraftTask): Task => {
  return { ...task, id: uuidv4() }
}

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      (set) => ({
        task: [],
        activeId: "",
        addTask: (data) => {
          const newTask = createTask(data)
          set((state) => ({
            task: [...state.task, newTask],
          }))
        },

        deleteTask: (id) => {
          set((state) => ({
            task: state.task.filter((task) => task.id !== id),
          }))
        },
        
        getTaskById: (id) => {
          set(() => ({
            activeId: id,
          }))
        },

        updateTask: (data) => {
          set((state) => ({
            task: state.task.map((task) =>
              task.id === state.activeId ? createTask(data) : task
            ),
          }))
        },
      }),
      {
        name: "task-storage",
      }
    )
  )
)
