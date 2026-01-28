async function loadTennantSelect() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"tennants/");
  const data = await response.json(); // double dictionary

  const select = document.getElementById("avtoser");
  

  data.forEach(row => {
  const option = document.createElement("option");
  option.value = row.IDTennant;
  option.textContent = row.NazivTennanta;
  select.appendChild(option);
  });
}

async function avtoservisChanged() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = document.getElementById('avtoser').value;
  console.log("IDTennant: "+idtennant);
  //const select = document.getElementById('pos');
  if (!uniqueid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }
  //select.innerHTML = "";
  try {
    // Prepare payload
    const data = {
				idtennant: idtennant,
				iduporabnik: localStorage.getItem('iduporabnik'),
				mode: '2',
				uniqueid: localStorage.getItem('userID'),
			};

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("NarOceSpo") + "narocilastranka/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const narocila = await response.json(); // assume list of objects
    console.log("Loaded Narocila:", narocila);
	
        const tbody = document.querySelector("#nservisTable tbody");
    tbody.innerHTML = ""; // clear old rows

    // Use a DocumentFragment for efficient batch DOM updates
	let html = "";
    narocila.forEach(row => {
      html += `
        <tr><td>${row.StevilkaSasije}</td>
		<td>${row.NazivZnamke}</td>
		<td>${row.NazivModel}</td>
		<td>${row.NazivPoslovalnice}</td>
		<td>${row.NazivStoritve}</td>
		<td>${row.Datum}</td>
		<td>${String(Math.floor(row.Cas / 3600))+":"+String(Math.floor((row.Cas % 3600) / 60))}</td>
		<td>${row.NazivStatusa}</td>
        <td>
          <button onclick="sporociloStranka(${row.IDNarocilo})">Pošlji sporočilo</button>
        </td></tr>
      `;

    });

    tbody.innerHTML = html; // one DOM update
  }  catch (error) {
    console.error("Failed to load narocila:", error);
	alert("Failed to load narocila:", error);
  }
}

function sporociloStranka(id) {
	alert("TODO: sporočila!!!");
  // Option 1: redirect to edit page
  //window.location.href = `uredimodel.html?id=${id}`;

  // Option 2: open modal / alert
  // alert("Edit record with IDKraj = " + id);
}

async function runSequentially() {
  await loadTennantSelect();   // waits until first finishes
  //const val = document.getElementById("znamke").value;
  //await loadModel(val);  // runs only after first is done
  await avtoservisChanged();
}
runSequentially();
