async function dobiKraj() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const response = await fetch(localStorage.getItem("AdmVoz")+"kraj/"+id);
  const data = await response.json(); // double dictionary
  
  document.getElementById("naziv").value = data.NazivKraja;
  document.getElementById("latitude").value = data.Latitude;
  document.getElementById("longitude").value = data.Longitude;
  
  console.log(data);
  console.log("KrajID: "+data.IDKraj);
  console.log(data.NazivKraja);
  console.log(data.Latitude);
  console.log(data.Longitude);
  
}

function uredikraj() {
    const naziv = document.getElementById('naziv').value;
	const latitude = document.getElementById('latitude').value;
	const longitude = document.getElementById('longitude').value;
	const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
	console.log(id);
	// Data to send
	const data = {
		naziv: naziv,
		longitude: longitude,
		latitude: latitude,
		idkraj: id,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"posodobikraj/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Kraji == "passed"){
			alert("Kraj uspešno posodobljen!!!");
			window.location.href = "preglejkraje.html";	
		} else {
			alert("Posodabljanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}


dobiKraj();