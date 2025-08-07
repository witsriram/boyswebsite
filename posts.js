async function loadPosts() {
  const res = await fetch('/api/posts');
  const posts = await res.json();
  const container = document.getElementById('posts');
  container.innerHTML = '';
  posts.forEach(p => {
    const article = document.createElement('article');
    article.innerHTML = `<h3>${p.title}</h3><p class="date">${p.date}</p><p>${p.content}</p>`;
    container.appendChild(article);
  });
}

document.getElementById('post-form').addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const date = document.getElementById('date').value;
  await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, date })
  });
  e.target.reset();
  loadPosts();
});

loadPosts();
