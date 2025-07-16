import { useState, useRef, useEffect } from "react"; // useEffect在组件渲染后立即运行；useRef.current值用于存储焦点

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; // 在组件每次渲染后更新ref的current值
  });
  return ref.current; // 返回上一个值
}

function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  // 使用usePrevious钩子来获取上一个isEditing状态
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus(); // 聚焦到编辑输入框
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus(); // 聚焦到编辑按钮
    }
  }, [wasEditing, isEditing]); // 依赖于wasEditing和isEditing状态变化

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newName && newName.trim() !== "") {
      props.editTask(props.id, newName); // 调用传入的编辑任务函数
      setIsEditing(false); // 提交后退出编辑模式
      setNewName(""); // 清空输入框
    }
  }

  // 任务编辑视图
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setIsEditing()}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  // 任务查看视图
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setIsEditing(true)} // 切换到编辑模式
          ref={editButtonRef} // 设置ref以便在编辑模式时聚焦
        >
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
