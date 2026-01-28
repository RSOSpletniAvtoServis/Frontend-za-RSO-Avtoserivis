let debounceTimer = null;

const input = document.getElementById("uname");
const status = document.getElementById("username-status");

input.addEventListener("input", () => {
  const username = input.value.trim();

  // Clear previous debounce
  clearTimeout(debounceTimer);

  // Basic client-side checks
  if (username.length < 3) {
    return;
  }

  // Debounce API call
  debounceTimer = setTimeout(() => {
    fetch(localStorage.getItem("UpoPri")+`preveriusername/${encodeURIComponent(username)}`)
      .then(response => response.json())
      .then(data => {
        if (data.valid === "True") {
          status.textContent = "✓ Username '" + input.value + "' na voljo!";
          status.style.color = "green";
        } else if (data.valid === "False") {
          status.textContent = "✗ Username '" + input.value + "' že v uporabi!";
          status.style.color = "red";
        } else {
          status.textContent = "Error checking username";
          status.style.color = "orange";
        }
      })
      .catch(err => {
        console.error(err);
        status.textContent = "Server error";
        status.style.color = "orange";
      });
  }, 400); // 400ms debounce
});

function onTextInput(){

	const conPass = document.getElementById("cpass").value;
	const pass = document.getElementById("pass").value;
	const statusPass = document.getElementById("password-status");
	if(pass === conPass){
		statusPass.textContent = "✓ Gesli sta enaki!";
		statusPass.style.color = "green";
    } else{
		statusPass.textContent = "✗ Gesli nista enaki";
		statusPass.style.color = "red";
    }
}

function onTelInput(){


	const telefon = document.getElementById("tel").value;
	const statusPass = document.getElementById("tel-status");
	const teltest = /^\d+$/.test(telefon);
	if(teltest){
		statusPass.textContent = "✓ Telefon je pravilno vnešen!";
		statusPass.style.color = "green";
    } else{
		statusPass.textContent = "✗ Telefon ni pravilno vnešen";
		statusPass.style.color = "red";
    }
}


async function loadPoslovalnice1() {
  const uniqueid = localStorage.getItem("userID");
  const idtennant = localStorage.getItem('idtennant');
  const select = document.getElementById('pos');
  if (!uniqueid) {
    localStorage.clear();
    window.location.href = "index.html";
    return;
  }

  try {
    // Prepare payload
    const data = {
				idtennant: localStorage.getItem('idtennant'),
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



function dodajzaposlenega() {
    const username = document.getElementById('uname').value;
	const pass = document.getElementById('pass').value;
	const cpass = document.getElementById('cpass').value;
	const ime = document.getElementById('fname').value;
	const priimek = document.getElementById('lname').value;
	const email = document.getElementById('email').value;
	const telefon = document.getElementById('tel').value;
	const idposlovalnica = document.getElementById('pos').value;
	if(pass == cpass){
		const teltest = /^\d+$/.test(telefon);
		if(teltest){
			if(email.includes("@")){
			// Data to send
				const data = {
					username: username,
					password: pass,
					ime: ime,
					priimek: priimek,
					email: email,
					telefon: telefon,
					idposlovalnica: idposlovalnica,
					idtennant: localStorage.getItem('idtennant'),
					uniqueid: localStorage.getItem('userID')
				};

				// Send POST request
				fetch(localStorage.getItem("PosZap")+"dodajzaposlenega/", {
					method: "POST",            // HTTP method
					headers: {
						"Content-Type": "application/json" // Tell the server it's JSON
					},
					body: JSON.stringify(data)  // Convert JS object to JSON string
				})
				.then(response => response.json()) // Parse JSON response
				.then(result => {
					console.log("Success:", result);
					if(result.Zaposleni == "passed"){
						alert("Zaposleni uspešno dodan!!!");
						window.location.href = "index.html";
					} else {
						alert("Dodajanje zaposlenega je bilo neuspešno!!!");
					}
				})
				.catch(error => {
					console.error("Error:", error);
				});
			} else {
				alert('Email ni pravilno vnešen!!!');
			}
			
		} else {
			alert('Telefon ni pravilno vnešen!!!');
		}
	} else {
		alert('Gesla nista enaka!!!');
	}
}

function nazaj(){
	window.location.href = "index.html";
}

loadPoslovalnice1();
