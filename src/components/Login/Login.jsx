import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../features/userSlice"
import './LoginStyles/Login.css'

const Login = () => {
  const [email, setEmail] = useState("")
  
  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (email !== "") {
      dispatch(
        login({
          email,
          loggedIn: true
        })
      )
    }
    
  }

  return (
    <div className="login">
      <h1>Weather App</h1>
      <h2>Login here!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input 
          className="login__input"
          type="email" 
          placeholder="Enter email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="login__button">Login</button>
      </form>
    </div>
  )
}

export default Login