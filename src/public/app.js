const form = document.querySelector("#exercice-form");

form.addEventListener('submit',(ev)=>{
  const userID = ev.target.firstElementChild.value;

  ev.target.action = `/api/users/${userID}/exercises`;

  ev.submit()
})