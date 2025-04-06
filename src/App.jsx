import { Routes, Route } from "react-router";

//import Pages
import Login from './pages/Login_Signup/Login.jsx';
import Signup from './pages/Login_Signup/Signup.jsx';
import Profile from './pages/Profile/Profile.jsx';
import BookDetails from './pages/Details/BookDetails.jsx';
// manga pages
import MangaReader from './pages/Manga/MangaReader.jsx';
// novel pages
import NovelList from "./pages/Novel/NovelList.jsx";
import NovelDetails from "./pages/Details/NovelDetails.jsx";
import NovelReader from './pages/Novel/NovelReader.jsx';
//search result pages
import ResultPage from './pages/SearchResult/ResultPage.jsx';
// Homepage
import Home from './pages/Home/Home.jsx';

//import Layout
import Layout from "./layouts/Layout.jsx";
//import potected layout
import ProtectedRoute from "./services/ProtectedRoute.jsx";

//toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute allowedRoles={['reader']} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/mangaReader/:mangaId/:mangaTitle/:chapterNumber/:chapterTitle/:chapterId" element={<MangaReader />} />
          <Route path="/bookDetail/:mangaId" element={<BookDetails />} />
          <Route path="/novel" element={<NovelList />} />
          <Route path="/novel/:novelid" element={<NovelDetails />} />
          <Route path="/novel/:novelid/:noveltitle/:chapterid/:chaptertitle" element={<NovelReader />} />
          <Route path='/result/:keyword' element={<ResultPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;