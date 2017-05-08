export default markup => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>John Brennan</title>
    </head>
    <body>
      <div id="main">${markup}</div>
      <script src="/js/bundle.js"></script>
    </body>
  </html>
`;