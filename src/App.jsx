import Home from "./Home";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VoteComponent from "./VoteComponent";

function App() {

  return (
    <Router>
      <div className="content">
          < NavBar />
        <div className="home-content">
          <Routes>
            < Route exact path="/" element={< Home />} />
            < Route exact path="/vote" element={ < VoteComponent /> } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
