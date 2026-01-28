
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

async function loadPoslovalniceSelect() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = document.getElementById('avtoser').value;
  console.log("IDTennant: "+idtennant);
  const select = document.getElementById('pos');
  if (!uniqueid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }
  select.innerHTML = "";
  try {
    // Prepare payload
    const data = {
				idtennant: idtennant,
				uniqueid: localStorage.getItem('userID'),
			};

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("PosZap") + "poslovalnice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const poslovalnice = await response.json(); // assume list of objects
    console.log("Loaded poslovalnice:", poslovalnice);

    poslovalnice.forEach(row => {
      const option = document.createElement("option");
	  option.value = row.IDPoslovalnica;
	  option.textContent = row.NazivPoslovalnice;
	  select.appendChild(option);
	  



  });
  }  catch (error) {
    console.error("Failed to load poslovalnice:", error);
	alert("Failed to load poslovalnice:", error);
  }
}

// Zacetek pridobivanja vozil


async function loadVozilaSelect() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = document.getElementById('avtoser').value;
  console.log("IDTennant: "+idtennant);
  const select = document.getElementById('voz');
  if (!uniqueid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  try {
    // Prepare payload
    const data = {
				iduporabnik: localStorage.getItem('iduporabnik'),
				uniqueid: localStorage.getItem('userID'),
			};

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("AdmVoz") + "vozila/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const vozila = await response.json(); // assume list of objects
    console.log("Loaded vozila:", vozila);

    vozila.forEach(row => {
      const option = document.createElement("option");
	  option.value = row.StevilkaSasije;
	  option.dataset.idznamka = row.IDZnamka;
	  option.dataset.idmodel = row.IDModel;
	  option.textContent = row.StevilkaSasije + " " + row.NazivZnamke + " " + row.NazivModel;
	  select.appendChild(option);
	  



  });
  }  catch (error) {
    console.error("Failed to load vozila:", error);
	alert("Failed to load vozila:", error);
  }
}

// Konec pridobivanja vozil


async function loadStoritveSelect() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = document.getElementById('avtoser').value;
  const IDPoslovalnica = document.getElementById('pos').value;
  console.log("IDTennant: "+idtennant);
  const select = document.getElementById('stor');
  if (!uniqueid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }
  select.innerHTML = "";
  try {
    // Prepare payload
    const data = {
				idposlovalnica: IDPoslovalnica,
				idtennant: idtennant,
				uniqueid: localStorage.getItem('userID'),
			};

    // POST request with JSON body
    const response = await fetch(localStorage.getItem("PosZap") + "ponudbeposlovalnice/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const storitve = await response.json(); // assume list of objects
    console.log("Loaded storitve:", storitve);

    storitve.forEach(row => {
      const option = document.createElement("option");
	  option.value = row.IDStoritev;
	  option.dataset.IDPonudba = row.IDPonudba;
	  option.textContent = row.NazivStoritve;
	  select.appendChild(option);
	  



  });
  }  catch (error) {
    console.error("Failed to load poslovalnice:", error);
	alert("Failed to load poslovalnice:", error);
  }
}




async function avtoservisChanged(idtennant){
	await loadPoslovalniceSelect();
	await loadStoritveSelect();
	const idposlovalnica = document.getElementById('pos').value;
	getWeather(idposlovalnica);
}

async function poslovalnicaChanged(idposlovalnica){
	await loadStoritveSelect();
	getWeather(idposlovalnica);
  
   
  
  
  
}

