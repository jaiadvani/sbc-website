// ============================================================
//  SARVATOBHADRA CHAKRA — Main JavaScript
//  v3 — Connected to PostgreSQL API
//  Note: API_URL, getArticles, getVideos etc. are in js/data.js
// ============================================================

/* ── Bookings State — stored in localStorage ── */
const Store = {
  get(key, fallback) {
    try {
      const val = localStorage.getItem('sbc_' + key);
      return val ? JSON.parse(val) : fallback;
    } catch(e) { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem('sbc_' + key, JSON.stringify(val)); } catch(e) {}
  }
};

const DEFAULT_BOOKINGS = [];

const State = {
  adminSection: 'dashboard',
  get bookings() { return Store.get('bookings', DEFAULT_BOOKINGS); },
  set bookings(v) { Store.set('bookings', v); }
};



/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initArticles();
  initVideos();
  initBookingForm();
  initAdminPortal();
  initScrollToSection();
});

/* ── Navbar ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
  });

  mobileNav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
    });
  });
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── Smooth Scroll ── */
function initScrollToSection() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ── Articles preview on home page ── */
function initArticles() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  getArticles().then(articles => {
    const published = articles.filter(a => a.status === 'published').slice(0, 3);
    if (!published.length) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);font-family:var(--font-elegant);font-style:italic">Articles coming soon.</div>`;
      return;
    }
    const barColor = cat => cat === 'Learn SBC' ? '#C8922A' : cat === 'Life Applications' ? '#4A9B6F' : '#7B68CC';
    grid.innerHTML = published.map(a => `
      <a href="articles.html" class="article-card reveal" style="text-decoration:none">
        <div style="height:4px;background:${barColor(a.category)}"></div>
        <div class="article-category" style="display:flex;align-items:center;gap:6px;padding:16px 20px 0">
          <span style="width:3px;height:14px;background:${barColor(a.category)};border-radius:2px;display:inline-block"></span>
          ${a.category}
        </div>
        <h3 style="padding:8px 20px 10px;color:var(--gold-light);font-size:1.05rem;line-height:1.4">${a.title}</h3>
        <p style="padding:0 20px 16px;font-size:0.88rem;color:var(--text-muted);line-height:1.6;margin:0">${a.excerpt}</p>
        <div class="article-meta">
          <span>${a.date || ''}</span>
          <span class="read-more">Read Article →</span>
        </div>
      </a>
    `).join('');
    initScrollReveal();
  }).catch(() => {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">
      <a href="articles.html" style="color:var(--gold-primary)">View all articles →</a></div>`;
  });
}

/* ── Videos preview on home page ── */
function initVideos() {
  const grid = document.getElementById('videos-grid');
  if (!grid) return;
  getVideos().then(videos => {
    const published = videos.filter(v => v.status === 'published').slice(0, 3);
    if (!published.length) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);font-family:var(--font-elegant);font-style:italic">Videos coming soon.</div>`;
      return;
    }
    grid.innerHTML = published.map(video => {
      const ytId = video.youtube_id || video.youtubeId || '';
      return `
      <div class="video-card reveal" onclick="openVideo('${ytId}')">
        <div class="video-thumb">
          <img src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" alt="${video.title}" onerror="this.style.display='none'">
          <div class="play-overlay"><div class="play-btn-circle">▶</div></div>
        </div>
        <div class="video-info">
          <h4>${video.title}</h4>
          <span>${video.duration || ''} • ${video.views || '0'} views</span>
        </div>
      </div>`;
    }).join('');
    initScrollReveal();
  }).catch(() => {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">
      <a href="videos.html" style="color:var(--gold-primary)">View all videos →</a></div>`;
  });
}

function openVideo(youtubeId) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  if (!modal || !iframe) return;
  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  if (!modal || !iframe) return;
  iframe.src = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}



/* ── Booking Form ── */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;
  const dateInput = document.getElementById('booking-date');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    setTimeout(() => {
      const booking = {
        id: Date.now(),
        name: document.getElementById('booking-name').value,
        type: document.getElementById('booking-type').value,
        date: document.getElementById('booking-date').value,
        time: document.getElementById('booking-time').value,
        status: 'pending'
      };
      const bookings = State.bookings;
      bookings.push(booking);
      State.bookings = bookings;

      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }, 1500);
  });
}

/* ── Admin Portal ── */
function initAdminPortal() {
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => switchAdminSection(item.dataset.section));
  });
}

function showAdmin() {
  document.getElementById('login-screen').classList.add('active');
}

function doLogin() {
  const user = document.getElementById('admin-user').value;
  const pass = document.getElementById('admin-pass').value;
  const err  = document.getElementById('login-error');

  if (user === 'admin' && pass === 'sbc2025') {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-site').style.display = 'none';
    document.getElementById('admin-portal').classList.add('active');
    renderAdminDashboard();
    renderAdminArticles();
    renderAdminVideos();
    renderAdminBookings();
  } else {
    err.style.display = 'block';
    err.textContent = 'Invalid credentials. Please try again.';
  }
}

function doLogout() {
  document.getElementById('admin-portal').classList.remove('active');
  document.getElementById('main-site').style.display = 'block';
  document.getElementById('admin-user').value = '';
  document.getElementById('admin-pass').value = '';
}

function switchAdminSection(section) {
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.toggle('active', i.dataset.section === section));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.toggle('active', p.id === `panel-${section}`));
  State.adminSection = section;
}

async function renderAdminDashboard() {
  try {
    const [articles, videos] = await Promise.all([getAdminArticles(), getAdminVideos()]);
    const published = articles.filter(a => a.status === 'published').length;
    const pubVideos = videos.filter(v => v.status === 'published').length;
    const bookings = State.bookings;
    document.getElementById('stat-articles').textContent = published;
    document.getElementById('stat-videos').textContent   = pubVideos;
    document.getElementById('stat-bookings').textContent = bookings.length;
    document.getElementById('stat-pending').textContent  = bookings.filter(b => b.status === 'pending').length;
  } catch(e) { console.warn('Dashboard stats error:', e.message); }
}

async function renderAdminArticles() {
  const tbody = document.getElementById('articles-tbody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">Loading...</td></tr>`;
  try {
    const articles = await getAdminArticles();
    if (!articles.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">No articles yet. Use "Add Article" to create your first one.</td></tr>`;
      return;
    }
    const fmt = d => d ? new Date(d).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}) : '';
    tbody.innerHTML = articles.map(a => `
      <tr>
        <td>${a.title}</td>
        <td>${a.category}</td>
        <td>${fmt(a.created_at)}</td>
        <td>${a.updated_at && a.updated_at !== a.created_at ? fmt(a.updated_at) : '—'}</td>
        <td><span class="badge badge-${a.status}">${a.status}</span></td>
        <td>
          <button class="btn-sm btn-edit" onclick="editArticle(${a.id})">Edit</button>
          <button class="btn-sm btn-edit" onclick="toggleStatus(${a.id},'article')">${a.status === 'published' ? 'Unpublish' : 'Publish'}</button>
          <button class="btn-sm btn-delete" onclick="deleteArticle(${a.id})">Delete</button>
        </td>
      </tr>`).join('');
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#f87171;padding:24px">Could not load from API. Check connection.</td></tr>`;
  }
}

