

function prijava() {
    const username = document.getElementById('uname').value;
	const pass = document.getElementById('pass').value;
	// Data to send
	const data = {
		username: username,
		password: pass
	};
	// Send POST request
	fetch(localStorage.getItem("UpoPri")+"prijava/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Prijava == "passed"){
			console.log("IDUporabnika: ",result.IDUporabnik);
			console.log("Vloga: ",result.Vloga);
			console.log("UniqueID: ",result.UniqueID);
			console.log("IDTennant: ",result.idtennant);
			localStorage.setItem('vloga', result.Vloga);
			localStorage.setItem('userID', result.UniqueID);
			localStorage.setItem('iduporabnik', result.IDUporabnik);
			console.log("IDUporabnik: "+result.IDUporabnik);
			console.log("IDUporabnikLS: "+localStorage.getItem('iduporabnik'));
			if(result.idtennant !== null){
				console.log("Gre za zaposlenega!");
				localStorage.setItem('idtennant',result.idtennant);
			}
			window.location.href = "index.html";	
		} else {
			alert("Prijava neuspešna!!!");
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
