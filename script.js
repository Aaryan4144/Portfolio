document.addEventListener('DOMContentLoaded', function() {
  // Cursor follower
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  });
  
  // Expand cursor on clickable elements
  const clickables = document.querySelectorAll('a, button, .project-card, .skills-list li');
  
  clickables.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorFollower.style.width = '50px';
      cursorFollower.style.height = '50px';
      cursorFollower.style.backgroundColor = 'rgba(33, 230, 193, 0.3)';
      cursorFollower.style.boxShadow = '0 0 20px rgba(33, 230, 193, 0.5)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursorFollower.style.width = '30px';
      cursorFollower.style.height = '30px';
      cursorFollower.style.backgroundColor = 'rgba(33, 230, 193, 0.2)';
      cursorFollower.style.boxShadow = '0 0 15px rgba(33, 230, 193, 0.3)';
    });
  });

  // Scroll progress indicator
  const scrollProgress = document.querySelector('.scroll-progress');
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
    
    // Show/hide back to top button
    if (scrollTop > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Back to top button click handler
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animation for elements with fade-in, slide-in-left, slide-in-right, and scale-in classes
  const animatedEls = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Keep observing for elements that may move in and out of view
        // Uncomment the line below if you want to stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Contact form handling with FormSubmit AJAX
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the default form submission
      
      // Show sending message
      formStatus.textContent = 'Sending...';
      formStatus.className = 'form-status';
      
      // Get form data
      const formData = new FormData(contactForm);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Send form data via fetch API
      fetch(contactForm.getAttribute('action'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formObject)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Show success message
          formStatus.textContent = 'Message sent successfully!';
          formStatus.className = 'form-status success';
          contactForm.reset();
          
          // Show alert
          alert('Message sent successfully!');
          
          // Clear status message after 5 seconds
          setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
          }, 5000);
        } else {
          // Show error message
          formStatus.textContent = 'Error sending message. Please try again.';
          formStatus.className = 'form-status error';
          alert('Error sending message. Please try again.');
        }
      })
      .catch(error => {
        // Show error message
        formStatus.textContent = 'Error sending message. Please try again.';
        formStatus.className = 'form-status error';
        alert('Error sending message. Please try again.');
        console.error('Error:', error);
      });
    });
  }
}); 