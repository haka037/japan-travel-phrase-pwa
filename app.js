const STORAGE_KEYS = {
  favorites: "jpTravelPhraseFavorites.v1",
  recent: "jpTravelPhraseRecent.v1",
  settings: "jpTravelPhraseSettings.v1",
};

const QUICK_PHRASES = [
  "화장실은 어디에 있나요?",
  "감사합니다.",
  "죄송합니다.",
  "일본어를 잘 못합니다.",
  "카드로 결제할 수 있나요?",
  "이것은 얼마예요?",
  "도와주세요.",
  "길을 잃었습니다.",
  "병원에 가고 싶습니다.",
  "약국은 어디에 있나요?",
  "여권을 잃어버렸습니다.",
  "와이파이 비밀번호를 알려 주세요.",
  "충전할 수 있나요?",
  "이 주소로 가 주세요.",
];

const SEARCH_SUGGESTIONS = [
  "화장실",
  "카드 돼요",
  "덜 맵게",
  "예약",
  "공항",
  "약국",
  "알레르기",
  "영수증",
  "사진",
  "충전",
  "와이파이",
  "여권",
  "병원",
  "물 주세요",
];

const QUERY_ALIASES = new Map([
  ["되요", "돼요"],
  ["도와줘", "도와주세요"],
  ["도와 줘", "도와주세요"],
  ["살려", "도와주세요"],
  ["비번", "비밀번호"],
  ["패스워드", "비밀번호"],
  ["알러지", "알레르기"],
  ["알러지가", "알레르기가"],
  ["맵지", "덜 맵게"],
  ["안맵게", "맵지 않게"],
  ["덜맵게", "덜 맵게"],
  ["토이레", "화장실"],
  ["화장실어디", "화장실 어디"],
  ["카드되나요", "카드 결제"],
  ["카드돼요", "카드 결제"],
  ["택스프리", "면세"],
  ["폰", "휴대폰"],
  ["핸드폰", "휴대폰"],
  ["밥집", "식당"],
  ["전철", "지하철"],
  ["지하철역", "역"],
  ["경찰", "경찰 파출소"],
  ["코반", "파출소"],
  ["아리가또", "감사합니다"],
]);

const state = {
  data: null,
  phrases: [],
  categories: [],
  phraseById: new Map(),
  query: "",
  selectedCategory: "",
  view: "home",
  favorites: new Set(readJSON(STORAGE_KEYS.favorites, [])),
  recent: readJSON(STORAGE_KEYS.recent, []),
  settings: {
    rate: 1,
    fontScale: 1,
    dark: false,
    ...readJSON(STORAGE_KEYS.settings, {}),
  },
  voices: [],
};

const els = {
  offlineBadge: document.querySelector("#offlineBadge"),
  phraseCount: document.querySelector("#phraseCount"),
  searchInput: document.querySelector("#searchInput"),
  clearSearchButton: document.querySelector("#clearSearchButton"),
  suggestionRail: document.querySelector("#suggestionRail"),
  quickPhrases: document.querySelector("#quickPhrases"),
  categoryGrid: document.querySelector("#categoryGrid"),
  phraseList: document.querySelector("#phraseList"),
  resultsKicker: document.querySelector("#resultsKicker"),
  resultsTitle: document.querySelector("#resultsTitle"),
  emptyState: document.querySelector("#emptyState"),
  clearFilterButton: document.querySelector("#clearFilterButton"),
  allCategoriesButton: document.querySelector("#allCategoriesButton"),
  favoritePreview: document.querySelector("#favoritePreview"),
  recentPreview: document.querySelector("#recentPreview"),
  settingsSection: document.querySelector("#settingsSection"),
  quickSection: document.querySelector("#quickSection"),
  categorySection: document.querySelector("#categorySection"),
  savedSection: document.querySelector("#savedSection"),
  resultsSection: document.querySelector("#resultsSection"),
  rateSelect: document.querySelector("#rateSelect"),
  fontScaleSelect: document.querySelector("#fontScaleSelect"),
  darkModeToggle: document.querySelector("#darkModeToggle"),
  resetDataButton: document.querySelector("#resetDataButton"),
  detailDialog: document.querySelector("#detailDialog"),
  detailContent: document.querySelector("#detailContent"),
  showDialog: document.querySelector("#showDialog"),
  showContent: document.querySelector("#showContent"),
  toast: document.querySelector("#toast"),
};

