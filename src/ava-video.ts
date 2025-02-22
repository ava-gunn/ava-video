import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { AvaControls } from './ava-controls.ts';

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

  @state() private isPlaying = false;
  @state() private isMuted = false;
  @state() private isFullscreen = false;

  @query('video', true) private videoElement!: HTMLVideoElement;
  @query('ava-controls', true) private controlsElement!: AvaControls;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.setupEventListeners();
    this.addEventListener('control-click', this.handleControlClick);
  }

  private setupEventListeners() {
    this.videoElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.controlsElement.isPlaying = true;
    });

    this.videoElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.controlsElement.isPlaying = false;
    });

    this.videoElement.addEventListener('volumechange', () => {
      this.isMuted = this.videoElement.muted;
      this.controlsElement.isMuted = this.isMuted;
    });
  }

  private handleControlClick(e: CustomEvent) {
    const { action } = e.detail;

    switch (action) {
      case 'play-pause':
        this.togglePlay();
        break;
      case 'volume-toggle':
        this.toggleMute();
        break;
      case 'fullscreen-toggle':
        this.toggleFullscreen();
        break;
    }
  }

  private togglePlay() {
    this.videoElement[this.isPlaying ? 'pause' : 'play']();
  }

  private toggleMute() {
    this.videoElement.muted = !this.isMuted;
  }

  private toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.requestFullscreen().then(() => (this.isFullscreen = true));
    } else {
      document.exitFullscreen().then(() => (this.isFullscreen = false));
    }
  }

  static styles = css`
    .video-container {
      position: relative;
      max-width: 100%;
      line-height: 0;
    }

    video {
      width: 100%;
      height: auto;
    }
  `;

  render() {
    return html`
      <div class="video-container">
        <video src=${this.src}></video>
        <ava-controls
          .isPlaying=${this.isPlaying}
          .isMuted=${this.isMuted}
          .isFullscreen=${this.isFullscreen}
        ></ava-controls>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ava-video': AvaVideo;
  }
  interface HTMLElementEventMap {
    'control-click': CustomEvent;
  }
}
