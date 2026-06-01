// ============================================================
//  SARVATOBHADRA CHAKRA — Main JavaScript
//  v2 — localStorage persistence for local editing
// ============================================================

/* ── Default seed data (used only on first ever load) ── */
const DEFAULT_ARTICLES = [
  {
    id: 1, title: "Understanding the Sarvatobhadra Chakra: An Introduction",
    category: "Fundamentals", date: "15 May 2025",
    excerpt: "The Sarvatobhadra Chakra is one of the most profound and versatile tools in Vedic astrology, offering insights across multiple dimensions of life.",
    content: `The Sarvatobhadra Chakra (SBC) is one of the most revered and intricate tools in the tradition of Vedic astrology. Its name itself reveals its profound purpose — "Sarvatobhadra" means "auspicious in all directions," reflecting its multidimensional capacity to assess influences coming from all cardinal and intercardinal directions.\n\nUnlike conventional astrological charts that focus primarily on planetary positions, the SBC is a unique 9x9 matrix that integrates nakshatras (lunar mansions), vowels and consonants of the Sanskrit alphabet, days of the week, and zodiac signs into a unified cosmological grid.\n\nThis ancient instrument has been used for centuries by Vedic scholars to predict the outcomes of journeys, diagnose diseases, assess the strength of political entities, and determine the auspiciousness of events. Its genius lies in the concept of "vedha" — the piercing or affliction of sensitive points — which reveals both supportive and challenging influences with remarkable precision.\n\nStudying the SBC opens a window into the deeper mechanics of cosmic influence, where the microcosm of an individual birth chart intersects with the macrocosm of universal time cycles. It is a living tradition, passed down through generations of dedicated practitioners.`,
    status: 'published', icon: '🔯'
  },
  {
    id: 2, title: "Nakshatras and the Chakra: The 27 Lunar Mansions",
    category: "Nakshatras", date: "22 May 2025",
    excerpt: "How the 27 (or 28) nakshatras form the foundational structure of the Sarvatobhadra Chakra and their significance in reading vedhas.",
    content: `The 27 nakshatras, or lunar mansions, form the very backbone of the Sarvatobhadra Chakra. In Vedic astrology, the nakshatras divide the ecliptic into 27 equal segments of 13°20' each, with the Moon traversing one nakshatra approximately every day.\n\nIn the SBC matrix, nakshatras occupy specific cells and rows, creating a spatial map of the sky's energetic qualities. The placement of transiting planets over or in vedha with natal nakshatras reveals whether planetary energies are supportive or challenging for the native.\n\nEach nakshatra carries its own deity, symbol, ruling planet, and inherent quality (guna). Understanding these characteristics is essential for interpreting how planetary vedhas will manifest in practical life. For example, when a malefic planet forms a vedha with the janma nakshatra (birth star), it often signals a period requiring extra care and awareness.\n\nThe deeper study of nakshatras within the SBC framework reveals elegant patterns — such as how trine nakshatras often harmonize, while certain specific vedha relationships can indicate sudden changes, health concerns, or unexpected opportunities.`,
    status: 'published', icon: '⭐'
  },
  {
    id: 3, title: "Vedha: The Art of Piercing — Understanding Afflictions",
    category: "Techniques", date: "1 June 2025",
    excerpt: "Vedha is the central mechanism of the Sarvatobhadra Chakra. Learn how to identify, interpret and apply vedha analysis in chart reading.",
    content: `Vedha, derived from the Sanskrit root meaning "to pierce" or "to afflict," is the core operational principle of the Sarvatobhadra Chakra. When a planet transiting through the chakra's matrix aligns with certain sensitive points — called "vedha bindus" — it creates an energetic piercing that influences the matters signified by those points.\n\nThere are several categories of vedha recognized in classical texts:\n\n**Direct Vedha (Sakshat Vedha):** When a planet directly transits over a sensitive nakshatra, day, or zodiac sign within the chakra.\n\n**Indirect Vedha (Paroksha Vedha):** When a planet creates vedha through specific geometric relationships defined within the chakra structure.\n\n**Multiple Vedha:** When several planets simultaneously create vedha on the same sensitive point, amplifying the effect proportionally.\n\nThe benefic or malefic nature of the vedha-creating planet determines whether the influence is supportive or challenging. Jupiter and Venus creating vedha with auspicious points generally indicates blessings and opportunities, while Saturn and Mars can indicate delays, obstacles, or health concerns.\n\nMastering vedha analysis requires both technical precision and intuitive understanding — it is where the science and art of SBC astrology beautifully converge.`,
    status: 'published', icon: '🌟'
  },
  {
    id: 4, title: "Muhurta and SBC: Choosing Auspicious Timings",
    category: "Muhurta", date: "10 June 2025",
    excerpt: "How the Sarvatobhadra Chakra is used in Muhurta (electional astrology) to identify the most auspicious moments for important endeavors.",
    content: `Muhurta — the science of electional astrology — finds one of its most powerful expressions through the Sarvatobhadra Chakra. While conventional muhurta analysis considers the tithi, vara, nakshatra, yoga, and karana, the SBC adds an additional layer of precision by mapping the entire celestial environment at the chosen moment.\n\nFor important life events such as marriage, business inauguration, travel, surgery, or property purchase, consulting the SBC can reveal whether the cosmic environment is genuinely supportive or whether hidden afflictions might undermine the endeavor.\n\nThe classical texts recommend that for an auspicious muhurta, the SBC should show no significant vedha on the janma nakshatra, janma rashi, and the relevant house significators. Additionally, benefic planets should ideally be creating positive vedha on these sensitive points.\n\nIn practice, finding a perfect muhurta requires balancing multiple factors, and the SBC often helps distinguish between two seemingly similar "good" muhurtas by revealing which one has fewer subtle afflictions and greater underlying support.`,
    status: 'draft', icon: '🕐'
  },
  {
    id: 5, title: "Health Analysis Through the Sarvatobhadra Chakra",
    category: "Health", date: "18 June 2025",
    excerpt: "Traditional applications of SBC in health prediction — understanding body vulnerabilities, disease timing, and recovery periods.",
    content: `One of the most remarkable traditional applications of the Sarvatobhadra Chakra is in the analysis of health. Ancient Vedic physicians (vaidyas) who were also trained in astrology used the SBC as a diagnostic complement to understand the timing of diseases, identify vulnerable body parts, and predict periods of recovery.\n\nEach nakshatra in the SBC corresponds to specific body parts, and when malefic planets create vedha on these nakshatras — particularly when they align with the 6th, 8th, or 12th house significators — it can indicate periods of health vulnerability.\n\nThe classical Ashtavarga system, used in conjunction with SBC, helps assess the overall vitality and resilience of the native at any given time. High-strength benefic influences during vedha periods tend to mitigate health challenges, while combinations of multiple malefic vedhas can signal the need for extra preventive care.\n\nIt is important to note that SBC health analysis is meant to be a complementary tool that enhances awareness and preparedness, never replacing modern medical advice. The goal is to use this ancient wisdom to live more consciously and proactively.`,
    status: 'draft', icon: '🏥'
  },
  {
    id: 6, title: "SBC in Prashna: Answering Pressing Questions",
    category: "Prashna", date: "25 June 2025",
    excerpt: "How to use the Sarvatobhadra Chakra in Prashna (horary astrology) to answer specific questions with remarkable accuracy.",
    content: `Prashna Jyotisha — the astrology of questions — is an entire branch dedicated to answering specific queries based on the moment the question is asked. The Sarvatobhadra Chakra offers a uniquely powerful framework for prashna analysis.\n\nWhen a native approaches with a pressing question, the astrologer casts the SBC for that precise moment. The position of the Moon, the planets creating vedha, and the condition of relevant nakshatras and rashis all contribute to a nuanced answer.\n\nClassical prashna using SBC considers: the condition of the query-relevant house and its lord, whether benefics or malefics create vedha on the janma nakshatra of the questioner, the Moon's velocity and dignity, and special yogas visible in the moment's chakra.\n\nPractitioners report remarkable accuracy in prashna answers — from "will this business deal succeed?" to "will my health improve?" — when the SBC analysis is carefully applied. This branch of application makes the SBC not just a birth chart tool but a living, moment-by-moment oracle of the cosmic state.`,
    status: 'published', icon: '❓'
  }
];

