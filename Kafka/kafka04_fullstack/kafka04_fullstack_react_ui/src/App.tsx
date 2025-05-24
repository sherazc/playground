import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppNavigationLayout } from './navigation/AppNavigationLayout';
import { Home } from './component/Home';
import { Users } from './component/Users';
import { UserCreate } from './component/UserCreate';
import { Login } from './component/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppNavigationLayout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/users' element={<Users/>}></Route>
          <Route path='/user-create' element={<UserCreate/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

