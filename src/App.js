import { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';


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

  const prevPageHandler =()=>{
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPageHandler =()=>{
    if(currentPage !== numberOfTotalPage){
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div>
      <select onChange={(e)=>setTodosPerPage(e.target.value)}>
        <option value='5'>5</option>
        <option value='15'>15</option>
        <option value='30'>30</option>
      </select>
      {
        visibleTodos.map((todoItem)=>(
          <li key={todoItem.id}>
            {todoItem.todo}
          </li>
        ))
      }
      <button onClick={prevPageHandler}>prev</button>
      <h3>{
            pages.map((page)=>
            <span 
            key={page}
            onClick={()=>setCurrentPage(page)}
            className={`${currentPage === page ? 'active':''}`}
            >
            {`${page} | `}
            </span>)
          }</h3>
          <button onClick={nextPageHandler}>next</button>
    </div>
  );
}

export default App;
