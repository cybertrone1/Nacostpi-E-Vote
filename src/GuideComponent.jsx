const GuideComponent = () => {
    return ( 
        <div className="guideline">
            <section className="guide-intro">
                <h2>
                    How to Use the NACOS E-Vote Website
                </h2>
                <p>
                    Welcome to the NACOS E-Vote website! This guide will walk you through the steps to successfully participate in the voting process. The website is designed to be user-friendly while ensuring the integrity of the voting system.
                </p>
            </section>
            <section className="guide-body">
                <div>
                    <h3>
                        1. Dashboard Overview
                    </h3>
                    <div className="dash-img">

                    </div>
                    <p>
                        When you first log in, you'll be greeted by the Dashboard. This page shows the current vote counts for each candidate. You can use this information to see how the election is progressing.
                    </p>
                </div>
                <div>
                    <h3>
                        2. Casting Your Vote
                    </h3>
                    <p>
                        To cast your vote, look for the "Cast Your Vote" button on the Dashboard. Clicking this button will take you to the Voting Page, where you can select your preferred candidates.
                    </p>
                </div>
                <div>
                    <h3>
                        3. Sign-In Page
                    </h3>
                    <div className="sign-img">

                    </div>
                    <p>
                        Before voting, you need to log in with the credentials provided by the INEC committee. These details are essential for accessing the voting system. <br /> <br />

                        <span>Important Note:</span> Once you have cast your vote for a candidate, you will not be able to vote again for the same candidate or any other candidate running for the same position.
                    </p>
                </div>
                <div>
                    <h3>
                        4. Voting Page
                    </h3>
                    <div className="vote-img">

                    </div>
                    <p>
                        On the Voting Page, you will see a list of candidates. Select the candidate of your choice for each position. Once you have made your selection, click on the green button at the bottom of the page to submit your vote. <br /> <br />

                        After submitting your vote:
                    </p>
                    <ol>
                        <li>
                            <div className="notify-img">
                                
                            </div>
                            i. A confirmation alert will notify you that your vote has been successfully recorded.
                        </li>
                        <li>
                            ii.  You will then be automatically redirected back to the Dashboard.
                        </li>
                    </ol>
                </div>
                <div>
                    <h3>
                        5. Re-Voting Attempt
                    </h3>
                    <p>
                        If you attempt to vote again after already casting your vote:<br /> <br />
                    </p>
                    <ol>
                        <li>
                            i. The system will detect that you have already voted for that position.
                        </li>
                        <li>
                            ii. Your new vote will be nullified, and you will be automatically redirected back to the Dashboard.
                        </li>
                        <li>
                            iii. No alert will be shown in this case.
                        </li>
                    </ol>
                </div>
            </section>
            <h4>
                Thank you for participating in the NACOS elections! Your vote is crucial in shaping our future. If you encounter any issues, please contact the INEC committee (0906 862 2083) for assistance.
            </h4>
        </div>
     );
}
 
export default GuideComponent;