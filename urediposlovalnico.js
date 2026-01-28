
async function loadKrajiSelect() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"kraji/");
  const data = await response.json(); // double dictionary

  const select = document.getElementById("kraj");
  

  data.forEach(row => {
  const option = document.createElement("option");
  option.value = row.IDKraj;
  option.textContent = row.NazivKraja;
  select.appendChild(option);
  });
}

function loadPoslovalnica() {
  const userid = localStorage.getItem('userID');
  const params = new URLSearchParams(window.location.search);
  const idposlovalnica = params.get("id");

  if (!userid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  const data = {
	  idposlovalnica: idposlovalnica,
	idtennant: localStorage.getItem('idtennant'),
    uniqueid: userid
  };

  fetch(localStorage.getItem("PosZap") + "poslovalnica/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(poslovalnica => {
		console.log("Poslovalnica:", poslovalnica);
		document.getElementById("naziv").value = poslovalnica.NazivPoslovalnice;
        document.getElementById("naslov").value = poslovalnica.NaslovPoslovalnice;
		document.getElementById("telefon").value = poslovalnica.Telefon;
		document.getElementById("email").value = poslovalnica.Email;
		document.getElementById("kraj").value = poslovalnica.IDKraj;
		document.getElementById("aktiven").value = poslovalnica.Aktiven;

    })
    .catch(error => {
      console.error("Error:", error);
      alert("Prišlo je do napake pri nalaganju poslovalnice!");
    });
}

function posodobiposlovalnico() {
	const params = new URLSearchParams(window.location.search);
    const idposlovalnica = params.get("id");
	const naziv = document.getElementById('naziv').value;
	const naslov = document.getElementById('naslov').value;
	const email = document.getElementById('email').value;
	const telefon = document.getElementById('telefon').value;
	const kraj = document.getElementById('kraj').value;
	const aktiven = document.getElementById("aktiven").value
	const teltest = /^\d+$/.test(telefon);
	
	if(teltest){
		if(email.includes("@")){
			// Data to send
			const data = {
				idposlovalnica: idposlovalnica,
				naziv: naziv,
				naslov: naslov,
				telefon: telefon,
				email: email,
				idkraj: kraj,
				aktiven: aktiven,
				idtennant: localStorage.getItem('idtennant'),
				uniqueid: localStorage.getItem('userID')
			};
			// Send POST request
			fetch(localStorage.getItem("PosZap")+"posodobiposlovalnico/", {
			method: "PUT",            // HTTP method
			headers: {
				"Content-Type": "application/json" // Tell the server it's JSON
			},
			body: JSON.stringify(data)  // Convert JS object to JSON string
			})
			.then(response => response.json()) // Parse JSON response
			.then(result => {
				console.log("Success:", result);
				if(result.Poslovalnica == "passed"){
					alert("Poslovalnica uspešno posodobljena!!!");
					window.location.href = "upravljajposlovlanice.html";	
				} else {
					alert("Posodabljanje neuspešno!!!");
				}
			})
			.catch(error => {
				console.error("Error:", error);
				alert("Prišlo je do napake!!!");
			});
		} else {
			alert("Email ni pravilno vnešen!!!");
		}
	} else {
		alert("Telefon ni pravilno vnešen!!!");
	}
}


function nazaj(){
	window.location.href = "upravljajposlovlanice.html";
}

function onTextInput(){
	const telefon = document.getElementById('telefon').value;
	const teltest = /^\d+$/.test(telefon);	
	const statusPass = document.getElementById("telefon-status");
		if(teltest){
			statusPass.textContent = "✓ Telefon je pravilne oblike!";
			statusPass.style.color = "green";
		} else{
			statusPass.textContent = "✗ Telefon je napačne oblike!";
			statusPass.style.color = "red";
		}
}

async function runSequentially(){
	await loadKrajiSelect();
	loadPoslovalnica();
}

runSequentially();