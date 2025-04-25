declare global {
  interface Window {
    ym: (...args: any[]) => void;
  }

  function ym(...args: any[]): void;
}

export {};
