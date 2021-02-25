import Todo from "./components/Todo";

function App(props) {
  return (
    <div className="">
      <h1>TodoLists</h1>
      <form>
        <h2 className="">
          <label htmlFor="new-todo-input" className="">
            Add a task and assign it to a person
          </label>
        </h2>
        <div>
          <input
            type="text"
            id="new-todo-input"
            className=""
            name="text"
            autoComplete="off"
          />
          <input
            type="text"
            id="new-todo-input"
            className=""
            name="text"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="">
          Add
        </button>
      </form>
      <div className="">
        <button type="button" className="" aria-pressed="true">
          <span className="">Show </span>
          <span>all</span>
          <span className=""> tasks</span>
        </button>
        <button type="button" className="" aria-pressed="false">
          <span className="">Show </span>
          <span>Active</span>
          <span className=""> tasks</span>
        </button>
        <button type="button" className="" aria-pressed="false">
          <span className="">Show </span>
          <span>Completed</span>
          <span className=""> tasks</span>
        </button>
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <Todo name="Eat" id="todo-0" />
        <Todo name="Sleep" id="todo-1" />
        <Todo name="Exercise" id="todo-2" />
      </ul>
    </div>
  );
}

export default App;
