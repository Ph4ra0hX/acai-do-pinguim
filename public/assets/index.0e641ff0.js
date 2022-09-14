const Ki = function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const n of r)
      if (n.type === "childList")
        for (const i of n.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(r) {
    const n = {};
    return (
      r.integrity && (n.integrity = r.integrity),
      r.referrerpolicy && (n.referrerPolicy = r.referrerpolicy),
      r.crossorigin === "use-credentials"
        ? (n.credentials = "include")
        : r.crossorigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const n = t(r);
    fetch(r.href, n);
  }
};
Ki();
function Vt(e, o) {
  const t = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) t[s[r]] = !0;
  return o ? (r) => !!t[r.toLowerCase()] : (r) => !!t[r];
}
const Gi =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ji = Vt(Gi);
function js(e) {
  return !!e || e === "";
}
function Dt(e) {
  if (V(e)) {
    const o = {};
    for (let t = 0; t < e.length; t++) {
      const s = e[t],
        r = de(s) ? Qi(s) : Dt(s);
      if (r) for (const n in r) o[n] = r[n];
    }
    return o;
  } else {
    if (de(e)) return e;
    if (re(e)) return e;
  }
}
const zi = /;(?![^(]*\))/g,
  Wi = /:(.+)/;
function Qi(e) {
  const o = {};
  return (
    e.split(zi).forEach((t) => {
      if (t) {
        const s = t.split(Wi);
        s.length > 1 && (o[s[0].trim()] = s[1].trim());
      }
    }),
    o
  );
}
function Ut(e) {
  let o = "";
  if (de(e)) o = e;
  else if (V(e))
    for (let t = 0; t < e.length; t++) {
      const s = Ut(e[t]);
      s && (o += s + " ");
    }
  else if (re(e)) for (const t in e) e[t] && (o += t + " ");
  return o.trim();
}
function Yi(e, o) {
  if (e.length !== o.length) return !1;
  let t = !0;
  for (let s = 0; t && s < e.length; s++) t = ot(e[s], o[s]);
  return t;
}
function ot(e, o) {
  if (e === o) return !0;
  let t = fs(e),
    s = fs(o);
  if (t || s) return t && s ? e.getTime() === o.getTime() : !1;
  if (((t = V(e)), (s = V(o)), t || s)) return t && s ? Yi(e, o) : !1;
  if (((t = re(e)), (s = re(o)), t || s)) {
    if (!t || !s) return !1;
    const r = Object.keys(e).length,
      n = Object.keys(o).length;
    if (r !== n) return !1;
    for (const i in e) {
      const l = e.hasOwnProperty(i),
        c = o.hasOwnProperty(i);
      if ((l && !c) || (!l && c) || !ot(e[i], o[i])) return !1;
    }
  }
  return String(e) === String(o);
}
function Hs(e, o) {
  return e.findIndex((t) => ot(t, o));
}
const p = (e) =>
    e == null
      ? ""
      : V(e) || (re(e) && (e.toString === Js || !H(e.toString)))
      ? JSON.stringify(e, Ks, 2)
      : String(e),
  Ks = (e, o) =>
    o && o.__v_isRef
      ? Ks(e, o.value)
      : po(o)
      ? {
          [`Map(${o.size})`]: [...o.entries()].reduce(
            (t, [s, r]) => ((t[`${s} =>`] = r), t),
            {}
          ),
        }
      : st(o)
      ? { [`Set(${o.size})`]: [...o.values()] }
      : re(o) && !V(o) && !zs(o)
      ? String(o)
      : o,
  X = {},
  mo = [],
  Ee = () => {},
  Xi = () => !1,
  Zi = /^on[^a-z]/,
  tt = (e) => Zi.test(e),
  Lt = (e) => e.startsWith("onUpdate:"),
  ue = Object.assign,
  Bt = (e, o) => {
    const t = e.indexOf(o);
    t > -1 && e.splice(t, 1);
  },
  ea = Object.prototype.hasOwnProperty,
  z = (e, o) => ea.call(e, o),
  V = Array.isArray,
  po = (e) => it(e) === "[object Map]",
  st = (e) => it(e) === "[object Set]",
  fs = (e) => e instanceof Date,
  H = (e) => typeof e == "function",
  de = (e) => typeof e == "string",
  jt = (e) => typeof e == "symbol",
  re = (e) => e !== null && typeof e == "object",
  Gs = (e) => re(e) && H(e.then) && H(e.catch),
  Js = Object.prototype.toString,
  it = (e) => Js.call(e),
  oa = (e) => it(e).slice(8, -1),
  zs = (e) => it(e) === "[object Object]",
  Ht = (e) =>
    de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Bo = Vt(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  at = (e) => {
    const o = Object.create(null);
    return (t) => o[t] || (o[t] = e(t));
  },
  ta = /-(\w)/g,
  Oe = at((e) => e.replace(ta, (o, t) => (t ? t.toUpperCase() : ""))),
  sa = /\B([A-Z])/g,
  Co = at((e) => e.replace(sa, "-$1").toLowerCase()),
  nt = at((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  pt = at((e) => (e ? `on${nt(e)}` : "")),
  Io = (e, o) => !Object.is(e, o),
  jo = (e, o) => {
    for (let t = 0; t < e.length; t++) e[t](o);
  },
  Go = (e, o, t) => {
    Object.defineProperty(e, o, { configurable: !0, enumerable: !1, value: t });
  },
  St = (e) => {
    const o = parseFloat(e);
    return isNaN(o) ? e : o;
  };
let ms;
const ia = () =>
  ms ||
  (ms =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof self != "undefined"
      ? self
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : {});
let We;
const Ro = [];
class aa {
  constructor(o = !1) {
    (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      !o &&
        We &&
        ((this.parent = We),
        (this.index = (We.scopes || (We.scopes = [])).push(this) - 1));
  }
  run(o) {
    if (this.active)
      try {
        return this.on(), o();
      } finally {
        this.off();
      }
  }
  on() {
    this.active && (Ro.push(this), (We = this));
  }
  off() {
    this.active && (Ro.pop(), (We = Ro[Ro.length - 1]));
  }
  stop(o) {
    if (this.active) {
      if (
        (this.effects.forEach((t) => t.stop()),
        this.cleanups.forEach((t) => t()),
        this.scopes && this.scopes.forEach((t) => t.stop(!0)),
        this.parent && !o)
      ) {
        const t = this.parent.scopes.pop();
        t &&
          t !== this &&
          ((this.parent.scopes[this.index] = t), (t.index = this.index));
      }
      this.active = !1;
    }
  }
}
function na(e, o) {
  (o = o || We), o && o.active && o.effects.push(e);
}
const Kt = (e) => {
    const o = new Set(e);
    return (o.w = 0), (o.n = 0), o;
  },
  Ws = (e) => (e.w & Ke) > 0,
  Qs = (e) => (e.n & Ke) > 0,
  ra = ({ deps: e }) => {
    if (e.length) for (let o = 0; o < e.length; o++) e[o].w |= Ke;
  },
  la = (e) => {
    const { deps: o } = e;
    if (o.length) {
      let t = 0;
      for (let s = 0; s < o.length; s++) {
        const r = o[s];
        Ws(r) && !Qs(r) ? r.delete(e) : (o[t++] = r),
          (r.w &= ~Ke),
          (r.n &= ~Ke);
      }
      o.length = t;
    }
  },
  At = new WeakMap();
let yo = 0,
  Ke = 1;
const kt = 30,
  Po = [];
let eo;
const oo = Symbol(""),
  Pt = Symbol("");
class Gt {
  constructor(o, t = null, s) {
    (this.fn = o),
      (this.scheduler = t),
      (this.active = !0),
      (this.deps = []),
      na(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    if (!Po.includes(this))
      try {
        return (
          Po.push((eo = this)),
          ca(),
          (Ke = 1 << ++yo),
          yo <= kt ? ra(this) : ps(this),
          this.fn()
        );
      } finally {
        yo <= kt && la(this), (Ke = 1 << --yo), io(), Po.pop();
        const o = Po.length;
        eo = o > 0 ? Po[o - 1] : void 0;
      }
  }
  stop() {
    this.active && (ps(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function ps(e) {
  const { deps: o } = e;
  if (o.length) {
    for (let t = 0; t < o.length; t++) o[t].delete(e);
    o.length = 0;
  }
}
let go = !0;
const Jt = [];
function So() {
  Jt.push(go), (go = !1);
}
function ca() {
  Jt.push(go), (go = !0);
}
function io() {
  const e = Jt.pop();
  go = e === void 0 ? !0 : e;
}
function Se(e, o, t) {
  if (!Ys()) return;
  let s = At.get(e);
  s || At.set(e, (s = new Map()));
  let r = s.get(t);
  r || s.set(t, (r = Kt())), Xs(r);
}
function Ys() {
  return go && eo !== void 0;
}
function Xs(e, o) {
  let t = !1;
  yo <= kt ? Qs(e) || ((e.n |= Ke), (t = !Ws(e))) : (t = !e.has(eo)),
    t && (e.add(eo), eo.deps.push(e));
}
function we(e, o, t, s, r, n) {
  const i = At.get(e);
  if (!i) return;
  let l = [];
  if (o === "clear") l = [...i.values()];
  else if (t === "length" && V(e))
    i.forEach((c, _) => {
      (_ === "length" || _ >= s) && l.push(c);
    });
  else
    switch ((t !== void 0 && l.push(i.get(t)), o)) {
      case "add":
        V(e)
          ? Ht(t) && l.push(i.get("length"))
          : (l.push(i.get(oo)), po(e) && l.push(i.get(Pt)));
        break;
      case "delete":
        V(e) || (l.push(i.get(oo)), po(e) && l.push(i.get(Pt)));
        break;
      case "set":
        po(e) && l.push(i.get(oo));
        break;
    }
  if (l.length === 1) l[0] && yt(l[0]);
  else {
    const c = [];
    for (const _ of l) _ && c.push(..._);
    yt(Kt(c));
  }
}
function yt(e, o) {
  for (const t of V(e) ? e : [...e])
    (t !== eo || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
}
const da = Vt("__proto__,__v_isRef,__isVue"),
  Zs = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(jt)
  ),
  ua = zt(),
  ha = zt(!1, !0),
  fa = zt(!0),
  _s = ma();
function ma() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((o) => {
      e[o] = function (...t) {
        const s = W(this);
        for (let n = 0, i = this.length; n < i; n++) Se(s, "get", n + "");
        const r = s[o](...t);
        return r === -1 || r === !1 ? s[o](...t.map(W)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((o) => {
      e[o] = function (...t) {
        So();
        const s = W(this)[o].apply(this, t);
        return io(), s;
      };
    }),
    e
  );
}
function zt(e = !1, o = !1) {
  return function (s, r, n) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_raw" && n === (e ? (o ? Ia : ii) : o ? si : ti).get(s))
      return s;
    const i = V(s);
    if (!e && i && z(_s, r)) return Reflect.get(_s, r, n);
    const l = Reflect.get(s, r, n);
    return (jt(r) ? Zs.has(r) : da(r)) || (e || Se(s, "get", r), o)
      ? l
      : pe(l)
      ? !i || !Ht(r)
        ? l.value
        : l
      : re(l)
      ? e
        ? ai(l)
        : Yt(l)
      : l;
  };
}
const pa = ei(),
  _a = ei(!0);
function ei(e = !1) {
  return function (t, s, r, n) {
    let i = t[s];
    if (!e && !Zt(r) && ((r = W(r)), (i = W(i)), !V(t) && pe(i) && !pe(r)))
      return (i.value = r), !0;
    const l = V(t) && Ht(s) ? Number(s) < t.length : z(t, s),
      c = Reflect.set(t, s, r, n);
    return (
      t === W(n) && (l ? Io(r, i) && we(t, "set", s, r) : we(t, "add", s, r)), c
    );
  };
}
function ga(e, o) {
  const t = z(e, o);
  e[o];
  const s = Reflect.deleteProperty(e, o);
  return s && t && we(e, "delete", o, void 0), s;
}
function ba(e, o) {
  const t = Reflect.has(e, o);
  return (!jt(o) || !Zs.has(o)) && Se(e, "has", o), t;
}
function va(e) {
  return Se(e, "iterate", V(e) ? "length" : oo), Reflect.ownKeys(e);
}
const oi = { get: ua, set: pa, deleteProperty: ga, has: ba, ownKeys: va },
  Ca = {
    get: fa,
    set(e, o) {
      return !0;
    },
    deleteProperty(e, o) {
      return !0;
    },
  },
  Sa = ue({}, oi, { get: ha, set: _a }),
  Wt = (e) => e,
  rt = (e) => Reflect.getPrototypeOf(e);
function wo(e, o, t = !1, s = !1) {
  e = e.__v_raw;
  const r = W(e),
    n = W(o);
  o !== n && !t && Se(r, "get", o), !t && Se(r, "get", n);
  const { has: i } = rt(r),
    l = s ? Wt : t ? es : $o;
  if (i.call(r, o)) return l(e.get(o));
  if (i.call(r, n)) return l(e.get(n));
  e !== r && e.get(o);
}
function Vo(e, o = !1) {
  const t = this.__v_raw,
    s = W(t),
    r = W(e);
  return (
    e !== r && !o && Se(s, "has", e),
    !o && Se(s, "has", r),
    e === r ? t.has(e) : t.has(e) || t.has(r)
  );
}
function Do(e, o = !1) {
  return (
    (e = e.__v_raw), !o && Se(W(e), "iterate", oo), Reflect.get(e, "size", e)
  );
}
function gs(e) {
  e = W(e);
  const o = W(this);
  return rt(o).has.call(o, e) || (o.add(e), we(o, "add", e, e)), this;
}
function bs(e, o) {
  o = W(o);
  const t = W(this),
    { has: s, get: r } = rt(t);
  let n = s.call(t, e);
  n || ((e = W(e)), (n = s.call(t, e)));
  const i = r.call(t, e);
  return (
    t.set(e, o), n ? Io(o, i) && we(t, "set", e, o) : we(t, "add", e, o), this
  );
}
function vs(e) {
  const o = W(this),
    { has: t, get: s } = rt(o);
  let r = t.call(o, e);
  r || ((e = W(e)), (r = t.call(o, e))), s && s.call(o, e);
  const n = o.delete(e);
  return r && we(o, "delete", e, void 0), n;
}
function Cs() {
  const e = W(this),
    o = e.size !== 0,
    t = e.clear();
  return o && we(e, "clear", void 0, void 0), t;
}
function Uo(e, o) {
  return function (s, r) {
    const n = this,
      i = n.__v_raw,
      l = W(i),
      c = o ? Wt : e ? es : $o;
    return (
      !e && Se(l, "iterate", oo), i.forEach((_, v) => s.call(r, c(_), c(v), n))
    );
  };
}
function Lo(e, o, t) {
  return function (...s) {
    const r = this.__v_raw,
      n = W(r),
      i = po(n),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      _ = r[e](...s),
      v = t ? Wt : o ? es : $o;
    return (
      !o && Se(n, "iterate", c ? Pt : oo),
      {
        next() {
          const { value: k, done: b } = _.next();
          return b
            ? { value: k, done: b }
            : { value: l ? [v(k[0]), v(k[1])] : v(k), done: b };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Le(e) {
  return function (...o) {
    return e === "delete" ? !1 : this;
  };
}
function Aa() {
  const e = {
      get(n) {
        return wo(this, n);
      },
      get size() {
        return Do(this);
      },
      has: Vo,
      add: gs,
      set: bs,
      delete: vs,
      clear: Cs,
      forEach: Uo(!1, !1),
    },
    o = {
      get(n) {
        return wo(this, n, !1, !0);
      },
      get size() {
        return Do(this);
      },
      has: Vo,
      add: gs,
      set: bs,
      delete: vs,
      clear: Cs,
      forEach: Uo(!1, !0),
    },
    t = {
      get(n) {
        return wo(this, n, !0);
      },
      get size() {
        return Do(this, !0);
      },
      has(n) {
        return Vo.call(this, n, !0);
      },
      add: Le("add"),
      set: Le("set"),
      delete: Le("delete"),
      clear: Le("clear"),
      forEach: Uo(!0, !1),
    },
    s = {
      get(n) {
        return wo(this, n, !0, !0);
      },
      get size() {
        return Do(this, !0);
      },
      has(n) {
        return Vo.call(this, n, !0);
      },
      add: Le("add"),
      set: Le("set"),
      delete: Le("delete"),
      clear: Le("clear"),
      forEach: Uo(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((n) => {
      (e[n] = Lo(n, !1, !1)),
        (t[n] = Lo(n, !0, !1)),
        (o[n] = Lo(n, !1, !0)),
        (s[n] = Lo(n, !0, !0));
    }),
    [e, t, o, s]
  );
}
const [ka, Pa, ya, xa] = Aa();
function Qt(e, o) {
  const t = o ? (e ? xa : ya) : e ? Pa : ka;
  return (s, r, n) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(z(t, r) && r in s ? t : s, r, n);
}
const Ea = { get: Qt(!1, !1) },
  Ta = { get: Qt(!1, !0) },
  Na = { get: Qt(!0, !1) },
  ti = new WeakMap(),
  si = new WeakMap(),
  ii = new WeakMap(),
  Ia = new WeakMap();
function $a(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Oa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $a(oa(e));
}
function Yt(e) {
  return e && e.__v_isReadonly ? e : Xt(e, !1, oi, Ea, ti);
}
function Fa(e) {
  return Xt(e, !1, Sa, Ta, si);
}
function ai(e) {
  return Xt(e, !0, Ca, Na, ii);
}
function Xt(e, o, t, s, r) {
  if (!re(e) || (e.__v_raw && !(o && e.__v_isReactive))) return e;
  const n = r.get(e);
  if (n) return n;
  const i = Oa(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? s : t);
  return r.set(e, l), l;
}
function _o(e) {
  return Zt(e) ? _o(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Zt(e) {
  return !!(e && e.__v_isReadonly);
}
function ni(e) {
  return _o(e) || Zt(e);
}
function W(e) {
  const o = e && e.__v_raw;
  return o ? W(o) : e;
}
function ri(e) {
  return Go(e, "__v_skip", !0), e;
}
const $o = (e) => (re(e) ? Yt(e) : e),
  es = (e) => (re(e) ? ai(e) : e);
function li(e) {
  Ys() && ((e = W(e)), e.dep || (e.dep = Kt()), Xs(e.dep));
}
function ci(e, o) {
  (e = W(e)), e.dep && yt(e.dep);
}
function pe(e) {
  return Boolean(e && e.__v_isRef === !0);
}
function u(e) {
  return qa(e, !1);
}
function qa(e, o) {
  return pe(e) ? e : new Ma(e, o);
}
class Ma {
  constructor(o, t) {
    (this._shallow = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = t ? o : W(o)),
      (this._value = t ? o : $o(o));
  }
  get value() {
    return li(this), this._value;
  }
  set value(o) {
    (o = this._shallow ? o : W(o)),
      Io(o, this._rawValue) &&
        ((this._rawValue = o),
        (this._value = this._shallow ? o : $o(o)),
        ci(this));
  }
}
function Ra(e) {
  return pe(e) ? e.value : e;
}
const wa = {
  get: (e, o, t) => Ra(Reflect.get(e, o, t)),
  set: (e, o, t, s) => {
    const r = e[o];
    return pe(r) && !pe(t) ? ((r.value = t), !0) : Reflect.set(e, o, t, s);
  },
};
function di(e) {
  return _o(e) ? e : new Proxy(e, wa);
}
class Va {
  constructor(o, t, s) {
    (this._setter = t),
      (this.dep = void 0),
      (this._dirty = !0),
      (this.__v_isRef = !0),
      (this.effect = new Gt(o, () => {
        this._dirty || ((this._dirty = !0), ci(this));
      })),
      (this.__v_isReadonly = s);
  }
  get value() {
    const o = W(this);
    return (
      li(o),
      o._dirty && ((o._dirty = !1), (o._value = o.effect.run())),
      o._value
    );
  }
  set value(o) {
    this._setter(o);
  }
}
function Da(e, o) {
  let t, s;
  const r = H(e);
  return (
    r ? ((t = e), (s = Ee)) : ((t = e.get), (s = e.set)), new Va(t, s, r || !s)
  );
}
Promise.resolve();
function Ua(e, o, ...t) {
  const s = e.vnode.props || X;
  let r = t;
  const n = o.startsWith("update:"),
    i = n && o.slice(7);
  if (i && i in s) {
    const v = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: k, trim: b } = s[v] || X;
    b ? (r = t.map(($) => $.trim())) : k && (r = t.map(St));
  }
  let l,
    c = s[(l = pt(o))] || s[(l = pt(Oe(o)))];
  !c && n && (c = s[(l = pt(Co(o)))]), c && ye(c, e, 6, r);
  const _ = s[l + "Once"];
  if (_) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), ye(_, e, 6, r);
  }
}
function ui(e, o, t = !1) {
  const s = o.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const n = e.emits;
  let i = {},
    l = !1;
  if (!H(e)) {
    const c = (_) => {
      const v = ui(_, o, !0);
      v && ((l = !0), ue(i, v));
    };
    !t && o.mixins.length && o.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !n && !l
    ? (s.set(e, null), null)
    : (V(n) ? n.forEach((c) => (i[c] = null)) : ue(i, n), s.set(e, i), i);
}
function os(e, o) {
  return !e || !tt(o)
    ? !1
    : ((o = o.slice(2).replace(/Once$/, "")),
      z(e, o[0].toLowerCase() + o.slice(1)) || z(e, Co(o)) || z(e, o));
}
let Pe = null,
  hi = null;
function Jo(e) {
  const o = Pe;
  return (Pe = e), (hi = (e && e.type.__scopeId) || null), o;
}
function La(e, o = Pe, t) {
  if (!o || e._n) return e;
  const s = (...r) => {
    s._d && Is(-1);
    const n = Jo(o),
      i = e(...r);
    return Jo(n), s._d && Is(1), i;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function _t(e) {
  const {
    type: o,
    vnode: t,
    proxy: s,
    withProxy: r,
    props: n,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: _,
    render: v,
    renderCache: k,
    data: b,
    setupState: $,
    ctx: D,
    inheritAttrs: U,
  } = e;
  let F, L;
  const ie = Jo(e);
  try {
    if (t.shapeFlag & 4) {
      const J = r || s;
      (F = $e(v.call(J, J, k, n, $, b, D))), (L = c);
    } else {
      const J = o;
      (F = $e(
        J.length > 1 ? J(n, { attrs: c, slots: l, emit: _ }) : J(n, null)
      )),
        (L = o.props ? c : Ba(c));
    }
  } catch (J) {
    (Eo.length = 0), ut(J, e, 1), (F = Te(Fe));
  }
  let Q = F;
  if (L && U !== !1) {
    const J = Object.keys(L),
      { shapeFlag: ee } = Q;
    J.length && ee & 7 && (i && J.some(Lt) && (L = ja(L, i)), (Q = bo(Q, L)));
  }
  return (
    t.dirs && (Q.dirs = Q.dirs ? Q.dirs.concat(t.dirs) : t.dirs),
    t.transition && (Q.transition = t.transition),
    (F = Q),
    Jo(ie),
    F
  );
}
const Ba = (e) => {
    let o;
    for (const t in e)
      (t === "class" || t === "style" || tt(t)) && ((o || (o = {}))[t] = e[t]);
    return o;
  },
  ja = (e, o) => {
    const t = {};
    for (const s in e) (!Lt(s) || !(s.slice(9) in o)) && (t[s] = e[s]);
    return t;
  };
function Ha(e, o, t) {
  const { props: s, children: r, component: n } = e,
    { props: i, children: l, patchFlag: c } = o,
    _ = n.emitsOptions;
  if (o.dirs || o.transition) return !0;
  if (t && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? Ss(s, i, _) : !!i;
    if (c & 8) {
      const v = o.dynamicProps;
      for (let k = 0; k < v.length; k++) {
        const b = v[k];
        if (i[b] !== s[b] && !os(_, b)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
      ? !1
      : s
      ? i
        ? Ss(s, i, _)
        : !0
      : !!i;
  return !1;
}
function Ss(e, o, t) {
  const s = Object.keys(o);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const n = s[r];
    if (o[n] !== e[n] && !os(t, n)) return !0;
  }
  return !1;
}
function Ka({ vnode: e, parent: o }, t) {
  for (; o && o.subTree === e; ) ((e = o.vnode).el = t), (o = o.parent);
}
const Ga = (e) => e.__isSuspense;
function Ja(e, o) {
  o && o.pendingBranch
    ? V(e)
      ? o.effects.push(...e)
      : o.effects.push(e)
    : Wn(e);
}
function za(e, o) {
  if (ce) {
    let t = ce.provides;
    const s = ce.parent && ce.parent.provides;
    s === t && (t = ce.provides = Object.create(s)), (t[e] = o);
  }
}
function gt(e, o, t = !1) {
  const s = ce || Pe;
  if (s) {
    const r =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return t && H(o) ? o.call(s.proxy) : o;
  }
}
function Wa() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    _i(() => {
      e.isMounted = !0;
    }),
    gi(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const ke = [Function, Array],
  Qa = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: ke,
      onEnter: ke,
      onAfterEnter: ke,
      onEnterCancelled: ke,
      onBeforeLeave: ke,
      onLeave: ke,
      onAfterLeave: ke,
      onLeaveCancelled: ke,
      onBeforeAppear: ke,
      onAppear: ke,
      onAfterAppear: ke,
      onAppearCancelled: ke,
    },
    setup(e, { slots: o }) {
      const t = wn(),
        s = Wa();
      let r;
      return () => {
        const n = o.default && mi(o.default(), !0);
        if (!n || !n.length) return;
        const i = W(e),
          { mode: l } = i,
          c = n[0];
        if (s.isLeaving) return bt(c);
        const _ = As(c);
        if (!_) return bt(c);
        const v = xt(_, i, s, t);
        Et(_, v);
        const k = t.subTree,
          b = k && As(k);
        let $ = !1;
        const { getTransitionKey: D } = _.type;
        if (D) {
          const U = D();
          r === void 0 ? (r = U) : U !== r && ((r = U), ($ = !0));
        }
        if (b && b.type !== Fe && (!Ye(_, b) || $)) {
          const U = xt(b, i, s, t);
          if ((Et(b, U), l === "out-in"))
            return (
              (s.isLeaving = !0),
              (U.afterLeave = () => {
                (s.isLeaving = !1), t.update();
              }),
              bt(c)
            );
          l === "in-out" &&
            _.type !== Fe &&
            (U.delayLeave = (F, L, ie) => {
              const Q = fi(s, b);
              (Q[String(b.key)] = b),
                (F._leaveCb = () => {
                  L(), (F._leaveCb = void 0), delete v.delayedLeave;
                }),
                (v.delayedLeave = ie);
            });
        }
        return c;
      };
    },
  },
  Ya = Qa;
function fi(e, o) {
  const { leavingVNodes: t } = e;
  let s = t.get(o.type);
  return s || ((s = Object.create(null)), t.set(o.type, s)), s;
}
function xt(e, o, t, s) {
  const {
      appear: r,
      mode: n,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: c,
      onAfterEnter: _,
      onEnterCancelled: v,
      onBeforeLeave: k,
      onLeave: b,
      onAfterLeave: $,
      onLeaveCancelled: D,
      onBeforeAppear: U,
      onAppear: F,
      onAfterAppear: L,
      onAppearCancelled: ie,
    } = o,
    Q = String(e.key),
    J = fi(t, e),
    ee = (j, oe) => {
      j && ye(j, s, 9, oe);
    },
    le = {
      mode: n,
      persisted: i,
      beforeEnter(j) {
        let oe = l;
        if (!t.isMounted)
          if (r) oe = U || l;
          else return;
        j._leaveCb && j._leaveCb(!0);
        const Z = J[Q];
        Z && Ye(e, Z) && Z.el._leaveCb && Z.el._leaveCb(), ee(oe, [j]);
      },
      enter(j) {
        let oe = c,
          Z = _,
          he = v;
        if (!t.isMounted)
          if (r) (oe = F || c), (Z = L || _), (he = ie || v);
          else return;
        let fe = !1;
        const be = (j._enterCb = (De) => {
          fe ||
            ((fe = !0),
            De ? ee(he, [j]) : ee(Z, [j]),
            le.delayedLeave && le.delayedLeave(),
            (j._enterCb = void 0));
        });
        oe ? (oe(j, be), oe.length <= 1 && be()) : be();
      },
      leave(j, oe) {
        const Z = String(e.key);
        if ((j._enterCb && j._enterCb(!0), t.isUnmounting)) return oe();
        ee(k, [j]);
        let he = !1;
        const fe = (j._leaveCb = (be) => {
          he ||
            ((he = !0),
            oe(),
            be ? ee(D, [j]) : ee($, [j]),
            (j._leaveCb = void 0),
            J[Z] === e && delete J[Z]);
        });
        (J[Z] = e), b ? (b(j, fe), b.length <= 1 && fe()) : fe();
      },
      clone(j) {
        return xt(j, o, t, s);
      },
    };
  return le;
}
function bt(e) {
  if (lt(e)) return (e = bo(e)), (e.children = null), e;
}
function As(e) {
  return lt(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Et(e, o) {
  e.shapeFlag & 6 && e.component
    ? Et(e.component.subTree, o)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = o.clone(e.ssContent)),
      (e.ssFallback.transition = o.clone(e.ssFallback)))
    : (e.transition = o);
}
function mi(e, o = !1) {
  let t = [],
    s = 0;
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    n.type === N
      ? (n.patchFlag & 128 && s++, (t = t.concat(mi(n.children, o))))
      : (o || n.type !== Fe) && t.push(n);
  }
  if (s > 1) for (let r = 0; r < t.length; r++) t[r].patchFlag = -2;
  return t;
}
const Tt = (e) => !!e.type.__asyncLoader,
  lt = (e) => e.type.__isKeepAlive;
function Xa(e, o) {
  pi(e, "a", o);
}
function Za(e, o) {
  pi(e, "da", o);
}
function pi(e, o, t = ce) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = t;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((ct(o, s, t), t)) {
    let r = t.parent;
    for (; r && r.parent; )
      lt(r.parent.vnode) && en(s, o, t, r), (r = r.parent);
  }
}
function en(e, o, t, s) {
  const r = ct(o, e, s, !0);
  bi(() => {
    Bt(s[o], r);
  }, t);
}
function ct(e, o, t = ce, s = !1) {
  if (t) {
    const r = t[e] || (t[e] = []),
      n =
        o.__weh ||
        (o.__weh = (...i) => {
          if (t.isUnmounted) return;
          So(), vo(t);
          const l = ye(o, t, e, i);
          return so(), io(), l;
        });
    return s ? r.unshift(n) : r.push(n), n;
  }
}
const Ve =
    (e) =>
    (o, t = ce) =>
      (!Yo || e === "sp") && ct(e, o, t),
  on = Ve("bm"),
  _i = Ve("m"),
  tn = Ve("bu"),
  sn = Ve("u"),
  gi = Ve("bum"),
  bi = Ve("um"),
  an = Ve("sp"),
  nn = Ve("rtg"),
  rn = Ve("rtc");
function ln(e, o = ce) {
  ct("ec", e, o);
}
let Nt = !0;
function cn(e) {
  const o = Ci(e),
    t = e.proxy,
    s = e.ctx;
  (Nt = !1), o.beforeCreate && ks(o.beforeCreate, e, "bc");
  const {
    data: r,
    computed: n,
    methods: i,
    watch: l,
    provide: c,
    inject: _,
    created: v,
    beforeMount: k,
    mounted: b,
    beforeUpdate: $,
    updated: D,
    activated: U,
    deactivated: F,
    beforeDestroy: L,
    beforeUnmount: ie,
    destroyed: Q,
    unmounted: J,
    render: ee,
    renderTracked: le,
    renderTriggered: j,
    errorCaptured: oe,
    serverPrefetch: Z,
    expose: he,
    inheritAttrs: fe,
    components: be,
    directives: De,
    filters: Fo,
  } = o;
  if ((_ && dn(_, s, null, e.appContext.config.unwrapInjectedRef), i))
    for (const ne in i) {
      const te = i[ne];
      H(te) && (s[ne] = te.bind(t));
    }
  if (r) {
    const ne = r.call(t, t);
    re(ne) && (e.data = Yt(ne));
  }
  if (((Nt = !0), n))
    for (const ne in n) {
      const te = n[ne],
        qe = H(te) ? te.bind(t, t) : H(te.get) ? te.get.bind(t, t) : Ee,
        ht = !H(te) && H(te.set) ? te.set.bind(t) : Ee,
        Ao = Da({ get: qe, set: ht });
      Object.defineProperty(s, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ao.value,
        set: (ao) => (Ao.value = ao),
      });
    }
  if (l) for (const ne in l) vi(l[ne], s, t, ne);
  if (c) {
    const ne = H(c) ? c.call(t) : c;
    Reflect.ownKeys(ne).forEach((te) => {
      za(te, ne[te]);
    });
  }
  v && ks(v, e, "c");
  function _e(ne, te) {
    V(te) ? te.forEach((qe) => ne(qe.bind(t))) : te && ne(te.bind(t));
  }
  if (
    (_e(on, k),
    _e(_i, b),
    _e(tn, $),
    _e(sn, D),
    _e(Xa, U),
    _e(Za, F),
    _e(ln, oe),
    _e(rn, le),
    _e(nn, j),
    _e(gi, ie),
    _e(bi, J),
    _e(an, Z),
    V(he))
  )
    if (he.length) {
      const ne = e.exposed || (e.exposed = {});
      he.forEach((te) => {
        Object.defineProperty(ne, te, {
          get: () => t[te],
          set: (qe) => (t[te] = qe),
        });
      });
    } else e.exposed || (e.exposed = {});
  ee && e.render === Ee && (e.render = ee),
    fe != null && (e.inheritAttrs = fe),
    be && (e.components = be),
    De && (e.directives = De);
}
function dn(e, o, t = Ee, s = !1) {
  V(e) && (e = It(e));
  for (const r in e) {
    const n = e[r];
    let i;
    re(n)
      ? "default" in n
        ? (i = gt(n.from || r, n.default, !0))
        : (i = gt(n.from || r))
      : (i = gt(n)),
      pe(i) && s
        ? Object.defineProperty(o, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (l) => (i.value = l),
          })
        : (o[r] = i);
  }
}
function ks(e, o, t) {
  ye(V(e) ? e.map((s) => s.bind(o.proxy)) : e.bind(o.proxy), o, t);
}
function vi(e, o, t, s) {
  const r = s.includes(".") ? Ui(t, s) : () => t[s];
  if (de(e)) {
    const n = o[e];
    H(n) && vt(r, n);
  } else if (H(e)) vt(r, e.bind(t));
  else if (re(e))
    if (V(e)) e.forEach((n) => vi(n, o, t, s));
    else {
      const n = H(e.handler) ? e.handler.bind(t) : o[e.handler];
      H(n) && vt(r, n, e);
    }
}
function Ci(e) {
  const o = e.type,
    { mixins: t, extends: s } = o,
    {
      mixins: r,
      optionsCache: n,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = n.get(o);
  let c;
  return (
    l
      ? (c = l)
      : !r.length && !t && !s
      ? (c = o)
      : ((c = {}), r.length && r.forEach((_) => zo(c, _, i, !0)), zo(c, o, i)),
    n.set(o, c),
    c
  );
}
function zo(e, o, t, s = !1) {
  const { mixins: r, extends: n } = o;
  n && zo(e, n, t, !0), r && r.forEach((i) => zo(e, i, t, !0));
  for (const i in o)
    if (!(s && i === "expose")) {
      const l = un[i] || (t && t[i]);
      e[i] = l ? l(e[i], o[i]) : o[i];
    }
  return e;
}
const un = {
  data: Ps,
  props: Qe,
  emits: Qe,
  methods: Qe,
  computed: Qe,
  beforeCreate: me,
  created: me,
  beforeMount: me,
  mounted: me,
  beforeUpdate: me,
  updated: me,
  beforeDestroy: me,
  beforeUnmount: me,
  destroyed: me,
  unmounted: me,
  activated: me,
  deactivated: me,
  errorCaptured: me,
  serverPrefetch: me,
  components: Qe,
  directives: Qe,
  watch: fn,
  provide: Ps,
  inject: hn,
};
function Ps(e, o) {
  return o
    ? e
      ? function () {
          return ue(
            H(e) ? e.call(this, this) : e,
            H(o) ? o.call(this, this) : o
          );
        }
      : o
    : e;
}
function hn(e, o) {
  return Qe(It(e), It(o));
}
function It(e) {
  if (V(e)) {
    const o = {};
    for (let t = 0; t < e.length; t++) o[e[t]] = e[t];
    return o;
  }
  return e;
}
function me(e, o) {
  return e ? [...new Set([].concat(e, o))] : o;
}
function Qe(e, o) {
  return e ? ue(ue(Object.create(null), e), o) : o;
}
function fn(e, o) {
  if (!e) return o;
  if (!o) return e;
  const t = ue(Object.create(null), e);
  for (const s in o) t[s] = me(e[s], o[s]);
  return t;
}
function mn(e, o, t, s = !1) {
  const r = {},
    n = {};
  Go(n, dt, 1), (e.propsDefaults = Object.create(null)), Si(e, o, r, n);
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  t ? (e.props = s ? r : Fa(r)) : e.type.props ? (e.props = r) : (e.props = n),
    (e.attrs = n);
}
function pn(e, o, t, s) {
  const {
      props: r,
      attrs: n,
      vnode: { patchFlag: i },
    } = e,
    l = W(r),
    [c] = e.propsOptions;
  let _ = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const v = e.vnode.dynamicProps;
      for (let k = 0; k < v.length; k++) {
        let b = v[k];
        const $ = o[b];
        if (c)
          if (z(n, b)) $ !== n[b] && ((n[b] = $), (_ = !0));
          else {
            const D = Oe(b);
            r[D] = $t(c, l, D, $, e, !1);
          }
        else $ !== n[b] && ((n[b] = $), (_ = !0));
      }
    }
  } else {
    Si(e, o, r, n) && (_ = !0);
    let v;
    for (const k in l)
      (!o || (!z(o, k) && ((v = Co(k)) === k || !z(o, v)))) &&
        (c
          ? t &&
            (t[k] !== void 0 || t[v] !== void 0) &&
            (r[k] = $t(c, l, k, void 0, e, !0))
          : delete r[k]);
    if (n !== l) for (const k in n) (!o || !z(o, k)) && (delete n[k], (_ = !0));
  }
  _ && we(e, "set", "$attrs");
}
function Si(e, o, t, s) {
  const [r, n] = e.propsOptions;
  let i = !1,
    l;
  if (o)
    for (let c in o) {
      if (Bo(c)) continue;
      const _ = o[c];
      let v;
      r && z(r, (v = Oe(c)))
        ? !n || !n.includes(v)
          ? (t[v] = _)
          : ((l || (l = {}))[v] = _)
        : os(e.emitsOptions, c) ||
          ((!(c in s) || _ !== s[c]) && ((s[c] = _), (i = !0)));
    }
  if (n) {
    const c = W(t),
      _ = l || X;
    for (let v = 0; v < n.length; v++) {
      const k = n[v];
      t[k] = $t(r, c, k, _[k], e, !z(_, k));
    }
  }
  return i;
}
function $t(e, o, t, s, r, n) {
  const i = e[t];
  if (i != null) {
    const l = z(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && H(c)) {
        const { propsDefaults: _ } = r;
        t in _ ? (s = _[t]) : (vo(r), (s = _[t] = c.call(null, o)), so());
      } else s = c;
    }
    i[0] &&
      (n && !l ? (s = !1) : i[1] && (s === "" || s === Co(t)) && (s = !0));
  }
  return s;
}
function Ai(e, o, t = !1) {
  const s = o.propsCache,
    r = s.get(e);
  if (r) return r;
  const n = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!H(e)) {
    const v = (k) => {
      c = !0;
      const [b, $] = Ai(k, o, !0);
      ue(i, b), $ && l.push(...$);
    };
    !t && o.mixins.length && o.mixins.forEach(v),
      e.extends && v(e.extends),
      e.mixins && e.mixins.forEach(v);
  }
  if (!n && !c) return s.set(e, mo), mo;
  if (V(n))
    for (let v = 0; v < n.length; v++) {
      const k = Oe(n[v]);
      ys(k) && (i[k] = X);
    }
  else if (n)
    for (const v in n) {
      const k = Oe(v);
      if (ys(k)) {
        const b = n[v],
          $ = (i[k] = V(b) || H(b) ? { type: b } : b);
        if ($) {
          const D = Ts(Boolean, $.type),
            U = Ts(String, $.type);
          ($[0] = D > -1),
            ($[1] = U < 0 || D < U),
            (D > -1 || z($, "default")) && l.push(k);
        }
      }
    }
  const _ = [i, l];
  return s.set(e, _), _;
}
function ys(e) {
  return e[0] !== "$";
}
function xs(e) {
  const o = e && e.toString().match(/^\s*function (\w+)/);
  return o ? o[1] : e === null ? "null" : "";
}
function Es(e, o) {
  return xs(e) === xs(o);
}
function Ts(e, o) {
  return V(o) ? o.findIndex((t) => Es(t, e)) : H(o) && Es(o, e) ? 0 : -1;
}
const ki = (e) => e[0] === "_" || e === "$stable",
  ts = (e) => (V(e) ? e.map($e) : [$e(e)]),
  _n = (e, o, t) => {
    const s = La((...r) => ts(o(...r)), t);
    return (s._c = !1), s;
  },
  Pi = (e, o, t) => {
    const s = e._ctx;
    for (const r in e) {
      if (ki(r)) continue;
      const n = e[r];
      if (H(n)) o[r] = _n(r, n, s);
      else if (n != null) {
        const i = ts(n);
        o[r] = () => i;
      }
    }
  },
  yi = (e, o) => {
    const t = ts(o);
    e.slots.default = () => t;
  },
  gn = (e, o) => {
    if (e.vnode.shapeFlag & 32) {
      const t = o._;
      t ? ((e.slots = W(o)), Go(o, "_", t)) : Pi(o, (e.slots = {}));
    } else (e.slots = {}), o && yi(e, o);
    Go(e.slots, dt, 1);
  },
  bn = (e, o, t) => {
    const { vnode: s, slots: r } = e;
    let n = !0,
      i = X;
    if (s.shapeFlag & 32) {
      const l = o._;
      l
        ? t && l === 1
          ? (n = !1)
          : (ue(r, o), !t && l === 1 && delete r._)
        : ((n = !o.$stable), Pi(o, r)),
        (i = o);
    } else o && (yi(e, o), (i = { default: 1 }));
    if (n) for (const l in r) !ki(l) && !(l in i) && delete r[l];
  };
function O(e, o) {
  const t = Pe;
  if (t === null) return e;
  const s = t.proxy,
    r = e.dirs || (e.dirs = []);
  for (let n = 0; n < o.length; n++) {
    let [i, l, c, _ = X] = o[n];
    H(i) && (i = { mounted: i, updated: i }),
      i.deep && Ze(l),
      r.push({
        dir: i,
        instance: s,
        value: l,
        oldValue: void 0,
        arg: c,
        modifiers: _,
      });
  }
  return e;
}
function Ge(e, o, t, s) {
  const r = e.dirs,
    n = o && o.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    n && (l.oldValue = n[i].value);
    let c = l.dir[s];
    c && (So(), ye(c, t, 8, [e.el, l, e, o]), io());
  }
}
function xi() {
  return {
    app: null,
    config: {
      isNativeTag: Xi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let vn = 0;
function Cn(e, o) {
  return function (s, r = null) {
    r != null && !re(r) && (r = null);
    const n = xi(),
      i = new Set();
    let l = !1;
    const c = (n.app = {
      _uid: vn++,
      _component: s,
      _props: r,
      _container: null,
      _context: n,
      _instance: null,
      version: Yn,
      get config() {
        return n.config;
      },
      set config(_) {},
      use(_, ...v) {
        return (
          i.has(_) ||
            (_ && H(_.install)
              ? (i.add(_), _.install(c, ...v))
              : H(_) && (i.add(_), _(c, ...v))),
          c
        );
      },
      mixin(_) {
        return n.mixins.includes(_) || n.mixins.push(_), c;
      },
      component(_, v) {
        return v ? ((n.components[_] = v), c) : n.components[_];
      },
      directive(_, v) {
        return v ? ((n.directives[_] = v), c) : n.directives[_];
      },
      mount(_, v, k) {
        if (!l) {
          const b = Te(s, r);
          return (
            (b.appContext = n),
            v && o ? o(b, _) : e(b, _, k),
            (l = !0),
            (c._container = _),
            (_.__vue_app__ = c),
            as(b.component) || b.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(_, v) {
        return (n.provides[_] = v), c;
      },
    });
    return c;
  };
}
function Ot(e, o, t, s, r = !1) {
  if (V(e)) {
    e.forEach((b, $) => Ot(b, o && (V(o) ? o[$] : o), t, s, r));
    return;
  }
  if (Tt(s) && !r) return;
  const n = s.shapeFlag & 4 ? as(s.component) || s.component.proxy : s.el,
    i = r ? null : n,
    { i: l, r: c } = e,
    _ = o && o.r,
    v = l.refs === X ? (l.refs = {}) : l.refs,
    k = l.setupState;
  if (
    (_ != null &&
      _ !== c &&
      (de(_)
        ? ((v[_] = null), z(k, _) && (k[_] = null))
        : pe(_) && (_.value = null)),
    H(c))
  )
    He(c, l, 12, [i, v]);
  else {
    const b = de(c),
      $ = pe(c);
    if (b || $) {
      const D = () => {
        if (e.f) {
          const U = b ? v[c] : c.value;
          r
            ? V(U) && Bt(U, n)
            : V(U)
            ? U.includes(n) || U.push(n)
            : b
            ? (v[c] = [n])
            : ((c.value = [n]), e.k && (v[e.k] = c.value));
        } else
          b
            ? ((v[c] = i), z(k, c) && (k[c] = i))
            : pe(c) && ((c.value = i), e.k && (v[e.k] = i));
      };
      i ? ((D.id = -1), ge(D, t)) : D();
    }
  }
}
const ge = Ja;
function Sn(e) {
  return An(e);
}
function An(e, o) {
  const t = ia();
  t.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: n,
      createElement: i,
      createText: l,
      createComment: c,
      setText: _,
      setElementText: v,
      parentNode: k,
      nextSibling: b,
      setScopeId: $ = Ee,
      cloneNode: D,
      insertStaticContent: U,
    } = e,
    F = (
      d,
      m,
      g,
      S = null,
      C = null,
      x = null,
      T = !1,
      P = null,
      E = !!m.dynamicChildren
    ) => {
      if (d === m) return;
      d && !Ye(d, m) && ((S = Mo(d)), Ue(d, C, x, !0), (d = null)),
        m.patchFlag === -2 && ((E = !1), (m.dynamicChildren = null));
      const { type: A, ref: q, shapeFlag: I } = m;
      switch (A) {
        case ss:
          L(d, m, g, S);
          break;
        case Fe:
          ie(d, m, g, S);
          break;
        case Ho:
          d == null && Q(m, g, S, T);
          break;
        case N:
          De(d, m, g, S, C, x, T, P, E);
          break;
        default:
          I & 1
            ? le(d, m, g, S, C, x, T, P, E)
            : I & 6
            ? Fo(d, m, g, S, C, x, T, P, E)
            : (I & 64 || I & 128) && A.process(d, m, g, S, C, x, T, P, E, no);
      }
      q != null && C && Ot(q, d && d.ref, x, m || d, !m);
    },
    L = (d, m, g, S) => {
      if (d == null) s((m.el = l(m.children)), g, S);
      else {
        const C = (m.el = d.el);
        m.children !== d.children && _(C, m.children);
      }
    },
    ie = (d, m, g, S) => {
      d == null ? s((m.el = c(m.children || "")), g, S) : (m.el = d.el);
    },
    Q = (d, m, g, S) => {
      [d.el, d.anchor] = U(d.children, m, g, S);
    },
    J = ({ el: d, anchor: m }, g, S) => {
      let C;
      for (; d && d !== m; ) (C = b(d)), s(d, g, S), (d = C);
      s(m, g, S);
    },
    ee = ({ el: d, anchor: m }) => {
      let g;
      for (; d && d !== m; ) (g = b(d)), r(d), (d = g);
      r(m);
    },
    le = (d, m, g, S, C, x, T, P, E) => {
      (T = T || m.type === "svg"),
        d == null ? j(m, g, S, C, x, T, P, E) : he(d, m, C, x, T, P, E);
    },
    j = (d, m, g, S, C, x, T, P) => {
      let E, A;
      const {
        type: q,
        props: I,
        shapeFlag: M,
        transition: B,
        patchFlag: G,
        dirs: ae,
      } = d;
      if (d.el && D !== void 0 && G === -1) E = d.el = D(d.el);
      else {
        if (
          ((E = d.el = i(d.type, x, I && I.is, I)),
          M & 8
            ? v(E, d.children)
            : M & 16 &&
              Z(d.children, E, null, S, C, x && q !== "foreignObject", T, P),
          ae && Ge(d, null, S, "created"),
          I)
        ) {
          for (const se in I)
            se !== "value" &&
              !Bo(se) &&
              n(E, se, null, I[se], x, d.children, S, C, Me);
          "value" in I && n(E, "value", null, I.value),
            (A = I.onVnodeBeforeMount) && Ie(A, S, d);
        }
        oe(E, d, d.scopeId, T, S);
      }
      ae && Ge(d, null, S, "beforeMount");
      const Y = (!C || (C && !C.pendingBranch)) && B && !B.persisted;
      Y && B.beforeEnter(E),
        s(E, m, g),
        ((A = I && I.onVnodeMounted) || Y || ae) &&
          ge(() => {
            A && Ie(A, S, d), Y && B.enter(E), ae && Ge(d, null, S, "mounted");
          }, C);
    },
    oe = (d, m, g, S, C) => {
      if ((g && $(d, g), S)) for (let x = 0; x < S.length; x++) $(d, S[x]);
      if (C) {
        let x = C.subTree;
        if (m === x) {
          const T = C.vnode;
          oe(d, T, T.scopeId, T.slotScopeIds, C.parent);
        }
      }
    },
    Z = (d, m, g, S, C, x, T, P, E = 0) => {
      for (let A = E; A < d.length; A++) {
        const q = (d[A] = P ? je(d[A]) : $e(d[A]));
        F(null, q, m, g, S, C, x, T, P);
      }
    },
    he = (d, m, g, S, C, x, T) => {
      const P = (m.el = d.el);
      let { patchFlag: E, dynamicChildren: A, dirs: q } = m;
      E |= d.patchFlag & 16;
      const I = d.props || X,
        M = m.props || X;
      let B;
      g && Je(g, !1),
        (B = M.onVnodeBeforeUpdate) && Ie(B, g, m, d),
        q && Ge(m, d, g, "beforeUpdate"),
        g && Je(g, !0);
      const G = C && m.type !== "foreignObject";
      if (
        (A
          ? fe(d.dynamicChildren, A, P, g, S, G, x)
          : T || qe(d, m, P, null, g, S, G, x, !1),
        E > 0)
      ) {
        if (E & 16) be(P, m, I, M, g, S, C);
        else if (
          (E & 2 && I.class !== M.class && n(P, "class", null, M.class, C),
          E & 4 && n(P, "style", I.style, M.style, C),
          E & 8)
        ) {
          const ae = m.dynamicProps;
          for (let Y = 0; Y < ae.length; Y++) {
            const se = ae[Y],
              xe = I[se],
              ro = M[se];
            (ro !== xe || se === "value") &&
              n(P, se, xe, ro, C, d.children, g, S, Me);
          }
        }
        E & 1 && d.children !== m.children && v(P, m.children);
      } else !T && A == null && be(P, m, I, M, g, S, C);
      ((B = M.onVnodeUpdated) || q) &&
        ge(() => {
          B && Ie(B, g, m, d), q && Ge(m, d, g, "updated");
        }, S);
    },
    fe = (d, m, g, S, C, x, T) => {
      for (let P = 0; P < m.length; P++) {
        const E = d[P],
          A = m[P],
          q =
            E.el && (E.type === N || !Ye(E, A) || E.shapeFlag & 70)
              ? k(E.el)
              : g;
        F(E, A, q, null, S, C, x, T, !0);
      }
    },
    be = (d, m, g, S, C, x, T) => {
      if (g !== S) {
        for (const P in S) {
          if (Bo(P)) continue;
          const E = S[P],
            A = g[P];
          E !== A && P !== "value" && n(d, P, A, E, T, m.children, C, x, Me);
        }
        if (g !== X)
          for (const P in g)
            !Bo(P) && !(P in S) && n(d, P, g[P], null, T, m.children, C, x, Me);
        "value" in S && n(d, "value", g.value, S.value);
      }
    },
    De = (d, m, g, S, C, x, T, P, E) => {
      const A = (m.el = d ? d.el : l("")),
        q = (m.anchor = d ? d.anchor : l(""));
      let { patchFlag: I, dynamicChildren: M, slotScopeIds: B } = m;
      B && (P = P ? P.concat(B) : B),
        d == null
          ? (s(A, g, S), s(q, g, S), Z(m.children, g, q, C, x, T, P, E))
          : I > 0 && I & 64 && M && d.dynamicChildren
          ? (fe(d.dynamicChildren, M, g, C, x, T, P),
            (m.key != null || (C && m === C.subTree)) && Ei(d, m, !0))
          : qe(d, m, g, q, C, x, T, P, E);
    },
    Fo = (d, m, g, S, C, x, T, P, E) => {
      (m.slotScopeIds = P),
        d == null
          ? m.shapeFlag & 512
            ? C.ctx.activate(m, g, S, T, E)
            : qo(m, g, S, C, x, T, E)
          : _e(d, m, E);
    },
    qo = (d, m, g, S, C, x, T) => {
      const P = (d.component = Rn(d, S, C));
      if ((lt(d) && (P.ctx.renderer = no), Vn(P), P.asyncDep)) {
        if ((C && C.registerDep(P, ne), !d.el)) {
          const E = (P.subTree = Te(Fe));
          ie(null, E, m, g);
        }
        return;
      }
      ne(P, d, m, g, C, x, T);
    },
    _e = (d, m, g) => {
      const S = (m.component = d.component);
      if (Ha(d, m, g))
        if (S.asyncDep && !S.asyncResolved) {
          te(S, m, g);
          return;
        } else (S.next = m), Jn(S.update), S.update();
      else (m.component = d.component), (m.el = d.el), (S.vnode = m);
    },
    ne = (d, m, g, S, C, x, T) => {
      const P = () => {
          if (d.isMounted) {
            let { next: q, bu: I, u: M, parent: B, vnode: G } = d,
              ae = q,
              Y;
            Je(d, !1),
              q ? ((q.el = G.el), te(d, q, T)) : (q = G),
              I && jo(I),
              (Y = q.props && q.props.onVnodeBeforeUpdate) && Ie(Y, B, q, G),
              Je(d, !0);
            const se = _t(d),
              xe = d.subTree;
            (d.subTree = se),
              F(xe, se, k(xe.el), Mo(xe), d, C, x),
              (q.el = se.el),
              ae === null && Ka(d, se.el),
              M && ge(M, C),
              (Y = q.props && q.props.onVnodeUpdated) &&
                ge(() => Ie(Y, B, q, G), C);
          } else {
            let q;
            const { el: I, props: M } = m,
              { bm: B, m: G, parent: ae } = d,
              Y = Tt(m);
            if (
              (Je(d, !1),
              B && jo(B),
              !Y && (q = M && M.onVnodeBeforeMount) && Ie(q, ae, m),
              Je(d, !0),
              I && mt)
            ) {
              const se = () => {
                (d.subTree = _t(d)), mt(I, d.subTree, d, C, null);
              };
              Y
                ? m.type.__asyncLoader().then(() => !d.isUnmounted && se())
                : se();
            } else {
              const se = (d.subTree = _t(d));
              F(null, se, g, S, d, C, x), (m.el = se.el);
            }
            if ((G && ge(G, C), !Y && (q = M && M.onVnodeMounted))) {
              const se = m;
              ge(() => Ie(q, ae, se), C);
            }
            m.shapeFlag & 256 && d.a && ge(d.a, C),
              (d.isMounted = !0),
              (m = g = S = null);
          }
        },
        E = (d.effect = new Gt(P, () => qi(d.update), d.scope)),
        A = (d.update = E.run.bind(E));
      (A.id = d.uid), Je(d, !0), A();
    },
    te = (d, m, g) => {
      m.component = d;
      const S = d.vnode.props;
      (d.vnode = m),
        (d.next = null),
        pn(d, m.props, S, g),
        bn(d, m.children, g),
        So(),
        rs(void 0, d.update),
        io();
    },
    qe = (d, m, g, S, C, x, T, P, E = !1) => {
      const A = d && d.children,
        q = d ? d.shapeFlag : 0,
        I = m.children,
        { patchFlag: M, shapeFlag: B } = m;
      if (M > 0) {
        if (M & 128) {
          Ao(A, I, g, S, C, x, T, P, E);
          return;
        } else if (M & 256) {
          ht(A, I, g, S, C, x, T, P, E);
          return;
        }
      }
      B & 8
        ? (q & 16 && Me(A, C, x), I !== A && v(g, I))
        : q & 16
        ? B & 16
          ? Ao(A, I, g, S, C, x, T, P, E)
          : Me(A, C, x, !0)
        : (q & 8 && v(g, ""), B & 16 && Z(I, g, S, C, x, T, P, E));
    },
    ht = (d, m, g, S, C, x, T, P, E) => {
      (d = d || mo), (m = m || mo);
      const A = d.length,
        q = m.length,
        I = Math.min(A, q);
      let M;
      for (M = 0; M < I; M++) {
        const B = (m[M] = E ? je(m[M]) : $e(m[M]));
        F(d[M], B, g, null, C, x, T, P, E);
      }
      A > q ? Me(d, C, x, !0, !1, I) : Z(m, g, S, C, x, T, P, E, I);
    },
    Ao = (d, m, g, S, C, x, T, P, E) => {
      let A = 0;
      const q = m.length;
      let I = d.length - 1,
        M = q - 1;
      for (; A <= I && A <= M; ) {
        const B = d[A],
          G = (m[A] = E ? je(m[A]) : $e(m[A]));
        if (Ye(B, G)) F(B, G, g, null, C, x, T, P, E);
        else break;
        A++;
      }
      for (; A <= I && A <= M; ) {
        const B = d[I],
          G = (m[M] = E ? je(m[M]) : $e(m[M]));
        if (Ye(B, G)) F(B, G, g, null, C, x, T, P, E);
        else break;
        I--, M--;
      }
      if (A > I) {
        if (A <= M) {
          const B = M + 1,
            G = B < q ? m[B].el : S;
          for (; A <= M; )
            F(null, (m[A] = E ? je(m[A]) : $e(m[A])), g, G, C, x, T, P, E), A++;
        }
      } else if (A > M) for (; A <= I; ) Ue(d[A], C, x, !0), A++;
      else {
        const B = A,
          G = A,
          ae = new Map();
        for (A = G; A <= M; A++) {
          const ve = (m[A] = E ? je(m[A]) : $e(m[A]));
          ve.key != null && ae.set(ve.key, A);
        }
        let Y,
          se = 0;
        const xe = M - G + 1;
        let ro = !1,
          ds = 0;
        const ko = new Array(xe);
        for (A = 0; A < xe; A++) ko[A] = 0;
        for (A = B; A <= I; A++) {
          const ve = d[A];
          if (se >= xe) {
            Ue(ve, C, x, !0);
            continue;
          }
          let Ne;
          if (ve.key != null) Ne = ae.get(ve.key);
          else
            for (Y = G; Y <= M; Y++)
              if (ko[Y - G] === 0 && Ye(ve, m[Y])) {
                Ne = Y;
                break;
              }
          Ne === void 0
            ? Ue(ve, C, x, !0)
            : ((ko[Ne - G] = A + 1),
              Ne >= ds ? (ds = Ne) : (ro = !0),
              F(ve, m[Ne], g, null, C, x, T, P, E),
              se++);
        }
        const us = ro ? kn(ko) : mo;
        for (Y = us.length - 1, A = xe - 1; A >= 0; A--) {
          const ve = G + A,
            Ne = m[ve],
            hs = ve + 1 < q ? m[ve + 1].el : S;
          ko[A] === 0
            ? F(null, Ne, g, hs, C, x, T, P, E)
            : ro && (Y < 0 || A !== us[Y] ? ao(Ne, g, hs, 2) : Y--);
        }
      }
    },
    ao = (d, m, g, S, C = null) => {
      const { el: x, type: T, transition: P, children: E, shapeFlag: A } = d;
      if (A & 6) {
        ao(d.component.subTree, m, g, S);
        return;
      }
      if (A & 128) {
        d.suspense.move(m, g, S);
        return;
      }
      if (A & 64) {
        T.move(d, m, g, no);
        return;
      }
      if (T === N) {
        s(x, m, g);
        for (let I = 0; I < E.length; I++) ao(E[I], m, g, S);
        s(d.anchor, m, g);
        return;
      }
      if (T === Ho) {
        J(d, m, g);
        return;
      }
      if (S !== 2 && A & 1 && P)
        if (S === 0) P.beforeEnter(x), s(x, m, g), ge(() => P.enter(x), C);
        else {
          const { leave: I, delayLeave: M, afterLeave: B } = P,
            G = () => s(x, m, g),
            ae = () => {
              I(x, () => {
                G(), B && B();
              });
            };
          M ? M(x, G, ae) : ae();
        }
      else s(x, m, g);
    },
    Ue = (d, m, g, S = !1, C = !1) => {
      const {
        type: x,
        props: T,
        ref: P,
        children: E,
        dynamicChildren: A,
        shapeFlag: q,
        patchFlag: I,
        dirs: M,
      } = d;
      if ((P != null && Ot(P, null, g, d, !0), q & 256)) {
        m.ctx.deactivate(d);
        return;
      }
      const B = q & 1 && M,
        G = !Tt(d);
      let ae;
      if ((G && (ae = T && T.onVnodeBeforeUnmount) && Ie(ae, m, d), q & 6))
        Hi(d.component, g, S);
      else {
        if (q & 128) {
          d.suspense.unmount(g, S);
          return;
        }
        B && Ge(d, null, m, "beforeUnmount"),
          q & 64
            ? d.type.remove(d, m, g, C, no, S)
            : A && (x !== N || (I > 0 && I & 64))
            ? Me(A, m, g, !1, !0)
            : ((x === N && I & 384) || (!C && q & 16)) && Me(E, m, g),
          S && ls(d);
      }
      ((G && (ae = T && T.onVnodeUnmounted)) || B) &&
        ge(() => {
          ae && Ie(ae, m, d), B && Ge(d, null, m, "unmounted");
        }, g);
    },
    ls = (d) => {
      const { type: m, el: g, anchor: S, transition: C } = d;
      if (m === N) {
        ji(g, S);
        return;
      }
      if (m === Ho) {
        ee(d);
        return;
      }
      const x = () => {
        r(g), C && !C.persisted && C.afterLeave && C.afterLeave();
      };
      if (d.shapeFlag & 1 && C && !C.persisted) {
        const { leave: T, delayLeave: P } = C,
          E = () => T(g, x);
        P ? P(d.el, x, E) : E();
      } else x();
    },
    ji = (d, m) => {
      let g;
      for (; d !== m; ) (g = b(d)), r(d), (d = g);
      r(m);
    },
    Hi = (d, m, g) => {
      const { bum: S, scope: C, update: x, subTree: T, um: P } = d;
      S && jo(S),
        C.stop(),
        x && ((x.active = !1), Ue(T, d, m, g)),
        P && ge(P, m),
        ge(() => {
          d.isUnmounted = !0;
        }, m),
        m &&
          m.pendingBranch &&
          !m.isUnmounted &&
          d.asyncDep &&
          !d.asyncResolved &&
          d.suspenseId === m.pendingId &&
          (m.deps--, m.deps === 0 && m.resolve());
    },
    Me = (d, m, g, S = !1, C = !1, x = 0) => {
      for (let T = x; T < d.length; T++) Ue(d[T], m, g, S, C);
    },
    Mo = (d) =>
      d.shapeFlag & 6
        ? Mo(d.component.subTree)
        : d.shapeFlag & 128
        ? d.suspense.next()
        : b(d.anchor || d.el),
    cs = (d, m, g) => {
      d == null
        ? m._vnode && Ue(m._vnode, null, null, !0)
        : F(m._vnode || null, d, m, null, null, null, g),
        wi(),
        (m._vnode = d);
    },
    no = {
      p: F,
      um: Ue,
      m: ao,
      r: ls,
      mt: qo,
      mc: Z,
      pc: qe,
      pbc: fe,
      n: Mo,
      o: e,
    };
  let ft, mt;
  return (
    o && ([ft, mt] = o(no)), { render: cs, hydrate: ft, createApp: Cn(cs, ft) }
  );
}
function Je({ effect: e, update: o }, t) {
  e.allowRecurse = o.allowRecurse = t;
}
function Ei(e, o, t = !1) {
  const s = e.children,
    r = o.children;
  if (V(s) && V(r))
    for (let n = 0; n < s.length; n++) {
      const i = s[n];
      let l = r[n];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[n] = je(r[n])), (l.el = i.el)),
        t || Ei(i, l));
    }
}
function kn(e) {
  const o = e.slice(),
    t = [0];
  let s, r, n, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const _ = e[s];
    if (_ !== 0) {
      if (((r = t[t.length - 1]), e[r] < _)) {
        (o[s] = r), t.push(s);
        continue;
      }
      for (n = 0, i = t.length - 1; n < i; )
        (l = (n + i) >> 1), e[t[l]] < _ ? (n = l + 1) : (i = l);
      _ < e[t[n]] && (n > 0 && (o[s] = t[n - 1]), (t[n] = s));
    }
  }
  for (n = t.length, i = t[n - 1]; n-- > 0; ) (t[n] = i), (i = o[i]);
  return t;
}
const Pn = (e) => e.__isTeleport,
  Ti = "components";
function lo(e, o) {
  return xn(Ti, e, !0, o) || e;
}
const yn = Symbol();
function xn(e, o, t = !0, s = !1) {
  const r = Pe || ce;
  if (r) {
    const n = r.type;
    if (e === Ti) {
      const l = Bn(n);
      if (l && (l === o || l === Oe(o) || l === nt(Oe(o)))) return n;
    }
    const i = Ns(r[e] || n[e], o) || Ns(r.appContext[e], o);
    return !i && s ? n : i;
  }
}
function Ns(e, o) {
  return e && (e[o] || e[Oe(o)] || e[nt(Oe(o))]);
}
const N = Symbol(void 0),
  ss = Symbol(void 0),
  Fe = Symbol(void 0),
  Ho = Symbol(void 0),
  Eo = [];
let to = null;
function h(e = !1) {
  Eo.push((to = e ? null : []));
}
function En() {
  Eo.pop(), (to = Eo[Eo.length - 1] || null);
}
let Wo = 1;
function Is(e) {
  Wo += e;
}
function Ni(e) {
  return (
    (e.dynamicChildren = Wo > 0 ? to || mo : null),
    En(),
    Wo > 0 && to && to.push(e),
    e
  );
}
function f(e, o, t, s, r, n) {
  return Ni(a(e, o, t, s, r, n, !0));
}
function uo(e, o, t, s, r) {
  return Ni(Te(e, o, t, s, r, !0));
}
function Tn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ye(e, o) {
  return e.type === o.type && e.key === o.key;
}
const dt = "__vInternal",
  Ii = ({ key: e }) => (e != null ? e : null),
  Ko = ({ ref: e, ref_key: o, ref_for: t }) =>
    e != null
      ? de(e) || pe(e) || H(e)
        ? { i: Pe, r: e, k: o, f: !!t }
        : e
      : null;
function a(
  e,
  o = null,
  t = null,
  s = 0,
  r = null,
  n = e === N ? 0 : 1,
  i = !1,
  l = !1
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: o,
    key: o && Ii(o),
    ref: o && Ko(o),
    scopeId: hi,
    slotScopeIds: null,
    children: t,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: n,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    l
      ? (is(c, t), n & 128 && e.normalize(c))
      : t && (c.shapeFlag |= de(t) ? 8 : 16),
    Wo > 0 &&
      !i &&
      to &&
      (c.patchFlag > 0 || n & 6) &&
      c.patchFlag !== 32 &&
      to.push(c),
    c
  );
}
const Te = Nn;
function Nn(e, o = null, t = null, s = 0, r = null, n = !1) {
  if (((!e || e === yn) && (e = Fe), Tn(e))) {
    const l = bo(e, o, !0);
    return t && is(l, t), l;
  }
  if ((jn(e) && (e = e.__vccOpts), o)) {
    o = In(o);
    let { class: l, style: c } = o;
    l && !de(l) && (o.class = Ut(l)),
      re(c) && (ni(c) && !V(c) && (c = ue({}, c)), (o.style = Dt(c)));
  }
  const i = de(e) ? 1 : Ga(e) ? 128 : Pn(e) ? 64 : re(e) ? 4 : H(e) ? 2 : 0;
  return a(e, o, t, s, r, i, n, !0);
}
function In(e) {
  return e ? (ni(e) || dt in e ? ue({}, e) : e) : null;
}
function bo(e, o, t = !1) {
  const { props: s, ref: r, patchFlag: n, children: i } = e,
    l = o ? On(s || {}, o) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Ii(l),
    ref:
      o && o.ref ? (t && r ? (V(r) ? r.concat(Ko(o)) : [r, Ko(o)]) : Ko(o)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: o && e.type !== N ? (n === -1 ? 16 : n | 16) : n,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && bo(e.ssContent),
    ssFallback: e.ssFallback && bo(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function K(e = " ", o = 0) {
  return Te(ss, null, e, o);
}
function $n(e, o) {
  const t = Te(Ho, null, e);
  return (t.staticCount = o), t;
}
function y(e = "", o = !1) {
  return o ? (h(), uo(Fe, null, e)) : Te(Fe, null, e);
}
function $e(e) {
  return e == null || typeof e == "boolean"
    ? Te(Fe)
    : V(e)
    ? Te(N, null, e.slice())
    : typeof e == "object"
    ? je(e)
    : Te(ss, null, String(e));
}
function je(e) {
  return e.el === null || e.memo ? e : bo(e);
}
function is(e, o) {
  let t = 0;
  const { shapeFlag: s } = e;
  if (o == null) o = null;
  else if (V(o)) t = 16;
  else if (typeof o == "object")
    if (s & 65) {
      const r = o.default;
      r && (r._c && (r._d = !1), is(e, r()), r._c && (r._d = !0));
      return;
    } else {
      t = 32;
      const r = o._;
      !r && !(dt in o)
        ? (o._ctx = Pe)
        : r === 3 &&
          Pe &&
          (Pe.slots._ === 1 ? (o._ = 1) : ((o._ = 2), (e.patchFlag |= 1024)));
    }
  else
    H(o)
      ? ((o = { default: o, _ctx: Pe }), (t = 32))
      : ((o = String(o)), s & 64 ? ((t = 16), (o = [K(o)])) : (t = 8));
  (e.children = o), (e.shapeFlag |= t);
}
function On(...e) {
  const o = {};
  for (let t = 0; t < e.length; t++) {
    const s = e[t];
    for (const r in s)
      if (r === "class")
        o.class !== s.class && (o.class = Ut([o.class, s.class]));
      else if (r === "style") o.style = Dt([o.style, s.style]);
      else if (tt(r)) {
        const n = o[r],
          i = s[r];
        n !== i && !(V(n) && n.includes(i)) && (o[r] = n ? [].concat(n, i) : i);
      } else r !== "" && (o[r] = s[r]);
  }
  return o;
}
function Ie(e, o, t, s = null) {
  ye(e, o, 7, [t, s]);
}
function R(e, o, t, s) {
  let r;
  const n = t && t[s];
  if (V(e) || de(e)) {
    r = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      r[i] = o(e[i], i, void 0, n && n[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++) r[i] = o(i + 1, i, void 0, n && n[i]);
  } else if (re(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, l) => o(i, l, void 0, n && n[l]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const _ = i[l];
        r[l] = o(e[_], _, l, n && n[l]);
      }
    }
  else r = [];
  return t && (t[s] = r), r;
}
const Ft = (e) => (e ? ($i(e) ? as(e) || e.proxy : Ft(e.parent)) : null),
  Qo = ue(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ft(e.parent),
    $root: (e) => Ft(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Ci(e),
    $forceUpdate: (e) => () => qi(e.update),
    $nextTick: (e) => Kn.bind(e.proxy),
    $watch: (e) => Qn.bind(e),
  }),
  Fn = {
    get({ _: e }, o) {
      const {
        ctx: t,
        setupState: s,
        data: r,
        props: n,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let _;
      if (o[0] !== "$") {
        const $ = i[o];
        if ($ !== void 0)
          switch ($) {
            case 1:
              return s[o];
            case 2:
              return r[o];
            case 4:
              return t[o];
            case 3:
              return n[o];
          }
        else {
          if (s !== X && z(s, o)) return (i[o] = 1), s[o];
          if (r !== X && z(r, o)) return (i[o] = 2), r[o];
          if ((_ = e.propsOptions[0]) && z(_, o)) return (i[o] = 3), n[o];
          if (t !== X && z(t, o)) return (i[o] = 4), t[o];
          Nt && (i[o] = 0);
        }
      }
      const v = Qo[o];
      let k, b;
      if (v) return o === "$attrs" && Se(e, "get", o), v(e);
      if ((k = l.__cssModules) && (k = k[o])) return k;
      if (t !== X && z(t, o)) return (i[o] = 4), t[o];
      if (((b = c.config.globalProperties), z(b, o))) return b[o];
    },
    set({ _: e }, o, t) {
      const { data: s, setupState: r, ctx: n } = e;
      if (r !== X && z(r, o)) r[o] = t;
      else if (s !== X && z(s, o)) s[o] = t;
      else if (z(e.props, o)) return !1;
      return o[0] === "$" && o.slice(1) in e ? !1 : ((n[o] = t), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: o,
          accessCache: t,
          ctx: s,
          appContext: r,
          propsOptions: n,
        },
      },
      i
    ) {
      let l;
      return (
        !!t[i] ||
        (e !== X && z(e, i)) ||
        (o !== X && z(o, i)) ||
        ((l = n[0]) && z(l, i)) ||
        z(s, i) ||
        z(Qo, i) ||
        z(r.config.globalProperties, i)
      );
    },
  },
  qn = xi();
let Mn = 0;
function Rn(e, o, t) {
  const s = e.type,
    r = (o ? o.appContext : e.appContext) || qn,
    n = {
      uid: Mn++,
      vnode: e,
      type: s,
      parent: o,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new aa(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: o ? o.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ai(s, r),
      emitsOptions: ui(s, r),
      emit: null,
      emitted: null,
      propsDefaults: X,
      inheritAttrs: s.inheritAttrs,
      ctx: X,
      data: X,
      props: X,
      attrs: X,
      slots: X,
      refs: X,
      setupState: X,
      setupContext: null,
      suspense: t,
      suspenseId: t ? t.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (n.ctx = { _: n }),
    (n.root = o ? o.root : n),
    (n.emit = Ua.bind(null, n)),
    e.ce && e.ce(n),
    n
  );
}
let ce = null;
const wn = () => ce || Pe,
  vo = (e) => {
    (ce = e), e.scope.on();
  },
  so = () => {
    ce && ce.scope.off(), (ce = null);
  };
function $i(e) {
  return e.vnode.shapeFlag & 4;
}
let Yo = !1;
function Vn(e, o = !1) {
  Yo = o;
  const { props: t, children: s } = e.vnode,
    r = $i(e);
  mn(e, t, r, o), gn(e, s);
  const n = r ? Dn(e, o) : void 0;
  return (Yo = !1), n;
}
function Dn(e, o) {
  const t = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = ri(new Proxy(e.ctx, Fn)));
  const { setup: s } = t;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? Ln(e) : null);
    vo(e), So();
    const n = He(s, e, 0, [e.props, r]);
    if ((io(), so(), Gs(n))) {
      if ((n.then(so, so), o))
        return n
          .then((i) => {
            $s(e, i, o);
          })
          .catch((i) => {
            ut(i, e, 0);
          });
      e.asyncDep = n;
    } else $s(e, n, o);
  } else Oi(e, o);
}
function $s(e, o, t) {
  H(o)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = o)
      : (e.render = o)
    : re(o) && (e.setupState = di(o)),
    Oi(e, t);
}
let Os;
function Oi(e, o, t) {
  const s = e.type;
  if (!e.render) {
    if (!o && Os && !s.render) {
      const r = s.template;
      if (r) {
        const { isCustomElement: n, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = s,
          _ = ue(ue({ isCustomElement: n, delimiters: l }, i), c);
        s.render = Os(r, _);
      }
    }
    e.render = s.render || Ee;
  }
  vo(e), So(), cn(e), io(), so();
}
function Un(e) {
  return new Proxy(e.attrs, {
    get(o, t) {
      return Se(e, "get", "$attrs"), o[t];
    },
  });
}
function Ln(e) {
  const o = (s) => {
    e.exposed = s || {};
  };
  let t;
  return {
    get attrs() {
      return t || (t = Un(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: o,
  };
}
function as(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(di(ri(e.exposed)), {
        get(o, t) {
          if (t in o) return o[t];
          if (t in Qo) return Qo[t](e);
        },
      }))
    );
}
function Bn(e) {
  return (H(e) && e.displayName) || e.name;
}
function jn(e) {
  return H(e) && "__vccOpts" in e;
}
function He(e, o, t, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (n) {
    ut(n, o, t);
  }
  return r;
}
function ye(e, o, t, s) {
  if (H(e)) {
    const n = He(e, o, t, s);
    return (
      n &&
        Gs(n) &&
        n.catch((i) => {
          ut(i, o, t);
        }),
      n
    );
  }
  const r = [];
  for (let n = 0; n < e.length; n++) r.push(ye(e[n], o, t, s));
  return r;
}
function ut(e, o, t, s = !0) {
  const r = o ? o.vnode : null;
  if (o) {
    let n = o.parent;
    const i = o.proxy,
      l = t;
    for (; n; ) {
      const _ = n.ec;
      if (_) {
        for (let v = 0; v < _.length; v++) if (_[v](e, i, l) === !1) return;
      }
      n = n.parent;
    }
    const c = o.appContext.config.errorHandler;
    if (c) {
      He(c, null, 10, [e, i, l]);
      return;
    }
  }
  Hn(e, t, r, s);
}
function Hn(e, o, t, s = !0) {
  console.error(e);
}
let Xo = !1,
  qt = !1;
const Ce = [];
let Re = 0;
const To = [];
let xo = null,
  ho = 0;
const No = [];
let Be = null,
  fo = 0;
const Fi = Promise.resolve();
let ns = null,
  Mt = null;
function Kn(e) {
  const o = ns || Fi;
  return e ? o.then(this ? e.bind(this) : e) : o;
}
function Gn(e) {
  let o = Re + 1,
    t = Ce.length;
  for (; o < t; ) {
    const s = (o + t) >>> 1;
    Oo(Ce[s]) < e ? (o = s + 1) : (t = s);
  }
  return o;
}
function qi(e) {
  (!Ce.length || !Ce.includes(e, Xo && e.allowRecurse ? Re + 1 : Re)) &&
    e !== Mt &&
    (e.id == null ? Ce.push(e) : Ce.splice(Gn(e.id), 0, e), Mi());
}
function Mi() {
  !Xo && !qt && ((qt = !0), (ns = Fi.then(Vi)));
}
function Jn(e) {
  const o = Ce.indexOf(e);
  o > Re && Ce.splice(o, 1);
}
function Ri(e, o, t, s) {
  V(e)
    ? t.push(...e)
    : (!o || !o.includes(e, e.allowRecurse ? s + 1 : s)) && t.push(e),
    Mi();
}
function zn(e) {
  Ri(e, xo, To, ho);
}
function Wn(e) {
  Ri(e, Be, No, fo);
}
function rs(e, o = null) {
  if (To.length) {
    for (
      Mt = o, xo = [...new Set(To)], To.length = 0, ho = 0;
      ho < xo.length;
      ho++
    )
      xo[ho]();
    (xo = null), (ho = 0), (Mt = null), rs(e, o);
  }
}
function wi(e) {
  if (No.length) {
    const o = [...new Set(No)];
    if (((No.length = 0), Be)) {
      Be.push(...o);
      return;
    }
    for (Be = o, Be.sort((t, s) => Oo(t) - Oo(s)), fo = 0; fo < Be.length; fo++)
      Be[fo]();
    (Be = null), (fo = 0);
  }
}
const Oo = (e) => (e.id == null ? 1 / 0 : e.id);
function Vi(e) {
  (qt = !1), (Xo = !0), rs(e), Ce.sort((t, s) => Oo(t) - Oo(s));
  const o = Ee;
  try {
    for (Re = 0; Re < Ce.length; Re++) {
      const t = Ce[Re];
      t && t.active !== !1 && He(t, null, 14);
    }
  } finally {
    (Re = 0),
      (Ce.length = 0),
      wi(),
      (Xo = !1),
      (ns = null),
      (Ce.length || To.length || No.length) && Vi(e);
  }
}
const Fs = {};
function vt(e, o, t) {
  return Di(e, o, t);
}
function Di(
  e,
  o,
  { immediate: t, deep: s, flush: r, onTrack: n, onTrigger: i } = X
) {
  const l = ce;
  let c,
    _ = !1,
    v = !1;
  if (
    (pe(e)
      ? ((c = () => e.value), (_ = !!e._shallow))
      : _o(e)
      ? ((c = () => e), (s = !0))
      : V(e)
      ? ((v = !0),
        (_ = e.some(_o)),
        (c = () =>
          e.map((L) => {
            if (pe(L)) return L.value;
            if (_o(L)) return Ze(L);
            if (H(L)) return He(L, l, 2);
          })))
      : H(e)
      ? o
        ? (c = () => He(e, l, 2))
        : (c = () => {
            if (!(l && l.isUnmounted)) return k && k(), ye(e, l, 3, [b]);
          })
      : (c = Ee),
    o && s)
  ) {
    const L = c;
    c = () => Ze(L());
  }
  let k,
    b = (L) => {
      k = F.onStop = () => {
        He(L, l, 4);
      };
    };
  if (Yo)
    return (b = Ee), o ? t && ye(o, l, 3, [c(), v ? [] : void 0, b]) : c(), Ee;
  let $ = v ? [] : Fs;
  const D = () => {
    if (!!F.active)
      if (o) {
        const L = F.run();
        (s || _ || (v ? L.some((ie, Q) => Io(ie, $[Q])) : Io(L, $))) &&
          (k && k(), ye(o, l, 3, [L, $ === Fs ? void 0 : $, b]), ($ = L));
      } else F.run();
  };
  D.allowRecurse = !!o;
  let U;
  r === "sync"
    ? (U = D)
    : r === "post"
    ? (U = () => ge(D, l && l.suspense))
    : (U = () => {
        !l || l.isMounted ? zn(D) : D();
      });
  const F = new Gt(c, U);
  return (
    o
      ? t
        ? D()
        : ($ = F.run())
      : r === "post"
      ? ge(F.run.bind(F), l && l.suspense)
      : F.run(),
    () => {
      F.stop(), l && l.scope && Bt(l.scope.effects, F);
    }
  );
}
function Qn(e, o, t) {
  const s = this.proxy,
    r = de(e) ? (e.includes(".") ? Ui(s, e) : () => s[e]) : e.bind(s, s);
  let n;
  H(o) ? (n = o) : ((n = o.handler), (t = o));
  const i = ce;
  vo(this);
  const l = Di(r, n.bind(s), t);
  return i ? vo(i) : so(), l;
}
function Ui(e, o) {
  const t = o.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < t.length && s; r++) s = s[t[r]];
    return s;
  };
}
function Ze(e, o) {
  if (!re(e) || e.__v_skip || ((o = o || new Set()), o.has(e))) return e;
  if ((o.add(e), pe(e))) Ze(e.value, o);
  else if (V(e)) for (let t = 0; t < e.length; t++) Ze(e[t], o);
  else if (st(e) || po(e))
    e.forEach((t) => {
      Ze(t, o);
    });
  else if (zs(e)) for (const t in e) Ze(e[t], o);
  return e;
}
const Yn = "3.2.25",
  Xn = "http://www.w3.org/2000/svg",
  co = typeof document != "undefined" ? document : null,
  qs = new Map(),
  Zn = {
    insert: (e, o, t) => {
      o.insertBefore(e, t || null);
    },
    remove: (e) => {
      const o = e.parentNode;
      o && o.removeChild(e);
    },
    createElement: (e, o, t, s) => {
      const r = o
        ? co.createElementNS(Xn, e)
        : co.createElement(e, t ? { is: t } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => co.createTextNode(e),
    createComment: (e) => co.createComment(e),
    setText: (e, o) => {
      e.nodeValue = o;
    },
    setElementText: (e, o) => {
      e.textContent = o;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => co.querySelector(e),
    setScopeId(e, o) {
      e.setAttribute(o, "");
    },
    cloneNode(e) {
      const o = e.cloneNode(!0);
      return "_value" in e && (o._value = e._value), o;
    },
    insertStaticContent(e, o, t, s) {
      const r = t ? t.previousSibling : o.lastChild;
      let n = qs.get(e);
      if (!n) {
        const i = co.createElement("template");
        if (((i.innerHTML = s ? `<svg>${e}</svg>` : e), (n = i.content), s)) {
          const l = n.firstChild;
          for (; l.firstChild; ) n.appendChild(l.firstChild);
          n.removeChild(l);
        }
        qs.set(e, n);
      }
      return (
        o.insertBefore(n.cloneNode(!0), t),
        [r ? r.nextSibling : o.firstChild, t ? t.previousSibling : o.lastChild]
      );
    },
  };
function er(e, o, t) {
  const s = e._vtc;
  s && (o = (o ? [o, ...s] : [...s]).join(" ")),
    o == null
      ? e.removeAttribute("class")
      : t
      ? e.setAttribute("class", o)
      : (e.className = o);
}
function or(e, o, t) {
  const s = e.style,
    r = de(t);
  if (t && !r) {
    for (const n in t) Rt(s, n, t[n]);
    if (o && !de(o)) for (const n in o) t[n] == null && Rt(s, n, "");
  } else {
    const n = s.display;
    r ? o !== t && (s.cssText = t) : o && e.removeAttribute("style"),
      "_vod" in e && (s.display = n);
  }
}
const Ms = /\s*!important$/;
function Rt(e, o, t) {
  if (V(t)) t.forEach((s) => Rt(e, o, s));
  else if (o.startsWith("--")) e.setProperty(o, t);
  else {
    const s = tr(e, o);
    Ms.test(t)
      ? e.setProperty(Co(s), t.replace(Ms, ""), "important")
      : (e[s] = t);
  }
}
const Rs = ["Webkit", "Moz", "ms"],
  Ct = {};
function tr(e, o) {
  const t = Ct[o];
  if (t) return t;
  let s = Oe(o);
  if (s !== "filter" && s in e) return (Ct[o] = s);
  s = nt(s);
  for (let r = 0; r < Rs.length; r++) {
    const n = Rs[r] + s;
    if (n in e) return (Ct[o] = n);
  }
  return o;
}
const ws = "http://www.w3.org/1999/xlink";
function sr(e, o, t, s, r) {
  if (s && o.startsWith("xlink:"))
    t == null
      ? e.removeAttributeNS(ws, o.slice(6, o.length))
      : e.setAttributeNS(ws, o, t);
  else {
    const n = Ji(o);
    t == null || (n && !js(t))
      ? e.removeAttribute(o)
      : e.setAttribute(o, n ? "" : t);
  }
}
function ir(e, o, t, s, r, n, i) {
  if (o === "innerHTML" || o === "textContent") {
    s && i(s, r, n), (e[o] = t == null ? "" : t);
    return;
  }
  if (o === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = t;
    const l = t == null ? "" : t;
    (e.value !== l || e.tagName === "OPTION") && (e.value = l),
      t == null && e.removeAttribute(o);
    return;
  }
  if (t === "" || t == null) {
    const l = typeof e[o];
    if (l === "boolean") {
      e[o] = js(t);
      return;
    } else if (t == null && l === "string") {
      (e[o] = ""), e.removeAttribute(o);
      return;
    } else if (l === "number") {
      try {
        e[o] = 0;
      } catch {}
      e.removeAttribute(o);
      return;
    }
  }
  try {
    e[o] = t;
  } catch {}
}
let Zo = Date.now,
  Li = !1;
if (typeof window != "undefined") {
  Zo() > document.createEvent("Event").timeStamp &&
    (Zo = () => performance.now());
  const e = navigator.userAgent.match(/firefox\/(\d+)/i);
  Li = !!(e && Number(e[1]) <= 53);
}
let wt = 0;
const ar = Promise.resolve(),
  nr = () => {
    wt = 0;
  },
  rr = () => wt || (ar.then(nr), (wt = Zo()));
function Xe(e, o, t, s) {
  e.addEventListener(o, t, s);
}
function lr(e, o, t, s) {
  e.removeEventListener(o, t, s);
}
function cr(e, o, t, s, r = null) {
  const n = e._vei || (e._vei = {}),
    i = n[o];
  if (s && i) i.value = s;
  else {
    const [l, c] = dr(o);
    if (s) {
      const _ = (n[o] = ur(s, r));
      Xe(e, l, _, c);
    } else i && (lr(e, l, i, c), (n[o] = void 0));
  }
}
const Vs = /(?:Once|Passive|Capture)$/;
function dr(e) {
  let o;
  if (Vs.test(e)) {
    o = {};
    let t;
    for (; (t = e.match(Vs)); )
      (e = e.slice(0, e.length - t[0].length)), (o[t[0].toLowerCase()] = !0);
  }
  return [Co(e.slice(2)), o];
}
function ur(e, o) {
  const t = (s) => {
    const r = s.timeStamp || Zo();
    (Li || r >= t.attached - 1) && ye(hr(s, t.value), o, 5, [s]);
  };
  return (t.value = e), (t.attached = rr()), t;
}
function hr(e, o) {
  if (V(o)) {
    const t = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        t.call(e), (e._stopped = !0);
      }),
      o.map((s) => (r) => !r._stopped && s(r))
    );
  } else return o;
}
const Ds = /^on[a-z]/,
  fr = (e, o, t, s, r = !1, n, i, l, c) => {
    o === "class"
      ? er(e, s, r)
      : o === "style"
      ? or(e, t, s)
      : tt(o)
      ? Lt(o) || cr(e, o, t, s, i)
      : (
          o[0] === "."
            ? ((o = o.slice(1)), !0)
            : o[0] === "^"
            ? ((o = o.slice(1)), !1)
            : mr(e, o, s, r)
        )
      ? ir(e, o, s, n, i, l, c)
      : (o === "true-value"
          ? (e._trueValue = s)
          : o === "false-value" && (e._falseValue = s),
        sr(e, o, s, r));
  };
function mr(e, o, t, s) {
  return s
    ? !!(
        o === "innerHTML" ||
        o === "textContent" ||
        (o in e && Ds.test(o) && H(t))
      )
    : o === "spellcheck" ||
      o === "draggable" ||
      o === "form" ||
      (o === "list" && e.tagName === "INPUT") ||
      (o === "type" && e.tagName === "TEXTAREA") ||
      (Ds.test(o) && de(t))
    ? !1
    : o in e;
}
const pr = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Ya.props;
const et = (e) => {
  const o = e.props["onUpdate:modelValue"];
  return V(o) ? (t) => jo(o, t) : o;
};
function _r(e) {
  e.target.composing = !0;
}
function Us(e) {
  const o = e.target;
  o.composing && ((o.composing = !1), gr(o, "input"));
}
function gr(e, o) {
  const t = document.createEvent("HTMLEvents");
  t.initEvent(o, !0, !0), e.dispatchEvent(t);
}
const ze = {
    created(e, { modifiers: { lazy: o, trim: t, number: s } }, r) {
      e._assign = et(r);
      const n = s || (r.props && r.props.type === "number");
      Xe(e, o ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        t ? (l = l.trim()) : n && (l = St(l)), e._assign(l);
      }),
        t &&
          Xe(e, "change", () => {
            e.value = e.value.trim();
          }),
        o ||
          (Xe(e, "compositionstart", _r),
          Xe(e, "compositionend", Us),
          Xe(e, "change", Us));
    },
    mounted(e, { value: o }) {
      e.value = o == null ? "" : o;
    },
    beforeUpdate(
      e,
      { value: o, modifiers: { lazy: t, trim: s, number: r } },
      n
    ) {
      if (
        ((e._assign = et(n)),
        e.composing ||
          (document.activeElement === e &&
            (t ||
              (s && e.value.trim() === o) ||
              ((r || e.type === "number") && St(e.value) === o))))
      )
        return;
      const i = o == null ? "" : o;
      e.value !== i && (e.value = i);
    },
  },
  w = {
    deep: !0,
    created(e, o, t) {
      (e._assign = et(t)),
        Xe(e, "change", () => {
          const s = e._modelValue,
            r = br(e),
            n = e.checked,
            i = e._assign;
          if (V(s)) {
            const l = Hs(s, r),
              c = l !== -1;
            if (n && !c) i(s.concat(r));
            else if (!n && c) {
              const _ = [...s];
              _.splice(l, 1), i(_);
            }
          } else if (st(s)) {
            const l = new Set(s);
            n ? l.add(r) : l.delete(r), i(l);
          } else i(Bi(e, n));
        });
    },
    mounted: Ls,
    beforeUpdate(e, o, t) {
      (e._assign = et(t)), Ls(e, o, t);
    },
  };
function Ls(e, { value: o, oldValue: t }, s) {
  (e._modelValue = o),
    V(o)
      ? (e.checked = Hs(o, s.props.value) > -1)
      : st(o)
      ? (e.checked = o.has(s.props.value))
      : o !== t && (e.checked = ot(o, Bi(e, !0)));
}
function br(e) {
  return "_value" in e ? e._value : e.value;
}
function Bi(e, o) {
  const t = o ? "_trueValue" : "_falseValue";
  return t in e ? e[t] : o;
}
const vr = ue({ patchProp: fr }, Zn);
let Bs;
function Cr() {
  return Bs || (Bs = Sn(vr));
}
const Sr = (...e) => {
  const o = Cr().createApp(...e),
    { mount: t } = o;
  return (
    (o.mount = (s) => {
      const r = Ar(s);
      if (!r) return;
      const n = o._component;
      !H(n) && !n.render && !n.template && (n.template = r.innerHTML),
        (r.innerHTML = "");
      const i = t(r, !1, r instanceof SVGElement);
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    o
  );
};
function Ar(e) {
  return de(e) ? document.querySelector(e) : e;
}
var Ae = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [s, r] of o) t[s] = r;
  return t;
};
const kr = {
    emits: ["selecionarItem"],
    setup() {
      return {
        categorias: u([
          { nome: "A\xC7A\xCD", img: "acai.webp" },
          { nome: "SORVETE", img: "sorvete.webp" },
          { nome: "MILKSHAKE", img: "milkshake.webp" },
          { nome: "VITAMINA DE A\xC7A\xCD", img: "vitamina.webp" },
        ]),
      };
    },
    methods: {
      selecionarItem(e) {
        this.$emit("selecionarItem", e);
      },
    },
  },
  Pr = { id: "imgEtitulo" },
  yr = { id: "titulo" },
  xr = ["src"],
  Er = { class: "menu" },
  Tr = { id: "ck-button" },
  Nr = ["onClick"],
  Ir = a("span", { id: "burger" }, "Selecionar", -1);
function $r(e, o, t, s, r, n) {
  return (
    h(!0),
    f(
      N,
      null,
      R(
        s.categorias,
        (i, l) => (
          h(),
          f("div", { id: "selecionar", key: i }, [
            a("div", Pr, [
              a("h2", yr, p(i.nome), 1),
              a(
                "img",
                { class: "swing", id: "imgcomida", src: i.img },
                null,
                8,
                xr
              ),
            ]),
            a("div", Er, [
              a("div", Tr, [
                a("label", null, [
                  a(
                    "input",
                    {
                      onClick: (c) => n.selecionarItem(l),
                      class: "burger1",
                      type: "checkbox",
                    },
                    null,
                    8,
                    Nr
                  ),
                  Ir,
                ]),
              ]),
            ]),
          ])
        )
      ),
      128
    )
  );
}
var Or = Ae(kr, [["render", $r]]);
const Fr = {},
  qr = { class: "rodape" },
  Mr = $n(
    ' R. Dr. Gaspar de Oliveira - Populares <br><br> Ao lado da POPfarma <br><br> Delivery at\xE9 1:00 da Manh\xE3 <br><br><a href="https://instagram.com/acaidopinguimlimoeiro?igshid=YmMyMTA2M2Y=" class="fa fa-lg fa-instagram"></a><a href="https://instagram.com/acaidopinguimlimoeiro?igshid=YmMyMTA2M2Y="> @acaidopinguimlimoeiro </a><br><br><a href="https://api.whatsapp.com/send?phone=5588996320889" class="fab fa-whatsapp"></a><a href="https://api.whatsapp.com/send?phone=5588996320889"> (88) 9 9632-0889 </a><br><br> Criado e desenvolvido por <a id="nomeDev" href="https://www.instagram.com/wesleyj.dev/?hl=pt-br"> Wesley Jonatha </a><br><br>',
    21
  ),
  Rr = [Mr];
function wr(e, o) {
  return h(), f("div", qr, Rr);
}
var Vr = Ae(Fr, [["render", wr]]);
const Dr = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u(0),
        t = u([]),
        s = u([!0, !0, !0, !0]),
        r = u([!0, !0, !0]),
        n = u([
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
        ]),
        i = u([!0, !0, !0, !0, !0, !0]),
        l = u([!0, !0, !0, !0]),
        c = u([!0, !0, !0, !0, !0, !0, !0, !0, !0]),
        _ = u([!0, !0, !0, !0, !0, !0]),
        v = u([
          {
            nome: "200ML - R$ 7,00",
            descricao: " ENTREGA 1 REAL",
            preco: 7.0,
            quantidade: 0,
            id: 8,
            hash: "",
            selecionados: [],
          },
          {
            nome: "300ML - R$ 10,50",
            descricao: " ENTREGA 1 REAL",
            preco: 10.5,
            quantidade: 0,
            id: 8,
            hash: "",
            selecionados: [],
          },
          {
            nome: "500ML - R$ 17,50",
            descricao: "ENTREGA GR\xC1TIS",
            preco: 17.5,
            quantidade: 0,
            id: 8,
            hash: "",
            selecionados: [],
          },
          {
            nome: "750ML - R$ 26,00",
            descricao: "ENTREGA GR\xC1TIS",
            preco: 26,
            quantidade: 0,
            id: 8,
            hash: "",
            selecionados: [],
          },
        ]),
        k = u([
          {
            nome: "Chocolate",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Morango",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Bombom",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Ovomaltine",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Doce de Leite",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Brigadeiro",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Prest\xEDgio",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Flocos",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Napolitano",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
        ]),
        b = u([
          { nome: "Chocoball", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Canudos", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Casquinha", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Amendoim", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Leite em p\xF3", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Ovomaltine", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Chocopower", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Marshmallow", preco: 0, id: 3, descricao: "gr\xE1tis" },
          {
            nome: "Gotas de chocolate",
            preco: 0,
            id: 3,
            descricao: "gr\xE1tis",
          },
          { nome: "Cereja", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Pa\xE7oca", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "MM's", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Granola", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Jujuba", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Castanha", preco: 20, id: 3, descricao: "gr\xE1tis" },
          {
            nome: "Gotas de Chocolate",
            preco: 20,
            id: 3,
            descricao: "gr\xE1tis",
          },
          {
            nome: "Farinha L\xE1cta",
            preco: 20,
            id: 3,
            descricao: "gr\xE1tis",
          },
          { nome: "Granulado", preco: 20, id: 3, descricao: "gr\xE1tis" },
        ]),
        $ = u([
          { nome: "Abacaxi", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Kiwi", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Banana", preco: 20, id: 4, descricao: "gr\xE1tis" },
        ]),
        D = u([
          { nome: "Maracuj\xE1", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Chocolate", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Uva", preco: 20, id: 5, descricao: "gr\xE1tis" },
          { nome: "Tutti-Frutti", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Frutas Vermelhas", preco: 0, id: 5, descricao: "gr\xE1tis" },
        ]),
        U = u([
          {
            nome: "Calda Cookies Branco",
            preco: 0,
            id: 6,
            descricao: "gr\xE1tis",
          },
          {
            nome: "Leite Condensado",
            preco: 20,
            id: 6,
            descricao: "gr\xE1tis",
          },
          { nome: "Calda M\xE1gica", preco: 20, id: 6, descricao: "gr\xE1tis" },
        ]),
        F = u([
          { nome: "Ninho", preco: 0, id: 7, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 20, id: 7, descricao: "gr\xE1tis" },
          { nome: "\xD3reo", preco: 20, id: 7, descricao: "gr\xE1tis" },
          { nome: "Energ\xE9tico", preco: 20, id: 7, descricao: "gr\xE1tis" },
          { nome: "Ovomaltine", preco: 20, id: 7, descricao: "gr\xE1tis" },
          { nome: "Cupua\xE7u", preco: 20, id: 7, descricao: "gr\xE1tis" },
        ]),
        L = u([]),
        ie = u([]),
        Q = u([]),
        J = u([]),
        ee = u([]),
        le = u([]),
        j = u([]);
      return {
        cremes: F,
        Creme: j,
        CremesSelecionado: i,
        Caldas: le,
        caldaSelecionado: r,
        caldas: U,
        Peso: ee,
        AcaiSelecionado: c,
        CoberturaSelecionado: _,
        Cobertura: Q,
        FrutasSelecionado: l,
        Guloseimas: L,
        GuloseimasSelecionado: n,
        coberturas: D,
        pesoSelecionado: s,
        frutas: $,
        pesos: v,
        Frutas: ie,
        adicionais: b,
        valorAtual: o,
        acais: k,
        pedido: t,
        Acai: J,
      };
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      receberPedido() {
        this.$emit(
          "receberPedido",
          this.Peso[0],
          this.Acai,
          this.Guloseimas,
          this.Frutas,
          this.Caldas,
          this.Cobertura,
          this.Creme
        ),
          (this.Peso = []),
          (this.Acai = []),
          (this.Guloseimas = []),
          (this.Frutas = []),
          (this.Caldas = []),
          (this.Cobertura = []),
          (this.Creme = []);
      },
    },
    watch: {
      Peso(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.pesoSelecionado.length; t++)
            this.pesoSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.pesoSelecionado.length; t++)
            this.pesos[t].nome != e[0].nome && (this.pesoSelecionado[t] = !1);
      },
      Acai(e, o) {
        if (e.length < 4 && e.length != 0)
          for (var t = 0; t < this.AcaiSelecionado.length; t++)
            this.acais[t].nome != e[0].nome && (this.AcaiSelecionado[t] = !0);
        if (e.length == 4)
          for (var t = 0; t < this.AcaiSelecionado.length; t++)
            this.acais[t].nome != e[0].nome &&
              this.acais[t].nome != e[1].nome &&
              this.acais[t].nome != e[2].nome &&
              this.acais[t].nome != e[3].nome &&
              (this.AcaiSelecionado[t] = !1);
      },
      Creme(e, o) {
        if (e.length < 2 && e.length != 0)
          for (var t = 0; t < this.CremesSelecionado.length; t++)
            this.cremes[t].nome != e[0].nome &&
              (this.CremesSelecionado[t] = !0);
        if (e.length == 2)
          for (var t = 0; t < this.CremesSelecionado.length; t++)
            this.cremes[t].nome != e[0].nome &&
              this.cremes[t].nome != e[1].nome &&
              (this.CremesSelecionado[t] = !1);
      },
      Caldas(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.caldaSelecionado.length; t++)
            this.caldaSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.caldaSelecionado.length; t++)
            this.caldas[t].nome != e[0].nome && (this.caldaSelecionado[t] = !1);
      },
      Guloseimas(e, o) {
        if (e.length < 7 && e.length != 0)
          for (var t = 0; t < this.GuloseimasSelecionado.length; t++)
            this.adicionais[t].nome != e[0].nome &&
              (this.GuloseimasSelecionado[t] = !0);
        if (e.length == 7) {
          console.log(this.adicionais[0].nome, e[0].nome);
          for (var t = 0; t < this.GuloseimasSelecionado.length; t++)
            this.adicionais[t].nome != e[0].nome &&
              this.adicionais[t].nome != e[1].nome &&
              this.adicionais[t].nome != e[2].nome &&
              this.adicionais[t].nome != e[3].nome &&
              this.adicionais[t].nome != e[4].nome &&
              this.adicionais[t].nome != e[5].nome &&
              this.adicionais[t].nome != e[6].nome &&
              (this.GuloseimasSelecionado[t] = !1);
        }
      },
      Frutas(e, o) {
        if (e.length < 3 && e.length != 0)
          for (var t = 0; t < this.FrutasSelecionado.length; t++)
            this.frutas[t].nome != e[0].nome &&
              (this.FrutasSelecionado[t] = !0);
        if (e.length == 3)
          for (var t = 0; t < this.FrutasSelecionado.length; t++)
            this.frutas[t].nome != e[0].nome &&
              this.frutas[t].nome != e[1].nome &&
              this.frutas[t].nome != e[2].nome &&
              (this.FrutasSelecionado[t] = !1);
      },
      Cobertura(e, o) {
        if (e.length < 4 && e.length != 0)
          for (var t = 0; t < this.CoberturaSelecionado.length; t++)
            this.coberturas[t].nome != e[0].nome &&
              (this.CoberturaSelecionado[t] = !0);
        if (e.length == 4)
          for (var t = 0; t < this.CoberturaSelecionado.length; t++)
            this.coberturas[t].nome != e[0].nome &&
              this.coberturas[t].nome != e[1].nome &&
              this.coberturas[t].nome != e[2].nome &&
              this.coberturas[t].nome != e[3].nome &&
              (this.CoberturaSelecionado[t] = !1);
      },
    },
  },
  Ur = { class: "Categoria" },
  Lr = a("strong", { id: "categoria" }, "ESCOLHA:", -1),
  Br = { key: 0 },
  jr = { class: "container-checkbox", id: "textoPreco3" },
  Hr = ["value"],
  Kr = a("span", { class: "checkmark" }, null, -1),
  Gr = { style: { "pointer-events": "none" }, for: "adicional" },
  Jr = { id: "preco" },
  zr = a("br", null, null, -1),
  Wr = a("br", null, null, -1),
  Qr = a("strong", { id: "categoria" }, "SORVETES:", -1),
  Yr = { key: 0 },
  Xr = { class: "container-checkbox", id: "textoPreco3" },
  Zr = ["value"],
  el = a("span", { class: "checkmark" }, null, -1),
  ol = { style: { "pointer-events": "none" }, for: "adicional" },
  tl = { id: "preco" },
  sl = a("br", null, null, -1),
  il = a("br", null, null, -1),
  al = a("strong", { id: "categoria" }, "GULOSEIMAS:", -1),
  nl = { key: 0 },
  rl = { class: "container-checkbox", id: "textoPreco3" },
  ll = ["value"],
  cl = a("span", { class: "checkmark" }, null, -1),
  dl = { style: { "pointer-events": "none" }, for: "adicional" },
  ul = { id: "preco" },
  hl = a("br", null, null, -1),
  fl = a("br", null, null, -1),
  ml = a("strong", { id: "categoria" }, "FRUTAS:", -1),
  pl = { key: 0 },
  _l = { class: "container-checkbox", id: "textoPreco3" },
  gl = ["value"],
  bl = a("span", { class: "checkmark" }, null, -1),
  vl = { style: { "pointer-events": "none" }, for: "fruta" },
  Cl = { id: "preco" },
  Sl = a("br", null, null, -1),
  Al = a("br", null, null, -1),
  kl = a("strong", { id: "categoria" }, "CALDAS:", -1),
  Pl = { key: 0 },
  yl = { class: "container-checkbox", id: "textoPreco3" },
  xl = ["value"],
  El = a("span", { class: "checkmark" }, null, -1),
  Tl = { style: { "pointer-events": "none" }, for: "calda" },
  Nl = { id: "preco" },
  Il = a("br", null, null, -1),
  $l = a("br", null, null, -1),
  Ol = a("strong", { id: "categoria" }, "CREMES:", -1),
  Fl = { key: 0 },
  ql = { class: "container-checkbox", id: "textoPreco3" },
  Ml = ["value"],
  Rl = a("span", { class: "checkmark" }, null, -1),
  wl = { style: { "pointer-events": "none" }, for: "creme" },
  Vl = { id: "preco" },
  Dl = a("br", null, null, -1),
  Ul = a("br", null, null, -1),
  Ll = a("strong", { id: "categoria" }, "COBERTURAS:", -1),
  Bl = { key: 0 },
  jl = { class: "container-checkbox", id: "textoPreco3" },
  Hl = ["value"],
  Kl = a("span", { class: "checkmark" }, null, -1),
  Gl = { style: { "pointer-events": "none" }, for: "cobertura" },
  Jl = { id: "preco" };
function zl(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", Ur, [
        Lr,
        (h(!0),
        f(
          N,
          null,
          R(
            s.pesos,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.pesoSelecionado[l]
                  ? (h(),
                    f("div", Br, [
                      a("label", jr, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[0] || (o[0] = (c) => (s.Peso = c)),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            8,
                            Hr
                          ),
                          [[w, s.Peso]]
                        ),
                        Kr,
                      ]),
                      a("label", Gr, p(i.nome), 1),
                      a("label", Jr, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        zr,
        Wr,
        Qr,
        (h(!0),
        f(
          N,
          null,
          R(
            s.acais,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.AcaiSelecionado[l]
                  ? (h(),
                    f("div", Yr, [
                      a("label", Xr, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[1] || (o[1] = (c) => (s.Acai = c)),
                              onChange: o[2] || (o[2] = () => {}),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            40,
                            Zr
                          ),
                          [[w, s.Acai]]
                        ),
                        el,
                      ]),
                      a("label", ol, p(i.nome), 1),
                      a("label", tl, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        sl,
        il,
        al,
        (h(!0),
        f(
          N,
          null,
          R(
            s.adicionais,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.GuloseimasSelecionado[l]
                  ? (h(),
                    f("div", nl, [
                      a("label", rl, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[3] || (o[3] = (c) => (s.Guloseimas = c)),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            8,
                            ll
                          ),
                          [[w, s.Guloseimas]]
                        ),
                        cl,
                      ]),
                      a("label", dl, p(i.nome), 1),
                      a("label", ul, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        hl,
        fl,
        ml,
        (h(!0),
        f(
          N,
          null,
          R(
            s.frutas,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.FrutasSelecionado[l]
                  ? (h(),
                    f("div", pl, [
                      a("label", _l, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[4] || (o[4] = (c) => (s.Frutas = c)),
                              class: "checkbox1",
                              id: "fruta",
                              value: i,
                            },
                            null,
                            8,
                            gl
                          ),
                          [[w, s.Frutas]]
                        ),
                        bl,
                      ]),
                      a("label", vl, p(i.nome), 1),
                      a("label", Cl, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        Sl,
        Al,
        kl,
        (h(!0),
        f(
          N,
          null,
          R(
            s.caldas,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.caldaSelecionado[l]
                  ? (h(),
                    f("div", Pl, [
                      a("label", yl, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[5] || (o[5] = (c) => (s.Caldas = c)),
                              class: "checkbox1",
                              id: "fruta",
                              value: i,
                            },
                            null,
                            8,
                            xl
                          ),
                          [[w, s.Caldas]]
                        ),
                        El,
                      ]),
                      a("label", Tl, p(i.nome), 1),
                      a("label", Nl, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        Il,
        $l,
        Ol,
        (h(!0),
        f(
          N,
          null,
          R(
            s.cremes,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.CremesSelecionado[l]
                  ? (h(),
                    f("div", Fl, [
                      a("label", ql, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[6] || (o[6] = (c) => (s.Creme = c)),
                              class: "checkbox1",
                              id: "fruta",
                              value: i,
                            },
                            null,
                            8,
                            Ml
                          ),
                          [[w, s.Creme]]
                        ),
                        Rl,
                      ]),
                      a("label", wl, p(i.nome), 1),
                      a("label", Vl, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        Dl,
        Ul,
        Ll,
        (h(!0),
        f(
          N,
          null,
          R(
            s.coberturas,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.CoberturaSelecionado[l]
                  ? (h(),
                    f("div", Bl, [
                      a("label", jl, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[7] || (o[7] = (c) => (s.Cobertura = c)),
                              class: "checkbox1",
                              id: "cobertura",
                              value: i,
                            },
                            null,
                            8,
                            Hl
                          ),
                          [[w, s.Cobertura]]
                        ),
                        Kl,
                      ]),
                      a("label", Gl, p(i.nome), 1),
                      a("label", Jl, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        s.Peso.length == 1 && s.Acai.length > 0
          ? (h(),
            f(
              "button",
              {
                key: 0,
                onClick:
                  o[8] ||
                  (o[8] = (i) => (n.receberPedido(), n.desmarcarTodos())),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.Peso.length == 0 || s.Acai.length == 0
          ? (h(),
            f(
              "button",
              {
                key: 1,
                onClick: o[9] || (o[9] = (i) => n.desmarcarTodos()),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var Wl = Ae(Dr, [["render", zl]]);
const Ql = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u([]),
        t = u([!1, !1, !1, !1, !1, !1, !1]),
        s = u([]),
        r = u(0),
        n = u(""),
        i = u(!0),
        l = u([
          {
            nome: "Cuscuz com Ovo",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Frango",
            descricao: "",
            preco: 5.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Ovo e Frango",
            descricao: "",
            preco: 6.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Carne de Sol",
            descricao: "",
            preco: 8,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Carne de Sol e Queijo",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Carne Moida",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Calabresa",
            descricao: "",
            preco: 6.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Cuscuz com Calabresa e Queijo",
            descricao: "",
            preco: 7.5,
            quantidade: 0,
            id: 4,
            hash: "",
            selecionados: [],
          },
        ]),
        c = u([!1, !1, !1, !1, !1, !1, !1]),
        _ = u([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        v = u(!0),
        k = u(""),
        b = u([!0, !0, !0, !0, !0, !0, !0]),
        $ = u([!1, !1, !1, !1, !1, !1, !1, !1]),
        D = u(!1),
        U = u([!1, !1, !1, !1, !1, !1, !1]),
        F = u([!1, !1, !1, !1, !1, !1, !1]),
        L = u([!1, !1, !1, !1, !1, !1, !1]),
        ie = u([!1, !1, !1, !1, !1, !1, !1]),
        Q = u([!1, !1, !1, !1, !1, !1, !1]),
        J = u([!1, !1, !1, !1, !1, !1, !1]),
        ee = u([!1, !1, !1, !1, !1, !1, !1]),
        le = u([!1, !1, !1, !1, !1, !1, !1]),
        j = u([]);
      u([]);
      const oe = u([]);
      u([]);
      const Z = 0;
      return {
        temItens: u(!1),
        valorTemp: Z,
        adicionalsSelecionados: s,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: v,
        observacoes: k,
        PaesNaChapaEstaSelecioando: b,
        adicionalEstaSelecioando: $,
        estaSelecionado: D,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: U,
        adicionalSelecionado2: F,
        adicionalSelecionado3: L,
        adicionalSelecionado4: ie,
        adicionalSelecionado5: Q,
        adicionalSelecionado6: J,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        idPaesNaChapaelecionado: j,
        listaBurges: oe,
        valorAtual: r,
        categoriaItem: n,
        mostrarCategoria: i,
        pedidosSelecionados: o,
      };
    },
    watch: {
      valorAtual(e, o) {
        e <= 0 && (this.valorAtual = 0);
      },
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -7 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        console.log("passou aqui"),
          this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((s) => s.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado2 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado3 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado4 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado5 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado6 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado7 = [!1, !1, !1, !1, !1, !1]),
          (this.adicionalSelecionado8 = [!1, !1, !1, !1, !1, !1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var s = this.PaesNaChapa[e].selecionados.reduce(function (r, n) {
            return r + n.preco;
          }, 0);
          (this.valorAtual -= s),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []),
            (this.PaesNaChapa[3].selecionados = []),
            (this.PaesNaChapa[4].selecionados = []),
            (this.PaesNaChapa[5].selecionados = []),
            (this.PaesNaChapa[6].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0, !0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1, !1, !1, !1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1, !1, !1, !1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []),
          (this.PaesNaChapa[3].selecionados = []),
          (this.PaesNaChapa[4].selecionados = []),
          (this.PaesNaChapa[5].selecionados = []),
          (this.PaesNaChapa[6].selecionados = []);
      },
    },
  },
  Yl = { id: "fixedContainer" },
  Xl = { id: "textoPreco" },
  Zl = a("span", null, "R$: ", -1),
  ec = { id: "totalcost" },
  oc = { class: "Categoria" },
  tc = a("strong", { id: "categoria" }, "CUSCUZ:", -1),
  sc = { key: 0, id: "item" },
  ic = { class: "container-checkbox", id: "textoPreco3" },
  ac = ["value", "onUpdate:modelValue", "onChange"],
  nc = a("span", { class: "checkmark" }, null, -1),
  rc = { style: { "pointer-events": "none" }, for: "adicional" },
  lc = { id: "preco" },
  cc = { id: "itens" },
  dc = a("br", null, null, -1),
  uc = { key: 0, id: "listar" },
  hc = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  fc = { class: "container-checkbox", id: "textoPreco3" },
  mc = ["value", "onChange"],
  pc = a("span", { class: "checkmark" }, null, -1),
  _c = { style: { "pointer-events": "none" }, for: "adicional" },
  gc = { id: "preco" },
  bc = { id: "itens" },
  vc = { key: 1, id: "listar" },
  Cc = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Sc = { class: "container-checkbox", id: "textoPreco3" },
  Ac = ["value", "onChange"],
  kc = a("span", { class: "checkmark" }, null, -1),
  Pc = { style: { "pointer-events": "none" }, for: "adicional" },
  yc = { id: "preco" },
  xc = { id: "itens" },
  Ec = { key: 2, id: "listar" },
  Tc = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Nc = { class: "container-checkbox", id: "textoPreco3" },
  Ic = ["value", "onChange"],
  $c = a("span", { class: "checkmark" }, null, -1),
  Oc = { style: { "pointer-events": "none" }, for: "adicional" },
  Fc = { id: "preco" },
  qc = { id: "itens" },
  Mc = { key: 3, id: "listar" },
  Rc = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  wc = { class: "container-checkbox", id: "textoPreco3" },
  Vc = ["value", "onChange"],
  Dc = a("span", { class: "checkmark" }, null, -1),
  Uc = { style: { "pointer-events": "none" }, for: "adicional" },
  Lc = { id: "preco" },
  Bc = { id: "itens" },
  jc = { key: 4, id: "listar" },
  Hc = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Kc = { class: "container-checkbox", id: "textoPreco3" },
  Gc = ["value", "onChange"],
  Jc = a("span", { class: "checkmark" }, null, -1),
  zc = { style: { "pointer-events": "none" }, for: "adicional" },
  Wc = { id: "preco" },
  Qc = { id: "itens" },
  Yc = { key: 5, id: "listar" },
  Xc = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Zc = { class: "container-checkbox", id: "textoPreco3" },
  ed = ["value", "onChange"],
  od = a("span", { class: "checkmark" }, null, -1),
  td = { style: { "pointer-events": "none" }, for: "adicional" },
  sd = { id: "preco" },
  id = { id: "itens" },
  ad = { key: 6, id: "listar" },
  nd = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  rd = { class: "container-checkbox", id: "textoPreco3" },
  ld = ["value", "onChange"],
  cd = a("span", { class: "checkmark" }, null, -1),
  dd = { style: { "pointer-events": "none" }, for: "adicional" },
  ud = { id: "preco" },
  hd = { id: "itens" },
  fd = { key: 7, id: "listar" },
  md = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  pd = { class: "container-checkbox", id: "textoPreco3" },
  _d = ["value", "onChange"],
  gd = a("span", { class: "checkmark" }, null, -1),
  bd = { style: { "pointer-events": "none" }, for: "adicional" },
  vd = { id: "preco" },
  Cd = { id: "itens" };
function Sd(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", Yl, [
        a("div", Xl, [
          Zl,
          a(
            "span",
            ec,
            p(s.valorAtual.toFixed(2) <= 0 ? "0.00" : s.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      a("div", oc, [
        tc,
        (h(!0),
        f(
          N,
          null,
          R(
            s.PaesNaChapa,
            (i, l) => (
              h(),
              f("div", { id: "listar", key: i }, [
                s.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    f("div", sc, [
                      a("label", ic, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              "onUpdate:modelValue": (c) =>
                                (s.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                n.adicionalSelecionado(l, i.preco),
                                (s.estaSelecionado = !s.estaSelecionado),
                                n.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            ac
                          ),
                          [[w, s.PaesNaChapaSelecionados[l]]]
                        ),
                        nc,
                      ]),
                      a("label", rc, p(i.nome), 1),
                      a("label", lc, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", cc, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        dc,
        s.adicionalEstaSelecioando[0]
          ? (h(),
            f("div", uc, [
              hc,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", fc, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado1[l] =
                                  !s.adicionalSelecionado1[l]),
                                  n.somarAdicionais1(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (s.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            mc
                          ),
                          [[w, s.PaesNaChapa[0].selecionados]]
                        ),
                        pc,
                      ]),
                      a("label", _c, p(i.nome), 1),
                      a("label", gc, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", bc, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[1]
          ? (h(),
            f("div", vc, [
              Cc,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Sc, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado2[l] =
                                  !s.adicionalSelecionado2[l]),
                                  n.somarAdicionais2(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (s.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            Ac
                          ),
                          [[w, s.PaesNaChapa[1].selecionados]]
                        ),
                        kc,
                      ]),
                      a("label", Pc, p(i.nome), 1),
                      a("label", yc, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", xc, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[2]
          ? (h(),
            f("div", Ec, [
              Tc,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Nc, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado3[l] =
                                  !s.adicionalSelecionado3[l]),
                                  n.somarAdicionais3(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (s.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            Ic
                          ),
                          [[w, s.PaesNaChapa[2].selecionados]]
                        ),
                        $c,
                      ]),
                      a("label", Oc, p(i.nome), 1),
                      a("label", Fc, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", qc, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[3]
          ? (h(),
            f("div", Mc, [
              Rc,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", wc, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado4[l] =
                                  !s.adicionalSelecionado4[l]),
                                  n.somarAdicionais4(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (s.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            Vc
                          ),
                          [[w, s.PaesNaChapa[3].selecionados]]
                        ),
                        Dc,
                      ]),
                      a("label", Uc, p(i.nome), 1),
                      a("label", Lc, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Bc, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[4]
          ? (h(),
            f("div", jc, [
              Hc,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Kc, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado5[l] =
                                  !s.adicionalSelecionado5[l]),
                                  n.somarAdicionais5(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[4] ||
                                (o[4] = (c) =>
                                  (s.PaesNaChapa[4].selecionados = c)),
                            },
                            null,
                            40,
                            Gc
                          ),
                          [[w, s.PaesNaChapa[4].selecionados]]
                        ),
                        Jc,
                      ]),
                      a("label", zc, p(i.nome), 1),
                      a("label", Wc, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Qc, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[5]
          ? (h(),
            f("div", Yc, [
              Xc,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Zc, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado6[l] =
                                  !s.adicionalSelecionado6[l]),
                                  n.somarAdicionais6(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[5] ||
                                (o[5] = (c) =>
                                  (s.PaesNaChapa[5].selecionados = c)),
                            },
                            null,
                            40,
                            ed
                          ),
                          [[w, s.PaesNaChapa[5].selecionados]]
                        ),
                        od,
                      ]),
                      a("label", td, p(i.nome), 1),
                      a("label", sd, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", id, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[6]
          ? (h(),
            f("div", ad, [
              nd,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", rd, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado7[l] =
                                  !s.adicionalSelecionado7[l]),
                                  n.somarAdicionais7(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[6] ||
                                (o[6] = (c) =>
                                  (s.PaesNaChapa[6].selecionados = c)),
                            },
                            null,
                            40,
                            ld
                          ),
                          [[w, s.PaesNaChapa[6].selecionados]]
                        ),
                        cd,
                      ]),
                      a("label", dd, p(i.nome), 1),
                      a("label", ud, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", hd, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[7]
          ? (h(),
            f("div", fd, [
              md,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", pd, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado8[l] =
                                  !s.adicionalSelecionado8[l]),
                                  n.somarAdicionais8(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[7] ||
                                (o[7] = (c) =>
                                  (s.PaesNaChapa[7].selecionados = c)),
                            },
                            null,
                            40,
                            _d
                          ),
                          [[w, s.PaesNaChapa[7].selecionados]]
                        ),
                        gd,
                      ]),
                      a("label", bd, p(i.nome), 1),
                      a("label", vd, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Cd, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.temItens == !0
          ? (h(),
            f(
              "button",
              {
                key: 8,
                onClick:
                  o[8] ||
                  (o[8] = (i) => (
                    n.somarValorTotal(),
                    n.pedirOutroBurguer(),
                    n.desmarcarTodos(),
                    n.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.temItens == !1
          ? (h(),
            f(
              "button",
              {
                key: 9,
                id: "butOpcoes",
                onClick: o[9] || (o[9] = (i) => n.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var Ad = Ae(Ql, [["render", Sd]]);
const kd = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u([]),
        t = u([!1, !1, !1, !1]),
        s = u([]),
        r = u(0),
        n = u(""),
        i = u(!0),
        l = u([
          {
            nome: "Carne de Sol",
            descricao: "",
            preco: 10,
            quantidade: 0,
            id: 5,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 5,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Queijo Coalho",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 5,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne Moida",
            descricao: "",
            preco: 8,
            quantidade: 0,
            id: 5,
            hash: "",
            selecionados: [],
          },
        ]),
        c = u([!1, !1, !1, !1, !1, !1, !1]),
        _ = u([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        v = u(!0),
        k = u(""),
        b = u([!0, !0, !0, !0]),
        $ = u([!1]),
        D = u(!1),
        U = u([!1, !1, !1, !1, !1, !1, !1]),
        F = u([!1, !1, !1, !1, !1, !1, !1]),
        L = u([!1, !1, !1, !1, !1, !1, !1]),
        ie = u([!1, !1, !1, !1, !1, !1, !1]),
        Q = u([!1, !1, !1, !1, !1, !1, !1]),
        J = u([!1, !1, !1, !1, !1, !1, !1]),
        ee = u([!1, !1, !1, !1, !1, !1, !1]),
        le = u([!1, !1, !1, !1, !1, !1, !1]),
        j = u([]);
      u([]);
      const oe = u([]);
      u([]);
      const Z = 0;
      return {
        temItens: u(!1),
        valorTemp: Z,
        adicionalsSelecionados: s,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: v,
        observacoes: k,
        PaesNaChapaEstaSelecioando: b,
        adicionalEstaSelecioando: $,
        estaSelecionado: D,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: U,
        adicionalSelecionado2: F,
        adicionalSelecionado3: L,
        adicionalSelecionado4: ie,
        adicionalSelecionado5: Q,
        adicionalSelecionado6: J,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        idPaesNaChapaelecionado: j,
        listaBurges: oe,
        valorAtual: r,
        categoriaItem: n,
        mostrarCategoria: i,
        pedidosSelecionados: o,
      };
    },
    watch: {
      valorAtual(e, o) {
        e <= 0 && (this.valorAtual = 0);
      },
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -4 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        console.log("passou aqui"),
          this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((s) => s.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1]),
          (this.adicionalSelecionado2 = [!1]),
          (this.adicionalSelecionado3 = [!1]),
          (this.adicionalSelecionado4 = [!1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var s = this.PaesNaChapa[e].selecionados.reduce(function (r, n) {
            return r + n.preco;
          }, 0);
          (this.valorAtual -= s),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []),
            (this.PaesNaChapa[3].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [!0, !0, !0, !0]),
          (this.adicionalEstaSelecioando = [!1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []),
          (this.PaesNaChapa[3].selecionados = []);
      },
    },
  },
  Pd = { id: "fixedContainer" },
  yd = { id: "textoPreco" },
  xd = a("span", null, "R$: ", -1),
  Ed = { id: "totalcost" },
  Td = { class: "Categoria" },
  Nd = a("strong", { id: "categoria" }, "OMELETES:", -1),
  Id = { key: 0, id: "item" },
  $d = { class: "container-checkbox", id: "textoPreco3" },
  Od = ["value", "onUpdate:modelValue", "onChange"],
  Fd = a("span", { class: "checkmark" }, null, -1),
  qd = { style: { "pointer-events": "none" }, for: "adicional" },
  Md = { id: "preco" },
  Rd = { id: "itens" },
  wd = a("br", null, null, -1),
  Vd = { key: 0, id: "listar" },
  Dd = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Ud = { class: "container-checkbox", id: "textoPreco3" },
  Ld = ["value", "onChange"],
  Bd = a("span", { class: "checkmark" }, null, -1),
  jd = { style: { "pointer-events": "none" }, for: "adicional" },
  Hd = { id: "preco" },
  Kd = { id: "itens" },
  Gd = { key: 1, id: "listar" },
  Jd = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  zd = { class: "container-checkbox", id: "textoPreco3" },
  Wd = ["value", "onChange"],
  Qd = a("span", { class: "checkmark" }, null, -1),
  Yd = { style: { "pointer-events": "none" }, for: "adicional" },
  Xd = { id: "preco" },
  Zd = { id: "itens" },
  eu = { key: 2, id: "listar" },
  ou = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  tu = { class: "container-checkbox", id: "textoPreco3" },
  su = ["value", "onChange"],
  iu = a("span", { class: "checkmark" }, null, -1),
  au = { style: { "pointer-events": "none" }, for: "adicional" },
  nu = { id: "preco" },
  ru = { id: "itens" },
  lu = { key: 3, id: "listar" },
  cu = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  du = { class: "container-checkbox", id: "textoPreco3" },
  uu = ["value", "onChange"],
  hu = a("span", { class: "checkmark" }, null, -1),
  fu = { style: { "pointer-events": "none" }, for: "adicional" },
  mu = { id: "preco" },
  pu = { id: "itens" };
function _u(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", Pd, [
        a("div", yd, [
          xd,
          a(
            "span",
            Ed,
            p(s.valorAtual.toFixed(2) <= 0 ? "0.00" : s.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      a("div", Td, [
        Nd,
        (h(!0),
        f(
          N,
          null,
          R(
            s.PaesNaChapa,
            (i, l) => (
              h(),
              f("div", { id: "listar", key: i }, [
                s.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    f("div", Id, [
                      a("label", $d, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              "onUpdate:modelValue": (c) =>
                                (s.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                n.adicionalSelecionado(l, i.preco),
                                (s.estaSelecionado = !s.estaSelecionado),
                                n.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            Od
                          ),
                          [[w, s.PaesNaChapaSelecionados[l]]]
                        ),
                        Fd,
                      ]),
                      a("label", qd, p(i.nome), 1),
                      a("label", Md, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Rd, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        wd,
        s.adicionalEstaSelecioando[0]
          ? (h(),
            f("div", Vd, [
              Dd,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      a("label", Ud, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado1[l] =
                                  !s.adicionalSelecionado1[l]),
                                  n.somarAdicionais1(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (s.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            Ld
                          ),
                          [[w, s.PaesNaChapa[0].selecionados]]
                        ),
                        Bd,
                      ]),
                      a("label", jd, p(i.nome), 1),
                      a("label", Hd, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Kd, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[1]
          ? (h(),
            f("div", Gd, [
              Jd,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      a("label", zd, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado2[l] =
                                  !s.adicionalSelecionado2[l]),
                                  n.somarAdicionais2(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (s.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            Wd
                          ),
                          [[w, s.PaesNaChapa[1].selecionados]]
                        ),
                        Qd,
                      ]),
                      a("label", Yd, p(i.nome), 1),
                      a("label", Xd, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Zd, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[2]
          ? (h(),
            f("div", eu, [
              ou,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      a("label", tu, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado3[l] =
                                  !s.adicionalSelecionado3[l]),
                                  n.somarAdicionais3(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (s.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            su
                          ),
                          [[w, s.PaesNaChapa[2].selecionados]]
                        ),
                        iu,
                      ]),
                      a("label", au, p(i.nome), 1),
                      a("label", nu, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", ru, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[3]
          ? (h(),
            f("div", lu, [
              cu,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      a("label", du, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado4[l] =
                                  !s.adicionalSelecionado4[l]),
                                  n.somarAdicionais4(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (s.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            uu
                          ),
                          [[w, s.PaesNaChapa[3].selecionados]]
                        ),
                        hu,
                      ]),
                      a("label", fu, p(i.nome), 1),
                      a("label", mu, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", pu, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.temItens == !0
          ? (h(),
            f(
              "button",
              {
                key: 4,
                onClick:
                  o[4] ||
                  (o[4] = (i) => (
                    n.somarValorTotal(),
                    n.pedirOutroBurguer(),
                    n.desmarcarTodos(),
                    n.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.temItens == !1
          ? (h(),
            f(
              "button",
              {
                key: 5,
                id: "butOpcoes",
                onClick: o[5] || (o[5] = (i) => n.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var gu = Ae(kd, [["render", _u]]);
const bu = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u(0),
        t = u([]),
        s = u([!0, !0]),
        r = u([
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
        ]),
        n = u([!0, !0, !0, !0]),
        i = u([!0]),
        l = u([!0, !0, !0, !0, !0, !0, !0, !0, !0]),
        c = u([
          {
            nome: "300ML - R$ 12,00",
            descricao: " ENTREGA 1 REAL",
            preco: 12.0,
            quantidade: 0,
            id: 10,
            hash: "",
            selecionados: [],
          },
          {
            nome: "500ML - R$ 14,00",
            descricao: " ENTREGA 1 REAL",
            preco: 14.0,
            quantidade: 0,
            id: 10,
            hash: "",
            selecionados: [],
          },
        ]),
        _ = u([
          {
            nome: "Leite Condensado",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
        ]),
        v = u([
          { nome: "Chocoball", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Canudos", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Casquinha", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Amendoim", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Leite em p\xF3", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Ovomaltine", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Chocopower", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Marshmallow", preco: 0, id: 3, descricao: "gr\xE1tis" },
          {
            nome: "Gotas de chocolate",
            preco: 0,
            id: 3,
            descricao: "gr\xE1tis",
          },
          { nome: "Cereja", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Pa\xE7oca", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "MM's", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Granola", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Jujuba", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Castanha", preco: 20, id: 3, descricao: "gr\xE1tis" },
          {
            nome: "Gotas de Chocolate",
            preco: 20,
            id: 3,
            descricao: "gr\xE1tis",
          },
          {
            nome: "Farinha L\xE1cta",
            preco: 20,
            id: 3,
            descricao: "gr\xE1tis",
          },
          { nome: "Granulado", preco: 20, id: 3, descricao: "gr\xE1tis" },
        ]),
        k = u([
          { nome: "Abacaxi", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Kiwi", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Banana", preco: 20, id: 4, descricao: "gr\xE1tis" },
        ]),
        b = u([
          { nome: "Maracuj\xE1", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Chocolate", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Uva", preco: 20, id: 5, descricao: "gr\xE1tis" },
          { nome: "Doce de Leite", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Tutti-Frutti", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Frutas Vermelhas", preco: 0, id: 5, descricao: "gr\xE1tis" },
          {
            nome: "Leite Condensado",
            preco: 20,
            id: 5,
            descricao: "gr\xE1tis",
          },
          { nome: "Calda M\xE1gica", preco: 20, id: 5, descricao: "gr\xE1tis" },
        ]),
        $ = u([]),
        D = u([]),
        U = u([]),
        F = u([]);
      return {
        Peso: u([]),
        AcaiSelecionado: i,
        CoberturaSelecionado: l,
        Cobertura: U,
        FrutasSelecionado: n,
        Guloseimas: $,
        GuloseimasSelecionado: r,
        coberturas: b,
        pesoSelecionado: s,
        frutas: k,
        pesos: c,
        Frutas: D,
        adicionais: v,
        valorAtual: o,
        acais: _,
        pedido: t,
        Acai: F,
      };
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      receberPedido() {
        this.$emit(
          "receberPedido",
          this.Peso[0],
          this.Acai[0],
          this.Guloseimas,
          this.Frutas,
          this.Caldas,
          this.Cobertura,
          this.Creme
        ),
          (this.Peso = []),
          (this.Acai = []),
          (this.Guloseimas = []),
          (this.Frutas = []),
          (this.Caldas = []),
          (this.Cobertura = []),
          (this.Creme = []);
      },
    },
    watch: {
      Peso(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.pesoSelecionado.length; t++)
            this.pesoSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.pesoSelecionado.length; t++)
            this.pesos[t].nome != e[0].nome && (this.pesoSelecionado[t] = !1);
      },
      Acai(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.AcaiSelecionado.length; t++)
            this.AcaiSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.AcaiSelecionado.length; t++)
            this.acais[t].nome != e[0].nome && (this.AcaiSelecionado[t] = !1);
      },
      Guloseimas(e, o) {
        if (e.length < 2 && e.length != 0)
          for (var t = 0; t < this.GuloseimasSelecionado.length; t++)
            this.adicionais[t].nome != e[0].nome &&
              (this.GuloseimasSelecionado[t] = !0);
        if (e.length == 2) {
          console.log(this.adicionais[0].nome, e[0].nome);
          for (var t = 0; t < this.GuloseimasSelecionado.length; t++)
            this.adicionais[t].nome != e[0].nome &&
              this.adicionais[t].nome != e[1].nome &&
              (this.GuloseimasSelecionado[t] = !1);
        }
      },
      Frutas(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.FrutasSelecionado.length; t++)
            this.FrutasSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.FrutasSelecionado.length; t++)
            this.frutas[t].nome != e[0].nome &&
              (this.FrutasSelecionado[t] = !1);
      },
      Cobertura(e, o) {
        if (e.length < 2 && e.length != 0)
          for (var t = 0; t < this.CoberturaSelecionado.length; t++)
            this.coberturas[t].nome != e[0].nome &&
              (this.CoberturaSelecionado[t] = !0);
        if (e.length == 2)
          for (var t = 0; t < this.CoberturaSelecionado.length; t++)
            this.coberturas[t].nome != e[0].nome &&
              this.coberturas[t].nome != e[1].nome &&
              (this.CoberturaSelecionado[t] = !1);
      },
    },
  },
  vu = { class: "Categoria" },
  Cu = a("strong", { id: "categoria" }, "ESCOLHA:", -1),
  Su = { key: 0 },
  Au = { class: "container-checkbox", id: "textoPreco3" },
  ku = ["value"],
  Pu = a("span", { class: "checkmark" }, null, -1),
  yu = { style: { "pointer-events": "none" }, for: "adicional" },
  xu = { id: "preco" },
  Eu = a("br", null, null, -1),
  Tu = a("br", null, null, -1),
  Nu = a("strong", { id: "categoria" }, "VITAMINA DE A\xC7A\xCD:", -1),
  Iu = { key: 0 },
  $u = { class: "container-checkbox", id: "textoPreco3" },
  Ou = ["value"],
  Fu = a("span", { class: "checkmark" }, null, -1),
  qu = { style: { "pointer-events": "none" }, for: "adicional" },
  Mu = { id: "preco" },
  Ru = a("br", null, null, -1),
  wu = a("br", null, null, -1),
  Vu = a("strong", { id: "categoria" }, "FRUTAS:", -1),
  Du = { key: 0 },
  Uu = { class: "container-checkbox", id: "textoPreco3" },
  Lu = ["value"],
  Bu = a("span", { class: "checkmark" }, null, -1),
  ju = { style: { "pointer-events": "none" }, for: "fruta" },
  Hu = { id: "preco" };
function Ku(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", vu, [
        Cu,
        (h(!0),
        f(
          N,
          null,
          R(
            s.pesos,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.pesoSelecionado[l]
                  ? (h(),
                    f("div", Su, [
                      a("label", Au, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[0] || (o[0] = (c) => (s.Peso = c)),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            8,
                            ku
                          ),
                          [[w, s.Peso]]
                        ),
                        Pu,
                      ]),
                      a("label", yu, p(i.nome), 1),
                      a("label", xu, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        Eu,
        Tu,
        Nu,
        (h(!0),
        f(
          N,
          null,
          R(
            s.acais,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.AcaiSelecionado[l]
                  ? (h(),
                    f("div", Iu, [
                      a("label", $u, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[1] || (o[1] = (c) => (s.Acai = c)),
                              onChange: o[2] || (o[2] = () => {}),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            40,
                            Ou
                          ),
                          [[w, s.Acai]]
                        ),
                        Fu,
                      ]),
                      a("label", qu, p(i.nome), 1),
                      a("label", Mu, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        Ru,
        wu,
        Vu,
        (h(!0),
        f(
          N,
          null,
          R(
            s.frutas,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.FrutasSelecionado[l]
                  ? (h(),
                    f("div", Du, [
                      a("label", Uu, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[3] || (o[3] = (c) => (s.Frutas = c)),
                              class: "checkbox1",
                              id: "fruta",
                              value: i,
                            },
                            null,
                            8,
                            Lu
                          ),
                          [[w, s.Frutas]]
                        ),
                        Bu,
                      ]),
                      a("label", ju, p(i.nome), 1),
                      a("label", Hu, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        s.Peso.length == 1
          ? (h(),
            f(
              "button",
              {
                key: 0,
                onClick:
                  o[4] ||
                  (o[4] = (i) => (n.receberPedido(), n.desmarcarTodos())),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.Peso.length == 0
          ? (h(),
            f(
              "button",
              {
                key: 1,
                onClick: o[5] || (o[5] = (i) => n.desmarcarTodos()),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var Gu = Ae(bu, [["render", Ku]]);
const Ju = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u([]),
        t = u([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
        s = u([]),
        r = u(0),
        n = u(""),
        i = u(!0),
        l = u([
          {
            nome: "Hamburger",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango",
            descricao: "",
            preco: 3.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne de Sol",
            descricao: "",
            preco: 5.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Ovo e Presunto",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Queijo e Ovo",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Hamburger e Queijo",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne de Sol e Queijo",
            descricao: "",
            preco: 6.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango e Queijo",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango e Hamburger",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Frango, Queijo e Hamburger",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Hamburger, Queijo e Presunto",
            descricao: "",
            preco: 7,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Carne de Sol, Queijo e Presunto",
            descricao: "",
            preco: 8,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Hamburger, Queijo, Presunto e Ovo",
            descricao: "",
            preco: 8.5,
            quantidade: 0,
            id: 7,
            hash: "",
            selecionados: [],
          },
        ]),
        c = u([!1, !1, !1, !1, !1, !1, !1]),
        _ = u([
          { nome: "Ovo", preco: 1.5, quantidade: 0, id: 8 },
          { nome: "Queijo", preco: 2.5, quantidade: 0, id: 8 },
          { nome: "Requeij\xE3o", preco: 1.2, quantidade: 0, id: 8 },
          { nome: "Carne Mo\xEDda", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Carne de Sol", preco: 2.75, quantidade: 0, id: 8 },
          { nome: "Calabresa", preco: 2.25, quantidade: 0, id: 8 },
          { nome: "Frango", preco: 2.25, quantidade: 0, id: 8 },
        ]),
        v = u(!0),
        k = u(""),
        b = u([!0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0]),
        $ = u([!1, !1, !1]),
        D = u(!1),
        U = u([!1, !1, !1, !1, !1, !1, !1]),
        F = u([!1, !1, !1, !1, !1, !1, !1]),
        L = u([!1, !1, !1, !1, !1, !1, !1]),
        ie = u([!1, !1, !1, !1, !1, !1, !1]),
        Q = u([!1, !1, !1, !1, !1, !1, !1]),
        J = u([!1, !1, !1, !1, !1, !1, !1]),
        ee = u([!1, !1, !1, !1, !1, !1, !1]),
        le = u([!1, !1, !1, !1, !1, !1, !1]),
        j = u([!1, !1, !1, !1, !1, !1, !1]),
        oe = u([!1, !1, !1, !1, !1, !1, !1]),
        Z = u([!1, !1, !1, !1, !1, !1, !1]),
        he = u([!1, !1, !1, !1, !1, !1, !1]),
        fe = u([!1, !1, !1, !1, !1, !1, !1]),
        be = u([]);
      u([]);
      const De = u([]);
      u([]);
      const Fo = 0;
      return {
        temItens: u(!1),
        valorTemp: Fo,
        adicionalsSelecionados: s,
        PaesNaChapa: l,
        checkBoxSelecionados: c,
        adicionais: _,
        aparecerPaesNaChapa: v,
        observacoes: k,
        PaesNaChapaEstaSelecioando: b,
        adicionalEstaSelecioando: $,
        estaSelecionado: D,
        PaesNaChapaSelecionados: t,
        pedidosSelecionados: o,
        adicionalSelecionado1: U,
        adicionalSelecionado2: F,
        adicionalSelecionado3: L,
        adicionalSelecionado4: ie,
        adicionalSelecionado5: Q,
        adicionalSelecionado6: J,
        adicionalSelecionado7: ee,
        adicionalSelecionado8: le,
        adicionalSelecionado9: j,
        adicionalSelecionado10: oe,
        adicionalSelecionado11: Z,
        adicionalSelecionado12: he,
        adicionalSelecionado13: fe,
        idPaesNaChapaelecionado: be,
        listaBurges: De,
        valorAtual: r,
        categoriaItem: n,
        mostrarCategoria: i,
        pedidosSelecionados: o,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    watch: {
      valorAtual(e, o) {
        e <= 0 && (this.valorAtual = 0);
      },
    },
    methods: {
      SaberSeTemItens() {
        var e = 0;
        for (var o of this.PaesNaChapaSelecionados)
          o == !0 && (e++, (this.temItens = !0));
        for (var o of this.PaesNaChapaSelecionados) o == !1 && e--;
        console.log(e), e == -4 && (this.temItens = !1);
      },
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        console.log("passou aqui"),
          this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        this.$emit("receberPedido", this.listaBurges, this.valorAtual);
      },
      categoriaSelecionada(e) {
        (this.categoriaItem = Number(e)), (this.mostrarCategoria = !1);
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((s) => s.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
      adicionalSelecionado(e, o) {
        (this.adicionalSelecionado1 = [!1]),
          (this.adicionalSelecionado2 = [!1]),
          (this.adicionalSelecionado3 = [!1]),
          (this.adicionalSelecionado4 = [!1]),
          (this.adicionalSelecionado5 = [!1]),
          (this.adicionalSelecionado6 = [!1]),
          (this.adicionalSelecionado7 = [!1]),
          (this.adicionalSelecionado8 = [!1]),
          (this.adicionalSelecionado9 = [!1]),
          (this.adicionalSelecionado10 = [!1]),
          (this.adicionalSelecionado11 = [!1]),
          (this.adicionalSelecionado12 = [!1]),
          (this.adicionalSelecionado13 = [!1]),
          (this.idPaesNaChapaelecionado = e),
          (this.adicionalEstaSelecioando[e] =
            !this.adicionalEstaSelecioando[e]);
        for (var t = 0; t < this.PaesNaChapaEstaSelecioando.length; t++)
          t != e &&
            (this.PaesNaChapaEstaSelecioando[t] =
              !this.PaesNaChapaEstaSelecioando[t]);
        if (this.estaSelecionado == !0) {
          this.valorAtual -= o;
          var s = this.PaesNaChapa[e].selecionados.reduce(function (r, n) {
            return r + n.preco;
          }, 0);
          (this.valorAtual -= s),
            (this.PaesNaChapa[0].selecionados = []),
            (this.PaesNaChapa[1].selecionados = []),
            (this.PaesNaChapa[2].selecionados = []),
            (this.PaesNaChapa[3].selecionados = []),
            (this.PaesNaChapa[4].selecionados = []),
            (this.PaesNaChapa[5].selecionados = []),
            (this.PaesNaChapa[6].selecionados = []),
            (this.PaesNaChapa[7].selecionados = []),
            (this.PaesNaChapa[8].selecionados = []),
            (this.PaesNaChapa[9].selecionados = []),
            (this.PaesNaChapa[10].selecionados = []),
            (this.PaesNaChapa[11].selecionados = []),
            (this.PaesNaChapa[12].selecionados = []);
        } else this.valorAtual += o;
      },
      somarAdicionais1(e, o) {
        this.adicionalSelecionado1[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais2(e, o) {
        this.adicionalSelecionado2[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais3(e, o) {
        this.adicionalSelecionado3[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais4(e, o) {
        this.adicionalSelecionado4[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais5(e, o) {
        this.adicionalSelecionado5[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais6(e, o) {
        this.adicionalSelecionado6[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais7(e, o) {
        this.adicionalSelecionado7[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais8(e, o) {
        this.adicionalSelecionado8[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais9(e, o) {
        this.adicionalSelecionado9[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais10(e, o) {
        this.adicionalSelecionado10[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais11(e, o) {
        this.adicionalSelecionado11[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais12(e, o) {
        this.adicionalSelecionado12[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarAdicionais13(e, o) {
        this.adicionalSelecionado13[e] == !0
          ? (this.valorAtual += o)
          : (this.valorAtual -= o);
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      pedirOutro() {
        (this.mostrarCategoria = !0), (this.categoriaItem = 0);
      },
      pedirOutroBurguer() {
        (this.mostrarCategoria = !0),
          (this.categoriaItem = 0),
          (this.estaSelecionado = !1),
          this.listaBurges.push(
            JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
          ),
          (this.PaesNaChapaEstaSelecioando = [
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
          ]),
          (this.adicionalEstaSelecioando = [!1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados(),
          (this.valorAtual = 0);
      },
      pedirOutroBurguer2() {
        this.listaBurges.push(
          JSON.stringify(this.PaesNaChapa[this.idPaesNaChapaelecionado])
        ),
          (this.PaesNaChapaEstaSelecioando = [
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
            !0,
          ]),
          (this.adicionalEstaSelecioando = [!1, !1, !1]),
          (this.PaesNaChapaSelecionados[this.idPaesNaChapaelecionado] = !1),
          this.tirarSelecionados();
      },
      tirarSelecionados() {
        (this.PaesNaChapa[0].selecionados = []),
          (this.PaesNaChapa[1].selecionados = []),
          (this.PaesNaChapa[2].selecionados = []),
          (this.PaesNaChapa[3].selecionados = []),
          (this.PaesNaChapa[4].selecionados = []),
          (this.PaesNaChapa[5].selecionados = []),
          (this.PaesNaChapa[6].selecionados = []),
          (this.PaesNaChapa[7].selecionados = []),
          (this.PaesNaChapa[8].selecionados = []),
          (this.PaesNaChapa[9].selecionados = []),
          (this.PaesNaChapa[10].selecionados = []),
          (this.PaesNaChapa[11].selecionados = []),
          (this.PaesNaChapa[12].selecionados = []);
      },
    },
  },
  zu = { id: "fixedContainer" },
  Wu = { id: "textoPreco" },
  Qu = a("span", null, "R$: ", -1),
  Yu = { id: "totalcost" },
  Xu = { class: "Categoria" },
  Zu = a("strong", { id: "categoria" }, "SANDU\xCDCHE:", -1),
  eh = { key: 0, id: "item" },
  oh = { class: "container-checkbox", id: "textoPreco3" },
  th = ["value", "onUpdate:modelValue", "onChange"],
  sh = a("span", { class: "checkmark" }, null, -1),
  ih = { style: { "pointer-events": "none" }, for: "adicional" },
  ah = { id: "preco" },
  nh = { id: "itens" },
  rh = a("br", null, null, -1),
  lh = { key: 0, id: "listar" },
  ch = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  dh = { class: "container-checkbox", id: "textoPreco3" },
  uh = ["value", "onChange"],
  hh = a("span", { class: "checkmark" }, null, -1),
  fh = { style: { "pointer-events": "none" }, for: "adicional" },
  mh = { id: "preco" },
  ph = { id: "itens" },
  _h = { key: 1, id: "listar" },
  gh = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  bh = { class: "container-checkbox", id: "textoPreco3" },
  vh = ["value", "onChange"],
  Ch = a("span", { class: "checkmark" }, null, -1),
  Sh = { style: { "pointer-events": "none" }, for: "adicional" },
  Ah = { id: "preco" },
  kh = { id: "itens" },
  Ph = { key: 2, id: "listar" },
  yh = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  xh = { class: "container-checkbox", id: "textoPreco3" },
  Eh = ["value", "onChange"],
  Th = a("span", { class: "checkmark" }, null, -1),
  Nh = { style: { "pointer-events": "none" }, for: "adicional" },
  Ih = { id: "preco" },
  $h = { id: "itens" },
  Oh = { key: 3, id: "listar" },
  Fh = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  qh = { class: "container-checkbox", id: "textoPreco3" },
  Mh = ["value", "onChange"],
  Rh = a("span", { class: "checkmark" }, null, -1),
  wh = { style: { "pointer-events": "none" }, for: "adicional" },
  Vh = { id: "preco" },
  Dh = { id: "itens" },
  Uh = { key: 4, id: "listar" },
  Lh = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Bh = { class: "container-checkbox", id: "textoPreco3" },
  jh = ["value", "onChange"],
  Hh = a("span", { class: "checkmark" }, null, -1),
  Kh = { style: { "pointer-events": "none" }, for: "adicional" },
  Gh = { id: "preco" },
  Jh = { id: "itens" },
  zh = { key: 5, id: "listar" },
  Wh = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Qh = { class: "container-checkbox", id: "textoPreco3" },
  Yh = ["value", "onChange"],
  Xh = a("span", { class: "checkmark" }, null, -1),
  Zh = { style: { "pointer-events": "none" }, for: "adicional" },
  ef = { id: "preco" },
  of = { id: "itens" },
  tf = { key: 6, id: "listar" },
  sf = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  af = { class: "container-checkbox", id: "textoPreco3" },
  nf = ["value", "onChange"],
  rf = a("span", { class: "checkmark" }, null, -1),
  lf = { style: { "pointer-events": "none" }, for: "adicional" },
  cf = { id: "preco" },
  df = { id: "itens" },
  uf = { key: 7, id: "listar" },
  hf = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  ff = { class: "container-checkbox", id: "textoPreco3" },
  mf = ["value", "onChange"],
  pf = a("span", { class: "checkmark" }, null, -1),
  _f = { style: { "pointer-events": "none" }, for: "adicional" },
  gf = { id: "preco" },
  bf = { id: "itens" },
  vf = { key: 8, id: "listar" },
  Cf = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Sf = { class: "container-checkbox", id: "textoPreco3" },
  Af = ["value", "onChange"],
  kf = a("span", { class: "checkmark" }, null, -1),
  Pf = { style: { "pointer-events": "none" }, for: "adicional" },
  yf = { id: "preco" },
  xf = { id: "itens" },
  Ef = { key: 9, id: "listar" },
  Tf = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Nf = { class: "container-checkbox", id: "textoPreco3" },
  If = ["value", "onChange"],
  $f = a("span", { class: "checkmark" }, null, -1),
  Of = { style: { "pointer-events": "none" }, for: "adicional" },
  Ff = { id: "preco" },
  qf = { id: "itens" },
  Mf = { key: 10, id: "listar" },
  Rf = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  wf = { class: "container-checkbox", id: "textoPreco3" },
  Vf = ["value", "onChange"],
  Df = a("span", { class: "checkmark" }, null, -1),
  Uf = { style: { "pointer-events": "none" }, for: "adicional" },
  Lf = { id: "preco" },
  Bf = { id: "itens" },
  jf = { key: 11, id: "listar" },
  Hf = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Kf = { class: "container-checkbox", id: "textoPreco3" },
  Gf = ["value", "onChange"],
  Jf = a("span", { class: "checkmark" }, null, -1),
  zf = { style: { "pointer-events": "none" }, for: "adicional" },
  Wf = { id: "preco" },
  Qf = { id: "itens" },
  Yf = { key: 12, id: "listar" },
  Xf = a("strong", { id: "categoria" }, "ADICIONAIS:", -1),
  Zf = { class: "container-checkbox", id: "textoPreco3" },
  em = ["value", "onChange"],
  om = a("span", { class: "checkmark" }, null, -1),
  tm = { style: { "pointer-events": "none" }, for: "adicional" },
  sm = { id: "preco" },
  im = { id: "itens" };
function am(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", zu, [
        a("div", Wu, [
          Qu,
          a(
            "span",
            Yu,
            p(s.valorAtual.toFixed(2) <= 0 ? "0.00" : s.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      a("div", Xu, [
        Zu,
        (h(!0),
        f(
          N,
          null,
          R(
            s.PaesNaChapa,
            (i, l) => (
              h(),
              f("div", { id: "listar", key: i }, [
                s.PaesNaChapaEstaSelecioando[l]
                  ? (h(),
                    f("div", eh, [
                      a("label", oh, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              "onUpdate:modelValue": (c) =>
                                (s.PaesNaChapaSelecionados[l] = c),
                              onChange: (c) => (
                                n.adicionalSelecionado(l, i.preco),
                                (s.estaSelecionado = !s.estaSelecionado),
                                n.SaberSeTemItens()
                              ),
                            },
                            null,
                            40,
                            th
                          ),
                          [[w, s.PaesNaChapaSelecionados[l]]]
                        ),
                        sh,
                      ]),
                      a("label", ih, p(i.nome), 1),
                      a("label", ah, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", nh, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        rh,
        s.adicionalEstaSelecioando[0]
          ? (h(),
            f("div", lh, [
              ch,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", dh, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado1[l] =
                                  !s.adicionalSelecionado1[l]),
                                  n.somarAdicionais1(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[0] ||
                                (o[0] = (c) =>
                                  (s.PaesNaChapa[0].selecionados = c)),
                            },
                            null,
                            40,
                            uh
                          ),
                          [[w, s.PaesNaChapa[0].selecionados]]
                        ),
                        hh,
                      ]),
                      a("label", fh, p(i.nome), 1),
                      a("label", mh, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", ph, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[1]
          ? (h(),
            f("div", _h, [
              gh,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", bh, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado2[l] =
                                  !s.adicionalSelecionado2[l]),
                                  n.somarAdicionais2(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[1] ||
                                (o[1] = (c) =>
                                  (s.PaesNaChapa[1].selecionados = c)),
                            },
                            null,
                            40,
                            vh
                          ),
                          [[w, s.PaesNaChapa[1].selecionados]]
                        ),
                        Ch,
                      ]),
                      a("label", Sh, p(i.nome), 1),
                      a("label", Ah, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", kh, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[2]
          ? (h(),
            f("div", Ph, [
              yh,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", xh, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado3[l] =
                                  !s.adicionalSelecionado3[l]),
                                  n.somarAdicionais3(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[2] ||
                                (o[2] = (c) =>
                                  (s.PaesNaChapa[2].selecionados = c)),
                            },
                            null,
                            40,
                            Eh
                          ),
                          [[w, s.PaesNaChapa[2].selecionados]]
                        ),
                        Th,
                      ]),
                      a("label", Nh, p(i.nome), 1),
                      a("label", Ih, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", $h, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[3]
          ? (h(),
            f("div", Oh, [
              Fh,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", qh, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado4[l] =
                                  !s.adicionalSelecionado4[l]),
                                  n.somarAdicionais4(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[3] ||
                                (o[3] = (c) =>
                                  (s.PaesNaChapa[3].selecionados = c)),
                            },
                            null,
                            40,
                            Mh
                          ),
                          [[w, s.PaesNaChapa[3].selecionados]]
                        ),
                        Rh,
                      ]),
                      a("label", wh, p(i.nome), 1),
                      a("label", Vh, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Dh, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[4]
          ? (h(),
            f("div", Uh, [
              Lh,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Bh, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado5[l] =
                                  !s.adicionalSelecionado5[l]),
                                  n.somarAdicionais5(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[4] ||
                                (o[4] = (c) =>
                                  (s.PaesNaChapa[4].selecionados = c)),
                            },
                            null,
                            40,
                            jh
                          ),
                          [[w, s.PaesNaChapa[4].selecionados]]
                        ),
                        Hh,
                      ]),
                      a("label", Kh, p(i.nome), 1),
                      a("label", Gh, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Jh, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[5]
          ? (h(),
            f("div", zh, [
              Wh,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Qh, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado6[l] =
                                  !s.adicionalSelecionado6[l]),
                                  n.somarAdicionais6(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[5] ||
                                (o[5] = (c) =>
                                  (s.PaesNaChapa[5].selecionados = c)),
                            },
                            null,
                            40,
                            Yh
                          ),
                          [[w, s.PaesNaChapa[5].selecionados]]
                        ),
                        Xh,
                      ]),
                      a("label", Zh, p(i.nome), 1),
                      a("label", ef, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", of, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[6]
          ? (h(),
            f("div", tf, [
              sf,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", af, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado7[l] =
                                  !s.adicionalSelecionado7[l]),
                                  n.somarAdicionais7(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[6] ||
                                (o[6] = (c) =>
                                  (s.PaesNaChapa[6].selecionados = c)),
                            },
                            null,
                            40,
                            nf
                          ),
                          [[w, s.PaesNaChapa[6].selecionados]]
                        ),
                        rf,
                      ]),
                      a("label", lf, p(i.nome), 1),
                      a("label", cf, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", df, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[7]
          ? (h(),
            f("div", uf, [
              hf,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", ff, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado8[l] =
                                  !s.adicionalSelecionado8[l]),
                                  n.somarAdicionais8(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[7] ||
                                (o[7] = (c) =>
                                  (s.PaesNaChapa[7].selecionados = c)),
                            },
                            null,
                            40,
                            mf
                          ),
                          [[w, s.PaesNaChapa[7].selecionados]]
                        ),
                        pf,
                      ]),
                      a("label", _f, p(i.nome), 1),
                      a("label", gf, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", bf, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[8]
          ? (h(),
            f("div", vf, [
              Cf,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Sf, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado9[l] =
                                  !s.adicionalSelecionado9[l]),
                                  n.somarAdicionais9(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[8] ||
                                (o[8] = (c) =>
                                  (s.PaesNaChapa[8].selecionados = c)),
                            },
                            null,
                            40,
                            Af
                          ),
                          [[w, s.PaesNaChapa[8].selecionados]]
                        ),
                        kf,
                      ]),
                      a("label", Pf, p(i.nome), 1),
                      a("label", yf, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", xf, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[9]
          ? (h(),
            f("div", Ef, [
              Tf,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Nf, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado10[l] =
                                  !s.adicionalSelecionado10[l]),
                                  n.somarAdicionais10(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[9] ||
                                (o[9] = (c) =>
                                  (s.PaesNaChapa[9].selecionados = c)),
                            },
                            null,
                            40,
                            If
                          ),
                          [[w, s.PaesNaChapa[9].selecionados]]
                        ),
                        $f,
                      ]),
                      a("label", Of, p(i.nome), 1),
                      a("label", Ff, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", qf, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[10]
          ? (h(),
            f("div", Mf, [
              Rf,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", wf, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado11[l] =
                                  !s.adicionalSelecionado11[l]),
                                  n.somarAdicionais11(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[10] ||
                                (o[10] = (c) =>
                                  (s.PaesNaChapa[10].selecionados = c)),
                            },
                            null,
                            40,
                            Vf
                          ),
                          [[w, s.PaesNaChapa[10].selecionados]]
                        ),
                        Df,
                      ]),
                      a("label", Uf, p(i.nome), 1),
                      a("label", Lf, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Bf, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[11]
          ? (h(),
            f("div", jf, [
              Hf,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Kf, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado12[l] =
                                  !s.adicionalSelecionado12[l]),
                                  n.somarAdicionais12(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[11] ||
                                (o[11] = (c) =>
                                  (s.PaesNaChapa[11].selecionados = c)),
                            },
                            null,
                            40,
                            Gf
                          ),
                          [[w, s.PaesNaChapa[11].selecionados]]
                        ),
                        Jf,
                      ]),
                      a("label", zf, p(i.nome), 1),
                      a("label", Wf, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", Qf, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.adicionalEstaSelecioando[12]
          ? (h(),
            f("div", Yf, [
              Xf,
              (h(!0),
              f(
                N,
                null,
                R(
                  s.adicionais,
                  (i, l) => (
                    h(),
                    f("div", { id: "item", key: i }, [
                      K(p(s.PaesNaChapa[l].adicionais) + " ", 1),
                      a("label", Zf, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                              onChange: (c) => {
                                (s.adicionalSelecionado13[l] =
                                  !s.adicionalSelecionado13[l]),
                                  n.somarAdicionais13(l, i.preco);
                              },
                              "onUpdate:modelValue":
                                o[12] ||
                                (o[12] = (c) =>
                                  (s.PaesNaChapa[12].selecionados = c)),
                            },
                            null,
                            40,
                            em
                          ),
                          [[w, s.PaesNaChapa[12].selecionados]]
                        ),
                        om,
                      ]),
                      a("label", tm, p(i.nome), 1),
                      a("label", sm, "R$: " + p(i.preco.toFixed(2)), 1),
                      a("p", im, p(i.descricao), 1),
                    ])
                  )
                ),
                128
              )),
            ]))
          : y("", !0),
        s.temItens == !0
          ? (h(),
            f(
              "button",
              {
                key: 13,
                onClick:
                  o[13] ||
                  (o[13] = (i) => (
                    n.somarValorTotal(),
                    n.pedirOutroBurguer(),
                    n.desmarcarTodos(),
                    n.enviarPedido()
                  )),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.temItens == !1
          ? (h(),
            f(
              "button",
              {
                key: 14,
                id: "butOpcoes",
                onClick: o[14] || (o[14] = (i) => n.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var nm = Ae(Ju, [["render", am]]);
const rm = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u(0),
        t = u([]),
        s = u([!0, !0, !0, !0]),
        r = u([!0, !0, !0]),
        n = u([
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
        ]),
        i = u([!0, !0, !0, !0, !0, !0]),
        l = u([!0, !0, !0, !0]),
        c = u([!0, !0, !0, !0]),
        _ = u([!0, !0, !0, !0, !0, !0]),
        v = u([
          {
            nome: "200ML - R$ 7,00",
            descricao: "ENTREGA 1 REAL",
            preco: 7.0,
            quantidade: 0,
            id: 1,
            hash: "",
            selecionados: [],
          },
          {
            nome: "300ML - R$ 10,50",
            descricao: "ENTREGA 1 REAL",
            preco: 10.5,
            quantidade: 0,
            id: 1,
            hash: "",
            selecionados: [],
          },
          {
            nome: "500ML - R$ 17,50",
            descricao: "ENTREGA GR\xC1TIS",
            preco: 17.5,
            quantidade: 0,
            id: 1,
            hash: "",
            selecionados: [],
          },
          {
            nome: "750ML - R$ 26,00",
            descricao: "ENTREGA GR\xC1TIS",
            preco: 24,
            quantidade: 0,
            id: 1,
            hash: "",
            selecionados: [],
          },
        ]),
        k = u([
          {
            nome: "A\xE7a\xED Tradicional",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "A\xE7a\xED Light (FIT)",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "A\xE7a\xED com Banana",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "A\xE7a\xED com Morango",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
        ]),
        b = u([
          { nome: "Chocoball", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Canudos", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Casquinha", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Amendoim", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Leite em p\xF3", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Ovomaltine", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Chocopower", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Marshmallow", preco: 0, id: 3, descricao: "gr\xE1tis" },
          {
            nome: "Gotas de chocolate",
            preco: 0,
            id: 3,
            descricao: "gr\xE1tis",
          },
          { nome: "Cereja", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Pa\xE7oca", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "MM's", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Granola", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Jujuba", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Castanha", preco: 20, id: 3, descricao: "gr\xE1tis" },
          {
            nome: "Gotas de Chocolate",
            preco: 20,
            id: 3,
            descricao: "gr\xE1tis",
          },
          {
            nome: "Farinha L\xE1cta",
            preco: 20,
            id: 3,
            descricao: "gr\xE1tis",
          },
          { nome: "Granulado", preco: 20, id: 3, descricao: "gr\xE1tis" },
        ]),
        $ = u([
          { nome: "Abacaxi", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Kiwi", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Banana", preco: 20, id: 4, descricao: "gr\xE1tis" },
        ]),
        D = u([
          { nome: "Maracuj\xE1", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Chocolate", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Uva", preco: 20, id: 5, descricao: "gr\xE1tis" },
          { nome: "Tutti-Frutti", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Frutas Vermelhas", preco: 0, id: 5, descricao: "gr\xE1tis" },
        ]),
        U = u([
          {
            nome: "Calda Cookies Branco",
            preco: 0,
            id: 6,
            descricao: "gr\xE1tis",
          },
          {
            nome: "Leite Condensado",
            preco: 20,
            id: 6,
            descricao: "gr\xE1tis",
          },
          { nome: "Calda M\xE1gica", preco: 20, id: 6, descricao: "gr\xE1tis" },
        ]),
        F = u([
          { nome: "Ninho", preco: 0, id: 7, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 20, id: 7, descricao: "gr\xE1tis" },
          { nome: "\xD3reo", preco: 20, id: 7, descricao: "gr\xE1tis" },
          { nome: "Energ\xE9tico", preco: 20, id: 7, descricao: "gr\xE1tis" },
          { nome: "Ovomaltine", preco: 20, id: 7, descricao: "gr\xE1tis" },
          { nome: "Cupua\xE7u", preco: 20, id: 7, descricao: "gr\xE1tis" },
        ]),
        L = u([]),
        ie = u([]),
        Q = u([]),
        J = u([]),
        ee = u([]),
        le = u([]),
        j = u([]);
      return {
        cremes: F,
        Creme: j,
        CremesSelecionado: i,
        Caldas: le,
        caldaSelecionado: r,
        caldas: U,
        Peso: ee,
        AcaiSelecionado: c,
        CoberturaSelecionado: _,
        Cobertura: Q,
        FrutasSelecionado: l,
        Guloseimas: L,
        GuloseimasSelecionado: n,
        coberturas: D,
        pesoSelecionado: s,
        frutas: $,
        pesos: v,
        Frutas: ie,
        adicionais: b,
        valorAtual: o,
        acais: k,
        pedido: t,
        Acai: J,
      };
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      receberPedido() {
        this.$emit(
          "receberPedido",
          this.Peso[0],
          this.Acai[0],
          this.Guloseimas,
          this.Frutas,
          this.Caldas,
          this.Cobertura,
          this.Creme
        ),
          (this.Peso = []),
          (this.Acai = []),
          (this.Guloseimas = []),
          (this.Frutas = []),
          (this.Caldas = []),
          (this.Cobertura = []),
          (this.Creme = []);
      },
    },
    watch: {
      Peso(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.pesoSelecionado.length; t++)
            this.pesoSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.pesoSelecionado.length; t++)
            this.pesos[t].nome != e[0].nome && (this.pesoSelecionado[t] = !1);
      },
      Acai(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.AcaiSelecionado.length; t++)
            this.AcaiSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.AcaiSelecionado.length; t++)
            this.acais[t].nome != e[0].nome && (this.AcaiSelecionado[t] = !1);
      },
      Creme(e, o) {
        if (e.length < 2 && e.length != 0)
          for (var t = 0; t < this.CremesSelecionado.length; t++)
            this.cremes[t].nome != e[0].nome &&
              (this.CremesSelecionado[t] = !0);
        if (e.length == 2)
          for (var t = 0; t < this.CremesSelecionado.length; t++)
            this.cremes[t].nome != e[0].nome &&
              this.cremes[t].nome != e[1].nome &&
              (this.CremesSelecionado[t] = !1);
      },
      Caldas(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.caldaSelecionado.length; t++)
            this.caldaSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.caldaSelecionado.length; t++)
            this.caldas[t].nome != e[0].nome && (this.caldaSelecionado[t] = !1);
      },
      Guloseimas(e, o) {
        if (e.length < 7 && e.length != 0)
          for (var t = 0; t < this.GuloseimasSelecionado.length; t++)
            this.adicionais[t].nome != e[0].nome &&
              (this.GuloseimasSelecionado[t] = !0);
        if (e.length == 7) {
          console.log(this.adicionais[0].nome, e[0].nome);
          for (var t = 0; t < this.GuloseimasSelecionado.length; t++)
            this.adicionais[t].nome != e[0].nome &&
              this.adicionais[t].nome != e[1].nome &&
              this.adicionais[t].nome != e[2].nome &&
              this.adicionais[t].nome != e[3].nome &&
              this.adicionais[t].nome != e[4].nome &&
              this.adicionais[t].nome != e[5].nome &&
              this.adicionais[t].nome != e[6].nome &&
              (this.GuloseimasSelecionado[t] = !1);
        }
      },
      Frutas(e, o) {
        if (e.length < 3 && e.length != 0)
          for (var t = 0; t < this.FrutasSelecionado.length; t++)
            this.frutas[t].nome != e[0].nome &&
              (this.FrutasSelecionado[t] = !0);
        if (e.length == 3)
          for (var t = 0; t < this.FrutasSelecionado.length; t++)
            this.frutas[t].nome != e[0].nome &&
              this.frutas[t].nome != e[1].nome &&
              this.frutas[t].nome != e[2].nome &&
              (this.FrutasSelecionado[t] = !1);
      },
      Cobertura(e, o) {
        if (e.length < 4 && e.length != 0)
          for (var t = 0; t < this.CoberturaSelecionado.length; t++)
            this.coberturas[t].nome != e[0].nome &&
              (this.CoberturaSelecionado[t] = !0);
        if (e.length == 4)
          for (var t = 0; t < this.CoberturaSelecionado.length; t++)
            this.coberturas[t].nome != e[0].nome &&
              this.coberturas[t].nome != e[1].nome &&
              this.coberturas[t].nome != e[2].nome &&
              this.coberturas[t].nome != e[3].nome &&
              (this.CoberturaSelecionado[t] = !1);
      },
    },
  },
  lm = { class: "Categoria" },
  cm = a("strong", { id: "categoria" }, "ESCOLHA:", -1),
  dm = { key: 0 },
  um = { class: "container-checkbox", id: "textoPreco3" },
  hm = ["value"],
  fm = a("span", { class: "checkmark" }, null, -1),
  mm = { style: { "pointer-events": "none" }, for: "adicional" },
  pm = { id: "preco" },
  _m = a("br", null, null, -1),
  gm = a("br", null, null, -1),
  bm = a("strong", { id: "categoria" }, "A\xC7A\xCD:", -1),
  vm = { key: 0 },
  Cm = { class: "container-checkbox", id: "textoPreco3" },
  Sm = ["value"],
  Am = a("span", { class: "checkmark" }, null, -1),
  km = { style: { "pointer-events": "none" }, for: "adicional" },
  Pm = { id: "preco" },
  ym = a("br", null, null, -1),
  xm = a("br", null, null, -1),
  Em = a("strong", { id: "categoria" }, "GULOSEIMAS:", -1),
  Tm = { key: 0 },
  Nm = { class: "container-checkbox", id: "textoPreco3" },
  Im = ["value"],
  $m = a("span", { class: "checkmark" }, null, -1),
  Om = { style: { "pointer-events": "none" }, for: "adicional" },
  Fm = { id: "preco" },
  qm = a("br", null, null, -1),
  Mm = a("br", null, null, -1),
  Rm = a("strong", { id: "categoria" }, "FRUTAS:", -1),
  wm = { key: 0 },
  Vm = { class: "container-checkbox", id: "textoPreco3" },
  Dm = ["value"],
  Um = a("span", { class: "checkmark" }, null, -1),
  Lm = { style: { "pointer-events": "none" }, for: "fruta" },
  Bm = { id: "preco" },
  jm = a("br", null, null, -1),
  Hm = a("br", null, null, -1),
  Km = a("strong", { id: "categoria" }, "CALDAS:", -1),
  Gm = { key: 0 },
  Jm = { class: "container-checkbox", id: "textoPreco3" },
  zm = ["value"],
  Wm = a("span", { class: "checkmark" }, null, -1),
  Qm = { style: { "pointer-events": "none" }, for: "calda" },
  Ym = { id: "preco" },
  Xm = a("br", null, null, -1),
  Zm = a("br", null, null, -1),
  ep = a("strong", { id: "categoria" }, "CREMES:", -1),
  op = { key: 0 },
  tp = { class: "container-checkbox", id: "textoPreco3" },
  sp = ["value"],
  ip = a("span", { class: "checkmark" }, null, -1),
  ap = { style: { "pointer-events": "none" }, for: "creme" },
  np = { id: "preco" },
  rp = a("br", null, null, -1),
  lp = a("br", null, null, -1),
  cp = a("strong", { id: "categoria" }, "COBERTURAS:", -1),
  dp = { key: 0 },
  up = { class: "container-checkbox", id: "textoPreco3" },
  hp = ["value"],
  fp = a("span", { class: "checkmark" }, null, -1),
  mp = { style: { "pointer-events": "none" }, for: "cobertura" },
  pp = { id: "preco" };
function _p(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", lm, [
        cm,
        (h(!0),
        f(
          N,
          null,
          R(
            s.pesos,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.pesoSelecionado[l]
                  ? (h(),
                    f("div", dm, [
                      a("label", um, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[0] || (o[0] = (c) => (s.Peso = c)),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            8,
                            hm
                          ),
                          [[w, s.Peso]]
                        ),
                        fm,
                      ]),
                      a("label", mm, p(i.nome), 1),
                      a("label", pm, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        _m,
        gm,
        bm,
        (h(!0),
        f(
          N,
          null,
          R(
            s.acais,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.AcaiSelecionado[l]
                  ? (h(),
                    f("div", vm, [
                      a("label", Cm, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[1] || (o[1] = (c) => (s.Acai = c)),
                              onChange: o[2] || (o[2] = () => {}),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            40,
                            Sm
                          ),
                          [[w, s.Acai]]
                        ),
                        Am,
                      ]),
                      a("label", km, p(i.nome), 1),
                      a("label", Pm, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        ym,
        xm,
        Em,
        (h(!0),
        f(
          N,
          null,
          R(
            s.adicionais,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.GuloseimasSelecionado[l]
                  ? (h(),
                    f("div", Tm, [
                      a("label", Nm, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[3] || (o[3] = (c) => (s.Guloseimas = c)),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            8,
                            Im
                          ),
                          [[w, s.Guloseimas]]
                        ),
                        $m,
                      ]),
                      a("label", Om, p(i.nome), 1),
                      a("label", Fm, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        qm,
        Mm,
        Rm,
        (h(!0),
        f(
          N,
          null,
          R(
            s.frutas,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.FrutasSelecionado[l]
                  ? (h(),
                    f("div", wm, [
                      a("label", Vm, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[4] || (o[4] = (c) => (s.Frutas = c)),
                              class: "checkbox1",
                              id: "fruta",
                              value: i,
                            },
                            null,
                            8,
                            Dm
                          ),
                          [[w, s.Frutas]]
                        ),
                        Um,
                      ]),
                      a("label", Lm, p(i.nome), 1),
                      a("label", Bm, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        jm,
        Hm,
        Km,
        (h(!0),
        f(
          N,
          null,
          R(
            s.caldas,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.caldaSelecionado[l]
                  ? (h(),
                    f("div", Gm, [
                      a("label", Jm, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[5] || (o[5] = (c) => (s.Caldas = c)),
                              class: "checkbox1",
                              id: "fruta",
                              value: i,
                            },
                            null,
                            8,
                            zm
                          ),
                          [[w, s.Caldas]]
                        ),
                        Wm,
                      ]),
                      a("label", Qm, p(i.nome), 1),
                      a("label", Ym, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        Xm,
        Zm,
        ep,
        (h(!0),
        f(
          N,
          null,
          R(
            s.cremes,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.CremesSelecionado[l]
                  ? (h(),
                    f("div", op, [
                      a("label", tp, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[6] || (o[6] = (c) => (s.Creme = c)),
                              class: "checkbox1",
                              id: "fruta",
                              value: i,
                            },
                            null,
                            8,
                            sp
                          ),
                          [[w, s.Creme]]
                        ),
                        ip,
                      ]),
                      a("label", ap, p(i.nome), 1),
                      a("label", np, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        rp,
        lp,
        cp,
        (h(!0),
        f(
          N,
          null,
          R(
            s.coberturas,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.CoberturaSelecionado[l]
                  ? (h(),
                    f("div", dp, [
                      a("label", up, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[7] || (o[7] = (c) => (s.Cobertura = c)),
                              class: "checkbox1",
                              id: "cobertura",
                              value: i,
                            },
                            null,
                            8,
                            hp
                          ),
                          [[w, s.Cobertura]]
                        ),
                        fp,
                      ]),
                      a("label", mp, p(i.nome), 1),
                      a("label", pp, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        s.Peso.length == 1 && s.Acai.length == 1
          ? (h(),
            f(
              "button",
              {
                key: 0,
                onClick:
                  o[8] ||
                  (o[8] = (i) => (n.receberPedido(), n.desmarcarTodos())),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.Peso.length == 0 || s.Acai.length == 0
          ? (h(),
            f(
              "button",
              {
                key: 1,
                onClick: o[9] || (o[9] = (i) => n.desmarcarTodos()),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var gp = Ae(rm, [["render", _p]]);
const bp = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u([
          {
            nome: "Acerola",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Abacaxi",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Caj\xE1 Umbu",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Abacaxi",
            descricao: "",
            preco: 3.5,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Goiaba",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Graviola",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Manga",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 8,
            hash: "",
          },
          {
            nome: "Maracuj\xE1",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 8,
            hash: "",
          },
        ]),
        t = u(0),
        s = u([]);
      return {
        valorTemp: 0,
        pedidosSelecionados: s,
        entradas: o,
        valorAtual: t,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        var e = "";
        (e = JSON.stringify(this.pedidosSelecionados)),
          (e = e.slice(1, e.length - 1)),
          this.$emit("receberPedido", e, this.valorAtual);
        for (var o = 0; o < this.entradas.length; o++)
          this.entradas[o].quantidade = 0;
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((s) => s.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
    },
  },
  vp = { id: "fixedContainer" },
  Cp = { id: "textoPreco" },
  Sp = a("span", null, "R$: ", -1),
  Ap = { id: "totalcost" },
  kp = { class: "Categoria" },
  Pp = a("strong", { id: "categoria" }, "SUCOS:", -1),
  yp = { id: "listar" },
  xp = ["onClick"],
  Ep = ["onClick"],
  Tp = { class: "container-checkbox2" },
  Np = { id: "preco" },
  Ip = { id: "itens" };
function $p(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", vp, [
        a("div", Cp, [
          Sp,
          a(
            "span",
            Ap,
            p(s.valorAtual.toFixed(2) <= 0 ? "0.00" : s.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      a("div", kp, [
        Pp,
        a("div", yp, [
          (h(!0),
          f(
            N,
            null,
            R(
              s.entradas,
              (i) => (
                h(),
                f("div", { id: "item", key: i }, [
                  a(
                    "button",
                    {
                      id: "butsomar",
                      onClick: (l) => (
                        i.quantidade++,
                        n.somarValor(i.preco),
                        n.adicionarPedido(i)
                      ),
                    },
                    " + ",
                    8,
                    xp
                  ),
                  i.quantidade > 0
                    ? (h(),
                      f(
                        "button",
                        {
                          key: 0,
                          id: "butdiminuir",
                          onClick: (l) => (
                            i.quantidade--,
                            n.subtrairValor(i.preco),
                            n.removerPedido(i)
                          ),
                        },
                        " - ",
                        8,
                        Ep
                      ))
                    : y("", !0),
                  a("label", Tp, [
                    K(" x" + p(i.quantidade) + " - " + p(i.nome) + " ", 1),
                    a("label", Np, "R$: " + p(i.preco.toFixed(2)), 1),
                  ]),
                  a("p", Ip, p(i.descricao), 1),
                ])
              )
            ),
            128
          )),
        ]),
        s.valorAtual > 0
          ? (h(),
            f(
              "button",
              {
                key: 0,
                id: "butOpcoes",
                onClick:
                  o[0] ||
                  (o[0] = (i) => (
                    n.enviarPedido(), n.somarValorTotal(), n.desmarcarTodos()
                  )),
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.valorAtual <= 0
          ? (h(),
            f(
              "button",
              {
                key: 1,
                id: "butOpcoes",
                onClick: o[1] || (o[1] = (i) => n.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var Op = Ae(bp, [["render", $p]]);
const Fp = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u([
          {
            nome: "Acerola",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Abacaxi",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Caj\xE1 Umbu",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Abacaxi",
            descricao: "",
            preco: 3.5,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Goiaba",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Graviola",
            descricao: "",
            preco: 4.5,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Manga",
            descricao: "",
            preco: 3,
            quantidade: 0,
            id: 10,
            hash: "",
          },
          {
            nome: "Maracuj\xE1",
            descricao: "",
            preco: 5,
            quantidade: 0,
            id: 10,
            hash: "",
          },
        ]),
        t = u(0),
        s = u([]);
      return {
        valorTemp: 0,
        pedidosSelecionados: s,
        entradas: o,
        valorAtual: t,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        var e = "";
        (e = JSON.stringify(this.pedidosSelecionados)),
          (e = e.slice(1, e.length - 1)),
          this.$emit("receberPedido", e, this.valorAtual);
        for (var o = 0; o < this.entradas.length; o++)
          this.entradas[o].quantidade = 0;
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((s) => s.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
    },
  },
  qp = { id: "fixedContainer" },
  Mp = { id: "textoPreco" },
  Rp = a("span", null, "R$: ", -1),
  wp = { id: "totalcost" },
  Vp = { class: "Categoria" },
  Dp = a("strong", { id: "categoria" }, "VITAMINAS:", -1),
  Up = { id: "listar" },
  Lp = ["onClick"],
  Bp = ["onClick"],
  jp = { class: "container-checkbox2" },
  Hp = { id: "preco" },
  Kp = { id: "itens" };
function Gp(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", qp, [
        a("div", Mp, [
          Rp,
          a(
            "span",
            wp,
            p(s.valorAtual.toFixed(2) <= 0 ? "0.00" : s.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      a("div", Vp, [
        Dp,
        a("div", Up, [
          (h(!0),
          f(
            N,
            null,
            R(
              s.entradas,
              (i) => (
                h(),
                f("div", { id: "item", key: i }, [
                  a(
                    "button",
                    {
                      id: "butsomar",
                      onClick: (l) => (
                        i.quantidade++,
                        n.somarValor(i.preco),
                        n.adicionarPedido(i)
                      ),
                    },
                    " + ",
                    8,
                    Lp
                  ),
                  i.quantidade > 0
                    ? (h(),
                      f(
                        "button",
                        {
                          key: 0,
                          id: "butdiminuir",
                          onClick: (l) => (
                            i.quantidade--,
                            n.subtrairValor(i.preco),
                            n.removerPedido(i)
                          ),
                        },
                        " - ",
                        8,
                        Bp
                      ))
                    : y("", !0),
                  a("label", jp, [
                    K(" x" + p(i.quantidade) + " - " + p(i.nome) + " ", 1),
                    a("label", Hp, "R$: " + p(i.preco.toFixed(2)), 1),
                  ]),
                  a("p", Kp, p(i.descricao), 1),
                ])
              )
            ),
            128
          )),
        ]),
        s.valorAtual > 0
          ? (h(),
            f(
              "button",
              {
                key: 0,
                id: "butOpcoes",
                onClick:
                  o[0] ||
                  (o[0] = (i) => (
                    n.enviarPedido(), n.somarValorTotal(), n.desmarcarTodos()
                  )),
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.valorAtual <= 0
          ? (h(),
            f(
              "button",
              {
                key: 1,
                id: "butOpcoes",
                onClick: o[1] || (o[1] = (i) => n.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var Jp = Ae(Fp, [["render", Gp]]);
const zp = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u(0),
        t = u([]),
        s = u([!0, !0]),
        r = u([
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
          !0,
        ]),
        n = u([!0, !0, !0, !0]),
        i = u([!0, !0, !0, !0, !0, !0, !0, !0, !0]),
        l = u([!0, !0, !0, !0, !0, !0, !0, !0, !0]),
        c = u([
          {
            nome: "300ML - R$ 10,00",
            descricao: " ENTREGA 1 REAL",
            preco: 10,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
          {
            nome: "500ML - R$ 12,90",
            descricao: " ENTREGA 1 REAL",
            preco: 12.9,
            quantidade: 0,
            id: 9,
            hash: "",
            selecionados: [],
          },
        ]),
        _ = u([
          {
            nome: "Chocolate",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Morango",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Bombom",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Ovomaltine",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Doce de Leite",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Brigadeiro",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Prest\xEDgio",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Flocos",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
          {
            nome: "Napolitano",
            descricao: "gr\xE1tis",
            preco: 0,
            quantidade: 0,
            id: 2,
            hash: "",
            selecionados: [],
          },
        ]),
        v = u([
          { nome: "Chocoball", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Canudos", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Casquinha", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Amendoim", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Leite em p\xF3", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Ovomaltine", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Chocopower", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Marshmallow", preco: 0, id: 3, descricao: "gr\xE1tis" },
          {
            nome: "Gotas de chocolate",
            preco: 0,
            id: 3,
            descricao: "gr\xE1tis",
          },
          { nome: "Cereja", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Pa\xE7oca", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "MM's", preco: 0, id: 3, descricao: "gr\xE1tis" },
          { nome: "Granola", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Jujuba", preco: 20, id: 3, descricao: "gr\xE1tis" },
          { nome: "Castanha", preco: 20, id: 3, descricao: "gr\xE1tis" },
          {
            nome: "Gotas de Chocolate",
            preco: 20,
            id: 3,
            descricao: "gr\xE1tis",
          },
          {
            nome: "Farinha L\xE1cta",
            preco: 20,
            id: 3,
            descricao: "gr\xE1tis",
          },
          { nome: "Granulado", preco: 20, id: 3, descricao: "gr\xE1tis" },
        ]),
        k = u([
          { nome: "Abacaxi", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Kiwi", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 0, id: 4, descricao: "gr\xE1tis" },
          { nome: "Banana", preco: 20, id: 4, descricao: "gr\xE1tis" },
        ]),
        b = u([
          { nome: "Maracuj\xE1", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Chocolate", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Morango", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Uva", preco: 20, id: 5, descricao: "gr\xE1tis" },
          { nome: "Doce de Leite", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Tutti-Frutti", preco: 0, id: 5, descricao: "gr\xE1tis" },
          { nome: "Frutas Vermelhas", preco: 0, id: 5, descricao: "gr\xE1tis" },
          {
            nome: "Leite Condensado",
            preco: 20,
            id: 5,
            descricao: "gr\xE1tis",
          },
          { nome: "Calda M\xE1gica", preco: 20, id: 5, descricao: "gr\xE1tis" },
        ]),
        $ = u([]),
        D = u([]),
        U = u([]),
        F = u([]);
      return {
        Peso: u([]),
        AcaiSelecionado: i,
        CoberturaSelecionado: l,
        Cobertura: U,
        FrutasSelecionado: n,
        Guloseimas: $,
        GuloseimasSelecionado: r,
        coberturas: b,
        pesoSelecionado: s,
        frutas: k,
        pesos: c,
        Frutas: D,
        adicionais: v,
        valorAtual: o,
        acais: _,
        pedido: t,
        Acai: F,
      };
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      receberPedido() {
        this.$emit(
          "receberPedido",
          this.Peso[0],
          this.Acai[0],
          this.Guloseimas,
          this.Frutas,
          this.Caldas,
          this.Cobertura,
          this.Creme
        ),
          (this.Peso = []),
          (this.Acai = []),
          (this.Guloseimas = []),
          (this.Frutas = []),
          (this.Caldas = []),
          (this.Cobertura = []),
          (this.Creme = []);
      },
    },
    watch: {
      Peso(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.pesoSelecionado.length; t++)
            this.pesoSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.pesoSelecionado.length; t++)
            this.pesos[t].nome != e[0].nome && (this.pesoSelecionado[t] = !1);
      },
      Acai(e, o) {
        if (e.length == 0)
          for (var t = 0; t < this.AcaiSelecionado.length; t++)
            this.AcaiSelecionado[t] = !0;
        if (e.length == 1)
          for (var t = 0; t < this.AcaiSelecionado.length; t++)
            this.acais[t].nome != e[0].nome && (this.AcaiSelecionado[t] = !1);
      },
      Guloseimas(e, o) {
        if (e.length < 2 && e.length != 0)
          for (var t = 0; t < this.GuloseimasSelecionado.length; t++)
            this.adicionais[t].nome != e[0].nome &&
              (this.GuloseimasSelecionado[t] = !0);
        if (e.length == 2) {
          console.log(this.adicionais[0].nome, e[0].nome);
          for (var t = 0; t < this.GuloseimasSelecionado.length; t++)
            this.adicionais[t].nome != e[0].nome &&
              this.adicionais[t].nome != e[1].nome &&
              (this.GuloseimasSelecionado[t] = !1);
        }
      },
      Frutas(e, o) {
        if (e.length < 3 && e.length != 0)
          for (var t = 0; t < this.FrutasSelecionado.length; t++)
            this.frutas[t].nome != e[0].nome &&
              (this.FrutasSelecionado[t] = !0);
        if (e.length == 3)
          for (var t = 0; t < this.FrutasSelecionado.length; t++)
            this.frutas[t].nome != e[0].nome &&
              this.frutas[t].nome != e[1].nome &&
              this.frutas[t].nome != e[2].nome &&
              (this.FrutasSelecionado[t] = !1);
      },
      Cobertura(e, o) {
        if (e.length < 2 && e.length != 0)
          for (var t = 0; t < this.CoberturaSelecionado.length; t++)
            this.coberturas[t].nome != e[0].nome &&
              (this.CoberturaSelecionado[t] = !0);
        if (e.length == 2)
          for (var t = 0; t < this.CoberturaSelecionado.length; t++)
            this.coberturas[t].nome != e[0].nome &&
              this.coberturas[t].nome != e[1].nome &&
              (this.CoberturaSelecionado[t] = !1);
      },
    },
  },
  Wp = { class: "Categoria" },
  Qp = a("strong", { id: "categoria" }, "ESCOLHA:", -1),
  Yp = { key: 0 },
  Xp = { class: "container-checkbox", id: "textoPreco3" },
  Zp = ["value"],
  e_ = a("span", { class: "checkmark" }, null, -1),
  o_ = { style: { "pointer-events": "none" }, for: "adicional" },
  t_ = { id: "preco" },
  s_ = a("br", null, null, -1),
  i_ = a("br", null, null, -1),
  a_ = a("strong", { id: "categoria" }, "MILKSHAKE:", -1),
  n_ = { key: 0 },
  r_ = { class: "container-checkbox", id: "textoPreco3" },
  l_ = ["value"],
  c_ = a("span", { class: "checkmark" }, null, -1),
  d_ = { style: { "pointer-events": "none" }, for: "adicional" },
  u_ = { id: "preco" },
  h_ = a("br", null, null, -1),
  f_ = a("br", null, null, -1),
  m_ = a("strong", { id: "categoria" }, "GULOSEIMAS:", -1),
  p_ = { key: 0 },
  __ = { class: "container-checkbox", id: "textoPreco3" },
  g_ = ["value"],
  b_ = a("span", { class: "checkmark" }, null, -1),
  v_ = { style: { "pointer-events": "none" }, for: "adicional" },
  C_ = { id: "preco" },
  S_ = a("br", null, null, -1),
  A_ = a("br", null, null, -1),
  k_ = a("strong", { id: "categoria" }, "COBERTURAS:", -1),
  P_ = { key: 0 },
  y_ = { class: "container-checkbox", id: "textoPreco3" },
  x_ = ["value"],
  E_ = a("span", { class: "checkmark" }, null, -1),
  T_ = { style: { "pointer-events": "none" }, for: "cobertura" },
  N_ = { id: "preco" };
function I_(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", Wp, [
        Qp,
        (h(!0),
        f(
          N,
          null,
          R(
            s.pesos,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.pesoSelecionado[l]
                  ? (h(),
                    f("div", Yp, [
                      a("label", Xp, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[0] || (o[0] = (c) => (s.Peso = c)),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            8,
                            Zp
                          ),
                          [[w, s.Peso]]
                        ),
                        e_,
                      ]),
                      a("label", o_, p(i.nome), 1),
                      a("label", t_, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        s_,
        i_,
        a_,
        (h(!0),
        f(
          N,
          null,
          R(
            s.acais,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.AcaiSelecionado[l]
                  ? (h(),
                    f("div", n_, [
                      a("label", r_, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[1] || (o[1] = (c) => (s.Acai = c)),
                              onChange: o[2] || (o[2] = () => {}),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            40,
                            l_
                          ),
                          [[w, s.Acai]]
                        ),
                        c_,
                      ]),
                      a("label", d_, p(i.nome), 1),
                      a("label", u_, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        h_,
        f_,
        m_,
        (h(!0),
        f(
          N,
          null,
          R(
            s.adicionais,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.GuloseimasSelecionado[l]
                  ? (h(),
                    f("div", p_, [
                      a("label", __, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[3] || (o[3] = (c) => (s.Guloseimas = c)),
                              class: "checkbox1",
                              id: "adicional",
                              value: i,
                            },
                            null,
                            8,
                            g_
                          ),
                          [[w, s.Guloseimas]]
                        ),
                        b_,
                      ]),
                      a("label", v_, p(i.nome), 1),
                      a("label", C_, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        S_,
        A_,
        k_,
        (h(!0),
        f(
          N,
          null,
          R(
            s.coberturas,
            (i, l) => (
              h(),
              f("div", { id: "item", key: i }, [
                s.CoberturaSelecionado[l]
                  ? (h(),
                    f("div", P_, [
                      a("label", y_, [
                        O(
                          a(
                            "input",
                            {
                              type: "checkbox",
                              "onUpdate:modelValue":
                                o[4] || (o[4] = (c) => (s.Cobertura = c)),
                              class: "checkbox1",
                              id: "cobertura",
                              value: i,
                            },
                            null,
                            8,
                            x_
                          ),
                          [[w, s.Cobertura]]
                        ),
                        E_,
                      ]),
                      a("label", T_, p(i.nome), 1),
                      a("label", N_, p(i.descricao), 1),
                    ]))
                  : y("", !0),
              ])
            )
          ),
          128
        )),
        s.Peso.length == 1 && s.Acai.length == 1
          ? (h(),
            f(
              "button",
              {
                key: 0,
                onClick:
                  o[5] ||
                  (o[5] = (i) => (n.receberPedido(), n.desmarcarTodos())),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.Peso.length == 0 || s.Acai.length == 0
          ? (h(),
            f(
              "button",
              {
                key: 1,
                onClick: o[6] || (o[6] = (i) => n.desmarcarTodos()),
                id: "butOpcoes",
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var $_ = Ae(zp, [["render", I_]]);
const O_ = {
    props: { valorTotal: { type: Number } },
    setup(e) {
      const o = u([
          {
            nome: "Enroladinho",
            preco: 0.37,
            quantidade: 0,
            id: 6,
            descricao: "",
          },
          {
            nome: "Coxinha p",
            preco: 0.37,
            quantidade: 0,
            id: 6,
            descricao: "",
          },
          {
            nome: "Coxinha g",
            preco: 3.9,
            quantidade: 0,
            id: 6,
            descricao: "",
          },
          {
            nome: "Bolinha de Queijo ",
            preco: 0.45,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Empada de Frango",
            preco: 5.9,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Empada de Carne de Sol",
            preco: 5.9,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pastel de Carne",
            preco: 2.5,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pastel de Queijo",
            preco: 2.5,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pastel de Frango",
            preco: 2.5,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pastelzinho de Carne",
            preco: 0.37,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Torta de Frango",
            preco: 4.9,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Torta de Carne de Sol",
            preco: 4.9,
            quantidade: 0,
            id: 6,
            hash: "",
            descricao: "",
          },
          {
            nome: "Pizza Fatia",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Canudinho",
            preco: 0.37,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Croquete",
            preco: 0.75,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Croissant",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Folheado de Frango",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Folheado de Carne de Sol",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Folheado de Queijo e Presunto",
            preco: 5.9,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Rosquinha de Queijo ",
            preco: 2.2,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
          {
            nome: "Empadinha",
            preco: 0.45,
            quantidade: 0,
            id: 2,
            descricao: "",
          },
        ]),
        t = u(0),
        s = u([]);
      return {
        valorTemp: 0,
        pedidosSelecionados: s,
        entradas: o,
        valorAtual: t,
      };
    },
    created() {
      (this.valorTemp = this.valorTotal), (this.valorAtual = this.valorTotal);
    },
    methods: {
      desmarcarTodos() {
        this.$emit("desmarcarTodos");
      },
      somarValorTotal() {
        this.$emit("somarValorTotal", this.valorAtual - this.valorTemp);
      },
      enviarPedido() {
        var e = "";
        (e = JSON.stringify(this.pedidosSelecionados)),
          (e = e.slice(1, e.length - 1)),
          this.$emit("receberPedido", e, this.valorAtual);
        for (var o = 0; o < this.entradas.length; o++)
          this.entradas[o].quantidade = 0;
      },
      somarValor(e) {
        this.valorAtual += e;
      },
      subtrairValor(e) {
        this.valorAtual -= e;
      },
      adicionarPedido(e) {
        this.pedidosSelecionados.push(e),
          (this.pedidosSelecionados = this.pedidosSelecionados.reduce(
            (o, t) => (o.some((s) => s.nome === t.nome) || o.push(t), o),
            []
          )),
          (this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
            o
          ) {
            return o.quantidade != 0;
          }));
      },
      removerPedido() {
        this.pedidosSelecionados = this.pedidosSelecionados.filter(function (
          e
        ) {
          return e.quantidade != 0;
        });
      },
    },
  },
  F_ = { id: "fixedContainer" },
  q_ = { id: "textoPreco" },
  M_ = a("span", null, "R$: ", -1),
  R_ = { id: "totalcost" },
  w_ = { class: "Categoria" },
  V_ = a("strong", { id: "categoria" }, "SALGADINHOS:", -1),
  D_ = { id: "listar" },
  U_ = ["onClick"],
  L_ = ["onClick"],
  B_ = { class: "container-checkbox2" },
  j_ = { id: "preco" },
  H_ = { id: "itens" };
function K_(e, o, t, s, r, n) {
  return (
    h(),
    f("div", null, [
      a("div", F_, [
        a("div", q_, [
          M_,
          a(
            "span",
            R_,
            p(s.valorAtual.toFixed(2) <= 0 ? "0.00" : s.valorAtual.toFixed(2)),
            1
          ),
        ]),
      ]),
      a("div", w_, [
        V_,
        a("div", D_, [
          (h(!0),
          f(
            N,
            null,
            R(
              s.entradas,
              (i) => (
                h(),
                f("div", { id: "item", key: i }, [
                  a(
                    "button",
                    {
                      id: "butsomar",
                      onClick: (l) => (
                        i.quantidade++,
                        n.somarValor(i.preco),
                        n.adicionarPedido(i)
                      ),
                    },
                    " + ",
                    8,
                    U_
                  ),
                  i.quantidade > 0
                    ? (h(),
                      f(
                        "button",
                        {
                          key: 0,
                          id: "butdiminuir",
                          onClick: (l) => (
                            i.quantidade--,
                            n.subtrairValor(i.preco),
                            n.removerPedido(i)
                          ),
                        },
                        " - ",
                        8,
                        L_
                      ))
                    : y("", !0),
                  a("label", B_, [
                    K(" x" + p(i.quantidade) + " - " + p(i.nome) + " ", 1),
                    a("label", j_, "R$: " + p(i.preco.toFixed(2)), 1),
                  ]),
                  a("p", H_, p(i.descricao), 1),
                ])
              )
            ),
            128
          )),
        ]),
        s.valorAtual > 0
          ? (h(),
            f(
              "button",
              {
                key: 0,
                id: "butOpcoes",
                onClick:
                  o[0] ||
                  (o[0] = (i) => (
                    n.enviarPedido(), n.somarValorTotal(), n.desmarcarTodos()
                  )),
                type: "submit",
                value: "Submit",
              },
              " Concluir "
            ))
          : y("", !0),
        s.valorAtual <= 0
          ? (h(),
            f(
              "button",
              {
                key: 1,
                id: "butOpcoes",
                onClick: o[1] || (o[1] = (i) => n.desmarcarTodos()),
                type: "submit",
                value: "Submit",
              },
              " Voltar "
            ))
          : y("", !0),
      ]),
    ])
  );
}
var G_ = Ae(O_, [["render", K_]]),
  J_ = "/logoD.webp";
const z_ = {
    setup() {
      const e = u(0),
        o = u([]);
      u([]);
      const t = u([!1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
        s = u(!0),
        r = u(),
        n = u(!1),
        i = u(!1),
        l = u(!1),
        c = u(!1),
        _ = u(!1),
        v = u(!1),
        k = u(!1),
        b = u(!1),
        $ = u(!1),
        D = u(!1),
        U = u(""),
        F = u(""),
        L = u(""),
        ie = u(""),
        Q = u(""),
        J = u(""),
        ee = u(""),
        le = u(""),
        j = u(""),
        oe = u(0);
      return {
        meusPedidos: u([]),
        taxaDeEntrega: oe,
        bairroSelect: j,
        aparecerFinalizarPedido: i,
        aparecerCarrinho: n,
        pedidosJson: r,
        valorAtual: e,
        todosOsPedidos: o,
        categoriaSelecionada: t,
        aparecerCardapio: s,
        nome: U,
        rua: F,
        observacoes: le,
        voubuscar: k,
        cartaoselecionado: v,
        pixselecionado: c,
        queroentrega: l,
        dinheiroselecionado: _,
        bairro: L,
        numero: ie,
        formaDePagamento: ee,
        nome2: J,
        pontodereferencia: Q,
        checkCartao: $,
        checkDinheiro: D,
        checkPix: b,
      };
    },
    watch: {
      todosOsPedidos(e, o) {
        console.log(e);
        var t;
        (t = this.todosOsPedidos),
          (t = t.slice(0, t.length - 1)),
          (t = "[" + t + "]"),
          console.log(this.pedidosJson),
          (this.pedidosJson = JSON.parse(t));
        for (var s = 0; s < this.pedidosJson.length; s++)
          this.pedidosJson[s].hash = Math.random().toString(36).substring(5);
      },
      bairroSelect(e, o) {
        console.log(this.bairroSelect),
          this.bairroSelect == "Cidade Alta" && (this.taxaDeEntrega = 5),
          this.bairroSelect == "Bom Fim" && (this.taxaDeEntrega = 3.5),
          this.bairroSelect == "S\xEDtio Arraial" && (this.taxaDeEntrega = 5),
          this.bairroSelect == "Flores" && (this.taxaDeEntrega = 7),
          this.bairroSelect == "Luis Alves" && (this.taxaDeEntrega = 3.5),
          this.bairroSelect == "S\xEDtio Morros" && (this.taxaDeEntrega = 4),
          this.bairroSelect == "S\xEDtio Milagres" && (this.taxaDeEntrega = 5),
          this.bairroSelect == "S\xE3o Raimundo" && (this.taxaDeEntrega = 5),
          this.bairroSelect == "Multir\xE3o das Flores" &&
            (this.taxaDeEntrega = 4.5),
          this.bairroSelect == "Amaresco" && (this.taxaDeEntrega = 3),
          this.bairroSelect == "Boa F\xE9" && (this.taxaDeEntrega = 3.5),
          this.bairroSelect == "Bom Nome" && (this.taxaDeEntrega = 3),
          this.bairroSelect == "Provale" && (this.taxaDeEntrega = 4),
          this.bairroSelect == "S\xEDtio Socorro" && (this.taxaDeEntrega = 3),
          this.bairroSelect == "Centro" && (this.taxaDeEntrega = 2.5);
      },
    },
    components: {
      Crepiocas: $_,
      Vitaminas: Jp,
      Sanduiches: nm,
      Tapiocas: Gu,
      Home: Or,
      Footer: Vr,
      PaoNaChapa: Wl,
      Cuscuz: Ad,
      Omeletes: gu,
      Cafes: gp,
      Sucos: Op,
      Salgadinhos: G_,
    },
    mounted() {
      var e;
      (e = localStorage.getItem("enderecodousuario")),
        (e = JSON.parse(e)),
        e != null &&
          ((this.nome = e.nome),
          (this.rua = e.rua),
          (this.bairro = e.bairro),
          (this.numero = e.numero),
          (this.pontodereferencia = e.pontoderef),
          (this.nome2 = e.nome2));
    },
    methods: {
      enviar() {
        var e = {
          nome: this.nome,
          rua: this.rua,
          bairro: this.bairro,
          numero: this.numero,
          pontoderef: this.pontodereferencia,
          nome2: this.nome2,
        };
        localStorage.setItem("enderecodousuario", JSON.stringify(e)),
          this.checkPix && (this.formaDePagamento = "PIX"),
          this.checkCartao && (this.formaDePagamento = "Cart\xE3o"),
          this.checkDinheiro && (this.formaDePagamento = "Dinheiro"),
          console.log(this.formaDePagamento),
          console.log(e),
          console.log(this.observacoes),
          (window.location.href = `http://18.230.167.89:4444/enviarpedido/${JSON.stringify(
            this.meusPedidos
          )}/${JSON.stringify(e)}/${JSON.stringify(
            this.formaDePagamento
          )}/${JSON.stringify(this.observacoes)}/${JSON.stringify(
            this.valorAtual
          )}/${JSON.stringify(this.queroentrega)}`);
      },
      queroEntrega() {
        this.queroentrega == !1
          ? ((this.queroentrega = !0), (this.valorAtual += this.taxaDeEntrega))
          : ((this.queroentrega = !1), (this.valorAtual -= this.taxaDeEntrega));
      },
      vouBuscar() {
        this.voubuscar == !1 ? (this.voubuscar = !0) : (this.voubuscar = !1);
      },
      escolherPIX() {
        this.pixselecionado == !1
          ? (this.pixselecionado = !0)
          : (this.pixselecionado = !1),
          navigator.clipboard.writeText("88996320889"),
          (this.checkCartao = !1),
          (this.checkDinheiro = !1),
          (this.checkPix = !0);
      },
      escolherDinheiro() {
        this.dinheiroselecionado == !1
          ? ((this.dinheiroselecionado = !0), (this.pixselecionado = !1))
          : (this.dinheiroselecionado = !1),
          (this.checkCartao = !1),
          (this.checkPix = !1),
          (this.checkDinheiro = !0);
      },
      escolherCartao() {
        this.cartaoselecionado == !1
          ? ((this.cartaoselecionado = !0), (this.pixselecionado = !1))
          : (this.cartaoselecionado = !1),
          (this.checkDinheiro = !1),
          (this.checkPix = !1),
          (this.checkCartao = !0);
      },
      AparecerCardapio() {
        this.valorAtual > 0 &&
          ((this.aparecerFinalizarPedido = !0),
          (this.categoriaSelecionada = [
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
            !1,
          ]),
          (this.aparecerCardapio = !1));
      },
      desmarcarTodos() {
        (this.categoriaSelecionada = [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
          (this.aparecerCardapio = !0);
      },
      voltarEnvio() {
        (this.categoriaSelecionada = [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
          (this.aparecerCardapio = !0),
          (this.aparecerCarrinho = !1);
      },
      selecionarItem(e) {
        (this.categoriaSelecionada[e] = !0), (this.aparecerCardapio = !1);
      },
      receberPedido(e, o, t, s, r, n, i) {
        this.meusPedidos.push({
          Peso: e,
          Acai: o,
          Guloseimas: t,
          Frutas: s,
          Caldas: r,
          Cobertura: n,
          Cremes: i,
        }),
          (this.valorAtual += e.preco),
          console.log(this.meusPedidos);
      },
    },
  },
  W_ = { id: "cardapio" },
  Q_ = a("img", { src: J_, id: "logo", alt: "logo" }, null, -1),
  Y_ = a("br", null, null, -1),
  X_ = { key: 0, id: "fixedContainer2" },
  Z_ = { id: "textoPreco" },
  eg = a("span", { id: "totalcost" }, null, -1),
  og = { key: 1, id: "fixedContainer" },
  tg = { id: "textoPreco" },
  sg = a("span", null, "R$: ", -1),
  ig = { id: "totalcost" },
  ag = a("div", { id: "listar" }, null, -1),
  ng = { key: 0, class: "escolhas" },
  rg = { id: "opcoes" },
  lg = a("br", null, null, -1),
  cg = a("br", null, null, -1),
  dg = a("strong", { class: "tituloEscolha" }, "MET\xD3DO DE ENTREGA:", -1),
  ug = a("br", null, null, -1),
  hg = a("br", null, null, -1),
  fg = { class: "container-checkbox", id: "textonaocelecionado2" },
  mg = K("Quero Entrega"),
  pg = a("label", { id: "entregapreco" }, "Gr\xE1tis (R$: 15 total)", -1),
  _g = ["disabled"],
  gg = a("span", { class: "checkmark" }, null, -1),
  bg = a("br", null, null, -1),
  vg = a("br", null, null, -1),
  Cg = { key: 0 },
  Sg = a("strong", { class: "tituloEscolha" }, "SEU ENDERE\xC7O:", -1),
  Ag = K(),
  kg = a("br", null, null, -1),
  Pg = a("br", null, null, -1),
  yg = a("br", null, null, -1),
  xg = { class: "container-checkbox", id: "textonaocelecionado" },
  Eg = K("Vou Buscar"),
  Tg = a("label", { id: "entregapreco" }, "Gr\xE1tis", -1),
  Ng = a("br", null, null, -1),
  Ig = ["disabled"],
  $g = a("span", { class: "checkmark" }, null, -1),
  Og = a("br", null, null, -1),
  Fg = { key: 1 },
  qg = a("strong", { class: "tituloEscolha" }, "SEU NOME:", -1),
  Mg = K(),
  Rg = a("br", null, null, -1),
  wg = a("br", null, null, -1),
  Vg = a("br", null, null, -1),
  Dg = a("strong", { class: "tituloEscolha" }, "FORMA DE PAGAMENTO:", -1),
  Ug = a("br", null, null, -1),
  Lg = a("br", null, null, -1),
  Bg = { id: "fomormaDePagamento" },
  jg = { class: "container-checkbox", id: "textoPreco1" },
  Hg = K("Cart\xE3o"),
  Kg = a("label", { id: "preco1" }, null, -1),
  Gg = a("span", { class: "checkmark" }, null, -1),
  Jg = { class: "container-checkbox", id: "textoPreco2" },
  zg = K("Dinheiro"),
  Wg = a("label", { id: "preco2" }, null, -1),
  Qg = a("span", { class: "checkmark" }, null, -1),
  Yg = { class: "container-checkbox", id: "textoPreco3" },
  Xg = K("PIX"),
  Zg = a("label", { id: "preco3" }, null, -1),
  e1 = a("span", { class: "checkmark" }, null, -1),
  o1 = { key: 0, id: "copiarpix" },
  t1 = a(
    "p",
    { id: "infopix" },
    [
      K(" 88996320889 \u25BC Dara Moreira Nogueira "),
      a("button", { id: "butcopiarpix" }, "PIX Copiado com sucesso!"),
    ],
    -1
  ),
  s1 = [t1],
  i1 = a("br", null, null, -1),
  a1 = a("strong", { class: "tituloEscolha" }, "OBSERVA\xC7\xD5ES:", -1),
  n1 = K(),
  r1 = a("br", null, null, -1);
function l1(e, o, t, s, r, n) {
  const i = lo("Cafes"),
    l = lo("PaoNaChapa"),
    c = lo("Crepiocas"),
    _ = lo("Tapiocas"),
    v = lo("Home"),
    k = lo("Footer");
  return (
    h(),
    f(
      N,
      null,
      [
        a("div", W_, [
          Q_,
          Y_,
          s.aparecerCardapio
            ? (h(),
              f("div", X_, [
                a("div", Z_, [
                  a("span", null, "R$: " + p(s.valorAtual.toFixed(2)), 1),
                  eg,
                ]),
                a(
                  "p",
                  {
                    onClick: o[0] || (o[0] = (b) => n.AparecerCardapio()),
                    id: "butConcluir",
                  },
                  "FINALIZAR"
                ),
              ]))
            : y("", !0),
          s.aparecerFinalizarPedido
            ? (h(),
              f("div", og, [
                a("div", tg, [
                  sg,
                  a(
                    "span",
                    ig,
                    p(
                      s.valorAtual.toFixed(2) <= 0
                        ? "0.00"
                        : (
                            Number(s.valorAtual) + Number(s.taxaDeEntrega)
                          ).toFixed(2)
                    ),
                    1
                  ),
                ]),
              ]))
            : y("", !0),
          ag,
          s.categoriaSelecionada[0]
            ? (h(),
              uo(
                i,
                {
                  key: 2,
                  onDesmarcarTodos: n.desmarcarTodos,
                  onReceberPedido: n.receberPedido,
                },
                null,
                8,
                ["onDesmarcarTodos", "onReceberPedido"]
              ))
            : y("", !0),
          s.categoriaSelecionada[1]
            ? (h(),
              uo(
                l,
                {
                  key: 3,
                  onDesmarcarTodos: n.desmarcarTodos,
                  onReceberPedido: n.receberPedido,
                },
                null,
                8,
                ["onDesmarcarTodos", "onReceberPedido"]
              ))
            : y("", !0),
          s.categoriaSelecionada[2]
            ? (h(),
              uo(
                c,
                {
                  key: 4,
                  onDesmarcarTodos: n.desmarcarTodos,
                  onReceberPedido: n.receberPedido,
                },
                null,
                8,
                ["onDesmarcarTodos", "onReceberPedido"]
              ))
            : y("", !0),
          s.categoriaSelecionada[3]
            ? (h(),
              uo(
                _,
                {
                  key: 5,
                  onDesmarcarTodos: n.desmarcarTodos,
                  onReceberPedido: n.receberPedido,
                },
                null,
                8,
                ["onDesmarcarTodos", "onReceberPedido"]
              ))
            : y("", !0),
          s.aparecerCardapio
            ? (h(),
              uo(v, { key: 6, onSelecionarItem: n.selecionarItem }, null, 8, [
                "onSelecionarItem",
              ]))
            : y("", !0),
        ]),
        s.aparecerFinalizarPedido
          ? (h(),
            f("div", ng, [
              a("div", rg, [
                lg,
                cg,
                dg,
                ug,
                hg,
                a("label", fg, [
                  mg,
                  pg,
                  a(
                    "input",
                    {
                      name: "checkbox1",
                      type: "checkbox",
                      class: "checkbox1",
                      id: "game28",
                      onChange: o[1] || (o[1] = (b) => n.queroEntrega()),
                      disabled: s.voubuscar,
                      required: "",
                    },
                    null,
                    40,
                    _g
                  ),
                  gg,
                ]),
                bg,
                vg,
                s.queroentrega
                  ? (h(),
                    f("div", Cg, [
                      Sg,
                      Ag,
                      kg,
                      O(
                        a(
                          "input",
                          {
                            id: "endereco",
                            type: "text",
                            name: "nome",
                            placeholder: "Seu Nome",
                            required: "",
                            "onUpdate:modelValue":
                              o[2] || (o[2] = (b) => (s.nome = b)),
                          },
                          null,
                          512
                        ),
                        [[ze, s.nome]]
                      ),
                      O(
                        a(
                          "input",
                          {
                            id: "endereco1",
                            type: "text",
                            name: "rua",
                            placeholder: "Sua Rua",
                            required: "",
                            "onUpdate:modelValue":
                              o[3] || (o[3] = (b) => (s.rua = b)),
                          },
                          null,
                          512
                        ),
                        [[ze, s.rua]]
                      ),
                      O(
                        a(
                          "input",
                          {
                            id: "endereco2",
                            type: "text",
                            name: "bairro",
                            placeholder: " Seu Bairro",
                            required: "",
                            "onUpdate:modelValue":
                              o[4] || (o[4] = (b) => (s.bairro = b)),
                          },
                          null,
                          512
                        ),
                        [[ze, s.bairro]]
                      ),
                      O(
                        a(
                          "input",
                          {
                            id: "endereco3",
                            name: "numero",
                            type: "text",
                            placeholder: " N\xFAmero da Casa",
                            required: "",
                            "onUpdate:modelValue":
                              o[5] || (o[5] = (b) => (s.numero = b)),
                            oninput:
                              "this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*)\\./g, '$1');",
                          },
                          null,
                          512
                        ),
                        [[ze, s.numero]]
                      ),
                      O(
                        a(
                          "input",
                          {
                            id: "endereco4",
                            type: "text",
                            name: "referencia",
                            "onUpdate:modelValue":
                              o[6] || (o[6] = (b) => (s.pontodereferencia = b)),
                            placeholder: " Ponto de Refer\xEAncia(opcional)",
                          },
                          null,
                          512
                        ),
                        [[ze, s.pontodereferencia]]
                      ),
                    ]))
                  : y("", !0),
                Pg,
                yg,
                a("label", xg, [
                  Eg,
                  Tg,
                  Ng,
                  a(
                    "input",
                    {
                      disabled: s.queroentrega,
                      onChange: o[7] || (o[7] = (b) => n.vouBuscar()),
                      type: "checkbox",
                      class: "checkbox2",
                      required: "",
                    },
                    null,
                    40,
                    Ig
                  ),
                  $g,
                ]),
                Og,
                s.voubuscar
                  ? (h(),
                    f("div", Fg, [
                      qg,
                      Mg,
                      Rg,
                      O(
                        a(
                          "input",
                          {
                            id: "endereco5",
                            type: "text",
                            name: "nome2",
                            placeholder: "Seu Nome",
                            required: "",
                            "onUpdate:modelValue":
                              o[8] || (o[8] = (b) => (s.nome2 = b)),
                          },
                          null,
                          512
                        ),
                        [[ze, s.nome2]]
                      ),
                    ]))
                  : y("", !0),
              ]),
              wg,
              Vg,
              Dg,
              Ug,
              Lg,
              a("div", Bg, [
                a("label", jg, [
                  Hg,
                  Kg,
                  O(
                    a(
                      "input",
                      {
                        id: "vaiSerCartao",
                        type: "checkbox",
                        name: "cartao",
                        onChange: o[9] || (o[9] = (b) => n.escolherCartao()),
                        "onUpdate:modelValue":
                          o[10] || (o[10] = (b) => (s.checkCartao = b)),
                        required: "",
                      },
                      null,
                      544
                    ),
                    [[w, s.checkCartao]]
                  ),
                  Gg,
                ]),
                a("label", Jg, [
                  zg,
                  Wg,
                  O(
                    a(
                      "input",
                      {
                        id: "vaiSerDinheiro",
                        type: "checkbox",
                        name: "Dinheiro",
                        onChange:
                          o[11] || (o[11] = (b) => n.escolherDinheiro()),
                        "onUpdate:modelValue":
                          o[12] || (o[12] = (b) => (s.checkDinheiro = b)),
                        required: "",
                      },
                      null,
                      544
                    ),
                    [[w, s.checkDinheiro]]
                  ),
                  Qg,
                ]),
                a("label", Yg, [
                  Xg,
                  Zg,
                  O(
                    a(
                      "input",
                      {
                        name: "checkbox1",
                        type: "checkbox",
                        class: "checkbox1",
                        id: "game28",
                        onChange: o[13] || (o[13] = (b) => n.escolherPIX()),
                        "onUpdate:modelValue":
                          o[14] || (o[14] = (b) => (s.checkPix = b)),
                        required: "",
                      },
                      null,
                      544
                    ),
                    [[w, s.checkPix]]
                  ),
                  e1,
                ]),
              ]),
              s.pixselecionado ? (h(), f("div", o1, s1)) : y("", !0),
              i1,
              a1,
              n1,
              r1,
              O(
                a(
                  "textarea",
                  {
                    placeholder: "Exemplo: Troco para 20 reais",
                    name: "observacao",
                    class: "textinput",
                    "onUpdate:modelValue":
                      o[15] || (o[15] = (b) => (s.observacoes = b)),
                  },
                  null,
                  512
                ),
                [[ze, s.observacoes]]
              ),
              a(
                "button",
                {
                  id: "butOpcoes",
                  onClick: o[16] || (o[16] = (b) => n.enviar()),
                  class: "checkBtn",
                  type: "submit",
                  value: "Submit",
                },
                " Enviar "
              ),
            ]))
          : y("", !0),
        Te(k),
      ],
      64
    )
  );
}
var c1 = Ae(z_, [["render", l1]]);
Sr(c1).mount("#app");
