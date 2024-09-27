import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [groupedCandidates, setGroupedCandidates] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const dashBoard = async () => {
            try {
                const response = await fetch('https://voting-api-zv3h.onrender.com/api/candidates/all');
    
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error('Expected JSON, but got: ' + contentType);
                }
    
                if (!response.ok) {
                    throw new Error("Unable to fetch data: " + response.status);
                }
    
                const data = await response.json();
                console.log("Fetched data:", data);
    
                if (typeof data === 'object' && !Array.isArray(data)) {
                    setGroupedCandidates(data);
                } else {
                    console.error("Unexpected data format:", data);
                }
    
            } catch (error) {
                console.error("Error message: " + error.message);
            }
        }
    
        dashBoard();
    }, []);
    
    

    const groupCandidates = (candidates) => {
        const grouped = candidates.reduce((acc, candidate) => {
            if (!acc[candidate.position]) {
                acc[candidate.position] = [];
            }
            acc[candidate.position].push(candidate);
            return acc;
        }, {});
        setGroupedCandidates(grouped);
    };

    const handleClick = () => {
      /*   navigate('/vote') */
    }

    return (
        <div className="dashboard-content">
            <div className="dashBoard">
                <h1>Dashboard</h1>
                {Object.entries(groupedCandidates).map(([position, candidates]) => (
                    <div key={position} className="post-section">
                        <h2>{position}</h2>
                        <ul>
                            {candidates.map(candidate => (
                                <li key={candidate.name}>
                                    <p>{candidate.name} <span>{candidate.votes}</span> </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button onClick={handleClick}>Cast your vote</button>
        </div>
    );
};

export default Home;
