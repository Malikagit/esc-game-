function clearPlayers() {
    const formPlayers = document.getElementById("formPlayers");
    formPlayers.innerHTML = '';

    return formPlayers;
}

//function get informations for the logged user
function checkedUserLogged() {
    var checkbox = document.getElementById('userAsplayer');
    if (checkbox.checked != true) {
        //  
        alert("hello")
    }
    else {
        var userloggedlastname = document.getElementById('lastNameuser');
        userloggedlastname.value = userloggedlastname.dataset.lastname;
        var userloggedfirstname = document.getElementById('firstNameuser');
        userloggedfirstname.value = userloggedfirstname.dataset.firstname;
    }
}
function createNthPlayer(n) {
    let htmlPlayer = `
        <h5 class="mt-5">Participant ${n + 1}</h5>
        <div class="form-row mb-5"> 
            <div class="col-md-4">
                <label>Prénom</label>
                <input name="[players][${n}][firstName]" type="text"  class="form-control">
            </div>
            <div class="col-md-4">
                <label>Nom</label>
                <input name="[players][${n}][lastName]"  type="text" class="form-control">
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
// Data Picker Initialization
$('.datepicker').datepicker({
    inline: true
});