boot();

async function boot() {
  applySettings();
  bindEvents();
  registerServiceWorker();
  renderSuggestions();
  updateOnlineStatus();
  refreshVoices();

  try {
    const response = await fetch("./phrases.json");
    if (!response.ok) throw new Error(`phrases.json ${response.status}`);
    state.data = await response.json();
    state.phrases = state.data.phrases;
    state.categories = state.data.categories;
    state.phraseById = new Map(state.phrases.map((phrase) => [phrase.id, phrase]));
    hydrateRecentAndFavorites();
    render();
  } catch (error) {
    els.phraseList.innerHTML = `
      <div class="empty-state">
        <strong>문장 데이터를 열지 못했습니다.</strong>
        <span>처음 설치할 때 인터넷 연결 상태에서 한 번 실행한 뒤 다시 열어 주세요.</span>
      </div>
    `;
    showToast("문장 데이터를 불러오지 못했습니다.");
    console.error(error);
  }
}

function bindEvents() {
  els.searchInput.addEventListener("input", () => {
    state.query = els.searchInput.value;
    if (state.view === "settings") state.view = "home";
    render();
  });

  els.clearSearchButton.addEventListener("click", () => {
    state.query = "";
    els.searchInput.value = "";
    els.searchInput.focus();
    render();
  });

  els.suggestionRail.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-query]");
    if (!button) return;
    state.query = button.dataset.query;
    els.searchInput.value = state.query;
    state.view = "home";
    render();
    document.querySelector("#resultsSection")?.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  els.quickPhrases.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (!button) return;
    const phrase = getPhrase(button.dataset.id);
    if (phrase) openShow(phrase);
  });

  els.categoryGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;
    state.selectedCategory = button.dataset.category;
    state.view = "home";
    render();
    document.querySelector("#resultsSection")?.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  els.allCategoriesButton.addEventListener("click", () => {
    state.selectedCategory = "";
    state.view = "home";
    render();
  });

  els.clearFilterButton.addEventListener("click", () => {
    state.selectedCategory = "";
    render();
  });

  els.phraseList.addEventListener("click", handlePhraseListClick);
  els.favoritePreview.addEventListener("click", handleMiniListClick);
  els.recentPreview.addEventListener("click", handleMiniListClick);

  document.querySelector(".bottom-nav").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-view]");
    if (!button) return;
    state.view = button.dataset.view;
    if (state.view !== "home") {
      state.selectedCategory = "";
      state.query = "";
      els.searchInput.value = "";
    }
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  els.rateSelect.addEventListener("change", () => {
    state.settings.rate = Number(els.rateSelect.value);
    saveSettings();
  });

  els.fontScaleSelect.addEventListener("change", () => {
    state.settings.fontScale = Number(els.fontScaleSelect.value);
    saveSettings();
    applySettings();
  });

  els.darkModeToggle.addEventListener("change", () => {
    state.settings.dark = els.darkModeToggle.checked;
    saveSettings();
    applySettings();
  });

  els.resetDataButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.favorites);
    localStorage.removeItem(STORAGE_KEYS.recent);
    state.favorites = new Set();
    state.recent = [];
    render();
    showToast("즐겨찾기와 최근 사용을 초기화했습니다.");
  });

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateOnlineStatus();
  });
}

function handlePhraseListClick(event) {
  const button = event.target.closest("button[data-action]");
  const card = event.target.closest("[data-id]");
  const id = button?.dataset.id || card?.dataset.id;
  const phrase = getPhrase(id);
  if (!phrase) return;

  if (!button) {
    openDetail(phrase);
    return;
  }

  runPhraseAction(button.dataset.action, phrase);
}

