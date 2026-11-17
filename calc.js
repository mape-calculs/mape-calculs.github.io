// Arrondis identiques à Excel (15 chiffres significatifs, demi vers l'extérieur)
const X = {
  clean: x => parseFloat(Number(x).toPrecision(15)),
  shift: (x, d) => Number(Math.abs(x) + 'e' + d),
  round(x, d = 0) { x = X.clean(x); const s = Math.sign(x); return s * Number(Math.round(X.clean(X.shift(x, d))) + 'e-' + d); },
  roundup(x, d = 0) { x = X.clean(x); const s = Math.sign(x); return s * Number(Math.ceil(X.clean(X.shift(x, d))) + 'e-' + d); },
  rounddown(x, d = 0) { x = X.clean(x); const s = Math.sign(x); return s * Number(Math.floor(X.clean(X.shift(x, d))) + 'e-' + d); },
  avg: a => a.reduce((s, v) => s + v, 0) / a.length,
};
const Calc = {
  trh(volume, surface, v) {
    const vm = X.avg(v), debit = vm * surface * 3600;
    return { vm, debit, trh: X.round(debit / volume, 0) };
  },
  soufflage(v) {
    const vm = X.round(X.avg(v), 2), hi = X.rounddown(vm * 1.2, 2), lo = X.roundup(vm * 0.8, 2);
    const vmin = Math.min(...v), vmax = Math.max(...v);
    return { vm, hi, lo, vmin, vmax, conforme: vmin >= lo && vmax <= hi };
  },
  flux(v, ss, se) {
    const moy = X.avg(v), vmes = X.round(moy, 2), q = X.round(moy * ss, 3), vm = X.round(q / se, 2);
    return { vmes, q, vm, conforme: vm >= 0.4 };
  },
};
if (typeof module !== 'undefined') module.exports = { X, Calc };
