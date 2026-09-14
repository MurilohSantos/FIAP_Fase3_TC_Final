import { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import api from './api';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/Main/MainContent';

import postReducer from './reducers/postReducer';
import { Post } from './types';
import PostList from './components/Post/PostList';
import NewPost from './pages/NewPost/NewPost';
import EditPost from './pages/EditPost/EditPost';
import Login from './pages/Login/Login';
import StudentHome from './pages/StudentHome/StudentHome';
import PostDetails from './pages/PostDetails/PostDetails';



import './App.css';

const initialState = {
  posts: [] as Post[],
};

function App() {
  const [state, dispatch] = useReducer(postReducer, initialState);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get<Post[]>('/posts');

        console.log('Dados recebidos:', response.data);

        dispatch({
          type: 'SET_POSTS',
          payload: response.data,
        });
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      }
    }

    loadPosts();
  }, []);

  console.log('Estado atual:', state.posts);

  return (
    <Router>
      <div className="app-container">

        <Header />

        <MainContent>
          <Routes>

            <Route
              path="/"
              element={
                <main>
                  <h1>Feed</h1>

                  <PostList posts={state.posts} />
                </main>
              }
            />

            <Route
              path="/new-post"
              element={<NewPost />}
            />

            <Route
              path="/edit-post/:id"
              element={<EditPost />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/aluno"
              element={<StudentHome />}
            />

            <Route
              path="/post/:id"
              element={<PostDetails />}
            />

            <Route
              path="/"
              element={
                <main>
                  <h1>Feed</h1>

                  <PostList posts={state.posts} />
                </main>
              }
            />


          </Routes>
        </MainContent>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
