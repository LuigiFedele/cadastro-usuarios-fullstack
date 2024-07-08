import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'


function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const userFromAPI = await api.get('/usuarios')
    setUsers(userFromAPI.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder='Nome' name='name' type='text' ref={inputName}/>
        <input placeholder='Idade' age='age' type='number' ref={inputAge}/>
        <input placeholder='Email' email='email' type='email' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)} >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAPpJREFUOE/tldERgjAQRHN0kKQB6AQrUSsRKtFOxEqkgSQdcM46wABeCMOMf/AFc9zLsrkspP5wUYoZQiild7TWTaw3CgWMmZ8ri7bGmEKqR6HOuTsRXZj5sWwkolwpVRLRSVIchXrvoRKNhda6nYKdczciqpLQEELedd1taIZK3EeUwud8WbPWXtEzKt3gYWpPR4+nUPgEtefeyyrLstcaiZnxZbAICpvBph9PU35NF4n5noR6798AYXwGi5i5stbWB1Sc5cPT+Xgv57SPvhaDjaOMA6KU+j7vHqm1E7UZuicDjDGzDRejr7dATHwhW+tlpiZ/J6lokuofF9QqJTVagd4AAAAASUVORK5CYII=" />
          </button>
        </div>
      ))}
    </div>

  )
}

export default Home
