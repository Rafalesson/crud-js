import { clienteService } from "../services/cliente-service.js";

const tabela = document.querySelector("[data-tabela]");

tabela.addEventListener("click", async (evento) => {
  let ehBotaoExcluir =
    evento.target.className === "botao-simples botao-simples--excluir";

  if (ehBotaoExcluir) {
    
    try {
      const linhaCliente = evento.target.closest("[data-id]");
      const id = linhaCliente.dataset.id;

      await clienteService.removeCliente(id);
      linhaCliente.remove();
    } catch (erro) {
      console.log(erro);
      window.location.href = "../telas/erro.html";
    }
  }
});

const montaTr = (nome, email, id) => {
  const novoCliente = document.createElement("tr");

  const conteudo = `
    <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td>`;

  novoCliente.innerHTML = conteudo;
  novoCliente.dataset.id = id;

  return novoCliente;
};

const render = async () => {

  try {
    const listaClientes = await clienteService.listaClientes();

    listaClientes.forEach((elemento) => {
      tabela.appendChild(montaTr(elemento.nome, elemento.email, elemento.id));
    });
  } catch (erro) {

    console.log(erro);
    window.location.href = "../telas/erro.html";
  }
};

render();
