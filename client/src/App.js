import './App.css';
import { Routes,Route } from "react-router-dom";
import Layout from './component/layout';
import HomePage from './component/HomePage';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import { UserContextProvider } from './context/UserContext';
import CreatePostPage from './component/CreatePostPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/create' element={<CreatePostPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
