/**
 * @param {string} nameId The element id that has the number or date.
 */
function findFacts(numId, typeId) {
    // First get the zip code from the HTML textbox
    var numD = document.getElementById(numId).value;
    var type = document.getElementById(typeId).value;
    // Now make a HTTP request
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            // We got a response from the server!
            if(this.status === 200) {
                // The request was successful!
                displayFacts(this.responseText);
            } else if (this.status === 404){
                // No postal code found
                displayFacts('{ "fact" : "none" }');
            } else {
                console.log("We have a problem. Server responded with code: " + this.status);
            }
        } else {
            // Waiting for a response...
        }
    };
    // Notice how the URL is appended with the zip code
    var url = "http://numbersapi.com/" + numD + "/" + type;
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

/**
 * Displays the zip code place given the JSON data
 * @param {string} data JSON data representing place for given zip code
 */
function displayFacts(data){
    var result = JSON.parse(data);
    if(result.fact === "none") {
        document.getElementById("facts").className = "alert alert-warning";
        document.getElementById("facts").innerHTML = "Invalid entry."
    } else {
        document.getElementById("place").className = "alert alert-success";
        document.getElementById("place").innerHTML = result;
    }
}
