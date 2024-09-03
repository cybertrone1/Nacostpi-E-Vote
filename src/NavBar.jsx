import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <div className="navbar">
            <div className="nav-intro">
                <h1>
                    nacos e-voting
                </h1>
                <div className="nav-img">
                    
                </div>
            </div>
            <div>
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