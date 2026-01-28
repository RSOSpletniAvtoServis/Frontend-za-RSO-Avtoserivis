
function onTelInput(){

	const pass = document.getElementById("ngeslo").value;
	const cpass = document.getElementById("cgeslo").value;
	
	const statusPass = document.getElementById("ges-status");
	if(pass == cpass){
		statusPass.textContent = "✓ Gesli se ujemata!";
		statusPass.style.color = "green";
    } else{
		statusPass.textContent = "✗ Gesli se ne ujemata";
		statusPass.style.color = "red";
    }
}

function spremenigeslo() {
	
	const iduporabnik = localStorage.getItem('iduporabnik');

	const trenGeslo = document.getElementById('tgeslo').value;
	const novGeslo = document.getElementById('ngeslo').value;
	const cfGeslo = document.getElementById('cgeslo').value;
	if(novGeslo != cfGeslo){
		alert("Novo geslo in ponovno novo geslo se ne ujemata!!!");
		return;
	}
	
	const data = {
		trenutnogeslo: trenGeslo,
		novogeslo: novGeslo,
		iduporabnik: iduporabnik,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("UpoPri")+"spremenigeslo/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Geslo == "passed"){
			alert("Geslo uspešno posodobljeno!!!");
			window.location.href = "index.html";	
		} else if(result.Geslo == "failed") {
			alert("Posodabljanje gesla neupešno!!!");
		} else {
			alert("Posodabljanje neuspešno!!!");
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
