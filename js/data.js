// ============================================================
//  SARVATOBHADRA CHAKRA — Data Layer v3
//  Fetches from live API with robust fallback
// ============================================================

const API_URL = 'https://api.sarvatobhadrachakra.org';

// ── Category icon helper ──
function categoryIcon(category) {
  const icons = { 'Learn SBC':'🔯', 'Life Applications':'🌿', 'Case Studies':'👑' };
  return icons[category] || '🔯';
}

// ── Safe fetch wrapper ──
async function apiFetch(path, options = {}) {
  const res = await fetch(API_URL + path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'API error');
  return json;
}

// ── Map API article to site format ──
function mapArticle(a) {
  return {
    ...a,
    readTime: a.read_time || '5 min read',
    tags: a.tags ? a.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    icon: categoryIcon(a.category),
    date: a.created_at ? new Date(a.created_at).toLocaleDateString('en-GB', {day:'numeric',month:'short',year:'numeric'}) : ''
  };
}

// ── Map API video to site format ──
function mapVideo(v) {
  return { ...v, youtubeId: v.youtube_id };
}

// ══════════════════════════════════
//  PUBLIC API — used by all pages
// ══════════════════════════════════

async function getArticles() {
  try {
    const json = await apiFetch('/api/articles');
    return json.data.map(mapArticle);
  } catch(e) {
    console.warn('API unavailable, using fallback:', e.message);
    return FALLBACK_ARTICLES;
  }
}

async function getVideos() {
  try {
    const json = await apiFetch('/api/videos');
    return json.data.map(mapVideo);
  } catch(e) {
    console.warn('API unavailable, using fallback:', e.message);
    return FALLBACK_VIDEOS;
  }
}

async function getArticleById(id) {
  try {
    const json = await apiFetch(`/api/articles/${id}`);
    return mapArticle(json.data);
  } catch(e) {
    console.warn('Article fetch failed:', e.message);
    return FALLBACK_ARTICLES.find(a => a.id === parseInt(id)) || null;
  }
}

async function getArticleBySlug(slug) {
  // If slug is numeric, treat as ID
  if (/^\d+$/.test(slug)) return getArticleById(parseInt(slug));
  try {
    const json = await apiFetch(`/api/articles/slug/${encodeURIComponent(slug)}`);
    return mapArticle(json.data);
  } catch(e) {
    // Fallback: search in fallback articles
    console.warn('Slug fetch failed:', e.message);
    return FALLBACK_ARTICLES.find(a => a.slug === slug) || null;
  }
}

// ══════════════════════════════════
//  ADMIN API
// ══════════════════════════════════

async function getAdminArticles() {
  const json = await apiFetch('/api/admin/articles');
  return json.data;
}

async function getAdminVideos() {
  const json = await apiFetch('/api/admin/videos');
  return json.data;
}

async function saveArticleToAPI(article) {
  const json = await apiFetch('/api/admin/articles', {
    method: 'POST',
    body: JSON.stringify(article)
  });
  return json.data;
}

async function saveVideoToAPI(video) {
  const json = await apiFetch('/api/admin/videos', {
    method: 'POST',
    body: JSON.stringify(video)
  });
  return json.data;
}

async function toggleArticleStatus(id) {
  const json = await apiFetch(`/api/admin/articles/${id}/toggle`, { method: 'PATCH' });
  return json.data;
}

async function toggleVideoStatus(id) {
  const json = await apiFetch(`/api/admin/videos/${id}/toggle`, { method: 'PATCH' });
  return json.data;
}

async function deleteArticleFromAPI(id) {
  await apiFetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
  return true;
}

async function deleteVideoFromAPI(id) {
  await apiFetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
  return true;
}

// ══════════════════════════════════
//  FALLBACK DATA (shown if API down)
// ══════════════════════════════════
const FALLBACK_ARTICLES = [
  {
    id: 1,
    title: "Understanding the Sarvatobhadra Chakra: An Introduction",
    category: "Learn SBC",
    excerpt: "The Sarvatobhadra Chakra is one of the most profound and versatile tools in Vedic astrology, offering insights across multiple dimensions of life.",
    content: `The Sarvatobhadra Chakra (SBC) is one of the most revered and intricate tools in the tradition of Vedic astrology. Its name means "auspicious in all directions."\n\n## What is the SBC?\n\nThe SBC is a unique 9×9 matrix that integrates nakshatras, Sanskrit aksharas, weekdays and zodiac signs into a unified cosmological grid.\n\n## How it Works\n\nThe central mechanism is vedha — the piercing of sensitive points by transiting planets — which reveals both supportive and challenging cosmic influences.`,
    tags: ['SBC', 'Introduction', 'Vedic Astrology'],
    readTime: '8 min read',
    icon: '🔯',
    status: 'published',
    date: '1 Jun 2025',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Vedha: The Art of Piercing",
    category: "Learn SBC",
    excerpt: "Vedha is the central mechanism of the Sarvatobhadra Chakra. Learn how to identify, interpret and apply vedha analysis.",
    content: `Vedha means "to pierce" — the core operational principle of the SBC.\n\n## Types of Vedha\n\n### Direct Vedha\nWhen a planet directly transits over a sensitive nakshatra.\n\n### Indirect Vedha\nWhen vedha occurs through geometric relationships.\n\n## Interpreting Vedha\n\nBenefic planets create supportive influences; malefics create challenges.`,
    tags: ['Vedha', 'Techniques', 'Transits'],
    readTime: '10 min read',
    icon: '⚡',
    status: 'published',
    date: '5 Jun 2025',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Muhurta and SBC: Choosing Auspicious Timings",
    category: "Life Applications",
    excerpt: "How the Sarvatobhadra Chakra is used in Muhurta to identify the most auspicious moments for important endeavors.",
    content: `Muhurta — the science of electional astrology — finds powerful expression through the SBC.\n\n## Why Use SBC for Muhurta?\n\nFor marriage, business, travel or surgery, the SBC reveals whether the cosmic environment is genuinely supportive.\n\n## The Five Tithis\n\nNanda, Bhadra, Jaya, Rikta and Poorna each have specific applications in muhurta selection.`,
    tags: ['Muhurta', 'Timing', 'Marriage', 'Business'],
    readTime: '9 min read',
    icon: '🌿',
    status: 'published',
    date: '10 Jun 2025',
    created_at: new Date().toISOString()
  }
];

const FALLBACK_VIDEOS = [
  { id: 1, title: "Introduction to Sarvatobhadra Chakra", youtube_id: "dQw4w9WgXcQ", youtubeId: "dQw4w9WgXcQ", duration: "32:15", views: "12.4K", category: "Learn SBC", description: "A comprehensive introduction to the SBC.", status: "published" },
  { id: 2, title: "Reading Vedhas in Your Birth Chart", youtube_id: "dQw4w9WgXcQ", youtubeId: "dQw4w9WgXcQ", duration: "45:08", views: "8.7K", category: "Learn SBC", description: "Step-by-step vedha analysis guide.", status: "published" },
  { id: 3, title: "Muhurta Selection Using SBC", youtube_id: "dQw4w9WgXcQ", youtubeId: "dQw4w9WgXcQ", duration: "38:55", views: "6.1K", category: "Life Applications", description: "Selecting auspicious timings using the SBC.", status: "published" }
];
