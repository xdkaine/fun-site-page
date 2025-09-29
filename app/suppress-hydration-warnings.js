
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0]?.toString() || '';

    const isExtensionHydrationWarning = 
      message.includes('A tree hydrated but some attributes of the server rendered HTML didn\'t match') &&
      (
        message.includes('data-new-gr-c-s-check-loaded') ||
        message.includes('data-gr-ext-installed') ||
        message.includes('data-gramm') ||
        message.includes('grammarly') ||
        message.includes('data-lastpass') ||
        message.includes('data-1p-') ||
        message.includes('data-honey-') ||
        message.includes('chrome-extension') ||
        message.includes('moz-extension')
      );

    if (!isExtensionHydrationWarning) {
      originalError.apply(console, args);
    }
  };
}