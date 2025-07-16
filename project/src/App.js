import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; // 在组件每次渲染后更新ref的current值
  });
  return ref.current; // 返回上一个值
}

function App(props) {
  const [tasks, setTasks] = useState(props.task);
  const [filter, setFilter] = useState("All");

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }; // 检测到复选框事件，反转completed状态
      }
      return task;
    });

    setTasks(updatedTasks); // 更新tasks状态
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks); // 更新tasks状态
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList); // 更新tasks状态
  }

  const taskList = tasks?.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask} // 传递删除任务的函数
      editTask={editTask} // 传递编辑任务的函数
    />
  ));

  const headingText = `${taskList.length} task${
    taskList.length !== 1 ? "s" : ""
  } remaining`;

  const listHeadingRef = useRef(null);
  const preTaskLength = usePrevious(taskList.length);
  useEffect(() => {
    if (taskList.length > 0) {
      if (preTaskLength !== taskList.length) {
        listHeadingRef.current.focus(); // 聚焦到任务列表标题
      }
    } else {
      listHeadingRef.current.blur(); // 如果没有任务，取消聚焦
    }
  }, [taskList.length, preTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
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
