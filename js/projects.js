// Modular project list rendering for projects.html
document.addEventListener('DOMContentLoaded', () => {
  const projects = [
    {
      name: "Find The Simpsons - 100m+ Visits",
      language: { name: "Lua", icon: "icons/skills/luau.svg" },
      tech: [{ name: "ProfileStore", icon: "icons/skills/storage.svg" }],
      desc: "A popular Roblox game where players search for hidden Simpsons characters in various locations."
    },
    {
      name: "zDuels - Spigot",
      language: { name: "Java", icon: "icons/skills/java.svg" },
      tech: [
        { name: "MongoDB", icon: "icons/skills/mongodb.svg" },
        { name: "Redis", icon: "icons/skills/redis.svg" },
        { name: "Protobuf", icon: "icons/skills/buffer.svg" },
      ],
      desc: "The core plugin of Duel Network, managing a large-scale Minecraft minigame network."
    },
    {
      name: "Crystal - Spigot",
      language: { name: "Java", icon: "icons/skills/java.svg" },
      tech: [{ name: "MongoDB", icon: "icons/skills/mongodb.svg" }],
      desc: "A lightweight chat games plugin designed for smooth performance and minimal resource usage."
    },
    {
      name: "RNG Tycoon - 35,000+ Visits",
      language: { name: "Lua", icon: "icons/skills/luau.svg" },
      tech: [{ name: "ProfileStore", icon: "icons/skills/storage.svg" }],
      desc: "A Roblox game revolving around the classical Sol's RNG Mechanics."
    },
    {
      name: "Astral - Spigot",
      language: { name: "Java", icon: "icons/skills/java.svg" },
      tech: [
        { name: "MongoDB", icon: "icons/skills/mongodb.svg" },
        { name: "Redis", icon: "icons/skills/redis.svg" }
      ],
      desc: "A staff core plugin with essential moderation tools and unique features."
    },
    {
      name: "Alethia - Spigot",
      language: { name: "Java", icon: "icons/skills/java.svg" },
      tech: [
        { name: "MongoDB", icon: "icons/skills/mongodb.svg" },
        { name: "Google Authenticator", icon: "icons/skills/googleauthenticator.svg" }
      ],
      desc: "A security-focused plugin that adds in-game two-factor authentication using Google Authenticator."
    },
    {
      name: "FactionEye - Discord Bot",
      language: { name: "Java", icon: "icons/skills/java.svg" },
      tech: [
        { name: "JDA", icon: "icons/skills/discord.svg" },
        { name: "MongoDB", icon: "icons/skills/mongodb.svg" }
      ],
      desc: "A faction management bot with rosters, wall check alerts, and real-time f-top updates."
    },
    {
      name: "Pride Anticheat",
      language: { name: "Lua", icon: "icons/skills/luau.svg" },
      tech: [{ name: "ProfileStore", icon: "icons/skills/storage.svg" }],
      desc: "A fully server-sided anticheat, with various checks and discord webhook integration for logging violations."
    },
    {
      name: "StaffBuffs - Spigot/Bot",
      language: { name: "Java", icon: "icons/skills/java.svg" },
      tech: [
        { name: "MongoDB", icon: "icons/skills/mongodb.svg" },
        { name: "JDA", icon: "icons/skills/discord.svg" }
      ],
      desc: "A plugin that rewards staff with tebex credits and tracks staff playtime via Discord."
    },
    {
      name: "The Project - Unreleased",
      language: { name: "Lua", icon: "icons/skills/luau.svg" },
      tech: [{ name: "ProfileStore", icon: "icons/skills/storage.svg" }],
      desc: "A 'The Backrooms' type Roblox game revolving around exploration and survival."
    },
    {
      name: "VIPWorlds - Spigot",
      language: { name: "Java", icon: "icons/skills/java.svg" },
      tech: [
        { name: "MongoDB", icon: "icons/skills/mongodb.svg" },
        { name: "Redis", icon: "icons/skills/redis.svg" }
      ],
      desc: "A plugin that allows players to create and manage their own unique private minecraft worlds."
    },
    {
      name: "CreditShop - Spigot",
      language: { name: "Java", icon: "icons/skills/java.svg" },
      tech: [{ name: "MongoDB", icon: "icons/skills/mongodb.svg" }],
      desc: "A unique plugin that links in-game credits to your Tebex webstore, allowing for purchases."
    },
    {
      name: "RemoteAdmin - Roblox Edition",
      language: { name: "Lua", icon: "icons/skills/luau.svg" },
      tech: [{ name: "ProfileStore", icon: "icons/skills/storage.svg" }],
      desc: "A custom Admin Panel with various features such as punishment management, user management, global events, and more."
    },
    {
      name: "Can't Sleep? - Under Development",
      language: { name: "Lua", icon: "icons/skills/luau.svg" },
      tech: [{ name: "ProfileStore", icon: "icons/skills/storage.svg" }],
      desc: "A passion project revolving around the idea of sleep paralysis and horror aspects."
    }
  ];

  const grid = document.querySelector('.projects-grid');
  grid.innerHTML = '';

  // Render each project as a vertical card
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.language = project.language.name;
    card.innerHTML = `
      <div class="project-card-content">
        <h2 class="project-title">${project.name}</h2>
        <p class="project-desc">${project.desc}</p>
        <div class="project-tags">
          ${renderTag(project.language)}
          ${project.tech.map(t => renderTag(t)).join('')}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Fade-in animation for all cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.animation = 'none';
    setTimeout(() => {
      card.style.animation = `fadeInUp 0.8s ease forwards`;
      card.style.animationDelay = `${0.1 + i * 0.18}s`;
    }, 50);
  });

  function renderTag(tag) {
    if (typeof tag === 'object' && tag.name) {
      const icon = tag.icon ? `<img class="tag-icon" src="${tag.icon}" alt="${tag.name}">` : '';
      return `<span class="project-tag">${icon}${tag.name}</span>`;
    }
    return '';
  }

  // Select "All" filter by default
  document.querySelector('.filter-btn[data-lang="all"]').classList.add('active');

  // Filter logic
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;

      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = Array.from(document.querySelectorAll('.project-card'));
      let visibleCards = [];

      cards.forEach(card => {
        if (lang === 'all' || card.dataset.language === lang) {
          card.style.display = '';
          visibleCards.push(card);
        } else {
          card.style.display = 'none';
        }

        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animation = 'none';
      });

      // Fade-in all visible cards at once
      visibleCards.forEach((card, i) => {
        setTimeout(() => {
          card.style.animation = `fadeInUp 0.8s ease forwards`;
          card.style.animationDelay = `${0.1 + i * 0.18}s`;
        }, 50);
      });
    });
  });
});
