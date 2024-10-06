import Footer from "../ui/dashboard/Footer";
import Navbar from "../ui/dashboard/Navbar";
import Sidebar from "../ui/dashboard/Sidebar";

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return(
        <>
            <Navbar />
            <Sidebar />
            {children}
            <Footer />        
        </>
    )
}

export default Layout