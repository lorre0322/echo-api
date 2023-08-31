var page = 1,
  maxpage = 1;
const create = e => document.createElement(e),
  getList = async () => {
    $("ab").innerHTML = "loading...";
    const e = await _req.get(`/img/list/${page}/`);
    if (maxpage = e.maxpage, $("nowpage").innerText = page, $("maxpage").innerText = maxpage, e.ok) {
      $("ab").innerHTML = "";
      const t = document.createDocumentFragment();
      e.data.forEach((e => {
        const a = create("div"),
          n = create("img"),
          i = create("div"),
          o = create("div"),
          c = create("div");
        i.className = "it", o.innerText = e.name, c.innerText = "Delete", n.src = `http://${window.location.host}/img/${e.name}`, a.appendChild(n), i.appendChild(o), i.appendChild(c), a.appendChild(i), t.appendChild(a), a.onclick = () => {
          const t = `http://${window.location.host}/img/${e.name}.png`;
          if (window.navigator.clipboard) window.navigator.clipboard.writeText(t);
          else {
            const e = document.createElement("input");
            e.setAttribute("readonly", "readonly"), e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e)
          }
        }, c.onclick = async t => {
          if (window.confirm("你是否删除：" + e.name + " ? ")) {
            const t = await _req.del(`/img/${e.id}`, {
              token: localStorage.getItem("e-token") || ""
            });
            t.ok ? (msg.sc("Delete success !"), getList()) : msg.er(t.reason || "Delete failed .")
          }
          t.stopPropagation()
        }
      })), $("ab").appendChild(t), msg.sc("Get list success .")
    }
  };
getList(), $("prev").onclick = () => {
  page > 1 && (page--, getList())
}, $("next").onclick = () => {
  page < maxpage && (page++, getList())
}, $("po").onclick = async () => {
  const e = $("name").value,
    t = $("album").value,
    a = window.location.host;
  $("md").value = `![${e}](https://${a}/img/${e}.png)`;
  const n = await _req.post("/img", {
    name: e,
    album: t,
    img_data: img_data,
    token: localStorage.getItem("e-token") || ""
  });
  n.ok ? (msg.sc("Upload success ! "), getList()) : msg.er(n.reason || "Upload failed")
};
const getDate = () => {
  let e = new Date,
    t = e.getFullYear().toString(),
    a = e.getMonth() + 1;
  a < 10 && (a = "0" + a);
  let n = e.getDate();
  return n < 10 && (n = "0" + n), t + a + n
};
$("name").value = getDate();
let img_data = "";
const getFile = () => {
  var e = new FileReader;
  e.onload = function (e) {
    img_data = e.target.result
  }, e.readAsDataURL($("file").files[0])
};