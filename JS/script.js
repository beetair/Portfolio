// ============== КАРУСЕЛЬ ==============
document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelector('.slides');
    const images = slides.querySelectorAll('img');
    let index = 0;

    const updateSlide = () => {
        const width = carousel.clientWidth;
        slides.style.transform = `translateX(-${index * width}px)`;
    };

    carousel.querySelector('.next').addEventListener('click', () => {
        index = (index + 1) % images.length;
        updateSlide();
    });

    carousel.querySelector('.prev').addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        updateSlide();
    });

    window.addEventListener('resize', updateSlide);
    updateSlide();
});

// ============== PDF Модалка ==============
const modal = document.getElementById('pdfModal');
const btn = document.getElementById('openPdf');
const closeBtn = document.querySelector('.close');

if (btn && modal && closeBtn) {
    btn.onclick = () => modal.style.display = 'flex';
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
}

// ============== Анімація статистики ==============
const statObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.stat-card').forEach(el => statObserver.observe(el));

// ============== Навігація та підсвічування ==============
const scroller = document.querySelector('.center');
const sidebarLinks = document.querySelectorAll('.sidebar a');

// цілі для скролу — ОДИН раз і з унікальним ім'ям
const targets = {
    home: document.querySelector('.intro-section'),
    projects: document.querySelector('#projects'),
    contact: document.querySelector('#contact')
};

// клік по іконках
sidebarLinks[0].addEventListener('click', (e) => {
    e.preventDefault();
    targets.home.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
sidebarLinks[1].addEventListener('click', (e) => {
    e.preventDefault();
    targets.projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
sidebarLinks[2].addEventListener('click', (e) => {
    e.preventDefault();
    targets.contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// кнопка "Contact Me"
const contactBtn = document.getElementById('scrollToContact');
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        targets.contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// підсвічування активної іконки
const observed = [targets.home, targets.projects, targets.contact];

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // зняти активний стан
        sidebarLinks.forEach(l => l.classList.remove('active'));

        // поставити згідно з таргетом
        if (entry.target === targets.home) {
            sidebarLinks[0].classList.add('active');
        } else if (entry.target === targets.projects) {
            sidebarLinks[1].classList.add('active');
        } else if (entry.target === targets.contact) {
            sidebarLinks[2].classList.add('active');
        }
    });
}, {
    root: scroller,        // ДИВИМОСЯ В СКРОЛ-КОНТЕЙНЕР .center
    threshold: 0.35        // секція активна, коли видно ~35%
});

observed.forEach(el => el && activeObserver.observe(el));




document.addEventListener("DOMContentLoaded", () => {
    const profileCard = document.getElementById('profileCard');
    const closeProfile = document.getElementById('closeProfile');
    const openProfile = document.getElementById('openProfile');

    if (!profileCard || !closeProfile || !openProfile) return;

    // Закриття картки
    closeProfile.addEventListener('click', () => {
        profileCard.classList.add('hide');
        // після завершення анімації сховаємо її
        profileCard.addEventListener('transitionend', function handler() {
            profileCard.style.display = 'none';
            openProfile.style.display = 'flex';
            profileCard.removeEventListener('transitionend', handler);
        });
    });

    // Відкриття картки
    openProfile.addEventListener('click', () => {
        openProfile.style.display = 'none';
        profileCard.style.display = 'block'; // <- ось це головне
        requestAnimationFrame(() => {
            profileCard.classList.remove('hide');
        });
    });

    // Якщо розширюємо екран — повертаємо картку автоматично
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            profileCard.style.display = 'block';
            openProfile.style.display = 'none';
            profileCard.classList.remove('hide');
        } else {
            // якщо малий екран і картка закрита — показуємо лише кнопку
            if (profileCard.classList.contains('hide') || profileCard.style.display === 'none') {
                openProfile.style.display = 'flex';
            }
        }
    });
});