const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  
  fetch("/login", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (response.ok) {
      // Login successful, redirect to the website
      window.location.href = "/";
    } else {
      // Login failed, display error message
      return response.text();
    }
  })
  .then(errorMessage => {
    alert(errorMessage); // Display error message in an alert dialog
  })
  .catch(error => {
    console.error("Error:", error);
  });
});