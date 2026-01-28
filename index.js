

async function dobiAvtoservis() {
	if(localStorage.getItem('vloga') == 4 || localStorage.getItem('vloga') == 2){
		const response = await fetch(localStorage.getItem("PosZap")+"avtoservis/"+localStorage.getItem('idtennant'));
		const data = await response.json(); // double dictionary
	  
		document.getElementById("naslov").textContent = data.NazivAvtoServis;
		if(localStorage.getItem('vloga') == 4){
			console.log("Vodja: "+data.IDVodja);
		}
	}
	
  
}

dobiAvtoservis();