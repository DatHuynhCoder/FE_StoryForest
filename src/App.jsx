import { Routes, Route } from "react-router";

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
// Homepage
import Home from './pages/Home/Home.jsx';

//import Layout
import Layout from "./layouts/Layout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manga" element={<MangaReader />} />
        <Route path="/book" element={<BookDetails />} />
        <Route path="/novel" element={<NovelReader />} />
        <Route path='/result' element={<ResultPage />} />
      </Route>
    </Routes>
  )
}

export default App;