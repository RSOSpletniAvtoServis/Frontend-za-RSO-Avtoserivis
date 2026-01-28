async function dobiStoritev() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const response = await fetch(localStorage.getItem("AdmVoz")+"storitev/"+id);
  const data = await response.json(); // double dictionary
  
  document.getElementById("naziv").value = data.NazivStoritve;
  document.getElementById("aktivna").value = data.Aktiven;
  
  console.log(data);
  console.log("StoritevID: "+data.IDStoritev);
  console.log("Aktivna: "+data.Aktiven);
  console.log(data.NazivStoritve);
  
}

function uredistoritev() {
    const naziv = document.getElementById('naziv').value;
	let aktiven = document.getElementById('aktivna').value;
	const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
	console.log(id);
	if(aktiven == 1){
		console.log("Ja je ena");
	} else {
		aktiven = '0';
		console.log("Vrednost je: "+aktiven);
	}
	// Data to send
	const data = {
		idstoritev: id,
		naziv: naziv,
		aktiven: aktiven,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"posodobistoritev/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Storitev == "passed"){
			alert("Storitev uspešno posodobljena!!!");
			window.location.href = "preglejstoritve.html";	
		} else {
			alert("Posodabljanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}

function nazajpregledstoritev(){
	if(localStorage.getItem('vloga') !== null){
		if(localStorage.getItem('vloga') == '1'){
			window.location.href = "preglejstoritve.html";
		}
	} else {
		window.location.href = "index.html";
	}
}

dobiStoritev();