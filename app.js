const STORAGE_KEYS = {
  favorites: "jpTravelPhraseFavorites.v1",
  recent: "jpTravelPhraseRecent.v1",
  settings: "jpTravelPhraseSettings.v1",
};
const DATA_CACHE_NAME = "japan-travel-phrase-pwa-data-v12";

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
  "전입신고",
  "재류카드 갱신",
  "보증금",
  "가스 개통",
  "택배 재배송",
  "계좌 만들고 싶어요",
  "쓰레기 버리는 날",
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
  ["집계약", "집 계약"],
  ["월세집", "월세"],
  ["야칭", "월세"],
  ["시키킹", "보증금"],
  ["레이킹", "사례금"],
  ["자이류카드", "재류카드"],
  ["마이넘버", "마이넘버 카드"],
  ["입관", "입국관리국"],
  ["구약소", "구청"],
  ["시약소", "시청"],
  ["주민효", "주민표"],
  ["고미", "쓰레기"],
  ["대형쓰레기", "대형 쓰레기"],
  ["분베츠", "분리수거"],
  ["재배송", "택배 재배송"],
  ["부재표", "부재표"],
  ["통장", "통장"],
  ["캐쉬카드", "현금카드"],
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
  ["계약서", "契約書", "케이야쿠쇼"],
  ["집 계약", "部屋の契約", "헤야노 케이야쿠"],
  ["보증금", "敷金", "시키킨"],
  ["사례금", "礼金", "레이킨"],
  ["월세", "家賃", "야친"],
  ["관리비", "管理費", "칸리히"],
  ["중개수수료", "仲介手数料", "추카이 테스료"],
  ["화재보험", "火災保険", "카사이 호켄"],
  ["보증회사", "保証会社", "호쇼가이샤"],
  ["재계약", "更新契約", "코신 케이야쿠"],
  ["계약 해지", "解約", "카이야쿠"],
  ["입주일", "入居日", "뉴쿄비"],
  ["퇴거일", "退去日", "타이쿄비"],
  ["열쇠", "鍵", "카기"],
  ["우편함", "郵便受け", "유빈우케"],
  ["인터폰", "インターホン", "인타혼"],
  ["주차장", "駐車場", "추샤조"],
  ["자전거 보관소", "駐輪場", "추린조"],
  ["관리인", "管理人", "칸리닌"],
  ["집주인", "大家さん", "오야산"],
  ["부동산 회사", "不動産会社", "후도산가이샤"],
  ["퇴거 점검", "退去立ち会い", "타이쿄 타치아이"],
  ["원상복구비", "原状回復費", "겐조 카이후쿠히"],
  ["주민표", "住民票", "주민효"],
  ["재류카드", "在留カード", "자이류 카도"],
  ["에어컨", "エアコン", "에아콘"],
  ["난방", "暖房", "단보"],
  ["온수기", "給湯器", "큐토키"],
  ["보일러", "給湯器", "큐토키"],
  ["가스레인지", "ガスコンロ", "가스콘로"],
  ["수도꼭지", "蛇口", "자구치"],
  ["샤워기", "シャワー", "샤와"],
  ["배수구", "排水口", "하이스이코"],
  ["변기", "トイレ", "토이레"],
  ["세면대", "洗面台", "센멘다이"],
  ["욕실 환풍기", "浴室換気扇", "요쿠시츠 칸키센"],
  ["전등", "照明", "쇼메이"],
  ["콘센트", "コンセント", "콘센토"],
  ["현관문", "玄関ドア", "겐칸 도아"],
  ["창문", "窓", "마도"],
  ["방충망", "網戸", "아미도"],
  ["누수", "水漏れ", "미즈모레"],
  ["곰팡이", "カビ", "카비"],
  ["벌레", "虫", "무시"],
  ["소음", "騒音", "소온"],
  ["악취", "悪臭", "아쿠슈"],
  ["전기", "電気", "덴키"],
  ["가스", "ガス", "가스"],
  ["수도", "水道", "스이도"],
  ["전기요금", "電気料金", "덴키 료킨"],
  ["가스요금", "ガス料金", "가스 료킨"],
  ["수도요금", "水道料金", "스이도 료킨"],
  ["검침표", "検針票", "켄신표"],
  ["청구서", "請求書", "세이큐쇼"],
  ["납부서", "払込用紙", "하라이코미 요시"],
  ["자동이체", "口座振替", "코자 후리카에"],
  ["전기요금 자동이체", "電気料金の口座振替", "덴키 료킨노 코자 후리카에"],
  ["가스요금 자동이체", "ガス料金の口座振替", "가스 료킨노 코자 후리카에"],
  ["수도요금 자동이체", "水道料金の口座振替", "스이도 료킨노 코자 후리카에"],
  ["요금 자동이체", "料金の口座振替", "료킨노 코자 후리카에"],
  ["명의 변경", "名義変更", "메이기 헨코"],
  ["가스 개통", "ガスの開栓", "가스노 카이센"],
  ["전기 개통", "電気の開始", "덴키노 카이시"],
  ["수도 개통", "水道の開始", "스이도노 카이시"],
  ["정전", "停電", "테이덴"],
  ["가스 냄새", "ガス臭い", "가스 쿠사이"],
  ["은행 계좌", "銀行口座", "긴코 코자"],
  ["계좌", "口座", "코자"],
  ["통장", "通帳", "츠초"],
  ["현금카드", "キャッシュカード", "캿슈 카도"],
  ["체크카드", "デビットカード", "데빗토 카도"],
  ["신용카드", "クレジットカード", "크레짓토 카도"],
  ["인터넷뱅킹", "インターネットバンキング", "인타넷토 방킹구"],
  ["송금", "振込", "후리코미"],
  ["해외송금", "海外送金", "카이가이 소킨"],
  ["계좌번호", "口座番号", "코자 방고"],
  ["비밀번호", "暗証番号", "안쇼 방고"],
  ["잔액", "残高", "잔다카"],
  ["입금", "入金", "뉴킨"],
  ["출금", "出金", "슛킨"],
  ["ATM 수수료", "ATM手数料", "에이티엠 테스료"],
  ["재발급", "再発行", "사이핫코"],
  ["택배", "宅配便", "타쿠하이빈"],
  ["우편물", "郵便物", "유빈부츠"],
  ["등기우편", "書留", "카키토메"],
  ["소포", "荷物", "니모츠"],
  ["배송 추적", "追跡", "츠이세키"],
  ["택배 재배송", "再配達", "사이하이타츠"],
  ["부재표", "不在票", "후자이효"],
  ["수령인", "受取人", "우케토리닌"],
  ["주소", "住所", "주소"],
  ["우편번호", "郵便番号", "유빈방고"],
  ["착불", "着払い", "차쿠바라이"],
  ["선불", "元払い", "모토바라이"],
  ["EMS", "EMS", "이에무에스"],
  ["반송", "返送", "헨소"],
  ["전입신고", "転入届", "텐뉴 토도케"],
  ["전출신고", "転出届", "텐슈츠 토도케"],
  ["이사 신고", "住所変更届", "주소 헨코 토도케"],
  ["시청", "市役所", "시야쿠쇼"],
  ["구청", "区役所", "쿠야쿠쇼"],
  ["마이넘버 카드", "マイナンバーカード", "마이난바 카도"],
  ["국민건강보험", "国民健康保険", "코쿠민 켄코 호켄"],
  ["국민연금", "国民年金", "코쿠민 넨킨"],
  ["세금 증명서", "課税証明書", "카제이 쇼메이쇼"],
  ["소득 증명서", "所得証明書", "쇼토쿠 쇼메이쇼"],
  ["인감등록", "印鑑登録", "인칸 토로쿠"],
  ["인감증명서", "印鑑証明書", "인칸 쇼메이쇼"],
  ["통역 서비스", "通訳サービス", "츠야쿠 사비스"],
  ["비자", "ビザ", "비자"],
  ["재류기간", "在留期間", "자이류 키칸"],
  ["재류자격", "在留資格", "자이류 시카쿠"],
  ["기간 갱신", "在留期間更新", "자이류 키칸 코신"],
  ["자격 변경", "在留資格変更", "자이류 시카쿠 헨코"],
  ["입국관리국", "入国管理局", "뉴코쿠 칸리쿄쿠"],
  ["신청서", "申請書", "신세이쇼"],
  ["수입인지", "収入印紙", "슈뉴 인시"],
  ["문진표", "問診票", "몬신효"],
  ["진단서", "診断書", "신단쇼"],
  ["검사 결과", "検査結果", "켄사 켓카"],
  ["혈액검사", "血液検査", "케츠에키 켄사"],
  ["예방접종", "予防接種", "요보 셋슈"],
  ["소개장", "紹介状", "쇼카이조"],
  ["입원", "入院", "뉴인"],
  ["퇴원", "退院", "타이인"],
  ["충치", "虫歯", "무시바"],
  ["잇몸", "歯茎", "하구키"],
  ["스케일링", "歯石取り", "시세키토리"],
  ["마취", "麻酔", "마스이"],
  ["신경치료", "根管治療", "콘칸 치료"],
  ["발치", "抜歯", "밧시"],
  ["이력서", "履歴書", "리레키쇼"],
  ["근무 시간", "勤務時間", "킨무 지칸"],
  ["시프트", "シフト", "시후토"],
  ["급여", "給料", "큐료"],
  ["급여명세서", "給与明細", "큐요 메이사이"],
  ["교통비", "交通費", "코츠히"],
  ["유급휴가", "有給休暇", "유큐 큐카"],
  ["결근", "欠勤", "켓킨"],
  ["지각", "遅刻", "치코쿠"],
  ["퇴직", "退職", "타이쇼쿠"],
  ["사회보험", "社会保険", "샤카이 호켄"],
  ["타는 쓰레기", "燃えるごみ", "모에루 고미"],
  ["타지 않는 쓰레기", "燃えないごみ", "모에나이 고미"],
  ["쓰레기", "ごみ", "고미"],
  ["플라스틱", "プラスチック", "푸라스칫쿠"],
  ["페트병", "ペットボトル", "펫토보토루"],
  ["캔", "缶", "칸"],
  ["병", "瓶", "빈"],
  ["종이", "紙", "카미"],
  ["상자", "段ボール", "단보루"],
  ["대형 쓰레기", "粗大ごみ", "소다이 고미"],
  ["음식물 쓰레기", "生ごみ", "나마고미"],
  ["쓰레기봉투", "ごみ袋", "고미부쿠로"],
  ["쓰레기 배출일", "ごみ出しの日", "고미다시노 히"],
  ["쓰레기장", "ごみ置き場", "고미오키바"],
  ["분리수거", "分別", "분베츠"],
  ["스티커", "処理券", "쇼리켄"],
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
  showUpdateToastIfNeeded();

  try {
    const response = await fetch("./phrases.json");
    if (!response.ok) throw new Error(`phrases.json ${response.status}`);
    const cacheCopy = response.clone();
    state.data = await response.json();
    state.phrases = state.data.phrases;
    state.categories = state.data.categories;
    state.phraseById = new Map(state.phrases.map((phrase) => [phrase.id, phrase]));
    cachePhraseData(cacheCopy);
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
  let title = "생활/여행 바로 쓰기";
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
        <span>예: "화장실 어디", "재류카드 갱신", "계좌 만들고 싶어요", "대형 쓰레기 버리는 날"처럼 짧게 써 보세요.</span>
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
  if (/버리는.*날|배출일|수거.*날|언제.*버|언제.*내/.test(norm)) {
    return {
      ko: `${topic(term.ko)} 언제 버리나요?`,
      ja: `${term.ja}はいつ出しますか。`,
      pronunciation: `${term.pronunciation}와 이츠 다시마스카`,
      note: "쓰레기 배출 요일을 물어보는 오프라인 작문입니다.",
    };
  }
  if (/어디.*받|받.*어디|어디.*수령|수령.*어디/.test(norm)) {
    return {
      ko: `${topic(term.ko)} 어디에서 받을 수 있나요?`,
      ja: `${term.ja}はどこで受け取れますか。`,
      pronunciation: `${term.pronunciation}와 도코데 우케토레마스카`,
      note: "서류나 물건을 어디서 받는지 묻는 오프라인 작문입니다.",
    };
  }
  if (/어디.*(하|신청|등록|발급|만들|처리)|어디서.*(하|신청|등록|발급|만들|처리)|어떻게.*(하|신청|등록|발급|만들|처리)/.test(norm)) {
    return {
      ko: `${topic(term.ko)} 어디에서 처리할 수 있나요?`,
      ja: `${term.ja}はどこで手続きできますか。`,
      pronunciation: `${term.pronunciation}와 도코데 테츠즈키 데키마스카`,
      note: "행정 절차나 신청 장소를 물어보는 오프라인 작문입니다.",
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
  if (/잃|분실|없어졌/.test(norm)) {
    return {
      ko: `${object(term.ko)} 잃어버렸습니다.`,
      ja: `${term.ja}をなくしました。`,
      pronunciation: `${term.pronunciation}오 나쿠시마시타`,
      note: "분실 사실을 알리는 오프라인 작문입니다.",
    };
  }
  if (/해지|끊|그만/.test(norm)) {
    const target = term.ko.includes("해지") ? "계약" : term.ko;
    const jaTarget = term.ko.includes("해지") ? "契約" : term.ja;
    const pronTarget = term.ko.includes("해지") ? "케이야쿠" : term.pronunciation;
    return {
      ko: `${object(target)} 해지하고 싶습니다.`,
      ja: `${jaTarget}を解約したいです。`,
      pronunciation: `${pronTarget}오 카이야쿠 시타이데스`,
      note: "계약이나 서비스를 해지하고 싶을 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/갱신|연장/.test(norm)) {
    return {
      ko: `${object(term.ko)} 갱신하고 싶습니다.`,
      ja: `${term.ja}を更新したいです。`,
      pronunciation: `${term.pronunciation}오 코신 시타이데스`,
      note: "재류카드, 비자, 계약 등을 갱신하고 싶을 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/신청|가입|등록|만들|개설|개통/.test(norm)) {
    if (/계좌|통장/.test(term.ko)) {
      return {
        ko: `${object(term.ko)} 만들고 싶습니다.`,
        ja: `${term.ja}を開設したいです。`,
        pronunciation: `${term.pronunciation}오 카이세츠 시타이데스`,
        note: "은행 계좌나 통장을 만들고 싶을 때 쓰는 오프라인 작문입니다.",
      };
    }
    return {
      ko: `${object(term.ko)} 신청하고 싶습니다.`,
      ja: `${term.ja}を申し込みたいです。`,
      pronunciation: `${term.pronunciation}오 모시코미타이데스`,
      note: "서비스, 절차, 계약을 신청하고 싶을 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/변경|바꾸|수정/.test(norm)) {
    return {
      ko: `${object(term.ko)} 변경하고 싶습니다.`,
      ja: `${term.ja}を変更したいです。`,
      pronunciation: `${term.pronunciation}오 헨코 시타이데스`,
      note: "등록 정보나 계약 내용을 바꾸고 싶을 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/취소|캔슬/.test(norm)) {
    return {
      ko: `${object(term.ko)} 취소하고 싶습니다.`,
      ja: `${term.ja}をキャンセルしたいです。`,
      pronunciation: `${term.pronunciation}오 캰세루 시타이데스`,
      note: "예약이나 신청을 취소하고 싶을 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/발급|떼/.test(norm)) {
    return {
      ko: `${object(term.ko)} 발급받고 싶습니다.`,
      ja: `${term.ja}を発行してもらいたいです。`,
      pronunciation: `${term.pronunciation}오 핫코 시테 모라이타이데스`,
      note: "서류 발급을 부탁할 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/제출|내야|내야하|내야 해|내야 되/.test(norm)) {
    return {
      ko: `${object(term.ko)} 제출해야 하나요?`,
      ja: `${term.ja}を提出する必要がありますか。`,
      pronunciation: `${term.pronunciation}오 테이슈츠 스루 히츠요가 아리마스카`,
      note: "서류 제출 필요 여부를 물어보는 오프라인 작문입니다.",
    };
  }
  if (/필요|필요해/.test(norm)) {
    return {
      ko: `${subject(term.ko)} 필요합니다.`,
      ja: `${term.ja}が必要です。`,
      pronunciation: `${term.pronunciation}가 히츠요데스`,
      note: "필요한 서류나 물건을 말하는 오프라인 작문입니다.",
    };
  }
  if (/상담|문의|물어/.test(norm)) {
    return {
      ko: `${term.ko}에 대해 상담하고 싶습니다.`,
      ja: `${term.ja}について相談したいです。`,
      pronunciation: `${term.pronunciation}니 츠이테 소단 시타이데스`,
      note: "직원에게 해당 주제로 상담하고 싶다고 말하는 오프라인 작문입니다.",
    };
  }
  if (/확인|봐|봐주|체크/.test(norm)) {
    return {
      ko: `${object(term.ko)} 확인해 주세요.`,
      ja: `${term.ja}を確認してください。`,
      pronunciation: `${term.pronunciation}오 카쿠닌 시테 쿠다사이`,
      note: "서류나 내용을 확인해 달라고 할 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/재배송|다시.*배송|다시.*배달/.test(norm)) {
    return {
      ko: `${object(term.ko)} 부탁드립니다.`,
      ja: `${term.ja}をお願いします。`,
      pronunciation: `${term.pronunciation}오 오네가이시마스`,
      note: "택배 재배송이나 처리를 부탁할 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/보내|배송|부치/.test(norm)) {
    return {
      ko: `${object(term.ko)} 보내고 싶습니다.`,
      ja: `${term.ja}を送りたいです。`,
      pronunciation: `${term.pronunciation}오 오쿠리타이데스`,
      note: "우편이나 택배를 보내고 싶을 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/버려|버리|분리수거|배출|내놓/.test(norm)) {
    return {
      ko: `${object(term.ko)} 버려도 되나요?`,
      ja: `${term.ja}を捨ててもいいですか。`,
      pronunciation: `${term.pronunciation}오 스테테모 이이데스카`,
      note: "쓰레기 배출 가능 여부를 물어보는 오프라인 작문입니다.",
    };
  }
  if (/수리|고쳐|고치/.test(norm)) {
    return {
      ko: `${object(term.ko)} 수리해 주세요.`,
      ja: `${term.ja}を修理してください。`,
      pronunciation: `${term.pronunciation}오 슈리 시테 쿠다사이`,
      note: "집이나 시설 수리를 요청할 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/문제|이상|곤란|불편/.test(norm)) {
    return {
      ko: `${term.ko}에 문제가 있습니다.`,
      ja: `${term.ja}に問題があります。`,
      pronunciation: `${term.pronunciation}니 몬다이가 아리마스`,
      note: "생활 설비나 계약 문제를 알릴 때 쓰는 오프라인 작문입니다.",
    };
  }
  if (/어디|위치/.test(norm)) {
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
    .replace(/\s*(어디|위치|찾고 있습니다|찾고 있어요|찾아 주세요|있나요|있어요|있습니까|주세요|줘|부탁|가고 싶어요|가고 싶습니다|가주세요|가 주세요|까지|얼마|가격|잃어버렸어요|잃어버렸습니다|분실|아파요|아픕니다|빼 주세요|빼줘|없이|못 먹어요|먹을 수 없습니다|알레르기|알러지|작동하지 않습니다|안 돼요|안되요|고장|신청|가입|등록|만들고 싶어요|만들고 싶습니다|개설|개통|해지|끊고 싶어요|갱신|연장|변경|바꾸고 싶어요|수정|취소|캔슬|발급|떼고 싶어요|제출|내야 하나요|필요|상담|문의|확인|봐 주세요|재배송|다시 배송|보내고 싶어요|배송|부치고 싶어요|버려도 되나요|버리는 날|분리수거|수리|고쳐 주세요|문제|이상|곤란)$/g, "")
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

function cachePhraseData(response) {
  if (!("caches" in window) || !response || !response.ok) return;
  caches.open(DATA_CACHE_NAME)
    .then((cache) => cache.put("./phrases.json", response))
    .catch(() => {});
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
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || sessionStorage.getItem("jpTravelPwaUpdateReloaded")) return;
    sessionStorage.setItem("jpTravelPwaUpdateReloaded", "1");
    window.location.reload();
  });
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .then((registration) => {
        updateOnlineStatus();
        registration.update?.();
      })
      .catch(() => {
        els.offlineBadge.textContent = "캐시 확인 필요";
      });
  });
}

function showUpdateToastIfNeeded() {
  if (!sessionStorage.getItem("jpTravelPwaUpdateReloaded")) return;
  sessionStorage.removeItem("jpTravelPwaUpdateReloaded");
  window.setTimeout(() => showToast("최신 오프라인 문장으로 업데이트했습니다."), 300);
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
