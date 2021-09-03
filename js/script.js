// Registration form
let memberCount = 0;
const body = document.querySelector('body');
const registrationForm = document.querySelector('#registration');
const newMemberButton = document.querySelector('#addMember');
const totalCotisation = document.querySelector('#cotisation');

totalCotisation.value = '20€'; // Reset totalCotisation field

newMemberButton.addEventListener('click', addMember, false);
body.addEventListener('click', event => {
  if (event.target.classList.contains('removeMember')) {
    removeMember(event.target);
  }
});
registrationForm.addEventListener("submit", handleSubmit);

function newMemberTemplate() {
  return `
    <fieldset>
      <legend>Information de l'adhérent supplémentaire n°${memberCount}</legend>
      <button class="removeMember button-inline note">Supprimer</button>
      <div class="inline-fields">
        <div>
          <label for="firstname_${memberCount}">Prénom<span class="note"> * <span class="sr-only">requis</span></span></label>
          <input type="text" name="firstname_${memberCount}" id="firstname_${memberCount}" placeholder="Gary" required>
        </div>
        <div>
          <label for="lastname_${memberCount}">Nom<span class="note"> * <span class="sr-only">requis</span></span></label>
          <input type="text" name="lastname_${memberCount}" id="lastname_${memberCount}" placeholder="Gygax" required>
        </div>
      </div>
      <div>
        <label for="email-address_${memberCount}">Email Address<span class="note"> * <span class="sr-only">requis</span></span></label>
        <input type="email" name="email-address_${memberCount}" id="email-address_${memberCount}" placeholder="gary@gygax.com" required>
      </div>
      <div>
        <label for="discord-username_${memberCount}">Pseudo Discord</label>
        <input type="text" name="discord-username_${memberCount}" id="discord-username_${memberCount}" placeholder="Gargyx">
      </div>
    </fieldset>
  `;
}

function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

function updateTotalCotisation() {
  const total = memberCount * 10 + 20 + '€';
  totalCotisation.value = total;
}

function addMember() {
  memberCount++
  const newMemberDOM = htmlToElement(newMemberTemplate());
  registration.insertBefore(newMemberDOM, newMemberButton);
  updateTotalCotisation();
}

function removeMember(target) {
  memberCount--
  target.parentNode.remove();
  updateTotalCotisation();
}

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.querySelector(".status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: registrationForm.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    status.innerHTML = "Merci pour votre demande d'adhésion ! Vous serez notifiés par mail de son avancée.<br> Les cotisations seront à ramener directement au club.";
    registrationForm.remove();
  }).catch(error => {
    status.innerHTML = "Oups! Il y a eu un problème pendant l'envoi de votre demande d'adhésion. Merci de réessayer plus tard."
    registrationForm.remove();
  });
}

