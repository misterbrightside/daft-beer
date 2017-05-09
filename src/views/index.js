export default (markup, state) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>John Brennan</title>
      <link href="/static/styles.css" rel="stylesheet" type="text/css">
    </head>
    <body>
      <div id="main">${markup}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
    </body>
  </html>
`;

