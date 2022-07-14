import { Component, createSignal } from 'solid-js';
import { Header } from './Builder';
import { ANIMATION_TYPES, GRADIENTS, GRADIENT_DIRECTIONS } from './data';

const App: Component = () => {

  const [getShowArtistGradient, setShowArtistGradient] = createSignal(true);

  return (
    <div class="w-screen h-screen max-h-screen overflow-hidden bg-base-100 flex flex-col items-center gap-32">
      <Header />
      <div class="container">
        <div class="settings">
          <div class="form-control">
            <label>Song Upload URL</label>
            <input type="text" placeholder='https://songify.rocks/getsong.php?[your-uuid-here]' />
          </div>
          <div class="form-control">
            <label>Cover Position</label>
            <select>
              <option>Left</option>
              <option>Right</option>
            </select>
          </div>
          <div class="form-control">
            <label>Cover Animation</label>
            <select>
              {ANIMATION_TYPES.map((x, i) => <option value={i}>{x}</option>)}
            </select>
          </div>
          <div class="form-control">
            <label>Show Artist Gradient</label>
            <input onChange={() => setShowArtistGradient(prev => !prev)} checked type="checkbox" />
          </div>
          {getShowArtistGradient() && (
            <>
              <div class="form-control">
                <label>Artist Gradient</label>
                <select>
                  {GRADIENTS.map((x, i) => (
                    <option value={i + 1}>{x}</option>
                  ))}
                </select>
              </div>
              <div class="form-control">
                <label>Artist Gradient Direction</label>
                <select>
                  {GRADIENT_DIRECTIONS.map((x, i) => (
                    <option value={i + 1}>{x}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div class="form-control">
            <label>Rounded Corners</label>
            <input type="range" />
          </div>
          <div class="form-control">
            <label>Transparency</label>
            <input type="range" />
          </div>
        </div>
        <div class="preview"></div>
      </div>
    </div>
  );
};

export default App;
