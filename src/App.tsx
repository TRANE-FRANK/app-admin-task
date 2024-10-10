import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

function App() {
  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="font-black text-5xl text-center mx-3 md:w-2/3 md:mx-auto">
          Tareas {""}
        </h1>

        <div className="mt-12 md:flex">
          <TaskForm />
          <TaskList />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
