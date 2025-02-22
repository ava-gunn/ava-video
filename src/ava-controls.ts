import { html, LitElement, css } from 'lit';
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

  static styles = css`
   :host {
     display: block;
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
     padding: 1rem;
     background: linear-gradient(transparent, rgba(0, 0, 0, 0.75);
    transition: opacity 0.3s; 
   }

   .controls-bar {
    display: flex;
    gap: 1rem;
    align-items: center;
   }
   
   .control {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: white;
    transition: opacity 0.25s;
   }

   .control:hover {
    opacity: 0.8;
   }

   .icon {
     width: 24px;
     height: 24px;
     fill: currentColor;
   }
  `;

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
