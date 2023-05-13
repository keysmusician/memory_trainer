/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import MemoryTrainer from './App';

const rootElement = document.getElementById('memory_trainer_app_root');

if (import.meta.env.DEV && !(rootElement instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <MemoryTrainer />, rootElement!);
