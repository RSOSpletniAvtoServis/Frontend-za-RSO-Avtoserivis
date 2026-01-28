
function loadVodje() {
  const userid = localStorage.getItem('userID');

  if (!userid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  const data = {
    uniqueid: userid
  };

  fetch(localStorage.getItem("UpoPri") + "prostevodje/", {
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
    .then(vodje => {
      console.log("Vodje:", vodje);

      const select = document.getElementById("vodje");
      //select.innerHTML = '<option value="">-- Izberi vodjo --</option>';

      vodje.forEach(vodja => {
        const option = document.createElement("option");
        option.value = vodja.IDUporabnik;          // value
        option.textContent = vodja.UporabniskoIme; // visible text
        select.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Prišlo je do napake pri nalaganju vodij!");
    });
}

function dodeliVodjo() {
    const vodjaid = document.getElementById('vodje').value;
	const params = new URLSearchParams(window.location.search);
    const idtennant = params.get("id");
	console.log(idtennant);
	
	// Data to send
	const data = {
		idvodja: vodjaid,
		idtennant: idtennant,
		uniqueid: localStorage.getItem('userID')
	};
	// Send POST request
	fetch(localStorage.getItem("AdmVoz")+"posodobivodjo/", {
	method: "PUT",            // HTTP method
	headers: {
		"Content-Type": "application/json" // Tell the server it's JSON
	},
	body: JSON.stringify(data)  // Convert JS object to JSON string
	})
	.then(response => response.json()) // Parse JSON response
	.then(result => {
		console.log("Success:", result);
		if(result.Vodja == "passed"){
			alert("Vodja uspešno posodobljen!!!");
			window.location.href = "preglejtennante.html";	
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
	window.location.href = "preglejtennante.html";
}

loadVodje();
