/// https://kanjicards.org/kanji/2177.html

export type Kanji =
	'一' |
	'二' |
	'三' |
	'四' |
	'五' |
	'六' |
	'七' |
	'八' |
	'九' |
	'十' |
	'百' |
	'千' |
	'万' |
	'円' |
	'日' |
	'月' |
	'本' |
	'人' |
	'月' |
	'火' |
	'水' |
	'木' |
	'金' |
	'土' |
	'曜' |
	'時' |
	'分' |
	'半' |
	'今' |
	'午' |
	'前' |
	'後' |
	'午' |
	'半' |
	'何' |
	'年' |
	'間' |
	'週' |
	'今' |
	'昨' |
	'明'

export const answer_key: Map<Kanji, string> = new Map([
	/* Numbers */
	// ['一', 'one'],
	// ['二', 'two'],
	// ['三', 'three'],
	// ['四', 'four'],
	// ['五', 'five'],
	// ['六', 'six'],
	// ['七', 'seven'],
	['八', 'eight'],
	// ['九', 'nine'],
	// ['十', 'ten'],
	['百', 'hundred'],
	// ['千', 'thousand'],
	['万', 'ten thousand'],
	/* Relative terms */
	// ['上', 'up/above'],
	// ['下', 'down/below'],
	// ['右', 'right'],
	// ['左', 'left'],
	// ['中', 'middle'],
	// ['外', 'outside'],
	// ['内', 'inside'],
	['大', 'big'],
	['小', 'small'],
	['長', 'long/leader'],
	// ['短', 'short'],
	// ['前', 'front'],
	// ['後', 'back'],
	// ['高', 'tall'],
	/// before, ahead
	['先', 'ahead/before/previous'],
	/* Nature */
	// ['日', 'sun/day'],
	// ['月', 'moon/month'],
	// ['火', 'fire'],
	// ['水', 'water'],
	//river:
	['川', 'river'],
	// ['木', 'tree/wood'],
	// ['土', 'dirt/soil/earth/ground'],
	['山', 'mountain'],
	// ['白', 'white'],
	['金', 'gold/money/metal'],
	// ['人', 'person'],
	['生', 'life/birth'],
	['子', 'child'],
	['女', 'woman/female'],
	['男', 'male/man'],
	/* Body */
	['目', 'eye'],
	['耳', 'ear'],
	['口', 'mouth'],
	['手', 'hand'],
	['足', 'foot'],
	// ['頭', 'head'],
	// ['顔', 'face'],
	// ['鼻', 'nose'],
	/* Animals */
	// ['犬', 'dog'],
	// ['猫', 'cat'],
	// ['魚', 'fish'],
	// ['鳥', 'bird'],
	// ['馬', 'horse'],
	// ['牛', 'cow'],
	/* Sounds */
	// ['鳴', 'cry'],
	// ['鳴', 'sing'],
	// ['鳴', 'bark'],
	// ['鳴', 'meow'],
	// ['鳴', 'neigh'],
	// ['鳴', 'moo'],
	// ['鳴', 'tweet'],
	// ['鳴', 'whinny'],
	/* Time */
	// ['曜', 'day of the week'],
	// ['時', 'time'],
	// ['分', 'minute'],
	// ['半', 'half'],
	// ['今', 'now'],
	// ['午', 'noon'],
	// ['前', 'before'],
	// ['後', 'after'],
	// ['何', 'what'],
	['年', 'year'],
	// ['間', 'interval'],
	// ['週', 'week'],
	// ['今', 'now'],
	// ['昨', 'yesterday'],
	// ['明', 'tomorrow'],
	/* Actions */
	['休', 'rest'],
	// ['食', 'eat'],
	// ['飲', 'drink'],
	// ['立', 'stand'],
	// ['座', 'sit'],
	// ['歩', 'walk'],
	// ['走', 'run'],
	// ['読', 'read'],
	['書', 'write'],
	['話', 'speak/talk/tale'],
	// ['聞', 'listen'],
	['見', 'see/look/perspective'],
	['止', 'stop'],
	// ['行', 'go'],
	['来', 'come/due/next/cause/become'],
	['学', 'study'],
	['出', 'exit'],
	['入', 'enter'],
	/* Places */
	['国', 'country'],
	/* Objects */
	['車', 'car'],
	['円', 'circle/yen/round'],
	['本', 'book'],
	/* Other */
	['気', 'spirit/mind/air'],
	//name:
	['名', 'name'],
	/* Unorganized */
	['時', 'time/hour'],
	['行', 'go/journey'],
	['分', 'minute/part'],
	['後', 'back/behind/after/later'],
	['前', 'front/before/previous'],
	['間', 'interval/space'],
	['東', 'east'],
	['今', 'now'],
	['高', 'tall/high/expensive'],
	['校', 'school/exam'],
	['外', 'outside'],
	['北', 'north'],
	['午', 'noon'],
	['半', 'half'],
	['白', 'white'],
	['西', 'west'],
	['電', 'electricity'],
	['天', 'heaven/sky'],
	['語', 'language/word'],
	['聞', 'listen'],
	['食', 'eat/food'],
	['何', 'what'],
	['南', 'south'],
	['火', 'fire'],
	['右', 'right side'],
	['万', 'ten thousand'],
	['左', 'left side'],
	['休', 'rest'],
	['毎', 'every'],
	['母', 'mother'],
	['読', 'read'],
	['友', 'friend'],
	['父', 'father'],
	['雨', 'rain'],
])
