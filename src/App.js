import { useEffect, useState } from "react";
import axios from 'axios';


function App() {
  const [todos,setTodos]=useState([]);
  const [todosPerPage,setTodosPerPage]=useState(5);
  const [currentPage,setCurrentPage]=useState(1)
  useEffect(()=>{
    axios.get('https://dummyjson.com/todos')
    .then((res)=>setTodos(res.data.todos))
  },[])

  const numberOfTotalPage= Math.ceil(todos.length/todosPerPage);
  const pages = [...Array(numberOfTotalPage+1).keys()].slice(1);
  
  const indexOfLastTodos=currentPage * todosPerPage;
  const indexOfFirstTodos=indexOfLastTodos - todosPerPage;

  const visibleTodos=todos.slice(indexOfFirstTodos,indexOfLastTodos)

  return (
    <div>
      {
        visibleTodos.map((todoItem)=>(
          <p key={todoItem.id}>
            {todoItem.todo}
          </p>
        ))
      }
      <span>prev</span>
      <h1>{
            pages.map((page)=>
            <span 
            key={page}
            onClick={()=>setCurrentPage(page)}
            className={`${currentPage ===page} ? 'active':''`}
            >
            {`${page} | `}
            </span>)
          }</h1>
          <span>next</span>
    </div>
  );
}

export default App;
