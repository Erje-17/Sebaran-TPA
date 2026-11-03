/* ===================== Konten profil (dari data/profil.js) ===================== */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  $('#yr').textContent = new Date().getFullYear();

  // Hero stats
  $('#hstats').innerHTML = PROFIL.hero.map(function (x) {
    return '<div><b data-n="' + x.n + '">0</b><span>' + esc(x.s) + '</span></div>';
  }).join('');

  // Fakta
  $('#facts').innerHTML = PROFIL.fakta.map(function (f) { return '<li><b>' + esc(f[0]) + '</b><span>' + esc(f[1]) + '</span></li>'; }).join('');

  // Fungsi
  $('#fungsi').innerHTML = PROFIL.fungsi.map(function (f) { return '<div><h3>' + esc(f[0]) + '</h3><p>' + esc(f[1]) + '</p></div>'; }).join('');

  // Struktur
  var nm = function (n) { return n ? '<span class="nm">' + esc(n) + '</span>' : ''; };
  var k = PROFIL.struktur.kepala;
  $('#org').innerHTML =
    '<div class="node top rv"><b>' + esc(k.jabatan) + '</b><span>' + esc(PROFIL.singkat) + '</span>' + nm(k.nama) + '</div>' +
    '<div class="row">' + PROFIL.struktur.unit.map(function (u, i) {
      return '<div class="node rv' + (i ? ' d' + i : '') + '"><b>' + esc(u.jabatan) + '</b><span>' + esc(u.ket) + '</span>' + nm(u.nama) + '</div>';
    }).join('') + '</div>';
  $('#wilayah').innerHTML = PROFIL.wilayah.map(function (w) {
    return '<article><h3>' + esc(w.unit) + '</h3><div class="prov">' + w.prov.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join('') +
      '</div><div class="pos">' + w.pos.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join('') + '</div></article>';
  }).join('');

  // Layanan
  $('#hs').innerHTML = PROFIL.layanan.map(function (l, i) {
    return '<article class="card tilt"><b class="idx">' + ('0' + (i + 1)).slice(-2) + '</b><h3>' + esc(l[0]) + '</h3><p>' + esc(l[1]) + '</p><div class="dasar">' + esc(l[2]) + '</div></article>';
  }).join('');

  // KPI isu TPA
  $('#kpis').innerHTML = PROFIL.kpi.map(function (x) { return '<div><b data-n="' + x.n + '">0</b><span>' + esc(x.s) + '</span></div>'; }).join('');

  // Kontak
  var c = PROFIL.kontak;
  $('#kontak-isi').innerHTML =
    '<div class="grid">' +
    '<div class="box"><b>Alamat kantor</b>' + esc(c.alamat) + '</div>' +
    '<div class="box"><b>Jam layanan</b>' + esc(c.jam) + '</div>' +
    '<div class="box"><b>Email</b><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></div>' +
    '<div class="box"><b>Instagram</b><a href="https://instagram.com/' + esc(c.ig.replace('@', '')) + '" target="_blank" rel="noopener">' + esc(c.ig) + '</a></div>' +
    '</div><div class="lapor"><b>Cara menyampaikan pengaduan</b><p>' + esc(c.pengaduan) + '</p></div>';

  // Sumber
  $('#sumber').innerHTML = PROFIL.sumber.map(function (s) { return '<li><a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + '</a></li>'; }).join('');
})();

