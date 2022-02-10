//components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Links from "./components/Links";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
//contexts
import AuthContextProvider from "./hooks/AuthContext";
function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <Links />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<h1>Error 404 page not found!</h1>} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  );
}
export default App;
