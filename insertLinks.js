
localStorage.setItem("UpoPri","http://localhost:1000/");
localStorage.setItem("AdmVoz","http://localhost:2000/");
localStorage.setItem("PosZap","http://localhost:3000/");
localStorage.setItem("NarOceSpo","http://localhost:4000/");
const div = document.getElementById("navigacija");
const ul = document.createElement("ul");

const itemsAdmin = [
{text: "Dodaj Kraj", url: "dodajkraj.html"},
{text: "Preglej Kraje", url: "preglejkraje.html"},
{text: "Dodaj Znamko", url: "dodajznamko.html"},
{text: "Preglej Znamke", url: "preglejznamke.html"},
{text: "Dodaj Model", url: "dodajmodel.html"},
{text: "Preglej Modele", url: "preglejmodele.html"},
{text: "Dodaj Storitev", url: "dodajstoritev.html"},
{text: "Preglej Storitve", url: "preglejstoritve.html"},
{text: "Dodaj Status", url: "dodajstatus.html"},
{text: "Preglej Statuse", url: "preglejstatuse.html"},
{text: "Dodaj tennanta", url: "dodajtennanta.html"},
{text: "Dodaj vodjo poslovalnice", url: "dodajvodjo.html"},
{text: "Preglej tennante", url: "preglejtennante.html"},
{text: "Odjava", url: "odjava.html"}
];
const itemsStranka = [
{text: "Dodaj Vozilo", url: "dodajvozilo.html"},
{text: "Preglej vozila", url: "preglejvozila.html"},
{text: "Spremeni svoje podatke", url: "spremenipodatke.html"},
{text: "Spremeni geslo", url: "spremenigeslo.html"},
{text: "Prijava na servis", url: "prijavaservis.html"},
{text: "Pregled NePotrjenih servisov", url: "pregledservisinepotrjeni.html"},
{text: "Pregled Potrjenih servisov", url: "pregledservisipotrjeni.html"},
{text: "Pregled Opravljeni servisov", url: "pregledservisiopravljeni.html"},
{text: "Odjava", url: "odjava.html"}

];

const itemsZaposleni = [
{text: "Preglej Nepotrjene servise", url: "nepotrjeniservisipregled.html"},
{text: "Preglej Potrjene servise", url: "potrjeniservisipregled.html"},
{text: "Preglej opravljene servise", url: "opravljeniservisipregled.html"},
{text: "Preglej ocene servisov", url: "pregledocen.html"},
{text: "Odjava", url: "odjava.html"},
];

const itemsVodja = [
{text: "Dodaj novo poslovalnico", url: "dodajposlovalnico.html"},
{text: "Upravljaj poslovalnice", url: "upravljajposlovlanice.html"},
{text: "Dodaj novo ponudbo", url: "dodajponudbo.html"},
{text: "Upravljaj ponudbo", url: "upravljajponudbo.html"},
{text: "Dodaj novega zaposlenega", url: "dodajnovegazaposlenega.html"},
{text: "Odstrani zaposlenega", url: "odstranizaposlenega.html"},
{text: "Odjava", url: "odjava.html"},
];

const itemsNoRole = [
{text: "Prijava", url: "prijava.html"},
{text: "Registracija", url: "registracija.html"}
];

if(localStorage.getItem("vloga") !== null){
	const vloga = localStorage.getItem("vloga");
	if(vloga == 1){
		itemsAdmin.forEach(item => {
			const li = document.createElement("li");       // Create <li>
			const a = document.createElement("a");         // Create <a>
			const br = document.createElement("br");
			a.textContent = item.text;                     // Set link text
			a.href = item.url;                             // Set hyperlink
			li.appendChild(a);                             // Add <a> to <li>
			li.appendChild(br);
			ul.appendChild(li);                            // Add <li> to <ul>
		});
		div.appendChild(ul);
	} else if(vloga == 2){
		itemsZaposleni.forEach(item => {
			const li = document.createElement("li");       // Create <li>
			const a = document.createElement("a");         // Create <a>
			const br = document.createElement("br");
			a.textContent = item.text;                     // Set link text
			a.href = item.url;                             // Set hyperlink
			li.appendChild(a);                             // Add <a> to <li>
			li.appendChild(br);
			ul.appendChild(li);                            // Add <li> to <ul>
		});
		div.appendChild(ul);
	} else if(vloga == 3){
		itemsStranka.forEach(item => {
			const li = document.createElement("li");       // Create <li>
			const a = document.createElement("a");         // Create <a>
			const br = document.createElement("br");
			a.textContent = item.text;                     // Set link text
			a.href = item.url;                             // Set hyperlink
			li.appendChild(a);                             // Add <a> to <li>
			li.appendChild(br);
			ul.appendChild(li);                            // Add <li> to <ul>
		});		
		div.appendChild(ul);
	} else if(vloga == 4){
		itemsVodja.forEach(item => {
			const li = document.createElement("li");       // Create <li>
			const a = document.createElement("a");         // Create <a>
			const br = document.createElement("br");
			a.textContent = item.text;                     // Set link text
			a.href = item.url;                             // Set hyperlink
			li.appendChild(a);                             // Add <a> to <li>
			li.appendChild(br);
			ul.appendChild(li);                            // Add <li> to <ul>
		});	
		div.appendChild(ul);
	}
} else {
		itemsNoRole.forEach(item => {
			const li = document.createElement("li");       // Create <li>
			const a = document.createElement("a");         // Create <a>
			const br = document.createElement("br");
			a.textContent = item.text;                     // Set link text
			a.href = item.url;                             // Set hyperlink
			li.appendChild(a);                             // Add <a> to <li>
			li.appendChild(br);
			ul.appendChild(li);                            // Add <li> to <ul>
		});
		div.appendChild(ul);
}