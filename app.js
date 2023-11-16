const apiUrl = 'https://jsonserver-formulario-1.geoprtu.repl.co/adotantes';
const tabelaUsuarios = document.getElementById('tabelaUsuarios');
const inputBusca = document.getElementById('inputBusca');

let usuarios = [];

function exibirUsuarios(usuarios) {
  tabelaUsuarios.innerHTML = '';

  usuarios.forEach((usuario) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.nome}</td>
      <td>${usuario.idade}</td>
      <td>${usuario.telefone}</td>
      <td>${usuario.animal}</td>
      <td>${usuario.tempo}</td>
      <td>${usuario.experiencia}</td>
      <td>${usuario.moradia}</td>
      <td>${usuario.custos}</td>
      <td>${usuario.mudanca}</td>
    `;

    tabelaUsuarios.appendChild(row);
  });
}

function displayMessage(message) {
  const messageRow = document.createElement('tr');
  messageRow.innerHTML = `<td colspan="10">${message}</td>`;
  tabelaUsuarios.innerHTML = '';
  tabelaUsuarios.appendChild(messageRow);
}

function filtrar() {
  const filtro = inputBusca.value.trim().toLowerCase();

  if (!filtro) {
    exibirUsuarios(usuarios);
    return;
  }

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const idUsuario = usuario.id.toString().toLowerCase();

    const filtroNumero = !isNaN(filtro) ? parseInt(filtro) : filtro;
    const idUsuarioNumero = !isNaN(idUsuario) ? parseInt(idUsuario) : idUsuario;

    return idUsuarioNumero === filtroNumero;
  });

  exibirUsuarios(usuariosFiltrados);
}

function readUsuarios(processaDados) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      processaDados(data);
    })
    .catch(error => {
      console.error('Erro ao ler usuários via API JSON:', error);
      displayMessage("Erro ao ler usuários");
    });
}

window.onload = () => {
  readUsuarios(data => {
    usuarios = data;
    exibirUsuarios(data);
  });
};
