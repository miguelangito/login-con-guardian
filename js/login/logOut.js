//Selectores
const btnLogOut = document.querySelector("#btnLogOut");

btnLogOut.addEventListener("click", () => {
  sessionStorage.removeItem("isAuthenticated");
  window.location.href = "index.html";
});
