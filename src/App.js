
import './App.css';
import Createnote from './Pages/CreateNotes/Createnote';
import SingleNotes from './Pages/CreateNotes/SingleNotes';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import MyNotes from './Pages/Notes/MyNotes';
import Register from './Pages/Register/Register';
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
            <Route path='/login' Component={Login} />
            <Route path='/register' Component={Register} />
            <Route path='/createNote' Component={Createnote} />
            <Route path="/MyNote/:id" element={<SingleNotes />} />

          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
