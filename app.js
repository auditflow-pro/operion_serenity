document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("demo-form");
  const responseBox = document.getElementById("demo-response");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("demo-submit");
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const data = {
      name: document.getElementById("demo-name").value,
      email: document.getElementById("demo-email").value,
      phone: document.getElementById("demo-phone").value,
      company: document.getElementById("demo-company").value,
      business_type: document.getElementById("demo-type").value,
      employees: document.getElementById("demo-employees").value,
      message: document.getElementById("demo-message").value
    };

    try {
      const res = await fetch("https://ohperion.app.n8n.cloud/webhook/operion/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      responseBox.innerHTML = `
        <div style="padding:1rem;border:1px solid #00e5ff;border-radius:8px;">
          ${result.reply || "Request sent successfully"}
        </div>
      `;

      form.reset();

    } catch (err) {
      responseBox.innerHTML = `
        <div style="padding:1rem;border:1px solid red;border-radius:8px;">
          Something went wrong. Please try again.
        </div>
      `;
    }

    submitBtn.disabled = false;
    submitBtn.innerText = "Request My Demo →";
  });
});
