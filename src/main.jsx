import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";

//import Pages
import Login from './pages/Login_Signup/Login.jsx';
import Signup from './pages/Login_Signup/Signup.jsx';
import Profile from './pages/Profile/Profile.jsx';
import BookDetails from './pages/Details/BookDetails.jsx';
// manga pages
import MangaReader from './pages/Manga/MangaReader.jsx';
// novel pages
import NovelReader from './pages/Novel/NovelReader.jsx';
//search result pages
import ResultPage from './pages/SearchResult/ResultPage.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<App />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/manga" element={<MangaReader />} />
      <Route path="/book" element={<BookDetails />} />
      <Route path="/novel" element={<NovelReader />} />
      {/* <Route path="/search-result" element={<SearchResults/>}/>
      <Route path="/filter-result" element={<FilteredBook/>}/>
      <Route path="/author-result" element={<AuthorBook/>}/> */}
      <Route path='/test' element={<ResultPage/>}/>
    </Routes>
  </BrowserRouter>
)
