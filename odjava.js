
function odjava(){

		// Data to send
		const data = {
			uniqueid: localStorage.getItem('userID')
		};
		// Send POST request
		fetch(localStorage.getItem("UpoPri")+"odjava/", {
		method: "DELETE",            // HTTP method
		headers: {
			"Content-Type": "application/json" // Tell the server it's JSON
		},
		body: JSON.stringify(data)  // Convert JS object to JSON string
		})
		.then(response => response.json()) // Parse JSON response
		.then(result => {
			console.log("Success:", result);
			if(result.Odjava == "passed"){
				alert("Odjava uspešna!!!");
				localStorage.clear();
				window.location.href = "index.html";
			} else {
				alert("Odjava neuspešna!!!");
			}
		})
		.catch(error => {
			console.error("Error:", error);
			alert("Prišlo je do napake!!!");
		});
	
}

odjava();
