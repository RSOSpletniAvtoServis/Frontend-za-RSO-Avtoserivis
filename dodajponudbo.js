
async function loadStoritveSelect() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"storitve/");
  const data = await response.json(); // double dictionary

  const select = document.getElementById("storitev");
  

  data.forEach(row => {
  const option = document.createElement("option");
  option.value = row.IDStoritev;
  option.textContent = row.NazivStoritve;
  select.appendChild(option);
  });
}

async function loadPoslovalnice1() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = localStorage.getItem('idtennant');
  const select = document.getElementById('posl');
  if (!uniqueid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  try {
    // Prepare payload
    const data = {
				idtennant: localStorage.getItem('idtennant'),
				uniqueid: localStorage.getItem('userID'),
			};

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("PosZap") + "poslovalnice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const poslovalnice = await response.json(); // assume list of objects
    console.log("Loaded poslovalnice:", poslovalnice);

    poslovalnice.forEach(row => {
      const option = document.createElement("option");
	  option.value = row.IDPoslovalnica;
	  option.textContent = row.NazivPoslovalnice;
	  select.appendChild(option);
	  



  });
  }  catch (error) {
    console.error("Failed to load poslovalnice:", error);
	alert("Failed to load poslovalnice:", error);
  }
}



function dodajPonudbo() {
    const posl = document.getElementById('posl').value;
	const stor = document.getElementById('storitev').value;
	// Data to send
	const data = {
		idposlovalnica: posl,
		idstoritev: stor,
		idtennant: localStorage.getItem('idtennant'),
		uniqueid: localStorage.getItem('userID'),
	};
	// Send POST request
	fetch(localStorage.getItem("PosZap")+"dodajponudbo/", {
		method: "POST",            // HTTP method
		headers: {
			"Content-Type": "application/json" // Tell the server it's JSON
		},
		body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Ponudba == "passed"){
			alert("Dodajanje ponudbe je bila uspešno!!!");
			window.location.href = "index.html";
		}
		if(result.Ponudba == "failed"){
			alert("Neuspešno dodajanje ponudbe, "+result.Opis);
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Neuspešno dodajanje ponudbe!",error);
	});
}


function nazaj(){
	window.location.href = "index.html";
}

loadStoritveSelect();
loadPoslovalnice1();
