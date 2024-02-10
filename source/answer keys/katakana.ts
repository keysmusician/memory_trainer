import { Mora } from './_mora'

export type KatakanaCharacter =
  'ア' | 'イ' | 'ウ' | 'エ' | 'オ' |
  'カ' | 'キ' | 'ク' | 'ケ' | 'コ' |
  'ガ' | 'ギ' | 'グ' | 'ゲ' | 'ゴ' |
  'サ' | 'シ' | 'ス' | 'セ' | 'ソ' |
  'ザ' | 'ジ' | 'ズ' | 'ゼ' | 'ゾ' |
  'タ' | 'チ' | 'ツ' | 'テ' | 'ト' |
  'ダ' | 'ヂ' | 'ヅ' | 'デ' | 'ド' |
  'ナ' | 'ニ' | 'ヌ' | 'ネ' | 'ノ' |
  'ハ' | 'ヒ' | 'フ' | 'ヘ' | 'ホ' |
  'バ' | 'ビ' | 'ブ' | 'ベ' | 'ボ' |
  'パ' | 'ピ' | 'プ' | 'ペ' | 'ポ' |
  'マ' | 'ミ' | 'ム' | 'メ' | 'モ' |
  'ヤ' | 'ユ' | 'ヨ' |
  'ラ' | 'リ' | 'ル' | 'レ' | 'ロ' |
  'ワ' | 'ヰ' | 'ヱ' | 'ヲ' |
  'ン'

export const katakana: Map<KatakanaCharacter, Mora> = new Map([
  ['ア', Mora.a,],
  ['イ', Mora.i,],
  ['ウ', Mora.u,],
  ['エ', Mora.e,],
  ['オ', Mora.o,],
  ['カ', Mora.ka,],
  ['キ', Mora.ki,],
  ['ク', Mora.ku,],
  ['ケ', Mora.ke,],
  ['コ', Mora.ko,],
  ['ガ', Mora.ga,],
  ['ギ', Mora.gi,],
  ['グ', Mora.gu,],
  ['ゲ', Mora.ge,],
  ['ゴ', Mora.go,],
  ['サ', Mora.sa,],
  ['シ', Mora.shi,],
  ['ス', Mora.su,],
  ['セ', Mora.se,],
  ['ソ', Mora.so,],
  ['ザ', Mora.za,],
  ['ジ', Mora.ji,],
  ['ズ', Mora.zu,],
  ['ゼ', Mora.ze,],
  ['ゾ', Mora.zo,],
  ['タ', Mora.ta,],
  ['チ', Mora.chi,],
  ['ツ', Mora.tsu,],
  ['テ', Mora.te,],
  ['ト', Mora.to,],
  ['ダ', Mora.da,],
  ['ヂ', Mora.ji,],
  ['ヅ', Mora.zu,],
  ['デ', Mora.de,],
  ['ド', Mora.do,],
  ['ナ', Mora.na,],
  ['ニ', Mora.ni,],
  ['ヌ', Mora.nu,],
  ['ネ', Mora.ne,],
  ['ノ', Mora.no,],
  ['ハ', Mora.ha,],
  ['ヒ', Mora.hi,],
  ['フ', Mora.fu,],
  ['ヘ', Mora.he,],
  ['ホ', Mora.ho,],
  ['バ', Mora.ba,],
  ['ビ', Mora.bi,],
  ['ブ', Mora.bu,],
  ['ベ', Mora.be,],
  ['ボ', Mora.bo,],
  ['パ', Mora.pa,],
  ['ピ', Mora.pi,],
  ['プ', Mora.pu,],
  ['ペ', Mora.pe,],
  ['ポ', Mora.po,],
  ['マ', Mora.ma,],
  ['ミ', Mora.mi,],
  ['ム', Mora.mu,],
  ['メ', Mora.me,],
  ['モ', Mora.mo,],
  ['ヤ', Mora.ya,],
  ['ユ', Mora.yu,],
  ['ヨ', Mora.yo,],
  ['ラ', Mora.ra,],
  ['リ', Mora.ri,],
  ['ル', Mora.ru,],
  ['レ', Mora.re,],
  ['ロ', Mora.ro,],
  ['ワ', Mora.wa,],
  // ['ヰ', Mora.wi,],
  // ['ヱ', Mora.we,],
  ['ヲ', Mora.wo,],
  ['ン', Mora.n,],
])
