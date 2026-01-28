
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
function dodajposlovalnico() {
    const naziv = document.getElementById('naziv').value;
	const naslov = document.getElementById('naslov').value;
	const email = document.getElementById('email').value;
	const telefon = document.getElementById('telefon').value;
	const kraj = document.getElementById('kraj').value;
	const teltest = /^\d+$/.test(telefon);
	if(teltest){
		if(email.includes("@")){
			// Data to send
			const data = {
				naziv: naziv,
				naslov: naslov,
				telefon: telefon,
				email: email,
				idkraj: kraj,
				idtennant: localStorage.getItem('idtennant'),
				uniqueid: localStorage.getItem('userID'),
			};
			// Send POST request
			fetch(localStorage.getItem("PosZap")+"dodajposlovalnico/", {
				method: "POST",            // HTTP method
				headers: {
					"Content-Type": "application/json" // Tell the server it's JSON
				},
				body: JSON.stringify(data)  // Convert JS object to JSON string
			})
			.then(response => response.json()) // Parse JSON response
			.then(result => {
				console.log("Success:", result);
				if(result.Poslovalnica == "passed"){
					alert("Dodajanje poslovalnice je bila uspešno!!!");
					window.location.href = "index.html";
				}
			})
			.catch(error => {
				console.error("Error:", error);
			});
		} else {
			alert('Email ni pravilno vnešen!!!');
		} 
	} else {
		alert('Telefon ni pravilno vnešen!!!');
	}
}


function nazaj(){
	window.location.href = "index.html";
}

loadKrajiSelect();
