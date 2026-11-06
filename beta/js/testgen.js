/* ============================================================
   TEST GENERATOR — 41-Maktab 2.0 (beta)
   Matematika (5–7 sinf): skript orqali cheksiz savollar.
   Har topshirishda tasodifiy sonlar → takrorlanish yo'q.
   8–10 sinf: Algebra + Geometriya (keyingi bosqichda ulanadi).
   ============================================================ */
(function (global) {
  'use strict';

  var R = {
    int: function (min, max) { return min + Math.floor(Math.random() * (max - min + 1)); },
    pick: function (arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    shuffle: function (a) {
      a = a.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
  };

  /* To'g'ri javob + xato namoyandalar → savol (kam bo'lsa null) */
  function q4(text, correct, wrongs) {
    var seen = {}, out = [];
    for (var i = 0; i < wrongs.length && out.length < 3; i++) {
      var w = String(wrongs[i]);
      if (w === String(correct) || seen[w]) continue;
      seen[w] = 1; out.push(w);
    }
    if (out.length < 3) return null;
    return { question: String(text), answers: [String(correct)].concat(out), correct: 0 };
  }

  function runType(fn, tries) {
    tries = tries || 8;
    for (var i = 0; i < tries; i++) { var q = fn(); if (q) return q; }
    return null;
  }

  /* "Ax² + Bx" formati */
  function poly2(A, B) {
    var s = '';
    if (A) s += (A === 1 ? '' : String(A)) + 'x²';
    if (B) {
      var mag = (Math.abs(B) === 1 ? '' : String(Math.abs(B))) + 'x';
      s = s ? (B > 0 ? s + ' + ' + mag : s + ' - ' + mag) : (B < 0 ? '-' + mag : mag);
    }
    return s || '0';
  }

  /* ================= 5-SINF ================= */
  var T5 = {
    add: function () {
      var a = R.int(137, 986), b = R.int(137, 986), s = a + b;
      return q4(a + ' + ' + b + ' = ?', s, [s + 1, s - 1, s + 10, s - 10, s + 100]);
    },
    sub: function () {
      var a = R.int(300, 990), b = R.int(110, a - 5), s = a - b;
      return q4(a + ' - ' + b + ' = ?', s, [s + 1, s - 1, s + 10, s - 10, s + 100]);
    },
    mul: function () {
      var a = R.int(12, 99), b = R.int(3, 12), p = a * b;
      return q4(a + ' × ' + b + ' = ?', p, [p - 10, p + 10, a * (b - 1), a * (b + 1), p - b]);
    },
    div: function () {
      var b = R.int(3, 12), q = R.int(4, 20), a = b * q;
      return q4(a + ' : ' + b + ' = ?', q, [q + 1, q - 1, q + 2, q - 2, q + 5]);
    },
    order: function () {
      var a = R.int(2, 9), b = R.int(2, 9), c = R.int(3, 9), s = a + b * c;
      return q4(a + ' + ' + b + ' × ' + c + ' = ?', s, [(a + b) * c, a * b + c, s + 1, s - 1, s + 10]);
    },
    dec: function () {
      var a = R.int(11, 89), b = R.int(11, 89), s = a + b;
      if (s > 99) return null;
      var f = function (x) { return '0,' + (x < 10 ? '0' + x : x); };
      return q4(f(a) + ' + ' + f(b) + ' = ?', f(s), [f(s + 1), f(Math.max(1, s - 1)), f(Math.min(99, s + 10)), f(Math.max(1, s - 10))]);
    },
    rectPer: function () {
      var a = R.int(3, 20), b = R.int(3, 20), s = 2 * (a + b);
      return q4('Eni ' + a + ' m, uzunligi ' + b + ' m bo\'lgan to\'rtburchakning perimetri nechchi?', s, [a + b, a * b, 2 * a + b, s + 2, s - 2]);
    },
    sqArea: function () {
      var a = R.int(4, 15);
      return q4('Tomonlari ' + a + ' m bo\'lgan kvadratning yuzi (m²) nechchi?', a * a, [2 * a, a * a + 2 * a, a * a - a, 4 * a]);
    },
    eq: function () {
      var b = R.int(25, 90), x = R.int(3, b - 5), a = b - x;
      return q4('x + ' + a + ' = ' + b + ' tenglamada x = ?', x, [x + 1, x - 1, x + 2, a, b - a]);
    },
    max: function () {
      var nums = [];
      while (nums.length < 4) { var v = R.int(100, 999); if (nums.indexOf(v) < 0) nums.push(v); }
      var m = Math.max.apply(null, nums);
      return q4('Qaysi son eng katta?', m, nums.filter(function (v) { return v !== m; }));
    },
    place: function () {
      var pos = R.int(0, 3); // 0=ming,1=yuz,2=o'n,3=bir
      var digs = [R.int(1, 9), R.int(1, 9), R.int(1, 9), R.int(1, 9)];
      var d = digs[pos];
      var str = digs.join('');
      var names = ['Mingliklar', 'Yuzliklar', 'O\'nliklar', 'Birlar'];
      return q4(str + ' sonidagi ' + d + ' raqami qaysi o\'rin qiymatini bildiradi?', names[pos], [names[(pos + 1) % 4], names[(pos + 2) % 4], names[(pos + 3) % 4]]);
    },
    div3: function () {
      var v = R.int(10, 40) * 3;
      var others = [];
      while (others.length < 3) { var w = R.int(Math.max(10, v - 25), v + 25); if (w % 3 !== 0 && w !== v && others.indexOf(w) < 0) others.push(w); }
      return q4('Qaysi son 3 ga qoldiqsiz bo\'ladi?', v, others);
    },
    word: function () {
      var p = R.int(4, 20) * 500, k = R.int(3, 6);
      return q4('Bir dona olma ' + p + ' so\'m. ' + k + ' dona olma nechchi so\'m?', p * k, [p * (k - 1), p * (k + 1), p * k - 500, p * k + 500]);
    },
    triPer: function () {
      var a = R.int(3, 12), b = R.int(3, 12), c = R.int(3, 12);
      if (a + b <= c || a + c <= b || b + c <= a) return null;
      var s = a + b + c;
      return q4('Tomonlari ' + a + ', ' + b + ' va ' + c + ' sm bo\'lgan uchburchakning perimetri (sm) nechchi?', s, [a + b, s - a, s + 1, s + 2, Math.floor(s / 2)]);
    }
  };

  /* ================= 6-SINF ================= */
  var T6 = {
    negAdd: function () {
      var a = R.int(2, 20), b = R.int(2, 20), s = b - a;
      return q4('(-' + a + ') + ' + b + ' = ?', s, [a + b, -(a + b), s + 1, s - 1, a - b]);
    },
    negMul: function () {
      var a = R.int(2, 12), b = R.int(2, 12), p = a * b;
      return q4('(-' + a + ') × (-' + b + ') = ?', p, [-p, p + 10, p - 10, a - b, p + b]);
    },
    fracSame: function () {
      var dn = R.int(5, 12), a = R.int(1, dn - 2), b = R.int(1, dn - 1 - a);
      if (b < 1) return null;
      var num = a + b;
      return q4(a + '/' + dn + ' + ' + b + '/' + dn + ' = ?', num + '/' + dn, [(num + 1) + '/' + dn, (num - 1) + '/' + dn, num + '/' + (dn + 1), (a * b) + '/' + dn]);
    },
    fracSub: function () {
      var dn = R.int(5, 12), a = R.int(2, dn - 1), b = R.int(1, a - 1);
      var num = a - b;
      return q4(a + '/' + dn + ' - ' + b + '/' + dn + ' = ?', num + '/' + dn, [(num + 1) + '/' + dn, (num - 1) + '/' + dn, (a + b) + '/' + dn, num + '/' + (dn + 1)]);
    },
    fracMul: function () {
      var d = R.int(2, 4), a1 = R.int(1, 5), b1 = R.int(1, 5), res = a1 * b1;
      var a = a1 * d, b = b1 * d;
      return q4(a + '/' + d + ' × ' + b + '/' + d + ' = ?', String(res), [String(res + 1), String(res + 2), String(a * b), String(res - 1 < 0 ? res + 3 : res - 1)]);
    },
    fracDiv: function () {
      var d = R.int(2, 6), c = R.int(1, 4), res = R.int(2, 9), a = res * c;
      return q4(a + '/' + d + ' : ' + c + '/' + d + ' = ?', String(res), [String(res + 1), String(res - 1), String(res * c), String(res + 2)]);
    },
    fracCmp: function () {
      var b = R.int(3, 8), d = R.int(3, 8);
      if (b === d) return null;
      var a = R.int(1, b - 1), c = R.int(1, d - 1);
      if (a * d <= c * b) return null;
      var a2 = (a + 1 > b ? a - 1 : a + 1);
      if (a2 < 1) a2 = 1;
      return q4('Qaysi kasr kattaroq?', a + '/' + b, [c + '/' + d, a2 + '/' + b, c + '/' + (d + 1), a + '/' + (b + 1)]);
    },
    ratio: function () {
      var b = R.int(2, 6), a = R.int(2, 6), k = R.int(2, 5), d = b * k, x = a * k;
      return q4(a + ' : ' + b + ' = x : ' + d + ' proporsiyaning x qiymati?', x, [x + 1, x - 1, x + k, x - k, a * d]);
    },
    pct: function () {
      var p = R.pick([5, 10, 15, 20, 25, 50]), nn = R.int(5, 20) * 20, v = nn * p / 100;
      return q4(nn + ' sonining ' + p + '% i nechchi?', v, [v + 10, v - 10, v + 5, v - 5, nn / 10]);
    },
    eqLin: function () {
      var a = R.int(2, 9), x = R.int(2, 12), b = R.int(1, 9), c = a * x + b;
      return q4(a + 'x + ' + b + ' = ' + c + ' tenglamada x = ?', x, [x + 1, x - 1, x + 2, c - b, a + x]);
    },
    opposite: function () {
      var a = R.int(1, 15);
      return q4('-' + a + ' sonining qarama-qarshi soni qaysi?', String(a), [String(-a), String(a + 1), String(a - 1), String(-a - 1)]);
    },
    ray: function () {
      var a = R.int(1, 5), st = R.int(1, 6), s = -st + a;
      return q4('Ko\'chada -' + st + ' nuqtadan ' + a + ' birlik o\'ngga siljisa, qaysi nuqta kelib chiqadi?', s, [-st - a, a - st + 1, -st + a + 1, st + a]);
    },
    decPct: function () {
      var pair = R.pick([[25, '25%'], [50, '50%'], [10, '10%'], [75, '75%'], [5, '5%']]);
      var all = ['5%', '10%', '25%', '50%', '75%'];
      return q4('0,' + (pair[0] < 10 ? '0' + pair[0] : pair[0]) + ' kasriga teng bo\'lgan foiz qaysi?', pair[1], all.filter(function (v) { return v !== pair[1]; }));
    }
  };

  /* ================= 7-SINF ================= */
  var T7 = {
    polyAdd: function () {
      var a = R.int(2, 7), b = R.int(1, 6), c = R.int(1, 4), d = R.int(1, 5);
      var A = a + c, B = b - d;
      return q4('(' + poly2(a, b) + ') + (' + poly2(c, -d) + ') = ?', poly2(A, B), [poly2(A, B + 2 * d), poly2(A - 2 * c, B), poly2(A + c, B), poly2(A, B - 2 * b)]);
    },
    polySub: function () {
      var a = R.int(3, 8), b = R.int(2, 6), c = R.int(1, a - 1), d = R.int(1, b - 1);
      if (!d) return null;
      var A = a - c, B = b - d;
      return q4('(' + poly2(a, b) + ') - (' + poly2(c, d) + ') = ?', poly2(A, B), [poly2(A + 2 * c, B), poly2(A, B + 2 * d), poly2(a + c, b + d), poly2(A - 2 * c, B - 2 * d)]);
    },
    diff: function () {
      var a = R.int(3, 12), a2 = a * a;
      return q4('(x + ' + a + ')(x - ' + a + ') = ?', 'x² - ' + a2, ['x² + ' + a2, 'x² + ' + (2 * a) + 'x + ' + a2, 'x² - ' + (2 * a) + 'x + ' + a2, 'x² - ' + (2 * a) + 'x - ' + a2]);
    },
    sq1: function () {
      var b = R.int(2, 9), b2 = b * b;
      return q4('(x + ' + b + ')² = ?', 'x² + ' + (2 * b) + 'x + ' + b2, ['x² + ' + b + 'x + ' + b2, 'x² - ' + (2 * b) + 'x + ' + b2, 'x² + ' + (2 * b) + 'x - ' + b2, 'x² + ' + b2]);
    },
    sq2: function () {
      var b = R.int(2, 9), b2 = b * b;
      return q4('(x - ' + b + ')² = ?', 'x² - ' + (2 * b) + 'x + ' + b2, ['x² + ' + (2 * b) + 'x + ' + b2, 'x² - ' + b + 'x + ' + b2, 'x² - ' + (2 * b) + 'x - ' + b2, 'x² + ' + (2 * b) + 'x - ' + b2]);
    },
    eq2v: function () {
      var a = R.int(3, 9), c = R.int(1, 2), x = R.int(2, 12), b = R.int(1, 9);
      var d = a * x + b - c * x, cs = c === 1 ? '' : String(c);
      return q4(a + 'x + ' + b + ' = ' + cs + 'x + ' + d + ' tenglamada x = ?', x, [x + 1, x - 1, x + 2, b - d, a - c]);
    },
    func: function () {
      var m = R.int(1, 5), nn = R.int(1, 9), x0 = R.int(1, 8), v = m * x0 + nn;
      var ms = m === 1 ? '' : String(m);
      return q4('y = ' + ms + 'x + ' + nn + ' funksiya uchun x = ' + x0 + ' da y = ?', v, [v + 1, v - 1, m * x0 - nn, v + nn, m * (x0 + 1) + nn]);
    },
    triAngle: function () {
      var A = R.int(35, 80), B = R.int(35, 145 - A), C = 180 - A - B;
      if (C < 25) return null;
      return q4('Uchburchakning ikki burchagi ' + A + '° va ' + B + '°. Uchunchi burchagi nechchi?', C + '°', [(180 - A) + '°', (180 - B) + '°', (A + B) + '°', (C + 10) + '°', (C - 10) + '°']);
    },
    sup: function () {
      var A = R.int(35, 140), s = 180 - A;
      var w = [s + 10, s - 10, A + 45, Math.floor(180 - A / 2)];
      if (90 - A > 0) w.push(90 - A);
      return q4(A + '° burchakning qo\'shma burchagi nechchi?', s + '°', w.map(function (v) { return v + '°'; }));
    },
    comp: function () {
      var A = R.int(15, 75), s = 90 - A;
      return q4('Ikkala burchakning yig\'indisi 90°. Biri ' + A + '° bo\'lsa, ikkinchisi nechchi?', s + '°', [(180 - A) + '°', (90 + A) + '°', (s + 10) + '°', (s - 10) + '°']);
    },
    triArea: function () {
      var b = R.int(4, 20), h = R.int(3, 15);
      if ((b * h) % 2 !== 0) return null;
      var s = b * h / 2;
      return q4('Asosi ' + b + ' sm, balandligi ' + h + ' sm bo\'lgan uchburchak yuzi (sm²) nechchi?', s, [b * h, s + h, s - h, s + b, Math.round(b * h / 3)]);
    },
    monom: function () {
      var a = R.int(2, 9), b = R.int(2, 9);
      return q4(a + 'x · ' + b + 'x² = ?', (a * b) + 'x³', [(a + b) + 'x³', (a * b) + 'x²', (a * b) + 'x⁵', (a * b + 1) + 'x³']);
    },
    parallel: function () {
      var A = R.int(50, 140), s = 180 - A;
      var w = [A, s + 10, s - 10, 90 + A];
      if (90 - A > 0) w.push(90 - A);
      return q4('Parallel to\'g\'ri chiziqlarni kesuvchi kesib o\'tgan. Ichki burchaklardan biri ' + A + '°. Yonlashgan ichki burchak nechchi?', s + '°', w.map(function (v) { return v + '°'; }));
    }
  };


  /* ============ YORDAMCHILAR ============ */
  function gcd(a, b) { while (b) { var t = b; b = a % b; a = t; } return a; }
  var subN = { 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉', 10: '₁₀', 11: '₁₁', 12: '₁₂' };
  var supN = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  function quadEq(r1, r2) {
    var s = r1 + r2, p = r1 * r2;
    return 'x²' + (s > 0 ? ' - ' + s : (s < 0 ? ' + ' + (-s) : '')) + 'x' + (p > 0 ? ' + ' + p : (p < 0 ? ' - ' + (-p) : '')) + ' = 0';
  }
  function rootsWrong(r1, r2) {
    return [r1 + ' va ' + String(-r2), String(-r1) + ' va ' + r2, (r1 + r2) + ' va ' + (r1 * r2), String(r1 * 2) + ' va ' + r2];
  }

  /* ============ 8-SINF ALGEBRA ============ */
  var T8A = {
    exp1: function () {
      var a = R.pick([2, 3]), m = R.int(2, 4), n = R.int(2, 4);
      return q4(a + supN[m] + ' × ' + a + supN[n] + ' = ?', Math.pow(a, m + n), [Math.pow(a, m * n), Math.pow(a, m + n - 1), Math.pow(a, m + n + 1), Math.pow(a + 1, m + n)]);
    },
    exp2: function () {
      var a = R.pick([2, 3]), m = R.int(2, 3), n = R.int(2, 3);
      return q4('(' + a + supN[m] + ')^' + n + ' = ?', Math.pow(a, m * n), [Math.pow(a, m + n), Math.pow(a * n, m), Math.pow(a, m * n + 1)]);
    },
    sqrt1: function () {
      var n = R.int(11, 30);
      return q4('√(' + n + '²) = ?', n, [-n, n * n, Math.floor(n / 2), n + 1]);
    },
    sqrt2: function () {
      var a = R.int(2, 9), b = R.pick([2, 3, 5, 7]);
      return q4('√(' + (a * a * b) + ') ifodani soddalashtiring', a + '√' + b, [(a * b) + '√' + b, a + '√' + (b * b), (a * a) + '√' + b, '√' + (a * a * b)]);
    },
    quadRoots: function () {
      var r1 = R.int(-9, 9), r2 = R.int(-9, 9);
      if (r1 === r2 || !r1 || !r2) return null;
      return q4(quadEq(r1, r2) + ' ning ildizlari?', r1 + ' va ' + r2, rootsWrong(r1, r2));
    },
    quadD: function () {
      var r1 = R.int(-9, 9), r2 = R.int(-9, 9);
      if (r1 === r2 || !r1 || !r2) return null;
      var D = (r1 - r2) * (r1 - r2);
      return q4(quadEq(r1, r2) + ' ning diskriminanti D = ?', D, [D + 1, D - 1, -D, 2 * (r1 - r2)]);
    },
    vieta: function () {
      var r1 = R.int(-9, 9), r2 = R.int(-9, 9);
      if (r1 === r2 || !r1 || !r2) return null;
      if (R.pick([0, 1]) === 0) {
        return q4(quadEq(r1, r2) + ' uchun x₁ + x₂ = ?', r1 + r2, [r1 * r2, (r1 + r2) + 1, (r1 + r2) - 1, -(r1 + r2)]);
      }
      return q4(quadEq(r1, r2) + ' uchun x₁ · x₂ = ?', r1 * r2, [r1 + r2, (r1 * r2) + 1, (r1 * r2) - 1, -(r1 * r2)]);
    },
    quadSolve: function () {
      var r1 = R.int(-6, 6), r2 = R.int(-6, 6);
      if (r1 === r2 || !r1 || !r2) return null;
      var a = R.int(2, 3), s = (r1 + r2) * a, p = r1 * r2 * a;
      var eq = a + 'x²' + (s > 0 ? ' - ' + s : (s < 0 ? ' + ' + (-s) : '')) + 'x' + (p > 0 ? ' + ' + p : (p < 0 ? ' - ' + (-p) : '')) + ' = 0';
      return q4(eq + ' ning ildizlari?', r1 + ' va ' + r2, rootsWrong(r1, r2));
    },
    fracSimpl: function () {
      if (R.pick([0, 1]) === 0) {
        var a = R.int(2, 9);
        return q4('Soddalashtiring: (' + a + 'x + ' + a + 'y) : ' + a, 'x + y', ['x · y', 'x + y + ' + a, a + 'x + ' + a + 'y', 'x - y']);
      }
      var k = R.int(2, 9);
      return q4('Soddalashtiring: (x² - ' + (k * k) + ') : (x - ' + k + ')', 'x + ' + k, ['x - ' + k, 'x² + ' + (k * k), 'x + ' + (k * k), 'x']);
    },
    invProp: function () {
      var k = R.pick([6, 12, 20, 30]), x0 = R.pick([2, 3, 5, 6]);
      if (k % x0) return null;
      return q4('y = ' + k + '/x teskari proporsionallikda x = ' + x0 + ' da y = ?', k / x0, [k / x0 + 1, k / x0 - 1, k * x0, k / x0 + 2]);
    },
    numSeq: function () {
      var a1 = R.int(2, 15), d = R.int(1, 7);
      return q4(a1 + ', ' + (a1 + d) + ', ' + (a1 + 2 * d) + ', ' + (a1 + 3 * d) + ', ... qatorning 5-afdori = ?', a1 + 4 * d, [a1 + 4 * d + 1, a1 + 5 * d, a1 + 3 * d, a1 + 4 * d - d]);
    }
  };

  /* ============ 9-SINF ALGEBRA ============ */
  var T9A = {
    arithN: function () {
      var a1 = R.int(1, 15), d = R.int(1, 7), n = R.int(3, 12);
      var v = a1 + (n - 1) * d;
      return q4('Arifmetik progressiyada a₁ = ' + a1 + ', d = ' + d + '. a' + subN[n] + ' = ?', v, [v + d, v - d, v + 1, a1 * n]);
    },
    arithS: function () {
      var a1 = R.int(1, 10), d = R.int(1, 6), n = R.int(4, 10);
      var an = a1 + (n - 1) * d, s = n * (a1 + an) / 2;
      return q4('Arifmetik progressiyada a₁ = ' + a1 + ', d = ' + d + ', n = ' + n + '. S' + subN[n] + ' = ?', s, [s + n, s - n, n * (a1 + an), s + d]);
    },
    geoN: function () {
      var a1 = R.int(1, 6), q = R.pick([2, 3]), n = R.int(2, 6);
      var v = a1 * Math.pow(q, n - 1);
      return q4('Geometrik progressiyada a₁ = ' + a1 + ', q = ' + q + '. a' + subN[n] + ' = ?', v, [v * q, v / q, v + q, a1 * (n - 1)]);
    },
    geoS: function () {
      var a1 = R.int(1, 4), n = R.int(3, 6);
      var s = a1 * (Math.pow(2, n) - 1);
      return q4('Geometrik progressiyada a₁ = ' + a1 + ', q = 2, n = ' + n + '. S' + subN[n] + ' = ?', s, [s + a1, s - a1, a1 * Math.pow(2, n), s + 2]);
    },
    expVal: function () {
      var x = R.int(3, 7);
      return q4('2' + supN[x] + ' = ?', Math.pow(2, x), [Math.pow(2, x) * 2, Math.pow(2, x) / 2, Math.pow(2, x) + 2, x * 2]);
    },
    expEq: function () {
      var k = R.int(2, 7), a = R.pick([2, 3, 5]);
      return q4(a + '^x = ' + a + supN[k] + ' bo\'lsa, x = ?', k, [k + 1, k - 1, a * k, Math.pow(a, k)]);
    },
    logVal: function () {
      var k = R.int(3, 6);
      return q4('log₂(' + Math.pow(2, k) + ') = ?', k, [k + 1, k - 1, 2 * k, Math.pow(2, k)]);
    },
    logSum: function () {
      var m = R.int(1, 4), n = R.int(1, 4);
      return q4('log₂(' + Math.pow(2, m) + ') + log₂(' + Math.pow(2, n) + ') = ?', m + n, [m * n, m + n + 1, m + n - 1, Math.pow(2, m + n)]);
    },
    logDiff: function () {
      var m = R.int(2, 5), n = R.int(1, m - 1);
      return q4('log₂(' + Math.pow(2, m) + ') - log₂(' + Math.pow(2, n) + ') = ?', m - n, [m + n, m * n, m - n + 1, Math.pow(2, m - n)]);
    },
    trigVal: function () {
      var t = R.pick([
        ['sin 30°', '1/2', ['√3/2', '√2/2', '1']],
        ['sin 45°', '√2/2', ['1/2', '√3/2', '√2']],
        ['sin 60°', '√3/2', ['1/2', '√2/2', '√3']],
        ['cos 30°', '√3/2', ['1/2', '√2/2', '1']],
        ['cos 45°', '√2/2', ['1/2', '√3/2', '√2']],
        ['cos 60°', '1/2', ['√3/2', '√2/2', '1']],
        ['tg 45°', '1', ['1/2', '√2/2', '√3']],
        ['tg 30°', '√3/3', ['√3', '1/3', '√2/2']],
        ['tg 60°', '√3', ['√3/3', '3', '√2']]
      ]);
      return q4(t[0] + ' = ?', t[1], t[2]);
    },
    trigId: function () {
      return q4('sin²x + cos²x = ?', '1', ['0', '2', 'sin 2x', 'cos 2x']);
    }
  };

  /* ============ 10-SINF ALGEBRA ============ */
  var T10A = {
    logSolve: function () {
      var k = R.int(1, 5);
      return q4('log₂ x = ' + k + ' bo\'lsa, x = ?', Math.pow(2, k), [2 * k, k + 2, Math.pow(2, k + 1), k > 1 ? Math.pow(2, k - 1) : 4 * k]);
    },
    expSolve: function () {
      var k = R.int(1, 6), a = R.pick([2, 3]);
      return q4(a + '^x = ' + Math.pow(a, k) + ' bo\'lsa, x = ?', k, [a * k, k + 1, k > 1 ? k - 1 : k + 2, a + k]);
    },
    logMix: function () {
      var a = R.int(3, 20);
      return q4('2^(log₂ ' + a + ') = ?', a, [2 * a, a + 2, a > 2 ? a / 2 : 2 * a, Math.pow(2, a) > 1000000 ? 4 * a : Math.pow(2, a)]);
    },
    trigPeriod: function () {
      var t = R.pick([
        ['y = sin x', '2π', ['π', 'π/2', '4π']],
        ['y = cos x', '2π', ['π', 'π/2', '4π']],
        ['y = tg x', 'π', ['2π', 'π/2', '4π']]
      ]);
      return q4(t[0] + ' funksiyaning davri T = ?', t[1], t[2]);
    },
    trigAmp: function () {
      var a = R.int(2, 6), mx = R.pick([0, 1]);
      return q4('y = ' + a + ' sin x funksiyaning ' + (mx ? 'eng katta' : 'eng kichik') + ' qiymati = ?', mx ? a : -a, [mx ? -a : a, 2 * a, a - 1, 1]);
    },
    trigRange: function () {
      var b = R.int(1, 5);
      var c = '[' + (b - 1) + ' ; ' + (b + 1) + ']';
      return q4('y = sin x + ' + b + ' funksiyaning qiymatlar oralig\'i = ?', c, ['[0 ; ' + (b + 1) + ']', '[-1 ; ' + b + ']', '[-1 ; 1]', '[' + (-2 - b) + ' ; ' + (b + 2) + ']']);
    },
    trigEq: function () {
      var t = R.pick([
        ['sin x = 1', 'π/2', ['π/6', 'π/3', 'π']],
        ['sin x = 1/2', 'π/6', ['π/3', 'π/2', 'π/4']],
        ['sin x = √2/2', 'π/4', ['π/6', 'π/3', 'π/2']],
        ['sin x = √3/2', 'π/3', ['π/6', 'π/4', 'π/2']],
        ['cos x = 1/2', 'π/3', ['π/6', 'π/4', 'π/2']]
      ]);
      return q4(t[0] + ' tenglamaning eng kichik musbat yechimi x = ?', t[1], t[2]);
    },
    domainSqrt: function () {
      var a = R.int(1, 9);
      return q4('y = √(x - ' + a + ') funksiya ta\'rif sohasi = ?', '[' + a + ' ; ∞)', ['(' + a + ' ; ∞)', '(-∞ ; ' + a + ']', '(-∞ ; ' + a + ')', '[-' + a + ' ; ∞)']);
    },
    rangeSq: function () {
      return q4('y = x² funksiya qiymatlar to\'plami = ?', '[0 ; ∞)', ['(-∞ ; 0]', '(-∞ ; ∞)', '(0 ; ∞)']);
    },
    absEq: function () {
      var a = R.int(3, 9), b = R.int(2, 5);
      return q4('|x - ' + a + '| = ' + b + ' tenglamaning yechimlari = ?', (a - b) + ' va ' + (a + b), [(a - b) + ' va ' + (a - b), (a + b) + ' va ' + (a + b), a + ' va ' + b, (a - b) + ' va ' + (a + b + 1)]);
    },
    fnMono: function () {
      var t = R.pick([
        ['y = 2^x', 'o\'suvchi', ['kamayuvchi', 'davriy', 'doimiy']],
        ['y = (1/2)^x', 'kamayuvchi', ['o\'suvchi', 'davriy', 'doimiy']],
        ['y = sin x', 'davriy', ['o\'suvchi', 'kamayuvchi', 'doimiy']]
      ]);
      return q4(t[0] + ' funksiya qaysi xususiyatga ega?', t[1], t[2]);
    }
  };

  /* ============ 8-SINF GEOMETRIYA ============ */
  var T8G = {
    trapArea: function () {
      var a = R.int(4, 16), b = R.int(4, 16);
      if (a > b) { var t = a; a = b; b = t; }
      var h = R.int(2, 12);
      if (((a + b) * h) % 2) return null;
      var s = (a + b) * h / 2;
      return q4('Trapeziya asoslari ' + a + ' va ' + b + ' sm, balandligi ' + h + ' sm. Yuzi (sm²) = ?', s, [(a + b) * h, s + h, s - h, (b - a) * h]);
    },
    rhombusArea: function () {
      var d1 = R.int(2, 12) * 2, d2 = R.int(2, 12) * 2;
      var s = d1 * d2 / 2;
      return q4('Romb diagonallari ' + d1 + ' va ' + d2 + ' sm. Yuzi (sm²) = ?', s, [d1 * d2, s + d1, s - d2, d1 + d2]);
    },
    parArea: function () {
      var a = R.int(3, 15), h = R.int(2, 12);
      return q4('Parallelogram asosi ' + a + ' sm, balandligi ' + h + ' sm. Yuzi (sm²) = ?', a * h, [2 * a * h, a * h + h, 2 * (a + h), a * h - h]);
    },
    circleC: function () {
      var r = R.int(2, 9);
      return q4('Aylana radiusi ' + r + ' sm. Uzunligi C = ?', 2 * r + 'π', [r + 'π', 4 * r + 'π', r * r + 'π', 2 * r * r + 'π']);
    },
    circleS: function () {
      var r = R.int(2, 9);
      return q4('Aylana maydoni: radius ' + r + ' sm. S = ?', r * r + 'π', [2 * r + 'π', 2 * r * r + 'π', r + 'π', r * r * r + 'π']);
    },
    inscribed: function () {
      var c = R.int(40, 140) * 2, i = c / 2;
      return q4('Aylanadagi markaziy burchak ' + c + '°. Shu yoyga tayanadigan aylana burchagi = ?', i + '°', [c + '°', (180 - i) + '°', i / 2 + '°', (i + 10) + '°']);
    },
    simSide: function () {
      var a = R.int(2, 9), k = R.int(2, 4);
      return q4('O\'xshash uchburchaklar tomonlari nisbati 1:' + k + '. Birinchisida ' + a + ' sm bo\'lgan tomonga mos tomon ikkinchisida = ?', a * k, [a + k, 2 * a * k, a * k - k, 2 * a + k]);
    },
    simPer: function () {
      var p = R.int(10, 40), k = R.int(2, 3);
      return q4('O\'xshash uchburchaklar perimetri nisbati 1:' + k + '. Birinchi P = ' + p + ' sm, ikkinchisi = ?', p * k, [p + k, p * k + p, p * k - p, p * k * k]);
    },
    simArea: function () {
      var s = R.int(4, 20), k = R.pick([2, 3]);
      return q4('O\'xshash uchburchaklar tomonlari nisbati 1:' + k + ', birinchi yuzi ' + s + ' sm². Ikkinchi yuzi = ?', s * k * k, [s * k, s + k * k, s * k + s, s * k * k + s]);
    },
    quadAngles: function () {
      var a1 = R.int(40, 120), a2 = R.int(40, 120), a3 = R.int(40, 319 - a1 - a2);
      if (a3 < 40) return null;
      var a4 = 360 - a1 - a2 - a3;
      return q4('To\'rtburchak uch burchagi ' + a1 + '°, ' + a2 + '° va ' + a3 + '°. To\'rtinchisi = ?', a4 + '°', [(360 - a1) + '°', (360 - a1 - a2) + '°', (a4 + 10) + '°', (a1 + a2 + a3) + '°']);
    },
    extAngle: function () {
      var a = R.int(40, 80), b = R.int(40, 140 - a), e = a + b;
      return q4('Uchburchakning ikki ichki burchagi ' + a + '° va ' + b + '°. Uchunchi cho\'qqidagi tashqi burchak = ?', e + '°', [(180 - e) + '°', (180 - a) + '°', (e + 20) + '°', (180 - b) + '°']);
    }
  };

  /* ============ 9-SINF GEOMETRIYA ============ */
  var TRIPLES = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]];
  var T9G = {
    rtgHyp: function () {
      var t = R.pick(TRIPLES);
      return q4('To\'g\'ri burchakli uchburchak katetlari ' + t[0] + ' va ' + t[1] + ' sm. Gipotenuza = ?', t[2], [t[2] + 1, t[2] - 1, t[0] + t[1], t[2] + 2]);
    },
    rtgKatet: function () {
      var t = R.pick(TRIPLES);
      return q4('Gipotenuza ' + t[2] + ' sm, bir katet ' + t[0] + ' sm. Ikkinchi katet = ?', t[1], [t[1] + 1, t[1] - 1, t[2] - t[1], t[0]]);
    },
    trigSin: function () {
      var t = R.pick(TRIPLES);
      var g1 = gcd(t[0], t[2]), g2 = gcd(t[1], t[2]);
      return q4('Katetlari ' + t[0] + ' va ' + t[1] + ' bo\'lgan to\'g\'ri burchakli uchburchakda ' + t[0] + ' katetga qarshi burchak sin = ?', (t[0] / g1) + '/' + (t[2] / g1), [(t[1] / g2) + '/' + (t[2] / g2), '1/' + (t[2] / g1), (t[0] / g1) + '/' + (t[2] / g1 + 1), t[0] + '/' + t[2]]);
    },
    trigTg: function () {
      var t = R.pick(TRIPLES);
      var g = gcd(t[0], t[1]);
      return q4('Katetlari ' + t[0] + ' va ' + t[1] + ' bo\'lgan uchburchakda ' + t[0] + ' katetga qarshi burchak tg = ?', (t[0] / g) + '/' + (t[1] / g), [(t[1] / g) + '/' + (t[0] / g), '1', (t[0] / g) + '/' + (t[1] / g + 1), t[0] + '/' + t[2]]);
    },
    vecLen: function () {
      var t = R.pick([[3, 4], [6, 8], [5, 12], [9, 12], [8, 15], [12, 16], [20, 21], [7, 24]]);
      var len = Math.round(Math.sqrt(t[0] * t[0] + t[1] * t[1]));
      return q4('a(' + t[0] + ' ; ' + t[1] + ') vektor uzunligi |a| = ?', len, [len + 1, len - 1, t[0] + t[1], len + 2]);
    },
    vecAdd: function () {
      var x1 = R.int(-5, 5), y1 = R.int(-5, 5), x2 = R.int(-5, 5), y2 = R.int(-5, 5);
      if (!x1 && !y1 || !x2 && !y2) return null;
      return q4('a(' + x1 + ' ; ' + y1 + ') + b(' + x2 + ' ; ' + y2 + ') = ?', '(' + (x1 + x2) + ' ; ' + (y1 + y2) + ')', ['(' + (x1 - x2) + ' ; ' + (y1 - y2) + ')', '(' + (x2 - x1) + ' ; ' + (y2 - y1) + ')', '(' + (x1 + x2) + ' ; ' + (y1 - y2) + ')', '(' + (x1 * x2) + ' ; ' + (y1 * y2) + ')']);
    },
    vecDot: function () {
      var x1 = R.int(1, 6), y1 = R.int(1, 6), x2 = R.int(1, 6), y2 = R.int(1, 6);
      var s = x1 * x2 + y1 * y2;
      return q4('a(' + x1 + ' ; ' + y1 + '), b(' + x2 + ' ; ' + y2 + '). Skalyar ko\'paytma a·b = ?', s, [x1 * x2 - y1 * y2, x1 + y1 + x2 + y2, (x1 + x2) * (y1 + y2), s + 1]);
    },
    coordDist: function () {
      var t = R.pick(TRIPLES);
      var x1 = R.int(0, 8), y1 = R.int(0, 8);
      return q4('A(' + x1 + ' ; ' + y1 + ') va B(' + (x1 + t[0]) + ' ; ' + (y1 + t[1]) + ') orasidagi masofa = ?', t[2], [t[2] + 1, t[0] + t[1], t[2] - 1, t[2] + 2]);
    },
    midpoint: function () {
      var x1 = R.int(0, 10), y1 = R.int(0, 10), dx = R.int(1, 5) * 2, dy = R.int(1, 5) * 2;
      var mx = x1 + dx / 2, my = y1 + dy / 2;
      return q4('A(' + x1 + ' ; ' + y1 + ') va B(' + (x1 + dx) + ' ; ' + (y1 + dy) + ') kesmaning o\'rtasi = ?', '(' + mx + ' ; ' + my + ')', ['(' + (x1 + dx) + ' ; ' + (y1 + dy) + ')', '(' + (mx + 1) + ' ; ' + my + ')', '(' + mx + ' ; ' + (my + 1) + ')', '(' + (mx + 1) + ' ; ' + (my - 1) + ')']);
    },
    rtgAngles: function () {
      var a = R.int(20, 70);
      return q4('To\'g\'ri burchakli uchburchakda bir katetga qarshi burchak ' + a + '°. Ikkinchi o\'tkir burchak = ?', (90 - a) + '°', [(180 - a) + '°', (90 - a + 10) + '°', (90 - a - 10) + '°', a + '°']);
    },
    regPer: function () {
      var a = R.int(2, 12), n = R.pick([3, 4, 5, 6]);
      var names = { 3: 'uchburchak', 4: 'kvadrat', 5: 'beshburchak', 6: 'oltiburchak' };
      return q4('Muntazam ' + names[n] + ' tomoni ' + a + ' sm. Perimetri = ?', a * n, [a * n + a, a * n - a, a * (n + 1) / 2, a * n + 2]);
    }
  };

  /* ============ 10-SINF GEOMETRIYA (stereometriya) ============ */
  var T10G = {
    cubeV: function () {
      var a = R.int(2, 9);
      return q4('Kub tomoni ' + a + ' sm. Hajmi V (sm³) = ?', a * a * a, [6 * a * a, a * a, 2 * a * a * a, 3 * a]);
    },
    cubeS: function () {
      var a = R.int(2, 9);
      return q4('Kub tomoni ' + a + ' sm. To\'liq yuza S = ?', 6 * a * a, [a * a, 4 * a * a, 6 * a, 2 * a * a]);
    },
    cuboidV: function () {
      var a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 9);
      return q4('Tik parallelippipeded o\'lchamlari ' + a + ', ' + b + ' va ' + c + ' sm. V = ?', a * b * c, [2 * a * b * c, a * b + c, (a + b) * c, a * b * c + c]);
    },
    cylV: function () {
      var r = R.int(2, 6), h = R.int(2, 8);
      return q4('Silindr radiusi ' + r + ' sm, balandligi ' + h + ' sm. V = ?', r * r * h + 'π', [2 * r * h + 'π', 2 * r * r * h + 'π', r * h + 'π', r * r + 'π']);
    },
    coneV: function () {
      var r = R.int(1, 3) * 3, h = R.int(2, 8);
      var v = r * r * h / 3;
      return q4('Kon radiusi ' + r + ' sm, balandligi ' + h + ' sm. V = ?', v + 'π', [r * r * h + 'π', 2 * v + 'π', r * h + 'π', (v + 1) + 'π']);
    },
    sphereV: function () {
      var r = R.int(1, 4) * 3;
      var v = 4 * r * r * r / 3;
      return q4('Shar radiusi ' + r + ' sm. V = ?', v + 'π', [4 * r * r + 'π', 4 * r * r * r + 'π', v / 2 + 'π', r * r * r + 'π']);
    },
    cylSA: function () {
      var r = R.int(2, 5), h = R.int(2, 8);
      var s = 2 * r * r + 2 * r * h;
      return q4('Silindr to\'liq yuzasi (r = ' + r + ', h = ' + h + ') = ?', s + 'π', [2 * r * r + 'π', 2 * r * h + 'π', r * r * h + 'π', (s + 2) + 'π']);
    },
    pyramidV: function () {
      var aa = R.int(1, 3) * 3, h = R.int(3, 9);
      var v = aa * aa * h / 3;
      return q4('Piramida asosi tomoni ' + aa + ' sm kvadrat, balandligi ' + h + ' sm. V = ?', v, [aa * aa * h, 2 * v, aa * h, v + h]);
    },
    spaceDist: function () {
      var t = R.pick([[3, 4, 12], [6, 8, 12], [9, 12, 12], [8, 15, 36], [5, 12, 12]]);
      var d = Math.round(Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]));
      var x1 = R.int(0, 5), y1 = R.int(0, 5), z1 = R.int(0, 5);
      return q4('A(' + x1 + ' ; ' + y1 + ' ; ' + z1 + '), B(' + (x1 + t[0]) + ' ; ' + (y1 + t[1]) + ' ; ' + (z1 + t[2]) + '). AB masofa = ?', d, [d + 1, t[0] + t[1] + t[2], d - 1, t[2]]);
    },
    cubeDiag: function () {
      var a = R.int(2, 9);
      return q4('Kub tomoni ' + a + ' sm. Fazoviy (katta) diagonali = ?', a + '√3', [a + '√2', String(2 * a), String(3 * a), (a + 1) + '√3']);
    }
  };

  /* ============ NAZARIYA SAVOLLARI (statik baza) ============ */
  var TH_A8 = [
    ['a⁵ · a³ = ?', 'a⁸', ['a¹⁵', 'a²', '3a⁸']],
    ['Qaysi ifoda kvadrat tenglama?', '2x² − 5x + 1 = 0', ['3x + 5 = 0', 'x³ − x = 0', '2/x = 5']],
    ['Viet formulasi bo\'yicha x² + px + q = 0 ning ildizlari ko\'paytmasi = ?', 'q', ['p', '−p', '−q']],
    ['√(a·b) = ? (a, b ≥ 0)', '√a · √b', ['√a + √b', '√(a+b)', '√a / √b']],
    ['Qaysi tenglama kvadrat tenglama?', 'x² = 9', ['x² + x³ = 1', '2x + 1 = 0', 'x² : x = 3']],
    ['y = kx + b funksiya grafigi?', 'to\'g\'ri chiziq', ['parabola', 'giperbola', 'aylana']],
    ['aᵐ : aⁿ = ?', 'a^(m−n)', ['a^(m+n)', 'a^(mn)', 'a^m · a^n']],
    ['y = x² funksiya grafigi qanday chiziqlar?', 'parabola', ['to\'g\'ri chiziq', 'giperbola', 'uchburchak']],
    ['Kasr ifoda ta\'rifida maxraj nima bo\'lmasligi kerak?', '0 ga', ['1 ga', 'manfiy songa', 'juft songa']],
    ['x² = 4 tenglama yechimlari qaysi to\'plamga tegishli?', 'butun sonlar', ['faqat musbat tabiiy', 'faqat kasr', 'faqat irratsional']]
  ];
  var TH_G8 = [
    ['O\'xshash uchburchaklar mos tomonlari nisbati qanday?', 'teng', ['yig\'indisi teng', 'ko\'paytmasi teng', 'doimiy 1:1']],
    ['Trapeziya qanday to\'rtburchak?', 'ikki tomoni parallel', ['barcha tomonlari teng', 'barcha burchaklari to\'g\'ri', 'uch tomoni teng']],
    ['Markaziy burchak o\'lchami unga tayanadigan yoyga nisbatan?', 'teng', ['2 baravar katta', '2 baravar kichik', 'yarimdan katta']],
    ['Romb diagonallari bir-biriga qanday?', 'perpendikulyar', ['parallel', 'doimiy teng', '30° burchak hosil qiladi']],
    ['Uchburchaklar kongruentlik 1-belgisi?', 'ikki tomon va ular orasidagi burchak', ['uch tomon', 'uch burchak', 'gipotenuza va katet']],
    ['Parallelogram qarshidagi tomonlari?', 'teng va parallel', ['faqat teng', 'faqat parallel', 'perpendikulyar']],
    ['Uchburchakning eng katta tomoni qaysi burchakka qarshi?', 'eng katta burchakka', ['eng kichik burchakka', 'har qandayiga', 'to\'g\'ri burchakka']],
    ['To\'rtburchak ichki burchaklari yig\'indisi?', '360°', ['180°', '90°', '270°']],
    ['Balandliklar, bissektrisalar va medianalar qayerda kesishadi?', 'bir nuqtada', ['kesishmaydi', 'faqat tashqarida', 'har birida alohida nuqtalarda']],
    ['Aylana radiusi va diametri orasidagi bog\'liqlik?', 'd = 2r', ['r = 2d', 'd = r/2', 'd = r²']]
  ];
  var TH_A9 = [
    ['Arifmetik progressiyada qoshma doim bir xil bo\'lgan kattalik?', 'farq (d)', ['nisbat (q)', 'yig\'indi', 'ko\'paytma']],
    ['Geometrik progressiyada qoshma doim bir xil bo\'lgan kattalik?', 'nisbat (q)', ['farq (d)', 'yig\'indi', 'ayirma']],
    ['log₂ 8 = ?', '3', ['2', '4', '8']],
    ['log_a 1 = ? (a > 0, a ≠ 1)', '0', ['1', 'a', '∞']],
    ['y = 2^x funksiya qanday?', 'o\'suvchi', ['kamayuvchi', 'davriy', 'doimiy']],
    ['log_a(x·y) = ?', 'log_a x + log_a y', ['log_a x · log_a y', 'log_a x − log_a y', 'log_a x · y']],
    ['Arifmetik progressiya Sₙ formulasi?', 'n/2 · (a₁ + aₙ)', ['n · a₁ · d', 'a₁ + d · n', 'n · (a₁ − aₙ)']],
    ['y = sin x funksiya davri?', '2π', ['π', '4π', '1']],
    ['tg x qaysi holda aniqlanmaydi?', 'cos x = 0 da', ['sin x = 0 da', 'x = 0 da', 'sin x = 1 da']],
    ['Geometrik progressiyada a_n = a₁ · q^(n−1) formulasidagi q — nima?', 'oldiruvchi', ['farq', 'yig\'indi', 'hadlar soni']]
  ];
  var TH_G9 = [
    ['Ikkala vektor bir to\'g\'ri chiziq bo\'ylab yotsa, ular...', 'kollinear', ['perpendikulyar', 'ortogonal', 'eksponensial']],
    ['a + b + (−a) = ?', 'b', ['0', 'a', 'b − a']],
    ['To\'g\'ri burchakli uchburchakda sin A = ?', 'qarshi katet / gipotenuza', ['yondosh katet / gipotenuza', 'qarshi katet / yondosh katet', 'gipotenuza / qarshi katet']],
    ['cos A = ? (to\'g\'ri burchakli uchburchakda)', 'yondosh katet / gipotenuza', ['qarshi katet / gipotenuza', 'gipotenuza / yondosh katet', 'yondosh / qarshi']],
    ['Uzunligi 0 bo\'lgan vektor nima deyiladi?', 'nol vektor', ['birlik vektor', 'bo\'sh vektor', 'mavjud emas']],
    ['a·b = 0 (a, b nol emas) bo\'lsa, vektorlar...', 'perpendikulyar', ['kollinear', 'doimiy teng', 'yig\'indisi nol']],
    ['1 gradus radian bilan?', 'π/180', ['180/π', 'π/90', '1/180']],
    ['Muntazam oltiburchak ichki burchagi?', '120°', ['60°', '90°', '135°']],
    ['To\'g\'ri burchakli uchburchakda sin²A + cos²A = ?', '1', ['0', '2', 'tg²A']],
    ['Ikki nuqta orasidagi eng qisqa masofa qaysi yo\'nalishda?', 'to\'g\'ri chiziq bo\'ylab', ['yoy bo\'ylab', 'singula bo\'ylab', 'spiral bo\'ylab']]
  ];
  var TH_A10 = [
    ['y = sin x qiymatlar oralig\'i?', '[−1 ; 1]', ['(0 ; 1)', '[0 ; ∞)', '(−∞ ; ∞)']],
    ['log_a x ta\'rif sohasi (a > 0, a ≠ 1)?', '(0 ; ∞)', ['(−∞ ; ∞)', '[0 ; ∞)', '(−∞ ; 0)']],
    ['y = a^x (a > 0, a ≠ 1) qiymatlar to\'plami?', '(0 ; ∞)', ['(−∞ ; ∞)', '[0 ; ∞)', '(−∞ ; 0)']],
    ['y = cos x eng katta qiymati?', '1', ['0', 'π', '2']],
    ['sin(π/2) = ?', '1', ['0', '1/2', '√2/2']],
    ['tg x = 0 bo\'ladigan eng kichik musbat x?', 'π', ['π/2', '0', 'π/4']],
    ['y = 2 sin x funksiya davri?', '2π', ['π', '4π', '1']],
    ['2^x > 1 tengsizlik yechimi?', 'x > 0', ['x < 0', 'x > 1', 'x < 1']],
    ['log₂ 4 + log₂ 2 = ?', '3', ['2', '6', '8']],
    ['y = √x ta\'rif sohasi?', '[0 ; ∞)', ['(0 ; ∞)', '(−∞ ; ∞)', '(−∞ ; 0]']]
  ];
  var TH_G10 = [
    ['Kubning burchaklari soni?', '8', ['6', '12', '20']],
    ['Silindr to\'liq yuzasi formulasi?', '2πr(r + h)', ['πr²h', '2πrh', 'πr(r + h)']],
    ['Kon hajmi formulasi?', '(1/3)·πr²h', ['πr²h', '(1/2)·πr²h', 'πr²h²']],
    ['Shar yuzi formulasi?', '4πr²', ['πr²', '2πr²', '(4/3)πr³']],
    ['Piramida hajmi formulasi?', '(1/3)·S_asos·h', ['S_asos·h', '(1/2)·S_asos·h', 'S_asos·h²/3']],
    ['Kub qirralari soni?', '12', ['8', '6', '24']],
    ['Silindr generatasi nima bilan teng?', 'balandlik bilan', ['radius bilan', 'diametr bilan', 'yarim aylanaga']],
    ['Shar hajmi formulasi?', '(4/3)·πr³', ['πr³', '(1/3)·πr³', '4πr³']],
    ['Muntazam piramida — nima?', 'asosi muntazam ko\'pburchak, balandligi markazdan tushadi', ['asosi kvadrat bo\'lishi shart', 'barcha yon qirralari har doim teng', 'balandligi qirradan tushadi']],
    ['Prizma nima?', 'asoslari o\'xshash ko\'pburchakli, yon yuvalmaslari parallel to\'rtburchakli', ['faqat uch asosli jismlar', 'faqat kvadrat asosli', 'aylanali jismlar']]
  ];

  function arr(O) { return Object.keys(O).map(function (k) { return O[k]; }); }
  var GEN = {
    'matematika:5': { title: '🔢 Matematika (5-sinf)', time: 20, types: arr(T5), theory: null },
    'matematika:6': { title: '🔢 Matematika (6-sinf)', time: 25, types: arr(T6), theory: null },
    'matematika:7': { title: '🔢 Matematika (7-sinf)', time: 30, types: arr(T7), theory: null },
    'algebra:8': { title: '➗ Algebra (8-sinf)', time: 30, types: arr(T8A), theory: TH_A8 },
    'algebra:9': { title: '➗ Algebra (9-sinf)', time: 35, types: arr(T9A), theory: TH_A9 },
    'algebra:10': { title: '➗ Algebra (10-sinf)', time: 40, types: arr(T10A), theory: TH_A10 },
    'geometriya:8': { title: '📐 Geometriya (8-sinf)', time: 30, types: arr(T8G), theory: TH_G8 },
    'geometriya:9': { title: '📐 Geometriya (9-sinf)', time: 35, types: arr(T9G), theory: TH_G9 },
    'geometriya:10': { title: '📐 Geometriya (10-sinf)', time: 40, types: arr(T10G), theory: TH_G10 }
  };

  // === TILLAR BANKI (statik, 50 savol/sinf maqsad) ===
  // format: [savol, to'g'ri, noto'g'ri1, noto'g'ri2, noto'g'ri3]
  // 10+ savol bo'lganda karta avtomatik aktiv bo'ladi.
  var LANG_BANK = {
    'ona-tili': {5: [["O'zbek alifbosida jami nechta harf bor?","32 ta","28 ta","30 ta","35 ta"],["O'zbek alifbosidagi undosh harflar soni nechta?","8 ta","5 ta","6 ta","10 ta"],["Quyidagi so'zlarning qaysisida \"sh\" ovozini ifodalaydigan shart mavjud?","yosh","yo'l","yod","yoz"],["\"sh\" ovozi qaysi harflar qo'shmasidan hosil bo'ladi?","s va h","s va x","sh va h","h va j"],["Quyidagi so'zlarning qays biri to'g'ri yozilgan?","o'quv","oquv","o'qulov","o'quvv"],["\"Kitob\" so'zida nechta bo'g'in bor?","2 ta","1 ta","3 ta","4 ta"],["«Maktab» so'zida nechta bo'g'in bor?","2 ta","1 ta","3 ta","4 ta"],["«O'tkaz» kabi so'zda «o'» qanday talaffuz qilinadi?","alohida ovoz sifatida","o va t bir ovoz","butunlay talaffuz qilinmaydi","faqat o talaffuz qilinadi"],["Quyidagi so'zlarning qaysi biri OT (narsa ismini bildiruvchi) hisoblanadi?","qalam","yozmoq","katta","tez"],["Quyidagi so'zlarning qaysi biri FE'L (harakat ismini bildiruvchi) hisoblanadi?","yurmoq","uy","chiroyli","baland"],["Quyidagi so'zlarning qaysi biri SIFAT (belsizini bildiruvchi) hisoblanadi?","katta","olish","kitob","uying"],["Quyidagi so'zlarning qaysi biri SHART?","u","bola","keldi","go'zal"],["\"Kun tushdi.\" — bu qanday gap?","xabar gap","savol gap","buyruq gap","ta'kid gap"],["\"Kitobni olib kel!\" — bu qanday gap?","buyruq gap","xabar gap","savol gap","iltifot gap"],["\"Senga qachon borasan?\" — bu qanday gap?","savol gap","xabar gap","buyruq gap","holes gap"],["Quyidagi gaplarning qaysi biri savol gap?","Darsga tayyormisan?","Dars juda qiziqarlik edi.","Ertaga imtihon.","Maktabga tez yur."],["Savol gaplarning oxiriga qaysi tinish belgisi qo'yiladi?","savol belgisi (?)","nuqta (.)","uch nuqta (...)","qichqich belgisi (!)"],["Xabar gapning oxiriga odatda qaysi tinish belgisi qo'yiladi?","nuqta (.)","savol belgisi (?)","uch nuqta (...)","vergul (,)"],["Buyruq gapning oxiriga qaysi tinish belgisi qo'yilishi mumkin?","qichqich belgisi (!) yoki nuqta","savol belgisi (?)","uch nuqta (...)","qavs ()"],["\"Bola kitob o'qidi.\" gapida \"kitob\" qanday a'zo?","to'ldirma","bosh","hol","kiritma"],["\"Bola kitob o'qidi.\" gapida \"bola\" qanday a'zo?","kiritma","bosh","to'ldirma","hol"],["\"Bola kitob o'qidi.\" gapida \"o'qidi\" qanday a'zo?","bosh","kiritma","to'ldirma","hol"],["\"Qizcha maktabga yurdi.\" gapida qancha ta soz bor?","3 ta","2 ta","4 ta","5 ta"],["\"Go'zal\" so'zining qarama-qarshisi (antonimi) qaysi?","yomon","chiroyli","afsonaviy","yaxshi"],["\"Katta\" so'zining sinonimi (yaqin ma'no) qaysi?","ulkan","kichik","mayda","past"],["\"Tez\" so'zining qarama-qarshisi qaysi?","sekin","chop etib","yurib","quchib"],["\"Sovuq\" so'zining sinonimi qaysi?","muho","issiq","iliq","harorat"],["Quyidagi so'zlarning qaysi biri boshqalardan ma'nosiga xira?","quyon","buloq","tog'","daraxt"],["\"Uy\" so'zining ko'p shakli qaysi?","uylar","uylan","uylarlar","uygan"],["\"Qalam\" so'zining ko'p shakli qaysi?","qalamlar","qamlam","qalamli","qamlar"],["So'zning biror shaklida \"-ga\" qo'shimchasi qo'shilsa, bu qanday hol?","qarash (qayerga)","ishlash (qanday)","bo'lish (qaysi)","olish (kimdan)"],["\"Maktaga\" so'zidagi \"-ga\" qanday qo'shimcha?","qarash qo'shimchasi","ega qo'shimchasi","ish qo'shimchasi","tashkil qo'shimchasi"],["Quyidagi gaplarning qaysi birida vergul qo'yilishi kerak?","Ota, kitobni olib kel.","Ota kitob o'qidi.","Mening kitobim yangi.","Bola maktabga yurdi."],["Murojaat (qarab gap aytilgan so'z) nega vergul bilan ajratiladi?","gapdagi ma'no uzilishini bildirishi uchun","gapni ozroq qilib qo'yish uchun","so'zni kuchaytirish uchun","tinishni belgilash uchun"],["\"Bugun qanday kun?\" gapida asosiy ma'no nimani bildiradi?","savoqni bildiradi","buyruqni bildiradi","ma'lumotni bildiradi","holesni bildiradi"],["Quyidagi so'zlarning qaysi biri so'z turchiga ko'ra boshqalardan xira?","keldi","kitob","qiz","maktab"],["\"Kitob\" va \"daftar\" so'zlari o'zaro qanday munosabatda?","ma'nosiga yaqin (sinonim)","ma'nosiga xira (antonim)","bir xil so'z","biror so'z"],["Quyidagi so'zlar juftligidan qaysi biri antonim?","issiq — sovuq","binafsha — pushti","tez — darhol","katta — ulkan"],["Gapning kiritma, bosh va to'ldirmasidan tashqari qancha muhim a'zosi bo'ladi?","hol (va ikkinchi hol)","faqat bosh","biror a'zo","tushunarli a'zo"],["\"Bola qizil kitobni o'qidi.\" gapida \"qizil\" qanday a'zo?","ikkinchi hol (ta'rif)","kiritma","bosh","to'ldirma"],["Quyidagi so'zlarning qaysi biri fe'lning o'tgan zamon shakli?","yurdi","yurmoq","yurib","yurish"],["\"U ertaga boradi.\" gapidagi \"boradi\" qaysi zamonda?","kelajak zamoni","o'tgan zamoni","hozirgi zamoni","buyruq zamoni"],["So'zning ma'nosini aniqlash uchun eng ishonchli manba qaysi?","so'zlug'","davrga o'xshash","kitobning og'irligi","so'z rangi"],["Quyidagi iboraning qaysi biri ma'nosiga chog'li (ibora)?","o'lgi qo'yish","kitob o'qish","uyga kirish","yo'l yurish"],["\"Ko'zgu o'ynash\" iborasi nimani anglatadi?","o'ziga chog'li narsa bilan shug'ullanish","ko'zgunga qarash","soch tarash","oyona tozalash"],["Matnda birlamchi ma'lumotni beruvchi qism qanday deyiladi?","muqaddima (boshlang'ich qism)","xulosa","sarlavha","ism"],["Quyidagi gaplarning qaysi biri aniq va to'g'ri yozilgan?","Biz ertaga sayrga boramiz.","Biz ertaga sayrga bora olmadi.","Biz ertaga sayrga bormading.","Biz ertaga sayrga bormoq."],["O'zbek tili qaysi tillar oilasiga kiradi?","turkiy tillar oilasi","slovyan tillari oilasi","hind avropa tillari oilasi","mo'jor tillari oilasi"],["Har bir so'zning ma'nosini ifodalaydigan eng kichik tili birlik qanday deyiladi?","so'z","harf","bo'g'in","gap"],["Quyidagi ifodalarning qaysi biri ortiqcha takrorlanish uchun tuzilgan?","juda katta va juda ulkan","katta-ulkan","katta","ulkan"]], 6: [["Ma'nosi bir xil yoki yaqin bo'lgan so'zlar qanday deyiladi?","sinonim","antonim","omonim","ibora"],["Ma'nosi qarama-qarshi bo'lgan so'zlar qanday ataladi?","antonim","sinonim","omonim","tashkil"],["Talaffuzi bir xil, lekin ma'nosi farq qiladigan so'zlar qanday deyiladi?","omonim","sinonim","antonim","ibora"],["Quyidagi so'zlar juftligidan qaysi biri sinonim misol?","chiroyli - go'zal","katta - kichik","issiq - sovuq","yangi - eski"],["Quyidagi so'zlar juftligidan qaysi biri antonim misol?","tezkor - sekin","kuchli - qudratli","baxtli - omadli","serob - ho'ppur"],["Quyidagi so'zlar juftligidan qaysi biri omonim misol?","tuz (ovqat) - tuz (qonun)","tuz - tuzlik","dovul - dovulpanja","tuz - tuzlama"],["«Qalam» so'zining bevosita (asosiy) ma'nosi qaysi?","yozish uchun mo'ljallangan asbob","yozuvchi odam","she'riy asar","uch qanotli qush"],["«U qalam tushurdi» iborasida «qalam» qanday ma'noda ishlatilgan?","vosita (indirekt) ma'noda","bevosita ma'noda","antonim ma'noda","omonim ma'noda"],["«Bosh olish» iborasida «bosh» so'zi qanday ma'noda?","vosita ma'noda","bevosita ma'noda","biror ma'noda","so'z lug'atiga mos ma'noda"],["Bir necha so'zdan iborat, lekin ma'nosi aniq bir tushunchani bildiruvchi so'z majmuyi qanday deyiladi?","ibora","so'z","bo'g'in","qo'shimcha"],["«O'lgi qo'yish» iborasi nimani anglatadi?","boshqalarga namuna bo'lish","qo'lga biror narsa olish","maktaga kirish","o'lgunga salomlashish"],["«Tili chiqdi» iborasi nimani anglatadi?","sirini ochib yubordi","tiliga biror narsa tekkani","so'zlashni boshladi","sog'ayib ketdi"],["Gapning uchta asosiy a'zosi qaysilar?","kiritma, bosh, to'ldirma","kiritma, hol, tinish","bosh, qo'shimcha, so'z","murojaat, hol, bosh"],["Kiritma gapda nimani bildiradi?","kim yoki nima haqida gap ketayotganini","harakat qanday o'tganini","harakatning o'zini","kimga gap aytilayotganini"],["Hol gapda harakatning qanday o'tishini bildiradi?","qayerda, qachonda, qanday","kim yuritganini","nima haqidini","qachon tugaganini"],["Vergulning asosiy vazifasi nima?","gapdagi ma'no uzilishini ajratish","gapni to'xtatish","so'zni uzitish","matnni bog'lash"],["Qo'shma gap qanday tuzilgan?","ikki yoki undan ortiq oddiy gaplar biriktirilib","bir oddiy gapdan","faqat hol a'zosi bilan","murojaat orqali"],["Qo'shma gapda nechta mustaqil bosh bo'ladi?","ikkita yoki undan ortiq","faqat bitta","uchta","turtta"],["Murakkab gap qanday tuziladi?","asosiy va biriktirma gaplar birikishi bilan","faqat biriktirma gaplar","ikki murojaat bilan","faqat buyruq gaplar"],["Narsa ismini bildiruvchi so'z turkumi qaysi?","ot","fe'l","sifat","zaraf"],["Harakat-ishtirok ismini bildiruvchi so'z turkumi qaysi?","fe'l","ot","sifat","shart"],["Belgi-xususiyat ismini bildiruvchi so'z turkumi qandsi?","sifat","ot","fe'l","son"],["Sonni bildiruvchi so'z turkumi qaysi?","son","ot","zaraf","shart"],["«Qalamlar» so'zidagi «-lar» qanday qo'shimcha?","ko'plik qo'shimchasi","ega qo'shimchasi","hol qo'shimchasi","zamon qo'shimchasi"],["«Ular keldi» gapidagi «ular» qaysi so'z turkumiga kiradi?","shart","ot","fe'l","son"],["«Bugun» so'zi gapda asosan nimani bildiradi?","vaqt","joy","son","belgi"],["«Kitobni» so'zi qaysi holga kelgan?","jumlasiga (kimni-nimanı)","joyiga (qayerda)","sifatiga (qanday)","ega holiga (kimning)"],["«Uyda» so'zi qaysi holga kelgan?","joy holiga (qayerda)","jumla holiga","sifat holiga","vaqt holiga"],["«Ota, keling!» gapidagi «ota» qanday a'zo?","murojaat","kiritma","bosh","hol"],["«Mening kunim» matni qaysi matn turi?","hikoya (bayan)","tushuntirish","tanqidiy matn","reklama"],["Biror narsani batafsil izohlaydigan matn qanday deyiladi?","tushuntirish (izoh) matni","hikoya matni","diplomatiyaviy matn","reklama matni"],["Matnni tashkil etuvchi uch qism qaysilar?","muqaddima, asosiy qism, xulosa","sarlavha, hamma, oxir","birinchi, ikkinchi, uchinchi","bosh, ortasi, tinish"],["Matning asosiy g'oyasi qanday ataladi?","mavzu","sarlavha","muallif","xulosa"],["«Mavzu» nima?","matnda eng muhim o'rin egallaydigan tushuncha","matnning boshidagi so'z","muallifning ismi","matnning oxirgi satr"],["«Ob-havo sovuq ekan!» — bu qanday gap?","holes gap","savol gap","buyruq gap","murojaat gap"],["«Juda» so'zi qaysi so'z turkumiga kiradi?","zaraf","ot","fe'l","shart"],["Zaraf gapda harakatning qanday o'tishini bildiradi?","qanday, qanchalik, qachonda","kim yuritganini","nima haqidini","kimga aytilishini"],["Yurish-harakat fe'llari orasida qaysi biri misol?","o'tmoq","bo'lmoq","turmoq","turganmoq"],["«Yurib keldi» iborasida asosiy fe'l qaysi?","keldi","yurib","yurish","kelmoq"],["Yordamchi (ko'makchi) fe'llar nima uchun kerak?","zamonlar tuzilishida","murojaat qilishda","so'zlashda","ishoralar qilishda"],["«Bo'lmoq» fe'li qaysi toifaga kiradi?","yordamchi fe'l","asosiy fe'l","yurish fe'li","hol fe'li"],["Shart qaysi so'z turkumining o'rnini bosadi?","otning","fe'lning","sifatning","zarafning"],["Ega qo'shimchasi nima?","narsaning kimga tegishli ekanini bildiruvchi qo'shimcha","ko'plikni bildiruvchi qo'shimcha","zamon bildiruvchi qo'shimcha","hol bildiruvchi qo'shimcha"],["«Mening kitobim» iborasidagi ega qo'shimchasi qaysi?","-im","-ning","-ga","-da"],["Murojaat qachon ishlatiladi?","to'g'ridan-to'g'ri kimdirga gap aytilganda","matnni tugatganda","sanab o'tganda","solishtirganda"],["Matnning sarlavhasi nima?","matnning asosiy ma'nosini qisqa ifodalovchi so'z yoki ibora","muallifning ismi","matnning sahifa raqami","matndagi birinchi gap"],["«Yurak» so'zining bevosita ma'nosi qaysi?","qon aylanish organi","quvvat","jasorat","xotira"],["«Yurak yetishmovchiligi» iborasida «yurak» qanday ma'noda?","bevosita ma'noda","vosita ma'noda","antonim ma'noda","omonim ma'noda"],["«Oy» so'zining nechta farqli ma'nosi bor?","bir nechta (oy, yuz, yorug'lik manbai)","faqat bitta","faqat ikkita","hech qanday"],["Quyidagi so'zlarning qaysi biri fe'lning buyruq shakli?","o'q!","o'qdi","o'qmoq","o'qdiq"],["«Qachon» so'zi gapda nimani bildiradi?","vaqt","joy","sabab","natija"],["«Nima uchun» so'zi gapda nimani so'raydi?","sabab","joy","vaqt","natija"],["«Bu qiz chiroyli kitob o'qidi.» gapida «chiroyli» qaysi a'zo?","ikkinchi hol (ta'rif)","kiritma","asosiy bosh","to'ldirma"]], 7: [["O'zbek tilida nechta asosiy uslub bor?","3 ta","2 ta","4 ta","5 ta"],["Resmiy-xizmat uslubida asosan nimalar yoziladi?","xat, buyurma, taklifnoma","she'riy asarlar","ertaklar","qissalar"],["Ilmiy uslubning asosiy vazifasi nima?","bilim berish, tushuntirish","hashar qildirish","qo'rqitish","o'yin o'tkazish"],["Jamiyat-nashriyot uslubida qanday iboralar ko'p uchraydi?","she'riy vositalar","formal iboralar","statistik jadval","kimyoviy formula"],["She'riy vosita nima?","so'zlarning ifodaliligini kuchaytiruvchi tilda vosita","so'zlarning shaklini o'zgartiruvchi qo'shimcha","gapning oxirgi so'zi","matnning sarlavhasi"],["Tasvir (metafora) qanday vosita?","so'zning boshqa ma'noda, o'xshashlik asosida ishlatilishi","so'zlarni qayta-qayta aytilishi","savolga javob berish usuli","so'zlarni tartib bilan sanashi"],["«Yosh qalam» iborasi qanday she'riy vositaga misol?","tasvir","takror","muhokama","ta'rif"],["Takror qanday she'riy vosita?","bir so'z yoki iborani maqsadli qayta-qayta ishlatish","so'zlarni teskari yozish","gapni to'xtatish","so'zlarni o'chirish"],["Aloqadarlik (gradatsiya) qanday vosita?","so'zlarni kuchayib borish tartibida qator qilib qo'yish","so'zlarni aralashtirib yozish","faqat bir so'z ishlatish","gaplarni qisqartirish"],["Muhokama nima?","savol bering, unga o'zingiz javob bering usuli","so'zlug'dan so'z olish","raqamlar bilan ishlash","xarita chizish"],["Ta'rif nima?","biror narsa haqida qisqa ma'lumot berish","narsani so'ramoq","narsani yashirish","narsani bema'no eslash"],["«Yurakda qotib qoldi» iborasida qanday she'riy vosita bor?","tasvir","takror","aloqadarlik","sanash"],["Gap boshqaruvi nima?","gap a'zolarini bir-biriga bog'lab yuritish qoidalari","gaplarni qisqartirish","so'zlarni o'chirish","matnni bitta gap qilish"],["Gaplar tuzilishiga ko'ra nechta asosiy turda bo'linadi?","oddiy, qo'shma va murakkab","faqat oddiy","faqat murakkab","bitta turda"],["Biriktirma gapni qanday tanish mumkin?","biriktiruvchi so'z orqali bog'langan bir necha gap","faqat bitta so'zdan","faqat murojaat bilan","faqat hol bilan"],["Quyidagilardan qaysi biri biriktiruvchi so'z?","lekin","kirim","hol","murojaat"],["«U yurdi, lekin men qoldim.» — bu qanday gap?","qo'shma gap","oddiy gap","murojaat gap","faqat buyruq"],["«Agar» so'zi bilan boshlangan gap qanday biriktirma?","shartli biriktirma","natijali biriktirma","sababli biriktirma","sifatli biriktirma"],["Otning hol ko'rsatkichlari nima uchun kerak?","otning gapdagi vazifasini bildirish uchun","so'z raqamini bildirish uchun","bo'g'in sonini bildirish uchun","rangini bildirish uchun"],["Fe'lning nechta asosiy zamoni bor?","3 ta (o'tgan, hozirgi, kelajak)","2 ta","4 ta","5 ta"],["«U kitob o'qiydi.» gapidagi «o'qiydi» qaysi zamonda?","hozirgi oddiy zamoni","o'tgan oddiy zamoni","kelajak oddiy zamoni","buyruq zamoni"],["«U kitob o'qigan.» gapidagi «o'qigan» fe'lning qanday shakli?","o'tgan shakl (qatna'd)","kelajak shakli","buyruq shakli","hozirgi shakl"],["«Yurayotgan» so'zi fe'lning qanday shakli?","hozirgi davomli shakl","o'tgan shakl","buyruq shakl","kelajak shakl"],["«Yurib o'tish» nima deyiladi?","fe'l majmui","ot majmui","sifat majmui","son majmui"],["Sifatning nechta ta'lo darajasi bor?","3 ta (oddiy, taqqos, ilojisiz)","2 ta","4 ta","5 ta"],["«Go'zalroq» so'zi sifatning qanday darajasi?","taqqos daraja","oddiy daraja","ilohisiz daraja","buyruq daraja"],["«Eng go'zal» so'zi sifatning qanday darajasi?","ilohisiz daraja","taqqos daraja","oddiy daraja","qatna'd daraja"],["«Bilmoq» so'zi qaysi so'z turkumiga kiradi?","fe'l","ot","sifat","zaraf"],["«Sariq» so'zi qaysi so'z turkumiga kiradi?","sifat","ot","fe'l","son"],["«Uch» so'zi qaysi so'z turkumiga kiradi?","son","ot","fe'l","zaraf"],["Quyidagi so'zlarning qaysi biri to'g'ri yozilgan?","o'rin","orin","orinli","orinni"],["«Qo'shiq» so'zida qaysi shart uchraydi?","sh (s+h)","ch (c+h)","kh (k+x)","gh (g+h)"],["Qator gapda ro'yxat o'qilganda vergul qanday ishlatiladi?","bir xil vazifadagi so'zlar orasida","faqat gap oxirida","faqat birinchi so'zdan keyin","ro'yxatning oxirida"],["«Malaika, binafsha va qizil gullar so'ndi.» gapida «va» dan oldin vergul bormi?","yo'q, «va» oldida vergul qo'yilmaydi","bor, har doim","faqat erta qo'yiladi","faqat kech qo'yiladi"],["Hikoya matnining asosiy qismi nima?","voqeani rivojlantirish","sarlavhani yozish","muallifni nomlash","xulosani berish"],["Matn voqeasi nima?","matnda sodir bo'layotgan hadisa","matnning sarlavhasi","muallifning ismi","matn sahifasi"],["Matn qahramoni nima?","voqea ishtirokchisi bo'lgan shaxs","matnning bosh so'zi","matn oxirgi so'zi","muallif o'zi"],["Qissa nima?","odam haqidagi voqeani rivoy qiluvchi matn","raqamlar jadvali","kimyoviy formula","xarita tavsifi"],["Afsana nima?","mo'jizaviy hodayi rivoy etuvchi xalq asari","ilmiy maqola","resmiy hujjat","reklama matni"],["Masal nima?","qisqa, ulug'vor ma'noni bildiruvchi xalq hikmati","uch qator she'riy asar","resmiy buyurma","ilm maqolasi"],["Qit'a nima?","qisqa she'riy asar","uch qator qissa","resmiy xat","tushuntirish matni"],["Tanqidiy matnda nima ko'rsatiladi?","ishlarni yoki asarlarni ko'rib chiqish, kamsitish bilan birga ustunliklari ham","faqat maqtash","faqat raqamlar","faqat xaritalar"],["«Zilzilasi katta suvda qayiq cho'kdi.» gapida «zilzilasi» qaysi holga kelgan?","ega holiga (kimning)","jumla holiga","joy holiga","sifat holiga"],["«Bu dars juda foydali ekan.» gapida «foydali» qaysi a'zo?","ikkinchi hol (ta'rif)","kiritma","asosiy bosh","to'ldirma"],["«Men erta turib homish qildim.» gapida «erta» qaysi a'zo?","hol","kiritma","to'ldirma","murojaat"],["«Biz maktabda dars o'qitdik.» gapida «maktabda» qaysi hol?","joy holi","jumla holi","vaqt holi","ega holi"],["«Uning so'zi yurakka tegdi.» gapida «uning» qanday so'z?","ega sharti","ot","fe'l","son"],["«Kun tushdi, quyon yashirdi.» gapida «quyon» nima?","ikkinchi gapning kiritmasi","birinchi gapning to'ldirmasi","hol a'zosi","murojaat"],["«Agar yomg'ir yog'masa, sayrga chiqamiz.» gapining asosiy qismi qaysi?","sayrga chiqamiz","yomg'ir yog'masa","agar","yomg'ir"],["Gapda «-m» qo'shimchasi qanday vazifa ado etadi?","suhbatdoshga so'zlashni belgilaydi","ko'plikni bildiradi","zamonni bildiradi","holni bildiradi"],["«Kelamiz» so'zidagi «-miz» nima?","ko'plik shakli","ota shakli","hol shakli","zamon shakli"]], 8: [["«Xamsa» asarining muallifi kim?","Alisher Navoiy","Mirzo Shafiiy","Cho'lpon","Abdulla Qodiriy"],["«Xamsa» so'zi nimani anglatadi?","beshta asar","besh qator she'riy asar","bosh so'z","bosh qism"],["«Muhakama ul-lug'atayn» asari qanday asar?","fors va turk tillarini solishtiruvchi ilmiy asar","sehrli ertak","drama","qissa"],["«Muhakama ul-lug'atayn» asari qaysi tilning ustunligini ta'kidlaydi?","turk tili","fors tili","arab tili","mo'jor tili"],["Navoiyning «Bahar nom» asari qaysi masalaga bag'ishlangan?","musiqa va ohang","astronomiya","kimyo","tabbobot"],["Farhod va Shirin haqidagi Navoiy asari qaysi?","«Farhod va Shirin»","«Layli va Majnun»","«Sohibqiron»","«Boburnoma»"],["Navoiy «Xamsasining Layli va Majnun» qismi qanday ataladi?","«Hayrat ul-abror»","«Majolis un-nafis»","«Safinat un-najot»","«Bahor nom»"],["Alisher Navoiy qaysi shaharda tavallud topgan?","Xiva","Samarqand","Buxoro","Toshkent"],["Alisher Navoiy qaysi yillarda yashagan?","1441–1501","1320–1390","1556–1624","1867–1942"],["«Shohnoma» asarining muallifi kim?","Firdovsiy","Navoiy","Nizomiy","Omir Xayyom"],["«Shohnoma» nima haqida asar?","shohlar haqidagi durdona","sehrli o'simliklar","yulduzlar","tenglamalar"],["«Alpomish» qanday asar?","o'zbek qahramonlik durdonasi","fors dastoni","arab masali","rus afsonasi"],["«Xosrov va Shirin» asarining muallifi kim?","G'anjlik Nizomiy","Firdovsiy","Hofiz","Sa'diy"],["Navoiy «Xamsasini» kimga bag'ishlab yozgan?","Nizomiy «Xamsasiga» javoban","Firdovsiga javoban","Sa'diyga javoban","Omir Xayyomga javoban"],["«Ruboiy» qanday she'riy shakl?","to'rt misrali qisqa she'riy shakl","besh qatorli","olti qatorli","yetti qatorli"],["Ruboiylar asosiy muallifi kim deb tanilgan?","Omir Xayyom","Navoiy","Qo'tishog'li","Buxoriy"],["«Divon» nima?","she'riy asarlar to'plami","davlat kitobxoni","ilmiy jurnal","sayohat kitobi"],["«Guliston» asarining muallifi kim?","Sa'diy","Navoiy","Xayyom","Nizomiy"],["«Bostan» asarining muallifi kim?","Sa'diy","Firdovsiy","Hofiz","G'iyosiy"],["«Masnaviyi ma'naviy» asarining muallifi kim?","Jaloliddin Rumi","Navoiy","Sa'diy","Omir Xayyom"],["Bayt nima?","ikki misradan iborat she'riy birlik","bitta misradan","uchta misradan","to'rtta misradan"],["Gazalning birinchi bayti qanday ataladi?","matla'","maktaj","qit'a","doboj"],["Gazalning oxirgi bayti, muallif laqabi kiritilgan joy qanday ataladi?","maktaj","matla'","qit'a","qasida"],["Qafiya nima?","she'riy birikmalarning oxirgi ovozlarining bir xil talaffuzi","she'riy ovoz","she'riy shakl","she'riy uslub"],["Radif nima?","qafiya oldida takrorlanuvchi so'z yoki ibora","she'riy oxirgi so'z","she'riy sarlavha","she'riy qism"],["Gazalning qancha baytidan iborat bo'lishi kerak?","kamida besh bayt","kamida uch bayt","kamida yetti bayt","kamida o'n bayt"],["Qasida nima?","maqtov maqsadida yozilgan uzun gazal","to'rt misrali qisqa shakl","ikki qatorli she'riy shakl","sehrli qissa"],["Doboj nima?","xalq she'riyatining to'rt misrali shakli","uch qatorli she'riy shakl","besh qatorli shakl","resmiy xat"],["Darslikda qaysi uslub ko'p ishlatiladi?","ilmiy uslub","resmiy-uslub","sehrli uslub","o'yin uslub"],["Sahifalarda (gazetalarda) qaysi uslub ko'p ishlatiladi?","jamoyat-nashriyot uslub","ilmiy uslub","resmiy uslub","drama uslub"],["Resmiy-uslub matnlarda tilda qanday iboralar ishlatiladi?","rasmiy, qattiq iboralar","she'riy iboralar","o'yin iboralar","taniq iboralar"],["«Farhod va Shirin» asarida Farhod nima qiladi?","tog'da tunn qazib, o'z yo'lani topadi","suvda suzadi","yulduzlarni sanaydi","kitob yozadi"],["Matn tahlilida avval nima aniqlanadi?","mavzu va asosiy g'oya","sarlavha rangi","muallif yoshi","sahifa raqami"],["«Layli va Majnun» asarining asosiy mavzusi nima?","mohabbat","savdo","jenga tayyorgarlik","sahyovat"],["Navoiy «Bahar nom» asarida musiqa qanday tavsiflanadi?","ruh va tanani uyg'otuvchi quvvat sifatida","sirtovchi kuch sifatida","raqs kuch sifatida","ovoz kuch sifatida"],["«Safinat un-najot» nima haqida asar?","diniy tarbiya haqida Navoiy asari","astronomiya haqida asar","tashrif haqida asar","savdo haqida asar"],["«Majolis un-nafis» nima haqida asar?","axloq va tarbiya haqida Navoiy asari","harbiy san'at haqida asar","kimyo haqida asar","geografiya haqida asar"],["«Xamsa» qaysi asrning o'rtalarida yozilgan?","XV asr","XIII asr","XVII asr","XIX asr"],["Chog'atoy tili haqida to'g'ri fikr qaysi?","o'rta asr o'zbek tili","muasir rus tili","muasir fors tili","antiq grek tili"],["She'riy vosita «takror» qaysi matnda keng uchraydi?","she'riy va ertak matni","statistik hisobot","kimyoviy formula","xarita tavsifi"],["Navoiy «Xamsasini» necha yilda yaratgan?","taxminan 10 yilda","taxminan 2 yilda","taxminan 30 yilda","taxminan 50 yilda"],["«Qutadg'u bilig» qaysi til asari?","qadimki turkiy tillar asari","qadimki hind","qadimki latviya","qadimki ertak"],["«Qutadg'u bilig»ning mualliflari kimlar?","O'zmoqdod, Tuganbay, O'gdulmysh, Kuntod","Navoiy, Nizomiy, Firdovsiy, Sa'diy","Rumi, Xayyom, Hofiz, Hoshim","Cho'lpon, Qodiriy, Pahlavon, Suleyman Dehlaviy"],["«Boburnoma» nima haqida?","Bobur hayoti haqidagi xotira asar","Bobur harbiy asari","Bobur savdo asari","Bobur musiqa asari"],["«Boburnoma» kim tomonidan yozilgan?","Zahiriddin Muhammad Bobur","Alisher Navoiy","Abdullaxon","Humoyun"],["Navoiyning «Ajanib ut-taʿif» asari nima haqida?","turli davrlardagi mashhur shaxslar haqida","yulduzlar jadvali haqida","matematik teorema haqida","harbiy taktika haqida"],["Nizomiy «Xamsasida» «Layli va Majnun» qismi qanday ataladi?","«Sohibqiron»","«Mehrnoma»","«Tahrimnoma»","«Xamsa»"],["Quyidagi asarlarning qaysi biri Navoiy «Xamsasiga» kirmaydi?","«Boburnoma»","«Farhod va Shirin»","«Safinat un-najot»","«Majolis un-nafos»"],["«Hozon» nima?","humor xarakteridagi toʻrt misrali xalq sheʿris","uzun qahramonlik dostoni","resmiy hujjat","ilmiy risola"],["Omir Xayyam ruboiylarida asosan nima haqida soʻz boradi?","falsafiy oylashuvlar haqida","tenglamalar haqida","xaritalar haqida","kimyoviy reaksiyalar haqida"]], 9: [["«Siyohi siyoh» asarining muallifi kim?","Sulaymon Dehlaviy","Cholpon","Abdulla Qodiriy","S. Ayniy"],["«Siyohi siyoh» o'zbek adabiyotida qanday o'rin egallaydi?","birinchi o'zbek romani","birinchi o'zbek dostoni","birinchi o'zbek ertagi","birinchi o'zbek qissasi"],["«Tun va kun» romanining muallifi kim?","Cholpon","Pahlavon","Qodiriy","Sulaymon Dehlaviy"],["«Tun va kun» romanining asosiy qahramonlari kimlar?","Shohruh va Mavluda","Bobur va Zarifa","Qutlug'murod va Zilola","Boburon va Kamola"],["«Kecha va kunduz» romanining muallifi kim?","Abdulla Qodiriy","Cholpon","Pahlavon","S. Ayniy"],["«Kecha va kunduz» romanining asosiy qahramonlari kimlar?","Bobur va Zarifa","Shohruh va Mavluda","Tolqin va Nilufar","Oqqush va Gulbahor"],["«Oq ova» romanining muallifi kim?","Abdulla Qodiriy","Cholpon","Pahlavon","G'ulom"],["«Oq ova» romanining asosiy qahramonlari kimlar?","Qutlug'murod va Zilola","Bobur va Zarifa","Shohruh va Mavluda","Oqqush va Gulbahor"],["«Oq ova» qaysi tarixiy davr voqealariga bag'ishlangan?","1917-yil inqilobi davriga","Bobur davriga","Sobir davriga","O'rta asrlarga"],["«Tolqinlar» romanining muallifi kim?","Pahlavon","Cholpon","Qodiriy","S. Ayniy"],["«Tolqinlar» romani nima haqida?","yoshlarning hayoti, muhabbati va ijtimoiy hayot haqida","harbiy janglar haqida","kimyo tajribalari haqida","astronomiya haqida"],["«Afrosiyob» romanining muallifi kim?","S. Ayniy","Cholpon","Qodiriy","Pahlavon"],["«Afrosiyob» romani nima haqida?","shoir Afrosiyob hayoti haqidagi tarixiy roman","Bobur hayoti haqida","Navoiy hayoti haqida","Sobir hayoti haqida"],["Cholponning «Kun tutqan tun» asari qanday janrda?","drama","roman","hikoya","doston"],["Pahlavonning «Oqqush» asari qanday janrda?","drama","roman","doston","ruboiy"],["«Yolg'izlik» hikoyalar to'plamining muallifi kim?","Sulaymon Dehlaviy","Cholpon","Qodiriy","G'ulom"],["«Umur oqimi» nima?","Abdulla Qodiriyning xotira asari","Qodiriyning romani","Qodiriyning dramasi","Qodiriyning she'riy asari"],["Jadidlik harakati nima haqida?","ta'limni zamonaviylashtirish harakati","qishloq xo'jaligi harakati","harbiy harakat","sanoat harakati"],["Jadidchilik davrida maktablarda qanday o'qitish joriy etildi?","o'qimchilik","yozuvchilik","she'riyot","drama"],["G'ulomning birinchi she'riy to'plami qaysi?","«Zarafshon»","«Yulduzli tun»","«Sho'rolar»","«Oy shu'lasida»"],["«Kecha va kunduz» romanining asosiy g'oyasi nima?","johillikka qarshi kurash va yoshlarning uyg'onishi","sahroya sayohat","kimyoviy tajriba","harbiy jang"],["«Qizil olov» asarining muallifi kim?","Abdulla Qodiriy","Cholpon","Pahlavon","S. Ayniy"],["S. Ayniyning «Murod» asari qanday janrda?","drama","roman","hikoya","doston"],["«Buloqlar» nima?","S. Ayniyning xotira asari","Ayniyning romani","Ayniyning dramasi","Ayniyning she'riy asari"],["Drama qanday adabiy asar?","dialog shaklida yozilgan asar","monolog shaklida yozilgan asar","faqat she'riy asar","faqat hikoya asar"],["Dramadagi so'zlagan shaxs qanday ataladi?","personaj","muallif","narrator","o'quvchi"],["Dramaning asosiy qismi qanday ataladi?","akt","bob","sahifa","qism"],["Personajning sahnada aytilgan so'zi qanday ataladi?","replika","stix","bayt","misra"],["«Voqea» nima?","asarda sodir bo'lgan hadisalarning tartibi","asarning sarlavhasi","asar muallifining ismi","asar sahifa raqami"],["«G'oya» nima?","asarning asosiy fikri","asarning sarlavhasi","asarning qahramoni","asarning janri"],["Asarning asosiy qahramoni qanday ataladi?","protagonist","antagonist","narrator","personaj"],["Bitta voqea asosida yozilgan kichik hajmli asar qanday ataladi?","hikoya","roman","doston","epos"],["Katta hajmli, ko'p qahramonli asar qanday ataladi?","roman","qit'a","ruboiy","doboj"],["O'rta hajmli, roman bilan hikoya o'rtasidagi janr qaysi?","povest (novella)","qit'a","ruboiy","gazal"],["Bir necha she'riy yoki hikoyaviy asarlardan iborat to'plam qanday ataladi?","to'plam (devon)","bob","sahifa","qism"],["Tanazzar va tasodifli mulohazalardan iborat asar qanday ataladi?","essay","drama","roman","doston"],["«Reportaj» nima?","haqiqiy voqealar asosida yozilgan jurnalistik asar","muloqot asari","she'riy asar","drama"],["«Kecha va kunduz» romani qaysi yilda yozilgan?","1926-yilda","1918-yilda","1932-yilda","1940-yilda"],["«Oq ova» romani qaysi yilda yozilgan?","1928-yilda","1920-yilda","1935-yilda","1942-yilda"],["Sulaymon Dehlaviy qaysi yillarda yashagan?","1867–1942","1801–1870","1901–1932","1914–1997"],["Cholpon qaysi yillarda yashagan?","1901–1932","1894–1938","1902–1935","1867–1942"],["Pahlavon qaysi yillarda yashagan?","1902–1935","1901–1932","1894–1938","1872–1954"],["Abdulla Qodiriy qaysi yillarda yashagan?","1894–1938","1901–1932","1902–1935","1867–1942"],["S. Ayniy qaysi yillarda yashagan?","1872–1954","1894–1938","1867–1942","1914–1997"],["G'ulom qaysi yillarda yashagan?","1914–1997","1894–1938","1901–1932","1872–1954"],["«Tun va kun» romani qaysi mavzuga bag'ishlangan?","ijtimoiy o'zgarishlar davrida yoshlarning taqdiri","harbiy janglar","tashriflar","savdo"],["Quyidagi asarlarning qaysi biri drama?","«Oqqush»","«Oq ova»","«Afrosiyob»","«Buloqlar»"],["«Kun tutqan tun» dramasi qaysi davr hayotiga bag'ishlangan?","jadidlar davri hayotiga","Bobur davri hayotiga","Sobir davri hayotiga","zamonaviy shahar hayotiga"],["Adabiy asar tahlilida «qahramon taqdiri» nimani anglatadi?","qahramonning hayotiy yo'li va o'zgarishlari","qahramonning yoshi","qahramonning rangi","qahramonning ismi"],["Hikoyaviy asarda «tavsif» nima uchun kerak?","qahramon va muhitni ko'rsatish uchun","qahramonni yashirish uchun","voqeani uzish uchun","sahifani to'ldirish uchun"]], 10: [["«Qutb-noma» asarining muallifi kim?","Qo'tishog'li","Chushtepa","Zuhiliy","Qodiriy"],["«Qutb-noma» kim haqida yozilgan asar?","Alisher Navoiy haqida","Bobur haqida","Firdavsiy haqida","Nizomiy haqida"],["Qo'tishog'li qaysi yillarda yashagan?","1846–1912","1841–1925","1867–1942","1894–1938"],["Chushtepa qaysi yillarda yashagan?","1841–1925","1846–1912","1840–1923","1872–1954"],["Qo'tishog'li, Chushtepa, Zuhiliy qaysi asr shoiri?","XIX asr","XV asr","XVIII asr","XX asr"],["«Alpomish» dostonini qayta ishlab, chop etgan adib kim?","Abdulla Qodiriy","Cholpon","Pahlavon","S. Ayniy"],["«Alpomish» qanday asar?","qahramonlik dostoni","she'riy to'plam","drama","hikoya to'plami"],["«Bebek va Shahnoz» dostoni nima haqida?","ikkalik sevgi haqidagi dahshatli voqea","harbiy jang haqida","savdo haqida","astronomiya haqida"],["G'ulom qaysi yil O'zbekiston xalq shoiri unvoni bilan taqdirlandi?","1976-yil","1956-yil","1986-yil","1996-yil"],["Abdulhamid Suleymonning birinchi she'riy to'plami qaysi?","«Ochilgan eshik»","«Zarafshon»","«Odam bo'l»","«Yulduzli tun»"],["Abdulhamid Suleymon qaysi yillarda yashagan?","1912–1955","1914–1997","1901–1932","1902–1935"],["O'zbek adabiyotining XIX asr davri qanday ataladi?","muhitor (zamonaviylashish) davri","qadim davri","o'rta davri","jadid davri"],["«Jadid» davri qaysi davrga to'g'ri keladi?","XX asr boshlari","XV asr oxiiri","XIX asr oxiiri","XX asr oxiiri"],["Firdovsiy qaysi asrlarda yashagan?","X–XI asrlar","XII asr","XIV asr","XVI asr"],["Nizomiy G'anjeviy qaysi asrda yashagan?","XII asr","X asr","XIV asr","XVI asr"],["«Dramaturgiya» so'zi nimani bildiradi?","drama yozish san'ati","she'riyot san'ati","hikoya yozish san'ati","ertak aytish san'ati"],["Dramaning boshidagi kirish qismi qanday ataladi?","prolog","epilog","akt","replika"],["Dramaning oxirgi qismi qanday ataladi?","epilog","prolog","matla'","maktaj"],["Sahna nima?","qo'shma ko'rsatiladigan joy","qo'shma yoziladigan joy","qo'shma saqlanadigan joy","qo'shma o'qiladigan joy"],["«Monolog» nima?","personajning yolg'iz so'zi","ikki personajning suhbatlari","barcha personajlarning suhbatlari","muallifning so'zi"],["«Dialog» nima?","ikki yoki undan ortiq personajlar suhbatlari","yolg'iz personaj so'zi","muallif tafsiri","o'quvchi fikri"],["«Lirik» asar nima?","muallifning ichki dunyosini ifodalovchi asar","voqeani sanab beruvchi asar","rejani tushuntiruvchi asar","jadval asosi bo'lgan asar"],["«Epik» asar nima?","katta hajmli voqea asosi bo'lgan asar","kichik lirik asar","dramatik asar","she'riy to'plam"],["«Lirik qahramon» kim?","she'riy asarda muallifning o'zi (men shakli)","drama personaji","hikoya personaji","o'quvchi"],["«Narrotor» kim?","hikoyaviy asar voqeasini rivoy etuvchi shaxs","drama personaji","she'riy qahramon","o'quvchi"],["«Tavsif» nima?","qahramonning tashqi ko'rinishi va tabiatini ko'rsatish","voqeani sanash","sahifani sanash","sarlavhani yozish"],["«Allegoriya» nima?","ramziy ma'no bildiruvchi she'riy uslub","she'riy shakl","she'riy qism","she'riy ovoz"],["G'ulomning «Yulduzli tun» asari qanday janrda?","drama","roman","hikoya","doston"],["O'zbekiston mustaqillikka erishganidan keyingi adabiyot davri qanday ataladi?","zamonaviy adabiyot","qadimiy adabiyot","o'rta asr adabiyoti","Sovet adabiyoti"],["«Adabiyotshunoslik» nima?","adabiyot haqidagi fan","tarix haqidagi fan","geografiya haqidagi fan","biologiya haqidagi fan"],["«Tahlil» nima?","asarni batafsil ko'rib chiqish","asarni yashirish","asarni o'chirish","asarni saralash"],["«Sharh» nima?","asarni tushuntirib berish","asarni tanqid qilish","asarni tarjima qilish","asarni ko'chirish"],["«Ijodiy uslub» nima?","muallifning shaxsiy ijod xususiyati","o'quvchining uslubi","nashriyot uslubi","maktab uslubi"],["«Realizm» qanday adabiy yo'nalish?","haqiqatni haqiqatga yaqin qilib tasvirlash","sehrli olam tasviri","raqamlar bilan ishlash","xarita tuzish"],["«Romantizm» qanday adabiy yo'nalish?","ideallar va ichki dunyoni uzoqlashtirish","haqiqatni qattiq tasvirlash","tarixiy faktlarni yozish","rejani tuzish"],["«Alpomish» dostoni qaysi yilda birinchi marta bosib chiqarilgan?","1926-yilda","1916-yilda","1936-yilda","1946-yilda"],["«Govharshod» dostoni nima asosida yozilgan?","sevgi haqidagi xalq ertaklari","harbiy voqealar","savdo voqealari","astronomik voqealar"],["Xalq she'riyatidagi «ertak» nima?","bola uchun aytadigan rivoyat asari","resmiy hujjat","ilmiy maqola","sahifa"],["«Qissa» qanday asar?","tarixiy voqealar asosida yozilgan rivoyat","she'riy to'plam","drama","ruboiy"],["«Doston» so'zining asl ma'nosi nima?","rivoyat, aytiluvchi","yozuvchi","tarjimon","o'quvchi"],["Qaysi davr o'zbek adabiyotida «o'rta asr» deb ataladi?","XI–XV asrlar","XVI–XVIII asrlar","XIX–XX asrlar","VI–X asrlar"],["«Shohnoma» asari qaysi tilda yozilgan?","fors tili","arab tili","o'zbek tili","latviya tili"],["Navoiy «Muhakama ul-lug'atayn» da turk tilini qanday ta'riflagan?","go'zal va boy til sifatida","sirtovchi til sifatida","o'chirib qo'yish kerak","faqat diniy til"],["«Xamsa»dagi «Safinat un-najot» nima haqida?","diniy tarbiya va axloq haqida","harbiy san'at haqida","kimyo haqida","geografiya haqida"],["«Hibrat ul-inson» Navoiyning qanday asari?","sevgi va inson haqidagi she'riy asar","harbiy asar","savdo asari","astronomik asar"],["O'zbek xalq adabiyotidagi «masal» qanday shakl?","qisqa, ulug'vor ma'no bildiruvchi xalq hikmati","uch qatorli she'riy asar","resmiy buyurma","ilm maqolasi"],["«Afsana» va «ertak» farqi nima?","afsonada mo'jiza, ertakda bola uchun voqea","farqi yo'q","ertak kattalar uchun","afsona bolalar uchun"],["Asar qahramonining «antagonisti» kim?","asosiy qahramonga qarshi kuch","asosiy qahramon do'sti","muallif o'zi","o'quvchi"],["«Voqea rivoji» asarda nimani bildiradi?","hadisalarning qizishib borishi","sarlavha o'zgarishi","sahifa o'zgarishi","muallif o'zgarishi"],["Adabiyotda «sikl» nima?","bir mavzuga bag'ishlangan asarlar majmuyi","bitta she'riy qism","bitta replika","bitta sahifa"]]},
    'ingliz-tili': {5: [["The first letter of the English alphabet is ___?","A","B","C","D"],["You say ___ when you meet someone in the morning.","Good morning","Good night","Hello","Bye"],["Twenty‑three plus twenty‑seven equals ___?","50","40","60","45"],["My mother's brother is my ___?","uncle","cousin","nephew","father"],["You write with a ___?","pen","book","ruler","eraser"],["The sky on a clear day is ___?","blue","green","red","yellow"],["A ___ says \"meow\".?","cat","dog","cow","bird"],["We eat ___ for breakfast.?","cereal","pizza","steak","soup"],["She ___ a teacher.?","is","am","are","be"],["My name is ___.?","Anna","John","Peter","Sara"],["When you meet a friend, you say ___.","Hello","Goodbye","Please","Thanks"],["The number after 19 is ___.","20","18","21","22"],["My mother's sister is my ___.","Aunt","Uncle","Cousin","Brother"],["You write with a ___.","pen","book","ruler","eraser"],["The sky is usually ___.","blue","green","red","yellow"],["A dog says ___.","woof","meow","quack","moo"],["We eat ___ for breakfast.","cereal","pizza","steak","soup"],["I ___ a student.","am","is","are","be"],["___ your name?","What is","How are","Where do","When is"],["She ___ 10 years old.","is","am","are","be"],["Hello, ___!","Tom","dog","red","five"],["___ soni 25 ga teng.","Yigirma besh","Oltin","Uch","Yashil"],["She ___ a teacher.","is","am","are","be"],["Mening ___ otam.","ota","kitob","yashil","uch"],["I have a ___ in my bag.","pencil","apple","dog","blue"],["Bu ___ rang.","qizil","stol","yuz","uch"],["The ___ says 'meow'.","cat","dog","bird","fish"],["Mening sevimli ___ pizza.","taomi","mashina","kitob","oy"],["What is ___ name?","your","my","his","her"],["Men ___ o'qiyman.","maktabda","yashash","ko'rish","ovqat"],["___ is the first letter of the English alphabet.","A","B","C","D"],["How do you say \"Salom\" in English? ___","Hello","Goodbye","Please","Thanks"],["___ is the number after twenty‑nine.","Thirty","Twenty‑eight","Twenty","Thirty‑one"],["My mother is a ___. (family member)","mother","father","brother","sister"],["You write with a ___. (school item)","pen","book","ruler","bag"],["The sky is ___ today. (color)","blue","green","red","yellow"],["A ___ says \"meow\". (animal)","cat","dog","bird","cow"],["We eat ___ for breakfast. (food)","cereal","pizza","steak","soup"],["___ you a student? (I am / Is / Are)","Are","Is","Am","Be"],["___ is your name? (What / Where / When)","What","Where","When","How"],["___ is my name.","My","Your","His","Their"],["Mening otamning ismi ___.","Ali","Anor","Olma","Kitob"],["How ___ you?","are","is","am","be"],["Maktabda ___ var.","kitob","stul","ovoz","ko'z"],["The number ___ is ten.","10","5","20","15"],["Qizil rang ingliz tilida ___.","red","blue","green","yellow"],["___ is a farm animal.","Cow","Car","Tree","House"],["Non ___.","bread","milk","water","apple"],["I ___ a pencil.","have","has","am","is"],["Sizning yoshingiz nechta?","How old are you?","What is your name?","Where do you live?","What time is it?"],["How many letters are there in the English alphabet?","26","24","28","30"],["The opposite of \"big\" is ___.","small","large","tall","long"]], 6: [["She ___ (play) the piano every day.","plays","play","playing","played"],["They ___ (watch) a movie now.","are watching","watch","is watching","watched"],["I ___ (get up) at 7 a.m.","get up","gets up","got up","getting up"],["He is wearing a ___ because it's cold.","coat","shirt","pants","shorts"],["It ___ (rain) a lot in April.","rains","rain","raining","rained"],["The book is ___ the table.","on","in","at","under"],["She ___ (swim) very well.","can","can't","could","may"],["___ three apples on the kitchen counter.","There are","There is","Here are","Here is"],["‘He goes to school by bus.’ jumlasining to‘g‘ri tarjimasini tanlang:","U avtobus bilan maktabga boradi.","U mashina bilan maktabga boradi.","U piyoda maktabga boradi.","U velosiped bilan maktabga boradi."],["‘It is raining.’ jumlasining to‘g‘ri tarjimasini tanlang:","Yomg‘ir yog‘moqda.","Quyosh chiqmoqda.","Qor yog‘moqda.","Shamol esmoqda."],["U _______ (like) ice cream every day.","likes","like","liked","liking"],["Ular hozir futbol _______ (play).","playing","plays","play","played"],["Men har kuni soat 7da _______ (get up).","get up","gets up","getting up","got up"],["Mening ukam koʻk rangli kofta _______ (blue).","blue","blues","bluer","bluing"],["Bahorda yomg‘ir _______ (rain) ko‘p yog‘adi.","rains","rain","rained","raining"],["Kitob stol _______ (on) joylashgan.","on","in","at","under"],["U juda yaxshi suzadi, chunki u _______ (can) swim.","can","can't","could","may"],["Tovuq bo‘lagida uchta olma _______ (be).","are","is","were","be"],["U kofeni _______ (not/like).","doesn't like","don't like","not likes","didn't like"],["Onam hozir kechki ovqatni _______ (cook) tayyorlayapti.","is cooking","cooks","cooking","was cooking"],["She ___ (play) tennis every Saturday.","plays","play","playing","played"],["I ___ (get up) at 7:00 a.m. every day.","get up","gets up","getting up","got up"],["He is wearing a ___.","blue shirt","blue shoes","blue hat","blue pants"],["It ___ (be) rainy today.","is","are","be","was"],["She ___ swim very well.","can","can't","could","may"],["___ many apples in the basket.","There are","There is","There was","There have"],["I go to school by bus.","Men maktabga avtobus bilan boraman.","Men avtobusda maktabga boraman.","Maktabga men avtobusda boraman.","Men maktabga boraman avtobus."],["Tom ___ (read) a book now.","is reading","reads","read","was reading"],["I ___ (get up) at 7:00 am every day.","get up","gets up","got up","getting up"],["She is wearing a ___ dress.","blue","red","green","yellow"],["It ___ (rain) heavily today.","is raining","rains","rained","rain"],["He ___ (swim) very well.","can swim","can't swim","swims","swim"],["___ many students in the classroom.","There are","There is","There were","There will be"],["Mening otam ___ (go) ishga har kuni.","goes","go","going","went"],["The word \"weather\" means ___ .","ob-havo","kun","oy","yil"],["She ___ (go) to school every day. / U har kuni maktabga ___ (boradi).","goes","go","gone","going"],["They ___ (play) football now. / Ular hozir futbol ___ (o‘ynamoqda).","are playing","play","is playing","playing"],["I ___ (get up) at 6:30 a.m. / Men soat 6:30 da ___ (turaman).","get up","gets up","got up","getting up"],["He is wearing a ___ . / U ___ kiyim kiygan.","shirt","shoes","hat","pants"],["It ___ (be) rainy today. / Bugun yomg‘ir ___ (yomg‘ir yog‘moqda).","is","are","was","be"],["The book is ___ the table. / Kitob ___ stolda.","on","in","at","under"],["She ___ (swim) very well. / U juda yaxshi ___ (suza oladi).","can","can't","could","may"],["___ many apples in the basket. / Savatda ___ ko‘p olma bor.","There are","There is","There were","There will be"],["Translate: \"I like to read books.\" / \"I like to read books.\" ni o‘zbek tiliga tarjima qiling.","Men kitob o‘qishni yoqtiraman.","Men kitob o‘qishni sevarman.","Mening kitob o‘qishim yoqadi.","Men kitob o‘qishga qiziqaman."],["He ___ (watch) TV in the evening.","watches","watch","watched","watching"],["They ___ (study) English now.","are studying","study","studies","studied"],["She ___ to school every day.","goes","go","going","gone"],["There ___ many books on the shelf.","are","is","am","be"],["\"I ___ TV at the moment.\" (present continuous)","am watching","watch","watches","watched"],["My brother ___ older than me.","is","are","am","be"]], 7: [["She ___ at the library yesterday.","was","were","is","be"],["They ___ a movie last night.","watched","watch","watches","watching"],["I ___ my grandparents tomorrow.","will visit","am visiting","visited","will be visiting"],["We ___ to the park this afternoon.","are going to go","going to go","will go","go"],["This book is ___ than that one.","bigger","biggest","big","more big"],["Mount Everest is the ___ mountain in the world.","highest","higher","high","most high"],["There are ___ apples in the basket.","many","much","a lot of","few"],["There isn’t ___ milk left.","much","many","a lot of","few"],["She has ___ friends in the city.","a lot of","many","much","few"],["Every morning, I ___ my teeth before school.","brush","brushed","brushing","brushes"],["She ___ (be) at school yesterday.","was","were","is","be"],["They ___ (go) to the library last weekend.","went","goed","goes","gone"],["I ___ (eat) an apple this morning.","ate","eated","eats","eaten"],["He ___ (see) the new museum tomorrow.","will see","saw","sees","seeing"],["We are ___ (go) to the park this afternoon.","going to go","will go","go","went"],["This building is ___ (big) than the school.","bigger","biggest","big","bigly"],["Mount Everest is the ___ (high) mountain in the world.","highest","higher","high","more high"],["There are ___ books on the shelf.","many","much","a lot of","few"],["She has ___ water in her bottle.","much","many","a lot of","few"],["There are ___ people in the city center during the festival.","a lot of","much","many","few"],["Yesterday, I ___ to the market.","went","goed","goes","gone"],["There ___ many people at the concert last night.","were","was","is","be"],["She ___ call you tomorrow.","will","going to","calls","called"],["They ___ visit the museum next week.","are going to","will","visit","are visits"],["My house is ___ than yours.","bigger","big","biggest","small"],["This is the ___ restaurant in the city.","best","good","better","worst"],["How ___ apples do you have?","many","much","a lot of","few"],["There isn’t ___ sugar left.","much","many","a lot of","few"],["Every morning, I ___ a jog in the park.","go","went","going","goes"],["In the city, people often ___ the subway.","take","took","takes","taken"],["U kecha kinoga __________ (go).","went","goed","go","goes"],["Biz 2020-yilda __________ (be) o'qituvchilar bilan uchrashdik.","were","was","be","been"],["Mening singlim har kuni kitob __________ (read).","read","reads","reading","reed"],["I will __________ the test tomorrow.","pass","passes","passed","passing"],["Ular dam olishga __________ (go) tomorrow.","go","goes","went","going"],["Bu kitob ____ (big) than the previous one.","bigger","big","biggest","more big"],["U eng ____ (good) talaba.","best","better","good","well"],["Maktabda ____ (many/much) o'quvchilar bor.","many","much","a lot of","few"],["Mening kunimda men __________ (eat) non.","eat","ate","eating","eated"],["Shahar markazida ko'p __________ (shop) mavjud.","shops","shop","shopping","shopes"],["Yesterday, I ___ at the museum.","was","were","am","is"],["Last weekend we ___ to the park.","went","go","gone","going"],["She ___ an apple for breakfast.","ate","eaten","eat","eats"],["He ___ a movie yesterday.","saw","seen","see","sees"],["Tomorrow it ___ rain.","will","going to","is","was"],["I ___ visit my aunt next week.","am going to","will","going","goes"],["My brother is ___ than me.","taller","tallest","tall","more tall"],["This is the ___ restaurant in town.","best","better","good","more good"],["There are ___ students in the class.","many","much","a lot of","few"],["In the city, people often ___ by bus.","commute","drive","walk","run"]], 8: [["She ___ (visit) Paris three times.","has visited","have visited","visited","has visit"],["If it ___ (rain) tomorrow, we will stay at home.","rains","rained","will rain","rain"],["If I ___ (be) you, I would study harder.","were","was","am","be"],["The letter ___ (write) by Maria yesterday.","was written","is written","were written","wrote"],["He said, \"I am tired.\" → He said that ___.","he was tired","he is tired","he will be tired","he had been tired"],["She decided to ___ smoking.","give up","give","give out","give in"],["They are ___ a new teacher.","looking for","look at","looked for","looking to"],["When I grow up, I ___ a scientist.","will become","become","am becoming","would become"],["Have you ___ your homework yet?","finished","finish","finishing","finishe"],["If she ___ (have) more time, she would travel.","had","has","will have","having"],["She ___ (just / finish) her homework.","has finished","have finished","finished","has finish"],["Have you ___ (be) to Samarkand?","been","go","went","being"],["If I ___ (study) hard, I will pass the exam.","study","studied","studying","will study"],["If they ___ (win) the match, they would celebrate.","won","win","won't win","had won"],["The letters ___ (send) by the teacher every Monday.","are sent","is sent","sent","were sent"],["Tom said, \"I am tired.\" → Tom said that he ___ tired.","was","is","am","were"],["She is ___ her keys.","looking for","looking at","looking after","looking into"],["They decided ___ smoking.","to give up","to give in","to take up","to put off"],["My sister wants to become a ___ when she finishes school.","engineer","doctor","teacher","artist"],["If I ___ (be) a famous singer, I would travel the world.","were","am","was","be"],["Men Londonga ___ (go) oldim.","have gone","has gone","went","go"],["Agar yomg'ir yog'sa, biz ___ (stay) ichkarida qolamiz.","will stay","stay","would stay","stayed"],["Agar men million dollarlik pul ___ (have), dunyoga sayohat qilardim.","had","have","will have","would have"],["Bu kitob 2020 yilda ___ (publish) bo'ldi.","was published","is published","were published","published"],["U aytdi, u ___ (come) kechqurun keladi.","would come","will come","comes","came"],["U yangi tilni ___ (give up) ni to'xtatdi.","gave up","give up","giving up","gives up"],["Men yangi uy ___ (look for) qilyapman.","am looking for","look for","looked for","looking for"],["Men o'sha yoshda ___ (be) muhandis bo'laman.","will be","am","was","would be"],["Ular ___ (finish) loyihani tugatdilar.","have finished","has finished","finished","are finishing"],["Agar men prezident ___ (be), mamlakatni yaxshilardim.","were","was","am","will be"],["She ___ (visit) London three times.","has visited","visited","is visiting","will visit"],["If I ___ (be) you, I would study more.","were","am","was","be"],["The letter ___ (write) by John yesterday.","was written","wrote","is written","has written"],["Tom said, \"I will go to the market.\" → Tom said that ___ (go) to the market.","he would go","he will go","he goes","he gone"],["Can you ___ my keys? I can't find them.","look for","give up","take off","put away"],["My brother wants to become a ___ when he grows up.","doctor","teacher","engineer","pilot"],["If she ___ (have) more time, she would travel more.","had","has","will have","having"],["We ___ (just/finish) our project.","have just finished","just finished","have finished just","just have finished"],["The letter ___ (write) by Sarah yesterday.","was written","is written","were written","wrote"],["He said, \"I will travel next month.\" Reported: He said that ___ (travel) next month.","he would travel","he will travel","he travelled","he would have traveled"],["We ___ (finish) our homework already.","have finished","has finished","finished","have finish"],["If the house ___ (be) painted, it would look better.","were painted","was painted","is painted","would be painted"],["The new bridge ___ (build) last year.","was built","is built","built","has been built"],["He said, \"I am tired.\" → He said that he ___ (be) tired.","was","is","has been","will be"],["When I grow up, I want to ___ a doctor.","become","be","becoming","becomed"],["If they ___ (finish) the project on time, they will get a bonus.","finish","finished","will finish","have finished"],["She ___ (live) in London since 2010. (Bo'sh joyni to‘ldiring.)","has lived","lived","is living","will live"],["If it ___ (rain) tomorrow, we will cancel the picnic. (Bo'sh joyni to‘ldiring.)","rains","rained","will rain","rain"],["If I ___ (be) you, I would study harder for the exam. (Bo'sh joyni to‘ldiring.)","were","am","was","will be"],["The new library ___ (open) next month. (Bo'sh joyni to‘ldiring.)","will be opened","opens","opened","will open"]], 9: [["If I ___ (know) about the traffic jam, I would have left earlier.","had known","knew","know","would know"],["She enjoys ___ (read) novels in her free time.","reading","to read","read","reads"],["The ___ (organize) of the schedule caused problems.","unorganized","organized","organizing","organization"],["His ___ (kind) made everyone like him.","kindness","kinder","kindly","kinding"],["The ___ (decide) of the committee was final.","decision","deciding","decided","decidation"],["According to the passage, one negative effect of the internet is ___.","Reduced face‑to‑face interaction","Faster travel","Higher literacy rates","More physical exercise"],["Dear Mr. Karimov, ___ (I would like) to inform you that I will be absent tomorrow due to a doctor's appointment.","I would like","I want","I am wanting","I will want"],["A device that stores data temporarily is called a ___.","RAM","CPU","ROM","SSD"],["The act of helping people in need is known as ___.","charity","commerce","politics","industry"],["If she ___ (study) harder, she would have passed the exam.","had studied","studied","has studied","will study"],["If I ____ (know) about the traffic, I would have left earlier.","had known","knew","have known","know"],["The ___ of the new law surprised everyone.","implementation","implement","implemented","implementing"],["In a formal request letter, which closing phrase is most appropriate?","Yours faithfully","Hey there","See you soon","Best wishes"],["Which of the following is NOT a renewable energy source?","Coal","Solar power","Wind power","Hydropower"],["The term \"democracy\" refers to a system where ___ .","people elect their leaders","the king rules","the military governs","no elections are held"],["He wants ___ (to travel) abroad next year.","to travel","traveling","travel","to traveling"],["The ___ of the rumor made everyone nervous.","untruth","truth","false","lying"],["If they ___ (study) harder, they would have passed the exam.","had studied","studied","have studied","study"],["If he ___ (arrive) earlier, he would have met the train.","had arrived","arrived","would arrive","has arrived"],["She denied ___ (take) the book from the library.","taking","to take","take","taken"],["\"I am tired,\" he said. Which is the correct reported speech?","He said that he was tired.","He said that he is tired.","He says that he was tired.","He said that he is being tired."],["The teacher told us ___ (not, disturb) her during the lesson.","not to disturb","to not disturb","not disturb","don't disturb"],["The ___ (happy) of the family was obvious when the guest arrived.","happiness","happy","happily","happier"],["\"Where did you go?\" She asked me where ___.","I had gone","I went","did I go","I have gone"],["You ___ smoke in the hospital. It is strictly forbidden.","mustn't","don't have to","couldn't","might not"],["I look forward to ___ (hear) from you soon.","hearing","hear","to hear","heard"],["If the weather ___ (be) nice, we would have gone to the park.","had been","was","would be","is"],["The ___ (fail) of the experiment surprised the young scientist.","failure","failed","failing","fails"],["My father stopped ___ (smoke) last year and feels much better now.","smoking","to smoke","smoke","smoked"],["He suggested ___ (go) to the history museum after class.","going","to go","go","gone"],["\"Can you help me with this box?\" She asked if I ___ help her.","could","can","can't","may"],["It is ___ (possible) to finish this big project in one day.","impossible","possibly","possibility","possibleness"],["If I ___ (know) his phone number, I would call him right now.","knew","know","would know","had known"],["According to the water cycle, evaporation occurs when ___.","water changes into vapour","vapour changes into clouds","rain falls on the ground","water freezes into ice"],["The scientist's ___ (discover) of the new element changed medicine.","discovery","discovered","discovering","discovers"],["\"Don't touch the wire!\" He warned me ___ the wire.","not to touch","to not touch","not touch","don't touch"],["Which of the following is a fossil fuel?","natural gas","sunlight","wind energy","flowing water"],["I'd rather ___ (stay) at home tonight than go to the party.","stay","to stay","staying","stayed"],["The ___ (quick) of the new internet connection amazed the whole office.","speed","quick","quicker","quickly"],["By the time we arrived at the cinema, the film ___ (already, start).","had already started","has already started","already started","would already start"],["\"Why did you leave the meeting?\" She asked why ___.","I had left","I left","did I leave","I leave"],["We believe that plastic ___ (pollute) our oceans every year.","pollutes","is polluting","will pollutes","polluted"],["The word most opposite in meaning to \"ancient\" is ___.","modern","old","historical","antique"],["If she ___ (listen) to the teacher carefully, she would have understood the lesson.","had listened","listened","would listen","has listened"],["\"I will call you tomorrow,\" he promised. In reported speech:","He promised that he would call me.","He promises that he will call me.","He promised that he calls me.","He promised that he would calling me."],["Which word is spelled correctly?","environment","enviroment","enwironment","environmnet"],["The ___ (act) of the young hero saved many lives during the flood.","action","acted","active","actively"],["In the sentence \"She has lived here since 2010\", the verb shows ___.","an action that started in the past and continues now","a finished action in the past","an action that will happen tomorrow","two separate past actions"],["The committee decided ___ (postpone) the general meeting until Friday.","to postpone","postponing","postpone","postponed"],["The word \"meticulous\" is closest in meaning to ___.","careful","careless","angry","quick"],["\"She has been working here for five years.\" This sentence uses the ___.","present perfect continuous tense","simple past tense","future perfect tense","present simple tense"]], 10: [["By next June, she ___ (graduate) from university with honours.","will have graduated","will graduate","is graduating","graduates"],["___ (see) the mountains from the hill, we realized how far we had walked.","Seeing","We saw","Seen","To see"],["Not only ___ late for the interview, but he also forgot his notes.","was he","he was","he is","is he"],["Which sentence is a cleft sentence?","It was the storm that destroyed the old bridge.","The storm destroyed the old bridge.","The old bridge was destroyed by the storm.","When the storm came, the bridge fell."],["If I ___ more time, I would have finished the research project.","had had","have","had","would have"],["The annual report ___ (write) by the end of this month.","will have been written","will be written","is being written","has been written"],["He ___ (work) on the difficult case for three months before he finally solved it.","had been working","was working","has been working","worked"],["___ the heavy rain, the international football match was not cancelled.","In spite of","Because of","Due to","Owing of"],["The new environmental law came into ___ last month.","force","power","action","effectiveness"],["The idiom \"to break the ice\" means ___.","to start a conversation in a social situation","to make ice melt quickly","to end a friendship","to create a problem"],["\"She is on cloud nine\" means that she is ___.","extremely happy","very confused","feeling cold","working at night"],["The idiom \"He let the cat out of the bag\" means ___.","he revealed a secret","he bought a cat","he was very afraid","he closed the deal"],["Collocation: You must make a ___ before signing the contract.","decision","result","conclusion","answer"],["Collocation: The government announced ___ measures to protect the rivers.","preventive","prevented","preventing","prevent"],["___ its many advantages, the new method is still very expensive.","Despite","Because","Although","However"],["In academic writing, \"The results ___ with previous studies\" means the results ___.","are similar to","are opposite to","are hidden from","replace"],["According to scientists, continued warming will ___ sea levels over the next century.","raise","rise","lift up","grow"],["This time tomorrow, our team ___ (fly) to Tashkent for the final competition.","will be flying","will fly","flies","is flying"],["___ (walk) home in the evening, she met an old school friend.","Walking","Walked","She walked","To walk"],["If he ___ harder at school, he would be an engineer now.","had studied","studied","would study","has studied"],["Under no circumstances ___ leave the laboratory while the experiment is running.","must you","you must","you can","can you"],["Which question was reported correctly? Original: \"Who wrote this article?\"","She asked who had written the article.","She asked who wrote the article.","She asked who does write the article.","She asked that who wrote the article."],["The suspect was alleged ___ the crime ten years ago.","to have committed","to commit","committing","that he committed"],["The company's proposal was turned ___ by the board of directors.","down","up","off","out"],["A scientist who studies the structure of the Earth is called a ___.","geologist","astronomer","biologist","meteorologist"],["The old bridge collapsed because of the ___ of its metal supports.","weakening","weak","weakness of","weaken"],["Florence Nightingale is credited ___ the modern system of nursing.","with","for","to","by"],["The experiment ___ (conduct) twice before the results were finally accepted.","had been conducted","was conducted","has been conducted","conducts"],["By 2030, a new international airport ___ (build) in this region.","will have been built","will be built","is being built","has been built"],["\"This type of music is not my cup of tea\" means ___.","I do not enjoy this type of music","I cannot afford this music","I broke my tea cup","I do not understand music"],["The idiom \"to cut corners\" means ___.","to do something in a careless or cheap way","to move quickly","to reduce costs by working more carefully","to finish a project on time"],["After years of training, she finally gave ___ her dream of becoming a pilot.","up","off","in","away"],["The important meeting was put ___ until next week because of the storm.","off","down","out","back to"],["The word most opposite in meaning to \"scarce\" is ___.","abundant","rare","limited","small"],["A synonym of \"inevitable\" is ___.","unavoidable","possible","optional","unlikely"],["The witness ___ (interrogate) by the police for several hours before the hearing.","had been interrogated","was interrogated","has been interrogated","interrogated"],["If they ___ enough money last year, they could buy a house now.","had saved","saved","would save","have saved"],["Rarely ___ seen such a talented young musician in this city.","have I","I have","I had","did I"],["All the data ___ (analyze) before the final report was published.","had been analyzed","was analyzed","has been analyzed","is analyzing"],["___ (consider) all the evidence, the judge declared him guilty.","Considering","Considered","To consider","Considers"],["It is high time we ___ (reform) the examination system.","reformed","reform","will reform","have reformed"],["The proposal, ___ (submit) in March, was approved by the committee yesterday.","submitted","submitting","which submits","to submit"],["Gravity is one of the ___ (complex) topics in high school physics.","most complex","more complex","complexest","much complex"],["We ___ (meet) for two whole hours when the power suddenly went out.","had been meeting","were meeting","have been meeting","met"],["By the time the ambulance arrived, the old man ___ (lose) consciousness.","had lost","lost","has lost","would lose"],["The new medicine is ___ more effective than the old one, according to the study.","considerably","consider","considering","considerate"],["___ (assume) that the measurements are correct, the final conclusion follows easily.","Assuming","Assumed","To assume","Assumes"],["The factory was fined heavily ___ breaking environmental protection laws.","for","because","since","due"],["It is widely ___ that regular exercise improves mental health.","believed","believing","to believe","believe"],["The phrase \"as far as I am concerned\" is used to ___.","express your own opinion about something","agree strongly with everyone","ask for detailed information","apologize for a mistake"]]}
  };
  var LANG_TIME = { 5: 25, 6: 25, 7: 25, 8: 30, 9: 30, 10: 30 };

  function langName(subj) { return subj === 'ona-tili' ? '📖 Ona tili' : '🌍 Ingliz tili'; }
  function langBank(subj, cls) {
    var k = baseKey(cls);
    var lb = LANG_BANK[subj] && LANG_BANK[subj][k];
    return (lb && lb.length >= 10) ? lb : null;
  }
  function langGenerate(subj, cls) {
    var lb = langBank(subj, cls);
    if (!lb) return null;
    var k = baseKey(cls);
    var qs = R.shuffle(lb).slice(0, 10);
    var out = [];
    for (var i = 0; i < qs.length; i++) {
      var e = qs[i];
      var ans = e.length === 5 ? [e[1], e[2], e[3], e[4]] : [e[1]].concat(e[2]);
      out.push({ question: e[0], answers: ans, correct: 0 });
    }
    return { title: langName(subj) + ' (' + k + '-sinf)', time: LANG_TIME[k] || 25, questions: out };
  }

  function baseKey(cls) { return String(cls).replace(/[^0-9]/g, ''); }

  function subjectsFor(cls) {
    var k = baseKey(cls);
    var upper = k === '8' || k === '9' || k === '10';
    var list = upper
      ? [{ id: 'algebra', name: 'Algebra', icon: '➗' }, { id: 'geometriya', name: 'Geometriya', icon: '📐' }]
      : [{ id: 'matematika', name: 'Matematika', icon: '🔢' }];
    list.push({ id: 'ona-tili', name: 'Ona tili', icon: '📖' });
    list.push({ id: 'ingliz-tili', name: 'Ingliz tili', icon: '🌍' });
    return list;
  }

  function genInfo(cls, subj) {
    var g = GEN[subj + ':' + baseKey(cls)];
    if (g) return { title: g.title, time: g.time };
    var lb = langBank(subj, cls);
    if (lb) return { title: langName(subj) + ' (' + baseKey(cls) + '-sinf)', time: LANG_TIME[baseKey(cls)] || 25, count: lb.length };
    return null;
  }

  function generate(cls, subj) {
    var lg = langGenerate(subj, cls);
    if (lg) return lg;
    var g = GEN[subj + ':' + baseKey(cls)];
    if (!g) return null;
    var needTheory = g.theory ? Math.min(2, g.theory.length) : 0;
    var pool = R.shuffle(g.types);
    var questions = [];
    for (var i = 0; i < pool.length && questions.length < 10 - needTheory; i++) {
      var q = runType(pool[i]);
      if (q) questions.push(q);
    }
    if (g.theory && needTheory) {
      var th = R.shuffle(g.theory).slice(0, needTheory);
      for (var j = 0; j < th.length; j++) {
        var e = th[j];
        var ans = e.length === 5 ? [e[1], e[2], e[3], e[4]] : [e[1]].concat(e[2]);
        questions.push({ question: e[0], answers: ans, correct: 0 });
      }
    }
    var guard = 0;
    while (questions.length < 10 && guard < 50) {
      guard++;
      var q2 = runType(R.pick(g.types));
      if (q2) questions.push(q2);
    }
    if (questions.length < 10) return null;
    return { title: g.title, time: g.time, questions: questions };
  }

  var api = { subjectsFor: subjectsFor, genInfo: genInfo, generate: generate };
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
    module.exports._test = { R: R, q4: q4, poly2: poly2, T5: T5, T6: T6, T7: T7, T8A: T8A, T9A: T9A, T10A: T10A, T8G: T8G, T9G: T9G, T10G: T10G, LANG_BANK: LANG_BANK };
  }
  global.TestGen = api;
})(typeof window !== 'undefined' ? window : globalThis);
