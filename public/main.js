async function uf(e, t, n) {
  return n = JSON.stringify(n), fetch("" + e, {
    method: t,
    headers: {
      "Content-Type": "application/json"
    },
    body: n
  }).then((e => e.json()))
}
const _req = {
    get: async e => await uf(e, "GET"),
    post: async (e, t) => await uf(e, "POST", t),
    put: async (e, t) => await uf(e, "PUT", t),
    del: async (e, t) => await uf(e, "DELETE", t)
  },
  $ = e => document.getElementById(e),
  MSG = (e, t) => {
    const n = document.createElement("div"),
      o = document.createElement("span");
    o.className = `msg ${e}`, o.innerHTML = t || e, n.appendChild(o), $("msg").appendChild(n), setTimeout((() => {
      n.parentElement.removeChild(n)
    }), 2e3)
  },
  msg = {
    sc: e => MSG("suc", "🥰 " + e),
    er: e => MSG("err", "😮‍💨 " + e)
  },
  token = localStorage.getItem("e-token"),
  login = async e => {
    const t = await _req.post("/login", e);
    t.ok ? (localStorage.setItem("e-token", t.token), msg.sc("Login success .")) : msg.er(t.reason || "Login failed .")
  };
token && login({
  token: token
});