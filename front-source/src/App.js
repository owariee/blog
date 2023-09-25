import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Home from './Home';
import Navbar from './Navbar';
import Login from './Login';
import Contact from './Contact';
import Register from './Register';
import Posts from './Posts';
import PostsForm from './PostsForm';
import NoPerm from './NoPerm';
import Post from './Post';
import Search from './Search';
import AuthProvider from './AuthProvider';
import Logout from './Logout';

function App() {
  const scrollUp = () => {
    document.body.scrollTo({top: 0, behavior: "smooth"});
  }

  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthProvider>
          <div className="App">
            <div id="blog-block">
              <Navbar/>
              <div id="blog-container">
                  <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/posts/add" element={<PostsForm />} />
                    <Route path="/posts/edit" element={<PostsForm />} />
                    <Route path="/noperm" element={<NoPerm />} />
                    <Route path="/posts/search" element={<Search />} />
                    <Route path="/logout" element={<Logout />} />
                  </Routes>
              </div>
            </div>
            <div id="blog-img-place">
              <img src="images/kennen.gif"
                alt="Dont put your mouse here!"
                onClick={scrollUp}/>
            </div>
          </div>
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;

