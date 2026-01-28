async function loadZnamkaSelect() {
  const response = await fetch(localStorage.getItem("AdmVoz")+"znamke/");
  const data = await response.json(); // double dictionary

  const select = document.getElementById("znamka");
  

  data.forEach(row => {
  const option = document.createElement("option");
  option.value = row.IDZnamka;
  option.textContent = row.NazivZnamke;
  select.appendChild(option);
  });
}


async function loadModel(znamkaid) {
	const modelselect = document.getElementById("model");
  try {
    const response = await fetch(localStorage.getItem("AdmVoz") + "modeli/"+znamkaid);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json(); // assume list of objects [{IDZnamka, NazivZnamke}, ...]
	console.log("Hello!");


    modelselect.innerHTML = "";
    data.forEach(row => {
		const option = document.createElement("option");
		option.value = row.IDModel;
		option.textContent = row.NazivModel;
		modelselect.appendChild(option);
    });

  } catch (error) {
    console.error("Failed to load Znamke:", error);
    const tbody = document.querySelector("#znamkaTable tbody");
    tbody.innerHTML = `<tr><td colspan="2">Failed to load data</td></tr>`;
  }
}

function onKonInput(){

	const kon = document.getElementById("kon").value;
	const statusPass = document.getElementById("kon-status");
	const teltest = /^\d+$/.test(kon);
	if(teltest){
		statusPass.textContent = "✓ Konska moč je pravilno vnešena!";
		statusPass.style.color = "green";
    } else{
		statusPass.textContent = "✗ Konska moč ni pravilno vnešena";
		statusPass.style.color = "red";
    }
}

function onLetoInput(){

	const leto = document.getElementById("leto").value;
	const statusPass = document.getElementById("let-status");
	const teltest = /^\d+$/.test(leto);
	if(teltest){
		statusPass.textContent = "✓ Leto je pravilno vnešeno!";
		statusPass.style.color = "green";
    } else{
		statusPass.textContent = "✗ Leto ni pravilno vnešeno";
		statusPass.style.color = "red";
    }
}

function dodajvozilo() {
    const znamka = document.getElementById('znamka').value;
	const model = document.getElementById('model').value;
	const sasija = document.getElementById('sas').value;
	const leto = document.getElementById('leto').value;
	const km = document.getElementById('kon').value;
	
	const teltest = /^\d+$/.test(leto);
	const kmtest = /^\d+$/.test(km);
	if(teltest){
		if(kmtest){
		// Data to send
			const data = {
				idznamka: String(znamka),
				idmodel: String(model),
				stsasije: String(sasija),
				leto: String(leto),
				km: String(km),
				iduporabnik: String(localStorage.getItem('iduporabnik')),
				uniqueid: String(localStorage.getItem('userID'))
			};

			// Send POST request
			fetch(localStorage.getItem("AdmVoz")+"dodajvozilo/", {
				method: "POST",            // HTTP method
				headers: {
					"Content-Type": "application/json" // Tell the server it's JSON
				},
				body: JSON.stringify(data)  // Convert JS object to JSON string
			})
			.then(response => response.json()) // Parse JSON response
			.then(result => {
				console.log("Success:", result);
				if(result.Vozilo == "passed"){
					alert("Vozilo uspešno dodano!!!");
					window.location.href = "index.html";
				} else if(result.Vozilo == "failed") {
					alert("Neuspešno dodajanje vozila!!!");
				} else {
					alert("Dodajanje vozila je bilo neuspešno!!!");
				}
			})
			.catch(error => {
				console.error("Error:", error);
			});
		} else {
			alert('Konska moč ni pravilno vnešena!!!');
		}
			
	} else {
		alert('Leto ni pravilno vnešeno!!!');
	}
}


function nazaj() {
  
  window.location.href = `index.html`;
}

async function runSequentially() {
  await loadZnamkaSelect();   // waits until first finishes
  const val = document.getElementById("znamka").value;
  await loadModel(val);  // runs only after first is done
}

const select = document.getElementById("znamka");

select.addEventListener("change", function () {
  const selectedValue = this.value;
  const selectedText = this.options[this.selectedIndex].text;

  console.log("Value:", selectedValue);
  console.log("Text:", selectedText);

  loadModel(selectedValue);
});


runSequentially();
console.log("IDUporabnikLS: "+localStorage.getItem("iduporabnik"));