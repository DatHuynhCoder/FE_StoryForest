import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";

const Layout = () => {
  return (
    <>
      <Header />
    <div style={{position: 'relative', zIndex: 0}}> <Outlet /></div>
     
      <Footer />
    </>
  )
}

export default Layout;