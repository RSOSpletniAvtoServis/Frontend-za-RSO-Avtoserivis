

async function loadPonudbe1() {
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
    const response = await fetch(localStorage.getItem("PosZap") + "ponudbe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const ponudbe = await response.json(); // assume list of objects
    console.log("Loaded ponube:", ponudbe);

    const tbody = document.querySelector("#ponudbaTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Build table rows efficiently
    let html = "";
    ponudbe.forEach(row => {
      html += `
        <tr>
          <td>${row.NazivPoslovalnice !== null ? row.NazivPoslovalnice : row.IDPoslovalnica}</td>
          <td>${row.NazivStoritve !== null ? row.NazivStoritve : row.IDStoritev}</td>
		  <td>${row.Aktiven}</td>
          <td><button onclick="urediponudbo(${row.IDPonudba})">Uredi ponudbo</button></td>
        </tr>
      `;
    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to load poslovalnice:", error);
    const tbody = document.querySelector("#ponudbaTable tbody");
    tbody.innerHTML = `<tr><td colspan="6">Failed to load data</td></tr>`;
  }
}

function urediponudbo(id) {
  // Option 1: redirect to edit page
  window.location.href = `urediponudbo.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

loadPonudbe1();