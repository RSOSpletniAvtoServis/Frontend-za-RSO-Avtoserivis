

async function loadPoslovalnice1() {
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

    const tbody = document.querySelector("#poslovalnicaTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Build table rows efficiently
    let html = "";
    poslovalnice.forEach(row => {
      html += `
        <tr>
          <td>${row.NazivPoslovalnice}</td>
          <td>${row.NaslovPoslovalnice}</td>
          <td>${row.Email}</td>
		  <td>${row.Telefon}</td>
          <td>${row.NazivKraja !== null ? row.NazivKraja : row.IDKraj}</td>
		  <td>${row.Aktiven}</td>
          <td><button onclick="urediposlovalnico(${row.IDPoslovalnica})">Uredi poslovalnico</button></td>
        </tr>
      `;
    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to load poslovalnice:", error);
    const tbody = document.querySelector("#poslovalnicaTable tbody");
    tbody.innerHTML = `<tr><td colspan="6">Failed to load data</td></tr>`;
  }
}

function editTennant(id) {
  // Option 1: redirect to edit page
  window.location.href = `ureditennanta.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}






function urediposlovalnico(id) {
  // Option 1: redirect to edit page
  window.location.href = `urediposlovalnico.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

loadPoslovalnice1();