import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";

//import Pages
import Login from './pages/Login_Signup/Login.jsx';
import Signup from './pages/Login_Signup/Signup.jsx';
import BookDetails from './pages/Details/BookDetails.jsx';
// manga pages
import MangaReader from './pages/Manga/MangaReader.jsx';
// novel pages
import NovelReader from './pages/Novel/NovelReader.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/manga" element={<MangaReader />} />
      <Route path="/book" element={<BookDetails />} />
      <Route path="/novel" element={<NovelReader />} />
    </Routes>
  </BrowserRouter>
)
