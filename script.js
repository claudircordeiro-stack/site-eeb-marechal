// Controle do Menu Hambúrguer (Mobile)
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Troca o ícone de abrir/fechar menu
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

// Fechar o menu ao clicar em algum link (útil para navegação de página única)
const navLinks = document.querySelectorAll('#nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.replace('fa-xmark', 'fa-bars');
    });
});

// Manipulador do formulário de contato (Simulação)
const contactForm = document.getElementById('school-contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Exibe um feedback amigável de sucesso
    alert(`Obrigado pelo contato, ${name}! Nós retornaremos para o e-mail: ${email} em breve.`);
    
    // Limpa o formulário
    contactForm.reset();
});