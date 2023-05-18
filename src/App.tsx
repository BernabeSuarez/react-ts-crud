import { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  completed: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTask: ITask[] = [...tasks, { name, completed: false }];
    setTasks(newTask);
  };

  const changeStatus = (i: number): void => {
    const newTask: ITask[] = [...tasks];
    newTask[i].completed = !newTask[i].completed;
    setTasks(newTask);
  };

  const deleteTask = (i: number): void => {
    const newTask: ITask[] = [...tasks];
    newTask.splice(i, 1);
    setTasks(newTask);
  };
  return (
    <div className="container-md p-4">
      <h2 className="text-center">ToDo List React + Ts</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Agregar Tarea"
                  value={newTask}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">
                  Guardar
                </button>
              </form>
            </div>
          </div>

          {tasks.map((t: ITask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h4 style={{ textDecoration: t.completed ? "line-through" : "" }}>
                {t.name}
              </h4>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => changeStatus(i)}
                >
                  {t.completed ? "x" : "✓"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
