// --------------------
// state
// --------------------
const state = {
  page: "cover",
  menuOpen: false,
  input: {
    who: "",
    when: "",
    where: "",
    what: "",
    particle: "で",
    level: 1
  },
  diary: JSON.parse(localStorage.getItem("diary") || "[]"),
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  batch: []
};

// --------------------
// vocabulary (The Infinite Shift Edition)
// --------------------
const WHEN_LIST = [
    // --- 愛嬌とリズムのあるタイミング ---
    "誰かのクシャミが止まったあと", "時計の針が重なる直前", "ふと視線が泳いだとき",
    "低気圧が静かに居座る午後", "一呼吸おいてから", "知らないうちに",
    "ちょうど区切りがついたとき", "昨日見た夢を忘れた瞬間", "誰とも目が合わなかったとき",
    "風向きがわずかに変わった瞬間", "思い出したくないことを思い出したとき", "空気が少しだけ濁ったとき",
    "瞬きをした隙に", "よそ見をした瞬間", "低気圧が半端ないとき", "喉が鳴った瞬間",
    "ちょうど信号が赤になったとき", "スマホの充電が1%減ったとき", "あくびを噛み殺したとき",
    "一年前の今日を思い出したとき", "コーヒーを一口飲んだ後", "握力が5%増したとき",
    "立ち止まった瞬間", "歩き出した瞬間", "ぼーっとしてたとき", "急いでいないとき",
    "曲がる前", "通りかかったとき", "時計を見たとき", "見なかったとき"
];

const WHERE_LIST = [
    // --- 具体的で絵になる場所 ---
    "コンビニのレジ横", "駅のホーム", "自動販売機の前", "玄関のたたき",
    "Wi-Fiの弱い場所", "改札のちょうど真ん中", "本屋の棚の間",
    "ドラッグストアの洗剤コーナー", "エレベーターの中", "交差点の隅",
    "洗濯機の横", "エスカレーターの下り口", "誰かの足跡の上", "鏡の前",
    "道路脇", "図書館", "バス停", "スーパーの袋詰めコーナー",
    "Wi-Fiルーターのすぐ横", "一番端っこの席", "誰も座っていないベンチの前",
    "街灯の真下", "郵便ポストの横", "エスカレーターの隙間", "名前のない曲がり角",
    "階段の三段目", "鏡の反射の中", "スマホの画面の中", "昨日の夜いた場所", "窓ガラスの反射の中"
];

const WHO_LIST = [
    // --- 物質と概念が混ざった愛嬌のある主語 ---
    "シフォンケーキ", "昨日出し忘れたゴミ", "誰かのクシャミの余波", "宇宙の微調整",
    "今日の運気", "磁場のゆらぎ", "誰かのため息", "ポケットの中の糸くず",
    "昨日飲み残したペットボトル", "世界に隠されたバグ", "名前のない感情", "低気圧の塊",
    "昨日の自分", "信号", "自動ドア", "エレベーター", "鳩", "表示板",
    "画面の通知", "昨日の雨の残り香", "街の微振動", "知らない誰かの独り言",
    "Wi-Fiの電波", "アスファルトの熱気", "一年前の忘れ物", "コピー機",
    "偶然通りかかった猫", "すれ違った台車", "昨日からある空き缶", "おとといの自分"
];

const WHAT_LIST = [
    // --- 具体的だけど無害なヘマ（ドジ） ---
    "改札で一回引っかかった",
    "一瞬だけフリーズしていた",
    "タイミングを完全に見失っていた",
    "あさっての方向を向いていた",
    "そこにあるのを忘れて放置されていた",
    "ちょっとだけ計算が狂っていた",
    "別のことに気を取られていた",
    "良かれと思って余計なことをした",
    "一拍遅れて反応していた",
    "自分でも意図しない方向に流された",
    "右足だけ重力が強くなった気がした",
    "お釣りが全部小銭で出てきた",
    "ビニール袋の入り口が見つからなくてあきらめた",
    "イヤホンの左右を逆につけた",
    "ちょうどいい高さの段差でつま先をぶつけた",
    "鏡の中の自分と一瞬だけ目が合わなかった",
    "お菓子の袋が予想外の方向に破けた",
    "全然関係ない歌が頭の中でループしていた",
    "お茶を飲もうとして蓋を開け忘れた",
    "階段があると思って足を出したら平地だった",
    "カバンの中でイヤホンが知恵の輪になってた",
    "出したはずのゴミがまだ手に残っていた",
    "ボタンを一つ掛け違えたまま過ごしていた",
    "自動ドアに一回無視された",
    "傘を開こうとして失敗した",
    "靴ひもがほどけそうだった",
    "何もないところでつまずいた",
    "一瞬だけ止まった",
    "意味を失いかけていた",
    "真ん中だけ抜けていた"
];

