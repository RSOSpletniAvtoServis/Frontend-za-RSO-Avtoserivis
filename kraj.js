async function loadKraj() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"kraji/");
  const data = await response.json(); // double dictionary

  const tbody = document.querySelector("#krajTable tbody");
  tbody.innerHTML = "";

  Object.values(data).forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.NazivKraja}</td>
	  <td>${row.Longitude}</td>
      <td>${row.Latitude}</td>
      <td>
        <button onclick="editKraj(${row.IDKraj})">Uredi</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function editKraj(id) {
  // Option 1: redirect to edit page
  window.location.href = `uredikraj.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

loadKraj();