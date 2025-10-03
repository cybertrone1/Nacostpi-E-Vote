import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <div className="navbar">
            <div className="nav-intro">
                <div className="nav-img">
                    
                </div>
                <h1>Welcome to NACOS E-voting system</h1>
            </div>
            <h1>⚠️ You can only vote once — no changes after submission.</h1>
            <div className="pretext">
                <h2>Cast your vote</h2>
               <Link to="/guideline" >
                    <p>
                        Guideline 
                    </p>
               </Link>
            </div>
        </div>
     );
}
 
export default NavBar;