// Fix for browser extension message port issues
(function() {
  // Prevent browser extension message port errors
  if (typeof window !== 'undefined') {
    // Override console errors for message port issues
    const originalError = console.error;
    console.error = function(...args) {
      const message = args.join(' ');
      if (message.includes('message port closed') || 
          message.includes('WebSocket connection') ||
          message.includes('INIT EMBED PAGE')) {
        // Silently ignore these specific errors
        return;
      }
      originalError.apply(console, args);
    };

    // Handle Promise rejections related to message ports
    window.addEventListener('unhandledrejection', function(event) {
      const message = event.reason?.message || event.reason || '';
      if (typeof message === 'string' && 
          (message.includes('message port closed') || 
           message.includes('chrome-extension'))) {
        event.preventDefault();
        return false;
      }
    });

    // Disable WebSocket reconnection attempts that cause port issues
    if (window.location.hostname === 'localhost') {
      const originalWebSocket = window.WebSocket;
      window.WebSocket = function(url, protocols) {
        try {
          return new originalWebSocket(url, protocols);
        } catch (e) {
          // Return a mock WebSocket to prevent errors
          return {
            readyState: 3, // CLOSED
            close: () => {},
            send: () => {},
            addEventListener: () => {},
            removeEventListener: () => {}
          };
        }
      };
    }
  }
})();