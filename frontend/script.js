const API_URL = "http://localhost:3000";

function openTab(nome) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelector(`.tab-btn[onclick="openTab('${nome}')"]`).classList.add("active");
  document.getElementById(nome).classList.add("active");
}

function fillTable(foundations) {
  const tableBody = document.querySelector("#entityTable tbody");
  tableBody.innerHTML = "";
  foundations.forEach(foundation => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${foundation.id}</td>
      <td>${foundation.nome}</td>
      <td>${foundation.cnpj}</td>
      <td>${foundation.telefone}</td>
      <td>${foundation.email}</td>
      <td>${foundation.instituicao}</td>
      <td><button class="btn" onclick="deleteFoundationById(${foundation.id})">Excluir</button></td>
    `;
    tableBody.appendChild(tr);
  });
}

document.getElementById("createForm").addEventListener("submit", async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData);
  await fetch(`${API_URL}/foundations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  e.target.reset();
  fetchFoundations();
//   openTab("table"); //TODO: MAKE IT FILL SPACE BELOW
});

document.getElementById("updateForm").addEventListener("submit", async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const body = Object.fromEntries(formData);
  const id = body.id;
  delete body.id;
  await fetch(`${API_URL}/foundations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  e.target.reset();
  fetchFoundations();
//   openTab("table"); //TODO: MAKE IT FILL SPACE BELOW
});


async function fetchByCnpj() {
  const valor = document.getElementById("searchInput").value;
  const res = await fetch(`${API_URL}/foundations?cnpj=${encodeURIComponent(valor)}`);
  const data = await res.json();
//   fillTable(data); //TODO: MAKE IT FILL SPACE BELOW
}

async function fetchFoundations() {
  const res = await fetch(`${API_URL}/foundations`);
  const data = await res.json();
  fillTable(data);
}

async function deleteFoundationById(id) {
  await fetch(`${API_URL}/foundations/${id}`, { method: "DELETE" });
  fetchFoundations();
}


// Initialize table
fetchFoundations();