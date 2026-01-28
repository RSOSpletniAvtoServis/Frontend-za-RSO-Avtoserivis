

async function loadTennants1() {
  const uniqueid = localStorage.getItem("userID");
  if (!uniqueid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  try {
    // Prepare payload
    const data = { uniqueid: uniqueid };

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("AdmVoz") + "tennanti/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const tennants = await response.json(); // assume list of objects
    console.log("Loaded tennants:", tennants);

    const tbody = document.querySelector("#tennantTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Build table rows efficiently
    let html = "";
    tennants.forEach(row => {
      html += `
        <tr>
          <td>${row.NazivTennanta}</td>
          <td>${row.TennantDBNarocila}</td>
          <td>${row.TennantDBPoslovalnice}</td>
          <td>${row.username !== null ? row.username : row.IDVodja}</td>
          <td><button onclick="changeLeader(${row.IDTennant})">Dodaj/spremeni vodjo</button></td>
          <td><button onclick="deleteLeader(${row.IDTennant},${row.IDVodja})">Odstrani vodjo</button></td>
        </tr>
      `;
    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to load Tennants:", error);
    const tbody = document.querySelector("#tennantTable tbody");
    tbody.innerHTML = `<tr><td colspan="6">Failed to load data</td></tr>`;
  }
}



async function loadTennants() {
  try {
    const response = await fetch(localStorage.getItem("AdmVoz") + "tennanti/");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json(); // assume list of objects [{IDZnamka, NazivZnamke}, ...]
	console.log("Hello!");
    const tbody = document.querySelector("#tennantTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Use a DocumentFragment for efficient batch DOM updates
	let html = "";
    data.forEach(row => {
      html += `
        <tr><td>${row.NazivTennanta}</td>
		<td>${row.TennantDBNarocila}</td>
		<td>${row.TennantDBPoslovalnice}</td>
        <td>${row.IDVodja}</td>
		<td><button onclick="changeLeader(${row.IDTennant})">Dodaj/spremeni vodjo</button></td>
		<td><button onclick="deleteLeader(${row.IDTennant},${row.IDVodja})">Odstrani vodjo</button>
        </td></tr>
      `;
		console.log(row);
		console.log("Blabla:"+row.IDVodja);
    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to load Tennants:", error);
    const tbody = document.querySelector("#tennantTable tbody");
    tbody.innerHTML = `<tr><td colspan="2">Failed to load data</td></tr>`;
  }
}



function editTennant(id) {
  // Option 1: redirect to edit page
  window.location.href = `ureditennanta.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

function deleteLeader(idtennant,vodjaid){
	console.log("Tennant: "+idtennant);
	console.log("Vodja: "+vodjaid);
	if(vodjaid == null){
		console.log("Nothing to do IDVodje je null!");
		return;
	} else {
		// Data to send
		const data = {
			idvodja: String(vodjaid),
			idtennant: String(idtennant),
			uniqueid: localStorage.getItem('userID')
		};
		// Send POST request
		fetch(localStorage.getItem("AdmVoz")+"odstranivodjo/", {
		method: "DELETE",            // HTTP method
		headers: {
			"Content-Type": "application/json" // Tell the server it's JSON
		},
		body: JSON.stringify(data)  // Convert JS object to JSON string
		})
		.then(response => response.json()) // Parse JSON response
		.then(result => {
			console.log("Success:", result);
			if(result.Vodja == "passed"){
				alert("Vodja uspešno odstranjen!!!");
				window.location.href = "preglejtennante.html";	
			} else {
				alert("Odstranjevanje neuspešno!!!");
			}
		})
		.catch(error => {
			console.error("Error:", error);
			alert("Prišlo je do napake!!!");
		});
	}
}

// start


// finish



function changeLeader(id) {
  // Option 1: redirect to edit page
  window.location.href = `spremenivodjo.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

loadTennants1();