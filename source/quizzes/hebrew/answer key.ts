export type HebrewCharacter =
	'א' | 'ב' | 'ג' | 'ד' | 'ה' |
	'ו' | 'ז' | 'ח' | 'ט' | 'י' |
	'כ' | 'ל' | 'מ' | 'נ' | 'ס' |
	'ע' | 'פ' | 'צ' | 'ק' | 'ר' |
	'ש' | 'ת' | 'ך' | 'ם' | 'ן' |
	'ף' | 'ץ' | 'װ' | 'ױ' | 'ײ' |
	'ך' | 'ם' | 'ן' | 'ף' | 'ץ' |
	'׳' | '״' | '־'

export const hebrew: Map<HebrewCharacter, string> = new Map([
	['א', 'aleph'],
	['ב', 'bet'],
	['ג', 'gimel'],
	['ד', 'dalet'],
	['ה', 'he'],
	['ו', 'vav'],
	['ז', 'zayin'],
	['ח', 'het'],
	['ט', 'tet'],
	['י', 'yod'],
	['כ', 'kaf'],
	['ל', 'lamed'],
	['מ', 'mem'],
	['נ', 'nun'],
	['ס', 'samekh'],
	['ע', 'ayin'],
	['פ', 'pe'],
	['צ', 'tsadi'],
	['ק', 'qof'],
	['ר', 'resh'],
	['ש', 'shin'],
	['ת', 'tav'],
	['ך', 'kaf'],
	['ם', 'mem'],
	['ן', 'nun'],
	['ף', 'pe'],
	['ץ', 'tsadi'],
	// ['װ', 'vav'],
	// ['ױ', 'vav'],
	// ['ײ', 'yod'],
	// Final forms:
	['ך', 'final kaf'],
	['ם', 'final mem'],
	['ן', 'final nun'],
	['ף', 'final pe'],
	['ץ', 'final tsadi'],
	// Punctuation:
	['׳', 'geresh'],
	['״', 'gershayim'],
	['־', 'maqaf'],
	// For the sake of completeness, here are the other Hebrew characters:
	// '֑, '֒, '֓
]);