const ENDINGS = [
    "少し軽くなったなら、それで十分。","言葉にした時点で、もう半分外に出てる。","今日はここまででいいよ。","また溜まったら、置きに来て。",
    // --- Legacy ---
    "今日は、空気がちょっとだけ濁ってただけだよ。","たぶん世界が少し寝ぼけてただけだから、あなたのせいじゃないよ。","今日の運勢、三年前に使った消しゴムが決めたらしいから気にしなくてOK。",
    "道があなたに優しくない日って、たまにあるよね。","小さなズレは、明日のおもしろポイントらしいよ。","今日のあなた、ちょっと風に振り回されてただけだと思う。",
    "無理に元気出さなくて大丈夫。靴だって迷う日があるしね。","気配がざわつく日は、早く帰ってお茶して正解だよ。","今日すれ違った人たち、みんなボタンを掛け違えてたらしいよ。",
    "世界がほんの少し揺れてただけ。あなたはいつもどおり。","ドリンクのフタすらうまくいかない日は、何しても可愛いよ。","今日はページのめくり方があなたに厳しかっただけ。",
    "思ったより大変だったね。イスもたぶん応援してたよ。","風の機嫌が悪くて、あなたの髪だけ狙われてたらしい。","今日の疲れは、明日のあなたに返してあげるって世界が言ってた。",
    "あなたの今日の不調、たぶん天気が勝手に決めたんだと思う。","うまくいかない日は、ドアもだいたい固いんだよね。","少しズレてたのは世界のほう。あなたはよくやったよ。",
    "今日のあなた、静かにがんばってて好きだよ。","ちょっとだけ、気持ちが追いつかない時間だったね。","無理しないでいいよ。ペンですら休みたがってた日だし。",
    "今日のモヤは、世界があなたに“ゆっくりしていいよ”って言ってる合図。","あれこれ考えなくても大丈夫。歩幅が戻れば全部うまくいくよ。",
    "大丈夫、今日のあなた柔らかくてすごく良かったよ。","今日は、空がちょっとだけあなたを見守り損ねてただけ。","変な日だったね。でもそれ、あなたのせいじゃないよ。",
    "疲れたら、景色に頼っていいんだよ。たぶん助けてくれるから。","今日のモヤ、明日の光に変換される予定だよ。","お疲れさま。まあそんな日もあるよね。",
    // --- New (Massive) ---
    "それ、たぶん昨日すれ違った黒猫が運気を吸い取ったせいだわ。","今のあなたの不機嫌、たぶん誰かのラッキーと交換されたんだよ。ドンマイ。",
    "あー、それは世界がちょっとアプデ中だったからだよ。","今日のモヤモヤ、昨日の夜に誰かが置いていった忘れ物だよ。","星の並びが少しだけ意地悪だっただけ。次はいい位置にくるよ。",
    "今日の不運は、来週のあなたが笑うための前振りらしいよ。","大丈夫。そのうち風がどっかに運んでくれるから、忘れていいよ。","今日のあなた、十分すぎるくらい頑張った。あとは寝るだけ。",
    "世界があなたに甘えたがってる日なんだよ。","たぶん今のモヤモヤ、昨日座っていた椅子のせいだよ。知らんけど。","あなたのせいじゃない。太陽がちょっと乱れてただけ。",
    "今日は重力の調子が悪かったね。明日は軽くなるよ。","そんな日もある。明日のあなたは今のあなたを笑い飛ばしてるよ。","大丈夫、世界はあなたの味方をするのを一瞬忘れただけ。","よしよし。今日はもう、自分を甘やかして終わろうね。"

];

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

// --------------------
// helpers
// --------------------

