import { useEffect, useContext } from 'react';
import { UserContext } from "./context";

import { Routes, Route } from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component'
import {useNavigate} from "react-router";
import HomeComponent from "./routes/Home/Home.component";


const App = () => {
    const { userData, getCurrentUser } = useContext(UserContext)
    const navigator = useNavigate();

  useEffect( () => {
      getCurrentUser().then((isUser) => isUser ? navigator('/home') : navigator('/auth'))
  }, [userData]);

  return (
      <Routes>
          <Route path='/auth' element={<Authentication />}/>
          <Route path='/home' element={<HomeComponent />} />
      </Routes>
  );
};

export default App;