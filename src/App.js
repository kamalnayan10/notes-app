import { useEffect, useState } from "react";

export default function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [tasks, setTasks] = useState(getLocalTasks());

  function handleToggleForm() {
    setDisplayForm((disp) => !disp);
  }

  function handleAddItem(newItem) {
    setTasks([...tasks, newItem]);
    setDisplayForm(false);
  }

  function handleRemoveItem(ID) {
    setTasks(tasks.filter((task) => task.id !== ID));
  }

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <h1>Note Taking App</h1>

      <ItemContainer tasks={tasks} onRemove={handleRemoveItem} />

      {displayForm && <ItemAddForm onAddItem={handleAddItem} />}

      <button
        className={`btn-add ${displayForm ? "active" : ""}`}
        onClick={handleToggleForm}
      >
        &#x2b;
      </button>
    </div>
  );
}

function getLocalTasks() {
  let taskList = localStorage.getItem("tasksList");
  return taskList ? JSON.parse(taskList) : [];
}

function ItemContainer({ tasks, onRemove }) {
  return (
    <div className="container">
      {tasks.map((task) => (
        <Item task={task} onRemove={onRemove} />
      ))}
    </div>
  );
}

function Item({ task, onRemove }) {
  return (
    <div className="item">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button className="btn" onClick={() => onRemove(task.id)}>
        remove
      </button>
    </div>
  );
}

function ItemAddForm({ onAddItem }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { id: Date.now(), title, description };

    if (!title || !description) return;

    onAddItem(newItem);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          ></input>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          ></textarea>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="submit">submit</button>
        </div>
      </div>
    </form>
  );
}
