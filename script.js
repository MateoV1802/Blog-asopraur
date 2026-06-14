document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Cargar posts desde JSON para facilitar agregar/modificar desde código
    const postsContainer = document.getElementById('posts-list');
    if (!postsContainer) return;

    fetch('posts/posts.json')
        .then(res => {
            if (!res.ok) throw new Error('No se pudo cargar posts/posts.json');
            return res.json();
        })
        .then(posts => {
            renderPosts(posts, postsContainer);
        })
        .catch(err => {
            postsContainer.innerHTML = '<p class="muted">No se pudieron cargar los posts. Asegúrate de ejecutar desde un servidor local.</p>';
            console.error(err);
        });
});

function renderPosts(posts, container) {
    container.innerHTML = '';
    posts.forEach(post => {
        const card = document.createElement('article');
        card.className = 'blog-post';

        const img = document.createElement('img');
        img.className = 'thumb';
        img.src = post.image || 'images/blog/post1.jpg';
        img.alt = post.title || '';

        const body = document.createElement('div');
        body.className = 'post-body';

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = (post.date ? post.date + ' • ' : '') + (post.author || 'Asocpraur');

        const h2 = document.createElement('h2');
        h2.textContent = post.title || 'Sin título';

        const p = document.createElement('p');
        p.textContent = post.excerpt || '';

        const link = document.createElement('a');
        link.className = 'read-more';
        link.href = post.url || '#';
        link.textContent = 'Leer más';

        body.appendChild(meta);
        body.appendChild(h2);
        body.appendChild(p);
        body.appendChild(link);

        card.appendChild(img);
        card.appendChild(body);

        container.appendChild(card);
    });
}