let menu = document.querySelector("#menu-icon");
let navbar= document.querySelector(".navbar");
menu.addEventListener("click", function () {
    navbar.classList.toggle("active");
});
window.onscroll = () => {
    navbar.classList.remove("active") 
}

const menuContainer = document.querySelector(".menu-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

const scrollStep = 3 * (menuContainer.clientWidth / 3);

// Verifica os limites da rolagem e desativa botões se necessário
function checkButtons() {
    prevBtn.disabled = menuContainer.scrollLeft === 0;
    nextBtn.disabled = menuContainer.scrollLeft + menuContainer.clientWidth >= menuContainer.scrollWidth;
}


// Avançar carrossel
nextBtn.addEventListener("click", () => {
    menuContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
    setTimeout(checkButtons, 500);
});

// Voltar carrossel
prevBtn.addEventListener("click", () => {
    menuContainer.scrollBy({ left: -scrollStep, behavior: "smooth" });
    setTimeout(checkButtons, 500);
});

// Movimento automático do carrossel
function autoSlide() {
    if (menuContainer.scrollLeft + menuContainer.clientWidth >= menuContainer.scrollWidth) {
        menuContainer.scrollTo({ left: 0, behavior: "smooth" });
    } else {
        menuContainer.scrollBy({ left: scrollStep, behavior: "smooth" });
    }
    checkButtons();
}

// Configura o carrossel para deslizar automaticamente a cada 4 segundos
let slideInterval = setInterval(autoSlide, 4000);

// Pausa o carrossel ao passar o mouse
menuContainer.addEventListener("mouseenter", () => clearInterval(slideInterval));
menuContainer.addEventListener("mouseleave", () => slideInterval = setInterval(autoSlide, 4000));

// Verifica os botões ao carregar a página
checkButtons();

// Função para controlar os modais
function setupModal(modalId, openBtnId, closeBtnClass) {
    const modal = document.getElementById(modalId);
    const openModalBtn = document.getElementById(openBtnId);
    const closeModalBtn = modal.querySelector(closeBtnClass);

    // Garantir que o modal começa oculto
    modal.style.display = "none";

    if (modal && openModalBtn && closeModalBtn) {
        // Abre o modal ao clicar no botão
        openModalBtn.addEventListener("click", function(event) {
            event.preventDefault(); // Evita comportamento padrão do link
            modal.style.display = "flex"; // Exibe o modal
        });

        // Fecha o modal ao clicar no botão "X"
        closeModalBtn.addEventListener("click", function() {
            modal.style.display = "none"; // Oculta o modal
        });

        // Fecha o modal ao clicar fora dele
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none"; // Oculta o modal
            }
        });
    }
}

// Inicializando modais
document.addEventListener("DOMContentLoaded", function() {
    setupModal("contactModal", "openModal", ".close");
    setupModal("historyModal", "openHistoryModal", ".close-history");
    checkButtons(); // Verifica botões ao carregar a página
});


