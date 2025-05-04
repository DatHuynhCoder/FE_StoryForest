import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;