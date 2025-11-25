import { useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import RegistrationForm from "./components/RegistrationForm";
import AdminDashboard from "./components/AdminDashboard";
import ConnectPage from "./components/ConnectPage";

type Page = "home" | "register" | "admin" | "connect";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Handle navigation
  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    if (page === "admin") {
      window.history.pushState({}, "", "/admin");
    } else if (page === "register") {
      window.history.pushState({}, "", "/register");
    } else if (page === "connect") {
      window.history.pushState({}, "", "/connect");
    } else {
      window.history.pushState({}, "", "/");
    }
  };

  // Initial page based on URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/admin") {
      setCurrentPage("admin");
    } else if (path === "/register") {
      setCurrentPage("register");
    } else if (path === "/connect") {
      setCurrentPage("connect");
    }
  }, []);

  return (
    <>
      {currentPage === "home" ? (
        <LandingPage
          onNavigateToRegister={() => handleNavigation("register")}
          onNavigateToConnect={() => handleNavigation("connect")}
        />
      ) : currentPage === "register" ? (
        <RegistrationForm onNavigateToHome={() => handleNavigation("home")} />
      ) : currentPage === "connect" ? (
        <ConnectPage
          onNavigateToHome={() => handleNavigation("home")}
          onNavigateToRegister={() => handleNavigation("register")}
        />
      ) : (
        <AdminDashboard onNavigateToHome={() => handleNavigation("home")} />
      )}
    </>
  );
}

export default App;
