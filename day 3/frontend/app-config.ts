export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  supportsChatInput: boolean;
  supportsVideoInput: boolean;
  supportsScreenShare: boolean;
  isPreConnectBufferEnabled: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;

  audioVisualizerType?: 'bar' | 'wave' | 'grid' | 'radial' | 'aura';
  audioVisualizerColor?: `#${string}`;
  audioVisualizerColorDark?: `#${string}`;
  audioVisualizerColorShift?: number;
  audioVisualizerBarCount?: number;
  audioVisualizerGridRowCount?: number;
  audioVisualizerGridColumnCount?: number;
  audioVisualizerRadialBarCount?: number;
  audioVisualizerRadialRadius?: number;
  audioVisualizerWaveLineWidth?: number;

  // agent dispatch configuration
  agentName?: string;

  // LiveKit Cloud Sandbox configuration
  sandboxId?: string;
}

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'KiranaBot Store',
  pageTitle: 'KiranaBot – Aapki Apni Dukaan Ka Voice Assistant',
  pageDescription: 'Speak with your local Kirana store voice agent powered by Murf Falcon TTS & LiveKit',

  supportsChatInput: true,
  supportsVideoInput: false,
  supportsScreenShare: false,
  isPreConnectBufferEnabled: true,

  logo: '/murf-logo.svg',
  accent: '#ea580c', // Warm Saffron/Orange theme
  logoDark: '/murf-logo-dark.svg',
  accentDark: '#f97316',
  startButtonText: 'Connect to KiranaBot',

  audioVisualizerType: 'wave',
  audioVisualizerWaveLineWidth: 4,
  audioVisualizerColor: '#ea580c',
  audioVisualizerColorDark: '#f97316',

  // agent dispatch configuration
  agentName: process.env.AGENT_NAME ?? 'my-agent',

  // LiveKit Cloud Sandbox configuration
  sandboxId: undefined,
};
