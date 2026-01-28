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

function editModel(id) {
  // Option 1: redirect to edit page
  window.location.href = `urediznamko.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

function dodajModel() {
    const naziv = document.getElementById('naziv').value;
	const znamkaid = document.getElementById('znamka').value;
	const userid = localStorage.getItem('userID');
	console.log("Naziv: "+naziv);
	console.log("Znamka: "+znamkaid);
	console.log("Userid: "+userid);
	if(userid == null){
		localStorage.clear();
		window.location.href = "index.html";
	}
	
	// Data to send
	const data = {
		naziv: naziv,
		idznamka: znamkaid,
		uniqueid: userid
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"dodajmodel/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Model == "passed"){
			alert("Model uspešno dodan!");
			//window.location.href = "index.html";	
		} else {
			alert("Neuspešno dodan model!");
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

loadZnamkaSelect();