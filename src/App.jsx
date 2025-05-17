import { Routes, Route } from "react-router";

//import Pages
import Login from './pages/Login_Signup/Login.jsx';
import Signup from './pages/Login_Signup/Signup.jsx';
import OtherProfile from "./pages/OtherProfile/OtherProfile.jsx";
import Profile from './pages/Profile/Profile.jsx';
import BookDetails from './pages/Details/BookDetails.jsx';
import OTP from "./pages/Login_Signup/ForgetPass/OTP.jsx";
import ChangePassword from "./pages/Login_Signup/ForgetPass/ChangePass.jsx";
// manga pages
import MangaList from './pages/Manga/MangaList.jsx';
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

//Admin
import AdminLayout from "./layouts/Admin/AdminLayout.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import UserManagement from "./pages/Admin/UserManagement.jsx";
import WebManagement from "./pages/Admin/WebManagement.jsx";
import UserInformations from "./components/UserMagement/UserInfor.jsx";
import StaffInformations from "./components/UserMagement/StaffInfor.jsx";
import AddStaffForm from "./components/UserMagement/AddStaffForm.jsx";

// Staff
import StaffLayout from "./layouts/Staff/StaffLayout.jsx";
import StoryManagement from "./pages/Staff/StoryManagement.jsx";
import DetailStory from "./components/Staff/DetailStory.jsx";
import EditChapter from "./components/Staff/EditChapter.jsx";
import EditStory from "./components/Staff/EditStory.jsx";
import AddNewStory from "./components/Staff/AddNewStory.jsx";
import AddChapter from "./components/Staff/AddChapter.jsx";


import VipManagement from "./pages/Staff/VIPManagement.jsx";
// import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch.jsx";
import Result from "./pages/SearchResult/Result.jsx";
// Payment
import Success from "./pages/Payment/Success.jsx";
import Cancel from "./pages/Payment/Cancel.jsx";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/changepass" element={<ChangePassword />} />

        <Route element={<Layout />}>
          <Route element={<ProtectedRoute allowedRoles={['reader','VIP reader','admin','staff']} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/manga" element={<MangaList />} />
          <Route path="/manga/:_id" element={<BookDetails />} />
          <Route path="/mangaReader/:mangaid/:chapterid" element={<MangaReader />} />
          <Route path="/novel" element={<NovelList />} />
          <Route path="/novel/:_id" element={<NovelDetails />} />
          <Route path="/novelReader/:_id/:chapterid" element={<NovelReader />} />
          <Route path='/result/:keyword' element={<ResultPage />} />
          <Route path='/advanced-search' element={<AdvancedSearch/>}/>
          <Route path="/otherprofile/:_id" element={<OtherProfile />} />
        </Route>



        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/user-management" element={<UserManagement />}> </Route>
          <Route path="/admin/user-management/users/:id" element={<UserInformations />} />
          <Route path="/admin/user-management/staff/:id" element={<StaffInformations />} />
          <Route path="/admin/web-management" element={<WebManagement />} />
        </Route>

        <Route element={<StaffLayout />}>
          <Route path="/staff/story-management" element={<StoryManagement />}> </Route>
          <Route path="/staff/story-management/edit-story/:id_story" element={<EditStory />}> </Route>
          <Route path="/staff/story-management/edit-chapter/:chapterTitle/:chapterId" element={<EditChapter />}> </Route>
          <Route path="/staff/story-management/add-chapter/:id_story" element={<AddChapter />}> </Route>
          <Route path="/staff/story-management/detail-story/:id" element={<DetailStory />}> </Route>
          <Route path="/staff/story-management/add-story" element={<AddNewStory />}> </Route>


          <Route path="/staff/vip-management" element={<VipManagement />}> </Route>
        </Route>
        <Route path="/payment/success" element={<Success />} />
        <Route path="/payment/cancel" element={<Cancel />} />

      </Routes>

      <ToastContainer />
    </>
  )
}

export default App;