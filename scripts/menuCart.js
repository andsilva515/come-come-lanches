document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");

            // Esconder todo o conteúdo das abas
            tabContents.forEach(content => content.classList.add("hidden"));

            // Mostrar o conteúdo da aba selecionada
            document.getElementById(targetTab).classList.remove("hidden");

            // Alterar a borda ativa do botão
            tabButtons.forEach(btn => btn.classList.remove("border-black"));
            button.classList.add("border-black");
        });
    });

    // Abrir o modal
    document.getElementById("cart-modal").classList.remove("hidden");

    // Fechar o modal
    document.getElementById("close-modal-btn").addEventListener("click", () => {
        document.getElementById("cart-modal").classList.add("hidden");
    });
});