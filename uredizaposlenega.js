async function loadPoslovalnice1() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = localStorage.getItem('idtennant');
  const select = document.getElementById('pos');
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


function loadZaposleni() {
  const userid = localStorage.getItem('userID');
  const params = new URLSearchParams(window.location.search);
  const idzaposleni = params.get("id");

  if (!userid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  const data = {
	  idzaposleni: idzaposleni,
	  idtennant: localStorage.getItem('idtennant'),
      uniqueid: userid
  };

  fetch(localStorage.getItem("PosZap") + "zaposlen/", {
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
    .then(zaposleni => {
		console.log("Zaposleni:", zaposleni);
		document.getElementById("ime").textContent = zaposleni.Ime;
        document.getElementById("priimek").textContent = zaposleni.Priimek;
		document.getElementById("tel").textContent = zaposleni.Telefon;
		document.getElementById("email").textContent = zaposleni.Email;
		document.getElementById("pos").value = zaposleni.IDPoslovalnica;

    })
    .catch(error => {
      console.error("Error:", error);
      alert("Prišlo je do napake pri nalaganju poslovalnic!");
    });
}

function posodobizaposlenega() {
	const params = new URLSearchParams(window.location.search);
    const idzaposleni = params.get("id");
	const idposlovalnica = document.getElementById('pos').value;
	
	const data = {
		idzaposleni: idzaposleni,
		idposlovalnica: idposlovalnica,
		idtennant: localStorage.getItem('idtennant'),
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("PosZap")+"posodobizaposleni/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Zaposleni == "passed"){
			alert("Zaposleni uspešno posodobljen!!!");
			window.location.href = "odstranizaposlenega.html";	
		} else if(result.Zaposleni == "failed") {
			alert("Posodabljanje zaposlenega neupešno!!!");
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
	window.location.href = "odstranizaposlenega.html";
}



async function runSequentially(){
	await loadPoslovalnice1();
	loadZaposleni();
}

runSequentially();