/* ===================== Peta TPA ===================== */
(function () {
  var strip = function (n) { return n.replace(/^Kabupaten /, ''); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var WARNA = {
    'open dumping': '#d8452b',
    'controlled landfill': '#e2a21c',
    'sanitary landfill': '#2e9e6b',
    'residu': '#4f7fd1',
    '-': '#8a9490'
  };
  var LABEL = { 'open dumping': 'Open dumping', 'controlled landfill': 'Controlled landfill', 'sanitary landfill': 'Sanitary landfill', 'residu': 'Hanya residu / ditutup sebagian', '-': 'Belum terdata' };
  var warna = function (t) { return WARNA[t.sistem] || WARNA['-']; };

  var withTPA = {};
  TPA.forEach(function (t) { withTPA[strip(t.kab)] = true; });

  // Statistik dari data
  var nKab = Object.keys(withTPA).length;
  var totalKab = KAB.features.filter(function (f) { return f.properties.WADMKK; }).length;
  var nOD = TPA.filter(function (t) { return t.sistem === 'open dumping'; }).length;
  document.getElementById('stats').innerHTML =
    '<div class="stat"><b>' + TPA.length + '</b><span>TPA terpetakan</span></div>' +
    '<div class="stat"><b>' + nKab + '</b><span>Kab/Kota berdata</span></div>' +
    '<div class="stat"><b>' + totalKab + '</b><span>Kab/Kota di Jawa Timur</span></div>' +
    '<div class="stat"><b style="color:#d8452b">' + nOD + '</b><span>Terdata open dumping</span></div>';

  // Legenda
  document.getElementById('legend').innerHTML = Object.keys(LABEL).map(function (k) {
    return '<span><i style="background:' + WARNA[k] + '"></i>' + LABEL[k] + '</span>';
  }).join('');

  // ---- Peta: zoom roda mouse SELALU aktif (perbaikan) ----
  var map = L.map('map', {
    scrollWheelZoom: true,     // dulu false -> peta tidak bisa di-zoom dengan scroll
    wheelPxPerZoomLevel: 90,   // zoom lebih responsif
    zoomSnap: 0.5, zoomDelta: 0.5,
    minZoom: 7, maxZoom: 19,
    attributionControl: true
  });
  map.attributionControl.setPrefix('');

  var sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 19, attribution: 'Citra &copy; Esri, Maxar, Earthstar Geographics' }).addTo(map);
  var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' });
  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    { maxZoom: 17, attribution: '&copy; OpenTopoMap (CC-BY-SA)' });

  var batas = L.geoJSON(KAB, {
    style: function (f) {
      var on = withTPA[f.properties.WADMKK];
      return { color: '#ffffff', weight: 1, opacity: .8, fillColor: on ? '#f5c400' : '#000', fillOpacity: on ? 0.22 : 0 };
    },
    onEachFeature: function (f, l) {
      if (f.properties.WADMKK) l.bindTooltip(f.properties.WADMKK, { sticky: true });
      l.on('mouseover', function () { l.setStyle({ weight: 2.5, color: '#f5c400' }); });
      l.on('mouseout', function () { batas.resetStyle(l); });
    }
  }).addTo(map);

  var HOME = L.latLngBounds([[-8.85, 110.85], [-6.4, 116.3]]); // daratan Jawa Timur + Madura (pulau-pulau terluar tidak ikut)
  var markers = L.layerGroup().addTo(map);
  var listEl = document.getElementById('list-items');
  var items = [];

  function popup(t) {
    var dl = '';
    [['Sistem', LABEL[t.sistem] || t.sistem], ['Luas', t.luas], ['Volume', t.ton], ['Operasi sejak', t.tahun], ['Pengelola', t.pengelola]].forEach(function (r) {
      if (r[1] && r[1] !== '-') dl += '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd>';
    });
    var src = (t.sumber || []).map(function (u, i) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener">[' + (i + 1) + ']</a>'; }).join('');
    return '<div class="pop">' +
      '<img src="' + esc(t.foto || 'images/foto-tpa.png') + '" alt="Foto ' + esc(t.tpa) + '" loading="lazy">' +
      '<div class="ph"><small>' + esc(t.kab) + '</small><b>' + esc(t.tpa) + '</b>' +
      '<span class="badge" style="background:' + warna(t) + '">' + esc(LABEL[t.sistem] || 'Belum terdata') + '</span></div>' +
      '<div class="pb"><dl>' + dl + '<dt>Alamat</dt><dd>' + esc(t.alamat || '-') + '</dd>' +
      '<dt>Koordinat</dt><dd>' + t.lat.toFixed(5) + ', ' + t.lon.toFixed(5) + (t.n > 1 ? ' <em>(rata-rata ' + t.n + ' titik)</em>' : '') + '</dd></dl>' +
      (t.catatan ? '<p class="cat">' + esc(t.catatan) + '</p>' : '') +
      (src ? '<p class="src">Sumber: ' + src + '</p>' : '') +
      '</div></div>';
  }

  TPA.slice().sort(function (a, b) { return a.kab.localeCompare(b.kab) || a.tpa.localeCompare(b.tpa); }).forEach(function (t) {
    var m = L.circleMarker([t.lat, t.lon], { radius: 9, color: '#fff', weight: 2, fillColor: warna(t), fillOpacity: 1 })
      .bindTooltip(t.tpa, { direction: 'top', offset: [0, -8] })
      .bindPopup(popup(t), { minWidth: 240, maxWidth: 320 }).addTo(markers);
    // denyut untuk open dumping
    if (t.sistem === 'open dumping') {
      L.circleMarker([t.lat, t.lon], { radius: 16, color: warna(t), weight: 1.5, fill: false, opacity: .7, interactive: false, className: 'pulse' }).addTo(markers);
    }
    var b = document.createElement('button');
    b.innerHTML = '<i style="background:' + warna(t) + '"></i><div>' + esc(t.tpa) + '<small>' + esc(t.kab) + '</small><span class="tag">' + esc(LABEL[t.sistem] || 'Belum terdata') + '</span></div>';
    b.dataset.q = (t.tpa + ' ' + t.kab + ' ' + (t.sistem || '')).toLowerCase();
    b.onclick = function () {
      items.forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on');
      map.flyTo([t.lat, t.lon], 15, { duration: 0.9 });
      map.once('moveend', function () { m.openPopup(); });
      if (innerWidth < 820) document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    m.on('click', function () { items.forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); b.scrollIntoView({ block: 'nearest' }); });
    listEl.appendChild(b); items.push(b);
  });

  // Pencarian daftar
  document.getElementById('q').addEventListener('input', function (e) {
    var q = e.target.value.toLowerCase().trim();
    items.forEach(function (b) { b.style.display = !q || b.dataset.q.indexOf(q) > -1 ? '' : 'none'; });
  });

  L.control.layers(
    { 'Citra Satelit (Esri)': sat, 'OpenStreetMap': osm, 'Topografi': topo },
    { 'Titik TPA': markers, 'Batas Kab/Kota': batas },
    { collapsed: innerWidth < 820 }
  ).addTo(map);
  L.control.scale({ imperial: false }).addTo(map);

  // Tombol: kembali ke Jawa Timur + layar penuh
  var Ctl = L.Control.extend({
    onAdd: function () {
      var d = L.DomUtil.create('div', 'leaflet-bar');
      var home = L.DomUtil.create('a', 'lf-fs', d); home.href = '#'; home.title = 'Kembali ke Jawa Timur'; home.innerHTML = '⌂';
      var fs = L.DomUtil.create('a', 'lf-fs', d); fs.href = '#'; fs.title = 'Layar penuh'; fs.innerHTML = '⛶';
      L.DomEvent.on(home, 'click', function (e) { L.DomEvent.stop(e); map.closePopup(); map.flyToBounds(HOME, { padding: [10, 10] }); });
      L.DomEvent.on(fs, 'click', function (e) {
        L.DomEvent.stop(e);
        var el = map.getContainer(); el.classList.toggle('fs'); fs.innerHTML = el.classList.contains('fs') ? '✕' : '⛶';
        setTimeout(function () { map.invalidateSize(); }, 60);
      });
      L.DomEvent.disableClickPropagation(d);
      return d;
    }
  });
  map.addControl(new Ctl({ position: 'topleft' }));
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var el = map.getContainer(); if (el.classList.contains('fs')) { el.classList.remove('fs'); map.invalidateSize(); } } });

  map.fitBounds(HOME, { padding: [10, 10] });
  // Pastikan ukuran benar setelah font/layout siap
  var fit = function () { map.invalidateSize(); map.fitBounds(HOME, { padding: [10, 10] }); };
  setTimeout(fit, 400); addEventListener('load', fit);
  var first = true;
  new ResizeObserver(function () { map.invalidateSize(); if (first && document.getElementById('map').offsetHeight > 0) { first = false; fit(); } }).observe(document.getElementById('map'));
})();

