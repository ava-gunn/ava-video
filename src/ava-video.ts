import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface PlaybackProperties {
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
}

interface LoadingProperties {
  preload?: 'none' | 'metadata' | 'auto';
  crossorigin?: 'anonymous' | 'use-credentials';
}

interface DisplayProperties {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  poster?: string;
}

interface EventHandlerProperties {
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: Error) => void;
  onLoadMetadata?: () => void;
  onTimeUpdate?: () => void;
  onVolumeChange?: () => void;
}

interface VideoProperties
  extends PlaybackProperties,
    LoadingProperties,
    DisplayProperties,
    EventHandlerProperties {}

@customElement('ava-video')
export class AvaVideo extends LitElement implements VideoProperties {
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Boolean }) loop = false;
  @property({ type: Boolean }) muted = false;
  @property({ type: Boolean }) controls = false;
  @property({ type: Boolean }) playsInline = false;
  @property({ type: String }) preload = undefined;
  @property({ type: String }) crossorigin: undefined;
  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = 'auto';
  @property({ type: String }) poster = '';
  @property({ type: Function }) onPlay: (() => void) | undefined;
  @property({ type: Function }) onPause: (() => void) | undefined;
  @property({ type: Function }) onEnded: (() => void) | undefined;
  @property({ type: Function }) onError: ((error: Error) => void) | undefined;
  @property({ type: Function }) onLoadMetadata: (() => void) | undefined;
  @property({ type: Function }) onTimeUpdate: (() => void) | undefined;
  @property({ type: Function }) onVolumeChange: (() => void) | undefined;

  static styles = css`
    video {
      width: 100vw;
    }
  `;

  render() {
    return html`<video src=${this.src} ?controls=${this.controls}></video>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ava-video': AvaVideo;
  }
}
