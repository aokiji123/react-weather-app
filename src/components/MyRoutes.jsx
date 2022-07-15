import { Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import CityPage from "./CityPage/CityPage";

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const MyRoutes = () => {
  const user = useSelector(selectUser)

  return (
    <Routes>
      {
        user ?
        <Route path="/city" element={<CityPage />} />
        : null
      }
      <Route index element={<App />} />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
 
export default MyRoutes;