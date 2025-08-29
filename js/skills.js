// Modular skills list rendering for skills.html
document.addEventListener('DOMContentLoaded', () => {
  const skills = [
    {
      category: 'Programming Languages & Paradigms',
      items: [
        { icon: 'luau', title: 'LuaU', desc: 'Roblox scripting for gameplay systems' },
        { icon: 'java', title: 'Java', desc: 'Backend logic & plugin development' },
        { icon: 'python', title: 'Python', desc: 'Automation, data workflows & backend' }
      ]
    },
    {
      category: 'Databases & Data',
      items: [
        { icon: 'sql', title: 'SQL', desc: 'Relational database modeling & queries' },
        { icon: 'mongo', title: 'MongoDB', desc: 'Scalable NoSQL data management' },
        { icon: 'redis', title: 'Redis', desc: 'In-memory caching & real-time ops' },
        { icon: 'protobuf', title: 'Protobuf', desc: 'Lightweight, fast data serialization' }
      ]
    },
    {
      category: 'Frameworks & APIs',
      items: [
        { icon: 'spigot', title: 'Spigot/Bukkit', desc: 'Minecraft plugin APIs & tooling' },
        { icon: 'jda', title: 'JDA', desc: 'Discord bot API for automation' },
        { icon: 'profilestore', title: 'ProfileStore', desc: 'Roblox player data persistence' },
        { icon: 'bytenet', title: 'ByteNet', desc: 'Roblox client-server networking' }
      ]
    },
    {
      category: 'DevOps & Cloud',
      items: [
        { icon: 'cicd', title: 'CI/CD', desc: 'Automated builds & deployments' },
        { icon: 'aws', title: 'AWS', desc: 'Cloud hosting, scaling & services' }
      ]
    },
    {
      category: 'Build & Version Control',
      items: [
        { icon: 'git', title: 'Git', desc: 'Source control & collaboration' },
        { icon: 'maven', title: 'Maven', desc: 'Java project build automation' },
        { icon: 'gradle', title: 'Gradle', desc: 'Flexible build & dependency management' }
      ]
    }
  ];

  const section = document.getElementById('skills');

  // Keep the header, wipe everything else
  Array.from(section.children).forEach(child => {
    if (!child.classList.contains('skills-header')) {
      section.removeChild(child);
    }
  });

  // Render skills
  skills.forEach(cat => {
    const catDiv = document.createElement('div');
    catDiv.className = 'skills-category';
    catDiv.innerHTML = `<h2 class="skills-category-title">${cat.category}</h2>`;

    const grid = document.createElement('div');
    grid.className = 'skills-grid';

    cat.items.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card'; // separate class from project-card

      // attach a filter attribute if you want filtering later
      card.setAttribute('data-skill', skill.title);

      card.innerHTML = `
        <div class="skill-icon ${skill.icon}"></div>
        <div class="skill-title">${skill.title}</div>
        <div class="skill-desc">${skill.desc}</div>
      `;
      grid.appendChild(card);
    });

    catDiv.appendChild(grid);
    section.appendChild(catDiv);
  });

  // Optional: filter button logic for skills
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.skill-card');

      cards.forEach(card => {
        const skill = card.getAttribute('data-skill');
        if (filter === 'all' || skill === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