const DEFAULT_VIDEOS = [
  { id: 1, title: "Introduction to Sarvatobhadra Chakra", youtubeId: "dQw4w9WgXcQ", duration: "32:15", views: "12.4K", status: 'published' },
  { id: 2, title: "Reading Vedhas in Your Birth Chart", youtubeId: "dQw4w9WgXcQ", duration: "45:08", views: "8.7K", status: 'published' },
  { id: 3, title: "Nakshatra Analysis — Part 1", youtubeId: "dQw4w9WgXcQ", duration: "28:42", views: "15.2K", status: 'published' },
  { id: 4, title: "Muhurta Selection Using SBC", youtubeId: "dQw4w9WgXcQ", duration: "38:55", views: "6.1K", status: 'published' },
  { id: 5, title: "Advanced Vedha Combinations", youtubeId: "dQw4w9WgXcQ", duration: "51:20", views: "9.3K", status: 'draft' },
  { id: 6, title: "Prashna Using Sarvatobhadra", youtubeId: "dQw4w9WgXcQ", duration: "44:10", views: "7.8K", status: 'published' }
];

const DEFAULT_BOOKINGS = [
  { id: 1, name: "Ramesh Sharma", type: "Birth Chart Analysis", date: "2025-06-18", time: "10:00 AM", status: "confirmed" },
  { id: 2, name: "Priya Nair", type: "Muhurta Consultation", date: "2025-06-19", time: "2:00 PM", status: "pending" },
  { id: 3, name: "Anil Kumar", type: "Prashna Session", date: "2025-06-20", time: "11:30 AM", status: "confirmed" },
  { id: 4, name: "Sunita Patel", type: "Annual Forecast", date: "2025-06-22", time: "4:00 PM", status: "pending" }
];

