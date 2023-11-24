import React, { useEffect, useRef, useState } from "react";
import "./todo.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoIosDoneAll } from "react-icons/io";

const Form = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editid,setEditid]=useState(0);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const addFunction = () => {
    if(todo!==""){
        setTodos([...todos,{val:todo,id:Date.now(),status:false} ]);
        console.log(todos);
        setTodo("");
    }
    if(editid){
        const editval=todos.find((each)=>each.id===editid)
        const updatetodo=todos.map((value)=>value.id===editval.id
        ?(value={id:editval.id,val:todo})
        :(value={id:editval.id,val:value.val}))
        setTodos(updatetodo)
        setEditid(0)
    }

  };
  const submitForm = (e) => {
    e.preventDefault();
  };

  const deleteme=(id)=>{
   setTodos( todos.filter((to)=>to.id!==id))
  }

  const completeme=(id)=>{
    const finlist=todos.map((each)=>{
        if(each.id===id){
            return {...each,status:!each.status}
        }
        return each
    })
    setTodos(finlist)

  }

  const editme=(id)=>{
    const edittodo=todos.find((each)=>each.id===id)
    console.log(edittodo);
    setTodo(edittodo.val)
    setEditid(edittodo.id)
  }
  return (
    <div className="container">
      <h2 className="heading"> Your Todo List</h2>
      <form className="form-group" onSubmit={submitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your todo"
          ref={inputRef}
          value={todo}
          onChange={(e) => {
            // console.log(e.target.value);
            setTodo(e.target.value);
          }}
        />
        <button className="button-class" onClick={addFunction}>
          {editid?"EDIT":"ADD"}
        </button>
      </form>
      <div>
        <ul className="list ">
          {todos.map((items) => (
            <li className="form-control "
            id={items.status?"strike":""}
            >
              {items.val}
              <span className="icons-list">
                <IoIosDoneAll className="activities"  title="complete"id="done"
                onClick={()=>completeme(items.id)}
                />
                <FaEdit className="activities" title="edit" id="edit" 
                onClick={()=>editme(items.id)}/>
                <MdDeleteOutline className="activities" title="delete" id="delete"
                onClick={()=>deleteme(items.id)} 
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
