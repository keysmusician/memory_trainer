/**
 * Map item schema:
 * (state: string) : (capital: string)
 */
export const state_capitals = new Map([
  ["Alabama", "Montgomery"],
  ["Alaska", "Juneau"],
  ["Arizona", "Phoenix"],
  ["Arkansas", "Little Rock"],
  ["California", "Sacramento"],
  ["Colorado", "Denver"],
  ["Connecticut", "Hartford"],
  ["Delaware", "Dover"],
  ["Florida", "Tallahassee"],
  ["Georgia", "Atlanta"],
  ["Hawaii", "Honolulu"],
  ["Idaho", "Boise"],
  ["Illinois", "Springfield"],
  ["Indiana", "Indianapolis"],
  ["Iowa", "Des Moines"],
  ["Kansas", "Topeka"],
  ["Kentucky", "Frankfort"],
  ["Louisiana", "Baton Rouge"],
  ["Maine", "Augusta"],
  ["Maryland", "Annapolis"],
  ["Massachusetts", "Boston"],
  ["Michigan", "Lansing"],
  ["Minnesota", "Saint Paul"],
  ["Mississippi", "Jackson"],
  ["Missouri", "Jefferson City"],
  ["Montana", "Helena"],
  ["Nebraska", "Lincoln"],
  ["Nevada", "Carson City"],
  ["New Hampshire", "Concord"],
  ["New Jersey", "Trenton"],
  ["New Mexico", "Santa Fe"],
  ["New York", "Albany"],
  ["North Carolina", "Raleigh"],
  ["North Dakota", "Bismarck"],
  ["Ohio", "Columbus"],
  ["Oklahoma", "Oklahoma City"],
  ["Oregon", "Salem"],
  ["Pennsylvania", "Harrisburg"],
  ["Rhode Island", "Providence"],
  ["South Carolina", "Columbia"],
  ["South Dakota", "Pierre"],
  ["Tennessee", "Nashville"],
  ["Texas", "Austin"],
  ["Utah", "Salt Lake City"],
  ["Vermont", "Montpelier"],
  ["Virginia", "Richmond"],
  ["Washington", "Olympia"],
  ["West Virginia", "Charleston"],
  ["Wisconsin", "Madison"],
  ["Wyoming", "Cheyenne"],
]);

/**
 * Map item schema:
 * [
 *   (`clef name`: string),
 *   (pitch: string),
 *   (accidental: string),
 *   (register: number)
 * ]: (`MIDI note number`: number)
 */
export const music_notation = new Map([
  [['treble', 'C/4', ''], [60, 'C']],
  [['treble', 'B/3', ''], [59, 'B']],
  [['treble', 'B/3', 'b'], [58, 'Bb']],
  [['treble', 'A/3', '#'], [58, 'A#']],
  [['treble', 'A/3', ''], [57, 'A']],
  [['bass', 'B/3', ''], [59, 'B']],
  [['bass', 'B/3', 'b'], [58, 'Bb']],
  [['bass', 'A/3', '#'], [58, 'A#']],
  [['bass', 'A/3', ''], [57, 'A']],
]);

export const flags = new Map([
  ['https://jetpunk.b-cdn.net/img/user-photo-library/89/892037c361-450.png', 'USA']
]);

// Quiz data schema
// [
//   {
//     question: '',
//     answer: '',
//     hint: '',
//     renderer: '',
//   },
// ]
