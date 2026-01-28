

async function loadZaposleni1() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = localStorage.getItem('idtennant');
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
    const response = await fetch(localStorage.getItem("PosZap") + "zaposleni/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const ponudbe = await response.json(); // assume list of objects
    console.log("Loaded ponube:", ponudbe);

    const tbody = document.querySelector("#zaposleniTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Build table rows efficiently
    let html = "";
    ponudbe.forEach(row => {
      html += `
        <tr>
          <td>${row.Ime}</td>
          <td>${row.Priimek}</td>
		  <td>${row.Telefon}</td>
		  <td>${row.Email}</td>
		  <td>${row.NazivPoslovalnice}</td>
          <td><button onclick="uredizaposlenega(${row.IDZaposleni})">Uredi zaposlenega</button>
		  <button onclick="odstranizaposlenega(${row.IDZaposleni})">Odstrani zaposlenega</button></td>
        </tr>
      `;
    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to load zaposleni:", error);
    const tbody = document.querySelector("#zaposleniTable tbody");
    tbody.innerHTML = `<tr><td colspan="6">Failed to load data</td></tr>`;
  }
}

function uredizaposlenega(id) {
  // Option 1: redirect to edit page
  window.location.href = `uredizaposlenega.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

function odstranizaposlenega(idzaposleni){
	
	const data = {
		idzaposleni: String(idzaposleni),
		idtennant: localStorage.getItem('idtennant'),
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("PosZap")+"izbrisizaposlenega/", {
	method: "DELETE",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Zaposleni == "passed"){
			alert("Zaposleni uspešno odstranjen!!!");
			window.location.href = "odstranizaposlenega.html";	
		} else if(result.Zaposleni == "failed") {
			alert("Odstranjevanje zaposlenega neupešno!!!");
		} else {
			alert("Odstranjevanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});	

}

loadZaposleni1();