/* ══════════════════════════════════════════
   STORAGE HELPERS — saves to localStorage
   so content persists across refreshes
══════════════════════════════════════════ */
const Store = {
  get(key, fallback) {
    try {
      const val = localStorage.getItem('sbc_' + key);
      return val ? JSON.parse(val) : fallback;
    } catch(e) { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem('sbc_' + key, JSON.stringify(val)); } catch(e) {}
  },
  clear() {
    ['articles','videos','bookings'].forEach(k => localStorage.removeItem('sbc_' + k));
  }
};

/* ── State — loaded from localStorage, falls back to defaults ── */
const State = {
  currentPage: 'main',
  adminSection: 'dashboard',
  get articles() { return Store.get('articles', DEFAULT_ARTICLES); },
  set articles(v) { Store.set('articles', v); },
  get videos() { return Store.get('videos', DEFAULT_VIDEOS); },
  set videos(v) { Store.set('videos', v); },
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

/* ── Articles ── */
function initArticles() { renderArticles(); }

function renderArticles() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  const published = State.articles.filter(a => a.status === 'published');
  if (published.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);font-family:var(--font-elegant);font-style:italic;font-size:1.2rem">Articles will appear here once published via the Admin panel.</div>`;
    return;
  }
  grid.innerHTML = published.map(article => `
    <div class="article-card reveal" onclick="openArticle(${article.id})">
      <div class="article-thumb">${article.icon}</div>
      <div class="article-category">${article.category}</div>
      <h3>${article.title}</h3>
      <p>${article.excerpt}</p>
      <div class="article-meta">
        <span>${article.date}</span>
        <span class="read-more">Read Article →</span>
      </div>
    </div>
  `).join('');
  initScrollReveal();
}

function openArticle(id) {
  const article = State.articles.find(a => a.id === id);
  if (!article) return;
  const modal = document.getElementById('article-modal');
  document.getElementById('modal-title').textContent = article.title;
  document.getElementById('modal-meta').textContent = `${article.category}  •  ${article.date}`;
  document.getElementById('modal-body').innerHTML = article.content.split('\n\n').map(p =>
    p.startsWith('**') ? `<h4 style="color:var(--gold-light);margin:20px 0 8px;font-family:var(--font-heading)">${p.replace(/\*\*/g,'')}</h4>` : `<p>${p}</p>`
  ).join('');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeArticle() {
  document.getElementById('article-modal').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Videos ── */
function initVideos() { renderVideos(); }

function renderVideos() {
  const grid = document.getElementById('videos-grid');
  if (!grid) return;
  const published = State.videos.filter(v => v.status === 'published');
  if (published.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);font-family:var(--font-elegant);font-style:italic;font-size:1.2rem">Videos will appear here once published via the Admin panel.</div>`;
    return;
  }
  grid.innerHTML = published.map(video => `
    <div class="video-card reveal" onclick="openVideo('${video.youtubeId}')">
      <div class="video-thumb">
        <img src="https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg" alt="${video.title}" onerror="this.style.display='none'">
        <div class="play-overlay">
          <div class="play-btn-circle">▶</div>
        </div>
      </div>
      <div class="video-info">
        <h4>${video.title}</h4>
        <span>${video.duration} • ${video.views} views</span>
      </div>
    </div>
  `).join('');
  initScrollReveal();
}

function openVideo(youtubeId) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
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
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:24px">Loading...</td></tr>`;
  try {
    const articles = await getAdminArticles();
    if (!articles.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:24px">No articles yet. Use "Add Article" to create your first one.</td></tr>`;
      return;
    }
    const fmt = d => d ? new Date(d).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}) : '';
    tbody.innerHTML = articles.map(a => `
      <tr>
        <td>${a.title}</td>
        <td>${a.category}</td>
        <td>${fmt(a.created_at)}</td>
        <td><span class="badge badge-${a.status}">${a.status}</span></td>
        <td>
          <button class="btn-sm btn-edit" onclick="toggleStatus(${a.id},'article')">${a.status === 'published' ? 'Unpublish' : 'Publish'}</button>
          <button class="btn-sm btn-delete" onclick="deleteArticle(${a.id})">Delete</button>
        </td>
      </tr>`).join('');
  } catch(e) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#f87171;padding:24px">Could not load from API. Check connection.</td></tr>`;
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

/* ── Reset to defaults (emergency) ── */
function resetToDefaults() {
  if (confirm('This will delete ALL your custom articles, videos, and bookings and restore the original demo content. Are you sure?')) {
    Store.clear();
    renderAdminArticles(); renderAdminVideos(); renderAdminBookings();
    renderArticles(); renderVideos();
    renderAdminDashboard();
    showToast('↩️ Reset to default content.');
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
