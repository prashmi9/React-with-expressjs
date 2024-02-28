import "./App.css";
import Footer from "./Footer";
import MainContent from "./Main";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import About from "./About";
import ContactUs from "./Contact";
function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="content">
        <Sidebar />
        <div className="container">
          <Router>
            <Routes>
              <Route path="/" exact element={<MainContent />} />
              <Route path="/about" element={<About />}>
                {/* <Route path="/team" element={<About />} />
              <Route path="/history" element={<About />} /> */}
              </Route>
              <Route path="/register" element={<ContactUs />} />
            </Routes>
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
