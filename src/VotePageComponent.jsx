import { useState, useEffect } from "react";
import FooterComponent from "./FooterComponent";
import apiClient from "./api/ApiClient";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VotePageComponent = () => {
    const nacosId = useSelector(state => state.voters.nacosId)
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidatesData = async() => {
            const response = await apiClient.CandidateApi();
            console.log('api second', response);
            if (response.status === 200) {
                const flattenedCandidates = Object.values(response?.data).flat();
                setCandidates(flattenedCandidates);
                console.log(flattenedCandidates);
            } else {
                setCandidates(null)
            }
        }
        fetchCandidatesData();
    }, []);

    const sortCandidate = (type) => {
        return candidates?.filter(c => c?.position === type)
    }

    const handleCandidateSelection = (candidate) => {
        setSelectedCandidates(prevSelectedCandidate => {
            if (prevSelectedCandidate.includes(candidate._id)) {
                return prevSelectedCandidate.filter(id => id !== candidate._id);
            } else {
                return [...prevSelectedCandidate, candidate._id];
            }
        });
    };


    const handleVoteSubmission = async () => {
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

            const response = await apiClient.VoteApi({nacosId, votes});
            if (response?.status === 200) {
                alert('Votes cast successfully');
                navigate('/');
            } else if(response?.status === 400){
                alert("Server error: Unable to submit votes.");
                navigate("/");
            } else if(response?.status === 404){
                alert("User not found.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Voting submission error: " + error.message);
        }
    };

    return ( 
        <div className="pageContainer">
            <div className="vote-content">
                <div className="vote-list">
                    <div className="posts">
                        <h2>President</h2>
                        <div className="postList">
                            {sortCandidate("President") && Array.isArray(sortCandidate("President")) && sortCandidate("President").length > 0 ? (
                                sortCandidate("President")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                                
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Vice President</h2>
                        <div className="postList">
                            {sortCandidate("Vice President") && Array.isArray(sortCandidate("Vice President")) && sortCandidate("Vice President").length > 0 ? (
                                sortCandidate("Vice President")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Gen. Secretary</h2>
                        <div className="postList">
                            {sortCandidate("General Secretary") && Array.isArray(sortCandidate("General Secretary")) && sortCandidate("General Secretary").length > 0 ? (
                                sortCandidate("General Secretary")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>A. G. S</h2>
                        <div className="postList">
                            {sortCandidate("Assistant General Secretary") && Array.isArray(sortCandidate("Assistant General Secretary")) && sortCandidate("Assistant General Secretary").length > 0 ? (
                                sortCandidate("Assistant General Secretary")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Treasurer</h2>
                        <div className="postList">
                            {sortCandidate("Treasurer") && Array.isArray(sortCandidate("Treasurer")) && sortCandidate("Treasurer").length > 0 ? (
                                sortCandidate("Treasurer")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Fin. Secretary</h2>
                        <div className="postList">
                            {sortCandidate("Financial Secretary") && Array.isArray(sortCandidate("Financial Secretary")) && sortCandidate("Financial Secretary").length > 0 ? (
                                sortCandidate("Financial Secretary")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Auditor</h2>
                        <div className="postList">
                            {sortCandidate("Auditor") && Array.isArray(sortCandidate("Auditor")) && sortCandidate("Auditor").length > 0 ? (
                                sortCandidate("Auditor")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Software Dir. 1</h2>
                        <div className="postList">
                            {sortCandidate("Software Director 1") && Array.isArray(sortCandidate("Software Director 1")) && sortCandidate("Software Director 1").length > 0 ? (
                                sortCandidate("Software Director 1")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Ass Software dir.</h2>
                        <div className="postList">
                            {sortCandidate("Assistance Software director") && Array.isArray(sortCandidate("Assistance Software director")) && sortCandidate("Assistance Software director").length > 0 ? (
                                sortCandidate("Assistance Software director")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Social dir. 1</h2>
                        <div className="postList">
                            {sortCandidate("Social Director 1") && Array.isArray(sortCandidate("Social Director 1")) && sortCandidate("Social Director 1").length > 0 ? (
                                sortCandidate("Social Director 1")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Ass. Social dir.</h2>
                        <div className="postList">
                            {sortCandidate("Social Director 2") && Array.isArray(sortCandidate("Social Director 2")) && sortCandidate("Social Director 2").length > 0 ? (
                                sortCandidate("Social Director 2")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Sport dir. 1</h2>
                        <div className="postList">
                            {sortCandidate("Sport Director 1") && Array.isArray(sortCandidate("Sport Director 1")) && sortCandidate("Sport Director 1").length > 0 ? (
                                sortCandidate("Sport Director 1")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Ass. Sport dir.</h2>
                        <div className="postList">
                            {sortCandidate("Sport Director 2") && Array.isArray(sortCandidate("Sport Director 2")) && sortCandidate("Sport Director 2").length > 0 ? (
                                sortCandidate("Sport Director 2")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Welfare Dir. 1</h2>
                        <div className="postList">
                            {sortCandidate("Welfare Director 1") && Array.isArray(sortCandidate("Welfare Director 1")) && sortCandidate("Welfare Director 1").length > 0 ? (
                                sortCandidate("Welfare Director 1")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>Ass. Welfare Dir.</h2>
                        <div className="postList">
                            {sortCandidate("Welfare Director 2") && Array.isArray(sortCandidate("Welfare Director 2")) && sortCandidate("Welfare Director 2").length > 0 ? (
                                sortCandidate("Welfare Director 2")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>PRO 1</h2>
                        <div className="postList">
                            {sortCandidate("Public Relations Officer (PRO 1)") && Array.isArray(sortCandidate("Public Relations Officer (PRO 1)")) && sortCandidate("Public Relations Officer (PRO 1)").length > 0 ? (
                                sortCandidate("Public Relations Officer (PRO 1)")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>

                    <div className="posts">
                        <h2>PRO 2</h2>
                        <div className="postList">
                            {sortCandidate("Public Relations Officer (PRO 2)") && Array.isArray(sortCandidate("Public Relations Officer (PRO 2)")) && sortCandidate("Public Relations Officer (PRO 2)").length > 0 ? (
                                sortCandidate("Public Relations Officer (PRO 2)")?.map(candidate => (
                                    <li key={candidate?._id} >
                                        <img src={candidate?.photoUrl} alt={candidate?.name} />
                                        <p> {candidate?.name} </p>
                                        <input
                                            type="checkbox" 
                                            checked={selectedCandidates?.includes(candidate?._id)}
                                            onChange={() => handleCandidateSelection(candidate)}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <p className="warning">null</p>
                                </li>
                            )}
                            
                        </div>
                    </div>
                </div>
                <button onClick={handleVoteSubmission}>submit votes</button>
            </div>
            <FooterComponent />
        </div>
     );
}
 
export default VotePageComponent;