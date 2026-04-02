/* =========================================
   SCRIPT.JS - Funções Globais do Site Público
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LÓGICA DO MENU HAMBÚRGUER (ATUALIZADA)
    // ==========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ==========================================
    // 2. LÓGICA DO FORMULÁRIO DE CONTATO (MANTIDA E MELHORADA)
    // ==========================================
    const form = document.getElementById("form-contato");

    if (form) { 
        const urlBase = "https://projeto-ciede.onrender.com";

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Pega o botão para dar o efeito de "Enviando..."
            const btnEnviar = form.querySelector('button[type="submit"]');
            const textoOriginal = btnEnviar ? btnEnviar.innerText : 'Enviar';
            
            if(btnEnviar) {
                btnEnviar.innerText = 'Enviando...';
                btnEnviar.disabled = true;
            }

            const nome = form.nome.value;
            const email = form.email.value;
            const mensagem = form.mensagem.value;

            try {
                // ATENÇÃO: Ajustei a rota para '/mensagens' que é a que criamos no seu backend
                const resposta = await fetch(`${urlBase}/mensagens`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nome, email, mensagem }),
                });

                if (resposta.ok) {
                    alert("Sua mensagem foi enviada com sucesso! Retornaremos em breve.");
                    form.reset();
                } else {
                    alert("Ocorreu um erro ao processar. Tente novamente.");
                }

            } catch (erro) {
                console.error("Erro na requisição:", erro);
                alert("Erro ao enviar mensagem. Verifique sua conexão e tente novamente.");
            } finally {
                // Volta o botão ao normal
                if(btnEnviar) {
                    btnEnviar.innerText = textoOriginal;
                    btnEnviar.disabled = false;
                }
            }
        });
    }
});