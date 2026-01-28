
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
    fetch(`http://localhost:1000/preveriusername/${encodeURIComponent(username)}`)
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


function registracija() {
    const username = document.getElementById('uname').value;
	const pass = document.getElementById('pass').value;
	const cpass = document.getElementById('cpass').value;
	const ime = document.getElementById('fname').value;
	const priimek = document.getElementById('lname').value;
	const email = document.getElementById('email').value;
	const telefon = document.getElementById('tel').value;
	const davcna = document.getElementById('dav').value;
	if(pass == cpass){
		const teltest = /^\d+$/.test(telefon);
		const davtest = /^\d+$/.test(davcna);
		if(teltest){
			if(davtest){
				if(email.includes("@")){
				// Data to send
					const data = {
					  username: username,
					  password: pass,
					  ime: ime,
					  priimek: priimek,
					  email: email,
					  telefon: telefon,
					  davcna: davcna
					};

					// Send POST request
					fetch(localStorage.getItem("UpoPri")+"registracija/", {
						method: "POST",            // HTTP method
						headers: {
							"Content-Type": "application/json" // Tell the server it's JSON
						},
						body: JSON.stringify(data)  // Convert JS object to JSON string
					})
					.then(response => response.json()) // Parse JSON response
					.then(result => {
						console.log("Success:", result);
						if(result.UniqueID !== null){
							alert("Registracija je bila uspešna!!!");
							window.location.href = "index.html";
						}
					})
					.catch(error => {
						console.error("Error:", error);
					});
				} else {
					alert('Email ni pravilno vnešen!!!');
				}
			
			} else {
				alert('Davčna ni pravilno vnešena!!!');
			}
		} else {
			alert('Telefon ni pravilno vnešen!!!');
		}
	} else {
		alert('Gesla nista enaka!!!');
	}
}

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

function nazaj(){
	window.location.href = "index.html";
}