function generateSentence() {
  const level = parseInt(state.input.level);
  
  // 自分の言葉を使う確率（レベル1=80%, 2=40%, 3=20%）
  let prob = level === 1 ? 0.8 : (level === 2 ? 0.6 : 0.4);

  // 【新ロジック】「全部が原文」にならないよう、強制的に最低1箇所はシャッフルする
  const parts = ["when", "where", "who", "what"];
  const forceChangePart = parts[Math.floor(Math.random() * parts.length)];

  const res = {
    when: (forceChangePart === "when" || Math.random() > prob) ? rand(WHEN_LIST) : (state.input.when || rand(WHEN_LIST)),
    where: (forceChangePart === "where" || Math.random() > prob) ? rand(WHERE_LIST) : (state.input.where || rand(WHERE_LIST)),
    who: (forceChangePart === "who" || Math.random() > prob) ? rand(WHO_LIST) : (state.input.who || rand(WHO_LIST)),
    what: (forceChangePart === "what" || Math.random() > prob) ? rand(WHAT_LIST) : (state.input.what || rand(WHAT_LIST))
  };

  return `${res.when ? res.when + "、" : ""}${res.who}が${res.where ? res.where + state.input.particle : ""}${res.what}。`;
}

function pick(userValue, list, probability) {
  // 入力が空なら無条件でリストから
  if (!userValue || userValue.trim() === "") {
    return rand(list);
  }
  // 指定された確率で自分の言葉を、それ以外でリストの言葉を返す
  return Math.random() < probability ? userValue : rand(list);
}

function saveDiary(text) {
  state.diary.unshift({ text, time: new Date().toLocaleString() });
  localStorage.setItem("diary", JSON.stringify(state.diary));
}

function illustBlock(start, end) {
  const images = [];
  const countPerSide = 5; // 片側5つずつ
  
  for (let i = 0; i < countPerSide * 2; i++) {
    const isLeftSide = i < countPerSide;
    const imgIndex = start + (i % (end - start + 1));
    
    // 縦の位置：0〜4のインデックスに対して、等間隔（20%刻み）で配置
    const verticalStep = isLeftSide ? i : i - countPerSide;
    const top = 10 + (verticalStep * 20); // 10%, 30%, 50%, 70%, 90% の位置

    // 左右の位置：画面端から少し内側に固定
    const left = isLeftSide ? "5%" : "85%";

    // 回転もバラバラさせず、ごくわずかな傾きに統一（または0）
    const rot = isLeftSide ? "-5deg" : "5deg";

    images.push(`<img src="assets/illust_${String(imgIndex).padStart(2,"0")}.png"
                      style="top:${top}%; left:${left}; transform:rotate(${rot});">`);
  }

  return `<div class="side-illust">` + images.join("") + `</div>`;
}

// --------------------
// render
// --------------------
function render(){
  const app = document.getElementById("app");

  // -------------------
  // Cover page
  // --------------------
  if (state.page === "cover") {
    app.innerHTML = `
    <div class="cover">
      <img src="assets/logo.png" alt="モヤほどきロゴ" class="cover-logo">
      <div id="thoughtDemo" class="thought-layer"></div>
      <button id="startBtn">START</button>
    </div>
    `;
    
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", () => {
      go("input");
    });

    const layer = document.getElementById("thoughtDemo");
    layer.innerHTML = "";
    const SET_COUNT = 6;
    const positions = [
      { x: 25, y: 25 },
      { x: 50, y: 45 },
      { x: 70, y: 30 },
      { x: 35, y: 70 },
      { x: 60, y: 60 },
      { x: 40, y: 50 }
    ];
    
    for (let i = 1; i <= SET_COUNT; i++) {
      const wrap = document.createElement("div");
      wrap.className = "thought-set";
      
      const pos = positions[i - 1];
      wrap.style.left = pos.x + (Math.random() * 6 - 3) + "%";
      wrap.style.top  = pos.y + (Math.random() * 6 - 3) + "%";
      wrap.style.animationDelay = `${Math.random() * 4}s`;
      
      const before = document.createElement("img");
      before.src = `assets/moya${i}.svg`;
      before.className = "before";
      
      const after = document.createElement("img");
      after.src = `assets/fuki${i}.svg`;
      after.className = "after";
      
      wrap.appendChild(before);
      wrap.appendChild(after);
      
      let touched = false;
      wrap.addEventListener("click", () => {
        touched = true;
        wrap.classList.toggle("flipped");
      });
      
      const delay = 3000 + Math.random() * 4000;
      setTimeout(() => {
        if (!touched && Math.random() < 0.5) {
          wrap.classList.add("flipped");
        }
      }, delay);
      
      layer.appendChild(wrap);
    }
    

  }


