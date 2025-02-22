import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ava-controls')
export class AvaControls extends LitElement {
  @property({ type: Boolean }) isPlaying = false;
  @property({ type: Boolean }) isMuted = false;
  @property({ type: Boolean }) isFullscreen = false;

  private dispatchControlEvent(action: string) {
    this.dispatchEvent(
      new CustomEvent('control-click', {
        detail: { action },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="controls-container">
        <div class="controls-bar">
          <button
            class="control"
            @click=${() => this.dispatchControlEvent('play-pause')}
          >
            <svg class="icon">
              <use
                href="/sprite.svg#${this.isPlaying ? 'pause' : 'play'}"
              ></use>
            </svg>
          </button>

          <button
            class="control"
            @click=${() => this.dispatchControlEvent('volume-toggle')}
          >
            <svg class="icon">
              <use
                href="/sprite.svg#${this.isMuted ? 'volume-mute' : 'volume-on'}"
              ></use>
            </svg>
          </button>

          <button
            class="control"
            @click=${() => this.dispatchControlEvent('fullscreen-toggle')}
          >
            <svg class="icon">
              <use
                href="/sprite.svg#${this.isFullscreen
                  ? 'fullscreen-exit'
                  : 'fullscreen'}"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}
