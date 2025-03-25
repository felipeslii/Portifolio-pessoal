// ================= CONTROLE DO MENU MOBILE =================
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navList.classList.toggle('open');
  
  // Bloquear scroll quando menu aberto
  document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.navlist a').forEach(link => {
  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navList.classList.remove('open');
    document.body.style.overflow = 'auto';
  });
});

// Fechar menu ao rolar
window.addEventListener('scroll', () => {
  if (navList.classList.contains('open')) {
    menuIcon.classList.remove('bx-x');
    navList.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
});
// ======================== Navegação Ativa ========================
// Seleciona todos os links da navegação
const navLinks = document.querySelectorAll('.navlist a');

// Adiciona a classe 'active' ao link clicado (Função)
function activeLink() {
    navLinks.forEach(item => item.classList.remove('active')); // Remove a classe 'active' de todos os links
    this.classList.add('active'); // Adiciona a classe 'active' ao link clicado
}

// Adiciona um evento de clique a cada link da navegação
navLinks.forEach(item => item.addEventListener('click', activeLink));

// ======================== Alternar Light/Dark Mode ========================
// Função para alternar entre os temas
function toggleMode() {
    const html = document.documentElement;
    html.classList.toggle('light'); // Adiciona ou remove a classe 'light' do elemento html

    // Salva o tema atual no localStorage
    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

     // Atualiza a imagem de perfil com base no tema
     const profileImage = document.getElementById('profileImage'); // Seleciona a imagem de perfil
     if (mode === 'dark') {
         profileImage.src = './img/perfil 2.png'; // Caminho da imagem para o dark mode
     } else {
         profileImage.src = './img/perfil 1.png'; // Caminho da imagem para o light mode
     }

    // Atualiza a cor do texto do título
    updateTextColors();
}

// Carrega o tema salvo no localStorage ao carregar a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.classList.toggle('light', savedTheme === 'light');

    
    // Atualiza a imagem de perfil com base no tema salvo
    const profileImage = document.getElementById('profileImage'); // Seleciona a imagem de perfil
    if (savedTheme === 'dark') {
        profileImage.src = './img/perfil 2.png'; // Caminho da imagem para o dark mode
    } else {
        profileImage.src = './img/perfil 1.png'; // Caminho da imagem para o light mode
    }
}

// ======================== Animação Do Título ==========================
// Seleciona o elemento do Título e define variáveis para a animação
const titleElement = document.querySelector('#name');
const text = "FELIPE";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

// Função para animar o texto do título (efeito de digitação)
function animateText() {
  if (isTyping) {
    if (index < text.length) {
      titleElement.textContent = text.slice(0, index + 1); // Adiciona uma letra ao título
      index++;
    } else {
      isTyping = false; // Alterna para o modo de apagamento
    }
  } else {
    if (index > 1) {
      titleElement.textContent = text.slice(0, index - 1); // Remove uma letra do título
      index--;
    } else {
      isTyping = true; // Alterna para o modo de digitação
      // Alterna a cor do texto entre branco/preto e laranja
      currentColor = currentColor === (document.documentElement.classList.contains('light') ? 'black' : '#fff') ? '#00265A' : (document.documentElement.classList.contains('light') ? 'black' : '#fff');
      titleElement.style.color = currentColor;
    }
  }
  setTimeout(animateText, 300); // Define um intervalo para a próxima animação
}

// Função para atualizar a cor do texto do título com base no tema
function updateTextColor() {
  currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
  titleElement.style.color = currentColor;
}

// Inicia a animação do título ao carregar a página
document.addEventListener('DOMContentLoaded', animateText);
updateTextColor();

// ======================== Animação da Seção Home ========================
// Seleciona a seção Home e aplica uma animação fade-in
const homeSection = document.querySelector('#home');
homeSection.style.opacity = '0';
homeSection.style.transform = 'translateY(20px)';
homeSection.style.transition = 'opacity 1s ease, transform 1s ease';

