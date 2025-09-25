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
                <td>${foundation.nome}</td>
                <td>${foundation.cnpj}</td>
                <td>${foundation.telefone}</td>
                <td>${foundation.email}</td>
                <td>${foundation.instituicao}</td>
                <td><button class="btn" onclick="deleteFoundationById(${foundation.id})">Excluir</button></td>
            </tr>
        </tbody>
    </table>`;
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

function updateCnpjDropdown(foundations) {
    const select = document.getElementById("cnpjSelect");
    select.innerHTML = '<option value="">Selecione um CNPJ</option>';
    foundations.forEach(foundation => {
        const option = document.createElement("option");
        option.value = foundation.cnpj;
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
    fetchFoundations(); //TODO: CHECK IF AWAIT IS NEEDED

    if (!response) {
        setMessage('createMessageHandler', 'Não foi possível criar a fundação.');
    } else {
        setMessage('createMessageHandler', `Fundação ${response.name} criada com sucesso!`);
    }
});

document.getElementById("updateForm").addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    const id = body.id;
    delete body.id;

    const response = await fetch(`${API_URL}/foundations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    e.target.reset();
    fetchFoundations(); //TODO: CHECK IF AWAIT IS NEEDED

    if (!response) {
        setMessage('updateMessageHandler', "Não foi possível atualizar a fundação.");
    } else {
        setMessage('updateMessageHandler', `Fundação ${response.name} atualizada com sucesso!`);
    }
});


async function fetchByCnpj() {
    const searchValue = document.getElementById("searchInput").value;
    const response = await fetch(`${API_URL}/foundations?cnpj=${encodeURIComponent(searchValue)}`);
    const foundation = await response.json(); //TODO: CHECK IF THIS IS NEEDED

    if (!foundation) {
        setMessage('searchMessageHandler', "Não foi encontrada fundação para o CNPJ.");
    } else {
        setMessage('searchMessageHandler', getSingleFoundationTable(foundation));
    }
}

async function fetchFoundations() {
  const response = await fetch(`${API_URL}/foundations`);
  const foundations = await response.json();
  fillTable(foundations);
  updateCnpjDropdown(foundations)
}

async function deleteFoundationById(id) {
  await fetch(`${API_URL}/foundations/${id}`, { method: "DELETE" });
  fetchFoundations();
}


// Initialize table
fetchFoundations();