function handleMiniListClick(event) {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  const phrase = getPhrase(button.dataset.id);
  if (phrase) openDetail(phrase);
}

function runPhraseAction(action, phrase) {
  if (action === "speak") speak(phrase);
  if (action === "slow") speak(phrase, 0.75);
  if (action === "repeat") speak(phrase, state.settings.rate, true);
  if (action === "show") openShow(phrase);
  if (action === "favorite") toggleFavorite(phrase);
  if (action === "copy") copyPhrase(phrase);
  if (action === "detail") openDetail(phrase);
}

function render() {
  if (!state.phrases.length) return;

  els.phraseCount.textContent = `${state.phrases.length.toLocaleString("ko-KR")}문장`;
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.view);
  });

  renderQuickPhrases();
  renderCategories();
  renderSavedPreviews();
  renderSettings();
  renderMainSections();
  renderPhraseResults();
}

function renderMainSections() {
  const settings = state.view === "settings";
  els.settingsSection.classList.toggle("hidden", !settings);
  els.quickSection.classList.toggle("hidden", settings || state.view === "favorites" || state.view === "recent");
  els.categorySection.classList.toggle("hidden", settings || state.view === "favorites" || state.view === "recent");
  els.savedSection.classList.toggle("hidden", settings || state.view === "favorites" || state.view === "recent");
  els.resultsSection.classList.toggle("hidden", settings);
}

function renderSuggestions() {
  els.suggestionRail.innerHTML = SEARCH_SUGGESTIONS.map((query) => (
    `<button class="suggestion-chip" type="button" data-query="${escapeAttr(query)}">${escapeHTML(query)}</button>`
  )).join("");
}

function renderQuickPhrases() {
  const quick = QUICK_PHRASES
    .map((ko) => state.phrases.find((phrase) => phrase.ko === ko) || searchPhrases(ko, state.phrases)[0])
    .filter(Boolean);

  els.quickPhrases.innerHTML = quick.map((phrase) => {
    const emergency = ["도와주세요.", "길을 잃었습니다.", "병원에 가고 싶습니다.", "여권을 잃어버렸습니다."].includes(phrase.ko);
    return `
      <button class="quick-button ${emergency ? "emergency" : ""}" type="button" data-id="${phrase.id}">
        <strong>${escapeHTML(phrase.ko)}</strong>
        <span>${escapeHTML(phrase.ja)}</span>
      </button>
    `;
  }).join("");
}

function renderCategories() {
  const counts = new Map();
  for (const phrase of state.phrases) counts.set(phrase.category, (counts.get(phrase.category) || 0) + 1);
  els.categoryGrid.innerHTML = state.categories.map((category) => `
    <button class="category-button ${state.selectedCategory === category ? "active" : ""}" type="button" data-category="${escapeAttr(category)}">
      <strong>${escapeHTML(category)}</strong>
      <span>${counts.get(category) || 0}개 문장</span>
    </button>
  `).join("");
}

