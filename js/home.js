document.addEventListener('DOMContentLoaded', () => {
  // --- Footer Year ---
  document.getElementById('year').textContent = new Date().getFullYear();

  // --- Project Data ---
  const projects = [
    {
      title: "zDuels",
      desc: "The core plugin of Duel Network, managing a large-scale Minecraft minigame network.",
      details: "<b>Tech:</b> Java, Protobuf, Redis, MongoDB<br><b>Features:</b> High-performance, scalable, networked minigames, extensive codebase (~20,000+ lines).",
      image: "images/zduels.png"
    },
    {
      title: "Crystal",
      desc: "A lightweight chat games plugin designed for smooth performance and minimal resource usage.",
      details: "<b>Tech:</b> Java, MongoDB<br><b>Features:</b> Asynchronous chat games, leaderboard tracking, efficient resource management.",
      image: "images/crystal.png"
    },
    {
      title: "Astral",
      desc: "A staff core plugin with essential moderation tools and unique features.",
      details: "<b>Tech:</b> Java<br><b>Features:</b> Staff mode, staff chat, punishments, custom moderation tools.",
      image: "images/astral.png"
    },
    {
      title: "Alethia",
      desc: "A security-focused plugin that adds in-game two-factor authentication using Google Authenticator.",
      details: "<b>Tech:</b> Java<br><b>Features:</b> Two-factor authentication, QR code setup on map, enhanced account security.",
      image: "images/alethia.png"
    }
  ];

  // --- DOM Elements ---
  const sliderTrack = document.querySelector('.slider-track');
  const modal = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-image');
  const modalDetails = document.getElementById('modal-details');
  let currentIndex = 0;

  // --- Helpers ---
  function createSlide(project, i) {
    const slide = document.createElement('div');
    slide.className = 'portfolio-card';
    slide.style.minWidth = '320px';
    slide.innerHTML = `
      <div class="portfolio-card-title">${project.title}</div>
      <div class="portfolio-card-desc">${project.desc}</div>
      <a class="portfolio-card-link" href="#" data-index="${i}">View Project</a>
    `;
    return slide;
  }

  // --- Render Slides ---
  function renderSlides() {
    sliderTrack.innerHTML = '';
    const total = projects.length;
    const visible = 2; // number of clones before

    // Add clones before currentIndex
    for (let i = currentIndex - visible; i < currentIndex; i++) {
      const idx = (i + total) % total;
      const clone = createSlide(projects[idx], idx);
      clone.style.marginRight = '40px'; // same as gap
      sliderTrack.appendChild(clone);
    }

    // Add all slides
    projects.forEach((project, idx) => {
      sliderTrack.appendChild(createSlide(project, idx));
    });

    updateSlidePositions();
  }

  // --- Update Slide Positions ---
  function updateSlidePositions() {
    const slides = sliderTrack.querySelectorAll('.portfolio-card');
    const gap = 40;
    let cardWidth = 320;

    const activeCard = sliderTrack.querySelector('.portfolio-card.active');
    if (activeCard) cardWidth = activeCard.getBoundingClientRect().width;

    const offsetAmount = cardWidth + gap;
    const container = sliderTrack.closest('.slider-container');
    const centerOffset = container.getBoundingClientRect().width / 2 - cardWidth / 2;

    slides.forEach((slide, idx) => {
      let offset = idx - currentIndex;
      if (offset < -Math.floor(projects.length / 2)) offset += projects.length;
      if (offset > Math.floor(projects.length / 2)) offset -= projects.length;

      slide.classList.remove('active', 'near', 'inactive');

      let scale, opacity;
      if (offset === 0) {
        scale = 1;   opacity = 1;   slide.classList.add('active');
      } else if (Math.abs(offset) === 1) {
        scale = 0.97; opacity = 0.3; slide.classList.add('near');
      } else {
        scale = 0; opacity = 0;   slide.classList.add('inactive');
      }

      slide.style.position = 'absolute';
      slide.style.left = `${centerOffset + offset * offsetAmount}px`;
      slide.style.transform = `scale(${scale})`;
      slide.style.opacity = opacity;
      slide.style.zIndex = offset === 0 ? 2 : 1;
      slide.style.transition = 'left 0.5s cubic-bezier(.77,0,.18,1), transform 0.5s, opacity 0.5s';
    });

    sliderTrack.style.position = 'relative';
    sliderTrack.style.height = `${cardWidth * 0.7}px`;
  }

  // --- Slide Control ---
  function showSlide(index) {
    if (index < 0) index = projects.length - 1;
    if (index >= projects.length) index = 0;
    currentIndex = index;
    updateSlidePositions();
  }

  // --- Init ---
  renderSlides();
  showSlide(currentIndex + 1);
  setInterval(() => showSlide(currentIndex + 1), 3000);

  // --- Modal Handling ---
  function showModal() {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }, 10);
  }

  function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 350);
  }

  sliderTrack.addEventListener('click', (e) => {
    const link = e.target.closest('.portfolio-card-link');
    if (!link) return;
    e.preventDefault();

    const i = parseInt(link.dataset.index, 10);
    modalDetails.innerHTML = `
      <h2 style="color:#f2c94c;">${projects[i].title}</h2>
      <p>${projects[i].desc}</p>
      <div>${projects[i].details}</div>
    `;
    modalImage.src = projects[i].image;
    showModal();
  });

  document.querySelector('.modal-close').onclick = closeModal;
  modal.onclick = (e) => { if (e.target === modal) closeModal(); };

});
