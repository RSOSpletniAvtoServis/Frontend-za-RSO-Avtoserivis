function dodajStatus() {
    const naziv = document.getElementById('naziv').value;
	const userid = localStorage.getItem('userID');
	if(userid == null){
		localStorage.clear();
		window.location.href("index.html");
	}
	
	// Data to send
	const data = {
		naziv: naziv,
		uniqueid: userid
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"dodajstatus/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Status == "passed"){
			alert("Status uspešno dodana!");
			window.location.href = "index.html";	
		} else {
			alert("Neuspešno dodan status!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}

function nazaj(){
	window.location.href = "index.html";
}