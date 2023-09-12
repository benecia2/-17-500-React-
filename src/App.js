import './App.css';
import axios from "axios"
import {useState,useEffect } from "react"
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import {Container} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [listContent, setListContent] = useState([])

    useEffect(()=>{
      listTodo()
    },[])

    //방법1(추가)
    const insertTodo = (todo) =>{
      fetch('todo/insert',{
        method: 'post',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          subject: todo.subject,
          name: todo.name,
          summary: todo.summary
        })
      })
      .then((resp)=> resp.json())
      .then((resp)=> {
        console.log(resp)
        alert('등록완료')
        setListContent(listContent.concat(
          {
            num: resp.num,
            name: todo.name,
            subject: todo.subject,
            summary: todo.summary,
            ...listContent
          }
          ))
      })
    }

   //방법2(추가)
  // const insertTodo = (data)=>{
  //   axios.post('todo/insert',{
  //     subject: data.subject,
  //     name: data.name,
  //     summary: data.summary
  //   }).then((resp)=>{
  //     console.log('resp:',resp)
  //     alert("전송완료")
  //     setListContent(listContent.concat(
  //       {
  //       num: resp.data.num,
  //       subject: data.subject,
  //       name: data.name,
  //       summary: data.summary,
  //       ...listContent
  //         }
  //       ))
  //   })
  // }

  //전체보기
  const listTodo = () =>{
    axios.get("todo/list").then((resp)=>{
      console.log(resp.data);
      setListContent(resp.data)
    })
  }

  //삭제
  const todoDelete = (num)=>{
    axios.delete("todo/delete/"+num)
    .then(()=>{
      alert("삭제 성공")
      setListContent(listContent.filter(todo=>todo.num !== num))
    })
  }

  return (
    <div>
      <Container><h1>To Do</h1></Container>
      <TodoForm insertTodo={insertTodo}
                listTodo={listTodo}/>
      <hr/>
      <TodoList todos={listContent} todoDelete={todoDelete}/>
    </div>
  );
}

export default App;
