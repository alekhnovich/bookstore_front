import React from 'react';
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Cart} from "./pages"; 
import { PostsByTag } from "./pages/PostsByTag";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/tags/:tag' element={<PostsByTag />} />
          <Route path='/cart' element={<Cart />} /> {/* Добавлен новый маршрут для корзины */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
