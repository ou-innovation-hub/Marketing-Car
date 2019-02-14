// Get the input field
let input = document.getElementById("cardData");
var socket = io();

socket.on('sign-in', function(person){
    addPerson(person);
    //alert('broadcast obtained ' +  document.getElementById("cardData").value);
});

socket.on('sign-out', function(person){

});
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("swipe").click();
    }
});

function swipe() {
    console.log('swiped');
    socket.emit('swipe', document.getElementById("cardData").value);
}

function addPerson(person){
    console.log(JSON.stringify(person));
    var table = document.getElementById("signed-in-table");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    cell1.outerHTML = "<th scope='row'>" + person.name  + "</th>";
    cell2.innerHTML = person.certifications;
}
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.getElementsByClassName("openMenu")[0].style.opacity = 0;
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
    document.getElementsByClassName("openMenu")[0].style.opacity = 100;
}