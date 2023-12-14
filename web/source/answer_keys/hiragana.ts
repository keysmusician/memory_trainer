import { Mora } from './_mora'

export type HiraganaCharacter =
  'あ' | 'い' | 'う' | 'え' | 'お' |
  'か' | 'き' | 'く' | 'け' | 'こ' |
  'さ' | 'し' | 'す' | 'せ' | 'そ' |
  'た' | 'ち' | 'つ' | 'て' | 'と' |
  'な' | 'に' | 'ぬ' | 'ね' | 'の' |
  'は' | 'ひ' | 'ふ' | 'へ' | 'ほ' |
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
])
