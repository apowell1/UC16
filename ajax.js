/**
 * @param {string} nameId The element id that has the number or date.
 */
function findFacts(numId, typeId) {
    // First get the number (or date) and type from the HTML textbox
    var numD = document.getElementById(numId).value;
    var typeD = document.getElementById(typeId).value;
    var typeLD = typeD.toLowerCase();
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful
                displayFacts(this.responseText, typeLD);
            } else if (this.status === 404){
                // No fact found
                displayFacts("none", typeLD);
            } else {
                console.log("We have a problem. Server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the number (or date) and the data type
    var url = "http://numbersapi.com/" + numD + "/" + typeLD;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the number fact given the JSON data
 * @param {string} JSON data representing fact for given number
 */
function displayFacts(data, typeId){
    if(data == "none") {
        document.getElementById("facts").className = "alert alert-danger";
        document.getElementById("facts").innerHTML = "Error: Invalid entry. Enter either trivia, math, date, or year under type. " + typeId + " is not a valid data type."
    } else {
        document.getElementById("facts").className = "alert alert-success";
        document.getElementById("facts").innerHTML = data;
    }
}
