import { useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  completed: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    console.log(tasks);
  };

  const addTask = (name: string) => {
    const newTask: ITask[] = [...tasks, { name, completed: false }];
    setTasks(newTask);
  };
  console.log(tasks);
  return (
    <div className="container-md p-4">
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
                />
                <button className="btn btn-primary">Guardar</button>
              </form>
            </div>
          </div>

          {tasks.map((t: ITask, i: number) => {
            return <h1 key={i}>{t.name}</h1>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