function renderPhraseResults() {
  let title = "여행 중 바로 쓰기";
  let kicker = "추천";
  let phrases = [];

  if (state.view === "favorites") {
    title = "즐겨찾기";
    kicker = "저장됨";
    phrases = [...state.favorites].map(getPhrase).filter(Boolean);
  } else if (state.view === "recent") {
    title = "최근 사용";
    kicker = "다시 쓰기";
    phrases = state.recent.map(getPhrase).filter(Boolean);
  } else if (state.query.trim()) {
    title = `"${state.query.trim()}" 검색 결과`;
    kicker = state.selectedCategory || "검색";
    phrases = searchPhrases(state.query, filteredByCategory());
  } else if (state.selectedCategory) {
    title = state.selectedCategory;
    kicker = "카테고리";
    phrases = filteredByCategory()
      .slice()
      .sort((a, b) => b.priority - a.priority || a.ko.localeCompare(b.ko, "ko"));
  } else {
    phrases = state.phrases
      .filter((phrase) => phrase.priority >= 5)
      .sort((a, b) => categoryWeight(a.category) - categoryWeight(b.category) || b.priority - a.priority)
      .slice(0, 36);
  }

  els.resultsTitle.textContent = title;
  els.resultsKicker.textContent = kicker;
  els.clearFilterButton.classList.toggle("hidden", !state.selectedCategory);

  if (!phrases.length) {
    els.emptyState.classList.remove("hidden");
    const fallback = QUICK_PHRASES.slice(0, 8)
      .map((ko) => state.phrases.find((phrase) => phrase.ko === ko))
      .filter(Boolean);
    els.phraseList.innerHTML = fallback.map(renderPhraseCard).join("");
    return;
  }

  els.emptyState.classList.add("hidden");
  els.phraseList.innerHTML = phrases.slice(0, 80).map(renderPhraseCard).join("");
}

function renderPhraseCard(phrase) {
  const saved = state.favorites.has(phrase.id);
  return `
    <article class="phrase-card" data-id="${phrase.id}">
      <header>
        <span class="category-pill">${escapeHTML(phrase.category)}</span>
        <button class="tool-button ${saved ? "saved" : ""}" type="button" data-action="favorite" data-id="${phrase.id}" aria-label="즐겨찾기">
          <span aria-hidden="true">${saved ? "★" : "☆"}</span>
        </button>
      </header>
      <div class="phrase-ko">${escapeHTML(phrase.ko)}</div>
      <div class="phrase-ja" lang="ja">${escapeHTML(phrase.ja)}</div>
      <div class="phrase-pronunciation">${escapeHTML(phrase.pronunciation)}</div>
      <div class="phrase-note">${escapeHTML(phrase.note || "")}</div>
      <div class="card-actions">
        <button class="tool-button primary" type="button" data-action="speak" data-id="${phrase.id}"><span aria-hidden="true">▶</span><span>재생</span></button>
        <button class="tool-button accent" type="button" data-action="show" data-id="${phrase.id}"><span aria-hidden="true">⛶</span><span>크게</span></button>
        <button class="tool-button" type="button" data-action="copy" data-id="${phrase.id}"><span aria-hidden="true">⧉</span><span>복사</span></button>
        <button class="tool-button" type="button" data-action="detail" data-id="${phrase.id}"><span aria-hidden="true">i</span><span>상세</span></button>
      </div>
    </article>
  `;
}

function renderSavedPreviews() {
  const favorites = [...state.favorites].map(getPhrase).filter(Boolean).slice(0, 5);
  const recent = state.recent.map(getPhrase).filter(Boolean).slice(0, 5);
  els.favoritePreview.innerHTML = favorites.length ? favorites.map(renderMiniRow).join("") : `<div class="mini-empty">별표를 누르면 여기에 저장됩니다.</div>`;
  els.recentPreview.innerHTML = recent.length ? recent.map(renderMiniRow).join("") : `<div class="mini-empty">재생하거나 크게 본 문장이 여기에 남습니다.</div>`;
}

function renderMiniRow(phrase) {
  return `
    <button class="mini-row" type="button" data-id="${phrase.id}">
      <strong>${escapeHTML(phrase.ko)}</strong>
      <span>${escapeHTML(phrase.ja)}</span>
    </button>
  `;
}

function renderSettings() {
  els.rateSelect.value = String(state.settings.rate);
  els.fontScaleSelect.value = String(state.settings.fontScale);
  els.darkModeToggle.checked = Boolean(state.settings.dark);
}

function filteredByCategory() {
  if (!state.selectedCategory) return state.phrases;
  return state.phrases.filter((phrase) => phrase.category === state.selectedCategory);
}

