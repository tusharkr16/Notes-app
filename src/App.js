
import './App.css';
import Home from './Pages/Home/Home';
import MyNotes from './Pages/Notes/MyNotes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main style={{ minHeight: "93vh" }}>
          <Routes>
            <Route path='/' Component={Home} exact />
            <Route path='/myNotes' Component={() => <MyNotes />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
