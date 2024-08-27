import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [candidates, setCandidates] = useState([]);
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
                    throw new Error ("unable to fetch data: " + response.status)
                }
    
                const data = await response.json();
                setCandidates(data);
                groupCandidates(data);
                console.log(candidates);

            } catch (error) {
                console.error("error message: " + error.message);
                console.log(error);
            }
        }

        dashBoard();
    }, []);

/* 
    fetch('https://voting-api-zv3h.onrender.com/api/leaderboard')
    .then(response => response.json())
    .then(data => {
        setCandidates(data);
        groupCandidates(data);
        console.log(candidates);
    })
    .catch(error => console.error('Error fetching data:', error));
 */
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
        navigate('/vote')
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
