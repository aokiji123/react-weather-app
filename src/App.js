import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import MainPage from './components/MainPage/MainPage';
import Login from './components/Login/Login';
import './App.css';

const App = () => {
  const user = useSelector(selectUser)

  return (
    <div>
      {user ? <MainPage /> : <Login />}
    </div>
  )
}

export default App;