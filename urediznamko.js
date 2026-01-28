async function dobiZnamko() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const response = await fetch(localStorage.getItem("AdmVoz")+"znamka/"+id);
  const data = await response.json(); // double dictionary
  
  document.getElementById("naziv").value = data.NazivZnamke;
  
  console.log(data);
  console.log("ZnamkaID: "+data.IDZnamka);
  console.log(data.NazivZnamke);
  
}

function urediznamko() {
    const naziv = document.getElementById('naziv').value;
	const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
	console.log(id);
	// Data to send
	const data = {
		idznamka: id,
		naziv: naziv,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"posodobiznamko/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Znamke == "passed"){
			alert("Znamka uspešno posodobljena!!!");
			window.location.href = "preglejznamke.html";	
		} else {
			alert("Posodabljanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}

function nazajpregledznamke(){
	if(localStorage.getItem('vloga') !== null){
		if(localStorage.getItem('vloga') == '1'){
			window.location.href = "preglejznamke.html";
		}
	} else {
		window.location.href = "index.html";
	}
}

dobiZnamko();