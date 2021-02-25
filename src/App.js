import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function App(props) {
  const taskList = props.tasks.map((task) => (
    <Todo id={task.id} name={task.name} key={task.id} />
  ));

  function addTask(name) {
    alert(name);
  }

  return (
    <div className="">
      <h1>TodoLists</h1>
      <Form addTask={addTask} />
      <div className="">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
