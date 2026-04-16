function generateResume() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let skills = document.getElementById("skills").value;

  let preview = `
    <h3>${name}</h3>
    <p>${email}</p>
    <h4>Skills:</h4>
    <p>${skills}</p>
  `;

  document.getElementById("resumePreview").innerHTML = preview;
}

// 📄 PDF DOWNLOAD
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  doc.text(document.getElementById("resumePreview").innerText, 10, 10);
  doc.save("resume.pdf");
}
async function improveSkills() {
  let skills = document.getElementById("skills").value;

  const API_KEY = "YOUR_API_KEY";

  let response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: `Improve these resume skills professionally: ${skills}`
      }]
    })
  });

  let data = await response.json();
  document.getElementById("skills").value =
    data.choices[0].message.content;
}
async function generateResume() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let skills = document.getElementById("skills").value;

  let response = await fetch("http://127.0.0.1:5000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, skills })
  });

  let data = await response.json();
  document.getElementById("resumePreview").innerText = data.resume;
}
