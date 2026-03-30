const form = document.getElementById("form-contato");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.nome.value;
  const email = form.email.value;
  const mensagem = form.mensagem.value;

  try {
    const resposta = await fetch("/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, mensagem }),
    });

    const dados = await resposta.json();

    alert(dados.mensagem);
    form.reset();

  } catch (erro) {
    alert("Erro ao enviar mensagem");
  }
});
