/// https://kanjicards.org/kanji-list-by-jlpt-level.html
/// https://www.youtube.com/watch?v=ERGfmpOVl4Q

// export type Kanji =
// 	'一' |
// 	'二' |
// 	'三' |
// 	'四' |
// 	'五' |
// 	'六' |
// 	'七' |
// 	'八' |
// 	'九' |
// 	'十' |
// 	'百' |
// 	'千' |
// 	'万' |
// 	'円' |
// 	'日' |
// 	'月' |
// 	'本' |
// 	'人' |
// 	'月' |
// 	'火' |
// 	'水' |
// 	'木' |
// 	'金' |
// 	'土' |
// 	'曜' |
// 	'時' |
// 	'分' |
// 	'半' |
// 	'今' |
// 	'午' |
// 	'前' |
// 	'後' |
// 	'午' |
// 	'半' |
// 	'何' |
// 	'年' |
// 	'間' |
// 	'週' |
// 	'今' |
// 	'昨' |
// 	'明'

export const answer_key: Map<string, string> = new Map([
	/* Numbers */
	// ['一', 'one'],
	// ['二', 'two'],
	// ['三', 'three'],
	// ['四', 'four'],
	// ['五', 'five'],
	// ['六', 'six'],
	// ['七', 'seven'],
	// ['八', 'eight'],
	// // ['九', 'nine'],
	// // ['十', 'ten'],
	// ['百', 'hundred'],
	// // ['千', 'thousand'],
	// ['万', 'ten thousand'],
	/* Relative terms */
	// ['上', 'up/above'],
	// ['下', 'down/below'],
	// ['右', 'right'],
	// ['左', 'left'],
	// ['中', 'middle'],
	// ['外', 'outside'],
	//? ['内', 'inside'],
	// ['大', 'big'],
	// ['小', 'small'],
	// ['長', 'long/leader'],
	// //? ['短', 'short'],
	// //? ['前', 'front'],
	// //? ['後', 'back'],
	// //? ['高', 'tall'],
	// ['前', 'front/previous'],
	// ['先', 'ahead/before/previous'],
	// ['後', 'back/behind/after/later'],
	// /* Nature */
	// // ['日', 'sun/day'],
	// // ['月', 'moon/month'],
	// // ['火', 'fire'],
	// // ['水', 'water'],
	// ['川', 'river'],
	// // ['木', 'tree/wood'],
	// // ['林', 'woods/forest'],
	// ['山', 'mountain'],
	// // ['土', 'dirt/soil/earth/ground'],
	// // ['白', 'white'],
	// ['金', 'gold/money/metal'],
	// // ['人', 'person'],
	// ['生', 'life/birth'],
	// ['子', 'child'],
	// ['女', 'woman/female'],
	// ['男', 'male/man'],
	/* Body */
	// ['目', 'eye'],
	// ['耳', 'ear'],
	// ['口', 'mouth'],
	// ['手', 'hand'],
	// ['足', 'foot'],
	//? ['頭', 'head'],
	//? ['顔', 'face'],
	//? ['鼻', 'nose'],
	/* Animals */
	//? ['犬', 'dog'],
	//? ['猫', 'cat'],
	//? ['魚', 'fish'],
	//? ['鳥', 'bird'],
	//? ['馬', 'horse'],
	//? ['牛', 'cow'],
	/* Sounds */
	//? ['鳴', 'cry'],
	//? ['鳴', 'sing'],
	//? ['鳴', 'bark'],
	//? ['鳴', 'meow'],
	//? ['鳴', 'neigh'],
	//? ['鳴', 'moo'],
	//? ['鳴', 'tweet'],
	//? ['鳴', 'whinny'],
	/* Time */
	//? ['曜', 'day of the week'],
	//? ['時', 'time'],
	//? ['分', 'minute'],
	//? ['半', 'half'],
	//? ['今', 'now'],
	//? ['午', 'noon'],
	//? ['前', 'before'],
	//? ['後', 'after'],
	//? ['何', 'what'],
	// ['年', 'year'],
	//? ['間', 'interval'],
	//? ['週', 'week'],
	//? ['今', 'now'],
	//? ['昨', 'yesterday'],
	//? ['明', 'tomorrow'],
	/* Actions */
	// ['休', 'rest'],
	//? ['食', 'eat'],
	//? ['飲', 'drink'],
	//? ['立', 'stand'],
	//? ['座', 'sit'],
	//? ['歩', 'walk'],
	//? ['走', 'run'],
	//? ['読', 'read'],
	// ['書', 'write'],
	// ['話', 'speak/talk/tale'],
	// //? ['聞', 'listen'],
	// ['見', 'see/look/perspective'],
	// ['止', 'stop'],
	// //? ['行', 'go'],
	// ['来', 'come/due/next/cause/become'],
	// ['学', 'study'],
	// ['出', 'exit'],
	// ['入', 'enter'],
	// /* Places */
	// ['国', 'country'],
	// /* Objects */
	// ['車', 'car'],
	// ['円', 'circle/yen/round'],
	// ['本', 'book'],
	// /* Other */
	// ['気', 'spirit/mind/air'],
	// ['名', 'name'],
	/* Unorganized: */
	// ['時', 'time/hour'],
	// ['行', 'go/journey'],
	// ['分', 'minute/part'],
	// ['間', 'interval/space'],
	// ['東', 'east'],
	// ['今', 'now'],
	// ['高', 'tall/high/expensive'],
	// ['校', 'school/exam'],
	// ['外', 'outside'],
	// ['北', 'north'],
	// ['午', 'noon'],
	// ['半', 'half'],
	// ['白', 'white'],
	// ['西', 'west'],
	// ['電', 'electricity'],
	// ['天', 'heaven/sky'],
	// ['語', 'language/word'],
	// ['聞', 'listen'],
	// ['食', 'eat/food'],
	// ['何', 'what'],
	// ['南', 'south'],
	// ['火', 'fire'],
	// ['右', 'right side'],
	// ['万', 'ten thousand'],
	// ['左', 'left side'],
	// ['休', 'rest'],
	// ['毎', 'every'],
	// ['母', 'mother'],
	// ['読', 'read'],
	// ['友', 'friend'],
	// ['父', 'father'],
	// ['雨', 'rain'],

	/// JLPT Level 3
	/// 立 手 力 目 田 正 文 会 同 自 社 地 方 新 場 口 町 明 京 空 通 言 理 体 作 用 強 足 公 野 思 家 多 心 教 早 元 近 考 画 海 売 知 道 計 事 朝 字 発 台 広 音 者 業 員 開 少 問 代 工 動 止 主 題 切 意 度 持 花 赤 青 世 安 楽 院 店 界 親 重 集 物 使 品 死 始 運 終 答 夜 住 帰 真 古 有 歌 買 急 送 図 週 室 歩 転 不 風 紙 研 黒 春 以 究 起 着 病 待 族 色 銀 走 秋 夏 医 仕 去 別 味 写 特 夕 注 料 建 悪 館 屋 試 験 英 習 曜 駅 肉 洋 旅 鳥 質 冬 犬 服 昼 茶 私 弟 飲 牛 魚 兄 勉 映 借 妹 堂 姉 飯 貸 漢 
	// ['立', 'stand'],
	// ['手', 'hand'],
	// ['力', 'power'],
	// ['目', 'eye'],
	// ['田', 'rice field'],
	// ['正', 'correct'],
	// ['文', 'writing/art'],
	// ['会', 'meeting'],
	// ['同', 'same/equal'],
	// ['自', 'oneself'],
	// ['社', 'company'],
	// ['地', 'ground'],
	// ['方', 'direction/person/alternative'],
	// ['新', 'new'],
	// ['場', 'location/place'],
	// ['口', 'mouth'],
	// ['町', 'town/street'],
	// ['明', 'bright/light'],
	// ['京', 'capital'],
	// ['空', 'empty/sky'],
	// ['通', 'avenue/traffic/pass through'],
	// ['言', 'speech'],
	// ['理', 'logic/reason'],
	// ['体', 'body/substance'],
	/// Meanings unverified:
	// ['作', 'make'],
	// ['用', 'use'],
	// ['強', 'strong'],
	// ['足', 'foot'],
	// ['公', 'public'],
	// ['野', 'field'],
	// ['思', 'think'],
	// ['家', 'house'],
	// ['多', 'many'],
	// ['心', 'heart'],
	// ['教', 'teach'],
	// ['早', 'early'],
	// ['元', 'beginning'],
	// ['近', 'near'],
	// ['考', 'think'],
	// ['画', 'picture'],
	// ['海', 'sea'],
	// ['売', 'sell'],
	// ['知', 'know'],
	// ['道', 'road'],
	// ['計', 'measure'],
	// ['事', 'thing'],
	// ['朝', 'morning'],
	// ['字', 'character'],
	// ['発', 'departure'],
	// ['台', 'pedestal'],
	// ['広', 'wide'],
	// ['音', 'sound'],
	// ['者', 'person'],
	// ['業', 'business'],
	// ['員', 'member'],
	// ['開', 'open'],
	// ['少', 'few'],
	// ['問', 'question'],
	// ['代', 'substitute'],
	// ['工', 'craft'],
	// ['動', 'move'],
	// ['止', 'stop'],
	// ['主', 'main'],
	// ['題', 'topic'],
	// ['切', 'cut'],
	// ['意', 'idea'],
	// ['度', 'degrees'],
	// ['持', 'hold'],
	// ['花', 'flower'],
	// ['赤', 'red'],
	// ['青', 'blue'],
	// ['世', 'world'],
	// ['安', 'cheap'],
	// ['楽', 'music'],
	// ['院', 'institution'],
	// ['店', 'store'],
	// ['界', 'world'],
	// ['親', 'parent'],
	// ['重', 'heavy'],
	// ['集', 'gather'],
	// ['物', 'thing'],
	// ['使', 'use'],
	// ['品', 'goods'],
	// ['死', 'death'],
	// ['始', 'begin'],
	// ['運', 'carry'],
	// ['終', 'end'],
	// ['答', 'answer'],
	// ['夜', 'night'],
	// ['住', 'live'],
	// ['帰', 'return'],
	// ['真', 'true'],
	// ['古', 'old'],
	// ['有', 'have'],
	// ['歌', 'song'],
	// ['買', 'buy'],
	// ['急', 'hurry'],
	// ['送', 'send'],
	// ['図', 'map'],
	// ['週', 'week'],
	// ['室', 'room'],
	// ['歩', 'walk'],
	// ['転', 'revolve'],
	// ['不', 'non-'],
	// ['風', 'wind'],
	// ['紙', 'paper'],
	// ['研', 'polish'],
	// ['黒', 'black'],
	// ['春', 'spring'],
	// ['以', 'by means of'],
	// ['究', 'research'],
	// ['起', 'wake up'],
	// ['着', 'wear'],
	// ['病', 'sick'],
	// ['待', 'wait'],
	// ['族', 'tribe'],
	// ['色', 'color'],
	// ['銀', 'silver'],
	// ['走', 'run'],
	// ['秋', 'autumn'],
	// ['夏', 'summer'],
	// ['医', 'medicine'],
	// ['仕', 'do'],
	// ['去', 'leave'],
	// ['別', 'separate'],
	// ['味', 'flavor'],
	// ['写', 'copy'],
	// ['特', 'special'],
	// ['夕', 'evening'],
	// ['注', 'pour'],
	// ['料', 'fee'],
	// ['建', 'build'],
	// ['悪', 'bad'],
	// ['館', 'building'],
	// ['屋', 'roof'],
	// ['試', 'test'],
	// ['験', 'test'],
	// ['英', 'English'],
	// ['習', 'learn'],
	// ['曜', 'weekday'],
	// ['駅', 'station'],
	// ['肉', 'meat'],
	// ['洋', 'ocean'],
	// ['旅', 'travel'],
	// ['鳥', 'bird'],
	// ['質', 'quality'],
	// ['冬', 'winter'],
	// ['犬', 'dog'],
	// ['服', 'clothes'],
	// ['昼', 'daytime'],
	// ['茶', 'tea'],
	// ['私', 'private'],
	// ['弟', 'younger brother'],
	// ['飲', 'drink'],
	// ['牛', 'cow'],
	// ['魚', 'fish'],
	// ['兄', 'elder brother'],
	// ['勉', 'exertion'],
	// ['映', 'reflect'],
	// ['借', 'borrow'],
	// ['妹', 'younger sister'],
	// ['堂', 'public chamber'],
	// ['姉', 'elder sister'],
	// ['飯', 'meal'],
	// ['貸', 'lend'],
	// ['漢', 'China'],
	// End meanings unverified.
	////

	/// Kyoiku Kanji
	['一', 'one'],
	['二', 'two'],
	['三', 'three'],
	['四', 'four'],
	['五', 'five'],
	['六', 'six'],
	['七', 'seven'],
	['八', 'eight'],
	['九', 'nine'],
	['十', 'ten'],
	['百', 'hundred'],
	['千', 'thousand'],
	['上', 'top, above'],
	['下', 'bottom, below'],
	['左', 'left'],
	['右', 'right'],
	['中', 'inside, middle'],
	['大', 'large'],
	['小', 'small'],
	['月', 'month, moon'],
	['日', 'day, sun'],
	['年', 'year'],
	['早', 'early'],
	['木', 'tree'],
	['林', 'woods'],
	['山', 'mountain'],
	['川', 'river'],
	['土', 'soil'],
	['空', 'sky'],
	['田', 'rice field'],
	['天', 'heaven, sky'],
	['生', 'living, birth, raw'],
	['花', 'flower'],
	['草', 'grass'],
	['虫', 'insect'],
	['犬', 'dog'],
	['人', 'person'],
	['名', 'name'],
	['女', 'female'],
	['男', 'male'],
	['子', 'child'],
	['目', 'eye'],
	['耳', 'ear'],
	['口', 'mouth'],
	['手', 'hand'],
	['足', 'foot, suffice'],
	['見', 'see'],
	['音', 'sound'],
	['力', 'power'],
	['気', 'spirit, air'],
	['円', 'yen, circle'],
	['入', 'enter'],
	['出', 'exit'],
	['立', 'stand up'],
	['休', 'rest'],
	['先', 'previous'],
	['夕', 'evening'],
	['本', 'book'],
	['文', 'text'],
	['字', 'character'],
	['学', 'study'],
	['校', 'school'],
	['村', 'village'],
	['町', 'town'],
	['森', 'forest'],
	['正', 'correct'],
	['水', 'water'],
	['火', 'fire'],
	['玉', 'jewel, ball'],
	['王', 'king'],
	['石', 'stone'],
	['竹', 'bamboo'],
	['糸', 'thread'],
	['貝', 'shellfish'],
	['車', 'vehicle'],
	['金', 'gold, money'],
	['雨', 'rain'],
	['赤', 'red'],
	['青', 'blue'],
	['白', 'white'],

	['数', 'number, count'],
	['多', 'many, much'],
	['少', 'a few, a little'],
	['万', 'ten thousand'],
	['半', 'half'],
	['形', 'shape'],
	['太', 'thick'],
	['細', 'thin'],
	['広', 'wide'],
	['長', 'long, leader'],
	['点', 'point'],
	['丸', 'circle'],
	['交', 'intersect'],
	['光', 'light'],
	['角', 'corner, horn'],
	['計', 'measure'],
	['直', 'straight, fix'],
	['線', 'line'],
	['矢', 'arrow'],
	['弱', 'weak'],
	['強', 'strong'],
	['高', 'high'],
	['同', 'same'],
	['親', 'parent'],
	['母', 'mother'],
	['父', 'father'],
	['姉', 'older sister'],
	['兄', 'older brother'],
	['弟', 'younger brother'],
	['妹', 'younger sister'],
	['自', 'oneself'],
	['友', 'friend'],
	['体', 'body'],
	['毛', 'hair'],
	['頭', 'head'],
	['顔', 'face'],
	['首', 'neck'],
	['心', 'heart'],
	['時', 'time'],
	['曜', 'day of the week'],
	['朝', 'morning'],
	['昼', 'daytime'],
	['夜', 'night'],
	['分', 'minute, understand'],
	['週', 'week'],
	['春', 'spring'],
	['夏', 'summer'],
	['秋', 'autumn'],
	['冬', 'winter'],
	['今', 'now'],
	['新', 'new'],
	['古', 'old'],
	['間', 'interval'],
	['方', 'direction'],
	['北', 'north'],
	['南', 'south'],
	['東', 'east'],
	['西', 'west'],
	['遠', 'far'],
	['近', 'near'],
	['前', 'before'],
	['後', 'after'],
	['内', 'inside'],
	['外', 'outside'],
	['場', 'place'],
	['地', 'ground'],
	['国', 'country'],
	['園', 'garden'],
	['谷', 'valley'],
	['野', 'field'],
	['原', 'meadow, plain'],
	['里', 'hometown'],
	['市', 'city'],
	['京', 'capital'],
	['風', 'wind, -style'],
	['雪', 'snow'],
	['雲', 'cloud'],
	['池', 'pond'],
	['海', 'sea'],
	['岩', 'rock'],
	['星', 'star'],
	['室', 'room'],
	['戸', 'door'],
	['家', 'house'],
	['寺', 'Buddhist temple'],
	['通', 'pass through, commute'],
	['門', 'gates'],
	['道', 'road'],
	['話', 'talk'],
	['言', 'say'],
	['答', 'answer'],
	['声', 'voice'],
	['聞', 'hear, listen, ask'],
	['語', 'language'],
	['読', 'read'],
	['書', 'write'],
	['記', 'record'],
	['紙', 'paper'],
	['画', 'brush stroke'],
	['絵', 'picture'],
	['図', 'drawing'],
	['工', 'craft'],
	['教', 'teach'],
	['晴', 'clear'],
	['思', 'think'],
	['考', 'consider'],
	['知', 'know'],
	['才', 'age, ability'],
	['理', 'reason'],
	['算', 'calculate'],
	['作', 'make'],
	['元', 'origin'],
	['食', 'eat'],
	['肉', 'meat'],
	['馬', 'horse'],
	['牛', 'cow'],
	['魚', 'fish'],
	['鳥', 'bird'],
	['羽', 'feather'],
	['鳴', 'chirp'],
	['麦', 'wheat'],
	['米', 'rice'],
	['茶', 'tea'],
	['色', 'colour'],
	['黄', 'yellow'],
	['黒', 'black'],
	['来', 'come'],
	['行', 'go'],
	['帰', 'return'],
	['歩', 'walk'],
	['走', 'run'],
	['止', 'stop'],
	['活', 'active'],
	['店', 'store'],
	['買', 'buy'],
	['売', 'sell'],
	['午', 'noon'],
	['汽', 'steam'],
	['弓', 'bow'],
	['回', 'number of times, revolve'],
	['会', 'meet'],
	['組', 'team'],
	['船', 'ship'],
	['明', 'bright'],
	['社', 'company'],
	['切', 'cut'],
	['電', 'electricity'],
	['毎', 'every'],
	['合', 'fit'],
	['当', 'this, hit'],
	['台', 'pedestal'],
	['楽', 'music, pleasure'],
	['公', 'public'],
	['引', 'pull'],
	['科', 'section, grade'],
	['歌', 'song'],
	['刀', 'sword'],
	['番', 'number'],
	['用', 'use'],
	['何', 'what'],

	['丁', 'street, district'],
	['世', 'generation'],
	['両', 'both'],
	['主', 'master, main'],
	['乗', 'ride'],
	['予', 'beforehand'],
	['事', 'intangible thing'],
	['仕', 'serve'],
	['他', 'other'],
	['代', 'era, substitute'],
	['住', 'dwell'],
	['使', 'use'],
	['係', 'person in charge'],
	['倍', 'double'],
	['全', 'whole'],
	['具', 'tool'],
	['写', 'copy'],
	['列', 'row'],
	['助', 'help'],
	['勉', 'diligence'],
	['動', 'move'],
	['勝', 'win'],
	['化', 'change'],
	['区', 'district'],
	['医', 'doctor'],
	['去', 'leave'],
	['反', 'anti-'],
	['取', 'take'],
	['受', 'receive'],
	['号', 'number'],
	['向', 'face'],
	['君', 'you, monarch'],
	['味', 'flavor'],
	['命', 'fate, life'],
	['和', 'harmony, Japanese'],
	['品', 'article'],
	['員', 'employee'],
	['商', 'commerce'],
	['問', 'question'],
	['坂', 'slope'],
	['央', 'center'],
	['始', 'begin'],
	['委', 'committee'],
	['守', 'protect'],
	['安', 'cheap, calm'],
	['定', 'determine'],
	['実', 'fruit, realization'],
	['客', 'guest'],
	['宮', 'Shinto shrine, prince'],
	['宿', 'inn'],
	['寒', 'cold (weather)'],
	['対', 'opposite, against'],
	['局', 'office'],
	['屋', 'roof'],
	['岸', 'shore'],
	['島', 'island'],
	['州', 'state, province'],
	['帳', 'notebook'],
	['平', 'flat'],
	['幸', 'happiness'],
	['度', 'degree'],
	['庫', 'warehouse'],
	['庭', 'yard'],
	['式', 'style, ceremony, numerical formula'],
	['役', 'role'],
	['待', 'wait'],
	['急', 'hurry'],
	['息', 'breath'],
	['悪', 'bad'],
	['悲', 'sad'],
	['想', 'thought'],
	['意', 'idea'],
	['感', 'feel'],
	['所', 'place'],
	['打', 'hit'],
	['投', 'throw'],
	['拾', 'pick up'],
	['持', 'hold'],
	['指', 'finger, point'],
	['放', 'release'],
	['整', 'organize'],
	['旅', 'trip'],
	['族', 'tribe'],
	['昔', 'long ago'],
	['昭', 'shine'],
	['暑', 'hot'],
	['暗', 'dark'],
	['曲', 'melody, curve'],
	['有', 'possess'],
	['服', 'clothes'],
	['期', 'period of time'],
	['板', 'board'],
	['柱', 'pillar'],
	['根', 'root'],
	['植', 'plant'],
	['業', 'business'],
	['様', 'appearance'],
	['横', 'horizontal'],
	['橋', 'bridge'],
	['次', 'next'],
	['歯', 'tooth'],
	['死', 'death'],
	['氷', 'ice'],
	['決', 'decide'],
	['油', 'oil'],
	['波', 'wave'],
	['注', 'pour'],
	['泳', 'swim'],
	['洋', 'ocean'],
	['流', 'stream'],
	['消', 'extinguish'],
	['深', 'deep'],
	['温', 'warm'],
	['港', 'harbor'],
	['湖', 'lake'],
	['湯', 'hot water'],
	['漢', 'Chinese'],
	['炭', 'charcoal'],
	['物', '(tangible) thing'],
	['球', 'sphere'],
	['由', 'reason'],
	['申', 'say'],
	['界', 'world'],
	['畑', 'farm'],
	['病', 'sick'],
	['発', 'departure'],
	['登', 'climb'],
	['皮', 'skin'],
	['皿', 'dish'],
	['相', 'mutual'],
	['県', 'prefecture'],
	['真', 'true'],
	['着', 'wear, arrive'],
	['短', 'short'],
	['研', 'sharpen'],
	['礼', 'manners'],
	['神', 'deity'],
	['祭', 'festival'],
	['福', 'luck'],
	['秒', 'second'],
	['究', 'research'],
	['章', 'chapter'],
	['童', 'juvenile'],
	['笛', 'flute'],
	['第', 'ordinal'],
	['筆', 'writing brush'],
	['等', 'class'],
	['箱', 'box'],
	['級', 'rank'],
	['終', 'end'],//X
	['緑', 'green'],
	['練', 'practice'],
	['羊', 'sheep'],
	['美', 'beauty'],
	['習', 'learn'],
	['者', 'someone'],
	['育', 'raise'],
	['苦', 'suffer, bitter'],
	['荷', 'luggage'],
	['落', 'fall'],
	['葉', 'leaf'],
	['薬', 'medicine'],
	['血', 'blood'],
	['表', 'express'],
	['詩', 'poem'],
	['調', 'tone, find'],
	['談', 'discuss'],
	['豆', 'beans'],
	['負', 'lose'],
	['起', 'awaken'],
	['路', 'path'],
	['身', 'body'],
	['転', 'to shift, fall down'],
	['軽', 'light'],
	['農', 'agriculture'],
	['返', 'return'],
	['追', 'follow'],
	['送', 'send'],
	['速', 'fast'],
	['進', 'progress'],
	['遊', 'play'],
	['運', 'carry'],
	['部', 'part'],
	['都', 'metropolis'],
	['配', 'distribute'],
	['酒', 'liquor'],
	['重', 'heavy, gravity, pile'],
	['鉄', 'iron'],
	['銀', 'silver'],
	['開', 'open'],
	['院', 'institution'],
	['陽', 'sun'],
	['階', 'storey'],
	['集', 'gather'],
	['面', 'surface'],
	['題', 'topic'],
	['飲', 'drink'],
	['館', 'public building'],
	['駅', 'station'],
	['鼻', 'nose'],

	['不', 'not'],
	['争', 'conflict'],
	['付', 'attach'],
	['令', 'orders'],
	['以', 'reference point'],
	['仲', 'relationship'],
	['伝', 'convey'],
	['位', 'rank'],
	['低', 'low'],
	['例', 'example'],
	['便', 'facility, flight, mail'],
	['信', 'trust'],
	['倉', 'storage'],
	['候', 'climate'],
	['借', 'borrow'],
	['停', 'halt'],
	['健', 'healthy'],
	['側', 'side'],
	['働', 'work'],
	['億', 'hundred million'],
	['兆', 'portent, trillion'],
	['児', 'offspring'],
	['共', 'together'],
	['兵', 'soldier'],
	['典', 'code'],
	['冷', 'cool'],
	['初', 'first'],
	['別', 'separate'],
	['利', 'profit'],
	['刷', 'printing'],
	['副', 'vice-'],
	['功', 'achievement'],
	['加', 'add'],
	['努', 'toil'],
	['労', 'labor'],
	['勇', 'courage'],
	['包', 'wrap'],
	['卒', 'graduate'],
	['協', 'cooperation'],
	['単', 'simple'],
	['博', 'wide knowledge, Dr.'],
	['印', 'mark'],
	['参', 'participate'],
	['史', 'history'],
	['司', 'director'],
	['各', 'each'],
	['告', 'tell'],
	['周', 'circumference'],
	['唱', 'chant'],
	['喜', 'rejoice, joy'],
	['器', 'container'],
	['囲', 'surround'],
	['固', 'harden'],
	['型', 'model'],
	['堂', 'public chamber'],
	['塩', 'salt'],
	['士', 'gentleman'],
	['変', 'change, strange'],
	['夫', 'husband'],
	['失', 'lose'],
	['好', 'like'],
	['季', 'seasons'],
	['孫', 'grandchild'],
	['完', 'perfect'],
	['官', 'government official'],
	['害', 'harm'],
	['察', 'guess'],
	['巣', 'nest'],
	['差', 'distinction'],
	['希', 'hope'],
	['席', 'seat'],
	['帯', 'sash'],
	['底', 'bottom'],
	['府', 'urban prefecture'],
	['康', 'ease'],
	['建', 'build'],
	['径', 'diameter'],
	['徒', 'junior'],
	['得', 'acquire'],
	['必', 'inevitable'],
	['念', 'thought'],
	['愛', 'love'],
	['成', 'become'],
	['戦', 'war'],
	['折', 'fold, break'],
	['挙', 'raise'],
	['改', 'reformation'],
	['救', 'salvation'],
	['敗', 'break, failure'],
	['散', 'scatter'],
	['料', 'fee'],
	['旗', 'flag'],
	['昨', 'yesterday'],
	['景', 'scenery'],
	['最', 'superlative'],
	['望', 'hope'],
	['未', 'un-'],
	['末', 'end'],
	['札', 'bill, plate, tag'],
	['材', 'lumber, material'],
	['束', 'bundle'],
	['松', 'pine'],
	['果', 'accomplish, fruit'],
	['栄', 'prosperity'],
	['案', 'plan'],
	['梅', 'plum'],
	['械', 'contraption'],
	['極', 'poles'],
	['標', 'signpost'],
	['機', 'machine'],
	['欠', 'lack'],
	['歴', 'curriculum'],
	['残', 'remainder, left'],
	['殺', 'kill'],
	['毒', 'poison'],
	['氏', 'surname, Mr.'],
	['民', 'people'],
	['求', 'request'],
	['治', 'govern, heal'],
	['法', 'method'],
	['泣', 'cry'],
	['浅', 'shallow'],
	['浴', 'bathe, bask'],
	['清', 'pure'],
	['満', 'full'],
	['漁', 'look for, fishing'],
	['灯', 'lamp'],
	['無', 'nothing'],
	['然', 'so, although'],
	['焼', 'bake'],
	['照', 'illuminate'],
	['熱', 'heat'],
	['牧', 'pasture, breed'],
	['特', 'special'],
	['産', 'give birth'],
	['的', 'target'],
	['省', 'government ministry, omit, look back'],
	['祝', 'celebrate'],
	['票', 'ballot'],
	['種', 'species, seed'],
	['積', 'accumulate, pile'],
	['競', 'emulate'],
	['笑', 'laugh'],
	['管', 'pipe'],
	['節', 'node'],
	['粉', 'flour'],
	['紀', 'chronicle'],
	['約', 'promise'],
	['結', 'tie'],
	['給', 'salary'],
	['続', 'continue'],
	['置', 'put'],
	['老', 'old man'],
	['胃', 'stomach'],
	['脈', 'vein'],
	['腸', 'intestines'],
	['臣', 'retainer'],
	['航', 'cruise'],
	['良', 'good'],
	['芸', 'art'],
	['芽', 'bud'],
	['英', 'England'],
	['菜', 'vegetable'],
	['街', 'street, city'],
	['衣', 'garment'],
	['要', 'need'],
	['覚', 'memorize'],
	['観', 'observe'],
	['訓', 'instruction'],
	['試', 'test'],
	['説', 'theory'],
	['課', 'section'],
	['議', 'deliberation'],
	['象', 'elephant, figure'],
	['貨', 'currency, cargo'],
	['貯', 'savings'],
	['費', 'expense'],
	['賞', 'prize'],
	['軍', 'army'],
	['輪', 'wheel'],
	['辞', 'resign, speech, encyclopedia'],
	['辺', 'edge, vicinity'],
	['連', 'take along'],
	['達', 'attain'],
	['選', 'choose'],
	['郡', 'county'],
	['量', 'quantity'],
	['録', 'transcript'],
	['鏡', 'mirror'],
	['関', 'related'],
	['陸', 'land'],
	['隊', 'squad'],
	['静', 'quiet'],
	['順', 'obey'],
	['願', 'request'],
	['類', 'sort'],
	['飛', 'fly'],
	['飯', 'meal'],
	['養', 'foster'],
	['験', 'verify'],

	['久', 'long time'],
	['仏', 'Buddha'],
	['仮', 'sham'],
	['件', 'affair'],
	['任', 'responsibility'],
	['似', 'resemble'],
	['余', 'surplus'],
	['価', 'value'],
	['保', 'preserve'],
	['修', 'discipline'],
	['俵', 'straw bag'],
	['個', 'individual'],
	['備', 'provide'],
	['像', 'statue'],
	['再', 'again'],
	['刊', 'publish'],
	['判', 'judge'],
	['制', 'control'],
	['券', 'ticket'],
	['則', 'rule'],
	['効', 'effect'],
	['務', 'duty'],
	['勢', 'energy'],
	['厚', 'thick'],
	['句', 'phrase'],
	['可', 'possible'],
	['営', 'manage'],
	['因', 'cause'],
	['団', 'association'],
	['圧', 'pressure'],
	['在', 'exist'],
	['均', 'level'],
	['基', 'foundation'],
	['報', 'report'],
	['境', 'boundary'],
	['墓', 'grave'],
	['増', 'increase'],
	['夢', 'dream'],
	['妻', 'wife'],
	['婦', 'lady'],
	['容', 'contain'],
	['寄', 'approach'],
	['富', 'abundant'],
	['導', 'guide'],
	['居', 'reside'],
	['属', 'belong'],
	['布', 'linen'],
	['師', 'expert'],
	['常', 'normal'],
	['幹', 'tree trunk'],
	['序', 'preface'],
	['弁', 'valve'],
	['張', 'stretch'],
	['往', 'journey'],
	['復', 'recovery'],
	['徳', 'virtue'],
	['志', 'intention'],
	['応', 'respond'],
	['快', 'cheerful'],
	['性', 'gender'],
	['恩', 'grace'],
	['情', 'feelings'],
	['態', 'condition'],
	['慣', 'accustomed'],
	['承', 'acquiesce'],
	['技', 'skill'],
	['招', 'beckon'],
	['授', 'instruct'],
	['採', 'pick'],
	['接', 'contact'],
	['提', 'propose'],
	['損', 'loss'],
	['支', 'support'],
	['政', 'politics'],
	['故', 'circumstances'],
	['敵', 'enemy'],
	['断', 'decline, refuse'],
	['旧', 'old times'],
	['易', 'easy'],
	['暴', 'outburst'],
	['条', 'clause'],
	['枝', 'branch'],
	['査', 'investigate'],
	['格', 'status'],
	['桜', 'cherry'],
	['検', 'examine'],
	['構', 'construct'],
	['武', 'military'],
	['比', 'compare'],
	['永', 'eternity'],
	['河', 'stream'],
	['液', 'fluid'],
	['混', 'mix'],
	['減', 'decrease'],
	['測', 'measure'],
	['準', 'standard'],
	['演', 'perform'],
	['潔', 'undefiled'],
	['災', 'disaster'],
	['燃', 'burn'],
	['版', 'printing block'],
	['犯', 'crime'],
	['状', 'form'],
	['独', 'alone'],
	['率', 'rate'],
	['現', 'appear'],
	['留', 'detain'],
	['略', 'abbreviation'],
	['益', 'benefit'],
	['眼', 'eyeball'],
	['破', 'rend'],
	['確', 'certain'],
	['示', 'indicate'],
	['祖', 'ancestor'],
	['禁', 'prohibition'],
	['移', 'shift'],
	['程', 'extent'],
	['税', 'tax'],
	['築', 'fabricate'],
	['精', 'refined'],
	['素', 'elementary'],
	['経', 'manage'],
	['統', 'relationship'],
	['絶', 'discontinue'],
	['綿', 'cotton'],
	['総', 'whole'],
	['編', 'compile'],
	['績', 'exploits'],
	['織', 'weave'],
	['罪', 'guilt'],
	['群', 'flock'],
	['義', 'righteousness'],
	['耕', 'till'],
	['職', 'employment'],
	['肥', 'fertilizer'],
	['能', 'ability'],
	['興', 'entertain'],
	['舌', 'tongue'],
	['舎', 'cottage'],
	['術', 'art'],
	['衛', 'defense'],
	['製', 'manufacture'],
	['複', 'duplicate'],
	['規', 'rule'],
	['解', 'untie'],
	['設', 'establish'],
	['許', 'permit'],
	['証', 'evidence'],
	['評', 'evaluate'],
	['講', 'lecture'],
	['謝', 'apologize'],
	['識', 'discriminating'],
	['護', 'safeguard'],
	['豊', 'bountiful'],
	['財', 'wealth'],
	['貧', 'poor'],
	['責', 'blame'],
	['貸', 'lend'],
	['貿', 'trade'],
	['賀', 'congratulations'],
	['資', 'resources'],
	['賛', 'approve'],
	['質', 'quality'],
	['輸', 'transport'],
	['述', 'state, express'],
	['迷', 'astray'],
	['退', 'retreat'],
	['逆', 'inverted'],
	['造', 'create'],
	['過', 'pass, exceed'],
	['適', 'suitable'],
	['酸', 'acid'],
	['鉱', 'mineral'],
	['銅', 'copper'],
	['銭', 'coin'],
	['防', 'prevent'],
	['限', 'limit'],
	['険', 'precipitous'],
	['際', 'occasion'],
	['雑', 'miscellaneous'],
	['非', 'negative'],
	['預', 'deposit'],
	['領', 'territory'],
	['額', 'amount'],
	['飼', 'domesticate'],

	['並', 'row'],
	['乱', 'chaos'],
	['乳', 'milk'],
	['亡', 'deceased'],
	['仁', 'kindness'],
	['供', 'offer'],
	['俳', 'actor'],
	['値', 'value'],
	['傷', 'wound'],
	['優', 'superior'],
	['党', 'political party'],
	['冊', 'counter for books'],
	['処', 'dispose'],
	['刻', 'engrave'],
	['割', 'divide'],
	['創', 'create'],
	['劇', 'drama'],
	['勤', 'diligence'],
	['危', 'dangerous'],
	['卵', 'egg'],
	['厳', 'strict'],
	['収', 'obtain'],
	['后', 'queen'],
	['否', 'negate'],
	['吸', 'suck'],
	['呼', 'call'],
	['善', 'virtue'],
	['困', 'quandary'],
	['垂', 'droop'],
	['城', 'castle'],
	['域', 'range'],
	['奏', 'play music'],
	['奮', 'stirred up'],
	['姿', 'shape'],
	['存', 'suppose'],
	['孝', 'filial piety'],
	['宅', 'home'],
	['宇', 'eaves'],
	['宗', 'religion'],
	['宙', 'mid-air'],
	['宝', 'treasure'],
	['宣', 'proclaim'],
	['密', 'secrecy'],
	['寸', 'measurement'],
	['専', 'specialty'],
	['射', 'shoot'],
	['将', 'leader'],
	['尊', 'revered'],
	['就', 'concerning'],
	['尺', 'measure of length'],
	['届', 'deliver'],
	['展', 'expand'],
	['層', 'stratum'],
	['己', 'self'],
	['巻', 'scroll'],
	['幕', 'curtain'],
	['干', 'dry'],
	['幼', 'infancy'],
	['庁', 'government office'],
	['座', 'sit'],
	['延', 'prolong'],
	['律', 'rhythm'],
	['従', 'obey'],
	['忘', 'forget'],
	['忠', 'loyalty'],
	['憲', 'constitution'],
	['我', 'ego'],
	['批', 'criticism'],
	['担', 'shouldering'],
	['拝', 'worship'],
	['拡', 'broaden'],
	['捨', 'discard'],
	['探', 'look for, search'],
	['推', 'infer'],
	['揮', 'brandish'],
	['操', 'maneuver'],
	['敬', 'respect'],
	['映', 'reflect'],
	['晩', 'nightfall'],
	['暖', 'warmth'],
	['暮', 'livelihood'],
	['朗', 'melodious'],
	['机', 'desk'],
	['枚', 'sheet of...'],
	['染', 'dye'],
	['株', 'stocks'],
	['棒', 'rod'],
	['模', 'imitation'],
	['権', 'rights'],
	['樹', 'trees'],
	['欲', 'longing'],
	['段', 'steps'],
	['沿', 'run alongside'],
	['泉', 'fountain'],
	['洗', 'wash'],
	['派', 'sect'],
	['済', 'settle'],
	['源', 'source'],
	['潮', 'tide'],
	['激', 'violent'],
	['灰', 'ashes'],
	['熟', 'ripen'],
	['片', 'one-sided'],
	['班', 'corps'],
	['異', 'uncommon'],
	['疑', 'doubt'],
	['痛', 'pain'],
	['皇', 'emperor'],
	['盛', 'prosper'],
	['盟', 'alliance'],
	['看', 'watch over'],
	['砂', 'sand'],
	['磁', 'magnet'],
	['私', 'me'],
	['秘', 'secret'],
	['穀', 'cereal'],
	['穴', 'hole'],
	['窓', 'window'],
	['筋', 'muscle'],
	['策', 'scheme'],
	['簡', 'simplicity'],
	['糖', 'sugar'],
	['系', 'lineage'],
	['紅', 'crimson'],
	['納', 'settlement'],
	['純', 'genuine'],
	['絹', 'silk'],
	['縦', 'vertical'],
	['縮', 'shrink'],
	['署', 'government office'],
	['翌', 'forthcoming'],
	['聖', 'holy'],
	['肺', 'lung'],
	['背', 'back'],
	['胸', 'chest, breast'],
	['脳', 'brain'],
	['腹', 'abdomen'],
	['臓', 'entrails'],
	['臨', 'lookover'],
	['至', 'climax'],
	['若', 'young'],
	['著', 'renowned'],
	['蒸', 'foment'],
	['蔵', 'storehouse'],
	['蚕', 'silkworm'],
	['衆', 'masses'],
	['裁', 'judge'],
	['装', 'attire'],
	['裏', 'rear'],
	['補', 'supplement'],
	['視', 'look at'],
	['覧', 'perusal'],
	['討', 'chastise'],
	['訪', 'visit'],
	['訳', 'translate, reason'],
	['詞', 'term'],
	['誌', 'document'],
	['認', 'recognize'],
	['誕', 'born'],
	['誠', 'sincerity'],
	['誤', 'mistake'],
	['論', 'argument, discussion'],
	['諸', 'various'],
	['警', 'admonish'],
	['貴', 'precious'],
	['賃', 'fare'],
	['遺', 'bequeath'],
	['郵', 'mail'],
	['郷', 'home town'],
	['針', 'needle'],
	['鋼', 'steel'],
	['閉', 'closed'],
	['閣', 'tower'],
	['降', 'descend'],
	['陛', 'majesty'],
	['除', 'exclude'],
	['障', 'hurt'],
	['難', 'difficult'],
	['革', 'leather'],
	['頂', 'top, receive'],
	['骨', 'bone'],

	['茨', 'caltrop'],
	['媛', 'beauty'],
	['岡', 'hill'],
	['潟', 'lagoon'],
	['岐', 'high'],
	['熊', 'bear'],
	['香', 'fragrant'],
	['佐', 'assist'],
	['埼', 'headland'],
	['崎', 'rough'],
	['滋', 'grow'],
	['鹿', 'deer'],
	['縄', 'rope'],
	['井', 'well'],
	['沖', 'pour'],
	['栃', 'horse chestnut'],
	['奈', 'but'],
	['梨', 'pear'],
	['阪', 'heights/slope'],
	['阜', 'mound'],

])
