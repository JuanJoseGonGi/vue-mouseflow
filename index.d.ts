export { }

interface Mouseflow {
  websiteId: string
  recordingRate: string
  getSessionId(): string
  getPageviewId(): string
  isRecording(): boolean
  start(): void
}

declare type MouseflowFn = (mf: Mouseflow) => void;

declare global {
  interface Window {
    _mfq: {
      push: (args: MouseflowFn | (string | boolean | number)[]) => void;
    } | any[];

    mouseflow: Mouseflow
  }
}