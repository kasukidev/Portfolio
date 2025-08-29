function sequentialFadeInSkills() {
  const categories = document.querySelectorAll('.skills-category');
  categories.forEach(cat => cat.classList.add('fade-in-section'));

  let delay = 0;
  categories.forEach(cat => {
    setTimeout(() => {
      cat.classList.add('active');
    }, delay);
    delay += 750;
  });
}

document.addEventListener('DOMContentLoaded', sequentialFadeInSkills);
