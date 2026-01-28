async function loadZnamkaSelect() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"znamke/");
  const data = await response.json(); // double dictionary

  const select = document.getElementById("znamke");
  

  data.forEach(row => {
  const option = document.createElement("option");
  option.value = row.IDZnamka;
  option.textContent = row.NazivZnamke;
  select.appendChild(option);
  });
}




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

async function loadModel(znamkaid) {
  try {
    const response = await fetch(localStorage.getItem("AdmVoz") + "modeli/"+znamkaid);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json(); // assume list of objects [{IDZnamka, NazivZnamke}, ...]
	console.log("Hello!");
    const tbody = document.querySelector("#modelTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Use a DocumentFragment for efficient batch DOM updates
	let html = "";
    data.forEach(row => {
      html += `
        <tr><td>${row.NazivModel}</td>
        <td>
          <button onclick="editModel(${row.IDModel})">Uredi</button>
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



function editModel(id) {
  // Option 1: redirect to edit page
  window.location.href = `uredimodel.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}
async function runSequentially() {
  await loadZnamkaSelect();   // waits until first finishes
  const val = document.getElementById("znamke").value;
  await loadModel(val);  // runs only after first is done
}

const select = document.getElementById("znamke");

select.addEventListener("change", function () {
  const selectedValue = this.value;
  const selectedText = this.options[this.selectedIndex].text;

  console.log("Value:", selectedValue);
  console.log("Text:", selectedText);

  loadModel(selectedValue);
});


runSequentially();