// --------------------
// speech
// --------------------
function initSpeech() {
  const speech = document.getElementById("speech");
  if (!speech) return;

  const guideMessages = [
    "あ、いらっしゃい",
    "最近あったモヤモヤしたこと書いていってよ",
    "🕒いつ 📍どこ 👤なに 💭なにあったか、って感じでね",
    "全部埋めなくても大丈夫。適当でいいよ",
    "原型を忘れたいなら、ずらしレベルを最大にするのがおすすめ",
    "準備ができたら、そこの「変換」を押してみて",
    "適当に混ぜておくから、あとは忘れていいよ",
    "正論とか、今は一番いらないでしょ"
  ];

  function getContextualMessages() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      return [
        "まだ頭が起きてないから、適当に聞いておくね",
        "朝の空気、まだちょっと冷たいね",
        "コーヒーでも飲みながら、ゆっくり書いて",
        "朝からモヤモヤするの、損な感じするよね"
      ];
    } else if (hour >= 23 || hour < 5) {
      return [
        "……まだ起きてるの。お疲れさま",
        "こんな時間まで、大変だったね",
        "深夜のモヤモヤは、毒になりやすいからね",
        "ここに置いていけば、少しは軽くなるかもよ",
        "もう寝なよ、と言いたいけど。書くなら付き合うよ"
      ];
    } else {
      return [
        "ちょうど今、ぼーっとしてたところ",
        "それ、意外と溜まるやつだよね",
        "モヤモヤ、こっちで預からせてね",
        "役に立つことは言わないよ。期待しないでね",
        "今の、ちょっと文学的だったかも。気のせい？"
      ];
    }
  }

  let guideIndex = 0;
  let contextIndex = 0;
  let isGuideFinished = false;

  function showMessage() {
    let currentMessage = "";

    if (!isGuideFinished) {
      currentMessage = guideMessages[guideIndex];
      guideIndex++;
      if (guideIndex >= guideMessages.length) {
        isGuideFinished = true;
      }
    } else {
      const contextMessages = getContextualMessages();
      currentMessage = contextMessages[contextIndex];
      contextIndex = (contextIndex + 1) % contextMessages.length;
    }

    speech.textContent = currentMessage;
    speech.classList.add("show");

    // セリフを表示している時間
    const displayTime = 4500;
    // 消えてから次が出るまでの「余白」の時間
    const waitTime = isGuideFinished ? 4000 : 2000; // ガイド後はゆったり、ガイド中は少しテンポよく

    setTimeout(() => {
      speech.classList.remove("show");

      // セリフが完全に消えた後、一定時間待ってから次のセリフを予約する
      setTimeout(() => {
        // ガイド中、または80%の確率で次を喋る
        if (!isGuideFinished || Math.random() < 0.8) {
          showMessage();
        } else {
          // 20%の確率で喋らない場合でも、また数秒後に「喋るかどうかの判定」に戻す
          setTimeout(showMessage, 3000);
        }
      }, waitTime);

    }, displayTime);
  }

  // 初回表示（800ms後）
  setTimeout(showMessage, 800);
}

