import Home from "./Home";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GuideComponent from "./GuideComponent";
import LoginComponent from "./LoginComponent";
import VotePageComponent from "./VotePageComponent";

function App() {

  return (
    <Router>
      <div className="content">
          < NavBar />
        <div className="home-content">
          <Routes>
            < Route exact path="/" element={< Home />} />
{/*             < Route exact path="/vote-page" element={ < VotePageComponent /> } />
            < Route exact path="/guideline" element={ < GuideComponent /> } />
            < Route exact path="/login" element={ < LoginComponent /> } /> */}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
