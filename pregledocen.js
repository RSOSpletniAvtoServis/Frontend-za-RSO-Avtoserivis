

async function loadOcena() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = localStorage.getItem('idtennant');
  const iduporabnik = localStorage.getItem('iduporabnik');
  const idnarocilo = localStorage.getItem('idn');
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
				iduporabnik: iduporabnik,
				uniqueid: localStorage.getItem('userID'),
			};

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("NarOceSpo") + "dobiocene/", {
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
		<td>${row.IDNarocilo}</td>`;
		let stars = "";
		for (let i = 0; i < row.Ocena; i++) {
			stars += "★";
		}
		html += `
		<td>${stars}</td>
		<td>${row.Komentar}</td>
        </tr>`;
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
  await loadOcena();   // waits until first finishes
  //const val = document.getElementById("znamke").value;
  //await loadModel(val);  // runs only after first is done
  //await avtoservisChanged();
}
runSequentially();
