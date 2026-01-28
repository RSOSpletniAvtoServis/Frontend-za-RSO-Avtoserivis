

async function loadNarocila() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = localStorage.getItem('idtennant');
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
				mode: '3',
				uniqueid: localStorage.getItem('userID'),
			};

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("NarOceSpo") + "narocilaposlovalnica/", {
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
        <tr>
		<td>${row.NazivZnamke + " " + row.NazivModel}</td>
		<td>${row.ImeStranke + " " + row.PriimekStranke + " " + row.EmailStranke}</td>
		<td>${row.NazivPoslovalnice}</td>
		<td>${row.NazivStoritve}</td>
		<td>${row.Datum}</td>
		<td>${String(Math.floor(row.Cas / 3600))+":"+String(Math.floor((row.Cas % 3600) / 60))}</td>
		<td>${row.NazivStatusa}</td>
        <td>`;
	
		 if(row.ImaOceno == "true"){
			 html += `<button onclick="preglejoceno(${row.IDNarocilo})">Poglej oceno</button>`;
		 }
		  
        html += `</td></tr>`;

    });

    tbody.innerHTML = html; // one DOM update
  }  catch (error) {
    console.error("Failed to load narocila:", error);
	alert("Failed to load narocila:", error);
  }
}


function preglejoceno(idnarocilo){
	localStorage.setItem('idn',idnarocilo);
	window.location.href = "poglejoceno.html";
	
}

async function runSequentially() {
  await loadNarocila();   // waits until first finishes
  //const val = document.getElementById("znamke").value;
  //await loadModel(val);  // runs only after first is done
  //await avtoservisChanged();
}
runSequentially();
