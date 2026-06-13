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
  ["도왜", "도와주세요"],
  ["도와", "도와주세요"],
  ["도웨", "도와주세요"],
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

const COMPOSER_TERMS = [
  ["가장 가까운 역", "一番近い駅", "이치방 치카이 에키"],
  ["택시 승강장", "タクシー乗り場", "타쿠시 노리바"],
  ["버스 정류장", "バス停", "바스테이"],
  ["코인 락커", "コインロッカー", "코인 록카"],
  ["수하물 보관소", "荷物預かり所", "니모츠 아즈카리도코로"],
  ["관광 안내소", "観光案内所", "칸코 안나이쇼"],
  ["화장실", "トイレ", "토이레"],
  ["지하철역", "地下鉄の駅", "치카테츠노 에키"],
  ["매표소", "チケット売り場", "치켓토 우리바"],
  ["편의점", "コンビニ", "콘비니"],
  ["약국", "薬局", "약쿄쿠"],
  ["병원", "病院", "뵤인"],
  ["경찰서", "警察署", "케이사츠쇼"],
  ["파출소", "交番", "코반"],
  ["환전소", "両替所", "료가에쇼"],
  ["쓰레기통", "ゴミ箱", "고미바코"],
  ["출구", "出口", "데구치"],
  ["입구", "入口", "이리구치"],
  ["공항", "空港", "쿠코"],
  ["하네다 공항", "羽田空港", "하네다 쿠코"],
  ["나리타 공항", "成田空港", "나리타 쿠코"],
  ["간사이 공항", "関西空港", "칸사이 쿠코"],
  ["도쿄역", "東京駅", "도쿄 에키"],
  ["신주쿠역", "新宿駅", "신주쿠 에키"],
  ["시부야역", "渋谷駅", "시부야 에키"],
  ["교토역", "京都駅", "교토 에키"],
  ["오사카역", "大阪駅", "오사카 에키"],
  ["난바역", "なんば駅", "난바 에키"],
  ["호텔", "ホテル", "호테루"],
  ["숙소", "宿泊先", "슈쿠하쿠사키"],
  ["이 주소", "この住所", "코노 주소"],
  ["여기", "ここ", "코코"],
  ["물", "お水", "오미즈"],
  ["따뜻한 물", "お湯", "오유"],
  ["얼음물", "氷水", "코오리미즈"],
  ["맥주", "ビール", "비루"],
  ["커피", "コーヒー", "코히"],
  ["아이스커피", "アイスコーヒー", "아이스 코히"],
  ["메뉴판", "メニュー", "메뉴"],
  ["계산서", "伝票", "덴표"],
  ["영수증", "レシート", "레시토"],
  ["젓가락", "お箸", "오하시"],
  ["숟가락", "スプーン", "스푼"],
  ["포크", "フォーク", "포쿠"],
  ["앞접시", "取り皿", "토리자라"],
  ["봉투", "袋", "후쿠로"],
  ["우산", "傘", "카사"],
  ["마스크", "マスク", "마스크"],
  ["휴지", "ティッシュ", "팃슈"],
  ["충전기", "充電器", "주덴키"],
  ["충전 케이블", "充電ケーブル", "주덴 케부루"],
  ["보조배터리", "モバイルバッテリー", "모바이루 밧테리"],
  ["유심 카드", "SIMカード", "심 카도"],
  ["교통카드", "交通系ICカード", "코츠케이 아이시 카도"],
  ["감기약", "風邪薬", "카제구스리"],
  ["두통약", "頭痛薬", "즈츠구스리"],
  ["진통제", "痛み止め", "이타미도메"],
  ["소화제", "胃薬", "이구스리"],
  ["알레르기약", "アレルギーの薬", "아레루기노 쿠스리"],
  ["돼지고기", "豚肉", "부타니쿠"],
  ["소고기", "牛肉", "규니쿠"],
  ["닭고기", "鶏肉", "토리니쿠"],
  ["해산물", "魚介類", "교카이루이"],
  ["새우", "エビ", "에비"],
  ["게", "カニ", "카니"],
  ["오징어", "イカ", "이카"],
  ["생선", "魚", "사카나"],
  ["조개", "貝", "카이"],
  ["달걀", "卵", "타마고"],
  ["우유", "牛乳", "규뉴"],
  ["밀가루", "小麦", "코무기"],
  ["메밀", "そば", "소바"],
  ["땅콩", "ピーナッツ", "피나츠"],
  ["견과류", "ナッツ", "낫츠"],
  ["고수", "パクチー", "파쿠치"],
  ["술", "アルコール", "아루코루"],
  ["머리", "頭", "아타마"],
  ["배", "お腹", "오나카"],
  ["목", "喉", "노도"],
  ["허리", "腰", "코시"],
  ["가슴", "胸", "무네"],
  ["다리", "足", "아시"],
  ["팔", "腕", "우데"],
  ["손", "手", "테"],
  ["발", "足", "아시"],
  ["이", "歯", "하"],
  ["눈", "目", "메"],
  ["귀", "耳", "미미"],
  ["무릎", "膝", "히자"],
  ["여권", "パスポート", "파스포토"],
  ["지갑", "財布", "사이후"],
  ["휴대폰", "スマホ", "스마호"],
  ["카드", "カード", "카도"],
  ["현금", "現金", "겐킨"],
  ["가방", "バッグ", "박구"],
  ["캐리어", "スーツケース", "스츠케스"],
  ["숙소 키", "部屋の鍵", "헤야노 카기"],
  ["카메라", "カメラ", "카메라"],
  ["이어폰", "イヤホン", "이야혼"],
  ["안경", "眼鏡", "메가네"],
  ["약", "薬", "쿠스리"],
  ["티켓", "チケット", "치켓토"],
].map(([ko, ja, pronunciation]) => ({ ko, ja, pronunciation })).sort((a, b) => b.ko.length - a.ko.length);

