import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Card from 'react-bootstrap/Card'
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
      <Card className='upperCard'>
        <TextField
          id="outlined-basic"
          label="Add Todo"
          variant="outlined"
          value={todo}
          onChange={e => {
            setTodo(e.target.value)
          }}
          style={{ width: '60%' }}
        />
        &nbsp;&nbsp;
        <Button
          variant="contained"
          size="large"
          endIcon={<AiOutlinePlusCircle />}
          className="sendButton"
          onClick={e => handleTask(e)}
        >
          Add
        </Button>
      </Card>
      <br />
      <div className='container d-flex flex-column'>
        {allTodo.length > 0 ? (
          <>
            {allTodo.map(todoo => {
              return (
                <Card className="listCard" key={todoo.id}>
                  <Card.Body className='listcardBody'>
                    {/* <RiTodoLine style={{ float: 'left' }} /> */}
                    {todoo.todo}
                      
                    <Button
                      onClick={() => deleteTodo(todoo.id)}
                      style={{ color: 'black', float: 'right' }}
                    >
                      <RiDeleteBinLine style={{fontSize:'25px'}} />
                    </Button>
                  </Card.Body>
                </Card>
              )
            })}
          </>
        ) : (
          <h3>no todo listed</h3>
        )}
      </div>
    </div>
  )
}

export default Home
