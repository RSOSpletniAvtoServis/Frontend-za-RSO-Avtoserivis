

async function loadStatus() {
  try {
    const response = await fetch(localStorage.getItem("AdmVoz") + "statusi/");
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json(); // assume list of objects [{IDZnamka, NazivZnamke}, ...]
	console.log("Hello!");
    const tbody = document.querySelector("#statusTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Use a DocumentFragment for efficient batch DOM updates
	let html = "";
    data.forEach(row => {
      html += `
        <tr><td>${row.NazivStatusa}</td>
        <td>
          <button onclick="editStatus(${row.IDStatus})">Uredi</button>
        </td></tr>
      `;

    });

    tbody.innerHTML = html; // one DOM update

  } catch (error) {
    console.error("Failed to load Statusi:", error);
    const tbody = document.querySelector("#statusTable tbody");
    tbody.innerHTML = `<tr><td colspan="2">Failed to load data</td></tr>`;
  }
}



function editStatus(id) {
  // Option 1: redirect to edit page
  window.location.href = `uredistatus.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

loadStatus();