import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios'
import { RiDeleteBinLine, RiTodoLine } from 'react-icons/ri'
import './Home.css'

function Home() {
  const [todo, setTodo] = useState('')
  const [allTodo, setAllTodos] = useState('')

  React.useEffect(() => {
    getAllTodos()
  }, [])

  const getAllTodos = () => {
    axios.get('http://localhost:8080/todo').then(response => {
      const allTodos = response.data.todolist
      setAllTodos(allTodos)
    })
  }

  const handleTask = () => {
    axios.post('http://localhost:8080/todo', { todo }).then(res => {
      const allTodos = res.data.todolist
      setAllTodos(allTodos)
      setTodo('')
    })
  }
  const deleteTodo = id => {
    axios.delete(`http://localhost:8080/todo/${id}`).then(response => {
      const allTodos = response.data.todolist
      setAllTodos(allTodos)
    })
  }
  return (
    <div className="mainDiv">
      <div className="homeDiv">
        <TextField
          id="outlined-basic"
          label="Enter your task"
          variant="outlined"
          value={todo}
          onChange={e => {
            setTodo(e.target.value)
          }}
        />
        &nbsp;&nbsp;
        <Button
          variant="contained"
          size="large"
          endIcon={<SendIcon />}
          className="sendButton"
          onClick={e => handleTask(e)}
        >
          Send
        </Button>
        <br />
        <br />
        <>
          {allTodo.length > 0 ? (
            <>
              {allTodo.map(todoo => {
                return (
                  <div className="listdiv" key={todoo.id}>
                    <RiTodoLine style={{ float: 'left' }} />
                    {todoo.todo}{' '}
                    <Button
                      onClick={() => deleteTodo(todoo.id)}
                      style={{ color: 'black', float: 'right' }}
                    >
                      <RiDeleteBinLine />
                    </Button>
                  </div>
                )
              })}
            </>
          ) : (
            <h3>no todo listed</h3>
          )}
        </>
      </div>
    </div>
  )
}

export default Home
