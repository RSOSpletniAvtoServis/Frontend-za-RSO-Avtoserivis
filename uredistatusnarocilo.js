async function loadStatusSelect() {

  const response = await fetch(localStorage.getItem("AdmVoz")+"statusi/");
  const data = await response.json(); // double dictionary

  const select = document.getElementById("stat");
  

  data.forEach(row => {
  const option = document.createElement("option");
  option.value = row.IDStatus;
  option.textContent = row.NazivStatusa;
  select.appendChild(option);
  });
}

async function loadNarociloStatusSelect() {


	const params = new URLSearchParams(window.location.search);
    const idnarocilo = params.get("id");
	const stat = document.getElementById('stat');

	const data = {
		idnarocilo: idnarocilo,
		idtennant: localStorage.getItem("idtennant"),
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("NarOceSpo")+"statusnarocila/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Narocilo == "passed"){
			if(result.IDStatus != null){
				stat.value = result.IDStatus;
			} 
		} else if(result.Narocilo == "failed") {
			alert("Pridobivanje statusa naročila neupešno!!!");
		} else {
			alert("Pridobivanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}





function posodobistatusnarocila() {
	const params = new URLSearchParams(window.location.search);
    const idnarocilo = params.get("id");
	const stat = document.getElementById('stat').value;

	const data = {
		idstatus: stat,
		idnarocilo: idnarocilo,
		idtennant: localStorage.getItem("idtennant"),
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("NarOceSpo")+"posodobistatusnarocila/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Narocilo == "passed"){
			alert("Status naročila uspešno posodobljen!!!");
			window.location.href = "potrjeniservisipregled.html";	
		} else if(result.Narocilo == "failed") {
			alert("Posodabljanje statusa naročila neupešno!!!");
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
	window.location.href = "potrjeniservisipregled.html";
}




async function runSequentially() {
  await loadStatusSelect();   // waits until first finishes
  await loadNarociloStatusSelect();
  //const val = document.getElementById("znamka").value;
  //await loadModel(val);  // runs only after first is done
}

runSequentially();
