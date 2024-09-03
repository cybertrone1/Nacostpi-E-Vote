import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


/* Child component 1 */
const LogIn = ( {matricNumber, setMatricNumber, password, setPassword, level, setLevel, nacosId, setNacosId, message, handleSubmit} ) => {

    return(
        <div className="login">
            <form onSubmit={handleSubmit}>
                <p className="caution">all ND2 PT should choose Nd1</p>
                <label htmlFor="matricNumber">matric number</label> <br />
                <input type="number"
                    required
                    value={matricNumber}
                    onChange={(e) => setMatricNumber(e.target.value)}
                /> <br />

                <label htmlFor="level">level</label> <br />
                <select
                    required
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <option value="NONE">NONE</option>
                    <option value="ND1">ND1</option>
                    <option value="HND1">HND1</option>
                </select><br />

                <label htmlFor="password">password</label> <br />
                <input type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /> <br />
                
                <label htmlFor="nacosId">nacos id</label> <br />
                <input type="text"
                    required
                    value={nacosId}
                    onChange={(e) => setNacosId(e.target.value)}
                /> <br />

                <p>{ message }</p> <br />

                <button>log in</button>
            </form>
        </div>
    );
};

/* Child component 2 */

const Vote = ( { handleCandidateSelection, selectedCandidates, handleVoteSubmission, message, candidates } ) => {

    return(
        <div className="vote-content">
            <h1>cast your vote</h1>
            <p className="pstyle">"Once you've submitted your vote, you'll be unable to make another vote!!!" </p>
            <p> {message} </p>
            <div className="vote-list">
                <ul>
                    {candidates.map(candidate => (
                        <li key={candidate._id} >
                            <p> {candidate.name} </p>
                            <p> post: {candidate.position} </p>
                            <input
                                type="checkbox" 
                                checked={selectedCandidates.includes(candidate._id)}
                                onChange={() => handleCandidateSelection(candidate)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleVoteSubmission}>submit votes</button>
        </div>
    )
}

/* parent component */
const VoteComponent = () => {

    const [matricNumber, setMatricNumber] = useState("");
    const [pending, isPending] = useState(false);
    const [level, setLevel] = useState("");
    const [nacosId, setNacosId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const navigate = useNavigate();


    /* login handler */
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://voting-api-zv3h.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ matricNumber, level, nacosId, password })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error('Login error:', data.message || response.status);
                throw new Error(data.message || `Unable to login: ${response.status}`);
            }
    
            if (response.status === 200) {
                isPending(true);
            } else {
                console.error('Unexpected response message:', data.message);
            }
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };
    

    /* vote component */
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch('https://voting-api-zv3h.onrender.com/api/dashboard');
                
                if (!response.ok) {
                    throw new Error('Error fetching candidates: ' + response.status);
                }

                const data = await response.json();
                console.log(data);

                // Flatten the data object into an array of candidates
                const flattenedCandidates = Object.values(data).flat();
                setCandidates(flattenedCandidates);


            } catch (error) {
                console.error('Error fetching data: ', error.message);
                setCandidates([]); // Set to empty array to avoid further issues
            }
        };

        fetchCandidates();
    }, []);

    const handleCandidateSelection = (candidate) => {
        setSelectedCandidates(prevSelectedCandidate => {
            if (prevSelectedCandidate.includes(candidate._id)) {
                return prevSelectedCandidate.filter(id => id !== candidate._id);
            } else {
                return [...prevSelectedCandidate, candidate._id];
            }
        });
    };


     const handleVoteSubmission = async (candidate) => {
        try {
            const votes = selectedCandidates.map(candidateId => {
                const candidate = candidates.find(c => c._id === candidateId);
                if (!candidate) {
                    console.error(`candidate with the ID ${candidateId} not found`);
                    return null;
                }

                return {
                    candidateId: candidate._id,
                    position: candidate.position,
                };

            }).filter(vote => vote !== null);

            if (votes.length === 0) {
                console.error('No valid votes to submit.');
                return;
            }

            const response = await fetch('https://voting-api-zv3h.onrender.com/api/vote', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    nacosId,
                    votes,
                })
            }); 

            const contentType = response.headers.get("content-type");

            // Handle non-JSON responses
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                console.error("Received non-JSON response:", text);
                return;
            }

            const responseData = await response.json();

            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        console.error(responseData.error);
                        navigate('/');
                        break;
                    case 500:
                        setMessage(responseData.error || 'Server error');
                        break;
                    default:
                        throw new Error(`Unexpected Error: ${response.status}`);
                }
            } else {
                alert('Votes cast successfully');
                setTimeout(() => {
                    isPending(false);
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            console.error("Voting submission error: " + error.message);
        }
    };

    return ( 
        <div className="voteComponent">
            {
                pending ? (
                    <Vote
                        handleCandidateSelection={handleCandidateSelection}
                        handleVoteSubmission={handleVoteSubmission}
                        candidates={candidates}
                        selectedCandidates={selectedCandidates} 
                        message={message}
                    />
                ) : (
                    <LogIn 
                    matricNumber={matricNumber}
                    setMatricNumber={setMatricNumber}
                    password={password}
                    setPassword={setPassword}
                    level={level}
                    setLevel={setLevel}
                    nacosId={nacosId}
                    setNacosId={setNacosId}
                    message={message}
                    handleSubmit={handleSubmit}
                    />
                )
            }
        </div>
     );
}
 
export default VoteComponent;