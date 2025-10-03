import { useState} from "react";
import apiClient from "./api/ApiClient";
import { useNavigate } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import hideIcon from "./assets/hideIcon.svg"
import unhideIcon from "./assets/unhideIcon.svg";
import { setNacosId } from "./redux/slice/voterSlice";
import { useDispatch } from "react-redux";


const LoginComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [matricNumber, setMatricNumber] = useState("");
    const [level, setLevel] = useState("");
    const [nacosId, setnacosId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [typeStatus, SetTypeStatus] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await apiClient.LoginApi(level, nacosId, password);
        console.log(response);

        console.log(response.status);

        if (response?.status === 200) {
            dispatch(setNacosId(nacosId));
            navigate("/vote");
        } else if(response?.status === 400) {
            setMessage("Login failed. Please check your credentials.");
        } else if(response?.status === 500){
            setMessage("Internet connection error");
        }
    };

    const handleType = () => {
        SetTypeStatus(!typeStatus);
    }

    return (
        <div className="pageContainer">
            <div className="login">
                <p className="caution">all ND2 PT should choose Nd1</p>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        required
                        value={matricNumber}
                        onChange={(e) => setMatricNumber(e.target.value)}
                        placeholder="Matric Number / Form Number"
                    />

                    <input type="text"
                        required
                        value={nacosId}
                        onChange={(e) => setnacosId(e.target.value)}
                        placeholder="NACOS ID"
                    />

                    <select
                        required
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                    >
                        <option value="NONE">Level</option>
                        <option value="ND1">ND1</option>
                        <option value="ND2">ND2</option>
                        <option value="HND1">HND1</option>
                        <option value="HND2">HND2</option>
                    </select>

                    <div className="password-ctn">
                        <input type={typeStatus ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />

                        {typeStatus ? (
                            <img onClick={handleType} src={unhideIcon} alt="unhide icon" />
                        ) : (
                            <img onClick={handleType} src={hideIcon} alt="hide icon" />
                        )}
                    </div>

                    <p className="message">{ message }</p>

                    <button>log in</button>
                </form>
            </div>
            <FooterComponent />
        </div>
        
    );
}
 
export default LoginComponent;