function searchPhrases(query, pool) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const expanded = expandQuery(query);
  const queryTokens = tokenize(expanded.join(" "));
  const compactQueries = expanded.map(compact).filter(Boolean);

  return pool
    .map((phrase) => ({ phrase, score: scorePhrase(phrase, expanded, queryTokens, compactQueries) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.phrase.priority - a.phrase.priority || a.phrase.ko.localeCompare(b.phrase.ko, "ko"))
    .map((entry) => entry.phrase);
}

function scorePhrase(phrase, expandedQueries, queryTokens, compactQueries) {
  const fields = [
    phrase.ko,
    phrase.ja,
    phrase.pronunciation,
    phrase.category,
    phrase.note,
    ...phrase.tags,
    ...phrase.synonyms,
  ];
  const hay = normalize(fields.join(" "));
  const hayCompact = compact(fields.join(" "));
  let score = phrase.priority * 4;

  for (const query of expandedQueries) {
    const norm = normalize(query);
    const cQuery = compact(query);
    const phraseKoCompact = compact(phrase.ko);
    if (!norm) continue;
    if (normalize(phrase.ko) === norm) score += 140;
    if (normalize(phrase.ko).includes(norm)) score += 75;
    if (cQuery && phraseKoCompact === compact(`${norm} 주세요`)) score += 70;
    if (cQuery && phraseKoCompact === compact(`${norm}가 있습니다`)) score += 70;
    if (cQuery && phraseKoCompact === compact(`${norm}이 있습니다`)) score += 70;
    if (cQuery && phraseKoCompact === compact(`${norm}은 어디에 있나요`)) score += 48;
    if (cQuery && phraseKoCompact === compact(`${norm}는 어디에 있나요`)) score += 48;
    if (hay.includes(norm)) score += 48;
    if (cQuery && hayCompact.includes(cQuery)) score += 42;
    if (phrase.synonyms.some((synonym) => normalize(synonym).includes(norm) || normalize(norm).includes(normalize(synonym)))) score += 50;
    if (phrase.tags.some((tag) => normalize(tag).includes(norm) || norm.includes(normalize(tag)))) score += 30;
  }

  for (const token of queryTokens) {
    if (token.length < 2) continue;
    if (hay.includes(token)) score += 16;
    if (hayCompact.includes(token)) score += 11;
    for (const field of [phrase.ko, ...phrase.synonyms, ...phrase.tags]) {
      const fieldNorm = normalize(field);
      if (fieldNorm.startsWith(token)) score += 8;
      if (isCloseToken(token, fieldNorm)) score += 7;
    }
  }

  const bestSimilarity = Math.max(...compactQueries.map((query) => similarity(query, hayCompact)), 0);
  if (bestSimilarity > 0.55) score += Math.round(bestSimilarity * 18);

  return score;
}

function expandQuery(query) {
  const raw = query.trim();
  const normalized = normalize(raw);
  const compacted = compact(raw);
  const variants = new Set([raw, normalized, compacted]);

  for (const [from, to] of QUERY_ALIASES) {
    if (normalized.includes(normalize(from)) || compacted.includes(compact(from))) {
      variants.add(to);
      variants.add(raw.replace(from, to));
    }
  }

  if (normalized.includes("카드") && (normalized.includes("돼") || normalized.includes("되") || normalized.includes("가능"))) {
    variants.add("카드 결제");
  }
  if (normalized.includes("얼마")) variants.add("가격 총 얼마");
  if (normalized.includes("길") && normalized.includes("잃")) variants.add("길을 잃었습니다");
  if (normalized.includes("배") && normalized.includes("아파")) variants.add("배가 아픕니다");
  if (normalized.includes("머리") && normalized.includes("아파")) variants.add("머리가 아픕니다");
  if (normalized.includes("물") && normalized.includes("주세요")) variants.add("물 주세요");

  return [...variants].filter(Boolean);
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[“”‘’"'`~!@#$%^&*()[\]{}<>/\\|+=_:;,.?。！？、]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/([가-힣]{2,})(은|는|이|가|을|를|에|에서|으로|로|도|만|와|과|요)$/g, "$1");
}

function compact(value) {
  return normalize(value).replace(/\s+/g, "");
}

function tokenize(value) {
  return [...new Set(normalize(value).split(/\s+/).flatMap((token) => {
    const stripped = token.replace(/(은|는|이|가|을|를|에|에서|으로|로|도|만|와|과|요|습니다|해요|세요)$/g, "");
    return [token, stripped];
  }).filter((token) => token.length > 1))];
}

function isCloseToken(token, field) {
  if (token.length < 3 || field.length < 3) return false;
  if (field.includes(token.slice(0, -1))) return true;
  return false;
}

function similarity(a, b) {
  if (!a || !b) return 0;
  if (b.includes(a)) return 1;
  const gramsA = ngrams(a);
  const gramsB = ngrams(b);
  if (!gramsA.size || !gramsB.size) return 0;
  let hits = 0;
  for (const gram of gramsA) if (gramsB.has(gram)) hits += 1;
  return hits / Math.max(gramsA.size, gramsB.size);
}

function ngrams(value) {
  const size = value.length > 5 ? 3 : 2;
  const grams = new Set();
  for (let index = 0; index <= value.length - size; index += 1) grams.add(value.slice(index, index + size));
  return grams;
}

function categoryWeight(category) {
  const weights = {
    "경찰/도움 요청": 0,
    "병원/응급": 1,
    "문제상황/분실": 2,
    "화장실/생활": 3,
    "식당/카페": 4,
    "교통/지하철": 5,
    "택시": 6,
    "호텔/숙소": 7,
  };
  return weights[category] ?? 10;
}

function openDetail(phrase) {
  addRecent(phrase.id);
  const saved = state.favorites.has(phrase.id);
  els.detailContent.innerHTML = `
    <div class="detail-panel">
      <span class="category-pill">${escapeHTML(phrase.category)}</span>
      <div class="detail-ja" lang="ja">${escapeHTML(phrase.ja)}</div>
      <div class="detail-ko">${escapeHTML(phrase.ko)}</div>
      <div class="phrase-pronunciation">${escapeHTML(phrase.pronunciation)}</div>
      <div class="phrase-note">${escapeHTML(phrase.note || "")}</div>
      <div class="dialog-actions">
        <button class="tool-button primary" type="button" data-action="speak" data-id="${phrase.id}"><span aria-hidden="true">▶</span><span>보통</span></button>
        <button class="tool-button" type="button" data-action="slow" data-id="${phrase.id}"><span aria-hidden="true">◀</span><span>느리게</span></button>
        <button class="tool-button" type="button" data-action="repeat" data-id="${phrase.id}"><span aria-hidden="true">↺</span><span>반복</span></button>
        <button class="tool-button accent" type="button" data-action="show" data-id="${phrase.id}"><span aria-hidden="true">⛶</span><span>크게</span></button>
        <button class="tool-button" type="button" data-action="copy" data-id="${phrase.id}"><span aria-hidden="true">⧉</span><span>복사</span></button>
        <button class="tool-button ${saved ? "saved" : ""}" type="button" data-action="favorite" data-id="${phrase.id}"><span aria-hidden="true">${saved ? "★" : "☆"}</span><span>저장</span></button>
      </div>
    </div>
  `;
  els.detailContent.querySelector(".dialog-actions").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    runPhraseAction(button.dataset.action, phrase);
    if (button.dataset.action === "favorite") openDetail(phrase);
  });
  showDialog(els.detailDialog);
  renderSavedPreviews();
}

