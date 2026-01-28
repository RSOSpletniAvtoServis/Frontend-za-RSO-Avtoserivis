function isStrictFloatText(str) {
  return /^-?\d+\.\d+$/.test(str);
}


function dodajKraj() {
    const naziv = document.getElementById('naziv').value;
	const latitude = document.getElementById('latitude').value;
	const longitude = document.getElementById('longitude').value;
	const userid = localStorage.getItem('userID');
	if(userid == null){
		localStorage.clear();
		window.location.href("index.html");
	}
	if(!isStrictFloatText(latitude)){
		alert("Zemljepisna širina mora biti float!!!");
		return;
	}

	if(!isStrictFloatText(longitude)){
		alert("Zemljepisna dolžina mora biti float!!!");
		return;
	}
	
	// Data to send
	const data = {
		naziv: naziv,
		longitude: longitude,
		latitude: latitude,
		uniqueid: userid
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"dodajkraj/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Kraji == "passed"){
			alert("Kraj uspešno dodan!");
			window.location.href = "index.html";	
		} else {
			alert("Neuspešno dodan kraj!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}

//dodaj znamko
function dodajZnamko() {
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
	fetch(localStorage.getItem("AdmVoz")+"dodajznamko/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Znamka == "passed"){
			alert("Znamka uspešno dodana!");
			window.location.href = "index.html";	
		} else {
			alert("Neuspešno dodana znamka!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}

// konec dodaj znamko




function nazaj(){
	window.location.href = "index.html";
}

function nazajpregledkraji(){
	if(localStorage.getItem('vloga') !== null){
		if(localStorage.getItem('vloga') == '1'){
			window.location.href = "preglejkraje.html";
		}
	} else {
		window.location.href = "index.html";
	}
	
}