const state = {
  data: null,
  phrases: [],
  categories: [],
  phraseById: new Map(),
  composedById: new Map(),
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
  const searching = Boolean(state.query.trim()) && state.view === "home";
  els.settingsSection.classList.toggle("hidden", !settings);
  els.quickSection.classList.toggle("hidden", settings || searching || state.view === "favorites" || state.view === "recent");
  els.categorySection.classList.toggle("hidden", settings || searching || state.view === "favorites" || state.view === "recent");
  els.savedSection.classList.toggle("hidden", settings || searching || state.view === "favorites" || state.view === "recent");
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
    const composed = composePhrase(state.query);
    if (composed) {
      state.composedById.set(composed.id, composed);
      phrases = [
        composed,
        ...phrases.filter((phrase) => normalize(phrase.ko) !== normalize(composed.ko) && normalize(phrase.ja) !== normalize(composed.ja)),
      ];
      kicker = "검색 + 작문";
    }
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
    if (state.query.trim()) {
      els.emptyState.innerHTML = `
        <strong>바로 만들 수 있는 문장을 찾지 못했습니다.</strong>
        <span>예: "화장실 어디", "충전기 있나요", "신주쿠역 가고 싶어요", "여권 잃어버렸어요"처럼 짧게 써 보세요.</span>
      `;
    } else {
      els.emptyState.innerHTML = `
        <strong>딱 맞는 문장을 찾지 못했습니다.</strong>
        <span>검색어를 짧게 줄이거나 아래 긴급 문장을 먼저 사용해 보세요.</span>
      `;
    }
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
  const generated = Boolean(phrase.isGenerated);
  return `
    <article class="phrase-card ${generated ? "generated-card" : ""}" data-id="${phrase.id}">
      <header>
        <span class="category-pill">${escapeHTML(phrase.category)}</span>
        ${generated
          ? `<span class="generated-pill">작문</span>`
          : `<button class="tool-button ${saved ? "saved" : ""}" type="button" data-action="favorite" data-id="${phrase.id}" aria-label="즐겨찾기">
              <span aria-hidden="true">${saved ? "★" : "☆"}</span>
            </button>`}
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

function composePhrase(query) {
  const raw = query.trim();
  const norm = normalize(raw);
  const tight = compact(raw);
  if (!norm || norm.length < 2) return null;

  const matched = findComposerTerm(raw);
  if (matched) {
    const generated = composeWithTerm(raw, norm, tight, matched);
    if (generated) return createComposedPhrase(raw, generated);
  }

  const direct = directComposition(norm, tight, raw);
  if (direct) return direct;

  const slot = fallbackComposerTerm(raw);
  if (!slot) return null;

  const generated = composeWithTerm(raw, norm, tight, slot);
  return generated ? createComposedPhrase(raw, generated) : null;
}

function directComposition(norm, tight, raw) {
  const directRows = [
    [/도와|도왜|도웨|살려|help/, "도와주세요.", "助けてください。", "타스케테 쿠다사이", "긴급하게 도움을 요청하는 표현입니다."],
    [/일본어.*못|일본말.*못|일본어.*초보/, "일본어를 잘 못합니다.", "日本語がよくできません。", "니혼고가 요쿠 데키마센", "일본어 초보임을 알리는 표현입니다."],
    [/천천히.*말|천천히.*해/, "천천히 말해 주세요.", "ゆっくり話してください。", "윳쿠리 하나시테 쿠다사이", "상대가 빠르게 말할 때 씁니다."],
    [/다시.*말|한번.*더|한 번.*더/, "다시 한 번 말해 주세요.", "もう一度言ってください。", "모 이치도 잇테 쿠다사이", "못 들었을 때 씁니다."],
    [/한국어.*할|한국말.*할/, "한국어를 할 줄 아세요?", "韓国語は話せますか。", "캉코쿠고와 하나세마스카", "한국어 가능 여부를 물을 때 씁니다."],
    [/영어.*할/, "영어를 할 줄 아세요?", "英語は話せますか。", "에이고와 하나세마스카", "영어 가능 여부를 물을 때 씁니다."],
    [/카드.*(돼|되|가능|결제)/, "카드로 결제할 수 있나요?", "カードで払えますか。", "카도데 하라에마스카", "카드 결제 가능 여부를 물을 때 씁니다."],
    [/현금.*(만|뿐)/, "현금만 되나요?", "現金だけですか。", "겐킨다케데스카", "현금 결제만 가능한지 물을 때 씁니다."],
    [/예약/, "예약했습니다.", "予約しています。", "요야쿠 시테이마스", "예약을 확인할 때 씁니다."],
    [/길.*잃|어디인지.*모르/, "길을 잃었습니다.", "道に迷いました。", "미치니 마요이마시타", "길을 잃었을 때 씁니다."],
    [/맵지|안맵|안 맵/, "맵지 않게 해 주세요.", "辛くしないでください。", "카라쿠 시나이데 쿠다사이", "매운맛을 빼 달라고 할 때 씁니다."],
    [/덜.*맵|조금.*맵/, "덜 맵게 해 주세요.", "辛さを控えめにしてください。", "카라사오 히카에메니 시테 쿠다사이", "매운맛을 줄여 달라고 할 때 씁니다."],
    [/얼음.*빼|노.*아이스/, "얼음 빼 주세요.", "氷なしでお願いします。", "코오리 나시데 오네가이시마스", "음료에서 얼음을 빼 달라고 할 때 씁니다."],
    [/포장|테이크아웃|가져갈/, "포장해 주세요.", "持ち帰りでお願いします。", "모치카에리데 오네가이시마스", "테이크아웃 요청입니다."],
    [/계산/, "계산해 주세요.", "お会計をお願いします。", "오카이케이오 오네가이시마스", "식당에서 계산할 때 씁니다."],
    [/사진.*찍|찍어.*주/, "사진 찍어 주실 수 있나요?", "写真を撮ってもらえますか。", "샤신오 톳테 모라에마스카", "사진을 부탁할 때 씁니다."],
    [/와이파이.*(비번|비밀번호|패스워드)/, "와이파이 비밀번호를 알려 주세요.", "Wi-Fiのパスワードを教えてください。", "와이파이노 파스와도오 오시에테 쿠다사이", "와이파이 비밀번호를 물을 때 씁니다."],
    [/충전.*(가능|되|돼)|충전할/, "충전할 수 있나요?", "充電できますか。", "주덴 데키마스카", "충전 가능 여부를 물을 때 씁니다."],
    [/알레르기|알러지/, "알레르기가 있습니다.", "アレルギーがあります。", "아레루기 가 아리마스", "알레르기가 있음을 알릴 때 씁니다."],
    [/병원.*가|병원.*싶/, "병원에 가고 싶습니다.", "病院に行きたいです。", "뵤인니 이키타이데스", "병원 이동이 필요할 때 씁니다."],
    [/구급차|응급차|119/, "구급차를 불러 주세요.", "救急車を呼んでください。", "큐큐샤오 욘데 쿠다사이", "응급 상황에서 씁니다."],
    [/경찰.*불|경찰.*불러/, "경찰을 불러 주세요.", "警察を呼んでください。", "케이사츠오 욘데 쿠다사이", "경찰 도움이 필요할 때 씁니다."],
    [/화장실$|토이레/, "화장실은 어디에 있나요?", "トイレはどこですか。", "토이레와 도코데스카", "화장실 위치를 물을 때 씁니다."],
    [/얼마|가격/, "이것은 얼마예요?", "これはいくらですか。", "코레와 이쿠라데스카", "가격을 물을 때 씁니다."],
  ];

  for (const [pattern, ko, ja, pronunciation, note] of directRows) {
    if (pattern.test(norm) || pattern.test(tight)) {
      return createComposedPhrase(raw, { ko, ja, pronunciation, note });
    }
  }
  return null;
}

function composeWithTerm(raw, norm, tight, term) {
  const ko = cleanupComposerKorean(raw);
  if (/어디|위치|찾/.test(norm)) {
    return {
      ko: `${topic(term.ko)} 어디에 있나요?`,
      ja: `${term.ja}はどこですか。`,
      pronunciation: `${term.pronunciation}와 도코데스카`,
      note: "입력한 단어를 장소 찾기 문장으로 만든 오프라인 작문입니다.",
    };
  }
  if (/근처|주변/.test(norm) && /있|있나|있어/.test(norm)) {
    return {
      ko: `이 근처에 ${subject(term.ko)} 있나요?`,
      ja: `この近くに${term.ja}はありますか。`,
      pronunciation: `코노 치카쿠니 ${term.pronunciation}와 아리마스카`,
      note: "주변에 있는지 물어보는 오프라인 작문입니다.",
    };
  }
  if (/가고.*싶|가고싶|가야|갈래/.test(norm)) {
    return {
      ko: `${term.ko}에 가고 싶습니다.`,
      ja: `${term.ja}に行きたいです。`,
      pronunciation: `${term.pronunciation}니 이키타이데스`,
      note: "목적지로 가고 싶다고 말하는 오프라인 작문입니다.",
    };
  }
  if (/가.*주세요|가.*주세|가줘|까지.*가|데려/.test(norm)) {
    return {
      ko: `${term.ko}까지 가 주세요.`,
      ja: `${term.ja}までお願いします。`,
      pronunciation: `${term.pronunciation}마데 오네가이시마스`,
      note: "택시나 이동 상황에서 쓰는 오프라인 작문입니다.",
    };
  }
  if (/얼마|가격/.test(norm)) {
    return {
      ko: `${topic(term.ko)} 얼마예요?`,
      ja: `${term.ja}はいくらですか。`,
      pronunciation: `${term.pronunciation}와 이쿠라데스카`,
      note: "가격을 물어보는 오프라인 작문입니다.",
    };
  }
  if (/잃|분실|없어졌/.test(norm)) {
    return {
      ko: `${object(term.ko)} 잃어버렸습니다.`,
      ja: `${term.ja}をなくしました。`,
      pronunciation: `${term.pronunciation}오 나쿠시마시타`,
      note: "분실 사실을 알리는 오프라인 작문입니다.",
    };
  }
  if (/찾고|찾아/.test(norm)) {
    return {
      ko: `${object(term.ko)} 찾고 있습니다.`,
      ja: `${term.ja}を探しています。`,
      pronunciation: `${term.pronunciation}오 사가시테이마스`,
      note: "잃어버린 물건을 찾을 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/아파|아프|통증|痛/.test(norm)) {
    return {
      ko: `${subject(term.ko)} 아픕니다.`,
      ja: `${term.ja}が痛いです。`,
      pronunciation: `${term.pronunciation}가 이타이데스`,
      note: "아픈 부위를 말하는 오프라인 작문입니다.",
    };
  }
  if (/빼|없이|제외/.test(norm)) {
    return {
      ko: `${object(term.ko)} 빼 주세요.`,
      ja: `${term.ja}を抜いてください。`,
      pronunciation: `${term.pronunciation}오 누이테 쿠다사이`,
      note: "재료를 빼 달라고 하는 오프라인 작문입니다.",
    };
  }
  if (/못.*먹|먹을.*수.*없|안.*먹/.test(norm)) {
    return {
      ko: `저는 ${object(term.ko)} 먹을 수 없습니다.`,
      ja: `${term.ja}は食べられません。`,
      pronunciation: `${term.pronunciation}와 타베라레마센`,
      note: "먹을 수 없는 재료를 알리는 오프라인 작문입니다.",
    };
  }
  if (/알레르기|알러지/.test(norm)) {
    return {
      ko: `저는 ${term.ko} 알레르기가 있습니다.`,
      ja: `${term.ja}アレルギーがあります。`,
      pronunciation: `${term.pronunciation} 아레루기 가 아리마스`,
      note: "알레르기를 알리는 오프라인 작문입니다.",
    };
  }
  if (/작동.*안|안.*돼|안됨|고장/.test(norm)) {
    return {
      ko: `${subject(term.ko)} 작동하지 않습니다.`,
      ja: `${term.ja}が使えません。`,
      pronunciation: `${term.pronunciation}가 츠카에마센`,
      note: "기기나 시설 문제가 있을 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/있나|있어|있습|파나|살 수/.test(norm)) {
    return {
      ko: `${term.ko} 있나요?`,
      ja: `${term.ja}はありますか。`,
      pronunciation: `${term.pronunciation}와 아리마스카`,
      note: "물건이나 시설이 있는지 물어보는 오프라인 작문입니다.",
    };
  }
  if (/주세요|줘|부탁|주세/.test(norm)) {
    return {
      ko: `${term.ko} 주세요.`,
      ja: `${term.ja}をください。`,
      pronunciation: `${term.pronunciation}오 쿠다사이`,
      note: "물건을 달라고 할 때 쓰는 오프라인 작문입니다.",
    };
  }

  if (ko !== raw.trim() && ko.length >= 2) {
    return null;
  }
  return null;
}

function createComposedPhrase(raw, phrase) {
  return {
    id: `compose_${hashString(`${raw}|${phrase.ja}`)}`,
    category: "오프라인 작문",
    ko: phrase.ko,
    ja: phrase.ja,
    pronunciation: phrase.pronunciation,
    note: `${phrase.note} 자유 번역 AI가 아니라 앱 안의 여행 패턴으로 만든 문장입니다.`,
    tags: ["작문", "오프라인", "자동"],
    synonyms: [raw],
    priority: 10,
    isGenerated: true,
  };
}

function findComposerTerm(input) {
  const norm = normalize(input);
  const tight = compact(input);
  return COMPOSER_TERMS.find((term) => norm.includes(normalize(term.ko)) || tight.includes(compact(term.ko)));
}

function fallbackComposerTerm(input) {
  const slot = cleanupComposerKorean(input);
  if (!slot || slot.length < 2) return null;
  return COMPOSER_TERMS.find((term) => normalize(term.ko) === normalize(slot) || compact(term.ko) === compact(slot));
}

function cleanupComposerKorean(input) {
  return normalize(input)
    .replace(/^(저는|제가|제|이|그|저|여기|거기|근처|주변|이 근처에|이 음식에)\s*/g, "")
    .replace(/\s*(어디|위치|찾고 있습니다|찾고 있어요|찾아 주세요|있나요|있어요|있습니까|주세요|줘|부탁|가고 싶어요|가고 싶습니다|가주세요|가 주세요|까지|얼마|가격|잃어버렸어요|잃어버렸습니다|분실|아파요|아픕니다|빼 주세요|빼줘|없이|못 먹어요|먹을 수 없습니다|알레르기|알러지|작동하지 않습니다|안 돼요|안되요|고장)$/g, "")
    .trim();
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash).toString(36);
}

function hasFinalConsonant(text) {
  const chars = [...text.trim()];
  for (let index = chars.length - 1; index >= 0; index -= 1) {
    const code = chars[index].charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28 !== 0;
    if (/[A-Za-z0-9]/.test(chars[index])) return false;
  }
  return false;
}

function topic(text) {
  return `${text}${hasFinalConsonant(text) ? "은" : "는"}`;
}

function subject(text) {
  return `${text}${hasFinalConsonant(text) ? "이" : "가"}`;
}

function object(text) {
  return `${text}${hasFinalConsonant(text) ? "을" : "를"}`;
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
        ${phrase.isGenerated ? "" : `<button class="tool-button ${saved ? "saved" : ""}" type="button" data-action="favorite" data-id="${phrase.id}"><span aria-hidden="true">${saved ? "★" : "☆"}</span><span>저장</span></button>`}
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
    <div class="show-main">
      <div class="show-ja" lang="ja">${escapeHTML(phrase.ja)}</div>
      <div class="show-ko">${escapeHTML(phrase.ko)}</div>
      <div class="show-pronunciation">${escapeHTML(phrase.pronunciation)}</div>
    </div>
    <div class="show-footer">
      <div class="show-actions">
        <button class="tool-button primary" type="button" data-action="speak" data-id="${phrase.id}"><span aria-hidden="true">▶</span><span>재생</span></button>
        <button class="tool-button show-secondary" type="button" data-action="repeat" data-id="${phrase.id}"><span aria-hidden="true">↺</span><span>반복 재생</span></button>
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
  return state.phraseById.get(id) || state.composedById.get(id);
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