function openShow(phrase) {
  addRecent(phrase.id);
  if (els.detailDialog.open) els.detailDialog.close();
  els.showContent.innerHTML = `
    <div class="show-ja" lang="ja">${escapeHTML(phrase.ja)}</div>
    <div class="show-meta">
      <strong>${escapeHTML(phrase.ko)}</strong>
      <span>${escapeHTML(phrase.pronunciation)}</span>
      <div class="show-actions">
        <button class="tool-button primary" type="button" data-action="speak" data-id="${phrase.id}"><span aria-hidden="true">▶</span><span>재생</span></button>
        <button class="tool-button" type="button" data-action="repeat" data-id="${phrase.id}"><span aria-hidden="true">↺</span><span>반복</span></button>
      </div>
    </div>
  `;
  els.showContent.querySelector(".show-actions").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    runPhraseAction(button.dataset.action, phrase);
  });
  showDialog(els.showDialog);
  renderSavedPreviews();
}

function showDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    if (!dialog.open) dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function speak(phrase, rate = state.settings.rate, repeat = false) {
  addRecent(phrase.id);
  renderSavedPreviews();

  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    showToast("이 브라우저에서는 TTS를 지원하지 않습니다.");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(phrase.ja);
  utterance.lang = "ja-JP";
  utterance.rate = Number(rate) || 1;
  utterance.pitch = 1;
  const voice = state.voices.find((item) => item.lang?.toLowerCase().startsWith("ja"));
  if (voice) utterance.voice = voice;

  if (repeat) {
    let count = 0;
    utterance.onend = () => {
      count += 1;
      if (count < 2) {
        const next = new SpeechSynthesisUtterance(phrase.ja);
        next.lang = "ja-JP";
        next.rate = Number(rate) || 1;
        if (voice) next.voice = voice;
        window.speechSynthesis.speak(next);
      }
    };
  }

  window.speechSynthesis.speak(utterance);
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  state.voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    state.voices = window.speechSynthesis.getVoices();
  };
}

