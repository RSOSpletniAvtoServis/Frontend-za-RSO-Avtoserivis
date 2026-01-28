async function dobiStatus() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const response = await fetch(localStorage.getItem("AdmVoz")+"status/"+id);
  const data = await response.json(); // double dictionary
  
  document.getElementById("naziv").value = data.NazivStatusa;
  
  console.log(data);
  console.log("StatusID: "+data.IDStatus);
  console.log(data.NazivStatusa);
  
}

function uredistatus() {
    const naziv = document.getElementById('naziv').value;
	const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
	console.log(id);
	
	// Data to send
	const data = {
		idstatus: id,
		naziv: naziv,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"posodobistatus/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Status == "passed"){
			alert("Status uspešno posodobljen!!!");
			window.location.href = "preglejstatuse.html";	
		} else {
			alert("Posodabljanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}

function nazajpregledstatusov(){
	if(localStorage.getItem('vloga') !== null){
		if(localStorage.getItem('vloga') == '1'){
			window.location.href = "preglejstatuse.html";
		}
	} else {
		window.location.href = "index.html";
	}
}

dobiStatus();