/* ===================== Efek halaman ===================== */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); }, $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };
  var fine = matchMedia('(pointer:fine)').matches;

  // Counter angka
  function count(el) {
    var n = +el.dataset.n, t0 = performance.now(), fmt = function (v) { return v.toLocaleString('id-ID'); };
    (function s(t) { var p = Math.min(1, (t - t0) / 1500); el.textContent = fmt(Math.round(n * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(s); })(t0);
  }
  setTimeout(function () { $$('#hstats b').forEach(count); }, 700);
  var kio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { count(e.target); kio.unobserve(e.target); } }); }, { threshold: .5 });
  $$('#kpis b').forEach(function (b) { kio.observe(b); });

  // Reveal
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.rv').forEach(function (el) { io.observe(el); });

  // Nav
  var bar = $('#bar'), nav = $('#nav'), links = $$('.nav nav a'), secs = links.map(function (a) { return $(a.getAttribute('href')); });
  var burger = $('#burger');
  burger.onclick = function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
  links.forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }); });
  function onScroll() {
    var h = document.documentElement, y = scrollY;
    bar.style.transform = 'scaleX(' + (y / (h.scrollHeight - innerHeight || 1)) + ')';
    nav.classList.toggle('solid', y > 40);
    var cur = -1; secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if (fine) {
    var glow = $('#glow');
    addEventListener('pointermove', function (e) {
      glow.style.opacity = 1; glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      var d = $('[data-depth]'), k = +d.dataset.depth;
      d.style.transform = 'translate(' + (e.clientX / innerWidth - 0.5) * -k + 'px,' + (e.clientY / innerHeight - 0.5) * -k + 'px)';
    });
    $$('.tilt').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var b = c.getBoundingClientRect();
        c.style.setProperty('--ry', ((e.clientX - b.left) / b.width - 0.5) * 8 + 'deg');
        c.style.setProperty('--rx', ((e.clientY - b.top) / b.height - 0.5) * -8 + 'deg');
      });
      c.addEventListener('pointerleave', function () { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    });
  }

  // Geser horizontal
  var hs = $('#hs'), hpi = $('#hpi'), down = false, sx = 0, sl = 0, moved = 0;
  function prog() { var m = hs.scrollWidth - hs.clientWidth; hpi.style.marginLeft = (m > 0 ? hs.scrollLeft / m * 80 : 0) + '%'; }
  hs.addEventListener('scroll', prog, { passive: true }); prog();
  hs.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = 0; sx = e.clientX; sl = hs.scrollLeft; });
  addEventListener('pointermove', function (e) { if (!down) return; moved = e.clientX - sx; if (Math.abs(moved) > 4) hs.classList.add('drag'); hs.scrollLeft = sl - moved; });
  addEventListener('pointerup', function () { down = false; hs.classList.remove('drag'); });
  function by(d) { hs.scrollBy({ left: d * (hs.firstElementChild.offsetWidth + 22), behavior: 'smooth' }); }
  $('#prev').onclick = function () { by(-1); }; $('#next').onclick = function () { by(1); };
})();
