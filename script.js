"use strict";

var names = [];
var priimki = [];
var telefoni = [];
function poisci(){

    var tabela = document.getElementById("participant-table");
    var tekst = document.getElementById("isci").value;
    var tds = document.querySelectorAll('td'), i;
    var nasel = 0;
    for(i = 0; i < tds.length; ++i) {
        tds[i].style.backgroundColor = "white";
}
    for(i = 0; i < tds.length; ++i) {
    // do something here
    if(tekst == tds[i].innerText){
        nasel = 1;
        if(i % 3 == 0){
            tds[i].style.backgroundColor = "red";  
            tds[i+1].style.backgroundColor = "red";
            tds[i+2].style.backgroundColor = "red";
        }
        if(i % 3 == 1){
            tds[i+1].style.backgroundColor = "red";
            tds[i-1].style.backgroundColor = "red";
            tds[i].style.backgroundColor = "red";
        }
        if(i % 3 == 2){
            tds[i-1].style.backgroundColor = "red";
            tds[i].style.backgroundColor = "red";
            tds[i-2].style.backgroundColor = "red";
        }
    }
    
}

}


function obzagonu(){
    if(localStorage.names && localStorage.priimki && localStorage.telefoni){
         names = JSON.parse(localStorage.getItem("names"));
         priimki = JSON.parse(localStorage.getItem("priimki"));
         telefoni = JSON.parse(localStorage.getItem("telefoni"));
        var tab = document.getElementById("participant-table");
        for(var i = 0;i < names.length;i++){
            var vrsta = tab.insertRow();
            vrsta.ondblclick = domRemoveParticipant;
            var celica1 = vrsta.insertCell(0);
            var celica2 = vrsta.insertCell(1);
            var celica3 = vrsta.insertCell(2);
            celica1.innerHTML = names[i];
            celica2.innerHTML = priimki[i]; 
            celica3.innerHTML = telefoni[i];  
        }
    }
}

function domRemoveParticipant(event) {
     const tabela = document.getElementById("participant-table").getElementsByTagName("tbody")[0];
     const tr = event.target.parentElement;
     var el = event.target.innerText;
    if(window.confirm("Ali želite brisati")){     
        tabela.removeChild(tr);
     if(names.indexOf(el) != -1){
        var nek = names.indexOf(el);
        names.splice(nek,1);
        priimki.splice(nek,1);
        telefoni.splice(nek,1);
     }
     else if(priimki.indexOf(el) != -1){
        var nek = priimki.indexOf(el);
        names.splice(nek,1);
        priimki.splice(nek,1);
        telefoni.splice(nek,1);
     }
     else if(telefoni.indexOf(el) != -1){
         var nek = telefoni.indexOf(el);
        names.splice(nek,1);
        priimki.splice(nek,1);
        telefoni.splice(nek,1);        
     }
     localStorage.setItem("names",JSON.stringify(names));
     localStorage.setItem("priimki",JSON.stringify(priimki));
     localStorage.setItem("telefoni",JSON.stringify(telefoni));

     tabela.removeChild(tr);
    }
    
}

function domAddParticipant(participant) {
    // TODO
    console.log("TODO: Add to DOM");
    var neki = document.getElementById("participant-table");
    if(participant.first != "" && participant.last != "" && participant.role != ""){
    var row = neki.insertRow();
    row.ondblclick = domRemoveParticipant;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = participant.first;
    cell2.innerHTML = participant.last; 
    cell3.innerHTML = participant.role;

    names[names.length] = participant.first;
    priimki[priimki.length] = participant.last;
    telefoni[telefoni.length] = participant.role;
    localStorage.setItem("names",JSON.stringify(names));
    localStorage.setItem("priimki",JSON.stringify(priimki));
    localStorage.setItem("telefoni",JSON.stringify(telefoni));   
}
else{
    alert("Vpisi ime, priimek in telefonsko številko");
}
    
  /*  const tr = document.createElement("tr");
    const td = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");*/
}

function addParticipant() {
    // TODO: Get values
    const first = document.getElementById("first").value;
    const last = document.getElementById("last").value;
    const role = document.getElementById("role").value;


    document.getElementById("first").value = "";
    document.getElementById("last").value = "";
    document.getElementById("role").value = "";
    
    // TODO: Set input fields to empty values
    // ...
    
    // Create participant object
    const participant = {
        first: first,
        last: last,
        role: role
    };

    // Add participant to the HTML
    domAddParticipant(participant);

    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

$(document).ready(() => {
   // If something needs to get initialized,
   // write it in here.
    $('#isci').keypress(function(e){
      if(e.keyCode==13)
      poisci();
    });
});