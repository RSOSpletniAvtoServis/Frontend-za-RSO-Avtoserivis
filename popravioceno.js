async function loadOcena() {

	const ocena = document.getElementById('ocena');
	const komentar = document.getElementById('komentar');

	const data = {
		idnarocilo: localStorage.getItem('idn'),
		idtennant: localStorage.getItem("idt"),
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("NarOceSpo")+"dobioceno/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Ocena1 == "passed"){
			ocena.value = result.Ocena;
			komentar.value = result.Komentar;

		} else if(result.Ocena1 == "failed") {
			alert("Pridobivanje ocene neupešno!!!");
		} else {
			alert("Pridobivanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}



function popravioceno() {

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
	fetch(localStorage.getItem("NarOceSpo")+"popravioceno/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Ocena == "passed"){
			alert("Ocena uspešno popravljena!!!");
			window.location.href = "pregledservisiopravljeni.html";	
		} else if(result.Ocena == "failed") {
			alert("Popravljanje ocene neupešno!!!");
		} else {
			alert("Popravljanje neuspešno!!!");
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
loadOcena();


