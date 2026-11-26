/* XID Lab — data/xidlab_data.xlsx 를 읽어 화면을 그립니다. */
(function () {
  const CFG = window.XID_CONFIG || {};
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Excel (data/xidlab_data.xlsx) ---------- */
  const DATA_FILE = "data/xidlab_data.xlsx";
  let book = null;
  async function load(name) {
    if (!book) {
      const res = await fetch(`${DATA_FILE}?_=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`${DATA_FILE}: ${res.status}`);
      book = XLSX.read(await res.arrayBuffer(), { type: "array" });
    }
    const ws = book.Sheets[name];
    if (!ws) throw new Error(`시트 "${name}" 없음`);
    return XLSX.utils.sheet_to_json(ws, { defval: "", raw: false })
      .map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [String(k).trim(), String(v).trim()])))
      .filter((r) => Object.values(r).some((v) => v !== ""));
  }

  const groupBy = (list, key) => {
    const m = new Map();
    list.forEach((x) => { const k = x[key] || ""; if (!m.has(k)) m.set(k, []); m.get(k).push(x); });
    return m;
  };
  const initials = (n) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  /* ---------- Members ---------- */
  function person(m, withPhoto) {
    const f = [m["분야1"], m["분야2"]].filter(Boolean).map((x) => `<div class="person__field">${esc(x)}</div>`).join("");
    const grad = withPhoto && m["구분"] === "Alumni" ? " 🎓" : "";
    const photo = withPhoto
      ? `<div class="person__photo">${m["사진"]
          ? `<img src="${esc(m["사진"])}" alt="${esc(m["이름"])}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${esc(initials(m["이름"]))}'))">`
          : esc(initials(m["이름"]))}</div>`
      : "";
    const mail = m["이메일"] && m["이메일"] !== "-" ? `<a class="person__mail" href="mailto:${esc(m["이메일"])}">${esc(m["이메일"])}</a>` : "";
    return `<div class="person">${photo}<div class="person__name">${esc(m["이름"])}${grad}</div>${f}${mail}</div>`;
  }

  function renderMembers(list) {
    const phd = list.filter((m) => /ph/i.test(m["과정"]));
    const ms = list.filter((m) => !/ph/i.test(m["과정"]));
    let h = "";
    ["Alumni", "Current"].forEach((st) => {
      const g = phd.filter((m) => m["구분"] === st);
      if (g.length) h += `<div class="label">${st}</div><div class="grid">${g.map((m) => person(m, true)).join("")}</div>`;
    });
    $("#phd").innerHTML = h;

    h = "";
    const al = ms.filter((m) => m["구분"] === "Alumni");
    if (al.length) {
      h += `<div class="label">Alumni</div>`;
      [...groupBy(al, "졸업연도")].sort((a, b) => a[0].localeCompare(b[0])).forEach(([y, g]) => {
        h += `<div class="year">${esc(y)}</div><div class="grid grid--master">${g.map((m) => person(m, false)).join("")}</div>`;
      });
    }
    const cur = ms.filter((m) => m["구분"] === "Current");
    if (cur.length) h += `<div class="label">Current</div><div class="grid grid--master">${cur.map((m) => person(m, false)).join("")}</div>`;
    $("#master").innerHTML = h;
  }

  /* ---------- Projects ---------- */
  function renderProjects(list) {
    let h = "";
    [...groupBy(list, "연도")].sort((a, b) => b[0].localeCompare(a[0])).forEach(([y, g]) => {
      h += `<div class="year year--main">${esc(y)}</div>`;
      let cat = null, period = "";
      g.forEach((p) => {
        if (p["분류"] !== cat) { cat = p["분류"]; if (cat) h += `<div><span class="tag">${esc(cat)}</span></div>`; }
        if (p["기간표시"] && p["기간표시"] !== period) h += `<div class="year">${esc(p["기간표시"])}</div>`;
        period = p["기간표시"] || period;
        const head = p["기관"] ? `<div class="item__head">${esc(p["기관"])}</div>` : "";
        const body = (p["내용"] || "").split(" / ").map(esc).join("<br>");
        h += `<div class="item">${head}<div>${body}</div></div>`;
      });
    });
    $("#projects").innerHTML = h;
  }

  /* ---------- Publications ---------- */
  function renderPubs(list) {
    const linkify = (s) => s.replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    let h = "";
    [...groupBy(list, "연도")].sort((a, b) => b[0].localeCompare(a[0])).forEach(([y, g]) => {
      h += `<div class="year year--main">${esc(y)}</div>`;
      let type = null;
      g.forEach((p) => {
        if (p["유형"] !== type) { type = p["유형"]; if (type) h += `<div><span class="tag">${esc(type)}</span></div>`; }
        let txt = esc(p["서지사항"]);
        const b = esc(p["굵게표시"]);
        if (b && txt.includes(b)) txt = txt.replace(b, `<b>${b}</b>`);
        h += `<div class="pub">${linkify(txt)}</div>`;
      });
    });
    $("#publications").innerHTML = h;
  }

  /* ---------- Contact / chrome ---------- */
  function renderContact() {
    $("#contact-info").innerHTML = (CFG.CONTACT || [])
      .filter((c) => c.value)
      .map((c) => {
        const v = /@/.test(c.value) && !/</.test(c.value) ? `<a href="mailto:${esc(c.value)}">${esc(c.value)}</a>` : c.value;
        return `<dl><dt>${esc(c.label)}</dt><dd>${v}</dd></dl>`;
      }).join("");
    $("#year").textContent = new Date().getFullYear();
  }

  function setupNav() {
    const btn = $(".menu-btn"), nav = $(".nav");
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("is-open"); btn.setAttribute("aria-expanded", false);
    }));
    const links = [...nav.querySelectorAll("a")];
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    ["about", "members", "project", "publication", "contact"].forEach((id) => io.observe(document.getElementById(id)));
  }

  async function run(name, el, fn) {
    $(el).innerHTML = `<div class="status">Loading…</div>`;
    try { fn(await load(name)); }
    catch (e) { $(el).innerHTML = `<div class="status">데이터를 불러오지 못했습니다 (${esc(name)}).</div>`; console.error(e); }
  }

  renderContact();
  setupNav();
  run("members", "#phd", renderMembers);
  run("projects", "#projects", renderProjects);
  run("publications", "#publications", renderPubs);
})();
