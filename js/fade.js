function sequentialFadeIn() {
    const sections = [
      document.querySelector('header.portfolio-header'),
      document.querySelector('section#projects'),
      document.querySelector('section#contact'),
      document.querySelector('section#about-sec')
    ];

    sections.forEach(section => {
      if (section) section.classList.add('fade-in-section');
    });

    let delay = 0;
    sections.forEach((section) => {
      if (section) {
        setTimeout(() => {
          section.classList.add('active');
        }, delay);
        delay += 750; 
      }
    });
  };

  
  

document.querySelectorAll('.fade-in-section').forEach(section => {
  section.classList.add('visible');
});

document.addEventListener('DOMContentLoaded', sequentialFadeIn);