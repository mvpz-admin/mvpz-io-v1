declare global {
    interface Document {
      webkitFullscreenElement: Element | null;
      mozFullScreenElement: Element | null;
      msFullscreenElement : Element | null;
    }
  }
  
  export {};
  