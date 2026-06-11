/**
* Template Name: iPortfolio - v3.10.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  // JSON testimonials
  const testimonials = [
    {
      name: 'Rowell C.',
      img: 'https://media.licdn.com/dms/image/C5603AQHup9243FO7sQ/profile-displayphoto-shrink_800_800/0/1629891327081?e=2147483647&v=beta&t=yNtMWNKLAheQpk1ZPfGXVoNubl5zNmELSl5K-Ap6tSc',
      role: 'Senior ReactJS Developer',
      txt: `I had the pleasure of working with James for the a year at LoanMarket, where James was a vital member of our development team. 
          He consistently demonstrated a strong aptitude for software development, with a particular focus on developing while taking a deeper learning on ReactJS. 
          James was able to quickly learn new technologies and was always eager to take on new challenges. One of the things that impressed me the most about James was his ability to work well within a team. He was always willing to help out and was able to effectively collaborate with other team members to deliver high-quality software on time. James has a great attitude and is a pleasure to work with. I am confident that James would be a valuable asset to any development team.`,
    },
    {
      name: 'Emil Jan Thomas B.',
      img: 'https://media.licdn.com/dms/image/C5103AQEvXR_o7pLMOg/profile-displayphoto-shrink_100_100/0/1521678508853?e=1681948800&v=beta&t=NroYD7zhTwQuxKJT-ER5j-sWfGPEYT1Ks2xNhE_EJ7s',
      role: 'Web Designer and Coder',
      txt: `James is the best colleague I've ever had.
          He is one of the most committed professionals I've ever worked with, and he is always prepared to lend a hand when needed.
          His developer expertise is extensive, and it has aided our team in developing more effective solutions for many projects.
          I definitely suggest James and would welcome the opportunity to work with him again.`,
    },
    {
      name: 'Hilarion V.',
      img: 'https://media.licdn.com/dms/image/C5603AQGf6idcTlsH5w/profile-displayphoto-shrink_100_100/0/1650635862363?e=1681948800&v=beta&t=jPhzSv7iNq40f-GYXc5IYJxUroC-YanSK9EInpGK0CM',
      role: 'Web Desinger & SEO',
      txt: `I worked with James and his understanding of content management and frontend development is exceptional. He knows his stuff, I have to say. With this, he was able to demonstrate his skills on several tasks that were assigned to him, accomplished his task effectively, and satisfied the requirements of our client and the project. And though critical thinking was also able to solve problems that come on the way. Kudos to that!! 🙂`,
    },
    {
      name: 'Melvin Ray P.',
      img: 'https://media.licdn.com/dms/image/D5603AQHWE6DW3V0mrQ/profile-displayphoto-shrink_100_100/0/1647610795785?e=1681948800&v=beta&t=q4Lac1PtzDGv2XYzpZw2VIlKzwQboLqLyyHuu4KzMr0',
      role: '.NET Developer',
      txt: `Pioneered our ASP.Net Core Projects. Excellent coding practices and principles.`,
    },
    {
      name: 'Emmanuel O.',
      img: 'https://media.licdn.com/dms/image/C5603AQF5hr2rHxsR-w/profile-displayphoto-shrink_100_100/0/1517815722354?e=1681948800&v=beta&t=GmEuOSF6e9ZZV7d554XZ3V_BCyGPLm2_DR7xFH78Bbg',
      role: 'UX/UI Designer',
      txt: `It is a pleasure working with james in a team , he can handle and solved critical problems that are useful in terms of technicalities and software issues. He really is a full-stack developer with great experience nad knowledge on what are the standards in coding. KUDOS !`,
    }
  ]

  const swiperWrapper = document.getElementsByClassName('swiper-wrapper')

  testimonials.forEach(t => {
    const elem = `
          <div class="swiper-slide">
            <div class="testimonial-item" data-aos="fade-up">
              <p>
                  <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                  ${t.txt}
                  <i class="bx bxs-quote-alt-right quote-icon-right"></i>
              </p>
              <img src="${t.img}" alt="">
              <h3>${t.name}</h3>
              <h4>${t.role}</h4>
            </div>
          </div>`
    $(swiperWrapper).append(elem)
  })

  // current age
  setTimeout(() => {
    const currentAge = document.getElementById("currentAge")
    if (currentAge != null) {
      currentAge.innerHTML = (new Date().getFullYear() - 1996).toString()
    }
  }, 500)

})()