// --------------------
  // Input page
  // --------------------
  if (state.page === "input") {
    app.innerHTML = `
      ${illustBlock(1, 10)}

      <div class="form-area"> 
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <img src="assets/logo.png" alt="モヤほどきロゴ" class="cover-logo">
          <button id="menuBtn" class="menu-btn">☰</button>
        </div>

        <div class="char-container">
          <div class="char-icon">👤</div>
          <div id="speech" class="speech-bubble"></div>
        </div>

        ${state.menuOpen ? `
          <div class="menu">
            <button onclick="go('diary')">Diary</button>
            <button onclick="go('about')">About</button>
          </div>
        ` : ""}

        <div class="input-row">
          <span class="input-icon">👤</span>
          <input placeholder="（すれ違った人／猫／歩きスマホ…など）"
            value="${state.input.who}" 
            oninput="state.input.who=this.value">
        </div>

        <div class="input-row">
          <span class="input-icon">🕑</span>
          <input placeholder="（さっき／昨日／出発前…など）"
            value="${state.input.when}"
            oninput="state.input.when=this.value">
        </div>

        <div class="input-row">
          <span class="input-icon">📍</span>
          <input placeholder="（駅前／カフェ／道端…など）"
            value="${state.input.where}"
            oninput="state.input.where=this.value">
        </div>

        <select onchange="state.input.particle=this.value">
          <option value="で" ${state.input.particle === 'で' ? 'selected' : ''}>で</option>
          <option value="に" ${state.input.particle === 'に' ? 'selected' : ''}>に</option>
          <option value="も" ${state.input.particle === 'も' ? 'selected' : ''}>も</option>
        </select>

        <div class="input-row">
          <span class="input-icon">💭</span>
          <input placeholder="（座っていた／遮ってきた…など）"
            value="${state.input.what}"
            oninput="state.input.what=this.value">
        </div>

        <div class="small-note">ずらしレベル（原型をどれだけ壊すか）</div>
        <input type="range" min="1" max="3" value="${state.input.level}"
          oninput="state.input.level=this.value">
        
        <div class="button-group">
          <button onclick="transform(1)">変換してみる</button>
          <button onclick="transform(10)">10連ガチャ</button>
        </div>
      </div>
    `;

    document.getElementById("menuBtn").addEventListener("click", () => {
      state.menuOpen = !state.menuOpen;
      render();
    });

    initSpeech();
  }
  
  // --------------------
  // Result page
  // --------------------
  if (state.page === "result") {
    app.innerHTML = `
      ${state.batch.map(b => `
        <div class="result">${b}</div>
        <button onclick='toggleFav(${JSON.stringify(b)})'>
          ${state.favorites.includes(b) ? "★ お気に入り" : "☆ お気に入り"}
        </button>
        <hr>
      `).join("")}

      <button onclick="go('input')">戻る</button>
      <button onclick="go('letter')">おしまい</button>
    `;
  }

  // --------------------
  // Diary page
  // --------------------
  if (state.page === "diary") {
    app.innerHTML = `
      <h1>日記</h1>
      ${state.diary.map(d => `
        <div class="card">
          <b>${d.time}</b><br>${d.text}
        </div>
      `).join("")}
      <button onclick="go('input')">戻る</button>
    `;
  }

  // --------------------
  // About page
  // --------------------
  if (state.page === "about") {
    app.innerHTML = `
      <h1>モヤほどきについて</h1>
      <div class="info-box">
        「モヤほどき」は、解決が必要な悩みには全く役に立ちません。<br>
        アドバイスも、前向きな言葉も、ここにはありません。<br>
        ただ、あなたのモヤモヤを「変な文章」に作り替えて、 世界のどこかに混ぜてしまうだけの場所です。
      </div>
      <button onclick="go('input')">戻る</button>
    `;
  }

  // --------------------
  // Letter page
  // --------------------
  if (state.page === "letter") {
    app.innerHTML = `
      <h1>おしまい</h1>
      <div class="info-box">${rand(ENDINGS)}</div>
      <button onclick="go('input')">ホーム</button>
      <button onclick="go('diary')">日記を見る</button>
    `;
  }
}


// --------------------
function toggleFav(text) {
  if (state.favorites.includes(text)) {
    state.favorites = state.favorites.filter(f => f !== text);
  } else {
    state.favorites.push(text);
  }
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  render();
}

function go(page) {
  state.page = page;
  render();
}

function transform(times) {
  state.batch = [];
  state.page = "result";

  const app = document.getElementById("app");
  app.innerHTML = `<div class="small-note">言葉を探しています…</div>`;

  let i = 0;

  setTimeout(() => {
    app.innerHTML = `<div id="results"></div>
      <button onclick="go('input')">戻る</button>
      <button onclick="go('letter')">おしまい</button>
    `;

    const box = document.getElementById("results");

    const timer = setInterval(() => {
      const s = generateSentence();
      state.batch.push(s);
      saveDiary(s);

      const div = document.createElement("div");
      div.className = "result pop";
      div.textContent = s;

      box.appendChild(div);

      i++;
      if (i >= times) clearInterval(timer);
    }, 400);
  }, 800);
}

// init
render();
