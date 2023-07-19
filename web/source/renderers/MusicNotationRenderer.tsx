import { JSXElement, createEffect } from "solid-js";
import { VexNotation } from "../answer_keys/music_notation";
import { Renderer } from "./Renderer";


declare global {
    interface Window {
        Vex: any;
    }
}

/**
 * Renders music notation.
 */
class MusicNotationRenderer {
    render_context;

    constructor (rendering_area: JSXElement) {

      const Renderer = window.Vex.Flow.Renderer;

      const renderer = new Renderer(rendering_area, Renderer.Backends.SVG);

      // Configure the rendering context.
      renderer.resize(208, 350);

      const render_context = renderer.getContext();

      render_context.scale(2, 2);

      this.render_context = render_context
    }


    render([clef, pitch, accidental]: VexNotation) {
      // Clear existing notes from the staff.
      const notation = document.querySelectorAll(
        '.vf-stavenote, .vf-stave');

      for (const element of notation) {
        element.remove();
      }

      const { Accidental, Formatter, Stave, StaveNote, Voice } =
        window.Vex.Flow;

      const stave = new Stave(...Object.values({
        left: 1,
        top: 25,
        width: 101
      }));

      stave.addClef(clef);

      stave.setContext(this.render_context).draw();

      const note = new StaveNote({ clef: clef, keys: [pitch], duration: "w" });

      if (accidental !== '')
        note.addModifier(new Accidental(accidental));

      const voices = [
        new Voice({
            num_beats: 4,
            beat_value: 4,
        }).addTickables([note]),
      ];

      new Formatter().joinVoices(voices).format(voices, 200);

      for (const voice of voices) {
        voice.draw(this.render_context, stave);
      }
    }
  }


/**
 * Renders music notation.
 */
export const music_notation_renderer: Renderer<VexNotation> = function(props) {
  const music_notation_root_element = <div/>

  const renderer = new MusicNotationRenderer(music_notation_root_element)

  createEffect(() => renderer.render(props.question))

  return music_notation_root_element
}
