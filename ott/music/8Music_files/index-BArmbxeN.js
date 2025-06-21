(function() {
	const s = document.createElement("link").relList;
	if (s && s.supports && s.supports("modulepreload")) return;
	for (const f of document.querySelectorAll('link[rel="modulepreload"]')) d(f);
	new MutationObserver(f => {
		for (const m of f)
			if (m.type === "childList")
				for (const y of m.addedNodes) y.tagName === "LINK" && y.rel === "modulepreload" && d(y)
	}).observe(document, {
		childList: !0,
		subtree: !0
	});

	function o(f) {
		const m = {};
		return f.integrity && (m.integrity = f.integrity), f.referrerPolicy && (m.referrerPolicy = f.referrerPolicy), f.crossOrigin === "use-credentials" ? m.credentials = "include" : f.crossOrigin === "anonymous" ? m.credentials = "omit" : m.credentials = "same-origin", m
	}

	function d(f) {
		if (f.ep) return;
		f.ep = !0;
		const m = o(f);
		fetch(f.href, m)
	}
})();
var Fc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

function Si(u) {
	return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u
}
var mi = {
		exports: {}
	},
	Wn = {},
	hi = {
		exports: {}
	},
	fe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nc;

function B0() {
	if (Nc) return fe;
	Nc = 1;
	var u = Symbol.for("react.element"),
		s = Symbol.for("react.portal"),
		o = Symbol.for("react.fragment"),
		d = Symbol.for("react.strict_mode"),
		f = Symbol.for("react.profiler"),
		m = Symbol.for("react.provider"),
		y = Symbol.for("react.context"),
		k = Symbol.for("react.forward_ref"),
		D = Symbol.for("react.suspense"),
		A = Symbol.for("react.memo"),
		N = Symbol.for("react.lazy"),
		b = Symbol.iterator;

	function w(x) {
		return x === null || typeof x != "object" ? null : (x = b && x[b] || x["@@iterator"], typeof x == "function" ? x : null)
	}
	var j = {
			isMounted: function() {
				return !1
			},
			enqueueForceUpdate: function() {},
			enqueueReplaceState: function() {},
			enqueueSetState: function() {}
		},
		B = Object.assign,
		L = {};

	function P(x, _, ae) {
		this.props = x, this.context = _, this.refs = L, this.updater = ae || j
	}
	P.prototype.isReactComponent = {}, P.prototype.setState = function(x, _) {
		if (typeof x != "object" && typeof x != "function" && x != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, x, _, "setState")
	}, P.prototype.forceUpdate = function(x) {
		this.updater.enqueueForceUpdate(this, x, "forceUpdate")
	};

	function F() {}
	F.prototype = P.prototype;

	function z(x, _, ae) {
		this.props = x, this.context = _, this.refs = L, this.updater = ae || j
	}
	var W = z.prototype = new F;
	W.constructor = z, B(W, P.prototype), W.isPureReactComponent = !0;
	var V = Array.isArray,
		I = Object.prototype.hasOwnProperty,
		J = {
			current: null
		},
		H = {
			key: !0,
			ref: !0,
			__self: !0,
			__source: !0
		};

	function $(x, _, ae) {
		var se, ce = {},
			Q = null,
			K = null;
		if (_ != null)
			for (se in _.ref !== void 0 && (K = _.ref), _.key !== void 0 && (Q = "" + _.key), _) I.call(_, se) && !H.hasOwnProperty(se) && (ce[se] = _[se]);
		var ie = arguments.length - 2;
		if (ie === 1) ce.children = ae;
		else if (1 < ie) {
			for (var ge = Array(ie), Ie = 0; Ie < ie; Ie++) ge[Ie] = arguments[Ie + 2];
			ce.children = ge
		}
		if (x && x.defaultProps)
			for (se in ie = x.defaultProps, ie) ce[se] === void 0 && (ce[se] = ie[se]);
		return {
			$$typeof: u,
			type: x,
			key: Q,
			ref: K,
			props: ce,
			_owner: J.current
		}
	}

	function Z(x, _) {
		return {
			$$typeof: u,
			type: x.type,
			key: _,
			ref: x.ref,
			props: x.props,
			_owner: x._owner
		}
	}

	function de(x) {
		return typeof x == "object" && x !== null && x.$$typeof === u
	}

	function pe(x) {
		var _ = {
			"=": "=0",
			":": "=2"
		};
		return "$" + x.replace(/[=:]/g, function(ae) {
			return _[ae]
		})
	}
	var De = /\/+/g;

	function ne(x, _) {
		return typeof x == "object" && x !== null && x.key != null ? pe("" + x.key) : _.toString(36)
	}

	function Se(x, _, ae, se, ce) {
		var Q = typeof x;
		(Q === "undefined" || Q === "boolean") && (x = null);
		var K = !1;
		if (x === null) K = !0;
		else switch (Q) {
			case "string":
			case "number":
				K = !0;
				break;
			case "object":
				switch (x.$$typeof) {
					case u:
					case s:
						K = !0
				}
		}
		if (K) return K = x, ce = ce(K), x = se === "" ? "." + ne(K, 0) : se, V(ce) ? (ae = "", x != null && (ae = x.replace(De, "$&/") + "/"), Se(ce, _, ae, "", function(Ie) {
			return Ie
		})) : ce != null && (de(ce) && (ce = Z(ce, ae + (!ce.key || K && K.key === ce.key ? "" : ("" + ce.key).replace(De, "$&/") + "/") + x)), _.push(ce)), 1;
		if (K = 0, se = se === "" ? "." : se + ":", V(x))
			for (var ie = 0; ie < x.length; ie++) {
				Q = x[ie];
				var ge = se + ne(Q, ie);
				K += Se(Q, _, ae, ge, ce)
			} else if (ge = w(x), typeof ge == "function")
				for (x = ge.call(x), ie = 0; !(Q = x.next()).done;) Q = Q.value, ge = se + ne(Q, ie++), K += Se(Q, _, ae, ge, ce);
			else if (Q === "object") throw _ = String(x), Error("Objects are not valid as a React child (found: " + (_ === "[object Object]" ? "object with keys {" + Object.keys(x).join(", ") + "}" : _) + "). If you meant to render a collection of children, use an array instead.");
		return K
	}

	function we(x, _, ae) {
		if (x == null) return x;
		var se = [],
			ce = 0;
		return Se(x, se, "", "", function(Q) {
			return _.call(ae, Q, ce++)
		}), se
	}

	function _e(x) {
		if (x._status === -1) {
			var _ = x._result;
			_ = _(), _.then(function(ae) {
				(x._status === 0 || x._status === -1) && (x._status = 1, x._result = ae)
			}, function(ae) {
				(x._status === 0 || x._status === -1) && (x._status = 2, x._result = ae)
			}), x._status === -1 && (x._status = 0, x._result = _)
		}
		if (x._status === 1) return x._result.default;
		throw x._result
	}
	var xe = {
			current: null
		},
		G = {
			transition: null
		},
		q = {
			ReactCurrentDispatcher: xe,
			ReactCurrentBatchConfig: G,
			ReactCurrentOwner: J
		};

	function O() {
		throw Error("act(...) is not supported in production builds of React.")
	}
	return fe.Children = {
		map: we,
		forEach: function(x, _, ae) {
			we(x, function() {
				_.apply(this, arguments)
			}, ae)
		},
		count: function(x) {
			var _ = 0;
			return we(x, function() {
				_++
			}), _
		},
		toArray: function(x) {
			return we(x, function(_) {
				return _
			}) || []
		},
		only: function(x) {
			if (!de(x)) throw Error("React.Children.only expected to receive a single React element child.");
			return x
		}
	}, fe.Component = P, fe.Fragment = o, fe.Profiler = f, fe.PureComponent = z, fe.StrictMode = d, fe.Suspense = D, fe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = q, fe.act = O, fe.cloneElement = function(x, _, ae) {
		if (x == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + x + ".");
		var se = B({}, x.props),
			ce = x.key,
			Q = x.ref,
			K = x._owner;
		if (_ != null) {
			if (_.ref !== void 0 && (Q = _.ref, K = J.current), _.key !== void 0 && (ce = "" + _.key), x.type && x.type.defaultProps) var ie = x.type.defaultProps;
			for (ge in _) I.call(_, ge) && !H.hasOwnProperty(ge) && (se[ge] = _[ge] === void 0 && ie !== void 0 ? ie[ge] : _[ge])
		}
		var ge = arguments.length - 2;
		if (ge === 1) se.children = ae;
		else if (1 < ge) {
			ie = Array(ge);
			for (var Ie = 0; Ie < ge; Ie++) ie[Ie] = arguments[Ie + 2];
			se.children = ie
		}
		return {
			$$typeof: u,
			type: x.type,
			key: ce,
			ref: Q,
			props: se,
			_owner: K
		}
	}, fe.createContext = function(x) {
		return x = {
			$$typeof: y,
			_currentValue: x,
			_currentValue2: x,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		}, x.Provider = {
			$$typeof: m,
			_context: x
		}, x.Consumer = x
	}, fe.createElement = $, fe.createFactory = function(x) {
		var _ = $.bind(null, x);
		return _.type = x, _
	}, fe.createRef = function() {
		return {
			current: null
		}
	}, fe.forwardRef = function(x) {
		return {
			$$typeof: k,
			render: x
		}
	}, fe.isValidElement = de, fe.lazy = function(x) {
		return {
			$$typeof: N,
			_payload: {
				_status: -1,
				_result: x
			},
			_init: _e
		}
	}, fe.memo = function(x, _) {
		return {
			$$typeof: A,
			type: x,
			compare: _ === void 0 ? null : _
		}
	}, fe.startTransition = function(x) {
		var _ = G.transition;
		G.transition = {};
		try {
			x()
		} finally {
			G.transition = _
		}
	}, fe.unstable_act = O, fe.useCallback = function(x, _) {
		return xe.current.useCallback(x, _)
	}, fe.useContext = function(x) {
		return xe.current.useContext(x)
	}, fe.useDebugValue = function() {}, fe.useDeferredValue = function(x) {
		return xe.current.useDeferredValue(x)
	}, fe.useEffect = function(x, _) {
		return xe.current.useEffect(x, _)
	}, fe.useId = function() {
		return xe.current.useId()
	}, fe.useImperativeHandle = function(x, _, ae) {
		return xe.current.useImperativeHandle(x, _, ae)
	}, fe.useInsertionEffect = function(x, _) {
		return xe.current.useInsertionEffect(x, _)
	}, fe.useLayoutEffect = function(x, _) {
		return xe.current.useLayoutEffect(x, _)
	}, fe.useMemo = function(x, _) {
		return xe.current.useMemo(x, _)
	}, fe.useReducer = function(x, _, ae) {
		return xe.current.useReducer(x, _, ae)
	}, fe.useRef = function(x) {
		return xe.current.useRef(x)
	}, fe.useState = function(x) {
		return xe.current.useState(x)
	}, fe.useSyncExternalStore = function(x, _, ae) {
		return xe.current.useSyncExternalStore(x, _, ae)
	}, fe.useTransition = function() {
		return xe.current.useTransition()
	}, fe.version = "18.3.1", fe
}
var _c;

function ji() {
	return _c || (_c = 1, hi.exports = B0()), hi.exports
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bc;

function F0() {
	if (bc) return Wn;
	bc = 1;
	var u = ji(),
		s = Symbol.for("react.element"),
		o = Symbol.for("react.fragment"),
		d = Object.prototype.hasOwnProperty,
		f = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
		m = {
			key: !0,
			ref: !0,
			__self: !0,
			__source: !0
		};

	function y(k, D, A) {
		var N, b = {},
			w = null,
			j = null;
		A !== void 0 && (w = "" + A), D.key !== void 0 && (w = "" + D.key), D.ref !== void 0 && (j = D.ref);
		for (N in D) d.call(D, N) && !m.hasOwnProperty(N) && (b[N] = D[N]);
		if (k && k.defaultProps)
			for (N in D = k.defaultProps, D) b[N] === void 0 && (b[N] = D[N]);
		return {
			$$typeof: s,
			type: k,
			key: w,
			ref: j,
			props: b,
			_owner: f.current
		}
	}
	return Wn.Fragment = o, Wn.jsx = y, Wn.jsxs = y, Wn
}
var Lc;

function N0() {
	return Lc || (Lc = 1, mi.exports = F0()), mi.exports
}
var i = N0(),
	cl = {},
	gi = {
		exports: {}
	},
	rt = {},
	xi = {
		exports: {}
	},
	vi = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qc;

function _0() {
	return qc || (qc = 1, function(u) {
		function s(G, q) {
			var O = G.length;
			G.push(q);
			e: for (; 0 < O;) {
				var x = O - 1 >>> 1,
					_ = G[x];
				if (0 < f(_, q)) G[x] = q, G[O] = _, O = x;
				else break e
			}
		}

		function o(G) {
			return G.length === 0 ? null : G[0]
		}

		function d(G) {
			if (G.length === 0) return null;
			var q = G[0],
				O = G.pop();
			if (O !== q) {
				G[0] = O;
				e: for (var x = 0, _ = G.length, ae = _ >>> 1; x < ae;) {
					var se = 2 * (x + 1) - 1,
						ce = G[se],
						Q = se + 1,
						K = G[Q];
					if (0 > f(ce, O)) Q < _ && 0 > f(K, ce) ? (G[x] = K, G[Q] = O, x = Q) : (G[x] = ce, G[se] = O, x = se);
					else if (Q < _ && 0 > f(K, O)) G[x] = K, G[Q] = O, x = Q;
					else break e
				}
			}
			return q
		}

		function f(G, q) {
			var O = G.sortIndex - q.sortIndex;
			return O !== 0 ? O : G.id - q.id
		}
		if (typeof performance == "object" && typeof performance.now == "function") {
			var m = performance;
			u.unstable_now = function() {
				return m.now()
			}
		} else {
			var y = Date,
				k = y.now();
			u.unstable_now = function() {
				return y.now() - k
			}
		}
		var D = [],
			A = [],
			N = 1,
			b = null,
			w = 3,
			j = !1,
			B = !1,
			L = !1,
			P = typeof setTimeout == "function" ? setTimeout : null,
			F = typeof clearTimeout == "function" ? clearTimeout : null,
			z = typeof setImmediate < "u" ? setImmediate : null;
		typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

		function W(G) {
			for (var q = o(A); q !== null;) {
				if (q.callback === null) d(A);
				else if (q.startTime <= G) d(A), q.sortIndex = q.expirationTime, s(D, q);
				else break;
				q = o(A)
			}
		}

		function V(G) {
			if (L = !1, W(G), !B)
				if (o(D) !== null) B = !0, _e(I);
				else {
					var q = o(A);
					q !== null && xe(V, q.startTime - G)
				}
		}

		function I(G, q) {
			B = !1, L && (L = !1, F($), $ = -1), j = !0;
			var O = w;
			try {
				for (W(q), b = o(D); b !== null && (!(b.expirationTime > q) || G && !pe());) {
					var x = b.callback;
					if (typeof x == "function") {
						b.callback = null, w = b.priorityLevel;
						var _ = x(b.expirationTime <= q);
						q = u.unstable_now(), typeof _ == "function" ? b.callback = _ : b === o(D) && d(D), W(q)
					} else d(D);
					b = o(D)
				}
				if (b !== null) var ae = !0;
				else {
					var se = o(A);
					se !== null && xe(V, se.startTime - q), ae = !1
				}
				return ae
			} finally {
				b = null, w = O, j = !1
			}
		}
		var J = !1,
			H = null,
			$ = -1,
			Z = 5,
			de = -1;

		function pe() {
			return !(u.unstable_now() - de < Z)
		}

		function De() {
			if (H !== null) {
				var G = u.unstable_now();
				de = G;
				var q = !0;
				try {
					q = H(!0, G)
				} finally {
					q ? ne() : (J = !1, H = null)
				}
			} else J = !1
		}
		var ne;
		if (typeof z == "function") ne = function() {
			z(De)
		};
		else if (typeof MessageChannel < "u") {
			var Se = new MessageChannel,
				we = Se.port2;
			Se.port1.onmessage = De, ne = function() {
				we.postMessage(null)
			}
		} else ne = function() {
			P(De, 0)
		};

		function _e(G) {
			H = G, J || (J = !0, ne())
		}

		function xe(G, q) {
			$ = P(function() {
				G(u.unstable_now())
			}, q)
		}
		u.unstable_IdlePriority = 5, u.unstable_ImmediatePriority = 1, u.unstable_LowPriority = 4, u.unstable_NormalPriority = 3, u.unstable_Profiling = null, u.unstable_UserBlockingPriority = 2, u.unstable_cancelCallback = function(G) {
			G.callback = null
		}, u.unstable_continueExecution = function() {
			B || j || (B = !0, _e(I))
		}, u.unstable_forceFrameRate = function(G) {
			0 > G || 125 < G ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Z = 0 < G ? Math.floor(1e3 / G) : 5
		}, u.unstable_getCurrentPriorityLevel = function() {
			return w
		}, u.unstable_getFirstCallbackNode = function() {
			return o(D)
		}, u.unstable_next = function(G) {
			switch (w) {
				case 1:
				case 2:
				case 3:
					var q = 3;
					break;
				default:
					q = w
			}
			var O = w;
			w = q;
			try {
				return G()
			} finally {
				w = O
			}
		}, u.unstable_pauseExecution = function() {}, u.unstable_requestPaint = function() {}, u.unstable_runWithPriority = function(G, q) {
			switch (G) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					break;
				default:
					G = 3
			}
			var O = w;
			w = G;
			try {
				return q()
			} finally {
				w = O
			}
		}, u.unstable_scheduleCallback = function(G, q, O) {
			var x = u.unstable_now();
			switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? x + O : x) : O = x, G) {
				case 1:
					var _ = -1;
					break;
				case 2:
					_ = 250;
					break;
				case 5:
					_ = 1073741823;
					break;
				case 4:
					_ = 1e4;
					break;
				default:
					_ = 5e3
			}
			return _ = O + _, G = {
				id: N++,
				callback: q,
				priorityLevel: G,
				startTime: O,
				expirationTime: _,
				sortIndex: -1
			}, O > x ? (G.sortIndex = O, s(A, G), o(D) === null && G === o(A) && (L ? (F($), $ = -1) : L = !0, xe(V, O - x))) : (G.sortIndex = _, s(D, G), B || j || (B = !0, _e(I))), G
		}, u.unstable_shouldYield = pe, u.unstable_wrapCallback = function(G) {
			var q = w;
			return function() {
				var O = w;
				w = q;
				try {
					return G.apply(this, arguments)
				} finally {
					w = O
				}
			}
		}
	}(vi)), vi
}
var Rc;

function b0() {
	return Rc || (Rc = 1, xi.exports = _0()), xi.exports
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tc;

function L0() {
	if (Tc) return rt;
	Tc = 1;
	var u = ji(),
		s = b0();

	function o(e) {
		for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1; r < arguments.length; r++) t += "&args[]=" + encodeURIComponent(arguments[r]);
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
	}
	var d = new Set,
		f = {};

	function m(e, t) {
		y(e, t), y(e + "Capture", t)
	}

	function y(e, t) {
		for (f[e] = t, e = 0; e < t.length; e++) d.add(t[e])
	}
	var k = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
		D = Object.prototype.hasOwnProperty,
		A = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
		N = {},
		b = {};

	function w(e) {
		return D.call(b, e) ? !0 : D.call(N, e) ? !1 : A.test(e) ? b[e] = !0 : (N[e] = !0, !1)
	}

	function j(e, t, r, n) {
		if (r !== null && r.type === 0) return !1;
		switch (typeof t) {
			case "function":
			case "symbol":
				return !0;
			case "boolean":
				return n ? !1 : r !== null ? !r.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
			default:
				return !1
		}
	}

	function B(e, t, r, n) {
		if (t === null || typeof t > "u" || j(e, t, r, n)) return !0;
		if (n) return !1;
		if (r !== null) switch (r.type) {
			case 3:
				return !t;
			case 4:
				return t === !1;
			case 5:
				return isNaN(t);
			case 6:
				return isNaN(t) || 1 > t
		}
		return !1
	}

	function L(e, t, r, n, l, a, c) {
		this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = n, this.attributeNamespace = l, this.mustUseProperty = r, this.propertyName = e, this.type = t, this.sanitizeURL = a, this.removeEmptyString = c
	}
	var P = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
		P[e] = new L(e, 0, !1, e, null, !1, !1)
	}), [
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(e) {
		var t = e[0];
		P[t] = new L(t, 1, !1, e[1], null, !1, !1)
	}), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
		P[e] = new L(e, 2, !1, e.toLowerCase(), null, !1, !1)
	}), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
		P[e] = new L(e, 2, !1, e, null, !1, !1)
	}), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
		P[e] = new L(e, 3, !1, e.toLowerCase(), null, !1, !1)
	}), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
		P[e] = new L(e, 3, !0, e, null, !1, !1)
	}), ["capture", "download"].forEach(function(e) {
		P[e] = new L(e, 4, !1, e, null, !1, !1)
	}), ["cols", "rows", "size", "span"].forEach(function(e) {
		P[e] = new L(e, 6, !1, e, null, !1, !1)
	}), ["rowSpan", "start"].forEach(function(e) {
		P[e] = new L(e, 5, !1, e.toLowerCase(), null, !1, !1)
	});
	var F = /[\-:]([a-z])/g;

	function z(e) {
		return e[1].toUpperCase()
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
		var t = e.replace(F, z);
		P[t] = new L(t, 1, !1, e, null, !1, !1)
	}), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
		var t = e.replace(F, z);
		P[t] = new L(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
	}), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
		var t = e.replace(F, z);
		P[t] = new L(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
	}), ["tabIndex", "crossOrigin"].forEach(function(e) {
		P[e] = new L(e, 1, !1, e.toLowerCase(), null, !1, !1)
	}), P.xlinkHref = new L("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
		P[e] = new L(e, 1, !1, e.toLowerCase(), null, !0, !0)
	});

	function W(e, t, r, n) {
		var l = P.hasOwnProperty(t) ? P[t] : null;
		(l !== null ? l.type !== 0 : n || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (B(t, r, l, n) && (r = null), n || l === null ? w(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r)) : l.mustUseProperty ? e[l.propertyName] = r === null ? l.type === 3 ? !1 : "" : r : (t = l.attributeName, n = l.attributeNamespace, r === null ? e.removeAttribute(t) : (l = l.type, r = l === 3 || l === 4 && r === !0 ? "" : "" + r, n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))))
	}
	var V = u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
		I = Symbol.for("react.element"),
		J = Symbol.for("react.portal"),
		H = Symbol.for("react.fragment"),
		$ = Symbol.for("react.strict_mode"),
		Z = Symbol.for("react.profiler"),
		de = Symbol.for("react.provider"),
		pe = Symbol.for("react.context"),
		De = Symbol.for("react.forward_ref"),
		ne = Symbol.for("react.suspense"),
		Se = Symbol.for("react.suspense_list"),
		we = Symbol.for("react.memo"),
		_e = Symbol.for("react.lazy"),
		xe = Symbol.for("react.offscreen"),
		G = Symbol.iterator;

	function q(e) {
		return e === null || typeof e != "object" ? null : (e = G && e[G] || e["@@iterator"], typeof e == "function" ? e : null)
	}
	var O = Object.assign,
		x;

	function _(e) {
		if (x === void 0) try {
			throw Error()
		} catch (r) {
			var t = r.stack.trim().match(/\n( *(at )?)/);
			x = t && t[1] || ""
		}
		return `
` + x + e
	}
	var ae = !1;

	function se(e, t) {
		if (!e || ae) return "";
		ae = !0;
		var r = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			if (t)
				if (t = function() {
						throw Error()
					}, Object.defineProperty(t.prototype, "props", {
						set: function() {
							throw Error()
						}
					}), typeof Reflect == "object" && Reflect.construct) {
					try {
						Reflect.construct(t, [])
					} catch (S) {
						var n = S
					}
					Reflect.construct(e, [], t)
				} else {
					try {
						t.call()
					} catch (S) {
						n = S
					}
					e.call(t.prototype)
				}
			else {
				try {
					throw Error()
				} catch (S) {
					n = S
				}
				e()
			}
		} catch (S) {
			if (S && n && typeof S.stack == "string") {
				for (var l = S.stack.split(`
`), a = n.stack.split(`
`), c = l.length - 1, p = a.length - 1; 1 <= c && 0 <= p && l[c] !== a[p];) p--;
				for (; 1 <= c && 0 <= p; c--, p--)
					if (l[c] !== a[p]) {
						if (c !== 1 || p !== 1)
							do
								if (c--, p--, 0 > p || l[c] !== a[p]) {
									var h = `
` + l[c].replace(" at new ", " at ");
									return e.displayName && h.includes("<anonymous>") && (h = h.replace("<anonymous>", e.displayName)), h
								} while (1 <= c && 0 <= p);
						break
					}
			}
		} finally {
			ae = !1, Error.prepareStackTrace = r
		}
		return (e = e ? e.displayName || e.name : "") ? _(e) : ""
	}

	function ce(e) {
		switch (e.tag) {
			case 5:
				return _(e.type);
			case 16:
				return _("Lazy");
			case 13:
				return _("Suspense");
			case 19:
				return _("SuspenseList");
			case 0:
			case 2:
			case 15:
				return e = se(e.type, !1), e;
			case 11:
				return e = se(e.type.render, !1), e;
			case 1:
				return e = se(e.type, !0), e;
			default:
				return ""
		}
	}

	function Q(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case H:
				return "Fragment";
			case J:
				return "Portal";
			case Z:
				return "Profiler";
			case $:
				return "StrictMode";
			case ne:
				return "Suspense";
			case Se:
				return "SuspenseList"
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case pe:
				return (e.displayName || "Context") + ".Consumer";
			case de:
				return (e._context.displayName || "Context") + ".Provider";
			case De:
				var t = e.render;
				return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
			case we:
				return t = e.displayName || null, t !== null ? t : Q(e.type) || "Memo";
			case _e:
				t = e._payload, e = e._init;
				try {
					return Q(e(t))
				} catch {}
		}
		return null
	}

	function K(e) {
		var t = e.type;
		switch (e.tag) {
			case 24:
				return "Cache";
			case 9:
				return (t.displayName || "Context") + ".Consumer";
			case 10:
				return (t._context.displayName || "Context") + ".Provider";
			case 18:
				return "DehydratedFragment";
			case 11:
				return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
			case 7:
				return "Fragment";
			case 5:
				return t;
			case 4:
				return "Portal";
			case 3:
				return "Root";
			case 6:
				return "Text";
			case 16:
				return Q(t);
			case 8:
				return t === $ ? "StrictMode" : "Mode";
			case 22:
				return "Offscreen";
			case 12:
				return "Profiler";
			case 21:
				return "Scope";
			case 13:
				return "Suspense";
			case 19:
				return "SuspenseList";
			case 25:
				return "TracingMarker";
			case 1:
			case 0:
			case 17:
			case 2:
			case 14:
			case 15:
				if (typeof t == "function") return t.displayName || t.name || null;
				if (typeof t == "string") return t
		}
		return null
	}

	function ie(e) {
		switch (typeof e) {
			case "boolean":
			case "number":
			case "string":
			case "undefined":
				return e;
			case "object":
				return e;
			default:
				return ""
		}
	}

	function ge(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
	}

	function Ie(e) {
		var t = ge(e) ? "checked" : "value",
			r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
			n = "" + e[t];
		if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
			var l = r.get,
				a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return l.call(this)
				},
				set: function(c) {
					n = "" + c, a.call(this, c)
				}
			}), Object.defineProperty(e, t, {
				enumerable: r.enumerable
			}), {
				getValue: function() {
					return n
				},
				setValue: function(c) {
					n = "" + c
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t]
				}
			}
		}
	}

	function ht(e) {
		e._valueTracker || (e._valueTracker = Ie(e))
	}

	function cr(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var r = t.getValue(),
			n = "";
		return e && (n = ge(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== r ? (t.setValue(e), !0) : !1
	}

	function dr(e) {
		if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
		try {
			return e.activeElement || e.body
		} catch {
			return e.body
		}
	}

	function _r(e, t) {
		var r = t.checked;
		return O({}, t, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: r ?? e._wrapperState.initialChecked
		})
	}

	function fr(e, t) {
		var r = t.defaultValue == null ? "" : t.defaultValue,
			n = t.checked != null ? t.checked : t.defaultChecked;
		r = ie(t.value != null ? t.value : r), e._wrapperState = {
			initialChecked: n,
			initialValue: r,
			controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
		}
	}

	function pr(e, t) {
		t = t.checked, t != null && W(e, "checked", t, !1)
	}

	function Al(e, t) {
		pr(e, t);
		var r = ie(t.value),
			n = t.type;
		if (r != null) n === "number" ? (r === 0 && e.value === "" || e.value != r) && (e.value = "" + r) : e.value !== "" + r && (e.value = "" + r);
		else if (n === "submit" || n === "reset") {
			e.removeAttribute("value");
			return
		}
		t.hasOwnProperty("value") ? Cl(e, t.type, r) : t.hasOwnProperty("defaultValue") && Cl(e, t.type, ie(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
	}

	function Pi(e, t, r) {
		if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
			var n = t.type;
			if (!(n !== "submit" && n !== "reset" || t.value !== void 0 && t.value !== null)) return;
			t = "" + e._wrapperState.initialValue, r || t === e.value || (e.value = t), e.defaultValue = t
		}
		r = e.name, r !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, r !== "" && (e.name = r)
	}

	function Cl(e, t, r) {
		(t !== "number" || dr(e.ownerDocument) !== e) && (r == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + r && (e.defaultValue = "" + r))
	}
	var on = Array.isArray;

	function br(e, t, r, n) {
		if (e = e.options, t) {
			t = {};
			for (var l = 0; l < r.length; l++) t["$" + r[l]] = !0;
			for (r = 0; r < e.length; r++) l = t.hasOwnProperty("$" + e[r].value), e[r].selected !== l && (e[r].selected = l), l && n && (e[r].defaultSelected = !0)
		} else {
			for (r = "" + ie(r), t = null, l = 0; l < e.length; l++) {
				if (e[l].value === r) {
					e[l].selected = !0, n && (e[l].defaultSelected = !0);
					return
				}
				t !== null || e[l].disabled || (t = e[l])
			}
			t !== null && (t.selected = !0)
		}
	}

	function El(e, t) {
		if (t.dangerouslySetInnerHTML != null) throw Error(o(91));
		return O({}, t, {
			value: void 0,
			defaultValue: void 0,
			children: "" + e._wrapperState.initialValue
		})
	}

	function Ii(e, t) {
		var r = t.value;
		if (r == null) {
			if (r = t.children, t = t.defaultValue, r != null) {
				if (t != null) throw Error(o(92));
				if (on(r)) {
					if (1 < r.length) throw Error(o(93));
					r = r[0]
				}
				t = r
			}
			t == null && (t = ""), r = t
		}
		e._wrapperState = {
			initialValue: ie(r)
		}
	}

	function zi(e, t) {
		var r = ie(t.value),
			n = ie(t.defaultValue);
		r != null && (r = "" + r, r !== e.value && (e.value = r), t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)), n != null && (e.defaultValue = "" + n)
	}

	function Mi(e) {
		var t = e.textContent;
		t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
	}

	function Oi(e) {
		switch (e) {
			case "svg":
				return "http://www.w3.org/2000/svg";
			case "math":
				return "http://www.w3.org/1998/Math/MathML";
			default:
				return "http://www.w3.org/1999/xhtml"
		}
	}

	function kl(e, t) {
		return e == null || e === "http://www.w3.org/1999/xhtml" ? Oi(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
	}
	var ru, Ui = function(e) {
		return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, r, n, l) {
			MSApp.execUnsafeLocalFunction(function() {
				return e(t, r, n, l)
			})
		} : e
	}(function(e, t) {
		if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
		else {
			for (ru = ru || document.createElement("div"), ru.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ru.firstChild; e.firstChild;) e.removeChild(e.firstChild);
			for (; t.firstChild;) e.appendChild(t.firstChild)
		}
	});

	function sn(e, t) {
		if (t) {
			var r = e.firstChild;
			if (r && r === e.lastChild && r.nodeType === 3) {
				r.nodeValue = t;
				return
			}
		}
		e.textContent = t
	}
	var cn = {
			animationIterationCount: !0,
			aspectRatio: !0,
			borderImageOutset: !0,
			borderImageSlice: !0,
			borderImageWidth: !0,
			boxFlex: !0,
			boxFlexGroup: !0,
			boxOrdinalGroup: !0,
			columnCount: !0,
			columns: !0,
			flex: !0,
			flexGrow: !0,
			flexPositive: !0,
			flexShrink: !0,
			flexNegative: !0,
			flexOrder: !0,
			gridArea: !0,
			gridRow: !0,
			gridRowEnd: !0,
			gridRowSpan: !0,
			gridRowStart: !0,
			gridColumn: !0,
			gridColumnEnd: !0,
			gridColumnSpan: !0,
			gridColumnStart: !0,
			fontWeight: !0,
			lineClamp: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			tabSize: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0,
			fillOpacity: !0,
			floodOpacity: !0,
			stopOpacity: !0,
			strokeDasharray: !0,
			strokeDashoffset: !0,
			strokeMiterlimit: !0,
			strokeOpacity: !0,
			strokeWidth: !0
		},
		b2 = ["Webkit", "ms", "Moz", "O"];
	Object.keys(cn).forEach(function(e) {
		b2.forEach(function(t) {
			t = t + e.charAt(0).toUpperCase() + e.substring(1), cn[t] = cn[e]
		})
	});

	function Vi(e, t, r) {
		return t == null || typeof t == "boolean" || t === "" ? "" : r || typeof t != "number" || t === 0 || cn.hasOwnProperty(e) && cn[e] ? ("" + t).trim() : t + "px"
	}

	function Hi(e, t) {
		e = e.style;
		for (var r in t)
			if (t.hasOwnProperty(r)) {
				var n = r.indexOf("--") === 0,
					l = Vi(r, t[r], n);
				r === "float" && (r = "cssFloat"), n ? e.setProperty(r, l) : e[r] = l
			}
	}
	var L2 = O({
		menuitem: !0
	}, {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});

	function Sl(e, t) {
		if (t) {
			if (L2[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(o(137, e));
			if (t.dangerouslySetInnerHTML != null) {
				if (t.children != null) throw Error(o(60));
				if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(o(61))
			}
			if (t.style != null && typeof t.style != "object") throw Error(o(62))
		}
	}

	function jl(e, t) {
		if (e.indexOf("-") === -1) return typeof t.is == "string";
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph":
				return !1;
			default:
				return !0
		}
	}
	var Bl = null;

	function Fl(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
	}
	var Nl = null,
		Lr = null,
		qr = null;

	function $i(e) {
		if (e = bn(e)) {
			if (typeof Nl != "function") throw Error(o(280));
			var t = e.stateNode;
			t && (t = ku(t), Nl(e.stateNode, e.type, t))
		}
	}

	function Gi(e) {
		Lr ? qr ? qr.push(e) : qr = [e] : Lr = e
	}

	function Wi() {
		if (Lr) {
			var e = Lr,
				t = qr;
			if (qr = Lr = null, $i(e), t)
				for (e = 0; e < t.length; e++) $i(t[e])
		}
	}

	function Qi(e, t) {
		return e(t)
	}

	function Ki() {}
	var _l = !1;

	function Yi(e, t, r) {
		if (_l) return e(t, r);
		_l = !0;
		try {
			return Qi(e, t, r)
		} finally {
			_l = !1, (Lr !== null || qr !== null) && (Ki(), Wi())
		}
	}

	function dn(e, t) {
		var r = e.stateNode;
		if (r === null) return null;
		var n = ku(r);
		if (n === null) return null;
		r = n[t];
		e: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
				break e;
			default:
				e = !1
		}
		if (e) return null;
		if (r && typeof r != "function") throw Error(o(231, t, typeof r));
		return r
	}
	var bl = !1;
	if (k) try {
		var fn = {};
		Object.defineProperty(fn, "passive", {
			get: function() {
				bl = !0
			}
		}), window.addEventListener("test", fn, fn), window.removeEventListener("test", fn, fn)
	} catch {
		bl = !1
	}

	function q2(e, t, r, n, l, a, c, p, h) {
		var S = Array.prototype.slice.call(arguments, 3);
		try {
			t.apply(r, S)
		} catch (T) {
			this.onError(T)
		}
	}
	var pn = !1,
		nu = null,
		uu = !1,
		Ll = null,
		R2 = {
			onError: function(e) {
				pn = !0, nu = e
			}
		};

	function T2(e, t, r, n, l, a, c, p, h) {
		pn = !1, nu = null, q2.apply(R2, arguments)
	}

	function P2(e, t, r, n, l, a, c, p, h) {
		if (T2.apply(this, arguments), pn) {
			if (pn) {
				var S = nu;
				pn = !1, nu = null
			} else throw Error(o(198));
			uu || (uu = !0, Ll = S)
		}
	}

	function mr(e) {
		var t = e,
			r = e;
		if (e.alternate)
			for (; t.return;) t = t.return;
		else {
			e = t;
			do t = e, (t.flags & 4098) !== 0 && (r = t.return), e = t.return; while (e)
		}
		return t.tag === 3 ? r : null
	}

	function Ji(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
		}
		return null
	}

	function Zi(e) {
		if (mr(e) !== e) throw Error(o(188))
	}

	function I2(e) {
		var t = e.alternate;
		if (!t) {
			if (t = mr(e), t === null) throw Error(o(188));
			return t !== e ? null : e
		}
		for (var r = e, n = t;;) {
			var l = r.return;
			if (l === null) break;
			var a = l.alternate;
			if (a === null) {
				if (n = l.return, n !== null) {
					r = n;
					continue
				}
				break
			}
			if (l.child === a.child) {
				for (a = l.child; a;) {
					if (a === r) return Zi(l), e;
					if (a === n) return Zi(l), t;
					a = a.sibling
				}
				throw Error(o(188))
			}
			if (r.return !== n.return) r = l, n = a;
			else {
				for (var c = !1, p = l.child; p;) {
					if (p === r) {
						c = !0, r = l, n = a;
						break
					}
					if (p === n) {
						c = !0, n = l, r = a;
						break
					}
					p = p.sibling
				}
				if (!c) {
					for (p = a.child; p;) {
						if (p === r) {
							c = !0, r = a, n = l;
							break
						}
						if (p === n) {
							c = !0, n = a, r = l;
							break
						}
						p = p.sibling
					}
					if (!c) throw Error(o(189))
				}
			}
			if (r.alternate !== n) throw Error(o(190))
		}
		if (r.tag !== 3) throw Error(o(188));
		return r.stateNode.current === r ? e : t
	}

	function Xi(e) {
		return e = I2(e), e !== null ? eo(e) : null
	}

	function eo(e) {
		if (e.tag === 5 || e.tag === 6) return e;
		for (e = e.child; e !== null;) {
			var t = eo(e);
			if (t !== null) return t;
			e = e.sibling
		}
		return null
	}
	var to = s.unstable_scheduleCallback,
		ro = s.unstable_cancelCallback,
		z2 = s.unstable_shouldYield,
		M2 = s.unstable_requestPaint,
		be = s.unstable_now,
		O2 = s.unstable_getCurrentPriorityLevel,
		ql = s.unstable_ImmediatePriority,
		no = s.unstable_UserBlockingPriority,
		lu = s.unstable_NormalPriority,
		U2 = s.unstable_LowPriority,
		uo = s.unstable_IdlePriority,
		au = null,
		Ct = null;

	function V2(e) {
		if (Ct && typeof Ct.onCommitFiberRoot == "function") try {
			Ct.onCommitFiberRoot(au, e, void 0, (e.current.flags & 128) === 128)
		} catch {}
	}
	var gt = Math.clz32 ? Math.clz32 : G2,
		H2 = Math.log,
		$2 = Math.LN2;

	function G2(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (H2(e) / $2 | 0) | 0
	}
	var iu = 64,
		ou = 4194304;

	function mn(e) {
		switch (e & -e) {
			case 1:
				return 1;
			case 2:
				return 2;
			case 4:
				return 4;
			case 8:
				return 8;
			case 16:
				return 16;
			case 32:
				return 32;
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
				return e & 4194240;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864:
				return e & 130023424;
			case 134217728:
				return 134217728;
			case 268435456:
				return 268435456;
			case 536870912:
				return 536870912;
			case 1073741824:
				return 1073741824;
			default:
				return e
		}
	}

	function su(e, t) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var n = 0,
			l = e.suspendedLanes,
			a = e.pingedLanes,
			c = r & 268435455;
		if (c !== 0) {
			var p = c & ~l;
			p !== 0 ? n = mn(p) : (a &= c, a !== 0 && (n = mn(a)))
		} else c = r & ~l, c !== 0 ? n = mn(c) : a !== 0 && (n = mn(a));
		if (n === 0) return 0;
		if (t !== 0 && t !== n && (t & l) === 0 && (l = n & -n, a = t & -t, l >= a || l === 16 && (a & 4194240) !== 0)) return t;
		if ((n & 4) !== 0 && (n |= r & 16), t = e.entangledLanes, t !== 0)
			for (e = e.entanglements, t &= n; 0 < t;) r = 31 - gt(t), l = 1 << r, n |= e[r], t &= ~l;
		return n
	}

	function W2(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
				return t + 250;
			case 8:
			case 16:
			case 32:
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
				return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864:
				return -1;
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824:
				return -1;
			default:
				return -1
		}
	}

	function Q2(e, t) {
		for (var r = e.suspendedLanes, n = e.pingedLanes, l = e.expirationTimes, a = e.pendingLanes; 0 < a;) {
			var c = 31 - gt(a),
				p = 1 << c,
				h = l[c];
			h === -1 ? ((p & r) === 0 || (p & n) !== 0) && (l[c] = W2(p, t)) : h <= t && (e.expiredLanes |= p), a &= ~p
		}
	}

	function Rl(e) {
		return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
	}

	function lo() {
		var e = iu;
		return iu <<= 1, (iu & 4194240) === 0 && (iu = 64), e
	}

	function Tl(e) {
		for (var t = [], r = 0; 31 > r; r++) t.push(e);
		return t
	}

	function hn(e, t, r) {
		e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - gt(t), e[t] = r
	}

	function K2(e, t) {
		var r = e.pendingLanes & ~t;
		e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
		var n = e.eventTimes;
		for (e = e.expirationTimes; 0 < r;) {
			var l = 31 - gt(r),
				a = 1 << l;
			t[l] = 0, n[l] = -1, e[l] = -1, r &= ~a
		}
	}

	function Pl(e, t) {
		var r = e.entangledLanes |= t;
		for (e = e.entanglements; r;) {
			var n = 31 - gt(r),
				l = 1 << n;
			l & t | e[n] & t && (e[n] |= t), r &= ~l
		}
	}
	var ye = 0;

	function ao(e) {
		return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1
	}
	var io, Il, oo, so, co, zl = !1,
		cu = [],
		Ut = null,
		Vt = null,
		Ht = null,
		gn = new Map,
		xn = new Map,
		$t = [],
		Y2 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

	function fo(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Ut = null;
				break;
			case "dragenter":
			case "dragleave":
				Vt = null;
				break;
			case "mouseover":
			case "mouseout":
				Ht = null;
				break;
			case "pointerover":
			case "pointerout":
				gn.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture":
				xn.delete(t.pointerId)
		}
	}

	function vn(e, t, r, n, l, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: r,
			eventSystemFlags: n,
			nativeEvent: a,
			targetContainers: [l]
		}, t !== null && (t = bn(t), t !== null && Il(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e)
	}

	function J2(e, t, r, n, l) {
		switch (t) {
			case "focusin":
				return Ut = vn(Ut, e, t, r, n, l), !0;
			case "dragenter":
				return Vt = vn(Vt, e, t, r, n, l), !0;
			case "mouseover":
				return Ht = vn(Ht, e, t, r, n, l), !0;
			case "pointerover":
				var a = l.pointerId;
				return gn.set(a, vn(gn.get(a) || null, e, t, r, n, l)), !0;
			case "gotpointercapture":
				return a = l.pointerId, xn.set(a, vn(xn.get(a) || null, e, t, r, n, l)), !0
		}
		return !1
	}

	function po(e) {
		var t = hr(e.target);
		if (t !== null) {
			var r = mr(t);
			if (r !== null) {
				if (t = r.tag, t === 13) {
					if (t = Ji(r), t !== null) {
						e.blockedOn = t, co(e.priority, function() {
							oo(r)
						});
						return
					}
				} else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
					return
				}
			}
		}
		e.blockedOn = null
	}

	function du(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var r = Ol(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
			if (r === null) {
				r = e.nativeEvent;
				var n = new r.constructor(r.type, r);
				Bl = n, r.target.dispatchEvent(n), Bl = null
			} else return t = bn(r), t !== null && Il(t), e.blockedOn = r, !1;
			t.shift()
		}
		return !0
	}

	function mo(e, t, r) {
		du(e) && r.delete(t)
	}

	function Z2() {
		zl = !1, Ut !== null && du(Ut) && (Ut = null), Vt !== null && du(Vt) && (Vt = null), Ht !== null && du(Ht) && (Ht = null), gn.forEach(mo), xn.forEach(mo)
	}

	function yn(e, t) {
		e.blockedOn === t && (e.blockedOn = null, zl || (zl = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, Z2)))
	}

	function Dn(e) {
		function t(l) {
			return yn(l, e)
		}
		if (0 < cu.length) {
			yn(cu[0], e);
			for (var r = 1; r < cu.length; r++) {
				var n = cu[r];
				n.blockedOn === e && (n.blockedOn = null)
			}
		}
		for (Ut !== null && yn(Ut, e), Vt !== null && yn(Vt, e), Ht !== null && yn(Ht, e), gn.forEach(t), xn.forEach(t), r = 0; r < $t.length; r++) n = $t[r], n.blockedOn === e && (n.blockedOn = null);
		for (; 0 < $t.length && (r = $t[0], r.blockedOn === null);) po(r), r.blockedOn === null && $t.shift()
	}
	var Rr = V.ReactCurrentBatchConfig,
		fu = !0;

	function X2(e, t, r, n) {
		var l = ye,
			a = Rr.transition;
		Rr.transition = null;
		try {
			ye = 1, Ml(e, t, r, n)
		} finally {
			ye = l, Rr.transition = a
		}
	}

	function ed(e, t, r, n) {
		var l = ye,
			a = Rr.transition;
		Rr.transition = null;
		try {
			ye = 4, Ml(e, t, r, n)
		} finally {
			ye = l, Rr.transition = a
		}
	}

	function Ml(e, t, r, n) {
		if (fu) {
			var l = Ol(e, t, r, n);
			if (l === null) ua(e, t, n, pu, r), fo(e, n);
			else if (J2(l, e, t, r, n)) n.stopPropagation();
			else if (fo(e, n), t & 4 && -1 < Y2.indexOf(e)) {
				for (; l !== null;) {
					var a = bn(l);
					if (a !== null && io(a), a = Ol(e, t, r, n), a === null && ua(e, t, n, pu, r), a === l) break;
					l = a
				}
				l !== null && n.stopPropagation()
			} else ua(e, t, n, null, r)
		}
	}
	var pu = null;

	function Ol(e, t, r, n) {
		if (pu = null, e = Fl(n), e = hr(e), e !== null)
			if (t = mr(e), t === null) e = null;
			else if (r = t.tag, r === 13) {
			if (e = Ji(t), e !== null) return e;
			e = null
		} else if (r === 3) {
			if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
			e = null
		} else t !== e && (e = null);
		return pu = e, null
	}

	function ho(e) {
		switch (e) {
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart":
				return 1;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "toggle":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave":
				return 4;
			case "message":
				switch (O2()) {
					case ql:
						return 1;
					case no:
						return 4;
					case lu:
					case U2:
						return 16;
					case uo:
						return 536870912;
					default:
						return 16
				}
			default:
				return 16
		}
	}
	var Gt = null,
		Ul = null,
		mu = null;

	function go() {
		if (mu) return mu;
		var e, t = Ul,
			r = t.length,
			n, l = "value" in Gt ? Gt.value : Gt.textContent,
			a = l.length;
		for (e = 0; e < r && t[e] === l[e]; e++);
		var c = r - e;
		for (n = 1; n <= c && t[r - n] === l[a - n]; n++);
		return mu = l.slice(e, 1 < n ? 1 - n : void 0)
	}

	function hu(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
	}

	function gu() {
		return !0
	}

	function xo() {
		return !1
	}

	function nt(e) {
		function t(r, n, l, a, c) {
			this._reactName = r, this._targetInst = l, this.type = n, this.nativeEvent = a, this.target = c, this.currentTarget = null;
			for (var p in e) e.hasOwnProperty(p) && (r = e[p], this[p] = r ? r(a) : a[p]);
			return this.isDefaultPrevented = (a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1) ? gu : xo, this.isPropagationStopped = xo, this
		}
		return O(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var r = this.nativeEvent;
				r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = !1), this.isDefaultPrevented = gu)
			},
			stopPropagation: function() {
				var r = this.nativeEvent;
				r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0), this.isPropagationStopped = gu)
			},
			persist: function() {},
			isPersistent: gu
		}), t
	}
	var Tr = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now()
			},
			defaultPrevented: 0,
			isTrusted: 0
		},
		Vl = nt(Tr),
		wn = O({}, Tr, {
			view: 0,
			detail: 0
		}),
		td = nt(wn),
		Hl, $l, An, xu = O({}, wn, {
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			pageX: 0,
			pageY: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			getModifierState: Wl,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== An && (An && e.type === "mousemove" ? (Hl = e.screenX - An.screenX, $l = e.screenY - An.screenY) : $l = Hl = 0, An = e), Hl)
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : $l
			}
		}),
		vo = nt(xu),
		rd = O({}, xu, {
			dataTransfer: 0
		}),
		nd = nt(rd),
		ud = O({}, wn, {
			relatedTarget: 0
		}),
		Gl = nt(ud),
		ld = O({}, Tr, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		}),
		ad = nt(ld),
		id = O({}, Tr, {
			clipboardData: function(e) {
				return "clipboardData" in e ? e.clipboardData : window.clipboardData
			}
		}),
		od = nt(id),
		sd = O({}, Tr, {
			data: 0
		}),
		yo = nt(sd),
		cd = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified"
		},
		dd = {
			8: "Backspace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift",
			17: "Control",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Escape",
			32: " ",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			45: "Insert",
			46: "Delete",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NumLock",
			145: "ScrollLock",
			224: "Meta"
		},
		fd = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		};

	function pd(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = fd[e]) ? !!t[e] : !1
	}

	function Wl() {
		return pd
	}
	var md = O({}, wn, {
			key: function(e) {
				if (e.key) {
					var t = cd[e.key] || e.key;
					if (t !== "Unidentified") return t
				}
				return e.type === "keypress" ? (e = hu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? dd[e.keyCode] || "Unidentified" : ""
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: Wl,
			charCode: function(e) {
				return e.type === "keypress" ? hu(e) : 0
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
			},
			which: function(e) {
				return e.type === "keypress" ? hu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
			}
		}),
		hd = nt(md),
		gd = O({}, xu, {
			pointerId: 0,
			width: 0,
			height: 0,
			pressure: 0,
			tangentialPressure: 0,
			tiltX: 0,
			tiltY: 0,
			twist: 0,
			pointerType: 0,
			isPrimary: 0
		}),
		Do = nt(gd),
		xd = O({}, wn, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: Wl
		}),
		vd = nt(xd),
		yd = O({}, Tr, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		}),
		Dd = nt(yd),
		wd = O({}, xu, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
			},
			deltaZ: 0,
			deltaMode: 0
		}),
		Ad = nt(wd),
		Cd = [9, 13, 27, 32],
		Ql = k && "CompositionEvent" in window,
		Cn = null;
	k && "documentMode" in document && (Cn = document.documentMode);
	var Ed = k && "TextEvent" in window && !Cn,
		wo = k && (!Ql || Cn && 8 < Cn && 11 >= Cn),
		Ao = " ",
		Co = !1;

	function Eo(e, t) {
		switch (e) {
			case "keyup":
				return Cd.indexOf(t.keyCode) !== -1;
			case "keydown":
				return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout":
				return !0;
			default:
				return !1
		}
	}

	function ko(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
	}
	var Pr = !1;

	function kd(e, t) {
		switch (e) {
			case "compositionend":
				return ko(t);
			case "keypress":
				return t.which !== 32 ? null : (Co = !0, Ao);
			case "textInput":
				return e = t.data, e === Ao && Co ? null : e;
			default:
				return null
		}
	}

	function Sd(e, t) {
		if (Pr) return e === "compositionend" || !Ql && Eo(e, t) ? (e = go(), mu = Ul = Gt = null, Pr = !1, e) : null;
		switch (e) {
			case "paste":
				return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which)
				}
				return null;
			case "compositionend":
				return wo && t.locale !== "ko" ? null : t.data;
			default:
				return null
		}
	}
	var jd = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};

	function So(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!jd[e.type] : t === "textarea"
	}

	function jo(e, t, r, n) {
		Gi(n), t = Au(t, "onChange"), 0 < t.length && (r = new Vl("onChange", "change", null, r, n), e.push({
			event: r,
			listeners: t
		}))
	}
	var En = null,
		kn = null;

	function Bd(e) {
		$o(e, 0)
	}

	function vu(e) {
		var t = Ur(e);
		if (cr(t)) return e
	}

	function Fd(e, t) {
		if (e === "change") return t
	}
	var Bo = !1;
	if (k) {
		var Kl;
		if (k) {
			var Yl = "oninput" in document;
			if (!Yl) {
				var Fo = document.createElement("div");
				Fo.setAttribute("oninput", "return;"), Yl = typeof Fo.oninput == "function"
			}
			Kl = Yl
		} else Kl = !1;
		Bo = Kl && (!document.documentMode || 9 < document.documentMode)
	}

	function No() {
		En && (En.detachEvent("onpropertychange", _o), kn = En = null)
	}

	function _o(e) {
		if (e.propertyName === "value" && vu(kn)) {
			var t = [];
			jo(t, kn, e, Fl(e)), Yi(Bd, t)
		}
	}

	function Nd(e, t, r) {
		e === "focusin" ? (No(), En = t, kn = r, En.attachEvent("onpropertychange", _o)) : e === "focusout" && No()
	}

	function _d(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return vu(kn)
	}

	function bd(e, t) {
		if (e === "click") return vu(t)
	}

	function Ld(e, t) {
		if (e === "input" || e === "change") return vu(t)
	}

	function qd(e, t) {
		return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
	}
	var xt = typeof Object.is == "function" ? Object.is : qd;

	function Sn(e, t) {
		if (xt(e, t)) return !0;
		if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
		var r = Object.keys(e),
			n = Object.keys(t);
		if (r.length !== n.length) return !1;
		for (n = 0; n < r.length; n++) {
			var l = r[n];
			if (!D.call(t, l) || !xt(e[l], t[l])) return !1
		}
		return !0
	}

	function bo(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e
	}

	function Lo(e, t) {
		var r = bo(e);
		e = 0;
		for (var n; r;) {
			if (r.nodeType === 3) {
				if (n = e + r.textContent.length, e <= t && n >= t) return {
					node: r,
					offset: t - e
				};
				e = n
			}
			e: {
				for (; r;) {
					if (r.nextSibling) {
						r = r.nextSibling;
						break e
					}
					r = r.parentNode
				}
				r = void 0
			}
			r = bo(r)
		}
	}

	function qo(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? qo(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
	}

	function Ro() {
		for (var e = window, t = dr(); t instanceof e.HTMLIFrameElement;) {
			try {
				var r = typeof t.contentWindow.location.href == "string"
			} catch {
				r = !1
			}
			if (r) e = t.contentWindow;
			else break;
			t = dr(e.document)
		}
		return t
	}

	function Jl(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
	}

	function Rd(e) {
		var t = Ro(),
			r = e.focusedElem,
			n = e.selectionRange;
		if (t !== r && r && r.ownerDocument && qo(r.ownerDocument.documentElement, r)) {
			if (n !== null && Jl(r)) {
				if (t = n.start, e = n.end, e === void 0 && (e = t), "selectionStart" in r) r.selectionStart = t, r.selectionEnd = Math.min(e, r.value.length);
				else if (e = (t = r.ownerDocument || document) && t.defaultView || window, e.getSelection) {
					e = e.getSelection();
					var l = r.textContent.length,
						a = Math.min(n.start, l);
					n = n.end === void 0 ? a : Math.min(n.end, l), !e.extend && a > n && (l = n, n = a, a = l), l = Lo(r, a);
					var c = Lo(r, n);
					l && c && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== c.node || e.focusOffset !== c.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), a > n ? (e.addRange(t), e.extend(c.node, c.offset)) : (t.setEnd(c.node, c.offset), e.addRange(t)))
				}
			}
			for (t = [], e = r; e = e.parentNode;) e.nodeType === 1 && t.push({
				element: e,
				left: e.scrollLeft,
				top: e.scrollTop
			});
			for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++) e = t[r], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
		}
	}
	var Td = k && "documentMode" in document && 11 >= document.documentMode,
		Ir = null,
		Zl = null,
		jn = null,
		Xl = !1;

	function To(e, t, r) {
		var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
		Xl || Ir == null || Ir !== dr(n) || (n = Ir, "selectionStart" in n && Jl(n) ? n = {
			start: n.selectionStart,
			end: n.selectionEnd
		} : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
			anchorNode: n.anchorNode,
			anchorOffset: n.anchorOffset,
			focusNode: n.focusNode,
			focusOffset: n.focusOffset
		}), jn && Sn(jn, n) || (jn = n, n = Au(Zl, "onSelect"), 0 < n.length && (t = new Vl("onSelect", "select", null, t, r), e.push({
			event: t,
			listeners: n
		}), t.target = Ir)))
	}

	function yu(e, t) {
		var r = {};
		return r[e.toLowerCase()] = t.toLowerCase(), r["Webkit" + e] = "webkit" + t, r["Moz" + e] = "moz" + t, r
	}
	var zr = {
			animationend: yu("Animation", "AnimationEnd"),
			animationiteration: yu("Animation", "AnimationIteration"),
			animationstart: yu("Animation", "AnimationStart"),
			transitionend: yu("Transition", "TransitionEnd")
		},
		ea = {},
		Po = {};
	k && (Po = document.createElement("div").style, "AnimationEvent" in window || (delete zr.animationend.animation, delete zr.animationiteration.animation, delete zr.animationstart.animation), "TransitionEvent" in window || delete zr.transitionend.transition);

	function Du(e) {
		if (ea[e]) return ea[e];
		if (!zr[e]) return e;
		var t = zr[e],
			r;
		for (r in t)
			if (t.hasOwnProperty(r) && r in Po) return ea[e] = t[r];
		return e
	}
	var Io = Du("animationend"),
		zo = Du("animationiteration"),
		Mo = Du("animationstart"),
		Oo = Du("transitionend"),
		Uo = new Map,
		Vo = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

	function Wt(e, t) {
		Uo.set(e, t), m(t, [e])
	}
	for (var ta = 0; ta < Vo.length; ta++) {
		var ra = Vo[ta],
			Pd = ra.toLowerCase(),
			Id = ra[0].toUpperCase() + ra.slice(1);
		Wt(Pd, "on" + Id)
	}
	Wt(Io, "onAnimationEnd"), Wt(zo, "onAnimationIteration"), Wt(Mo, "onAnimationStart"), Wt("dblclick", "onDoubleClick"), Wt("focusin", "onFocus"), Wt("focusout", "onBlur"), Wt(Oo, "onTransitionEnd"), y("onMouseEnter", ["mouseout", "mouseover"]), y("onMouseLeave", ["mouseout", "mouseover"]), y("onPointerEnter", ["pointerout", "pointerover"]), y("onPointerLeave", ["pointerout", "pointerover"]), m("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), m("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), m("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), m("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), m("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Bn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
		zd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Bn));

	function Ho(e, t, r) {
		var n = e.type || "unknown-event";
		e.currentTarget = r, P2(n, t, void 0, e), e.currentTarget = null
	}

	function $o(e, t) {
		t = (t & 4) !== 0;
		for (var r = 0; r < e.length; r++) {
			var n = e[r],
				l = n.event;
			n = n.listeners;
			e: {
				var a = void 0;
				if (t)
					for (var c = n.length - 1; 0 <= c; c--) {
						var p = n[c],
							h = p.instance,
							S = p.currentTarget;
						if (p = p.listener, h !== a && l.isPropagationStopped()) break e;
						Ho(l, p, S), a = h
					} else
						for (c = 0; c < n.length; c++) {
							if (p = n[c], h = p.instance, S = p.currentTarget, p = p.listener, h !== a && l.isPropagationStopped()) break e;
							Ho(l, p, S), a = h
						}
			}
		}
		if (uu) throw e = Ll, uu = !1, Ll = null, e
	}

	function Ce(e, t) {
		var r = t[ca];
		r === void 0 && (r = t[ca] = new Set);
		var n = e + "__bubble";
		r.has(n) || (Go(t, e, 2, !1), r.add(n))
	}

	function na(e, t, r) {
		var n = 0;
		t && (n |= 4), Go(r, e, n, t)
	}
	var wu = "_reactListening" + Math.random().toString(36).slice(2);

	function Fn(e) {
		if (!e[wu]) {
			e[wu] = !0, d.forEach(function(r) {
				r !== "selectionchange" && (zd.has(r) || na(r, !1, e), na(r, !0, e))
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[wu] || (t[wu] = !0, na("selectionchange", !1, t))
		}
	}

	function Go(e, t, r, n) {
		switch (ho(t)) {
			case 1:
				var l = X2;
				break;
			case 4:
				l = ed;
				break;
			default:
				l = Ml
		}
		r = l.bind(null, t, r, e), l = void 0, !bl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), n ? l !== void 0 ? e.addEventListener(t, r, {
			capture: !0,
			passive: l
		}) : e.addEventListener(t, r, !0) : l !== void 0 ? e.addEventListener(t, r, {
			passive: l
		}) : e.addEventListener(t, r, !1)
	}

	function ua(e, t, r, n, l) {
		var a = n;
		if ((t & 1) === 0 && (t & 2) === 0 && n !== null) e: for (;;) {
			if (n === null) return;
			var c = n.tag;
			if (c === 3 || c === 4) {
				var p = n.stateNode.containerInfo;
				if (p === l || p.nodeType === 8 && p.parentNode === l) break;
				if (c === 4)
					for (c = n.return; c !== null;) {
						var h = c.tag;
						if ((h === 3 || h === 4) && (h = c.stateNode.containerInfo, h === l || h.nodeType === 8 && h.parentNode === l)) return;
						c = c.return
					}
				for (; p !== null;) {
					if (c = hr(p), c === null) return;
					if (h = c.tag, h === 5 || h === 6) {
						n = a = c;
						continue e
					}
					p = p.parentNode
				}
			}
			n = n.return
		}
		Yi(function() {
			var S = a,
				T = Fl(r),
				M = [];
			e: {
				var R = Uo.get(e);
				if (R !== void 0) {
					var Y = Vl,
						ee = e;
					switch (e) {
						case "keypress":
							if (hu(r) === 0) break e;
						case "keydown":
						case "keyup":
							Y = hd;
							break;
						case "focusin":
							ee = "focus", Y = Gl;
							break;
						case "focusout":
							ee = "blur", Y = Gl;
							break;
						case "beforeblur":
						case "afterblur":
							Y = Gl;
							break;
						case "click":
							if (r.button === 2) break e;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							Y = vo;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							Y = nd;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							Y = vd;
							break;
						case Io:
						case zo:
						case Mo:
							Y = ad;
							break;
						case Oo:
							Y = Dd;
							break;
						case "scroll":
							Y = td;
							break;
						case "wheel":
							Y = Ad;
							break;
						case "copy":
						case "cut":
						case "paste":
							Y = od;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							Y = Do
					}
					var te = (t & 4) !== 0,
						Le = !te && e === "scroll",
						C = te ? R !== null ? R + "Capture" : null : R;
					te = [];
					for (var v = S, E; v !== null;) {
						E = v;
						var U = E.stateNode;
						if (E.tag === 5 && U !== null && (E = U, C !== null && (U = dn(v, C), U != null && te.push(Nn(v, U, E)))), Le) break;
						v = v.return
					}
					0 < te.length && (R = new Y(R, ee, null, r, T), M.push({
						event: R,
						listeners: te
					}))
				}
			}
			if ((t & 7) === 0) {
				e: {
					if (R = e === "mouseover" || e === "pointerover", Y = e === "mouseout" || e === "pointerout", R && r !== Bl && (ee = r.relatedTarget || r.fromElement) && (hr(ee) || ee[bt])) break e;
					if ((Y || R) && (R = T.window === T ? T : (R = T.ownerDocument) ? R.defaultView || R.parentWindow : window, Y ? (ee = r.relatedTarget || r.toElement, Y = S, ee = ee ? hr(ee) : null, ee !== null && (Le = mr(ee), ee !== Le || ee.tag !== 5 && ee.tag !== 6) && (ee = null)) : (Y = null, ee = S), Y !== ee)) {
						if (te = vo, U = "onMouseLeave", C = "onMouseEnter", v = "mouse", (e === "pointerout" || e === "pointerover") && (te = Do, U = "onPointerLeave", C = "onPointerEnter", v = "pointer"), Le = Y == null ? R : Ur(Y), E = ee == null ? R : Ur(ee), R = new te(U, v + "leave", Y, r, T), R.target = Le, R.relatedTarget = E, U = null, hr(T) === S && (te = new te(C, v + "enter", ee, r, T), te.target = E, te.relatedTarget = Le, U = te), Le = U, Y && ee) t: {
							for (te = Y, C = ee, v = 0, E = te; E; E = Mr(E)) v++;
							for (E = 0, U = C; U; U = Mr(U)) E++;
							for (; 0 < v - E;) te = Mr(te),
							v--;
							for (; 0 < E - v;) C = Mr(C),
							E--;
							for (; v--;) {
								if (te === C || C !== null && te === C.alternate) break t;
								te = Mr(te), C = Mr(C)
							}
							te = null
						}
						else te = null;
						Y !== null && Wo(M, R, Y, te, !1), ee !== null && Le !== null && Wo(M, Le, ee, te, !0)
					}
				}
				e: {
					if (R = S ? Ur(S) : window, Y = R.nodeName && R.nodeName.toLowerCase(), Y === "select" || Y === "input" && R.type === "file") var re = Fd;
					else if (So(R))
						if (Bo) re = Ld;
						else {
							re = _d;
							var ue = Nd
						}
					else(Y = R.nodeName) && Y.toLowerCase() === "input" && (R.type === "checkbox" || R.type === "radio") && (re = bd);
					if (re && (re = re(e, S))) {
						jo(M, re, r, T);
						break e
					}
					ue && ue(e, R, S),
					e === "focusout" && (ue = R._wrapperState) && ue.controlled && R.type === "number" && Cl(R, "number", R.value)
				}
				switch (ue = S ? Ur(S) : window, e) {
					case "focusin":
						(So(ue) || ue.contentEditable === "true") && (Ir = ue, Zl = S, jn = null);
						break;
					case "focusout":
						jn = Zl = Ir = null;
						break;
					case "mousedown":
						Xl = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Xl = !1, To(M, r, T);
						break;
					case "selectionchange":
						if (Td) break;
					case "keydown":
					case "keyup":
						To(M, r, T)
				}
				var le;
				if (Ql) e: {
					switch (e) {
						case "compositionstart":
							var oe = "onCompositionStart";
							break e;
						case "compositionend":
							oe = "onCompositionEnd";
							break e;
						case "compositionupdate":
							oe = "onCompositionUpdate";
							break e
					}
					oe = void 0
				}
				else Pr ? Eo(e, r) && (oe = "onCompositionEnd") : e === "keydown" && r.keyCode === 229 && (oe = "onCompositionStart");oe && (wo && r.locale !== "ko" && (Pr || oe !== "onCompositionStart" ? oe === "onCompositionEnd" && Pr && (le = go()) : (Gt = T, Ul = "value" in Gt ? Gt.value : Gt.textContent, Pr = !0)), ue = Au(S, oe), 0 < ue.length && (oe = new yo(oe, e, null, r, T), M.push({
					event: oe,
					listeners: ue
				}), le ? oe.data = le : (le = ko(r), le !== null && (oe.data = le)))),
				(le = Ed ? kd(e, r) : Sd(e, r)) && (S = Au(S, "onBeforeInput"), 0 < S.length && (T = new yo("onBeforeInput", "beforeinput", null, r, T), M.push({
					event: T,
					listeners: S
				}), T.data = le))
			}
			$o(M, t)
		})
	}

	function Nn(e, t, r) {
		return {
			instance: e,
			listener: t,
			currentTarget: r
		}
	}

	function Au(e, t) {
		for (var r = t + "Capture", n = []; e !== null;) {
			var l = e,
				a = l.stateNode;
			l.tag === 5 && a !== null && (l = a, a = dn(e, r), a != null && n.unshift(Nn(e, a, l)), a = dn(e, t), a != null && n.push(Nn(e, a, l))), e = e.return
		}
		return n
	}

	function Mr(e) {
		if (e === null) return null;
		do e = e.return; while (e && e.tag !== 5);
		return e || null
	}

	function Wo(e, t, r, n, l) {
		for (var a = t._reactName, c = []; r !== null && r !== n;) {
			var p = r,
				h = p.alternate,
				S = p.stateNode;
			if (h !== null && h === n) break;
			p.tag === 5 && S !== null && (p = S, l ? (h = dn(r, a), h != null && c.unshift(Nn(r, h, p))) : l || (h = dn(r, a), h != null && c.push(Nn(r, h, p)))), r = r.return
		}
		c.length !== 0 && e.push({
			event: t,
			listeners: c
		})
	}
	var Md = /\r\n?/g,
		Od = /\u0000|\uFFFD/g;

	function Qo(e) {
		return (typeof e == "string" ? e : "" + e).replace(Md, `
`).replace(Od, "")
	}

	function Cu(e, t, r) {
		if (t = Qo(t), Qo(e) !== t && r) throw Error(o(425))
	}

	function Eu() {}
	var la = null,
		aa = null;

	function ia(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
	}
	var oa = typeof setTimeout == "function" ? setTimeout : void 0,
		Ud = typeof clearTimeout == "function" ? clearTimeout : void 0,
		Ko = typeof Promise == "function" ? Promise : void 0,
		Vd = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ko < "u" ? function(e) {
			return Ko.resolve(null).then(e).catch(Hd)
		} : oa;

	function Hd(e) {
		setTimeout(function() {
			throw e
		})
	}

	function sa(e, t) {
		var r = t,
			n = 0;
		do {
			var l = r.nextSibling;
			if (e.removeChild(r), l && l.nodeType === 8)
				if (r = l.data, r === "/$") {
					if (n === 0) {
						e.removeChild(l), Dn(t);
						return
					}
					n--
				} else r !== "$" && r !== "$?" && r !== "$!" || n++;
			r = l
		} while (r);
		Dn(t)
	}

	function Qt(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
				if (t === "/$") return null
			}
		}
		return e
	}

	function Yo(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var r = e.data;
				if (r === "$" || r === "$!" || r === "$?") {
					if (t === 0) return e;
					t--
				} else r === "/$" && t++
			}
			e = e.previousSibling
		}
		return null
	}
	var Or = Math.random().toString(36).slice(2),
		Et = "__reactFiber$" + Or,
		_n = "__reactProps$" + Or,
		bt = "__reactContainer$" + Or,
		ca = "__reactEvents$" + Or,
		$d = "__reactListeners$" + Or,
		Gd = "__reactHandles$" + Or;

	function hr(e) {
		var t = e[Et];
		if (t) return t;
		for (var r = e.parentNode; r;) {
			if (t = r[bt] || r[Et]) {
				if (r = t.alternate, t.child !== null || r !== null && r.child !== null)
					for (e = Yo(e); e !== null;) {
						if (r = e[Et]) return r;
						e = Yo(e)
					}
				return t
			}
			e = r, r = e.parentNode
		}
		return null
	}

	function bn(e) {
		return e = e[Et] || e[bt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
	}

	function Ur(e) {
		if (e.tag === 5 || e.tag === 6) return e.stateNode;
		throw Error(o(33))
	}

	function ku(e) {
		return e[_n] || null
	}
	var da = [],
		Vr = -1;

	function Kt(e) {
		return {
			current: e
		}
	}

	function Ee(e) {
		0 > Vr || (e.current = da[Vr], da[Vr] = null, Vr--)
	}

	function Ae(e, t) {
		Vr++, da[Vr] = e.current, e.current = t
	}
	var Yt = {},
		He = Kt(Yt),
		Je = Kt(!1),
		gr = Yt;

	function Hr(e, t) {
		var r = e.type.contextTypes;
		if (!r) return Yt;
		var n = e.stateNode;
		if (n && n.__reactInternalMemoizedUnmaskedChildContext === t) return n.__reactInternalMemoizedMaskedChildContext;
		var l = {},
			a;
		for (a in r) l[a] = t[a];
		return n && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l
	}

	function Ze(e) {
		return e = e.childContextTypes, e != null
	}

	function Su() {
		Ee(Je), Ee(He)
	}

	function Jo(e, t, r) {
		if (He.current !== Yt) throw Error(o(168));
		Ae(He, t), Ae(Je, r)
	}

	function Zo(e, t, r) {
		var n = e.stateNode;
		if (t = t.childContextTypes, typeof n.getChildContext != "function") return r;
		n = n.getChildContext();
		for (var l in n)
			if (!(l in t)) throw Error(o(108, K(e) || "Unknown", l));
		return O({}, r, n)
	}

	function ju(e) {
		return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Yt, gr = He.current, Ae(He, e), Ae(Je, Je.current), !0
	}

	function Xo(e, t, r) {
		var n = e.stateNode;
		if (!n) throw Error(o(169));
		r ? (e = Zo(e, t, gr), n.__reactInternalMemoizedMergedChildContext = e, Ee(Je), Ee(He), Ae(He, e)) : Ee(Je), Ae(Je, r)
	}
	var Lt = null,
		Bu = !1,
		fa = !1;

	function es(e) {
		Lt === null ? Lt = [e] : Lt.push(e)
	}

	function Wd(e) {
		Bu = !0, es(e)
	}

	function Jt() {
		if (!fa && Lt !== null) {
			fa = !0;
			var e = 0,
				t = ye;
			try {
				var r = Lt;
				for (ye = 1; e < r.length; e++) {
					var n = r[e];
					do n = n(!0); while (n !== null)
				}
				Lt = null, Bu = !1
			} catch (l) {
				throw Lt !== null && (Lt = Lt.slice(e + 1)), to(ql, Jt), l
			} finally {
				ye = t, fa = !1
			}
		}
		return null
	}
	var $r = [],
		Gr = 0,
		Fu = null,
		Nu = 0,
		st = [],
		ct = 0,
		xr = null,
		qt = 1,
		Rt = "";

	function vr(e, t) {
		$r[Gr++] = Nu, $r[Gr++] = Fu, Fu = e, Nu = t
	}

	function ts(e, t, r) {
		st[ct++] = qt, st[ct++] = Rt, st[ct++] = xr, xr = e;
		var n = qt;
		e = Rt;
		var l = 32 - gt(n) - 1;
		n &= ~(1 << l), r += 1;
		var a = 32 - gt(t) + l;
		if (30 < a) {
			var c = l - l % 5;
			a = (n & (1 << c) - 1).toString(32), n >>= c, l -= c, qt = 1 << 32 - gt(t) + l | r << l | n, Rt = a + e
		} else qt = 1 << a | r << l | n, Rt = e
	}

	function pa(e) {
		e.return !== null && (vr(e, 1), ts(e, 1, 0))
	}

	function ma(e) {
		for (; e === Fu;) Fu = $r[--Gr], $r[Gr] = null, Nu = $r[--Gr], $r[Gr] = null;
		for (; e === xr;) xr = st[--ct], st[ct] = null, Rt = st[--ct], st[ct] = null, qt = st[--ct], st[ct] = null
	}
	var ut = null,
		lt = null,
		ke = !1,
		vt = null;

	function rs(e, t) {
		var r = mt(5, null, null, 0);
		r.elementType = "DELETED", r.stateNode = t, r.return = e, t = e.deletions, t === null ? (e.deletions = [r], e.flags |= 16) : t.push(r)
	}

	function ns(e, t) {
		switch (e.tag) {
			case 5:
				var r = e.type;
				return t = t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ut = e, lt = Qt(t.firstChild), !0) : !1;
			case 6:
				return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ut = e, lt = null, !0) : !1;
			case 13:
				return t = t.nodeType !== 8 ? null : t, t !== null ? (r = xr !== null ? {
					id: qt,
					overflow: Rt
				} : null, e.memoizedState = {
					dehydrated: t,
					treeContext: r,
					retryLane: 1073741824
				}, r = mt(18, null, null, 0), r.stateNode = t, r.return = e, e.child = r, ut = e, lt = null, !0) : !1;
			default:
				return !1
		}
	}

	function ha(e) {
		return (e.mode & 1) !== 0 && (e.flags & 128) === 0
	}

	function ga(e) {
		if (ke) {
			var t = lt;
			if (t) {
				var r = t;
				if (!ns(e, t)) {
					if (ha(e)) throw Error(o(418));
					t = Qt(r.nextSibling);
					var n = ut;
					t && ns(e, t) ? rs(n, r) : (e.flags = e.flags & -4097 | 2, ke = !1, ut = e)
				}
			} else {
				if (ha(e)) throw Error(o(418));
				e.flags = e.flags & -4097 | 2, ke = !1, ut = e
			}
		}
	}

	function us(e) {
		for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
		ut = e
	}

	function _u(e) {
		if (e !== ut) return !1;
		if (!ke) return us(e), ke = !0, !1;
		var t;
		if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ia(e.type, e.memoizedProps)), t && (t = lt)) {
			if (ha(e)) throw ls(), Error(o(418));
			for (; t;) rs(e, t), t = Qt(t.nextSibling)
		}
		if (us(e), e.tag === 13) {
			if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
			e: {
				for (e = e.nextSibling, t = 0; e;) {
					if (e.nodeType === 8) {
						var r = e.data;
						if (r === "/$") {
							if (t === 0) {
								lt = Qt(e.nextSibling);
								break e
							}
							t--
						} else r !== "$" && r !== "$!" && r !== "$?" || t++
					}
					e = e.nextSibling
				}
				lt = null
			}
		} else lt = ut ? Qt(e.stateNode.nextSibling) : null;
		return !0
	}

	function ls() {
		for (var e = lt; e;) e = Qt(e.nextSibling)
	}

	function Wr() {
		lt = ut = null, ke = !1
	}

	function xa(e) {
		vt === null ? vt = [e] : vt.push(e)
	}
	var Qd = V.ReactCurrentBatchConfig;

	function Ln(e, t, r) {
		if (e = r.ref, e !== null && typeof e != "function" && typeof e != "object") {
			if (r._owner) {
				if (r = r._owner, r) {
					if (r.tag !== 1) throw Error(o(309));
					var n = r.stateNode
				}
				if (!n) throw Error(o(147, e));
				var l = n,
					a = "" + e;
				return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === a ? t.ref : (t = function(c) {
					var p = l.refs;
					c === null ? delete p[a] : p[a] = c
				}, t._stringRef = a, t)
			}
			if (typeof e != "string") throw Error(o(284));
			if (!r._owner) throw Error(o(290, e))
		}
		return e
	}

	function bu(e, t) {
		throw e = Object.prototype.toString.call(t), Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
	}

	function as(e) {
		var t = e._init;
		return t(e._payload)
	}

	function is(e) {
		function t(C, v) {
			if (e) {
				var E = C.deletions;
				E === null ? (C.deletions = [v], C.flags |= 16) : E.push(v)
			}
		}

		function r(C, v) {
			if (!e) return null;
			for (; v !== null;) t(C, v), v = v.sibling;
			return null
		}

		function n(C, v) {
			for (C = new Map; v !== null;) v.key !== null ? C.set(v.key, v) : C.set(v.index, v), v = v.sibling;
			return C
		}

		function l(C, v) {
			return C = lr(C, v), C.index = 0, C.sibling = null, C
		}

		function a(C, v, E) {
			return C.index = E, e ? (E = C.alternate, E !== null ? (E = E.index, E < v ? (C.flags |= 2, v) : E) : (C.flags |= 2, v)) : (C.flags |= 1048576, v)
		}

		function c(C) {
			return e && C.alternate === null && (C.flags |= 2), C
		}

		function p(C, v, E, U) {
			return v === null || v.tag !== 6 ? (v = oi(E, C.mode, U), v.return = C, v) : (v = l(v, E), v.return = C, v)
		}

		function h(C, v, E, U) {
			var re = E.type;
			return re === H ? T(C, v, E.props.children, U, E.key) : v !== null && (v.elementType === re || typeof re == "object" && re !== null && re.$$typeof === _e && as(re) === v.type) ? (U = l(v, E.props), U.ref = Ln(C, v, E), U.return = C, U) : (U = rl(E.type, E.key, E.props, null, C.mode, U), U.ref = Ln(C, v, E), U.return = C, U)
		}

		function S(C, v, E, U) {
			return v === null || v.tag !== 4 || v.stateNode.containerInfo !== E.containerInfo || v.stateNode.implementation !== E.implementation ? (v = si(E, C.mode, U), v.return = C, v) : (v = l(v, E.children || []), v.return = C, v)
		}

		function T(C, v, E, U, re) {
			return v === null || v.tag !== 7 ? (v = Sr(E, C.mode, U, re), v.return = C, v) : (v = l(v, E), v.return = C, v)
		}

		function M(C, v, E) {
			if (typeof v == "string" && v !== "" || typeof v == "number") return v = oi("" + v, C.mode, E), v.return = C, v;
			if (typeof v == "object" && v !== null) {
				switch (v.$$typeof) {
					case I:
						return E = rl(v.type, v.key, v.props, null, C.mode, E), E.ref = Ln(C, null, v), E.return = C, E;
					case J:
						return v = si(v, C.mode, E), v.return = C, v;
					case _e:
						var U = v._init;
						return M(C, U(v._payload), E)
				}
				if (on(v) || q(v)) return v = Sr(v, C.mode, E, null), v.return = C, v;
				bu(C, v)
			}
			return null
		}

		function R(C, v, E, U) {
			var re = v !== null ? v.key : null;
			if (typeof E == "string" && E !== "" || typeof E == "number") return re !== null ? null : p(C, v, "" + E, U);
			if (typeof E == "object" && E !== null) {
				switch (E.$$typeof) {
					case I:
						return E.key === re ? h(C, v, E, U) : null;
					case J:
						return E.key === re ? S(C, v, E, U) : null;
					case _e:
						return re = E._init, R(C, v, re(E._payload), U)
				}
				if (on(E) || q(E)) return re !== null ? null : T(C, v, E, U, null);
				bu(C, E)
			}
			return null
		}

		function Y(C, v, E, U, re) {
			if (typeof U == "string" && U !== "" || typeof U == "number") return C = C.get(E) || null, p(v, C, "" + U, re);
			if (typeof U == "object" && U !== null) {
				switch (U.$$typeof) {
					case I:
						return C = C.get(U.key === null ? E : U.key) || null, h(v, C, U, re);
					case J:
						return C = C.get(U.key === null ? E : U.key) || null, S(v, C, U, re);
					case _e:
						var ue = U._init;
						return Y(C, v, E, ue(U._payload), re)
				}
				if (on(U) || q(U)) return C = C.get(E) || null, T(v, C, U, re, null);
				bu(v, U)
			}
			return null
		}

		function ee(C, v, E, U) {
			for (var re = null, ue = null, le = v, oe = v = 0, Oe = null; le !== null && oe < E.length; oe++) {
				le.index > oe ? (Oe = le, le = null) : Oe = le.sibling;
				var he = R(C, le, E[oe], U);
				if (he === null) {
					le === null && (le = Oe);
					break
				}
				e && le && he.alternate === null && t(C, le), v = a(he, v, oe), ue === null ? re = he : ue.sibling = he, ue = he, le = Oe
			}
			if (oe === E.length) return r(C, le), ke && vr(C, oe), re;
			if (le === null) {
				for (; oe < E.length; oe++) le = M(C, E[oe], U), le !== null && (v = a(le, v, oe), ue === null ? re = le : ue.sibling = le, ue = le);
				return ke && vr(C, oe), re
			}
			for (le = n(C, le); oe < E.length; oe++) Oe = Y(le, C, oe, E[oe], U), Oe !== null && (e && Oe.alternate !== null && le.delete(Oe.key === null ? oe : Oe.key), v = a(Oe, v, oe), ue === null ? re = Oe : ue.sibling = Oe, ue = Oe);
			return e && le.forEach(function(ar) {
				return t(C, ar)
			}), ke && vr(C, oe), re
		}

		function te(C, v, E, U) {
			var re = q(E);
			if (typeof re != "function") throw Error(o(150));
			if (E = re.call(E), E == null) throw Error(o(151));
			for (var ue = re = null, le = v, oe = v = 0, Oe = null, he = E.next(); le !== null && !he.done; oe++, he = E.next()) {
				le.index > oe ? (Oe = le, le = null) : Oe = le.sibling;
				var ar = R(C, le, he.value, U);
				if (ar === null) {
					le === null && (le = Oe);
					break
				}
				e && le && ar.alternate === null && t(C, le), v = a(ar, v, oe), ue === null ? re = ar : ue.sibling = ar, ue = ar, le = Oe
			}
			if (he.done) return r(C, le), ke && vr(C, oe), re;
			if (le === null) {
				for (; !he.done; oe++, he = E.next()) he = M(C, he.value, U), he !== null && (v = a(he, v, oe), ue === null ? re = he : ue.sibling = he, ue = he);
				return ke && vr(C, oe), re
			}
			for (le = n(C, le); !he.done; oe++, he = E.next()) he = Y(le, C, oe, he.value, U), he !== null && (e && he.alternate !== null && le.delete(he.key === null ? oe : he.key), v = a(he, v, oe), ue === null ? re = he : ue.sibling = he, ue = he);
			return e && le.forEach(function(j0) {
				return t(C, j0)
			}), ke && vr(C, oe), re
		}

		function Le(C, v, E, U) {
			if (typeof E == "object" && E !== null && E.type === H && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
				switch (E.$$typeof) {
					case I:
						e: {
							for (var re = E.key, ue = v; ue !== null;) {
								if (ue.key === re) {
									if (re = E.type, re === H) {
										if (ue.tag === 7) {
											r(C, ue.sibling), v = l(ue, E.props.children), v.return = C, C = v;
											break e
										}
									} else if (ue.elementType === re || typeof re == "object" && re !== null && re.$$typeof === _e && as(re) === ue.type) {
										r(C, ue.sibling), v = l(ue, E.props), v.ref = Ln(C, ue, E), v.return = C, C = v;
										break e
									}
									r(C, ue);
									break
								} else t(C, ue);
								ue = ue.sibling
							}
							E.type === H ? (v = Sr(E.props.children, C.mode, U, E.key), v.return = C, C = v) : (U = rl(E.type, E.key, E.props, null, C.mode, U), U.ref = Ln(C, v, E), U.return = C, C = U)
						}
						return c(C);
					case J:
						e: {
							for (ue = E.key; v !== null;) {
								if (v.key === ue)
									if (v.tag === 4 && v.stateNode.containerInfo === E.containerInfo && v.stateNode.implementation === E.implementation) {
										r(C, v.sibling), v = l(v, E.children || []), v.return = C, C = v;
										break e
									} else {
										r(C, v);
										break
									}
								else t(C, v);
								v = v.sibling
							}
							v = si(E, C.mode, U),
							v.return = C,
							C = v
						}
						return c(C);
					case _e:
						return ue = E._init, Le(C, v, ue(E._payload), U)
				}
				if (on(E)) return ee(C, v, E, U);
				if (q(E)) return te(C, v, E, U);
				bu(C, E)
			}
			return typeof E == "string" && E !== "" || typeof E == "number" ? (E = "" + E, v !== null && v.tag === 6 ? (r(C, v.sibling), v = l(v, E), v.return = C, C = v) : (r(C, v), v = oi(E, C.mode, U), v.return = C, C = v), c(C)) : r(C, v)
		}
		return Le
	}
	var Qr = is(!0),
		os = is(!1),
		Lu = Kt(null),
		qu = null,
		Kr = null,
		va = null;

	function ya() {
		va = Kr = qu = null
	}

	function Da(e) {
		var t = Lu.current;
		Ee(Lu), e._currentValue = t
	}

	function wa(e, t, r) {
		for (; e !== null;) {
			var n = e.alternate;
			if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === r) break;
			e = e.return
		}
	}

	function Yr(e, t) {
		qu = e, va = Kr = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Xe = !0), e.firstContext = null)
	}

	function dt(e) {
		var t = e._currentValue;
		if (va !== e)
			if (e = {
					context: e,
					memoizedValue: t,
					next: null
				}, Kr === null) {
				if (qu === null) throw Error(o(308));
				Kr = e, qu.dependencies = {
					lanes: 0,
					firstContext: e
				}
			} else Kr = Kr.next = e;
		return t
	}
	var yr = null;

	function Aa(e) {
		yr === null ? yr = [e] : yr.push(e)
	}

	function ss(e, t, r, n) {
		var l = t.interleaved;
		return l === null ? (r.next = r, Aa(t)) : (r.next = l.next, l.next = r), t.interleaved = r, Tt(e, n)
	}

	function Tt(e, t) {
		e.lanes |= t;
		var r = e.alternate;
		for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null;) e.childLanes |= t, r = e.alternate, r !== null && (r.childLanes |= t), r = e, e = e.return;
		return r.tag === 3 ? r.stateNode : null
	}
	var Zt = !1;

	function Ca(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				interleaved: null,
				lanes: 0
			},
			effects: null
		}
	}

	function cs(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			effects: e.effects
		})
	}

	function Pt(e, t) {
		return {
			eventTime: e,
			lane: t,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		}
	}

	function Xt(e, t, r) {
		var n = e.updateQueue;
		if (n === null) return null;
		if (n = n.shared, (me & 2) !== 0) {
			var l = n.pending;
			return l === null ? t.next = t : (t.next = l.next, l.next = t), n.pending = t, Tt(e, r)
		}
		return l = n.interleaved, l === null ? (t.next = t, Aa(n)) : (t.next = l.next, l.next = t), n.interleaved = t, Tt(e, r)
	}

	function Ru(e, t, r) {
		if (t = t.updateQueue, t !== null && (t = t.shared, (r & 4194240) !== 0)) {
			var n = t.lanes;
			n &= e.pendingLanes, r |= n, t.lanes = r, Pl(e, r)
		}
	}

	function ds(e, t) {
		var r = e.updateQueue,
			n = e.alternate;
		if (n !== null && (n = n.updateQueue, r === n)) {
			var l = null,
				a = null;
			if (r = r.firstBaseUpdate, r !== null) {
				do {
					var c = {
						eventTime: r.eventTime,
						lane: r.lane,
						tag: r.tag,
						payload: r.payload,
						callback: r.callback,
						next: null
					};
					a === null ? l = a = c : a = a.next = c, r = r.next
				} while (r !== null);
				a === null ? l = a = t : a = a.next = t
			} else l = a = t;
			r = {
				baseState: n.baseState,
				firstBaseUpdate: l,
				lastBaseUpdate: a,
				shared: n.shared,
				effects: n.effects
			}, e.updateQueue = r;
			return
		}
		e = r.lastBaseUpdate, e === null ? r.firstBaseUpdate = t : e.next = t, r.lastBaseUpdate = t
	}

	function Tu(e, t, r, n) {
		var l = e.updateQueue;
		Zt = !1;
		var a = l.firstBaseUpdate,
			c = l.lastBaseUpdate,
			p = l.shared.pending;
		if (p !== null) {
			l.shared.pending = null;
			var h = p,
				S = h.next;
			h.next = null, c === null ? a = S : c.next = S, c = h;
			var T = e.alternate;
			T !== null && (T = T.updateQueue, p = T.lastBaseUpdate, p !== c && (p === null ? T.firstBaseUpdate = S : p.next = S, T.lastBaseUpdate = h))
		}
		if (a !== null) {
			var M = l.baseState;
			c = 0, T = S = h = null, p = a;
			do {
				var R = p.lane,
					Y = p.eventTime;
				if ((n & R) === R) {
					T !== null && (T = T.next = {
						eventTime: Y,
						lane: 0,
						tag: p.tag,
						payload: p.payload,
						callback: p.callback,
						next: null
					});
					e: {
						var ee = e,
							te = p;
						switch (R = t, Y = r, te.tag) {
							case 1:
								if (ee = te.payload, typeof ee == "function") {
									M = ee.call(Y, M, R);
									break e
								}
								M = ee;
								break e;
							case 3:
								ee.flags = ee.flags & -65537 | 128;
							case 0:
								if (ee = te.payload, R = typeof ee == "function" ? ee.call(Y, M, R) : ee, R == null) break e;
								M = O({}, M, R);
								break e;
							case 2:
								Zt = !0
						}
					}
					p.callback !== null && p.lane !== 0 && (e.flags |= 64, R = l.effects, R === null ? l.effects = [p] : R.push(p))
				} else Y = {
					eventTime: Y,
					lane: R,
					tag: p.tag,
					payload: p.payload,
					callback: p.callback,
					next: null
				}, T === null ? (S = T = Y, h = M) : T = T.next = Y, c |= R;
				if (p = p.next, p === null) {
					if (p = l.shared.pending, p === null) break;
					R = p, p = R.next, R.next = null, l.lastBaseUpdate = R, l.shared.pending = null
				}
			} while (!0);
			if (T === null && (h = M), l.baseState = h, l.firstBaseUpdate = S, l.lastBaseUpdate = T, t = l.shared.interleaved, t !== null) {
				l = t;
				do c |= l.lane, l = l.next; while (l !== t)
			} else a === null && (l.shared.lanes = 0);
			Ar |= c, e.lanes = c, e.memoizedState = M
		}
	}

	function fs(e, t, r) {
		if (e = t.effects, t.effects = null, e !== null)
			for (t = 0; t < e.length; t++) {
				var n = e[t],
					l = n.callback;
				if (l !== null) {
					if (n.callback = null, n = r, typeof l != "function") throw Error(o(191, l));
					l.call(n)
				}
			}
	}
	var qn = {},
		kt = Kt(qn),
		Rn = Kt(qn),
		Tn = Kt(qn);

	function Dr(e) {
		if (e === qn) throw Error(o(174));
		return e
	}

	function Ea(e, t) {
		switch (Ae(Tn, t), Ae(Rn, e), Ae(kt, qn), e = t.nodeType, e) {
			case 9:
			case 11:
				t = (t = t.documentElement) ? t.namespaceURI : kl(null, "");
				break;
			default:
				e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = kl(t, e)
		}
		Ee(kt), Ae(kt, t)
	}

	function Jr() {
		Ee(kt), Ee(Rn), Ee(Tn)
	}

	function ps(e) {
		Dr(Tn.current);
		var t = Dr(kt.current),
			r = kl(t, e.type);
		t !== r && (Ae(Rn, e), Ae(kt, r))
	}

	function ka(e) {
		Rn.current === e && (Ee(kt), Ee(Rn))
	}
	var je = Kt(0);

	function Pu(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var r = t.memoizedState;
				if (r !== null && (r = r.dehydrated, r === null || r.data === "$?" || r.data === "$!")) return t
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
				if ((t.flags & 128) !== 0) return t
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return
			}
			t.sibling.return = t.return, t = t.sibling
		}
		return null
	}
	var Sa = [];

	function ja() {
		for (var e = 0; e < Sa.length; e++) Sa[e]._workInProgressVersionPrimary = null;
		Sa.length = 0
	}
	var Iu = V.ReactCurrentDispatcher,
		Ba = V.ReactCurrentBatchConfig,
		wr = 0,
		Be = null,
		Re = null,
		ze = null,
		zu = !1,
		Pn = !1,
		In = 0,
		Kd = 0;

	function $e() {
		throw Error(o(321))
	}

	function Fa(e, t) {
		if (t === null) return !1;
		for (var r = 0; r < t.length && r < e.length; r++)
			if (!xt(e[r], t[r])) return !1;
		return !0
	}

	function Na(e, t, r, n, l, a) {
		if (wr = a, Be = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Iu.current = e === null || e.memoizedState === null ? Xd : e0, e = r(n, l), Pn) {
			a = 0;
			do {
				if (Pn = !1, In = 0, 25 <= a) throw Error(o(301));
				a += 1, ze = Re = null, t.updateQueue = null, Iu.current = t0, e = r(n, l)
			} while (Pn)
		}
		if (Iu.current = Uu, t = Re !== null && Re.next !== null, wr = 0, ze = Re = Be = null, zu = !1, t) throw Error(o(300));
		return e
	}

	function _a() {
		var e = In !== 0;
		return In = 0, e
	}

	function St() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return ze === null ? Be.memoizedState = ze = e : ze = ze.next = e, ze
	}

	function ft() {
		if (Re === null) {
			var e = Be.alternate;
			e = e !== null ? e.memoizedState : null
		} else e = Re.next;
		var t = ze === null ? Be.memoizedState : ze.next;
		if (t !== null) ze = t, Re = e;
		else {
			if (e === null) throw Error(o(310));
			Re = e, e = {
				memoizedState: Re.memoizedState,
				baseState: Re.baseState,
				baseQueue: Re.baseQueue,
				queue: Re.queue,
				next: null
			}, ze === null ? Be.memoizedState = ze = e : ze = ze.next = e
		}
		return ze
	}

	function zn(e, t) {
		return typeof t == "function" ? t(e) : t
	}

	function ba(e) {
		var t = ft(),
			r = t.queue;
		if (r === null) throw Error(o(311));
		r.lastRenderedReducer = e;
		var n = Re,
			l = n.baseQueue,
			a = r.pending;
		if (a !== null) {
			if (l !== null) {
				var c = l.next;
				l.next = a.next, a.next = c
			}
			n.baseQueue = l = a, r.pending = null
		}
		if (l !== null) {
			a = l.next, n = n.baseState;
			var p = c = null,
				h = null,
				S = a;
			do {
				var T = S.lane;
				if ((wr & T) === T) h !== null && (h = h.next = {
					lane: 0,
					action: S.action,
					hasEagerState: S.hasEagerState,
					eagerState: S.eagerState,
					next: null
				}), n = S.hasEagerState ? S.eagerState : e(n, S.action);
				else {
					var M = {
						lane: T,
						action: S.action,
						hasEagerState: S.hasEagerState,
						eagerState: S.eagerState,
						next: null
					};
					h === null ? (p = h = M, c = n) : h = h.next = M, Be.lanes |= T, Ar |= T
				}
				S = S.next
			} while (S !== null && S !== a);
			h === null ? c = n : h.next = p, xt(n, t.memoizedState) || (Xe = !0), t.memoizedState = n, t.baseState = c, t.baseQueue = h, r.lastRenderedState = n
		}
		if (e = r.interleaved, e !== null) {
			l = e;
			do a = l.lane, Be.lanes |= a, Ar |= a, l = l.next; while (l !== e)
		} else l === null && (r.lanes = 0);
		return [t.memoizedState, r.dispatch]
	}

	function La(e) {
		var t = ft(),
			r = t.queue;
		if (r === null) throw Error(o(311));
		r.lastRenderedReducer = e;
		var n = r.dispatch,
			l = r.pending,
			a = t.memoizedState;
		if (l !== null) {
			r.pending = null;
			var c = l = l.next;
			do a = e(a, c.action), c = c.next; while (c !== l);
			xt(a, t.memoizedState) || (Xe = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), r.lastRenderedState = a
		}
		return [a, n]
	}

	function ms() {}

	function hs(e, t) {
		var r = Be,
			n = ft(),
			l = t(),
			a = !xt(n.memoizedState, l);
		if (a && (n.memoizedState = l, Xe = !0), n = n.queue, qa(vs.bind(null, r, n, e), [e]), n.getSnapshot !== t || a || ze !== null && ze.memoizedState.tag & 1) {
			if (r.flags |= 2048, Mn(9, xs.bind(null, r, n, l, t), void 0, null), Me === null) throw Error(o(349));
			(wr & 30) !== 0 || gs(r, t, l)
		}
		return l
	}

	function gs(e, t, r) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: r
		}, t = Be.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, Be.updateQueue = t, t.stores = [e]) : (r = t.stores, r === null ? t.stores = [e] : r.push(e))
	}

	function xs(e, t, r, n) {
		t.value = r, t.getSnapshot = n, ys(t) && Ds(e)
	}

	function vs(e, t, r) {
		return r(function() {
			ys(t) && Ds(e)
		})
	}

	function ys(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var r = t();
			return !xt(e, r)
		} catch {
			return !0
		}
	}

	function Ds(e) {
		var t = Tt(e, 1);
		t !== null && At(t, e, 1, -1)
	}

	function ws(e) {
		var t = St();
		return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: zn,
			lastRenderedState: e
		}, t.queue = e, e = e.dispatch = Zd.bind(null, Be, e), [t.memoizedState, e]
	}

	function Mn(e, t, r, n) {
		return e = {
			tag: e,
			create: t,
			destroy: r,
			deps: n,
			next: null
		}, t = Be.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, Be.updateQueue = t, t.lastEffect = e.next = e) : (r = t.lastEffect, r === null ? t.lastEffect = e.next = e : (n = r.next, r.next = e, e.next = n, t.lastEffect = e)), e
	}

	function As() {
		return ft().memoizedState
	}

	function Mu(e, t, r, n) {
		var l = St();
		Be.flags |= e, l.memoizedState = Mn(1 | t, r, void 0, n === void 0 ? null : n)
	}

	function Ou(e, t, r, n) {
		var l = ft();
		n = n === void 0 ? null : n;
		var a = void 0;
		if (Re !== null) {
			var c = Re.memoizedState;
			if (a = c.destroy, n !== null && Fa(n, c.deps)) {
				l.memoizedState = Mn(t, r, a, n);
				return
			}
		}
		Be.flags |= e, l.memoizedState = Mn(1 | t, r, a, n)
	}

	function Cs(e, t) {
		return Mu(8390656, 8, e, t)
	}

	function qa(e, t) {
		return Ou(2048, 8, e, t)
	}

	function Es(e, t) {
		return Ou(4, 2, e, t)
	}

	function ks(e, t) {
		return Ou(4, 4, e, t)
	}

	function Ss(e, t) {
		if (typeof t == "function") return e = e(), t(e),
			function() {
				t(null)
			};
		if (t != null) return e = e(), t.current = e,
			function() {
				t.current = null
			}
	}

	function js(e, t, r) {
		return r = r != null ? r.concat([e]) : null, Ou(4, 4, Ss.bind(null, t, e), r)
	}

	function Ra() {}

	function Bs(e, t) {
		var r = ft();
		t = t === void 0 ? null : t;
		var n = r.memoizedState;
		return n !== null && t !== null && Fa(t, n[1]) ? n[0] : (r.memoizedState = [e, t], e)
	}

	function Fs(e, t) {
		var r = ft();
		t = t === void 0 ? null : t;
		var n = r.memoizedState;
		return n !== null && t !== null && Fa(t, n[1]) ? n[0] : (e = e(), r.memoizedState = [e, t], e)
	}

	function Ns(e, t, r) {
		return (wr & 21) === 0 ? (e.baseState && (e.baseState = !1, Xe = !0), e.memoizedState = r) : (xt(r, t) || (r = lo(), Be.lanes |= r, Ar |= r, e.baseState = !0), t)
	}

	function Yd(e, t) {
		var r = ye;
		ye = r !== 0 && 4 > r ? r : 4, e(!0);
		var n = Ba.transition;
		Ba.transition = {};
		try {
			e(!1), t()
		} finally {
			ye = r, Ba.transition = n
		}
	}

	function _s() {
		return ft().memoizedState
	}

	function Jd(e, t, r) {
		var n = nr(e);
		if (r = {
				lane: n,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, bs(e)) Ls(t, r);
		else if (r = ss(e, t, r, n), r !== null) {
			var l = Ke();
			At(r, e, n, l), qs(r, t, n)
		}
	}

	function Zd(e, t, r) {
		var n = nr(e),
			l = {
				lane: n,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
		if (bs(e)) Ls(t, l);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var c = t.lastRenderedState,
					p = a(c, r);
				if (l.hasEagerState = !0, l.eagerState = p, xt(p, c)) {
					var h = t.interleaved;
					h === null ? (l.next = l, Aa(t)) : (l.next = h.next, h.next = l), t.interleaved = l;
					return
				}
			} catch {} finally {}
			r = ss(e, t, l, n), r !== null && (l = Ke(), At(r, e, n, l), qs(r, t, n))
		}
	}

	function bs(e) {
		var t = e.alternate;
		return e === Be || t !== null && t === Be
	}

	function Ls(e, t) {
		Pn = zu = !0;
		var r = e.pending;
		r === null ? t.next = t : (t.next = r.next, r.next = t), e.pending = t
	}

	function qs(e, t, r) {
		if ((r & 4194240) !== 0) {
			var n = t.lanes;
			n &= e.pendingLanes, r |= n, t.lanes = r, Pl(e, r)
		}
	}
	var Uu = {
			readContext: dt,
			useCallback: $e,
			useContext: $e,
			useEffect: $e,
			useImperativeHandle: $e,
			useInsertionEffect: $e,
			useLayoutEffect: $e,
			useMemo: $e,
			useReducer: $e,
			useRef: $e,
			useState: $e,
			useDebugValue: $e,
			useDeferredValue: $e,
			useTransition: $e,
			useMutableSource: $e,
			useSyncExternalStore: $e,
			useId: $e,
			unstable_isNewReconciler: !1
		},
		Xd = {
			readContext: dt,
			useCallback: function(e, t) {
				return St().memoizedState = [e, t === void 0 ? null : t], e
			},
			useContext: dt,
			useEffect: Cs,
			useImperativeHandle: function(e, t, r) {
				return r = r != null ? r.concat([e]) : null, Mu(4194308, 4, Ss.bind(null, t, e), r)
			},
			useLayoutEffect: function(e, t) {
				return Mu(4194308, 4, e, t)
			},
			useInsertionEffect: function(e, t) {
				return Mu(4, 2, e, t)
			},
			useMemo: function(e, t) {
				var r = St();
				return t = t === void 0 ? null : t, e = e(), r.memoizedState = [e, t], e
			},
			useReducer: function(e, t, r) {
				var n = St();
				return t = r !== void 0 ? r(t) : t, n.memoizedState = n.baseState = t, e = {
					pending: null,
					interleaved: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: e,
					lastRenderedState: t
				}, n.queue = e, e = e.dispatch = Jd.bind(null, Be, e), [n.memoizedState, e]
			},
			useRef: function(e) {
				var t = St();
				return e = {
					current: e
				}, t.memoizedState = e
			},
			useState: ws,
			useDebugValue: Ra,
			useDeferredValue: function(e) {
				return St().memoizedState = e
			},
			useTransition: function() {
				var e = ws(!1),
					t = e[0];
				return e = Yd.bind(null, e[1]), St().memoizedState = e, [t, e]
			},
			useMutableSource: function() {},
			useSyncExternalStore: function(e, t, r) {
				var n = Be,
					l = St();
				if (ke) {
					if (r === void 0) throw Error(o(407));
					r = r()
				} else {
					if (r = t(), Me === null) throw Error(o(349));
					(wr & 30) !== 0 || gs(n, t, r)
				}
				l.memoizedState = r;
				var a = {
					value: r,
					getSnapshot: t
				};
				return l.queue = a, Cs(vs.bind(null, n, a, e), [e]), n.flags |= 2048, Mn(9, xs.bind(null, n, a, r, t), void 0, null), r
			},
			useId: function() {
				var e = St(),
					t = Me.identifierPrefix;
				if (ke) {
					var r = Rt,
						n = qt;
					r = (n & ~(1 << 32 - gt(n) - 1)).toString(32) + r, t = ":" + t + "R" + r, r = In++, 0 < r && (t += "H" + r.toString(32)), t += ":"
				} else r = Kd++, t = ":" + t + "r" + r.toString(32) + ":";
				return e.memoizedState = t
			},
			unstable_isNewReconciler: !1
		},
		e0 = {
			readContext: dt,
			useCallback: Bs,
			useContext: dt,
			useEffect: qa,
			useImperativeHandle: js,
			useInsertionEffect: Es,
			useLayoutEffect: ks,
			useMemo: Fs,
			useReducer: ba,
			useRef: As,
			useState: function() {
				return ba(zn)
			},
			useDebugValue: Ra,
			useDeferredValue: function(e) {
				var t = ft();
				return Ns(t, Re.memoizedState, e)
			},
			useTransition: function() {
				var e = ba(zn)[0],
					t = ft().memoizedState;
				return [e, t]
			},
			useMutableSource: ms,
			useSyncExternalStore: hs,
			useId: _s,
			unstable_isNewReconciler: !1
		},
		t0 = {
			readContext: dt,
			useCallback: Bs,
			useContext: dt,
			useEffect: qa,
			useImperativeHandle: js,
			useInsertionEffect: Es,
			useLayoutEffect: ks,
			useMemo: Fs,
			useReducer: La,
			useRef: As,
			useState: function() {
				return La(zn)
			},
			useDebugValue: Ra,
			useDeferredValue: function(e) {
				var t = ft();
				return Re === null ? t.memoizedState = e : Ns(t, Re.memoizedState, e)
			},
			useTransition: function() {
				var e = La(zn)[0],
					t = ft().memoizedState;
				return [e, t]
			},
			useMutableSource: ms,
			useSyncExternalStore: hs,
			useId: _s,
			unstable_isNewReconciler: !1
		};

	function yt(e, t) {
		if (e && e.defaultProps) {
			t = O({}, t), e = e.defaultProps;
			for (var r in e) t[r] === void 0 && (t[r] = e[r]);
			return t
		}
		return t
	}

	function Ta(e, t, r, n) {
		t = e.memoizedState, r = r(n, t), r = r == null ? t : O({}, t, r), e.memoizedState = r, e.lanes === 0 && (e.updateQueue.baseState = r)
	}
	var Vu = {
		isMounted: function(e) {
			return (e = e._reactInternals) ? mr(e) === e : !1
		},
		enqueueSetState: function(e, t, r) {
			e = e._reactInternals;
			var n = Ke(),
				l = nr(e),
				a = Pt(n, l);
			a.payload = t, r != null && (a.callback = r), t = Xt(e, a, l), t !== null && (At(t, e, l, n), Ru(t, e, l))
		},
		enqueueReplaceState: function(e, t, r) {
			e = e._reactInternals;
			var n = Ke(),
				l = nr(e),
				a = Pt(n, l);
			a.tag = 1, a.payload = t, r != null && (a.callback = r), t = Xt(e, a, l), t !== null && (At(t, e, l, n), Ru(t, e, l))
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var r = Ke(),
				n = nr(e),
				l = Pt(r, n);
			l.tag = 2, t != null && (l.callback = t), t = Xt(e, l, n), t !== null && (At(t, e, n, r), Ru(t, e, n))
		}
	};

	function Rs(e, t, r, n, l, a, c) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, a, c) : t.prototype && t.prototype.isPureReactComponent ? !Sn(r, n) || !Sn(l, a) : !0
	}

	function Ts(e, t, r) {
		var n = !1,
			l = Yt,
			a = t.contextType;
		return typeof a == "object" && a !== null ? a = dt(a) : (l = Ze(t) ? gr : He.current, n = t.contextTypes, a = (n = n != null) ? Hr(e, l) : Yt), t = new t(r, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Vu, e.stateNode = t, t._reactInternals = e, n && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = a), t
	}

	function Ps(e, t, r, n) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(r, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(r, n), t.state !== e && Vu.enqueueReplaceState(t, t.state, null)
	}

	function Pa(e, t, r, n) {
		var l = e.stateNode;
		l.props = r, l.state = e.memoizedState, l.refs = {}, Ca(e);
		var a = t.contextType;
		typeof a == "object" && a !== null ? l.context = dt(a) : (a = Ze(t) ? gr : He.current, l.context = Hr(e, a)), l.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (Ta(e, t, a, r), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Vu.enqueueReplaceState(l, l.state, null), Tu(e, r, l, n), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308)
	}

	function Zr(e, t) {
		try {
			var r = "",
				n = t;
			do r += ce(n), n = n.return; while (n);
			var l = r
		} catch (a) {
			l = `
Error generating stack: ` + a.message + `
` + a.stack
		}
		return {
			value: e,
			source: t,
			stack: l,
			digest: null
		}
	}

	function Ia(e, t, r) {
		return {
			value: e,
			source: null,
			stack: r ?? null,
			digest: t ?? null
		}
	}

	function za(e, t) {
		try {
			console.error(t.value)
		} catch (r) {
			setTimeout(function() {
				throw r
			})
		}
	}
	var r0 = typeof WeakMap == "function" ? WeakMap : Map;

	function Is(e, t, r) {
		r = Pt(-1, r), r.tag = 3, r.payload = {
			element: null
		};
		var n = t.value;
		return r.callback = function() {
			Yu || (Yu = !0, ei = n), za(e, t)
		}, r
	}

	function zs(e, t, r) {
		r = Pt(-1, r), r.tag = 3;
		var n = e.type.getDerivedStateFromError;
		if (typeof n == "function") {
			var l = t.value;
			r.payload = function() {
				return n(l)
			}, r.callback = function() {
				za(e, t)
			}
		}
		var a = e.stateNode;
		return a !== null && typeof a.componentDidCatch == "function" && (r.callback = function() {
			za(e, t), typeof n != "function" && (tr === null ? tr = new Set([this]) : tr.add(this));
			var c = t.stack;
			this.componentDidCatch(t.value, {
				componentStack: c !== null ? c : ""
			})
		}), r
	}

	function Ms(e, t, r) {
		var n = e.pingCache;
		if (n === null) {
			n = e.pingCache = new r0;
			var l = new Set;
			n.set(t, l)
		} else l = n.get(t), l === void 0 && (l = new Set, n.set(t, l));
		l.has(r) || (l.add(r), e = g0.bind(null, e, t, r), t.then(e, e))
	}

	function Os(e) {
		do {
			var t;
			if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
			e = e.return
		} while (e !== null);
		return null
	}

	function Us(e, t, r, n, l) {
		return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, r.flags |= 131072, r.flags &= -52805, r.tag === 1 && (r.alternate === null ? r.tag = 17 : (t = Pt(-1, 1), t.tag = 2, Xt(r, t, 1))), r.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e)
	}
	var n0 = V.ReactCurrentOwner,
		Xe = !1;

	function Qe(e, t, r, n) {
		t.child = e === null ? os(t, null, r, n) : Qr(t, e.child, r, n)
	}

	function Vs(e, t, r, n, l) {
		r = r.render;
		var a = t.ref;
		return Yr(t, l), n = Na(e, t, r, n, a, l), r = _a(), e !== null && !Xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, It(e, t, l)) : (ke && r && pa(t), t.flags |= 1, Qe(e, t, n, l), t.child)
	}

	function Hs(e, t, r, n, l) {
		if (e === null) {
			var a = r.type;
			return typeof a == "function" && !ii(a) && a.defaultProps === void 0 && r.compare === null && r.defaultProps === void 0 ? (t.tag = 15, t.type = a, $s(e, t, a, n, l)) : (e = rl(r.type, null, n, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e)
		}
		if (a = e.child, (e.lanes & l) === 0) {
			var c = a.memoizedProps;
			if (r = r.compare, r = r !== null ? r : Sn, r(c, n) && e.ref === t.ref) return It(e, t, l)
		}
		return t.flags |= 1, e = lr(a, n), e.ref = t.ref, e.return = t, t.child = e
	}

	function $s(e, t, r, n, l) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Sn(a, n) && e.ref === t.ref)
				if (Xe = !1, t.pendingProps = n = a, (e.lanes & l) !== 0)(e.flags & 131072) !== 0 && (Xe = !0);
				else return t.lanes = e.lanes, It(e, t, l)
		}
		return Ma(e, t, r, n, l)
	}

	function Gs(e, t, r) {
		var n = t.pendingProps,
			l = n.children,
			a = e !== null ? e.memoizedState : null;
		if (n.mode === "hidden")
			if ((t.mode & 1) === 0) t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			}, Ae(en, at), at |= r;
			else {
				if ((r & 1073741824) === 0) return e = a !== null ? a.baseLanes | r : r, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
					baseLanes: e,
					cachePool: null,
					transitions: null
				}, t.updateQueue = null, Ae(en, at), at |= e, null;
				t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null
				}, n = a !== null ? a.baseLanes : r, Ae(en, at), at |= n
			}
		else a !== null ? (n = a.baseLanes | r, t.memoizedState = null) : n = r, Ae(en, at), at |= n;
		return Qe(e, t, l, r), t.child
	}

	function Ws(e, t) {
		var r = t.ref;
		(e === null && r !== null || e !== null && e.ref !== r) && (t.flags |= 512, t.flags |= 2097152)
	}

	function Ma(e, t, r, n, l) {
		var a = Ze(r) ? gr : He.current;
		return a = Hr(t, a), Yr(t, l), r = Na(e, t, r, n, a, l), n = _a(), e !== null && !Xe ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, It(e, t, l)) : (ke && n && pa(t), t.flags |= 1, Qe(e, t, r, l), t.child)
	}

	function Qs(e, t, r, n, l) {
		if (Ze(r)) {
			var a = !0;
			ju(t)
		} else a = !1;
		if (Yr(t, l), t.stateNode === null) $u(e, t), Ts(t, r, n), Pa(t, r, n, l), n = !0;
		else if (e === null) {
			var c = t.stateNode,
				p = t.memoizedProps;
			c.props = p;
			var h = c.context,
				S = r.contextType;
			typeof S == "object" && S !== null ? S = dt(S) : (S = Ze(r) ? gr : He.current, S = Hr(t, S));
			var T = r.getDerivedStateFromProps,
				M = typeof T == "function" || typeof c.getSnapshotBeforeUpdate == "function";
			M || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (p !== n || h !== S) && Ps(t, c, n, S), Zt = !1;
			var R = t.memoizedState;
			c.state = R, Tu(t, n, c, l), h = t.memoizedState, p !== n || R !== h || Je.current || Zt ? (typeof T == "function" && (Ta(t, r, T, n), h = t.memoizedState), (p = Zt || Rs(t, r, p, n, R, h, S)) ? (M || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = h), c.props = n, c.state = h, c.context = S, n = p) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), n = !1)
		} else {
			c = t.stateNode, cs(e, t), p = t.memoizedProps, S = t.type === t.elementType ? p : yt(t.type, p), c.props = S, M = t.pendingProps, R = c.context, h = r.contextType, typeof h == "object" && h !== null ? h = dt(h) : (h = Ze(r) ? gr : He.current, h = Hr(t, h));
			var Y = r.getDerivedStateFromProps;
			(T = typeof Y == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (p !== M || R !== h) && Ps(t, c, n, h), Zt = !1, R = t.memoizedState, c.state = R, Tu(t, n, c, l);
			var ee = t.memoizedState;
			p !== M || R !== ee || Je.current || Zt ? (typeof Y == "function" && (Ta(t, r, Y, n), ee = t.memoizedState), (S = Zt || Rs(t, r, S, n, R, ee, h) || !1) ? (T || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(n, ee, h), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(n, ee, h)), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || p === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = ee), c.props = n, c.state = ee, c.context = h, n = S) : (typeof c.componentDidUpdate != "function" || p === e.memoizedProps && R === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && R === e.memoizedState || (t.flags |= 1024), n = !1)
		}
		return Oa(e, t, r, n, a, l)
	}

	function Oa(e, t, r, n, l, a) {
		Ws(e, t);
		var c = (t.flags & 128) !== 0;
		if (!n && !c) return l && Xo(t, r, !1), It(e, t, a);
		n = t.stateNode, n0.current = t;
		var p = c && typeof r.getDerivedStateFromError != "function" ? null : n.render();
		return t.flags |= 1, e !== null && c ? (t.child = Qr(t, e.child, null, a), t.child = Qr(t, null, p, a)) : Qe(e, t, p, a), t.memoizedState = n.state, l && Xo(t, r, !0), t.child
	}

	function Ks(e) {
		var t = e.stateNode;
		t.pendingContext ? Jo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Jo(e, t.context, !1), Ea(e, t.containerInfo)
	}

	function Ys(e, t, r, n, l) {
		return Wr(), xa(l), t.flags |= 256, Qe(e, t, r, n), t.child
	}
	var Ua = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};

	function Va(e) {
		return {
			baseLanes: e,
			cachePool: null,
			transitions: null
		}
	}

	function Js(e, t, r) {
		var n = t.pendingProps,
			l = je.current,
			a = !1,
			c = (t.flags & 128) !== 0,
			p;
		if ((p = c) || (p = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), p ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Ae(je, l & 1), e === null) return ga(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (c = n.children, e = n.fallback, a ? (n = t.mode, a = t.child, c = {
			mode: "hidden",
			children: c
		}, (n & 1) === 0 && a !== null ? (a.childLanes = 0, a.pendingProps = c) : a = nl(c, n, 0, null), e = Sr(e, n, r, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = Va(r), t.memoizedState = Ua, e) : Ha(t, c));
		if (l = e.memoizedState, l !== null && (p = l.dehydrated, p !== null)) return u0(e, t, c, n, p, l, r);
		if (a) {
			a = n.fallback, c = t.mode, l = e.child, p = l.sibling;
			var h = {
				mode: "hidden",
				children: n.children
			};
			return (c & 1) === 0 && t.child !== l ? (n = t.child, n.childLanes = 0, n.pendingProps = h, t.deletions = null) : (n = lr(l, h), n.subtreeFlags = l.subtreeFlags & 14680064), p !== null ? a = lr(p, a) : (a = Sr(a, c, r, null), a.flags |= 2), a.return = t, n.return = t, n.sibling = a, t.child = n, n = a, a = t.child, c = e.child.memoizedState, c = c === null ? Va(r) : {
				baseLanes: c.baseLanes | r,
				cachePool: null,
				transitions: c.transitions
			}, a.memoizedState = c, a.childLanes = e.childLanes & ~r, t.memoizedState = Ua, n
		}
		return a = e.child, e = a.sibling, n = lr(a, {
			mode: "visible",
			children: n.children
		}), (t.mode & 1) === 0 && (n.lanes = r), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n
	}

	function Ha(e, t) {
		return t = nl({
			mode: "visible",
			children: t
		}, e.mode, 0, null), t.return = e, e.child = t
	}

	function Hu(e, t, r, n) {
		return n !== null && xa(n), Qr(t, e.child, null, r), e = Ha(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
	}

	function u0(e, t, r, n, l, a, c) {
		if (r) return t.flags & 256 ? (t.flags &= -257, n = Ia(Error(o(422))), Hu(e, t, c, n)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (a = n.fallback, l = t.mode, n = nl({
			mode: "visible",
			children: n.children
		}, l, 0, null), a = Sr(a, l, c, null), a.flags |= 2, n.return = t, a.return = t, n.sibling = a, t.child = n, (t.mode & 1) !== 0 && Qr(t, e.child, null, c), t.child.memoizedState = Va(c), t.memoizedState = Ua, a);
		if ((t.mode & 1) === 0) return Hu(e, t, c, null);
		if (l.data === "$!") {
			if (n = l.nextSibling && l.nextSibling.dataset, n) var p = n.dgst;
			return n = p, a = Error(o(419)), n = Ia(a, n, void 0), Hu(e, t, c, n)
		}
		if (p = (c & e.childLanes) !== 0, Xe || p) {
			if (n = Me, n !== null) {
				switch (c & -c) {
					case 4:
						l = 2;
						break;
					case 16:
						l = 8;
						break;
					case 64:
					case 128:
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152:
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432:
					case 67108864:
						l = 32;
						break;
					case 536870912:
						l = 268435456;
						break;
					default:
						l = 0
				}
				l = (l & (n.suspendedLanes | c)) !== 0 ? 0 : l, l !== 0 && l !== a.retryLane && (a.retryLane = l, Tt(e, l), At(n, e, l, -1))
			}
			return ai(), n = Ia(Error(o(421))), Hu(e, t, c, n)
		}
		return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = x0.bind(null, e), l._reactRetry = t, null) : (e = a.treeContext, lt = Qt(l.nextSibling), ut = t, ke = !0, vt = null, e !== null && (st[ct++] = qt, st[ct++] = Rt, st[ct++] = xr, qt = e.id, Rt = e.overflow, xr = t), t = Ha(t, n.children), t.flags |= 4096, t)
	}

	function Zs(e, t, r) {
		e.lanes |= t;
		var n = e.alternate;
		n !== null && (n.lanes |= t), wa(e.return, t, r)
	}

	function $a(e, t, r, n, l) {
		var a = e.memoizedState;
		a === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: n,
			tail: r,
			tailMode: l
		} : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = n, a.tail = r, a.tailMode = l)
	}

	function Xs(e, t, r) {
		var n = t.pendingProps,
			l = n.revealOrder,
			a = n.tail;
		if (Qe(e, t, n.children, r), n = je.current, (n & 2) !== 0) n = n & 1 | 2, t.flags |= 128;
		else {
			if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && Zs(e, r, t);
				else if (e.tag === 19) Zs(e, r, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue
				}
				if (e === t) break e;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break e;
					e = e.return
				}
				e.sibling.return = e.return, e = e.sibling
			}
			n &= 1
		}
		if (Ae(je, n), (t.mode & 1) === 0) t.memoizedState = null;
		else switch (l) {
			case "forwards":
				for (r = t.child, l = null; r !== null;) e = r.alternate, e !== null && Pu(e) === null && (l = r), r = r.sibling;
				r = l, r === null ? (l = t.child, t.child = null) : (l = r.sibling, r.sibling = null), $a(t, !1, l, r, a);
				break;
			case "backwards":
				for (r = null, l = t.child, t.child = null; l !== null;) {
					if (e = l.alternate, e !== null && Pu(e) === null) {
						t.child = l;
						break
					}
					e = l.sibling, l.sibling = r, r = l, l = e
				}
				$a(t, !0, r, null, a);
				break;
			case "together":
				$a(t, !1, null, null, void 0);
				break;
			default:
				t.memoizedState = null
		}
		return t.child
	}

	function $u(e, t) {
		(t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
	}

	function It(e, t, r) {
		if (e !== null && (t.dependencies = e.dependencies), Ar |= t.lanes, (r & t.childLanes) === 0) return null;
		if (e !== null && t.child !== e.child) throw Error(o(153));
		if (t.child !== null) {
			for (e = t.child, r = lr(e, e.pendingProps), t.child = r, r.return = t; e.sibling !== null;) e = e.sibling, r = r.sibling = lr(e, e.pendingProps), r.return = t;
			r.sibling = null
		}
		return t.child
	}

	function l0(e, t, r) {
		switch (t.tag) {
			case 3:
				Ks(t), Wr();
				break;
			case 5:
				ps(t);
				break;
			case 1:
				Ze(t.type) && ju(t);
				break;
			case 4:
				Ea(t, t.stateNode.containerInfo);
				break;
			case 10:
				var n = t.type._context,
					l = t.memoizedProps.value;
				Ae(Lu, n._currentValue), n._currentValue = l;
				break;
			case 13:
				if (n = t.memoizedState, n !== null) return n.dehydrated !== null ? (Ae(je, je.current & 1), t.flags |= 128, null) : (r & t.child.childLanes) !== 0 ? Js(e, t, r) : (Ae(je, je.current & 1), e = It(e, t, r), e !== null ? e.sibling : null);
				Ae(je, je.current & 1);
				break;
			case 19:
				if (n = (r & t.childLanes) !== 0, (e.flags & 128) !== 0) {
					if (n) return Xs(e, t, r);
					t.flags |= 128
				}
				if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Ae(je, je.current), n) break;
				return null;
			case 22:
			case 23:
				return t.lanes = 0, Gs(e, t, r)
		}
		return It(e, t, r)
	}
	var ec, Ga, tc, rc;
	ec = function(e, t) {
		for (var r = t.child; r !== null;) {
			if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
			else if (r.tag !== 4 && r.child !== null) {
				r.child.return = r, r = r.child;
				continue
			}
			if (r === t) break;
			for (; r.sibling === null;) {
				if (r.return === null || r.return === t) return;
				r = r.return
			}
			r.sibling.return = r.return, r = r.sibling
		}
	}, Ga = function() {}, tc = function(e, t, r, n) {
		var l = e.memoizedProps;
		if (l !== n) {
			e = t.stateNode, Dr(kt.current);
			var a = null;
			switch (r) {
				case "input":
					l = _r(e, l), n = _r(e, n), a = [];
					break;
				case "select":
					l = O({}, l, {
						value: void 0
					}), n = O({}, n, {
						value: void 0
					}), a = [];
					break;
				case "textarea":
					l = El(e, l), n = El(e, n), a = [];
					break;
				default:
					typeof l.onClick != "function" && typeof n.onClick == "function" && (e.onclick = Eu)
			}
			Sl(r, n);
			var c;
			r = null;
			for (S in l)
				if (!n.hasOwnProperty(S) && l.hasOwnProperty(S) && l[S] != null)
					if (S === "style") {
						var p = l[S];
						for (c in p) p.hasOwnProperty(c) && (r || (r = {}), r[c] = "")
					} else S !== "dangerouslySetInnerHTML" && S !== "children" && S !== "suppressContentEditableWarning" && S !== "suppressHydrationWarning" && S !== "autoFocus" && (f.hasOwnProperty(S) ? a || (a = []) : (a = a || []).push(S, null));
			for (S in n) {
				var h = n[S];
				if (p = l != null ? l[S] : void 0, n.hasOwnProperty(S) && h !== p && (h != null || p != null))
					if (S === "style")
						if (p) {
							for (c in p) !p.hasOwnProperty(c) || h && h.hasOwnProperty(c) || (r || (r = {}), r[c] = "");
							for (c in h) h.hasOwnProperty(c) && p[c] !== h[c] && (r || (r = {}), r[c] = h[c])
						} else r || (a || (a = []), a.push(S, r)), r = h;
				else S === "dangerouslySetInnerHTML" ? (h = h ? h.__html : void 0, p = p ? p.__html : void 0, h != null && p !== h && (a = a || []).push(S, h)) : S === "children" ? typeof h != "string" && typeof h != "number" || (a = a || []).push(S, "" + h) : S !== "suppressContentEditableWarning" && S !== "suppressHydrationWarning" && (f.hasOwnProperty(S) ? (h != null && S === "onScroll" && Ce("scroll", e), a || p === h || (a = [])) : (a = a || []).push(S, h))
			}
			r && (a = a || []).push("style", r);
			var S = a;
			(t.updateQueue = S) && (t.flags |= 4)
		}
	}, rc = function(e, t, r, n) {
		r !== n && (t.flags |= 4)
	};

	function On(e, t) {
		if (!ke) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var r = null; t !== null;) t.alternate !== null && (r = t), t = t.sibling;
				r === null ? e.tail = null : r.sibling = null;
				break;
			case "collapsed":
				r = e.tail;
				for (var n = null; r !== null;) r.alternate !== null && (n = r), r = r.sibling;
				n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null
		}
	}

	function Ge(e) {
		var t = e.alternate !== null && e.alternate.child === e.child,
			r = 0,
			n = 0;
		if (t)
			for (var l = e.child; l !== null;) r |= l.lanes | l.childLanes, n |= l.subtreeFlags & 14680064, n |= l.flags & 14680064, l.return = e, l = l.sibling;
		else
			for (l = e.child; l !== null;) r |= l.lanes | l.childLanes, n |= l.subtreeFlags, n |= l.flags, l.return = e, l = l.sibling;
		return e.subtreeFlags |= n, e.childLanes = r, t
	}

	function a0(e, t, r) {
		var n = t.pendingProps;
		switch (ma(t), t.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14:
				return Ge(t), null;
			case 1:
				return Ze(t.type) && Su(), Ge(t), null;
			case 3:
				return n = t.stateNode, Jr(), Ee(Je), Ee(He), ja(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (_u(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, vt !== null && (ni(vt), vt = null))), Ga(e, t), Ge(t), null;
			case 5:
				ka(t);
				var l = Dr(Tn.current);
				if (r = t.type, e !== null && t.stateNode != null) tc(e, t, r, n, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
				else {
					if (!n) {
						if (t.stateNode === null) throw Error(o(166));
						return Ge(t), null
					}
					if (e = Dr(kt.current), _u(t)) {
						n = t.stateNode, r = t.type;
						var a = t.memoizedProps;
						switch (n[Et] = t, n[_n] = a, e = (t.mode & 1) !== 0, r) {
							case "dialog":
								Ce("cancel", n), Ce("close", n);
								break;
							case "iframe":
							case "object":
							case "embed":
								Ce("load", n);
								break;
							case "video":
							case "audio":
								for (l = 0; l < Bn.length; l++) Ce(Bn[l], n);
								break;
							case "source":
								Ce("error", n);
								break;
							case "img":
							case "image":
							case "link":
								Ce("error", n), Ce("load", n);
								break;
							case "details":
								Ce("toggle", n);
								break;
							case "input":
								fr(n, a), Ce("invalid", n);
								break;
							case "select":
								n._wrapperState = {
									wasMultiple: !!a.multiple
								}, Ce("invalid", n);
								break;
							case "textarea":
								Ii(n, a), Ce("invalid", n)
						}
						Sl(r, a), l = null;
						for (var c in a)
							if (a.hasOwnProperty(c)) {
								var p = a[c];
								c === "children" ? typeof p == "string" ? n.textContent !== p && (a.suppressHydrationWarning !== !0 && Cu(n.textContent, p, e), l = ["children", p]) : typeof p == "number" && n.textContent !== "" + p && (a.suppressHydrationWarning !== !0 && Cu(n.textContent, p, e), l = ["children", "" + p]) : f.hasOwnProperty(c) && p != null && c === "onScroll" && Ce("scroll", n)
							} switch (r) {
							case "input":
								ht(n), Pi(n, a, !0);
								break;
							case "textarea":
								ht(n), Mi(n);
								break;
							case "select":
							case "option":
								break;
							default:
								typeof a.onClick == "function" && (n.onclick = Eu)
						}
						n = l, t.updateQueue = n, n !== null && (t.flags |= 4)
					} else {
						c = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Oi(r)), e === "http://www.w3.org/1999/xhtml" ? r === "script" ? (e = c.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof n.is == "string" ? e = c.createElement(r, {
							is: n.is
						}) : (e = c.createElement(r), r === "select" && (c = e, n.multiple ? c.multiple = !0 : n.size && (c.size = n.size))) : e = c.createElementNS(e, r), e[Et] = t, e[_n] = n, ec(e, t, !1, !1), t.stateNode = e;
						e: {
							switch (c = jl(r, n), r) {
								case "dialog":
									Ce("cancel", e), Ce("close", e), l = n;
									break;
								case "iframe":
								case "object":
								case "embed":
									Ce("load", e), l = n;
									break;
								case "video":
								case "audio":
									for (l = 0; l < Bn.length; l++) Ce(Bn[l], e);
									l = n;
									break;
								case "source":
									Ce("error", e), l = n;
									break;
								case "img":
								case "image":
								case "link":
									Ce("error", e), Ce("load", e), l = n;
									break;
								case "details":
									Ce("toggle", e), l = n;
									break;
								case "input":
									fr(e, n), l = _r(e, n), Ce("invalid", e);
									break;
								case "option":
									l = n;
									break;
								case "select":
									e._wrapperState = {
										wasMultiple: !!n.multiple
									}, l = O({}, n, {
										value: void 0
									}), Ce("invalid", e);
									break;
								case "textarea":
									Ii(e, n), l = El(e, n), Ce("invalid", e);
									break;
								default:
									l = n
							}
							Sl(r, l),
							p = l;
							for (a in p)
								if (p.hasOwnProperty(a)) {
									var h = p[a];
									a === "style" ? Hi(e, h) : a === "dangerouslySetInnerHTML" ? (h = h ? h.__html : void 0, h != null && Ui(e, h)) : a === "children" ? typeof h == "string" ? (r !== "textarea" || h !== "") && sn(e, h) : typeof h == "number" && sn(e, "" + h) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (f.hasOwnProperty(a) ? h != null && a === "onScroll" && Ce("scroll", e) : h != null && W(e, a, h, c))
								} switch (r) {
								case "input":
									ht(e), Pi(e, n, !1);
									break;
								case "textarea":
									ht(e), Mi(e);
									break;
								case "option":
									n.value != null && e.setAttribute("value", "" + ie(n.value));
									break;
								case "select":
									e.multiple = !!n.multiple, a = n.value, a != null ? br(e, !!n.multiple, a, !1) : n.defaultValue != null && br(e, !!n.multiple, n.defaultValue, !0);
									break;
								default:
									typeof l.onClick == "function" && (e.onclick = Eu)
							}
							switch (r) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									n = !!n.autoFocus;
									break e;
								case "img":
									n = !0;
									break e;
								default:
									n = !1
							}
						}
						n && (t.flags |= 4)
					}
					t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
				}
				return Ge(t), null;
			case 6:
				if (e && t.stateNode != null) rc(e, t, e.memoizedProps, n);
				else {
					if (typeof n != "string" && t.stateNode === null) throw Error(o(166));
					if (r = Dr(Tn.current), Dr(kt.current), _u(t)) {
						if (n = t.stateNode, r = t.memoizedProps, n[Et] = t, (a = n.nodeValue !== r) && (e = ut, e !== null)) switch (e.tag) {
							case 3:
								Cu(n.nodeValue, r, (e.mode & 1) !== 0);
								break;
							case 5:
								e.memoizedProps.suppressHydrationWarning !== !0 && Cu(n.nodeValue, r, (e.mode & 1) !== 0)
						}
						a && (t.flags |= 4)
					} else n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n), n[Et] = t, t.stateNode = n
				}
				return Ge(t), null;
			case 13:
				if (Ee(je), n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (ke && lt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) ls(), Wr(), t.flags |= 98560, a = !1;
					else if (a = _u(t), n !== null && n.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(o(318));
							if (a = t.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(o(317));
							a[Et] = t
						} else Wr(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
						Ge(t), a = !1
					} else vt !== null && (ni(vt), vt = null), a = !0;
					if (!a) return t.flags & 65536 ? t : null
				}
				return (t.flags & 128) !== 0 ? (t.lanes = r, t) : (n = n !== null, n !== (e !== null && e.memoizedState !== null) && n && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (je.current & 1) !== 0 ? Te === 0 && (Te = 3) : ai())), t.updateQueue !== null && (t.flags |= 4), Ge(t), null);
			case 4:
				return Jr(), Ga(e, t), e === null && Fn(t.stateNode.containerInfo), Ge(t), null;
			case 10:
				return Da(t.type._context), Ge(t), null;
			case 17:
				return Ze(t.type) && Su(), Ge(t), null;
			case 19:
				if (Ee(je), a = t.memoizedState, a === null) return Ge(t), null;
				if (n = (t.flags & 128) !== 0, c = a.rendering, c === null)
					if (n) On(a, !1);
					else {
						if (Te !== 0 || e !== null && (e.flags & 128) !== 0)
							for (e = t.child; e !== null;) {
								if (c = Pu(e), c !== null) {
									for (t.flags |= 128, On(a, !1), n = c.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), t.subtreeFlags = 0, n = r, r = t.child; r !== null;) a = r, e = n, a.flags &= 14680066, c = a.alternate, c === null ? (a.childLanes = 0, a.lanes = e, a.child = null, a.subtreeFlags = 0, a.memoizedProps = null, a.memoizedState = null, a.updateQueue = null, a.dependencies = null, a.stateNode = null) : (a.childLanes = c.childLanes, a.lanes = c.lanes, a.child = c.child, a.subtreeFlags = 0, a.deletions = null, a.memoizedProps = c.memoizedProps, a.memoizedState = c.memoizedState, a.updateQueue = c.updateQueue, a.type = c.type, e = c.dependencies, a.dependencies = e === null ? null : {
										lanes: e.lanes,
										firstContext: e.firstContext
									}), r = r.sibling;
									return Ae(je, je.current & 1 | 2), t.child
								}
								e = e.sibling
							}
						a.tail !== null && be() > tn && (t.flags |= 128, n = !0, On(a, !1), t.lanes = 4194304)
					}
				else {
					if (!n)
						if (e = Pu(c), e !== null) {
							if (t.flags |= 128, n = !0, r = e.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), On(a, !0), a.tail === null && a.tailMode === "hidden" && !c.alternate && !ke) return Ge(t), null
						} else 2 * be() - a.renderingStartTime > tn && r !== 1073741824 && (t.flags |= 128, n = !0, On(a, !1), t.lanes = 4194304);
					a.isBackwards ? (c.sibling = t.child, t.child = c) : (r = a.last, r !== null ? r.sibling = c : t.child = c, a.last = c)
				}
				return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = be(), t.sibling = null, r = je.current, Ae(je, n ? r & 1 | 2 : r & 1), t) : (Ge(t), null);
			case 22:
			case 23:
				return li(), n = t.memoizedState !== null, e !== null && e.memoizedState !== null !== n && (t.flags |= 8192), n && (t.mode & 1) !== 0 ? (at & 1073741824) !== 0 && (Ge(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ge(t), null;
			case 24:
				return null;
			case 25:
				return null
		}
		throw Error(o(156, t.tag))
	}

	function i0(e, t) {
		switch (ma(t), t.tag) {
			case 1:
				return Ze(t.type) && Su(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3:
				return Jr(), Ee(Je), Ee(He), ja(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
			case 5:
				return ka(t), null;
			case 13:
				if (Ee(je), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(o(340));
					Wr()
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19:
				return Ee(je), null;
			case 4:
				return Jr(), null;
			case 10:
				return Da(t.type._context), null;
			case 22:
			case 23:
				return li(), null;
			case 24:
				return null;
			default:
				return null
		}
	}
	var Gu = !1,
		We = !1,
		o0 = typeof WeakSet == "function" ? WeakSet : Set,
		X = null;

	function Xr(e, t) {
		var r = e.ref;
		if (r !== null)
			if (typeof r == "function") try {
				r(null)
			} catch (n) {
				Ne(e, t, n)
			} else r.current = null
	}

	function Wa(e, t, r) {
		try {
			r()
		} catch (n) {
			Ne(e, t, n)
		}
	}
	var nc = !1;

	function s0(e, t) {
		if (la = fu, e = Ro(), Jl(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else e: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var n = r.getSelection && r.getSelection();
				if (n && n.rangeCount !== 0) {
					r = n.anchorNode;
					var l = n.anchorOffset,
						a = n.focusNode;
					n = n.focusOffset;
					try {
						r.nodeType, a.nodeType
					} catch {
						r = null;
						break e
					}
					var c = 0,
						p = -1,
						h = -1,
						S = 0,
						T = 0,
						M = e,
						R = null;
					t: for (;;) {
						for (var Y; M !== r || l !== 0 && M.nodeType !== 3 || (p = c + l), M !== a || n !== 0 && M.nodeType !== 3 || (h = c + n), M.nodeType === 3 && (c += M.nodeValue.length), (Y = M.firstChild) !== null;) R = M, M = Y;
						for (;;) {
							if (M === e) break t;
							if (R === r && ++S === l && (p = c), R === a && ++T === n && (h = c), (Y = M.nextSibling) !== null) break;
							M = R, R = M.parentNode
						}
						M = Y
					}
					r = p === -1 || h === -1 ? null : {
						start: p,
						end: h
					}
				} else r = null
			}
			r = r || {
				start: 0,
				end: 0
			}
		} else r = null;
		for (aa = {
				focusedElem: e,
				selectionRange: r
			}, fu = !1, X = t; X !== null;)
			if (t = X, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, X = e;
			else
				for (; X !== null;) {
					t = X;
					try {
						var ee = t.alternate;
						if ((t.flags & 1024) !== 0) switch (t.tag) {
							case 0:
							case 11:
							case 15:
								break;
							case 1:
								if (ee !== null) {
									var te = ee.memoizedProps,
										Le = ee.memoizedState,
										C = t.stateNode,
										v = C.getSnapshotBeforeUpdate(t.elementType === t.type ? te : yt(t.type, te), Le);
									C.__reactInternalSnapshotBeforeUpdate = v
								}
								break;
							case 3:
								var E = t.stateNode.containerInfo;
								E.nodeType === 1 ? E.textContent = "" : E.nodeType === 9 && E.documentElement && E.removeChild(E.documentElement);
								break;
							case 5:
							case 6:
							case 4:
							case 17:
								break;
							default:
								throw Error(o(163))
						}
					} catch (U) {
						Ne(t, t.return, U)
					}
					if (e = t.sibling, e !== null) {
						e.return = t.return, X = e;
						break
					}
					X = t.return
				}
		return ee = nc, nc = !1, ee
	}

	function Un(e, t, r) {
		var n = t.updateQueue;
		if (n = n !== null ? n.lastEffect : null, n !== null) {
			var l = n = n.next;
			do {
				if ((l.tag & e) === e) {
					var a = l.destroy;
					l.destroy = void 0, a !== void 0 && Wa(t, r, a)
				}
				l = l.next
			} while (l !== n)
		}
	}

	function Wu(e, t) {
		if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
			var r = t = t.next;
			do {
				if ((r.tag & e) === e) {
					var n = r.create;
					r.destroy = n()
				}
				r = r.next
			} while (r !== t)
		}
	}

	function Qa(e) {
		var t = e.ref;
		if (t !== null) {
			var r = e.stateNode;
			switch (e.tag) {
				case 5:
					e = r;
					break;
				default:
					e = r
			}
			typeof t == "function" ? t(e) : t.current = e
		}
	}

	function uc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, uc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Et], delete t[_n], delete t[ca], delete t[$d], delete t[Gd])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
	}

	function lc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 4
	}

	function ac(e) {
		e: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || lc(e.return)) return null;
				e = e.return
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
				e.child.return = e, e = e.child
			}
			if (!(e.flags & 2)) return e.stateNode
		}
	}

	function Ka(e, t, r) {
		var n = e.tag;
		if (n === 5 || n === 6) e = e.stateNode, t ? r.nodeType === 8 ? r.parentNode.insertBefore(e, t) : r.insertBefore(e, t) : (r.nodeType === 8 ? (t = r.parentNode, t.insertBefore(e, r)) : (t = r, t.appendChild(e)), r = r._reactRootContainer, r != null || t.onclick !== null || (t.onclick = Eu));
		else if (n !== 4 && (e = e.child, e !== null))
			for (Ka(e, t, r), e = e.sibling; e !== null;) Ka(e, t, r), e = e.sibling
	}

	function Ya(e, t, r) {
		var n = e.tag;
		if (n === 5 || n === 6) e = e.stateNode, t ? r.insertBefore(e, t) : r.appendChild(e);
		else if (n !== 4 && (e = e.child, e !== null))
			for (Ya(e, t, r), e = e.sibling; e !== null;) Ya(e, t, r), e = e.sibling
	}
	var Ue = null,
		Dt = !1;

	function er(e, t, r) {
		for (r = r.child; r !== null;) ic(e, t, r), r = r.sibling
	}

	function ic(e, t, r) {
		if (Ct && typeof Ct.onCommitFiberUnmount == "function") try {
			Ct.onCommitFiberUnmount(au, r)
		} catch {}
		switch (r.tag) {
			case 5:
				We || Xr(r, t);
			case 6:
				var n = Ue,
					l = Dt;
				Ue = null, er(e, t, r), Ue = n, Dt = l, Ue !== null && (Dt ? (e = Ue, r = r.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r)) : Ue.removeChild(r.stateNode));
				break;
			case 18:
				Ue !== null && (Dt ? (e = Ue, r = r.stateNode, e.nodeType === 8 ? sa(e.parentNode, r) : e.nodeType === 1 && sa(e, r), Dn(e)) : sa(Ue, r.stateNode));
				break;
			case 4:
				n = Ue, l = Dt, Ue = r.stateNode.containerInfo, Dt = !0, er(e, t, r), Ue = n, Dt = l;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!We && (n = r.updateQueue, n !== null && (n = n.lastEffect, n !== null))) {
					l = n = n.next;
					do {
						var a = l,
							c = a.destroy;
						a = a.tag, c !== void 0 && ((a & 2) !== 0 || (a & 4) !== 0) && Wa(r, t, c), l = l.next
					} while (l !== n)
				}
				er(e, t, r);
				break;
			case 1:
				if (!We && (Xr(r, t), n = r.stateNode, typeof n.componentWillUnmount == "function")) try {
					n.props = r.memoizedProps, n.state = r.memoizedState, n.componentWillUnmount()
				} catch (p) {
					Ne(r, t, p)
				}
				er(e, t, r);
				break;
			case 21:
				er(e, t, r);
				break;
			case 22:
				r.mode & 1 ? (We = (n = We) || r.memoizedState !== null, er(e, t, r), We = n) : er(e, t, r);
				break;
			default:
				er(e, t, r)
		}
	}

	function oc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			e.updateQueue = null;
			var r = e.stateNode;
			r === null && (r = e.stateNode = new o0), t.forEach(function(n) {
				var l = v0.bind(null, e, n);
				r.has(n) || (r.add(n), n.then(l, l))
			})
		}
	}

	function wt(e, t) {
		var r = t.deletions;
		if (r !== null)
			for (var n = 0; n < r.length; n++) {
				var l = r[n];
				try {
					var a = e,
						c = t,
						p = c;
					e: for (; p !== null;) {
						switch (p.tag) {
							case 5:
								Ue = p.stateNode, Dt = !1;
								break e;
							case 3:
								Ue = p.stateNode.containerInfo, Dt = !0;
								break e;
							case 4:
								Ue = p.stateNode.containerInfo, Dt = !0;
								break e
						}
						p = p.return
					}
					if (Ue === null) throw Error(o(160));
					ic(a, c, l), Ue = null, Dt = !1;
					var h = l.alternate;
					h !== null && (h.return = null), l.return = null
				} catch (S) {
					Ne(l, t, S)
				}
			}
		if (t.subtreeFlags & 12854)
			for (t = t.child; t !== null;) sc(t, e), t = t.sibling
	}

	function sc(e, t) {
		var r = e.alternate,
			n = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (wt(t, e), jt(e), n & 4) {
					try {
						Un(3, e, e.return), Wu(3, e)
					} catch (te) {
						Ne(e, e.return, te)
					}
					try {
						Un(5, e, e.return)
					} catch (te) {
						Ne(e, e.return, te)
					}
				}
				break;
			case 1:
				wt(t, e), jt(e), n & 512 && r !== null && Xr(r, r.return);
				break;
			case 5:
				if (wt(t, e), jt(e), n & 512 && r !== null && Xr(r, r.return), e.flags & 32) {
					var l = e.stateNode;
					try {
						sn(l, "")
					} catch (te) {
						Ne(e, e.return, te)
					}
				}
				if (n & 4 && (l = e.stateNode, l != null)) {
					var a = e.memoizedProps,
						c = r !== null ? r.memoizedProps : a,
						p = e.type,
						h = e.updateQueue;
					if (e.updateQueue = null, h !== null) try {
						p === "input" && a.type === "radio" && a.name != null && pr(l, a), jl(p, c);
						var S = jl(p, a);
						for (c = 0; c < h.length; c += 2) {
							var T = h[c],
								M = h[c + 1];
							T === "style" ? Hi(l, M) : T === "dangerouslySetInnerHTML" ? Ui(l, M) : T === "children" ? sn(l, M) : W(l, T, M, S)
						}
						switch (p) {
							case "input":
								Al(l, a);
								break;
							case "textarea":
								zi(l, a);
								break;
							case "select":
								var R = l._wrapperState.wasMultiple;
								l._wrapperState.wasMultiple = !!a.multiple;
								var Y = a.value;
								Y != null ? br(l, !!a.multiple, Y, !1) : R !== !!a.multiple && (a.defaultValue != null ? br(l, !!a.multiple, a.defaultValue, !0) : br(l, !!a.multiple, a.multiple ? [] : "", !1))
						}
						l[_n] = a
					} catch (te) {
						Ne(e, e.return, te)
					}
				}
				break;
			case 6:
				if (wt(t, e), jt(e), n & 4) {
					if (e.stateNode === null) throw Error(o(162));
					l = e.stateNode, a = e.memoizedProps;
					try {
						l.nodeValue = a
					} catch (te) {
						Ne(e, e.return, te)
					}
				}
				break;
			case 3:
				if (wt(t, e), jt(e), n & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Dn(t.containerInfo)
				} catch (te) {
					Ne(e, e.return, te)
				}
				break;
			case 4:
				wt(t, e), jt(e);
				break;
			case 13:
				wt(t, e), jt(e), l = e.child, l.flags & 8192 && (a = l.memoizedState !== null, l.stateNode.isHidden = a, !a || l.alternate !== null && l.alternate.memoizedState !== null || (Xa = be())), n & 4 && oc(e);
				break;
			case 22:
				if (T = r !== null && r.memoizedState !== null, e.mode & 1 ? (We = (S = We) || T, wt(t, e), We = S) : wt(t, e), jt(e), n & 8192) {
					if (S = e.memoizedState !== null, (e.stateNode.isHidden = S) && !T && (e.mode & 1) !== 0)
						for (X = e, T = e.child; T !== null;) {
							for (M = X = T; X !== null;) {
								switch (R = X, Y = R.child, R.tag) {
									case 0:
									case 11:
									case 14:
									case 15:
										Un(4, R, R.return);
										break;
									case 1:
										Xr(R, R.return);
										var ee = R.stateNode;
										if (typeof ee.componentWillUnmount == "function") {
											n = R, r = R.return;
											try {
												t = n, ee.props = t.memoizedProps, ee.state = t.memoizedState, ee.componentWillUnmount()
											} catch (te) {
												Ne(n, r, te)
											}
										}
										break;
									case 5:
										Xr(R, R.return);
										break;
									case 22:
										if (R.memoizedState !== null) {
											fc(M);
											continue
										}
								}
								Y !== null ? (Y.return = R, X = Y) : fc(M)
							}
							T = T.sibling
						}
					e: for (T = null, M = e;;) {
						if (M.tag === 5) {
							if (T === null) {
								T = M;
								try {
									l = M.stateNode, S ? (a = l.style, typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none") : (p = M.stateNode, h = M.memoizedProps.style, c = h != null && h.hasOwnProperty("display") ? h.display : null, p.style.display = Vi("display", c))
								} catch (te) {
									Ne(e, e.return, te)
								}
							}
						} else if (M.tag === 6) {
							if (T === null) try {
								M.stateNode.nodeValue = S ? "" : M.memoizedProps
							} catch (te) {
								Ne(e, e.return, te)
							}
						} else if ((M.tag !== 22 && M.tag !== 23 || M.memoizedState === null || M === e) && M.child !== null) {
							M.child.return = M, M = M.child;
							continue
						}
						if (M === e) break e;
						for (; M.sibling === null;) {
							if (M.return === null || M.return === e) break e;
							T === M && (T = null), M = M.return
						}
						T === M && (T = null), M.sibling.return = M.return, M = M.sibling
					}
				}
				break;
			case 19:
				wt(t, e), jt(e), n & 4 && oc(e);
				break;
			case 21:
				break;
			default:
				wt(t, e), jt(e)
		}
	}

	function jt(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				e: {
					for (var r = e.return; r !== null;) {
						if (lc(r)) {
							var n = r;
							break e
						}
						r = r.return
					}
					throw Error(o(160))
				}
				switch (n.tag) {
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (sn(l, ""), n.flags &= -33);
						var a = ac(e);
						Ya(e, a, l);
						break;
					case 3:
					case 4:
						var c = n.stateNode.containerInfo,
							p = ac(e);
						Ka(e, p, c);
						break;
					default:
						throw Error(o(161))
				}
			}
			catch (h) {
				Ne(e, e.return, h)
			}
			e.flags &= -3
		}
		t & 4096 && (e.flags &= -4097)
	}

	function c0(e, t, r) {
		X = e, cc(e)
	}

	function cc(e, t, r) {
		for (var n = (e.mode & 1) !== 0; X !== null;) {
			var l = X,
				a = l.child;
			if (l.tag === 22 && n) {
				var c = l.memoizedState !== null || Gu;
				if (!c) {
					var p = l.alternate,
						h = p !== null && p.memoizedState !== null || We;
					p = Gu;
					var S = We;
					if (Gu = c, (We = h) && !S)
						for (X = l; X !== null;) c = X, h = c.child, c.tag === 22 && c.memoizedState !== null ? pc(l) : h !== null ? (h.return = c, X = h) : pc(l);
					for (; a !== null;) X = a, cc(a), a = a.sibling;
					X = l, Gu = p, We = S
				}
				dc(e)
			} else(l.subtreeFlags & 8772) !== 0 && a !== null ? (a.return = l, X = a) : dc(e)
		}
	}

	function dc(e) {
		for (; X !== null;) {
			var t = X;
			if ((t.flags & 8772) !== 0) {
				var r = t.alternate;
				try {
					if ((t.flags & 8772) !== 0) switch (t.tag) {
						case 0:
						case 11:
						case 15:
							We || Wu(5, t);
							break;
						case 1:
							var n = t.stateNode;
							if (t.flags & 4 && !We)
								if (r === null) n.componentDidMount();
								else {
									var l = t.elementType === t.type ? r.memoizedProps : yt(t.type, r.memoizedProps);
									n.componentDidUpdate(l, r.memoizedState, n.__reactInternalSnapshotBeforeUpdate)
								} var a = t.updateQueue;
							a !== null && fs(t, a, n);
							break;
						case 3:
							var c = t.updateQueue;
							if (c !== null) {
								if (r = null, t.child !== null) switch (t.child.tag) {
									case 5:
										r = t.child.stateNode;
										break;
									case 1:
										r = t.child.stateNode
								}
								fs(t, c, r)
							}
							break;
						case 5:
							var p = t.stateNode;
							if (r === null && t.flags & 4) {
								r = p;
								var h = t.memoizedProps;
								switch (t.type) {
									case "button":
									case "input":
									case "select":
									case "textarea":
										h.autoFocus && r.focus();
										break;
									case "img":
										h.src && (r.src = h.src)
								}
							}
							break;
						case 6:
							break;
						case 4:
							break;
						case 12:
							break;
						case 13:
							if (t.memoizedState === null) {
								var S = t.alternate;
								if (S !== null) {
									var T = S.memoizedState;
									if (T !== null) {
										var M = T.dehydrated;
										M !== null && Dn(M)
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25:
							break;
						default:
							throw Error(o(163))
					}
					We || t.flags & 512 && Qa(t)
				} catch (R) {
					Ne(t, t.return, R)
				}
			}
			if (t === e) {
				X = null;
				break
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, X = r;
				break
			}
			X = t.return
		}
	}

	function fc(e) {
		for (; X !== null;) {
			var t = X;
			if (t === e) {
				X = null;
				break
			}
			var r = t.sibling;
			if (r !== null) {
				r.return = t.return, X = r;
				break
			}
			X = t.return
		}
	}

	function pc(e) {
		for (; X !== null;) {
			var t = X;
			try {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						var r = t.return;
						try {
							Wu(4, t)
						} catch (h) {
							Ne(t, r, h)
						}
						break;
					case 1:
						var n = t.stateNode;
						if (typeof n.componentDidMount == "function") {
							var l = t.return;
							try {
								n.componentDidMount()
							} catch (h) {
								Ne(t, l, h)
							}
						}
						var a = t.return;
						try {
							Qa(t)
						} catch (h) {
							Ne(t, a, h)
						}
						break;
					case 5:
						var c = t.return;
						try {
							Qa(t)
						} catch (h) {
							Ne(t, c, h)
						}
				}
			} catch (h) {
				Ne(t, t.return, h)
			}
			if (t === e) {
				X = null;
				break
			}
			var p = t.sibling;
			if (p !== null) {
				p.return = t.return, X = p;
				break
			}
			X = t.return
		}
	}
	var d0 = Math.ceil,
		Qu = V.ReactCurrentDispatcher,
		Ja = V.ReactCurrentOwner,
		pt = V.ReactCurrentBatchConfig,
		me = 0,
		Me = null,
		qe = null,
		Ve = 0,
		at = 0,
		en = Kt(0),
		Te = 0,
		Vn = null,
		Ar = 0,
		Ku = 0,
		Za = 0,
		Hn = null,
		et = null,
		Xa = 0,
		tn = 1 / 0,
		zt = null,
		Yu = !1,
		ei = null,
		tr = null,
		Ju = !1,
		rr = null,
		Zu = 0,
		$n = 0,
		ti = null,
		Xu = -1,
		el = 0;

	function Ke() {
		return (me & 6) !== 0 ? be() : Xu !== -1 ? Xu : Xu = be()
	}

	function nr(e) {
		return (e.mode & 1) === 0 ? 1 : (me & 2) !== 0 && Ve !== 0 ? Ve & -Ve : Qd.transition !== null ? (el === 0 && (el = lo()), el) : (e = ye, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ho(e.type)), e)
	}

	function At(e, t, r, n) {
		if (50 < $n) throw $n = 0, ti = null, Error(o(185));
		hn(e, r, n), ((me & 2) === 0 || e !== Me) && (e === Me && ((me & 2) === 0 && (Ku |= r), Te === 4 && ur(e, Ve)), tt(e, n), r === 1 && me === 0 && (t.mode & 1) === 0 && (tn = be() + 500, Bu && Jt()))
	}

	function tt(e, t) {
		var r = e.callbackNode;
		Q2(e, t);
		var n = su(e, e === Me ? Ve : 0);
		if (n === 0) r !== null && ro(r), e.callbackNode = null, e.callbackPriority = 0;
		else if (t = n & -n, e.callbackPriority !== t) {
			if (r != null && ro(r), t === 1) e.tag === 0 ? Wd(hc.bind(null, e)) : es(hc.bind(null, e)), Vd(function() {
				(me & 6) === 0 && Jt()
			}), r = null;
			else {
				switch (ao(n)) {
					case 1:
						r = ql;
						break;
					case 4:
						r = no;
						break;
					case 16:
						r = lu;
						break;
					case 536870912:
						r = uo;
						break;
					default:
						r = lu
				}
				r = Cc(r, mc.bind(null, e))
			}
			e.callbackPriority = t, e.callbackNode = r
		}
	}

	function mc(e, t) {
		if (Xu = -1, el = 0, (me & 6) !== 0) throw Error(o(327));
		var r = e.callbackNode;
		if (rn() && e.callbackNode !== r) return null;
		var n = su(e, e === Me ? Ve : 0);
		if (n === 0) return null;
		if ((n & 30) !== 0 || (n & e.expiredLanes) !== 0 || t) t = tl(e, n);
		else {
			t = n;
			var l = me;
			me |= 2;
			var a = xc();
			(Me !== e || Ve !== t) && (zt = null, tn = be() + 500, Er(e, t));
			do try {
				m0();
				break
			} catch (p) {
				gc(e, p)
			}
			while (!0);
			ya(), Qu.current = a, me = l, qe !== null ? t = 0 : (Me = null, Ve = 0, t = Te)
		}
		if (t !== 0) {
			if (t === 2 && (l = Rl(e), l !== 0 && (n = l, t = ri(e, l))), t === 1) throw r = Vn, Er(e, 0), ur(e, n), tt(e, be()), r;
			if (t === 6) ur(e, n);
			else {
				if (l = e.current.alternate, (n & 30) === 0 && !f0(l) && (t = tl(e, n), t === 2 && (a = Rl(e), a !== 0 && (n = a, t = ri(e, a))), t === 1)) throw r = Vn, Er(e, 0), ur(e, n), tt(e, be()), r;
				switch (e.finishedWork = l, e.finishedLanes = n, t) {
					case 0:
					case 1:
						throw Error(o(345));
					case 2:
						kr(e, et, zt);
						break;
					case 3:
						if (ur(e, n), (n & 130023424) === n && (t = Xa + 500 - be(), 10 < t)) {
							if (su(e, 0) !== 0) break;
							if (l = e.suspendedLanes, (l & n) !== n) {
								Ke(), e.pingedLanes |= e.suspendedLanes & l;
								break
							}
							e.timeoutHandle = oa(kr.bind(null, e, et, zt), t);
							break
						}
						kr(e, et, zt);
						break;
					case 4:
						if (ur(e, n), (n & 4194240) === n) break;
						for (t = e.eventTimes, l = -1; 0 < n;) {
							var c = 31 - gt(n);
							a = 1 << c, c = t[c], c > l && (l = c), n &= ~a
						}
						if (n = l, n = be() - n, n = (120 > n ? 120 : 480 > n ? 480 : 1080 > n ? 1080 : 1920 > n ? 1920 : 3e3 > n ? 3e3 : 4320 > n ? 4320 : 1960 * d0(n / 1960)) - n, 10 < n) {
							e.timeoutHandle = oa(kr.bind(null, e, et, zt), n);
							break
						}
						kr(e, et, zt);
						break;
					case 5:
						kr(e, et, zt);
						break;
					default:
						throw Error(o(329))
				}
			}
		}
		return tt(e, be()), e.callbackNode === r ? mc.bind(null, e) : null
	}

	function ri(e, t) {
		var r = Hn;
		return e.current.memoizedState.isDehydrated && (Er(e, t).flags |= 256), e = tl(e, t), e !== 2 && (t = et, et = r, t !== null && ni(t)), e
	}

	function ni(e) {
		et === null ? et = e : et.push.apply(et, e)
	}

	function f0(e) {
		for (var t = e;;) {
			if (t.flags & 16384) {
				var r = t.updateQueue;
				if (r !== null && (r = r.stores, r !== null))
					for (var n = 0; n < r.length; n++) {
						var l = r[n],
							a = l.getSnapshot;
						l = l.value;
						try {
							if (!xt(a(), l)) return !1
						} catch {
							return !1
						}
					}
			}
			if (r = t.child, t.subtreeFlags & 16384 && r !== null) r.return = t, t = r;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return
				}
				t.sibling.return = t.return, t = t.sibling
			}
		}
		return !0
	}

	function ur(e, t) {
		for (t &= ~Za, t &= ~Ku, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
			var r = 31 - gt(t),
				n = 1 << r;
			e[r] = -1, t &= ~n
		}
	}

	function hc(e) {
		if ((me & 6) !== 0) throw Error(o(327));
		rn();
		var t = su(e, 0);
		if ((t & 1) === 0) return tt(e, be()), null;
		var r = tl(e, t);
		if (e.tag !== 0 && r === 2) {
			var n = Rl(e);
			n !== 0 && (t = n, r = ri(e, n))
		}
		if (r === 1) throw r = Vn, Er(e, 0), ur(e, t), tt(e, be()), r;
		if (r === 6) throw Error(o(345));
		return e.finishedWork = e.current.alternate, e.finishedLanes = t, kr(e, et, zt), tt(e, be()), null
	}

	function ui(e, t) {
		var r = me;
		me |= 1;
		try {
			return e(t)
		} finally {
			me = r, me === 0 && (tn = be() + 500, Bu && Jt())
		}
	}

	function Cr(e) {
		rr !== null && rr.tag === 0 && (me & 6) === 0 && rn();
		var t = me;
		me |= 1;
		var r = pt.transition,
			n = ye;
		try {
			if (pt.transition = null, ye = 1, e) return e()
		} finally {
			ye = n, pt.transition = r, me = t, (me & 6) === 0 && Jt()
		}
	}

	function li() {
		at = en.current, Ee(en)
	}

	function Er(e, t) {
		e.finishedWork = null, e.finishedLanes = 0;
		var r = e.timeoutHandle;
		if (r !== -1 && (e.timeoutHandle = -1, Ud(r)), qe !== null)
			for (r = qe.return; r !== null;) {
				var n = r;
				switch (ma(n), n.tag) {
					case 1:
						n = n.type.childContextTypes, n != null && Su();
						break;
					case 3:
						Jr(), Ee(Je), Ee(He), ja();
						break;
					case 5:
						ka(n);
						break;
					case 4:
						Jr();
						break;
					case 13:
						Ee(je);
						break;
					case 19:
						Ee(je);
						break;
					case 10:
						Da(n.type._context);
						break;
					case 22:
					case 23:
						li()
				}
				r = r.return
			}
		if (Me = e, qe = e = lr(e.current, null), Ve = at = t, Te = 0, Vn = null, Za = Ku = Ar = 0, et = Hn = null, yr !== null) {
			for (t = 0; t < yr.length; t++)
				if (r = yr[t], n = r.interleaved, n !== null) {
					r.interleaved = null;
					var l = n.next,
						a = r.pending;
					if (a !== null) {
						var c = a.next;
						a.next = l, n.next = c
					}
					r.pending = n
				} yr = null
		}
		return e
	}

	function gc(e, t) {
		do {
			var r = qe;
			try {
				if (ya(), Iu.current = Uu, zu) {
					for (var n = Be.memoizedState; n !== null;) {
						var l = n.queue;
						l !== null && (l.pending = null), n = n.next
					}
					zu = !1
				}
				if (wr = 0, ze = Re = Be = null, Pn = !1, In = 0, Ja.current = null, r === null || r.return === null) {
					Te = 1, Vn = t, qe = null;
					break
				}
				e: {
					var a = e,
						c = r.return,
						p = r,
						h = t;
					if (t = Ve, p.flags |= 32768, h !== null && typeof h == "object" && typeof h.then == "function") {
						var S = h,
							T = p,
							M = T.tag;
						if ((T.mode & 1) === 0 && (M === 0 || M === 11 || M === 15)) {
							var R = T.alternate;
							R ? (T.updateQueue = R.updateQueue, T.memoizedState = R.memoizedState, T.lanes = R.lanes) : (T.updateQueue = null, T.memoizedState = null)
						}
						var Y = Os(c);
						if (Y !== null) {
							Y.flags &= -257, Us(Y, c, p, a, t), Y.mode & 1 && Ms(a, S, t), t = Y, h = S;
							var ee = t.updateQueue;
							if (ee === null) {
								var te = new Set;
								te.add(h), t.updateQueue = te
							} else ee.add(h);
							break e
						} else {
							if ((t & 1) === 0) {
								Ms(a, S, t), ai();
								break e
							}
							h = Error(o(426))
						}
					} else if (ke && p.mode & 1) {
						var Le = Os(c);
						if (Le !== null) {
							(Le.flags & 65536) === 0 && (Le.flags |= 256), Us(Le, c, p, a, t), xa(Zr(h, p));
							break e
						}
					}
					a = h = Zr(h, p),
					Te !== 4 && (Te = 2),
					Hn === null ? Hn = [a] : Hn.push(a),
					a = c;do {
						switch (a.tag) {
							case 3:
								a.flags |= 65536, t &= -t, a.lanes |= t;
								var C = Is(a, h, t);
								ds(a, C);
								break e;
							case 1:
								p = h;
								var v = a.type,
									E = a.stateNode;
								if ((a.flags & 128) === 0 && (typeof v.getDerivedStateFromError == "function" || E !== null && typeof E.componentDidCatch == "function" && (tr === null || !tr.has(E)))) {
									a.flags |= 65536, t &= -t, a.lanes |= t;
									var U = zs(a, p, t);
									ds(a, U);
									break e
								}
						}
						a = a.return
					} while (a !== null)
				}
				yc(r)
			} catch (re) {
				t = re, qe === r && r !== null && (qe = r = r.return);
				continue
			}
			break
		} while (!0)
	}

	function xc() {
		var e = Qu.current;
		return Qu.current = Uu, e === null ? Uu : e
	}

	function ai() {
		(Te === 0 || Te === 3 || Te === 2) && (Te = 4), Me === null || (Ar & 268435455) === 0 && (Ku & 268435455) === 0 || ur(Me, Ve)
	}

	function tl(e, t) {
		var r = me;
		me |= 2;
		var n = xc();
		(Me !== e || Ve !== t) && (zt = null, Er(e, t));
		do try {
			p0();
			break
		} catch (l) {
			gc(e, l)
		}
		while (!0);
		if (ya(), me = r, Qu.current = n, qe !== null) throw Error(o(261));
		return Me = null, Ve = 0, Te
	}

	function p0() {
		for (; qe !== null;) vc(qe)
	}

	function m0() {
		for (; qe !== null && !z2();) vc(qe)
	}

	function vc(e) {
		var t = Ac(e.alternate, e, at);
		e.memoizedProps = e.pendingProps, t === null ? yc(e) : qe = t, Ja.current = null
	}

	function yc(e) {
		var t = e;
		do {
			var r = t.alternate;
			if (e = t.return, (t.flags & 32768) === 0) {
				if (r = a0(r, t, at), r !== null) {
					qe = r;
					return
				}
			} else {
				if (r = i0(r, t), r !== null) {
					r.flags &= 32767, qe = r;
					return
				}
				if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
				else {
					Te = 6, qe = null;
					return
				}
			}
			if (t = t.sibling, t !== null) {
				qe = t;
				return
			}
			qe = t = e
		} while (t !== null);
		Te === 0 && (Te = 5)
	}

	function kr(e, t, r) {
		var n = ye,
			l = pt.transition;
		try {
			pt.transition = null, ye = 1, h0(e, t, r, n)
		} finally {
			pt.transition = l, ye = n
		}
		return null
	}

	function h0(e, t, r, n) {
		do rn(); while (rr !== null);
		if ((me & 6) !== 0) throw Error(o(327));
		r = e.finishedWork;
		var l = e.finishedLanes;
		if (r === null) return null;
		if (e.finishedWork = null, e.finishedLanes = 0, r === e.current) throw Error(o(177));
		e.callbackNode = null, e.callbackPriority = 0;
		var a = r.lanes | r.childLanes;
		if (K2(e, a), e === Me && (qe = Me = null, Ve = 0), (r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0 || Ju || (Ju = !0, Cc(lu, function() {
				return rn(), null
			})), a = (r.flags & 15990) !== 0, (r.subtreeFlags & 15990) !== 0 || a) {
			a = pt.transition, pt.transition = null;
			var c = ye;
			ye = 1;
			var p = me;
			me |= 4, Ja.current = null, s0(e, r), sc(r, e), Rd(aa), fu = !!la, aa = la = null, e.current = r, c0(r), M2(), me = p, ye = c, pt.transition = a
		} else e.current = r;
		if (Ju && (Ju = !1, rr = e, Zu = l), a = e.pendingLanes, a === 0 && (tr = null), V2(r.stateNode), tt(e, be()), t !== null)
			for (n = e.onRecoverableError, r = 0; r < t.length; r++) l = t[r], n(l.value, {
				componentStack: l.stack,
				digest: l.digest
			});
		if (Yu) throw Yu = !1, e = ei, ei = null, e;
		return (Zu & 1) !== 0 && e.tag !== 0 && rn(), a = e.pendingLanes, (a & 1) !== 0 ? e === ti ? $n++ : ($n = 0, ti = e) : $n = 0, Jt(), null
	}

	function rn() {
		if (rr !== null) {
			var e = ao(Zu),
				t = pt.transition,
				r = ye;
			try {
				if (pt.transition = null, ye = 16 > e ? 16 : e, rr === null) var n = !1;
				else {
					if (e = rr, rr = null, Zu = 0, (me & 6) !== 0) throw Error(o(331));
					var l = me;
					for (me |= 4, X = e.current; X !== null;) {
						var a = X,
							c = a.child;
						if ((X.flags & 16) !== 0) {
							var p = a.deletions;
							if (p !== null) {
								for (var h = 0; h < p.length; h++) {
									var S = p[h];
									for (X = S; X !== null;) {
										var T = X;
										switch (T.tag) {
											case 0:
											case 11:
											case 15:
												Un(8, T, a)
										}
										var M = T.child;
										if (M !== null) M.return = T, X = M;
										else
											for (; X !== null;) {
												T = X;
												var R = T.sibling,
													Y = T.return;
												if (uc(T), T === S) {
													X = null;
													break
												}
												if (R !== null) {
													R.return = Y, X = R;
													break
												}
												X = Y
											}
									}
								}
								var ee = a.alternate;
								if (ee !== null) {
									var te = ee.child;
									if (te !== null) {
										ee.child = null;
										do {
											var Le = te.sibling;
											te.sibling = null, te = Le
										} while (te !== null)
									}
								}
								X = a
							}
						}
						if ((a.subtreeFlags & 2064) !== 0 && c !== null) c.return = a, X = c;
						else e: for (; X !== null;) {
							if (a = X, (a.flags & 2048) !== 0) switch (a.tag) {
								case 0:
								case 11:
								case 15:
									Un(9, a, a.return)
							}
							var C = a.sibling;
							if (C !== null) {
								C.return = a.return, X = C;
								break e
							}
							X = a.return
						}
					}
					var v = e.current;
					for (X = v; X !== null;) {
						c = X;
						var E = c.child;
						if ((c.subtreeFlags & 2064) !== 0 && E !== null) E.return = c, X = E;
						else e: for (c = v; X !== null;) {
							if (p = X, (p.flags & 2048) !== 0) try {
								switch (p.tag) {
									case 0:
									case 11:
									case 15:
										Wu(9, p)
								}
							} catch (re) {
								Ne(p, p.return, re)
							}
							if (p === c) {
								X = null;
								break e
							}
							var U = p.sibling;
							if (U !== null) {
								U.return = p.return, X = U;
								break e
							}
							X = p.return
						}
					}
					if (me = l, Jt(), Ct && typeof Ct.onPostCommitFiberRoot == "function") try {
						Ct.onPostCommitFiberRoot(au, e)
					} catch {}
					n = !0
				}
				return n
			} finally {
				ye = r, pt.transition = t
			}
		}
		return !1
	}

	function Dc(e, t, r) {
		t = Zr(r, t), t = Is(e, t, 1), e = Xt(e, t, 1), t = Ke(), e !== null && (hn(e, 1, t), tt(e, t))
	}

	function Ne(e, t, r) {
		if (e.tag === 3) Dc(e, e, r);
		else
			for (; t !== null;) {
				if (t.tag === 3) {
					Dc(t, e, r);
					break
				} else if (t.tag === 1) {
					var n = t.stateNode;
					if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (tr === null || !tr.has(n))) {
						e = Zr(r, e), e = zs(t, e, 1), t = Xt(t, e, 1), e = Ke(), t !== null && (hn(t, 1, e), tt(t, e));
						break
					}
				}
				t = t.return
			}
	}

	function g0(e, t, r) {
		var n = e.pingCache;
		n !== null && n.delete(t), t = Ke(), e.pingedLanes |= e.suspendedLanes & r, Me === e && (Ve & r) === r && (Te === 4 || Te === 3 && (Ve & 130023424) === Ve && 500 > be() - Xa ? Er(e, 0) : Za |= r), tt(e, t)
	}

	function wc(e, t) {
		t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = ou, ou <<= 1, (ou & 130023424) === 0 && (ou = 4194304)));
		var r = Ke();
		e = Tt(e, t), e !== null && (hn(e, t, r), tt(e, r))
	}

	function x0(e) {
		var t = e.memoizedState,
			r = 0;
		t !== null && (r = t.retryLane), wc(e, r)
	}

	function v0(e, t) {
		var r = 0;
		switch (e.tag) {
			case 13:
				var n = e.stateNode,
					l = e.memoizedState;
				l !== null && (r = l.retryLane);
				break;
			case 19:
				n = e.stateNode;
				break;
			default:
				throw Error(o(314))
		}
		n !== null && n.delete(t), wc(e, r)
	}
	var Ac;
	Ac = function(e, t, r) {
		if (e !== null)
			if (e.memoizedProps !== t.pendingProps || Je.current) Xe = !0;
			else {
				if ((e.lanes & r) === 0 && (t.flags & 128) === 0) return Xe = !1, l0(e, t, r);
				Xe = (e.flags & 131072) !== 0
			}
		else Xe = !1, ke && (t.flags & 1048576) !== 0 && ts(t, Nu, t.index);
		switch (t.lanes = 0, t.tag) {
			case 2:
				var n = t.type;
				$u(e, t), e = t.pendingProps;
				var l = Hr(t, He.current);
				Yr(t, r), l = Na(null, t, n, e, l, r);
				var a = _a();
				return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ze(n) ? (a = !0, ju(t)) : a = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Ca(t), l.updater = Vu, t.stateNode = l, l._reactInternals = t, Pa(t, n, e, r), t = Oa(null, t, n, !0, a, r)) : (t.tag = 0, ke && a && pa(t), Qe(null, t, l, r), t = t.child), t;
			case 16:
				n = t.elementType;
				e: {
					switch ($u(e, t), e = t.pendingProps, l = n._init, n = l(n._payload), t.type = n, l = t.tag = D0(n), e = yt(n, e), l) {
						case 0:
							t = Ma(null, t, n, e, r);
							break e;
						case 1:
							t = Qs(null, t, n, e, r);
							break e;
						case 11:
							t = Vs(null, t, n, e, r);
							break e;
						case 14:
							t = Hs(null, t, n, yt(n.type, e), r);
							break e
					}
					throw Error(o(306, n, ""))
				}
				return t;
			case 0:
				return n = t.type, l = t.pendingProps, l = t.elementType === n ? l : yt(n, l), Ma(e, t, n, l, r);
			case 1:
				return n = t.type, l = t.pendingProps, l = t.elementType === n ? l : yt(n, l), Qs(e, t, n, l, r);
			case 3:
				e: {
					if (Ks(t), e === null) throw Error(o(387));n = t.pendingProps,
					a = t.memoizedState,
					l = a.element,
					cs(e, t),
					Tu(t, n, null, r);
					var c = t.memoizedState;
					if (n = c.element, a.isDehydrated)
						if (a = {
								element: n,
								isDehydrated: !1,
								cache: c.cache,
								pendingSuspenseBoundaries: c.pendingSuspenseBoundaries,
								transitions: c.transitions
							}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							l = Zr(Error(o(423)), t), t = Ys(e, t, n, r, l);
							break e
						} else if (n !== l) {
						l = Zr(Error(o(424)), t), t = Ys(e, t, n, r, l);
						break e
					} else
						for (lt = Qt(t.stateNode.containerInfo.firstChild), ut = t, ke = !0, vt = null, r = os(t, null, n, r), t.child = r; r;) r.flags = r.flags & -3 | 4096, r = r.sibling;
					else {
						if (Wr(), n === l) {
							t = It(e, t, r);
							break e
						}
						Qe(e, t, n, r)
					}
					t = t.child
				}
				return t;
			case 5:
				return ps(t), e === null && ga(t), n = t.type, l = t.pendingProps, a = e !== null ? e.memoizedProps : null, c = l.children, ia(n, l) ? c = null : a !== null && ia(n, a) && (t.flags |= 32), Ws(e, t), Qe(e, t, c, r), t.child;
			case 6:
				return e === null && ga(t), null;
			case 13:
				return Js(e, t, r);
			case 4:
				return Ea(t, t.stateNode.containerInfo), n = t.pendingProps, e === null ? t.child = Qr(t, null, n, r) : Qe(e, t, n, r), t.child;
			case 11:
				return n = t.type, l = t.pendingProps, l = t.elementType === n ? l : yt(n, l), Vs(e, t, n, l, r);
			case 7:
				return Qe(e, t, t.pendingProps, r), t.child;
			case 8:
				return Qe(e, t, t.pendingProps.children, r), t.child;
			case 12:
				return Qe(e, t, t.pendingProps.children, r), t.child;
			case 10:
				e: {
					if (n = t.type._context, l = t.pendingProps, a = t.memoizedProps, c = l.value, Ae(Lu, n._currentValue), n._currentValue = c, a !== null)
						if (xt(a.value, c)) {
							if (a.children === l.children && !Je.current) {
								t = It(e, t, r);
								break e
							}
						} else
							for (a = t.child, a !== null && (a.return = t); a !== null;) {
								var p = a.dependencies;
								if (p !== null) {
									c = a.child;
									for (var h = p.firstContext; h !== null;) {
										if (h.context === n) {
											if (a.tag === 1) {
												h = Pt(-1, r & -r), h.tag = 2;
												var S = a.updateQueue;
												if (S !== null) {
													S = S.shared;
													var T = S.pending;
													T === null ? h.next = h : (h.next = T.next, T.next = h), S.pending = h
												}
											}
											a.lanes |= r, h = a.alternate, h !== null && (h.lanes |= r), wa(a.return, r, t), p.lanes |= r;
											break
										}
										h = h.next
									}
								} else if (a.tag === 10) c = a.type === t.type ? null : a.child;
								else if (a.tag === 18) {
									if (c = a.return, c === null) throw Error(o(341));
									c.lanes |= r, p = c.alternate, p !== null && (p.lanes |= r), wa(c, r, t), c = a.sibling
								} else c = a.child;
								if (c !== null) c.return = a;
								else
									for (c = a; c !== null;) {
										if (c === t) {
											c = null;
											break
										}
										if (a = c.sibling, a !== null) {
											a.return = c.return, c = a;
											break
										}
										c = c.return
									}
								a = c
							}
					Qe(e, t, l.children, r),
					t = t.child
				}
				return t;
			case 9:
				return l = t.type, n = t.pendingProps.children, Yr(t, r), l = dt(l), n = n(l), t.flags |= 1, Qe(e, t, n, r), t.child;
			case 14:
				return n = t.type, l = yt(n, t.pendingProps), l = yt(n.type, l), Hs(e, t, n, l, r);
			case 15:
				return $s(e, t, t.type, t.pendingProps, r);
			case 17:
				return n = t.type, l = t.pendingProps, l = t.elementType === n ? l : yt(n, l), $u(e, t), t.tag = 1, Ze(n) ? (e = !0, ju(t)) : e = !1, Yr(t, r), Ts(t, n, l), Pa(t, n, l, r), Oa(null, t, n, !0, e, r);
			case 19:
				return Xs(e, t, r);
			case 22:
				return Gs(e, t, r)
		}
		throw Error(o(156, t.tag))
	};

	function Cc(e, t) {
		return to(e, t)
	}

	function y0(e, t, r, n) {
		this.tag = e, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
	}

	function mt(e, t, r, n) {
		return new y0(e, t, r, n)
	}

	function ii(e) {
		return e = e.prototype, !(!e || !e.isReactComponent)
	}

	function D0(e) {
		if (typeof e == "function") return ii(e) ? 1 : 0;
		if (e != null) {
			if (e = e.$$typeof, e === De) return 11;
			if (e === we) return 14
		}
		return 2
	}

	function lr(e, t) {
		var r = e.alternate;
		return r === null ? (r = mt(e.tag, t, e.key, e.mode), r.elementType = e.elementType, r.type = e.type, r.stateNode = e.stateNode, r.alternate = e, e.alternate = r) : (r.pendingProps = t, r.type = e.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = e.flags & 14680064, r.childLanes = e.childLanes, r.lanes = e.lanes, r.child = e.child, r.memoizedProps = e.memoizedProps, r.memoizedState = e.memoizedState, r.updateQueue = e.updateQueue, t = e.dependencies, r.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, r.sibling = e.sibling, r.index = e.index, r.ref = e.ref, r
	}

	function rl(e, t, r, n, l, a) {
		var c = 2;
		if (n = e, typeof e == "function") ii(e) && (c = 1);
		else if (typeof e == "string") c = 5;
		else e: switch (e) {
			case H:
				return Sr(r.children, l, a, t);
			case $:
				c = 8, l |= 8;
				break;
			case Z:
				return e = mt(12, r, t, l | 2), e.elementType = Z, e.lanes = a, e;
			case ne:
				return e = mt(13, r, t, l), e.elementType = ne, e.lanes = a, e;
			case Se:
				return e = mt(19, r, t, l), e.elementType = Se, e.lanes = a, e;
			case xe:
				return nl(r, l, a, t);
			default:
				if (typeof e == "object" && e !== null) switch (e.$$typeof) {
					case de:
						c = 10;
						break e;
					case pe:
						c = 9;
						break e;
					case De:
						c = 11;
						break e;
					case we:
						c = 14;
						break e;
					case _e:
						c = 16, n = null;
						break e
				}
				throw Error(o(130, e == null ? e : typeof e, ""))
		}
		return t = mt(c, r, t, l), t.elementType = e, t.type = n, t.lanes = a, t
	}

	function Sr(e, t, r, n) {
		return e = mt(7, e, n, t), e.lanes = r, e
	}

	function nl(e, t, r, n) {
		return e = mt(22, e, n, t), e.elementType = xe, e.lanes = r, e.stateNode = {
			isHidden: !1
		}, e
	}

	function oi(e, t, r) {
		return e = mt(6, e, null, t), e.lanes = r, e
	}

	function si(e, t, r) {
		return t = mt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = r, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t
	}

	function w0(e, t, r, n, l) {
		this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Tl(0), this.expirationTimes = Tl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tl(0), this.identifierPrefix = n, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null
	}

	function ci(e, t, r, n, l, a, c, p, h) {
		return e = new w0(e, t, r, p, h), t === 1 ? (t = 1, a === !0 && (t |= 8)) : t = 0, a = mt(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = {
			element: n,
			isDehydrated: r,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		}, Ca(a), e
	}

	function A0(e, t, r) {
		var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: J,
			key: n == null ? null : "" + n,
			children: e,
			containerInfo: t,
			implementation: r
		}
	}

	function Ec(e) {
		if (!e) return Yt;
		e = e._reactInternals;
		e: {
			if (mr(e) !== e || e.tag !== 1) throw Error(o(170));
			var t = e;do {
				switch (t.tag) {
					case 3:
						t = t.stateNode.context;
						break e;
					case 1:
						if (Ze(t.type)) {
							t = t.stateNode.__reactInternalMemoizedMergedChildContext;
							break e
						}
				}
				t = t.return
			} while (t !== null);
			throw Error(o(171))
		}
		if (e.tag === 1) {
			var r = e.type;
			if (Ze(r)) return Zo(e, r, t)
		}
		return t
	}

	function kc(e, t, r, n, l, a, c, p, h) {
		return e = ci(r, n, !0, e, l, a, c, p, h), e.context = Ec(null), r = e.current, n = Ke(), l = nr(r), a = Pt(n, l), a.callback = t ?? null, Xt(r, a, l), e.current.lanes = l, hn(e, l, n), tt(e, n), e
	}

	function ul(e, t, r, n) {
		var l = t.current,
			a = Ke(),
			c = nr(l);
		return r = Ec(r), t.context === null ? t.context = r : t.pendingContext = r, t = Pt(a, c), t.payload = {
			element: e
		}, n = n === void 0 ? null : n, n !== null && (t.callback = n), e = Xt(l, t, c), e !== null && (At(e, l, c, a), Ru(e, l, c)), c
	}

	function ll(e) {
		if (e = e.current, !e.child) return null;
		switch (e.child.tag) {
			case 5:
				return e.child.stateNode;
			default:
				return e.child.stateNode
		}
	}

	function Sc(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var r = e.retryLane;
			e.retryLane = r !== 0 && r < t ? r : t
		}
	}

	function di(e, t) {
		Sc(e, t), (e = e.alternate) && Sc(e, t)
	}

	function C0() {
		return null
	}
	var jc = typeof reportError == "function" ? reportError : function(e) {
		console.error(e)
	};

	function fi(e) {
		this._internalRoot = e
	}
	al.prototype.render = fi.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(o(409));
		ul(e, t, null, null)
	}, al.prototype.unmount = fi.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			Cr(function() {
				ul(null, e, null, null)
			}), t[bt] = null
		}
	};

	function al(e) {
		this._internalRoot = e
	}
	al.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = so();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var r = 0; r < $t.length && t !== 0 && t < $t[r].priority; r++);
			$t.splice(r, 0, e), r === 0 && po(e)
		}
	};

	function pi(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
	}

	function il(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
	}

	function Bc() {}

	function E0(e, t, r, n, l) {
		if (l) {
			if (typeof n == "function") {
				var a = n;
				n = function() {
					var S = ll(c);
					a.call(S)
				}
			}
			var c = kc(t, n, e, 0, null, !1, !1, "", Bc);
			return e._reactRootContainer = c, e[bt] = c.current, Fn(e.nodeType === 8 ? e.parentNode : e), Cr(), c
		}
		for (; l = e.lastChild;) e.removeChild(l);
		if (typeof n == "function") {
			var p = n;
			n = function() {
				var S = ll(h);
				p.call(S)
			}
		}
		var h = ci(e, 0, !1, null, null, !1, !1, "", Bc);
		return e._reactRootContainer = h, e[bt] = h.current, Fn(e.nodeType === 8 ? e.parentNode : e), Cr(function() {
			ul(t, h, r, n)
		}), h
	}

	function ol(e, t, r, n, l) {
		var a = r._reactRootContainer;
		if (a) {
			var c = a;
			if (typeof l == "function") {
				var p = l;
				l = function() {
					var h = ll(c);
					p.call(h)
				}
			}
			ul(t, c, e, l)
		} else c = E0(r, t, e, l, n);
		return ll(c)
	}
	io = function(e) {
		switch (e.tag) {
			case 3:
				var t = e.stateNode;
				if (t.current.memoizedState.isDehydrated) {
					var r = mn(t.pendingLanes);
					r !== 0 && (Pl(t, r | 1), tt(t, be()), (me & 6) === 0 && (tn = be() + 500, Jt()))
				}
				break;
			case 13:
				Cr(function() {
					var n = Tt(e, 1);
					if (n !== null) {
						var l = Ke();
						At(n, e, 1, l)
					}
				}), di(e, 1)
		}
	}, Il = function(e) {
		if (e.tag === 13) {
			var t = Tt(e, 134217728);
			if (t !== null) {
				var r = Ke();
				At(t, e, 134217728, r)
			}
			di(e, 134217728)
		}
	}, oo = function(e) {
		if (e.tag === 13) {
			var t = nr(e),
				r = Tt(e, t);
			if (r !== null) {
				var n = Ke();
				At(r, e, t, n)
			}
			di(e, t)
		}
	}, so = function() {
		return ye
	}, co = function(e, t) {
		var r = ye;
		try {
			return ye = e, t()
		} finally {
			ye = r
		}
	}, Nl = function(e, t, r) {
		switch (t) {
			case "input":
				if (Al(e, r), t = r.name, r.type === "radio" && t != null) {
					for (r = e; r.parentNode;) r = r.parentNode;
					for (r = r.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < r.length; t++) {
						var n = r[t];
						if (n !== e && n.form === e.form) {
							var l = ku(n);
							if (!l) throw Error(o(90));
							cr(n), Al(n, l)
						}
					}
				}
				break;
			case "textarea":
				zi(e, r);
				break;
			case "select":
				t = r.value, t != null && br(e, !!r.multiple, t, !1)
		}
	}, Qi = ui, Ki = Cr;
	var k0 = {
			usingClientEntryPoint: !1,
			Events: [bn, Ur, ku, Gi, Wi, ui]
		},
		Gn = {
			findFiberByHostInstance: hr,
			bundleType: 0,
			version: "18.3.1",
			rendererPackageName: "react-dom"
		},
		S0 = {
			bundleType: Gn.bundleType,
			version: Gn.version,
			rendererPackageName: Gn.rendererPackageName,
			rendererConfig: Gn.rendererConfig,
			overrideHookState: null,
			overrideHookStateDeletePath: null,
			overrideHookStateRenamePath: null,
			overrideProps: null,
			overridePropsDeletePath: null,
			overridePropsRenamePath: null,
			setErrorHandler: null,
			setSuspenseHandler: null,
			scheduleUpdate: null,
			currentDispatcherRef: V.ReactCurrentDispatcher,
			findHostInstanceByFiber: function(e) {
				return e = Xi(e), e === null ? null : e.stateNode
			},
			findFiberByHostInstance: Gn.findFiberByHostInstance || C0,
			findHostInstancesForRefresh: null,
			scheduleRefresh: null,
			scheduleRoot: null,
			setRefreshHandler: null,
			getCurrentFiber: null,
			reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
		};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var sl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!sl.isDisabled && sl.supportsFiber) try {
			au = sl.inject(S0), Ct = sl
		} catch {}
	}
	return rt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = k0, rt.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!pi(t)) throw Error(o(200));
		return A0(e, t, null, r)
	}, rt.createRoot = function(e, t) {
		if (!pi(e)) throw Error(o(299));
		var r = !1,
			n = "",
			l = jc;
		return t != null && (t.unstable_strictMode === !0 && (r = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = ci(e, 1, !1, null, null, r, !1, n, l), e[bt] = t.current, Fn(e.nodeType === 8 ? e.parentNode : e), new fi(t)
	}, rt.findDOMNode = function(e) {
		if (e == null) return null;
		if (e.nodeType === 1) return e;
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
		return e = Xi(t), e = e === null ? null : e.stateNode, e
	}, rt.flushSync = function(e) {
		return Cr(e)
	}, rt.hydrate = function(e, t, r) {
		if (!il(t)) throw Error(o(200));
		return ol(null, e, t, !0, r)
	}, rt.hydrateRoot = function(e, t, r) {
		if (!pi(e)) throw Error(o(405));
		var n = r != null && r.hydratedSources || null,
			l = !1,
			a = "",
			c = jc;
		if (r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (a = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), t = kc(t, null, e, 1, r ?? null, l, !1, a, c), e[bt] = t.current, Fn(e), n)
			for (e = 0; e < n.length; e++) r = n[e], l = r._getVersion, l = l(r._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [r, l] : t.mutableSourceEagerHydrationData.push(r, l);
		return new al(t)
	}, rt.render = function(e, t, r) {
		if (!il(t)) throw Error(o(200));
		return ol(null, e, t, !1, r)
	}, rt.unmountComponentAtNode = function(e) {
		if (!il(e)) throw Error(o(40));
		return e._reactRootContainer ? (Cr(function() {
			ol(null, null, e, !1, function() {
				e._reactRootContainer = null, e[bt] = null
			})
		}), !0) : !1
	}, rt.unstable_batchedUpdates = ui, rt.unstable_renderSubtreeIntoContainer = function(e, t, r, n) {
		if (!il(r)) throw Error(o(200));
		if (e == null || e._reactInternals === void 0) throw Error(o(38));
		return ol(e, t, r, !1, n)
	}, rt.version = "18.3.1-next-f1338f8080-20240426", rt
}
var Pc;

function q0() {
	if (Pc) return gi.exports;
	Pc = 1;

	function u() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u)
		} catch (s) {
			console.error(s)
		}
	}
	return u(), gi.exports = L0(), gi.exports
}
var Ic;

function R0() {
	if (Ic) return cl;
	Ic = 1;
	var u = q0();
	return cl.createRoot = u.createRoot, cl.hydrateRoot = u.hydrateRoot, cl
}
var T0 = R0();
const P0 = Si(T0);
var g = ji();
const jr = Si(g);
var Qn = {},
	zc;

function I0() {
	if (zc) return Qn;
	zc = 1, Object.defineProperty(Qn, "__esModule", {
		value: !0
	}), Qn.parse = y, Qn.serialize = A;
	const u = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
		s = /^[\u0021-\u003A\u003C-\u007E]*$/,
		o = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
		d = /^[\u0020-\u003A\u003D-\u007E]*$/,
		f = Object.prototype.toString,
		m = (() => {
			const w = function() {};
			return w.prototype = Object.create(null), w
		})();

	function y(w, j) {
		const B = new m,
			L = w.length;
		if (L < 2) return B;
		const P = (j == null ? void 0 : j.decode) || N;
		let F = 0;
		do {
			const z = w.indexOf("=", F);
			if (z === -1) break;
			const W = w.indexOf(";", F),
				V = W === -1 ? L : W;
			if (z > V) {
				F = w.lastIndexOf(";", z - 1) + 1;
				continue
			}
			const I = k(w, F, z),
				J = D(w, z, I),
				H = w.slice(I, J);
			if (B[H] === void 0) {
				let $ = k(w, z + 1, V),
					Z = D(w, V, $);
				const de = P(w.slice($, Z));
				B[H] = de
			}
			F = V + 1
		} while (F < L);
		return B
	}

	function k(w, j, B) {
		do {
			const L = w.charCodeAt(j);
			if (L !== 32 && L !== 9) return j
		} while (++j < B);
		return B
	}

	function D(w, j, B) {
		for (; j > B;) {
			const L = w.charCodeAt(--j);
			if (L !== 32 && L !== 9) return j + 1
		}
		return B
	}

	function A(w, j, B) {
		const L = (B == null ? void 0 : B.encode) || encodeURIComponent;
		if (!u.test(w)) throw new TypeError(`argument name is invalid: ${w}`);
		const P = L(j);
		if (!s.test(P)) throw new TypeError(`argument val is invalid: ${j}`);
		let F = w + "=" + P;
		if (!B) return F;
		if (B.maxAge !== void 0) {
			if (!Number.isInteger(B.maxAge)) throw new TypeError(`option maxAge is invalid: ${B.maxAge}`);
			F += "; Max-Age=" + B.maxAge
		}
		if (B.domain) {
			if (!o.test(B.domain)) throw new TypeError(`option domain is invalid: ${B.domain}`);
			F += "; Domain=" + B.domain
		}
		if (B.path) {
			if (!d.test(B.path)) throw new TypeError(`option path is invalid: ${B.path}`);
			F += "; Path=" + B.path
		}
		if (B.expires) {
			if (!b(B.expires) || !Number.isFinite(B.expires.valueOf())) throw new TypeError(`option expires is invalid: ${B.expires}`);
			F += "; Expires=" + B.expires.toUTCString()
		}
		if (B.httpOnly && (F += "; HttpOnly"), B.secure && (F += "; Secure"), B.partitioned && (F += "; Partitioned"), B.priority) switch (typeof B.priority == "string" ? B.priority.toLowerCase() : void 0) {
			case "low":
				F += "; Priority=Low";
				break;
			case "medium":
				F += "; Priority=Medium";
				break;
			case "high":
				F += "; Priority=High";
				break;
			default:
				throw new TypeError(`option priority is invalid: ${B.priority}`)
		}
		if (B.sameSite) switch (typeof B.sameSite == "string" ? B.sameSite.toLowerCase() : B.sameSite) {
			case !0:
			case "strict":
				F += "; SameSite=Strict";
				break;
			case "lax":
				F += "; SameSite=Lax";
				break;
			case "none":
				F += "; SameSite=None";
				break;
			default:
				throw new TypeError(`option sameSite is invalid: ${B.sameSite}`)
		}
		return F
	}

	function N(w) {
		if (w.indexOf("%") === -1) return w;
		try {
			return decodeURIComponent(w)
		} catch {
			return w
		}
	}

	function b(w) {
		return f.call(w) === "[object Date]"
	}
	return Qn
}
I0();
var Mc = "popstate";

function z0(u = {}) {
	function s(d, f) {
		let {
			pathname: m,
			search: y,
			hash: k
		} = d.location;
		return Ai("", {
			pathname: m,
			search: y,
			hash: k
		}, f.state && f.state.usr || null, f.state && f.state.key || "default")
	}

	function o(d, f) {
		return typeof f == "string" ? f : Jn(f)
	}
	return O0(s, o, null, u)
}

function Fe(u, s) {
	if (u === !1 || u === null || typeof u > "u") throw new Error(s)
}

function Bt(u, s) {
	if (!u) {
		typeof console < "u" && console.warn(s);
		try {
			throw new Error(s)
		} catch {}
	}
}

function M0() {
	return Math.random().toString(36).substring(2, 10)
}

function Oc(u, s) {
	return {
		usr: u.state,
		key: u.key,
		idx: s
	}
}

function Ai(u, s, o = null, d) {
	return {
		pathname: typeof u == "string" ? u : u.pathname,
		search: "",
		hash: "",
		...typeof s == "string" ? un(s) : s,
		state: o,
		key: s && s.key || d || M0()
	}
}

function Jn({
	pathname: u = "/",
	search: s = "",
	hash: o = ""
}) {
	return s && s !== "?" && (u += s.charAt(0) === "?" ? s : "?" + s), o && o !== "#" && (u += o.charAt(0) === "#" ? o : "#" + o), u
}

function un(u) {
	let s = {};
	if (u) {
		let o = u.indexOf("#");
		o >= 0 && (s.hash = u.substring(o), u = u.substring(0, o));
		let d = u.indexOf("?");
		d >= 0 && (s.search = u.substring(d), u = u.substring(0, d)), u && (s.pathname = u)
	}
	return s
}

function O0(u, s, o, d = {}) {
	let {
		window: f = document.defaultView,
		v5Compat: m = !1
	} = d, y = f.history, k = "POP", D = null, A = N();
	A == null && (A = 0, y.replaceState({
		...y.state,
		idx: A
	}, ""));

	function N() {
		return (y.state || {
			idx: null
		}).idx
	}

	function b() {
		k = "POP";
		let P = N(),
			F = P == null ? null : P - A;
		A = P, D && D({
			action: k,
			location: L.location,
			delta: F
		})
	}

	function w(P, F) {
		k = "PUSH";
		let z = Ai(L.location, P, F);
		A = N() + 1;
		let W = Oc(z, A),
			V = L.createHref(z);
		try {
			y.pushState(W, "", V)
		} catch (I) {
			if (I instanceof DOMException && I.name === "DataCloneError") throw I;
			f.location.assign(V)
		}
		m && D && D({
			action: k,
			location: L.location,
			delta: 1
		})
	}

	function j(P, F) {
		k = "REPLACE";
		let z = Ai(L.location, P, F);
		A = N();
		let W = Oc(z, A),
			V = L.createHref(z);
		y.replaceState(W, "", V), m && D && D({
			action: k,
			location: L.location,
			delta: 0
		})
	}

	function B(P) {
		return U0(P)
	}
	let L = {
		get action() {
			return k
		},
		get location() {
			return u(f, y)
		},
		listen(P) {
			if (D) throw new Error("A history only accepts one active listener");
			return f.addEventListener(Mc, b), D = P, () => {
				f.removeEventListener(Mc, b), D = null
			}
		},
		createHref(P) {
			return s(f, P)
		},
		createURL: B,
		encodeLocation(P) {
			let F = B(P);
			return {
				pathname: F.pathname,
				search: F.search,
				hash: F.hash
			}
		},
		push: w,
		replace: j,
		go(P) {
			return y.go(P)
		}
	};
	return L
}

function U0(u, s = !1) {
	let o = "http://localhost";
	typeof window < "u" && (o = window.location.origin !== "null" ? window.location.origin : window.location.href), Fe(o, "No window.location.(origin|href) available to create URL");
	let d = typeof u == "string" ? u : Jn(u);
	return d = d.replace(/ $/, "%20"), !s && d.startsWith("//") && (d = o + d), new URL(d, o)
}

function u2(u, s, o = "/") {
	return V0(u, s, o, !1)
}

function V0(u, s, o, d) {
	let f = typeof s == "string" ? un(s) : s,
		m = Ot(f.pathname || "/", o);
	if (m == null) return null;
	let y = l2(u);
	H0(y);
	let k = null;
	for (let D = 0; k == null && D < y.length; ++D) {
		let A = tf(m);
		k = X0(y[D], A, d)
	}
	return k
}

function l2(u, s = [], o = [], d = "") {
	let f = (m, y, k) => {
		let D = {
			relativePath: k === void 0 ? m.path || "" : k,
			caseSensitive: m.caseSensitive === !0,
			childrenIndex: y,
			route: m
		};
		D.relativePath.startsWith("/") && (Fe(D.relativePath.startsWith(d), `Absolute route path "${D.relativePath}" nested under path "${d}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`), D.relativePath = D.relativePath.slice(d.length));
		let A = Mt([d, D.relativePath]),
			N = o.concat(D);
		m.children && m.children.length > 0 && (Fe(m.index !== !0, `Index routes must not have child routes. Please remove all child routes from route path "${A}".`), l2(m.children, s, N, A)), !(m.path == null && !m.index) && s.push({
			path: A,
			score: J0(A, m.index),
			routesMeta: N
		})
	};
	return u.forEach((m, y) => {
		var k;
		if (m.path === "" || !((k = m.path) != null && k.includes("?"))) f(m, y);
		else
			for (let D of a2(m.path)) f(m, y, D)
	}), s
}

function a2(u) {
	let s = u.split("/");
	if (s.length === 0) return [];
	let [o, ...d] = s, f = o.endsWith("?"), m = o.replace(/\?$/, "");
	if (d.length === 0) return f ? [m, ""] : [m];
	let y = a2(d.join("/")),
		k = [];
	return k.push(...y.map(D => D === "" ? m : [m, D].join("/"))), f && k.push(...y), k.map(D => u.startsWith("/") && D === "" ? "/" : D)
}

function H0(u) {
	u.sort((s, o) => s.score !== o.score ? o.score - s.score : Z0(s.routesMeta.map(d => d.childrenIndex), o.routesMeta.map(d => d.childrenIndex)))
}
var $0 = /^:[\w-]+$/,
	G0 = 3,
	W0 = 2,
	Q0 = 1,
	K0 = 10,
	Y0 = -2,
	Uc = u => u === "*";

function J0(u, s) {
	let o = u.split("/"),
		d = o.length;
	return o.some(Uc) && (d += Y0), s && (d += W0), o.filter(f => !Uc(f)).reduce((f, m) => f + ($0.test(m) ? G0 : m === "" ? Q0 : K0), d)
}

function Z0(u, s) {
	return u.length === s.length && u.slice(0, -1).every((d, f) => d === s[f]) ? u[u.length - 1] - s[s.length - 1] : 0
}

function X0(u, s, o = !1) {
	let {
		routesMeta: d
	} = u, f = {}, m = "/", y = [];
	for (let k = 0; k < d.length; ++k) {
		let D = d[k],
			A = k === d.length - 1,
			N = m === "/" ? s : s.slice(m.length) || "/",
			b = ml({
				path: D.relativePath,
				caseSensitive: D.caseSensitive,
				end: A
			}, N),
			w = D.route;
		if (!b && A && o && !d[d.length - 1].route.index && (b = ml({
				path: D.relativePath,
				caseSensitive: D.caseSensitive,
				end: !1
			}, N)), !b) return null;
		Object.assign(f, b.params), y.push({
			params: f,
			pathname: Mt([m, b.pathname]),
			pathnameBase: lf(Mt([m, b.pathnameBase])),
			route: w
		}), b.pathnameBase !== "/" && (m = Mt([m, b.pathnameBase]))
	}
	return y
}

function ml(u, s) {
	typeof u == "string" && (u = {
		path: u,
		caseSensitive: !1,
		end: !0
	});
	let [o, d] = ef(u.path, u.caseSensitive, u.end), f = s.match(o);
	if (!f) return null;
	let m = f[0],
		y = m.replace(/(.)\/+$/, "$1"),
		k = f.slice(1);
	return {
		params: d.reduce((A, {
			paramName: N,
			isOptional: b
		}, w) => {
			if (N === "*") {
				let B = k[w] || "";
				y = m.slice(0, m.length - B.length).replace(/(.)\/+$/, "$1")
			}
			const j = k[w];
			return b && !j ? A[N] = void 0 : A[N] = (j || "").replace(/%2F/g, "/"), A
		}, {}),
		pathname: m,
		pathnameBase: y,
		pattern: u
	}
}

function ef(u, s = !1, o = !0) {
	Bt(u === "*" || !u.endsWith("*") || u.endsWith("/*"), `Route path "${u}" will be treated as if it were "${u.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${u.replace(/\*$/,"/*")}".`);
	let d = [],
		f = "^" + u.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (y, k, D) => (d.push({
			paramName: k,
			isOptional: D != null
		}), D ? "/?([^\\/]+)?" : "/([^\\/]+)"));
	return u.endsWith("*") ? (d.push({
		paramName: "*"
	}), f += u === "*" || u === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : o ? f += "\\/*$" : u !== "" && u !== "/" && (f += "(?:(?=\\/|$))"), [new RegExp(f, s ? void 0 : "i"), d]
}

function tf(u) {
	try {
		return u.split("/").map(s => decodeURIComponent(s).replace(/\//g, "%2F")).join("/")
	} catch (s) {
		return Bt(!1, `The URL path "${u}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${s}).`), u
	}
}

function Ot(u, s) {
	if (s === "/") return u;
	if (!u.toLowerCase().startsWith(s.toLowerCase())) return null;
	let o = s.endsWith("/") ? s.length - 1 : s.length,
		d = u.charAt(o);
	return d && d !== "/" ? null : u.slice(o) || "/"
}

function rf(u, s = "/") {
	let {
		pathname: o,
		search: d = "",
		hash: f = ""
	} = typeof u == "string" ? un(u) : u;
	return {
		pathname: o ? o.startsWith("/") ? o : nf(o, s) : s,
		search: af(d),
		hash: of(f)
	}
}

function nf(u, s) {
	let o = s.replace(/\/+$/, "").split("/");
	return u.split("/").forEach(f => {
		f === ".." ? o.length > 1 && o.pop() : f !== "." && o.push(f)
	}), o.length > 1 ? o.join("/") : "/"
}

function yi(u, s, o, d) {
	return `Cannot include a '${u}' character in a manually specified \`to.${s}\` field [${JSON.stringify(d)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}

function uf(u) {
	return u.filter((s, o) => o === 0 || s.route.path && s.route.path.length > 0)
}

function i2(u) {
	let s = uf(u);
	return s.map((o, d) => d === s.length - 1 ? o.pathname : o.pathnameBase)
}

function o2(u, s, o, d = !1) {
	let f;
	typeof u == "string" ? f = un(u) : (f = {
		...u
	}, Fe(!f.pathname || !f.pathname.includes("?"), yi("?", "pathname", "search", f)), Fe(!f.pathname || !f.pathname.includes("#"), yi("#", "pathname", "hash", f)), Fe(!f.search || !f.search.includes("#"), yi("#", "search", "hash", f)));
	let m = u === "" || f.pathname === "",
		y = m ? "/" : f.pathname,
		k;
	if (y == null) k = o;
	else {
		let b = s.length - 1;
		if (!d && y.startsWith("..")) {
			let w = y.split("/");
			for (; w[0] === "..";) w.shift(), b -= 1;
			f.pathname = w.join("/")
		}
		k = b >= 0 ? s[b] : "/"
	}
	let D = rf(f, k),
		A = y && y !== "/" && y.endsWith("/"),
		N = (m || y === ".") && o.endsWith("/");
	return !D.pathname.endsWith("/") && (A || N) && (D.pathname += "/"), D
}
var Mt = u => u.join("/").replace(/\/\/+/g, "/"),
	lf = u => u.replace(/\/+$/, "").replace(/^\/*/, "/"),
	af = u => !u || u === "?" ? "" : u.startsWith("?") ? u : "?" + u,
	of = u => !u || u === "#" ? "" : u.startsWith("#") ? u : "#" + u;

function sf(u) {
	return u != null && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.internal == "boolean" && "data" in u
}
var s2 = ["POST", "PUT", "PATCH", "DELETE"];
new Set(s2);
var cf = ["GET", ...s2];
new Set(cf);
var ln = g.createContext(null);
ln.displayName = "DataRouter";
var xl = g.createContext(null);
xl.displayName = "DataRouterState";
var c2 = g.createContext({
	isTransitioning: !1
});
c2.displayName = "ViewTransition";
var df = g.createContext(new Map);
df.displayName = "Fetchers";
var ff = g.createContext(null);
ff.displayName = "Await";
var Ft = g.createContext(null);
Ft.displayName = "Navigation";
var Zn = g.createContext(null);
Zn.displayName = "Location";
var Nt = g.createContext({
	outlet: null,
	matches: [],
	isDataRoute: !1
});
Nt.displayName = "Route";
var Bi = g.createContext(null);
Bi.displayName = "RouteError";

function pf(u, {
	relative: s
} = {}) {
	Fe(Xn(), "useHref() may be used only in the context of a <Router> component.");
	let {
		basename: o,
		navigator: d
	} = g.useContext(Ft), {
		hash: f,
		pathname: m,
		search: y
	} = eu(u, {
		relative: s
	}), k = m;
	return o !== "/" && (k = m === "/" ? o : Mt([o, m])), d.createHref({
		pathname: k,
		search: y,
		hash: f
	})
}

function Xn() {
	return g.useContext(Zn) != null
}

function sr() {
	return Fe(Xn(), "useLocation() may be used only in the context of a <Router> component."), g.useContext(Zn).location
}
var d2 = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";

function f2(u) {
	g.useContext(Ft).static || g.useLayoutEffect(u)
}

function vl() {
	let {
		isDataRoute: u
	} = g.useContext(Nt);
	return u ? Sf() : mf()
}

function mf() {
	Fe(Xn(), "useNavigate() may be used only in the context of a <Router> component.");
	let u = g.useContext(ln),
		{
			basename: s,
			navigator: o
		} = g.useContext(Ft),
		{
			matches: d
		} = g.useContext(Nt),
		{
			pathname: f
		} = sr(),
		m = JSON.stringify(i2(d)),
		y = g.useRef(!1);
	return f2(() => {
		y.current = !0
	}), g.useCallback((D, A = {}) => {
		if (Bt(y.current, d2), !y.current) return;
		if (typeof D == "number") {
			o.go(D);
			return
		}
		let N = o2(D, JSON.parse(m), f, A.relative === "path");
		u == null && s !== "/" && (N.pathname = N.pathname === "/" ? s : Mt([s, N.pathname])), (A.replace ? o.replace : o.push)(N, A.state, A)
	}, [s, o, m, f, u])
}
g.createContext(null);

function yl() {
	let {
		matches: u
	} = g.useContext(Nt), s = u[u.length - 1];
	return s ? s.params : {}
}

function eu(u, {
	relative: s
} = {}) {
	let {
		matches: o
	} = g.useContext(Nt), {
		pathname: d
	} = sr(), f = JSON.stringify(i2(o));
	return g.useMemo(() => o2(u, JSON.parse(f), d, s === "path"), [u, f, d, s])
}

function hf(u, s) {
	return p2(u, s)
}

function p2(u, s, o, d) {
	var F;
	Fe(Xn(), "useRoutes() may be used only in the context of a <Router> component.");
	let {
		navigator: f
	} = g.useContext(Ft), {
		matches: m
	} = g.useContext(Nt), y = m[m.length - 1], k = y ? y.params : {}, D = y ? y.pathname : "/", A = y ? y.pathnameBase : "/", N = y && y.route;
	{
		let z = N && N.path || "";
		m2(D, !N || z.endsWith("*") || z.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${D}" (under <Route path="${z}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${z}"> to <Route path="${z==="/"?"*":`${z}/*`}">.`)
	}
	let b = sr(),
		w;
	if (s) {
		let z = typeof s == "string" ? un(s) : s;
		Fe(A === "/" || ((F = z.pathname) == null ? void 0 : F.startsWith(A)), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${A}" but pathname "${z.pathname}" was given in the \`location\` prop.`), w = z
	} else w = b;
	let j = w.pathname || "/",
		B = j;
	if (A !== "/") {
		let z = A.replace(/^\//, "").split("/");
		B = "/" + j.replace(/^\//, "").split("/").slice(z.length).join("/")
	}
	let L = u2(u, {
		pathname: B
	});
	Bt(N || L != null, `No routes matched location "${w.pathname}${w.search}${w.hash}" `), Bt(L == null || L[L.length - 1].route.element !== void 0 || L[L.length - 1].route.Component !== void 0 || L[L.length - 1].route.lazy !== void 0, `Matched leaf route at location "${w.pathname}${w.search}${w.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
	let P = Df(L && L.map(z => Object.assign({}, z, {
		params: Object.assign({}, k, z.params),
		pathname: Mt([A, f.encodeLocation ? f.encodeLocation(z.pathname).pathname : z.pathname]),
		pathnameBase: z.pathnameBase === "/" ? A : Mt([A, f.encodeLocation ? f.encodeLocation(z.pathnameBase).pathname : z.pathnameBase])
	})), m, o, d);
	return s && P ? g.createElement(Zn.Provider, {
		value: {
			location: {
				pathname: "/",
				search: "",
				hash: "",
				state: null,
				key: "default",
				...w
			},
			navigationType: "POP"
		}
	}, P) : P
}

function gf() {
	let u = kf(),
		s = sf(u) ? `${u.status} ${u.statusText}` : u instanceof Error ? u.message : JSON.stringify(u),
		o = u instanceof Error ? u.stack : null,
		d = "rgba(200,200,200, 0.5)",
		f = {
			padding: "0.5rem",
			backgroundColor: d
		},
		m = {
			padding: "2px 4px",
			backgroundColor: d
		},
		y = null;
	return console.error("Error handled by React Router default ErrorBoundary:", u), y = g.createElement(g.Fragment, null, g.createElement("p", null, "💿 Hey developer 👋"), g.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", g.createElement("code", {
		style: m
	}, "ErrorBoundary"), " or", " ", g.createElement("code", {
		style: m
	}, "errorElement"), " prop on your route.")), g.createElement(g.Fragment, null, g.createElement("h2", null, "Unexpected Application Error!"), g.createElement("h3", {
		style: {
			fontStyle: "italic"
		}
	}, s), o ? g.createElement("pre", {
		style: f
	}, o) : null, y)
}
var xf = g.createElement(gf, null),
	vf = class extends g.Component {
		constructor(u) {
			super(u), this.state = {
				location: u.location,
				revalidation: u.revalidation,
				error: u.error
			}
		}
		static getDerivedStateFromError(u) {
			return {
				error: u
			}
		}
		static getDerivedStateFromProps(u, s) {
			return s.location !== u.location || s.revalidation !== "idle" && u.revalidation === "idle" ? {
				error: u.error,
				location: u.location,
				revalidation: u.revalidation
			} : {
				error: u.error !== void 0 ? u.error : s.error,
				location: s.location,
				revalidation: u.revalidation || s.revalidation
			}
		}
		componentDidCatch(u, s) {
			console.error("React Router caught the following error during render", u, s)
		}
		render() {
			return this.state.error !== void 0 ? g.createElement(Nt.Provider, {
				value: this.props.routeContext
			}, g.createElement(Bi.Provider, {
				value: this.state.error,
				children: this.props.component
			})) : this.props.children
		}
	};

function yf({
	routeContext: u,
	match: s,
	children: o
}) {
	let d = g.useContext(ln);
	return d && d.static && d.staticContext && (s.route.errorElement || s.route.ErrorBoundary) && (d.staticContext._deepestRenderedBoundaryId = s.route.id), g.createElement(Nt.Provider, {
		value: u
	}, o)
}

function Df(u, s = [], o = null, d = null) {
	if (u == null) {
		if (!o) return null;
		if (o.errors) u = o.matches;
		else if (s.length === 0 && !o.initialized && o.matches.length > 0) u = o.matches;
		else return null
	}
	let f = u,
		m = o == null ? void 0 : o.errors;
	if (m != null) {
		let D = f.findIndex(A => A.route.id && (m == null ? void 0 : m[A.route.id]) !== void 0);
		Fe(D >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(m).join(",")}`), f = f.slice(0, Math.min(f.length, D + 1))
	}
	let y = !1,
		k = -1;
	if (o)
		for (let D = 0; D < f.length; D++) {
			let A = f[D];
			if ((A.route.HydrateFallback || A.route.hydrateFallbackElement) && (k = D), A.route.id) {
				let {
					loaderData: N,
					errors: b
				} = o, w = A.route.loader && !N.hasOwnProperty(A.route.id) && (!b || b[A.route.id] === void 0);
				if (A.route.lazy || w) {
					y = !0, k >= 0 ? f = f.slice(0, k + 1) : f = [f[0]];
					break
				}
			}
		}
	return f.reduceRight((D, A, N) => {
		let b, w = !1,
			j = null,
			B = null;
		o && (b = m && A.route.id ? m[A.route.id] : void 0, j = A.route.errorElement || xf, y && (k < 0 && N === 0 ? (m2("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), w = !0, B = null) : k === N && (w = !0, B = A.route.hydrateFallbackElement || null)));
		let L = s.concat(f.slice(0, N + 1)),
			P = () => {
				let F;
				return b ? F = j : w ? F = B : A.route.Component ? F = g.createElement(A.route.Component, null) : A.route.element ? F = A.route.element : F = D, g.createElement(yf, {
					match: A,
					routeContext: {
						outlet: D,
						matches: L,
						isDataRoute: o != null
					},
					children: F
				})
			};
		return o && (A.route.ErrorBoundary || A.route.errorElement || N === 0) ? g.createElement(vf, {
			location: o.location,
			revalidation: o.revalidation,
			component: j,
			error: b,
			children: P(),
			routeContext: {
				outlet: null,
				matches: L,
				isDataRoute: !0
			}
		}) : P()
	}, null)
}

function Fi(u) {
	return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}

function wf(u) {
	let s = g.useContext(ln);
	return Fe(s, Fi(u)), s
}

function Af(u) {
	let s = g.useContext(xl);
	return Fe(s, Fi(u)), s
}

function Cf(u) {
	let s = g.useContext(Nt);
	return Fe(s, Fi(u)), s
}

function Ni(u) {
	let s = Cf(u),
		o = s.matches[s.matches.length - 1];
	return Fe(o.route.id, `${u} can only be used on routes that contain a unique "id"`), o.route.id
}

function Ef() {
	return Ni("useRouteId")
}

function kf() {
	var d;
	let u = g.useContext(Bi),
		s = Af("useRouteError"),
		o = Ni("useRouteError");
	return u !== void 0 ? u : (d = s.errors) == null ? void 0 : d[o]
}

function Sf() {
	let {
		router: u
	} = wf("useNavigate"), s = Ni("useNavigate"), o = g.useRef(!1);
	return f2(() => {
		o.current = !0
	}), g.useCallback(async (f, m = {}) => {
		Bt(o.current, d2), o.current && (typeof f == "number" ? u.navigate(f) : await u.navigate(f, {
			fromRouteId: s,
			...m
		}))
	}, [u, s])
}
var Vc = {};

function m2(u, s, o) {
	!s && !Vc[u] && (Vc[u] = !0, Bt(!1, o))
}
g.memo(jf);

function jf({
	routes: u,
	future: s,
	state: o
}) {
	return p2(u, void 0, o, s)
}

function ir(u) {
	Fe(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")
}

function Bf({
	basename: u = "/",
	children: s = null,
	location: o,
	navigationType: d = "POP",
	navigator: f,
	static: m = !1
}) {
	Fe(!Xn(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
	let y = u.replace(/^\/*/, "/"),
		k = g.useMemo(() => ({
			basename: y,
			navigator: f,
			static: m,
			future: {}
		}), [y, f, m]);
	typeof o == "string" && (o = un(o));
	let {
		pathname: D = "/",
		search: A = "",
		hash: N = "",
		state: b = null,
		key: w = "default"
	} = o, j = g.useMemo(() => {
		let B = Ot(D, y);
		return B == null ? null : {
			location: {
				pathname: B,
				search: A,
				hash: N,
				state: b,
				key: w
			},
			navigationType: d
		}
	}, [y, D, A, N, b, w, d]);
	return Bt(j != null, `<Router basename="${y}"> is not able to match the URL "${D}${A}${N}" because it does not start with the basename, so the <Router> won't render anything.`), j == null ? null : g.createElement(Ft.Provider, {
		value: k
	}, g.createElement(Zn.Provider, {
		children: s,
		value: j
	}))
}

function Ff({
	children: u,
	location: s
}) {
	return hf(Ci(u), s)
}

function Ci(u, s = []) {
	let o = [];
	return g.Children.forEach(u, (d, f) => {
		if (!g.isValidElement(d)) return;
		let m = [...s, f];
		if (d.type === g.Fragment) {
			o.push.apply(o, Ci(d.props.children, m));
			return
		}
		Fe(d.type === ir, `[${typeof d.type=="string"?d.type:d.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`), Fe(!d.props.index || !d.props.children, "An index route cannot have child routes.");
		let y = {
			id: d.props.id || m.join("-"),
			caseSensitive: d.props.caseSensitive,
			element: d.props.element,
			Component: d.props.Component,
			index: d.props.index,
			path: d.props.path,
			loader: d.props.loader,
			action: d.props.action,
			hydrateFallbackElement: d.props.hydrateFallbackElement,
			HydrateFallback: d.props.HydrateFallback,
			errorElement: d.props.errorElement,
			ErrorBoundary: d.props.ErrorBoundary,
			hasErrorBoundary: d.props.hasErrorBoundary === !0 || d.props.ErrorBoundary != null || d.props.errorElement != null,
			shouldRevalidate: d.props.shouldRevalidate,
			handle: d.props.handle,
			lazy: d.props.lazy
		};
		d.props.children && (y.children = Ci(d.props.children, m)), o.push(y)
	}), o
}
var fl = "get",
	pl = "application/x-www-form-urlencoded";

function Dl(u) {
	return u != null && typeof u.tagName == "string"
}

function Nf(u) {
	return Dl(u) && u.tagName.toLowerCase() === "button"
}

function _f(u) {
	return Dl(u) && u.tagName.toLowerCase() === "form"
}

function bf(u) {
	return Dl(u) && u.tagName.toLowerCase() === "input"
}

function Lf(u) {
	return !!(u.metaKey || u.altKey || u.ctrlKey || u.shiftKey)
}

function qf(u, s) {
	return u.button === 0 && (!s || s === "_self") && !Lf(u)
}
var dl = null;

function Rf() {
	if (dl === null) try {
		new FormData(document.createElement("form"), 0), dl = !1
	} catch {
		dl = !0
	}
	return dl
}
var Tf = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);

function Di(u) {
	return u != null && !Tf.has(u) ? (Bt(!1, `"${u}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${pl}"`), null) : u
}

function Pf(u, s) {
	let o, d, f, m, y;
	if (_f(u)) {
		let k = u.getAttribute("action");
		d = k ? Ot(k, s) : null, o = u.getAttribute("method") || fl, f = Di(u.getAttribute("enctype")) || pl, m = new FormData(u)
	} else if (Nf(u) || bf(u) && (u.type === "submit" || u.type === "image")) {
		let k = u.form;
		if (k == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
		let D = u.getAttribute("formaction") || k.getAttribute("action");
		if (d = D ? Ot(D, s) : null, o = u.getAttribute("formmethod") || k.getAttribute("method") || fl, f = Di(u.getAttribute("formenctype")) || Di(k.getAttribute("enctype")) || pl, m = new FormData(k, u), !Rf()) {
			let {
				name: A,
				type: N,
				value: b
			} = u;
			if (N === "image") {
				let w = A ? `${A}.` : "";
				m.append(`${w}x`, "0"), m.append(`${w}y`, "0")
			} else A && m.append(A, b)
		}
	} else {
		if (Dl(u)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
		o = fl, d = null, f = pl, y = u
	}
	return m && f === "text/plain" && (y = m, m = void 0), {
		action: d,
		method: o.toLowerCase(),
		encType: f,
		formData: m,
		body: y
	}
}

function _i(u, s) {
	if (u === !1 || u === null || typeof u > "u") throw new Error(s)
}
async function If(u, s) {
	if (u.id in s) return s[u.id];
	try {
		let o = await import(u.module);
		return s[u.id] = o, o
	} catch (o) {
		return console.error(`Error loading route module \`${u.module}\`, reloading page...`), console.error(o), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {})
	}
}

function zf(u) {
	return u == null ? !1 : u.href == null ? u.rel === "preload" && typeof u.imageSrcSet == "string" && typeof u.imageSizes == "string" : typeof u.rel == "string" && typeof u.href == "string"
}
async function Mf(u, s, o) {
	let d = await Promise.all(u.map(async f => {
		let m = s.routes[f.route.id];
		if (m) {
			let y = await If(m, o);
			return y.links ? y.links() : []
		}
		return []
	}));
	return Hf(d.flat(1).filter(zf).filter(f => f.rel === "stylesheet" || f.rel === "preload").map(f => f.rel === "stylesheet" ? {
		...f,
		rel: "prefetch",
		as: "style"
	} : {
		...f,
		rel: "prefetch"
	}))
}

function Hc(u, s, o, d, f, m) {
	let y = (D, A) => o[A] ? D.route.id !== o[A].route.id : !0,
		k = (D, A) => {
			var N;
			return o[A].pathname !== D.pathname || ((N = o[A].route.path) == null ? void 0 : N.endsWith("*")) && o[A].params["*"] !== D.params["*"]
		};
	return m === "assets" ? s.filter((D, A) => y(D, A) || k(D, A)) : m === "data" ? s.filter((D, A) => {
		var b;
		let N = d.routes[D.route.id];
		if (!N || !N.hasLoader) return !1;
		if (y(D, A) || k(D, A)) return !0;
		if (D.route.shouldRevalidate) {
			let w = D.route.shouldRevalidate({
				currentUrl: new URL(f.pathname + f.search + f.hash, window.origin),
				currentParams: ((b = o[0]) == null ? void 0 : b.params) || {},
				nextUrl: new URL(u, window.origin),
				nextParams: D.params,
				defaultShouldRevalidate: !0
			});
			if (typeof w == "boolean") return w
		}
		return !0
	}) : []
}

function Of(u, s, {
	includeHydrateFallback: o
} = {}) {
	return Uf(u.map(d => {
		let f = s.routes[d.route.id];
		if (!f) return [];
		let m = [f.module];
		return f.clientActionModule && (m = m.concat(f.clientActionModule)), f.clientLoaderModule && (m = m.concat(f.clientLoaderModule)), o && f.hydrateFallbackModule && (m = m.concat(f.hydrateFallbackModule)), f.imports && (m = m.concat(f.imports)), m
	}).flat(1))
}

function Uf(u) {
	return [...new Set(u)]
}

function Vf(u) {
	let s = {},
		o = Object.keys(u).sort();
	for (let d of o) s[d] = u[d];
	return s
}

function Hf(u, s) {
	let o = new Set;
	return new Set(s), u.reduce((d, f) => {
		let m = JSON.stringify(Vf(f));
		return o.has(m) || (o.add(m), d.push({
			key: m,
			link: f
		})), d
	}, [])
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var $f = new Set([100, 101, 204, 205]);

function Gf(u, s) {
	let o = typeof u == "string" ? new URL(u, typeof window > "u" ? "server://singlefetch/" : window.location.origin) : u;
	return o.pathname === "/" ? o.pathname = "_root.data" : s && Ot(o.pathname, s) === "/" ? o.pathname = `${s.replace(/\/$/,"")}/_root.data` : o.pathname = `${o.pathname.replace(/\/$/,"")}.data`, o
}

function h2() {
	let u = g.useContext(ln);
	return _i(u, "You must render this element inside a <DataRouterContext.Provider> element"), u
}

function Wf() {
	let u = g.useContext(xl);
	return _i(u, "You must render this element inside a <DataRouterStateContext.Provider> element"), u
}
var bi = g.createContext(void 0);
bi.displayName = "FrameworkContext";

function g2() {
	let u = g.useContext(bi);
	return _i(u, "You must render this element inside a <HydratedRouter> element"), u
}

function Qf(u, s) {
	let o = g.useContext(bi),
		[d, f] = g.useState(!1),
		[m, y] = g.useState(!1),
		{
			onFocus: k,
			onBlur: D,
			onMouseEnter: A,
			onMouseLeave: N,
			onTouchStart: b
		} = s,
		w = g.useRef(null);
	g.useEffect(() => {
		if (u === "render" && y(!0), u === "viewport") {
			let L = F => {
					F.forEach(z => {
						y(z.isIntersecting)
					})
				},
				P = new IntersectionObserver(L, {
					threshold: .5
				});
			return w.current && P.observe(w.current), () => {
				P.disconnect()
			}
		}
	}, [u]), g.useEffect(() => {
		if (d) {
			let L = setTimeout(() => {
				y(!0)
			}, 100);
			return () => {
				clearTimeout(L)
			}
		}
	}, [d]);
	let j = () => {
			f(!0)
		},
		B = () => {
			f(!1), y(!1)
		};
	return o ? u !== "intent" ? [m, w, {}] : [m, w, {
		onFocus: Kn(k, j),
		onBlur: Kn(D, B),
		onMouseEnter: Kn(A, j),
		onMouseLeave: Kn(N, B),
		onTouchStart: Kn(b, j)
	}] : [!1, w, {}]
}

function Kn(u, s) {
	return o => {
		u && u(o), o.defaultPrevented || s(o)
	}
}

function Kf({
	page: u,
	...s
}) {
	let {
		router: o
	} = h2(), d = g.useMemo(() => u2(o.routes, u, o.basename), [o.routes, u, o.basename]);
	return d ? g.createElement(Jf, {
		page: u,
		matches: d,
		...s
	}) : null
}

function Yf(u) {
	let {
		manifest: s,
		routeModules: o
	} = g2(), [d, f] = g.useState([]);
	return g.useEffect(() => {
		let m = !1;
		return Mf(u, s, o).then(y => {
			m || f(y)
		}), () => {
			m = !0
		}
	}, [u, s, o]), d
}

function Jf({
	page: u,
	matches: s,
	...o
}) {
	let d = sr(),
		{
			manifest: f,
			routeModules: m
		} = g2(),
		{
			basename: y
		} = h2(),
		{
			loaderData: k,
			matches: D
		} = Wf(),
		A = g.useMemo(() => Hc(u, s, D, f, d, "data"), [u, s, D, f, d]),
		N = g.useMemo(() => Hc(u, s, D, f, d, "assets"), [u, s, D, f, d]),
		b = g.useMemo(() => {
			if (u === d.pathname + d.search + d.hash) return [];
			let B = new Set,
				L = !1;
			if (s.forEach(F => {
					var W;
					let z = f.routes[F.route.id];
					!z || !z.hasLoader || (!A.some(V => V.route.id === F.route.id) && F.route.id in k && ((W = m[F.route.id]) != null && W.shouldRevalidate) || z.hasClientLoader ? L = !0 : B.add(F.route.id))
				}), B.size === 0) return [];
			let P = Gf(u, y);
			return L && B.size > 0 && P.searchParams.set("_routes", s.filter(F => B.has(F.route.id)).map(F => F.route.id).join(",")), [P.pathname + P.search]
		}, [y, k, d, f, A, s, u, m]),
		w = g.useMemo(() => Of(N, f), [N, f]),
		j = Yf(N);
	return g.createElement(g.Fragment, null, b.map(B => g.createElement("link", {
		key: B,
		rel: "prefetch",
		as: "fetch",
		href: B,
		...o
	})), w.map(B => g.createElement("link", {
		key: B,
		rel: "modulepreload",
		href: B,
		...o
	})), j.map(({
		key: B,
		link: L
	}) => g.createElement("link", {
		key: B,
		...L
	})))
}

function Zf(...u) {
	return s => {
		u.forEach(o => {
			typeof o == "function" ? o(s) : o != null && (o.current = s)
		})
	}
}
var x2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
	x2 && (window.__reactRouterVersion = "7.6.2")
} catch {}

function Xf({
	basename: u,
	children: s,
	window: o
}) {
	let d = g.useRef();
	d.current == null && (d.current = z0({
		window: o,
		v5Compat: !0
	}));
	let f = d.current,
		[m, y] = g.useState({
			action: f.action,
			location: f.location
		}),
		k = g.useCallback(D => {
			g.startTransition(() => y(D))
		}, [y]);
	return g.useLayoutEffect(() => f.listen(k), [f, k]), g.createElement(Bf, {
		basename: u,
		children: s,
		location: m.location,
		navigationType: m.action,
		navigator: f
	})
}
var v2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
	Pe = g.forwardRef(function({
		onClick: s,
		discover: o = "render",
		prefetch: d = "none",
		relative: f,
		reloadDocument: m,
		replace: y,
		state: k,
		target: D,
		to: A,
		preventScrollReset: N,
		viewTransition: b,
		...w
	}, j) {
		let {
			basename: B
		} = g.useContext(Ft), L = typeof A == "string" && v2.test(A), P, F = !1;
		if (typeof A == "string" && L && (P = A, x2)) try {
			let Z = new URL(window.location.href),
				de = A.startsWith("//") ? new URL(Z.protocol + A) : new URL(A),
				pe = Ot(de.pathname, B);
			de.origin === Z.origin && pe != null ? A = pe + de.search + de.hash : F = !0
		} catch {
			Bt(!1, `<Link to="${A}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)
		}
		let z = pf(A, {
				relative: f
			}),
			[W, V, I] = Qf(d, w),
			J = np(A, {
				replace: y,
				state: k,
				target: D,
				preventScrollReset: N,
				relative: f,
				viewTransition: b
			});

		function H(Z) {
			s && s(Z), Z.defaultPrevented || J(Z)
		}
		let $ = g.createElement("a", {
			...w,
			...I,
			href: P || z,
			onClick: F || m ? s : H,
			ref: Zf(j, V),
			target: D,
			"data-discover": !L && o === "render" ? "true" : void 0
		});
		return W && !L ? g.createElement(g.Fragment, null, $, g.createElement(Kf, {
			page: z
		})) : $
	});
Pe.displayName = "Link";
var ep = g.forwardRef(function({
	"aria-current": s = "page",
	caseSensitive: o = !1,
	className: d = "",
	end: f = !1,
	style: m,
	to: y,
	viewTransition: k,
	children: D,
	...A
}, N) {
	let b = eu(y, {
			relative: A.relative
		}),
		w = sr(),
		j = g.useContext(xl),
		{
			navigator: B,
			basename: L
		} = g.useContext(Ft),
		P = j != null && op(b) && k === !0,
		F = B.encodeLocation ? B.encodeLocation(b).pathname : b.pathname,
		z = w.pathname,
		W = j && j.navigation && j.navigation.location ? j.navigation.location.pathname : null;
	o || (z = z.toLowerCase(), W = W ? W.toLowerCase() : null, F = F.toLowerCase()), W && L && (W = Ot(W, L) || W);
	const V = F !== "/" && F.endsWith("/") ? F.length - 1 : F.length;
	let I = z === F || !f && z.startsWith(F) && z.charAt(V) === "/",
		J = W != null && (W === F || !f && W.startsWith(F) && W.charAt(F.length) === "/"),
		H = {
			isActive: I,
			isPending: J,
			isTransitioning: P
		},
		$ = I ? s : void 0,
		Z;
	typeof d == "function" ? Z = d(H) : Z = [d, I ? "active" : null, J ? "pending" : null, P ? "transitioning" : null].filter(Boolean).join(" ");
	let de = typeof m == "function" ? m(H) : m;
	return g.createElement(Pe, {
		...A,
		"aria-current": $,
		className: Z,
		ref: N,
		style: de,
		to: y,
		viewTransition: k
	}, typeof D == "function" ? D(H) : D)
});
ep.displayName = "NavLink";
var tp = g.forwardRef(({
	discover: u = "render",
	fetcherKey: s,
	navigate: o,
	reloadDocument: d,
	replace: f,
	state: m,
	method: y = fl,
	action: k,
	onSubmit: D,
	relative: A,
	preventScrollReset: N,
	viewTransition: b,
	...w
}, j) => {
	let B = ap(),
		L = ip(k, {
			relative: A
		}),
		P = y.toLowerCase() === "get" ? "get" : "post",
		F = typeof k == "string" && v2.test(k),
		z = W => {
			if (D && D(W), W.defaultPrevented) return;
			W.preventDefault();
			let V = W.nativeEvent.submitter,
				I = (V == null ? void 0 : V.getAttribute("formmethod")) || y;
			B(V || W.currentTarget, {
				fetcherKey: s,
				method: I,
				navigate: o,
				replace: f,
				state: m,
				relative: A,
				preventScrollReset: N,
				viewTransition: b
			})
		};
	return g.createElement("form", {
		ref: j,
		method: P,
		action: L,
		onSubmit: d ? D : z,
		...w,
		"data-discover": !F && u === "render" ? "true" : void 0
	})
});
tp.displayName = "Form";

function rp(u) {
	return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}

function y2(u) {
	let s = g.useContext(ln);
	return Fe(s, rp(u)), s
}

function np(u, {
	target: s,
	replace: o,
	state: d,
	preventScrollReset: f,
	relative: m,
	viewTransition: y
} = {}) {
	let k = vl(),
		D = sr(),
		A = eu(u, {
			relative: m
		});
	return g.useCallback(N => {
		if (qf(N, s)) {
			N.preventDefault();
			let b = o !== void 0 ? o : Jn(D) === Jn(A);
			k(u, {
				replace: b,
				state: d,
				preventScrollReset: f,
				relative: m,
				viewTransition: y
			})
		}
	}, [D, k, A, o, d, s, u, f, m, y])
}
var up = 0,
	lp = () => `__${String(++up)}__`;

function ap() {
	let {
		router: u
	} = y2("useSubmit"), {
		basename: s
	} = g.useContext(Ft), o = Ef();
	return g.useCallback(async (d, f = {}) => {
		let {
			action: m,
			method: y,
			encType: k,
			formData: D,
			body: A
		} = Pf(d, s);
		if (f.navigate === !1) {
			let N = f.fetcherKey || lp();
			await u.fetch(N, o, f.action || m, {
				preventScrollReset: f.preventScrollReset,
				formData: D,
				body: A,
				formMethod: f.method || y,
				formEncType: f.encType || k,
				flushSync: f.flushSync
			})
		} else await u.navigate(f.action || m, {
			preventScrollReset: f.preventScrollReset,
			formData: D,
			body: A,
			formMethod: f.method || y,
			formEncType: f.encType || k,
			replace: f.replace,
			state: f.state,
			fromRouteId: o,
			flushSync: f.flushSync,
			viewTransition: f.viewTransition
		})
	}, [u, s, o])
}

function ip(u, {
	relative: s
} = {}) {
	let {
		basename: o
	} = g.useContext(Ft), d = g.useContext(Nt);
	Fe(d, "useFormAction must be used inside a RouteContext");
	let [f] = d.matches.slice(-1), m = {
		...eu(u || ".", {
			relative: s
		})
	}, y = sr();
	if (u == null) {
		m.search = y.search;
		let k = new URLSearchParams(m.search),
			D = k.getAll("index");
		if (D.some(N => N === "")) {
			k.delete("index"), D.filter(b => b).forEach(b => k.append("index", b));
			let N = k.toString();
			m.search = N ? `?${N}` : ""
		}
	}
	return (!u || u === ".") && f.route.index && (m.search = m.search ? m.search.replace(/^\?/, "?index&") : "?index"), o !== "/" && (m.pathname = m.pathname === "/" ? o : Mt([o, m.pathname])), Jn(m)
}

function op(u, s = {}) {
	let o = g.useContext(c2);
	Fe(o != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
	let {
		basename: d
	} = y2("useViewTransitionState"), f = eu(u, {
		relative: s.relative
	});
	if (!o.isTransitioning) return !1;
	let m = Ot(o.currentLocation.pathname, d) || o.currentLocation.pathname,
		y = Ot(o.nextLocation.pathname, d) || o.nextLocation.pathname;
	return ml(f.pathname, y) != null || ml(f.pathname, m) != null
} [...$f];
const _t = "https://jiosaavn-api-lime.vercel.app/api/",
	Li = async u => {
		try {
			const s = await fetch(`${_t}songs/${u}/suggestions?&limit=30`),
				o = await s.json();
			if (!s.ok) throw new Error(o.message || "Failed to Fetch Artist Data");
			return o
		} catch {
			throw console.log("API Error: ", Error), Error
		}
	}, sp = async u => {
		try {
			const s = await fetch(`${_t}search?query=${u}&limit=30`),
				o = await s.json();
			if (!s.ok) throw new Error(o.message || "Failed to Fetch Artist Data");
			return o
		} catch {
			throw console.log("API Error: ", Error), Error
		}
	}, D2 = async (u, s) => {
		try {
			const o = await fetch(`${_t}search/songs?query=${u}&limit=${s}`),
				d = await o.json();
			if (!o.ok) throw new Error(d.message || "Failed to Fetch Artist Data");
			return d
		} catch {
			throw console.log("API Error: ", Error), Error
		}
	}, cp = async (u, s) => {
		try {
			const o = await fetch(`${_t}search/artists?query=${u}&limit=${s}`),
				d = await o.json();
			if (!o.ok) throw new Error(d.message || "Failed to Fetch Artist Data");
			return d
		} catch {
			throw console.log("API Error: ", Error), Error
		}
	}, dp = async u => {
		try {
			const s = await fetch(`${_t}songs/${u}`),
				o = await s.json();
			if (!s.ok) throw new Error(`Failed to fetch song: ${s.status} ${s.statusText}`);
			return o
		} catch (s) {
			throw console.error("Error fetching song:", s), s
		}
	}, w2 = async u => {
		try {
			const s = await fetch(`${_t}search/albums?query=${u}&limit=30`),
				o = await s.json();
			if (!s.ok) throw new Error(o.message || "Failed to fetch Album data");
			return o
		} catch (s) {
			throw console.error("API Error:", s), s
		}
	}, fp = async u => {
		try {
			const s = await fetch(`${_t}search/artists?query=${u}&limit=15`),
				o = await s.json();
			if (!s.ok) throw new Error(o.message || "Failed to Fetch Artist Data");
			return o
		} catch {
			throw console.log("API Error: ", Error), Error
		}
	}, pp = async u => {
		try {
			const s = await fetch(`${_t}albums?id=${u}&limit=30`),
				o = await s.json();
			if (!s.ok) throw new Error(o.message || "Failed to Fetch Artist Data");
			return o
		} catch {
			throw console.log("API Error: ", Error), Error
		}
	}, A2 = async u => {
		try {
			const s = await fetch(`${_t}search/playlists?query=${u}&limit=20`),
				o = await s.json();
			if (!s.ok) throw new Error(o.message || "Failed to Fetch Artist Data");
			return o
		} catch {
			throw console.log("API Error: ", Error), Error
		}
	}, Ei = async u => {
		try {
			const s = await fetch(`${_t}playlists?id=${u}&limit=40`),
				o = await s.json();
			if (!s.ok) throw new Error(o.message || "Failed to Fetch Artist Data");
			return o
		} catch {
			throw console.log("API Error: ", Error), Error
		}
	}, an = g.createContext();
var Yn = {
	exports: {}
}; /*! https://mths.be/he v1.2.0 by @mathias | MIT license */
var mp = Yn.exports,
	$c;

function hp() {
	return $c || ($c = 1, function(u, s) {
		(function(o) {
			var d = s,
				f = u && u.exports == d && u,
				m = typeof Fc == "object" && Fc;
			(m.global === m || m.window === m) && (o = m);
			var y = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
				k = /[\x01-\x7F]/g,
				D = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
				A = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g,
				N = {
					"­": "shy",
					"‌": "zwnj",
					"‍": "zwj",
					"‎": "lrm",
					"⁣": "ic",
					"⁢": "it",
					"⁡": "af",
					"‏": "rlm",
					"​": "ZeroWidthSpace",
					"⁠": "NoBreak",
					"̑": "DownBreve",
					"⃛": "tdot",
					"⃜": "DotDot",
					"	": "Tab",
					"\n": "NewLine",
					" ": "puncsp",
					" ": "MediumSpace",
					" ": "thinsp",
					" ": "hairsp",
					" ": "emsp13",
					" ": "ensp",
					" ": "emsp14",
					" ": "emsp",
					" ": "numsp",
					" ": "nbsp",
					"  ": "ThickSpace",
					"‾": "oline",
					_: "lowbar",
					"‐": "dash",
					"–": "ndash",
					"—": "mdash",
					"―": "horbar",
					",": "comma",
					";": "semi",
					"⁏": "bsemi",
					":": "colon",
					"⩴": "Colone",
					"!": "excl",
					"¡": "iexcl",
					"?": "quest",
					"¿": "iquest",
					".": "period",
					"‥": "nldr",
					"…": "mldr",
					"·": "middot",
					"'": "apos",
					"‘": "lsquo",
					"’": "rsquo",
					"‚": "sbquo",
					"‹": "lsaquo",
					"›": "rsaquo",
					'"': "quot",
					"“": "ldquo",
					"”": "rdquo",
					"„": "bdquo",
					"«": "laquo",
					"»": "raquo",
					"(": "lpar",
					")": "rpar",
					"[": "lsqb",
					"]": "rsqb",
					"{": "lcub",
					"}": "rcub",
					"⌈": "lceil",
					"⌉": "rceil",
					"⌊": "lfloor",
					"⌋": "rfloor",
					"⦅": "lopar",
					"⦆": "ropar",
					"⦋": "lbrke",
					"⦌": "rbrke",
					"⦍": "lbrkslu",
					"⦎": "rbrksld",
					"⦏": "lbrksld",
					"⦐": "rbrkslu",
					"⦑": "langd",
					"⦒": "rangd",
					"⦓": "lparlt",
					"⦔": "rpargt",
					"⦕": "gtlPar",
					"⦖": "ltrPar",
					"⟦": "lobrk",
					"⟧": "robrk",
					"⟨": "lang",
					"⟩": "rang",
					"⟪": "Lang",
					"⟫": "Rang",
					"⟬": "loang",
					"⟭": "roang",
					"❲": "lbbrk",
					"❳": "rbbrk",
					"‖": "Vert",
					"§": "sect",
					"¶": "para",
					"@": "commat",
					"*": "ast",
					"/": "sol",
					undefined: null,
					"&": "amp",
					"#": "num",
					"%": "percnt",
					"‰": "permil",
					"‱": "pertenk",
					"†": "dagger",
					"‡": "Dagger",
					"•": "bull",
					"⁃": "hybull",
					"′": "prime",
					"″": "Prime",
					"‴": "tprime",
					"⁗": "qprime",
					"‵": "bprime",
					"⁁": "caret",
					"`": "grave",
					"´": "acute",
					"˜": "tilde",
					"^": "Hat",
					"¯": "macr",
					"˘": "breve",
					"˙": "dot",
					"¨": "die",
					"˚": "ring",
					"˝": "dblac",
					"¸": "cedil",
					"˛": "ogon",
					"ˆ": "circ",
					"ˇ": "caron",
					"°": "deg",
					"©": "copy",
					"®": "reg",
					"℗": "copysr",
					"℘": "wp",
					"℞": "rx",
					"℧": "mho",
					"℩": "iiota",
					"←": "larr",
					"↚": "nlarr",
					"→": "rarr",
					"↛": "nrarr",
					"↑": "uarr",
					"↓": "darr",
					"↔": "harr",
					"↮": "nharr",
					"↕": "varr",
					"↖": "nwarr",
					"↗": "nearr",
					"↘": "searr",
					"↙": "swarr",
					"↝": "rarrw",
					"↝̸": "nrarrw",
					"↞": "Larr",
					"↟": "Uarr",
					"↠": "Rarr",
					"↡": "Darr",
					"↢": "larrtl",
					"↣": "rarrtl",
					"↤": "mapstoleft",
					"↥": "mapstoup",
					"↦": "map",
					"↧": "mapstodown",
					"↩": "larrhk",
					"↪": "rarrhk",
					"↫": "larrlp",
					"↬": "rarrlp",
					"↭": "harrw",
					"↰": "lsh",
					"↱": "rsh",
					"↲": "ldsh",
					"↳": "rdsh",
					"↵": "crarr",
					"↶": "cularr",
					"↷": "curarr",
					"↺": "olarr",
					"↻": "orarr",
					"↼": "lharu",
					"↽": "lhard",
					"↾": "uharr",
					"↿": "uharl",
					"⇀": "rharu",
					"⇁": "rhard",
					"⇂": "dharr",
					"⇃": "dharl",
					"⇄": "rlarr",
					"⇅": "udarr",
					"⇆": "lrarr",
					"⇇": "llarr",
					"⇈": "uuarr",
					"⇉": "rrarr",
					"⇊": "ddarr",
					"⇋": "lrhar",
					"⇌": "rlhar",
					"⇐": "lArr",
					"⇍": "nlArr",
					"⇑": "uArr",
					"⇒": "rArr",
					"⇏": "nrArr",
					"⇓": "dArr",
					"⇔": "iff",
					"⇎": "nhArr",
					"⇕": "vArr",
					"⇖": "nwArr",
					"⇗": "neArr",
					"⇘": "seArr",
					"⇙": "swArr",
					"⇚": "lAarr",
					"⇛": "rAarr",
					"⇝": "zigrarr",
					"⇤": "larrb",
					"⇥": "rarrb",
					"⇵": "duarr",
					"⇽": "loarr",
					"⇾": "roarr",
					"⇿": "hoarr",
					"∀": "forall",
					"∁": "comp",
					"∂": "part",
					"∂̸": "npart",
					"∃": "exist",
					"∄": "nexist",
					"∅": "empty",
					"∇": "Del",
					"∈": "in",
					"∉": "notin",
					"∋": "ni",
					"∌": "notni",
					"϶": "bepsi",
					"∏": "prod",
					"∐": "coprod",
					"∑": "sum",
					"+": "plus",
					"±": "pm",
					"÷": "div",
					"×": "times",
					"<": "lt",
					"≮": "nlt",
					"<⃒": "nvlt",
					"=": "equals",
					"≠": "ne",
					"=⃥": "bne",
					"⩵": "Equal",
					">": "gt",
					"≯": "ngt",
					">⃒": "nvgt",
					"¬": "not",
					"|": "vert",
					"¦": "brvbar",
					"−": "minus",
					"∓": "mp",
					"∔": "plusdo",
					"⁄": "frasl",
					"∖": "setmn",
					"∗": "lowast",
					"∘": "compfn",
					"√": "Sqrt",
					"∝": "prop",
					"∞": "infin",
					"∟": "angrt",
					"∠": "ang",
					"∠⃒": "nang",
					"∡": "angmsd",
					"∢": "angsph",
					"∣": "mid",
					"∤": "nmid",
					"∥": "par",
					"∦": "npar",
					"∧": "and",
					"∨": "or",
					"∩": "cap",
					"∩︀": "caps",
					"∪": "cup",
					"∪︀": "cups",
					"∫": "int",
					"∬": "Int",
					"∭": "tint",
					"⨌": "qint",
					"∮": "oint",
					"∯": "Conint",
					"∰": "Cconint",
					"∱": "cwint",
					"∲": "cwconint",
					"∳": "awconint",
					"∴": "there4",
					"∵": "becaus",
					"∶": "ratio",
					"∷": "Colon",
					"∸": "minusd",
					"∺": "mDDot",
					"∻": "homtht",
					"∼": "sim",
					"≁": "nsim",
					"∼⃒": "nvsim",
					"∽": "bsim",
					"∽̱": "race",
					"∾": "ac",
					"∾̳": "acE",
					"∿": "acd",
					"≀": "wr",
					"≂": "esim",
					"≂̸": "nesim",
					"≃": "sime",
					"≄": "nsime",
					"≅": "cong",
					"≇": "ncong",
					"≆": "simne",
					"≈": "ap",
					"≉": "nap",
					"≊": "ape",
					"≋": "apid",
					"≋̸": "napid",
					"≌": "bcong",
					"≍": "CupCap",
					"≭": "NotCupCap",
					"≍⃒": "nvap",
					"≎": "bump",
					"≎̸": "nbump",
					"≏": "bumpe",
					"≏̸": "nbumpe",
					"≐": "doteq",
					"≐̸": "nedot",
					"≑": "eDot",
					"≒": "efDot",
					"≓": "erDot",
					"≔": "colone",
					"≕": "ecolon",
					"≖": "ecir",
					"≗": "cire",
					"≙": "wedgeq",
					"≚": "veeeq",
					"≜": "trie",
					"≟": "equest",
					"≡": "equiv",
					"≢": "nequiv",
					"≡⃥": "bnequiv",
					"≤": "le",
					"≰": "nle",
					"≤⃒": "nvle",
					"≥": "ge",
					"≱": "nge",
					"≥⃒": "nvge",
					"≦": "lE",
					"≦̸": "nlE",
					"≧": "gE",
					"≧̸": "ngE",
					"≨︀": "lvnE",
					"≨": "lnE",
					"≩": "gnE",
					"≩︀": "gvnE",
					"≪": "ll",
					"≪̸": "nLtv",
					"≪⃒": "nLt",
					"≫": "gg",
					"≫̸": "nGtv",
					"≫⃒": "nGt",
					"≬": "twixt",
					"≲": "lsim",
					"≴": "nlsim",
					"≳": "gsim",
					"≵": "ngsim",
					"≶": "lg",
					"≸": "ntlg",
					"≷": "gl",
					"≹": "ntgl",
					"≺": "pr",
					"⊀": "npr",
					"≻": "sc",
					"⊁": "nsc",
					"≼": "prcue",
					"⋠": "nprcue",
					"≽": "sccue",
					"⋡": "nsccue",
					"≾": "prsim",
					"≿": "scsim",
					"≿̸": "NotSucceedsTilde",
					"⊂": "sub",
					"⊄": "nsub",
					"⊂⃒": "vnsub",
					"⊃": "sup",
					"⊅": "nsup",
					"⊃⃒": "vnsup",
					"⊆": "sube",
					"⊈": "nsube",
					"⊇": "supe",
					"⊉": "nsupe",
					"⊊︀": "vsubne",
					"⊊": "subne",
					"⊋︀": "vsupne",
					"⊋": "supne",
					"⊍": "cupdot",
					"⊎": "uplus",
					"⊏": "sqsub",
					"⊏̸": "NotSquareSubset",
					"⊐": "sqsup",
					"⊐̸": "NotSquareSuperset",
					"⊑": "sqsube",
					"⋢": "nsqsube",
					"⊒": "sqsupe",
					"⋣": "nsqsupe",
					"⊓": "sqcap",
					"⊓︀": "sqcaps",
					"⊔": "sqcup",
					"⊔︀": "sqcups",
					"⊕": "oplus",
					"⊖": "ominus",
					"⊗": "otimes",
					"⊘": "osol",
					"⊙": "odot",
					"⊚": "ocir",
					"⊛": "oast",
					"⊝": "odash",
					"⊞": "plusb",
					"⊟": "minusb",
					"⊠": "timesb",
					"⊡": "sdotb",
					"⊢": "vdash",
					"⊬": "nvdash",
					"⊣": "dashv",
					"⊤": "top",
					"⊥": "bot",
					"⊧": "models",
					"⊨": "vDash",
					"⊭": "nvDash",
					"⊩": "Vdash",
					"⊮": "nVdash",
					"⊪": "Vvdash",
					"⊫": "VDash",
					"⊯": "nVDash",
					"⊰": "prurel",
					"⊲": "vltri",
					"⋪": "nltri",
					"⊳": "vrtri",
					"⋫": "nrtri",
					"⊴": "ltrie",
					"⋬": "nltrie",
					"⊴⃒": "nvltrie",
					"⊵": "rtrie",
					"⋭": "nrtrie",
					"⊵⃒": "nvrtrie",
					"⊶": "origof",
					"⊷": "imof",
					"⊸": "mumap",
					"⊹": "hercon",
					"⊺": "intcal",
					"⊻": "veebar",
					"⊽": "barvee",
					"⊾": "angrtvb",
					"⊿": "lrtri",
					"⋀": "Wedge",
					"⋁": "Vee",
					"⋂": "xcap",
					"⋃": "xcup",
					"⋄": "diam",
					"⋅": "sdot",
					"⋆": "Star",
					"⋇": "divonx",
					"⋈": "bowtie",
					"⋉": "ltimes",
					"⋊": "rtimes",
					"⋋": "lthree",
					"⋌": "rthree",
					"⋍": "bsime",
					"⋎": "cuvee",
					"⋏": "cuwed",
					"⋐": "Sub",
					"⋑": "Sup",
					"⋒": "Cap",
					"⋓": "Cup",
					"⋔": "fork",
					"⋕": "epar",
					"⋖": "ltdot",
					"⋗": "gtdot",
					"⋘": "Ll",
					"⋘̸": "nLl",
					"⋙": "Gg",
					"⋙̸": "nGg",
					"⋚︀": "lesg",
					"⋚": "leg",
					"⋛": "gel",
					"⋛︀": "gesl",
					"⋞": "cuepr",
					"⋟": "cuesc",
					"⋦": "lnsim",
					"⋧": "gnsim",
					"⋨": "prnsim",
					"⋩": "scnsim",
					"⋮": "vellip",
					"⋯": "ctdot",
					"⋰": "utdot",
					"⋱": "dtdot",
					"⋲": "disin",
					"⋳": "isinsv",
					"⋴": "isins",
					"⋵": "isindot",
					"⋵̸": "notindot",
					"⋶": "notinvc",
					"⋷": "notinvb",
					"⋹": "isinE",
					"⋹̸": "notinE",
					"⋺": "nisd",
					"⋻": "xnis",
					"⋼": "nis",
					"⋽": "notnivc",
					"⋾": "notnivb",
					"⌅": "barwed",
					"⌆": "Barwed",
					"⌌": "drcrop",
					"⌍": "dlcrop",
					"⌎": "urcrop",
					"⌏": "ulcrop",
					"⌐": "bnot",
					"⌒": "profline",
					"⌓": "profsurf",
					"⌕": "telrec",
					"⌖": "target",
					"⌜": "ulcorn",
					"⌝": "urcorn",
					"⌞": "dlcorn",
					"⌟": "drcorn",
					"⌢": "frown",
					"⌣": "smile",
					"⌭": "cylcty",
					"⌮": "profalar",
					"⌶": "topbot",
					"⌽": "ovbar",
					"⌿": "solbar",
					"⍼": "angzarr",
					"⎰": "lmoust",
					"⎱": "rmoust",
					"⎴": "tbrk",
					"⎵": "bbrk",
					"⎶": "bbrktbrk",
					"⏜": "OverParenthesis",
					"⏝": "UnderParenthesis",
					"⏞": "OverBrace",
					"⏟": "UnderBrace",
					"⏢": "trpezium",
					"⏧": "elinters",
					"␣": "blank",
					"─": "boxh",
					"│": "boxv",
					"┌": "boxdr",
					"┐": "boxdl",
					"└": "boxur",
					"┘": "boxul",
					"├": "boxvr",
					"┤": "boxvl",
					"┬": "boxhd",
					"┴": "boxhu",
					"┼": "boxvh",
					"═": "boxH",
					"║": "boxV",
					"╒": "boxdR",
					"╓": "boxDr",
					"╔": "boxDR",
					"╕": "boxdL",
					"╖": "boxDl",
					"╗": "boxDL",
					"╘": "boxuR",
					"╙": "boxUr",
					"╚": "boxUR",
					"╛": "boxuL",
					"╜": "boxUl",
					"╝": "boxUL",
					"╞": "boxvR",
					"╟": "boxVr",
					"╠": "boxVR",
					"╡": "boxvL",
					"╢": "boxVl",
					"╣": "boxVL",
					"╤": "boxHd",
					"╥": "boxhD",
					"╦": "boxHD",
					"╧": "boxHu",
					"╨": "boxhU",
					"╩": "boxHU",
					"╪": "boxvH",
					"╫": "boxVh",
					"╬": "boxVH",
					"▀": "uhblk",
					"▄": "lhblk",
					"█": "block",
					"░": "blk14",
					"▒": "blk12",
					"▓": "blk34",
					"□": "squ",
					"▪": "squf",
					"▫": "EmptyVerySmallSquare",
					"▭": "rect",
					"▮": "marker",
					"▱": "fltns",
					"△": "xutri",
					"▴": "utrif",
					"▵": "utri",
					"▸": "rtrif",
					"▹": "rtri",
					"▽": "xdtri",
					"▾": "dtrif",
					"▿": "dtri",
					"◂": "ltrif",
					"◃": "ltri",
					"◊": "loz",
					"○": "cir",
					"◬": "tridot",
					"◯": "xcirc",
					"◸": "ultri",
					"◹": "urtri",
					"◺": "lltri",
					"◻": "EmptySmallSquare",
					"◼": "FilledSmallSquare",
					"★": "starf",
					"☆": "star",
					"☎": "phone",
					"♀": "female",
					"♂": "male",
					"♠": "spades",
					"♣": "clubs",
					"♥": "hearts",
					"♦": "diams",
					"♪": "sung",
					"✓": "check",
					"✗": "cross",
					"✠": "malt",
					"✶": "sext",
					"❘": "VerticalSeparator",
					"⟈": "bsolhsub",
					"⟉": "suphsol",
					"⟵": "xlarr",
					"⟶": "xrarr",
					"⟷": "xharr",
					"⟸": "xlArr",
					"⟹": "xrArr",
					"⟺": "xhArr",
					"⟼": "xmap",
					"⟿": "dzigrarr",
					"⤂": "nvlArr",
					"⤃": "nvrArr",
					"⤄": "nvHarr",
					"⤅": "Map",
					"⤌": "lbarr",
					"⤍": "rbarr",
					"⤎": "lBarr",
					"⤏": "rBarr",
					"⤐": "RBarr",
					"⤑": "DDotrahd",
					"⤒": "UpArrowBar",
					"⤓": "DownArrowBar",
					"⤖": "Rarrtl",
					"⤙": "latail",
					"⤚": "ratail",
					"⤛": "lAtail",
					"⤜": "rAtail",
					"⤝": "larrfs",
					"⤞": "rarrfs",
					"⤟": "larrbfs",
					"⤠": "rarrbfs",
					"⤣": "nwarhk",
					"⤤": "nearhk",
					"⤥": "searhk",
					"⤦": "swarhk",
					"⤧": "nwnear",
					"⤨": "toea",
					"⤩": "tosa",
					"⤪": "swnwar",
					"⤳": "rarrc",
					"⤳̸": "nrarrc",
					"⤵": "cudarrr",
					"⤶": "ldca",
					"⤷": "rdca",
					"⤸": "cudarrl",
					"⤹": "larrpl",
					"⤼": "curarrm",
					"⤽": "cularrp",
					"⥅": "rarrpl",
					"⥈": "harrcir",
					"⥉": "Uarrocir",
					"⥊": "lurdshar",
					"⥋": "ldrushar",
					"⥎": "LeftRightVector",
					"⥏": "RightUpDownVector",
					"⥐": "DownLeftRightVector",
					"⥑": "LeftUpDownVector",
					"⥒": "LeftVectorBar",
					"⥓": "RightVectorBar",
					"⥔": "RightUpVectorBar",
					"⥕": "RightDownVectorBar",
					"⥖": "DownLeftVectorBar",
					"⥗": "DownRightVectorBar",
					"⥘": "LeftUpVectorBar",
					"⥙": "LeftDownVectorBar",
					"⥚": "LeftTeeVector",
					"⥛": "RightTeeVector",
					"⥜": "RightUpTeeVector",
					"⥝": "RightDownTeeVector",
					"⥞": "DownLeftTeeVector",
					"⥟": "DownRightTeeVector",
					"⥠": "LeftUpTeeVector",
					"⥡": "LeftDownTeeVector",
					"⥢": "lHar",
					"⥣": "uHar",
					"⥤": "rHar",
					"⥥": "dHar",
					"⥦": "luruhar",
					"⥧": "ldrdhar",
					"⥨": "ruluhar",
					"⥩": "rdldhar",
					"⥪": "lharul",
					"⥫": "llhard",
					"⥬": "rharul",
					"⥭": "lrhard",
					"⥮": "udhar",
					"⥯": "duhar",
					"⥰": "RoundImplies",
					"⥱": "erarr",
					"⥲": "simrarr",
					"⥳": "larrsim",
					"⥴": "rarrsim",
					"⥵": "rarrap",
					"⥶": "ltlarr",
					"⥸": "gtrarr",
					"⥹": "subrarr",
					"⥻": "suplarr",
					"⥼": "lfisht",
					"⥽": "rfisht",
					"⥾": "ufisht",
					"⥿": "dfisht",
					"⦚": "vzigzag",
					"⦜": "vangrt",
					"⦝": "angrtvbd",
					"⦤": "ange",
					"⦥": "range",
					"⦦": "dwangle",
					"⦧": "uwangle",
					"⦨": "angmsdaa",
					"⦩": "angmsdab",
					"⦪": "angmsdac",
					"⦫": "angmsdad",
					"⦬": "angmsdae",
					"⦭": "angmsdaf",
					"⦮": "angmsdag",
					"⦯": "angmsdah",
					"⦰": "bemptyv",
					"⦱": "demptyv",
					"⦲": "cemptyv",
					"⦳": "raemptyv",
					"⦴": "laemptyv",
					"⦵": "ohbar",
					"⦶": "omid",
					"⦷": "opar",
					"⦹": "operp",
					"⦻": "olcross",
					"⦼": "odsold",
					"⦾": "olcir",
					"⦿": "ofcir",
					"⧀": "olt",
					"⧁": "ogt",
					"⧂": "cirscir",
					"⧃": "cirE",
					"⧄": "solb",
					"⧅": "bsolb",
					"⧉": "boxbox",
					"⧍": "trisb",
					"⧎": "rtriltri",
					"⧏": "LeftTriangleBar",
					"⧏̸": "NotLeftTriangleBar",
					"⧐": "RightTriangleBar",
					"⧐̸": "NotRightTriangleBar",
					"⧜": "iinfin",
					"⧝": "infintie",
					"⧞": "nvinfin",
					"⧣": "eparsl",
					"⧤": "smeparsl",
					"⧥": "eqvparsl",
					"⧫": "lozf",
					"⧴": "RuleDelayed",
					"⧶": "dsol",
					"⨀": "xodot",
					"⨁": "xoplus",
					"⨂": "xotime",
					"⨄": "xuplus",
					"⨆": "xsqcup",
					"⨍": "fpartint",
					"⨐": "cirfnint",
					"⨑": "awint",
					"⨒": "rppolint",
					"⨓": "scpolint",
					"⨔": "npolint",
					"⨕": "pointint",
					"⨖": "quatint",
					"⨗": "intlarhk",
					"⨢": "pluscir",
					"⨣": "plusacir",
					"⨤": "simplus",
					"⨥": "plusdu",
					"⨦": "plussim",
					"⨧": "plustwo",
					"⨩": "mcomma",
					"⨪": "minusdu",
					"⨭": "loplus",
					"⨮": "roplus",
					"⨯": "Cross",
					"⨰": "timesd",
					"⨱": "timesbar",
					"⨳": "smashp",
					"⨴": "lotimes",
					"⨵": "rotimes",
					"⨶": "otimesas",
					"⨷": "Otimes",
					"⨸": "odiv",
					"⨹": "triplus",
					"⨺": "triminus",
					"⨻": "tritime",
					"⨼": "iprod",
					"⨿": "amalg",
					"⩀": "capdot",
					"⩂": "ncup",
					"⩃": "ncap",
					"⩄": "capand",
					"⩅": "cupor",
					"⩆": "cupcap",
					"⩇": "capcup",
					"⩈": "cupbrcap",
					"⩉": "capbrcup",
					"⩊": "cupcup",
					"⩋": "capcap",
					"⩌": "ccups",
					"⩍": "ccaps",
					"⩐": "ccupssm",
					"⩓": "And",
					"⩔": "Or",
					"⩕": "andand",
					"⩖": "oror",
					"⩗": "orslope",
					"⩘": "andslope",
					"⩚": "andv",
					"⩛": "orv",
					"⩜": "andd",
					"⩝": "ord",
					"⩟": "wedbar",
					"⩦": "sdote",
					"⩪": "simdot",
					"⩭": "congdot",
					"⩭̸": "ncongdot",
					"⩮": "easter",
					"⩯": "apacir",
					"⩰": "apE",
					"⩰̸": "napE",
					"⩱": "eplus",
					"⩲": "pluse",
					"⩳": "Esim",
					"⩷": "eDDot",
					"⩸": "equivDD",
					"⩹": "ltcir",
					"⩺": "gtcir",
					"⩻": "ltquest",
					"⩼": "gtquest",
					"⩽": "les",
					"⩽̸": "nles",
					"⩾": "ges",
					"⩾̸": "nges",
					"⩿": "lesdot",
					"⪀": "gesdot",
					"⪁": "lesdoto",
					"⪂": "gesdoto",
					"⪃": "lesdotor",
					"⪄": "gesdotol",
					"⪅": "lap",
					"⪆": "gap",
					"⪇": "lne",
					"⪈": "gne",
					"⪉": "lnap",
					"⪊": "gnap",
					"⪋": "lEg",
					"⪌": "gEl",
					"⪍": "lsime",
					"⪎": "gsime",
					"⪏": "lsimg",
					"⪐": "gsiml",
					"⪑": "lgE",
					"⪒": "glE",
					"⪓": "lesges",
					"⪔": "gesles",
					"⪕": "els",
					"⪖": "egs",
					"⪗": "elsdot",
					"⪘": "egsdot",
					"⪙": "el",
					"⪚": "eg",
					"⪝": "siml",
					"⪞": "simg",
					"⪟": "simlE",
					"⪠": "simgE",
					"⪡": "LessLess",
					"⪡̸": "NotNestedLessLess",
					"⪢": "GreaterGreater",
					"⪢̸": "NotNestedGreaterGreater",
					"⪤": "glj",
					"⪥": "gla",
					"⪦": "ltcc",
					"⪧": "gtcc",
					"⪨": "lescc",
					"⪩": "gescc",
					"⪪": "smt",
					"⪫": "lat",
					"⪬": "smte",
					"⪬︀": "smtes",
					"⪭": "late",
					"⪭︀": "lates",
					"⪮": "bumpE",
					"⪯": "pre",
					"⪯̸": "npre",
					"⪰": "sce",
					"⪰̸": "nsce",
					"⪳": "prE",
					"⪴": "scE",
					"⪵": "prnE",
					"⪶": "scnE",
					"⪷": "prap",
					"⪸": "scap",
					"⪹": "prnap",
					"⪺": "scnap",
					"⪻": "Pr",
					"⪼": "Sc",
					"⪽": "subdot",
					"⪾": "supdot",
					"⪿": "subplus",
					"⫀": "supplus",
					"⫁": "submult",
					"⫂": "supmult",
					"⫃": "subedot",
					"⫄": "supedot",
					"⫅": "subE",
					"⫅̸": "nsubE",
					"⫆": "supE",
					"⫆̸": "nsupE",
					"⫇": "subsim",
					"⫈": "supsim",
					"⫋︀": "vsubnE",
					"⫋": "subnE",
					"⫌︀": "vsupnE",
					"⫌": "supnE",
					"⫏": "csub",
					"⫐": "csup",
					"⫑": "csube",
					"⫒": "csupe",
					"⫓": "subsup",
					"⫔": "supsub",
					"⫕": "subsub",
					"⫖": "supsup",
					"⫗": "suphsub",
					"⫘": "supdsub",
					"⫙": "forkv",
					"⫚": "topfork",
					"⫛": "mlcp",
					"⫤": "Dashv",
					"⫦": "Vdashl",
					"⫧": "Barv",
					"⫨": "vBar",
					"⫩": "vBarv",
					"⫫": "Vbar",
					"⫬": "Not",
					"⫭": "bNot",
					"⫮": "rnmid",
					"⫯": "cirmid",
					"⫰": "midcir",
					"⫱": "topcir",
					"⫲": "nhpar",
					"⫳": "parsim",
					"⫽": "parsl",
					"⫽⃥": "nparsl",
					"♭": "flat",
					"♮": "natur",
					"♯": "sharp",
					"¤": "curren",
					"¢": "cent",
					$: "dollar",
					"£": "pound",
					"¥": "yen",
					"€": "euro",
					"¹": "sup1",
					"½": "half",
					"⅓": "frac13",
					"¼": "frac14",
					"⅕": "frac15",
					"⅙": "frac16",
					"⅛": "frac18",
					"²": "sup2",
					"⅔": "frac23",
					"⅖": "frac25",
					"³": "sup3",
					"¾": "frac34",
					"⅗": "frac35",
					"⅜": "frac38",
					"⅘": "frac45",
					"⅚": "frac56",
					"⅝": "frac58",
					"⅞": "frac78",
					"𝒶": "ascr",
					"𝕒": "aopf",
					"𝔞": "afr",
					"𝔸": "Aopf",
					"𝔄": "Afr",
					"𝒜": "Ascr",
					ª: "ordf",
					á: "aacute",
					Á: "Aacute",
					à: "agrave",
					À: "Agrave",
					ă: "abreve",
					Ă: "Abreve",
					â: "acirc",
					Â: "Acirc",
					å: "aring",
					Å: "angst",
					ä: "auml",
					Ä: "Auml",
					ã: "atilde",
					Ã: "Atilde",
					ą: "aogon",
					Ą: "Aogon",
					ā: "amacr",
					Ā: "Amacr",
					æ: "aelig",
					Æ: "AElig",
					"𝒷": "bscr",
					"𝕓": "bopf",
					"𝔟": "bfr",
					"𝔹": "Bopf",
					ℬ: "Bscr",
					"𝔅": "Bfr",
					"𝔠": "cfr",
					"𝒸": "cscr",
					"𝕔": "copf",
					ℭ: "Cfr",
					"𝒞": "Cscr",
					ℂ: "Copf",
					ć: "cacute",
					Ć: "Cacute",
					ĉ: "ccirc",
					Ĉ: "Ccirc",
					č: "ccaron",
					Č: "Ccaron",
					ċ: "cdot",
					Ċ: "Cdot",
					ç: "ccedil",
					Ç: "Ccedil",
					"℅": "incare",
					"𝔡": "dfr",
					"ⅆ": "dd",
					"𝕕": "dopf",
					"𝒹": "dscr",
					"𝒟": "Dscr",
					"𝔇": "Dfr",
					"ⅅ": "DD",
					"𝔻": "Dopf",
					ď: "dcaron",
					Ď: "Dcaron",
					đ: "dstrok",
					Đ: "Dstrok",
					ð: "eth",
					Ð: "ETH",
					"ⅇ": "ee",
					ℯ: "escr",
					"𝔢": "efr",
					"𝕖": "eopf",
					ℰ: "Escr",
					"𝔈": "Efr",
					"𝔼": "Eopf",
					é: "eacute",
					É: "Eacute",
					è: "egrave",
					È: "Egrave",
					ê: "ecirc",
					Ê: "Ecirc",
					ě: "ecaron",
					Ě: "Ecaron",
					ë: "euml",
					Ë: "Euml",
					ė: "edot",
					Ė: "Edot",
					ę: "eogon",
					Ę: "Eogon",
					ē: "emacr",
					Ē: "Emacr",
					"𝔣": "ffr",
					"𝕗": "fopf",
					"𝒻": "fscr",
					"𝔉": "Ffr",
					"𝔽": "Fopf",
					ℱ: "Fscr",
					ﬀ: "fflig",
					ﬃ: "ffilig",
					ﬄ: "ffllig",
					ﬁ: "filig",
					fj: "fjlig",
					ﬂ: "fllig",
					ƒ: "fnof",
					ℊ: "gscr",
					"𝕘": "gopf",
					"𝔤": "gfr",
					"𝒢": "Gscr",
					"𝔾": "Gopf",
					"𝔊": "Gfr",
					ǵ: "gacute",
					ğ: "gbreve",
					Ğ: "Gbreve",
					ĝ: "gcirc",
					Ĝ: "Gcirc",
					ġ: "gdot",
					Ġ: "Gdot",
					Ģ: "Gcedil",
					"𝔥": "hfr",
					ℎ: "planckh",
					"𝒽": "hscr",
					"𝕙": "hopf",
					ℋ: "Hscr",
					ℌ: "Hfr",
					ℍ: "Hopf",
					ĥ: "hcirc",
					Ĥ: "Hcirc",
					ℏ: "hbar",
					ħ: "hstrok",
					Ħ: "Hstrok",
					"𝕚": "iopf",
					"𝔦": "ifr",
					"𝒾": "iscr",
					"ⅈ": "ii",
					"𝕀": "Iopf",
					ℐ: "Iscr",
					ℑ: "Im",
					í: "iacute",
					Í: "Iacute",
					ì: "igrave",
					Ì: "Igrave",
					î: "icirc",
					Î: "Icirc",
					ï: "iuml",
					Ï: "Iuml",
					ĩ: "itilde",
					Ĩ: "Itilde",
					İ: "Idot",
					į: "iogon",
					Į: "Iogon",
					ī: "imacr",
					Ī: "Imacr",
					ĳ: "ijlig",
					Ĳ: "IJlig",
					ı: "imath",
					"𝒿": "jscr",
					"𝕛": "jopf",
					"𝔧": "jfr",
					"𝒥": "Jscr",
					"𝔍": "Jfr",
					"𝕁": "Jopf",
					ĵ: "jcirc",
					Ĵ: "Jcirc",
					"ȷ": "jmath",
					"𝕜": "kopf",
					"𝓀": "kscr",
					"𝔨": "kfr",
					"𝒦": "Kscr",
					"𝕂": "Kopf",
					"𝔎": "Kfr",
					ķ: "kcedil",
					Ķ: "Kcedil",
					"𝔩": "lfr",
					"𝓁": "lscr",
					ℓ: "ell",
					"𝕝": "lopf",
					ℒ: "Lscr",
					"𝔏": "Lfr",
					"𝕃": "Lopf",
					ĺ: "lacute",
					Ĺ: "Lacute",
					ľ: "lcaron",
					Ľ: "Lcaron",
					ļ: "lcedil",
					Ļ: "Lcedil",
					ł: "lstrok",
					Ł: "Lstrok",
					ŀ: "lmidot",
					Ŀ: "Lmidot",
					"𝔪": "mfr",
					"𝕞": "mopf",
					"𝓂": "mscr",
					"𝔐": "Mfr",
					"𝕄": "Mopf",
					ℳ: "Mscr",
					"𝔫": "nfr",
					"𝕟": "nopf",
					"𝓃": "nscr",
					ℕ: "Nopf",
					"𝒩": "Nscr",
					"𝔑": "Nfr",
					ń: "nacute",
					Ń: "Nacute",
					ň: "ncaron",
					Ň: "Ncaron",
					ñ: "ntilde",
					Ñ: "Ntilde",
					ņ: "ncedil",
					Ņ: "Ncedil",
					"№": "numero",
					ŋ: "eng",
					Ŋ: "ENG",
					"𝕠": "oopf",
					"𝔬": "ofr",
					ℴ: "oscr",
					"𝒪": "Oscr",
					"𝔒": "Ofr",
					"𝕆": "Oopf",
					º: "ordm",
					ó: "oacute",
					Ó: "Oacute",
					ò: "ograve",
					Ò: "Ograve",
					ô: "ocirc",
					Ô: "Ocirc",
					ö: "ouml",
					Ö: "Ouml",
					ő: "odblac",
					Ő: "Odblac",
					õ: "otilde",
					Õ: "Otilde",
					ø: "oslash",
					Ø: "Oslash",
					ō: "omacr",
					Ō: "Omacr",
					œ: "oelig",
					Œ: "OElig",
					"𝔭": "pfr",
					"𝓅": "pscr",
					"𝕡": "popf",
					ℙ: "Popf",
					"𝔓": "Pfr",
					"𝒫": "Pscr",
					"𝕢": "qopf",
					"𝔮": "qfr",
					"𝓆": "qscr",
					"𝒬": "Qscr",
					"𝔔": "Qfr",
					ℚ: "Qopf",
					ĸ: "kgreen",
					"𝔯": "rfr",
					"𝕣": "ropf",
					"𝓇": "rscr",
					ℛ: "Rscr",
					ℜ: "Re",
					ℝ: "Ropf",
					ŕ: "racute",
					Ŕ: "Racute",
					ř: "rcaron",
					Ř: "Rcaron",
					ŗ: "rcedil",
					Ŗ: "Rcedil",
					"𝕤": "sopf",
					"𝓈": "sscr",
					"𝔰": "sfr",
					"𝕊": "Sopf",
					"𝔖": "Sfr",
					"𝒮": "Sscr",
					"Ⓢ": "oS",
					ś: "sacute",
					Ś: "Sacute",
					ŝ: "scirc",
					Ŝ: "Scirc",
					š: "scaron",
					Š: "Scaron",
					ş: "scedil",
					Ş: "Scedil",
					ß: "szlig",
					"𝔱": "tfr",
					"𝓉": "tscr",
					"𝕥": "topf",
					"𝒯": "Tscr",
					"𝔗": "Tfr",
					"𝕋": "Topf",
					ť: "tcaron",
					Ť: "Tcaron",
					ţ: "tcedil",
					Ţ: "Tcedil",
					"™": "trade",
					ŧ: "tstrok",
					Ŧ: "Tstrok",
					"𝓊": "uscr",
					"𝕦": "uopf",
					"𝔲": "ufr",
					"𝕌": "Uopf",
					"𝔘": "Ufr",
					"𝒰": "Uscr",
					ú: "uacute",
					Ú: "Uacute",
					ù: "ugrave",
					Ù: "Ugrave",
					ŭ: "ubreve",
					Ŭ: "Ubreve",
					û: "ucirc",
					Û: "Ucirc",
					ů: "uring",
					Ů: "Uring",
					ü: "uuml",
					Ü: "Uuml",
					ű: "udblac",
					Ű: "Udblac",
					ũ: "utilde",
					Ũ: "Utilde",
					ų: "uogon",
					Ų: "Uogon",
					ū: "umacr",
					Ū: "Umacr",
					"𝔳": "vfr",
					"𝕧": "vopf",
					"𝓋": "vscr",
					"𝔙": "Vfr",
					"𝕍": "Vopf",
					"𝒱": "Vscr",
					"𝕨": "wopf",
					"𝓌": "wscr",
					"𝔴": "wfr",
					"𝒲": "Wscr",
					"𝕎": "Wopf",
					"𝔚": "Wfr",
					ŵ: "wcirc",
					Ŵ: "Wcirc",
					"𝔵": "xfr",
					"𝓍": "xscr",
					"𝕩": "xopf",
					"𝕏": "Xopf",
					"𝔛": "Xfr",
					"𝒳": "Xscr",
					"𝔶": "yfr",
					"𝓎": "yscr",
					"𝕪": "yopf",
					"𝒴": "Yscr",
					"𝔜": "Yfr",
					"𝕐": "Yopf",
					ý: "yacute",
					Ý: "Yacute",
					ŷ: "ycirc",
					Ŷ: "Ycirc",
					ÿ: "yuml",
					Ÿ: "Yuml",
					"𝓏": "zscr",
					"𝔷": "zfr",
					"𝕫": "zopf",
					ℨ: "Zfr",
					ℤ: "Zopf",
					"𝒵": "Zscr",
					ź: "zacute",
					Ź: "Zacute",
					ž: "zcaron",
					Ž: "Zcaron",
					ż: "zdot",
					Ż: "Zdot",
					Ƶ: "imped",
					þ: "thorn",
					Þ: "THORN",
					ŉ: "napos",
					α: "alpha",
					Α: "Alpha",
					β: "beta",
					Β: "Beta",
					γ: "gamma",
					Γ: "Gamma",
					δ: "delta",
					Δ: "Delta",
					ε: "epsi",
					"ϵ": "epsiv",
					Ε: "Epsilon",
					ϝ: "gammad",
					Ϝ: "Gammad",
					ζ: "zeta",
					Ζ: "Zeta",
					η: "eta",
					Η: "Eta",
					θ: "theta",
					ϑ: "thetav",
					Θ: "Theta",
					ι: "iota",
					Ι: "Iota",
					κ: "kappa",
					ϰ: "kappav",
					Κ: "Kappa",
					λ: "lambda",
					Λ: "Lambda",
					μ: "mu",
					µ: "micro",
					Μ: "Mu",
					ν: "nu",
					Ν: "Nu",
					ξ: "xi",
					Ξ: "Xi",
					ο: "omicron",
					Ο: "Omicron",
					π: "pi",
					ϖ: "piv",
					Π: "Pi",
					ρ: "rho",
					ϱ: "rhov",
					Ρ: "Rho",
					σ: "sigma",
					Σ: "Sigma",
					ς: "sigmaf",
					τ: "tau",
					Τ: "Tau",
					υ: "upsi",
					Υ: "Upsilon",
					ϒ: "Upsi",
					φ: "phi",
					ϕ: "phiv",
					Φ: "Phi",
					χ: "chi",
					Χ: "Chi",
					ψ: "psi",
					Ψ: "Psi",
					ω: "omega",
					Ω: "ohm",
					а: "acy",
					А: "Acy",
					б: "bcy",
					Б: "Bcy",
					в: "vcy",
					В: "Vcy",
					г: "gcy",
					Г: "Gcy",
					ѓ: "gjcy",
					Ѓ: "GJcy",
					д: "dcy",
					Д: "Dcy",
					ђ: "djcy",
					Ђ: "DJcy",
					е: "iecy",
					Е: "IEcy",
					ё: "iocy",
					Ё: "IOcy",
					є: "jukcy",
					Є: "Jukcy",
					ж: "zhcy",
					Ж: "ZHcy",
					з: "zcy",
					З: "Zcy",
					ѕ: "dscy",
					Ѕ: "DScy",
					и: "icy",
					И: "Icy",
					і: "iukcy",
					І: "Iukcy",
					ї: "yicy",
					Ї: "YIcy",
					й: "jcy",
					Й: "Jcy",
					ј: "jsercy",
					Ј: "Jsercy",
					к: "kcy",
					К: "Kcy",
					ќ: "kjcy",
					Ќ: "KJcy",
					л: "lcy",
					Л: "Lcy",
					љ: "ljcy",
					Љ: "LJcy",
					м: "mcy",
					М: "Mcy",
					н: "ncy",
					Н: "Ncy",
					њ: "njcy",
					Њ: "NJcy",
					о: "ocy",
					О: "Ocy",
					п: "pcy",
					П: "Pcy",
					р: "rcy",
					Р: "Rcy",
					с: "scy",
					С: "Scy",
					т: "tcy",
					Т: "Tcy",
					ћ: "tshcy",
					Ћ: "TSHcy",
					у: "ucy",
					У: "Ucy",
					ў: "ubrcy",
					Ў: "Ubrcy",
					ф: "fcy",
					Ф: "Fcy",
					х: "khcy",
					Х: "KHcy",
					ц: "tscy",
					Ц: "TScy",
					ч: "chcy",
					Ч: "CHcy",
					џ: "dzcy",
					Џ: "DZcy",
					ш: "shcy",
					Ш: "SHcy",
					щ: "shchcy",
					Щ: "SHCHcy",
					ъ: "hardcy",
					Ъ: "HARDcy",
					ы: "ycy",
					Ы: "Ycy",
					ь: "softcy",
					Ь: "SOFTcy",
					э: "ecy",
					Э: "Ecy",
					ю: "yucy",
					Ю: "YUcy",
					я: "yacy",
					Я: "YAcy",
					ℵ: "aleph",
					ℶ: "beth",
					ℷ: "gimel",
					ℸ: "daleth"
				},
				b = /["&'<>`]/g,
				w = {
					'"': "&quot;",
					"&": "&amp;",
					"'": "&#x27;",
					"<": "&lt;",
					">": "&gt;",
					"`": "&#x60;"
				},
				j = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/,
				B = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
				L = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g,
				P = {
					aacute: "á",
					Aacute: "Á",
					abreve: "ă",
					Abreve: "Ă",
					ac: "∾",
					acd: "∿",
					acE: "∾̳",
					acirc: "â",
					Acirc: "Â",
					acute: "´",
					acy: "а",
					Acy: "А",
					aelig: "æ",
					AElig: "Æ",
					af: "⁡",
					afr: "𝔞",
					Afr: "𝔄",
					agrave: "à",
					Agrave: "À",
					alefsym: "ℵ",
					aleph: "ℵ",
					alpha: "α",
					Alpha: "Α",
					amacr: "ā",
					Amacr: "Ā",
					amalg: "⨿",
					amp: "&",
					AMP: "&",
					and: "∧",
					And: "⩓",
					andand: "⩕",
					andd: "⩜",
					andslope: "⩘",
					andv: "⩚",
					ang: "∠",
					ange: "⦤",
					angle: "∠",
					angmsd: "∡",
					angmsdaa: "⦨",
					angmsdab: "⦩",
					angmsdac: "⦪",
					angmsdad: "⦫",
					angmsdae: "⦬",
					angmsdaf: "⦭",
					angmsdag: "⦮",
					angmsdah: "⦯",
					angrt: "∟",
					angrtvb: "⊾",
					angrtvbd: "⦝",
					angsph: "∢",
					angst: "Å",
					angzarr: "⍼",
					aogon: "ą",
					Aogon: "Ą",
					aopf: "𝕒",
					Aopf: "𝔸",
					ap: "≈",
					apacir: "⩯",
					ape: "≊",
					apE: "⩰",
					apid: "≋",
					apos: "'",
					ApplyFunction: "⁡",
					approx: "≈",
					approxeq: "≊",
					aring: "å",
					Aring: "Å",
					ascr: "𝒶",
					Ascr: "𝒜",
					Assign: "≔",
					ast: "*",
					asymp: "≈",
					asympeq: "≍",
					atilde: "ã",
					Atilde: "Ã",
					auml: "ä",
					Auml: "Ä",
					awconint: "∳",
					awint: "⨑",
					backcong: "≌",
					backepsilon: "϶",
					backprime: "‵",
					backsim: "∽",
					backsimeq: "⋍",
					Backslash: "∖",
					Barv: "⫧",
					barvee: "⊽",
					barwed: "⌅",
					Barwed: "⌆",
					barwedge: "⌅",
					bbrk: "⎵",
					bbrktbrk: "⎶",
					bcong: "≌",
					bcy: "б",
					Bcy: "Б",
					bdquo: "„",
					becaus: "∵",
					because: "∵",
					Because: "∵",
					bemptyv: "⦰",
					bepsi: "϶",
					bernou: "ℬ",
					Bernoullis: "ℬ",
					beta: "β",
					Beta: "Β",
					beth: "ℶ",
					between: "≬",
					bfr: "𝔟",
					Bfr: "𝔅",
					bigcap: "⋂",
					bigcirc: "◯",
					bigcup: "⋃",
					bigodot: "⨀",
					bigoplus: "⨁",
					bigotimes: "⨂",
					bigsqcup: "⨆",
					bigstar: "★",
					bigtriangledown: "▽",
					bigtriangleup: "△",
					biguplus: "⨄",
					bigvee: "⋁",
					bigwedge: "⋀",
					bkarow: "⤍",
					blacklozenge: "⧫",
					blacksquare: "▪",
					blacktriangle: "▴",
					blacktriangledown: "▾",
					blacktriangleleft: "◂",
					blacktriangleright: "▸",
					blank: "␣",
					blk12: "▒",
					blk14: "░",
					blk34: "▓",
					block: "█",
					bne: "=⃥",
					bnequiv: "≡⃥",
					bnot: "⌐",
					bNot: "⫭",
					bopf: "𝕓",
					Bopf: "𝔹",
					bot: "⊥",
					bottom: "⊥",
					bowtie: "⋈",
					boxbox: "⧉",
					boxdl: "┐",
					boxdL: "╕",
					boxDl: "╖",
					boxDL: "╗",
					boxdr: "┌",
					boxdR: "╒",
					boxDr: "╓",
					boxDR: "╔",
					boxh: "─",
					boxH: "═",
					boxhd: "┬",
					boxhD: "╥",
					boxHd: "╤",
					boxHD: "╦",
					boxhu: "┴",
					boxhU: "╨",
					boxHu: "╧",
					boxHU: "╩",
					boxminus: "⊟",
					boxplus: "⊞",
					boxtimes: "⊠",
					boxul: "┘",
					boxuL: "╛",
					boxUl: "╜",
					boxUL: "╝",
					boxur: "└",
					boxuR: "╘",
					boxUr: "╙",
					boxUR: "╚",
					boxv: "│",
					boxV: "║",
					boxvh: "┼",
					boxvH: "╪",
					boxVh: "╫",
					boxVH: "╬",
					boxvl: "┤",
					boxvL: "╡",
					boxVl: "╢",
					boxVL: "╣",
					boxvr: "├",
					boxvR: "╞",
					boxVr: "╟",
					boxVR: "╠",
					bprime: "‵",
					breve: "˘",
					Breve: "˘",
					brvbar: "¦",
					bscr: "𝒷",
					Bscr: "ℬ",
					bsemi: "⁏",
					bsim: "∽",
					bsime: "⋍",
					bsol: "\\",
					bsolb: "⧅",
					bsolhsub: "⟈",
					bull: "•",
					bullet: "•",
					bump: "≎",
					bumpe: "≏",
					bumpE: "⪮",
					bumpeq: "≏",
					Bumpeq: "≎",
					cacute: "ć",
					Cacute: "Ć",
					cap: "∩",
					Cap: "⋒",
					capand: "⩄",
					capbrcup: "⩉",
					capcap: "⩋",
					capcup: "⩇",
					capdot: "⩀",
					CapitalDifferentialD: "ⅅ",
					caps: "∩︀",
					caret: "⁁",
					caron: "ˇ",
					Cayleys: "ℭ",
					ccaps: "⩍",
					ccaron: "č",
					Ccaron: "Č",
					ccedil: "ç",
					Ccedil: "Ç",
					ccirc: "ĉ",
					Ccirc: "Ĉ",
					Cconint: "∰",
					ccups: "⩌",
					ccupssm: "⩐",
					cdot: "ċ",
					Cdot: "Ċ",
					cedil: "¸",
					Cedilla: "¸",
					cemptyv: "⦲",
					cent: "¢",
					centerdot: "·",
					CenterDot: "·",
					cfr: "𝔠",
					Cfr: "ℭ",
					chcy: "ч",
					CHcy: "Ч",
					check: "✓",
					checkmark: "✓",
					chi: "χ",
					Chi: "Χ",
					cir: "○",
					circ: "ˆ",
					circeq: "≗",
					circlearrowleft: "↺",
					circlearrowright: "↻",
					circledast: "⊛",
					circledcirc: "⊚",
					circleddash: "⊝",
					CircleDot: "⊙",
					circledR: "®",
					circledS: "Ⓢ",
					CircleMinus: "⊖",
					CirclePlus: "⊕",
					CircleTimes: "⊗",
					cire: "≗",
					cirE: "⧃",
					cirfnint: "⨐",
					cirmid: "⫯",
					cirscir: "⧂",
					ClockwiseContourIntegral: "∲",
					CloseCurlyDoubleQuote: "”",
					CloseCurlyQuote: "’",
					clubs: "♣",
					clubsuit: "♣",
					colon: ":",
					Colon: "∷",
					colone: "≔",
					Colone: "⩴",
					coloneq: "≔",
					comma: ",",
					commat: "@",
					comp: "∁",
					compfn: "∘",
					complement: "∁",
					complexes: "ℂ",
					cong: "≅",
					congdot: "⩭",
					Congruent: "≡",
					conint: "∮",
					Conint: "∯",
					ContourIntegral: "∮",
					copf: "𝕔",
					Copf: "ℂ",
					coprod: "∐",
					Coproduct: "∐",
					copy: "©",
					COPY: "©",
					copysr: "℗",
					CounterClockwiseContourIntegral: "∳",
					crarr: "↵",
					cross: "✗",
					Cross: "⨯",
					cscr: "𝒸",
					Cscr: "𝒞",
					csub: "⫏",
					csube: "⫑",
					csup: "⫐",
					csupe: "⫒",
					ctdot: "⋯",
					cudarrl: "⤸",
					cudarrr: "⤵",
					cuepr: "⋞",
					cuesc: "⋟",
					cularr: "↶",
					cularrp: "⤽",
					cup: "∪",
					Cup: "⋓",
					cupbrcap: "⩈",
					cupcap: "⩆",
					CupCap: "≍",
					cupcup: "⩊",
					cupdot: "⊍",
					cupor: "⩅",
					cups: "∪︀",
					curarr: "↷",
					curarrm: "⤼",
					curlyeqprec: "⋞",
					curlyeqsucc: "⋟",
					curlyvee: "⋎",
					curlywedge: "⋏",
					curren: "¤",
					curvearrowleft: "↶",
					curvearrowright: "↷",
					cuvee: "⋎",
					cuwed: "⋏",
					cwconint: "∲",
					cwint: "∱",
					cylcty: "⌭",
					dagger: "†",
					Dagger: "‡",
					daleth: "ℸ",
					darr: "↓",
					dArr: "⇓",
					Darr: "↡",
					dash: "‐",
					dashv: "⊣",
					Dashv: "⫤",
					dbkarow: "⤏",
					dblac: "˝",
					dcaron: "ď",
					Dcaron: "Ď",
					dcy: "д",
					Dcy: "Д",
					dd: "ⅆ",
					DD: "ⅅ",
					ddagger: "‡",
					ddarr: "⇊",
					DDotrahd: "⤑",
					ddotseq: "⩷",
					deg: "°",
					Del: "∇",
					delta: "δ",
					Delta: "Δ",
					demptyv: "⦱",
					dfisht: "⥿",
					dfr: "𝔡",
					Dfr: "𝔇",
					dHar: "⥥",
					dharl: "⇃",
					dharr: "⇂",
					DiacriticalAcute: "´",
					DiacriticalDot: "˙",
					DiacriticalDoubleAcute: "˝",
					DiacriticalGrave: "`",
					DiacriticalTilde: "˜",
					diam: "⋄",
					diamond: "⋄",
					Diamond: "⋄",
					diamondsuit: "♦",
					diams: "♦",
					die: "¨",
					DifferentialD: "ⅆ",
					digamma: "ϝ",
					disin: "⋲",
					div: "÷",
					divide: "÷",
					divideontimes: "⋇",
					divonx: "⋇",
					djcy: "ђ",
					DJcy: "Ђ",
					dlcorn: "⌞",
					dlcrop: "⌍",
					dollar: "$",
					dopf: "𝕕",
					Dopf: "𝔻",
					dot: "˙",
					Dot: "¨",
					DotDot: "⃜",
					doteq: "≐",
					doteqdot: "≑",
					DotEqual: "≐",
					dotminus: "∸",
					dotplus: "∔",
					dotsquare: "⊡",
					doublebarwedge: "⌆",
					DoubleContourIntegral: "∯",
					DoubleDot: "¨",
					DoubleDownArrow: "⇓",
					DoubleLeftArrow: "⇐",
					DoubleLeftRightArrow: "⇔",
					DoubleLeftTee: "⫤",
					DoubleLongLeftArrow: "⟸",
					DoubleLongLeftRightArrow: "⟺",
					DoubleLongRightArrow: "⟹",
					DoubleRightArrow: "⇒",
					DoubleRightTee: "⊨",
					DoubleUpArrow: "⇑",
					DoubleUpDownArrow: "⇕",
					DoubleVerticalBar: "∥",
					downarrow: "↓",
					Downarrow: "⇓",
					DownArrow: "↓",
					DownArrowBar: "⤓",
					DownArrowUpArrow: "⇵",
					DownBreve: "̑",
					downdownarrows: "⇊",
					downharpoonleft: "⇃",
					downharpoonright: "⇂",
					DownLeftRightVector: "⥐",
					DownLeftTeeVector: "⥞",
					DownLeftVector: "↽",
					DownLeftVectorBar: "⥖",
					DownRightTeeVector: "⥟",
					DownRightVector: "⇁",
					DownRightVectorBar: "⥗",
					DownTee: "⊤",
					DownTeeArrow: "↧",
					drbkarow: "⤐",
					drcorn: "⌟",
					drcrop: "⌌",
					dscr: "𝒹",
					Dscr: "𝒟",
					dscy: "ѕ",
					DScy: "Ѕ",
					dsol: "⧶",
					dstrok: "đ",
					Dstrok: "Đ",
					dtdot: "⋱",
					dtri: "▿",
					dtrif: "▾",
					duarr: "⇵",
					duhar: "⥯",
					dwangle: "⦦",
					dzcy: "џ",
					DZcy: "Џ",
					dzigrarr: "⟿",
					eacute: "é",
					Eacute: "É",
					easter: "⩮",
					ecaron: "ě",
					Ecaron: "Ě",
					ecir: "≖",
					ecirc: "ê",
					Ecirc: "Ê",
					ecolon: "≕",
					ecy: "э",
					Ecy: "Э",
					eDDot: "⩷",
					edot: "ė",
					eDot: "≑",
					Edot: "Ė",
					ee: "ⅇ",
					efDot: "≒",
					efr: "𝔢",
					Efr: "𝔈",
					eg: "⪚",
					egrave: "è",
					Egrave: "È",
					egs: "⪖",
					egsdot: "⪘",
					el: "⪙",
					Element: "∈",
					elinters: "⏧",
					ell: "ℓ",
					els: "⪕",
					elsdot: "⪗",
					emacr: "ē",
					Emacr: "Ē",
					empty: "∅",
					emptyset: "∅",
					EmptySmallSquare: "◻",
					emptyv: "∅",
					EmptyVerySmallSquare: "▫",
					emsp: " ",
					emsp13: " ",
					emsp14: " ",
					eng: "ŋ",
					ENG: "Ŋ",
					ensp: " ",
					eogon: "ę",
					Eogon: "Ę",
					eopf: "𝕖",
					Eopf: "𝔼",
					epar: "⋕",
					eparsl: "⧣",
					eplus: "⩱",
					epsi: "ε",
					epsilon: "ε",
					Epsilon: "Ε",
					epsiv: "ϵ",
					eqcirc: "≖",
					eqcolon: "≕",
					eqsim: "≂",
					eqslantgtr: "⪖",
					eqslantless: "⪕",
					Equal: "⩵",
					equals: "=",
					EqualTilde: "≂",
					equest: "≟",
					Equilibrium: "⇌",
					equiv: "≡",
					equivDD: "⩸",
					eqvparsl: "⧥",
					erarr: "⥱",
					erDot: "≓",
					escr: "ℯ",
					Escr: "ℰ",
					esdot: "≐",
					esim: "≂",
					Esim: "⩳",
					eta: "η",
					Eta: "Η",
					eth: "ð",
					ETH: "Ð",
					euml: "ë",
					Euml: "Ë",
					euro: "€",
					excl: "!",
					exist: "∃",
					Exists: "∃",
					expectation: "ℰ",
					exponentiale: "ⅇ",
					ExponentialE: "ⅇ",
					fallingdotseq: "≒",
					fcy: "ф",
					Fcy: "Ф",
					female: "♀",
					ffilig: "ﬃ",
					fflig: "ﬀ",
					ffllig: "ﬄ",
					ffr: "𝔣",
					Ffr: "𝔉",
					filig: "ﬁ",
					FilledSmallSquare: "◼",
					FilledVerySmallSquare: "▪",
					fjlig: "fj",
					flat: "♭",
					fllig: "ﬂ",
					fltns: "▱",
					fnof: "ƒ",
					fopf: "𝕗",
					Fopf: "𝔽",
					forall: "∀",
					ForAll: "∀",
					fork: "⋔",
					forkv: "⫙",
					Fouriertrf: "ℱ",
					fpartint: "⨍",
					frac12: "½",
					frac13: "⅓",
					frac14: "¼",
					frac15: "⅕",
					frac16: "⅙",
					frac18: "⅛",
					frac23: "⅔",
					frac25: "⅖",
					frac34: "¾",
					frac35: "⅗",
					frac38: "⅜",
					frac45: "⅘",
					frac56: "⅚",
					frac58: "⅝",
					frac78: "⅞",
					frasl: "⁄",
					frown: "⌢",
					fscr: "𝒻",
					Fscr: "ℱ",
					gacute: "ǵ",
					gamma: "γ",
					Gamma: "Γ",
					gammad: "ϝ",
					Gammad: "Ϝ",
					gap: "⪆",
					gbreve: "ğ",
					Gbreve: "Ğ",
					Gcedil: "Ģ",
					gcirc: "ĝ",
					Gcirc: "Ĝ",
					gcy: "г",
					Gcy: "Г",
					gdot: "ġ",
					Gdot: "Ġ",
					ge: "≥",
					gE: "≧",
					gel: "⋛",
					gEl: "⪌",
					geq: "≥",
					geqq: "≧",
					geqslant: "⩾",
					ges: "⩾",
					gescc: "⪩",
					gesdot: "⪀",
					gesdoto: "⪂",
					gesdotol: "⪄",
					gesl: "⋛︀",
					gesles: "⪔",
					gfr: "𝔤",
					Gfr: "𝔊",
					gg: "≫",
					Gg: "⋙",
					ggg: "⋙",
					gimel: "ℷ",
					gjcy: "ѓ",
					GJcy: "Ѓ",
					gl: "≷",
					gla: "⪥",
					glE: "⪒",
					glj: "⪤",
					gnap: "⪊",
					gnapprox: "⪊",
					gne: "⪈",
					gnE: "≩",
					gneq: "⪈",
					gneqq: "≩",
					gnsim: "⋧",
					gopf: "𝕘",
					Gopf: "𝔾",
					grave: "`",
					GreaterEqual: "≥",
					GreaterEqualLess: "⋛",
					GreaterFullEqual: "≧",
					GreaterGreater: "⪢",
					GreaterLess: "≷",
					GreaterSlantEqual: "⩾",
					GreaterTilde: "≳",
					gscr: "ℊ",
					Gscr: "𝒢",
					gsim: "≳",
					gsime: "⪎",
					gsiml: "⪐",
					gt: ">",
					Gt: "≫",
					GT: ">",
					gtcc: "⪧",
					gtcir: "⩺",
					gtdot: "⋗",
					gtlPar: "⦕",
					gtquest: "⩼",
					gtrapprox: "⪆",
					gtrarr: "⥸",
					gtrdot: "⋗",
					gtreqless: "⋛",
					gtreqqless: "⪌",
					gtrless: "≷",
					gtrsim: "≳",
					gvertneqq: "≩︀",
					gvnE: "≩︀",
					Hacek: "ˇ",
					hairsp: " ",
					half: "½",
					hamilt: "ℋ",
					hardcy: "ъ",
					HARDcy: "Ъ",
					harr: "↔",
					hArr: "⇔",
					harrcir: "⥈",
					harrw: "↭",
					Hat: "^",
					hbar: "ℏ",
					hcirc: "ĥ",
					Hcirc: "Ĥ",
					hearts: "♥",
					heartsuit: "♥",
					hellip: "…",
					hercon: "⊹",
					hfr: "𝔥",
					Hfr: "ℌ",
					HilbertSpace: "ℋ",
					hksearow: "⤥",
					hkswarow: "⤦",
					hoarr: "⇿",
					homtht: "∻",
					hookleftarrow: "↩",
					hookrightarrow: "↪",
					hopf: "𝕙",
					Hopf: "ℍ",
					horbar: "―",
					HorizontalLine: "─",
					hscr: "𝒽",
					Hscr: "ℋ",
					hslash: "ℏ",
					hstrok: "ħ",
					Hstrok: "Ħ",
					HumpDownHump: "≎",
					HumpEqual: "≏",
					hybull: "⁃",
					hyphen: "‐",
					iacute: "í",
					Iacute: "Í",
					ic: "⁣",
					icirc: "î",
					Icirc: "Î",
					icy: "и",
					Icy: "И",
					Idot: "İ",
					iecy: "е",
					IEcy: "Е",
					iexcl: "¡",
					iff: "⇔",
					ifr: "𝔦",
					Ifr: "ℑ",
					igrave: "ì",
					Igrave: "Ì",
					ii: "ⅈ",
					iiiint: "⨌",
					iiint: "∭",
					iinfin: "⧜",
					iiota: "℩",
					ijlig: "ĳ",
					IJlig: "Ĳ",
					Im: "ℑ",
					imacr: "ī",
					Imacr: "Ī",
					image: "ℑ",
					ImaginaryI: "ⅈ",
					imagline: "ℐ",
					imagpart: "ℑ",
					imath: "ı",
					imof: "⊷",
					imped: "Ƶ",
					Implies: "⇒",
					in: "∈",
					incare: "℅",
					infin: "∞",
					infintie: "⧝",
					inodot: "ı",
					int: "∫",
					Int: "∬",
					intcal: "⊺",
					integers: "ℤ",
					Integral: "∫",
					intercal: "⊺",
					Intersection: "⋂",
					intlarhk: "⨗",
					intprod: "⨼",
					InvisibleComma: "⁣",
					InvisibleTimes: "⁢",
					iocy: "ё",
					IOcy: "Ё",
					iogon: "į",
					Iogon: "Į",
					iopf: "𝕚",
					Iopf: "𝕀",
					iota: "ι",
					Iota: "Ι",
					iprod: "⨼",
					iquest: "¿",
					iscr: "𝒾",
					Iscr: "ℐ",
					isin: "∈",
					isindot: "⋵",
					isinE: "⋹",
					isins: "⋴",
					isinsv: "⋳",
					isinv: "∈",
					it: "⁢",
					itilde: "ĩ",
					Itilde: "Ĩ",
					iukcy: "і",
					Iukcy: "І",
					iuml: "ï",
					Iuml: "Ï",
					jcirc: "ĵ",
					Jcirc: "Ĵ",
					jcy: "й",
					Jcy: "Й",
					jfr: "𝔧",
					Jfr: "𝔍",
					jmath: "ȷ",
					jopf: "𝕛",
					Jopf: "𝕁",
					jscr: "𝒿",
					Jscr: "𝒥",
					jsercy: "ј",
					Jsercy: "Ј",
					jukcy: "є",
					Jukcy: "Є",
					kappa: "κ",
					Kappa: "Κ",
					kappav: "ϰ",
					kcedil: "ķ",
					Kcedil: "Ķ",
					kcy: "к",
					Kcy: "К",
					kfr: "𝔨",
					Kfr: "𝔎",
					kgreen: "ĸ",
					khcy: "х",
					KHcy: "Х",
					kjcy: "ќ",
					KJcy: "Ќ",
					kopf: "𝕜",
					Kopf: "𝕂",
					kscr: "𝓀",
					Kscr: "𝒦",
					lAarr: "⇚",
					lacute: "ĺ",
					Lacute: "Ĺ",
					laemptyv: "⦴",
					lagran: "ℒ",
					lambda: "λ",
					Lambda: "Λ",
					lang: "⟨",
					Lang: "⟪",
					langd: "⦑",
					langle: "⟨",
					lap: "⪅",
					Laplacetrf: "ℒ",
					laquo: "«",
					larr: "←",
					lArr: "⇐",
					Larr: "↞",
					larrb: "⇤",
					larrbfs: "⤟",
					larrfs: "⤝",
					larrhk: "↩",
					larrlp: "↫",
					larrpl: "⤹",
					larrsim: "⥳",
					larrtl: "↢",
					lat: "⪫",
					latail: "⤙",
					lAtail: "⤛",
					late: "⪭",
					lates: "⪭︀",
					lbarr: "⤌",
					lBarr: "⤎",
					lbbrk: "❲",
					lbrace: "{",
					lbrack: "[",
					lbrke: "⦋",
					lbrksld: "⦏",
					lbrkslu: "⦍",
					lcaron: "ľ",
					Lcaron: "Ľ",
					lcedil: "ļ",
					Lcedil: "Ļ",
					lceil: "⌈",
					lcub: "{",
					lcy: "л",
					Lcy: "Л",
					ldca: "⤶",
					ldquo: "“",
					ldquor: "„",
					ldrdhar: "⥧",
					ldrushar: "⥋",
					ldsh: "↲",
					le: "≤",
					lE: "≦",
					LeftAngleBracket: "⟨",
					leftarrow: "←",
					Leftarrow: "⇐",
					LeftArrow: "←",
					LeftArrowBar: "⇤",
					LeftArrowRightArrow: "⇆",
					leftarrowtail: "↢",
					LeftCeiling: "⌈",
					LeftDoubleBracket: "⟦",
					LeftDownTeeVector: "⥡",
					LeftDownVector: "⇃",
					LeftDownVectorBar: "⥙",
					LeftFloor: "⌊",
					leftharpoondown: "↽",
					leftharpoonup: "↼",
					leftleftarrows: "⇇",
					leftrightarrow: "↔",
					Leftrightarrow: "⇔",
					LeftRightArrow: "↔",
					leftrightarrows: "⇆",
					leftrightharpoons: "⇋",
					leftrightsquigarrow: "↭",
					LeftRightVector: "⥎",
					LeftTee: "⊣",
					LeftTeeArrow: "↤",
					LeftTeeVector: "⥚",
					leftthreetimes: "⋋",
					LeftTriangle: "⊲",
					LeftTriangleBar: "⧏",
					LeftTriangleEqual: "⊴",
					LeftUpDownVector: "⥑",
					LeftUpTeeVector: "⥠",
					LeftUpVector: "↿",
					LeftUpVectorBar: "⥘",
					LeftVector: "↼",
					LeftVectorBar: "⥒",
					leg: "⋚",
					lEg: "⪋",
					leq: "≤",
					leqq: "≦",
					leqslant: "⩽",
					les: "⩽",
					lescc: "⪨",
					lesdot: "⩿",
					lesdoto: "⪁",
					lesdotor: "⪃",
					lesg: "⋚︀",
					lesges: "⪓",
					lessapprox: "⪅",
					lessdot: "⋖",
					lesseqgtr: "⋚",
					lesseqqgtr: "⪋",
					LessEqualGreater: "⋚",
					LessFullEqual: "≦",
					LessGreater: "≶",
					lessgtr: "≶",
					LessLess: "⪡",
					lesssim: "≲",
					LessSlantEqual: "⩽",
					LessTilde: "≲",
					lfisht: "⥼",
					lfloor: "⌊",
					lfr: "𝔩",
					Lfr: "𝔏",
					lg: "≶",
					lgE: "⪑",
					lHar: "⥢",
					lhard: "↽",
					lharu: "↼",
					lharul: "⥪",
					lhblk: "▄",
					ljcy: "љ",
					LJcy: "Љ",
					ll: "≪",
					Ll: "⋘",
					llarr: "⇇",
					llcorner: "⌞",
					Lleftarrow: "⇚",
					llhard: "⥫",
					lltri: "◺",
					lmidot: "ŀ",
					Lmidot: "Ŀ",
					lmoust: "⎰",
					lmoustache: "⎰",
					lnap: "⪉",
					lnapprox: "⪉",
					lne: "⪇",
					lnE: "≨",
					lneq: "⪇",
					lneqq: "≨",
					lnsim: "⋦",
					loang: "⟬",
					loarr: "⇽",
					lobrk: "⟦",
					longleftarrow: "⟵",
					Longleftarrow: "⟸",
					LongLeftArrow: "⟵",
					longleftrightarrow: "⟷",
					Longleftrightarrow: "⟺",
					LongLeftRightArrow: "⟷",
					longmapsto: "⟼",
					longrightarrow: "⟶",
					Longrightarrow: "⟹",
					LongRightArrow: "⟶",
					looparrowleft: "↫",
					looparrowright: "↬",
					lopar: "⦅",
					lopf: "𝕝",
					Lopf: "𝕃",
					loplus: "⨭",
					lotimes: "⨴",
					lowast: "∗",
					lowbar: "_",
					LowerLeftArrow: "↙",
					LowerRightArrow: "↘",
					loz: "◊",
					lozenge: "◊",
					lozf: "⧫",
					lpar: "(",
					lparlt: "⦓",
					lrarr: "⇆",
					lrcorner: "⌟",
					lrhar: "⇋",
					lrhard: "⥭",
					lrm: "‎",
					lrtri: "⊿",
					lsaquo: "‹",
					lscr: "𝓁",
					Lscr: "ℒ",
					lsh: "↰",
					Lsh: "↰",
					lsim: "≲",
					lsime: "⪍",
					lsimg: "⪏",
					lsqb: "[",
					lsquo: "‘",
					lsquor: "‚",
					lstrok: "ł",
					Lstrok: "Ł",
					lt: "<",
					Lt: "≪",
					LT: "<",
					ltcc: "⪦",
					ltcir: "⩹",
					ltdot: "⋖",
					lthree: "⋋",
					ltimes: "⋉",
					ltlarr: "⥶",
					ltquest: "⩻",
					ltri: "◃",
					ltrie: "⊴",
					ltrif: "◂",
					ltrPar: "⦖",
					lurdshar: "⥊",
					luruhar: "⥦",
					lvertneqq: "≨︀",
					lvnE: "≨︀",
					macr: "¯",
					male: "♂",
					malt: "✠",
					maltese: "✠",
					map: "↦",
					Map: "⤅",
					mapsto: "↦",
					mapstodown: "↧",
					mapstoleft: "↤",
					mapstoup: "↥",
					marker: "▮",
					mcomma: "⨩",
					mcy: "м",
					Mcy: "М",
					mdash: "—",
					mDDot: "∺",
					measuredangle: "∡",
					MediumSpace: " ",
					Mellintrf: "ℳ",
					mfr: "𝔪",
					Mfr: "𝔐",
					mho: "℧",
					micro: "µ",
					mid: "∣",
					midast: "*",
					midcir: "⫰",
					middot: "·",
					minus: "−",
					minusb: "⊟",
					minusd: "∸",
					minusdu: "⨪",
					MinusPlus: "∓",
					mlcp: "⫛",
					mldr: "…",
					mnplus: "∓",
					models: "⊧",
					mopf: "𝕞",
					Mopf: "𝕄",
					mp: "∓",
					mscr: "𝓂",
					Mscr: "ℳ",
					mstpos: "∾",
					mu: "μ",
					Mu: "Μ",
					multimap: "⊸",
					mumap: "⊸",
					nabla: "∇",
					nacute: "ń",
					Nacute: "Ń",
					nang: "∠⃒",
					nap: "≉",
					napE: "⩰̸",
					napid: "≋̸",
					napos: "ŉ",
					napprox: "≉",
					natur: "♮",
					natural: "♮",
					naturals: "ℕ",
					nbsp: " ",
					nbump: "≎̸",
					nbumpe: "≏̸",
					ncap: "⩃",
					ncaron: "ň",
					Ncaron: "Ň",
					ncedil: "ņ",
					Ncedil: "Ņ",
					ncong: "≇",
					ncongdot: "⩭̸",
					ncup: "⩂",
					ncy: "н",
					Ncy: "Н",
					ndash: "–",
					ne: "≠",
					nearhk: "⤤",
					nearr: "↗",
					neArr: "⇗",
					nearrow: "↗",
					nedot: "≐̸",
					NegativeMediumSpace: "​",
					NegativeThickSpace: "​",
					NegativeThinSpace: "​",
					NegativeVeryThinSpace: "​",
					nequiv: "≢",
					nesear: "⤨",
					nesim: "≂̸",
					NestedGreaterGreater: "≫",
					NestedLessLess: "≪",
					NewLine: `
`,
					nexist: "∄",
					nexists: "∄",
					nfr: "𝔫",
					Nfr: "𝔑",
					nge: "≱",
					ngE: "≧̸",
					ngeq: "≱",
					ngeqq: "≧̸",
					ngeqslant: "⩾̸",
					nges: "⩾̸",
					nGg: "⋙̸",
					ngsim: "≵",
					ngt: "≯",
					nGt: "≫⃒",
					ngtr: "≯",
					nGtv: "≫̸",
					nharr: "↮",
					nhArr: "⇎",
					nhpar: "⫲",
					ni: "∋",
					nis: "⋼",
					nisd: "⋺",
					niv: "∋",
					njcy: "њ",
					NJcy: "Њ",
					nlarr: "↚",
					nlArr: "⇍",
					nldr: "‥",
					nle: "≰",
					nlE: "≦̸",
					nleftarrow: "↚",
					nLeftarrow: "⇍",
					nleftrightarrow: "↮",
					nLeftrightarrow: "⇎",
					nleq: "≰",
					nleqq: "≦̸",
					nleqslant: "⩽̸",
					nles: "⩽̸",
					nless: "≮",
					nLl: "⋘̸",
					nlsim: "≴",
					nlt: "≮",
					nLt: "≪⃒",
					nltri: "⋪",
					nltrie: "⋬",
					nLtv: "≪̸",
					nmid: "∤",
					NoBreak: "⁠",
					NonBreakingSpace: " ",
					nopf: "𝕟",
					Nopf: "ℕ",
					not: "¬",
					Not: "⫬",
					NotCongruent: "≢",
					NotCupCap: "≭",
					NotDoubleVerticalBar: "∦",
					NotElement: "∉",
					NotEqual: "≠",
					NotEqualTilde: "≂̸",
					NotExists: "∄",
					NotGreater: "≯",
					NotGreaterEqual: "≱",
					NotGreaterFullEqual: "≧̸",
					NotGreaterGreater: "≫̸",
					NotGreaterLess: "≹",
					NotGreaterSlantEqual: "⩾̸",
					NotGreaterTilde: "≵",
					NotHumpDownHump: "≎̸",
					NotHumpEqual: "≏̸",
					notin: "∉",
					notindot: "⋵̸",
					notinE: "⋹̸",
					notinva: "∉",
					notinvb: "⋷",
					notinvc: "⋶",
					NotLeftTriangle: "⋪",
					NotLeftTriangleBar: "⧏̸",
					NotLeftTriangleEqual: "⋬",
					NotLess: "≮",
					NotLessEqual: "≰",
					NotLessGreater: "≸",
					NotLessLess: "≪̸",
					NotLessSlantEqual: "⩽̸",
					NotLessTilde: "≴",
					NotNestedGreaterGreater: "⪢̸",
					NotNestedLessLess: "⪡̸",
					notni: "∌",
					notniva: "∌",
					notnivb: "⋾",
					notnivc: "⋽",
					NotPrecedes: "⊀",
					NotPrecedesEqual: "⪯̸",
					NotPrecedesSlantEqual: "⋠",
					NotReverseElement: "∌",
					NotRightTriangle: "⋫",
					NotRightTriangleBar: "⧐̸",
					NotRightTriangleEqual: "⋭",
					NotSquareSubset: "⊏̸",
					NotSquareSubsetEqual: "⋢",
					NotSquareSuperset: "⊐̸",
					NotSquareSupersetEqual: "⋣",
					NotSubset: "⊂⃒",
					NotSubsetEqual: "⊈",
					NotSucceeds: "⊁",
					NotSucceedsEqual: "⪰̸",
					NotSucceedsSlantEqual: "⋡",
					NotSucceedsTilde: "≿̸",
					NotSuperset: "⊃⃒",
					NotSupersetEqual: "⊉",
					NotTilde: "≁",
					NotTildeEqual: "≄",
					NotTildeFullEqual: "≇",
					NotTildeTilde: "≉",
					NotVerticalBar: "∤",
					npar: "∦",
					nparallel: "∦",
					nparsl: "⫽⃥",
					npart: "∂̸",
					npolint: "⨔",
					npr: "⊀",
					nprcue: "⋠",
					npre: "⪯̸",
					nprec: "⊀",
					npreceq: "⪯̸",
					nrarr: "↛",
					nrArr: "⇏",
					nrarrc: "⤳̸",
					nrarrw: "↝̸",
					nrightarrow: "↛",
					nRightarrow: "⇏",
					nrtri: "⋫",
					nrtrie: "⋭",
					nsc: "⊁",
					nsccue: "⋡",
					nsce: "⪰̸",
					nscr: "𝓃",
					Nscr: "𝒩",
					nshortmid: "∤",
					nshortparallel: "∦",
					nsim: "≁",
					nsime: "≄",
					nsimeq: "≄",
					nsmid: "∤",
					nspar: "∦",
					nsqsube: "⋢",
					nsqsupe: "⋣",
					nsub: "⊄",
					nsube: "⊈",
					nsubE: "⫅̸",
					nsubset: "⊂⃒",
					nsubseteq: "⊈",
					nsubseteqq: "⫅̸",
					nsucc: "⊁",
					nsucceq: "⪰̸",
					nsup: "⊅",
					nsupe: "⊉",
					nsupE: "⫆̸",
					nsupset: "⊃⃒",
					nsupseteq: "⊉",
					nsupseteqq: "⫆̸",
					ntgl: "≹",
					ntilde: "ñ",
					Ntilde: "Ñ",
					ntlg: "≸",
					ntriangleleft: "⋪",
					ntrianglelefteq: "⋬",
					ntriangleright: "⋫",
					ntrianglerighteq: "⋭",
					nu: "ν",
					Nu: "Ν",
					num: "#",
					numero: "№",
					numsp: " ",
					nvap: "≍⃒",
					nvdash: "⊬",
					nvDash: "⊭",
					nVdash: "⊮",
					nVDash: "⊯",
					nvge: "≥⃒",
					nvgt: ">⃒",
					nvHarr: "⤄",
					nvinfin: "⧞",
					nvlArr: "⤂",
					nvle: "≤⃒",
					nvlt: "<⃒",
					nvltrie: "⊴⃒",
					nvrArr: "⤃",
					nvrtrie: "⊵⃒",
					nvsim: "∼⃒",
					nwarhk: "⤣",
					nwarr: "↖",
					nwArr: "⇖",
					nwarrow: "↖",
					nwnear: "⤧",
					oacute: "ó",
					Oacute: "Ó",
					oast: "⊛",
					ocir: "⊚",
					ocirc: "ô",
					Ocirc: "Ô",
					ocy: "о",
					Ocy: "О",
					odash: "⊝",
					odblac: "ő",
					Odblac: "Ő",
					odiv: "⨸",
					odot: "⊙",
					odsold: "⦼",
					oelig: "œ",
					OElig: "Œ",
					ofcir: "⦿",
					ofr: "𝔬",
					Ofr: "𝔒",
					ogon: "˛",
					ograve: "ò",
					Ograve: "Ò",
					ogt: "⧁",
					ohbar: "⦵",
					ohm: "Ω",
					oint: "∮",
					olarr: "↺",
					olcir: "⦾",
					olcross: "⦻",
					oline: "‾",
					olt: "⧀",
					omacr: "ō",
					Omacr: "Ō",
					omega: "ω",
					Omega: "Ω",
					omicron: "ο",
					Omicron: "Ο",
					omid: "⦶",
					ominus: "⊖",
					oopf: "𝕠",
					Oopf: "𝕆",
					opar: "⦷",
					OpenCurlyDoubleQuote: "“",
					OpenCurlyQuote: "‘",
					operp: "⦹",
					oplus: "⊕",
					or: "∨",
					Or: "⩔",
					orarr: "↻",
					ord: "⩝",
					order: "ℴ",
					orderof: "ℴ",
					ordf: "ª",
					ordm: "º",
					origof: "⊶",
					oror: "⩖",
					orslope: "⩗",
					orv: "⩛",
					oS: "Ⓢ",
					oscr: "ℴ",
					Oscr: "𝒪",
					oslash: "ø",
					Oslash: "Ø",
					osol: "⊘",
					otilde: "õ",
					Otilde: "Õ",
					otimes: "⊗",
					Otimes: "⨷",
					otimesas: "⨶",
					ouml: "ö",
					Ouml: "Ö",
					ovbar: "⌽",
					OverBar: "‾",
					OverBrace: "⏞",
					OverBracket: "⎴",
					OverParenthesis: "⏜",
					par: "∥",
					para: "¶",
					parallel: "∥",
					parsim: "⫳",
					parsl: "⫽",
					part: "∂",
					PartialD: "∂",
					pcy: "п",
					Pcy: "П",
					percnt: "%",
					period: ".",
					permil: "‰",
					perp: "⊥",
					pertenk: "‱",
					pfr: "𝔭",
					Pfr: "𝔓",
					phi: "φ",
					Phi: "Φ",
					phiv: "ϕ",
					phmmat: "ℳ",
					phone: "☎",
					pi: "π",
					Pi: "Π",
					pitchfork: "⋔",
					piv: "ϖ",
					planck: "ℏ",
					planckh: "ℎ",
					plankv: "ℏ",
					plus: "+",
					plusacir: "⨣",
					plusb: "⊞",
					pluscir: "⨢",
					plusdo: "∔",
					plusdu: "⨥",
					pluse: "⩲",
					PlusMinus: "±",
					plusmn: "±",
					plussim: "⨦",
					plustwo: "⨧",
					pm: "±",
					Poincareplane: "ℌ",
					pointint: "⨕",
					popf: "𝕡",
					Popf: "ℙ",
					pound: "£",
					pr: "≺",
					Pr: "⪻",
					prap: "⪷",
					prcue: "≼",
					pre: "⪯",
					prE: "⪳",
					prec: "≺",
					precapprox: "⪷",
					preccurlyeq: "≼",
					Precedes: "≺",
					PrecedesEqual: "⪯",
					PrecedesSlantEqual: "≼",
					PrecedesTilde: "≾",
					preceq: "⪯",
					precnapprox: "⪹",
					precneqq: "⪵",
					precnsim: "⋨",
					precsim: "≾",
					prime: "′",
					Prime: "″",
					primes: "ℙ",
					prnap: "⪹",
					prnE: "⪵",
					prnsim: "⋨",
					prod: "∏",
					Product: "∏",
					profalar: "⌮",
					profline: "⌒",
					profsurf: "⌓",
					prop: "∝",
					Proportion: "∷",
					Proportional: "∝",
					propto: "∝",
					prsim: "≾",
					prurel: "⊰",
					pscr: "𝓅",
					Pscr: "𝒫",
					psi: "ψ",
					Psi: "Ψ",
					puncsp: " ",
					qfr: "𝔮",
					Qfr: "𝔔",
					qint: "⨌",
					qopf: "𝕢",
					Qopf: "ℚ",
					qprime: "⁗",
					qscr: "𝓆",
					Qscr: "𝒬",
					quaternions: "ℍ",
					quatint: "⨖",
					quest: "?",
					questeq: "≟",
					quot: '"',
					QUOT: '"',
					rAarr: "⇛",
					race: "∽̱",
					racute: "ŕ",
					Racute: "Ŕ",
					radic: "√",
					raemptyv: "⦳",
					rang: "⟩",
					Rang: "⟫",
					rangd: "⦒",
					range: "⦥",
					rangle: "⟩",
					raquo: "»",
					rarr: "→",
					rArr: "⇒",
					Rarr: "↠",
					rarrap: "⥵",
					rarrb: "⇥",
					rarrbfs: "⤠",
					rarrc: "⤳",
					rarrfs: "⤞",
					rarrhk: "↪",
					rarrlp: "↬",
					rarrpl: "⥅",
					rarrsim: "⥴",
					rarrtl: "↣",
					Rarrtl: "⤖",
					rarrw: "↝",
					ratail: "⤚",
					rAtail: "⤜",
					ratio: "∶",
					rationals: "ℚ",
					rbarr: "⤍",
					rBarr: "⤏",
					RBarr: "⤐",
					rbbrk: "❳",
					rbrace: "}",
					rbrack: "]",
					rbrke: "⦌",
					rbrksld: "⦎",
					rbrkslu: "⦐",
					rcaron: "ř",
					Rcaron: "Ř",
					rcedil: "ŗ",
					Rcedil: "Ŗ",
					rceil: "⌉",
					rcub: "}",
					rcy: "р",
					Rcy: "Р",
					rdca: "⤷",
					rdldhar: "⥩",
					rdquo: "”",
					rdquor: "”",
					rdsh: "↳",
					Re: "ℜ",
					real: "ℜ",
					realine: "ℛ",
					realpart: "ℜ",
					reals: "ℝ",
					rect: "▭",
					reg: "®",
					REG: "®",
					ReverseElement: "∋",
					ReverseEquilibrium: "⇋",
					ReverseUpEquilibrium: "⥯",
					rfisht: "⥽",
					rfloor: "⌋",
					rfr: "𝔯",
					Rfr: "ℜ",
					rHar: "⥤",
					rhard: "⇁",
					rharu: "⇀",
					rharul: "⥬",
					rho: "ρ",
					Rho: "Ρ",
					rhov: "ϱ",
					RightAngleBracket: "⟩",
					rightarrow: "→",
					Rightarrow: "⇒",
					RightArrow: "→",
					RightArrowBar: "⇥",
					RightArrowLeftArrow: "⇄",
					rightarrowtail: "↣",
					RightCeiling: "⌉",
					RightDoubleBracket: "⟧",
					RightDownTeeVector: "⥝",
					RightDownVector: "⇂",
					RightDownVectorBar: "⥕",
					RightFloor: "⌋",
					rightharpoondown: "⇁",
					rightharpoonup: "⇀",
					rightleftarrows: "⇄",
					rightleftharpoons: "⇌",
					rightrightarrows: "⇉",
					rightsquigarrow: "↝",
					RightTee: "⊢",
					RightTeeArrow: "↦",
					RightTeeVector: "⥛",
					rightthreetimes: "⋌",
					RightTriangle: "⊳",
					RightTriangleBar: "⧐",
					RightTriangleEqual: "⊵",
					RightUpDownVector: "⥏",
					RightUpTeeVector: "⥜",
					RightUpVector: "↾",
					RightUpVectorBar: "⥔",
					RightVector: "⇀",
					RightVectorBar: "⥓",
					ring: "˚",
					risingdotseq: "≓",
					rlarr: "⇄",
					rlhar: "⇌",
					rlm: "‏",
					rmoust: "⎱",
					rmoustache: "⎱",
					rnmid: "⫮",
					roang: "⟭",
					roarr: "⇾",
					robrk: "⟧",
					ropar: "⦆",
					ropf: "𝕣",
					Ropf: "ℝ",
					roplus: "⨮",
					rotimes: "⨵",
					RoundImplies: "⥰",
					rpar: ")",
					rpargt: "⦔",
					rppolint: "⨒",
					rrarr: "⇉",
					Rrightarrow: "⇛",
					rsaquo: "›",
					rscr: "𝓇",
					Rscr: "ℛ",
					rsh: "↱",
					Rsh: "↱",
					rsqb: "]",
					rsquo: "’",
					rsquor: "’",
					rthree: "⋌",
					rtimes: "⋊",
					rtri: "▹",
					rtrie: "⊵",
					rtrif: "▸",
					rtriltri: "⧎",
					RuleDelayed: "⧴",
					ruluhar: "⥨",
					rx: "℞",
					sacute: "ś",
					Sacute: "Ś",
					sbquo: "‚",
					sc: "≻",
					Sc: "⪼",
					scap: "⪸",
					scaron: "š",
					Scaron: "Š",
					sccue: "≽",
					sce: "⪰",
					scE: "⪴",
					scedil: "ş",
					Scedil: "Ş",
					scirc: "ŝ",
					Scirc: "Ŝ",
					scnap: "⪺",
					scnE: "⪶",
					scnsim: "⋩",
					scpolint: "⨓",
					scsim: "≿",
					scy: "с",
					Scy: "С",
					sdot: "⋅",
					sdotb: "⊡",
					sdote: "⩦",
					searhk: "⤥",
					searr: "↘",
					seArr: "⇘",
					searrow: "↘",
					sect: "§",
					semi: ";",
					seswar: "⤩",
					setminus: "∖",
					setmn: "∖",
					sext: "✶",
					sfr: "𝔰",
					Sfr: "𝔖",
					sfrown: "⌢",
					sharp: "♯",
					shchcy: "щ",
					SHCHcy: "Щ",
					shcy: "ш",
					SHcy: "Ш",
					ShortDownArrow: "↓",
					ShortLeftArrow: "←",
					shortmid: "∣",
					shortparallel: "∥",
					ShortRightArrow: "→",
					ShortUpArrow: "↑",
					shy: "­",
					sigma: "σ",
					Sigma: "Σ",
					sigmaf: "ς",
					sigmav: "ς",
					sim: "∼",
					simdot: "⩪",
					sime: "≃",
					simeq: "≃",
					simg: "⪞",
					simgE: "⪠",
					siml: "⪝",
					simlE: "⪟",
					simne: "≆",
					simplus: "⨤",
					simrarr: "⥲",
					slarr: "←",
					SmallCircle: "∘",
					smallsetminus: "∖",
					smashp: "⨳",
					smeparsl: "⧤",
					smid: "∣",
					smile: "⌣",
					smt: "⪪",
					smte: "⪬",
					smtes: "⪬︀",
					softcy: "ь",
					SOFTcy: "Ь",
					sol: "/",
					solb: "⧄",
					solbar: "⌿",
					sopf: "𝕤",
					Sopf: "𝕊",
					spades: "♠",
					spadesuit: "♠",
					spar: "∥",
					sqcap: "⊓",
					sqcaps: "⊓︀",
					sqcup: "⊔",
					sqcups: "⊔︀",
					Sqrt: "√",
					sqsub: "⊏",
					sqsube: "⊑",
					sqsubset: "⊏",
					sqsubseteq: "⊑",
					sqsup: "⊐",
					sqsupe: "⊒",
					sqsupset: "⊐",
					sqsupseteq: "⊒",
					squ: "□",
					square: "□",
					Square: "□",
					SquareIntersection: "⊓",
					SquareSubset: "⊏",
					SquareSubsetEqual: "⊑",
					SquareSuperset: "⊐",
					SquareSupersetEqual: "⊒",
					SquareUnion: "⊔",
					squarf: "▪",
					squf: "▪",
					srarr: "→",
					sscr: "𝓈",
					Sscr: "𝒮",
					ssetmn: "∖",
					ssmile: "⌣",
					sstarf: "⋆",
					star: "☆",
					Star: "⋆",
					starf: "★",
					straightepsilon: "ϵ",
					straightphi: "ϕ",
					strns: "¯",
					sub: "⊂",
					Sub: "⋐",
					subdot: "⪽",
					sube: "⊆",
					subE: "⫅",
					subedot: "⫃",
					submult: "⫁",
					subne: "⊊",
					subnE: "⫋",
					subplus: "⪿",
					subrarr: "⥹",
					subset: "⊂",
					Subset: "⋐",
					subseteq: "⊆",
					subseteqq: "⫅",
					SubsetEqual: "⊆",
					subsetneq: "⊊",
					subsetneqq: "⫋",
					subsim: "⫇",
					subsub: "⫕",
					subsup: "⫓",
					succ: "≻",
					succapprox: "⪸",
					succcurlyeq: "≽",
					Succeeds: "≻",
					SucceedsEqual: "⪰",
					SucceedsSlantEqual: "≽",
					SucceedsTilde: "≿",
					succeq: "⪰",
					succnapprox: "⪺",
					succneqq: "⪶",
					succnsim: "⋩",
					succsim: "≿",
					SuchThat: "∋",
					sum: "∑",
					Sum: "∑",
					sung: "♪",
					sup: "⊃",
					Sup: "⋑",
					sup1: "¹",
					sup2: "²",
					sup3: "³",
					supdot: "⪾",
					supdsub: "⫘",
					supe: "⊇",
					supE: "⫆",
					supedot: "⫄",
					Superset: "⊃",
					SupersetEqual: "⊇",
					suphsol: "⟉",
					suphsub: "⫗",
					suplarr: "⥻",
					supmult: "⫂",
					supne: "⊋",
					supnE: "⫌",
					supplus: "⫀",
					supset: "⊃",
					Supset: "⋑",
					supseteq: "⊇",
					supseteqq: "⫆",
					supsetneq: "⊋",
					supsetneqq: "⫌",
					supsim: "⫈",
					supsub: "⫔",
					supsup: "⫖",
					swarhk: "⤦",
					swarr: "↙",
					swArr: "⇙",
					swarrow: "↙",
					swnwar: "⤪",
					szlig: "ß",
					Tab: "	",
					target: "⌖",
					tau: "τ",
					Tau: "Τ",
					tbrk: "⎴",
					tcaron: "ť",
					Tcaron: "Ť",
					tcedil: "ţ",
					Tcedil: "Ţ",
					tcy: "т",
					Tcy: "Т",
					tdot: "⃛",
					telrec: "⌕",
					tfr: "𝔱",
					Tfr: "𝔗",
					there4: "∴",
					therefore: "∴",
					Therefore: "∴",
					theta: "θ",
					Theta: "Θ",
					thetasym: "ϑ",
					thetav: "ϑ",
					thickapprox: "≈",
					thicksim: "∼",
					ThickSpace: "  ",
					thinsp: " ",
					ThinSpace: " ",
					thkap: "≈",
					thksim: "∼",
					thorn: "þ",
					THORN: "Þ",
					tilde: "˜",
					Tilde: "∼",
					TildeEqual: "≃",
					TildeFullEqual: "≅",
					TildeTilde: "≈",
					times: "×",
					timesb: "⊠",
					timesbar: "⨱",
					timesd: "⨰",
					tint: "∭",
					toea: "⤨",
					top: "⊤",
					topbot: "⌶",
					topcir: "⫱",
					topf: "𝕥",
					Topf: "𝕋",
					topfork: "⫚",
					tosa: "⤩",
					tprime: "‴",
					trade: "™",
					TRADE: "™",
					triangle: "▵",
					triangledown: "▿",
					triangleleft: "◃",
					trianglelefteq: "⊴",
					triangleq: "≜",
					triangleright: "▹",
					trianglerighteq: "⊵",
					tridot: "◬",
					trie: "≜",
					triminus: "⨺",
					TripleDot: "⃛",
					triplus: "⨹",
					trisb: "⧍",
					tritime: "⨻",
					trpezium: "⏢",
					tscr: "𝓉",
					Tscr: "𝒯",
					tscy: "ц",
					TScy: "Ц",
					tshcy: "ћ",
					TSHcy: "Ћ",
					tstrok: "ŧ",
					Tstrok: "Ŧ",
					twixt: "≬",
					twoheadleftarrow: "↞",
					twoheadrightarrow: "↠",
					uacute: "ú",
					Uacute: "Ú",
					uarr: "↑",
					uArr: "⇑",
					Uarr: "↟",
					Uarrocir: "⥉",
					ubrcy: "ў",
					Ubrcy: "Ў",
					ubreve: "ŭ",
					Ubreve: "Ŭ",
					ucirc: "û",
					Ucirc: "Û",
					ucy: "у",
					Ucy: "У",
					udarr: "⇅",
					udblac: "ű",
					Udblac: "Ű",
					udhar: "⥮",
					ufisht: "⥾",
					ufr: "𝔲",
					Ufr: "𝔘",
					ugrave: "ù",
					Ugrave: "Ù",
					uHar: "⥣",
					uharl: "↿",
					uharr: "↾",
					uhblk: "▀",
					ulcorn: "⌜",
					ulcorner: "⌜",
					ulcrop: "⌏",
					ultri: "◸",
					umacr: "ū",
					Umacr: "Ū",
					uml: "¨",
					UnderBar: "_",
					UnderBrace: "⏟",
					UnderBracket: "⎵",
					UnderParenthesis: "⏝",
					Union: "⋃",
					UnionPlus: "⊎",
					uogon: "ų",
					Uogon: "Ų",
					uopf: "𝕦",
					Uopf: "𝕌",
					uparrow: "↑",
					Uparrow: "⇑",
					UpArrow: "↑",
					UpArrowBar: "⤒",
					UpArrowDownArrow: "⇅",
					updownarrow: "↕",
					Updownarrow: "⇕",
					UpDownArrow: "↕",
					UpEquilibrium: "⥮",
					upharpoonleft: "↿",
					upharpoonright: "↾",
					uplus: "⊎",
					UpperLeftArrow: "↖",
					UpperRightArrow: "↗",
					upsi: "υ",
					Upsi: "ϒ",
					upsih: "ϒ",
					upsilon: "υ",
					Upsilon: "Υ",
					UpTee: "⊥",
					UpTeeArrow: "↥",
					upuparrows: "⇈",
					urcorn: "⌝",
					urcorner: "⌝",
					urcrop: "⌎",
					uring: "ů",
					Uring: "Ů",
					urtri: "◹",
					uscr: "𝓊",
					Uscr: "𝒰",
					utdot: "⋰",
					utilde: "ũ",
					Utilde: "Ũ",
					utri: "▵",
					utrif: "▴",
					uuarr: "⇈",
					uuml: "ü",
					Uuml: "Ü",
					uwangle: "⦧",
					vangrt: "⦜",
					varepsilon: "ϵ",
					varkappa: "ϰ",
					varnothing: "∅",
					varphi: "ϕ",
					varpi: "ϖ",
					varpropto: "∝",
					varr: "↕",
					vArr: "⇕",
					varrho: "ϱ",
					varsigma: "ς",
					varsubsetneq: "⊊︀",
					varsubsetneqq: "⫋︀",
					varsupsetneq: "⊋︀",
					varsupsetneqq: "⫌︀",
					vartheta: "ϑ",
					vartriangleleft: "⊲",
					vartriangleright: "⊳",
					vBar: "⫨",
					Vbar: "⫫",
					vBarv: "⫩",
					vcy: "в",
					Vcy: "В",
					vdash: "⊢",
					vDash: "⊨",
					Vdash: "⊩",
					VDash: "⊫",
					Vdashl: "⫦",
					vee: "∨",
					Vee: "⋁",
					veebar: "⊻",
					veeeq: "≚",
					vellip: "⋮",
					verbar: "|",
					Verbar: "‖",
					vert: "|",
					Vert: "‖",
					VerticalBar: "∣",
					VerticalLine: "|",
					VerticalSeparator: "❘",
					VerticalTilde: "≀",
					VeryThinSpace: " ",
					vfr: "𝔳",
					Vfr: "𝔙",
					vltri: "⊲",
					vnsub: "⊂⃒",
					vnsup: "⊃⃒",
					vopf: "𝕧",
					Vopf: "𝕍",
					vprop: "∝",
					vrtri: "⊳",
					vscr: "𝓋",
					Vscr: "𝒱",
					vsubne: "⊊︀",
					vsubnE: "⫋︀",
					vsupne: "⊋︀",
					vsupnE: "⫌︀",
					Vvdash: "⊪",
					vzigzag: "⦚",
					wcirc: "ŵ",
					Wcirc: "Ŵ",
					wedbar: "⩟",
					wedge: "∧",
					Wedge: "⋀",
					wedgeq: "≙",
					weierp: "℘",
					wfr: "𝔴",
					Wfr: "𝔚",
					wopf: "𝕨",
					Wopf: "𝕎",
					wp: "℘",
					wr: "≀",
					wreath: "≀",
					wscr: "𝓌",
					Wscr: "𝒲",
					xcap: "⋂",
					xcirc: "◯",
					xcup: "⋃",
					xdtri: "▽",
					xfr: "𝔵",
					Xfr: "𝔛",
					xharr: "⟷",
					xhArr: "⟺",
					xi: "ξ",
					Xi: "Ξ",
					xlarr: "⟵",
					xlArr: "⟸",
					xmap: "⟼",
					xnis: "⋻",
					xodot: "⨀",
					xopf: "𝕩",
					Xopf: "𝕏",
					xoplus: "⨁",
					xotime: "⨂",
					xrarr: "⟶",
					xrArr: "⟹",
					xscr: "𝓍",
					Xscr: "𝒳",
					xsqcup: "⨆",
					xuplus: "⨄",
					xutri: "△",
					xvee: "⋁",
					xwedge: "⋀",
					yacute: "ý",
					Yacute: "Ý",
					yacy: "я",
					YAcy: "Я",
					ycirc: "ŷ",
					Ycirc: "Ŷ",
					ycy: "ы",
					Ycy: "Ы",
					yen: "¥",
					yfr: "𝔶",
					Yfr: "𝔜",
					yicy: "ї",
					YIcy: "Ї",
					yopf: "𝕪",
					Yopf: "𝕐",
					yscr: "𝓎",
					Yscr: "𝒴",
					yucy: "ю",
					YUcy: "Ю",
					yuml: "ÿ",
					Yuml: "Ÿ",
					zacute: "ź",
					Zacute: "Ź",
					zcaron: "ž",
					Zcaron: "Ž",
					zcy: "з",
					Zcy: "З",
					zdot: "ż",
					Zdot: "Ż",
					zeetrf: "ℨ",
					ZeroWidthSpace: "​",
					zeta: "ζ",
					Zeta: "Ζ",
					zfr: "𝔷",
					Zfr: "ℨ",
					zhcy: "ж",
					ZHcy: "Ж",
					zigrarr: "⇝",
					zopf: "𝕫",
					Zopf: "ℤ",
					zscr: "𝓏",
					Zscr: "𝒵",
					zwj: "‍",
					zwnj: "‌"
				},
				F = {
					aacute: "á",
					Aacute: "Á",
					acirc: "â",
					Acirc: "Â",
					acute: "´",
					aelig: "æ",
					AElig: "Æ",
					agrave: "à",
					Agrave: "À",
					amp: "&",
					AMP: "&",
					aring: "å",
					Aring: "Å",
					atilde: "ã",
					Atilde: "Ã",
					auml: "ä",
					Auml: "Ä",
					brvbar: "¦",
					ccedil: "ç",
					Ccedil: "Ç",
					cedil: "¸",
					cent: "¢",
					copy: "©",
					COPY: "©",
					curren: "¤",
					deg: "°",
					divide: "÷",
					eacute: "é",
					Eacute: "É",
					ecirc: "ê",
					Ecirc: "Ê",
					egrave: "è",
					Egrave: "È",
					eth: "ð",
					ETH: "Ð",
					euml: "ë",
					Euml: "Ë",
					frac12: "½",
					frac14: "¼",
					frac34: "¾",
					gt: ">",
					GT: ">",
					iacute: "í",
					Iacute: "Í",
					icirc: "î",
					Icirc: "Î",
					iexcl: "¡",
					igrave: "ì",
					Igrave: "Ì",
					iquest: "¿",
					iuml: "ï",
					Iuml: "Ï",
					laquo: "«",
					lt: "<",
					LT: "<",
					macr: "¯",
					micro: "µ",
					middot: "·",
					nbsp: " ",
					not: "¬",
					ntilde: "ñ",
					Ntilde: "Ñ",
					oacute: "ó",
					Oacute: "Ó",
					ocirc: "ô",
					Ocirc: "Ô",
					ograve: "ò",
					Ograve: "Ò",
					ordf: "ª",
					ordm: "º",
					oslash: "ø",
					Oslash: "Ø",
					otilde: "õ",
					Otilde: "Õ",
					ouml: "ö",
					Ouml: "Ö",
					para: "¶",
					plusmn: "±",
					pound: "£",
					quot: '"',
					QUOT: '"',
					raquo: "»",
					reg: "®",
					REG: "®",
					sect: "§",
					shy: "­",
					sup1: "¹",
					sup2: "²",
					sup3: "³",
					szlig: "ß",
					thorn: "þ",
					THORN: "Þ",
					times: "×",
					uacute: "ú",
					Uacute: "Ú",
					ucirc: "û",
					Ucirc: "Û",
					ugrave: "ù",
					Ugrave: "Ù",
					uml: "¨",
					uuml: "ü",
					Uuml: "Ü",
					yacute: "ý",
					Yacute: "Ý",
					yen: "¥",
					yuml: "ÿ"
				},
				z = {
					0: "�",
					128: "€",
					130: "‚",
					131: "ƒ",
					132: "„",
					133: "…",
					134: "†",
					135: "‡",
					136: "ˆ",
					137: "‰",
					138: "Š",
					139: "‹",
					140: "Œ",
					142: "Ž",
					145: "‘",
					146: "’",
					147: "“",
					148: "”",
					149: "•",
					150: "–",
					151: "—",
					152: "˜",
					153: "™",
					154: "š",
					155: "›",
					156: "œ",
					158: "ž",
					159: "Ÿ"
				},
				W = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65e3, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111],
				V = String.fromCharCode,
				I = {},
				J = I.hasOwnProperty,
				H = function(q, O) {
					return J.call(q, O)
				},
				$ = function(q, O) {
					for (var x = -1, _ = q.length; ++x < _;)
						if (q[x] == O) return !0;
					return !1
				},
				Z = function(q, O) {
					if (!q) return O;
					var x = {},
						_;
					for (_ in O) x[_] = H(q, _) ? q[_] : O[_];
					return x
				},
				de = function(q, O) {
					var x = "";
					return q >= 55296 && q <= 57343 || q > 1114111 ? (O && ne("character reference outside the permissible Unicode range"), "�") : H(z, q) ? (O && ne("disallowed character reference"), z[q]) : (O && $(W, q) && ne("disallowed character reference"), q > 65535 && (q -= 65536, x += V(q >>> 10 & 1023 | 55296), q = 56320 | q & 1023), x += V(q), x)
				},
				pe = function(q) {
					return "&#x" + q.toString(16).toUpperCase() + ";"
				},
				De = function(q) {
					return "&#" + q + ";"
				},
				ne = function(q) {
					throw Error("Parse error: " + q)
				},
				Se = function(q, O) {
					O = Z(O, Se.options);
					var x = O.strict;
					x && B.test(q) && ne("forbidden code point");
					var _ = O.encodeEverything,
						ae = O.useNamedReferences,
						se = O.allowUnsafeSymbols,
						ce = O.decimal ? De : pe,
						Q = function(K) {
							return ce(K.charCodeAt(0))
						};
					return _ ? (q = q.replace(k, function(K) {
						return ae && H(N, K) ? "&" + N[K] + ";" : Q(K)
					}), ae && (q = q.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;")), ae && (q = q.replace(A, function(K) {
						return "&" + N[K] + ";"
					}))) : ae ? (se || (q = q.replace(b, function(K) {
						return "&" + N[K] + ";"
					})), q = q.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;"), q = q.replace(A, function(K) {
						return "&" + N[K] + ";"
					})) : se || (q = q.replace(b, Q)), q.replace(y, function(K) {
						var ie = K.charCodeAt(0),
							ge = K.charCodeAt(1),
							Ie = (ie - 55296) * 1024 + ge - 56320 + 65536;
						return ce(Ie)
					}).replace(D, Q)
				};
			Se.options = {
				allowUnsafeSymbols: !1,
				encodeEverything: !1,
				strict: !1,
				useNamedReferences: !1,
				decimal: !1
			};
			var we = function(q, O) {
				O = Z(O, we.options);
				var x = O.strict;
				return x && j.test(q) && ne("malformed character reference"), q.replace(L, function(_, ae, se, ce, Q, K, ie, ge, Ie) {
					var ht, cr, dr, _r, fr, pr;
					return ae ? (fr = ae, P[fr]) : se ? (fr = se, pr = ce, pr && O.isAttributeValue ? (x && pr == "=" && ne("`&` did not start a character reference"), _) : (x && ne("named character reference was not terminated by a semicolon"), F[fr] + (pr || ""))) : Q ? (dr = Q, cr = K, x && !cr && ne("character reference was not terminated by a semicolon"), ht = parseInt(dr, 10), de(ht, x)) : ie ? (_r = ie, cr = ge, x && !cr && ne("character reference was not terminated by a semicolon"), ht = parseInt(_r, 16), de(ht, x)) : (x && ne("named character reference was not terminated by a semicolon"), _)
				})
			};
			we.options = {
				isAttributeValue: !1,
				strict: !1
			};
			var _e = function(q) {
					return q.replace(b, function(O) {
						return w[O]
					})
				},
				xe = {
					version: "1.2.0",
					encode: Se,
					decode: we,
					escape: _e,
					unescape: we
				};
			if (d && !d.nodeType)
				if (f) f.exports = xe;
				else
					for (var G in xe) H(xe, G) && (d[G] = xe[G]);
			else o.he = xe
		})(mp)
	}(Yn, Yn.exports)), Yn.exports
}
var gp = hp();
const Ye = Si(gp);
var C2 = {
		color: void 0,
		size: void 0,
		className: void 0,
		style: void 0,
		attr: void 0
	},
	Gc = jr.createContext && jr.createContext(C2),
	or = function() {
		return or = Object.assign || function(u) {
			for (var s, o = 1, d = arguments.length; o < d; o++) {
				s = arguments[o];
				for (var f in s) Object.prototype.hasOwnProperty.call(s, f) && (u[f] = s[f])
			}
			return u
		}, or.apply(this, arguments)
	},
	xp = function(u, s) {
		var o = {};
		for (var d in u) Object.prototype.hasOwnProperty.call(u, d) && s.indexOf(d) < 0 && (o[d] = u[d]);
		if (u != null && typeof Object.getOwnPropertySymbols == "function")
			for (var f = 0, d = Object.getOwnPropertySymbols(u); f < d.length; f++) s.indexOf(d[f]) < 0 && Object.prototype.propertyIsEnumerable.call(u, d[f]) && (o[d[f]] = u[d[f]]);
		return o
	};

function E2(u) {
	return u && u.map(function(s, o) {
		return jr.createElement(s.tag, or({
			key: o
		}, s.attr), E2(s.child))
	})
}

function ve(u) {
	return function(s) {
		return jr.createElement(vp, or({
			attr: or({}, u.attr)
		}, s), E2(u.child))
	}
}

function vp(u) {
	var s = function(o) {
		var d = u.attr,
			f = u.size,
			m = u.title,
			y = xp(u, ["attr", "size", "title"]),
			k = f || o.size || "1em",
			D;
		return o.className && (D = o.className), u.className && (D = (D ? D + " " : "") + u.className), jr.createElement("svg", or({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, o.attr, d, y, {
			className: D,
			style: or(or({
				color: u.color || o.color
			}, o.style), u.style),
			height: k,
			width: k,
			xmlns: "http://www.w3.org/2000/svg"
		}), m && jr.createElement("title", null, m), u.children)
	};
	return Gc !== void 0 ? jr.createElement(Gc.Consumer, null, function(o) {
		return s(o)
	}) : s(C2)
}

function yp(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				fill: "none",
				strokeMiterlimit: "10",
				strokeWidth: "32",
				d: "M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
			}
		}, {
			tag: "path",
			attr: {
				d: "M350.67 150.93l-117.2 46.88a64 64 0 00-35.66 35.66l-46.88 117.2a8 8 0 0010.4 10.4l117.2-46.88a64 64 0 0035.66-35.66l46.88-117.2a8 8 0 00-10.4-10.4zM256 280a24 24 0 1124-24 24 24 0 01-24 24z"
			}
		}]
	})(u)
}

function Dp(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "circle",
			attr: {
				cx: "256",
				cy: "256",
				r: "24"
			}
		}, {
			tag: "path",
			attr: {
				d: "M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm105.07 113.33l-46.88 117.2a64 64 0 01-35.66 35.66l-117.2 46.88a8 8 0 01-10.4-10.4l46.88-117.2a64 64 0 0135.66-35.66l117.2-46.88a8 8 0 0110.4 10.4z"
			}
		}]
	})(u)
}

function wp(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				fill: "none",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				strokeWidth: "32",
				d: "M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
			}
		}]
	})(u)
}

function Ap(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M256 448l-9-6c-42.78-28.57-96.91-60.86-137-108.32-42.25-50-62.52-101.35-62-157C48.63 114.54 98.46 64 159.08 64c48.11 0 80.1 28 96.92 48.21C272.82 92 304.81 64 352.92 64c60.62 0 110.45 50.54 111.08 112.65.56 55.68-19.71 107-62 157-40.09 47.49-94.22 79.78-137 108.35z"
			}
		}]
	})(u)
}

function Cp(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z"
			}
		}]
	})(u)
}

function Ep(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				fill: "none",
				strokeMiterlimit: "10",
				strokeWidth: "32",
				d: "M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
			}
		}, {
			tag: "path",
			attr: {
				fill: "none",
				strokeLinecap: "round",
				strokeMiterlimit: "10",
				strokeWidth: "32",
				d: "M338.29 338.29L448 448"
			}
		}]
	})(u)
}

function k2(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M384 336a63.78 63.78 0 00-46.12 19.7l-148-83.27a63.85 63.85 0 000-32.86l148-83.27a63.8 63.8 0 10-15.73-27.87l-148 83.27a64 64 0 100 88.6l148 83.27A64 64 0 10384 336z"
			}
		}]
	})(u)
}

function kp(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zm0 368a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zm113.14-321.14a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zm-368 0H48a22 22 0 010-44h48a22 22 0 010 44zm307.08 147.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"
			}
		}]
	})(u)
}
const Sp = () => {
		const [u, s] = g.useState(() => localStorage.getItem("theme") || "dark");
		return g.useEffect(() => {
			document.documentElement.setAttribute("data-theme", u), localStorage.setItem("theme", u)
		}, [u]), i.jsx("div", {
			className: "theme-toggle flex",
			onClick: () => s(u === "dark" ? "light" : "dark"),
			children: u === "dark" ? i.jsx(Cp, {
				className: "theme-icon moon",
				title: "Dark"
			}) : i.jsx(kp, {
				title: "Light",
				className: "theme-icon sun"
			})
		})
	},
	Br = () => {
		const {
			playMusic: u
		} = g.useContext(an), [s, o] = g.useState([]);
		let d = [];
		const [f, m] = g.useState([]), y = vl(), k = async j => {
			var B, L, P, F, z;
			if (!j.trim()) {
				m([]);
				return
			}
			try {
				const W = await sp(j),
					V = await D2(j, 5),
					I = await cp(j, 5),
					J = [];
				(B = V == null ? void 0 : V.data) != null && B.results && J.push(...V.data.results.map(H => ({
					type: "Song",
					name: H.name,
					id: H.id,
					duration: H.duration,
					artist: H.artists,
					image: H.image[2].url,
					downloadUrl: H.downloadUrl[4].url
				}))), (P = (L = W == null ? void 0 : W.data) == null ? void 0 : L.albums) != null && P.results && J.push(...W.data.albums.results.map(H => {
					var $, Z;
					return {
						type: "Album",
						name: H.title,
						id: H.id,
						artist: H.artist,
						image: (Z = ($ = H.image) == null ? void 0 : $[2]) == null ? void 0 : Z.url
					}
				})), (z = (F = W == null ? void 0 : W.data) == null ? void 0 : F.playlists) != null && z.results && J.push(...W.data.playlists.results.map(H => ({
					type: "Playlist",
					name: H.title,
					id: H.id,
					image: H.image[2].url
				}))), I != null && I.data.results && J.push(...I.data.results.map(H => ({
					type: H.type,
					name: H.name,
					id: H.id,
					image: H.image[2].url
				}))), m(J)
			} catch (W) {
				console.error("Error fetching suggestions:", W), m([])
			}
		}, D = j => {
			const B = j.target.value;
			o(B), k(B)
		}, A = j => {
			j.preventDefault(), s.trim() && (y(`/search/${s}`), m([]))
		}, N = () => {
			const j = new Date().getHours();
			return j < 12 ? "Good Morning" : j < 18 ? "Good Afternoon" : "Good Evening"
		}, b = async j => {
			const L = (await Li(j.id)).data || [];
			return [j, ...L]
		}, w = async j => {
			switch (j.type === "Song" && (d = await b(j)), j.type) {
				case "Song":
					u(j.downloadUrl, j.name, j.duration, j.image, j.id, j.artist, d);
					break;
				case "Album":
					y(`/albums/${j.id}`);
					break;
				case "artist":
					y(`/artists/${j.id}`);
					break;
				case "Playlist":
					y(`/playlists/${j.id}`);
					break;
				default:
					console.warn("Unknown suggestion type:", j.type)
			}
			o(""), m([])
		};
		return i.jsxs("nav", {
			className: "navbar flex flex-col lg:gap-10 lg:flex-row lg:items-center top-0 z-20 fixed w-full pl-1 pr-1 lg:px-2   lg:h-[4.5rem]",
			children: [i.jsxs("div", {
				className: "flex  items-center gap-[4rem] mb-2 lg:mb-0 w-fit",
				children: [i.jsxs("div", {
					className: "flex items-center lg:gap-[4rem] gap-5  h-[61px]",
					children: [i.jsxs(Pe, {
						to: "/",
						className: "flex items-center ",
						children: [i.jsx("span", {
							className: "bg"
						}), i.jsxs("div", {
							className: "",
							children: [i.jsx("span", {
								className: "Musi text-zinc-600 font-extrabold text-2xl lg:text-3xl",
								children: "8"
							}), i.jsx("span", {
								className: "fy text-zinc-200 font-extrabold text-2xl lg:text-3xl",
								children: "Music"
							})]
						})]
					}), i.jsx("div", {
						className: "text-xl pl-6 w-max flex self-center lg:hidden font-semibold ",
						children: N()
					}), i.jsx(Sp, {})]
				}), i.jsxs("div", {
					className: "lg:flex gap-[2rem] w-[15rem] grey hidden font-semibold",
					children: [i.jsx(Pe, {
						to: "/Browse",
						children: i.jsx("h2", {
							className: "lg:text-xl text-lg",
							children: "Browse"
						})
					}), i.jsx(Pe, {
						to: "/Music",
						children: i.jsx("h2", {
							className: "lg:text-xl text-lg ",
							children: "My Music"
						})
					})]
				})]
			}), i.jsx("div", {
				className: "flex-grow  ",
				children: i.jsxs("form", {
					onSubmit: A,
					className: "relative  flex flex-col lg:flex-row items-center gap-2",
					children: [i.jsxs("div", {
						className: "flex w-full ",
						children: [i.jsx("input", {
							type: "text",
							name: "search",
							id: "search",
							placeholder: "Search for Songs, Artists, and Playlists",
							className: "flex-grow h-11 p-1 pl-5 rounded-l-lg  bg-transparent focus:outline-none ",
							value: s,
							onChange: D,
							autoComplete: "off",
							autoCorrect: "off"
						}), i.jsx("button", {
							type: "submit",
							className: "search-btn h-11 w-11 rounded-r-lg flex items-center justify-center",
							children: i.jsx(Ep, {
								className: "text-2xl search"
							})
						})]
					}), i.jsx("div", {
						className: `suggestionSection lg:shadow-xl   absolute scroll-hide top-[2.74rem] lg:top-[4.5rem] left-0 lg:left-auto   p-3 grid grid-cols-2 lg:grid-cols-3 gap-3 rounded-lg  w-full max-h-[20rem] overflow-auto transition-transform duration-200 ${f.length>0?"visible opacity-100 left-1 ":"invisible opacity-0"}`,
						children: f.map((j, B) => i.jsxs("div", {
							className: "flex items-center gap-3  p-3 rounded cursor-pointer hoover ",
							onClick: () => w(j),
							children: [i.jsx("img", {
								src: j.image,
								alt: "",
								className: "h-[3rem] w-[3rem] rounded"
							}), i.jsxs("div", {
								className: "flex flex-col overflow-hidden",
								children: [i.jsx("span", {
									className: "text-sm truncate ",
									children: Ye.decode(j.name)
								}), i.jsx("span", {
									className: " text-xs",
									children: j.type
								})]
							})]
						}, B))
					})]
				})
			})]
		})
	};

function jp(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"
			}
		}]
	})(u)
}

function Bp(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"
			}
		}]
	})(u)
}

function Fp(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"
			}
		}]
	})(u)
}

function Wc(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M170.7 256L448 448V64L170.7 256zM64 64h64v384H64z"
			}
		}]
	})(u)
}

function Qc(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M64 64v384l277.3-192L64 64zM384 64h64v384h-64z"
			}
		}]
	})(u)
}

function Kc(u) {
	return ve({
		attr: {
			viewBox: "0 0 256 256",
			fill: "currentColor"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M240.49,175.51a12,12,0,0,1,0,17l-24,24a12,12,0,0,1-17-17L203,196h-2.09a76.17,76.17,0,0,1-61.85-31.83L97.38,105.78A52.1,52.1,0,0,0,55.06,84H32a12,12,0,0,1,0-24H55.06a76.17,76.17,0,0,1,61.85,31.83l41.71,58.39A52.1,52.1,0,0,0,200.94,172H203l-3.52-3.51a12,12,0,0,1,17-17Zm-95.62-72.62a12,12,0,0,0,16.93-1.13A52,52,0,0,1,200.94,84H203l-3.52,3.51a12,12,0,0,0,17,17l24-24a12,12,0,0,0,0-17l-24-24a12,12,0,0,0-17,17L203,60h-2.09a76,76,0,0,0-57.2,26A12,12,0,0,0,144.87,102.89Zm-33.74,50.22a12,12,0,0,0-16.93,1.13A52,52,0,0,1,55.06,172H32a12,12,0,0,0,0,24H55.06a76,76,0,0,0,57.2-26A12,12,0,0,0,111.13,153.11Z"
			}
		}]
	})(u)
}

function Np(u) {
	return ve({
		attr: {
			viewBox: "0 0 256 256",
			fill: "currentColor"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M208,128a39.93,39.93,0,0,1-10,26.46,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58A40,40,0,0,1,208,128ZM160,32V224a8,8,0,0,1-12.91,6.31L77.25,176H32a16,16,0,0,1-16-16V96A16,16,0,0,1,32,80H77.25l69.84-54.31A8,8,0,0,1,160,32ZM72,96H32v64H72Z"
			}
		}]
	})(u)
}

function Yc(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: {
				d: "m17 2 4 4-4 4"
			}
		}, {
			tag: "path",
			attr: {
				d: "M3 11v-1a4 4 0 0 1 4-4h14"
			}
		}, {
			tag: "path",
			attr: {
				d: "m7 22-4-4 4-4"
			}
		}, {
			tag: "path",
			attr: {
				d: "M21 13v1a4 4 0 0 1-4 4H3"
			}
		}, {
			tag: "path",
			attr: {
				d: "M11 10h1v4"
			}
		}]
	})(u)
}

function Jc(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		},
		child: [{
			tag: "path",
			attr: {
				d: "m17 2 4 4-4 4"
			}
		}, {
			tag: "path",
			attr: {
				d: "M3 11v-1a4 4 0 0 1 4-4h14"
			}
		}, {
			tag: "path",
			attr: {
				d: "m7 22-4-4 4-4"
			}
		}, {
			tag: "path",
			attr: {
				d: "M21 13v1a4 4 0 0 1-4 4H3"
			}
		}]
	})(u)
}

function Zc(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
			}
		}]
	})(u)
}

function Xc(u) {
	return ve({
		attr: {
			viewBox: "0 0 448 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
			}
		}]
	})(u)
}

function hl(u) {
	return ve({
		attr: {
			viewBox: "0 0 448 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
			}
		}]
	})(u)
}

function e2(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
			}
		}]
	})(u)
}

function t2(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24"
		},
		child: [{
			tag: "path",
			attr: {
				fill: "none",
				d: "M0 0h24v24H0z"
			}
		}, {
			tag: "path",
			attr: {
				d: "M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"
			}
		}]
	})(u)
}

function it(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24"
		},
		child: [{
			tag: "path",
			attr: {
				fill: "none",
				d: "M0 0h24v24H0V0z"
			}
		}, {
			tag: "path",
			attr: {
				d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
			}
		}]
	})(u)
}

function ot(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24"
		},
		child: [{
			tag: "path",
			attr: {
				fill: "none",
				d: "M0 0h24v24H0V0z"
			}
		}, {
			tag: "path",
			attr: {
				d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
			}
		}]
	})(u)
}

function _p(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24"
		},
		child: [{
			tag: "g",
			attr: {
				id: "Maximize_1"
			},
			child: [{
				tag: "g",
				attr: {},
				child: [{
					tag: "path",
					attr: {
						d: "M3.065,16.16a.5.5,0,0,1,1,0v3.07l.01-.01,6.07-6.07a.5.5,0,0,1,.71.71c-.29.29-.58.57-.87.86-1.74,1.74-3.47,3.48-5.21,5.22h3.07a.5.5,0,0,1,0,1H3.565a.429.429,0,0,1-.34-.14c-.01-.01-.02-.01-.02-.02a.384.384,0,0,1-.13-.26C3.066,20.442,3.065,16.16,3.065,16.16Z"
					}
				}, {
					tag: "path",
					attr: {
						d: "M20.935,3.56V7.84a.5.5,0,0,1-1,0V4.77l-.01.01q-3.045,3.03-6.07,6.07a.5.5,0,0,1-.71-.71c.29-.29.58-.57.86-.86,1.75-1.74,3.48-3.48,5.22-5.22h-3.07a.5.5,0,0,1,0-1h4.28a.429.429,0,0,1,.34.14c.01.01.02.01.02.02A.429.429,0,0,1,20.935,3.56Z"
					}
				}]
			}]
		}]
	})(u)
}
const qi = ({
		name: u,
		artists: s,
		id: o,
		image: d
	}) => {
		var m;
		Array.isArray(s == null ? void 0 : s.primary) && s.primary.map(y => y.name).join(" , ");
		const f = (m = d[2]) == null ? void 0 : m.url;
		return i.jsxs(Pe, {
			to: `/artists/${o}`,
			className: "w-[7rem] lg:w-[8rem] h-[10.5rem] drop-shadow-lg overflow-y-clip flex flex-col justify-center items-center gap-3 rounded-lg",
			children: [i.jsx("img", {
				src: f || "/Unknown.png",
				alt: u,
				className: "rounded-[3rem]  lg:hover:scale-105 transition-all duration-200 ease-in-out"
			}), i.jsx("div", {
				className: "text-[13px] w-full h-[2rem] flex flex-col justify-center items-center",
				children: i.jsx("span", {
					className: "font-semibold overflow-x-clip",
					children: u
				})
			})]
		})
	},
	nn = ({
		name: u,
		artists: s,
		duration: o,
		downloadUrl: d,
		image: f,
		id: m,
		song: y
	}) => {
		var N, b;
		const {
			playMusic: k
		} = g.useContext(an), D = ((N = f[2]) == null ? void 0 : N.url) || f, A = Array.isArray(s == null ? void 0 : s.primary) ? s == null ? void 0 : s.primary.map(w => w.name).join(", ") : "Unknown Artist";
		return d = d ? ((b = d[4]) == null ? void 0 : b.url) || d : y.audio, i.jsx("span", {
			className: "card w-[9.5rem] h-[11.9rem] overflow-clip p-1  rounded-lg cursor-pointer shadow-md",
			onClick: () => k(d, u, o, D, m, s, y),
			children: i.jsxs("div", {
				className: "",
				children: [i.jsx("div", {
					className: "p-1",
					children: i.jsx("img", {
						src: D,
						alt: "",
						className: " top-0 rounded-lg imgs  "
					})
				}), i.jsxs("div", {
					className: "text-[13px] w-full flex flex-col justify-center pl-2",
					children: [i.jsx("span", {
						className: "font-semibold overflow-clip w-[9rem] h-[1.2rem] pr-2",
						children: u ? Ye.decode(u) : "Empty"
					}), i.jsxs("span", {
						className: "flex gap-1",
						children: ["by", i.jsx("p", {
							className: "font-semibold",
							children: Ye.decode(A)
						})]
					})]
				})]
			})
		})
	},
	Fr = () => {
		var ae, se, ce;
		const {
			currentSong: u,
			song: s,
			playMusic: o,
			isPlaying: d,
			shuffle: f,
			nextSong: m,
			prevSong: y,
			toggleShuffle: k,
			repeatMode: D,
			toggleRepeatMode: A,
			downloadSong: N
		} = g.useContext(an), [b, w] = g.useState(() => Number(localStorage.getItem("volume")) || 100), [j, B] = g.useState(!1), [L, P] = g.useState(!1), [F, z] = g.useState(0), [W, V] = g.useState({}), [I, J] = g.useState({}), [H, $] = g.useState([]), [Z, de] = g.useState(() => JSON.parse(localStorage.getItem("likedSongs")) || []), pe = g.useRef();
		g.useEffect(() => {
			if (!u) return;
			const Q = u == null ? void 0 : u.audio;
			z(Q.currentTime);
			const K = () => {
				z(Q.currentTime);
				const ie = Q.currentTime / Number(u == null ? void 0 : u.duration) * 100;
				pe.current.style.setProperty("--progress", `${ie}%`)
			};
			return Q.addEventListener("timeupdate", K), () => {
				Q.removeEventListener("timeupdate", K)
			}
		}, [u, d]);
		const De = g.useRef(null),
			ne = Q => {
				Q.current && (Q.current.scrollLeft -= 1e3)
			},
			Se = Q => {
				Q.current && (Q.current.scrollLeft += 1e3)
			};
		g.useEffect(() => {
			B(!!(u || d))
		}, [u, d]);
		const we = (ae = u == null ? void 0 : u.artists) != null && ae.primary ? u.artists.primary.map(Q => Q.name).join(", ") : "Unknown Artist";
		g.useEffect(() => {
			const Q = async () => {
				const K = await dp(u.id);
				V(K.data[0])
			};
			u != null && u.id && Q()
		}, [u]), g.useEffect(() => {
			if ((async () => {
					if (!(u != null && u.id)) return;
					const K = await Li(u.id);
					J(K.data), $(K.data)
				})(), u) {
				const K = u.audio;
				K.volume = b / 100;
				const ie = () => {
						z(K.currentTime);
						const Ie = Number(u.duration),
							ht = K.currentTime / Ie * 100;
						pe.current && (pe.current.value = ht)
					},
					ge = () => {
						!u || !u.id || m()
					};
				return K.addEventListener("timeupdate", ie), K.addEventListener("ended", ge), () => {
					K.removeEventListener("timeupdate", ie), K.removeEventListener("ended", ge)
				}
			}
		}, [u, b, m]);
		const _e = Q => {
				const ie = parseFloat(Q.target.value) / 100 * Number(u.duration);
				u.audio.currentTime = ie, z(ie)
			},
			xe = Q => {
				const K = parseFloat(Q.target.value) / 100;
				w(K * 100), localStorage.setItem("volume", K * 100), u != null && u.audio && (u.audio.volume = K)
			},
			G = () => {
				P(!L)
			},
			q = Q => {
				const K = Math.floor(Q / 60).toString().padStart(2, "0"),
					ie = Math.floor(Q % 60).toString().padStart(2, "0");
				return `${K}:${ie}`
			},
			O = () => {
				if (!u) return;
				const Q = {
						id: u.id,
						name: u.name,
						audio: u.audio.currentSrc,
						duration: u.duration,
						image: u.image,
						artists: u.artists
					},
					K = Z.some(ie => ie.id === u.id) ? Z.filter(ie => ie.id !== u.id) : [...Z, Q];
				de(K), localStorage.setItem("likedSongs", JSON.stringify(K))
			},
			x = (u == null ? void 0 : u.name) || "Unknown Title";
		g.useEffect(() => {
			"mediaSession" in navigator && (navigator.mediaSession.metadata = new MediaMetadata({
				title: Ye.decode(x),
				artist: Ye.decode(we),
				album: "8Music",
				artwork: [{
					src: (u == null ? void 0 : u.image) || "/Unknown.png",
					sizes: "500x500",
					type: "image/png"
				}]
			}), navigator.mediaSession.setActionHandler("play", () => {
				o(u == null ? void 0 : u.audio.currentSrc, u == null ? void 0 : u.name, u == null ? void 0 : u.duration, u == null ? void 0 : u.image, u == null ? void 0 : u.id, s)
			}), navigator.mediaSession.setActionHandler("pause", () => {
				o(u == null ? void 0 : u.audio.currentSrc, u == null ? void 0 : u.name, u == null ? void 0 : u.duration, u == null ? void 0 : u.image, u == null ? void 0 : u.id, s)
			}), navigator.mediaSession.setActionHandler("previoustrack", y), navigator.mediaSession.setActionHandler("nexttrack", m))
		}, [u, we, o, y, m, s, x]);
		const _ = document.documentElement.getAttribute("data-theme");
		return u && (D === "one" ? u.audio.loop = !0 : u.audio.loop = !1), i.jsx("div", {
			className: ` ${j?"lg:flex ":"hidden"}
      fixed bottom-14 lg:bottom-0 left-0 w-screen z-20 flex   justify-center items-center   `,
			children: i.jsx("div", {
				className: `flex flex-col h-auto w-screen bg-auto rounded-tl-xl rounded-tr-xl  relative transition-all ease-in-out duration-500  ${L?"  pt-[26rem] backdrop-brightness-[0.4]":"lg:h-[6rem] h-auto p-4 Player"}`,
				children: i.jsxs("div", {
					className: "flex flex-col w-full",
					children: [!L && i.jsxs(i.Fragment, {
						children: [i.jsxs("form", {
							className: "flex items-center w-full mb-4 gap-3 h-[0px]",
							children: [i.jsxs("span", {
								className: " text-xs ",
								children: [q(F), " "]
							}), i.jsx("input", {
								type: "range",
								min: 0,
								max: 100,
								step: "0.1",
								ref: pe,
								value: (se = u == null ? void 0 : u.audio) != null && se.currentTime ? F / Number(u.duration) * 100 : 0,
								style: {
									background: `linear-gradient(to right, ${_==="dark"?"#ddd":"#09090B"} ${F/Number(u==null?void 0:u.duration)*100}%, ${_==="dark"?"#252525":"#dddddd"} ${F/Number(u==null?void 0:u.duration)*100}%)`
								},
								onChange: _e,
								className: "range"
							}), i.jsx("span", {
								className: " text-xs",
								children: q((u == null ? void 0 : u.duration) || 0)
							})]
						}), i.jsx("div", {
							className: "h-[3rem] w-full",
							children: i.jsxs("div", {
								className: "flex justify-between items-center  mb-4",
								children: [i.jsx("div", {
									className: "flex w-full  lg:w-auto",
									onClick: G,
									children: i.jsxs("div", {
										className: "flex items-center gap-3 ",
										children: [i.jsx("img", {
											src: (u == null ? void 0 : u.image) || " ",
											alt: (u == null ? void 0 : u.name) || "",
											width: 55,
											className: "rounded"
										}), i.jsxs("div", {
											className: "flex flex-col overflow-y-clip p-1 w-[14rem] h-[2.9rem]",
											children: [i.jsx("span", {
												className: " w-fit h-[1.5rem] overflow-hidden",
												children: u != null && u.name ? Ye.decode(u.name) : "Empty"
											}), i.jsx("span", {
												className: "text-xs h-1 ",
												children: Ye.decode(we)
											})]
										})]
									})
								}), i.jsx("div", {
									className: "flex flex-col lg:items-center gap-5   p-2",
									children: i.jsxs("div", {
										className: "flex gap-5 justify-end lg:justify-center items-center",
										children: [D === "none" ? i.jsx(Jc, {
											className: " text-2xl hidden lg:block cursor-pointer hover:text-[#ff3448] ",
											onClick: A,
											title: `Repeat Mode: ${D==="none"?"none":"one"}`
										}) : i.jsx(Yc, {
											className: " text-2xl hidden lg:block cursor-pointer text-[#ff3448]",
											onClick: A,
											title: `Repeat Mode: ${D==="none"?"none":"one"}`
										}), i.jsx(Wc, {
											className: "icon hidden lg:block hover:scale-110 text-2xl cursor-pointer",
											onClick: y
										}), i.jsx("div", {
											className: " rounded-full p-2",
											children: d ? i.jsx(Xc, {
												className: "  p-[0.1rem] icon hover:scale-110 text-xl lg:text-2xl cursor-pointer",
												onClick: () => o(u == null ? void 0 : u.audio.currentSrc, u == null ? void 0 : u.name, u == null ? void 0 : u.duration, u == null ? void 0 : u.image, u == null ? void 0 : u.id, s)
											}) : i.jsx(hl, {
												className: " icon p-[0.1rem] hover:scale-110 text-xl lg:text-2xl cursor-pointer",
												onClick: () => o(u == null ? void 0 : u.audio.currentSrc, u == null ? void 0 : u.name, u == null ? void 0 : u.duration, u == null ? void 0 : u.image, u == null ? void 0 : u.id, s)
											})
										}), i.jsx(Qc, {
											className: "icon hidden lg:block hover:scale-110 text-2xl cursor-pointer",
											onClick: m
										}), i.jsx(Kc, {
											className: ` hidden lg:block hover:text-[#fd3a4e] text-2xl cursor-pointer ${f?"text-[#fd3a4e]":""}`,
											onClick: k
										})]
									})
								}), i.jsxs("div", {
									className: "lg:flex hidden  items-center gap-5 justify-end",
									children: [i.jsx("button", {
										onClick: O,
										title: "Like Song",
										children: Z.some(Q => Q.id === (u == null ? void 0 : u.id)) ? i.jsx(Zc, {
											className: "text-red-500"
										}) : i.jsx(e2, {
											className: "icon"
										})
									}), i.jsx(t2, {
										className: "hover:text-[#fd3a4e] icon  text-2xl cursor-pointer",
										onClick: N,
										title: "Download Song"
									}), i.jsxs("div", {
										className: "items-center gap-1 flex ",
										children: [i.jsx(Np, {
											className: "text-xl"
										}), i.jsx("input", {
											type: "range",
											min: 0,
											max: 100,
											step: 1,
											value: b,
											onChange: xe,
											className: "volume icon rounded-lg appearance-none cursor-pointer w-[80px] h-1",
											style: {
												background: `linear-gradient(to right, ${_==="dark"?"#ddd":"#09090B"} ${b}%, ${_==="dark"?"#252525":"#dddddd"} ${b}%)`
											},
											title: "Volume"
										})]
									}), i.jsx("div", {
										className: "flex",
										children: i.jsx(_p, {
											title: "Maximize",
											className: "icon p-1 text-2xl rounded icon cursor-pointer",
											onClick: G
										})
									})]
								})]
							})
						})]
					}), L && i.jsx(i.Fragment, {
						children: i.jsxs("div", {
							className: "flex w-full bottom-0 flex-col p-2 pt-2 lg:h-[40rem] h-[45rem] gap-4 scroll-hide overflow-y-scroll rounded-tl-2xl rounded-tr-2xl Player scroll-smooth",
							children: [i.jsx("div", {
								className: " flex w-[97%] justify-end ",
								children: i.jsx(Bp, {
									className: "  icon text-[3rem] cursor-pointer",
									onClick: G
								})
							}), i.jsxs("div", {
								className: " ",
								children: [i.jsxs("div", {
									className: "flex lg:flex-row flex-col",
									children: [i.jsx("div", {
										className: " flex  justify-center items-center lg:pl-[2.5rem]",
										children: i.jsx("img", {
											src: (u == null ? void 0 : u.image) || " ",
											className: " h-[22rem] lg:h-[17rem]  rounded-lg object-cover shadow-2xl profile"
										})
									}), i.jsxs("div", {
										className: "flex flex-col justify-center lg:w-[70%] lg:pl-5 p-1  gap-4",
										children: [i.jsxs("div", {
											className: "flex  flex-col  gap-[0.5rem] mt-5 lg:ml-1 ml-[1.5rem]",
											children: [i.jsx("span", {
												className: " text-2xl font-semibold h-auto  justify-between  flex  overflow-clip  ",
												children: u != null && u.name ? Ye.decode(u.name) : "Empty"
											}), i.jsxs("span", {
												className: "overflow-hidden  flex  w-[98%] mb-1  text-base font-medium  justify-between h-[1.84rem]      ",
												children: [Ye.decode(we), i.jsxs("span", {
													className: "flex gap-3 justify-center place-items-center ",
													children: [i.jsx("button", {
														onClick: O,
														title: "Like Song",
														className: " ",
														children: Z.some(Q => Q.id === (u == null ? void 0 : u.id)) ? i.jsx(Zc, {
															className: "text-red-500 text-2xl"
														}) : i.jsx(e2, {
															className: "icon text-2xl hover:text-red-500"
														})
													}), i.jsx(t2, {
														className: "lg:hover:text-[#fd3a4e] active:text-[#fd3a4e]  flex self-center text-[1.8rem] cursor-pointer icon",
														onClick: N,
														title: "Download Song"
													})]
												})]
											})]
										}), i.jsxs("form", {
											className: "flex items-center w-full gap-3 h-[0px]",
											children: [i.jsxs("span", {
												className: "lg:hidden block  text-xs ",
												children: [q(F), " "]
											}), i.jsx("input", {
												type: "range",
												min: 0,
												max: 100,
												step: "0.1",
												ref: pe,
												value: (ce = u == null ? void 0 : u.audio) != null && ce.currentTime ? F / Number(u.duration) * 100 : 0,
												style: {
													background: `linear-gradient(to right, ${_==="dark"?"#ddd":"#252525"} ${F/Number(u==null?void 0:u.duration)*100}%, ${_==="dark"?"#252525":"#dddddd"} ${F/Number(u==null?void 0:u.duration)*100}%)`
												},
												onChange: _e,
												className: "range"
											}), i.jsx("span", {
												className: "lg:hidden block  text-xs",
												children: q((u == null ? void 0 : u.duration) || 0)
											})]
										}), i.jsx("div", {
											className: "flex flex-col items-center ",
											children: i.jsxs("div", {
												className: "flex items-center justify-end lg:w-full lg:gap-[20rem] gap-[0.5rem] ",
												children: [i.jsxs("div", {
													className: "flex  items-center gap-5 p-8 w-full lg:w-[36%] justify-end ",
													children: [D === "none" ? i.jsx(Jc, {
														className: " text-2xl  cursor-pointer lg:hover:text-[#ff3448] ",
														onClick: A,
														title: `Repeat Mode: ${D==="none"?"none":"one"}`
													}) : i.jsx(Yc, {
														className: " text-2xl cursor-pointer text-[#ff3448]",
														onClick: A,
														title: `Repeat Mode: ${D==="none"?"none":"one"}`
													}), i.jsx(Wc, {
														className: "icon lg:hover:scale-110 text-3xl cursor-pointer",
														onClick: y
													}), i.jsx("div", {
														children: d ? i.jsx(Xc, {
															className: "p-[0.1rem] icon lg:hover:scale-110 text-3xl cursor-pointer",
															onClick: () => o(u == null ? void 0 : u.audio.currentSrc, u == null ? void 0 : u.name, u == null ? void 0 : u.duration, u == null ? void 0 : u.image, u == null ? void 0 : u.id, s)
														}) : i.jsx(hl, {
															className: " icon p-[0.1rem] lg:hover:scale-110 text-3xl cursor-pointer",
															onClick: () => o(u == null ? void 0 : u.audio.currentSrc, u == null ? void 0 : u.name, u == null ? void 0 : u.duration, u == null ? void 0 : u.image, u == null ? void 0 : u.id, s)
														})
													}), i.jsx(Qc, {
														className: "icon lg:hover:scale-110 text-3xl cursor-pointer",
														onClick: m
													}), i.jsx(Kc, {
														className: ` text-3xl cursor-pointer  lg:hover:text-[#fd3a4e] ${f?" text-[#fd3a4e] ":""}`,
														onClick: k
													})]
												}), i.jsx(k2, {
													className: "icon text-3xl hidden lg:block cursor-pointer  lg:hover:scale-105 mr-4 ",
													onClick: () => navigator.share({
														title: u.name,
														text: `Listen to ${u.name} on 8Music`,
														url: `${window.location.origin}/albums/${W.album.id}`
													})
												})]
											})
										})]
									})]
								}), i.jsxs("div", {
									className: "flex flex-col overflow-hidden  p-1",
									children: [i.jsx("div", {
										children: H.length >= 0 && i.jsxs("div", {
											className: "flex flex-col justify-center items-center w-full ",
											children: [i.jsx("h2", {
												className: "pr-1 m-4 text-xl lg:text-2xl font-semibold w-full ml-[2.5rem] lg:ml-[5.5rem] ",
												children: "You Might Like"
											}), i.jsxs("div", {
												className: "flex justify-center items-center gap-3 w-full",
												children: [i.jsx(it, {
													className: "text-3xl hover:scale-125 cursor-pointer h-[9rem]   hidden lg:block arrow-btn",
													onClick: () => ne(De)
												}), i.jsx("div", {
													className: "grid grid-rows-1  grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-[.35rem] w-full  px-3 lg:px-0 scroll-smooth",
													ref: De,
													children: H == null ? void 0 : H.map((Q, K) => i.jsx(nn, {
														...Q,
														song: I
													}, Q.id || K))
												}), i.jsx(ot, {
													className: "text-3xl hover:scale-125  cursor-pointer h-[9rem] hidden lg:block arrow-btn",
													onClick: () => Se(De)
												})]
											})]
										})
									}), i.jsxs("div", {
										className: "flex flex-col pt-3 ",
										children: [i.jsx("h2", {
											className: "pr-1 text-xl lg:text-2xl font-semibold  w-full ml-[2rem] lg:ml-[3.5rem] lg:m-3 ",
											children: "Artists"
										}), i.jsx("div", {
											className: "grid grid-flow-col lg:w-max w-full scroll-smooth gap-[1rem] lg:gap-[1.5rem] lg:pl-[2rem] pl-[1rem] overflow-x-scroll scroll-hide ",
											children: u.artists.primary.map((Q, K) => i.jsx(qi, {
												...Q
											}, `${Q.id||K}`))
										})]
									}), i.jsx("div", {
										className: "flex flex-col lg:flex-row gap-[2rem] ",
										children: i.jsxs("div", {
											className: "flex flex-col ",
											children: [i.jsx("h2", {
												className: "pr-1 text-xl lg:text-2xl font-semibold  w-full ml-[2rem] lg:ml-[3.5rem] ",
												children: "From Album ..."
											}), i.jsxs(Pe, {
												to: `/albums/${W.album.id}`,
												className: "card  w-[12.5rem] h-fit overflow-clip  border-[0.1px]  p-1  rounded-lg lg:mx-[2rem] mt-[1rem] ",
												children: [i.jsx("div", {
													className: "p-1",
													children: i.jsx("img", {
														src: u.image || "/Unknown.png",
														alt: x,
														className: "rounded-lg "
													})
												}), i.jsx("div", {
													className: "w-full flex flex-col justify-center pl-2",
													children: i.jsx("span", {
														className: "font-semibold text-[1.1rem] overflow-x-clip ",
														children: W.album.name ? Ye.decode(W.album.name) : ""
													})
												})]
											})]
										})
									})]
								})]
							})]
						})
					})]
				})
			})
		})
	},
	tu = () => i.jsx(i.Fragment, {
		children: i.jsxs("div", {
			className: " lg:h-[15rem] h-auto w-full flex gap-10  p-10 footer mb-[3rem]",
			children: [i.jsxs("div", {
				className: "ml-[4rem] flex flex-col ",
				children: [i.jsxs("div", {
					className: "flex items-center ml-[-10px]",
					children: [i.jsx("span", {
						className: "bg"
					}), i.jsxs("div", {
						className: "gap-1",
						children: [i.jsx("span", {
							className: "Musi  font-extrabold text-2xl lg:text-3xl ",
							children: "8"
						}), i.jsx("span", {
							className: "fy font-extrabold text-2xl lg:text-3xl ",
							children: "Music"
						})]
					})]
				}), i.jsx("div", {
					children: i.jsx("div", {
						children: i.jsx("pre", {
							className: "lg:text-sm text-xs",
							children: "Enjoy. "
						})
					})
				})]
			}), i.jsx("div", {
				className: "lg:block hidden",
				children: i.jsxs("ul", {
					className: "flex flex-col gap-[0.2rem] pb-5",
					children: [i.jsx("p", {
						className: " font-sans text-xs font-semibold pb-2",
						children: "TOP ARTISTS"
					}), i.jsxs("li", {
						children: [i.jsx(Pe, {
							to: "/artists/741999",
							children: "S. P. Balasubrahmanyam"
						}), " "]
					}), i.jsxs("li", {
						children: [i.jsx(Pe, {
							to: "/artists/457536",
							children: "Ilaiyaraaja"
						}), " "]
					}), i.jsxs("li", {
						children: [i.jsx(Pe, {
							to: "/artists/455663",
							children: "Anirudh Ravichander"
						}), " "]
					}), i.jsxs("li", {
						children: [i.jsx(Pe, {
							to: "/artists/456091",
							children: "Yuvan Shankar Raja"
						}), " "]
					}), i.jsxs("li", {
						children: [i.jsx(Pe, {
							to: "/artists/455243",
							children: "Harris Jayaraj"
						}), " "]
					}), i.jsxs("li", {
						children: [i.jsx(Pe, {
							to: "/artists/557323",
							children: "Santhosh Narayanan"
						}), " "]
					})]
				})
			})]
		})
	});

function bp(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z"
			}
		}]
	})(u)
}

function Lp(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M12.97 2.59a1.5 1.5 0 0 0-1.94 0l-7.5 6.363A1.5 1.5 0 0 0 3 10.097V19.5A1.5 1.5 0 0 0 4.5 21h4.75a.75.75 0 0 0 .75-.75V14h4v6.25c0 .414.336.75.75.75h4.75a1.5 1.5 0 0 0 1.5-1.5v-9.403a1.5 1.5 0 0 0-.53-1.144l-7.5-6.363Z"
			}
		}]
	})(u)
}

function qp(u) {
	return ve({
		attr: {
			viewBox: "0 0 24 24"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"
			}
		}, {
			tag: "path",
			attr: {
				d: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5Z"
			}
		}]
	})(u)
}
const Nr = () => {
		const u = sr();
		return i.jsxs("div", {
			className: "lg:hidden fixed bottom-0 z-20 w-full Navigator h-[3.6rem] lg:h-[3.5rem] flex items-center justify-around",
			children: [i.jsx(Pe, {
				to: "/",
				children: i.jsxs("div", {
					className: "flex flex-col items-center text-sm",
					children: [u.pathname === "/" ? i.jsx(Lp, {
						className: "text-2xl"
					}) : i.jsx(bp, {
						className: "text-2xl"
					}), "Home"]
				})
			}), i.jsx(Pe, {
				to: "/Browse",
				children: i.jsxs("div", {
					className: "flex flex-col items-center text-sm",
					children: [u.pathname === "/Browse" ? i.jsx(Dp, {
						className: "text-2xl"
					}) : i.jsx(yp, {
						className: "text-2xl"
					}), "Browse"]
				})
			}), i.jsx(Pe, {
				to: "/Music",
				children: i.jsxs("div", {
					className: "flex flex-col items-center text-sm",
					children: [u.pathname === "/Music" ? i.jsx(Ap, {
						className: "text-2xl"
					}) : i.jsx(wp, {
						className: "text-2xl"
					}), "My Music"]
				})
			})]
		})
	},
	Ri = ({
		name: u,
		artists: s,
		id: o,
		image: d
	}) => {
		const f = Array.isArray(s == null ? void 0 : s.primary) ? s.primary.map(y => y.name).join(" , ") : "",
			m = d[2].url || d;
		return i.jsxs(Pe, {
			to: `/albums/${o}`,
			className: "card  w-[9.5rem] h-[11.96rem] overflow-clip  border-[0.1px]  p-1  rounded-lg shadow-md ",
			children: [i.jsx("div", {
				className: "p-1",
				children: i.jsx("img", {
					src: m || "/Unknown.png",
					alt: u,
					className: "rounded-lg imgs"
				})
			}), i.jsxs("div", {
				className: "text-[13px] w-full flex flex-col justify-center pl-2",
				children: [i.jsx("span", {
					className: "font-semibold overflow-x-clip",
					children: u ? Ye.decode(u) : "Empty"
				}), i.jsxs("span", {
					className: "flex gap-1",
					children: ["by", i.jsx("p", {
						className: "font-semibold",
						children: f
					})]
				})]
			})]
		})
	},
	Ti = ({
		albums: u
	}) => {
		const s = g.useRef(null),
			o = () => {
				s.current && (s.current.scrollLeft -= 800)
			},
			d = () => {
				s.current && (s.current.scrollLeft += 800)
			};
		return i.jsx(i.Fragment, {
			children: i.jsxs("div", {
				className: "flex justify-center items-center gap-3",
				children: [i.jsx(it, {
					className: "text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]   hidden lg:block arrow-btn",
					onClick: o
				}), i.jsx("div", {
					className: "grid grid-rows-1 sm:grid-rows-2 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth",
					ref: s,
					children: u == null ? void 0 : u.map(f => i.jsx(Ri, {
						...f
					}, f.id))
				}), i.jsx(ot, {
					className: "text-3xl  w-[2rem]  hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer  h-[9rem] arrow-btn  hidden lg:block ",
					onClick: d
				})]
			})
		})
	},
	S2 = ({
		name: u,
		image: s,
		id: o
	}) => {
		var f;
		const d = ((f = s[2]) == null ? void 0 : f.url) || s;
		return i.jsxs(Pe, {
			to: `/playlists/${o}`,
			className: "w-[7.9rem]   flex flex-col justify-center items-center gap-3 rounded-lg",
			children: [i.jsx("img", {
				src: d || "/Unknown.png",
				alt: u,
				className: "rounded"
			}), i.jsx("div", {
				className: "text-[13px] h-[2.5rem] w-full flex flex-col justify-center items-center",
				children: i.jsx("span", {
					className: "font-semibold overflow-hidden w-[6rem]",
					children: u
				})
			})]
		})
	},
	j2 = ({
		playlists: u
	}) => {
		const s = g.useRef(null),
			o = () => {
				s.current && (s.current.scrollLeft -= 800)
			},
			d = () => {
				s.current && (s.current.scrollLeft += 800)
			};
		return i.jsx(i.Fragment, {
			children: i.jsxs("div", {
				className: "flex justify-center items-center gap-3 ",
				children: [i.jsx(it, {
					className: "text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block",
					onClick: o
				}), i.jsx("div", {
					className: "grid grid-rows-1 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-4 w-full  px-3 lg:px-0 scroll-smooth",
					ref: s,
					children: u == null ? void 0 : u.map(f => i.jsx(S2, {
						...f
					}, f.id))
				}), i.jsx(ot, {
					className: "text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block ",
					onClick: d
				})]
			})
		})
	},
	B2 = ({
		artists: u
	}) => {
		const s = g.useRef(null),
			o = () => {
				s.current && (s.current.scrollLeft -= 800)
			},
			d = () => {
				s.current && (s.current.scrollLeft += 800)
			};
		return i.jsx(i.Fragment, {
			children: i.jsxs("div", {
				className: "flex justify-center items-center gap-4 ",
				children: [i.jsx(it, {
					className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block ",
					onClick: o
				}), i.jsx("div", {
					className: "grid grid-rows-1 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-[1rem] lg:gap-3.5 w-full  px-3 lg:px-0 scroll-smooth",
					ref: s,
					children: u == null ? void 0 : u.map(f => i.jsx(qi, {
						...f
					}, f.id))
				}), i.jsx(ot, {
					className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block ",
					onClick: d
				})]
			})
		})
	},
	r2 = {
		"For You": [{
			id: "1134651042",
			name: "Tamil: India Superhits Top 50",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/Tamil-IndiaSuperhitsTop50_20250606062716_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/Tamil-IndiaSuperhitsTop50_20250606062716_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/Tamil-IndiaSuperhitsTop50_20250606062716_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/tamil-india-superhits-top-50/Dq3pWn1coqesud-ETNX4vg__",
			songCount: 50,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "1134595537",
			name: "English: India Superhits Top 50",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/English-IndiaSuperhitsTop50_20250124035621_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/English-IndiaSuperhitsTop50_20250124035621_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/English-IndiaSuperhitsTop50_20250124035621_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/english-india-superhits-top-50/aXoCADwITrUCObrEMJSxEw__",
			songCount: 50,
			language: "english",
			explicitContent: !1
		}, {
			id: "110858205",
			name: "Trending Today",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/charts_TrendingToday_134351_20230826113717_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/charts_TrendingToday_134351_20230826113717_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/charts_TrendingToday_134351_20230826113717_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/trending-today/I3kvhipIy73uCJW60TJk1Q__",
			songCount: 597,
			language: "english",
			explicitContent: !1
		}, {
			id: "1026391929",
			name: "Most Searched Songs - Tamil",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/MostSearchedSongsTamil_20250617033449_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/MostSearchedSongsTamil_20250617033449_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/MostSearchedSongsTamil_20250617033449_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/most-searched-songs-tamil/TSfQp8AhNQel7JpGxdAPvw__",
			songCount: 30,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "945969391",
			name: "Most Searched Songs - English",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/MostSearchedSongsEnglish_20241029063059_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/MostSearchedSongsEnglish_20241029063059_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/MostSearchedSongsEnglish_20241029063059_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/most-searched-songs-english/xUOBWZUG6AgGSw2I1RxdhQ__",
			songCount: 30,
			language: "english",
			explicitContent: !1
		}, {
			id: "85481065",
			name: "Fresh Tunes",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/FreshTunes_20250131112713_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/FreshTunes_20250131112713_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/FreshTunes_20250131112713_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/fresh-tunes/Ns2UZo9qDvI_",
			songCount: 50,
			language: "english",
			explicitContent: !1
		}, {
			id: "1191141029",
			name: "Best Of Romance - Arijit Singh",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/BestofRomanceArijitSingh_20231005095622_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/BestofRomanceArijitSingh_20231005095622_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/BestofRomanceArijitSingh_20231005095622_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/best-of-romance-arijit-singh/SaQiNubxPJil7JpGxdAPvw__",
			songCount: 57,
			language: "hindi",
			explicitContent: !1
		}, {
			id: "901538753",
			name: "Tamil 1970s",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1970s_102109_20240408062208_50x50.jpg"
			}, {
				quality: "150x150",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1970s_102109_20240408062208_150x150.jpg"
			}, {
				quality: "500x500",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1970s_102109_20240408062208_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/tamil-1970s/-9xBih95ekgwkg5tVhI3fw__",
			songCount: 50,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "84576200",
			name: "Groovy Love Songs - English",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/GroovyLoveSongsEnglish_20241014111735_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/GroovyLoveSongsEnglish_20241014111735_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/GroovyLoveSongsEnglish_20241014111735_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/groovy-love-songs-english/bMqWZ8RYo1M_",
			songCount: 50,
			language: "english",
			explicitContent: !1
		}, {
			id: "901538752",
			name: "Tamil 1960s",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1960s_20240507052255_50x50.jpg"
			}, {
				quality: "150x150",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1960s_20240507052255_150x150.jpg"
			}, {
				quality: "500x500",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1960s_20240507052255_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/tamil-1960s/-9xBih95ekjc1EngHtQQ2g__",
			songCount: 50,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "1170578783",
			name: "Tamil 2000s",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/charts_Tamil2000s_171230_20240408062044_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/charts_Tamil2000s_171230_20240408062044_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/charts_Tamil2000s_171230_20240408062044_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/tamil-2000s/,H6xc4W4ZikC0-RsHAbZ7g__",
			songCount: 10,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "109815423",
			name: "Top Kuthu - Tamil",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/TopKuthuTamil_20250422060948_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/TopKuthuTamil_20250422060948_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/TopKuthuTamil_20250422060948_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/top-kuthu-tamil/CNVzQf7lvT8wkg5tVhI3fw__",
			songCount: 28,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "901538755",
			name: "Tamil 1980s",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/charts_Tamil1980s_157873_20240408062147_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/charts_Tamil1980s_157873_20240408062147_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/charts_Tamil1980s_157873_20240408062147_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/tamil-1980s/-9xBih95ekjuCJW60TJk1Q__",
			songCount: 25,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "109118539",
			name: "Motivational Hits - Tamil",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/MotivationalHitsTamil_20250617070302_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/MotivationalHitsTamil_20250617070302_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/MotivationalHitsTamil_20250617070302_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/motivational-hits-tamil/jMHINeLYW1eO0eMLZZxqsA__",
			songCount: 25,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "1170578788",
			name: "Tamil 2010s",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "http://c.saavncdn.com/editorial/charts_Tamil2010s_138543_20240408061942_50x50.jpg"
			}, {
				quality: "150x150",
				url: "http://c.saavncdn.com/editorial/charts_Tamil2010s_138543_20240408061942_150x150.jpg"
			}, {
				quality: "500x500",
				url: "http://c.saavncdn.com/editorial/charts_Tamil2010s_138543_20240408061942_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/tamil-2010s/,H6xc4W4ZinDN85e-DKVsA__",
			songCount: 50,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "848384706",
			name: "Dance Queens - Tamil",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/DanceQueensTamil_20241015113457_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/DanceQueensTamil_20241015113457_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/DanceQueensTamil_20241015113457_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/dance-queens-tamil/2uwAUQjOVlnfemJ68FuXsA__",
			songCount: 19,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "1139646951",
			name: "Most Streamed Love Songs: Tamil",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/MostStreamedLoveSongs-Tamil_20250617054047_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/MostStreamedLoveSongs-Tamil_20250617054047_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/MostStreamedLoveSongs-Tamil_20250617054047_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/most-streamed-love-songs-tamil/1VW1KZhyr94LtNrz-hs7eg__",
			songCount: 30,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "88850418",
			name: "House Party - English",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/HousePartyEnglish_20241225100050_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/HousePartyEnglish_20241225100050_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/HousePartyEnglish_20241225100050_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/house-party-english/IPm9oKHppSA_",
			songCount: 80,
			language: "english",
			explicitContent: !1
		}, {
			id: "1170578779",
			name: "Tamil 1990s",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1990s_190250_20240408062124_50x50.jpg"
			}, {
				quality: "150x150",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1990s_190250_20240408062124_150x150.jpg"
			}, {
				quality: "500x500",
				url: "http://c.saavncdn.com/editorial/charts_Tamil1990s_190250_20240408062124_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/tamil-1990s/,H6xc4W4ZimpJ,OEBt5Zbg__",
			songCount: 50,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "696005328",
			name: "House Party - Tamil",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/HousePartyTamil_20250602095840_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/HousePartyTamil_20250602095840_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/HousePartyTamil_20250602095840_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/house-party-tamil/,9s3E3l5o0lFo9wdEAzFBA__",
			songCount: 38,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "950698071",
			name: "Best Indian Lo-Fi Hits",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/BestIndianLoFiHits_20241121053632_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/BestIndianLoFiHits_20241121053632_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/BestIndianLoFiHits_20241121053632_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/best-indian-lo-fi-hits/yh7x7lXtCVkGSw2I1RxdhQ__",
			songCount: 40,
			language: "tamil",
			explicitContent: !1
		}, {
			id: "1191141825",
			name: "Chill Karo Na",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/ChillKaroNa_20240315054046_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/ChillKaroNa_20240315054046_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/ChillKaroNa_20240315054046_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/chill-karo-na/0gxR348ZZu1613W6L-cCSw__",
			songCount: 34,
			language: "hindi",
			explicitContent: !1
		}, {
			id: "1181196711",
			name: "Rock Hits 2023 - English",
			type: "playlist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/editorial/RockHits2023English_20231211065054_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/editorial/RockHits2023English_20231211065054_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/editorial/RockHits2023English_20231211065054_500x500.jpg"
			}],
			url: "https://www.jiosaavn.com/featured/rock-hits-2023-english/Khe-X1,Oj3OrB59Sr2unUQ__",
			songCount: 20,
			language: "english",
			explicitContent: !1
		}]
	},
	Rp = {
		results: [{
			id: "741999",
			name: "S. P. B",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/S_P_Balasubrahmanyam_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/s.-p.-balasubrahmanyam-songs/Ix5AC5h7LSg_"
		}, {
			id: "455127",
			name: "Udit Narayan",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Udit_Narayan_004_20241029065120_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Udit_Narayan_004_20241029065120_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Udit_Narayan_004_20241029065120_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/udit-narayan-songs/kLtmb7Vh8Rs_"
		}, {
			id: "483224",
			name: "K. S. Chithra",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/K_S_Chithra_002_20190906071921_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/K_S_Chithra_002_20190906071921_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/K_S_Chithra_002_20190906071921_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/k.-s.-chithra-songs/doElLvdHCyk_"
		}, {
			id: "455663",
			name: "Anirudh Ravichander",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Anirudh_Ravichander_002_20240103064558_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/anirudh-ravichander-songs/lBzQd8c-xCY_"
		}, {
			id: "455170",
			name: "Devi Sri Prasad",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Devi_Sri_Prasad_007_20240902064823_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Devi_Sri_Prasad_007_20240902064823_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Devi_Sri_Prasad_007_20240902064823_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/devi-sri-prasad-songs/M0dlT,PMjDs_"
		}, {
			id: "459320",
			name: "Arijit Singh",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Arijit_Singh_004_20241118063717_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Arijit_Singh_004_20241118063717_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Arijit_Singh_004_20241118063717_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/arijit-singh-songs/LlRWpHzy3Hk_"
		}, {
			id: "455130",
			name: "Shreya Ghoshal",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Shreya_Ghoshal_007_20241101074144_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Shreya_Ghoshal_007_20241101074144_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Shreya_Ghoshal_007_20241101074144_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/shreya-ghoshal-songs/lIHlwHaxTZ0_"
		}, {
			id: "1984879",
			name: "Chinmayi Sripada",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Chinmayi_Sripada_002_20241206081603_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Chinmayi_Sripada_002_20241206081603_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Chinmayi_Sripada_002_20241206081603_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/featured/lets-play-chinmayi-sripada/FRYJHOxLElg_"
		}, {
			id: "457536",
			name: "Ilaiyaraaja",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/ilaiyaraaja-songs/ciCHe-IFG1w_"
		}, {
			id: "455454",
			name: "G.V. Prakash Kumar",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/G_V__Prakash_Kumar_002_20230609103801_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/g.v.-prakash-kumar-songs/b2CMYiogn3E_"
		}, {
			id: "456091",
			name: "Yuvan Shankar Raja",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Yuvan_Shankar_Raja_002_20180802174245_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Yuvan_Shankar_Raja_002_20180802174245_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Yuvan_Shankar_Raja_002_20180802174245_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/yuvan-shankar-raja-songs/33rudDAZmSk_"
		}, {
			id: "689580",
			name: "Sid Sriram ",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Sid_Sriram_005_20240425180600_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Sid_Sriram_005_20240425180600_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Sid_Sriram_005_20240425180600_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/sid-sriram-songs/634AK8t6tAU_"
		}, {
			id: "455243",
			name: "Harris Jayaraj",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Harris_Jayaraj_002_20230718071330_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Harris_Jayaraj_002_20230718071330_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Harris_Jayaraj_002_20230718071330_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/harris-jayaraj-songs/flXnIQrphaE_"
		}, {
			id: "456164",
			name: "Vijay Antony",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Vijay_Antony_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Vijay_Antony_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Vijay_Antony_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/vijay-antony-songs/8lpgF4Reww8_"
		}, {
			id: "557323",
			name: "Santhosh Narayanan",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Santhosh_Narayanan_002_20250527101718_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Santhosh_Narayanan_002_20250527101718_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Santhosh_Narayanan_002_20250527101718_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/santhosh-narayanan-songs/uXtzpGFdOW4_"
		}, {
			id: "773021",
			name: "Hiphop Tamizha",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Hiphop_Tamizha_002_20230315131424_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Hiphop_Tamizha_002_20230315131424_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Hiphop_Tamizha_002_20230315131424_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/hiphop-tamizha-songs/I9oAEdb3SkQ_"
		}, {
			id: "457257",
			name: "Pradeep Kumar",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Pradeep_Kumar_001_20220216130035_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Pradeep_Kumar_001_20220216130035_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Pradeep_Kumar_001_20220216130035_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/pradeep-kumar-songs/uoJbGk55AQ8_"
		}, {
			id: "458475",
			name: "K.J. Yesudas",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/KJ_Yesudas_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/KJ_Yesudas_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/KJ_Yesudas_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/k.j.-yesudas-songs/VFBN06xAHig_"
		}, {
			id: "455219",
			name: "Deva",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Deva_20190801133857_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Deva_20190801133857_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Deva_20190801133857_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/deva-songs/twMxVF52rYk_"
		}, {
			id: "457494",
			name: "D. Imman",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/D_Imman_003_20180821182708_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/D_Imman_003_20180821182708_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/D_Imman_003_20180821182708_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/d.-imman-songs/oXU9vWnfglY_"
		}, {
			id: "455558",
			name: "Swarnalatha",
			role: "Artist",
			image: [{
				quality: "50x50",
				url: "https://c.saavncdn.com/artists/Swarnalatha_20200529105631_50x50.jpg"
			}, {
				quality: "150x150",
				url: "https://c.saavncdn.com/artists/Swarnalatha_20200529105631_150x150.jpg"
			}, {
				quality: "500x500",
				url: "https://c.saavncdn.com/artists/Swarnalatha_20200529105631_500x500.jpg"
			}],
			type: "artist",
			url: "https://www.jiosaavn.com/artist/swarnalatha-songs/ensjdSpXKAQ_"
		}]
	},
	Tp = () => {
		const [u, s] = g.useState([]), [o, d] = g.useState([]), [f, m] = g.useState([]), [y, k] = g.useState([]), [D, A] = g.useState([]), [N, b] = g.useState(!0), [w, j] = g.useState(null), [B, L] = g.useState({}), P = g.useRef(null), F = g.useRef(null), z = g.useRef(null), V = JSON.parse(localStorage.getItem("playedSongs")) || [], I = $ => {
			$.current && ($.current.scrollLeft -= 1e3)
		}, J = $ => {
			$.current && ($.current.scrollLeft += 1e3)
		}, H = () => {
			const $ = new Date().getHours();
			return $ < 12 ? "Good Morning" : $ < 18 ? "Good Afternoon" : "Good Evening"
		};
		return g.useEffect(() => {
			const $ = async () => {
				try {
					const ne = await Ei(10763385);
					s(ne.data.songs)
				} catch (ne) {
					j(ne.message)
				} finally {
					b(!1)
				}
			}, Z = async () => {
				try {
					const ne = await Ei(80802063);
					d(ne.data.songs)
				} catch (ne) {
					j(ne.message)
				} finally {
					b(!1)
				}
			}, de = async () => {
				try {
					const ne = await w2("tamil");
					m(ne.data.results)
				} catch (ne) {
					j(ne.message)
				} finally {
					b(!1)
				}
			}, pe = async () => {
				try {
					const ne = await Rp;
					k(ne.results)
				} catch (ne) {
					j(ne.message)
				} finally {
					b(!1)
				}
			}, De = async () => {
				try {
					const ne = await A2("tamil");
					A(ne.data.results)
				} catch (ne) {
					j(ne.message)
				} finally {
					b(!1)
				}
			};
			$(), de(), pe(), De(), Z()
		}, []), g.useEffect(() => {
			const Z = [...V, ...u, ...o].filter((de, pe, De) => pe === De.findIndex(ne => ne.id === de.id));
			L(Z)
		}, [u, o]), N ? i.jsx("div", {
			children: "Loading..."
		}) : w ? i.jsxs("div", {
			children: ["Error: ", w]
		}) : i.jsxs("div", {
			className: "pt-[3rem] lg:pt-5 my-[2rem] mt-[5rem] lg:my-[4rem] flex flex-col items-center overflow-x-clip gap-[0.3rem]",
			children: [i.jsx("div", {
				className: "hidden lg:block text-2xl w-full  font-semibold lg:ml-[5.5rem] m-1",
				children: H()
			}), V.length > 0 && i.jsxs("div", {
				className: "flex flex-col justify-center items-center w-full",
				children: [i.jsx("h2", {
					className: " m-4 mt-0 text-xl lg:text-2xl font-semibold  w-full ml-[3.5rem] lg:ml-[6.5rem]",
					children: "•Recently Played"
				}), i.jsxs("div", {
					className: "flex justify-center items-center gap-3 w-full scroll-smooth",
					children: [i.jsx(it, {
						className: "text-3xl hover:scale-125 cursor-pointer h-[9rem] arrow-btn  hidden lg:block  ",
						onClick: () => I(z)
					}), i.jsx("div", {
						className: "grid grid-rows-1  grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth",
						ref: z,
						children: V == null ? void 0 : V.map(($, Z) => i.jsx(nn, {
							...$,
							song: B
						}, $.id || Z))
					}), i.jsx(ot, {
						className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block  ",
						onClick: () => J(z)
					})]
				})]
			}), i.jsxs("div", {
				className: "flex flex-col items-center w-full",
				children: [i.jsx("h2", {
					className: " m-4 text-xl lg:text-2xl font-semibold  w-full ml-[3.5rem] lg:ml-[6.5rem]",
					children: "•New Songs"
				}), i.jsxs("div", {
					className: "flex justify-center items-center gap-3 w-full",
					children: [i.jsx(it, {
						className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block  ",
						onClick: () => I(P)
					}), i.jsx("div", {
						className: "grid grid-rows-1 lg:grid-rows-2 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full px-3 lg:px-0 scroll-smooth",
						ref: P,
						children: o == null ? void 0 : o.map(($, Z) => i.jsx(nn, {
							...$,
							song: B
						}, $.id || Z))
					}), i.jsx(ot, {
						className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block  ",
						onClick: () => J(P)
					})]
				})]
			}), i.jsx("br", {}), i.jsxs("div", {
				className: "flex flex-col justify-center items-center w-full",
				children: [i.jsx("h2", {
					className: " m-4 mt-0 text-xl lg:text-2xl font-semibold  w-full ml-[3.5rem] lg:ml-[6.5rem]",
					children: "•Today Trending"
				}), i.jsxs("div", {
					className: "flex justify-center items-center gap-3 w-full",
					children: [i.jsx(it, {
						className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block  ",
						onClick: () => I(F)
					}), i.jsx("div", {
						className: "grid grid-rows-1 sm:grid-rows-2 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth",
						ref: F,
						children: u == null ? void 0 : u.map($ => i.jsx(nn, {
							...$,
							song: B
						}, $.id))
					}), i.jsx(ot, {
						className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block  ",
						onClick: () => J(F)
					})]
				})]
			}), i.jsx("br", {}), i.jsxs("div", {
				className: "w-full",
				children: [i.jsx("h2", {
					className: " m-4 mt-0 text-xl lg:text-2xl font-semibold  w-full ml-[1rem] lg:ml-[3rem] ",
					children: "•Top Albums"
				}), i.jsx(Ti, {
					albums: f
				})]
			}), i.jsx("br", {}), i.jsxs("div", {
				className: "w-full",
				children: [i.jsx("h2", {
					className: "pr-1 m-4 mt-0 text-xl lg:text-2xl font-semibold  w-full ml-[1rem] lg:ml-[3.5rem] ",
					children: "•Top Artists"
				}), i.jsx(B2, {
					artists: y
				})]
			}), i.jsx("br", {}), i.jsxs("div", {
				className: "w-full flex flex-col gap-3",
				children: [i.jsx("h2", {
					className: " m-1 text-xl lg:text-2xl font-semibold  w-full ml-[1rem] lg:ml-[2.8rem] ",
					children: "•Top Playlists"
				}), i.jsx(j2, {
					playlists: D
				})]
			})]
		})
	},
	Pp = () => {
		const [u, s] = g.useState(!0);
		return g.useEffect(() => {
			(async () => {
				try {
					await new Promise(d => setTimeout(d, 0))
				} catch (d) {
					console.error("Error loading data:", d)
				} finally {
					s(!1)
				}
			})()
		}, []), u ? i.jsx("div", {
			className: "flex h-screen w-screen justify-center items-center",
			children: i.jsx("img", {
				src: "/8Music/Loading.gif",
				alt: "",
				className: ""
			})
		}) : i.jsxs(i.Fragment, {
			children: [i.jsx(Br, {}), i.jsx(Tp, {}), i.jsx(tu, {}), i.jsx(Nr, {}), i.jsx(Fr, {})]
		})
	},
	wl = ({
		name: u,
		artists: s,
		duration: o,
		downloadUrl: d,
		image: f,
		id: m,
		song: y
	}) => {
		var B, L, P;
		const [k, D] = g.useState(!1), A = F => {
			if (!F || typeof F != "number") return "0:00";
			const z = Math.floor(F / 60),
				W = (F % 60).toString().padStart(2, "0");
			return `${z}:${W}`
		}, {
			playMusic: N
		} = g.useContext(an), b = ((B = f[2]) == null ? void 0 : B.url) || f, w = Array.isArray(s == null ? void 0 : s.primary) ? (L = s.primary) == null ? void 0 : L.map(F => F.name).join(", ") : "Unknown Artist";
		d = d ? ((P = d[4]) == null ? void 0 : P.url) || d : y.audio;
		const j = F => Ye.decode(F);
		return i.jsxs("div", {
			onClick: () => N(d, u, o, b, m, s, y),
			onMouseEnter: () => D(!0),
			onMouseLeave: () => D(!1),
			className: "overflow-clip h-[3.5rem] w-full song-item flex justify-between items-center p-2 song-info",
			children: [i.jsxs("div", {
				className: "relative cursor-pointer",
				children: [i.jsx("img", {
					src: b,
					alt: "",
					className: "w-[5rem] object-cover transition-all duration-700"
				}), k && i.jsx(qp, {
					className: "  transition-all duration-700 absolute inset-0 hidden lg:flex items-center justify-center w-[2.35rem] h-[2.35rem]  opacity-65 backdrop-brightness-[0.6] icon "
				})]
			}), i.jsx("div", {
				className: "flex w-full pl-5 ",
				children: i.jsx("h3", {
					autoCorrect: "",
					className: " overflow-clip text-[0.75rem] lg:text-[0.875rem] h-[1.3rem] font-medium  ",
					children: j(u)
				})
			}), i.jsx("div", {
				className: "flex w-full",
				children: i.jsx("p", {
					className: " text-[0.60rem] lg:text-[0.75rem] h-[1rem] mr-3 overflow-clip lg:w-auto ",
					children: Ye.decode(w)
				})
			}), i.jsx("div", {
				className: "song-duration mr-2",
				children: i.jsx("span", {
					className: " text-[0.60rem] lg:text-[0.75rem] ",
					children: A(o)
				})
			})]
		})
	};

function gl(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
			}
		}]
	})(u)
}

function ki(u) {
	return ve({
		attr: {
			viewBox: "0 0 512 512"
		},
		child: [{
			tag: "path",
			attr: {
				d: "M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
			}
		}]
	})(u)
}
const Ip = () => {
		var V;
		const {
			id: u
		} = yl(), [s, o] = g.useState(null), [d, f] = g.useState(null), [m, y] = g.useState(!0), [k, D] = g.useState({}), [A, N] = g.useState(null), [b, w] = g.useState(() => JSON.parse(localStorage.getItem("likedAlbums")) || []), j = g.useRef(null), B = I => {
			I.current && (I.current.scrollLeft -= 1e3)
		}, L = I => {
			I.current && (I.current.scrollLeft += 1e3)
		};
		g.useEffect(() => {
			(async () => {
				var J, H;
				try {
					const $ = await pp(u);
					o($), console.log($);
					const Z = (H = (J = $ == null ? void 0 : $.data) == null ? void 0 : J.songs[0]) == null ? void 0 : H.id,
						de = await Li(Z);
					f(de.data);
					const pe = $.data.songs,
						ne = de.data.filter(we => !pe.some(_e => _e.id === we.id)),
						Se = [...pe, ...ne];
					console.log("Combined Songs:", Se), D(pe)
				} catch ($) {
					N("Error fetching album details"), console.error($)
				} finally {
					y(!1)
				}
			})()
		}, [u]);
		const P = () => {
			let I = JSON.parse(localStorage.getItem("likedAlbums")) || [];
			I.some(J => J.id === s.data.id) ? I = I.filter(J => J.id !== s.data.id) : I.push({
				id: s.data.id,
				name: s.data.name,
				image: s.data.image[2].url,
				artists: s.data.artists
			}), w(I), localStorage.setItem("likedAlbums", JSON.stringify(I))
		};
		if (m) return i.jsxs("div", {
			className: "flex h-screen w-screen justify-center items-center ",
			children: [" ", i.jsx("img", {
				src: "/8Music/Loading.gif",
				alt: ""
			}), " "]
		});
		if (A) return i.jsx("div", {
			className: "flex h-screen w-screen justify-center items-center",
			children: A
		});
		const F = s.data || [],
			z = s.data.artists.primary[0].id,
			W = s.data.artists.primary[0].name;
		return i.jsxs(i.Fragment, {
			children: [i.jsx(Br, {}), i.jsxs("div", {
				className: "flex flex-col   gap-[2rem] lg:gap-[2rem]  pt-[10rem] lg:pt-[6rem]   ",
				children: [i.jsxs("div", {
					className: "flex items-center pl-[2rem] ",
					children: [i.jsx("img", {
						src: s.data.image[2].url,
						alt: s.name,
						className: " h-[8rem] lg:h-[15rem] lg:rounded rounded-full object-cover  shadow-2xl shadow-zinc-600"
					}), i.jsxs("div", {
						className: "flex flex-col pl-[2rem]",
						children: [i.jsxs("div", {
							children: [i.jsx("h2", {
								className: "text-xl lg:text-2xl font-medium lg:font-semibold ",
								children: s.data.name
							}), i.jsxs("pre", {
								className: "font-sans font-semibold text-sm lg:text-lg",
								children: [s.data.songCount, " Songs by", " ", i.jsx(Pe, {
									to: `/artists/${z}`,
									className: "hover:underline",
									children: W
								}), " "]
							})]
						}), i.jsxs("div", {
							className: "flex gap-2",
							children: [i.jsx("button", {
								onClick: P,
								title: "Like Album",
								className: " border-[1px] mt-3 border-[#8f8f8f6e] h-[3rem] w-[3rem] flex justify-center items-center rounded-full  ",
								children: b.some(I => I.id === F.id) ? i.jsx(gl, {
									className: "text-red-500 text-2xl"
								}) : i.jsx(ki, {
									className: "text-2xl icon"
								})
							}), i.jsx("button", {
								className: " border-[1px] mt-3 border-[#8f8f8f6e] flex justify-center items-center h-[3rem] w-[3rem]  rounded-full  ",
								title: "Share",
								children: i.jsx(k2, {
									className: "icon text-[1.8rem] mr-[0.1rem]",
									onClick: () => navigator.share({
										title: s.data.name,
										text: "Listen on 8Music",
										url: `${window.location.origin}/albums/${u}`
									})
								})
							})]
						})]
					})]
				}), i.jsx("div", {
					className: "flex flex-col h-auto gap-4 ",
					children: i.jsx("div", {
						className: "overflow-y-scroll scroll-smooth scroll-hide  pt-3 ",
						children: (V = s.data.songs) == null ? void 0 : V.map(I => i.jsx(wl, {
							...I,
							song: k
						}, I.id))
					})
				}), d.length >= 0 && i.jsxs("div", {
					className: "flex flex-col justify-center items-center w-full mb-[5rem]",
					children: [i.jsx("h2", {
						className: " lg:ml-[3rem] lg:-translate-x-[37rem] lg:text-center m-4 text-xl sm:text-2xl font-semibold  pl-3 sm:pl-[3rem] w-full",
						children: "You Might Like"
					}), i.jsxs("div", {
						className: "flex justify-center items-center gap-3 w-full",
						children: [i.jsx(it, {
							className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn  hidden lg:block  ",
							onClick: () => B(j)
						}), i.jsxs("div", {
							className: "grid grid-rows-1  grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full  px-3 lg:px-0 scroll-smooth",
							ref: j,
							children: ["  ", d == null ? void 0 : d.map((I, J) => i.jsx(nn, {
								...I,
								song: k
							}, I.id || J))]
						}), i.jsx(ot, {
							className: "text-3xl hover:scale-125 transition-all duration-200 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block  ",
							onClick: () => L(j)
						})]
					})]
				})]
			}), i.jsx(Fr, {}), i.jsx(Nr, {}), i.jsx(tu, {})]
		})
	},
	zp = ({
		albums: u
	}) => {
		const s = g.useRef(null),
			o = () => {
				s.current && s.current.scrollBy({
					left: -800,
					behavior: "smooth"
				})
			},
			d = () => {
				s.current && s.current.scrollBy({
					left: 800,
					behavior: "smooth"
				})
			};
		return i.jsxs("div", {
			className: "flex justify-center items-center gap-3",
			children: [i.jsx(it, {
				className: "text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block ",
				onClick: o
			}), i.jsx("div", {
				className: "grid grid-rows-1 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full px-3 lg:px-0 scroll-smooth",
				ref: s,
				children: u == null ? void 0 : u.map(f => i.jsx(Ri, {
					...f
				}, f.id))
			}), i.jsx(ot, {
				className: "text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block ",
				onClick: d
			})]
		})
	},
	Mp = () => {
		var B, L, P;
		const {
			id: u
		} = yl(), [s, o] = g.useState({}), [d, f] = g.useState(!0), [m, y] = g.useState(null), [k, D] = g.useState({}), A = vl(), N = F => !F || isNaN(F) ? "Not available" : (parseInt(F, 10) / 1e6).toFixed(2), b = F => !F || isNaN(F) ? "Not available" : (parseInt(F, 10) / 1e5).toFixed(2);
		if (g.useEffect(() => {
				(async () => {
					try {
						let z = await fetch(`https://jiosaavn-api-lime.vercel.app/api/artists?id=${u}`);
						if (z.ok || (z = await fetch(`https://saavn.dev/api/artists?id=${u}`)), !z.ok) throw new Error("Both APIs failed");
						const W = await z.json();
						console.log(W), o(W), D(W.data.topSongs)
					} catch (z) {
						console.error(z), y("Error fetching artist details")
					} finally {
						f(!1)
					}
				})()
			}, [u]), d) return i.jsx("div", {
			className: "flex h-screen w-screen justify-center items-center",
			children: i.jsx("img", {
				src: "/8Music/Loading.gif",
				alt: "",
				className: ""
			})
		});
		if (m) return i.jsxs("div", {
			className: "flex h-screen w-screen justify-center items-center font-semibold",
			children: [i.jsx(Fp, {
				className: "text-2xl m-2 lg:cursor-pointer",
				onClick: () => A(-1)
			}), m]
		});
		const w = s.data || {},
			j = ((L = (B = w.image) == null ? void 0 : B[2]) == null ? void 0 : L.url) || "";
		return i.jsxs(i.Fragment, {
			children: [i.jsx(Br, {}), i.jsxs("div", {
				className: " mb-10",
				children: [i.jsxs("div", {
					className: "mt-[8rem] lg:mt-[6rem]  flex flex-col justify-center gap-[1rem]  pt-5 ",
					children: [i.jsxs("div", {
						className: "pl-[2rem] flex gap-5 items-center",
						children: [i.jsx("img", {
							src: j,
							alt: w.name,
							className: "artistDetails h-[8rem] lg:h-[15rem] lg:rounded rounded-full"
						}), i.jsxs("div", {
							className: "flex flex-col gap-2 ",
							children: [i.jsxs("h1", {
								className: "text-2xl font-bold mt-5 flex ",
								children: [w.name, w.isVerified && i.jsx("div", {
									className: "flex ",
									children: i.jsx("img", {
										src: "https://8088y.site/8Music/verified.svg",
										alt: "Verified",
										className: "ml-2 mt-1 w-[1.2rem]   flex  "
									})
								})]
							}), i.jsxs("div", {
								className: "flex flex-col",
								children: [i.jsxs("span", {
									className: "text-[0.70rem] lg:text-[0.90rem] font-medium",
									children: ["Followers : ", N(w.followerCount), " Million"]
								}), i.jsxs("span", {
									className: "text-[0.70rem] lg:text-[0.90rem] font-medium ",
									children: ["Listeners : ", b(w.fanCount), " K"]
								})]
							})]
						})]
					}), i.jsxs("div", {
						className: "flex flex-col mt-[1rem] gap-[1rem] h-[40rem]",
						children: [i.jsx("h2", {
							className: "text-2xl font-bold pl-[1.5rem] block",
							children: "Top Songs"
						}), i.jsx("div", {
							className: "p-2 w-full overflow-y-scroll scroll-hide ",
							children: w.topSongs.map(F => i.jsx(wl, {
								...F,
								song: k
							}, F.id))
						})]
					})]
				}), i.jsxs("div", {
					className: "flex flex-col gap-2",
					children: [i.jsx("div", {
						className: "gap-4 flex flex-col",
						children: s.data.similarArtists.length > 0 && i.jsxs(i.Fragment, {
							children: [i.jsx("h2", {
								className: " lg:font-bold text-xl lg:text-2xl font-semibold pl-[1.5rem] lg:pl-[3rem] pb-[1rem] ",
								children: "Similar Artists"
							}), i.jsx("div", {
								className: "grid grid-flow-col lg:w-max pr-10  gap-4 pl-[1.2rem] lg:pl-[3rem] overflow-x-scroll scroll-hide ",
								children: (P = s.data.similarArtists) == null ? void 0 : P.map(F => i.jsx(qi, {
									...F
								}, F.id))
							})]
						})
					}), i.jsxs("div", {
						children: [i.jsx("h2", {
							className: " m-4 lg:font-bold text-xl lg:text-2xl font-semibold  w-[90%] lg:ml-[3rem]",
							children: "Top Albums"
						}), i.jsx(zp, {
							albums: w.topAlbums
						})]
					}), i.jsxs("div", {
						children: [i.jsx("h2", {
							className: " m-4 text-xl lg:font-bold lg:text-2xl font-semibold  w-[90%] lg:ml-[3rem]",
							children: "Singles"
						}), i.jsx(Ti, {
							albums: s.data.singles
						})]
					})]
				})]
			}), i.jsx(Fr, {}), i.jsx(Nr, {}), i.jsx(tu, {})]
		})
	},
	Op = () => {
		const {
			query: u
		} = yl(), [s, o] = g.useState([]), [d, f] = g.useState([]), [m, y] = g.useState([]), [k, D] = g.useState([]), [A, N] = g.useState(!0), [b, w] = g.useState(null), j = g.useRef(null);
		g.useEffect(() => {
			(async () => {
				try {
					const F = await D2(u, 30);
					o(F.data.results);
					const z = await w2(u);
					f(z.data.results);
					const W = await fp(u);
					y(W.data.results);
					const V = await A2(u);
					D(V.data.results)
				} catch (F) {
					w(F.message)
				} finally {
					N(!1)
				}
			})()
		}, [u]);
		const B = () => {
				j.current && (j.current.scrollLeft -= 800)
			},
			L = () => {
				j.current && (j.current.scrollLeft += 800)
			};
		return i.jsxs(i.Fragment, {
			children: [i.jsx(Br, {}), i.jsxs("div", {
				className: "mt-[8rem] lg:mt-[6rem]  pb-[4rem] gap-5 flex flex-col",
				children: [i.jsxs("h2", {
					className: "text-2xl font-semibold ml-[1rem] lg:ml-[3rem] flex flex-col gap-3",
					children: ['Search Results for  "', u, '" ', i.jsx("p", {
						className: "text-xl",
						children: "Songs"
					})]
				}), i.jsxs("div", {
					className: "flex justify-center items-center gap-3",
					children: [i.jsx(it, {
						className: "text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block ",
						onClick: B
					}), i.jsx("div", {
						className: "grid grid-rows-1 grid-flow-col justify-start overflow-x-scroll scroll-hide items-center gap-3 lg:gap-2 w-full px-3 lg:px-0 scroll-smooth",
						ref: j,
						children: s.length > 0 ? s.map(P => i.jsx(nn, {
							...P
						}, P.id)) : i.jsx("div", {
							className: "text-center col-span-full ",
							children: " No results found. "
						})
					}), i.jsx(ot, {
						className: "text-3xl  w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] arrow-btn hidden lg:block ",
						onClick: L
					})]
				}), d.length > 0 && i.jsxs(i.Fragment, {
					children: [i.jsx("p", {
						className: "text-xl font-semibold  ml-[1rem] lg:ml-[3rem]",
						children: "Albums"
					}), i.jsx(Ti, {
						albums: d
					})]
				}), k.length > 0 && i.jsxs(i.Fragment, {
					children: [i.jsx("p", {
						className: "text-xl font-semibold  ml-[1rem] lg:ml-[3rem]",
						children: "Playlists"
					}), i.jsx(j2, {
						playlists: k
					})]
				}), m.length > 0 && i.jsxs(i.Fragment, {
					children: [i.jsx("p", {
						className: "text-xl font-semibold  ml-[1rem] lg:ml-[3rem]",
						children: "Artists"
					}), i.jsx(B2, {
						artists: m
					})]
				})]
			}), i.jsx(tu, {}), i.jsx(Nr, {}), i.jsx(Fr, {})]
		})
	},
	Up = () => {
		var z, W;
		const {
			id: u
		} = yl(), [s, o] = g.useState({}), [d, f] = g.useState(!0), [m, y] = g.useState({}), [k, D] = g.useState(null), {
			playMusic: A
		} = g.useContext(an), [N, b] = g.useState(() => JSON.parse(localStorage.getItem("likedPlaylists")) || []);
		if (g.useEffect(() => {
				(async () => {
					try {
						const I = await Ei(u);
						o(I), y(I.data.songs)
					} catch {
						D("Failed to fetch playlist details. Please try again later.")
					} finally {
						f(!1)
					}
				})()
			}, [u]), g.useEffect(() => {
				localStorage.setItem("likedPlaylists", JSON.stringify(N))
			}, [N]), d) return i.jsx("div", {
			className: "flex h-screen w-screen justify-center items-center",
			children: i.jsx("img", {
				src: "/8Music/Loading.gif",
				alt: "Loading..."
			})
		});
		if (k) return i.jsx("div", {
			className: "flex h-screen w-screen justify-center items-center text-red-500 text-lg",
			children: k
		});
		const w = s.data || {},
			j = ((W = (z = w.image) == null ? void 0 : z[2]) == null ? void 0 : W.url) || "/default-image.png",
			B = () => {
				let V = [...N];
				V.some(I => I.id === w.id) ? V = V.filter(I => I.id !== w.id) : V.push({
					id: w.id,
					name: w.name,
					image: j
				}), b(V)
			},
			L = () => {
				var V;
				if (w.songs && w.songs.length > 0) {
					const I = w.songs[0],
						J = I.downloadUrl ? ((V = I.downloadUrl[4]) == null ? void 0 : V.url) || I.downloadUrl : I.audio,
						{
							name: H,
							duration: $,
							image: Z,
							id: de,
							artists: pe
						} = I;
					A(J, H, $, Z, de, pe, w.songs)
				}
			},
			P = w.songs.map(V => V.duration).reduce((V, I) => V + I, 0),
			F = V => {
				const I = Math.floor(V / 3600),
					J = Math.floor(V % 3600 / 60);
				return `${I}h   ${J}m `
			};
		return i.jsxs(i.Fragment, {
			children: [i.jsx(Br, {}), i.jsxs("div", {
				className: "flex flex-col mt-[11rem] lg:mt-[6rem] ",
				children: [i.jsxs("div", {
					className: "flex items-center lg:pl-[2rem] lg:flex-row flex-col gap-[1rem] lg:gap-[2rem]",
					children: [i.jsx("img", {
						src: j,
						alt: w.name || "Playlist",
						className: "w-[10rem] lg:w-[15rem] rounded object-cover DetailImg"
					}), i.jsxs("div", {
						className: "flex flex-col gap-1 items-center",
						children: [i.jsx("h1", {
							className: "text-2xl lg:text-3xl font-bold ",
							children: w.name
						}), i.jsxs("p", {
							className: "text-sm lg:text-lg font-semibold",
							children: ["Total Songs : ", w.songCount || 0]
						}), i.jsxs("p", {
							className: "text-sm lg:text-lg font-semibold",
							children: ["Total Duration : ", F(P)]
						}), i.jsxs("div", {
							className: "flex lg:mt-4 gap-4",
							children: [i.jsx("span", {
								className: " hidden lg:flex justify-center items-center h-[3rem] w-[3rem] border-[1px] border-[#8f8f8f6e]  rounded-full cursor-pointer ",
								children: i.jsx(hl, {
									className: " text-xl icon active:scale-90",
									onClick: L
								})
							}), i.jsx("button", {
								onClick: B,
								title: "Like Playlist",
								className: "hidden mb-[1.4rem] border-[1px] border-[#8f8f8f6e] h-[3rem] w-[3rem] lg:flex justify-center items-center rounded-full ",
								children: N.some(V => V.id === w.id) ? i.jsx(gl, {
									className: "text-red-500 text-2xl"
								}) : i.jsx(ki, {
									className: "icon text-2xl"
								})
							})]
						})]
					}), i.jsxs("div", {
						className: "flex gap-3",
						children: [i.jsx("button", {
							onClick: B,
							title: "Like Playlist",
							className: "lg:hidden mb-[1.4rem] border-[1px] border-[#8f8f8f6e] h-[3rem] w-[3rem] flex justify-center items-center rounded-full ",
							children: N.some(V => V.id === w.id) ? i.jsx(gl, {
								className: "text-red-500 text-2xl"
							}) : i.jsx(ki, {
								className: "icon text-2xl"
							})
						}), i.jsx("span", {
							className: " lg:hidden flex justify-center items-center h-[3rem] w-[3rem] border-[1px] border-[#8f8f8f6e] rounded-full cursor-pointer ",
							children: i.jsx(hl, {
								className: " text-xl icon active:scale-90",
								onClick: L
							})
						})]
					})]
				}), i.jsxs("div", {
					children: [i.jsx("h2", {
						className: "lg:mt-8   mt-2 mb-2 ml-2 text-2xl font-semibold ",
						children: "Top Songs"
					}), i.jsx("div", {
						className: "flex flex-col",
						children: w.songs && w.songs.length > 0 ? w.songs.map(V => i.jsx(wl, {
							...V,
							song: m
						}, V.id)) : i.jsx("p", {
							className: "text-center text-gray-500 w-full",
							children: "Playlist is Empty......"
						})
					})]
				})]
			}), i.jsx(Fr, {}), i.jsx(Nr, {}), i.jsx(tu, {})]
		})
	};

function Vp() {
	const u = ["For You", "Tamil", "English"],
		[s, o] = g.useState("For You"),
		[d, f] = g.useState([]),
		[m, y] = g.useState(!1),
		k = g.useRef(null),
		D = () => {
			k.current && (k.current.scrollLeft -= 800)
		},
		A = () => {
			k.current && (k.current.scrollLeft += 800)
		};
	g.useEffect(() => {
		f(r2["For You"])
	}, []);
	const N = async j => {
		if (o(j), j === "For You") {
			f(r2["For You"]);
			return
		}
		try {
			y(!0);
			const L = await (await fetch(`https://jiosaavn-api-lime.vercel.app/api/search/playlists?query=${j.toLowerCase()}&limit=30`)).json();
			f(L.data.results)
		} catch (B) {
			console.error("Error fetching data:", B), f([])
		} finally {
			y(!1)
		}
	}, b = vl(), w = j => {
		b(`/playlists/${j.id}`)
	};
	return i.jsxs(i.Fragment, {
		children: [i.jsx(Br, {}), i.jsxs("div", {
			className: "mt-[8.3rem] lg:mt-[6em] mb-[12rem] lg:mb-[4rem]",
			children: [i.jsx("ul", {
				className: " flex scroll-smooth items-center lg:justify-center gap-[1rem]  px-5  py-2  overflow-scroll scroll-hide lg:overflow-auto lg:flex-wrap ",
				children: u.map(j => i.jsx("pre", {
					onClick: () => N(j),
					className: `flex font-semibold  items-center cursor-pointer w-auto p-1 list-none border border-zinc-700  text-center px-5 text-base  rounded-3xl transition-all duration-75
              ${s===j?"search-btn arrow-btnn ":" navigator "}`,
					children: j
				}, j))
			}), i.jsxs("div", {
				className: "flex flex-col gap-5 ",
				children: [i.jsxs("h2", {
					className: "text-2xl font-semibold ml-[1.5rem] lg:ml-[4rem]   mt-3 ",
					children: ["• ", s]
				}), i.jsxs("div", {
					className: "flex justify-center items-center",
					children: [i.jsx(it, {
						className: `text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer  h-[9rem]
       hidden lg:block arrow-btn `,
						onClick: D
					}), i.jsx("div", {
						ref: k,
						className: " grid lg:grid-rows-2 lg:grid-cols-none scroll-smooth grid-cols-2  lg:grid-flow-col-dense gap-[1.4rem] w-full px-[1.4rem] overflow-x-scroll scroll-hide",
						children: d.map(j => i.jsxs("span", {
							onClick: () => w(j),
							className: "h-[13rem] overflow-hidden w-[10rem] cursor-pointer py-1 card rounded-md ",
							children: [i.jsx("img", {
								src: j.image[2].url,
								className: "h-[10rem] p-3  rounded-2xl hover:brightness-[0.65] "
							}), i.jsx("p", {
								className: "text-center text-[14px] px-1",
								children: j.name ? Ye.decode(j.name) : "Empty"
							})]
						}, j.id))
					}), i.jsx(ot, {
						className: "text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem] hidden lg:block arrow-btn",
						onClick: A
					})]
				})]
			})]
		}), i.jsx(Fr, {}), i.jsx(Nr, {})]
	})
}
const Hp = () => {
	const [u, s] = g.useState([]), [o, d] = g.useState([]), [f, m] = g.useState({}), [y, k] = g.useState([]), D = g.useRef(null), A = g.useRef(null);
	g.useEffect(() => {
		const w = JSON.parse(localStorage.getItem("likedSongs")) || [];
		s(w), m(w), d(JSON.parse(localStorage.getItem("likedAlbums")) || []), k(JSON.parse(localStorage.getItem("likedPlaylists")) || [])
	}, []);
	const N = w => {
			w.current && w.current.scrollBy({
				left: -800,
				behavior: "smooth"
			})
		},
		b = w => {
			w.current && w.current.scrollBy({
				left: 800,
				behavior: "smooth"
			})
		};
	return i.jsxs(i.Fragment, {
		children: [i.jsx(Br, {}), i.jsxs("div", {
			className: "flex flex-col mb-[12rem] gap-[2rem] ",
			children: [i.jsxs("div", {
				className: "lg:ml-[3rem] ml-[2rem] flex items-center gap-5 mt-[9rem] lg:mt-[6rem]",
				children: [i.jsx("span", {
					className: " flex justify-center items-center h-[8rem] w-[8rem] lg:h-[12rem] lg:w-[12rem] rounded-lg liked ",
					children: i.jsx(gl, {
						className: "text-5xl  icon "
					})
				}), i.jsx("h2", {
					className: "text-[1.8rem] lg:text-3xl font-semibold lg:font-bold ml-4",
					children: "My Music"
				})]
			}), i.jsxs("div", {
				className: "flex gap-[1.5rem] flex-col ",
				children: [i.jsx("div", {
					children: u.length > 0 && i.jsx("div", {
						className: "flex flex-wrap",
						children: u.map((w, j) => w && i.jsx(wl, {
							id: w.id,
							image: w.image,
							artists: w.artists,
							name: w.name,
							duration: w.duration,
							downloadUrl: w.audio,
							song: f
						}, w.id || j))
					})
				}), i.jsx("div", {
					children: o.length > 0 && i.jsxs(i.Fragment, {
						children: [i.jsx("h1", {
							className: "text-2xl font-semibold lg:ml-4 p-4",
							children: "Liked Albums"
						}), i.jsxs("div", {
							className: "flex mx-1 lg:mx-8 items-center gap-3",
							children: [i.jsx(it, {
								className: " arrow-btn absolute left-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block",
								onClick: () => N(D)
							}), i.jsx("div", {
								className: "grid grid-rows-1 grid-flow-col gap-3 lg:gap-2 overflow-x-auto scroll-hide w-max  px-3 lg:px-0 scroll-smooth",
								ref: D,
								children: o.map(w => i.jsx(Ri, {
									...w
								}, w.id))
							}), i.jsx(ot, {
								className: "arrow-btn absolute right-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block",
								onClick: () => b(D)
							})]
						})]
					})
				}), i.jsx("div", {
					children: y.length > 0 && i.jsxs(i.Fragment, {
						children: [i.jsx("h1", {
							className: "text-2xl font-semibold lg:ml-4 p-4",
							children: "Liked Playlists"
						}), i.jsxs("div", {
							className: "flex mx-1 lg:mx-8 items-center gap-3",
							children: [i.jsx(it, {
								className: "arrow-btn absolute left-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block",
								onClick: () => N(A)
							}), i.jsx("div", {
								className: "grid grid-rows-1 grid-flow-col gap-3 lg:gap-[0.66rem] overflow-x-auto scroll-hide w-max  px-3 lg:px-0 scroll-smooth",
								ref: A,
								children: y.map(w => i.jsx(S2, {
									...w
								}, w.id))
							}), i.jsx(ot, {
								className: "arrow-btn absolute right-0 text-3xl w-[2rem] hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer h-[9rem]  hidden lg:block ",
								onClick: () => b(A)
							})]
						})]
					})
				})]
			}), u.length === 0 && o.length === 0 && y.length === 0 && i.jsx("li", {
				className: "list-disc text-xl ml-[3rem]",
				children: "No Liked Songs, Albums, or Playlists."
			})]
		}), i.jsx(Fr, {}), i.jsx(Nr, {})]
	})
};
var $p = "@vercel/analytics",
	Gp = "1.4.1",
	Wp = () => {
		window.va || (window.va = function(...s) {
			(window.vaq = window.vaq || []).push(s)
		})
	};

function F2() {
	return typeof window < "u"
}

function N2() {
	try {
		const u = "production"
	} catch {}
	return "production"
}

function Qp(u = "auto") {
	if (u === "auto") {
		window.vam = N2();
		return
	}
	window.vam = u
}

function Kp() {
	return (F2() ? window.vam : N2()) || "production"
}

function wi() {
	return Kp() === "development"
}
var Yp = "https://va.vercel-scripts.com/v1/script.debug.js",
	Jp = "/_vercel/insights/script.js";

function Zp(u = {
	debug: !0
}) {
	var s;
	if (!F2()) return;
	Qp(u.mode), Wp(), u.beforeSend && ((s = window.va) == null || s.call(window, "beforeSend", u.beforeSend));
	const o = u.scriptSrc || (wi() ? Yp : Jp);
	if (document.head.querySelector(`script[src*="${o}"]`)) return;
	const d = document.createElement("script");
	d.src = o, d.defer = !0, d.dataset.sdkn = $p + (u.framework ? `/${u.framework}` : ""), d.dataset.sdkv = Gp, u.disableAutoTrack && (d.dataset.disableAutoTrack = "1"), u.endpoint && (d.dataset.endpoint = u.endpoint), u.dsn && (d.dataset.dsn = u.dsn), d.onerror = () => {
		const f = wi() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
		console.log(`[Vercel Web Analytics] Failed to load script from ${o}. ${f}`)
	}, wi() && u.debug === !1 && (d.dataset.debug = "false"), document.head.appendChild(d)
}

function Xp({
	route: u,
	path: s
}) {
	var o;
	(o = window.va) == null || o.call(window, "pageview", {
		route: u,
		path: s
	})
}

function em(u) {
	return g.useEffect(() => {
		var s;
		u.beforeSend && ((s = window.va) == null || s.call(window, "beforeSend", u.beforeSend))
	}, [u.beforeSend]), g.useEffect(() => {
		Zp({
			framework: u.framework || "react",
			...u.route !== void 0 && {
				disableAutoTrack: !0
			},
			...u
		})
	}, []), g.useEffect(() => {
		u.route && u.path && Xp({
			route: u.route,
			path: u.path
		})
	}, [u.route, u.path]), null
}
var n2 = {},
	tm = "@vercel/speed-insights",
	rm = "1.2.0",
	nm = () => {
		window.si || (window.si = function(...s) {
			(window.siq = window.siq || []).push(s)
		})
	};

function um() {
	return typeof window < "u"
}

function lm() {
	try {
		const u = "production"
	} catch {}
	return "production"
}

function _2() {
	return lm() === "development"
}

function am(u) {
	return u.scriptSrc ? u.scriptSrc : _2() ? "https://va.vercel-scripts.com/v1/speed-insights/script.debug.js" : u.dsn ? "https://va.vercel-scripts.com/v1/speed-insights/script.js" : u.basePath ? `${u.basePath}/speed-insights/script.js` : "/_vercel/speed-insights/script.js"
}

function im(u = {}) {
	var s;
	if (!um() || u.route === null) return null;
	nm();
	const o = am(u);
	if (document.head.querySelector(`script[src*="${o}"]`)) return null;
	u.beforeSend && ((s = window.si) == null || s.call(window, "beforeSend", u.beforeSend));
	const d = document.createElement("script");
	return d.src = o, d.defer = !0, d.dataset.sdkn = tm + (u.framework ? `/${u.framework}` : ""), d.dataset.sdkv = rm, u.sampleRate && (d.dataset.sampleRate = u.sampleRate.toString()), u.route && (d.dataset.route = u.route), u.endpoint ? d.dataset.endpoint = u.endpoint : u.basePath && (d.dataset.endpoint = `${u.basePath}/speed-insights/vitals`), u.dsn && (d.dataset.dsn = u.dsn), _2() && u.debug === !1 && (d.dataset.debug = "false"), d.onerror = () => {
		console.log(`[Vercel Speed Insights] Failed to load script from ${o}. Please check if any content blockers are enabled and try again.`)
	}, document.head.appendChild(d), {
		setRoute: f => {
			d.dataset.route = f ?? void 0
		}
	}
}

function om() {
	if (!(typeof process > "u" || typeof n2 > "u")) return n2.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH
}

function sm(u) {
	g.useEffect(() => {
		var o;
		u.beforeSend && ((o = window.si) == null || o.call(window, "beforeSend", u.beforeSend))
	}, [u.beforeSend]);
	const s = g.useRef(null);
	return g.useEffect(() => {
		if (s.current) u.route && s.current(u.route);
		else {
			const o = im({
				framework: u.framework ?? "react",
				basePath: u.basePath ?? om(),
				...u
			});
			o && (s.current = o.setRoute)
		}
	}, [u.route]), null
}

function cm() {
	const [u, s] = g.useState([null]), [o, d] = g.useState([null]), [f, m] = g.useState(!1), [y, k] = g.useState(null), [D, A] = g.useState(!1), [N, b] = g.useState("none"), [w, j] = g.useState(!1), B = async (I, J, H, $, Z, de, pe) => {
		var De;
		if (y && y.id === Z) f ? (m(!1), y.audio.pause()) : (m(!0), await y.audio.play());
		else {
			y && (y.audio.pause(), m(!1));
			const ne = new Audio(I || I[4].url);
			k({
				name: J,
				duration: H,
				image: ((De = $[2]) == null ? void 0 : De.url) || $,
				id: Z,
				audio: ne,
				artists: de
			}), m(!0), await ne.play()
		}
		pe && JSON.stringify(u) !== JSON.stringify(pe) && s(pe), L({
			downloadUrl: I,
			id: Z,
			name: J,
			duration: H,
			image: $,
			artists: de
		})
	}, L = I => {
		let J = JSON.parse(localStorage.getItem("playedSongs")) || [];
		J.some(H => H.id === I.id) || J.unshift(I), J.length > 20 && (J = J.slice(0, 20)), localStorage.setItem("playedSongs", JSON.stringify(J))
	}, P = async () => {
		var I;
		if ((I = y == null ? void 0 : y.audio) != null && I.currentSrc) try {
			const H = await (await fetch(y.audio.currentSrc)).blob(),
				$ = document.createElement("a");
			$.href = URL.createObjectURL(H), $.download = `${y!=null&&y.name?Ye.decode(y.name):"Empty"}.mp3`, document.body.appendChild($), $.click(), document.body.removeChild($), URL.revokeObjectURL($.href), j(!0), setTimeout(() => {
				j(!1)
			}, 3e3)
		} catch (J) {
			console.error("Error downloading the song:", J), alert("Failed to download the song!")
		} else alert("Download URL is not available!")
	}, F = () => {
		var I, J;
		if (y) {
			const H = u.findIndex($ => ($ == null ? void 0 : $.id) === y.id);
			if (H === -1) return;
			if (D) {
				const $ = Math.floor(Math.random() * u.length),
					Z = u[$];
				if (!Z) return;
				const de = Z.downloadUrl ? ((I = Z.downloadUrl[4]) == null ? void 0 : I.url) || Z.downloadUrl : Z.audio,
					{
						name: pe,
						duration: De,
						image: ne,
						id: Se,
						artists: we
					} = Z;
				B(de, pe, De, ne, Se, we)
			} else {
				let $ = (H + 1) % u.length;
				const Z = u[$];
				if (!Z) return;
				const de = Z.downloadUrl ? ((J = Z.downloadUrl[4]) == null ? void 0 : J.url) || Z.downloadUrl : Z.audio,
					{
						name: pe,
						duration: De,
						image: ne,
						id: Se,
						artists: we
					} = Z;
				B(de, pe, De, ne, Se, we)
			}
		}
	}, z = () => {
		if (!y || u.length === 0) return;
		const I = u.findIndex(Z => Z.id === y.id);
		let J;
		D ? J = (I - 3) % u.length : J = I === 0 ? u.length - 1 : I - 1;
		const H = u[J],
			$ = H.downloadUrl ? H.downloadUrl[4].url || H.downloadUrl : H.audio;
		B($, H.name, H.duration, H.image, H.id, H.artists)
	}, W = () => {
		b(I => I === "none" ? "one" : "none")
	}, V = () => {
		A(I => !I)
	};
	return i.jsxs(i.Fragment, {
		children: [i.jsx(sm, {}), i.jsx(em, {}), i.jsxs(an.Provider, {
			value: {
				songs: u,
				song: o,
				setSongs: s,
				setSong: d,
				playMusic: B,
				setIsPlaying: m,
				isPlaying: f,
				currentSong: y,
				nextSong: F,
				prevSong: z,
				shuffle: D,
				toggleShuffle: V,
				downloadSong: P,
				toggleRepeatMode: W,
				repeatMode: N
			},
			children: [i.jsxs(Ff, {
				children: [i.jsx(ir, {
					path: "/",
					element: i.jsx(Pp, {})
				}), i.jsx(ir, {
					path: "/artists/:id",
					element: i.jsx(Mp, {})
				}), i.jsx(ir, {
					path: "/albums/:id",
					element: i.jsx(Ip, {})
				}), i.jsx(ir, {
					path: "/search/:query",
					element: i.jsx(Op, {})
				}), i.jsx(ir, {
					path: "/playlists/:id",
					element: i.jsx(Up, {})
				}), i.jsx(ir, {
					path: "/Browse",
					element: i.jsx(Vp, {})
				}), i.jsx(ir, {
					path: "/Music",
					element: i.jsx(Hp, {})
				})]
			}), w && i.jsx("div", {
				className: "fixed flex justify-center items-center w-full z-30 top-6",
				children: i.jsxs("div", {
					className: "flex bg-[#2c2c2c] text-white p-3 rounded shadow-xl gap-3",
					children: [i.jsx(jp, {
						className: "flex self-center text-xl "
					}), i.jsx("h2", {
						className: "font-semibold",
						children: "Downloaded"
					})]
				})
			})]
		})]
	})
}
P0.createRoot(document.getElementById("root")).render(i.jsx(Xf, {
	basename: "/8Music",
	children: i.jsx(cm, {})
}));