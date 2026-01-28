
function loadVozilo() {
  const userid = localStorage.getItem('userID');
  const params = new URLSearchParams(window.location.search);
  const stsas = params.get("id");

  if (!userid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  const data = {
	  stsasije: stsas,
	  iduporabnik: localStorage.getItem('iduporabnik'),
      uniqueid: userid
  };

  fetch(localStorage.getItem("AdmVoz") + "vozilo/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(vozilo => {
		console.log("Vozilo:", vozilo);
		document.getElementById("stsas").textContent = vozilo.StevilkaSasije;
        document.getElementById("znamka").textContent = vozilo.NazivZnamke;
		document.getElementById("model").textContent = vozilo.NazivModel;
		document.getElementById("leto").value = vozilo.LetoPrveRegistracije;
		document.getElementById("km").value = vozilo.KonjskaMoc;
		document.getElementById("aktiven").value = vozilo.Aktiven;

    })
    .catch(error => {
      console.error("Error:", error);
      alert("Prišlo je do napake pri nalaganju vozila!");
    });
}

function onKonInput(){

	const kon = document.getElementById("km").value;
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


function posodobivozilo() {
	const params = new URLSearchParams(window.location.search);
    const stsas = params.get("id");
	const leto = document.getElementById('leto').value;
	const km = document.getElementById('km').value;
	const aktiven = document.getElementById('aktiven').value;
	const teltest = /^\d+$/.test(leto);
	const kmtest = /^\d+$/.test(km);
	if(!teltest){
		alert("Leto ni pravilno vnešeno!!!");
		return;
	}
	if(!kmtest){
		alert("Konska moč ni pravilno vnešena!!!");
		return;
	}

	const data = {
		stsasije: stsas,
		leto: leto,
		km: km,
		aktiven: aktiven,
		iduporabnik: localStorage.getItem('iduporabnik'),
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"posodobivozilo/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Vozilo == "passed"){
			alert("Vozilo uspešno posodobljeno!!!");
			window.location.href = "preglejvozila.html";	
		} else if(result.Vozilo == "failed") {
			alert("Posodabljanje vozila neupešno!!!");
		} else {
			alert("Posodabljanje neuspešno!!!");
		}
	})
	.catch(error => {
		console.error("Error:", error);
		alert("Prišlo je do napake!!!");
	});
}


function nazaj(){
	window.location.href = "preglejvozila.html";
}




loadVozilo();
