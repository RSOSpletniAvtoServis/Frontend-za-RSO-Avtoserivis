async function loadZnamka1() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"znamke/");
  const data = await response.json(); // double dictionary

  const tbody = document.querySelector("#znamkaTable tbody");
  tbody.innerHTML = "";

  Object.values(data).forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.NazivZnamke}</td>
      <td>
        <button onclick="editZnamka(${row.IDZnamka})">Uredi</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function loadStoritev() {
  try {
    const response = await fetch(localStorage.getItem("AdmVoz") + "storitve/");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json(); // assume list of objects [{IDZnamka, NazivZnamke}, ...]
	console.log("Hello!");
    const tbody = document.querySelector("#storitevTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Use a DocumentFragment for efficient batch DOM updates
	let html = "";
    data.forEach(row => {
      html += `
        <tr><td>${row.NazivStoritve}</td>
		<td>${row.Aktiven}</td>
        <td>
          <button onclick="editStoritev(${row.IDStoritev})">Uredi</button>
        </td></tr>
      `;

    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to load Storitve:", error);
    const tbody = document.querySelector("#storitevTable tbody");
    tbody.innerHTML = `<tr><td colspan="2">Failed to load data</td></tr>`;
  }
}



function editStoritev(id) {
  // Option 1: redirect to edit page
  window.location.href = `uredistoritev.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

loadStoritev();