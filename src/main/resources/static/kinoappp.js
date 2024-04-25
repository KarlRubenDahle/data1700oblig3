//jQuery(document).ready(function($) {
//	alert("js is working")};
//alert("JS test :p");

console.log("test i konsollen :)");

//create billett-array
let billetter= [];


//input-validation --------------------

function checkAntall() { //Tall-validation
	let tallcheck = document.getElementById("antall").value;
	let tall = Number(tallcheck);
	if (isNaN(tall)) {
		document.getElementById("antallMessage").innerHTML = "Må være et tall høyere enn null";
	} else {
		let antall1 = document.getElementById("antall").value;
		console.log("Valgt antall billetter er: "+antall1);
		document.getElementById("antallMessage").innerHTML = "";
	}
}

function getFilm(){ //getFilm writes chosen film to console
	let film1 = document.getElementById("film").value;
	console.log("Filmen oppgitt er: "+film1);
}

function checkFornavn() { //checkFornavn writes fornavn to console
	let fornavn1 = document.getElementById("fornavn").value;
	console.log("Fornavn oppgitt er : " + fornavn1);
}

function checkEtternavn() { //checkEtternavn writes etternavn to console
	let etterNavn1 = document.getElementById("etternavn").value;
	console.log("Etternavn oppgitt er : " + etterNavn1);
}

function checkTelefonnr() { //checkTelefonnr writes telefonnr to console
	let telefonnr1 = document.getElementById("telefonnr").value;
	let tall = Number(telefonnr1);
	if (isNaN(tall)) {
		document.getElementById("telefonnrMessage").innerHTML = "Må være et telefonnr";
	} else {
		console.log("Telefonnr oppgitt er : " + telefonnr1);
	}
}

function checkEpost() { //checkEpost writes Epost to console
	let epost1 = document.getElementById("epost").value;
	console.log("Epost oppgitt er : " + epost1);
}

// validation end --------------------


function kjopBillett() { //kjopBillett checks if form is filled out, inputvalidates,
	// and registers billet as a new object before adding it to billetter[].
	// It then runs sendBillett, and resets input fields

	// checks for empty fields and adds 1 to checkCounter
	let film1 = document.getElementById("film").value;
	let checkCount = 0;
	if (film1 === "Film") {
		document.getElementById("filmMessage").innerHTML = "Velg en Film";
	} else {
		document.getElementById("filmMessage").innerHTML = "";
		checkCount++;
	}
	let antall1 = document.getElementById("antall").value;
	if (antall1 <= 0) {
		document.getElementById("antallMessage").innerHTML = "Må skrive noe inn i anntall";
	} else{
		document.getElementById("antallMessage").innerHTML = "";
		checkCount++;
	}
	let fornavn1 = document.getElementById("fornavn").value;
	if (fornavn1 === "") {
		document.getElementById("fornavnMessage").innerHTML = "Må skrive noe inn i Fornavn";
	} else{
		document.getElementById("fornavnMessage").innerHTML = "";
		checkCount++;
	}
	let etterNavn1 = document.getElementById("etternavn").value;
	if (etterNavn1 === "") {
		document.getElementById("etternavnMessage").innerHTML = "Må skrive noe inn i Etternavn";
	} else {
		document.getElementById("etternavnMessage").innerHTML = "";
		checkCount++;
	}

	let telefonnr1 = document.getElementById("telefonnr").value;
	if (telefonnr1.length !== 8) {
		document.getElementById("telefonnrMessage").innerHTML = "Må skrive noe inn i Telefonnr";
	} else {
		document.getElementById("telefonnrMessage").innerHTML = "";
		checkCount++;
	}
	let epost1 = document.getElementById("epost").value;
	if (epost1.length < 3) {
		document.getElementById("epostMessage").innerHTML = "Må skrive noe inn i Epost";
	} else {
		document.getElementById("epostMessage").innerHTML = "";
		checkCount++;
	}

	//creates an object with the inputs, adds it to an array, sends to DB, and resets input fields
	let billett;

	if (checkCount != 6) {
	// 	give user info here?
	} else {
		billett = {
			film: film1,
			antall: antall1,
			fornavn: fornavn1,
			etternavn: etterNavn1,
			telefonnr: telefonnr1,
			epost: epost1

		};
		// checkCount = 0;

		billetter.push(billett);

		if (billetter.length > 0){
			console.log("billett registered in billetter");
			sendBillettToDB();
		}

		visBilletterFromDB()

		// Resets input fields
		document.getElementById("film").value = "Film";
		document.getElementById("antall").value = "";
		document.getElementById("fornavn").value = "";
		document.getElementById("etternavn").value = "";
		document.getElementById("telefonnr").value = "";
		document.getElementById("epost").value = "";
	}

}



function visBilletter() { //displays registered billetter from js billetter
	let billettlisteContent = "";
	for(let i in billetter) {
		billettlisteContent += billetter[i].film+", "+billetter[i].antall+", "+
			billetter[i].fornavn+", "+billetter[i].etternavn+", "+billetter[i].telefonnr
			+", "+billetter[i].epost+"<br>";
	}
	document.getElementById("billettliste").innerHTML = billettlisteContent;
}


function slettBilletter(){ //function to delete values of billetter[]
	billetter = [];
	// let billettlisteContent="";
	document.getElementById("billettliste").innerHTML = "";
	console.log("Billetter slettet");
}


function visBilletterFromDB(){ //recieves list of billett from DB and displays them as a <li>
	$.get("/getBilletterFromDB", function(data) { //recieves list of billett from DB
		console.log(data);
		let dynamicHtml= "<ul>";
		data.forEach(function(bill){
			// dynamically creates html arround the list of objects
			dynamicHtml += "<li>" +bill.film + ", " +bill.antall + ", " + bill.etternavn + ", " + bill.fornavn +
				", " + bill.telefonnr + ", " + bill.epost + " " +
				"<button onclick='deleteBillett(" + bill.id + ")'>Delete</button>" + " " + "</li>";
		})
		dynamicHtml+="</ul>"
		document.getElementById("billetterList").innerHTML = dynamicHtml;

	})

}


function sendBillettToDB() { //registers input as object billett, and sends to DB
	let billett = {
		"film": document.getElementById("film").value,
		"antall": document.getElementById("antall").value,
		"fornavn": document.getElementById("fornavn").value,
		"etternavn": document.getElementById("etternavn").value,
		"telefonnr": document.getElementById("telefonnr").value,
		"epost": document.getElementById("epost").value
	}
	console.log(billett);
	$.post("/insertBillettInDB", billett, function (data){})
}

function deleteBillett(id){ //Deletes billett from database and updates list on frontend.
	$.ajax({
		url: '/deleteBillett?id='+id,
		type: 'DELETE',
		success: function(result) {
			visBilletterFromDB()
		}
	});

}