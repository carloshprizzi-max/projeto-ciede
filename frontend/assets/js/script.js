// ==========================================
// 1. LÓGICA DO MENU HAMBÚRGUER
// ==========================================
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.menu ul');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// ==========================================
// 2. LÓGICA DO FORMULÁRIO DE CONTATO
// ==========================================
const form = document.getElementById("form-contato");

if (form) { 
  
  // URL base movida para dentro (só carrega se precisar)
  const urlBase = "https://projeto-ciede.onrender.com";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = form.nome.value;
    const email = form.email.value;
    const mensagem = form.mensagem.value;

    try {
      // Apontando o fetch para o servidor na nuvem
      const resposta = await fetch(`${urlBase}/contato`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      const dados = await resposta.json();

      // Mostra a mensagem de sucesso que vem do backend
      alert(dados.mensagem);
      form.reset();

    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
  });

}
