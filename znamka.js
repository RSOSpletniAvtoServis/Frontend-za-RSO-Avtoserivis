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

async function loadZnamka() {
  try {
    const response = await fetch(localStorage.getItem("AdmVoz") + "znamke/");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json(); // assume list of objects [{IDZnamka, NazivZnamke}, ...]
	console.log("Hello!");
    const tbody = document.querySelector("#znamkaTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Use a DocumentFragment for efficient batch DOM updates
	let html = "";
    data.forEach(row => {
      html += `
        <tr><td>${row.NazivZnamke}</td>
        <td>
          <button onclick="editZnamka(${row.IDZnamka})">Uredi</button>
        </td></tr>
      `;

    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to load Znamke:", error);
    const tbody = document.querySelector("#znamkaTable tbody");
    tbody.innerHTML = `<tr><td colspan="2">Failed to load data</td></tr>`;
  }
}



function editZnamka(id) {
  // Option 1: redirect to edit page
  window.location.href = `urediznamko.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

loadZnamka();