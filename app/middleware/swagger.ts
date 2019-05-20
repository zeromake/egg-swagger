import koaRange from "koa-range";
import compose from "koa-compose";
import staticCache from "koa-static-cache";
import LRU from "ylru";
import { Application, Context } from "egg";
import { swaggerConfig } from "../../index";
// import defaultConfig from "../../config/config.default";

function renderHtml(options: swaggerConfig) {
    return `
<html>
<head>
  <meta charset="UTF-8">
  <title>Swagger UI</title>
  <link rel="stylesheet" type="text/css" href="${
      options.prefix
  }/swagger-ui.css" >
  <link rel="icon" type="image/png" href="${
      options.prefix
  }/favicon-32x32.png" sizes="32x32" />
  <link rel="icon" type="image/png" href="${
      options.prefix
  }/favicon-16x16.png" sizes="16x16" />
  <style>
    html
    {
      box-sizing: border-box;
      overflow: -moz-scrollbars-vertical;
      overflow-y: scroll;
    }

    *,
    *:before,
    *:after
    {
      box-sizing: inherit;
    }

    body
    {
      margin:0;
      background: #fafafa;
    }
  </style>
</head>

<body>
  <div id="swagger-ui"></div>

  <script src="${options.prefix}/swagger-ui-bundle.js"> </script>
  <script src="${options.prefix}/swagger-ui-standalone-preset.js"> </script>
  <script>
  window.onload = function() {
    // Begin Swagger UI call region
    const ui = SwaggerUIBundle({
      url: "${options.url}",
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    })
    // End Swagger UI call region

    window.ui = ui
  }
</script>
</body>
</html>
    `;
}

export default (options: swaggerConfig, app: Application) => {
    // options = Object.assign({}, defaultConfig, options);
    if (!options.enable) {
        return (_, next: () => Promise<void>) => {
            return next();
        };
    }
    const prefix = options.prefix;
    function swaggerMw(ctx: Context, next: () => Promise<void>) {
        if (ctx.path === prefix || ctx.path === prefix + "/index.html") {
            ctx.body = renderHtml(options);
            return;
        } else if (ctx.path === options.url) {
            ctx.body = app.swagger;
            return;
        }
        return next();
    }
    function rangeMiddleware(
        ctx: Context,
        next: () => Promise<void>,
    ): Promise<void> {
        const isMatch = ctx.path.startsWith(prefix);
        if (isMatch) {
            return koaRange(ctx as any, next);
        }
        return next();
    }
    const middlewares = [swaggerMw, rangeMiddleware];
    const newOptions = { ...options };
    if (newOptions.dynamic && !newOptions.files) {
        newOptions.files = new LRU(newOptions.maxFiles);
    }
    app.loggers.coreLogger.info(
        "[egg-swagger] starting serve %s -> %s",
        newOptions.prefix,
        newOptions.dir,
    );
    middlewares.push((staticCache as any)(newOptions) as any);
    return (compose as any)(middlewares);
};
