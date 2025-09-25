const API_URL = "http://localhost:3000";

function openTab(nome) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
  document.querySelector(`.tab-btn[onclick="openTab('${nome}')"]`).classList.add("active");
  document.getElementById(nome).classList.add("active");

  clearMessages();
}

function setMessage(componentId, message) {
    const component = document.querySelector(`#${componentId}`);
    component.innerHTML = message;
}

function clearMessages() {
    setMessage('createMessageHandler', '');
    setMessage('updateMessageHandler', '');
    setMessage('searchMessageHandler', '');
}

function getSingleFoundationTable(foundation) {
    return `<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Instituição de Apoio</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${foundation.id}</td>
                <td>${foundation.name}</td>
                <td>${foundation.cnpj}</td>
                <td>${foundation.phone}</td>
                <td>${foundation.email}</td>
                <td>${foundation.supported_institution}</td>
                <td><button class="btn" onclick="deleteFoundationById(${foundation.id})">Excluir</button></td>
            </tr>
        </tbody>
    </table>`; //TODO: MASK FOR PHONE AND CNPJ
}

function fillTable(foundations) {
  const tableBody = document.querySelector("#entityTable tbody");
  tableBody.innerHTML = "";

  foundations.forEach(foundation => {
    const tr = document.createElement("tr"); //TODO: MASK FOR PHONE AND CNPJ
    tr.innerHTML = `
      <td>${foundation.id}</td>
      <td>${foundation.name}</td>
      <td>${foundation.cnpj}</td>
      <td>${foundation.phone}</td> 
      <td>${foundation.email}</td>
      <td>${foundation.supported_institution}</td>
      <td><button class="btn" onclick="deleteFoundationById(${foundation.id})">Excluir</button></td>
    `;
    tableBody.appendChild(tr);
  });
}

function updateCnpjDropdown(foundations) {
    const select = document.getElementById("cnpjSelect");
    select.innerHTML = '<option value="">Selecione um CNPJ</option>';

    foundations.forEach(foundation => {
        const option = document.createElement("option");
        option.value = `${foundation.cnpj} - ${foundation.id}`;
        option.textContent = `${foundation.cnpj} - ${foundation.name}`;

        select.appendChild(option);
    });
}


document.getElementById("createForm").addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);

    const response = await fetch(`${API_URL}/foundations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    e.target.reset();
    fetchFoundations();

    if (!response.ok) {
        setMessage('createMessageHandler', 'Não foi possível criar a fundação.');
    } else {
        const foundation = await response.json();
        setMessage('createMessageHandler', `Fundação ${foundation.name} criada com sucesso!`);
    }
});

document.getElementById("updateForm").addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);

    body.id = body.cnpj.split(' - ')[1]
    body.cnpj = body.cnpj.split(' - ')[0]

    console.log(body)

    const response = await fetch(`${API_URL}/foundations`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    e.target.reset();
    fetchFoundations();

    if (!response.ok) {
        setMessage('updateMessageHandler', "Não foi possível atualizar a fundação.");
    } else {
        const foundation = await response.json();
        setMessage('updateMessageHandler', `Fundação ${foundation.name} atualizada com sucesso!`);
    }
});


async function fetchByCnpj() {
    const searchValue = document.getElementById("searchInput").value;
    const response = await fetch(`${API_URL}/foundations?cnpj=${encodeURIComponent(searchValue)}`);
    const foundation = await response.json();

    if (!response.ok || !foundation || foundation.length === 0) {
        setMessage('searchMessageHandler', "Não foi encontrada fundação para o CNPJ.");
    } else {
        setMessage('searchMessageHandler', getSingleFoundationTable(foundation[0]));
    }
}

async function fetchFoundations() {
  const response = await fetch(`${API_URL}/foundations`);
  const foundations = await response.json();
  fillTable(foundations);
  updateCnpjDropdown(foundations)
}

async function deleteFoundationById(id) {
  await fetch(`${API_URL}/foundations?id=${id}`, { method: "DELETE" });
  fetchFoundations();
}


// Initialize table
fetchFoundations();