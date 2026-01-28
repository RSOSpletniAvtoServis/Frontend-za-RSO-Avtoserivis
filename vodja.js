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


function dodajVodjo() {
    const username = document.getElementById('uname').value;
	const pass = document.getElementById('pass').value;
	const cpass = document.getElementById('cpass').value;
	if(pass == cpass){
		// Data to send
		const data = {
			username: username,
			password: pass,
			};
		// Send POST request
		fetch(localStorage.getItem("UpoPri")+"dodajvodjo/", {
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
				alert("Dodajanje vodje uspešnao!!");
				window.location.href = "index.html";
			}
		})
		.catch(error => {
			console.error("Error:", error);
		});
	} else {
		alert('Gesla nista enaka!!!');
	}
}

function nazaj(){
	window.location.href = "index.html";
}
