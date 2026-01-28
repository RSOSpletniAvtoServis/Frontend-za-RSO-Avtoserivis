

async function loadVozila1() {
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
				iduporabnik: localStorage.getItem("iduporabnik"),
				uniqueid: localStorage.getItem('userID'),
			};

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("AdmVoz") + "vozila/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const vozila = await response.json(); // assume list of objects
    console.log("Loaded vozila:", vozila);

    const tbody = document.querySelector("#vozilaTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Build table rows efficiently
    let html = "";
    vozila.forEach(row => {
      html += `
        <tr>
          <td>${row.StevilkaSasije}</td>
          <td>${row.NazivZnamke}</td>
		  <td>${row.NazivModel}</td>
		  <td>${row.LetoPrveRegistracije}</td>
		  <td>${row.KonjskaMoc}</td>
		  <td>${row.Aktiven}</td>
          <td><button onclick="uredivozilo('${row.StevilkaSasije}')">Uredi vozilo</button></td>
        </tr>
      `;
    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to loadvozila:", error);
    const tbody = document.querySelector("#vozilaTable tbody");
    tbody.innerHTML = `<tr><td colspan="6">Failed to load data</td></tr>`;
  }
}

function uredivozilo(id) {
  // Option 1: redirect to edit page
  window.location.href = `uredivozilo.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

loadVozila1();