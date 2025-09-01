const form = document.getElementById("btnSend");

form.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    return;
  }

  await fetch("http://localhost:3000/Login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      if (data.valid == true) {
        const valid = document.getElementById("succes");

        valid.style.transition = "all 2s ease";
        valid.style.top = "50px";

        setTimeout(() => {
          valid.style.top = "-40px";
        }, 3000);

        document.cookie =
          "token=" + data.valid + "; path=/; Secure; SameSite=Strict";

        window.location.href = "http://localhost:3000/documentation";
      } else {
        const invalid = document.getElementById("invalid");

        invalid.style.transition = "all 2s ease";
        invalid.style.top = "50px";

        setTimeout(() => {
          invalid.style.top = "-40px";
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
