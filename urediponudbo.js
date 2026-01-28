
async function loadStoritevSelect() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"storitve/");
  const data = await response.json(); // double dictionary

  const select = document.getElementById("stor");
  

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


function loadPonudba() {
  const userid = localStorage.getItem('userID');
  const params = new URLSearchParams(window.location.search);
  const idponudba = params.get("id");

  if (!userid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  const data = {
	  idponudba: idponudba,
	idtennant: localStorage.getItem('idtennant'),
    uniqueid: userid
  };

  fetch(localStorage.getItem("PosZap") + "ponudba/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(ponudba => {
		console.log("Poslovalnica:", ponudba);
		document.getElementById("posl").value = ponudba.IDPoslovalnica;
        document.getElementById("stor").value = ponudba.IDStoritev;
		document.getElementById("aktiven").value = ponudba.Aktiven;

    })
    .catch(error => {
      console.error("Error:", error);
      alert("Prišlo je do napake pri nalaganju poslovalnice!");
    });
}

function posodobiponudbo() {
	const params = new URLSearchParams(window.location.search);
    const idponudba = params.get("id");
	const idposlovalnica = document.getElementById('posl').value;
	const idstoritev = document.getElementById('stor').value;
	const aktiven = document.getElementById("aktiven").value
	const data = {
		idponudba: idponudba,
		idposlovalnica: idposlovalnica,
		idstoritev: idstoritev,
		aktiven: aktiven,
		idtennant: localStorage.getItem('idtennant'),
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("PosZap")+"posodobiponudbo/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Ponudba == "passed"){
			alert("Ponudba uspešno posodobljena!!!");
			window.location.href = "upravljajponudbo.html";	
		} else if(result.Ponudba == "failed"){
			alert("Neuspešno posodobljena ponudba, "+result.Opis);
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
	window.location.href = "upravljajponudbo.html";
}



async function runSequentially(){
	await loadStoritevSelect();
	await loadPoslovalnice1();
	loadPonudba();
}

runSequentially();