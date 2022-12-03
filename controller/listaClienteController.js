import { clienteService } from "../services/cliente-service.js";
const tabela = document.querySelector("[data-tabela]");

const montaTr = (nome, email) => {
  const novoCliente = document.createElement("tr");

  const conteudo = `
    <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td>`;

    novoCliente.innerHTML = conteudo;
    return novoCliente;
};

clienteService.listaClientes().then(resposta => {
    resposta.forEach((elemento) => {
      tabela.appendChild(montaTr(elemento.nome, elemento.email));
    });
  });