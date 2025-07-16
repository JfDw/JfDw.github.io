import React from "react";
import { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(event) {
    event.preventDefault(); // 阻止默认事件，防止表单提交
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!(name === null || name.trim() === "")) {
      props.onSubmit(name); // 这是一个App.js中的回调函数，props=App.js中的addTask函数
    }
    setName(""); // 清空输入框
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
