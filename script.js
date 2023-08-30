function Resume() {
    let name = document.getElementById("form-name").value;
    let contact = document.getElementById("form-contact").value;
    let email = document.getElementById("form-email").value;
    let skill = document.getElementById("skill").value;
    let acad = document.getElementById("acad").value;

    document.getElementById('name-r').innerHTML = name;
    document.getElementById('contact-r').innerHTML = contact;
    document.getElementById('email-r').innerHTML = email;
    document.getElementById('skill-r').innerHTML = skill;
    document.getElementById('acad-r').innerHTML = acad;

    let file = document.getElementById('form-pfp').files[0];
    let reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    }

    reader.onloadend = function () {
        document.getElementById('profile-img').src = reader.result;
    }

    document.getElementById('resume').style.display = 'none';
    document.getElementById('resume-template').style.display = 'block';

}

function printResume() {
    window.print();
}
