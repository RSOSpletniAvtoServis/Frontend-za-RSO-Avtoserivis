

function podajoceno() {

	const ocena = document.getElementById('ocena').value;
	const komentar = document.getElementById('komentar').value;
	console.log("Komentar: "+komentar);
	console.log("Ocena: "+ocena);
	const data = {
		ocena: ocena,
		komentar: komentar,
		idtennant: localStorage.getItem('idt'),
		idnarocilo: localStorage.getItem('idn'),
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("NarOceSpo")+"podajoceno/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Ocena == "passed"){
			alert("Ocena uspešno dodana!!!");
			window.location.href = "pregledservisiopravljeni.html";	
		} else if(result.Ocena == "failed") {
			alert("Dodajanje ocene neupešno!!!");
		} else {
			alert("Dodajanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}


function nazaj(){
	window.location.href = "pregledservisiopravljeni.html";
}


console.log("IDTennant: "+localStorage.getItem('idt'));
console.log("IDNarocilo: "+localStorage.getItem('idn'));


