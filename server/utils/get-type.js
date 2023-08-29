const path = require("path")
const { filePath } = require("../../index")

const mime = {
  ".jpg": "image/jpg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
}

module.exports = (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  let static = url.pathname + url.search
  if (static === '/') static = "/index.html"
  const extName = path.extname(static)
  const pathName = filePath + static
  const fileName = path.parse(url.pathname).name
  const contType = mime[extName] || "text/plain"
  return { contType, pathName,fileName,extName }
}