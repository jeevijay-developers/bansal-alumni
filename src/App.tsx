import { useState } from "react";
import LandingPage from "./components/LandingPage";
import RegistrationForm from "./components/RegistrationForm";
import AdminDashboard from "./components/AdminDashboard";

type Page = "home" | "register" | "admin";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Check URL for admin route
  const path = window.location.pathname;

  // Handle navigation
  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    if (page === "admin") {
      window.history.pushState({}, "", "/admin");
    } else if (page === "register") {
      window.history.pushState({}, "", "/register");
    } else {
      window.history.pushState({}, "", "/");
    }
  };
  // Initial page based on URL
  useState(() => {
    if (path === "/admin") {
      setCurrentPage("admin");
    } else if (path === "/register") {
      setCurrentPage("register");
    }
  });

  return (
    <>
      {currentPage === "home" ? (
        <LandingPage
          onNavigateToRegister={() => handleNavigation("register")}
        />
      ) : currentPage === "register" ? (
        <RegistrationForm onNavigateToHome={() => handleNavigation("home")} />
      ) : (
        <AdminDashboard onNavigateToHome={() => handleNavigation("home")} />
      )}
    </>
  );
}

export default App;
