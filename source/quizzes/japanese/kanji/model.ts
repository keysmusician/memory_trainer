// import all the default imports in the "bitmaps" directory
import kanjiOne from "./writing/bitmaps/一"
import kanjiTwo from "./writing/bitmaps/二"

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

// const kanji = [
// ['一', 'one'],
// ['二', 'two'],
// ['三', 'three'],
// ['四', 'four'],
// ['五', 'five'],
// 	['六', 'six'],
// 	['七', 'seven'],
// 	['八', 'eight'],
// 	['九', 'nine'],
// ['十', 'ten'],
// ['百', 'hundred'],
// ['千', 'thousand'],
// ['万', 'ten thousand'],
// ['円', 'yen'],
// ['日', 'sun/day'],
// ['月', 'moon/month'],
// ['本', 'book'],
// ['人', 'person'],
// ['火', 'fire'],
// ['水', 'water'],
// ['木', 'tree'],
// ['白', 'white'],
// ['金', 'gold'],
// ['土', 'soil'],
// ['曜', 'day of the week'],
// ['時', 'time'],
// ['分', 'minute'],
// ['半', 'half'],
// ['今', 'now'],
// ['午', 'noon'],
// ['前', 'before'],
// ['後', 'after'],
// ['何', 'what'],
// ['年', 'year'],
// ['間', 'interval'],
// ['週', 'week'],
// ['今', 'now'],
// ['昨', 'yesterday'],
// ['明', 'tomorrow'],

export const kanji = [ // Consider adding readings, stroke order, radicals, etc.
	{ kanji: '一', meaning: 'one', bitmap: kanjiOne },
	{ kanji: '二', meaning: 'two', bitmap: kanjiTwo },

]
