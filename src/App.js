import { useState } from "react";

export default function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="App">
      <h1>Note Taking App</h1>

      <ItemContainer tasks={tasks} onRemove={handleRemoveItem} />

      {displayForm && <ItemAddForm onAddItem={handleAddItem} />}

      <button className="btn-add" onClick={handleToggleForm}>
        &#x2b;
      </button>
    </div>
  );
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
        <div className="col-75">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="col-25">
          <label>Task Title</label>
        </div>
      </div>

      <div className="row">
        <div className="col-75">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="col-25">
          <label>Task Description</label>
        </div>
      </div>
      <div className="row">
        <div className="col-75">
          <button className="submit">submit</button>
        </div>
      </div>
    </form>
  );
}
