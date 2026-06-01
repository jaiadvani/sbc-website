// ============================================================
//  SARVATOBHADRA CHAKRA — Data Layer
//  Fetches from live API, falls back to hardcoded data
// ============================================================

const API_URL = 'http://y2hewqyikxpxfrml3rsk5i28.72.62.228.4.sslip.io';

// ── Fetch articles from API ──
async function getArticlesFromAPI() {
  const res = await fetch(`${API_URL}/api/articles`);
  const json = await res.json();
  if (!json.success) throw new Error('API error');
  return json.data.map(a => ({
    ...a,
    readTime: a.read_time,
    tags: a.tags ? a.tags.split(',').map(t => t.trim()) : [],
    icon: categoryIcon(a.category),
    status: a.status
  }));
}

// ── Fetch videos from API ──
async function getVideosFromAPI() {
  const res = await fetch(`${API_URL}/api/videos`);
  const json = await res.json();
  if (!json.success) throw new Error('API error');
  return json.data.map(v => ({
    ...v,
    youtubeId: v.youtube_id,
    status: v.status
  }));
}

// ── Fetch single article ──
async function getArticleByIdFromAPI(id) {
  const res = await fetch(`${API_URL}/api/articles/${id}`);
  const json = await res.json();
  if (!json.success) throw new Error('Article not found');
  const a = json.data;
  return {
    ...a,
    readTime: a.read_time,
    tags: a.tags ? a.tags.split(',').map(t => t.trim()) : [],
    icon: categoryIcon(a.category)
  };
}

// ── Admin: fetch all (including drafts) ──
async function getAdminArticles() {
  const res = await fetch(`${API_URL}/api/admin/articles`);
  const json = await res.json();
  if (!json.success) throw new Error('API error');
  return json.data;
}

async function getAdminVideos() {
  const res = await fetch(`${API_URL}/api/admin/videos`);
  const json = await res.json();
  if (!json.success) throw new Error('API error');
  return json.data;
}

// ── Admin: save article ──
async function saveArticleToAPI(article) {
  const res = await fetch(`${API_URL}/api/admin/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Save failed');
  return json.data;
}

// ── Admin: save video ──
async function saveVideoToAPI(video) {
  const res = await fetch(`${API_URL}/api/admin/videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(video)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Save failed');
  return json.data;
}

// ── Admin: toggle status ──
async function toggleArticleStatus(id) {
  const res = await fetch(`${API_URL}/api/admin/articles/${id}/toggle`, { method: 'PATCH' });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

async function toggleVideoStatus(id) {
  const res = await fetch(`${API_URL}/api/admin/videos/${id}/toggle`, { method: 'PATCH' });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// ── Admin: delete ──
async function deleteArticleFromAPI(id) {
  const res = await fetch(`${API_URL}/api/admin/articles/${id}`, { method: 'DELETE' });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return true;
}

async function deleteVideoFromAPI(id) {
  const res = await fetch(`${API_URL}/api/admin/videos/${id}`, { method: 'DELETE' });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return true;
}

// ── Category icon helper ──
function categoryIcon(category) {
  const icons = {
    'Learn SBC': '🔯',
    'Life Applications': '🌿',
    'Case Studies': '👑'
  };
  return icons[category] || '🔯';
}

// ── Fallback data (used if API is unreachable) ──
const FALLBACK_ARTICLES = [
  {
    id: 1, title: "Understanding the Sarvatobhadra Chakra: An Introduction",
    category: "Learn SBC", excerpt: "The Sarvatobhadra Chakra is one of the most profound and versatile tools in Vedic astrology.",
    content: "The Sarvatobhadra Chakra (SBC) is one of the most revered and intricate tools in the tradition of Vedic astrology.",
    tags: ["SBC", "Introduction"], readTime: "8 min read", status: "published", icon: "🔯",
    slug: "understanding-the-sarvatobhadra-chakra-an-introduction",
    created_at: new Date().toISOString()
  }
];

const FALLBACK_VIDEOS = [
  { id: 1, title: "Introduction to Sarvatobhadra Chakra", youtubeId: "dQw4w9WgXcQ", youtube_id: "dQw4w9WgXcQ", duration: "32:15", views: "12.4K", category: "Learn SBC", description: "A comprehensive introduction.", status: "published" }
];

// ── Public getters with fallback ──
async function getArticles() {
  try { return await getArticlesFromAPI(); }
  catch(e) { console.warn('API unavailable, using fallback'); return FALLBACK_ARTICLES; }
}

async function getVideos() {
  try { return await getVideosFromAPI(); }
  catch(e) { console.warn('API unavailable, using fallback'); return FALLBACK_VIDEOS; }
}

async function getArticleById(id) {
  try { return await getArticleByIdFromAPI(id); }
  catch(e) { return FALLBACK_ARTICLES.find(a => a.id === parseInt(id)) || null; }
}
