import { mora } from '../../../answer keys/_mora'

export type HiraganaCharacter =
  'あ' | 'い' | 'う' | 'え' | 'お' |
  'か' | 'き' | 'く' | 'け' | 'こ' |
  'が' | 'ぎ' | 'ぐ' | 'げ' | 'ご' |
  'さ' | 'し' | 'す' | 'せ' | 'そ' |
  'ざ' | 'じ' | 'ず' | 'ぜ' | 'ぞ' |
  'た' | 'ち' | 'つ' | 'て' | 'と' |
  'だ' | 'ぢ' | 'づ' | 'で' | 'ど' |
  'な' | 'に' | 'ぬ' | 'ね' | 'の' |
  'は' | 'ひ' | 'ふ' | 'へ' | 'ほ' |
  'ば' | 'び' | 'ぶ' | 'べ' | 'ぼ' |
  'ぱ' | 'ぴ' | 'ぷ' | 'ぺ' | 'ぽ' |
  'ま' | 'み' | 'む' | 'め' | 'も' |
  'や' | 'ゆ' | 'よ' |
  'ら' | 'り' | 'る' | 'れ' | 'ろ' |
  'わ' | 'ゐ' | 'ゑ' | 'を' |
  'ん'

export const answer_key: Map<HiraganaCharacter, Mora> = new Map([
  ['あ', mora.a],
  ['い', mora.i],
  ['う', mora.u],
  ['え', mora.e],
  ['お', mora.o],
  ['か', mora.ka],
  ['き', mora.ki],
  ['く', mora.ku],
  ['け', mora.ke],
  ['こ', mora.ko],
  ['さ', mora.sa],
  ['し', mora.shi],
  ['す', mora.su],
  ['せ', mora.se],
  ['そ', mora.so],
  ['た', mora.ta],
  ['ち', mora.chi],
  ['つ', mora.tsu],
  ['て', mora.te],
  ['と', mora.to],
  ['な', mora.na],
  ['に', mora.ni],
  ['ぬ', mora.nu],
  ['ね', mora.ne],
  ['の', mora.no],
  ['は', mora.ha],
  ['ひ', mora.hi],
  ['ふ', mora.fu],
  ['へ', mora.he],
  ['ほ', mora.ho],
  ['ま', mora.ma],
  ['み', mora.mi],
  ['む', mora.mu],
  ['め', mora.me],
  ['も', mora.mo],
  ['や', mora.ya],
  ['ゆ', mora.yu],
  ['よ', mora.yo],
  ['ら', mora.ra],
  ['り', mora.ri],
  ['る', mora.ru],
  ['れ', mora.re],
  ['ろ', mora.ro],
  ['わ', mora.wa],
  ['ゐ', mora.wi],
  ['ゑ', mora.we],
  ['を', mora.wo],
  ['ん', mora.n],
  ['が', mora.ga],
  ['ぎ', mora.gi],
  ['ぐ', mora.gu],
  ['げ', mora.ge],
  ['ご', mora.go],
  ['ざ', mora.za],
  ['じ', mora.ji],
  ['ず', mora.zu],
  ['ぜ', mora.ze],
  ['ぞ', mora.zo],
  ['だ', mora.da],
  ['ぢ', mora.ji],
  ['づ', mora.zu],
  ['で', mora.de],
  ['ど', mora.do],
  ['ば', mora.ba],
  ['び', mora.bi],
  ['ぶ', mora.bu],
  ['べ', mora.be],
  ['ぼ', mora.bo],
  ['ぱ', mora.pa],
  ['ぴ', mora.pi],
  ['ぷ', mora.pu],
  ['ぺ', mora.pe],
  ['ぽ', mora.po],
])
