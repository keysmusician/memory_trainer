import { Mora } from './_mora'

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

export const hiragana: Map<HiraganaCharacter, Mora> = new Map([
  ['あ', Mora.a,],
  ['い', Mora.i,],
  ['う', Mora.u,],
  ['え', Mora.e,],
  ['お', Mora.o,],
  ['か', Mora.ka,],
  ['き', Mora.ki,],
  ['く', Mora.ku,],
  ['け', Mora.ke,],
  ['こ', Mora.ko,],
  ['さ', Mora.sa,],
  ['し', Mora.shi,],
  ['す', Mora.su,],
  ['せ', Mora.se,],
  ['そ', Mora.so,],
  ['た', Mora.ta,],
  ['ち', Mora.chi,],
  ['つ', Mora.tsu,],
  ['て', Mora.te,],
  ['と', Mora.to,],
  ['な', Mora.na,],
  ['に', Mora.ni,],
  ['ぬ', Mora.nu,],
  ['ね', Mora.ne,],
  ['の', Mora.no,],
  ['は', Mora.ha,],
  ['ひ', Mora.hi,],
  ['ふ', Mora.fu,],
  ['へ', Mora.he,],
  ['ほ', Mora.ho,],
  ['ま', Mora.ma,],
  ['み', Mora.mi,],
  ['む', Mora.mu,],
  ['め', Mora.me,],
  ['も', Mora.mo,],
  ['や', Mora.ya,],
  ['ゆ', Mora.yu,],
  ['よ', Mora.yo,],
  ['ら', Mora.ra,],
  ['り', Mora.ri,],
  ['る', Mora.ru,],
  ['れ', Mora.re,],
  ['ろ', Mora.ro,],
  ['わ', Mora.wa,],
  ['ゐ', Mora.wi,],
  ['ゑ', Mora.we,],
  ['を', Mora.wo,],
  ['ん', Mora.n,],
  ['が', Mora.ga,],
  ['ぎ', Mora.gi,],
  ['ぐ', Mora.gu,],
  ['げ', Mora.ge,],
  ['ご', Mora.go,],
  ['ざ', Mora.za,],
  ['じ', Mora.ji,],
  ['ず', Mora.zu,],
  ['ぜ', Mora.ze,],
  ['ぞ', Mora.zo,],
  ['だ', Mora.da,],
  ['ぢ', Mora.ji,],
  ['づ', Mora.zu,],
  ['で', Mora.de,],
  ['ど', Mora.do,],
  ['ば', Mora.ba,],
  ['び', Mora.bi,],
  ['ぶ', Mora.bu,],
  ['べ', Mora.be,],
  ['ぼ', Mora.bo,],
  ['ぱ', Mora.pa,],
  ['ぴ', Mora.pi,],
  ['ぷ', Mora.pu,],
  ['ぺ', Mora.pe,],
  ['ぽ', Mora.po,],
])
