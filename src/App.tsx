import { useState } from 'react';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';

type Page = 'home' | 'register';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <>
      {currentPage === 'home' ? (
        <LandingPage onNavigateToRegister={() => setCurrentPage('register')} />
      ) : (
        <RegistrationForm onNavigateToHome={() => setCurrentPage('home')} />
      )}
    </>
  );
}

export default App;