async function copyPhrase(phrase) {
  const text = `${phrase.ja}\n${phrase.pronunciation}\n${phrase.ko}`;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }
    addRecent(phrase.id);
    showToast("문장을 복사했습니다.");
  } catch {
    fallbackCopy(text);
    showToast("문장을 복사했습니다.");
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function toggleFavorite(phrase) {
  if (state.favorites.has(phrase.id)) {
    state.favorites.delete(phrase.id);
    showToast("즐겨찾기에서 제거했습니다.");
  } else {
    state.favorites.add(phrase.id);
    showToast("즐겨찾기에 저장했습니다.");
  }
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([...state.favorites]));
  render();
}

function addRecent(id) {
  state.recent = [id, ...state.recent.filter((item) => item !== id)].slice(0, 30);
  localStorage.setItem(STORAGE_KEYS.recent, JSON.stringify(state.recent));
}

function hydrateRecentAndFavorites() {
  state.favorites = new Set([...state.favorites].filter((id) => state.phraseById.has(id)));
  state.recent = state.recent.filter((id) => state.phraseById.has(id));
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([...state.favorites]));
  localStorage.setItem(STORAGE_KEYS.recent, JSON.stringify(state.recent));
}

function getPhrase(id) {
  return state.phraseById.get(id);
}

function applySettings() {
  document.documentElement.style.setProperty("--font-scale", state.settings.fontScale || 1);
  document.body.classList.toggle("dark", Boolean(state.settings.dark));
  const theme = state.settings.dark ? "#101613" : "#f7f8f5";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme);
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
}

function updateOnlineStatus() {
  const isOffline = navigator.onLine === false;
  els.offlineBadge.classList.toggle("offline", isOffline);
  if (isOffline) {
    els.offlineBadge.textContent = "오프라인";
    return;
  }
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(() => {
        els.offlineBadge.textContent = "오프라인 준비";
        els.offlineBadge.classList.add("ready");
      })
      .catch(() => {
        els.offlineBadge.textContent = "온라인";
      });
  } else {
    els.offlineBadge.textContent = "온라인";
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").then(updateOnlineStatus).catch(() => {
      els.offlineBadge.textContent = "캐시 확인 필요";
    });
  });
}

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.add("hidden"), 1800);
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHTML(value).replace(/`/g, "&#096;");
}
