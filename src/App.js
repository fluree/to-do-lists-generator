function App(props) {
  return (
    <div className="">
      <h1>TodoLists</h1>
      <form>
        <h2 className="">
          <label htmlFor="new-todo-input" className="">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className=""
          name="text"
          autoComplete="off"
        />
        <button type="submit" className="">
          Add
        </button>
      </form>
      <div className="filters btn-group stack-exception">
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
        <li className="">
          <div className="">
            <input id="todo-0" type="checkbox" defaultChecked={true} />
            <label className="" htmlFor="todo-0">
              Eat
            </label>
          </div>
          <div className="">
            <button type="button" className="">
              Edit <span className="">Eat</span>
            </button>
            <button type="button" className="">
              Delete <span className="">Eat</span>
            </button>
          </div>
        </li>
        <li className="">
          <div className="">
            <input id="todo-1" type="checkbox" />
            <label className="todo-label" htmlFor="todo-1">
              Sleep
            </label>
          </div>
          <div className="">
            <button type="button" className="">
              Edit <span className="">Sleep</span>
            </button>
            <button type="button" className="">
              Delete <span className="">Sleep</span>
            </button>
          </div>
        </li>
        <li className="">
          <div className="">
            <input id="todo-2" type="checkbox" />
            <label className="" htmlFor="todo-2">
              Repeat
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="">
              Edit <span className="">Repeat</span>
            </button>
            <button type="button" className="">
              Delete <span className="">Repeat</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
