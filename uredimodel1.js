async function loadZnamkaSelect() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"znamke/");
  const data = await response.json(); // double dictionary

  const select = document.getElementById("znamka");
  

  data.forEach(row => {
  const option = document.createElement("option");
  option.value = row.IDZnamka;
  option.textContent = row.NazivZnamke;
  select.appendChild(option);
  });
}
let idz = "";
async function dobiModel() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const response = await fetch(localStorage.getItem("AdmVoz")+"model/"+id);
  const data = await response.json(); // double dictionary
  
  document.getElementById("naziv").value = data.NazivModel;
  document.getElementById("znamka").value = data.IDZnamka;
  idz = data.IDZnamka;
  console.log(data);
  console.log("ZnamkaID: "+data.IDZnamka);
  console.log(data.NazivModel);
  
}

function uredimodel() {
    const naziv = document.getElementById('naziv').value;
	const znamkaid = document.getElementById("znamka").value;
	const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
	console.log(id);
	console.log(znamkaid);
	// Data to send
	const data = {
		idmodel: id,
		naziv: naziv,
		idznamka: znamkaid,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"posodobimodel/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Model == "passed"){
			alert("Model uspešno posodobljen!!!");
			window.location.href = "preglejmodele.html";	
		} else {
			alert("Posodabljanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}


function nazajpregledmodelov(){
	window.location.href = "preglejmodele.html";
}

function obzagonu(){
	
}

async function runSequentially() {
   await loadZnamkaSelect();   // waits until first finishes
   dobiModel();
}

runSequentially();
//loadZnamkaSelect();
//dobiModel();

