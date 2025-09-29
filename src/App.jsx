import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Login from './Components/Login';
import Home from './Components/Home';
import ProtectedRoute from './Components/ProtectedRoute'; 
import Bookshelves from './Components/BookShelves';
import BookDetails from './Components/BookDetails';
import PageNotFound from './Components/PageNotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookshelves"
          element={
            <ProtectedRoute>
              <Bookshelves />
            </ProtectedRoute>
          }
        />
        <Route path="/BookDetails/:bookId" element={
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        }
        />
        <Route path='*' element={
          <PageNotFound/>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