async function getWeather(idposlovalnica){
	const idtennant = document.getElementById('avtoser').value;

	try {
		// Prepare payload
		const data = {
					idtennant: idtennant,
					idposlovalnica: idposlovalnica,
					uniqueid: localStorage.getItem('userID'),
				};

		// POST request with JSON body
		const response = await fetch(localStorage.getItem("PosZap") + "poslovalnica/", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(data)
		});

		if (!response.ok) throw new Error("Network response was not ok");

		const poslovalnica = await response.json(); // assume list of objects
		console.log("Loaded Poslovalnica:", poslovalnica);
		const idkraj = poslovalnica.IDKraj;
		
		
		// Zacetek za vreme 

			const response1 = await fetch(localStorage.getItem("AdmVoz") + "vreme/"+poslovalnica.IDKraj);
			if (!response.ok) throw new Error("Request failed");

			const weather = await response1.json();
			console.log(weather);
			const tbody = document.querySelector("#weatherTable tbody");


		const dict = {
			'0': "jasno",
			'1': "večinoma jasno",
			'2': "delno oblačno",
			'3': "oblačno",
			'45': "megla",
			'48': "megla",
			'51': "lažje rosenje",
			'53': "srednje rosenje",
			'55': "močno rosenje",
			'56': "lažje zmrzujoče rosenje",
			'57': "gosto zmrzujoče rosenje",
			'61': "rahel dež",
			'63': "srednje močan dež",
			'65': "močan dež",
			'71': "rahlo sneženje",
			'73': "srednje močno sneženje",
			'75': "močno sneženje",
			'77': "snežna zrna",
			'80': "rahla dežna ploha",
			'81': "srednja dežna ploha",
			'82': "močna dežna ploha",
			'85': "rahla snežena ploha",
			'86': "močna snežna ploha",
			'95': "rahla ali močna nevihta",
			'96': "nevihta z rahlo točo",
			'99': "nevihta z močno točo",	
		};
			tbody.innerHTML = "";

			// Add each weather object as a row
			weather.forEach(item => {
			  const row = document.createElement("tr");
			  
			  row.innerHTML = `
				<td>${item.time}</td>
				<td>${item.temperature_2m_max}</td>
				<td>${dict[item.weather_code]}</td>
			  `;
			  
			  tbody.appendChild(row);
			});
		// Konec za vreme
		

  }  catch (error) {
    console.error("Failed to load narocila:", error);
	alert("Failed to load narocila:", error);
  }
	
}

function narocilo() {
	
	const iduporabnik = localStorage.getItem('iduporabnik');
	const idtennant = document.getElementById('avtoser').value;
	const selectPos = document.getElementById('pos');
	if(selectPos.options.length === 0){
		alert("Izbrani avtoservis nima poslovalnic, prosim izberite drugi avtoservis!!!");
		return;
	}
	const idposlovalnica = selectPos.value;
	const select = document.getElementById('voz');
	if(select.options.length === 0){
		alert("V lasti nimate nobenega vozila ne morete se naročiti na servis!!!");
		window.location.href = "index.html";
		return;
	}
	const stsas = select.value;
	const opt = select.options[select.selectedIndex];
	const idznamka = opt.dataset.idznamka;
	const idmodel = opt.dataset.idmodel;
	const select1 = document.getElementById('stor');
	if(select1.options.length === 0){
		alert("Izbrana poslovalnica nima ponujenih storitev, prosim izberite drugo poslovalnico ali drugi avtoservis!!!");
		return;
	}
	const idstoritev = select1.value;
	const opt1 = select1.options[select1.selectedIndex];
	const idponudba = opt1.dataset.IDPonudba;
	
	const datum = document.getElementById('dat').value;
	const ura = document.getElementById('ura').value;
	
	if(datum === ""){
		alert("Izberite datum!!!");
		return;
	}
	if(ura === ""){
		alert("Izberite uro!!!");
		return;
	}

	const data = {
		idtennant: idtennant,
		iduporabnik: iduporabnik,
		stsas: stsas,
		idznamka: idznamka,
		idmodel: idmodel,
		idposlovalnica: idposlovalnica,
		idstoritev: idstoritev,
		idponudba: idponudba,
		datum: datum,
		ura: ura,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("NarOceSpo")+"dodajnarocilo/", {
	method: "POST",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Narocilo == "passed"){
			alert("Naročilo uspešno oddano!!!");
			window.location.href = "index.html";	
		} else if(result.Narocilo == "failed") {
			alert("Narocanje ni bilo uspešno neupešno!!!");
		} else {
			alert("Narocanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}


function nazaj(){
	window.location.href = "index.html";
}

async function runSequentially() {
	loadVozilaSelect();
  await loadTennantSelect();   // waits until first finishes
  await loadPoslovalniceSelect();
  await loadStoritveSelect();
  //const val = document.getElementById("znamka").value;
  //await loadModel(val);  // runs only after first is done
}

runSequentially();


