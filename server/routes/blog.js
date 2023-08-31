const control = require("../control/c-blog")

module.exports = () => {
  return [{
    method: "GET",
    url: "/blog/:id",
    handler: control.getBlog
  }, {
    method: "GET",
    url: "/blog/:page/:size/:categ?",
    handler: control.getBlogList
  },{
    method: "POST",
    url: "/blog",
    handler: control.addBlog
  },{
    method: "PUT",
    url: "/blog",
  handler: control.updateBlog
  },{
    method: "DELETE",
    url: "/blog/:id",
    handler: control.delBlog
  }, ]
}