import { AnswerKey } from '../../../quiz'
import { Mora, mora } from '../_mora'

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
  'ン' |
  'キャ' | 'キュ' | 'キョ' |
  'ギャ' | 'ギュ' | 'ギョ' |
  'シャ' | 'シュ' | 'ショ' |
  'ジャ' | 'ジュ' | 'ジョ' |
  'チャ' | 'チュ' | 'チョ' |
  'ニャ' | 'ニュ' | 'ニョ' |
  'ヒャ' | 'ヒュ' | 'ヒョ' |
  'ビャ' | 'ビュ' | 'ビョ' |
  'ピャ' | 'ピュ' | 'ピョ' |
  'ミャ' | 'ミュ' | 'ミョ' |
  'リャ' | 'リュ' | 'リョ'

export const katakana: AnswerKey<KatakanaCharacter, Mora> = new AnswerKey([
  ['ア', mora.a,],
  ['イ', mora.i,],
  ['ウ', mora.u,],
  ['エ', mora.e,],
  ['オ', mora.o,],
  ['カ', mora.ka,],
  ['キ', mora.ki,],
  ['ク', mora.ku,],
  ['ケ', mora.ke,],
  ['コ', mora.ko,],
  ['ガ', mora.ga,],
  ['ギ', mora.gi,],
  ['グ', mora.gu,],
  ['ゲ', mora.ge,],
  ['ゴ', mora.go,],
  ['サ', mora.sa,],
  ['シ', mora.shi,],
  ['ス', mora.su,],
  ['セ', mora.se,],
  ['ソ', mora.so,],
  ['ザ', mora.za,],
  ['ジ', mora.ji,],
  ['ズ', mora.zu,],
  ['ゼ', mora.ze,],
  ['ゾ', mora.zo,],
  ['タ', mora.ta,],
  ['チ', mora.chi,],
  ['ツ', mora.tsu,],
  ['テ', mora.te,],
  ['ト', mora.to,],
  ['ダ', mora.da,],
  ['ヂ', mora.ji,],
  ['ヅ', mora.zu,],
  ['デ', mora.de,],
  ['ド', mora.do,],
  ['ナ', mora.na,],
  ['ニ', mora.ni,],
  ['ヌ', mora.nu,],
  ['ネ', mora.ne,],
  ['ノ', mora.no,],
  ['ハ', mora.ha,],
  ['ヒ', mora.hi,],
  ['フ', mora.fu,],
  ['ヘ', mora.he,],
  ['ホ', mora.ho,],
  ['バ', mora.ba,],
  ['ビ', mora.bi,],
  ['ブ', mora.bu,],
  ['ベ', mora.be,],
  ['ボ', mora.bo,],
  ['パ', mora.pa,],
  ['ピ', mora.pi,],
  ['プ', mora.pu,],
  ['ペ', mora.pe,],
  ['ポ', mora.po,],
  ['マ', mora.ma,],
  ['ミ', mora.mi,],
  ['ム', mora.mu,],
  ['メ', mora.me,],
  ['モ', mora.mo,],
  ['ヤ', mora.ya,],
  ['ユ', mora.yu,],
  ['ヨ', mora.yo,],
  ['ラ', mora.ra,],
  ['リ', mora.ri,],
  ['ル', mora.ru,],
  ['レ', mora.re,],
  ['ロ', mora.ro,],
  ['ワ', mora.wa,],
  // ['ヰ', Mora.wi,],
  // ['ヱ', Mora.we,],
  ['ヲ', mora.wo,],
  ['ン', mora.n,],
  ['キャ', mora.kya],
  ['キュ', mora.kyu],
  ['キョ', mora.kyo],
  ['ギャ', mora.gya],
  ['ギュ', mora.gyu],
  ['ギョ', mora.gyo],
  ['シャ', mora.sha],
  ['シュ', mora.shu],
  ['ショ', mora.sho],
  ['ジャ', mora.ja],
  ['ジュ', mora.ju],
  ['ジョ', mora.jo],
  ['チャ', mora.cha],
  ['チュ', mora.chu],
  ['チョ', mora.cho],
  ['ニャ', mora.nya],
  ['ニュ', mora.nyu],
  ['ニョ', mora.nyo],
  ['ヒャ', mora.hya],
  ['ヒュ', mora.hyu],
  ['ヒョ', mora.hyo],
  ['ビャ', mora.bya],
  ['ビュ', mora.byu],
  ['ビョ', mora.byo],
  ['ピャ', mora.pya],
  ['ピュ', mora.pyu],
  ['ピョ', mora.pyo],
  ['ミャ', mora.mya],
  ['ミュ', mora.myu],
  ['ミョ', mora.myo],
  ['リャ', mora.rya],
  ['リュ', mora.ryu],
  ['リョ', mora.ryo],
])
