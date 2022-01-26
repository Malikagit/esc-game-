function clearPlayers() {
    const formPlayers = document.getElementById("formPlayers");
    formPlayers.innerHTML = '';

    return formPlayers;
}
//Annuler reservation

async function deleteReservation() {
    // var destroyreserv = document.getElementById('annulerReservation');
    fetch('/bookings/:id', {
        method: "DELETE"
    })
        .then(response => response.json());
}

//mettre le botton annuler enable

//function get informations for the logged user
function checkedUserLogged() {
    var checkbox = document.getElementById('userAsplayer');
    if (checkbox.checked != true) {
        //  
        alert("hello")
    }
    else {
        var loggedInUserfirstname = document.getElementById('lastname1');
        loggedInUserfirstname.value = loggedInUserfirstname.dataset.lastname;
        var loggedInUserlastname = document.getElementById('firstname1');
        loggedInUserlastname.value = loggedInUserlastname.dataset.firstname;
    }

    function createNthPlayer(n) {
        let htmlPlayer = `
        <h5 class="mt-5">Participant ${n + 1}</h5>
        <div class="form-row mb-5"> 
            <div class="col-md-4">
                <label>Prénom</label>
                <input name="[players][${n}][firstName]" id="firstname[${n}]" type="text" class="form-control"  data-firstname={{userLoggedAsPlayer.lastName}}>
            </div>
            <div class="col-md-4">
                <label>Nom</label>
                <input name="[players][${n}][lastName]" id="lastname[${n}]" type="text" class="form-control"  data-lastname={{userLoggedAsPlayer.lastName}}>
            </div>
            <div class="offset-1 col-md-3">
                <label>Date de naissance</label>
                <input name="[players][${n}][dob]" type="date" class="form-control">
            </div>
        </div>
    `;

        return htmlPlayer;
    }

    document.addEventListener("DOMContentLoaded", function (event) {

        //add input text as room capacity
        const selectPlayers = document.getElementById("nbPlayers");

        selectPlayers.addEventListener("change", (e) => {
            const formPlayers = clearPlayers();
            for (let i = 0; i < e.target.value; i += 1) {
                formPlayers.insertAdjacentHTML('beforeend', createNthPlayer(i));
            }
        })

    });