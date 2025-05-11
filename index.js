// graphql leetcode api
document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress circle")
    const mediumProgressCircle = document.querySelector(".medium-progress circle")
    const hardProgressCircle = document.querySelector(".hard-progress circle")
    const easyLabel = document.getElementById("easy-label")
    const mediumLabel = document.getElementById("medium-label")
    const hardLabel = document.getElementById("hard-label")
    const startCard = document.querySelector(".stats-card")
    

    // return true or false based on a regex
    function validateUserName(username){
        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.text(username)
        if(!isMatching){
            alert("Invalid Username")
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {

        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            //statsContainer.classList.add("hidden");

            // const response = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
            const targetUrl = 'https://leetcode.com/graphql/';
            
            // concatencated url
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query:   {
                    "data": {
                        "userProfileUserQuestionProgressV2": {
                            "numAcceptedQuestions": [
                                {
                                    "count": 91,
                                    "difficulty": "EASY"
                                },
                                {
                                    "count": 84,
                                    "difficulty": "MEDIUM"
                                },
                                {
                                    "count": 7,
                                    "difficulty": "HARD"
                                }
                            ],
                            "numFailedQuestions": [
                                {
                                    "count": 1,
                                    "difficulty": "EASY"
                                },
                                {
                                    "count": 3,
                                    "difficulty": "MEDIUM"
                                },
                                {
                                    "count": 1,
                                    "difficulty": "HARD"
                                }
                            ],
                            "numUntouchedQuestions": [
                                {
                                    "count": 782,
                                    "difficulty": "EASY"
                                },
                                {
                                    "count": 1750,
                                    "difficulty": "MEDIUM"
                                },
                                {
                                    "count": 821,
                                    "difficulty": "HARD"
                                }
                            ],
                            "userSessionBeatsPercentage": [
                                {
                                    "difficulty": "EASY",
                                    "percentage": 89.1
                                },
                                {
                                    "difficulty": "MEDIUM",
                                    "percentage": 82.79
                                },
                                {
                                    "difficulty": "HARD",
                                    "percentage": 54.71
                                }
                            ],
                            "totalQuestionBeatsPercentage": 91.6
                        }
                    }
                },
                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

            displayUserData(parsedData);
        }
        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("logging username:", username);
        if(validateUserName){
            fetchUserDetails(username)
        }
    })
})