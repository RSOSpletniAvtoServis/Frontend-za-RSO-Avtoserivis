
function onTelInput(){

	const kon = document.getElementById("tel").value;
	const statusPass = document.getElementById("tel-status");
	const teltest = /^\d+$/.test(kon);
	if(teltest){
		statusPass.textContent = "✓ Telefon je pravilno vnešen!";
		statusPass.style.color = "green";
    } else{
		statusPass.textContent = "✗ Telefon ni pravilno vnešen";
		statusPass.style.color = "red";
    }
}

function onDavInput(){

	const leto = document.getElementById("dav").value;
	const statusPass = document.getElementById("dav-status");
	const teltest = /^\d+$/.test(leto);
	if(teltest){
		statusPass.textContent = "✓ Davčna je pravilno vnešena!";
		statusPass.style.color = "green";
    } else{
		statusPass.textContent = "✗ Davčna ni pravilno vnešena";
		statusPass.style.color = "red";
    }
}


function loadStranka() {
  const userid = localStorage.getItem('userID');
  
  const iduporabnik = localStorage.getItem('iduporabnik');
	
  if (!userid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  const data = {
	  iduporabnik: iduporabnik,
      uniqueid: userid
  };

  fetch(localStorage.getItem("UpoPri") + "stranka/", {
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
    .then(stranka => {
		console.log("Stranka:", stranka);
		document.getElementById("ime").value = stranka.Ime;
        document.getElementById("priimek").value = stranka.Priimek;
		document.getElementById("tel").value = stranka.Telefon;
		document.getElementById("email").value = stranka.Email;
		document.getElementById("dav").value = stranka.DavcnaStevilka;

    })
    .catch(error => {
      console.error("Error:", error);
      alert("Prišlo je do napake pri nalaganju poslovalnic!");
    });
}

function posodobipodatke() {
	
	const iduporabnik = localStorage.getItem('iduporabnik');
	const ime = document.getElementById('ime').value;
	const priimek = document.getElementById('priimek').value;
	const email = document.getElementById('email').value;
	const telefon = document.getElementById('tel').value;
	const davcna = document.getElementById('dav').value;
	
	const teltest = /^\d+$/.test(telefon);
	const davtest = /^\d+$/.test(davcna);
	if(!teltest){
		alert("Telefon ni pravilno vnešen!!!");
		return;
	}
	if(!davtest){
		alert("Davčna ni pravilno vnešena!!!");
		return;
	}
	if(!email.includes("@")){
		alert("Email ni pravilno vnešen!!!");
		return;
	}
	
	
	const data = {
		ime: ime,
		priimek: priimek,
		email: email,
		telefon: telefon,
		davcna: davcna,
		iduporabnik: iduporabnik,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("UpoPri")+"posodobistranko/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Stranka == "passed"){
			alert("Podatki uspešno posodobljeni!!!");
			window.location.href = "index.html";	
		} else if(result.Stranka == "failed") {
			alert("Posodabljanje podatkov neupešno!!!");
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
	window.location.href = "index.html";
}


loadStranka();