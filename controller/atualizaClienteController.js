import { clienteService } from "../services/cliente-service.js";

(async () => {
  const pegaUrl = new URL(window.location);
  const id = pegaUrl.searchParams.get("id");

  const inputNome = document.querySelector("[data-nome]");
  const inputEmail = document.querySelector("[data-email]");
  const formulario = document.querySelector("[data-form]");

  try {
    const dados = await clienteService.detalhaCliente(id);

    inputNome.value = dados.nome;
    inputEmail.value = dados.email;
  } catch (erro) {
    console.log(erro);
    window.location.href = "../telas/erro.html";
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
      await clienteService.atualizaCliente(
        id,
        inputNome.value,
        inputEmail.value
      );

      window.location.href = "../telas/edicao_concluida.html";
    } catch (erro) {
      console.log(erro);
      window.location.href = "../telas/erro.html";
    }
  });
})();
