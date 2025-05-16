import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import GeminiChat from "../chat";

const Layout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />

    <main className="flex-1">
      <Outlet />
    </main>
    <GeminiChat />

    <Footer />
  </div>
);

export default Layout;
