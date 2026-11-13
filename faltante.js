// Agregado en la replica: las imagenes que Internet Archive no llego a guardar
// se reemplazan por un cartelito con el nombre del archivo que falta.
// Si conseguis la foto original, copiala con ese nombre y aparece sola.
document.addEventListener("error", function (e) {
  var img = e.target;
  if (!img || img.tagName !== "IMG" || img.src.indexOf("data:") === 0) return;
  var nombre = img.getAttribute("src") || "";
  try { nombre = decodeURIComponent(nombre); } catch (err) {}
  nombre = nombre.split("/").pop();
  var seguro = nombre.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var h = parseInt(img.getAttribute("height"), 10) || 0;
  var w = parseInt(img.getAttribute("width"), 10) || 0;
  if (!h && !w) { w = 120; h = 90; }
  else if (!w) { w = Math.round(h * 4 / 3); }
  else if (!h) { h = Math.round(w * 3 / 4); }
  var f = Math.max(9, Math.min(16, Math.round(w / 14)));
  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
    '<rect x="1" y="1" width="' + (w - 2) + '" height="' + (h - 2) + '" fill="#e8e8e8" stroke="#808080" stroke-dasharray="6 4" stroke-width="2"/>' +
    '<text x="50%" y="45%" text-anchor="middle" font-family="Arial" font-size="' + f + '" fill="#800000">imagen perdida</text>' +
    '<text x="50%" y="45%" dy="' + (f + 4) + '" text-anchor="middle" font-family="Courier New, monospace" font-size="' + f + '" fill="#000080">' + seguro + '</text>' +
    '</svg>';
  img.title = "Falta: " + nombre;
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}, true);