async function renderAdminVideos() {
  const tbody = document.getElementById('videos-tbody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">Loading...</td></tr>`;
  try {
    const videos = await getAdminVideos();
    if (!videos.length) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">No videos yet. Use "Add Video" to add your first YouTube video.</td></tr>`;
      return;
    }
    tbody.innerHTML = videos.map(v => `
      <tr>
        <td>${v.title}</td>
        <td><a href="https://youtube.com/watch?v=${v.youtube_id}" target="_blank" style="color:var(--gold-primary)">${v.youtube_id}</a></td>
        <td>${v.duration || '—'}</td>
        <td>${v.views || '0'}</td>
        <td><span class="badge badge-${v.status}">${v.status}</span></td>
        <td>
          <button class="btn-sm btn-edit" onclick="toggleStatus(${v.id},'video')">${v.status === 'published' ? 'Unpublish' : 'Publish'}</button>
          <button class="btn-sm btn-delete" onclick="deleteVideo(${v.id})">Delete</button>
        </td>
      </tr>`).join('');
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#f87171;padding:24px">Could not load from API. Check connection.</td></tr>`;
  }
}

function renderAdminBookings() {
  const tbody = document.getElementById('bookings-tbody');
  if (!tbody) return;
  const bookings = State.bookings;
  if (!bookings.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">No bookings yet.</td></tr>`;
    return;
  }
  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td>${b.name}</td><td>${b.type}</td><td>${b.date}</td><td>${b.time}</td>
      <td><span class="badge badge-${b.status === 'confirmed' ? 'published' : 'draft'}">${b.status}</span></td>
      <td>
        <button class="btn-sm btn-edit" onclick="confirmBooking(${b.id})">Confirm</button>
        <button class="btn-sm btn-delete" onclick="deleteBooking(${b.id})">Delete</button>
      </td>
    </tr>`).join('');
}

async function toggleStatus(id, type) {
  try {
    if (type === 'article') { await toggleArticleStatus(id); renderAdminArticles(); }
    else { await toggleVideoStatus(id); renderAdminVideos(); }
    renderAdminDashboard();
    showToast('✅ Status updated!');
  } catch(e) { showToast('❌ Error: ' + e.message); }
}

async function deleteArticle(id) {
  if (!confirm('Delete this article? This cannot be undone.')) return;
  try {
    await deleteArticleFromAPI(id);
    renderAdminArticles(); renderAdminDashboard();
    showToast('🗑️ Article deleted.');
  } catch(e) { showToast('❌ Error deleting: ' + e.message); }
}

async function deleteVideo(id) {
  if (!confirm('Delete this video? This cannot be undone.')) return;
  try {
    await deleteVideoFromAPI(id);
    renderAdminVideos(); renderAdminDashboard();
    showToast('🗑️ Video deleted.');
  } catch(e) { showToast('❌ Error deleting: ' + e.message); }
}

function deleteBooking(id) {
  if (confirm('Remove this booking?')) {
    State.bookings = State.bookings.filter(b => b.id !== id);
    renderAdminBookings(); renderAdminDashboard();
  }
}

function confirmBooking(id) {
  const bookings = State.bookings;
  const b = bookings.find(x => x.id === id);
  if (b) { b.status = 'confirmed'; State.bookings = bookings; renderAdminBookings(); renderAdminDashboard(); }
}

async function addArticle() {
  const title    = document.getElementById('new-article-title').value.trim();
  const category = document.getElementById('new-article-category').value;
  const content  = document.getElementById('new-article-content').value.trim();
  const tagsRaw  = document.getElementById('new-article-tags')?.value || '';
  if (!title || !content) { alert('Please fill in the title and content before saving.'); return; }

  const btn = document.querySelector('#panel-add-article .btn-primary');
  if (btn) { btn.disabled = true; btn.querySelector('span').textContent = '⏳ Saving...'; }
  try {
    await saveArticleToAPI({ title, category, content, tags: tagsRaw, status: 'draft' });
    document.getElementById('new-article-title').value = '';
    document.getElementById('new-article-content').value = '';
    if (document.getElementById('new-article-tags')) document.getElementById('new-article-tags').value = '';
    renderAdminArticles(); renderAdminDashboard();
    switchAdminSection('articles');
    showToast('✅ Article saved as draft! Click Publish to make it live.');
  } catch(e) {
    showToast('❌ Error saving article: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.querySelector('span').textContent = '💾 Save as Draft'; }
  }
}

async function addVideo() {
  const title     = document.getElementById('new-video-title').value.trim();
  const youtubeId = document.getElementById('new-video-id').value.trim();
  const duration  = document.getElementById('new-video-duration').value.trim();
  if (!title || !youtubeId) { alert('Please fill in the title and YouTube ID.'); return; }

  const btn = document.querySelector('#panel-add-video .btn-primary');
  if (btn) { btn.disabled = true; btn.querySelector('span').textContent = '⏳ Saving...'; }
  try {
    await saveVideoToAPI({ title, youtube_id: youtubeId, duration, category: 'Learn SBC', status: 'draft' });
    document.getElementById('new-video-title').value = '';
    document.getElementById('new-video-id').value = '';
    document.getElementById('new-video-duration').value = '';
    renderAdminVideos(); renderAdminDashboard();
    switchAdminSection('videos');
    showToast('✅ Video saved as draft! Click Publish to make it live.');
  } catch(e) {
    showToast('❌ Error saving video: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; btn.querySelector('span').textContent = '🎬 Save Video'; }
  }
}

/* ── Edit Article ── */
async function editArticle(id) {
  try {
    const res = await fetch(`${API_URL}/api/articles/${id}`);
    const json = await res.json();
    if (!json.success) { showToast('❌ Could not load article.'); return; }
    const a = json.data;

    document.getElementById('edit-article-id').value = a.id;
    document.getElementById('edit-article-title').value = a.title;
    document.getElementById('edit-article-category').value = a.category;
    document.getElementById('edit-article-tags').value = a.tags || '';
    document.getElementById('edit-article-content').value = a.content;

    // Show edit nav item and switch to it
    document.getElementById('nav-edit-article').style.display = 'flex';
    switchAdminSection('edit-article');
  } catch(e) {
    showToast('❌ Error loading article: ' + e.message);
  }
}

async function saveEditArticle(status) {
  const id      = document.getElementById('edit-article-id').value;
  const title   = document.getElementById('edit-article-title').value.trim();
  const category= document.getElementById('edit-article-category').value;
  const tags    = document.getElementById('edit-article-tags').value.trim();
  const content = document.getElementById('edit-article-content').value.trim();
  if (!title || !content) { alert('Title and content are required.'); return; }

  const btn = document.querySelector('#panel-edit-article .btn-primary');
  if (btn) { btn.disabled = true; }
  try {
    const res = await fetch(`${API_URL}/api/admin/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, content, tags, status })
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    renderAdminArticles(); renderAdminDashboard();
    document.getElementById('nav-edit-article').style.display = 'none';
    switchAdminSection('articles');
    showToast(`✅ Article ${status === 'published' ? 'saved & published' : 'saved as draft'}!`);
  } catch(e) {
    showToast('❌ Error saving: ' + e.message);
  } finally {
    if (btn) { btn.disabled = false; }
  }
}

/* ── Reset bookings (emergency) ── */
function resetToDefaults() {
  if (confirm('This will clear all local bookings data. Are you sure?')) {
    Store.set('bookings', []);
    renderAdminBookings();
    renderAdminDashboard();
    showToast('↩️ Bookings cleared.');
  }
}

/* ── Toast notification ── */
function showToast(msg) {
  let toast = document.getElementById('sbc-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sbc-toast';
    toast.style.cssText = `
      position:fixed; bottom:32px; left:50%; transform:translateX(-50%);
      background:rgba(21,32,64,0.97); border:1px solid rgba(200,146,42,0.4);
      color:#E8B84B; font-family:'Cinzel',serif; font-size:0.8rem;
      letter-spacing:0.08em; padding:14px 28px; border-radius:4px;
      z-index:9999; box-shadow:0 8px 32px rgba(0,0,0,0.5);
      opacity:0; transition:opacity 0.3s ease; pointer-events:none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 3500);
}

/* ── Keyboard shortcuts ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeArticle(); closeVideo(); }
  if (e.key === 'Enter' && document.getElementById('login-screen').classList.contains('active')) doLogin();
});