setTimeout(() => {
  homeSection.style.opacity = '1';
  homeSection.style.transform = 'translateY(0)';
}, 100);

// ======================== Animação das Seções ========================
// Seleciona todas as seções e aplica animações de entrada
const sections = document.querySelectorAll('section');

sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s, transform 1s';

    // Aplica diferentes transformações com base no índice da seção
    if (index !== 0) {
        if (index === 1) section.style.transform = 'translateY(100px)';
        else if (index === 2) section.style.transform = 'scale(0.8)';
        else if (index === 3) section.style.transform = 'rotateY(90deg)';
    }
});

// Observar para animar as seções ao rolar a página 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
        }
    });
});

// Observa cada seção para aplicar a animação
sections.forEach((section) => observer.observe(section));

// ======================== Botão de Voltar ao Topo ========================
// Adiciona um evento de clique ao botão de voltar ao topo
document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave ao topo da página
});

// ======================== Carrossel de Projetos ========================
// Seleciona os elementos do carrossel
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let autoSlideInterval;

// Função para exibir o slide atual
function showSlide(slideIndex) {
  slides.forEach(slide => {
    slide.classList.remove('active');
    slide.style.display = 'none';
  });

  // Ajusta o índice do slide para garantir que ele esteja dentro dos limites
  if (slideIndex < 0) currentSlide = slides.length - 1;
  else if (slideIndex >= slides.length) currentSlide = 0;
  else currentSlide = slideIndex;

    // Exibe o slide atual
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'flex';
    updateSlidePosition();
}

// Função para atualizar a posição do carrossel
function updateSlidePosition() {
  const slideWidth = slides[0].offsetWidth;
  carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Função para avançar para o próximo slide
function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide(); // Reinicia o intervalo de rotação automática
}

// Função para voltar ao slide anterior
function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoSlide(); // Reinicia o intervalo de rotação automática
}

// Função para iniciar a rotação automática dos slides
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Alterna para o próximo slide a cada 5 segundos
}

// Função para reiniciar a rotação automática dos slides
function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Limpa o intervalo atual
    startAutoSlide(); // Inicia um novo intervalo
}

// Adiciona eventos de clique aos botões de navegação
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Inicia a rotação automática dos slides ao carregar a página
window.addEventListener('load', () => {
    showSlide(currentSlide);
    startAutoSlide();

    // Atualiza a posição do carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});

// Pausa a transição automática ao passar o mouse sobre o carrossel
carouselSlides.parentElement.addEventListener('mouseenter', () => {
  clearInterval(autoSlideInterval);
});

// Retoma a transição automática ao remover o mouse do carrossel
carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);

// ======================== Formulário de Contato ========================
// Seleciona o formulário de contato e a mensagem de agracedimento
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

// Adiciona um evento de envio ao formulário de contato
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    thankYouMessage.style.display = 'block'; // Exibe a mensagem de agradecimento

    // Envia os dados do formulário usando Fetch API
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            setTimeout(() => window.location.reload(), 2000); // Recarrega a página após 2 segundos
        } else {
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        }
    })
    .catch(() => alert('Erro na conexão com o servidor. Por favor, tente novamente.'));
});

// ======================== Animação da Seção "Sobre Mim" ========================
// Seleciona a seção "Sobre Mim"
const aboutSection = document.querySelector('.about');

// Função para verificar se a seção está vísivel na tela
function checkAboutVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    //  Verifica se a seção está visível na tela
    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        aboutSection.classList.add('visible'); // Adiciona a classe 'visible' 
        window.removeEventListener('scroll', checkAboutVisibility); // Remove o listener após a animação
    }
}

// Adiciona um lisener para o evento de scroll
window.addEventListener('scroll', checkAboutVisibility);

// Verifica a visibilidade da seção "Sobre Mim" ao carregar a página
checkAboutVisibility();


