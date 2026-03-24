function openModal() {
  document.getElementById("authModal").style.display = "block";
  showLogin();
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}