import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import './LogoutStyles/Logout.css'

const Logout = () => {
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout())
  }

  return (
    <div>
      <button className="logout__button" onClick={handleLogout}>Logout!</button>
    </div>
  )
}

export default Logout