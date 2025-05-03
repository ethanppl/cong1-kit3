(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$document = _Browser_document;
var $author$project$Main$defaultQuestion = {answer: '人戈日口', englishKey: 'OIAR', id: 1, target: '倉'};
var $author$project$Main$NewQuestion = function (a) {
	return {$: 'NewQuestion', a: a};
};
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $author$project$Main$generateNumber = function (model) {
	return A2($elm$random$Random$generate, $author$project$Main$NewQuestion, model.questionGenerator);
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $author$project$Questions$maxQuestions = 2999;
var $author$project$Main$init = function (_v0) {
	var model = {
		content: '',
		numMaxQuestion: $author$project$Questions$maxQuestions + 1,
		numMaxQuestionInput: $elm$core$String$fromInt($author$project$Questions$maxQuestions + 1),
		question: $author$project$Main$defaultQuestion,
		questionGenerator: A2($elm$random$Random$int, 0, $author$project$Questions$maxQuestions),
		showAnswer: false,
		showSettings: false,
		showVirtualKeyboard: true
	};
	return _Utils_Tuple2(
		model,
		$author$project$Main$generateNumber(model));
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$Control = function (a) {
	return {$: 'Control', a: a};
};
var $author$project$Main$PressedLetter = function (a) {
	return {$: 'PressedLetter', a: a};
};
var $author$project$Main$mapKey = function (_char) {
	switch (_char.valueOf()) {
		case 'A':
			return _Utils_chr('日');
		case 'B':
			return _Utils_chr('月');
		case 'C':
			return _Utils_chr('金');
		case 'D':
			return _Utils_chr('木');
		case 'E':
			return _Utils_chr('水');
		case 'F':
			return _Utils_chr('火');
		case 'G':
			return _Utils_chr('土');
		case 'H':
			return _Utils_chr('竹');
		case 'I':
			return _Utils_chr('戈');
		case 'J':
			return _Utils_chr('十');
		case 'K':
			return _Utils_chr('大');
		case 'L':
			return _Utils_chr('中');
		case 'M':
			return _Utils_chr('一');
		case 'N':
			return _Utils_chr('弓');
		case 'O':
			return _Utils_chr('人');
		case 'P':
			return _Utils_chr('心');
		case 'Q':
			return _Utils_chr('手');
		case 'R':
			return _Utils_chr('口');
		case 'S':
			return _Utils_chr('尸');
		case 'T':
			return _Utils_chr('廿');
		case 'U':
			return _Utils_chr('山');
		case 'V':
			return _Utils_chr('女');
		case 'W':
			return _Utils_chr('田');
		case 'X':
			return _Utils_chr('難');
		case 'Y':
			return _Utils_chr('卜');
		case 'Z':
			return _Utils_chr('重');
		default:
			return _char;
	}
};
var $elm$core$Char$toLocaleUpper = _Char_toLocaleUpper;
var $author$project$Main$toKey = function (string) {
	var _v0 = $elm$core$String$uncons(string);
	if ((_v0.$ === 'Just') && (_v0.a.b === '')) {
		var _v1 = _v0.a;
		var _char = _v1.a;
		return $author$project$Main$PressedLetter(
			$author$project$Main$mapKey(
				$elm$core$Char$toLocaleUpper(_char)));
	} else {
		return $author$project$Main$Control(string);
	}
};
var $author$project$Main$keyDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Main$toKey,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $author$project$Main$Ignore = {$: 'Ignore'};
var $author$project$Main$LiftedLetter = function (a) {
	return {$: 'LiftedLetter', a: a};
};
var $author$project$Main$toUpKey = function (string) {
	var _v0 = $elm$core$String$uncons(string);
	if ((_v0.$ === 'Just') && (_v0.a.b === '')) {
		var _v1 = _v0.a;
		var _char = _v1.a;
		return $author$project$Main$LiftedLetter(
			$author$project$Main$mapKey(
				$elm$core$Char$toLocaleUpper(_char)));
	} else {
		return $author$project$Main$Ignore;
	}
};
var $author$project$Main$keyUpDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Main$toUpKey,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onKeyDown($author$project$Main$keyDecoder),
				$elm$browser$Browser$Events$onKeyUp($author$project$Main$keyUpDecoder)
			]));
};
var $elm$core$String$append = _String_append;
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$sendPlausibleEvent = _Platform_outgoingPort('sendPlausibleEvent', $elm$json$Json$Encode$string);
var $author$project$Main$checkAnswer = function (model) {
	return _Utils_eq(model.content, model.question.answer) ? _Utils_Tuple2(
		_Utils_update(
			model,
			{content: ''}),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$author$project$Main$generateNumber(model),
					$author$project$Main$sendPlausibleEvent('AnswerCorrect')
				]))) : _Utils_Tuple2(
		model,
		$author$project$Main$sendPlausibleEvent('AnswerWrong'));
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$numMaxQuestionUpdate = F2(
	function (model, num) {
		if ((_Utils_cmp(num, $author$project$Questions$maxQuestions + 1) > 0) || (num < 1)) {
			return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		} else {
			var modelUpdated = _Utils_update(
				model,
				{
					numMaxQuestion: num,
					questionGenerator: A2($elm$random$Random$int, 0, num - 1)
				});
			return _Utils_Tuple2(
				modelUpdated,
				$author$project$Main$generateNumber(modelUpdated));
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$closeSettings = function (model) {
	return A2(
		$author$project$Main$numMaxQuestionUpdate,
		model,
		A2(
			$elm$core$Maybe$withDefault,
			model.numMaxQuestion,
			$elm$core$String$toInt(model.numMaxQuestionInput)));
};
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Questions$questions = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			0,
			{answer: '竹日心戈', englishKey: 'HAPI', id: 0, target: '的'}),
			_Utils_Tuple2(
			1,
			{answer: '一', englishKey: 'M', id: 1, target: '一'}),
			_Utils_Tuple2(
			2,
			{answer: '日一卜人', englishKey: 'AMYO', id: 2, target: '是'}),
			_Utils_Tuple2(
			3,
			{answer: '大中土', englishKey: 'KLG', id: 3, target: '在'}),
			_Utils_Tuple2(
			4,
			{answer: '一火', englishKey: 'MF', id: 4, target: '不'}),
			_Utils_Tuple2(
			5,
			{answer: '弓弓', englishKey: 'NN', id: 5, target: '了'}),
			_Utils_Tuple2(
			6,
			{answer: '大月', englishKey: 'KB', id: 6, target: '有'}),
			_Utils_Tuple2(
			7,
			{answer: '竹木口', englishKey: 'HDR', id: 7, target: '和'}),
			_Utils_Tuple2(
			8,
			{answer: '人', englishKey: 'O', id: 8, target: '人'}),
			_Utils_Tuple2(
			9,
			{answer: '卜卜一口', englishKey: 'YYMR', id: 9, target: '這'}),
			_Utils_Tuple2(
			10,
			{answer: '中', englishKey: 'L', id: 10, target: '中'}),
			_Utils_Tuple2(
			11,
			{answer: '大', englishKey: 'K', id: 11, target: '大'}),
			_Utils_Tuple2(
			12,
			{answer: '戈大弓火', englishKey: 'IKNF', id: 12, target: '為'}),
			_Utils_Tuple2(
			13,
			{answer: '卜一', englishKey: 'YM', id: 13, target: '上'}),
			_Utils_Tuple2(
			14,
			{answer: '人田十口', englishKey: 'OWJR', id: 14, target: '個'}),
			_Utils_Tuple2(
			15,
			{answer: '田戈口一', englishKey: 'WIRM', id: 15, target: '國'}),
			_Utils_Tuple2(
			16,
			{answer: '竹手戈', englishKey: 'HQI', id: 16, target: '我'}),
			_Utils_Tuple2(
			17,
			{answer: '女戈人', englishKey: 'VIO', id: 17, target: '以'}),
			_Utils_Tuple2(
			18,
			{answer: '一田女', englishKey: 'MWV', id: 18, target: '要'}),
			_Utils_Tuple2(
			19,
			{answer: '土心木', englishKey: 'GPD', id: 19, target: '地'}),
			_Utils_Tuple2(
			20,
			{answer: '人心木', englishKey: 'OPD', id: 20, target: '他'}),
			_Utils_Tuple2(
			21,
			{answer: '日土木戈', englishKey: 'AGDI', id: 21, target: '時'}),
			_Utils_Tuple2(
			22,
			{answer: '木人人', englishKey: 'DOO', id: 22, target: '來'}),
			_Utils_Tuple2(
			23,
			{answer: '月手', englishKey: 'BQ', id: 23, target: '用'}),
			_Utils_Tuple2(
			24,
			{answer: '人日弓', englishKey: 'OAN', id: 24, target: '們'}),
			_Utils_Tuple2(
			25,
			{answer: '竹手一', englishKey: 'HQM', id: 25, target: '生'}),
			_Utils_Tuple2(
			26,
			{answer: '一土中弓', englishKey: 'MGLN', id: 26, target: '到'}),
			_Utils_Tuple2(
			27,
			{answer: '人人尸', englishKey: 'OOS', id: 27, target: '作'}),
			_Utils_Tuple2(
			28,
			{answer: '山山', englishKey: 'UU', id: 28, target: '出'}),
			_Utils_Tuple2(
			29,
			{answer: '卜火戈大山', englishKey: 'YFIKU', id: 29, target: '就'}),
			_Utils_Tuple2(
			30,
			{answer: '金尸竹', englishKey: 'CSH', id: 30, target: '分'}),
			_Utils_Tuple2(
			31,
			{answer: '卜尸人卜', englishKey: 'YSOY', id: 31, target: '於'}),
			_Utils_Tuple2(
			32,
			{answer: '廿土木戈', englishKey: 'TGDI', id: 32, target: '對'}),
			_Utils_Tuple2(
			33,
			{answer: '戈竹尸', englishKey: 'IHS', id: 33, target: '成'}),
			_Utils_Tuple2(
			34,
			{answer: '人一田日', englishKey: 'OMWA', id: 34, target: '會'}),
			_Utils_Tuple2(
			35,
			{answer: '一弓口', englishKey: 'MNR', id: 35, target: '可'}),
			_Utils_Tuple2(
			36,
			{answer: '卜土', englishKey: 'YG', id: 36, target: '主'}),
			_Utils_Tuple2(
			37,
			{answer: '弓人弓竹水', englishKey: 'NONHE', id: 37, target: '發'}),
			_Utils_Tuple2(
			38,
			{answer: '人手', englishKey: 'OQ', id: 38, target: '年'}),
			_Utils_Tuple2(
			39,
			{answer: '竹土大尸', englishKey: 'HGKS', id: 39, target: '動'}),
			_Utils_Tuple2(
			40,
			{answer: '月一口', englishKey: 'BMR', id: 40, target: '同'}),
			_Utils_Tuple2(
			41,
			{answer: '一中一', englishKey: 'MLM', id: 41, target: '工'}),
			_Utils_Tuple2(
			42,
			{answer: '心木', englishKey: 'PD', id: 42, target: '也'}),
			_Utils_Tuple2(
			43,
			{answer: '戈月心心', englishKey: 'IBPP', id: 43, target: '能'}),
			_Utils_Tuple2(
			44,
			{answer: '一卜', englishKey: 'MY', id: 44, target: '下'}),
			_Utils_Tuple2(
			45,
			{answer: '卜月月口', englishKey: 'YBBR', id: 45, target: '過'}),
			_Utils_Tuple2(
			46,
			{answer: '弓木', englishKey: 'ND', id: 46, target: '子'}),
			_Utils_Tuple2(
			47,
			{answer: '卜口金口山', englishKey: 'YRCRU', id: 47, target: '說'}),
			_Utils_Tuple2(
			48,
			{answer: '卜大一竹一', englishKey: 'YKMHM', id: 48, target: '產'}),
			_Utils_Tuple2(
			49,
			{answer: '竹木竹十土', englishKey: 'HDHJG', id: 49, target: '種'}),
			_Utils_Tuple2(
			50,
			{answer: '竹人一一弓', englishKey: 'HOMMN', id: 50, target: '行'}),
			_Utils_Tuple2(
			51,
			{answer: '一月中中', englishKey: 'MBLL', id: 51, target: '而'}),
			_Utils_Tuple2(
			52,
			{answer: '卜竹尸', englishKey: 'YHS', id: 52, target: '方'}),
			_Utils_Tuple2(
			53,
			{answer: '一田尸中', englishKey: 'MWSL', id: 53, target: '面'}),
			_Utils_Tuple2(
			54,
			{answer: '竹人女戈水', englishKey: 'HOVIE', id: 54, target: '後'}),
			_Utils_Tuple2(
			55,
			{answer: '弓戈弓戈', englishKey: 'NINI', id: 55, target: '多'}),
			_Utils_Tuple2(
			56,
			{answer: '十一卜人', englishKey: 'JMYO', id: 56, target: '定'}),
			_Utils_Tuple2(
			57,
			{answer: '竹月弓木', englishKey: 'HBND', id: 57, target: '學'}),
			_Utils_Tuple2(
			58,
			{answer: '水土戈', englishKey: 'EGI', id: 58, target: '法'}),
			_Utils_Tuple2(
			59,
			{answer: '竹尸竹一中', englishKey: 'HSHML', id: 59, target: '所'}),
			_Utils_Tuple2(
			60,
			{answer: '口女心', englishKey: 'RVP', id: 60, target: '民'}),
			_Utils_Tuple2(
			61,
			{answer: '竹人日一戈', englishKey: 'HOAMI', id: 61, target: '得'}),
			_Utils_Tuple2(
			62,
			{answer: '女火一女一', englishKey: 'VFMVM', id: 62, target: '經'}),
			_Utils_Tuple2(
			63,
			{answer: '十', englishKey: 'J', id: 63, target: '十'}),
			_Utils_Tuple2(
			64,
			{answer: '一一一', englishKey: 'MMM', id: 64, target: '三'}),
			_Utils_Tuple2(
			65,
			{answer: '戈弓人', englishKey: 'INO', id: 65, target: '之'}),
			_Utils_Tuple2(
			66,
			{answer: '卜人土', englishKey: 'YOG', id: 66, target: '進'}),
			_Utils_Tuple2(
			67,
			{answer: '竹土木戈', englishKey: 'HGDI', id: 67, target: '等'}),
			_Utils_Tuple2(
			68,
			{answer: '卜口弓中', englishKey: 'YRNL', id: 68, target: '部'}),
			_Utils_Tuple2(
			69,
			{answer: '戈廿水', englishKey: 'ITE', id: 69, target: '度'}),
			_Utils_Tuple2(
			70,
			{answer: '十一尸人', englishKey: 'JMSO', id: 70, target: '家'}),
			_Utils_Tuple2(
			71,
			{answer: '一月田山', englishKey: 'MBWU', id: 71, target: '電'}),
			_Utils_Tuple2(
			72,
			{answer: '大尸', englishKey: 'KS', id: 72, target: '力'}),
			_Utils_Tuple2(
			73,
			{answer: '女口', englishKey: 'VR', id: 73, target: '如'}),
			_Utils_Tuple2(
			74,
			{answer: '水', englishKey: 'E', id: 74, target: '水'}),
			_Utils_Tuple2(
			75,
			{answer: '人心', englishKey: 'OP', id: 75, target: '化'}),
			_Utils_Tuple2(
			76,
			{answer: '卜口月口', englishKey: 'YRBR', id: 76, target: '高'}),
			_Utils_Tuple2(
			77,
			{answer: '十日弓中', englishKey: 'JANL', id: 77, target: '都'}),
			_Utils_Tuple2(
			78,
			{answer: '竹月山', englishKey: 'HBU', id: 78, target: '自'}),
			_Utils_Tuple2(
			79,
			{answer: '一一', englishKey: 'MM', id: 79, target: '二'}),
			_Utils_Tuple2(
			80,
			{answer: '一土田土', englishKey: 'MGWG', id: 80, target: '理'}),
			_Utils_Tuple2(
			81,
			{answer: '土人口山', englishKey: 'GORU', id: 81, target: '起'}),
			_Utils_Tuple2(
			82,
			{answer: '弓金', englishKey: 'NC', id: 82, target: '小'}),
			_Utils_Tuple2(
			83,
			{answer: '尸一女', englishKey: 'SMV', id: 83, target: '長'}),
			_Utils_Tuple2(
			84,
			{answer: '竹手心竹竹', englishKey: 'HQPHH', id: 84, target: '物'}),
			_Utils_Tuple2(
			85,
			{answer: '一土月山山', englishKey: 'MGBUU', id: 85, target: '現'}),
			_Utils_Tuple2(
			86,
			{answer: '十田十金', englishKey: 'JWJC', id: 86, target: '實'}),
			_Utils_Tuple2(
			87,
			{answer: '大尸口', englishKey: 'KSR', id: 87, target: '加'}),
			_Utils_Tuple2(
			88,
			{answer: '日一田土', englishKey: 'AMWG', id: 88, target: '量'}),
			_Utils_Tuple2(
			89,
			{answer: '一中月人', englishKey: 'MLBO', id: 89, target: '兩'}),
			_Utils_Tuple2(
			90,
			{answer: '月月廿田廿', englishKey: 'BBTWT', id: 90, target: '體'}),
			_Utils_Tuple2(
			91,
			{answer: '木女戈戈', englishKey: 'DVII', id: 91, target: '機'}),
			_Utils_Tuple2(
			92,
			{answer: '卜田中女', englishKey: 'YWLV', id: 92, target: '還'}),
			_Utils_Tuple2(
			93,
			{answer: '火月口田', englishKey: 'FBRW', id: 93, target: '當'}),
			_Utils_Tuple2(
			94,
			{answer: '人十中大', englishKey: 'OJLK', id: 94, target: '使'}),
			_Utils_Tuple2(
			95,
			{answer: '田火卜口', englishKey: 'WFYR', id: 95, target: '點'}),
			_Utils_Tuple2(
			96,
			{answer: '竹人人人人', englishKey: 'HOOOO', id: 96, target: '從'}),
			_Utils_Tuple2(
			97,
			{answer: '廿金廿木', englishKey: 'TCTD', id: 97, target: '業'}),
			_Utils_Tuple2(
			98,
			{answer: '木一', englishKey: 'DM', id: 98, target: '本'}),
			_Utils_Tuple2(
			99,
			{answer: '竹十田土', englishKey: 'HJWG', id: 99, target: '重'}),
			_Utils_Tuple2(
			100,
			{answer: '土戈', englishKey: 'GI', id: 100, target: '去'}),
			_Utils_Tuple2(
			101,
			{answer: '手日山', englishKey: 'QAU', id: 101, target: '把'}),
			_Utils_Tuple2(
			102,
			{answer: '心竹手一', englishKey: 'PHQM', id: 102, target: '性'}),
			_Utils_Tuple2(
			103,
			{answer: '女弓木', englishKey: 'VND', id: 103, target: '好'}),
			_Utils_Tuple2(
			104,
			{answer: '戈人土心', englishKey: 'IOGP', id: 104, target: '應'}),
			_Utils_Tuple2(
			105,
			{answer: '日弓一廿', englishKey: 'ANMT', id: 105, target: '開'}),
			_Utils_Tuple2(
			106,
			{answer: '十心', englishKey: 'JP', id: 106, target: '它'}),
			_Utils_Tuple2(
			107,
			{answer: '人一口', englishKey: 'OMR', id: 107, target: '合'}),
			_Utils_Tuple2(
			108,
			{answer: '田大', englishKey: 'WK', id: 108, target: '因'}),
			_Utils_Tuple2(
			109,
			{answer: '竹月中弓', englishKey: 'HBLN', id: 109, target: '制'}),
			_Utils_Tuple2(
			110,
			{answer: '中田', englishKey: 'LW', id: 110, target: '由'}),
			_Utils_Tuple2(
			111,
			{answer: '廿一一金', englishKey: 'TMMC', id: 111, target: '其'}),
			_Utils_Tuple2(
			112,
			{answer: '卜心一一', englishKey: 'YPMM', id: 112, target: '些'}),
			_Utils_Tuple2(
			113,
			{answer: '月大火', englishKey: 'BKF', id: 113, target: '然'}),
			_Utils_Tuple2(
			114,
			{answer: '廿月中弓', englishKey: 'TBLN', id: 114, target: '前'}),
			_Utils_Tuple2(
			115,
			{answer: '弓戈卜', englishKey: 'NIY', id: 115, target: '外'}),
			_Utils_Tuple2(
			116,
			{answer: '一大', englishKey: 'MK', id: 116, target: '天'}),
			_Utils_Tuple2(
			117,
			{answer: '一一人大', englishKey: 'MMOK', id: 117, target: '政'}),
			_Utils_Tuple2(
			118,
			{answer: '田金', englishKey: 'WC', id: 118, target: '四'}),
			_Utils_Tuple2(
			119,
			{answer: '日', englishKey: 'A', id: 119, target: '日'}),
			_Utils_Tuple2(
			120,
			{answer: '尸手弓中', englishKey: 'SQNL', id: 120, target: '那'}),
			_Utils_Tuple2(
			121,
			{answer: '戈火土', englishKey: 'IFG', id: 121, target: '社'}),
			_Utils_Tuple2(
			122,
			{answer: '廿土竹手戈', englishKey: 'TGHQI', id: 122, target: '義'}),
			_Utils_Tuple2(
			123,
			{answer: '十中中弓', englishKey: 'JLLN', id: 123, target: '事'}),
			_Utils_Tuple2(
			124,
			{answer: '一火十', englishKey: 'MFJ', id: 124, target: '平'}),
			_Utils_Tuple2(
			125,
			{answer: '一廿竹竹竹', englishKey: 'MTHHH', id: 125, target: '形'}),
			_Utils_Tuple2(
			126,
			{answer: '木月山', englishKey: 'DBU', id: 126, target: '相'}),
			_Utils_Tuple2(
			127,
			{answer: '人一土', englishKey: 'OMG', id: 127, target: '全'}),
			_Utils_Tuple2(
			128,
			{answer: '卜田土女', englishKey: 'YWGV', id: 128, target: '裏'}),
			_Utils_Tuple2(
			129,
			{answer: '日弓日', englishKey: 'ANA', id: 129, target: '間'}),
			_Utils_Tuple2(
			130,
			{answer: '木廿土水', englishKey: 'DTGE', id: 130, target: '樣'}),
			_Utils_Tuple2(
			131,
			{answer: '手一女', englishKey: 'QMV', id: 131, target: '表'}),
			_Utils_Tuple2(
			132,
			{answer: '竹難卜金', englishKey: 'HXYC', id: 132, target: '與'}),
			_Utils_Tuple2(
			133,
			{answer: '日弓女戈廿', englishKey: 'ANVIT', id: 133, target: '關'}),
			_Utils_Tuple2(
			134,
			{answer: '竹水口', englishKey: 'HER', id: 134, target: '各'}),
			_Utils_Tuple2(
			135,
			{answer: '卜木竹一中', englishKey: 'YDHML', id: 135, target: '新'}),
			_Utils_Tuple2(
			136,
			{answer: '女火竹日水', englishKey: 'VFHAE', id: 136, target: '線'}),
			_Utils_Tuple2(
			137,
			{answer: '人月', englishKey: 'OB', id: 137, target: '內'}),
			_Utils_Tuple2(
			138,
			{answer: '中女人大', englishKey: 'LVOK', id: 138, target: '數'}),
			_Utils_Tuple2(
			139,
			{answer: '一卜中一', englishKey: 'MYLM', id: 139, target: '正'}),
			_Utils_Tuple2(
			140,
			{answer: '心', englishKey: 'P', id: 140, target: '心'}),
			_Utils_Tuple2(
			141,
			{answer: '竹水', englishKey: 'HE', id: 141, target: '反'}),
			_Utils_Tuple2(
			142,
			{answer: '人弓火', englishKey: 'ONF', id: 142, target: '你'}),
			_Utils_Tuple2(
			143,
			{answer: '日月', englishKey: 'AB', id: 143, target: '明'}),
			_Utils_Tuple2(
			144,
			{answer: '竹手月山', englishKey: 'HQBU', id: 144, target: '看'}),
			_Utils_Tuple2(
			145,
			{answer: '一竹日火', englishKey: 'MHAF', id: 145, target: '原'}),
			_Utils_Tuple2(
			146,
			{answer: '弓大', englishKey: 'NK', id: 146, target: '又'}),
			_Utils_Tuple2(
			147,
			{answer: '戈金女戈', englishKey: 'ICVI', id: 147, target: '麼'}),
			_Utils_Tuple2(
			148,
			{answer: '竹木中弓', englishKey: 'HDLN', id: 148, target: '利'}),
			_Utils_Tuple2(
			149,
			{answer: '心心', englishKey: 'PP', id: 149, target: '比'}),
			_Utils_Tuple2(
			150,
			{answer: '戈口一', englishKey: 'IRM', id: 150, target: '或'}),
			_Utils_Tuple2(
			151,
			{answer: '人日一', englishKey: 'OAM', id: 151, target: '但'}),
			_Utils_Tuple2(
			152,
			{answer: '竹中月山金', englishKey: 'HLBUC', id: 152, target: '質'}),
			_Utils_Tuple2(
			153,
			{answer: '人弓火木', englishKey: 'ONFD', id: 153, target: '氣'}),
			_Utils_Tuple2(
			154,
			{answer: '竹弓中竹', englishKey: 'HNLH', id: 154, target: '第'}),
			_Utils_Tuple2(
			155,
			{answer: '竹月口', englishKey: 'HBR', id: 155, target: '向'}),
			_Utils_Tuple2(
			156,
			{answer: '卜廿竹山', englishKey: 'YTHU', id: 156, target: '道'}),
			_Utils_Tuple2(
			157,
			{answer: '人一口中', englishKey: 'OMRL', id: 157, target: '命'}),
			_Utils_Tuple2(
			158,
			{answer: '卜一心', englishKey: 'YMP', id: 158, target: '此'}),
			_Utils_Tuple2(
			159,
			{answer: '水弓水', englishKey: 'ENE', id: 159, target: '沒'}),
			_Utils_Tuple2(
			160,
			{answer: '女火人大', englishKey: 'VFOK', id: 160, target: '變'}),
			_Utils_Tuple2(
			161,
			{answer: '人中竹木', englishKey: 'OLHD', id: 161, target: '條'}),
			_Utils_Tuple2(
			162,
			{answer: '口金', englishKey: 'RC', id: 162, target: '只'}),
			_Utils_Tuple2(
			163,
			{answer: '女火土口', englishKey: 'VFGR', id: 163, target: '結'}),
			_Utils_Tuple2(
			164,
			{answer: '弓月尸竹手', englishKey: 'NBSHQ', id: 164, target: '解'}),
			_Utils_Tuple2(
			165,
			{answer: '日弓口', englishKey: 'ANR', id: 165, target: '問'}),
			_Utils_Tuple2(
			166,
			{answer: '卜廿日心', englishKey: 'YTAP', id: 166, target: '意'}),
			_Utils_Tuple2(
			167,
			{answer: '弓大中手', englishKey: 'NKLQ', id: 167, target: '建'}),
			_Utils_Tuple2(
			168,
			{answer: '月', englishKey: 'B', id: 168, target: '月'}),
			_Utils_Tuple2(
			169,
			{answer: '金戈', englishKey: 'CI', id: 169, target: '公'}),
			_Utils_Tuple2(
			170,
			{answer: '人廿火', englishKey: 'OTF', id: 170, target: '無'}),
			_Utils_Tuple2(
			171,
			{answer: '月十田十', englishKey: 'BJWJ', id: 171, target: '軍'}),
			_Utils_Tuple2(
			172,
			{answer: '竹人日女', englishKey: 'HOAV', id: 172, target: '很'}),
			_Utils_Tuple2(
			173,
			{answer: '心手一月', englishKey: 'PQMB', id: 173, target: '情'}),
			_Utils_Tuple2(
			174,
			{answer: '十大日', englishKey: 'JKA', id: 174, target: '者'}),
			_Utils_Tuple2(
			175,
			{answer: '日尸十水', englishKey: 'ASJE', id: 175, target: '最'}),
			_Utils_Tuple2(
			176,
			{answer: '卜廿', englishKey: 'YT', id: 176, target: '立'}),
			_Utils_Tuple2(
			177,
			{answer: '人戈心', englishKey: 'OIP', id: 177, target: '代'}),
			_Utils_Tuple2(
			178,
			{answer: '木山心', englishKey: 'DUP', id: 178, target: '想'}),
			_Utils_Tuple2(
			179,
			{answer: '尸山', englishKey: 'SU', id: 179, target: '已'}),
			_Utils_Tuple2(
			180,
			{answer: '卜弓戈月', englishKey: 'YNIB', id: 180, target: '通'}),
			_Utils_Tuple2(
			181,
			{answer: '手日一人', englishKey: 'QAMO', id: 181, target: '提'}),
			_Utils_Tuple2(
			182,
			{answer: '十月一一', englishKey: 'JBMM', id: 182, target: '直'}),
			_Utils_Tuple2(
			183,
			{answer: '日人一月金', englishKey: 'AOMBC', id: 183, target: '題'}),
			_Utils_Tuple2(
			184,
			{answer: '火月口田火', englishKey: 'FBRWF', id: 184, target: '黨'}),
			_Utils_Tuple2(
			185,
			{answer: '竹木口竹土', englishKey: 'HDRHG', id: 185, target: '程'}),
			_Utils_Tuple2(
			186,
			{answer: '尸廿女', englishKey: 'STV', id: 186, target: '展'}),
			_Utils_Tuple2(
			187,
			{answer: '一木一', englishKey: 'MDM', id: 187, target: '五'}),
			_Utils_Tuple2(
			188,
			{answer: '田木', englishKey: 'WD', id: 188, target: '果'}),
			_Utils_Tuple2(
			189,
			{answer: '火木卜十', englishKey: 'FDYJ', id: 189, target: '料'}),
			_Utils_Tuple2(
			190,
			{answer: '弓日心人', englishKey: 'NAPO', id: 190, target: '象'}),
			_Utils_Tuple2(
			191,
			{answer: '口月山金', englishKey: 'RBUC', id: 191, target: '員'}),
			_Utils_Tuple2(
			192,
			{answer: '廿中十', englishKey: 'TLJ', id: 192, target: '革'}),
			_Utils_Tuple2(
			193,
			{answer: '人卜廿', englishKey: 'OYT', id: 193, target: '位'}),
			_Utils_Tuple2(
			194,
			{answer: '人竹', englishKey: 'OH', id: 194, target: '入'}),
			_Utils_Tuple2(
			195,
			{answer: '火月口中月', englishKey: 'FBRLB', id: 195, target: '常'}),
			_Utils_Tuple2(
			196,
			{answer: '卜大', englishKey: 'YK', id: 196, target: '文'}),
			_Utils_Tuple2(
			197,
			{answer: '女火竹田心', englishKey: 'VFHWP', id: 197, target: '總'}),
			_Utils_Tuple2(
			198,
			{answer: '戈一弓人', englishKey: 'IMNO', id: 198, target: '次'}),
			_Utils_Tuple2(
			199,
			{answer: '口口口', englishKey: 'RRR', id: 199, target: '品'}),
			_Utils_Tuple2(
			200,
			{answer: '戈心一', englishKey: 'IPM', id: 200, target: '式'}),
			_Utils_Tuple2(
			201,
			{answer: '水竹十口', englishKey: 'EHJR', id: 201, target: '活'}),
			_Utils_Tuple2(
			202,
			{answer: '卜口竹弓水', englishKey: 'YRHNE', id: 202, target: '設'}),
			_Utils_Tuple2(
			203,
			{answer: '弓竹水', englishKey: 'NHE', id: 203, target: '及'}),
			_Utils_Tuple2(
			204,
			{answer: '竹十口口', englishKey: 'HJRR', id: 204, target: '管'}),
			_Utils_Tuple2(
			205,
			{answer: '竹手土木戈', englishKey: 'HQGDI', id: 205, target: '特'}),
			_Utils_Tuple2(
			206,
			{answer: '人竹手', englishKey: 'OHQ', id: 206, target: '件'}),
			_Utils_Tuple2(
			207,
			{answer: '戈十水', englishKey: 'IJE', id: 207, target: '求'}),
			_Utils_Tuple2(
			208,
			{answer: '十大心', englishKey: 'JKP', id: 208, target: '老'}),
			_Utils_Tuple2(
			209,
			{answer: '一廿一月金', englishKey: 'MTMBC', id: 209, target: '頭'}),
			_Utils_Tuple2(
			210,
			{answer: '廿金土', englishKey: 'TCG', id: 210, target: '基'}),
			_Utils_Tuple2(
			211,
			{answer: '戈人月山金', englishKey: 'IOBUC', id: 211, target: '資'}),
			_Utils_Tuple2(
			212,
			{answer: '卜竹山尸', englishKey: 'YHUS', id: 212, target: '邊'}),
			_Utils_Tuple2(
			213,
			{answer: '水卜戈山', englishKey: 'EYIU', id: 213, target: '流'}),
			_Utils_Tuple2(
			214,
			{answer: '口一竹水口', englishKey: 'RMHER', id: 214, target: '路'}),
			_Utils_Tuple2(
			215,
			{answer: '女火弓竹水', englishKey: 'VFNHE', id: 215, target: '級'}),
			_Utils_Tuple2(
			216,
			{answer: '火竹', englishKey: 'FH', id: 216, target: '少'}),
			_Utils_Tuple2(
			217,
			{answer: '田口十田', englishKey: 'WRJW', id: 217, target: '圖'}),
			_Utils_Tuple2(
			218,
			{answer: '山', englishKey: 'U', id: 218, target: '山'}),
			_Utils_Tuple2(
			219,
			{answer: '女火卜戈山', englishKey: 'VFYIU', id: 219, target: '統'}),
			_Utils_Tuple2(
			220,
			{answer: '手卜廿女', englishKey: 'QYTV', id: 220, target: '接'}),
			_Utils_Tuple2(
			221,
			{answer: '人大口', englishKey: 'OKR', id: 221, target: '知'}),
			_Utils_Tuple2(
			222,
			{answer: '十十卜金大', englishKey: 'JJYCK', id: 222, target: '較'}),
			_Utils_Tuple2(
			223,
			{answer: '女一月木戈', englishKey: 'VMBDI', id: 223, target: '將'}),
			_Utils_Tuple2(
			224,
			{answer: '女火月一', englishKey: 'VFBM', id: 224, target: '組'}),
			_Utils_Tuple2(
			225,
			{answer: '月山竹山', englishKey: 'BUHU', id: 225, target: '見'}),
			_Utils_Tuple2(
			226,
			{answer: '卜口十', englishKey: 'YRJ', id: 226, target: '計'}),
			_Utils_Tuple2(
			227,
			{answer: '口尸中弓', englishKey: 'RSLN', id: 227, target: '別'}),
			_Utils_Tuple2(
			228,
			{answer: '女心木', englishKey: 'VPD', id: 228, target: '她'}),
			_Utils_Tuple2(
			229,
			{answer: '手', englishKey: 'Q', id: 229, target: '手'}),
			_Utils_Tuple2(
			230,
			{answer: '弓月土', englishKey: 'NBG', id: 230, target: '角'}),
			_Utils_Tuple2(
			231,
			{answer: '廿金月', englishKey: 'TCB', id: 231, target: '期'}),
			_Utils_Tuple2(
			232,
			{answer: '木日女', englishKey: 'DAV', id: 232, target: '根'}),
			_Utils_Tuple2(
			233,
			{answer: '卜口人一月', englishKey: 'YROMB', id: 233, target: '論'}),
			_Utils_Tuple2(
			234,
			{answer: '卜月十十', englishKey: 'YBJJ', id: 234, target: '運'}),
			_Utils_Tuple2(
			235,
			{answer: '廿田一一女', englishKey: 'TWMMV', id: 235, target: '農'}),
			_Utils_Tuple2(
			236,
			{answer: '手心日', englishKey: 'QPA', id: 236, target: '指'}),
			_Utils_Tuple2(
			237,
			{answer: '女戈竹戈', englishKey: 'VIHI', id: 237, target: '幾'}),
			_Utils_Tuple2(
			238,
			{answer: '大弓', englishKey: 'KN', id: 238, target: '九'}),
			_Utils_Tuple2(
			239,
			{answer: '尸口口口', englishKey: 'SRRR', id: 239, target: '區'}),
			_Utils_Tuple2(
			240,
			{answer: '弓戈中戈', englishKey: 'NILI', id: 240, target: '強'}),
			_Utils_Tuple2(
			241,
			{answer: '卜尸人大', englishKey: 'YSOK', id: 241, target: '放'}),
			_Utils_Tuple2(
			242,
			{answer: '水木大', englishKey: 'EDK', id: 242, target: '決'}),
			_Utils_Tuple2(
			243,
			{answer: '一金田', englishKey: 'MCW', id: 243, target: '西'}),
			_Utils_Tuple2(
			244,
			{answer: '中木竹水', englishKey: 'LDHE', id: 244, target: '被'}),
			_Utils_Tuple2(
			245,
			{answer: '人十口大', englishKey: 'OJRK', id: 245, target: '做'}),
			_Utils_Tuple2(
			246,
			{answer: '心竹', englishKey: 'PH', id: 246, target: '必'}),
			_Utils_Tuple2(
			247,
			{answer: '口十戈', englishKey: 'RJI', id: 247, target: '戰'}),
			_Utils_Tuple2(
			248,
			{answer: '竹土竹山', englishKey: 'HGHU', id: 248, target: '先'}),
			_Utils_Tuple2(
			249,
			{answer: '月金中弓', englishKey: 'BCLN', id: 249, target: '則'}),
			_Utils_Tuple2(
			250,
			{answer: '人竹土', englishKey: 'OHG', id: 250, target: '任'}),
			_Utils_Tuple2(
			251,
			{answer: '尸十水', englishKey: 'SJE', id: 251, target: '取'}),
			_Utils_Tuple2(
			252,
			{answer: '手卜心人', englishKey: 'QYPO', id: 252, target: '據'}),
			_Utils_Tuple2(
			253,
			{answer: '田口', englishKey: 'WR', id: 253, target: '回'}),
			_Utils_Tuple2(
			254,
			{answer: '女火人一口', englishKey: 'VFOMR', id: 254, target: '給'}),
			_Utils_Tuple2(
			255,
			{answer: '卜口月土口', englishKey: 'YRBGR', id: 255, target: '調'}),
			_Utils_Tuple2(
			256,
			{answer: '卜心竹水弓', englishKey: 'YPHEN', id: 256, target: '處'}),
			_Utils_Tuple2(
			257,
			{answer: '弓中廿心人', englishKey: 'NLTPO', id: 257, target: '隊'}),
			_Utils_Tuple2(
			258,
			{answer: '十月廿十', englishKey: 'JBTJ', id: 258, target: '南'}),
			_Utils_Tuple2(
			259,
			{answer: '弓日山', englishKey: 'NAU', id: 259, target: '色'}),
			_Utils_Tuple2(
			260,
			{answer: '火一山', englishKey: 'FMU', id: 260, target: '光'}),
			_Utils_Tuple2(
			261,
			{answer: '日弓', englishKey: 'AN', id: 261, target: '門'}),
			_Utils_Tuple2(
			262,
			{answer: '日戈尸中', englishKey: 'AISL', id: 262, target: '即'}),
			_Utils_Tuple2(
			263,
			{answer: '人口木', englishKey: 'ORD', id: 263, target: '保'}),
			_Utils_Tuple2(
			264,
			{answer: '水戈口', englishKey: 'EIR', id: 264, target: '治'}),
			_Utils_Tuple2(
			265,
			{answer: '中一心', englishKey: 'LMP', id: 265, target: '北'}),
			_Utils_Tuple2(
			266,
			{answer: '卜竹土口', englishKey: 'YHGR', id: 266, target: '造'}),
			_Utils_Tuple2(
			267,
			{answer: '一日', englishKey: 'MA', id: 267, target: '百'}),
			_Utils_Tuple2(
			268,
			{answer: '手人月山山', englishKey: 'QOBUU', id: 268, target: '規'}),
			_Utils_Tuple2(
			269,
			{answer: '土戈火', englishKey: 'GIF', id: 269, target: '熱'}),
			_Utils_Tuple2(
			270,
			{answer: '人戈一月金', englishKey: 'OIMBC', id: 270, target: '領'}),
			_Utils_Tuple2(
			271,
			{answer: '十山', englishKey: 'JU', id: 271, target: '七'}),
			_Utils_Tuple2(
			272,
			{answer: '水人田卜', englishKey: 'EOWY', id: 272, target: '海'}),
			_Utils_Tuple2(
			273,
			{answer: '口', englishKey: 'R', id: 273, target: '口'}),
			_Utils_Tuple2(
			274,
			{answer: '木田', englishKey: 'DW', id: 274, target: '東'}),
			_Utils_Tuple2(
			275,
			{answer: '卜山木戈', englishKey: 'YUDI', id: 275, target: '導'}),
			_Utils_Tuple2(
			276,
			{answer: '口口戈大口', englishKey: 'RRIKR', id: 276, target: '器'}),
			_Utils_Tuple2(
			277,
			{answer: '一大土', englishKey: 'MKG', id: 277, target: '壓'}),
			_Utils_Tuple2(
			278,
			{answer: '心廿', englishKey: 'PT', id: 278, target: '世'}),
			_Utils_Tuple2(
			279,
			{answer: '金', englishKey: 'C', id: 279, target: '金'}),
			_Utils_Tuple2(
			280,
			{answer: '土金田日', englishKey: 'GCWA', id: 280, target: '增'}),
			_Utils_Tuple2(
			281,
			{answer: '月尸木', englishKey: 'BSD', id: 281, target: '爭'}),
			_Utils_Tuple2(
			282,
			{answer: '水卜難', englishKey: 'EYX', id: 282, target: '濟'}),
			_Utils_Tuple2(
			283,
			{answer: '弓中心心日', englishKey: 'NLPPA', id: 283, target: '階'}),
			_Utils_Tuple2(
			284,
			{answer: '水中田', englishKey: 'ELW', id: 284, target: '油'}),
			_Utils_Tuple2(
			285,
			{answer: '田心', englishKey: 'WP', id: 285, target: '思'}),
			_Utils_Tuple2(
			286,
			{answer: '竹人戈金弓', englishKey: 'HOICN', id: 286, target: '術'}),
			_Utils_Tuple2(
			287,
			{answer: '木一水一', englishKey: 'DMEM', id: 287, target: '極'}),
			_Utils_Tuple2(
			288,
			{answer: '卜金大', englishKey: 'YCK', id: 288, target: '交'}),
			_Utils_Tuple2(
			289,
			{answer: '月月水', englishKey: 'BBE', id: 289, target: '受'}),
			_Utils_Tuple2(
			290,
			{answer: '十十人一十', englishKey: 'JJOMJ', id: 290, target: '幹'}),
			_Utils_Tuple2(
			291,
			{answer: '尸十女戈廿', englishKey: 'SJVIT', id: 291, target: '聯'}),
			_Utils_Tuple2(
			292,
			{answer: '卜口尸戈心', englishKey: 'YRSIP', id: 292, target: '認'}),
			_Utils_Tuple2(
			293,
			{answer: '卜金', englishKey: 'YC', id: 293, target: '六'}),
			_Utils_Tuple2(
			294,
			{answer: '廿金', englishKey: 'TC', id: 294, target: '共'}),
			_Utils_Tuple2(
			295,
			{answer: '木廿口土', englishKey: 'DTRG', id: 295, target: '權'}),
			_Utils_Tuple2(
			296,
			{answer: '女中人大', englishKey: 'VLOK', id: 296, target: '收'}),
			_Utils_Tuple2(
			297,
			{answer: '卜口弓人廿', englishKey: 'YRNOT', id: 297, target: '證'}),
			_Utils_Tuple2(
			298,
			{answer: '尸山人大', englishKey: 'SUOK', id: 298, target: '改'}),
			_Utils_Tuple2(
			299,
			{answer: '水手一月', englishKey: 'EQMB', id: 299, target: '清'}),
			_Utils_Tuple2(
			300,
			{answer: '土心', englishKey: 'GP', id: 300, target: '志'}),
			_Utils_Tuple2(
			301,
			{answer: '尸山', englishKey: 'SU', id: 301, target: '己'}),
			_Utils_Tuple2(
			302,
			{answer: '廿土大', englishKey: 'TGK', id: 302, target: '美'}),
			_Utils_Tuple2(
			303,
			{answer: '一土月', englishKey: 'MGB', id: 303, target: '再'}),
			_Utils_Tuple2(
			304,
			{answer: '十十十戈戈', englishKey: 'JJJII', id: 304, target: '轉'}),
			_Utils_Tuple2(
			305,
			{answer: '一中田大', englishKey: 'MLWK', id: 305, target: '更'}),
			_Utils_Tuple2(
			306,
			{answer: '口口田十', englishKey: 'RRWJ', id: 306, target: '單'}),
			_Utils_Tuple2(
			307,
			{answer: '竹弓竹中戈', englishKey: 'HNHLI', id: 307, target: '風'}),
			_Utils_Tuple2(
			308,
			{answer: '心尸竹', englishKey: 'PSH', id: 308, target: '切'}),
			_Utils_Tuple2(
			309,
			{answer: '手一弓', englishKey: 'QMN', id: 309, target: '打'}),
			_Utils_Tuple2(
			310,
			{answer: '竹日', englishKey: 'HA', id: 310, target: '白'}),
			_Utils_Tuple2(
			311,
			{answer: '十木人大', englishKey: 'JDOK', id: 311, target: '教'}),
			_Utils_Tuple2(
			312,
			{answer: '卜木中', englishKey: 'YDL', id: 312, target: '速'}),
			_Utils_Tuple2(
			313,
			{answer: '廿人心', englishKey: 'TOP', id: 313, target: '花'}),
			_Utils_Tuple2(
			314,
			{answer: '大心月中月', englishKey: 'KPBLB', id: 314, target: '帶'}),
			_Utils_Tuple2(
			315,
			{answer: '十女', englishKey: 'JV', id: 315, target: '安'}),
			_Utils_Tuple2(
			316,
			{answer: '土日一竹', englishKey: 'GAMH', id: 316, target: '場'}),
			_Utils_Tuple2(
			317,
			{answer: '竹難竹', englishKey: 'HXH', id: 317, target: '身'}),
			_Utils_Tuple2(
			318,
			{answer: '十田十', englishKey: 'JWJ', id: 318, target: '車'}),
			_Utils_Tuple2(
			319,
			{answer: '人一弓弓', englishKey: 'OMNN', id: 319, target: '例'}),
			_Utils_Tuple2(
			320,
			{answer: '十月一金', englishKey: 'JBMC', id: 320, target: '真'}),
			_Utils_Tuple2(
			321,
			{answer: '弓竹竹水尸', englishKey: 'NHHES', id: 321, target: '務'}),
			_Utils_Tuple2(
			322,
			{answer: '月一一金', englishKey: 'BMMC', id: 322, target: '具'}),
			_Utils_Tuple2(
			323,
			{answer: '廿田中月', englishKey: 'TWLB', id: 323, target: '萬'}),
			_Utils_Tuple2(
			324,
			{answer: '人田卜戈', englishKey: 'OWYI', id: 324, target: '每'}),
			_Utils_Tuple2(
			325,
			{answer: '月山', englishKey: 'BU', id: 325, target: '目'}),
			_Utils_Tuple2(
			326,
			{answer: '一戈土', englishKey: 'MIG', id: 326, target: '至'}),
			_Utils_Tuple2(
			327,
			{answer: '卜土廿手', englishKey: 'YGTQ', id: 327, target: '達'}),
			_Utils_Tuple2(
			328,
			{answer: '土卜人', englishKey: 'GYO', id: 328, target: '走'}),
			_Utils_Tuple2(
			329,
			{answer: '竹木手一金', englishKey: 'HDQMC', id: 329, target: '積'}),
			_Utils_Tuple2(
			330,
			{answer: '一一火', englishKey: 'MMF', id: 330, target: '示'}),
			_Utils_Tuple2(
			331,
			{answer: '卜口廿土戈', englishKey: 'YRTGI', id: 331, target: '議'}),
			_Utils_Tuple2(
			332,
			{answer: '土水尸十', englishKey: 'GESJ', id: 332, target: '聲'}),
			_Utils_Tuple2(
			333,
			{answer: '土十尸中水', englishKey: 'GJSLE', id: 333, target: '報'}),
			_Utils_Tuple2(
			334,
			{answer: '中弓', englishKey: 'LN', id: 334, target: '鬥'}),
			_Utils_Tuple2(
			335,
			{answer: '十一一山', englishKey: 'JMMU', id: 335, target: '完'}),
			_Utils_Tuple2(
			336,
			{answer: '火大一月金', englishKey: 'FKMBC', id: 336, target: '類'}),
			_Utils_Tuple2(
			337,
			{answer: '竹人', englishKey: 'HO', id: 337, target: '八'}),
			_Utils_Tuple2(
			338,
			{answer: '卜月人土', englishKey: 'YBOG', id: 338, target: '離'}),
			_Utils_Tuple2(
			339,
			{answer: '廿一廿十', englishKey: 'TMTJ', id: 339, target: '華'}),
			_Utils_Tuple2(
			340,
			{answer: '弓戈口', englishKey: 'NIR', id: 340, target: '名'}),
			_Utils_Tuple2(
			341,
			{answer: '一口人月土', englishKey: 'MROBG', id: 341, target: '確'}),
			_Utils_Tuple2(
			342,
			{answer: '竹木卜十', englishKey: 'HDYJ', id: 342, target: '科'}),
			_Utils_Tuple2(
			343,
			{answer: '人十戈戈', englishKey: 'OJII', id: 343, target: '傳'}),
			_Utils_Tuple2(
			344,
			{answer: '弓尸一女', englishKey: 'NSMV', id: 344, target: '張'}),
			_Utils_Tuple2(
			345,
			{answer: '木竹', englishKey: 'DH', id: 345, target: '才'}),
			_Utils_Tuple2(
			346,
			{answer: '人卜一口', englishKey: 'OYMR', id: 346, target: '信'}),
			_Utils_Tuple2(
			347,
			{answer: '尸手尸火', englishKey: 'SQSF', id: 347, target: '馬'}),
			_Utils_Tuple2(
			348,
			{answer: '竹日戈中', englishKey: 'HAIL', id: 348, target: '節'}),
			_Utils_Tuple2(
			349,
			{answer: '卜口竹十口', englishKey: 'YRHJR', id: 349, target: '話'}),
			_Utils_Tuple2(
			350,
			{answer: '火木', englishKey: 'FD', id: 350, target: '米'}),
			_Utils_Tuple2(
			351,
			{answer: '手月木', englishKey: 'QBD', id: 351, target: '採'}),
			_Utils_Tuple2(
			352,
			{answer: '木大一卜一', englishKey: 'DKMYM', id: 352, target: '整'}),
			_Utils_Tuple2(
			353,
			{answer: '十金一', englishKey: 'JCM', id: 353, target: '空'}),
			_Utils_Tuple2(
			354,
			{answer: '一一山', englishKey: 'MMU', id: 354, target: '元'}),
			_Utils_Tuple2(
			355,
			{answer: '水口竹山', englishKey: 'ERHU', id: 355, target: '況'}),
			_Utils_Tuple2(
			356,
			{answer: '人戈弓', englishKey: 'OIN', id: 356, target: '今'}),
			_Utils_Tuple2(
			357,
			{answer: '人土木', englishKey: 'OGD', id: 357, target: '集'}),
			_Utils_Tuple2(
			358,
			{answer: '水田人廿', englishKey: 'EWOT', id: 358, target: '溫'}),
			_Utils_Tuple2(
			359,
			{answer: '土', englishKey: 'G', id: 359, target: '土'}),
			_Utils_Tuple2(
			360,
			{answer: '卜口人十', englishKey: 'YROJ', id: 360, target: '許'}),
			_Utils_Tuple2(
			361,
			{answer: '卜中一竹', englishKey: 'YLMH', id: 361, target: '步'}),
			_Utils_Tuple2(
			362,
			{answer: '尸口廿手', englishKey: 'SRTQ', id: 362, target: '群'}),
			_Utils_Tuple2(
			363,
			{answer: '一口', englishKey: 'MR', id: 363, target: '石'}),
			_Utils_Tuple2(
			364,
			{answer: '戈廿中金', englishKey: 'ITLC', id: 364, target: '廣'}),
			_Utils_Tuple2(
			365,
			{answer: '月一', englishKey: 'BM', id: 365, target: '且'}),
			_Utils_Tuple2(
			366,
			{answer: '卜口尸山', englishKey: 'YRSU', id: 366, target: '記'}),
			_Utils_Tuple2(
			367,
			{answer: '一月一月中', englishKey: 'MBMBL', id: 367, target: '需'}),
			_Utils_Tuple2(
			368,
			{answer: '竹十竹弓水', englishKey: 'HJHNE', id: 368, target: '段'}),
			_Utils_Tuple2(
			369,
			{answer: '一口一廿', englishKey: 'MRMT', id: 369, target: '研'}),
			_Utils_Tuple2(
			370,
			{answer: '田人中中', englishKey: 'WOLL', id: 370, target: '界'}),
			_Utils_Tuple2(
			371,
			{answer: '手卜廿', englishKey: 'QYT', id: 371, target: '拉'}),
			_Utils_Tuple2(
			372,
			{answer: '木木', englishKey: 'DD', id: 372, target: '林'}),
			_Utils_Tuple2(
			373,
			{answer: '竹人中手', englishKey: 'HOLQ', id: 373, target: '律'}),
			_Utils_Tuple2(
			374,
			{answer: '口女中', englishKey: 'RVL', id: 374, target: '叫'}),
			_Utils_Tuple2(
			375,
			{answer: '十金大弓', englishKey: 'JCKN', id: 375, target: '究'}),
			_Utils_Tuple2(
			376,
			{answer: '廿土月山山', englishKey: 'TGBUU', id: 376, target: '觀'}),
			_Utils_Tuple2(
			377,
			{answer: '土人戈女', englishKey: 'GOIV', id: 377, target: '越'}),
			_Utils_Tuple2(
			378,
			{answer: '女火卜戈日', englishKey: 'VFYIA', id: 378, target: '織'}),
			_Utils_Tuple2(
			379,
			{answer: '女土卜竹女', englishKey: 'VGYHV', id: 379, target: '裝'}),
			_Utils_Tuple2(
			380,
			{answer: '日火竹竹竹', englishKey: 'AFHHH', id: 380, target: '影'}),
			_Utils_Tuple2(
			381,
			{answer: '竹月山廿', englishKey: 'HBUT', id: 381, target: '算'}),
			_Utils_Tuple2(
			382,
			{answer: '人竹心一', englishKey: 'OHPM', id: 382, target: '低'}),
			_Utils_Tuple2(
			383,
			{answer: '手土木戈', englishKey: 'QGDI', id: 383, target: '持'}),
			_Utils_Tuple2(
			384,
			{answer: '卜廿日', englishKey: 'YTA', id: 384, target: '音'}),
			_Utils_Tuple2(
			385,
			{answer: '田中人人人', englishKey: 'WLOOO', id: 385, target: '眾'}),
			_Utils_Tuple2(
			386,
			{answer: '竹女戈火', englishKey: 'HVIF', id: 386, target: '系'}),
			_Utils_Tuple2(
			387,
			{answer: '中土日', englishKey: 'LGA', id: 387, target: '書'}),
			_Utils_Tuple2(
			388,
			{answer: '十金人口', englishKey: 'JCOR', id: 388, target: '容'}),
			_Utils_Tuple2(
			389,
			{answer: '竹難竹山', englishKey: 'HXHU', id: 389, target: '兒'}),
			_Utils_Tuple2(
			390,
			{answer: '弓中月人火', englishKey: 'NLBOF', id: 390, target: '際'}),
			_Utils_Tuple2(
			391,
			{answer: '卜金月口', englishKey: 'YCBR', id: 391, target: '商'}),
			_Utils_Tuple2(
			392,
			{answer: '中一尸卜', englishKey: 'LMSY', id: 392, target: '非'}),
			_Utils_Tuple2(
			393,
			{answer: '尸火人一人', englishKey: 'SFOMO', id: 393, target: '驗'}),
			_Utils_Tuple2(
			394,
			{answer: '卜十田十', englishKey: 'YJWJ', id: 394, target: '連'}),
			_Utils_Tuple2(
			395,
			{answer: '女戈竹一中', englishKey: 'VIHML', id: 395, target: '斷'}),
			_Utils_Tuple2(
			396,
			{answer: '卜戈人十', englishKey: 'YIOJ', id: 396, target: '率'}),
			_Utils_Tuple2(
			397,
			{answer: '水月金木', englishKey: 'EBCD', id: 397, target: '深'}),
			_Utils_Tuple2(
			398,
			{answer: '廿人人土', englishKey: 'TOOG', id: 398, target: '難'}),
			_Utils_Tuple2(
			399,
			{answer: '卜竹一中', englishKey: 'YHML', id: 399, target: '近'}),
			_Utils_Tuple2(
			400,
			{answer: '竹竹一月金', englishKey: 'HHMBC', id: 400, target: '須'}),
			_Utils_Tuple2(
			401,
			{answer: '一口戈廿金', englishKey: 'MRITC', id: 401, target: '礦'}),
			_Utils_Tuple2(
			402,
			{answer: '竹十', englishKey: 'HJ', id: 402, target: '千'}),
			_Utils_Tuple2(
			403,
			{answer: '火竹月山', englishKey: 'FHBU', id: 403, target: '省'}),
			_Utils_Tuple2(
			404,
			{answer: '竹木女', englishKey: 'HDV', id: 404, target: '委'}),
			_Utils_Tuple2(
			405,
			{answer: '手一女戈火', englishKey: 'QMVIF', id: 405, target: '素'}),
			_Utils_Tuple2(
			406,
			{answer: '手十水', englishKey: 'QJE', id: 406, target: '技'}),
			_Utils_Tuple2(
			407,
			{answer: '人廿竹月', englishKey: 'OTHB', id: 407, target: '備'}),
			_Utils_Tuple2(
			408,
			{answer: '火手', englishKey: 'FQ', id: 408, target: '半'}),
			_Utils_Tuple2(
			409,
			{answer: '卜十大尸十', englishKey: 'YJKSJ', id: 409, target: '辦'}),
			_Utils_Tuple2(
			410,
			{answer: '手一月', englishKey: 'QMB', id: 410, target: '青'}),
			_Utils_Tuple2(
			411,
			{answer: '一弓中弓', englishKey: 'MNLN', id: 411, target: '列'}),
			_Utils_Tuple2(
			412,
			{answer: '尸一竹日', englishKey: 'SMHA', id: 412, target: '習'}),
			_Utils_Tuple2(
			413,
			{answer: '人一中大', englishKey: 'OMLK', id: 413, target: '便'}),
			_Utils_Tuple2(
			414,
			{answer: '女中卜廿日', englishKey: 'VLYTA', id: 414, target: '響'}),
			_Utils_Tuple2(
			415,
			{answer: '女火心戈', englishKey: 'VFPI', id: 415, target: '約'}),
			_Utils_Tuple2(
			416,
			{answer: '十水', englishKey: 'JE', id: 416, target: '支'}),
			_Utils_Tuple2(
			417,
			{answer: '竹卜竹弓水', englishKey: 'HYHNE', id: 417, target: '般'}),
			_Utils_Tuple2(
			418,
			{answer: '中大', englishKey: 'LK', id: 418, target: '史'}),
			_Utils_Tuple2(
			419,
			{answer: '戈口心', englishKey: 'IRP', id: 419, target: '感'}),
			_Utils_Tuple2(
			420,
			{answer: '火火月大尸', englishKey: 'FFBKS', id: 420, target: '勞'}),
			_Utils_Tuple2(
			421,
			{answer: '田十戈戈', englishKey: 'WJII', id: 421, target: '團'}),
			_Utils_Tuple2(
			422,
			{answer: '竹人卜土', englishKey: 'HOYG', id: 422, target: '往'}),
			_Utils_Tuple2(
			423,
			{answer: '一田戈金水', englishKey: 'MWICE', id: 423, target: '酸'}),
			_Utils_Tuple2(
			424,
			{answer: '竹木月土月', englishKey: 'HDBGB', id: 424, target: '稱'}),
			_Utils_Tuple2(
			425,
			{answer: '卜中月', englishKey: 'YLB', id: 425, target: '市'}),
			_Utils_Tuple2(
			426,
			{answer: '十口竹山', englishKey: 'JRHU', id: 426, target: '克'}),
			_Utils_Tuple2(
			427,
			{answer: '人一弓口', englishKey: 'OMNR', id: 427, target: '何'}),
			_Utils_Tuple2(
			428,
			{answer: '弓中人一木', englishKey: 'NLOMD', id: 428, target: '除'}),
			_Utils_Tuple2(
			429,
			{answer: '水火月', englishKey: 'EFB', id: 429, target: '消'}),
			_Utils_Tuple2(
			430,
			{answer: '木廿廿月', englishKey: 'DTTB', id: 430, target: '構'}),
			_Utils_Tuple2(
			431,
			{answer: '戈人木戈', englishKey: 'IODI', id: 431, target: '府'}),
			_Utils_Tuple2(
			432,
			{answer: '廿一一女', englishKey: 'TMMV', id: 432, target: '甚'}),
			_Utils_Tuple2(
			433,
			{answer: '大戈', englishKey: 'KI', id: 433, target: '太'}),
			_Utils_Tuple2(
			434,
			{answer: '火木手一月', englishKey: 'FDQMB', id: 434, target: '精'}),
			_Utils_Tuple2(
			435,
			{answer: '一竹木一', englishKey: 'MHDM', id: 435, target: '歷'}),
			_Utils_Tuple2(
			436,
			{answer: '人十月一', englishKey: 'OJBM', id: 436, target: '值'}),
			_Utils_Tuple2(
			437,
			{answer: '人竹女火', englishKey: 'OHVF', id: 437, target: '係'}),
			_Utils_Tuple2(
			438,
			{answer: '月土口', englishKey: 'BGR', id: 438, target: '周'}),
			_Utils_Tuple2(
			439,
			{answer: '人十', englishKey: 'OJ', id: 439, target: '什'}),
			_Utils_Tuple2(
			440,
			{answer: '口尸卜心弓', englishKey: 'RSYPN', id: 440, target: '號'}),
			_Utils_Tuple2(
			441,
			{answer: '卜尸人人大', englishKey: 'YSOOK', id: 441, target: '族'}),
			_Utils_Tuple2(
			442,
			{answer: '女火人土', englishKey: 'VFOG', id: 442, target: '維'}),
			_Utils_Tuple2(
			443,
			{answer: '中一中弓', englishKey: 'LMLN', id: 443, target: '劃'}),
			_Utils_Tuple2(
			444,
			{answer: '卜口山金', englishKey: 'YRUC', id: 444, target: '選'}),
			_Utils_Tuple2(
			445,
			{answer: '木一田火', englishKey: 'DMWF', id: 445, target: '標'}),
			_Utils_Tuple2(
			446,
			{answer: '十竹難火', englishKey: 'JHXF', id: 446, target: '寫'}),
			_Utils_Tuple2(
			447,
			{answer: '大中弓木', englishKey: 'KLND', id: 447, target: '存'}),
			_Utils_Tuple2(
			448,
			{answer: '人中弓大', englishKey: 'OLNK', id: 448, target: '候'}),
			_Utils_Tuple2(
			449,
			{answer: '卜木月山山', englishKey: 'YDBUU', id: 449, target: '親'}),
			_Utils_Tuple2(
			450,
			{answer: '竹手山', englishKey: 'HQU', id: 450, target: '毛'}),
			_Utils_Tuple2(
			451,
			{answer: '心木大', englishKey: 'PDK', id: 451, target: '快'}),
			_Utils_Tuple2(
			452,
			{answer: '木日一', englishKey: 'DAM', id: 452, target: '查'}),
			_Utils_Tuple2(
			453,
			{answer: '卜大人大', englishKey: 'YKOK', id: 453, target: '效'}),
			_Utils_Tuple2(
			454,
			{answer: '廿金竹一中', englishKey: 'TCHML', id: 454, target: '斯'}),
			_Utils_Tuple2(
			455,
			{answer: '弓中十一山', englishKey: 'NLJMU', id: 455, target: '院'}),
			_Utils_Tuple2(
			456,
			{answer: '水一', englishKey: 'EM', id: 456, target: '江'}),
			_Utils_Tuple2(
			457,
			{answer: '一弓土', englishKey: 'MNG', id: 457, target: '型'}),
			_Utils_Tuple2(
			458,
			{answer: '月山日女', englishKey: 'BUAV', id: 458, target: '眼'}),
			_Utils_Tuple2(
			459,
			{answer: '一土', englishKey: 'MG', id: 459, target: '王'}),
			_Utils_Tuple2(
			460,
			{answer: '手十女', englishKey: 'QJV', id: 460, target: '按'}),
			_Utils_Tuple2(
			461,
			{answer: '木竹水口', englishKey: 'DHER', id: 461, target: '格'}),
			_Utils_Tuple2(
			462,
			{answer: '廿人戈日女', englishKey: 'TOIAV', id: 462, target: '養'}),
			_Utils_Tuple2(
			463,
			{answer: '日心竹竹', englishKey: 'APHH', id: 463, target: '易'}),
			_Utils_Tuple2(
			464,
			{answer: '田中十月一', englishKey: 'WLJBM', id: 464, target: '置'}),
			_Utils_Tuple2(
			465,
			{answer: '水竹竹女', englishKey: 'EHHV', id: 465, target: '派'}),
			_Utils_Tuple2(
			466,
			{answer: '尸金田日', englishKey: 'SCWA', id: 466, target: '層'}),
			_Utils_Tuple2(
			467,
			{answer: '中中一中', englishKey: 'LLML', id: 467, target: '片'}),
			_Utils_Tuple2(
			468,
			{answer: '女戈口', englishKey: 'VIR', id: 468, target: '始'}),
			_Utils_Tuple2(
			469,
			{answer: '金口尸中', englishKey: 'CRSL', id: 469, target: '卻'}),
			_Utils_Tuple2(
			470,
			{answer: '十戈木戈', englishKey: 'JIDI', id: 470, target: '專'}),
			_Utils_Tuple2(
			471,
			{answer: '女一戈大', englishKey: 'VMIK', id: 471, target: '狀'}),
			_Utils_Tuple2(
			472,
			{answer: '卜戈月', englishKey: 'YIB', id: 472, target: '育'}),
			_Utils_Tuple2(
			473,
			{answer: '戈火月大', englishKey: 'IFBK', id: 473, target: '廠'}),
			_Utils_Tuple2(
			474,
			{answer: '卜口火', englishKey: 'YRF', id: 474, target: '京'}),
			_Utils_Tuple2(
			475,
			{answer: '卜口卜戈日', englishKey: 'YRYIA', id: 475, target: '識'}),
			_Utils_Tuple2(
			476,
			{answer: '卜卜金月', englishKey: 'YYCB', id: 476, target: '適'}),
			_Utils_Tuple2(
			477,
			{answer: '戈戈戈竹', englishKey: 'IIIH', id: 477, target: '參'}),
			_Utils_Tuple2(
			478,
			{answer: '尸水田戈', englishKey: 'SEWI', id: 478, target: '屬'}),
			_Utils_Tuple2(
			479,
			{answer: '田口月金', englishKey: 'WRBC', id: 479, target: '圓'}),
			_Utils_Tuple2(
			480,
			{answer: '心口山', englishKey: 'PRU', id: 480, target: '包'}),
			_Utils_Tuple2(
			481,
			{answer: '火', englishKey: 'F', id: 481, target: '火'}),
			_Utils_Tuple2(
			482,
			{answer: '人卜土', englishKey: 'OYG', id: 482, target: '住'}),
			_Utils_Tuple2(
			483,
			{answer: '水廿中月', englishKey: 'ETLB', id: 483, target: '滿'}),
			_Utils_Tuple2(
			484,
			{answer: '月火竹女火', englishKey: 'BFHVF', id: 484, target: '縣'}),
			_Utils_Tuple2(
			485,
			{answer: '尸尸口', englishKey: 'SSR', id: 485, target: '局'}),
			_Utils_Tuple2(
			486,
			{answer: '日口火', englishKey: 'ARF', id: 486, target: '照'}),
			_Utils_Tuple2(
			487,
			{answer: '水土十', englishKey: 'EGJ', id: 487, target: '準'}),
			_Utils_Tuple2(
			488,
			{answer: '女火一', englishKey: 'VFM', id: 488, target: '紅'}),
			_Utils_Tuple2(
			489,
			{answer: '十十一女一', englishKey: 'JJMVM', id: 489, target: '輕'}),
			_Utils_Tuple2(
			490,
			{answer: '弓中', englishKey: 'NL', id: 490, target: '引'}),
			_Utils_Tuple2(
			491,
			{answer: '女火田', englishKey: 'VFW', id: 491, target: '細'}),
			_Utils_Tuple2(
			492,
			{answer: '尸土十田心', englishKey: 'SGJWP', id: 492, target: '聽'}),
			_Utils_Tuple2(
			493,
			{answer: '卜口卜女人', englishKey: 'YRYVO', id: 493, target: '該'}),
			_Utils_Tuple2(
			494,
			{answer: '金十戈土', englishKey: 'CJIG', id: 494, target: '鐵'}),
			_Utils_Tuple2(
			495,
			{answer: '人一田金', englishKey: 'OMWC', id: 495, target: '價'}),
			_Utils_Tuple2(
			496,
			{answer: '口口一一大', englishKey: 'RRMMK', id: 496, target: '嚴'}),
			_Utils_Tuple2(
			497,
			{answer: '戈竹心一', englishKey: 'IHPM', id: 497, target: '底'}),
			_Utils_Tuple2(
			498,
			{answer: '廿竹月山', englishKey: 'THBU', id: 498, target: '首'}),
			_Utils_Tuple2(
			499,
			{answer: '水卜人大', englishKey: 'EYOK', id: 499, target: '液'}),
			_Utils_Tuple2(
			500,
			{answer: '十口中口', englishKey: 'JRLR', id: 500, target: '官'}),
			_Utils_Tuple2(
			501,
			{answer: '竹人十田心', englishKey: 'HOJWP', id: 501, target: '德'}),
			_Utils_Tuple2(
			502,
			{answer: '弓中卜大月', englishKey: 'NLYKB', id: 502, target: '隨'}),
			_Utils_Tuple2(
			503,
			{answer: '大一人月', englishKey: 'KMOB', id: 503, target: '病'}),
			_Utils_Tuple2(
			504,
			{answer: '竹手人', englishKey: 'HQO', id: 504, target: '失'}),
			_Utils_Tuple2(
			505,
			{answer: '一火月大', englishKey: 'MFBK', id: 505, target: '爾'}),
			_Utils_Tuple2(
			506,
			{answer: '一弓心', englishKey: 'MNP', id: 506, target: '死'}),
			_Utils_Tuple2(
			507,
			{answer: '卜口廿廿月', englishKey: 'YRTTB', id: 507, target: '講'}),
			_Utils_Tuple2(
			508,
			{answer: '口尸心', englishKey: 'RSP', id: 508, target: '呢'}),
			_Utils_Tuple2(
			509,
			{answer: '廿弓火木', englishKey: 'TNFD', id: 509, target: '蘇'}),
			_Utils_Tuple2(
			510,
			{answer: '一田尸山', englishKey: 'MWSU', id: 510, target: '配'}),
			_Utils_Tuple2(
			511,
			{answer: '女', englishKey: 'V', id: 511, target: '女'}),
			_Utils_Tuple2(
			512,
			{answer: '廿一中金', englishKey: 'TMLC', id: 512, target: '黃'}),
			_Utils_Tuple2(
			513,
			{answer: '手人土', englishKey: 'QOG', id: 513, target: '推'}),
			_Utils_Tuple2(
			514,
			{answer: '日火一月金', englishKey: 'AFMBC', id: 514, target: '顯'}),
			_Utils_Tuple2(
			515,
			{answer: '卜口火火', englishKey: 'YRFF', id: 515, target: '談'}),
			_Utils_Tuple2(
			516,
			{answer: '田中中一卜', englishKey: 'WLLMY', id: 516, target: '罪'}),
			_Utils_Tuple2(
			517,
			{answer: '戈火中田中', englishKey: 'IFLWL', id: 517, target: '神'}),
			_Utils_Tuple2(
			518,
			{answer: '廿土戈戈', englishKey: 'TGII', id: 518, target: '藝'}),
			_Utils_Tuple2(
			519,
			{answer: '戈廿中月', englishKey: 'ITLB', id: 519, target: '席'}),
			_Utils_Tuple2(
			520,
			{answer: '人戈弓口', englishKey: 'OINR', id: 520, target: '含'}),
			_Utils_Tuple2(
			521,
			{answer: '人卜中一', englishKey: 'OYLM', id: 521, target: '企'}),
			_Utils_Tuple2(
			522,
			{answer: '卜月竹土', englishKey: 'YBHG', id: 522, target: '望'}),
			_Utils_Tuple2(
			523,
			{answer: '十心竹山', englishKey: 'JPHU', id: 523, target: '密'}),
			_Utils_Tuple2(
			524,
			{answer: '手心心', englishKey: 'QPP', id: 524, target: '批'}),
			_Utils_Tuple2(
			525,
			{answer: '火火月口口', englishKey: 'FFBRR', id: 525, target: '營'}),
			_Utils_Tuple2(
			526,
			{answer: '一一月金', englishKey: 'MMBC', id: 526, target: '項'}),
			_Utils_Tuple2(
			527,
			{answer: '弓中卜竹尸', englishKey: 'NLYHS', id: 527, target: '防'}),
			_Utils_Tuple2(
			528,
			{answer: '竹金手', englishKey: 'HCQ', id: 528, target: '舉'}),
			_Utils_Tuple2(
			529,
			{answer: '一土戈十水', englishKey: 'MGIJE', id: 529, target: '球'}),
			_Utils_Tuple2(
			530,
			{answer: '廿中月大', englishKey: 'TLBK', id: 530, target: '英'}),
			_Utils_Tuple2(
			531,
			{answer: '人弓廿手', englishKey: 'ONTQ', id: 531, target: '氧'}),
			_Utils_Tuple2(
			532,
			{answer: '土戈大尸', englishKey: 'GIKS', id: 532, target: '勢'}),
			_Utils_Tuple2(
			533,
			{answer: '竹土口', englishKey: 'HGR', id: 533, target: '告'}),
			_Utils_Tuple2(
			534,
			{answer: '木弓木', englishKey: 'DND', id: 534, target: '李'}),
			_Utils_Tuple2(
			535,
			{answer: '廿水竹口', englishKey: 'TEHR', id: 535, target: '落'}),
			_Utils_Tuple2(
			536,
			{answer: '大中月', englishKey: 'KLB', id: 536, target: '布'}),
			_Utils_Tuple2(
			537,
			{answer: '木', englishKey: 'D', id: 537, target: '木'}),
			_Utils_Tuple2(
			538,
			{answer: '土戈竹日月', englishKey: 'GIHAB', id: 538, target: '幫'}),
			_Utils_Tuple2(
			539,
			{answer: '十十人一月', englishKey: 'JJOMB', id: 539, target: '輪'}),
			_Utils_Tuple2(
			540,
			{answer: '一口木竹水', englishKey: 'MRDHE', id: 540, target: '破'}),
			_Utils_Tuple2(
			541,
			{answer: '一中中一', englishKey: 'MLLM', id: 541, target: '亞'}),
			_Utils_Tuple2(
			542,
			{answer: '十十月', englishKey: 'JJB', id: 542, target: '朝'}),
			_Utils_Tuple2(
			543,
			{answer: '竹口一中月', englishKey: 'HRMLB', id: 543, target: '師'}),
			_Utils_Tuple2(
			544,
			{answer: '田木一手', englishKey: 'WDMQ', id: 544, target: '圍'}),
			_Utils_Tuple2(
			545,
			{answer: '卜土口女', englishKey: 'YGRV', id: 545, target: '遠'}),
			_Utils_Tuple2(
			546,
			{answer: '十弓木', englishKey: 'JND', id: 546, target: '字'}),
			_Utils_Tuple2(
			547,
			{answer: '木木竹', englishKey: 'DDH', id: 547, target: '材'}),
			_Utils_Tuple2(
			548,
			{answer: '水卜土', englishKey: 'EYG', id: 548, target: '注'}),
			_Utils_Tuple2(
			549,
			{answer: '手中一卜', englishKey: 'QLMY', id: 549, target: '排'}),
			_Utils_Tuple2(
			550,
			{answer: '人廿金', englishKey: 'OTC', id: 550, target: '供'}),
			_Utils_Tuple2(
			551,
			{answer: '水一弓口', englishKey: 'EMNR', id: 551, target: '河'}),
			_Utils_Tuple2(
			552,
			{answer: '戈心心', englishKey: 'IPP', id: 552, target: '態'}),
			_Utils_Tuple2(
			553,
			{answer: '土土木戈', englishKey: 'GGDI', id: 553, target: '封'}),
			_Utils_Tuple2(
			554,
			{answer: '口大尸', englishKey: 'RKS', id: 554, target: '另'}),
			_Utils_Tuple2(
			555,
			{answer: '竹人人日水', englishKey: 'HOOAE', id: 555, target: '復'}),
			_Utils_Tuple2(
			556,
			{answer: '卜尸人心木', englishKey: 'YSOPD', id: 556, target: '施'}),
			_Utils_Tuple2(
			557,
			{answer: '水戈竹口', englishKey: 'EIHR', id: 557, target: '減'}),
			_Utils_Tuple2(
			558,
			{answer: '木土廿戈', englishKey: 'DGTI', id: 558, target: '樹'}),
			_Utils_Tuple2(
			559,
			{answer: '水十金口', englishKey: 'EJCR', id: 559, target: '溶'}),
			_Utils_Tuple2(
			560,
			{answer: '人尸心', englishKey: 'OSP', id: 560, target: '怎'}),
			_Utils_Tuple2(
			561,
			{answer: '卜中一', englishKey: 'YLM', id: 561, target: '止'}),
			_Utils_Tuple2(
			562,
			{answer: '十女木', englishKey: 'JVD', id: 562, target: '案'}),
			_Utils_Tuple2(
			563,
			{answer: '戈口', englishKey: 'IR', id: 563, target: '台'}),
			_Utils_Tuple2(
			564,
			{answer: '卜一一口', englishKey: 'YMMR', id: 564, target: '言'}),
			_Utils_Tuple2(
			565,
			{answer: '十一', englishKey: 'JM', id: 565, target: '士'}),
			_Utils_Tuple2(
			566,
			{answer: '土心戈一', englishKey: 'GPIM', id: 566, target: '均'}),
			_Utils_Tuple2(
			567,
			{answer: '一心卜中一', englishKey: 'MPYLM', id: 567, target: '武'}),
			_Utils_Tuple2(
			568,
			{answer: '田十口', englishKey: 'WJR', id: 568, target: '固'}),
			_Utils_Tuple2(
			569,
			{answer: '廿心廿木', englishKey: 'TPTD', id: 569, target: '葉'}),
			_Utils_Tuple2(
			570,
			{answer: '弓田火', englishKey: 'NWF', id: 570, target: '魚'}),
			_Utils_Tuple2(
			571,
			{answer: '水木竹水', englishKey: 'EDHE', id: 571, target: '波'}),
			_Utils_Tuple2(
			572,
			{answer: '戈火月山山', englishKey: 'IFBUU', id: 572, target: '視'}),
			_Utils_Tuple2(
			573,
			{answer: '人廿中一', englishKey: 'OTLM', id: 573, target: '僅'}),
			_Utils_Tuple2(
			574,
			{answer: '廿手一', englishKey: 'TQM', id: 574, target: '差'}),
			_Utils_Tuple2(
			575,
			{answer: '中弓月山金', englishKey: 'LNBUC', id: 575, target: '費'}),
			_Utils_Tuple2(
			576,
			{answer: '弓中竹水手', englishKey: 'NLHEQ', id: 576, target: '降'}),
			_Utils_Tuple2(
			577,
			{answer: '尸水女戈火', englishKey: 'SEVIF', id: 577, target: '緊'}),
			_Utils_Tuple2(
			578,
			{answer: '月月心水', englishKey: 'BBPE', id: 578, target: '愛'}),
			_Utils_Tuple2(
			579,
			{answer: '大一', englishKey: 'KM', id: 579, target: '左'}),
			_Utils_Tuple2(
			580,
			{answer: '卜廿日十', englishKey: 'YTAJ', id: 580, target: '章'}),
			_Utils_Tuple2(
			581,
			{answer: '日十', englishKey: 'AJ', id: 581, target: '早'}),
			_Utils_Tuple2(
			582,
			{answer: '十手十口', englishKey: 'JQJR', id: 582, target: '害'}),
			_Utils_Tuple2(
			583,
			{answer: '女火土田金', englishKey: 'VFGWC', id: 583, target: '續'}),
			_Utils_Tuple2(
			584,
			{answer: '月尸中水', englishKey: 'BSLE', id: 584, target: '服'}),
			_Utils_Tuple2(
			585,
			{answer: '人戈日女', englishKey: 'OIAV', id: 585, target: '食'}),
			_Utils_Tuple2(
			586,
			{answer: '卜口戈心一', englishKey: 'YRIPM', id: 586, target: '試'}),
			_Utils_Tuple2(
			587,
			{answer: '卜戈竹山', englishKey: 'YIHU', id: 587, target: '充'}),
			_Utils_Tuple2(
			588,
			{answer: '人一金', englishKey: 'OMC', id: 588, target: '兵'}),
			_Utils_Tuple2(
			589,
			{answer: '水一竹火', englishKey: 'EMHF', id: 589, target: '源'}),
			_Utils_Tuple2(
			590,
			{answer: '火手中弓', englishKey: 'FQLN', id: 590, target: '判'}),
			_Utils_Tuple2(
			591,
			{answer: '人女戈人', englishKey: 'OVIO', id: 591, target: '似'}),
			_Utils_Tuple2(
			592,
			{answer: '尸一口', englishKey: 'SMR', id: 592, target: '司'}),
			_Utils_Tuple2(
			593,
			{answer: '卜口廿人水', englishKey: 'YRTOE', id: 593, target: '護'}),
			_Utils_Tuple2(
			594,
			{answer: '口卜人', englishKey: 'RYO', id: 594, target: '足'}),
			_Utils_Tuple2(
			595,
			{answer: '廿一木', englishKey: 'TMD', id: 595, target: '某'}),
			_Utils_Tuple2(
			596,
			{answer: '女火木田火', englishKey: 'VFDWF', id: 596, target: '練'}),
			_Utils_Tuple2(
			597,
			{answer: '田竹水口', englishKey: 'WHER', id: 597, target: '略'}),
			_Utils_Tuple2(
			598,
			{answer: '田', englishKey: 'W', id: 598, target: '田'}),
			_Utils_Tuple2(
			599,
			{answer: '田土火', englishKey: 'WGF', id: 599, target: '黑'}),
			_Utils_Tuple2(
			600,
			{answer: '大竹尸山', englishKey: 'KHSU', id: 600, target: '犯'}),
			_Utils_Tuple2(
			601,
			{answer: '弓月山金', englishKey: 'NBUC', id: 601, target: '負'}),
			_Utils_Tuple2(
			602,
			{answer: '十水手', englishKey: 'JEQ', id: 602, target: '擊'}),
			_Utils_Tuple2(
			603,
			{answer: '女火女女戈', englishKey: 'VFVVI', id: 603, target: '繼'}),
			_Utils_Tuple2(
			604,
			{answer: '竹難月金', englishKey: 'HXBC', id: 604, target: '興'}),
			_Utils_Tuple2(
			605,
			{answer: '尸水土', englishKey: 'SEG', id: 605, target: '堅'}),
			_Utils_Tuple2(
			606,
			{answer: '十十人一弓', englishKey: 'JJOMN', id: 606, target: '輸'}),
			_Utils_Tuple2(
			607,
			{answer: '廿田', englishKey: 'TW', id: 607, target: '曲'}),
			_Utils_Tuple2(
			608,
			{answer: '人中竹竹', englishKey: 'OLHH', id: 608, target: '修'}),
			_Utils_Tuple2(
			609,
			{answer: '十口人大', englishKey: 'JROK', id: 609, target: '故'}),
			_Utils_Tuple2(
			610,
			{answer: '土戈竹尸', englishKey: 'GIHS', id: 610, target: '城'}),
			_Utils_Tuple2(
			611,
			{answer: '竹月月山山', englishKey: 'HBBUU', id: 611, target: '覺'}),
			_Utils_Tuple2(
			612,
			{answer: '手人', englishKey: 'QO', id: 612, target: '夫'}),
			_Utils_Tuple2(
			613,
			{answer: '弓弓心口', englishKey: 'NNPR', id: 613, target: '夠'}),
			_Utils_Tuple2(
			614,
			{answer: '卜廿大', englishKey: 'YTK', id: 614, target: '送'}),
			_Utils_Tuple2(
			615,
			{answer: '竹竹大', englishKey: 'HHK', id: 615, target: '笑'}),
			_Utils_Tuple2(
			616,
			{answer: '竹卜金口', englishKey: 'HYCR', id: 616, target: '船'}),
			_Utils_Tuple2(
			617,
			{answer: '大口', englishKey: 'KR', id: 617, target: '右'}),
			_Utils_Tuple2(
			618,
			{answer: '月金木竹', englishKey: 'BCDH', id: 618, target: '財'}),
			_Utils_Tuple2(
			619,
			{answer: '口人弓', englishKey: 'RON', id: 619, target: '吃'}),
			_Utils_Tuple2(
			620,
			{answer: '十一口田', englishKey: 'JMRW', id: 620, target: '富'}),
			_Utils_Tuple2(
			621,
			{answer: '手大日', englishKey: 'QKA', id: 621, target: '春'}),
			_Utils_Tuple2(
			622,
			{answer: '尸十卜戈日', englishKey: 'SJYIA', id: 622, target: '職'}),
			_Utils_Tuple2(
			623,
			{answer: '水廿中人', englishKey: 'ETLO', id: 623, target: '漢'}),
			_Utils_Tuple2(
			624,
			{answer: '中土田一', englishKey: 'LGWM', id: 624, target: '畫'}),
			_Utils_Tuple2(
			625,
			{answer: '一大尸', englishKey: 'MKS', id: 625, target: '功'}),
			_Utils_Tuple2(
			626,
			{answer: '日山', englishKey: 'AU', id: 626, target: '巴'}),
			_Utils_Tuple2(
			627,
			{answer: '中田土', englishKey: 'LWG', id: 627, target: '裡'}),
			_Utils_Tuple2(
			628,
			{answer: '口一日女', englishKey: 'RMAV', id: 628, target: '跟'}),
			_Utils_Tuple2(
			629,
			{answer: '口戈人土', englishKey: 'RIOG', id: 629, target: '雖'}),
			_Utils_Tuple2(
			630,
			{answer: '卜木人土', englishKey: 'YDOG', id: 630, target: '雜'}),
			_Utils_Tuple2(
			631,
			{answer: '木竹水', englishKey: 'DHE', id: 631, target: '板'}),
			_Utils_Tuple2(
			632,
			{answer: '弓人竹廿人', englishKey: 'NOHTO', id: 632, target: '飛'}),
			_Utils_Tuple2(
			633,
			{answer: '人卜口', englishKey: 'OYR', id: 633, target: '佔'}),
			_Utils_Tuple2(
			634,
			{answer: '金田日', englishKey: 'CWA', id: 634, target: '曾'}),
			_Utils_Tuple2(
			635,
			{answer: '女戈木', englishKey: 'VID', id: 635, target: '樂'}),
			_Utils_Tuple2(
			636,
			{answer: '一土人大', englishKey: 'MGOK', id: 636, target: '致'}),
			_Utils_Tuple2(
			637,
			{answer: '木人一人', englishKey: 'DOMO', id: 637, target: '檢'}),
			_Utils_Tuple2(
			638,
			{answer: '口弓竹水', englishKey: 'RNHE', id: 638, target: '吸'}),
			_Utils_Tuple2(
			639,
			{answer: '田土', englishKey: 'WG', id: 639, target: '里'}),
			_Utils_Tuple2(
			640,
			{answer: '月一大尸', englishKey: 'BMKS', id: 640, target: '助'}),
			_Utils_Tuple2(
			641,
			{answer: '弓中日一竹', englishKey: 'NLAMH', id: 641, target: '陽'}),
			_Utils_Tuple2(
			642,
			{answer: '一女弓一', englishKey: 'MVNM', id: 642, target: '互'}),
			_Utils_Tuple2(
			643,
			{answer: '中尸竹', englishKey: 'LSH', id: 643, target: '初'}),
			_Utils_Tuple2(
			644,
			{answer: '人口中弓', englishKey: 'ORLN', id: 644, target: '創'}),
			_Utils_Tuple2(
			645,
			{answer: '手卜竹弓', englishKey: 'QYHN', id: 645, target: '抗'}),
			_Utils_Tuple2(
			646,
			{answer: '十大一女尸', englishKey: 'JKMVS', id: 646, target: '考'}),
			_Utils_Tuple2(
			647,
			{answer: '手竹弓水', englishKey: 'QHNE', id: 647, target: '投'}),
			_Utils_Tuple2(
			648,
			{answer: '土卜田女', englishKey: 'GYWV', id: 648, target: '壞'}),
			_Utils_Tuple2(
			649,
			{answer: '竹木月', englishKey: 'HDB', id: 649, target: '策'}),
			_Utils_Tuple2(
			650,
			{answer: '十口', englishKey: 'JR', id: 650, target: '古'}),
			_Utils_Tuple2(
			651,
			{answer: '竹人一女一', englishKey: 'HOMVM', id: 651, target: '徑'}),
			_Utils_Tuple2(
			652,
			{answer: '手弓月大', englishKey: 'QNBK', id: 652, target: '換'}),
			_Utils_Tuple2(
			653,
			{answer: '十木', englishKey: 'JD', id: 653, target: '未'}),
			_Utils_Tuple2(
			654,
			{answer: '口一心口山', englishKey: 'RMPRU', id: 654, target: '跑'}),
			_Utils_Tuple2(
			655,
			{answer: '竹竹田', englishKey: 'HHW', id: 655, target: '留'}),
			_Utils_Tuple2(
			656,
			{answer: '金月廿山', englishKey: 'CBTU', id: 656, target: '鋼'}),
			_Utils_Tuple2(
			657,
			{answer: '卜廿山一月', englishKey: 'YTUMB', id: 657, target: '端'}),
			_Utils_Tuple2(
			658,
			{answer: '手一月山金', englishKey: 'QMBUC', id: 658, target: '責'}),
			_Utils_Tuple2(
			659,
			{answer: '卜廿卜口', englishKey: 'YTYR', id: 659, target: '站'}),
			_Utils_Tuple2(
			660,
			{answer: '竹日弓日', englishKey: 'HANA', id: 660, target: '簡'}),
			_Utils_Tuple2(
			661,
			{answer: '竹廿', englishKey: 'HT', id: 661, target: '升'}),
			_Utils_Tuple2(
			662,
			{answer: '卜戈木', englishKey: 'YID', id: 662, target: '述'}),
			_Utils_Tuple2(
			663,
			{answer: '金戈戈', englishKey: 'CII', id: 663, target: '錢'}),
			_Utils_Tuple2(
			664,
			{answer: '一田中弓', englishKey: 'MWLN', id: 664, target: '副'}),
			_Utils_Tuple2(
			665,
			{answer: '中一火月廿', englishKey: 'LMFBT', id: 665, target: '盡'}),
			_Utils_Tuple2(
			666,
			{answer: '卜月中月', englishKey: 'YBLB', id: 666, target: '帝'}),
			_Utils_Tuple2(
			667,
			{answer: '竹竹木戈', englishKey: 'HHDI', id: 667, target: '射'}),
			_Utils_Tuple2(
			668,
			{answer: '廿日十', englishKey: 'TAJ', id: 668, target: '草'}),
			_Utils_Tuple2(
			669,
			{answer: '竹十十山', englishKey: 'HJJU', id: 669, target: '範'}),
			_Utils_Tuple2(
			670,
			{answer: '弓弓手人', englishKey: 'NNQO', id: 670, target: '承'}),
			_Utils_Tuple2(
			671,
			{answer: '大竹田中戈', englishKey: 'KHWLI', id: 671, target: '獨'}),
			_Utils_Tuple2(
			672,
			{answer: '人戈弓戈', englishKey: 'OINI', id: 672, target: '令'}),
			_Utils_Tuple2(
			673,
			{answer: '弓中日女', englishKey: 'NLAV', id: 673, target: '限'}),
			_Utils_Tuple2(
			674,
			{answer: '弓中一弓口', englishKey: 'NLMNR', id: 674, target: '阿'}),
			_Utils_Tuple2(
			675,
			{answer: '十一日一', englishKey: 'JMAM', id: 675, target: '宣'}),
			_Utils_Tuple2(
			676,
			{answer: '一土田中女', englishKey: 'MGWLV', id: 676, target: '環'}),
			_Utils_Tuple2(
			677,
			{answer: '人土水', englishKey: 'OGE', id: 677, target: '雙'}),
			_Utils_Tuple2(
			678,
			{answer: '卜口手一月', englishKey: 'YRQMB', id: 678, target: '請'}),
			_Utils_Tuple2(
			679,
			{answer: '土人尸竹口', englishKey: 'GOSHR', id: 679, target: '超'}),
			_Utils_Tuple2(
			680,
			{answer: '竹人山弓大', englishKey: 'HOUNK', id: 680, target: '微'}),
			_Utils_Tuple2(
			681,
			{answer: '卜口卜口女', englishKey: 'YRYRV', id: 681, target: '讓'}),
			_Utils_Tuple2(
			682,
			{answer: '手十金一', englishKey: 'QJCM', id: 682, target: '控'}),
			_Utils_Tuple2(
			683,
			{answer: '戈中戈中', englishKey: 'ILIL', id: 683, target: '州'}),
			_Utils_Tuple2(
			684,
			{answer: '戈日女', englishKey: 'IAV', id: 684, target: '良'}),
			_Utils_Tuple2(
			685,
			{answer: '十十中田', englishKey: 'JJLW', id: 685, target: '軸'}),
			_Utils_Tuple2(
			686,
			{answer: '手戈', englishKey: 'QI', id: 686, target: '找'}),
			_Utils_Tuple2(
			687,
			{answer: '一火口', englishKey: 'MFR', id: 687, target: '否'}),
			_Utils_Tuple2(
			688,
			{answer: '女火尸山', englishKey: 'VFSU', id: 688, target: '紀'}),
			_Utils_Tuple2(
			689,
			{answer: '廿金月廿', englishKey: 'TCBT', id: 689, target: '益'}),
			_Utils_Tuple2(
			690,
			{answer: '人卜竹女', englishKey: 'OYHV', id: 690, target: '依'}),
			_Utils_Tuple2(
			691,
			{answer: '人一月水', englishKey: 'OMBE', id: 691, target: '優'}),
			_Utils_Tuple2(
			692,
			{answer: '一弓一月金', englishKey: 'MNMBC', id: 692, target: '頂'}),
			_Utils_Tuple2(
			693,
			{answer: '一口木木人', englishKey: 'MRDDO', id: 693, target: '礎'}),
			_Utils_Tuple2(
			694,
			{answer: '十戈十田十', englishKey: 'JIJWJ', id: 694, target: '載'}),
			_Utils_Tuple2(
			695,
			{answer: '人一土弓', englishKey: 'OMGN', id: 695, target: '倒'}),
			_Utils_Tuple2(
			696,
			{answer: '竹尸卜竹尸', englishKey: 'HSYHS', id: 696, target: '房'}),
			_Utils_Tuple2(
			697,
			{answer: '十金戈大', englishKey: 'JCIK', id: 697, target: '突'}),
			_Utils_Tuple2(
			698,
			{answer: '人人土', englishKey: 'OOG', id: 698, target: '坐'}),
			_Utils_Tuple2(
			699,
			{answer: '火木金尸竹', englishKey: 'FDCSH', id: 699, target: '粉'}),
			_Utils_Tuple2(
			700,
			{answer: '卜月人大', englishKey: 'YBOK', id: 700, target: '敵'}),
			_Utils_Tuple2(
			701,
			{answer: '十竹水口', englishKey: 'JHER', id: 701, target: '客'}),
			_Utils_Tuple2(
			702,
			{answer: '土口竹女', englishKey: 'GRHV', id: 702, target: '袁'}),
			_Utils_Tuple2(
			703,
			{answer: '戈一人戈戈', englishKey: 'IMOII', id: 703, target: '冷'}),
			_Utils_Tuple2(
			704,
			{answer: '月火手尸', englishKey: 'BFQS', id: 704, target: '勝'}),
			_Utils_Tuple2(
			705,
			{answer: '女火尸竹山', englishKey: 'VFSHU', id: 705, target: '絕'}),
			_Utils_Tuple2(
			706,
			{answer: '木竹一中', englishKey: 'DHML', id: 706, target: '析'}),
			_Utils_Tuple2(
			707,
			{answer: '土竹山戈', englishKey: 'GHUI', id: 707, target: '塊'}),
			_Utils_Tuple2(
			708,
			{answer: '卜難中弓', englishKey: 'YXLN', id: 708, target: '劑'}),
			_Utils_Tuple2(
			709,
			{answer: '水月金弓', englishKey: 'EBCN', id: 709, target: '測'}),
			_Utils_Tuple2(
			710,
			{answer: '女火女戈火', englishKey: 'VFVIF', id: 710, target: '絲'}),
			_Utils_Tuple2(
			711,
			{answer: '十大尸尸', englishKey: 'JKSS', id: 711, target: '協'}),
			_Utils_Tuple2(
			712,
			{answer: '卜口竹一卜', englishKey: 'YRHMY', id: 712, target: '訴'}),
			_Utils_Tuple2(
			713,
			{answer: '弓中木田', englishKey: 'NLDW', id: 713, target: '陳'}),
			_Utils_Tuple2(
			714,
			{answer: '人弓竹尸', englishKey: 'ONHS', id: 714, target: '仍'}),
			_Utils_Tuple2(
			715,
			{answer: '田中女火土', englishKey: 'WLVFG', id: 715, target: '羅'}),
			_Utils_Tuple2(
			716,
			{answer: '人戈人一木', englishKey: 'OIOMD', id: 716, target: '餘'}),
			_Utils_Tuple2(
			717,
			{answer: '尸田月廿', englishKey: 'SWBT', id: 717, target: '鹽'}),
			_Utils_Tuple2(
			718,
			{answer: '大水', englishKey: 'KE', id: 718, target: '友'}),
			_Utils_Tuple2(
			719,
			{answer: '水廿手', englishKey: 'ETQ', id: 719, target: '洋'}),
			_Utils_Tuple2(
			720,
			{answer: '金廿日', englishKey: 'CTA', id: 720, target: '錯'}),
			_Utils_Tuple2(
			721,
			{answer: '廿十口', englishKey: 'TJR', id: 721, target: '苦'}),
			_Utils_Tuple2(
			722,
			{answer: '卜人弓大', englishKey: 'YONK', id: 722, target: '夜'}),
			_Utils_Tuple2(
			723,
			{answer: '一廿中弓', englishKey: 'MTLN', id: 723, target: '刑'}),
			_Utils_Tuple2(
			724,
			{answer: '竹木弓戈弓', englishKey: 'HDNIN', id: 724, target: '移'}),
			_Utils_Tuple2(
			725,
			{answer: '木廿日大', englishKey: 'DTAK', id: 725, target: '模'}),
			_Utils_Tuple2(
			726,
			{answer: '卜竹一月金', englishKey: 'YHMBC', id: 726, target: '頻'}),
			_Utils_Tuple2(
			727,
			{answer: '人戈弓心', englishKey: 'OINP', id: 727, target: '念'}),
			_Utils_Tuple2(
			728,
			{answer: '卜一尸人', englishKey: 'YMSO', id: 728, target: '逐'}),
			_Utils_Tuple2(
			729,
			{answer: '竹土口中卜', englishKey: 'HGRLY', id: 729, target: '靠'}),
			_Utils_Tuple2(
			730,
			{answer: '水日心心', englishKey: 'EAPP', id: 730, target: '混'}),
			_Utils_Tuple2(
			731,
			{answer: '田卜戈', englishKey: 'WYI', id: 731, target: '母'}),
			_Utils_Tuple2(
			732,
			{answer: '人大一口廿', englishKey: 'OKMRT', id: 732, target: '短'}),
			_Utils_Tuple2(
			733,
			{answer: '木竹水', englishKey: 'DHE', id: 733, target: '皮'}),
			_Utils_Tuple2(
			734,
			{answer: '女火竹水卜', englishKey: 'VFHEY', id: 734, target: '終'}),
			_Utils_Tuple2(
			735,
			{answer: '尸水竹竹人', englishKey: 'SEHHO', id: 735, target: '聚'}),
			_Utils_Tuple2(
			736,
			{answer: '水人一弓', englishKey: 'EOMN', id: 736, target: '汽'}),
			_Utils_Tuple2(
			737,
			{answer: '木木戈', englishKey: 'DDI', id: 737, target: '村'}),
			_Utils_Tuple2(
			738,
			{answer: '口尸手中', englishKey: 'RSQL', id: 738, target: '哪'}),
			_Utils_Tuple2(
			739,
			{answer: '日戈一女山', englishKey: 'AIMVU', id: 739, target: '既'}),
			_Utils_Tuple2(
			740,
			{answer: '竹人木手弓', englishKey: 'HODQN', id: 740, target: '衛'}),
			_Utils_Tuple2(
			741,
			{answer: '口一尸尸', englishKey: 'RMSS', id: 741, target: '距'}),
			_Utils_Tuple2(
			742,
			{answer: '木卜金大', englishKey: 'DYCK', id: 742, target: '校'}),
			_Utils_Tuple2(
			743,
			{answer: '人卜口弓', englishKey: 'OYRN', id: 743, target: '停'}),
			_Utils_Tuple2(
			744,
			{answer: '一弓火', englishKey: 'MNF', id: 744, target: '烈'}),
			_Utils_Tuple2(
			745,
			{answer: '中月大', englishKey: 'LBK', id: 745, target: '央'}),
			_Utils_Tuple2(
			746,
			{answer: '十月人火', englishKey: 'JBOF', id: 746, target: '察'}),
			_Utils_Tuple2(
			747,
			{answer: '火土土山', englishKey: 'FGGU', id: 747, target: '燒'}),
			_Utils_Tuple2(
			748,
			{answer: '卜弓十', englishKey: 'YNJ', id: 748, target: '迅'}),
			_Utils_Tuple2(
			749,
			{answer: '土卜廿山', englishKey: 'GYTU', id: 749, target: '境'}),
			_Utils_Tuple2(
			750,
			{answer: '廿大口', englishKey: 'TKR', id: 750, target: '若'}),
			_Utils_Tuple2(
			751,
			{answer: '竹心尸中', englishKey: 'HPSL', id: 751, target: '印'}),
			_Utils_Tuple2(
			752,
			{answer: '水戈中中', englishKey: 'EILL', id: 752, target: '洲'}),
			_Utils_Tuple2(
			753,
			{answer: '卜人中弓', englishKey: 'YOLN', id: 753, target: '刻'}),
			_Utils_Tuple2(
			754,
			{answer: '手竹十口', englishKey: 'QHJR', id: 754, target: '括'}),
			_Utils_Tuple2(
			755,
			{answer: '水竹尸大', englishKey: 'EHSK', id: 755, target: '激'}),
			_Utils_Tuple2(
			756,
			{answer: '弓木山', englishKey: 'NDU', id: 756, target: '孔'}),
			_Utils_Tuple2(
			757,
			{answer: '手卜口月', englishKey: 'QYRB', id: 757, target: '搞'}),
			_Utils_Tuple2(
			758,
			{answer: '十一戈土', englishKey: 'JMIG', id: 758, target: '室'}),
			_Utils_Tuple2(
			759,
			{answer: '竹人土木戈', englishKey: 'HOGDI', id: 759, target: '待'}),
			_Utils_Tuple2(
			760,
			{answer: '木卜女人', englishKey: 'DYVO', id: 760, target: '核'}),
			_Utils_Tuple2(
			761,
			{answer: '廿月人大', englishKey: 'TBOK', id: 761, target: '散'}),
			_Utils_Tuple2(
			762,
			{answer: '人尸一水', englishKey: 'OSME', id: 762, target: '侵'}),
			_Utils_Tuple2(
			763,
			{answer: '口日山', englishKey: 'RAU', id: 763, target: '吧'}),
			_Utils_Tuple2(
			764,
			{answer: '田中', englishKey: 'WL', id: 764, target: '甲'}),
			_Utils_Tuple2(
			765,
			{answer: '弓人', englishKey: 'NO', id: 765, target: '久'}),
			_Utils_Tuple2(
			766,
			{answer: '廿月木', englishKey: 'TBD', id: 766, target: '菜'}),
			_Utils_Tuple2(
			767,
			{answer: '口十木', englishKey: 'RJD', id: 767, target: '味'}),
			_Utils_Tuple2(
			768,
			{answer: '廿人土難', englishKey: 'TOGX', id: 768, target: '舊'}),
			_Utils_Tuple2(
			769,
			{answer: '水十口月', englishKey: 'EJRB', id: 769, target: '湖'}),
			_Utils_Tuple2(
			770,
			{answer: '人心月山金', englishKey: 'OPBUC', id: 770, target: '貨'}),
			_Utils_Tuple2(
			771,
			{answer: '弓口口十', englishKey: 'NRRJ', id: 771, target: '彈'}),
			_Utils_Tuple2(
			772,
			{answer: '手口月金', englishKey: 'QRBC', id: 772, target: '損'}),
			_Utils_Tuple2(
			773,
			{answer: '弓弓一月金', englishKey: 'NNMBC', id: 773, target: '預'}),
			_Utils_Tuple2(
			774,
			{answer: '弓中月一', englishKey: 'NLBM', id: 774, target: '阻'}),
			_Utils_Tuple2(
			775,
			{answer: '難卜口月山', englishKey: 'XYRBU', id: 775, target: '毫'}),
			_Utils_Tuple2(
			776,
			{answer: '弓山', englishKey: 'NU', id: 776, target: '乙'}),
			_Utils_Tuple2(
			777,
			{answer: '廿金日', englishKey: 'TCA', id: 777, target: '普'}),
			_Utils_Tuple2(
			778,
			{answer: '竹木月一心', englishKey: 'HDBMP', id: 778, target: '穩'}),
			_Utils_Tuple2(
			779,
			{answer: '女尸手火', englishKey: 'VSQF', id: 779, target: '媽'}),
			_Utils_Tuple2(
			780,
			{answer: '木十月一', englishKey: 'DJBM', id: 780, target: '植'}),
			_Utils_Tuple2(
			781,
			{answer: '竹山心', englishKey: 'HUP', id: 781, target: '息'}),
			_Utils_Tuple2(
			782,
			{answer: '手戈廿金', englishKey: 'QITC', id: 782, target: '擴'}),
			_Utils_Tuple2(
			783,
			{answer: '金日女', englishKey: 'CAV', id: 783, target: '銀'}),
			_Utils_Tuple2(
			784,
			{answer: '卜口一一口', englishKey: 'YRMMR', id: 784, target: '語'}),
			_Utils_Tuple2(
			785,
			{answer: '手月十十', englishKey: 'QBJJ', id: 785, target: '揮'}),
			_Utils_Tuple2(
			786,
			{answer: '水一金田', englishKey: 'EMCW', id: 786, target: '酒'}),
			_Utils_Tuple2(
			787,
			{answer: '一月一一戈', englishKey: 'MBMMI', id: 787, target: '雲'}),
			_Utils_Tuple2(
			788,
			{answer: '十木戈', englishKey: 'JDI', id: 788, target: '守'}),
			_Utils_Tuple2(
			789,
			{answer: '人口手', englishKey: 'ORQ', id: 789, target: '拿'}),
			_Utils_Tuple2(
			790,
			{answer: '戈弓戈弓', englishKey: 'ININ', id: 790, target: '序'}),
			_Utils_Tuple2(
			791,
			{answer: '女火竹女心', englishKey: 'VFHVP', id: 791, target: '紙'}),
			_Utils_Tuple2(
			792,
			{answer: '尸水一金田', englishKey: 'SEMCW', id: 792, target: '醫'}),
			_Utils_Tuple2(
			793,
			{answer: '卜戈火', englishKey: 'YIF', id: 793, target: '熟'}),
			_Utils_Tuple2(
			794,
			{answer: '人山木大', englishKey: 'OUDK', id: 794, target: '缺'}),
			_Utils_Tuple2(
			795,
			{answer: '一中月卜', englishKey: 'MLBY', id: 795, target: '雨'}),
			_Utils_Tuple2(
			796,
			{answer: '口尸手火', englishKey: 'RSQF', id: 796, target: '嗎'}),
			_Utils_Tuple2(
			797,
			{answer: '金十', englishKey: 'CJ', id: 797, target: '針'}),
			_Utils_Tuple2(
			798,
			{answer: '竹金中弓', englishKey: 'HCLN', id: 798, target: '劉'}),
			_Utils_Tuple2(
			799,
			{answer: '口弓中口', englishKey: 'RNLR', id: 799, target: '啊'}),
			_Utils_Tuple2(
			800,
			{answer: '弓一心', englishKey: 'NMP', id: 800, target: '急'}),
			_Utils_Tuple2(
			801,
			{answer: '口日日', englishKey: 'RAA', id: 801, target: '唱'}),
			_Utils_Tuple2(
			802,
			{answer: '卜口中中中', englishKey: 'YRLLL', id: 802, target: '訓'}),
			_Utils_Tuple2(
			803,
			{answer: '卜口口一大', englishKey: 'YRRMK', id: 803, target: '誤'}),
			_Utils_Tuple2(
			804,
			{answer: '一火一月金', englishKey: 'MFMBC', id: 804, target: '願'}),
			_Utils_Tuple2(
			805,
			{answer: '十竹木田', englishKey: 'JHDW', id: 805, target: '審'}),
			_Utils_Tuple2(
			806,
			{answer: '竹月廿', englishKey: 'HBT', id: 806, target: '血'}),
			_Utils_Tuple2(
			807,
			{answer: '弓中人木戈', englishKey: 'NLODI', id: 807, target: '附'}),
			_Utils_Tuple2(
			808,
			{answer: '廿人木', englishKey: 'TOD', id: 808, target: '茶'}),
			_Utils_Tuple2(
			809,
			{answer: '弓火廿手', englishKey: 'NFTQ', id: 809, target: '鮮'}),
			_Utils_Tuple2(
			810,
			{answer: '火木日一土', englishKey: 'FDAMG', id: 810, target: '糧'}),
			_Utils_Tuple2(
			811,
			{answer: '竹一中', englishKey: 'HML', id: 811, target: '斤'}),
			_Utils_Tuple2(
			812,
			{answer: '弓木卜女人', englishKey: 'NDYVO', id: 812, target: '孩'}),
			_Utils_Tuple2(
			813,
			{answer: '月金口山', englishKey: 'BCRU', id: 813, target: '脫'}),
			_Utils_Tuple2(
			814,
			{answer: '一口卜戈山', englishKey: 'MRYIU', id: 814, target: '硫'}),
			_Utils_Tuple2(
			815,
			{answer: '廿土廿口', englishKey: 'TGTR', id: 815, target: '善'}),
			_Utils_Tuple2(
			816,
			{answer: '月日山', englishKey: 'BAU', id: 816, target: '肥'}),
			_Utils_Tuple2(
			817,
			{answer: '水十一金', englishKey: 'EJMC', id: 817, target: '演'}),
			_Utils_Tuple2(
			818,
			{answer: '卜月卜尸心', englishKey: 'YBYSP', id: 818, target: '龍'}),
			_Utils_Tuple2(
			819,
			{answer: '金大', englishKey: 'CK', id: 819, target: '父'}),
			_Utils_Tuple2(
			820,
			{answer: '水十十中', englishKey: 'EJJL', id: 820, target: '漸'}),
			_Utils_Tuple2(
			821,
			{answer: '廿土弓人', englishKey: 'TGNO', id: 821, target: '歡'}),
			_Utils_Tuple2(
			822,
			{answer: '火月口手', englishKey: 'FBRQ', id: 822, target: '掌'}),
			_Utils_Tuple2(
			823,
			{answer: '木戈廿', englishKey: 'DIT', id: 823, target: '械'}),
			_Utils_Tuple2(
			824,
			{answer: '一口弓人', englishKey: 'MRNO', id: 824, target: '歌'}),
			_Utils_Tuple2(
			825,
			{answer: '水火竹', englishKey: 'EFH', id: 825, target: '沙'}),
			_Utils_Tuple2(
			826,
			{answer: '大竹廿人水', englishKey: 'KHTOE', id: 826, target: '獲'}),
			_Utils_Tuple2(
			827,
			{answer: '廿十大日', englishKey: 'TJKA', id: 827, target: '著'}),
			_Utils_Tuple2(
			828,
			{answer: '月山中弓', englishKey: 'BULN', id: 828, target: '剛'}),
			_Utils_Tuple2(
			829,
			{answer: '竹弓卜竹女', englishKey: 'HNYHV', id: 829, target: '製'}),
			_Utils_Tuple2(
			830,
			{answer: '一人大', englishKey: 'MOK', id: 830, target: '攻'}),
			_Utils_Tuple2(
			831,
			{answer: '卜口田月', englishKey: 'YRWB', id: 831, target: '謂'}),
			_Utils_Tuple2(
			832,
			{answer: '竹十月山', englishKey: 'HJBU', id: 832, target: '盾'}),
			_Utils_Tuple2(
			833,
			{answer: '卜口木戈', englishKey: 'YRDI', id: 833, target: '討'}),
			_Utils_Tuple2(
			834,
			{answer: '日弓日山', englishKey: 'ANAU', id: 834, target: '晚'}),
			_Utils_Tuple2(
			835,
			{answer: '人大中月', englishKey: 'OKLB', id: 835, target: '佈'}),
			_Utils_Tuple2(
			836,
			{answer: '火木卜廿', englishKey: 'FDYT', id: 836, target: '粒'}),
			_Utils_Tuple2(
			837,
			{answer: '月月山', englishKey: 'BBU', id: 837, target: '亂'}),
			_Utils_Tuple2(
			838,
			{answer: '火月大火', englishKey: 'FBKF', id: 838, target: '燃'}),
			_Utils_Tuple2(
			839,
			{answer: '弓戈弓竹', englishKey: 'NINH', id: 839, target: '矛'}),
			_Utils_Tuple2(
			840,
			{answer: '竹火木', englishKey: 'HFD', id: 840, target: '乎'}),
			_Utils_Tuple2(
			841,
			{answer: '大金竹弓水', englishKey: 'KCHNE', id: 841, target: '殺'}),
			_Utils_Tuple2(
			842,
			{answer: '中人日水', englishKey: 'LOAE', id: 842, target: '複'}),
			_Utils_Tuple2(
			843,
			{answer: '廿女戈木', englishKey: 'TVID', id: 843, target: '藥'}),
			_Utils_Tuple2(
			844,
			{answer: '十心月弓', englishKey: 'JPBN', id: 844, target: '寧'}),
			_Utils_Tuple2(
			845,
			{answer: '弓田火日', englishKey: 'NWFA', id: 845, target: '魯'}),
			_Utils_Tuple2(
			846,
			{answer: '中一月山金', englishKey: 'LMBUC', id: 846, target: '貴'}),
			_Utils_Tuple2(
			847,
			{answer: '火廿一木', englishKey: 'FTMD', id: 847, target: '煤'}),
			_Utils_Tuple2(
			848,
			{answer: '人竹日', englishKey: 'OHA', id: 848, target: '伯'}),
			_Utils_Tuple2(
			849,
			{answer: '卜口土田金', englishKey: 'YRGWC', id: 849, target: '讀'}),
			_Utils_Tuple2(
			850,
			{answer: '一土戈中土', englishKey: 'MGILG', id: 850, target: '班'}),
			_Utils_Tuple2(
			851,
			{answer: '心口', englishKey: 'PR', id: 851, target: '句'}),
			_Utils_Tuple2(
			852,
			{answer: '竹木日', englishKey: 'HDA', id: 852, target: '香'}),
			_Utils_Tuple2(
			853,
			{answer: '卜竹日', englishKey: 'YHA', id: 853, target: '迫'}),
			_Utils_Tuple2(
			854,
			{answer: '人中中', englishKey: 'OLL', id: 854, target: '介'}),
			_Utils_Tuple2(
			855,
			{answer: '山十一口廿', englishKey: 'UJMRT', id: 855, target: '豐'}),
			_Utils_Tuple2(
			856,
			{answer: '土卜廿口', englishKey: 'GYTR', id: 856, target: '培'}),
			_Utils_Tuple2(
			857,
			{answer: '手尸一土', englishKey: 'QSMG', id: 857, target: '握'}),
			_Utils_Tuple2(
			858,
			{answer: '廿日弓田', englishKey: 'TANW', id: 858, target: '蘭'}),
			_Utils_Tuple2(
			859,
			{answer: '弓卜女戈', englishKey: 'NYVI', id: 859, target: '弦'}),
			_Utils_Tuple2(
			860,
			{answer: '手弓金口', englishKey: 'QNCR', id: 860, target: '擔'}),
			_Utils_Tuple2(
			861,
			{answer: '弓人中一戈', englishKey: 'NOLMI', id: 861, target: '蛋'}),
			_Utils_Tuple2(
			862,
			{answer: '水月竹弓', englishKey: 'EBHN', id: 862, target: '沉'}),
			_Utils_Tuple2(
			863,
			{answer: '人口尸水', englishKey: 'ORSE', id: 863, target: '假'}),
			_Utils_Tuple2(
			864,
			{answer: '土十大弓戈', englishKey: 'GJKNI', id: 864, target: '執'}),
			_Utils_Tuple2(
			865,
			{answer: '十金一女竹', englishKey: 'JCMVH', id: 865, target: '穿'}),
			_Utils_Tuple2(
			866,
			{answer: '竹人一口', englishKey: 'HOMR', id: 866, target: '答'}),
			_Utils_Tuple2(
			867,
			{answer: '卜口人土', englishKey: 'YROG', id: 867, target: '誰'}),
			_Utils_Tuple2(
			868,
			{answer: '中中中金', englishKey: 'LLLC', id: 868, target: '順'}),
			_Utils_Tuple2(
			869,
			{answer: '火一田土', englishKey: 'FMWG', id: 869, target: '煙'}),
			_Utils_Tuple2(
			870,
			{answer: '女火十人日', englishKey: 'VFJOA', id: 870, target: '縮'}),
			_Utils_Tuple2(
			871,
			{answer: '月人一人', englishKey: 'BOMO', id: 871, target: '臉'}),
			_Utils_Tuple2(
			872,
			{answer: '土口廿口', englishKey: 'GRTR', id: 872, target: '喜'}),
			_Utils_Tuple2(
			873,
			{answer: '月金口中', englishKey: 'BCRL', id: 873, target: '腳'}),
			_Utils_Tuple2(
			874,
			{answer: '田廿金', englishKey: 'WTC', id: 874, target: '異'}),
			_Utils_Tuple2(
			875,
			{answer: '弓日竹山', englishKey: 'NAHU', id: 875, target: '免'}),
			_Utils_Tuple2(
			876,
			{answer: '田木', englishKey: 'WD', id: 876, target: '困'}),
			_Utils_Tuple2(
			877,
			{answer: '中心月', englishKey: 'LPB', id: 877, target: '背'}),
			_Utils_Tuple2(
			878,
			{answer: '日竹手一', englishKey: 'AHQM', id: 878, target: '星'}),
			_Utils_Tuple2(
			879,
			{answer: '戈火一口田', englishKey: 'IFMRW', id: 879, target: '福'}),
			_Utils_Tuple2(
			880,
			{answer: '田中月山金', englishKey: 'WLBUC', id: 880, target: '買'}),
			_Utils_Tuple2(
			881,
			{answer: '水弓木', englishKey: 'END', id: 881, target: '染'}),
			_Utils_Tuple2(
			882,
			{answer: '廿廿', englishKey: 'TT', id: 882, target: '井'}),
			_Utils_Tuple2(
			883,
			{answer: '木日戈山', englishKey: 'DAIU', id: 883, target: '概'}),
			_Utils_Tuple2(
			884,
			{answer: '心日田水', englishKey: 'PAWE', id: 884, target: '慢'}),
			_Utils_Tuple2(
			885,
			{answer: '心竹日', englishKey: 'PHA', id: 885, target: '怕'}),
			_Utils_Tuple2(
			886,
			{answer: '水卜尸木', englishKey: 'EYSD', id: 886, target: '游'}),
			_Utils_Tuple2(
			887,
			{answer: '一口廿女戈', englishKey: 'MRTVI', id: 887, target: '磁'}),
			_Utils_Tuple2(
			888,
			{answer: '人卜廿口', englishKey: 'OYTR', id: 888, target: '倍'}),
			_Utils_Tuple2(
			889,
			{answer: '戈火月一', englishKey: 'IFBM', id: 889, target: '祖'}),
			_Utils_Tuple2(
			890,
			{answer: '竹日一土', englishKey: 'HAMG', id: 890, target: '皇'}),
			_Utils_Tuple2(
			891,
			{answer: '廿水戈戈', englishKey: 'TEII', id: 891, target: '薄'}),
			_Utils_Tuple2(
			892,
			{answer: '人口卜人', englishKey: 'ORYO', id: 892, target: '促'}),
			_Utils_Tuple2(
			893,
			{answer: '手月月尸木', englishKey: 'QBBSD', id: 893, target: '靜'}),
			_Utils_Tuple2(
			894,
			{answer: '中戈十月', englishKey: 'LIJB', id: 894, target: '補'}),
			_Utils_Tuple2(
			895,
			{answer: '卜口一火十', englishKey: 'YRMFJ', id: 895, target: '評'}),
			_Utils_Tuple2(
			896,
			{answer: '金卜廿土', englishKey: 'CYTG', id: 896, target: '鐘'}),
			_Utils_Tuple2(
			897,
			{answer: '竹田尸一一', englishKey: 'HWSMM', id: 897, target: '翻'}),
			_Utils_Tuple2(
			898,
			{answer: '人月人', englishKey: 'OBO', id: 898, target: '肉'}),
			_Utils_Tuple2(
			899,
			{answer: '口一戈戈', englishKey: 'RMII', id: 899, target: '踐'}),
			_Utils_Tuple2(
			900,
			{answer: '尸心', englishKey: 'SP', id: 900, target: '尼'}),
			_Utils_Tuple2(
			901,
			{answer: '卜竹女', englishKey: 'YHV', id: 901, target: '衣'}),
			_Utils_Tuple2(
			902,
			{answer: '十廿月戈', englishKey: 'JTBI', id: 902, target: '寬'}),
			_Utils_Tuple2(
			903,
			{answer: '手日一竹', englishKey: 'QAMH', id: 903, target: '揚'}),
			_Utils_Tuple2(
			904,
			{answer: '木竹日月', englishKey: 'DHAB', id: 904, target: '棉'}),
			_Utils_Tuple2(
			905,
			{answer: '大大中月', englishKey: 'KKLB', id: 905, target: '希'}),
			_Utils_Tuple2(
			906,
			{answer: '人人日竹', englishKey: 'OOAH', id: 906, target: '傷'}),
			_Utils_Tuple2(
			907,
			{answer: '手口口木', englishKey: 'QRRD', id: 907, target: '操'}),
			_Utils_Tuple2(
			908,
			{answer: '廿戈一尸', englishKey: 'TIMS', id: 908, target: '藏'}),
			_Utils_Tuple2(
			909,
			{answer: '竹十廿一', englishKey: 'HJTM', id: 909, target: '垂'}),
			_Utils_Tuple2(
			910,
			{answer: '十月一', englishKey: 'JBM', id: 910, target: '宜'}),
			_Utils_Tuple2(
			911,
			{answer: '竹木火', englishKey: 'HDF', id: 911, target: '秋'}),
			_Utils_Tuple2(
			912,
			{answer: '人弓一女一', englishKey: 'ONMVM', id: 912, target: '氫'}),
			_Utils_Tuple2(
			913,
			{answer: '一月口一口', englishKey: 'MBRMR', id: 913, target: '露'}),
			_Utils_Tuple2(
			914,
			{answer: '大尸一戈', englishKey: 'KSMI', id: 914, target: '套'}),
			_Utils_Tuple2(
			915,
			{answer: '卜水月山', englishKey: 'YEBU', id: 915, target: '督'}),
			_Utils_Tuple2(
			916,
			{answer: '竹中手', englishKey: 'HLQ', id: 916, target: '筆'}),
			_Utils_Tuple2(
			917,
			{answer: '手一一女', englishKey: 'QMMV', id: 917, target: '振'}),
			_Utils_Tuple2(
			918,
			{answer: '卜口月弓', englishKey: 'YRBN', id: 918, target: '亮'}),
			_Utils_Tuple2(
			919,
			{answer: '十手一心', englishKey: 'JQMP', id: 919, target: '憲'}),
			_Utils_Tuple2(
			920,
			{answer: '木十', englishKey: 'DJ', id: 920, target: '末'}),
			_Utils_Tuple2(
			921,
			{answer: '大口木', englishKey: 'KRD', id: 921, target: '架'}),
			_Utils_Tuple2(
			922,
			{answer: '戈難水', englishKey: 'IXE', id: 922, target: '慶'}),
			_Utils_Tuple2(
			923,
			{answer: '女火女弓水', englishKey: 'VFVNE', id: 923, target: '綠'}),
			_Utils_Tuple2(
			924,
			{answer: '女火竹尸月', englishKey: 'VFHSB', id: 924, target: '編'}),
			_Utils_Tuple2(
			925,
			{answer: '竹手', englishKey: 'HQ', id: 925, target: '牛'}),
			_Utils_Tuple2(
			926,
			{answer: '日中月大', englishKey: 'ALBK', id: 926, target: '映'}),
			_Utils_Tuple2(
			927,
			{answer: '弓月田中戈', englishKey: 'NBWLI', id: 927, target: '觸'}),
			_Utils_Tuple2(
			928,
			{answer: '金火月', englishKey: 'CFB', id: 928, target: '銷'}),
			_Utils_Tuple2(
			929,
			{answer: '一月田', englishKey: 'MBW', id: 929, target: '雷'}),
			_Utils_Tuple2(
			930,
			{answer: '戈人人土', englishKey: 'IOOG', id: 930, target: '座'}),
			_Utils_Tuple2(
			931,
			{answer: '卜口土木戈', englishKey: 'YRGDI', id: 931, target: '詩'}),
			_Utils_Tuple2(
			932,
			{answer: '尸十口', englishKey: 'SJR', id: 932, target: '居'}),
			_Utils_Tuple2(
			933,
			{answer: '手竹中人', englishKey: 'QHLO', id: 933, target: '抓'}),
			_Utils_Tuple2(
			934,
			{answer: '一弓卜竹女', englishKey: 'MNYHV', id: 934, target: '裂'}),
			_Utils_Tuple2(
			935,
			{answer: '月心口山', englishKey: 'BPRU', id: 935, target: '胞'}),
			_Utils_Tuple2(
			936,
			{answer: '口竹火木', englishKey: 'RHFD', id: 936, target: '呼'}),
			_Utils_Tuple2(
			937,
			{answer: '女戈日女', englishKey: 'VIAV', id: 937, target: '娘'}),
			_Utils_Tuple2(
			938,
			{answer: '日卜口火', englishKey: 'AYRF', id: 938, target: '景'}),
			_Utils_Tuple2(
			939,
			{answer: '日月月廿', englishKey: 'ABBT', id: 939, target: '盟'}),
			_Utils_Tuple2(
			940,
			{answer: '戈竹一女', englishKey: 'IHMV', id: 940, target: '威'}),
			_Utils_Tuple2(
			941,
			{answer: '日日日', englishKey: 'AAA', id: 941, target: '晶'}),
			_Utils_Tuple2(
			942,
			{answer: '一日弓木', englishKey: 'MAND', id: 942, target: '厚'}),
			_Utils_Tuple2(
			943,
			{answer: '竹人弓大弓', englishKey: 'HONKN', id: 943, target: '衡'}),
			_Utils_Tuple2(
			944,
			{answer: '弓木竹女火', englishKey: 'NDHVF', id: 944, target: '孫'}),
			_Utils_Tuple2(
			945,
			{answer: '弓大竹卜一', englishKey: 'NKHYM', id: 945, target: '延'}),
			_Utils_Tuple2(
			946,
			{answer: '月大人土', englishKey: 'BKOG', id: 946, target: '雞'}),
			_Utils_Tuple2(
			947,
			{answer: '弓一尸山', englishKey: 'NMSU', id: 947, target: '危'}),
			_Utils_Tuple2(
			948,
			{answer: '月尸一竹', englishKey: 'BSMH', id: 948, target: '膠'}),
			_Utils_Tuple2(
			949,
			{answer: '尸一戈土', englishKey: 'SMIG', id: 949, target: '屋'}),
			_Utils_Tuple2(
			950,
			{answer: '女竹戈戈中', englishKey: 'VHIIL', id: 950, target: '鄉'}),
			_Utils_Tuple2(
			951,
			{answer: '水中', englishKey: 'EL', id: 951, target: '沖'}),
			_Utils_Tuple2(
			952,
			{answer: '尸中人口口', englishKey: 'SLORR', id: 952, target: '臨'}),
			_Utils_Tuple2(
			953,
			{answer: '弓中土金土', englishKey: 'NLGCG', id: 953, target: '陸'}),
			_Utils_Tuple2(
			954,
			{answer: '竹土一月金', englishKey: 'HGMBC', id: 954, target: '顧'}),
			_Utils_Tuple2(
			955,
			{answer: '手卜日十', englishKey: 'QYAJ', id: 955, target: '掉'}),
			_Utils_Tuple2(
			956,
			{answer: '口一女竹', englishKey: 'RMVH', id: 956, target: '呀'}),
			_Utils_Tuple2(
			957,
			{answer: '大一弓口', englishKey: 'KMNR', id: 957, target: '奇'}),
			_Utils_Tuple2(
			958,
			{answer: '火弓人廿', englishKey: 'FNOT', id: 958, target: '燈'}),
			_Utils_Tuple2(
			959,
			{answer: '卜一戈竹竹', englishKey: 'YMIHH', id: 959, target: '歲'}),
			_Utils_Tuple2(
			960,
			{answer: '手廿日', englishKey: 'QTA', id: 960, target: '措'}),
			_Utils_Tuple2(
			961,
			{answer: '木中', englishKey: 'DL', id: 961, target: '束'}),
			_Utils_Tuple2(
			962,
			{answer: '一月木戈', englishKey: 'MBDI', id: 962, target: '耐'}),
			_Utils_Tuple2(
			963,
			{answer: '難卜人中弓', englishKey: 'XYOLN', id: 963, target: '劇'}),
			_Utils_Tuple2(
			964,
			{answer: '一土戈', englishKey: 'MGI', id: 964, target: '玉'}),
			_Utils_Tuple2(
			965,
			{answer: '土人火月', englishKey: 'GOFB', id: 965, target: '趙'}),
			_Utils_Tuple2(
			966,
			{answer: '口一中一人', englishKey: 'RMLMO', id: 966, target: '跳'}),
			_Utils_Tuple2(
			967,
			{answer: '一口弓口', englishKey: 'MRNR', id: 967, target: '哥'}),
			_Utils_Tuple2(
			968,
			{answer: '竹木弓木', englishKey: 'HDND', id: 968, target: '季'}),
			_Utils_Tuple2(
			969,
			{answer: '卜口田木', englishKey: 'YRWD', id: 969, target: '課'}),
			_Utils_Tuple2(
			970,
			{answer: '山廿竹弓', englishKey: 'UTHN', id: 970, target: '凱'}),
			_Utils_Tuple2(
			971,
			{answer: '十口一月金', englishKey: 'JRMBC', id: 971, target: '額'}),
			_Utils_Tuple2(
			972,
			{answer: '卜難', englishKey: 'YX', id: 972, target: '齊'}),
			_Utils_Tuple2(
			973,
			{answer: '土火弓人', englishKey: 'GFNO', id: 973, target: '款'}),
			_Utils_Tuple2(
			974,
			{answer: '女火尸竹口', englishKey: 'VFSHR', id: 974, target: '紹'}),
			_Utils_Tuple2(
			975,
			{answer: '人木一手', englishKey: 'ODMQ', id: 975, target: '偉'}),
			_Utils_Tuple2(
			976,
			{answer: '廿弓水火', englishKey: 'TNEF', id: 976, target: '蒸'}),
			_Utils_Tuple2(
			977,
			{answer: '戈弓水', englishKey: 'INE', id: 977, target: '永'}),
			_Utils_Tuple2(
			978,
			{answer: '一弓十月一', englishKey: 'MNJBM', id: 978, target: '殖'}),
			_Utils_Tuple2(
			979,
			{answer: '十一一火', englishKey: 'JMMF', id: 979, target: '宗'}),
			_Utils_Tuple2(
			980,
			{answer: '廿田', englishKey: 'TW', id: 980, target: '苗'}),
			_Utils_Tuple2(
			981,
			{answer: '中中中', englishKey: 'LLL', id: 981, target: '川'}),
			_Utils_Tuple2(
			982,
			{answer: '火卜心廿', englishKey: 'FYPT', id: 982, target: '爐'}),
			_Utils_Tuple2(
			983,
			{answer: '弓一弓戈一', englishKey: 'NMNIM', id: 983, target: '弱'}),
			_Utils_Tuple2(
			984,
			{answer: '木日一竹', englishKey: 'DAMH', id: 984, target: '楊'}),
			_Utils_Tuple2(
			985,
			{answer: '一月人戈戈', englishKey: 'MBOII', id: 985, target: '零'}),
			_Utils_Tuple2(
			986,
			{answer: '手大竹大', englishKey: 'QKHK', id: 986, target: '奏'}),
			_Utils_Tuple2(
			987,
			{answer: '水金口', englishKey: 'ECR', id: 987, target: '沿'}),
			_Utils_Tuple2(
			988,
			{answer: '山一口', englishKey: 'UMR', id: 988, target: '岩'}),
			_Utils_Tuple2(
			989,
			{answer: '手月金木', englishKey: 'QBCD', id: 989, target: '探'}),
			_Utils_Tuple2(
			990,
			{answer: '水月月月', englishKey: 'EBBB', id: 990, target: '滑'}),
			_Utils_Tuple2(
			991,
			{answer: '金十月金', englishKey: 'CJBC', id: 991, target: '鎮'}),
			_Utils_Tuple2(
			992,
			{answer: '人戈竹水', englishKey: 'OIHE', id: 992, target: '飯'}),
			_Utils_Tuple2(
			993,
			{answer: '水廿田女', englishKey: 'ETWV', id: 993, target: '濃'}),
			_Utils_Tuple2(
			994,
			{answer: '竹卜卜竹弓', englishKey: 'HYYHN', id: 994, target: '航'}),
			_Utils_Tuple2(
			995,
			{answer: '心卜田女', englishKey: 'PYWV', id: 995, target: '懷'}),
			_Utils_Tuple2(
			996,
			{answer: '土人日一十', englishKey: 'GOAMJ', id: 996, target: '趕'}),
			_Utils_Tuple2(
			997,
			{answer: '戈十田十', englishKey: 'IJWJ', id: 997, target: '庫'}),
			_Utils_Tuple2(
			998,
			{answer: '大人土戈', englishKey: 'KOGI', id: 998, target: '奪'}),
			_Utils_Tuple2(
			999,
			{answer: '人尸大', englishKey: 'OSK', id: 999, target: '伊'}),
			_Utils_Tuple2(
			1000,
			{answer: '竹木金口山', englishKey: 'HDCRU', id: 1000, target: '稅'}),
			_Utils_Tuple2(
			1001,
			{answer: '一月口口人', englishKey: 'MBRRO', id: 1001, target: '靈'}),
			_Utils_Tuple2(
			1002,
			{answer: '卜人一木', englishKey: 'YOMD', id: 1002, target: '途'}),
			_Utils_Tuple2(
			1003,
			{answer: '水戈竹火', englishKey: 'EIHF', id: 1003, target: '滅'}),
			_Utils_Tuple2(
			1004,
			{answer: '十廿金金', englishKey: 'JTCC', id: 1004, target: '賽'}),
			_Utils_Tuple2(
			1005,
			{answer: '尸竹口', englishKey: 'SHR', id: 1005, target: '召'}),
			_Utils_Tuple2(
			1006,
			{answer: '竹一尸一月', englishKey: 'HMSMB', id: 1006, target: '歸'}),
			_Utils_Tuple2(
			1007,
			{answer: '土廿十水', englishKey: 'GTJE', id: 1007, target: '鼓'}),
			_Utils_Tuple2(
			1008,
			{answer: '手竹木田', englishKey: 'QHDW', id: 1008, target: '播'}),
			_Utils_Tuple2(
			1009,
			{answer: '竹水月廿', englishKey: 'HEBT', id: 1009, target: '盤'}),
			_Utils_Tuple2(
			1010,
			{answer: '十戈卜竹女', englishKey: 'JIYHV', id: 1010, target: '裁'}),
			_Utils_Tuple2(
			1011,
			{answer: '弓中人一人', englishKey: 'NLOMO', id: 1011, target: '險'}),
			_Utils_Tuple2(
			1012,
			{answer: '戈中水', englishKey: 'ILE', id: 1012, target: '康'}),
			_Utils_Tuple2(
			1013,
			{answer: '口人土', englishKey: 'ROG', id: 1013, target: '唯'}),
			_Utils_Tuple2(
			1014,
			{answer: '金女弓水', englishKey: 'CVNE', id: 1014, target: '錄'}),
			_Utils_Tuple2(
			1015,
			{answer: '廿田竹木', englishKey: 'TWHD', id: 1015, target: '菌'}),
			_Utils_Tuple2(
			1016,
			{answer: '女火心山', englishKey: 'VFPU', id: 1016, target: '純'}),
			_Utils_Tuple2(
			1017,
			{answer: '廿土戈廿', englishKey: 'TGIT', id: 1017, target: '蓋'}),
			_Utils_Tuple2(
			1018,
			{answer: '木廿一金', englishKey: 'DTMC', id: 1018, target: '橫'}),
			_Utils_Tuple2(
			1019,
			{answer: '十水女戈火', englishKey: 'JEVIF', id: 1019, target: '繫'}),
			_Utils_Tuple2(
			1020,
			{answer: '竹木戈', englishKey: 'HDI', id: 1020, target: '私'}),
			_Utils_Tuple2(
			1021,
			{answer: '竹人木戈', englishKey: 'HODI', id: 1021, target: '符'}),
			_Utils_Tuple2(
			1022,
			{answer: '女水大尸', englishKey: 'VEKS', id: 1022, target: '努'}),
			_Utils_Tuple2(
			1023,
			{answer: '火月口土', englishKey: 'FBRG', id: 1023, target: '堂'}),
			_Utils_Tuple2(
			1024,
			{answer: '土戈口一', englishKey: 'GIRM', id: 1024, target: '域'}),
			_Utils_Tuple2(
			1025,
			{answer: '火木戈中口', englishKey: 'FDILR', id: 1025, target: '糖'}),
			_Utils_Tuple2(
			1026,
			{answer: '木人戈口', englishKey: 'DOIR', id: 1026, target: '槍'}),
			_Utils_Tuple2(
			1027,
			{answer: '水日弓土', englishKey: 'EANG', id: 1027, target: '潤'}),
			_Utils_Tuple2(
			1028,
			{answer: '中月一口田', englishKey: 'LBMRW', id: 1028, target: '幅'}),
			_Utils_Tuple2(
			1029,
			{answer: '口人一口', englishKey: 'ROMR', id: 1029, target: '哈'}),
			_Utils_Tuple2(
			1030,
			{answer: '卜廿日竹山', englishKey: 'YTAHU', id: 1030, target: '竟'}),
			_Utils_Tuple2(
			1031,
			{answer: '水田中十', englishKey: 'EWLJ', id: 1031, target: '澤'}),
			_Utils_Tuple2(
			1032,
			{answer: '月女女田', englishKey: 'BVVW', id: 1032, target: '腦'}),
			_Utils_Tuple2(
			1033,
			{answer: '土卜口女', englishKey: 'GYRV', id: 1033, target: '壤'}),
			_Utils_Tuple2(
			1034,
			{answer: '一口山大火', englishKey: 'MRUKF', id: 1034, target: '碳'}),
			_Utils_Tuple2(
			1035,
			{answer: '尸口弓人', englishKey: 'SRNO', id: 1035, target: '歐'}),
			_Utils_Tuple2(
			1036,
			{answer: '人月金弓', englishKey: 'OBCN', id: 1036, target: '側'}),
			_Utils_Tuple2(
			1037,
			{answer: '卜竹尸月', englishKey: 'YHSB', id: 1037, target: '遍'}),
			_Utils_Tuple2(
			1038,
			{answer: '十廿金木', englishKey: 'JTCD', id: 1038, target: '寨'}),
			_Utils_Tuple2(
			1039,
			{answer: '一十', englishKey: 'MJ', id: 1039, target: '干'}),
			_Utils_Tuple2(
			1040,
			{answer: '一十人大', englishKey: 'MJOK', id: 1040, target: '敢'}),
			_Utils_Tuple2(
			1041,
			{answer: '竹人卜月大', englishKey: 'HOYBK', id: 1041, target: '徹'}),
			_Utils_Tuple2(
			1042,
			{answer: '一一心', englishKey: 'MMP', id: 1042, target: '惡'}),
			_Utils_Tuple2(
			1043,
			{answer: '卜心田心', englishKey: 'YPWP', id: 1043, target: '慮'}),
			_Utils_Tuple2(
			1044,
			{answer: '人木卜十', englishKey: 'ODYJ', id: 1044, target: '斜'}),
			_Utils_Tuple2(
			1045,
			{answer: '戈弓大土', englishKey: 'INKG', id: 1045, target: '庭'}),
			_Utils_Tuple2(
			1046,
			{answer: '女火人月', englishKey: 'VFOB', id: 1046, target: '納'}),
			_Utils_Tuple2(
			1047,
			{answer: '一木', englishKey: 'MD', id: 1047, target: '于'}),
			_Utils_Tuple2(
			1048,
			{answer: '十廿金土', englishKey: 'JTCG', id: 1048, target: '塞'}),
			_Utils_Tuple2(
			1049,
			{answer: '手竹一中', englishKey: 'QHML', id: 1049, target: '折'}),
			_Utils_Tuple2(
			1050,
			{answer: '人戈尸一口', englishKey: 'OISMR', id: 1050, target: '飼'}),
			_Utils_Tuple2(
			1051,
			{answer: '人中田中', englishKey: 'OLWL', id: 1051, target: '伸'}),
			_Utils_Tuple2(
			1052,
			{answer: '水日女火', englishKey: 'EAVF', id: 1052, target: '濕'}),
			_Utils_Tuple2(
			1053,
			{answer: '十人竹水', englishKey: 'JOHE', id: 1053, target: '麥'}),
			_Utils_Tuple2(
			1054,
			{answer: '廿人一口', englishKey: 'TOMR', id: 1054, target: '荷'}),
			_Utils_Tuple2(
			1055,
			{answer: '日卜廿日', englishKey: 'AYTA', id: 1055, target: '暗'}),
			_Utils_Tuple2(
			1056,
			{answer: '一女弓戈', englishKey: 'MVNI', id: 1056, target: '瓦'}),
			_Utils_Tuple2(
			1057,
			{answer: '戈木', englishKey: 'ID', id: 1057, target: '床'}),
			_Utils_Tuple2(
			1058,
			{answer: '卜一卜', englishKey: 'YMY', id: 1058, target: '卡'}),
			_Utils_Tuple2(
			1059,
			{answer: '竹一弓木', englishKey: 'HMND', id: 1059, target: '築'}),
			_Utils_Tuple2(
			1060,
			{answer: '竹尸', englishKey: 'HS', id: 1060, target: '戶'}),
			_Utils_Tuple2(
			1061,
			{answer: '土廿人口', englishKey: 'GTOR', id: 1061, target: '塔'}),
			_Utils_Tuple2(
			1062,
			{answer: '卜口卜竹尸', englishKey: 'YRYHS', id: 1062, target: '訪'}),
			_Utils_Tuple2(
			1063,
			{answer: '卜竹木尸', englishKey: 'YHDS', id: 1063, target: '透'}),
			_Utils_Tuple2(
			1064,
			{answer: '尸竹', englishKey: 'SH', id: 1064, target: '刀'}),
			_Utils_Tuple2(
			1065,
			{answer: '卜尸人弓人', englishKey: 'YSONO', id: 1065, target: '旋'}),
			_Utils_Tuple2(
			1066,
			{answer: '人廿日', englishKey: 'OTA', id: 1066, target: '借'}),
			_Utils_Tuple2(
			1067,
			{answer: '人弓弓一水', englishKey: 'ONNME', id: 1067, target: '氯'}),
			_Utils_Tuple2(
			1068,
			{answer: '卜田中月', englishKey: 'YWLB', id: 1068, target: '遇'}),
			_Utils_Tuple2(
			1069,
			{answer: '人金尸竹', englishKey: 'OCSH', id: 1069, target: '份'}),
			_Utils_Tuple2(
			1070,
			{answer: '手一田卜戈', englishKey: 'QMWYI', id: 1070, target: '毒'}),
			_Utils_Tuple2(
			1071,
			{answer: '水尸心', englishKey: 'ESP', id: 1071, target: '泥'}),
			_Utils_Tuple2(
			1072,
			{answer: '卜日女', englishKey: 'YAV', id: 1072, target: '退'}),
			_Utils_Tuple2(
			1073,
			{answer: '水竹土山', englishKey: 'EHGU', id: 1073, target: '洗'}),
			_Utils_Tuple2(
			1074,
			{answer: '中戈中戈戈', englishKey: 'LILII', id: 1074, target: '蟲'}),
			_Utils_Tuple2(
			1075,
			{answer: '手田中心', englishKey: 'QWLP', id: 1075, target: '擺'}),
			_Utils_Tuple2(
			1076,
			{answer: '大火', englishKey: 'KF', id: 1076, target: '灰'}),
			_Utils_Tuple2(
			1077,
			{answer: '月木竹竹竹', englishKey: 'BDHHH', id: 1077, target: '彩'}),
			_Utils_Tuple2(
			1078,
			{answer: '土田中金', englishKey: 'GWLC', id: 1078, target: '賣'}),
			_Utils_Tuple2(
			1079,
			{answer: '田火手山', englishKey: 'WFQU', id: 1079, target: '圈'}),
			_Utils_Tuple2(
			1080,
			{answer: '手木竹手山', englishKey: 'QDHQU', id: 1080, target: '耗'}),
			_Utils_Tuple2(
			1081,
			{answer: '一山竹水', englishKey: 'MUHE', id: 1081, target: '夏'}),
			_Utils_Tuple2(
			1082,
			{answer: '手田中十', englishKey: 'QWLJ', id: 1082, target: '擇'}),
			_Utils_Tuple2(
			1083,
			{answer: '心卜女', englishKey: 'PYV', id: 1083, target: '忙'}),
			_Utils_Tuple2(
			1084,
			{answer: '卜月戈大', englishKey: 'YBIK', id: 1084, target: '獻'}),
			_Utils_Tuple2(
			1085,
			{answer: '金月一口', englishKey: 'CBMR', id: 1085, target: '銅'}),
			_Utils_Tuple2(
			1086,
			{answer: '一口一中大', englishKey: 'MRMLK', id: 1086, target: '硬'}),
			_Utils_Tuple2(
			1087,
			{answer: '弓戈弓弓', englishKey: 'NINN', id: 1087, target: '予'}),
			_Utils_Tuple2(
			1088,
			{answer: '火月中弓', englishKey: 'FBLN', id: 1088, target: '削'}),
			_Utils_Tuple2(
			1089,
			{answer: '火手尸山', englishKey: 'FQSU', id: 1089, target: '卷'}),
			_Utils_Tuple2(
			1090,
			{answer: '人大女戈火', englishKey: 'OKVIF', id: 1090, target: '繁'}),
			_Utils_Tuple2(
			1091,
			{answer: '一月尸一', englishKey: 'MBSM', id: 1091, target: '雪'}),
			_Utils_Tuple2(
			1092,
			{answer: '卜中弓金', englishKey: 'YLNC', id: 1092, target: '亦'}),
			_Utils_Tuple2(
			1093,
			{answer: '山弓水', englishKey: 'UNE', id: 1093, target: '函'}),
			_Utils_Tuple2(
			1094,
			{answer: '手中田', englishKey: 'QLW', id: 1094, target: '抽'}),
			_Utils_Tuple2(
			1095,
			{answer: '竹竹尸月', englishKey: 'HHSB', id: 1095, target: '篇'}),
			_Utils_Tuple2(
			1096,
			{answer: '弓中十田十', englishKey: 'NLJWJ', id: 1096, target: '陣'}),
			_Utils_Tuple2(
			1097,
			{answer: '弓中人戈戈', englishKey: 'NLOII', id: 1097, target: '陰'}),
			_Utils_Tuple2(
			1098,
			{answer: '一弓', englishKey: 'MN', id: 1098, target: '丁'}),
			_Utils_Tuple2(
			1099,
			{answer: '尸人', englishKey: 'SO', id: 1099, target: '尺'}),
			_Utils_Tuple2(
			1100,
			{answer: '卜竹口口', englishKey: 'YHRR', id: 1100, target: '追'}),
			_Utils_Tuple2(
			1101,
			{answer: '土人土', englishKey: 'GOG', id: 1101, target: '堆'}),
			_Utils_Tuple2(
			1102,
			{answer: '戈尸月廿', englishKey: 'ISBT', id: 1102, target: '盛'}),
			_Utils_Tuple2(
			1103,
			{answer: '大戈人土', englishKey: 'KIOG', id: 1103, target: '雄'}),
			_Utils_Tuple2(
			1104,
			{answer: '卜竹女中', englishKey: 'YHVL', id: 1104, target: '迎'}),
			_Utils_Tuple2(
			1105,
			{answer: '水竹戈人', englishKey: 'EHIO', id: 1105, target: '泛'}),
			_Utils_Tuple2(
			1106,
			{answer: '木中中女', englishKey: 'DLLV', id: 1106, target: '樓'}),
			_Utils_Tuple2(
			1107,
			{answer: '金大日山', englishKey: 'CKAU', id: 1107, target: '爸'}),
			_Utils_Tuple2(
			1108,
			{answer: '卜尸口十', englishKey: 'YSRJ', id: 1108, target: '避'}),
			_Utils_Tuple2(
			1109,
			{answer: '卜口廿一木', englishKey: 'YRTMD', id: 1109, target: '謀'}),
			_Utils_Tuple2(
			1110,
			{answer: '口心山金', englishKey: 'RPUC', id: 1110, target: '噸'}),
			_Utils_Tuple2(
			1111,
			{answer: '田土弓戈弓', englishKey: 'WGNIN', id: 1111, target: '野'}),
			_Utils_Tuple2(
			1112,
			{answer: '一人十大日', englishKey: 'MOJKA', id: 1112, target: '豬'}),
			_Utils_Tuple2(
			1113,
			{answer: '卜尸人廿金', englishKey: 'YSOTC', id: 1113, target: '旗'}),
			_Utils_Tuple2(
			1114,
			{answer: '人竹尸月', englishKey: 'OHSB', id: 1114, target: '偏'}),
			_Utils_Tuple2(
			1115,
			{answer: '廿月金', englishKey: 'TBC', id: 1115, target: '典'}),
			_Utils_Tuple2(
			1116,
			{answer: '人戈十口口', englishKey: 'OIJRR', id: 1116, target: '館'}),
			_Utils_Tuple2(
			1117,
			{answer: '十月女戈火', englishKey: 'JBVIF', id: 1117, target: '索'}),
			_Utils_Tuple2(
			1118,
			{answer: '手大竹木', englishKey: 'QKHD', id: 1118, target: '秦'}),
			_Utils_Tuple2(
			1119,
			{answer: '月心日', englishKey: 'BPA', id: 1119, target: '脂'}),
			_Utils_Tuple2(
			1120,
			{answer: '水十十月', englishKey: 'EJJB', id: 1120, target: '潮'}),
			_Utils_Tuple2(
			1121,
			{answer: '金大尸十中', englishKey: 'CKSJL', id: 1121, target: '爺'}),
			_Utils_Tuple2(
			1122,
			{answer: '心竹心', englishKey: 'PHP', id: 1122, target: '忽'}),
			_Utils_Tuple2(
			1123,
			{answer: '廿月土', englishKey: 'TBG', id: 1123, target: '塑'}),
			_Utils_Tuple2(
			1124,
			{answer: '卜中一金', englishKey: 'YLMC', id: 1124, target: '遺'}),
			_Utils_Tuple2(
			1125,
			{answer: '木金戈', englishKey: 'DCI', id: 1125, target: '松'}),
			_Utils_Tuple2(
			1126,
			{answer: '田女戈火', englishKey: 'WVIF', id: 1126, target: '累'}),
			_Utils_Tuple2(
			1127,
			{answer: '人一月心', englishKey: 'OMBP', id: 1127, target: '愈'}),
			_Utils_Tuple2(
			1128,
			{answer: '竹十木', englishKey: 'HJD', id: 1128, target: '朱'}),
			_Utils_Tuple2(
			1129,
			{answer: '手人日', englishKey: 'QOA', id: 1129, target: '替'}),
			_Utils_Tuple2(
			1130,
			{answer: '女火人戈一', englishKey: 'VFOIM', id: 1130, target: '纖'}),
			_Utils_Tuple2(
			1131,
			{answer: '一口廿', englishKey: 'MRT', id: 1131, target: '豆'}),
			_Utils_Tuple2(
			1132,
			{answer: '人心一金', englishKey: 'OPMC', id: 1132, target: '傾'}),
			_Utils_Tuple2(
			1133,
			{answer: '火木月一', englishKey: 'FDBM', id: 1133, target: '粗'}),
			_Utils_Tuple2(
			1134,
			{answer: '火月口', englishKey: 'FBR', id: 1134, target: '尚'}),
			_Utils_Tuple2(
			1135,
			{answer: '大弓戈月', englishKey: 'KNIB', id: 1135, target: '痛'}),
			_Utils_Tuple2(
			1136,
			{answer: '木木弓卜人', englishKey: 'DDNYO', id: 1136, target: '楚'}),
			_Utils_Tuple2(
			1137,
			{answer: '廿大尸手火', englishKey: 'TKSQF', id: 1137, target: '驚'}),
			_Utils_Tuple2(
			1138,
			{answer: '尸十土', englishKey: 'SJG', id: 1138, target: '壁'}),
			_Utils_Tuple2(
			1139,
			{answer: '竹人竹土弓', englishKey: 'HOHGN', id: 1139, target: '衝'}),
			_Utils_Tuple2(
			1140,
			{answer: '卜口竹竹戈', englishKey: 'YRHHI', id: 1140, target: '謝'}),
			_Utils_Tuple2(
			1141,
			{answer: '大人土田', englishKey: 'KOGW', id: 1141, target: '奮'}),
			_Utils_Tuple2(
			1142,
			{answer: '月金廿廿月', englishKey: 'BCTTB', id: 1142, target: '購'}),
			_Utils_Tuple2(
			1143,
			{answer: '戈金一口', englishKey: 'ICMR', id: 1143, target: '磨'}),
			_Utils_Tuple2(
			1144,
			{answer: '尸大口', englishKey: 'SKR', id: 1144, target: '君'}),
			_Utils_Tuple2(
			1145,
			{answer: '水心木', englishKey: 'EPD', id: 1145, target: '池'}),
			_Utils_Tuple2(
			1146,
			{answer: '卜月卜竹尸', englishKey: 'YBYHS', id: 1146, target: '旁'}),
			_Utils_Tuple2(
			1147,
			{answer: '一口卜人十', englishKey: 'MRYOJ', id: 1147, target: '碎'}),
			_Utils_Tuple2(
			1148,
			{answer: '月月月', englishKey: 'BBB', id: 1148, target: '骨'}),
			_Utils_Tuple2(
			1149,
			{answer: '竹人山土大', englishKey: 'HOUGK', id: 1149, target: '徵'}),
			_Utils_Tuple2(
			1150,
			{answer: '尸戈月廿', englishKey: 'SIBT', id: 1150, target: '監'}),
			_Utils_Tuple2(
			1151,
			{answer: '手戈十月', englishKey: 'QIJB', id: 1151, target: '捕'}),
			_Utils_Tuple2(
			1152,
			{answer: '金弓中竹', englishKey: 'CNLH', id: 1152, target: '弟'}),
			_Utils_Tuple2(
			1153,
			{answer: '十口月', englishKey: 'JRB', id: 1153, target: '胡'}),
			_Utils_Tuple2(
			1154,
			{answer: '日廿金水', englishKey: 'ATCE', id: 1154, target: '暴'}),
			_Utils_Tuple2(
			1155,
			{answer: '十口中弓', englishKey: 'JRLN', id: 1155, target: '割'}),
			_Utils_Tuple2(
			1156,
			{answer: '一弓竹十木', englishKey: 'MNHJD', id: 1156, target: '殊'}),
			_Utils_Tuple2(
			1157,
			{answer: '田十月山金', englishKey: 'WJBUC', id: 1157, target: '貫'}),
			_Utils_Tuple2(
			1158,
			{answer: '竹木田中十', englishKey: 'HDWLJ', id: 1158, target: '釋'}),
			_Utils_Tuple2(
			1159,
			{answer: '手竹心', englishKey: 'QHP', id: 1159, target: '托'}),
			_Utils_Tuple2(
			1160,
			{answer: '卜口尸一口', englishKey: 'YRSMR', id: 1160, target: '詞'}),
			_Utils_Tuple2(
			1161,
			{answer: '心山一月金', englishKey: 'PUMBC', id: 1161, target: '頓'}),
			_Utils_Tuple2(
			1162,
			{answer: '十一山金', englishKey: 'JMUC', id: 1162, target: '寶'}),
			_Utils_Tuple2(
			1163,
			{answer: '人十', englishKey: 'OJ', id: 1163, target: '午'}),
			_Utils_Tuple2(
			1164,
			{answer: '戈心土', englishKey: 'IPG', id: 1164, target: '塵'}),
			_Utils_Tuple2(
			1165,
			{answer: '日弓尸十', englishKey: 'ANSJ', id: 1165, target: '聞'}),
			_Utils_Tuple2(
			1166,
			{answer: '手日心女', englishKey: 'QAPV', id: 1166, target: '揭'}),
			_Utils_Tuple2(
			1167,
			{answer: '火心口山', englishKey: 'FPRU', id: 1167, target: '炮'}),
			_Utils_Tuple2(
			1168,
			{answer: '一弓戈戈', englishKey: 'MNII', id: 1168, target: '殘'}),
			_Utils_Tuple2(
			1169,
			{answer: '木竹大月', englishKey: 'DHKB', id: 1169, target: '橋'}),
			_Utils_Tuple2(
			1170,
			{answer: '女尸一月', englishKey: 'VSMB', id: 1170, target: '婦'}),
			_Utils_Tuple2(
			1171,
			{answer: '女火十一火', englishKey: 'VFJMF', id: 1171, target: '綜'}),
			_Utils_Tuple2(
			1172,
			{answer: '廿大卜一口', englishKey: 'TKYMR', id: 1172, target: '警'}),
			_Utils_Tuple2(
			1173,
			{answer: '手尸竹口', englishKey: 'QSHR', id: 1173, target: '招'}),
			_Utils_Tuple2(
			1174,
			{answer: '口女弓大', englishKey: 'RVNK', id: 1174, target: '吳'}),
			_Utils_Tuple2(
			1175,
			{answer: '人木戈', englishKey: 'ODI', id: 1175, target: '付'}),
			_Utils_Tuple2(
			1176,
			{answer: '水月弓木', englishKey: 'EBND', id: 1176, target: '浮'}),
			_Utils_Tuple2(
			1177,
			{answer: '卜廿田日', englishKey: 'YTWA', id: 1177, target: '遭'}),
			_Utils_Tuple2(
			1178,
			{answer: '竹人人一木', englishKey: 'HOOMD', id: 1178, target: '徐'}),
			_Utils_Tuple2(
			1179,
			{answer: '竹水卜', englishKey: 'HEY', id: 1179, target: '冬'}),
			_Utils_Tuple2(
			1180,
			{answer: '人火心', englishKey: 'OFP', id: 1180, target: '您'}),
			_Utils_Tuple2(
			1181,
			{answer: '手月人山', englishKey: 'QBOU', id: 1181, target: '搖'}),
			_Utils_Tuple2(
			1182,
			{answer: '金人口', englishKey: 'COR', id: 1182, target: '谷'}),
			_Utils_Tuple2(
			1183,
			{answer: '竹木月山', englishKey: 'HDBU', id: 1183, target: '箱'}),
			_Utils_Tuple2(
			1184,
			{answer: '弓中一口月', englishKey: 'NLMRB', id: 1184, target: '隔'}),
			_Utils_Tuple2(
			1185,
			{answer: '卜口一弓', englishKey: 'YRMN', id: 1185, target: '訂'}),
			_Utils_Tuple2(
			1186,
			{answer: '田大尸', englishKey: 'WKS', id: 1186, target: '男'}),
			_Utils_Tuple2(
			1187,
			{answer: '口弓人', englishKey: 'RNO', id: 1187, target: '吹'}),
			_Utils_Tuple2(
			1188,
			{answer: '田土口女', englishKey: 'WGRV', id: 1188, target: '園'}),
			_Utils_Tuple2(
			1189,
			{answer: '木卜土', englishKey: 'DYG', id: 1189, target: '柱'}),
			_Utils_Tuple2(
			1190,
			{answer: '戈中口', englishKey: 'ILR', id: 1190, target: '唐'}),
			_Utils_Tuple2(
			1191,
			{answer: '女火金尸竹', englishKey: 'VFCSH', id: 1191, target: '紛'}),
			_Utils_Tuple2(
			1192,
			{answer: '月金人大', englishKey: 'BCOK', id: 1192, target: '敗'}),
			_Utils_Tuple2(
			1193,
			{answer: '口卜心月', englishKey: 'RYPB', id: 1193, target: '嘴'}),
			_Utils_Tuple2(
			1194,
			{answer: '十木', englishKey: 'JD', id: 1194, target: '宋'}),
			_Utils_Tuple2(
			1195,
			{answer: '一土木竹水', englishKey: 'MGDHE', id: 1195, target: '玻'}),
			_Utils_Tuple2(
			1196,
			{answer: '尸尸', englishKey: 'SS', id: 1196, target: '巨'}),
			_Utils_Tuple2(
			1197,
			{answer: '手木廿廿', englishKey: 'QDTT', id: 1197, target: '耕'}),
			_Utils_Tuple2(
			1198,
			{answer: '土日一', englishKey: 'GAM', id: 1198, target: '坦'}),
			_Utils_Tuple2(
			1199,
			{answer: '火火月木', englishKey: 'FFBD', id: 1199, target: '榮'}),
			_Utils_Tuple2(
			1200,
			{answer: '水女火弓', englishKey: 'EVFN', id: 1200, target: '灣'}),
			_Utils_Tuple2(
			1201,
			{answer: '日弓木竹', englishKey: 'ANDH', id: 1201, target: '閉'}),
			_Utils_Tuple2(
			1202,
			{answer: '金弓大手', englishKey: 'CNKQ', id: 1202, target: '鍵'}),
			_Utils_Tuple2(
			1203,
			{answer: '女水中弓', englishKey: 'VELN', id: 1203, target: '剝'}),
			_Utils_Tuple2(
			1204,
			{answer: '竹弓戈', englishKey: 'HNI', id: 1204, target: '凡'}),
			_Utils_Tuple2(
			1205,
			{answer: '廿廿金', englishKey: 'TTC', id: 1205, target: '並'}),
			_Utils_Tuple2(
			1206,
			{answer: '尸火卜土', englishKey: 'SFYG', id: 1206, target: '駐'}),
			_Utils_Tuple2(
			1207,
			{answer: '戈水人大', englishKey: 'IEOK', id: 1207, target: '救'}),
			_Utils_Tuple2(
			1208,
			{answer: '金月月口', englishKey: 'CBBR', id: 1208, target: '鍋'}),
			_Utils_Tuple2(
			1209,
			{answer: '田大心', englishKey: 'WKP', id: 1209, target: '恩'}),
			_Utils_Tuple2(
			1210,
			{answer: '戈一心大人', englishKey: 'IMPKO', id: 1210, target: '凝'}),
			_Utils_Tuple2(
			1211,
			{answer: '土戈竹口', englishKey: 'GIHR', id: 1211, target: '堿'}),
			_Utils_Tuple2(
			1212,
			{answer: '卜一山人人', englishKey: 'YMUOO', id: 1212, target: '齒'}),
			_Utils_Tuple2(
			1213,
			{answer: '十戈人土', englishKey: 'JIOG', id: 1213, target: '截'}),
			_Utils_Tuple2(
			1214,
			{answer: '口一卜中金', englishKey: 'RMYLC', id: 1214, target: '跡'}),
			_Utils_Tuple2(
			1215,
			{answer: '戈木木', englishKey: 'IDD', id: 1215, target: '麻'}),
			_Utils_Tuple2(
			1216,
			{answer: '木木一一火', englishKey: 'DDMMF', id: 1216, target: '禁'}),
			_Utils_Tuple2(
			1217,
			{answer: '女火卜竹尸', englishKey: 'VFYHS', id: 1217, target: '紡'}),
			_Utils_Tuple2(
			1218,
			{answer: '戈弓人水', englishKey: 'INOE', id: 1218, target: '廢'}),
			_Utils_Tuple2(
			1219,
			{answer: '中中竹水', englishKey: 'LLHE', id: 1219, target: '版'}),
			_Utils_Tuple2(
			1220,
			{answer: '女火月一水', englishKey: 'VFBME', id: 1220, target: '緩'}),
			_Utils_Tuple2(
			1221,
			{answer: '水月尸木', englishKey: 'EBSD', id: 1221, target: '淨'}),
			_Utils_Tuple2(
			1222,
			{answer: '月山手一月', englishKey: 'BUQMB', id: 1222, target: '睛'}),
			_Utils_Tuple2(
			1223,
			{answer: '日日', englishKey: 'AA', id: 1223, target: '昌'}),
			_Utils_Tuple2(
			1224,
			{answer: '女竹心日', englishKey: 'VHPA', id: 1224, target: '婚'}),
			_Utils_Tuple2(
			1225,
			{answer: '水卜中竹', englishKey: 'EYLH', id: 1225, target: '涉'}),
			_Utils_Tuple2(
			1226,
			{answer: '竹月一口', englishKey: 'HBMR', id: 1226, target: '筒'}),
			_Utils_Tuple2(
			1227,
			{answer: '手竹十難', englishKey: 'QHJX', id: 1227, target: '插'}),
			_Utils_Tuple2(
			1228,
			{answer: '山一一十', englishKey: 'UMMJ', id: 1228, target: '岸'}),
			_Utils_Tuple2(
			1229,
			{answer: '戈戈月', englishKey: 'IIB', id: 1229, target: '朗'}),
			_Utils_Tuple2(
			1230,
			{answer: '廿女一土', englishKey: 'TVMG', id: 1230, target: '莊'}),
			_Utils_Tuple2(
			1231,
			{answer: '竹人土土弓', englishKey: 'HOGGN', id: 1231, target: '街'}),
			_Utils_Tuple2(
			1232,
			{answer: '女十口', englishKey: 'VJR', id: 1232, target: '姑'}),
			_Utils_Tuple2(
			1233,
			{answer: '竹竹月山金', englishKey: 'HHBUC', id: 1233, target: '貿'}),
			_Utils_Tuple2(
			1234,
			{answer: '女水', englishKey: 'VE', id: 1234, target: '奴'}),
			_Utils_Tuple2(
			1235,
			{answer: '火木田火', englishKey: 'FDWF', id: 1235, target: '煉'}),
			_Utils_Tuple2(
			1236,
			{answer: '戈人戈月', englishKey: 'IOIB', id: 1236, target: '腐'}),
			_Utils_Tuple2(
			1237,
			{answer: '口手卜廿', englishKey: 'RQYT', id: 1237, target: '啦'}),
			_Utils_Tuple2(
			1238,
			{answer: '心田十金', englishKey: 'PWJC', id: 1238, target: '慣'}),
			_Utils_Tuple2(
			1239,
			{answer: '竹木中心', englishKey: 'HDLP', id: 1239, target: '乘'}),
			_Utils_Tuple2(
			1240,
			{answer: '心大火', englishKey: 'PKF', id: 1240, target: '恢'}),
			_Utils_Tuple2(
			1241,
			{answer: '心一一', englishKey: 'PMM', id: 1241, target: '勻'}),
			_Utils_Tuple2(
			1242,
			{answer: '水金木', englishKey: 'ECD', id: 1242, target: '梁'}),
			_Utils_Tuple2(
			1243,
			{answer: '女火火竹', englishKey: 'VFFH', id: 1243, target: '紗'}),
			_Utils_Tuple2(
			1244,
			{answer: '卜十卜口十', englishKey: 'YJYRJ', id: 1244, target: '辯'}),
			_Utils_Tuple2(
			1245,
			{answer: '尸十', englishKey: 'SJ', id: 1245, target: '耳'}),
			_Utils_Tuple2(
			1246,
			{answer: '卜弓竹竹竹', englishKey: 'YNHHH', id: 1246, target: '彪'}),
			_Utils_Tuple2(
			1247,
			{answer: '手竹心一', englishKey: 'QHPM', id: 1247, target: '抵'}),
			_Utils_Tuple2(
			1248,
			{answer: '尸中尸中', englishKey: 'SLSL', id: 1248, target: '臣'}),
			_Utils_Tuple2(
			1249,
			{answer: '人卜廿心', englishKey: 'OYTP', id: 1249, target: '億'}),
			_Utils_Tuple2(
			1250,
			{answer: '月竹竹女', englishKey: 'BHHV', id: 1250, target: '脈'}),
			_Utils_Tuple2(
			1251,
			{answer: '一土卜山月', englishKey: 'MGYUB', id: 1251, target: '璃'}),
			_Utils_Tuple2(
			1252,
			{answer: '竹木弓竹尸', englishKey: 'HDNHS', id: 1252, target: '秀'}),
			_Utils_Tuple2(
			1253,
			{answer: '廿弓中一', englishKey: 'TNLM', id: 1253, target: '薩'}),
			_Utils_Tuple2(
			1254,
			{answer: '人竹手戈', englishKey: 'OHQI', id: 1254, target: '俄'}),
			_Utils_Tuple2(
			1255,
			{answer: '女火月廿女', englishKey: 'VFBTV', id: 1255, target: '網'}),
			_Utils_Tuple2(
			1256,
			{answer: '人廿弓戈手', englishKey: 'OTNIQ', id: 1256, target: '舞'}),
			_Utils_Tuple2(
			1257,
			{answer: '戈卜口', englishKey: 'IYR', id: 1257, target: '店'}),
			_Utils_Tuple2(
			1258,
			{answer: '口十廿金', englishKey: 'RJTC', id: 1258, target: '噴'}),
			_Utils_Tuple2(
			1259,
			{answer: '女火竹人人', englishKey: 'VFHOO', id: 1259, target: '縱'}),
			_Utils_Tuple2(
			1260,
			{answer: '木戈', englishKey: 'DI', id: 1260, target: '寸'}),
			_Utils_Tuple2(
			1261,
			{answer: '卜廿田土', englishKey: 'YTWG', id: 1261, target: '童'}),
			_Utils_Tuple2(
			1262,
			{answer: '水一十', englishKey: 'EMJ', id: 1262, target: '汗'}),
			_Utils_Tuple2(
			1263,
			{answer: '水廿金', englishKey: 'ETC', id: 1263, target: '洪'}),
			_Utils_Tuple2(
			1264,
			{answer: '大口月山金', englishKey: 'KRBUC', id: 1264, target: '賀'}),
			_Utils_Tuple2(
			1265,
			{answer: '日弓人', englishKey: 'ANO', id: 1265, target: '閃'}),
			_Utils_Tuple2(
			1266,
			{answer: '手土土卜', englishKey: 'QGGY', id: 1266, target: '掛'}),
			_Utils_Tuple2(
			1267,
			{answer: '木田火', englishKey: 'DWF', id: 1267, target: '柬'}),
			_Utils_Tuple2(
			1268,
			{answer: '火日廿水', englishKey: 'FATE', id: 1268, target: '爆'}),
			_Utils_Tuple2(
			1269,
			{answer: '火大大月', englishKey: 'FKKB', id: 1269, target: '烯'}),
			_Utils_Tuple2(
			1270,
			{answer: '廿十大尸', englishKey: 'TJKS', id: 1270, target: '勒'}),
			_Utils_Tuple2(
			1271,
			{answer: '水中手', englishKey: 'ELQ', id: 1271, target: '津'}),
			_Utils_Tuple2(
			1272,
			{answer: '十十山', englishKey: 'JJU', id: 1272, target: '軋'}),
			_Utils_Tuple2(
			1273,
			{answer: '竹木月竹難', englishKey: 'HDBHX', id: 1273, target: '稻'}),
			_Utils_Tuple2(
			1274,
			{answer: '十十弓人', englishKey: 'JJNO', id: 1274, target: '軟'}),
			_Utils_Tuple2(
			1275,
			{answer: '弓月大尸', englishKey: 'NBKS', id: 1275, target: '勇'}),
			_Utils_Tuple2(
			1276,
			{answer: '人弓日人', englishKey: 'ONAO', id: 1276, target: '像'}),
			_Utils_Tuple2(
			1277,
			{answer: '木一十', englishKey: 'DMJ', id: 1277, target: '杆'}),
			_Utils_Tuple2(
			1278,
			{answer: '一田土', englishKey: 'MWG', id: 1278, target: '厘'}),
			_Utils_Tuple2(
			1279,
			{answer: '水卜金女', englishKey: 'EYCV', id: 1279, target: '滾'}),
			_Utils_Tuple2(
			1280,
			{answer: '廿月一人', englishKey: 'TBMO', id: 1280, target: '蒙'}),
			_Utils_Tuple2(
			1281,
			{answer: '廿卜竹尸', englishKey: 'TYHS', id: 1281, target: '芳'}),
			_Utils_Tuple2(
			1282,
			{answer: '卜一月', englishKey: 'YMB', id: 1282, target: '肯'}),
			_Utils_Tuple2(
			1283,
			{answer: '土木竹水', englishKey: 'GDHE', id: 1283, target: '坡'}),
			_Utils_Tuple2(
			1284,
			{answer: '月卜日女', englishKey: 'BYAV', id: 1284, target: '腿'}),
			_Utils_Tuple2(
			1285,
			{answer: '人廿土戈', englishKey: 'OTGI', id: 1285, target: '儀'}),
			_Utils_Tuple2(
			1286,
			{answer: '卜尸人竹女', englishKey: 'YSOHV', id: 1286, target: '旅'}),
			_Utils_Tuple2(
			1287,
			{answer: '尸竹手山', englishKey: 'SHQU', id: 1287, target: '尾'}),
			_Utils_Tuple2(
			1288,
			{answer: '人火', englishKey: 'OF', id: 1288, target: '伙'}),
			_Utils_Tuple2(
			1289,
			{answer: '廿水日竹', englishKey: 'TEAH', id: 1289, target: '蕩'}),
			_Utils_Tuple2(
			1290,
			{answer: '戈一水', englishKey: 'IME', id: 1290, target: '冰'}),
			_Utils_Tuple2(
			1291,
			{answer: '一月山金', englishKey: 'MBUC', id: 1291, target: '貢'}),
			_Utils_Tuple2(
			1292,
			{answer: '弓人一口廿', englishKey: 'NOMRT', id: 1292, target: '登'}),
			_Utils_Tuple2(
			1293,
			{answer: '竹竹人水', englishKey: 'HHOE', id: 1293, target: '黎'}),
			_Utils_Tuple2(
			1294,
			{answer: '金竹山金', englishKey: 'CHUC', id: 1294, target: '鑽'}),
			_Utils_Tuple2(
			1295,
			{answer: '竹木心竹', englishKey: 'HDPH', id: 1295, target: '秘'}),
			_Utils_Tuple2(
			1296,
			{answer: '卜中一人', englishKey: 'YLMO', id: 1296, target: '逃'}),
			_Utils_Tuple2(
			1297,
			{answer: '弓中卜廿十', englishKey: 'NLYTJ', id: 1297, target: '障'}),
			_Utils_Tuple2(
			1298,
			{answer: '人弓十女', englishKey: 'ONJV', id: 1298, target: '氨'}),
			_Utils_Tuple2(
			1299,
			{answer: '水日一竹', englishKey: 'EAMH', id: 1299, target: '湯'}),
			_Utils_Tuple2(
			1300,
			{answer: '卜木弓中', englishKey: 'YDNL', id: 1300, target: '郭'}),
			_Utils_Tuple2(
			1301,
			{answer: '卜女', englishKey: 'YV', id: 1301, target: '亡'}),
			_Utils_Tuple2(
			1302,
			{answer: '山竹水十', englishKey: 'UHEJ', id: 1302, target: '峰'}),
			_Utils_Tuple2(
			1303,
			{answer: '火大中月', englishKey: 'FKLB', id: 1303, target: '幣'}),
			_Utils_Tuple2(
			1304,
			{answer: '水廿金山', englishKey: 'ETCU', id: 1304, target: '港'}),
			_Utils_Tuple2(
			1305,
			{answer: '人戈大', englishKey: 'OIK', id: 1305, target: '伏'}),
			_Utils_Tuple2(
			1306,
			{answer: '廿田中弓', englishKey: 'TWLN', id: 1306, target: '夢'}),
			_Utils_Tuple2(
			1307,
			{answer: '卜田弓人', englishKey: 'YWNO', id: 1307, target: '畝'}),
			_Utils_Tuple2(
			1308,
			{answer: '十十大弓', englishKey: 'JJKN', id: 1308, target: '軌'}),
			_Utils_Tuple2(
			1309,
			{answer: '田廿十', englishKey: 'WTJ', id: 1309, target: '畢'}),
			_Utils_Tuple2(
			1310,
			{answer: '手十月火', englishKey: 'QJBF', id: 1310, target: '擦'}),
			_Utils_Tuple2(
			1311,
			{answer: '廿日大', englishKey: 'TAK', id: 1311, target: '莫'}),
			_Utils_Tuple2(
			1312,
			{answer: '木月中弓', englishKey: 'DBLN', id: 1312, target: '刺'}),
			_Utils_Tuple2(
			1313,
			{answer: '水戈日女', englishKey: 'EIAV', id: 1313, target: '浪'}),
			_Utils_Tuple2(
			1314,
			{answer: '手月一水', englishKey: 'QBME', id: 1314, target: '援'}),
			_Utils_Tuple2(
			1315,
			{answer: '木竹十木', englishKey: 'DHJD', id: 1315, target: '株'}),
			_Utils_Tuple2(
			1316,
			{answer: '人弓大手', englishKey: 'ONKQ', id: 1316, target: '健'}),
			_Utils_Tuple2(
			1317,
			{answer: '人土口', englishKey: 'OGR', id: 1317, target: '售'}),
			_Utils_Tuple2(
			1318,
			{answer: '月竹弓水', englishKey: 'BHNE', id: 1318, target: '股'}),
			_Utils_Tuple2(
			1319,
			{answer: '月木', englishKey: 'BD', id: 1319, target: '采'}),
			_Utils_Tuple2(
			1320,
			{answer: '竹日卜山', englishKey: 'HAYU', id: 1320, target: '島'}),
			_Utils_Tuple2(
			1321,
			{answer: '水心口山', englishKey: 'EPRU', id: 1321, target: '泡'}),
			_Utils_Tuple2(
			1322,
			{answer: '廿一', englishKey: 'TM', id: 1322, target: '甘'}),
			_Utils_Tuple2(
			1323,
			{answer: '月山竹十一', englishKey: 'BUHJM', id: 1323, target: '睡'}),
			_Utils_Tuple2(
			1324,
			{answer: '金土弓戈', englishKey: 'CGNI', id: 1324, target: '鑄'}),
			_Utils_Tuple2(
			1325,
			{answer: '人木', englishKey: 'OD', id: 1325, target: '休'}),
			_Utils_Tuple2(
			1326,
			{answer: '日弓人戈', englishKey: 'ANOI', id: 1326, target: '閥'}),
			_Utils_Tuple2(
			1327,
			{answer: '竹手人大', englishKey: 'HQOK', id: 1327, target: '牧'}),
			_Utils_Tuple2(
			1328,
			{answer: '女火土土山', englishKey: 'VFGGU', id: 1328, target: '繞'}),
			_Utils_Tuple2(
			1329,
			{answer: '手中口', englishKey: 'QLR', id: 1329, target: '哲'}),
			_Utils_Tuple2(
			1330,
			{answer: '火人尸', englishKey: 'FOS', id: 1330, target: '炸'}),
			_Utils_Tuple2(
			1331,
			{answer: '一口火木手', englishKey: 'MRFDQ', id: 1331, target: '磷'}),
			_Utils_Tuple2(
			1332,
			{answer: '月月', englishKey: 'BB', id: 1332, target: '朋'}),
			_Utils_Tuple2(
			1333,
			{answer: '女火手一金', englishKey: 'VFQMC', id: 1333, target: '績'}),
			_Utils_Tuple2(
			1334,
			{answer: '水火火', englishKey: 'EFF', id: 1334, target: '淡'}),
			_Utils_Tuple2(
			1335,
			{answer: '竹口人大', englishKey: 'HROK', id: 1335, target: '啟'}),
			_Utils_Tuple2(
			1336,
			{answer: '火大', englishKey: 'FK', id: 1336, target: '尖'}),
			_Utils_Tuple2(
			1337,
			{answer: '弓中弓竹難', englishKey: 'NLNHX', id: 1337, target: '陷'}),
			_Utils_Tuple2(
			1338,
			{answer: '卜心木', englishKey: 'YPD', id: 1338, target: '柴'}),
			_Utils_Tuple2(
			1339,
			{answer: '口竹土', englishKey: 'RHG', id: 1339, target: '呈'}),
			_Utils_Tuple2(
			1340,
			{answer: '竹人土卜人', englishKey: 'HOGYO', id: 1340, target: '徒'}),
			_Utils_Tuple2(
			1341,
			{answer: '難卜竹一月', englishKey: 'XYHMB', id: 1341, target: '顏'}),
			_Utils_Tuple2(
			1342,
			{answer: '水竹尸大', englishKey: 'EHSK', id: 1342, target: '淚'}),
			_Utils_Tuple2(
			1343,
			{answer: '竹木火月', englishKey: 'HDFB', id: 1343, target: '稍'}),
			_Utils_Tuple2(
			1344,
			{answer: '卜女心', englishKey: 'YVP', id: 1344, target: '忘'}),
			_Utils_Tuple2(
			1345,
			{answer: '手山', englishKey: 'QU', id: 1345, target: '扎'}),
			_Utils_Tuple2(
			1346,
			{answer: '一口水', englishKey: 'MRE', id: 1346, target: '泵'}),
			_Utils_Tuple2(
			1347,
			{answer: '廿尸戈廿', englishKey: 'TSIT', id: 1347, target: '藍'}),
			_Utils_Tuple2(
			1348,
			{answer: '手人心木', englishKey: 'QOPD', id: 1348, target: '拖'}),
			_Utils_Tuple2(
			1349,
			{answer: '水月一口', englishKey: 'EBMR', id: 1349, target: '洞'}),
			_Utils_Tuple2(
			1350,
			{answer: '一土廿', englishKey: 'MGT', id: 1350, target: '弄'}),
			_Utils_Tuple2(
			1351,
			{answer: '手月月水', englishKey: 'QBBE', id: 1351, target: '授'}),
			_Utils_Tuple2(
			1352,
			{answer: '金卜廿山', englishKey: 'CYTU', id: 1352, target: '鏡'}),
			_Utils_Tuple2(
			1353,
			{answer: '土戈十月', englishKey: 'GIJB', id: 1353, target: '埔'}),
			_Utils_Tuple2(
			1354,
			{answer: '女一土', englishKey: 'VMG', id: 1354, target: '壯'}),
			_Utils_Tuple2(
			1355,
			{answer: '卜廿十', englishKey: 'YTJ', id: 1355, target: '辛'}),
			_Utils_Tuple2(
			1356,
			{answer: '金竹水十', englishKey: 'CHEJ', id: 1356, target: '鋒'}),
			_Utils_Tuple2(
			1357,
			{answer: '卜心廿一', englishKey: 'YPTM', id: 1357, target: '虛'}),
			_Utils_Tuple2(
			1358,
			{answer: '金尸竹金', englishKey: 'CSHC', id: 1358, target: '貧'}),
			_Utils_Tuple2(
			1359,
			{answer: '人中中弓', englishKey: 'OLLN', id: 1359, target: '佛'}),
			_Utils_Tuple2(
			1360,
			{answer: '女火弓', englishKey: 'VFN', id: 1360, target: '彎'}),
			_Utils_Tuple2(
			1361,
			{answer: '戈金手', englishKey: 'ICQ', id: 1361, target: '摩'}),
			_Utils_Tuple2(
			1362,
			{answer: '手大水', englishKey: 'QKE', id: 1362, target: '泰'}),
			_Utils_Tuple2(
			1363,
			{answer: '尸水人土', englishKey: 'SEOG', id: 1363, target: '匯'}),
			_Utils_Tuple2(
			1364,
			{answer: '女戈大尸', englishKey: 'VIKS', id: 1364, target: '幼'}),
			_Utils_Tuple2(
			1365,
			{answer: '廿田木戈', englishKey: 'TWDI', id: 1365, target: '尊'}),
			_Utils_Tuple2(
			1366,
			{answer: '弓大竹土', englishKey: 'NKHG', id: 1366, target: '廷'}),
			_Utils_Tuple2(
			1367,
			{answer: '十金竹田水', englishKey: 'JCHWE', id: 1367, target: '窗'}),
			_Utils_Tuple2(
			1368,
			{answer: '女火月廿山', englishKey: 'VFBTU', id: 1368, target: '綱'}),
			_Utils_Tuple2(
			1369,
			{answer: '竹女心', englishKey: 'HVP', id: 1369, target: '氏'}),
			_Utils_Tuple2(
			1370,
			{answer: '木火中水', englishKey: 'DFLE', id: 1370, target: '隸'}),
			_Utils_Tuple2(
			1371,
			{answer: '心大弓戈人', englishKey: 'PKNIO', id: 1371, target: '疑'}),
			_Utils_Tuple2(
			1372,
			{answer: '十口竹口', englishKey: 'JRHR', id: 1372, target: '宮'}),
			_Utils_Tuple2(
			1373,
			{answer: '女月一', englishKey: 'VBM', id: 1373, target: '姐'}),
			_Utils_Tuple2(
			1374,
			{answer: '一月一一女', englishKey: 'MBMMV', id: 1374, target: '震'}),
			_Utils_Tuple2(
			1375,
			{answer: '一土山一月', englishKey: 'MGUMB', id: 1375, target: '瑞'}),
			_Utils_Tuple2(
			1376,
			{answer: '心水土', englishKey: 'PEG', id: 1376, target: '怪'}),
			_Utils_Tuple2(
			1377,
			{answer: '戈大山', englishKey: 'IKU', id: 1377, target: '尤'}),
			_Utils_Tuple2(
			1378,
			{answer: '大人人', englishKey: 'KOO', id: 1378, target: '夾'}),
			_Utils_Tuple2(
			1379,
			{answer: '竹人竹十山', englishKey: 'HOHJU', id: 1379, target: '循'}),
			_Utils_Tuple2(
			1380,
			{answer: '一土人戈弓', englishKey: 'MGOIN', id: 1380, target: '琴'}),
			_Utils_Tuple2(
			1381,
			{answer: '手廿田', englishKey: 'QTW', id: 1381, target: '描'}),
			_Utils_Tuple2(
			1382,
			{answer: '月廿日大', englishKey: 'BTAK', id: 1382, target: '膜'}),
			_Utils_Tuple2(
			1383,
			{answer: '卜木一手', englishKey: 'YDMQ', id: 1383, target: '違'}),
			_Utils_Tuple2(
			1384,
			{answer: '一土竹十木', englishKey: 'MGHJD', id: 1384, target: '珠'}),
			_Utils_Tuple2(
			1385,
			{answer: '女火女弓人', englishKey: 'VFVNO', id: 1385, target: '緣'}),
			_Utils_Tuple2(
			1386,
			{answer: '月一田女', englishKey: 'BMWV', id: 1386, target: '腰'}),
			_Utils_Tuple2(
			1387,
			{answer: '木十水', englishKey: 'DJE', id: 1387, target: '枝'}),
			_Utils_Tuple2(
			1388,
			{answer: '木木木', englishKey: 'DDD', id: 1388, target: '森'}),
			_Utils_Tuple2(
			1389,
			{answer: '十金竹竹弓', englishKey: 'JCHHN', id: 1389, target: '窮'}),
			_Utils_Tuple2(
			1390,
			{answer: '竹', englishKey: 'H', id: 1390, target: '竹'}),
			_Utils_Tuple2(
			1391,
			{answer: '水廿廿月', englishKey: 'ETTB', id: 1391, target: '溝'}),
			_Utils_Tuple2(
			1392,
			{answer: '人山人土', englishKey: 'OUOG', id: 1392, target: '催'}),
			_Utils_Tuple2(
			1393,
			{answer: '心卜廿心', englishKey: 'PYTP', id: 1393, target: '憶'}),
			_Utils_Tuple2(
			1394,
			{answer: '女火口難山', englishKey: 'VFRXU', id: 1394, target: '繩'}),
			_Utils_Tuple2(
			1395,
			{answer: '手十弓中', englishKey: 'QJNL', id: 1395, target: '邦'}),
			_Utils_Tuple2(
			1396,
			{answer: '竹心中弓', englishKey: 'HPLN', id: 1396, target: '剩'}),
			_Utils_Tuple2(
			1397,
			{answer: '木日弓田', englishKey: 'DANW', id: 1397, target: '欄'}),
			_Utils_Tuple2(
			1398,
			{answer: '女戈水', englishKey: 'VIE', id: 1398, target: '漿'}),
			_Utils_Tuple2(
			1399,
			{answer: '手卜女土', englishKey: 'QYVG', id: 1399, target: '擁'}),
			_Utils_Tuple2(
			1400,
			{answer: '一女木竹', englishKey: 'MVDH', id: 1400, target: '牙'}),
			_Utils_Tuple2(
			1401,
			{answer: '月金十一弓', englishKey: 'BCJMN', id: 1401, target: '貯'}),
			_Utils_Tuple2(
			1402,
			{answer: '戈火廿田廿', englishKey: 'IFTWT', id: 1402, target: '禮'}),
			_Utils_Tuple2(
			1403,
			{answer: '水卜心心', englishKey: 'EYPP', id: 1403, target: '濾'}),
			_Utils_Tuple2(
			1404,
			{answer: '金人月', englishKey: 'COB', id: 1404, target: '鈉'}),
			_Utils_Tuple2(
			1405,
			{answer: '女火卜大', englishKey: 'VFYK', id: 1405, target: '紋'}),
			_Utils_Tuple2(
			1406,
			{answer: '口竹月山', englishKey: 'RHBU', id: 1406, target: '咱'}),
			_Utils_Tuple2(
			1407,
			{answer: '手竹日', englishKey: 'QHA', id: 1407, target: '拍'}),
			_Utils_Tuple2(
			1408,
			{answer: '田中戈月心', englishKey: 'WLIBP', id: 1408, target: '罷'}),
			_Utils_Tuple2(
			1409,
			{answer: '土廿十', englishKey: 'GTJ', id: 1409, target: '幸'}),
			_Utils_Tuple2(
			1410,
			{answer: '口戈竹口', englishKey: 'RIHR', id: 1410, target: '喊'}),
			_Utils_Tuple2(
			1411,
			{answer: '中中田', englishKey: 'LLW', id: 1411, target: '袖'}),
			_Utils_Tuple2(
			1412,
			{answer: '土戈人大', englishKey: 'GIOK', id: 1412, target: '埃'}),
			_Utils_Tuple2(
			1413,
			{answer: '廿一大尸', englishKey: 'TMKS', id: 1413, target: '勤'}),
			_Utils_Tuple2(
			1414,
			{answer: '人土火', englishKey: 'OGF', id: 1414, target: '焦'}),
			_Utils_Tuple2(
			1415,
			{answer: '田中卜口弓', englishKey: 'WLYRN', id: 1415, target: '罰'}),
			_Utils_Tuple2(
			1416,
			{answer: '人一木一', englishKey: 'OMDM', id: 1416, target: '伍'}),
			_Utils_Tuple2(
			1417,
			{answer: '水一山日', englishKey: 'EMUA', id: 1417, target: '潛'}),
			_Utils_Tuple2(
			1418,
			{answer: '田土火土', englishKey: 'WGFG', id: 1418, target: '墨'}),
			_Utils_Tuple2(
			1419,
			{answer: '女火卜竹十', englishKey: 'VFYHJ', id: 1419, target: '縫'}),
			_Utils_Tuple2(
			1420,
			{answer: '女竹手一', englishKey: 'VHQM', id: 1420, target: '姓'}),
			_Utils_Tuple2(
			1421,
			{answer: '一十中弓', englishKey: 'MJLN', id: 1421, target: '刊'}),
			_Utils_Tuple2(
			1422,
			{answer: '卜女戈田', englishKey: 'YVIW', id: 1422, target: '畜'}),
			_Utils_Tuple2(
			1423,
			{answer: '人戈心口山', englishKey: 'OIPRU', id: 1423, target: '飽'}),
			_Utils_Tuple2(
			1424,
			{answer: '女戈戈大', englishKey: 'VIIK', id: 1424, target: '獎'}),
			_Utils_Tuple2(
			1425,
			{answer: '金口竹口', englishKey: 'CRHR', id: 1425, target: '鋁'}),
			_Utils_Tuple2(
			1426,
			{answer: '人一木', englishKey: 'OMD', id: 1426, target: '余'}),
			_Utils_Tuple2(
			1427,
			{answer: '竹山戈', englishKey: 'HUI', id: 1427, target: '鬼'}),
			_Utils_Tuple2(
			1428,
			{answer: '一一月月心', englishKey: 'MMBBP', id: 1428, target: '麗'}),
			_Utils_Tuple2(
			1429,
			{answer: '手十金弓', englishKey: 'QJCN', id: 1429, target: '挖'}),
			_Utils_Tuple2(
			1430,
			{answer: '口一大一尸', englishKey: 'RMKMS', id: 1430, target: '跨'}),
			_Utils_Tuple2(
			1431,
			{answer: '田火戈大', englishKey: 'WFIK', id: 1431, target: '默'}),
			_Utils_Tuple2(
			1432,
			{answer: '金卜十十', englishKey: 'CYJJ', id: 1432, target: '鏈'}),
			_Utils_Tuple2(
			1433,
			{answer: '人卜竹尸', englishKey: 'OYHS', id: 1433, target: '仿'}),
			_Utils_Tuple2(
			1434,
			{answer: '手尸一月', englishKey: 'QSMB', id: 1434, target: '掃'}),
			_Utils_Tuple2(
			1435,
			{answer: '口日心女', englishKey: 'RAPV', id: 1435, target: '喝'}),
			_Utils_Tuple2(
			1436,
			{answer: '人心卜竹女', englishKey: 'OPYHV', id: 1436, target: '袋'}),
			_Utils_Tuple2(
			1437,
			{answer: '土弓竹弓水', englishKey: 'GNHNE', id: 1437, target: '殼'}),
			_Utils_Tuple2(
			1438,
			{answer: '山大火', englishKey: 'UKF', id: 1438, target: '炭'}),
			_Utils_Tuple2(
			1439,
			{answer: '廿日大月', englishKey: 'TAKB', id: 1439, target: '幕'}),
			_Utils_Tuple2(
			1440,
			{answer: '卜口十大日', englishKey: 'YRJKA', id: 1440, target: '諸'}),
			_Utils_Tuple2(
			1441,
			{answer: '弓竹女人', englishKey: 'NHVO', id: 1441, target: '弧'}),
			_Utils_Tuple2(
			1442,
			{answer: '水一一尸', englishKey: 'EMMS', id: 1442, target: '污'}),
			_Utils_Tuple2(
			1443,
			{answer: '一月大尸', englishKey: 'MBKS', id: 1443, target: '勵'}),
			_Utils_Tuple2(
			1444,
			{answer: '木人田卜', englishKey: 'DOWY', id: 1444, target: '梅'}),
			_Utils_Tuple2(
			1445,
			{answer: '女弓竹尸', englishKey: 'VNHS', id: 1445, target: '奶'}),
			_Utils_Tuple2(
			1446,
			{answer: '水手竹火', englishKey: 'EQHF', id: 1446, target: '潔'}),
			_Utils_Tuple2(
			1447,
			{answer: '女女火', englishKey: 'VVF', id: 1447, target: '災'}),
			_Utils_Tuple2(
			1448,
			{answer: '竹月卜戈', englishKey: 'HBYI', id: 1448, target: '舟'}),
			_Utils_Tuple2(
			1449,
			{answer: '尸田金', englishKey: 'SWC', id: 1449, target: '鑒'}),
			_Utils_Tuple2(
			1450,
			{answer: '廿木一', englishKey: 'TDM', id: 1450, target: '苯'}),
			_Utils_Tuple2(
			1451,
			{answer: '卜口金戈', englishKey: 'YRCI', id: 1451, target: '訟'}),
			_Utils_Tuple2(
			1452,
			{answer: '手心口山', englishKey: 'QPRU', id: 1452, target: '抱'}),
			_Utils_Tuple2(
			1453,
			{answer: '竹土竹弓水', englishKey: 'HGHNE', id: 1453, target: '毀'}),
			_Utils_Tuple2(
			1454,
			{answer: '心廿竹土', englishKey: 'PTHG', id: 1454, target: '懂'}),
			_Utils_Tuple2(
			1455,
			{answer: '十廿金卜', englishKey: 'JTCY', id: 1455, target: '寒'}),
			_Utils_Tuple2(
			1456,
			{answer: '人口日', englishKey: 'ORA', id: 1456, target: '智'}),
			_Utils_Tuple2(
			1457,
			{answer: '十大一口', englishKey: 'JKMR', id: 1457, target: '寄'}),
			_Utils_Tuple2(
			1458,
			{answer: '尸山土', englishKey: 'SUG', id: 1458, target: '屆'}),
			_Utils_Tuple2(
			1459,
			{answer: '口一尸一土', englishKey: 'RMSMG', id: 1459, target: '躍'}),
			_Utils_Tuple2(
			1460,
			{answer: '手中一人', englishKey: 'QLMO', id: 1460, target: '挑'}),
			_Utils_Tuple2(
			1461,
			{answer: '水戈廿水', englishKey: 'EITE', id: 1461, target: '渡'}),
			_Utils_Tuple2(
			1462,
			{answer: '月卜', englishKey: 'BY', id: 1462, target: '丹'}),
			_Utils_Tuple2(
			1463,
			{answer: '廿人日女', englishKey: 'TOAV', id: 1463, target: '艱'}),
			_Utils_Tuple2(
			1464,
			{answer: '月山金', englishKey: 'BUC', id: 1464, target: '貝'}),
			_Utils_Tuple2(
			1465,
			{answer: '手戈大水', englishKey: 'QIKE', id: 1465, target: '拔'}),
			_Utils_Tuple2(
			1466,
			{answer: '金大弓戈弓', englishKey: 'CKNIN', id: 1466, target: '爹'}),
			_Utils_Tuple2(
			1467,
			{answer: '十戈田廿金', englishKey: 'JIWTC', id: 1467, target: '戴'}),
			_Utils_Tuple2(
			1468,
			{answer: '一口尸手火', englishKey: 'MRSQF', id: 1468, target: '碼'}),
			_Utils_Tuple2(
			1469,
			{answer: '廿一女竹', englishKey: 'TMVH', id: 1469, target: '芽'}),
			_Utils_Tuple2(
			1470,
			{answer: '一口廿廿金', englishKey: 'MRTTC', id: 1470, target: '碰'}),
			_Utils_Tuple2(
			1471,
			{answer: '土中弓金', englishKey: 'GLNC', id: 1471, target: '赤'}),
			_Utils_Tuple2(
			1472,
			{answer: '水弓田火', englishKey: 'ENWF', id: 1472, target: '漁'}),
			_Utils_Tuple2(
			1473,
			{answer: '口口戈大', englishKey: 'RRIK', id: 1473, target: '哭'}),
			_Utils_Tuple2(
			1474,
			{answer: '金金口', englishKey: 'CCR', id: 1474, target: '鉛'}),
			_Utils_Tuple2(
			1475,
			{answer: '廿口人大', englishKey: 'TROK', id: 1475, target: '敬'}),
			_Utils_Tuple2(
			1476,
			{answer: '田木一月金', englishKey: 'WDMBC', id: 1476, target: '顆'}),
			_Utils_Tuple2(
			1477,
			{answer: '大十廿', englishKey: 'KJT', id: 1477, target: '奔'}),
			_Utils_Tuple2(
			1478,
			{answer: '金口弓人', englishKey: 'CRNO', id: 1478, target: '欲'}),
			_Utils_Tuple2(
			1479,
			{answer: '人中', englishKey: 'OL', id: 1479, target: '仲'}),
			_Utils_Tuple2(
			1480,
			{answer: '木一弓口', englishKey: 'DMNR', id: 1480, target: '柯'}),
			_Utils_Tuple2(
			1481,
			{answer: '竹木大大月', englishKey: 'HDKKB', id: 1481, target: '稀'}),
			_Utils_Tuple2(
			1482,
			{answer: '卜心竹弓', englishKey: 'YPHN', id: 1482, target: '虎'}),
			_Utils_Tuple2(
			1483,
			{answer: '女十木', englishKey: 'VJD', id: 1483, target: '妹'}),
			_Utils_Tuple2(
			1484,
			{answer: '竹戈弓人', englishKey: 'HINO', id: 1484, target: '乏'}),
			_Utils_Tuple2(
			1485,
			{answer: '一土人竹竹', englishKey: 'MGOHH', id: 1485, target: '珍'}),
			_Utils_Tuple2(
			1486,
			{answer: '卜日木', englishKey: 'YAD', id: 1486, target: '桌'}),
			_Utils_Tuple2(
			1487,
			{answer: '中田中', englishKey: 'LWL', id: 1487, target: '申'}),
			_Utils_Tuple2(
			1488,
			{answer: '卜廿田戈', englishKey: 'YTWI', id: 1488, target: '遵'}),
			_Utils_Tuple2(
			1489,
			{answer: '戈竹山', englishKey: 'IHU', id: 1489, target: '允'}),
			_Utils_Tuple2(
			1490,
			{answer: '中戈田女火', englishKey: 'LIWVF', id: 1490, target: '螺'}),
			_Utils_Tuple2(
			1491,
			{answer: '弓中竹水一', englishKey: 'NLHEM', id: 1491, target: '隆'}),
			_Utils_Tuple2(
			1492,
			{answer: '人戈日口', englishKey: 'OIAR', id: 1492, target: '倉'}),
			_Utils_Tuple2(
			1493,
			{answer: '竹女竹山戈', englishKey: 'HVHUI', id: 1493, target: '魏'}),
			_Utils_Tuple2(
			1494,
			{answer: '日土土山', englishKey: 'AGGU', id: 1494, target: '曉'}),
			_Utils_Tuple2(
			1495,
			{answer: '金金口山', englishKey: 'CCRU', id: 1495, target: '銳'}),
			_Utils_Tuple2(
			1496,
			{answer: '竹人一卜一', englishKey: 'HOMYM', id: 1496, target: '征'}),
			_Utils_Tuple2(
			1497,
			{answer: '廿難金', englishKey: 'TXC', id: 1497, target: '兼'}),
			_Utils_Tuple2(
			1498,
			{answer: '人弓火火', englishKey: 'ONFF', id: 1498, target: '氮'}),
			_Utils_Tuple2(
			1499,
			{answer: '弓中月一心', englishKey: 'NLBMP', id: 1499, target: '隱'}),
			_Utils_Tuple2(
			1500,
			{answer: '女一土人田', englishKey: 'VMGOW', id: 1500, target: '牆'}),
			_Utils_Tuple2(
			1501,
			{answer: '一口心大人', englishKey: 'MRPKO', id: 1501, target: '礙'}),
			_Utils_Tuple2(
			1502,
			{answer: '土金土中金', englishKey: 'GCGLC', id: 1502, target: '赫'}),
			_Utils_Tuple2(
			1503,
			{answer: '中心', englishKey: 'LP', id: 1503, target: '忠'}),
			_Utils_Tuple2(
			1504,
			{answer: '手弓人水', englishKey: 'QNOE', id: 1504, target: '撥'}),
			_Utils_Tuple2(
			1505,
			{answer: '戈一人土', englishKey: 'IMOG', id: 1505, target: '准'}),
			_Utils_Tuple2(
			1506,
			{answer: '中難', englishKey: 'LX', id: 1506, target: '肅'}),
			_Utils_Tuple2(
			1507,
			{answer: '人山一', englishKey: 'OUM', id: 1507, target: '缸'}),
			_Utils_Tuple2(
			1508,
			{answer: '手人戈口', englishKey: 'QOIR', id: 1508, target: '搶'}),
			_Utils_Tuple2(
			1509,
			{answer: '卜女月手', englishKey: 'YVBQ', id: 1509, target: '牽'}),
			_Utils_Tuple2(
			1510,
			{answer: '十戈月戈', englishKey: 'JIBI', id: 1510, target: '博'}),
			_Utils_Tuple2(
			1511,
			{answer: '一一女尸', englishKey: 'MMVS', id: 1511, target: '巧'}),
			_Utils_Tuple2(
			1512,
			{answer: '口竹山', englishKey: 'RHU', id: 1512, target: '兄'}),
			_Utils_Tuple2(
			1513,
			{answer: '木土', englishKey: 'DG', id: 1513, target: '杜'}),
			_Utils_Tuple2(
			1514,
			{answer: '卜口弓十', englishKey: 'YRNJ', id: 1514, target: '訊'}),
			_Utils_Tuple2(
			1515,
			{answer: '卜口戈竹尸', englishKey: 'YRIHS', id: 1515, target: '誠'}),
			_Utils_Tuple2(
			1516,
			{answer: '一日一口', englishKey: 'MAMR', id: 1516, target: '碧'}),
			_Utils_Tuple2(
			1517,
			{answer: '戈火廿手', englishKey: 'IFTQ', id: 1517, target: '祥'}),
			_Utils_Tuple2(
			1518,
			{answer: '一月山金', englishKey: 'MBUC', id: 1518, target: '頁'}),
			_Utils_Tuple2(
			1519,
			{answer: '卜女女女', englishKey: 'YVVV', id: 1519, target: '巡'}),
			_Utils_Tuple2(
			1520,
			{answer: '人大尸尸', englishKey: 'OKSS', id: 1520, target: '矩'}),
			_Utils_Tuple2(
			1521,
			{answer: '尸一一口戈', englishKey: 'SMMRI', id: 1521, target: '尋'}),
			_Utils_Tuple2(
			1522,
			{answer: '中卜心', englishKey: 'LYP', id: 1522, target: '悲'}),
			_Utils_Tuple2(
			1523,
			{answer: '水廿口土', englishKey: 'ETRG', id: 1523, target: '灌'}),
			_Utils_Tuple2(
			1524,
			{answer: '卜山人戈戈', englishKey: 'YUOII', id: 1524, target: '齡'}),
			_Utils_Tuple2(
			1525,
			{answer: '人人一月', englishKey: 'OOMB', id: 1525, target: '倫'}),
			_Utils_Tuple2(
			1526,
			{answer: '一田一一火', englishKey: 'MWMMF', id: 1526, target: '票'}),
			_Utils_Tuple2(
			1527,
			{answer: '木土土', englishKey: 'DGG', id: 1527, target: '桂'}),
			_Utils_Tuple2(
			1528,
			{answer: '尸口竹土', englishKey: 'SRHG', id: 1528, target: '聖'}),
			_Utils_Tuple2(
			1529,
			{answer: '心人一口', englishKey: 'POMR', id: 1529, target: '恰'}),
			_Utils_Tuple2(
			1530,
			{answer: '一弓心', englishKey: 'MNP', id: 1530, target: '恐'}),
			_Utils_Tuple2(
			1531,
			{answer: '廿大弓中', englishKey: 'TKNL', id: 1531, target: '鄭'}),
			_Utils_Tuple2(
			1532,
			{answer: '土人尸十水', englishKey: 'GOSJE', id: 1532, target: '趣'}),
			_Utils_Tuple2(
			1533,
			{answer: '手戈口', englishKey: 'QIR', id: 1533, target: '抬'}),
			_Utils_Tuple2(
			1534,
			{answer: '廿卜女山', englishKey: 'TYVU', id: 1534, target: '荒'}),
			_Utils_Tuple2(
			1535,
			{answer: '月金卜口', englishKey: 'BCYR', id: 1535, target: '貼'}),
			_Utils_Tuple2(
			1536,
			{answer: '月火手火', englishKey: 'BFQF', id: 1536, target: '騰'}),
			_Utils_Tuple2(
			1537,
			{answer: '弓竹木', englishKey: 'NHD', id: 1537, target: '柔'}),
			_Utils_Tuple2(
			1538,
			{answer: '水卜金月', englishKey: 'EYCB', id: 1538, target: '滴'}),
			_Utils_Tuple2(
			1539,
			{answer: '口一弓口', englishKey: 'RMNR', id: 1539, target: '呵'}),
			_Utils_Tuple2(
			1540,
			{answer: '大竹弓木廿', englishKey: 'KHNDT', id: 1540, target: '猛'}),
			_Utils_Tuple2(
			1541,
			{answer: '十十一中月', englishKey: 'JJMLB', id: 1541, target: '輛'}),
			_Utils_Tuple2(
			1542,
			{answer: '日弓水竹口', englishKey: 'ANEHR', id: 1542, target: '闊'}),
			_Utils_Tuple2(
			1543,
			{answer: '一一大尸', englishKey: 'MMKS', id: 1543, target: '勁'}),
			_Utils_Tuple2(
			1544,
			{answer: '十中女', englishKey: 'JLV', id: 1544, target: '妻'}),
			_Utils_Tuple2(
			1545,
			{answer: '土十月金', englishKey: 'GJBC', id: 1545, target: '填'}),
			_Utils_Tuple2(
			1546,
			{answer: '手卜月大', englishKey: 'QYBK', id: 1546, target: '撤'}),
			_Utils_Tuple2(
			1547,
			{answer: '人卜口日', englishKey: 'OYRA', id: 1547, target: '儲'}),
			_Utils_Tuple2(
			1548,
			{answer: '人一十口', englishKey: 'OMJR', id: 1548, target: '舍'}),
			_Utils_Tuple2(
			1549,
			{answer: '水戈戈', englishKey: 'EII', id: 1549, target: '淺'}),
			_Utils_Tuple2(
			1550,
			{answer: '中弓卜中月', englishKey: 'LNYLB', id: 1550, target: '鬧'}),
			_Utils_Tuple2(
			1551,
			{answer: '手一月水', englishKey: 'QMBE', id: 1551, target: '擾'}),
			_Utils_Tuple2(
			1552,
			{answer: '卜心女戈火', englishKey: 'YPVIF', id: 1552, target: '紫'}),
			_Utils_Tuple2(
			1553,
			{answer: '卜口竹山金', englishKey: 'YRHUC', id: 1553, target: '讚'}),
			_Utils_Tuple2(
			1554,
			{answer: '一口火竹', englishKey: 'MRFH', id: 1554, target: '砂'}),
			_Utils_Tuple2(
			1555,
			{answer: '卜廿戈', englishKey: 'YTI', id: 1555, target: '戲'}),
			_Utils_Tuple2(
			1556,
			{answer: '卜竹卜弓', englishKey: 'YHYN', id: 1556, target: '遞'}),
			_Utils_Tuple2(
			1557,
			{answer: '口中月', englishKey: 'RLB', id: 1557, target: '吊'}),
			_Utils_Tuple2(
			1558,
			{answer: '弓中心人山', englishKey: 'NLPOU', id: 1558, target: '陶'}),
			_Utils_Tuple2(
			1559,
			{answer: '人戈', englishKey: 'OI', id: 1559, target: '伐'}),
			_Utils_Tuple2(
			1560,
			{answer: '大大金火', englishKey: 'KKCF', id: 1560, target: '療'}),
			_Utils_Tuple2(
			1561,
			{answer: '廿廿一女弓', englishKey: 'TTMVN', id: 1561, target: '瓶'}),
			_Utils_Tuple2(
			1562,
			{answer: '水水女', englishKey: 'EEV', id: 1562, target: '婆'}),
			_Utils_Tuple2(
			1563,
			{answer: '尸十月', englishKey: 'SJB', id: 1563, target: '臂'}),
			_Utils_Tuple2(
			1564,
			{answer: '手人廿火', englishKey: 'QOTF', id: 1564, target: '撫'}),
			_Utils_Tuple2(
			1565,
			{answer: '手廿日大', englishKey: 'QTAK', id: 1565, target: '摸'}),
			_Utils_Tuple2(
			1566,
			{answer: '尸戈心', englishKey: 'SIP', id: 1566, target: '忍'}),
			_Utils_Tuple2(
			1567,
			{answer: '中戈口尸水', englishKey: 'LIRSE', id: 1567, target: '蝦'}),
			_Utils_Tuple2(
			1568,
			{answer: '月心山大', englishKey: 'BPUK', id: 1568, target: '胸'}),
			_Utils_Tuple2(
			1569,
			{answer: '火手弓中', englishKey: 'FQNL', id: 1569, target: '鄰'}),
			_Utils_Tuple2(
			1570,
			{answer: '人田中月', englishKey: 'OWLB', id: 1570, target: '偶'}),
			_Utils_Tuple2(
			1571,
			{answer: '手卜難', englishKey: 'QYX', id: 1571, target: '擠'}),
			_Utils_Tuple2(
			1572,
			{answer: '卜戈廿木', englishKey: 'YITD', id: 1572, target: '棄'}),
			_Utils_Tuple2(
			1573,
			{answer: '一弓廿中十', englishKey: 'MNTLJ', id: 1573, target: '鞏'}),
			_Utils_Tuple2(
			1574,
			{answer: '金戈十月', englishKey: 'CIJB', id: 1574, target: '鋪'}),
			_Utils_Tuple2(
			1575,
			{answer: '月木山', englishKey: 'BDU', id: 1575, target: '乳'}),
			_Utils_Tuple2(
			1576,
			{answer: '木廿田日', englishKey: 'DTWA', id: 1576, target: '槽'}),
			_Utils_Tuple2(
			1577,
			{answer: '尸竹木金戈', englishKey: 'SHDCI', id: 1577, target: '鬆'}),
			_Utils_Tuple2(
			1578,
			{answer: '人一一', englishKey: 'OMM', id: 1578, target: '仁'}),
			_Utils_Tuple2(
			1579,
			{answer: '土口', englishKey: 'GR', id: 1579, target: '吉'}),
			_Utils_Tuple2(
			1580,
			{answer: '弓廿弓中', englishKey: 'NTNL', id: 1580, target: '鄧'}),
			_Utils_Tuple2(
			1581,
			{answer: '火十金口', englishKey: 'FJCR', id: 1581, target: '熔'}),
			_Utils_Tuple2(
			1582,
			{answer: '火日弓田', englishKey: 'FANW', id: 1582, target: '爛'}),
			_Utils_Tuple2(
			1583,
			{answer: '一口十戈戈', englishKey: 'MRJII', id: 1583, target: '磚'}),
			_Utils_Tuple2(
			1584,
			{answer: '竹木月一', englishKey: 'HDBM', id: 1584, target: '租'}),
			_Utils_Tuple2(
			1585,
			{answer: '竹人一人', englishKey: 'HOMO', id: 1585, target: '簽'}),
			_Utils_Tuple2(
			1586,
			{answer: '竹口卜火', englishKey: 'HRYF', id: 1586, target: '烏'}),
			_Utils_Tuple2(
			1587,
			{answer: '竹卜尸戈廿', englishKey: 'HYSIT', id: 1587, target: '艦'}),
			_Utils_Tuple2(
			1588,
			{answer: '人火手', englishKey: 'OFQ', id: 1588, target: '伴'}),
			_Utils_Tuple2(
			1589,
			{answer: '竹女戈人', englishKey: 'HVIO', id: 1589, target: '瓜'}),
			_Utils_Tuple2(
			1590,
			{answer: '一人月', englishKey: 'MOB', id: 1590, target: '丙'}),
			_Utils_Tuple2(
			1591,
			{answer: '十中日', englishKey: 'JLA', id: 1591, target: '暫'}),
			_Utils_Tuple2(
			1592,
			{answer: '火口口木', englishKey: 'FRRD', id: 1592, target: '燥'}),
			_Utils_Tuple2(
			1593,
			{answer: '卜口廿金日', englishKey: 'YRTCA', id: 1593, target: '譜'}),
			_Utils_Tuple2(
			1594,
			{answer: '木弓日人', englishKey: 'DNAO', id: 1594, target: '橡'}),
			_Utils_Tuple2(
			1595,
			{answer: '日月一水', englishKey: 'ABME', id: 1595, target: '暖'}),
			_Utils_Tuple2(
			1596,
			{answer: '木竹竹中', englishKey: 'DHHL', id: 1596, target: '柳'}),
			_Utils_Tuple2(
			1597,
			{answer: '中中竹田十', englishKey: 'LLHWJ', id: 1597, target: '牌'}),
			_Utils_Tuple2(
			1598,
			{answer: '竹木中月大', englishKey: 'HDLBK', id: 1598, target: '秧'}),
			_Utils_Tuple2(
			1599,
			{answer: '女火卜女手', englishKey: 'VFYVQ', id: 1599, target: '縴'}),
			_Utils_Tuple2(
			1600,
			{answer: '卜火木', englishKey: 'YFD', id: 1600, target: '迷'}),
			_Utils_Tuple2(
			1601,
			{answer: '月弓金口', englishKey: 'BNCR', id: 1601, target: '膽'}),
			_Utils_Tuple2(
			1602,
			{answer: '卜口廿手', englishKey: 'YRTQ', id: 1602, target: '詳'}),
			_Utils_Tuple2(
			1603,
			{answer: '竹廿中金', englishKey: 'HTLC', id: 1603, target: '簧'}),
			_Utils_Tuple2(
			1604,
			{answer: '口一水日', englishKey: 'RMEA', id: 1604, target: '踏'}),
			_Utils_Tuple2(
			1605,
			{answer: '口木', englishKey: 'RD', id: 1605, target: '呆'}),
			_Utils_Tuple2(
			1606,
			{answer: '戈人一女弓', englishKey: 'IOMVN', id: 1606, target: '瓷'}),
			_Utils_Tuple2(
			1607,
			{answer: '十一竹金', englishKey: 'JMHC', id: 1607, target: '賓'}),
			_Utils_Tuple2(
			1608,
			{answer: '水竹水口', englishKey: 'EHER', id: 1608, target: '洛'}),
			_Utils_Tuple2(
			1609,
			{answer: '火木十口月', englishKey: 'FDJRB', id: 1609, target: '糊'}),
			_Utils_Tuple2(
			1610,
			{answer: '心十廿金', englishKey: 'PJTC', id: 1610, target: '憤'}),
			_Utils_Tuple2(
			1611,
			{answer: '卜山卜廿山', englishKey: 'YUYTU', id: 1611, target: '競'}),
			_Utils_Tuple2(
			1612,
			{answer: '弓中火日火', englishKey: 'NLFAF', id: 1612, target: '隙'}),
			_Utils_Tuple2(
			1613,
			{answer: '女水心', englishKey: 'VEP', id: 1613, target: '怒'}),
			_Utils_Tuple2(
			1614,
			{answer: '火木卜口', englishKey: 'FDYR', id: 1614, target: '粘'}),
			_Utils_Tuple2(
			1615,
			{answer: '弓竹尸', englishKey: 'NHS', id: 1615, target: '乃'}),
			_Utils_Tuple2(
			1616,
			{answer: '女火十大日', englishKey: 'VFJKA', id: 1616, target: '緒'}),
			_Utils_Tuple2(
			1617,
			{answer: '竹尸月', englishKey: 'HSB', id: 1617, target: '肩'}),
			_Utils_Tuple2(
			1618,
			{answer: '竹手木日', englishKey: 'HQDA', id: 1618, target: '籍'}),
			_Utils_Tuple2(
			1619,
			{answer: '火山月十十', englishKey: 'FUBJJ', id: 1619, target: '輝'}),
			_Utils_Tuple2(
			1620,
			{answer: '人卜人大', englishKey: 'OYOK', id: 1620, target: '敏'}),
			_Utils_Tuple2(
			1621,
			{answer: '尸山火', englishKey: 'SUF', id: 1621, target: '熙'}),
			_Utils_Tuple2(
			1622,
			{answer: '心心竹日', englishKey: 'PPHA', id: 1622, target: '皆'}),
			_Utils_Tuple2(
			1623,
			{answer: '木日一十', englishKey: 'DAMJ', id: 1623, target: '桿'}),
			_Utils_Tuple2(
			1624,
			{answer: '人卜月金', englishKey: 'OYBC', id: 1624, target: '偵'}),
			_Utils_Tuple2(
			1625,
			{answer: '月火心', englishKey: 'BFP', id: 1625, target: '懸'}),
			_Utils_Tuple2(
			1626,
			{answer: '手尸山山', englishKey: 'QSUU', id: 1626, target: '掘'}),
			_Utils_Tuple2(
			1627,
			{answer: '卜口弓木', englishKey: 'YRND', id: 1627, target: '享'}),
			_Utils_Tuple2(
			1628,
			{answer: '女火女中', englishKey: 'VFVL', id: 1628, target: '糾'}),
			_Utils_Tuple2(
			1629,
			{answer: '一田日竹一', englishKey: 'MWAHM', id: 1629, target: '醒'}),
			_Utils_Tuple2(
			1630,
			{answer: '大竹一土', englishKey: 'KHMG', id: 1630, target: '狂'}),
			_Utils_Tuple2(
			1631,
			{answer: '金火月金', englishKey: 'CFBC', id: 1631, target: '鎖'}),
			_Utils_Tuple2(
			1632,
			{answer: '心日女', englishKey: 'PAV', id: 1632, target: '恨'}),
			_Utils_Tuple2(
			1633,
			{answer: '竹手竹手一', englishKey: 'HQHQM', id: 1633, target: '牲'}),
			_Utils_Tuple2(
			1634,
			{answer: '一月廿十月', englishKey: 'MBTJB', id: 1634, target: '霸'}),
			_Utils_Tuple2(
			1635,
			{answer: '卜口土心', englishKey: 'YRGP', id: 1635, target: '誌'}),
			_Utils_Tuple2(
			1636,
			{answer: '竹人日山', englishKey: 'HOAU', id: 1636, target: '爬'}),
			_Utils_Tuple2(
			1637,
			{answer: '火月口月金', englishKey: 'FBRBC', id: 1637, target: '賞'}),
			_Utils_Tuple2(
			1638,
			{answer: '一土一一山', englishKey: 'MGMMU', id: 1638, target: '玩'}),
			_Utils_Tuple2(
			1639,
			{answer: '卜廿山', englishKey: 'YTU', id: 1639, target: '逆'}),
			_Utils_Tuple2(
			1640,
			{answer: '弓中土金水', englishKey: 'NLGCE', id: 1640, target: '陵'}),
			_Utils_Tuple2(
			1641,
			{answer: '戈火口竹山', englishKey: 'IFRHU', id: 1641, target: '祝'}),
			_Utils_Tuple2(
			1642,
			{answer: '水手竹中', englishKey: 'EQHL', id: 1642, target: '浙'}),
			_Utils_Tuple2(
			1643,
			{answer: '竹木火竹', englishKey: 'HDFH', id: 1643, target: '秒'}),
			_Utils_Tuple2(
			1644,
			{answer: '月竹竹日山', englishKey: 'BHHAU', id: 1644, target: '貌'}),
			_Utils_Tuple2(
			1645,
			{answer: '竹人竹弓水', englishKey: 'HOHNE', id: 1645, target: '役'}),
			_Utils_Tuple2(
			1646,
			{answer: '竹人木竹水', englishKey: 'HODHE', id: 1646, target: '彼'}),
			_Utils_Tuple2(
			1647,
			{answer: '竹木心', englishKey: 'HDP', id: 1647, target: '悉'}),
			_Utils_Tuple2(
			1648,
			{answer: '日月山', englishKey: 'ABU', id: 1648, target: '冒'}),
			_Utils_Tuple2(
			1649,
			{answer: '田中竹日火', englishKey: 'WLHAF', id: 1649, target: '鴨'}),
			_Utils_Tuple2(
			1650,
			{answer: '中戈女女女', englishKey: 'LIVVV', id: 1650, target: '蠟'}),
			_Utils_Tuple2(
			1651,
			{answer: '土人心山山', englishKey: 'GOPUU', id: 1651, target: '趨'}),
			_Utils_Tuple2(
			1652,
			{answer: '水木土', englishKey: 'EDG', id: 1652, target: '塗'}),
			_Utils_Tuple2(
			1653,
			{answer: '竹弓一日火', englishKey: 'HNMAF', id: 1653, target: '鳳'}),
			_Utils_Tuple2(
			1654,
			{answer: '日一一女', englishKey: 'AMMV', id: 1654, target: '晨'}),
			_Utils_Tuple2(
			1655,
			{answer: '中卜十田十', englishKey: 'LYJWJ', id: 1655, target: '輩'}),
			_Utils_Tuple2(
			1656,
			{answer: '竹木竹手人', englishKey: 'HDHQO', id: 1656, target: '秩'}),
			_Utils_Tuple2(
			1657,
			{answer: '竹竹尸中戈', englishKey: 'HHSLI', id: 1657, target: '卵'}),
			_Utils_Tuple2(
			1658,
			{answer: '田中十大日', englishKey: 'WLJKA', id: 1658, target: '署'}),
			_Utils_Tuple2(
			1659,
			{answer: '木金弓竹', englishKey: 'DCNH', id: 1659, target: '梯'}),
			_Utils_Tuple2(
			1660,
			{answer: '火火', englishKey: 'FF', id: 1660, target: '炎'}),
			_Utils_Tuple2(
			1661,
			{answer: '水廿人土', englishKey: 'ETOG', id: 1661, target: '灘'}),
			_Utils_Tuple2(
			1662,
			{answer: '竹竹口月', englishKey: 'HHRB', id: 1662, target: '篩'}),
			_Utils_Tuple2(
			1663,
			{answer: '尸火尸口口', englishKey: 'SFSRR', id: 1663, target: '驅'}),
			_Utils_Tuple2(
			1664,
			{answer: '山大人人', englishKey: 'UKOO', id: 1664, target: '峽'}),
			_Utils_Tuple2(
			1665,
			{answer: '口人一口', englishKey: 'ROMR', id: 1665, target: '啥'}),
			_Utils_Tuple2(
			1666,
			{answer: '土弓一戈', englishKey: 'GNMI', id: 1666, target: '壽'}),
			_Utils_Tuple2(
			1667,
			{answer: '卜口田中十', englishKey: 'YRWLJ', id: 1667, target: '譯'}),
			_Utils_Tuple2(
			1668,
			{answer: '水尸一水', englishKey: 'ESME', id: 1668, target: '浸'}),
			_Utils_Tuple2(
			1669,
			{answer: '竹日水', englishKey: 'HAE', id: 1669, target: '泉'}),
			_Utils_Tuple2(
			1670,
			{answer: '中月日月山', englishKey: 'LBABU', id: 1670, target: '帽'}),
			_Utils_Tuple2(
			1671,
			{answer: '一口土土', englishKey: 'MRGG', id: 1671, target: '硅'}),
			_Utils_Tuple2(
			1672,
			{answer: '卜尸水手', englishKey: 'YSEQ', id: 1672, target: '遲'}),
			_Utils_Tuple2(
			1673,
			{answer: '弓土一田一', englishKey: 'NGMWM', id: 1673, target: '疆'}),
			_Utils_Tuple2(
			1674,
			{answer: '木廿一金', englishKey: 'DTMC', id: 1674, target: '棋'}),
			_Utils_Tuple2(
			1675,
			{answer: '人心月山金', englishKey: 'OPBUC', id: 1675, target: '貸'}),
			_Utils_Tuple2(
			1676,
			{answer: '水尸一月', englishKey: 'ESMB', id: 1676, target: '漏'}),
			_Utils_Tuple2(
			1677,
			{answer: '月一山戈', englishKey: 'BMUI', id: 1677, target: '冠'}),
			_Utils_Tuple2(
			1678,
			{answer: '女木中大', englishKey: 'VDLK', id: 1678, target: '嫩'}),
			_Utils_Tuple2(
			1679,
			{answer: '竹木卜口月', englishKey: 'HDYRB', id: 1679, target: '稿'}),
			_Utils_Tuple2(
			1680,
			{answer: '大尸大尸月', englishKey: 'KSKSB', id: 1680, target: '脅'}),
			_Utils_Tuple2(
			1681,
			{answer: '廿心', englishKey: 'TP', id: 1681, target: '芯'}),
			_Utils_Tuple2(
			1682,
			{answer: '十竹手', englishKey: 'JHQ', id: 1682, target: '牢'}),
			_Utils_Tuple2(
			1683,
			{answer: '火手竹水', englishKey: 'FQHE', id: 1683, target: '叛'}),
			_Utils_Tuple2(
			1684,
			{answer: '人戈中一戈', englishKey: 'OILMI', id: 1684, target: '蝕'}),
			_Utils_Tuple2(
			1685,
			{answer: '竹月大', englishKey: 'HBK', id: 1685, target: '奧'}),
			_Utils_Tuple2(
			1686,
			{answer: '口竹日火', englishKey: 'RHAF', id: 1686, target: '鳴'}),
			_Utils_Tuple2(
			1687,
			{answer: '山人戈金', englishKey: 'UOIC', id: 1687, target: '嶺'}),
			_Utils_Tuple2(
			1688,
			{answer: '廿手', englishKey: 'TQ', id: 1688, target: '羊'}),
			_Utils_Tuple2(
			1689,
			{answer: '戈火心', englishKey: 'IFP', id: 1689, target: '憑'}),
			_Utils_Tuple2(
			1690,
			{answer: '中中', englishKey: 'LL', id: 1690, target: '串'}),
			_Utils_Tuple2(
			1691,
			{answer: '土戈中口', englishKey: 'GILR', id: 1691, target: '塘'}),
			_Utils_Tuple2(
			1692,
			{answer: '女火人一日', englishKey: 'VFOMA', id: 1692, target: '繪'}),
			_Utils_Tuple2(
			1693,
			{answer: '一月中一戈', englishKey: 'MBLMI', id: 1693, target: '融'}),
			_Utils_Tuple2(
			1694,
			{answer: '一田十大木', englishKey: 'MWJKD', id: 1694, target: '酵'}),
			_Utils_Tuple2(
			1695,
			{answer: '金尸竹廿', englishKey: 'CSHT', id: 1695, target: '盆'}),
			_Utils_Tuple2(
			1696,
			{answer: '金日心竹', englishKey: 'CAPH', id: 1696, target: '錫'}),
			_Utils_Tuple2(
			1697,
			{answer: '戈十十月', englishKey: 'IJJB', id: 1697, target: '廟'}),
			_Utils_Tuple2(
			1698,
			{answer: '戈一木田', englishKey: 'IMDW', id: 1698, target: '凍'}),
			_Utils_Tuple2(
			1699,
			{answer: '手尸十十', englishKey: 'QSJJ', id: 1699, target: '攝'}),
			_Utils_Tuple2(
			1700,
			{answer: '竹土弓戈', englishKey: 'HGNI', id: 1700, target: '籌'}),
			_Utils_Tuple2(
			1701,
			{answer: '十十戈十月', englishKey: 'JJIJB', id: 1701, target: '輔'}),
			_Utils_Tuple2(
			1702,
			{answer: '卜心卜竹女', englishKey: 'YPYHV', id: 1702, target: '襲'}),
			_Utils_Tuple2(
			1703,
			{answer: '手尸尸', englishKey: 'QSS', id: 1703, target: '拒'}),
			_Utils_Tuple2(
			1704,
			{answer: '竹月大尸', englishKey: 'HBKS', id: 1704, target: '筋'}),
			_Utils_Tuple2(
			1705,
			{answer: '人大金火', englishKey: 'OKCF', id: 1705, target: '僚'}),
			_Utils_Tuple2(
			1706,
			{answer: '日一十', englishKey: 'AMJ', id: 1706, target: '旱'}),
			_Utils_Tuple2(
			1707,
			{answer: '金田中', englishKey: 'CWL', id: 1707, target: '鉀'}),
			_Utils_Tuple2(
			1708,
			{answer: '水木人水', englishKey: 'EDOE', id: 1708, target: '漆'}),
			_Utils_Tuple2(
			1709,
			{answer: '竹日卜火', englishKey: 'HAYF', id: 1709, target: '鳥'}),
			_Utils_Tuple2(
			1710,
			{answer: '日竹月山', englishKey: 'AHBU', id: 1710, target: '眉'}),
			_Utils_Tuple2(
			1711,
			{answer: '水竹大心', englishKey: 'EHKP', id: 1711, target: '添'}),
			_Utils_Tuple2(
			1712,
			{answer: '弓一卜戈山', englishKey: 'NMYIU', id: 1712, target: '疏'}),
			_Utils_Tuple2(
			1713,
			{answer: '木手大手', englishKey: 'DQKQ', id: 1713, target: '棒'}),
			_Utils_Tuple2(
			1714,
			{answer: '竹木十戈心', englishKey: 'HDJIP', id: 1714, target: '穗'}),
			_Utils_Tuple2(
			1715,
			{answer: '土田土', englishKey: 'GWG', id: 1715, target: '埋'}),
			_Utils_Tuple2(
			1716,
			{answer: '一口火月', englishKey: 'MRFB', id: 1716, target: '硝'}),
			_Utils_Tuple2(
			1717,
			{answer: '十十木一手', englishKey: 'JJDMQ', id: 1717, target: '韓'}),
			_Utils_Tuple2(
			1718,
			{answer: '人竹大月', englishKey: 'OHKB', id: 1718, target: '僑'}),
			_Utils_Tuple2(
			1719,
			{answer: '手弓土', englishKey: 'QNG', id: 1719, target: '扭'}),
			_Utils_Tuple2(
			1720,
			{answer: '卜一口田', englishKey: 'YMRW', id: 1720, target: '逼'}),
			_Utils_Tuple2(
			1721,
			{answer: '手弓大土', englishKey: 'QNKG', id: 1721, target: '挺'}),
			_Utils_Tuple2(
			1722,
			{answer: '水卜口火', englishKey: 'EYRF', id: 1722, target: '涼'}),
			_Utils_Tuple2(
			1723,
			{answer: '十戈木', englishKey: 'JID', id: 1723, target: '栽'}),
			_Utils_Tuple2(
			1724,
			{answer: '一口十弓山', englishKey: 'MRJNU', id: 1724, target: '碗'}),
			_Utils_Tuple2(
			1725,
			{answer: '火火竹', englishKey: 'FFH', id: 1725, target: '炒'}),
			_Utils_Tuple2(
			1726,
			{answer: '木一火', englishKey: 'DMF', id: 1726, target: '杯'}),
			_Utils_Tuple2(
			1727,
			{answer: '廿土大尸', englishKey: 'TGKS', id: 1727, target: '勸'}),
			_Utils_Tuple2(
			1728,
			{answer: '中中心', englishKey: 'LLP', id: 1728, target: '患'}),
			_Utils_Tuple2(
			1729,
			{answer: '竹山月山金', englishKey: 'HUBUC', id: 1729, target: '贊'}),
			_Utils_Tuple2(
			1730,
			{answer: '人戈竹竹田', englishKey: 'OIHHW', id: 1730, target: '餾'}),
			_Utils_Tuple2(
			1731,
			{answer: '卜口月人', englishKey: 'YRBO', id: 1731, target: '豪'}),
			_Utils_Tuple2(
			1732,
			{answer: '卜大金火', englishKey: 'YKCF', id: 1732, target: '遼'}),
			_Utils_Tuple2(
			1733,
			{answer: '十木大尸', englishKey: 'JDKS', id: 1733, target: '勃'}),
			_Utils_Tuple2(
			1734,
			{answer: '水一竹火', englishKey: 'EMHF', id: 1734, target: '鴻'}),
			_Utils_Tuple2(
			1735,
			{answer: '十中大', englishKey: 'JLK', id: 1735, target: '吏'}),
			_Utils_Tuple2(
			1736,
			{answer: '日一', englishKey: 'AM', id: 1736, target: '旦'}),
			_Utils_Tuple2(
			1737,
			{answer: '竹手一手十', englishKey: 'HQMQJ', id: 1737, target: '拜'}),
			_Utils_Tuple2(
			1738,
			{answer: '大竹心口', englishKey: 'KHPR', id: 1738, target: '狗'}),
			_Utils_Tuple2(
			1739,
			{answer: '十十日心心', englishKey: 'JJAPP', id: 1739, target: '輥'}),
			_Utils_Tuple2(
			1740,
			{answer: '手大中山', englishKey: 'QKLU', id: 1740, target: '掩'}),
			_Utils_Tuple2(
			1741,
			{answer: '人戈弓人', englishKey: 'OINO', id: 1741, target: '飲'}),
			_Utils_Tuple2(
			1742,
			{answer: '手竹卜水', englishKey: 'QHYE', id: 1742, target: '搬'}),
			_Utils_Tuple2(
			1743,
			{answer: '田中尸手火', englishKey: 'WLSQF', id: 1743, target: '罵'}),
			_Utils_Tuple2(
			1744,
			{answer: '心戈', englishKey: 'PI', id: 1744, target: '勾'}),
			_Utils_Tuple2(
			1745,
			{answer: '月月卜廿十', englishKey: 'BBYTJ', id: 1745, target: '辭'}),
			_Utils_Tuple2(
			1746,
			{answer: '手口', englishKey: 'QR', id: 1746, target: '扣'}),
			_Utils_Tuple2(
			1747,
			{answer: '十大', englishKey: 'JK', id: 1747, target: '丈'}),
			_Utils_Tuple2(
			1748,
			{answer: '人十口', englishKey: 'OJR', id: 1748, target: '估'}),
			_Utils_Tuple2(
			1749,
			{answer: '女火戈十', englishKey: 'VFIJ', id: 1749, target: '絨'}),
			_Utils_Tuple2(
			1750,
			{answer: '廿女一戈', englishKey: 'TVMI', id: 1750, target: '蔣'}),
			_Utils_Tuple2(
			1751,
			{answer: '一月弓竹尸', englishKey: 'MBNHS', id: 1751, target: '霧'}),
			_Utils_Tuple2(
			1752,
			{answer: '十水一田中', englishKey: 'JEMWL', id: 1752, target: '麵'}),
			_Utils_Tuple2(
			1753,
			{answer: '女田卜戈', englishKey: 'VWYI', id: 1753, target: '姆'}),
			_Utils_Tuple2(
			1754,
			{answer: '手心大人', englishKey: 'QPKO', id: 1754, target: '擬'}),
			_Utils_Tuple2(
			1755,
			{answer: '竹弓木', englishKey: 'HND', id: 1755, target: '朵'}),
			_Utils_Tuple2(
			1756,
			{answer: '十一木', englishKey: 'JMD', id: 1756, target: '宇'}),
			_Utils_Tuple2(
			1757,
			{answer: '十十口尸十', englishKey: 'JJRSJ', id: 1757, target: '輯'}),
			_Utils_Tuple2(
			1758,
			{answer: '弓中大人人', englishKey: 'NLKOO', id: 1758, target: '陝'}),
			_Utils_Tuple2(
			1759,
			{answer: '竹木田', englishKey: 'HDW', id: 1759, target: '番'}),
			_Utils_Tuple2(
			1760,
			{answer: '月口人土', englishKey: 'BROG', id: 1760, target: '雕'}),
			_Utils_Tuple2(
			1761,
			{answer: '人火月金', englishKey: 'OFBC', id: 1761, target: '償'}),
			_Utils_Tuple2(
			1762,
			{answer: '廿卜女田', englishKey: 'TYVW', id: 1762, target: '蓄'}),
			_Utils_Tuple2(
			1763,
			{answer: '廿月弓竹', englishKey: 'TBNH', id: 1763, target: '剪'}),
			_Utils_Tuple2(
			1764,
			{answer: '山十一火', englishKey: 'UJMF', id: 1764, target: '崇'}),
			_Utils_Tuple2(
			1765,
			{answer: '人日日', englishKey: 'OAA', id: 1765, target: '倡'}),
			_Utils_Tuple2(
			1766,
			{answer: '口卜金大', englishKey: 'RYCK', id: 1766, target: '咬'}),
			_Utils_Tuple2(
			1767,
			{answer: '戈尸土心', englishKey: 'ISGP', id: 1767, target: '廳'}),
			_Utils_Tuple2(
			1768,
			{answer: '廿田中日', englishKey: 'TWLA', id: 1768, target: '薯'}),
			_Utils_Tuple2(
			1769,
			{answer: '尸火中大', englishKey: 'SFLK', id: 1769, target: '駛'}),
			_Utils_Tuple2(
			1770,
			{answer: '尸月中弓', englishKey: 'SBLN', id: 1770, target: '刷'}),
			_Utils_Tuple2(
			1771,
			{answer: '竹一卜', englishKey: 'HMY', id: 1771, target: '斥'}),
			_Utils_Tuple2(
			1772,
			{answer: '月金一心一', englishKey: 'BCMPM', id: 1772, target: '賦'}),
			_Utils_Tuple2(
			1773,
			{answer: '手大手', englishKey: 'QKQ', id: 1773, target: '奉'}),
			_Utils_Tuple2(
			1774,
			{answer: '竹尸尸一一', englishKey: 'HSSMM', id: 1774, target: '扇'}),
			_Utils_Tuple2(
			1775,
			{answer: '日田中水', englishKey: 'AWLE', id: 1775, target: '曼'}),
			_Utils_Tuple2(
			1776,
			{answer: '水中月山', englishKey: 'ELBU', id: 1776, target: '沈'}),
			_Utils_Tuple2(
			1777,
			{answer: '水日田水', englishKey: 'EAWE', id: 1777, target: '漫'}),
			_Utils_Tuple2(
			1778,
			{answer: '水土土山', englishKey: 'EGGU', id: 1778, target: '澆'}),
			_Utils_Tuple2(
			1779,
			{answer: '金一卜尸', englishKey: 'CMYS', id: 1779, target: '鈣'}),
			_Utils_Tuple2(
			1780,
			{answer: '木中一人', englishKey: 'DLMO', id: 1780, target: '桃'}),
			_Utils_Tuple2(
			1781,
			{answer: '人弓木', englishKey: 'OND', id: 1781, target: '仔'}),
			_Utils_Tuple2(
			1782,
			{answer: '手手人', englishKey: 'QQO', id: 1782, target: '扶'}),
			_Utils_Tuple2(
			1783,
			{answer: '人金人口', englishKey: 'OCOR', id: 1783, target: '俗'}),
			_Utils_Tuple2(
			1784,
			{answer: '卜竹水', englishKey: 'YHE', id: 1784, target: '返'}),
			_Utils_Tuple2(
			1785,
			{answer: '卜土一一尸', englishKey: 'YGMMS', id: 1785, target: '虧'}),
			_Utils_Tuple2(
			1786,
			{answer: '月十金一', englishKey: 'BJCM', id: 1786, target: '腔'}),
			_Utils_Tuple2(
			1787,
			{answer: '廿十土土', englishKey: 'TJGG', id: 1787, target: '鞋'}),
			_Utils_Tuple2(
			1788,
			{answer: '卜火水', englishKey: 'YFE', id: 1788, target: '叔'}),
			_Utils_Tuple2(
			1789,
			{answer: '心火月', englishKey: 'PFB', id: 1789, target: '悄'}),
			_Utils_Tuple2(
			1790,
			{answer: '手卜廿土', englishKey: 'QYTG', id: 1790, target: '撞'}),
			_Utils_Tuple2(
			1791,
			{answer: '木尸一土', englishKey: 'DSMG', id: 1791, target: '框'}),
			_Utils_Tuple2(
			1792,
			{answer: '一田竹人水', englishKey: 'MWHOE', id: 1792, target: '覆'}),
			_Utils_Tuple2(
			1793,
			{answer: '卜月土口', englishKey: 'YBGR', id: 1793, target: '週'}),
			_Utils_Tuple2(
			1794,
			{answer: '尸火竹尸月', englishKey: 'SFHSB', id: 1794, target: '騙'}),
			_Utils_Tuple2(
			1795,
			{answer: '廿女大尸', englishKey: 'TVKS', id: 1795, target: '勘'}),
			_Utils_Tuple2(
			1796,
			{answer: '日一土', englishKey: 'AMG', id: 1796, target: '旺'}),
			_Utils_Tuple2(
			1797,
			{answer: '水中中弓', englishKey: 'ELLN', id: 1797, target: '沸'}),
			_Utils_Tuple2(
			1798,
			{answer: '弓木竹女人', englishKey: 'NDHVO', id: 1798, target: '孤'}),
			_Utils_Tuple2(
			1799,
			{answer: '竹水卜口', englishKey: 'HEYR', id: 1799, target: '黏'}),
			_Utils_Tuple2(
			1800,
			{answer: '口土', englishKey: 'RG', id: 1800, target: '吐'}),
			_Utils_Tuple2(
			1801,
			{answer: '弓木月廿', englishKey: 'NDBT', id: 1801, target: '孟'}),
			_Utils_Tuple2(
			1802,
			{answer: '尸山山', englishKey: 'SUU', id: 1802, target: '屈'}),
			_Utils_Tuple2(
			1803,
			{answer: '水尸木', englishKey: 'ESD', id: 1803, target: '渠'}),
			_Utils_Tuple2(
			1804,
			{answer: '人竹女中', englishKey: 'OHVL', id: 1804, target: '仰'}),
			_Utils_Tuple2(
			1805,
			{answer: '女火竹', englishKey: 'VFH', id: 1805, target: '妙'}),
			_Utils_Tuple2(
			1806,
			{answer: '心廿日', englishKey: 'PTA', id: 1806, target: '惜'}),
			_Utils_Tuple2(
			1807,
			{answer: '大人大', englishKey: 'KOK', id: 1807, target: '疾'}),
			_Utils_Tuple2(
			1808,
			{answer: '尸口卜廿十', englishKey: 'SRYTJ', id: 1808, target: '辟'}),
			_Utils_Tuple2(
			1809,
			{answer: '大竹日女', englishKey: 'KHAV', id: 1809, target: '狠'}),
			_Utils_Tuple2(
			1810,
			{answer: '月尸一女', englishKey: 'BSMV', id: 1810, target: '脹'}),
			_Utils_Tuple2(
			1811,
			{answer: '卜口心心日', englishKey: 'YRPPA', id: 1811, target: '諧'}),
			_Utils_Tuple2(
			1812,
			{answer: '手大山尸', englishKey: 'QKUS', id: 1812, target: '拋'}),
			_Utils_Tuple2(
			1813,
			{answer: '口田一女', englishKey: 'RWMV', id: 1813, target: '喂'}),
			_Utils_Tuple2(
			1814,
			{answer: '一月人田卜', englishKey: 'MBOWY', id: 1814, target: '霉'}),
			_Utils_Tuple2(
			1815,
			{answer: '水水水木', englishKey: 'EEED', id: 1815, target: '桑'}),
			_Utils_Tuple2(
			1816,
			{answer: '口田土', englishKey: 'RWG', id: 1816, target: '哩'}),
			_Utils_Tuple2(
			1817,
			{answer: '卜田一女', englishKey: 'YWMV', id: 1817, target: '衰'}),
			_Utils_Tuple2(
			1818,
			{answer: '口戈木木', englishKey: 'RIDD', id: 1818, target: '嘛'}),
			_Utils_Tuple2(
			1819,
			{answer: '山月廿山', englishKey: 'UBTU', id: 1819, target: '崗'}),
			_Utils_Tuple2(
			1820,
			{answer: '木土金水', englishKey: 'DGCE', id: 1820, target: '棱'}),
			_Utils_Tuple2(
			1821,
			{answer: '水戈戈竹', englishKey: 'EIIH', id: 1821, target: '滲'}),
			_Utils_Tuple2(
			1822,
			{answer: '水人月廿', englishKey: 'EOBT', id: 1822, target: '盜'}),
			_Utils_Tuple2(
			1823,
			{answer: '月月廿一廿', englishKey: 'BBTMT', id: 1823, target: '髒'}),
			_Utils_Tuple2(
			1824,
			{answer: '木中弓月金', englishKey: 'DLNBC', id: 1824, target: '賴'}),
			_Utils_Tuple2(
			1825,
			{answer: '竹口廿一', englishKey: 'HRTM', id: 1825, target: '甜'}),
			_Utils_Tuple2(
			1826,
			{answer: '廿田日', englishKey: 'TWA', id: 1826, target: '曹'}),
			_Utils_Tuple2(
			1827,
			{answer: '日弓金口山', englishKey: 'ANCRU', id: 1827, target: '閱'}),
			_Utils_Tuple2(
			1828,
			{answer: '一廿田月', englishKey: 'MTWB', id: 1828, target: '厲'}),
			_Utils_Tuple2(
			1829,
			{answer: '月竹弓', englishKey: 'BHN', id: 1829, target: '肌'}),
			_Utils_Tuple2(
			1830,
			{answer: '火一女一', englishKey: 'FMVM', id: 1830, target: '烴'}),
			_Utils_Tuple2(
			1831,
			{answer: '廿金口山', englishKey: 'TCRU', id: 1831, target: '巷'}),
			_Utils_Tuple2(
			1832,
			{answer: '卜人竹弓水', englishKey: 'YOHNE', id: 1832, target: '毅'}),
			_Utils_Tuple2(
			1833,
			{answer: '女火木一手', englishKey: 'VFDMQ', id: 1833, target: '緯'}),
			_Utils_Tuple2(
			1834,
			{answer: '日人尸', englishKey: 'AOS', id: 1834, target: '昨'}),
			_Utils_Tuple2(
			1835,
			{answer: '人戈大火', englishKey: 'OIKF', id: 1835, target: '偽'}),
			_Utils_Tuple2(
			1836,
			{answer: '十日火', englishKey: 'JAF', id: 1836, target: '煮'}),
			_Utils_Tuple2(
			1837,
			{answer: '大一卜一', englishKey: 'KMYM', id: 1837, target: '症'}),
			_Utils_Tuple2(
			1838,
			{answer: '手廿人口', englishKey: 'QTOR', id: 1838, target: '搭'}),
			_Utils_Tuple2(
			1839,
			{answer: '金一弓', englishKey: 'CMN', id: 1839, target: '釘'}),
			_Utils_Tuple2(
			1840,
			{answer: '廿一女一', englishKey: 'TMVM', id: 1840, target: '莖'}),
			_Utils_Tuple2(
			1841,
			{answer: '竹卜月心', englishKey: 'HYBP', id: 1841, target: '籠'}),
			_Utils_Tuple2(
			1842,
			{answer: '口廿中人', englishKey: 'RTLO', id: 1842, target: '嘆'}),
			_Utils_Tuple2(
			1843,
			{answer: '女火人一月', englishKey: 'VFOMB', id: 1843, target: '綸'}),
			_Utils_Tuple2(
			1844,
			{answer: '一田竹土口', englishKey: 'MWHGR', id: 1844, target: '酷'}),
			_Utils_Tuple2(
			1845,
			{answer: '尸竹十口月', englishKey: 'SHJRB', id: 1845, target: '鬍'}),
			_Utils_Tuple2(
			1846,
			{answer: '人人一弓', englishKey: 'OOMN', id: 1846, target: '偷'}),
			_Utils_Tuple2(
			1847,
			{answer: '弓', englishKey: 'N', id: 1847, target: '弓'}),
			_Utils_Tuple2(
			1848,
			{answer: '金人土', englishKey: 'COG', id: 1848, target: '錐'}),
			_Utils_Tuple2(
			1849,
			{answer: '心一日一', englishKey: 'PMAM', id: 1849, target: '恒'}),
			_Utils_Tuple2(
			1850,
			{answer: '卜卜尸木', englishKey: 'YYSD', id: 1850, target: '遊'}),
			_Utils_Tuple2(
			1851,
			{answer: '土卜竹弓', englishKey: 'GYHN', id: 1851, target: '坑'}),
			_Utils_Tuple2(
			1852,
			{answer: '竹山田一中', englishKey: 'HUWML', id: 1852, target: '鼻'}),
			_Utils_Tuple2(
			1853,
			{answer: '人木人大', englishKey: 'ODOK', id: 1853, target: '敘'}),
			_Utils_Tuple2(
			1854,
			{answer: '大竹卜口大', englishKey: 'KHYRK', id: 1854, target: '獄'}),
			_Utils_Tuple2(
			1855,
			{answer: '尸一田廿金', englishKey: 'SMWTC', id: 1855, target: '翼'}),
			_Utils_Tuple2(
			1856,
			{answer: '女火竹水口', englishKey: 'VFHER', id: 1856, target: '絡'}),
			_Utils_Tuple2(
			1857,
			{answer: '卜中水', englishKey: 'YLE', id: 1857, target: '逮'}),
			_Utils_Tuple2(
			1858,
			{answer: '水弓月尸', englishKey: 'ENBS', id: 1858, target: '湧'}),
			_Utils_Tuple2(
			1859,
			{answer: '人山廿口土', englishKey: 'OUTRG', id: 1859, target: '罐'}),
			_Utils_Tuple2(
			1860,
			{answer: '手竹女中', englishKey: 'QHVL', id: 1860, target: '抑'}),
			_Utils_Tuple2(
			1861,
			{answer: '木月月', englishKey: 'DBB', id: 1861, target: '棚'}),
			_Utils_Tuple2(
			1862,
			{answer: '月土廿竹', englishKey: 'BGTH', id: 1862, target: '膨'}),
			_Utils_Tuple2(
			1863,
			{answer: '土木戈', englishKey: 'GDI', id: 1863, target: '寺'}),
			_Utils_Tuple2(
			1864,
			{answer: '一口心尸竹', englishKey: 'MRPSH', id: 1864, target: '砌'}),
			_Utils_Tuple2(
			1865,
			{answer: '廿弓一山', englishKey: 'TNMU', id: 1865, target: '蔬'}),
			_Utils_Tuple2(
			1866,
			{answer: '尸火尸水人', englishKey: 'SFSEO', id: 1866, target: '驟'}),
			_Utils_Tuple2(
			1867,
			{answer: '竹木竹日竹', englishKey: 'HDHAH', id: 1867, target: '穆'}),
			_Utils_Tuple2(
			1868,
			{answer: '戈一戈口', englishKey: 'IMIR', id: 1868, target: '冶'}),
			_Utils_Tuple2(
			1869,
			{answer: '木十口', englishKey: 'DJR', id: 1869, target: '枯'}),
			_Utils_Tuple2(
			1870,
			{answer: '月尸尸', englishKey: 'BSS', id: 1870, target: '凸'}),
			_Utils_Tuple2(
			1871,
			{answer: '女火中田中', englishKey: 'VFLWL', id: 1871, target: '紳'}),
			_Utils_Tuple2(
			1872,
			{answer: '土一火一', englishKey: 'GMFM', id: 1872, target: '坯'}),
			_Utils_Tuple2(
			1873,
			{answer: '火弓竹難', englishKey: 'FNHX', id: 1873, target: '焰'}),
			_Utils_Tuple2(
			1874,
			{answer: '竹手廿土尸', englishKey: 'HQTGS', id: 1874, target: '犧'}),
			_Utils_Tuple2(
			1875,
			{answer: '月廿', englishKey: 'BT', id: 1875, target: '冊'}),
			_Utils_Tuple2(
			1876,
			{answer: '十十十十十', englishKey: 'JJJJJ', id: 1876, target: '轟'}),
			_Utils_Tuple2(
			1877,
			{answer: '女火一土大', englishKey: 'VFMGK', id: 1877, target: '緻'}),
			_Utils_Tuple2(
			1878,
			{answer: '一戈戈日', englishKey: 'MIIA', id: 1878, target: '晉'}),
			_Utils_Tuple2(
			1879,
			{answer: '大竹難水', englishKey: 'KHXE', id: 1879, target: '瘦'}),
			_Utils_Tuple2(
			1880,
			{answer: '土口口女', englishKey: 'GRRV', id: 1880, target: '喪'}),
			_Utils_Tuple2(
			1881,
			{answer: '卜心土', englishKey: 'YPG', id: 1881, target: '壟'}),
			_Utils_Tuple2(
			1882,
			{answer: '金十一人', englishKey: 'CJMO', id: 1882, target: '錠'}),
			_Utils_Tuple2(
			1883,
			{answer: '金竹日月', englishKey: 'CHAB', id: 1883, target: '錦'}),
			_Utils_Tuple2(
			1884,
			{answer: '心日', englishKey: 'PA', id: 1884, target: '旬'}),
			_Utils_Tuple2(
			1885,
			{answer: '金竹十水', englishKey: 'CHJE', id: 1885, target: '鍛'}),
			_Utils_Tuple2(
			1886,
			{answer: '卜竹尸大', englishKey: 'YHSK', id: 1886, target: '邀'}),
			_Utils_Tuple2(
			1887,
			{answer: '竹中弓人', englishKey: 'HLNO', id: 1887, target: '欣'}),
			_Utils_Tuple2(
			1888,
			{answer: '難卜口月弓', englishKey: 'XYRBN', id: 1888, target: '亭'}),
			_Utils_Tuple2(
			1889,
			{answer: '一田心日', englishKey: 'MWPA', id: 1889, target: '酯'}),
			_Utils_Tuple2(
			1890,
			{answer: '人口弓戈弓', englishKey: 'ORNIN', id: 1890, target: '舒'}),
			_Utils_Tuple2(
			1891,
			{answer: '卜廿田月', englishKey: 'YTWB', id: 1891, target: '邁'}),
			_Utils_Tuple2(
			1892,
			{answer: '一月心竹水', englishKey: 'MBPHE', id: 1892, target: '憂'}),
			_Utils_Tuple2(
			1893,
			{answer: '月弓一山', englishKey: 'BNMU', id: 1893, target: '脆'}),
			_Utils_Tuple2(
			1894,
			{answer: '日弓月', englishKey: 'ANB', id: 1894, target: '閒'}),
			_Utils_Tuple2(
			1895,
			{answer: '手廿金人', englishKey: 'QTCO', id: 1895, target: '撲'}),
			_Utils_Tuple2(
			1896,
			{answer: '水弓尸女', englishKey: 'ENSV', id: 1896, target: '漲'}),
			_Utils_Tuple2(
			1897,
			{answer: '尸一尸戈一', englishKey: 'SMSIM', id: 1897, target: '羽'}),
			_Utils_Tuple2(
			1898,
			{answer: '一田金尸竹', englishKey: 'MWCSH', id: 1898, target: '酚'}),
			_Utils_Tuple2(
			1899,
			{answer: '一山一月金', englishKey: 'MUMBC', id: 1899, target: '頑'}),
			_Utils_Tuple2(
			1900,
			{answer: '人一尸中', englishKey: 'OMSL', id: 1900, target: '卸'}),
			_Utils_Tuple2(
			1901,
			{answer: '手火手', englishKey: 'QFQ', id: 1901, target: '拌'}),
			_Utils_Tuple2(
			1902,
			{answer: '人十大', englishKey: 'OJK', id: 1902, target: '仗'}),
			_Utils_Tuple2(
			1903,
			{answer: '弓中卜廿口', englishKey: 'NLYTR', id: 1903, target: '陪'}),
			_Utils_Tuple2(
			1904,
			{answer: '女中一人', englishKey: 'VLMO', id: 1904, target: '姚'}),
			_Utils_Tuple2(
			1905,
			{answer: '竹大心', englishKey: 'HKP', id: 1905, target: '懲'}),
			_Utils_Tuple2(
			1906,
			{answer: '木卜竹弓', englishKey: 'DYHN', id: 1906, target: '杭'}),
			_Utils_Tuple2(
			1907,
			{answer: '手口卜人', englishKey: 'QRYO', id: 1907, target: '捉'}),
			_Utils_Tuple2(
			1908,
			{answer: '月土', englishKey: 'BG', id: 1908, target: '肚'}),
			_Utils_Tuple2(
			1909,
			{answer: '一火竹弓戈', englishKey: 'MFHNI', id: 1909, target: '飄'}),
			_Utils_Tuple2(
			1910,
			{answer: '水一田火', englishKey: 'EMWF', id: 1910, target: '漂'}),
			_Utils_Tuple2(
			1911,
			{answer: '手竹難水', englishKey: 'QHXE', id: 1911, target: '搜'}),
			_Utils_Tuple2(
			1912,
			{answer: '一一口', englishKey: 'MMR', id: 1912, target: '吾'}),
			_Utils_Tuple2(
			1913,
			{answer: '日心心', englishKey: 'APP', id: 1913, target: '昆'}),
			_Utils_Tuple2(
			1914,
			{answer: '廿金弓人', englishKey: 'TCNO', id: 1914, target: '欺'}),
			_Utils_Tuple2(
			1915,
			{answer: '戈戈弓中', englishKey: 'IINL', id: 1915, target: '郎'}),
			_Utils_Tuple2(
			1916,
			{answer: '水十', englishKey: 'EJ', id: 1916, target: '汁'}),
			_Utils_Tuple2(
			1917,
			{answer: '火十一山', englishKey: 'FJMU', id: 1917, target: '烷'}),
			_Utils_Tuple2(
			1918,
			{answer: '廿中難', englishKey: 'TLX', id: 1918, target: '蕭'}),
			_Utils_Tuple2(
			1919,
			{answer: '竹一弓中', englishKey: 'HMNL', id: 1919, target: '郵'}),
			_Utils_Tuple2(
			1920,
			{answer: '一竹人土', englishKey: 'MHOG', id: 1920, target: '雅'}),
			_Utils_Tuple2(
			1921,
			{answer: '人戈人中月', englishKey: 'OIOLB', id: 1921, target: '飾'}),
			_Utils_Tuple2(
			1922,
			{answer: '尸一弓心', englishKey: 'SMNP', id: 1922, target: '屍'}),
			_Utils_Tuple2(
			1923,
			{answer: '廿中心火', englishKey: 'TLPF', id: 1923, target: '燕'}),
			_Utils_Tuple2(
			1924,
			{answer: '卜一田山', englishKey: 'YMWU', id: 1924, target: '遷'}),
			_Utils_Tuple2(
			1925,
			{answer: '女田大', englishKey: 'VWK', id: 1925, target: '姻'}),
			_Utils_Tuple2(
			1926,
			{answer: '手廿月大', englishKey: 'QTBK', id: 1926, target: '撒'}),
			_Utils_Tuple2(
			1927,
			{answer: '土人卜', englishKey: 'GOY', id: 1927, target: '赴'}),
			_Utils_Tuple2(
			1928,
			{answer: '十日女', englishKey: 'JAV', id: 1928, target: '宴'}),
			_Utils_Tuple2(
			1929,
			{answer: '人手一金', englishKey: 'OQMC', id: 1929, target: '債'}),
			_Utils_Tuple2(
			1930,
			{answer: '中月尸一女', englishKey: 'LBSMV', id: 1930, target: '帳'}),
			_Utils_Tuple2(
			1931,
			{answer: '火一月金', englishKey: 'FMBC', id: 1931, target: '煩'}),
			_Utils_Tuple2(
			1932,
			{answer: '一土卜大土', englishKey: 'MGYKG', id: 1932, target: '斑'}),
			_Utils_Tuple2(
			1933,
			{answer: '心日', englishKey: 'PA', id: 1933, target: '旨'}),
			_Utils_Tuple2(
			1934,
			{answer: '金人戈戈', englishKey: 'COII', id: 1934, target: '鈴'}),
			_Utils_Tuple2(
			1935,
			{answer: '一田卜口木', englishKey: 'MWYRD', id: 1935, target: '醇'}),
			_Utils_Tuple2(
			1936,
			{answer: '廿竹十土', englishKey: 'THJG', id: 1936, target: '董'}),
			_Utils_Tuple2(
			1937,
			{answer: '戈人女', englishKey: 'IOV', id: 1937, target: '姿'}),
			_Utils_Tuple2(
			1938,
			{answer: '心山人土', englishKey: 'PUOG', id: 1938, target: '雛'}),
			_Utils_Tuple2(
			1939,
			{answer: '人戈廿廿', englishKey: 'OITT', id: 1939, target: '餅'}),
			_Utils_Tuple2(
			1940,
			{answer: '人戈月戈', englishKey: 'OIBI', id: 1940, target: '傅'}),
			_Utils_Tuple2(
			1941,
			{answer: '月女', englishKey: 'BV', id: 1941, target: '妥'}),
			_Utils_Tuple2(
			1942,
			{answer: '月人日水', englishKey: 'BOAE', id: 1942, target: '腹'}),
			_Utils_Tuple2(
			1943,
			{answer: '手竹一卜', englishKey: 'QHMY', id: 1943, target: '拆'}),
			_Utils_Tuple2(
			1944,
			{answer: '手弓戈月', englishKey: 'QNIB', id: 1944, target: '捅'}),
			_Utils_Tuple2(
			1945,
			{answer: '手弓竹木', englishKey: 'QNHD', id: 1945, target: '揉'}),
			_Utils_Tuple2(
			1946,
			{answer: '水尸金水', englishKey: 'ESCE', id: 1946, target: '澱'}),
			_Utils_Tuple2(
			1947,
			{answer: '尸水月山金', englishKey: 'SEBUC', id: 1947, target: '賢'}),
			_Utils_Tuple2(
			1948,
			{answer: '一火一卜一', englishKey: 'MFMYM', id: 1948, target: '歪'}),
			_Utils_Tuple2(
			1949,
			{answer: '廿心戈月', englishKey: 'TPIB', id: 1949, target: '葡'}),
			_Utils_Tuple2(
			1950,
			{answer: '一土戈', englishKey: 'MGI', id: 1950, target: '丟'}),
			_Utils_Tuple2(
			1951,
			{answer: '竹人山火大', englishKey: 'HOUFK', id: 1951, target: '徽'}),
			_Utils_Tuple2(
			1952,
			{answer: '水竹土口', englishKey: 'EHGR', id: 1952, target: '浩'}),
			_Utils_Tuple2(
			1953,
			{answer: '月十女', englishKey: 'BJV', id: 1953, target: '胺'}),
			_Utils_Tuple2(
			1954,
			{answer: '土戈土', englishKey: 'GIG', id: 1954, target: '墊'}),
			_Utils_Tuple2(
			1955,
			{answer: '日竹女中', englishKey: 'AHVL', id: 1955, target: '昂'}),
			_Utils_Tuple2(
			1956,
			{answer: '手火月田', englishKey: 'QFBW', id: 1956, target: '擋'}),
			_Utils_Tuple2(
			1957,
			{answer: '尸田月山山', englishKey: 'SWBUU', id: 1957, target: '覽'}),
			_Utils_Tuple2(
			1958,
			{answer: '人戈弓金', englishKey: 'OINC', id: 1958, target: '貪'}),
			_Utils_Tuple2(
			1959,
			{answer: '尸戈心', englishKey: 'SIP', id: 1959, target: '慰'}),
			_Utils_Tuple2(
			1960,
			{answer: '手木十', englishKey: 'QDJ', id: 1960, target: '抹'}),
			_Utils_Tuple2(
			1961,
			{answer: '女火竹尸大', englishKey: 'VFHSK', id: 1961, target: '繳'}),
			_Utils_Tuple2(
			1962,
			{answer: '戈一尸手火', englishKey: 'IMSQF', id: 1962, target: '馮'}),
			_Utils_Tuple2(
			1963,
			{answer: '木水金木', englishKey: 'DECD', id: 1963, target: '樑'}),
			_Utils_Tuple2(
			1964,
			{answer: '水一土', englishKey: 'EMG', id: 1964, target: '汪'}),
			_Utils_Tuple2(
			1965,
			{answer: '心廿卜山', englishKey: 'PTYU', id: 1965, target: '慌'}),
			_Utils_Tuple2(
			1966,
			{answer: '卜口廿大口', englishKey: 'YRTKR', id: 1966, target: '諾'}),
			_Utils_Tuple2(
			1967,
			{answer: '廿土女', englishKey: 'TGV', id: 1967, target: '姜'}),
			_Utils_Tuple2(
			1968,
			{answer: '卜口十月一', englishKey: 'YRJBM', id: 1968, target: '誼'}),
			_Utils_Tuple2(
			1969,
			{answer: '日弓口口口', englishKey: 'ANRRR', id: 1969, target: '闆'}),
			_Utils_Tuple2(
			1970,
			{answer: '火竹大尸', englishKey: 'FHKS', id: 1970, target: '劣'}),
			_Utils_Tuple2(
			1971,
			{answer: '火山尸一土', englishKey: 'FUSMG', id: 1971, target: '耀'}),
			_Utils_Tuple2(
			1972,
			{answer: '卜口一人人', englishKey: 'YRMOO', id: 1972, target: '誣'}),
			_Utils_Tuple2(
			1973,
			{answer: '手竹月山', englishKey: 'QHBU', id: 1973, target: '攪'}),
			_Utils_Tuple2(
			1974,
			{answer: '竹心日', englishKey: 'HPA', id: 1974, target: '昏'}),
			_Utils_Tuple2(
			1975,
			{answer: '弓尸月廿', englishKey: 'NSBT', id: 1975, target: '盈'}),
			_Utils_Tuple2(
			1976,
			{answer: '竹竹火月口', englishKey: 'HHFBR', id: 1976, target: '躺'}),
			_Utils_Tuple2(
			1977,
			{answer: '竹大口月口', englishKey: 'HKRBR', id: 1977, target: '喬'}),
			_Utils_Tuple2(
			1978,
			{answer: '水月女大', englishKey: 'EBVK', id: 1978, target: '溪'}),
			_Utils_Tuple2(
			1979,
			{answer: '尸火大一口', englishKey: 'SFKMR', id: 1979, target: '騎'}),
			_Utils_Tuple2(
			1980,
			{answer: '廿金廿水', englishKey: 'TCTE', id: 1980, target: '叢'}),
			_Utils_Tuple2(
			1981,
			{answer: '卜心田月廿', englishKey: 'YPWBT', id: 1981, target: '盧'}),
			_Utils_Tuple2(
			1982,
			{answer: '竹金卜一口', englishKey: 'HCYMR', id: 1982, target: '譽'}),
			_Utils_Tuple2(
			1983,
			{answer: '戈人口', englishKey: 'IOR', id: 1983, target: '咨'}),
			_Utils_Tuple2(
			1984,
			{answer: '日弓心', englishKey: 'ANP', id: 1984, target: '悶'}),
			_Utils_Tuple2(
			1985,
			{answer: '尸廿廿', englishKey: 'STT', id: 1985, target: '屏'}),
			_Utils_Tuple2(
			1986,
			{answer: '大口尸手火', englishKey: 'KRSQF', id: 1986, target: '駕'}),
			_Utils_Tuple2(
			1987,
			{answer: '人一中月', englishKey: 'OMLB', id: 1987, target: '倆'}),
			_Utils_Tuple2(
			1988,
			{answer: '心一一口', englishKey: 'PMMR', id: 1988, target: '悟'}),
			_Utils_Tuple2(
			1989,
			{answer: '女火尸田山', englishKey: 'VFSWU', id: 1989, target: '纜'}),
			_Utils_Tuple2(
			1990,
			{answer: '手卜金月', englishKey: 'QYCB', id: 1990, target: '摘'}),
			_Utils_Tuple2(
			1991,
			{answer: '手廿大中', englishKey: 'QTKL', id: 1991, target: '擲'}),
			_Utils_Tuple2(
			1992,
			{answer: '人戈尸十', englishKey: 'OISJ', id: 1992, target: '餌'}),
			_Utils_Tuple2(
			1993,
			{answer: '人木土', englishKey: 'ODG', id: 1993, target: '堡'}),
			_Utils_Tuple2(
			1994,
			{answer: '木水一月金', englishKey: 'DEMBC', id: 1994, target: '頗'}),
			_Utils_Tuple2(
			1995,
			{answer: '女戈尸', englishKey: 'VIS', id: 1995, target: '幻'}),
			_Utils_Tuple2(
			1996,
			{answer: '十戈心', englishKey: 'JIP', id: 1996, target: '惠'}),
			_Utils_Tuple2(
			1997,
			{answer: '木一人月', englishKey: 'DMOB', id: 1997, target: '柄'}),
			_Utils_Tuple2(
			1998,
			{answer: '人土土', englishKey: 'OGG', id: 1998, target: '佳'}),
			_Utils_Tuple2(
			1999,
			{answer: '心戈戈竹', englishKey: 'PIIH', id: 1999, target: '慘'}),
			_Utils_Tuple2(
			2000,
			{answer: '人大弓', englishKey: 'OKN', id: 2000, target: '仇'}),
			_Utils_Tuple2(
			2001,
			{answer: '竹人人一中', englishKey: 'HOOML', id: 2001, target: '御'}),
			_Utils_Tuple2(
			2002,
			{answer: '十金月月口', englishKey: 'JCBBR', id: 2002, target: '窩'}),
			_Utils_Tuple2(
			2003,
			{answer: '月女女女', englishKey: 'BVVV', id: 2003, target: '臘'}),
			_Utils_Tuple2(
			2004,
			{answer: '十人一日', englishKey: 'JOMA', id: 2004, target: '宿'}),
			_Utils_Tuple2(
			2005,
			{answer: '人人中弓', englishKey: 'OOLN', id: 2005, target: '劍'}),
			_Utils_Tuple2(
			2006,
			{answer: '水人中木', englishKey: 'EOLD', id: 2006, target: '滌'}),
			_Utils_Tuple2(
			2007,
			{answer: '月山人土火', englishKey: 'BUOGF', id: 2007, target: '瞧'}),
			_Utils_Tuple2(
			2008,
			{answer: '水弓人水', englishKey: 'ENOE', id: 2008, target: '潑'}),
			_Utils_Tuple2(
			2009,
			{answer: '田中卜日十', englishKey: 'WLYAJ', id: 2009, target: '罩'}),
			_Utils_Tuple2(
			2010,
			{answer: '廿竹田心', englishKey: 'THWP', id: 2010, target: '蔥'}),
			_Utils_Tuple2(
			2011,
			{answer: '手火火尸', englishKey: 'QFFS', id: 2011, target: '撈'}),
			_Utils_Tuple2(
			2012,
			{answer: '水竹日', englishKey: 'EHA', id: 2012, target: '泊'}),
			_Utils_Tuple2(
			2013,
			{answer: '一月人土', englishKey: 'MBOG', id: 2013, target: '霍'}),
			_Utils_Tuple2(
			2014,
			{answer: '月戈口', englishKey: 'BIR', id: 2014, target: '胎'}),
			_Utils_Tuple2(
			2015,
			{answer: '廿人戈口', englishKey: 'TOIR', id: 2015, target: '蒼'}),
			_Utils_Tuple2(
			2016,
			{answer: '水木月山', englishKey: 'EDBU', id: 2016, target: '湘'}),
			_Utils_Tuple2(
			2017,
			{answer: '水十一金', englishKey: 'EJMC', id: 2017, target: '濱'}),
			_Utils_Tuple2(
			2018,
			{answer: '一口弓人', englishKey: 'MRNO', id: 2018, target: '砍'}),
			_Utils_Tuple2(
			2019,
			{answer: '一月口尸水', englishKey: 'MBRSE', id: 2019, target: '霞'}),
			_Utils_Tuple2(
			2020,
			{answer: '尸口弓中', englishKey: 'SRNL', id: 2020, target: '邵'}),
			_Utils_Tuple2(
			2021,
			{answer: '一田戈中中', englishKey: 'MWILL', id: 2021, target: '酬'}),
			_Utils_Tuple2(
			2022,
			{answer: '廿心人山', englishKey: 'TPOU', id: 2022, target: '萄'}),
			_Utils_Tuple2(
			2023,
			{answer: '水人土', englishKey: 'EOG', id: 2023, target: '淮'}),
			_Utils_Tuple2(
			2024,
			{answer: '戈心火', englishKey: 'IPF', id: 2024, target: '熊'}),
			_Utils_Tuple2(
			2025,
			{answer: '大竹弓戈', englishKey: 'KHNI', id: 2025, target: '瘋'}),
			_Utils_Tuple2(
			2026,
			{answer: '卜廿心人', englishKey: 'YTPO', id: 2026, target: '遂'}),
			_Utils_Tuple2(
			2027,
			{answer: '火廿金', englishKey: 'FTC', id: 2027, target: '烘'}),
			_Utils_Tuple2(
			2028,
			{answer: '火木田廿金', englishKey: 'FDWTC', id: 2028, target: '糞'}),
			_Utils_Tuple2(
			2029,
			{answer: '戈', englishKey: 'I', id: 2029, target: '戈'}),
			_Utils_Tuple2(
			2030,
			{answer: '木火月田', englishKey: 'DFBW', id: 2030, target: '檔'}),
			_Utils_Tuple2(
			2031,
			{answer: '女竹難水', englishKey: 'VHXE', id: 2031, target: '嫂'}),
			_Utils_Tuple2(
			2032,
			{answer: '中金人口', englishKey: 'LCOR', id: 2032, target: '裕'}),
			_Utils_Tuple2(
			2033,
			{answer: '尸火大大', englishKey: 'SFKK', id: 2033, target: '駁'}),
			_Utils_Tuple2(
			2034,
			{answer: '竹人卜中人', englishKey: 'HOYLO', id: 2034, target: '徙'}),
			_Utils_Tuple2(
			2035,
			{answer: '口土金金', englishKey: 'RGCC', id: 2035, target: '嚇'}),
			_Utils_Tuple2(
			2036,
			{answer: '手口月', englishKey: 'QRB', id: 2036, target: '捐'}),
			_Utils_Tuple2(
			2037,
			{answer: '竹廿月弓', englishKey: 'HTBN', id: 2037, target: '箭'}),
			_Utils_Tuple2(
			2038,
			{answer: '手火月竹', englishKey: 'QFBH', id: 2038, target: '撐'}),
			_Utils_Tuple2(
			2039,
			{answer: '月日一竹', englishKey: 'BAMH', id: 2039, target: '腸'}),
			_Utils_Tuple2(
			2040,
			{answer: '手廿人土', englishKey: 'QTOG', id: 2040, target: '攤'}),
			_Utils_Tuple2(
			2041,
			{answer: '尸金竹弓水', englishKey: 'SCHNE', id: 2041, target: '殿'}),
			_Utils_Tuple2(
			2042,
			{answer: '廿卜十十', englishKey: 'TYJJ', id: 2042, target: '蓮'}),
			_Utils_Tuple2(
			2043,
			{answer: '卜十戈中十', englishKey: 'YJILJ', id: 2043, target: '辨'}),
			_Utils_Tuple2(
			2044,
			{answer: '女戈一金田', englishKey: 'VIMCW', id: 2044, target: '醬'}),
			_Utils_Tuple2(
			2045,
			{answer: '大竹弓水', englishKey: 'KHNE', id: 2045, target: '疫'}),
			_Utils_Tuple2(
			2046,
			{answer: '卜口竹女', englishKey: 'YRHV', id: 2046, target: '哀'}),
			_Utils_Tuple2(
			2047,
			{answer: '土十大日', englishKey: 'GJKA', id: 2047, target: '堵'}),
			_Utils_Tuple2(
			2048,
			{answer: '廿月人火', englishKey: 'TBOF', id: 2048, target: '蔡'}),
			_Utils_Tuple2(
			2049,
			{answer: '水木十', englishKey: 'EDJ', id: 2049, target: '沫'}),
			_Utils_Tuple2(
			2050,
			{answer: '心山木竹水', englishKey: 'PUDHE', id: 2050, target: '皺'}),
			_Utils_Tuple2(
			2051,
			{answer: '中中日一竹', englishKey: 'LLAMH', id: 2051, target: '暢'}),
			_Utils_Tuple2(
			2052,
			{answer: '田田田一', englishKey: 'WWWM', id: 2052, target: '疊'}),
			_Utils_Tuple2(
			2053,
			{answer: '廿木人人', englishKey: 'TDOO', id: 2053, target: '萊'}),
			_Utils_Tuple2(
			2054,
			{answer: '日弓竹水口', englishKey: 'ANHER', id: 2054, target: '閣'}),
			_Utils_Tuple2(
			2055,
			{answer: '卜月卜水', englishKey: 'YBYE', id: 2055, target: '敲'}),
			_Utils_Tuple2(
			2056,
			{answer: '十十十手口', englishKey: 'JJJQR', id: 2056, target: '轄'}),
			_Utils_Tuple2(
			2057,
			{answer: '大日女', englishKey: 'KAV', id: 2057, target: '痕'}),
			_Utils_Tuple2(
			2058,
			{answer: '金心口', englishKey: 'CPR', id: 2058, target: '鉤'}),
			_Utils_Tuple2(
			2059,
			{answer: '土一月月', englishKey: 'GMBB', id: 2059, target: '壩'}),
			_Utils_Tuple2(
			2060,
			{answer: '水竹竹田', englishKey: 'EHHW', id: 2060, target: '溜'}),
			_Utils_Tuple2(
			2061,
			{answer: '人一', englishKey: 'OM', id: 2061, target: '丘'}),
			_Utils_Tuple2(
			2062,
			{answer: '卜女戈', englishKey: 'YVI', id: 2062, target: '玄'}),
			_Utils_Tuple2(
			2063,
			{answer: '戈火月月口', englishKey: 'IFBBR', id: 2063, target: '禍'}),
			_Utils_Tuple2(
			2064,
			{answer: '人戈竹手戈', englishKey: 'OIHQI', id: 2064, target: '餓'}),
			_Utils_Tuple2(
			2065,
			{answer: '日', englishKey: 'A', id: 2065, target: '曰'}),
			_Utils_Tuple2(
			2066,
			{answer: '土廿竹竹竹', englishKey: 'GTHHH', id: 2066, target: '彭'}),
			_Utils_Tuple2(
			2067,
			{answer: '卜田中土', englishKey: 'YWLG', id: 2067, target: '邏'}),
			_Utils_Tuple2(
			2068,
			{answer: '竹竹日戈中', englishKey: 'HHAIL', id: 2068, target: '卿'}),
			_Utils_Tuple2(
			2069,
			{answer: '一大口', englishKey: 'MKR', id: 2069, target: '吞'}),
			_Utils_Tuple2(
			2070,
			{answer: '女卜竹尸', englishKey: 'VYHS', id: 2070, target: '妨'}),
			_Utils_Tuple2(
			2071,
			{answer: '竹卜弓大土', englishKey: 'HYNKG', id: 2071, target: '艇'}),
			_Utils_Tuple2(
			2072,
			{answer: '木一口手', englishKey: 'DMRQ', id: 2072, target: '韋'}),
			_Utils_Tuple2(
			2073,
			{answer: '弓山心', englishKey: 'NUP', id: 2073, target: '怨'}),
			_Utils_Tuple2(
			2074,
			{answer: '木竹日', englishKey: 'DHA', id: 2074, target: '柏'}),
			_Utils_Tuple2(
			2075,
			{answer: '日女弓人', englishKey: 'AVNO', id: 2075, target: '歇'}),
			_Utils_Tuple2(
			2076,
			{answer: '人大竹木女', englishKey: 'OKHDV', id: 2076, target: '矮'}),
			_Utils_Tuple2(
			2077,
			{answer: '手人戈心', englishKey: 'QOIP', id: 2077, target: '捻'}),
			_Utils_Tuple2(
			2078,
			{answer: '戈火女弓水', englishKey: 'IFVNE', id: 2078, target: '祿'}),
			_Utils_Tuple2(
			2079,
			{answer: '卜大弓中', englishKey: 'YKNL', id: 2079, target: '郊'}),
			_Utils_Tuple2(
			2080,
			{answer: '水廿日大', englishKey: 'ETAK', id: 2080, target: '漠'}),
			_Utils_Tuple2(
			2081,
			{answer: '月弓日戈', englishKey: 'BNAI', id: 2081, target: '冤'}),
			_Utils_Tuple2(
			2082,
			{answer: '十大戈', englishKey: 'JKI', id: 2082, target: '宏'}),
			_Utils_Tuple2(
			2083,
			{answer: '火木卜人十', englishKey: 'FDYOJ', id: 2083, target: '粹'}),
			_Utils_Tuple2(
			2084,
			{answer: '十金一月金', englishKey: 'JCMBC', id: 2084, target: '顛'}),
			_Utils_Tuple2(
			2085,
			{answer: '人山', englishKey: 'OU', id: 2085, target: '仙'}),
			_Utils_Tuple2(
			2086,
			{answer: '月卜竹尸', englishKey: 'BYHS', id: 2086, target: '肪'}),
			_Utils_Tuple2(
			2087,
			{answer: '竹口中弓', englishKey: 'HRLN', id: 2087, target: '刮'}),
			_Utils_Tuple2(
			2088,
			{answer: '手田中', englishKey: 'QWL', id: 2088, target: '押'}),
			_Utils_Tuple2(
			2089,
			{answer: '手戈人大', englishKey: 'QIOK', id: 2089, target: '挨'}),
			_Utils_Tuple2(
			2090,
			{answer: '女土土', englishKey: 'VGG', id: 2090, target: '娃'}),
			_Utils_Tuple2(
			2091,
			{answer: '一田廿人土', englishKey: 'MWTOG', id: 2091, target: '醛'}),
			_Utils_Tuple2(
			2092,
			{answer: '手人一口', englishKey: 'QOMR', id: 2092, target: '拾'}),
			_Utils_Tuple2(
			2093,
			{answer: '心竹竹', englishKey: 'PHH', id: 2093, target: '勿'}),
			_Utils_Tuple2(
			2094,
			{answer: '人弓一大', englishKey: 'ONMK', id: 2094, target: '侯'}),
			_Utils_Tuple2(
			2095,
			{answer: '口人心', englishKey: 'ROP', id: 2095, target: '吪'}),
			_Utils_Tuple2(
			2096,
			{answer: '弓戈', englishKey: 'NI', id: 2096, target: '夕'}),
			_Utils_Tuple2(
			2097,
			{answer: '女火心', englishKey: 'VFP', id: 2097, target: '戀'}),
			_Utils_Tuple2(
			2098,
			{answer: '金卜廿十', englishKey: 'CYTJ', id: 2098, target: '鋅'}),
			_Utils_Tuple2(
			2099,
			{answer: '竹月山戈', englishKey: 'HBUI', id: 2099, target: '篡'}),
			_Utils_Tuple2(
			2100,
			{answer: '中一山人', englishKey: 'LMUO', id: 2100, target: '兆'}),
			_Utils_Tuple2(
			2101,
			{answer: '水木木', englishKey: 'EDD', id: 2101, target: '淋'}),
			_Utils_Tuple2(
			2102,
			{answer: '廿卜竹十', englishKey: 'TYHJ', id: 2102, target: '蓬'}),
			_Utils_Tuple2(
			2103,
			{answer: '山一口廿', englishKey: 'UMRT', id: 2103, target: '豈'}),
			_Utils_Tuple2(
			2104,
			{answer: '竹木中田', englishKey: 'HDLW', id: 2104, target: '釉'}),
			_Utils_Tuple2(
			2105,
			{answer: '卜女女', englishKey: 'YVV', id: 2105, target: '妄'}),
			_Utils_Tuple2(
			2106,
			{answer: '手心口', englishKey: 'QPR', id: 2106, target: '拘'}),
			_Utils_Tuple2(
			2107,
			{answer: '手火手山', englishKey: 'QFQU', id: 2107, target: '捲'}),
			_Utils_Tuple2(
			2108,
			{answer: '一戈竹山戈', englishKey: 'MIHUI', id: 2108, target: '魂'}),
			_Utils_Tuple2(
			2109,
			{answer: '手山人土', englishKey: 'QUOG', id: 2109, target: '摧'}),
			_Utils_Tuple2(
			2110,
			{answer: '人弓中中弓', englishKey: 'ONLLN', id: 2110, target: '氟'}),
			_Utils_Tuple2(
			2111,
			{answer: '金戈一月金', englishKey: 'CIMBC', id: 2111, target: '頌'}),
			_Utils_Tuple2(
			2112,
			{answer: '水月十十', englishKey: 'EBJJ', id: 2112, target: '渾'}),
			_Utils_Tuple2(
			2113,
			{answer: '卜口竹木尸', englishKey: 'YRHDS', id: 2113, target: '誘'}),
			_Utils_Tuple2(
			2114,
			{answer: '口一手一金', englishKey: 'RMQMC', id: 2114, target: '蹟'}),
			_Utils_Tuple2(
			2115,
			{answer: '金中田', englishKey: 'CLW', id: 2115, target: '鈾'}),
			_Utils_Tuple2(
			2116,
			{answer: '竹弓竹手', englishKey: 'HNHQ', id: 2116, target: '犁'}),
			_Utils_Tuple2(
			2117,
			{answer: '卜口卜中口', englishKey: 'YRYLR', id: 2117, target: '譴'}),
			_Utils_Tuple2(
			2118,
			{answer: '土口廿口', englishKey: 'GRTR', id: 2118, target: '嘉'}),
			_Utils_Tuple2(
			2119,
			{answer: '土土人田', englishKey: 'GGOW', id: 2119, target: '墻'}),
			_Utils_Tuple2(
			2120,
			{answer: '戈竹卜一火', englishKey: 'IHYMF', id: 2120, target: '戚'}),
			_Utils_Tuple2(
			2121,
			{answer: '手卜中一', englishKey: 'QYLM', id: 2121, target: '扯'}),
			_Utils_Tuple2(
			2122,
			{answer: '水廿女戈', englishKey: 'ETVI', id: 2122, target: '滋'}),
			_Utils_Tuple2(
			2123,
			{answer: '大竹廿金田', englishKey: 'KHTCW', id: 2123, target: '猶'}),
			_Utils_Tuple2(
			2124,
			{answer: '竹卜竹日', englishKey: 'HYHA', id: 2124, target: '舶'}),
			_Utils_Tuple2(
			2125,
			{answer: '廿日月', englishKey: 'TAB', id: 2125, target: '萌'}),
			_Utils_Tuple2(
			2126,
			{answer: '金竹一月金', englishKey: 'CHMBC', id: 2126, target: '頒'}),
			_Utils_Tuple2(
			2127,
			{answer: '火日一十', englishKey: 'FAMJ', id: 2127, target: '焊'}),
			_Utils_Tuple2(
			2128,
			{answer: '竹十口', englishKey: 'HJR', id: 2128, target: '舌'}),
			_Utils_Tuple2(
			2129,
			{answer: '尸金', englishKey: 'SC', id: 2129, target: '匹'}),
			_Utils_Tuple2(
			2130,
			{answer: '火月口心日', englishKey: 'FBRPA', id: 2130, target: '嘗'}),
			_Utils_Tuple2(
			2131,
			{answer: '女竹山心', englishKey: 'VHUP', id: 2131, target: '媳'}),
			_Utils_Tuple2(
			2132,
			{answer: '月十月', englishKey: 'BJB', id: 2132, target: '肺'}),
			_Utils_Tuple2(
			2133,
			{answer: '手卜口火', englishKey: 'QYRF', id: 2133, target: '掠'}),
			_Utils_Tuple2(
			2134,
			{answer: '卜口弓火', englishKey: 'YRNF', id: 2134, target: '烹'}),
			_Utils_Tuple2(
			2135,
			{answer: '大木竹水', englishKey: 'KDHE', id: 2135, target: '疲'}),
			_Utils_Tuple2(
			2136,
			{answer: '一田卜口女', englishKey: 'MWYRV', id: 2136, target: '釀'}),
			_Utils_Tuple2(
			2137,
			{answer: '十金人尸', englishKey: 'JCOS', id: 2137, target: '窄'}),
			_Utils_Tuple2(
			2138,
			{answer: '尸火心木', englishKey: 'SFPD', id: 2138, target: '馳'}),
			_Utils_Tuple2(
			2139,
			{answer: '一竹竹日火', englishKey: 'MHHAF', id: 2139, target: '鴉'}),
			_Utils_Tuple2(
			2140,
			{answer: '大竹大人人', englishKey: 'KHKOO', id: 2140, target: '狹'}),
			_Utils_Tuple2(
			2141,
			{answer: '一女木戈', englishKey: 'MVDI', id: 2141, target: '辱'}),
			_Utils_Tuple2(
			2142,
			{answer: '手竹大', englishKey: 'QHK', id: 2142, target: '契'}),
			_Utils_Tuple2(
			2143,
			{answer: '卜木人大', englishKey: 'YDOK', id: 2143, target: '敦'}),
			_Utils_Tuple2(
			2144,
			{answer: '卜中一口', englishKey: 'YLMR', id: 2144, target: '遣'}),
			_Utils_Tuple2(
			2145,
			{answer: '廿中一卜', englishKey: 'TLMY', id: 2145, target: '菲'}),
			_Utils_Tuple2(
			2146,
			{answer: '木手尸竹戈', englishKey: 'DQSHI', id: 2146, target: '韌'}),
			_Utils_Tuple2(
			2147,
			{answer: '火手手', englishKey: 'FQQ', id: 2147, target: '拳'}),
			_Utils_Tuple2(
			2148,
			{answer: '卜十木中', englishKey: 'YJDL', id: 2148, target: '辣'}),
			_Utils_Tuple2(
			2149,
			{answer: '竹木日一十', englishKey: 'HDAMJ', id: 2149, target: '稈'}),
			_Utils_Tuple2(
			2150,
			{answer: '尸中人', englishKey: 'SLO', id: 2150, target: '臥'}),
			_Utils_Tuple2(
			2151,
			{answer: '一田卜人十', englishKey: 'MWYOJ', id: 2151, target: '醉'}),
			_Utils_Tuple2(
			2152,
			{answer: '廿日大土', englishKey: 'TAKG', id: 2152, target: '墓'}),
			_Utils_Tuple2(
			2153,
			{answer: '戈人大', englishKey: 'IOK', id: 2153, target: '矣'}),
			_Utils_Tuple2(
			2154,
			{answer: '卜廿日心女', englishKey: 'YTAPV', id: 2154, target: '竭'}),
			_Utils_Tuple2(
			2155,
			{answer: '廿弓戈竹', englishKey: 'TNIH', id: 2155, target: '茅'}),
			_Utils_Tuple2(
			2156,
			{answer: '山廿弓日山', englishKey: 'UTNAU', id: 2156, target: '艷'}),
			_Utils_Tuple2(
			2157,
			{answer: '竹難十金', englishKey: 'HXJC', id: 2157, target: '輿'}),
			_Utils_Tuple2(
			2158,
			{answer: '女火卜月月', englishKey: 'VFYBB', id: 2158, target: '締'}),
			_Utils_Tuple2(
			2159,
			{answer: '月金尸一女', englishKey: 'BCSMV', id: 2159, target: '賬'}),
			_Utils_Tuple2(
			2160,
			{answer: '尸水', englishKey: 'SE', id: 2160, target: '尿'}),
			_Utils_Tuple2(
			2161,
			{answer: '廿一心廿', englishKey: 'TMPT', id: 2161, target: '葬'}),
			_Utils_Tuple2(
			2162,
			{answer: '尸竹人水', englishKey: 'SHOE', id: 2162, target: '履'}),
			_Utils_Tuple2(
			2163,
			{answer: '水木日一', englishKey: 'EDAM', id: 2163, target: '渣'}),
			_Utils_Tuple2(
			2164,
			{answer: '人卜山月', englishKey: 'OYUB', id: 2164, target: '禽'}),
			_Utils_Tuple2(
			2165,
			{answer: '中卜木山', englishKey: 'LYDU', id: 2165, target: '襯'}),
			_Utils_Tuple2(
			2166,
			{answer: '月金卜廿口', englishKey: 'BCYTR', id: 2166, target: '賠'}),
			_Utils_Tuple2(
			2167,
			{answer: '竹竹竹弓木', englishKey: 'HHHND', id: 2167, target: '躲'}),
			_Utils_Tuple2(
			2168,
			{answer: '女一十', englishKey: 'VMJ', id: 2168, target: '奸'}),
			_Utils_Tuple2(
			2169,
			{answer: '水日戈山', englishKey: 'EAIU', id: 2169, target: '溉'}),
			_Utils_Tuple2(
			2170,
			{answer: '竹木十一人', englishKey: 'HDJMO', id: 2170, target: '稼'}),
			_Utils_Tuple2(
			2171,
			{answer: '月金戈十', englishKey: 'BCIJ', id: 2171, target: '賊'}),
			_Utils_Tuple2(
			2172,
			{answer: '女尸山', englishKey: 'VSU', id: 2172, target: '妃'}),
			_Utils_Tuple2(
			2173,
			{answer: '手卜十', englishKey: 'QYJ', id: 2173, target: '抖'}),
			_Utils_Tuple2(
			2174,
			{answer: '一田廿日', englishKey: 'MWTA', id: 2174, target: '醋'}),
			_Utils_Tuple2(
			2175,
			{answer: '戈廿難金', englishKey: 'ITXC', id: 2175, target: '廉'}),
			_Utils_Tuple2(
			2176,
			{answer: '手竹中人', englishKey: 'QHLO', id: 2176, target: '掀'}),
			_Utils_Tuple2(
			2177,
			{answer: '日手一月', englishKey: 'AQMB', id: 2177, target: '晴'}),
			_Utils_Tuple2(
			2178,
			{answer: '中戈十十', englishKey: 'LIJJ', id: 2178, target: '褲'}),
			_Utils_Tuple2(
			2179,
			{answer: '竹一口', englishKey: 'HMR', id: 2179, target: '后'}),
			_Utils_Tuple2(
			2180,
			{answer: '廿水卜女', englishKey: 'TEYV', id: 2180, target: '茫'}),
			_Utils_Tuple2(
			2181,
			{answer: '卜女竹人', englishKey: 'YVHO', id: 2181, target: '亥'}),
			_Utils_Tuple2(
			2182,
			{answer: '人大心', englishKey: 'OKP', id: 2182, target: '悠'}),
			_Utils_Tuple2(
			2183,
			{answer: '手日弓田', englishKey: 'QANW', id: 2183, target: '攔'}),
			_Utils_Tuple2(
			2184,
			{answer: '手十尸一心', englishKey: 'QJSMP', id: 2184, target: '慧'}),
			_Utils_Tuple2(
			2185,
			{answer: '日弓口口十', englishKey: 'ANRRJ', id: 2185, target: '闡'}),
			_Utils_Tuple2(
			2186,
			{answer: '人大一', englishKey: 'OKM', id: 2186, target: '佐'}),
			_Utils_Tuple2(
			2187,
			{answer: '十大弓木', englishKey: 'JKND', id: 2187, target: '孝'}),
			_Utils_Tuple2(
			2188,
			{answer: '尸水一口廿', englishKey: 'SEMRT', id: 2188, target: '豎'}),
			_Utils_Tuple2(
			2189,
			{answer: '人竹弓月', englishKey: 'OHNB', id: 2189, target: '佩'}),
			_Utils_Tuple2(
			2190,
			{answer: '女火中難', englishKey: 'VFLX', id: 2190, target: '繡'}),
			_Utils_Tuple2(
			2191,
			{answer: '卜月人山', englishKey: 'YBOU', id: 2191, target: '遙'}),
			_Utils_Tuple2(
			2192,
			{answer: '戈心火木手', englishKey: 'IPFDQ', id: 2192, target: '麟'}),
			_Utils_Tuple2(
			2193,
			{answer: '手弓日山', englishKey: 'QNAU', id: 2193, target: '挽'}),
			_Utils_Tuple2(
			2194,
			{answer: '手人一口', englishKey: 'QOMR', id: 2194, target: '捨'}),
			_Utils_Tuple2(
			2195,
			{answer: '卜手竹中', englishKey: 'YQHL', id: 2195, target: '逝'}),
			_Utils_Tuple2(
			2196,
			{answer: '竹火心', englishKey: 'HFP', id: 2196, target: '愁'}),
			_Utils_Tuple2(
			2197,
			{answer: '日尸竹口', englishKey: 'ASHR', id: 2197, target: '昭'}),
			_Utils_Tuple2(
			2198,
			{answer: '火月', englishKey: 'FB', id: 2198, target: '肖'}),
			_Utils_Tuple2(
			2199,
			{answer: '十金廿土火', englishKey: 'JCTGF', id: 2199, target: '窯'}),
			_Utils_Tuple2(
			2200,
			{answer: '竹山戈大', englishKey: 'HUIK', id: 2200, target: '臭'}),
			_Utils_Tuple2(
			2201,
			{answer: '廿金尸竹', englishKey: 'TCSH', id: 2201, target: '芬'}),
			_Utils_Tuple2(
			2202,
			{answer: '卜竹水十', englishKey: 'YHEJ', id: 2202, target: '逢'}),
			_Utils_Tuple2(
			2203,
			{answer: '手十中人', englishKey: 'QJLO', id: 2203, target: '捷'}),
			_Utils_Tuple2(
			2204,
			{answer: '土日一人', englishKey: 'GAMO', id: 2204, target: '堤'}),
			_Utils_Tuple2(
			2205,
			{answer: '十中田', englishKey: 'JLW', id: 2205, target: '宙'}),
			_Utils_Tuple2(
			2206,
			{answer: '卜女月山', englishKey: 'YVBU', id: 2206, target: '盲'}),
			_Utils_Tuple2(
			2207,
			{answer: '日弓田中', englishKey: 'ANWL', id: 2207, target: '閘'}),
			_Utils_Tuple2(
			2208,
			{answer: '手木竹水', englishKey: 'QDHE', id: 2208, target: '披'}),
			_Utils_Tuple2(
			2209,
			{answer: '十十一口田', englishKey: 'JJMRW', id: 2209, target: '輻'}),
			_Utils_Tuple2(
			2210,
			{answer: '廿水金', englishKey: 'TEC', id: 2210, target: '鑿'}),
			_Utils_Tuple2(
			2211,
			{answer: '山大', englishKey: 'UK', id: 2211, target: '凶'}),
			_Utils_Tuple2(
			2212,
			{answer: '山女戈戈', englishKey: 'UVII', id: 2212, target: '幽'}),
			_Utils_Tuple2(
			2213,
			{answer: '手一口', englishKey: 'QMR', id: 2213, target: '拓'}),
			_Utils_Tuple2(
			2214,
			{answer: '木一', englishKey: 'DM', id: 2214, target: '杠'}),
			_Utils_Tuple2(
			2215,
			{answer: '大竹戈日女', englishKey: 'KHIAV', id: 2215, target: '狼'}),
			_Utils_Tuple2(
			2216,
			{answer: '山月月', englishKey: 'UBB', id: 2216, target: '崩'}),
			_Utils_Tuple2(
			2217,
			{answer: '心十月金', englishKey: 'PJBC', id: 2217, target: '慎'}),
			_Utils_Tuple2(
			2218,
			{answer: '女火月土口', englishKey: 'VFBGR', id: 2218, target: '綢'}),
			_Utils_Tuple2(
			2219,
			{answer: '中戈竹水十', englishKey: 'LIHEJ', id: 2219, target: '蜂'}),
			_Utils_Tuple2(
			2220,
			{answer: '心人土', englishKey: 'POG', id: 2220, target: '惟'}),
			_Utils_Tuple2(
			2221,
			{answer: '手中卜一口', englishKey: 'QLYMR', id: 2221, target: '誓'}),
			_Utils_Tuple2(
			2222,
			{answer: '金手一女', englishKey: 'CQMV', id: 2222, target: '錶'}),
			_Utils_Tuple2(
			2223,
			{answer: '卜水人戈女', englishKey: 'YEOIV', id: 2223, target: '餐'}),
			_Utils_Tuple2(
			2224,
			{answer: '水戈', englishKey: 'EI', id: 2224, target: '叉'}),
			_Utils_Tuple2(
			2225,
			{answer: '土卜中一', englishKey: 'GYLM', id: 2225, target: '址'}),
			_Utils_Tuple2(
			2226,
			{answer: '中月卜戈日', englishKey: 'LBYIA', id: 2226, target: '幟'}),
			_Utils_Tuple2(
			2227,
			{answer: '弓一火月', englishKey: 'NMFB', id: 2227, target: '彌'}),
			_Utils_Tuple2(
			2228,
			{answer: '廿戈弓人', englishKey: 'TINO', id: 2228, target: '芝'}),
			_Utils_Tuple2(
			2229,
			{answer: '人廿金人', englishKey: 'OTCO', id: 2229, target: '僕'}),
			_Utils_Tuple2(
			2230,
			{answer: '口戈人大', englishKey: 'RIOK', id: 2230, target: '唉'}),
			_Utils_Tuple2(
			2231,
			{answer: '水土弓戈', englishKey: 'EGNI', id: 2231, target: '濤'}),
			_Utils_Tuple2(
			2232,
			{answer: '心日戈山', englishKey: 'PAIU', id: 2232, target: '慨'}),
			_Utils_Tuple2(
			2233,
			{answer: '尸一卜人十', englishKey: 'SMYOJ', id: 2233, target: '翠'}),
			_Utils_Tuple2(
			2234,
			{answer: '人戈女戈戈', englishKey: 'OIVII', id: 2234, target: '饑'}),
			_Utils_Tuple2(
			2235,
			{answer: '土戈大尸', englishKey: 'GIKS', id: 2235, target: '劫'}),
			_Utils_Tuple2(
			2236,
			{answer: '卜', englishKey: 'Y', id: 2236, target: '卜'}),
			_Utils_Tuple2(
			2237,
			{answer: '人口月廿', englishKey: 'ORBT', id: 2237, target: '盒'}),
			_Utils_Tuple2(
			2238,
			{answer: '人火月口', englishKey: 'OFBR', id: 2238, target: '倘'}),
			_Utils_Tuple2(
			2239,
			{answer: '十卜火水', englishKey: 'JYFE', id: 2239, target: '寂'}),
			_Utils_Tuple2(
			2240,
			{answer: '木卜火水', englishKey: 'DYFE', id: 2240, target: '椒'}),
			_Utils_Tuple2(
			2241,
			{answer: '火一人月', englishKey: 'FMOB', id: 2241, target: '炳'}),
			_Utils_Tuple2(
			2242,
			{answer: '田一女', englishKey: 'WMV', id: 2242, target: '畏'}),
			_Utils_Tuple2(
			2243,
			{answer: '日弓人一口', englishKey: 'ANOMR', id: 2243, target: '閤'}),
			_Utils_Tuple2(
			2244,
			{answer: '一一一月金', englishKey: 'MMMBC', id: 2244, target: '頸'}),
			_Utils_Tuple2(
			2245,
			{answer: '戈一土金水', englishKey: 'IMGCE', id: 2245, target: '凌'}),
			_Utils_Tuple2(
			2246,
			{answer: '口人弓大', englishKey: 'RONK', id: 2246, target: '喉'}),
			_Utils_Tuple2(
			2247,
			{answer: '月女土', englishKey: 'BVG', id: 2247, target: '墾'}),
			_Utils_Tuple2(
			2248,
			{answer: '中月', englishKey: 'LB', id: 2248, target: '巾'}),
			_Utils_Tuple2(
			2249,
			{answer: '手戈廿', englishKey: 'QIT', id: 2249, target: '拚'}),
			_Utils_Tuple2(
			2250,
			{answer: '口口戈大', englishKey: 'RRIK', id: 2250, target: '獸'}),
			_Utils_Tuple2(
			2251,
			{answer: '十十人弓', englishKey: 'JJON', id: 2251, target: '乾'}),
			_Utils_Tuple2(
			2252,
			{answer: '大大大大', englishKey: 'KKKK', id: 2252, target: '爽'}),
			_Utils_Tuple2(
			2253,
			{answer: '廿火月大', englishKey: 'TFBK', id: 2253, target: '蔽'}),
			_Utils_Tuple2(
			2254,
			{answer: '廿卜心廿', englishKey: 'TYPT', id: 2254, target: '蘆'}),
			_Utils_Tuple2(
			2255,
			{answer: '手月尸木', englishKey: 'QBSD', id: 2255, target: '掙'}),
			_Utils_Tuple2(
			2256,
			{answer: '十金竹木月', englishKey: 'JCHDB', id: 2256, target: '竊'}),
			_Utils_Tuple2(
			2257,
			{answer: '卜口一田十', englishKey: 'YRMWJ', id: 2257, target: '譚'}),
			_Utils_Tuple2(
			2258,
			{answer: '卜口尸一竹', englishKey: 'YRSMH', id: 2258, target: '謬'}),
			_Utils_Tuple2(
			2259,
			{answer: '中日心女', englishKey: 'LAPV', id: 2259, target: '褐'}),
			_Utils_Tuple2(
			2260,
			{answer: '人人人十', englishKey: 'OOOJ', id: 2260, target: '傘'}),
			_Utils_Tuple2(
			2261,
			{answer: '人一月月', englishKey: 'OMBB', id: 2261, target: '儒'}),
			_Utils_Tuple2(
			2262,
			{answer: '十水尸一一', englishKey: 'JESMM', id: 2262, target: '翅'}),
			_Utils_Tuple2(
			2263,
			{answer: '卜一一月金', englishKey: 'YMMBC', id: 2263, target: '顫'}),
			_Utils_Tuple2(
			2264,
			{answer: '卜口中弓', englishKey: 'YRLN', id: 2264, target: '剖'}),
			_Utils_Tuple2(
			2265,
			{answer: '日火一山', englishKey: 'AFMU', id: 2265, target: '晃'}),
			_Utils_Tuple2(
			2266,
			{answer: '月一火一', englishKey: 'BMFM', id: 2266, target: '胚'}),
			_Utils_Tuple2(
			2267,
			{answer: '水手大大', englishKey: 'EQKK', id: 2267, target: '湊'}),
			_Utils_Tuple2(
			2268,
			{answer: '水田中戈', englishKey: 'EWLI', id: 2268, target: '濁'}),
			_Utils_Tuple2(
			2269,
			{answer: '月山口女心', englishKey: 'BURVP', id: 2269, target: '眠'}),
			_Utils_Tuple2(
			2270,
			{answer: '木火', englishKey: 'DF', id: 2270, target: '杰'}),
			_Utils_Tuple2(
			2271,
			{answer: '一月木月山', englishKey: 'MBDBU', id: 2271, target: '霜'}),
			_Utils_Tuple2(
			2272,
			{answer: '一口人土火', englishKey: 'MROGF', id: 2272, target: '礁'}),
			_Utils_Tuple2(
			2273,
			{answer: '廿田中戈', englishKey: 'TWLI', id: 2273, target: '蔑'}),
			_Utils_Tuple2(
			2274,
			{answer: '口十竹口', englishKey: 'RJHR', id: 2274, target: '喀'}),
			_Utils_Tuple2(
			2275,
			{answer: '手火竹', englishKey: 'QFH', id: 2275, target: '抄'}),
			_Utils_Tuple2(
			2276,
			{answer: '大一一火', englishKey: 'KMMF', id: 2276, target: '奈'}),
			_Utils_Tuple2(
			2277,
			{answer: '日弓尸手火', englishKey: 'ANSQF', id: 2277, target: '闖'}),
			_Utils_Tuple2(
			2278,
			{answer: '一口竹田十', englishKey: 'MRHWJ', id: 2278, target: '碑'}),
			_Utils_Tuple2(
			2279,
			{answer: '尸十弓中', englishKey: 'SJNL', id: 2279, target: '耶'}),
			_Utils_Tuple2(
			2280,
			{answer: '廿十金口', englishKey: 'TJCR', id: 2280, target: '蓉'}),
			_Utils_Tuple2(
			2281,
			{answer: '心山中弓', englishKey: 'PULN', id: 2281, target: '刨'}),
			_Utils_Tuple2(
			2282,
			{answer: '口弓月大', englishKey: 'RNBK', id: 2282, target: '喚'}),
			_Utils_Tuple2(
			2283,
			{answer: '土月中一', englishKey: 'GBLM', id: 2283, target: '壺'}),
			_Utils_Tuple2(
			2284,
			{answer: '木月廿', englishKey: 'DBT', id: 2284, target: '柵'}),
			_Utils_Tuple2(
			2285,
			{answer: '大竹手一月', englishKey: 'KHQMB', id: 2285, target: '猜'}),
			_Utils_Tuple2(
			2286,
			{answer: '口一廿田戈', englishKey: 'RMTWI', id: 2286, target: '蹲'}),
			_Utils_Tuple2(
			2287,
			{answer: '手心人山', englishKey: 'QPOU', id: 2287, target: '掏'}),
			_Utils_Tuple2(
			2288,
			{answer: '木卜戈山', englishKey: 'DYIU', id: 2288, target: '梳'}),
			_Utils_Tuple2(
			2289,
			{answer: '木廿金人', englishKey: 'DTCO', id: 2289, target: '樸'}),
			_Utils_Tuple2(
			2290,
			{answer: '水竹月大', englishKey: 'EHBK', id: 2290, target: '澳'}),
			_Utils_Tuple2(
			2291,
			{answer: '一土人戈戈', englishKey: 'MGOII', id: 2291, target: '玲'}),
			_Utils_Tuple2(
			2292,
			{answer: '女火弓土', englishKey: 'VFNG', id: 2292, target: '紐'}),
			_Utils_Tuple2(
			2293,
			{answer: '女火竹日月', englishKey: 'VFHAB', id: 2293, target: '綿'}),
			_Utils_Tuple2(
			2294,
			{answer: '尸口弓中', englishKey: 'SRNL', id: 2294, target: '郡'}),
			_Utils_Tuple2(
			2295,
			{answer: '金尸十口', englishKey: 'CSJR', id: 2295, target: '鋸'}),
			_Utils_Tuple2(
			2296,
			{answer: '月卜月尸', englishKey: 'BYBS', id: 2296, target: '膀'}),
			_Utils_Tuple2(
			2297,
			{answer: '金竹十一', englishKey: 'CHJM', id: 2297, target: '錘'}),
			_Utils_Tuple2(
			2298,
			{answer: '竹難女卜女', englishKey: 'HXVYV', id: 2298, target: '鼠'}),
			_Utils_Tuple2(
			2299,
			{answer: '木大一口', englishKey: 'DKMR', id: 2299, target: '椅'}),
			_Utils_Tuple2(
			2300,
			{answer: '竹尸竹弓水', englishKey: 'HSHNE', id: 2300, target: '殷'}),
			_Utils_Tuple2(
			2301,
			{answer: '十金', englishKey: 'JC', id: 2301, target: '穴'}),
			_Utils_Tuple2(
			2302,
			{answer: '卜戈廿火', englishKey: 'YITF', id: 2302, target: '遮'}),
			_Utils_Tuple2(
			2303,
			{answer: '口火竹', englishKey: 'RFH', id: 2303, target: '吵'}),
			_Utils_Tuple2(
			2304,
			{answer: '廿水一十', englishKey: 'TEMJ', id: 2304, target: '萍'}),
			_Utils_Tuple2(
			2305,
			{answer: '一日月大', englishKey: 'MABK', id: 2305, target: '厭'}),
			_Utils_Tuple2(
			2306,
			{answer: '人月一金', englishKey: 'OBMC', id: 2306, target: '俱'}),
			_Utils_Tuple2(
			2307,
			{answer: '口竹口', englishKey: 'RHR', id: 2307, target: '呂'}),
			_Utils_Tuple2(
			2308,
			{answer: '十月口口女', englishKey: 'JBRRV', id: 2308, target: '囊'}),
			_Utils_Tuple2(
			2309,
			{answer: '手手大手', englishKey: 'QQKQ', id: 2309, target: '捧'}),
			_Utils_Tuple2(
			2310,
			{answer: '水弓人廿', englishKey: 'ENOT', id: 2310, target: '澄'}),
			_Utils_Tuple2(
			2311,
			{answer: '口廿大', englishKey: 'RTK', id: 2311, target: '哎'}),
			_Utils_Tuple2(
			2312,
			{answer: '月山月月手', englishKey: 'BUBBQ', id: 2312, target: '瞬'}),
			_Utils_Tuple2(
			2313,
			{answer: '日弓中一戈', englishKey: 'ANLMI', id: 2313, target: '閩'}),
			_Utils_Tuple2(
			2314,
			{answer: '卜一心人土', englishKey: 'YMPOG', id: 2314, target: '雌'}),
			_Utils_Tuple2(
			2315,
			{answer: '人戈土土山', englishKey: 'OIGGU', id: 2315, target: '饒'}),
			_Utils_Tuple2(
			2316,
			{answer: '口火月', englishKey: 'RFB', id: 2316, target: '哨'}),
			_Utils_Tuple2(
			2317,
			{answer: '水卜口十', englishKey: 'EYRJ', id: 2317, target: '滸'}),
			_Utils_Tuple2(
			2318,
			{answer: '人大中山', englishKey: 'OKLU', id: 2318, target: '俺'}),
			_Utils_Tuple2(
			2319,
			{answer: '廿戈竹', englishKey: 'TIH', id: 2319, target: '茂'}),
			_Utils_Tuple2(
			2320,
			{answer: '廿尸十木', englishKey: 'TSJD', id: 2320, target: '蘗'}),
			_Utils_Tuple2(
			2321,
			{answer: '竹火大尸', englishKey: 'HFKS', id: 2321, target: '勳'}),
			_Utils_Tuple2(
			2322,
			{answer: '月一十', englishKey: 'BMJ', id: 2322, target: '肝'}),
			_Utils_Tuple2(
			2323,
			{answer: '月山一弓', englishKey: 'BUMN', id: 2323, target: '盯'}),
			_Utils_Tuple2(
			2324,
			{answer: '火木弓木', englishKey: 'FDND', id: 2324, target: '籽'}),
			_Utils_Tuple2(
			2325,
			{answer: '尸十心', englishKey: 'SJP', id: 2325, target: '恥'}),
			_Utils_Tuple2(
			2326,
			{answer: '水尸戈廿', englishKey: 'ESIT', id: 2326, target: '濫'}),
			_Utils_Tuple2(
			2327,
			{answer: '廿心火木', englishKey: 'TPFD', id: 2327, target: '菊'}),
			_Utils_Tuple2(
			2328,
			{answer: '竹口中月', englishKey: 'HRLB', id: 2328, target: '帥'}),
			_Utils_Tuple2(
			2329,
			{answer: '戈廿', englishKey: 'IT', id: 2329, target: '戒'}),
			_Utils_Tuple2(
			2330,
			{answer: '廿十人一大', englishKey: 'TJOMK', id: 2330, target: '鞭'}),
			_Utils_Tuple2(
			2331,
			{answer: '卜口心日', englishKey: 'YRPA', id: 2331, target: '詢'}),
			_Utils_Tuple2(
			2332,
			{answer: '金廿土大', englishKey: 'CTGK', id: 2332, target: '鎂'}),
			_Utils_Tuple2(
			2333,
			{answer: '十竹心', englishKey: 'JHP', id: 2333, target: '宅'}),
			_Utils_Tuple2(
			2334,
			{answer: '水十一人', englishKey: 'EJMO', id: 2334, target: '淀'}),
			_Utils_Tuple2(
			2335,
			{answer: '火十大尸', englishKey: 'FJKS', id: 2335, target: '烤'}),
			_Utils_Tuple2(
			2336,
			{answer: '一田月山金', englishKey: 'MWBUC', id: 2336, target: '賈'}),
			_Utils_Tuple2(
			2337,
			{answer: '口一竹手人', englishKey: 'RMHQO', id: 2337, target: '跌'}),
			_Utils_Tuple2(
			2338,
			{answer: '竹中田', englishKey: 'HLW', id: 2338, target: '笛'}),
			_Utils_Tuple2(
			2339,
			{answer: '女火中一戈', englishKey: 'VFLMI', id: 2339, target: '蠻'}),
			_Utils_Tuple2(
			2340,
			{answer: '口尸弓中', englishKey: 'RSNL', id: 2340, target: '鄂'}),
			_Utils_Tuple2(
			2341,
			{answer: '木日心心', englishKey: 'DAPP', id: 2341, target: '棍'}),
			_Utils_Tuple2(
			2342,
			{answer: '月山月尸木', englishKey: 'BUBSD', id: 2342, target: '睜'}),
			_Utils_Tuple2(
			2343,
			{answer: '一月竹日火', englishKey: 'MBHAF', id: 2343, target: '鷊'}),
			_Utils_Tuple2(
			2344,
			{answer: '一一戈', englishKey: 'MMI', id: 2344, target: '云'}),
			_Utils_Tuple2(
			2345,
			{answer: '山弓竹水', englishKey: 'UNHE', id: 2345, target: '岌'}),
			_Utils_Tuple2(
			2346,
			{answer: '一竹木日', englishKey: 'MHDA', id: 2346, target: '曆'}),
			_Utils_Tuple2(
			2347,
			{answer: '月山女一中', englishKey: 'BUVML', id: 2347, target: '鼎'}),
			_Utils_Tuple2(
			2348,
			{answer: '人土木戈', englishKey: 'OGDI', id: 2348, target: '侍'}),
			_Utils_Tuple2(
			2349,
			{answer: '口卜口女', englishKey: 'RYRV', id: 2349, target: '嚷'}),
			_Utils_Tuple2(
			2350,
			{answer: '廿水竹田', englishKey: 'TEHW', id: 2350, target: '藩'}),
			_Utils_Tuple2(
			2351,
			{answer: '尸中一卜', englishKey: 'SLMY', id: 2351, target: '匪'}),
			_Utils_Tuple2(
			2352,
			{answer: '心木一月金', englishKey: 'PDMBC', id: 2352, target: '穎'}),
			_Utils_Tuple2(
			2353,
			{answer: '火木廿田日', englishKey: 'FDTWA', id: 2353, target: '糟'}),
			_Utils_Tuple2(
			2354,
			{answer: '女火戈田土', englishKey: 'VFIWG', id: 2354, target: '纏'}),
			_Utils_Tuple2(
			2355,
			{answer: '竹田竹十', englishKey: 'HWHJ', id: 2355, target: '卑'}),
			_Utils_Tuple2(
			2356,
			{answer: '土廿一女', englishKey: 'GTMV', id: 2356, target: '堪'}),
			_Utils_Tuple2(
			2357,
			{answer: '土卜田一', englishKey: 'GYWM', id: 2357, target: '壇'}),
			_Utils_Tuple2(
			2358,
			{answer: '人弓金尸竹', englishKey: 'ONCSH', id: 2358, target: '氛'}),
			_Utils_Tuple2(
			2359,
			{answer: '心金口山', englishKey: 'PCRU', id: 2359, target: '悅'}),
			_Utils_Tuple2(
			2360,
			{answer: '一口廿月金', englishKey: 'MRTBC', id: 2360, target: '碘'}),
			_Utils_Tuple2(
			2361,
			{answer: '女火戈月戈', englishKey: 'VFIBI', id: 2361, target: '縛'}),
			_Utils_Tuple2(
			2362,
			{answer: '尸十大日', englishKey: 'SJKA', id: 2362, target: '屠'}),
			_Utils_Tuple2(
			2363,
			{answer: '木木大手', englishKey: 'DDKQ', id: 2363, target: '攀'}),
			_Utils_Tuple2(
			2364,
			{answer: '水廿金廿', englishKey: 'ETCT', id: 2364, target: '溢'}),
			_Utils_Tuple2(
			2365,
			{answer: '戈十月', englishKey: 'IJB', id: 2365, target: '甫'}),
			_Utils_Tuple2(
			2366,
			{answer: '尸尸山', englishKey: 'SSU', id: 2366, target: '凹'}),
			_Utils_Tuple2(
			2367,
			{answer: '手廿金', englishKey: 'QTC', id: 2367, target: '拱'}),
			_Utils_Tuple2(
			2368,
			{answer: '手山人月', englishKey: 'QUOB', id: 2368, target: '攜'}),
			_Utils_Tuple2(
			2369,
			{answer: '日木竹中', englishKey: 'ADHL', id: 2369, target: '晰'}),
			_Utils_Tuple2(
			2370,
			{answer: '木一女尸', englishKey: 'DMVS', id: 2370, target: '朽'}),
			_Utils_Tuple2(
			2371,
			{answer: '口人戈弓', englishKey: 'ROIN', id: 2371, target: '吟'}),
			_Utils_Tuple2(
			2372,
			{answer: '卜中田', englishKey: 'YLW', id: 2372, target: '迪'}),
			_Utils_Tuple2(
			2373,
			{answer: '廿土金水', englishKey: 'TGCE', id: 2373, target: '菱'}),
			_Utils_Tuple2(
			2374,
			{answer: '卜口廿難金', englishKey: 'YRTXC', id: 2374, target: '謙'}),
			_Utils_Tuple2(
			2375,
			{answer: '人戈金水', englishKey: 'OICE', id: 2375, target: '俊'}),
			_Utils_Tuple2(
			2376,
			{answer: '女十竹田', englishKey: 'VJHW', id: 2376, target: '嬸'}),
			_Utils_Tuple2(
			2377,
			{answer: '月山金尸竹', englishKey: 'BUCSH', id: 2377, target: '盼'}),
			_Utils_Tuple2(
			2378,
			{answer: '竹卜竹難水', englishKey: 'HYHXE', id: 2378, target: '艘'}),
			_Utils_Tuple2(
			2379,
			{answer: '廿卜女', englishKey: 'TYV', id: 2379, target: '芒'}),
			_Utils_Tuple2(
			2380,
			{answer: '一女口', englishKey: 'MVR', id: 2380, target: '唇'}),
			_Utils_Tuple2(
			2381,
			{answer: '手人人土', englishKey: 'QOOG', id: 2381, target: '挫'}),
			_Utils_Tuple2(
			2382,
			{answer: '水金人口', englishKey: 'ECOR', id: 2382, target: '浴'}),
			_Utils_Tuple2(
			2383,
			{answer: '廿手弓土', englishKey: 'TQNG', id: 2383, target: '羞'}),
			_Utils_Tuple2(
			2384,
			{answer: '土人人竹竹', englishKey: 'GOOHH', id: 2384, target: '趁'}),
			_Utils_Tuple2(
			2385,
			{answer: '人一山', englishKey: 'OMU', id: 2385, target: '岳'}),
			_Utils_Tuple2(
			2386,
			{answer: '田月心', englishKey: 'WBP', id: 2386, target: '愚'}),
			_Utils_Tuple2(
			2387,
			{answer: '大竹水卜', englishKey: 'KHEY', id: 2387, target: '疼'}),
			_Utils_Tuple2(
			2388,
			{answer: '月竹十土', englishKey: 'BHJG', id: 2388, target: '腫'}),
			_Utils_Tuple2(
			2389,
			{answer: '廿竹木女', englishKey: 'THDV', id: 2389, target: '萎'}),
			_Utils_Tuple2(
			2390,
			{answer: '木尸口口', englishKey: 'DSRR', id: 2390, target: '樞'}),
			_Utils_Tuple2(
			2391,
			{answer: '女火卜金大', englishKey: 'VFYCK', id: 2391, target: '絞'}),
			_Utils_Tuple2(
			2392,
			{answer: '人戈田一女', englishKey: 'OIWMV', id: 2392, target: '餵'}),
			_Utils_Tuple2(
			2393,
			{answer: '女十一人', englishKey: 'VJMO', id: 2393, target: '嫁'}),
			_Utils_Tuple2(
			2394,
			{answer: '廿日大心', englishKey: 'TAKP', id: 2394, target: '慕'}),
			_Utils_Tuple2(
			2395,
			{answer: '廿女戈戈', englishKey: 'TVII', id: 2395, target: '茲'}),
			_Utils_Tuple2(
			2396,
			{answer: '竹卜人戈口', englishKey: 'HYOIR', id: 2396, target: '艙'}),
			_Utils_Tuple2(
			2397,
			{answer: '廿卜竹金', englishKey: 'TYHC', id: 2397, target: '蘋'}),
			_Utils_Tuple2(
			2398,
			{answer: '弓弓弓日人', englishKey: 'NNNAO', id: 2398, target: '豫'}),
			_Utils_Tuple2(
			2399,
			{answer: '卜口人一弓', englishKey: 'YROMN', id: 2399, target: '諭'}),
			_Utils_Tuple2(
			2400,
			{answer: '一山日中戈', englishKey: 'MUALI', id: 2400, target: '蠶'}),
			_Utils_Tuple2(
			2401,
			{answer: '水竹木田', englishKey: 'EHDW', id: 2401, target: '潘'}),
			_Utils_Tuple2(
			2402,
			{answer: '金戈尸一', englishKey: 'CISM', id: 2402, target: '翁'}),
			_Utils_Tuple2(
			2403,
			{answer: '卜竹手人', englishKey: 'YHQO', id: 2403, target: '迭'}),
			_Utils_Tuple2(
			2404,
			{answer: '心一月金', englishKey: 'PMBC', id: 2404, target: '頃'}),
			_Utils_Tuple2(
			2405,
			{answer: '尸竹一中', englishKey: 'SHML', id: 2405, target: '匠'}),
			_Utils_Tuple2(
			2406,
			{answer: '木卜月尸', englishKey: 'DYBS', id: 2406, target: '榜'}),
			_Utils_Tuple2(
			2407,
			{answer: '弓人', englishKey: 'NO', id: 2407, target: '欠'}),
			_Utils_Tuple2(
			2408,
			{answer: '水卜口', englishKey: 'EYR', id: 2408, target: '沾'}),
			_Utils_Tuple2(
			2409,
			{answer: '田土弓戈', englishKey: 'WGNI', id: 2409, target: '疇'}),
			_Utils_Tuple2(
			2410,
			{answer: '田月', englishKey: 'WB', id: 2410, target: '胃'}),
			_Utils_Tuple2(
			2411,
			{answer: '廿大中土', englishKey: 'TKLG', id: 2411, target: '茬'}),
			_Utils_Tuple2(
			2412,
			{answer: '口一竹人人', englishKey: 'RMHOO', id: 2412, target: '蹤'}),
			_Utils_Tuple2(
			2413,
			{answer: '口卜口弓', englishKey: 'RYRN', id: 2413, target: '哼'}),
			_Utils_Tuple2(
			2414,
			{answer: '火大廿', englishKey: 'FKT', id: 2414, target: '弊'}),
			_Utils_Tuple2(
			2415,
			{answer: '木月一口', englishKey: 'DBMR', id: 2415, target: '桐'}),
			_Utils_Tuple2(
			2416,
			{answer: '卜一十水', englishKey: 'YMJE', id: 2416, target: '歧'}),
			_Utils_Tuple2(
			2417,
			{answer: '水竹大', englishKey: 'EHK', id: 2417, target: '沃'}),
			_Utils_Tuple2(
			2418,
			{answer: '水中一金', englishKey: 'ELMC', id: 2418, target: '潰'}),
			_Utils_Tuple2(
			2419,
			{answer: '月月竹火', englishKey: 'BBHF', id: 2419, target: '鵬'}),
			_Utils_Tuple2(
			2420,
			{answer: '心卜日十', englishKey: 'PYAJ', id: 2420, target: '悼'}),
			_Utils_Tuple2(
			2421,
			{answer: '戈一心', englishKey: 'IMP', id: 2421, target: '惑'}),
			_Utils_Tuple2(
			2422,
			{answer: '廿戈廿火', englishKey: 'TITF', id: 2422, target: '蔗'}),
			_Utils_Tuple2(
			2423,
			{answer: '日一金田', englishKey: 'AMCW', id: 2423, target: '晒'}),
			_Utils_Tuple2(
			2424,
			{answer: '水一田十', englishKey: 'EMWJ', id: 2424, target: '潭'}),
			_Utils_Tuple2(
			2425,
			{answer: '弓木心口山', englishKey: 'NDPRU', id: 2425, target: '孢'}),
			_Utils_Tuple2(
			2426,
			{answer: '卜口人竹竹', englishKey: 'YROHH', id: 2426, target: '診'}),
			_Utils_Tuple2(
			2427,
			{answer: '戈中月', englishKey: 'ILB', id: 2427, target: '庸'}),
			_Utils_Tuple2(
			2428,
			{answer: '水月月口', englishKey: 'EBBR', id: 2428, target: '渦'}),
			_Utils_Tuple2(
			2429,
			{answer: '卜田口', englishKey: 'YWR', id: 2429, target: '迴'}),
			_Utils_Tuple2(
			2430,
			{answer: '女廿難金', englishKey: 'VTXC', id: 2430, target: '嫌'}),
			_Utils_Tuple2(
			2431,
			{answer: '尸十竹田心', englishKey: 'SJHWP', id: 2431, target: '聰'}),
			_Utils_Tuple2(
			2432,
			{answer: '口竹手戈', englishKey: 'RHQI', id: 2432, target: '哦'}),
			_Utils_Tuple2(
			2433,
			{answer: '戈土廿戈', englishKey: 'IGTI', id: 2433, target: '廚'}),
			_Utils_Tuple2(
			2434,
			{answer: '木戈金水', englishKey: 'DICE', id: 2434, target: '梭'}),
			_Utils_Tuple2(
			2435,
			{answer: '戈火弓中', englishKey: 'IFNL', id: 2435, target: '祁'}),
			_Utils_Tuple2(
			2436,
			{answer: '尸戈中手', englishKey: 'SILQ', id: 2436, target: '肆'}),
			_Utils_Tuple2(
			2437,
			{answer: '月金金田日', englishKey: 'BCCWA', id: 2437, target: '贈'}),
			_Utils_Tuple2(
			2438,
			{answer: '金廿一', englishKey: 'CTM', id: 2438, target: '鉗'}),
			_Utils_Tuple2(
			2439,
			{answer: '戈卜月心', englishKey: 'IYBP', id: 2439, target: '龐'}),
			_Utils_Tuple2(
			2440,
			{answer: '山一土土', englishKey: 'UMGG', id: 2440, target: '崖'}),
			_Utils_Tuple2(
			2441,
			{answer: '一田竹山戈', englishKey: 'MWHUI', id: 2441, target: '醜'}),
			_Utils_Tuple2(
			2442,
			{answer: '竹尸戈廿', englishKey: 'HSIT', id: 2442, target: '籃'}),
			_Utils_Tuple2(
			2443,
			{answer: '廿廿', englishKey: 'TT', id: 2443, target: '并'}),
			_Utils_Tuple2(
			2444,
			{answer: '心田', englishKey: 'PW', id: 2444, target: '甸'}),
			_Utils_Tuple2(
			2445,
			{answer: '月火手', englishKey: 'BFQ', id: 2445, target: '胖'}),
			_Utils_Tuple2(
			2446,
			{answer: '廿水口木', englishKey: 'TERD', id: 2446, target: '藻'}),
			_Utils_Tuple2(
			2447,
			{answer: '卜口大一尸', englishKey: 'YRKMS', id: 2447, target: '誇'}),
			_Utils_Tuple2(
			2448,
			{answer: '手竹日山', englishKey: 'QHAU', id: 2448, target: '搗'}),
			_Utils_Tuple2(
			2449,
			{answer: '手廿金中', englishKey: 'QTCL', id: 2449, target: '撕'}),
			_Utils_Tuple2(
			2450,
			{answer: '卜口尸竹口', englishKey: 'YRSHR', id: 2450, target: '詔'}),
			_Utils_Tuple2(
			2451,
			{answer: '卜月山金', englishKey: 'YBUC', id: 2451, target: '貞'}),
			_Utils_Tuple2(
			2452,
			{answer: '廿女戈心', englishKey: 'TVIP', id: 2452, target: '慈'}),
			_Utils_Tuple2(
			2453,
			{answer: '火卜竹弓', englishKey: 'FYHN', id: 2453, target: '炕'}),
			_Utils_Tuple2(
			2454,
			{answer: '月金日心竹', englishKey: 'BCAPH', id: 2454, target: '賜'}),
			_Utils_Tuple2(
			2455,
			{answer: '卜日十', englishKey: 'YAJ', id: 2455, target: '卓'}),
			_Utils_Tuple2(
			2456,
			{answer: '水弓十', englishKey: 'ENJ', id: 2456, target: '汛'}),
			_Utils_Tuple2(
			2457,
			{answer: '一土弓月水', englishKey: 'MGNBE', id: 2457, target: '瓊'}),
			_Utils_Tuple2(
			2458,
			{answer: '金卜竹一', englishKey: 'CYHM', id: 2458, target: '鏟'}),
			_Utils_Tuple2(
			2459,
			{answer: '手土土山', englishKey: 'QGGU', id: 2459, target: '撓'}),
			_Utils_Tuple2(
			2460,
			{answer: '木田木', englishKey: 'DWD', id: 2460, target: '棵'}),
			_Utils_Tuple2(
			2461,
			{answer: '火土', englishKey: 'FG', id: 2461, target: '灶'}),
			_Utils_Tuple2(
			2462,
			{answer: '人戈中一金', englishKey: 'OILMC', id: 2462, target: '饋'}),
			_Utils_Tuple2(
			2463,
			{answer: '月金女', englishKey: 'BCV', id: 2463, target: '嬰'}),
			_Utils_Tuple2(
			2464,
			{answer: '月人一一火', englishKey: 'BOMMF', id: 2464, target: '祭'}),
			_Utils_Tuple2(
			2465,
			{answer: '卜心田月', englishKey: 'YPWB', id: 2465, target: '膚'}),
			_Utils_Tuple2(
			2466,
			{answer: '廿卜月月', englishKey: 'TYBB', id: 2466, target: '蒂'}),
			_Utils_Tuple2(
			2467,
			{answer: '中竹竹竹', englishKey: 'LHHH', id: 2467, target: '衫'}),
			_Utils_Tuple2(
			2468,
			{answer: '人一月廿', englishKey: 'OMBT', id: 2468, target: '侖'}),
			_Utils_Tuple2(
			2469,
			{answer: '人弓手木', englishKey: 'ONQD', id: 2469, target: '傑'}),
			_Utils_Tuple2(
			2470,
			{answer: '弓山大尸', englishKey: 'NUKS', id: 2470, target: '勉'}),
			_Utils_Tuple2(
			2471,
			{answer: '水一竹一', englishKey: 'EMHM', id: 2471, target: '瀝'}),
			_Utils_Tuple2(
			2472,
			{answer: '水竹尸山', englishKey: 'EHSU', id: 2472, target: '滬'}),
			_Utils_Tuple2(
			2473,
			{answer: '卜弓日戈', englishKey: 'YNAI', id: 2473, target: '逸'}),
			_Utils_Tuple2(
			2474,
			{answer: '口水水木', englishKey: 'REED', id: 2474, target: '嗓'}),
			_Utils_Tuple2(
			2475,
			{answer: '日月十十', englishKey: 'ABJJ', id: 2475, target: '暈'}),
			_Utils_Tuple2(
			2476,
			{answer: '水戈十月', englishKey: 'EIJB', id: 2476, target: '浦'}),
			_Utils_Tuple2(
			2477,
			{answer: '十心竹戈', englishKey: 'JPHI', id: 2477, target: '蜜'}),
			_Utils_Tuple2(
			2478,
			{answer: '卜口月月', englishKey: 'YRBB', id: 2478, target: '膏'}),
			_Utils_Tuple2(
			2479,
			{answer: '廿大', englishKey: 'TK', id: 2479, target: '艾'}),
			_Utils_Tuple2(
			2480,
			{answer: '卜弓月山金', englishKey: 'YNBUC', id: 2480, target: '贏'}),
			_Utils_Tuple2(
			2481,
			{answer: '弓日竹戈', englishKey: 'NAHI', id: 2481, target: '兔'}),
			_Utils_Tuple2(
			2482,
			{answer: '弓尸弓木', englishKey: 'NSND', id: 2482, target: '孕'}),
			_Utils_Tuple2(
			2483,
			{answer: '心火木手', englishKey: 'PFDQ', id: 2483, target: '憐'}),
			_Utils_Tuple2(
			2484,
			{answer: '手金尸竹', englishKey: 'QCSH', id: 2484, target: '扮'}),
			_Utils_Tuple2(
			2485,
			{answer: '廿水戈月', englishKey: 'TEIB', id: 2485, target: '蒲'}),
			_Utils_Tuple2(
			2486,
			{answer: '竹戈竹日火', englishKey: 'HIHAF', id: 2486, target: '鵝'}),
			_Utils_Tuple2(
			2487,
			{answer: '口一竹一', englishKey: 'RMHM', id: 2487, target: '嚦'}),
			_Utils_Tuple2(
			2488,
			{answer: '手尸手中', englishKey: 'QSQL', id: 2488, target: '挪'}),
			_Utils_Tuple2(
			2489,
			{answer: '水卜火水', englishKey: 'EYFE', id: 2489, target: '淑'}),
			_Utils_Tuple2(
			2490,
			{answer: '卜口月人山', englishKey: 'YRBOU', id: 2490, target: '謠'}),
			_Utils_Tuple2(
			2491,
			{answer: '戈戈戈中', englishKey: 'IIIL', id: 2491, target: '廊'}),
			_Utils_Tuple2(
			2492,
			{answer: '心月山土', englishKey: 'PBUG', id: 2492, target: '懼'}),
			_Utils_Tuple2(
			2493,
			{answer: '女火一田中', englishKey: 'VFMWL', id: 2493, target: '緬'}),
			_Utils_Tuple2(
			2494,
			{answer: '人月弓木', englishKey: 'OBND', id: 2494, target: '俘'}),
			_Utils_Tuple2(
			2495,
			{answer: '口田大', englishKey: 'RWK', id: 2495, target: '咽'}),
			_Utils_Tuple2(
			2496,
			{answer: '尸火竹大月', englishKey: 'SFHKB', id: 2496, target: '驕'}),
			_Utils_Tuple2(
			2497,
			{answer: '十卜廿十', englishKey: 'JYTJ', id: 2497, target: '宰'}),
			_Utils_Tuple2(
			2498,
			{answer: '弓中土卜人', englishKey: 'NLGYO', id: 2498, target: '陡'}),
			_Utils_Tuple2(
			2499,
			{answer: '人竹尸土', englishKey: 'OHSG', id: 2499, target: '僱'}),
			_Utils_Tuple2(
			2500,
			{answer: '山戈金水', englishKey: 'UICE', id: 2500, target: '峻'}),
			_Utils_Tuple2(
			2501,
			{answer: '心女女田', englishKey: 'PVVW', id: 2501, target: '惱'}),
			_Utils_Tuple2(
			2502,
			{answer: '月竹日水', englishKey: 'BHAE', id: 2502, target: '腺'}),
			_Utils_Tuple2(
			2503,
			{answer: '卜口弓大一', englishKey: 'YRNKM', id: 2503, target: '誕'}),
			_Utils_Tuple2(
			2504,
			{answer: '大弓', englishKey: 'KN', id: 2504, target: '夷'}),
			_Utils_Tuple2(
			2505,
			{answer: '心人一弓', englishKey: 'POMN', id: 2505, target: '愉'}),
			_Utils_Tuple2(
			2506,
			{answer: '大竹女女女', englishKey: 'KHVVV', id: 2506, target: '獵'}),
			_Utils_Tuple2(
			2507,
			{answer: '戈金竹山戈', englishKey: 'ICHUI', id: 2507, target: '魔'}),
			_Utils_Tuple2(
			2508,
			{answer: '口女火戈', englishKey: 'RVFI', id: 2508, target: '喲'}),
			_Utils_Tuple2(
			2509,
			{answer: '手一', englishKey: 'QM', id: 2509, target: '扛'}),
			_Utils_Tuple2(
			2510,
			{answer: '廿日心女', englishKey: 'TAPV', id: 2510, target: '葛'}),
			_Utils_Tuple2(
			2511,
			{answer: '廿弓中戈', englishKey: 'TNLI', id: 2511, target: '蔭'}),
			_Utils_Tuple2(
			2512,
			{answer: '金十女', englishKey: 'CJV', id: 2512, target: '銨'}),
			_Utils_Tuple2(
			2513,
			{answer: '火金月', englishKey: 'FCB', id: 2513, target: '脊'}),
			_Utils_Tuple2(
			2514,
			{answer: '人大一口', englishKey: 'OKMR', id: 2514, target: '倚'}),
			_Utils_Tuple2(
			2515,
			{answer: '竹尸月廿', englishKey: 'HSBT', id: 2515, target: '扁'}),
			_Utils_Tuple2(
			2516,
			{answer: '木口', englishKey: 'DR', id: 2516, target: '杏'}),
			_Utils_Tuple2(
			2517,
			{answer: '木弓中月', englishKey: 'DNLB', id: 2517, target: '橢'}),
			_Utils_Tuple2(
			2518,
			{answer: '水竹山大', englishKey: 'EHUK', id: 2518, target: '溴'}),
			_Utils_Tuple2(
			2519,
			{answer: '水大心月', englishKey: 'EKPB', id: 2519, target: '滯'}),
			_Utils_Tuple2(
			2520,
			{answer: '廿一弓口', englishKey: 'TMNR', id: 2520, target: '苛'}),
			_Utils_Tuple2(
			2521,
			{answer: '金火竹', englishKey: 'CFH', id: 2521, target: '鈔'}),
			_Utils_Tuple2(
			2522,
			{answer: '金弓木廿', englishKey: 'CNDT', id: 2522, target: '錳'}),
			_Utils_Tuple2(
			2523,
			{answer: '金卜口女', englishKey: 'CYRV', id: 2523, target: '鑲'}),
			_Utils_Tuple2(
			2524,
			{answer: '手日土', englishKey: 'QAG', id: 2524, target: '捏'}),
			_Utils_Tuple2(
			2525,
			{answer: '十十竹一中', englishKey: 'JJHML', id: 2525, target: '斬'}),
			_Utils_Tuple2(
			2526,
			{answer: '卜女口女心', englishKey: 'YVRVP', id: 2526, target: '氓'}),
			_Utils_Tuple2(
			2527,
			{answer: '人土尸大', englishKey: 'OGSK', id: 2527, target: '傲'}),
			_Utils_Tuple2(
			2528,
			{answer: '人一田一', englishKey: 'OMWM', id: 2528, target: '僵'}),
			_Utils_Tuple2(
			2529,
			{answer: '心大大', englishKey: 'PKK', id: 2529, target: '匆'}),
			_Utils_Tuple2(
			2530,
			{answer: '尸火月', englishKey: 'SFB', id: 2530, target: '屑'}),
			_Utils_Tuple2(
			2531,
			{answer: '水竹火', englishKey: 'EHF', id: 2531, target: '燙'}),
			_Utils_Tuple2(
			2532,
			{answer: '竹人水一弓', englishKey: 'HOEMN', id: 2532, target: '衍'}),
			_Utils_Tuple2(
			2533,
			{answer: '大月弓中', englishKey: 'KBNL', id: 2533, target: '郁'}),
			_Utils_Tuple2(
			2534,
			{answer: '卜田戈戈', englishKey: 'YWII', id: 2534, target: '鹵'}),
			_Utils_Tuple2(
			2535,
			{answer: '手卜月心', englishKey: 'QYBP', id: 2535, target: '攏'}),
			_Utils_Tuple2(
			2536,
			{answer: '中田木', englishKey: 'LWD', id: 2536, target: '裸'}),
			_Utils_Tuple2(
			2537,
			{answer: '一竹弓中', englishKey: 'MHNL', id: 2537, target: '邪'}),
			_Utils_Tuple2(
			2538,
			{answer: '土卜竹尸', englishKey: 'GYHS', id: 2538, target: '坊'}),
			_Utils_Tuple2(
			2539,
			{answer: '水日心女', englishKey: 'EAPV', id: 2539, target: '渴'}),
			_Utils_Tuple2(
			2540,
			{answer: '竹難田大尸', englishKey: 'HXWKS', id: 2540, target: '舅'}),
			_Utils_Tuple2(
			2541,
			{answer: '水心廿', englishKey: 'EPT', id: 2541, target: '泄'}),
			_Utils_Tuple2(
			2542,
			{answer: '廿手尸一一', englishKey: 'TQSMM', id: 2542, target: '翔'}),
			_Utils_Tuple2(
			2543,
			{answer: '戈一山水', englishKey: 'IMUE', id: 2543, target: '廈'}),
			_Utils_Tuple2(
			2544,
			{answer: '木尸中金', englishKey: 'DSLC', id: 2544, target: '櫃'}),
			_Utils_Tuple2(
			2545,
			{answer: '金弓人', englishKey: 'CNO', id: 2545, target: '欽'}),
			_Utils_Tuple2(
			2546,
			{answer: '十金竹土口', englishKey: 'JCHGR', id: 2546, target: '窖'}),
			_Utils_Tuple2(
			2547,
			{answer: '月竹廿田', englishKey: 'BHTW', id: 2547, target: '貓'}),
			_Utils_Tuple2(
			2548,
			{answer: '女廿一木', englishKey: 'VTMD', id: 2548, target: '媒'}),
			_Utils_Tuple2(
			2549,
			{answer: '月竹田十', englishKey: 'BHWJ', id: 2549, target: '脾'}),
			_Utils_Tuple2(
			2550,
			{answer: '口口口木', englishKey: 'RRRD', id: 2550, target: '噪'}),
			_Utils_Tuple2(
			2551,
			{answer: '中土日一', englishKey: 'LGAM', id: 2551, target: '晝'}),
			_Utils_Tuple2(
			2552,
			{answer: '中戈十心', englishKey: 'LIJP', id: 2552, target: '蛇'}),
			_Utils_Tuple2(
			2553,
			{answer: '手木日山', englishKey: 'QDAU', id: 2553, target: '耙'}),
			_Utils_Tuple2(
			2554,
			{answer: '尸十火', englishKey: 'SJF', id: 2554, target: '耿'}),
			_Utils_Tuple2(
			2555,
			{answer: '日一月戈', englishKey: 'AMBI', id: 2555, target: '曇'}),
			_Utils_Tuple2(
			2556,
			{answer: '竹木一火十', englishKey: 'HDMFJ', id: 2556, target: '秤'}),
			_Utils_Tuple2(
			2557,
			{answer: '水金火木', englishKey: 'ECFD', id: 2557, target: '粱'}),
			_Utils_Tuple2(
			2558,
			{answer: '火木廿土火', englishKey: 'FDTGF', id: 2558, target: '糕'}),
			_Utils_Tuple2(
			2559,
			{answer: '十中竹女', englishKey: 'JLHV', id: 2559, target: '衷'}),
			_Utils_Tuple2(
			2560,
			{answer: '月金竹水', englishKey: 'BCHE', id: 2560, target: '販'}),
			_Utils_Tuple2(
			2561,
			{answer: '一一一女', englishKey: 'MMMV', id: 2561, target: '辰'}),
			_Utils_Tuple2(
			2562,
			{answer: '口土土', englishKey: 'RGG', id: 2562, target: '哇'}),
			_Utils_Tuple2(
			2563,
			{answer: '口尸水戈', englishKey: 'RSEI', id: 2563, target: '囑'}),
			_Utils_Tuple2(
			2564,
			{answer: '十尸中中', englishKey: 'JSLL', id: 2564, target: '宦'}),
			_Utils_Tuple2(
			2565,
			{answer: '手弓竹尸', englishKey: 'QNHS', id: 2565, target: '扔'}),
			_Utils_Tuple2(
			2566,
			{answer: '木竹竹竹', englishKey: 'DHHH', id: 2566, target: '杉'}),
			_Utils_Tuple2(
			2567,
			{answer: '卜口人尸', englishKey: 'YROS', id: 2567, target: '詐'}),
			_Utils_Tuple2(
			2568,
			{answer: '口一木', englishKey: 'RMD', id: 2568, target: '吁'}),
			_Utils_Tuple2(
			2569,
			{answer: '月廿山', englishKey: 'BTU', id: 2569, target: '岡'}),
			_Utils_Tuple2(
			2570,
			{answer: '戈卜木中', englishKey: 'IYDL', id: 2570, target: '廓'}),
			_Utils_Tuple2(
			2571,
			{answer: '心人田卜', englishKey: 'POWY', id: 2571, target: '悔'}),
			_Utils_Tuple2(
			2572,
			{answer: '竹日心', englishKey: 'HAP', id: 2572, target: '皂'}),
			_Utils_Tuple2(
			2573,
			{answer: '人弓手一月', englishKey: 'ONQMB', id: 2573, target: '氰'}),
			_Utils_Tuple2(
			2574,
			{answer: '大大月', englishKey: 'KKB', id: 2574, target: '肴'}),
			_Utils_Tuple2(
			2575,
			{answer: '大金中弓', englishKey: 'KCLN', id: 2575, target: '剎'}),
			_Utils_Tuple2(
			2576,
			{answer: '心戈', englishKey: 'PI', id: 2576, target: '勺'}),
			_Utils_Tuple2(
			2577,
			{answer: '十田中月', englishKey: 'JWLB', id: 2577, target: '寓'}),
			_Utils_Tuple2(
			2578,
			{answer: '一土尸手火', englishKey: 'MGSQF', id: 2578, target: '瑪'}),
			_Utils_Tuple2(
			2579,
			{answer: '人大', englishKey: 'OK', id: 2579, target: '矢'}),
			_Utils_Tuple2(
			2580,
			{answer: '土大一尸', englishKey: 'GKMS', id: 2580, target: '垮'}),
			_Utils_Tuple2(
			2581,
			{answer: '水心人山', englishKey: 'EPOU', id: 2581, target: '淘'}),
			_Utils_Tuple2(
			2582,
			{answer: '卜十竹人十', englishKey: 'YJHOJ', id: 2582, target: '瓣'}),
			_Utils_Tuple2(
			2583,
			{answer: '竹心日', englishKey: 'HPA', id: 2583, target: '筍'}),
			_Utils_Tuple2(
			2584,
			{answer: '月金一十', englishKey: 'BCMJ', id: 2584, target: '罕'}),
			_Utils_Tuple2(
			2585,
			{answer: '金竹十土', englishKey: 'CHJG', id: 2585, target: '鍾'}),
			_Utils_Tuple2(
			2586,
			{answer: '口木中弓', englishKey: 'RDLN', id: 2586, target: '喇'}),
			_Utils_Tuple2(
			2587,
			{answer: '中月竹日', englishKey: 'LBHA', id: 2587, target: '帕'}),
			_Utils_Tuple2(
			2588,
			{answer: '廿金心', englishKey: 'TCP', id: 2588, target: '恭'}),
			_Utils_Tuple2(
			2589,
			{answer: '手卜戈十', englishKey: 'QYIJ', id: 2589, target: '摔'}),
			_Utils_Tuple2(
			2590,
			{answer: '木十女', englishKey: 'DJV', id: 2590, target: '桉'}),
			_Utils_Tuple2(
			2591,
			{answer: '竹木中', englishKey: 'HDL', id: 2591, target: '秉'}),
			_Utils_Tuple2(
			2592,
			{answer: '金弓戈口', englishKey: 'CNIR', id: 2592, target: '銘'}),
			_Utils_Tuple2(
			2593,
			{answer: '尸竹竹竹金', englishKey: 'SHHHC', id: 2593, target: '鬚'}),
			_Utils_Tuple2(
			2594,
			{answer: '卜難火', englishKey: 'YXF', id: 2594, target: '齋'}),
			_Utils_Tuple2(
			2595,
			{answer: '人人一人', englishKey: 'OOMO', id: 2595, target: '儉'}),
			_Utils_Tuple2(
			2596,
			{answer: '口金', englishKey: 'RC', id: 2596, target: '叭'}),
			_Utils_Tuple2(
			2597,
			{answer: '中月竹弓戈', englishKey: 'LBHNI', id: 2597, target: '帆'}),
			_Utils_Tuple2(
			2598,
			{answer: '大竹竹田', englishKey: 'KHHW', id: 2598, target: '瘤'}),
			_Utils_Tuple2(
			2599,
			{answer: '一口尸中月', englishKey: 'MRSLB', id: 2599, target: '砸'}),
			_Utils_Tuple2(
			2600,
			{answer: '戈火田木', englishKey: 'IFWD', id: 2600, target: '祼'}),
			_Utils_Tuple2(
			2601,
			{answer: '竹卜竹十', englishKey: 'HYHJ', id: 2601, target: '篷'}),
			_Utils_Tuple2(
			2602,
			{answer: '月十水', englishKey: 'BJE', id: 2602, target: '肢'}),
			_Utils_Tuple2(
			2603,
			{answer: '廿月火水', englishKey: 'TBFE', id: 2603, target: '藤'}),
			_Utils_Tuple2(
			2604,
			{answer: '手口大尸', englishKey: 'QRKS', id: 2604, target: '拐'}),
			_Utils_Tuple2(
			2605,
			{answer: '月十月木', englishKey: 'BJBD', id: 2605, target: '脖'}),
			_Utils_Tuple2(
			2606,
			{answer: '日十大日', englishKey: 'AJKA', id: 2606, target: '暑'}),
			_Utils_Tuple2(
			2607,
			{answer: '月山弓人廿', englishKey: 'BUNOT', id: 2607, target: '瞪'}),
			_Utils_Tuple2(
			2608,
			{answer: '一弓人戈一', englishKey: 'MNOIM', id: 2608, target: '殲'}),
			_Utils_Tuple2(
			2609,
			{answer: '竹一十', englishKey: 'HMJ', id: 2609, target: '竿'}),
			_Utils_Tuple2(
			2610,
			{answer: '竹竹手一', englishKey: 'HHQM', id: 2610, target: '笙'}),
			_Utils_Tuple2(
			2611,
			{answer: '廿女火廿', englishKey: 'TVFT', id: 2611, target: '蘊'}),
			_Utils_Tuple2(
			2612,
			{answer: '一田月一口', englishKey: 'MWBMR', id: 2612, target: '酮'}),
			_Utils_Tuple2(
			2613,
			{answer: '口廿一十', englishKey: 'RTMJ', id: 2613, target: '嘩'}),
			_Utils_Tuple2(
			2614,
			{answer: '月山十手口', englishKey: 'BUJQR', id: 2614, target: '瞎'}),
			_Utils_Tuple2(
			2615,
			{answer: '尸竹戈', englishKey: 'SHI', id: 2615, target: '刃'}),
			_Utils_Tuple2(
			2616,
			{answer: '山廿一人', englishKey: 'UTMO', id: 2616, target: '嵌'}),
			_Utils_Tuple2(
			2617,
			{answer: '木手竹大', englishKey: 'DQHK', id: 2617, target: '楔'}),
			_Utils_Tuple2(
			2618,
			{answer: '木山女戈火', englishKey: 'DUVIF', id: 2618, target: '紮'}),
			_Utils_Tuple2(
			2619,
			{answer: '廿手木日', englishKey: 'TQDA', id: 2619, target: '藉'}),
			_Utils_Tuple2(
			2620,
			{answer: '口山一月', englishKey: 'RUMB', id: 2620, target: '喘'}),
			_Utils_Tuple2(
			2621,
			{answer: '戈木月山', englishKey: 'IDBU', id: 2621, target: '廂'}),
			_Utils_Tuple2(
			2622,
			{answer: '手卜月月', englishKey: 'QYBB', id: 2622, target: '撾'}),
			_Utils_Tuple2(
			2623,
			{answer: '木人大', englishKey: 'DOK', id: 2623, target: '枚'}),
			_Utils_Tuple2(
			2624,
			{answer: '竹田一女尸', englishKey: 'HWMVS', id: 2624, target: '粵'}),
			_Utils_Tuple2(
			2625,
			{answer: '戈竹一口', englishKey: 'IHMR', id: 2625, target: '咸'}),
			_Utils_Tuple2(
			2626,
			{answer: '手人一土', englishKey: 'QOMG', id: 2626, target: '拴'}),
			_Utils_Tuple2(
			2627,
			{answer: '竹中人', englishKey: 'HLO', id: 2627, target: '爪'}),
			_Utils_Tuple2(
			2628,
			{answer: '月手山', englishKey: 'BQU', id: 2628, target: '甩'}),
			_Utils_Tuple2(
			2629,
			{answer: '月木人水', englishKey: 'BDOE', id: 2629, target: '膝'}),
			_Utils_Tuple2(
			2630,
			{answer: '月女心', englishKey: 'BVP', id: 2630, target: '懇'}),
			_Utils_Tuple2(
			2631,
			{answer: '月十弓山', englishKey: 'BJNU', id: 2631, target: '腕'}),
			_Utils_Tuple2(
			2632,
			{answer: '女尸竹山', englishKey: 'VSHU', id: 2632, target: '娓'}),
			_Utils_Tuple2(
			2633,
			{answer: '尸中中女', englishKey: 'SLLV', id: 2633, target: '屢'}),
			_Utils_Tuple2(
			2634,
			{answer: '火竹山心', englishKey: 'FHUP', id: 2634, target: '熄'}),
			_Utils_Tuple2(
			2635,
			{answer: '金廿田', englishKey: 'CTW', id: 2635, target: '錨'}),
			_Utils_Tuple2(
			2636,
			{answer: '口火月田', englishKey: 'RFBW', id: 2636, target: '噹'}),
			_Utils_Tuple2(
			2637,
			{answer: '尸山心', englishKey: 'SUP', id: 2637, target: '忌'}),
			_Utils_Tuple2(
			2638,
			{answer: '心竹山戈', englishKey: 'PHUI', id: 2638, target: '愧'}),
			_Utils_Tuple2(
			2639,
			{answer: '大弓戈', englishKey: 'KNI', id: 2639, target: '丸'}),
			_Utils_Tuple2(
			2640,
			{answer: '田戈十月', englishKey: 'WIJB', id: 2640, target: '圃'}),
			_Utils_Tuple2(
			2641,
			{answer: '木十金尸', englishKey: 'DJCS', id: 2641, target: '榨'}),
			_Utils_Tuple2(
			2642,
			{answer: '廿一廿弓', englishKey: 'TMTN', id: 2642, target: '荊'}),
			_Utils_Tuple2(
			2643,
			{answer: '尸火水戈戈', englishKey: 'SFEII', id: 2643, target: '騷'}),
			_Utils_Tuple2(
			2644,
			{answer: '心山', englishKey: 'PU', id: 2644, target: '屯'}),
			_Utils_Tuple2(
			2645,
			{answer: '竹山火火', englishKey: 'HUFF', id: 2645, target: '毯'}),
			_Utils_Tuple2(
			2646,
			{answer: '廿一火火', englishKey: 'TMFF', id: 2646, target: '蒜'}),
			_Utils_Tuple2(
			2647,
			{answer: '中戈田中戈', englishKey: 'LIWLI', id: 2647, target: '蠋'}),
			_Utils_Tuple2(
			2648,
			{answer: '人戈人戈', englishKey: 'OIOI', id: 2648, target: '俯'}),
			_Utils_Tuple2(
			2649,
			{answer: '中中弓', englishKey: 'LLN', id: 2649, target: '弗'}),
			_Utils_Tuple2(
			2650,
			{answer: '木火月', englishKey: 'DFB', id: 2650, target: '梢'}),
			_Utils_Tuple2(
			2651,
			{answer: '竹人一口弓', englishKey: 'HOMRN', id: 2651, target: '衙'}),
			_Utils_Tuple2(
			2652,
			{answer: '戈難心', englishKey: 'IXP', id: 2652, target: '鹿'}),
			_Utils_Tuple2(
			2653,
			{answer: '手金', englishKey: 'QC', id: 2653, target: '扒'}),
			_Utils_Tuple2(
			2654,
			{answer: '水一一心', englishKey: 'EMMP', id: 2654, target: '灑'}),
			_Utils_Tuple2(
			2655,
			{answer: '十十竹大月', englishKey: 'JJHKB', id: 2655, target: '轎'}),
			_Utils_Tuple2(
			2656,
			{answer: '口一中一', englishKey: 'RMLM', id: 2656, target: '啞'}),
			_Utils_Tuple2(
			2657,
			{answer: '田田田土', englishKey: 'WWWG', id: 2657, target: '壘'}),
			_Utils_Tuple2(
			2658,
			{answer: '卜口卜口火', englishKey: 'YRYRF', id: 2658, target: '諒'}),
			_Utils_Tuple2(
			2659,
			{answer: '月金戈戈', englishKey: 'BCII', id: 2659, target: '賤'}),
			_Utils_Tuple2(
			2660,
			{answer: '口一日心竹', englishKey: 'RMAPH', id: 2660, target: '踢'}),
			_Utils_Tuple2(
			2661,
			{answer: '木十一火', englishKey: 'DJMF', id: 2661, target: '棕'}),
			_Utils_Tuple2(
			2662,
			{answer: '水戈弓水', englishKey: 'EINE', id: 2662, target: '泳'}),
			_Utils_Tuple2(
			2663,
			{answer: '水心竹', englishKey: 'EPH', id: 2663, target: '泌'}),
			_Utils_Tuple2(
			2664,
			{answer: '水尸一土', englishKey: 'ESMG', id: 2664, target: '渥'}),
			_Utils_Tuple2(
			2665,
			{answer: '水月竹難', englishKey: 'EBHX', id: 2665, target: '滔'}),
			_Utils_Tuple2(
			2666,
			{answer: '竹人金一弓', englishKey: 'HOCMN', id: 2666, target: '銜'}),
			_Utils_Tuple2(
			2667,
			{answer: '人戈竹月口', englishKey: 'OIHBR', id: 2667, target: '餉'}),
			_Utils_Tuple2(
			2668,
			{answer: '口心竹竹', englishKey: 'RPHH', id: 2668, target: '吻'}),
			_Utils_Tuple2(
			2669,
			{answer: '手日弓口', englishKey: 'QANR', id: 2669, target: '擱'}),
			_Utils_Tuple2(
			2670,
			{answer: '竹弓木', englishKey: 'HND', id: 2670, target: '梨'}),
			_Utils_Tuple2(
			2671,
			{answer: '木月金女', englishKey: 'DBCV', id: 2671, target: '櫻'}),
			_Utils_Tuple2(
			2672,
			{answer: '土大火', englishKey: 'GKF', id: 2672, target: '熬'}),
			_Utils_Tuple2(
			2673,
			{answer: '廿田大', englishKey: 'TWK', id: 2673, target: '奠'}),
			_Utils_Tuple2(
			2674,
			{answer: '女大弓', englishKey: 'VKN', id: 2674, target: '姨'}),
			_Utils_Tuple2(
			2675,
			{answer: '人一竹', englishKey: 'OMH', id: 2675, target: '乒'}),
			_Utils_Tuple2(
			2676,
			{answer: '心日心竹', englishKey: 'PAPH', id: 2676, target: '惕'}),
			_Utils_Tuple2(
			2677,
			{answer: '尸十中田尸', englishKey: 'SJLWS', id: 2677, target: '聘'}),
			_Utils_Tuple2(
			2678,
			{answer: '月十弓中', englishKey: 'BJNL', id: 2678, target: '鄆'}),
			_Utils_Tuple2(
			2679,
			{answer: '中心田廿金', englishKey: 'LPWTC', id: 2679, target: '冀'}),
			_Utils_Tuple2(
			2680,
			{answer: '女火手十中', englishKey: 'VFQJL', id: 2680, target: '綁'}),
			_Utils_Tuple2(
			2681,
			{answer: '口大尸口', englishKey: 'RKSR', id: 2681, target: '咖'}),
			_Utils_Tuple2(
			2682,
			{answer: '尸火木戈', englishKey: 'SFDI', id: 2682, target: '尉'}),
			_Utils_Tuple2(
			2683,
			{answer: '卜田木女', englishKey: 'YWDV', id: 2683, target: '裹'}),
			_Utils_Tuple2(
			2684,
			{answer: '一田竹木', englishKey: 'MWHD', id: 2684, target: '酥'}),
			_Utils_Tuple2(
			2685,
			{answer: '十一金竹', englishKey: 'JMCH', id: 2685, target: '寡'}),
			_Utils_Tuple2(
			2686,
			{answer: '卜大一竹竹', englishKey: 'YKMHH', id: 2686, target: '彥'}),
			_Utils_Tuple2(
			2687,
			{answer: '口中一卜', englishKey: 'RLMY', id: 2687, target: '啡'}),
			_Utils_Tuple2(
			2688,
			{answer: '竹木月土口', englishKey: 'HDBGR', id: 2688, target: '稠'}),
			_Utils_Tuple2(
			2689,
			{answer: '手廿廿', englishKey: 'QTT', id: 2689, target: '拼'}),
			_Utils_Tuple2(
			2690,
			{answer: '手卜田一', englishKey: 'QYWM', id: 2690, target: '擅'}),
			_Utils_Tuple2(
			2691,
			{answer: '水女', englishKey: 'EV', id: 2691, target: '汝'}),
			_Utils_Tuple2(
			2692,
			{answer: '水大戈', englishKey: 'EKI', id: 2692, target: '汰'}),
			_Utils_Tuple2(
			2693,
			{answer: '中戈手十', englishKey: 'LIQJ', id: 2693, target: '蚌'}),
			_Utils_Tuple2(
			2694,
			{answer: '金心山', englishKey: 'CPU', id: 2694, target: '鈍'}),
			_Utils_Tuple2(
			2695,
			{answer: '金竹木尸', englishKey: 'CHDS', id: 2695, target: '銹'}),
			_Utils_Tuple2(
			2696,
			{answer: '手田木', englishKey: 'QWD', id: 2696, target: '捆'}),
			_Utils_Tuple2(
			2697,
			{answer: '火月人大', englishKey: 'FBOK', id: 2697, target: '敞'}),
			_Utils_Tuple2(
			2698,
			{answer: '卜弓木火', englishKey: 'YNDF', id: 2698, target: '遜'}),
			_Utils_Tuple2(
			2699,
			{answer: '火人土', englishKey: 'FOG', id: 2699, target: '雀'}),
			_Utils_Tuple2(
			2700,
			{answer: '木木田', englishKey: 'DDW', id: 2700, target: '棟'}),
			_Utils_Tuple2(
			2701,
			{answer: '卜口廿中一', englishKey: 'YRTLM', id: 2701, target: '謹'}),
			_Utils_Tuple2(
			2702,
			{answer: '弓火田土', englishKey: 'NFWG', id: 2702, target: '鯉'}),
			_Utils_Tuple2(
			2703,
			{answer: '口卜女人', englishKey: 'RYVO', id: 2703, target: '咳'}),
			_Utils_Tuple2(
			2704,
			{answer: '手戈月戈', englishKey: 'QIBI', id: 2704, target: '搏'}),
			_Utils_Tuple2(
			2705,
			{answer: '廿十口月', englishKey: 'TJRB', id: 2705, target: '葫'}),
			_Utils_Tuple2(
			2706,
			{answer: '月金大月', englishKey: 'BCKB', id: 2706, target: '賄'}),
			_Utils_Tuple2(
			2707,
			{answer: '弓火火木手', englishKey: 'NFFDQ', id: 2707, target: '鱗'}),
			_Utils_Tuple2(
			2708,
			{answer: '卜口', englishKey: 'YR', id: 2708, target: '占'}),
			_Utils_Tuple2(
			2709,
			{answer: '土日尸一', englishKey: 'GASM', id: 2709, target: '塌'}),
			_Utils_Tuple2(
			2710,
			{answer: '心尸竹', englishKey: 'PSH', id: 2710, target: '忉'}),
			_Utils_Tuple2(
			2711,
			{answer: '卜口廿卜山', englishKey: 'YRTYU', id: 2711, target: '謊'}),
			_Utils_Tuple2(
			2712,
			{answer: '口人尸', englishKey: 'ROS', id: 2712, target: '咋'}),
			_Utils_Tuple2(
			2713,
			{answer: '心大中月', englishKey: 'PKLB', id: 2713, target: '怖'}),
			_Utils_Tuple2(
			2714,
			{answer: '戈竹', englishKey: 'IH', id: 2714, target: '戊'}),
			_Utils_Tuple2(
			2715,
			{answer: '木土口', englishKey: 'DGR', id: 2715, target: '桔'}),
			_Utils_Tuple2(
			2716,
			{answer: '月戈心金', englishKey: 'BIPC', id: 2716, target: '膩'}),
			_Utils_Tuple2(
			2717,
			{answer: '竹月尸尸', englishKey: 'HBSS', id: 2717, target: '龜'}),
			_Utils_Tuple2(
			2718,
			{answer: '口土口口', englishKey: 'RGRR', id: 2718, target: '嘻'}),
			_Utils_Tuple2(
			2719,
			{answer: '土十廿金', englishKey: 'GJTC', id: 2719, target: '墳'}),
			_Utils_Tuple2(
			2720,
			{answer: '竹木', englishKey: 'HD', id: 2720, target: '禾'}),
			_Utils_Tuple2(
			2721,
			{answer: '土弓人', englishKey: 'GNO', id: 2721, target: '坎'}),
			_Utils_Tuple2(
			2722,
			{answer: '手田卜戈', englishKey: 'QWYI', id: 2722, target: '拇'}),
			_Utils_Tuple2(
			2723,
			{answer: '手戈戈竹', englishKey: 'QIIH', id: 2723, target: '摻'}),
			_Utils_Tuple2(
			2724,
			{answer: '火竹尸一', englishKey: 'FHSM', id: 2724, target: '煽'}),
			_Utils_Tuple2(
			2725,
			{answer: '大竹竹口月', englishKey: 'KHHRB', id: 2725, target: '獅'}),
			_Utils_Tuple2(
			2726,
			{answer: '十一山水', englishKey: 'JMUE', id: 2726, target: '寇'}),
			_Utils_Tuple2(
			2727,
			{answer: '木一中大', englishKey: 'DMLK', id: 2727, target: '梗'}),
			_Utils_Tuple2(
			2728,
			{answer: '戈人土火', englishKey: 'IOGF', id: 2728, target: '鷹'}),
			_Utils_Tuple2(
			2729,
			{answer: '口廿金', englishKey: 'RTC', id: 2729, target: '哄'}),
			_Utils_Tuple2(
			2730,
			{answer: '月竹水口', englishKey: 'BHER', id: 2730, target: '胳'}),
			_Utils_Tuple2(
			2731,
			{answer: '廿戈大廿', englishKey: 'TIKT', id: 2731, target: '莽'}),
			_Utils_Tuple2(
			2732,
			{answer: '一月卜大', englishKey: 'MBYK', id: 2732, target: '雯'}),
			_Utils_Tuple2(
			2733,
			{answer: '人竹金水', englishKey: 'OHCE', id: 2733, target: '傻'}),
			_Utils_Tuple2(
			2734,
			{answer: '口人一弓', englishKey: 'ROMN', id: 2734, target: '喻'}),
			_Utils_Tuple2(
			2735,
			{answer: '土一火十', englishKey: 'GMFJ', id: 2735, target: '坪'}),
			_Utils_Tuple2(
			2736,
			{answer: '水中難中', englishKey: 'ELXL', id: 2736, target: '淵'}),
			_Utils_Tuple2(
			2737,
			{answer: '火木戈中水', englishKey: 'FDILE', id: 2737, target: '糠'}),
			_Utils_Tuple2(
			2738,
			{answer: '水日土', englishKey: 'EAG', id: 2738, target: '涅'}),
			_Utils_Tuple2(
			2739,
			{answer: '口一弓一山', englishKey: 'RMNMU', id: 2739, target: '跪'}),
			_Utils_Tuple2(
			2740,
			{answer: '金中弓', englishKey: 'CLN', id: 2740, target: '釗'}),
			_Utils_Tuple2(
			2741,
			{answer: '人人田卜', englishKey: 'OOWY', id: 2741, target: '侮'}),
			_Utils_Tuple2(
			2742,
			{answer: '難卜金大', englishKey: 'XYCK', id: 2742, target: '奕'}),
			_Utils_Tuple2(
			2743,
			{answer: '木中月山', englishKey: 'DLBU', id: 2743, target: '枕'}),
			_Utils_Tuple2(
			2744,
			{answer: '月火月土', englishKey: 'BFBG', id: 2744, target: '膛'}),
			_Utils_Tuple2(
			2745,
			{answer: '廿心心心', englishKey: 'TPPP', id: 2745, target: '蕊'}),
			_Utils_Tuple2(
			2746,
			{answer: '尸十卜一口', englishKey: 'SJYMR', id: 2746, target: '譬'}),
			_Utils_Tuple2(
			2747,
			{answer: '金口竹山', englishKey: 'CRHU', id: 2747, target: '兌'}),
			_Utils_Tuple2(
			2748,
			{answer: '十尸一竹', englishKey: 'JSMH', id: 2748, target: '寥'}),
			_Utils_Tuple2(
			2749,
			{answer: '手一尸山', englishKey: 'QMSU', id: 2749, target: '扼'}),
			_Utils_Tuple2(
			2750,
			{answer: '卜十女火十', englishKey: 'YJVFJ', id: 2750, target: '辮'}),
			_Utils_Tuple2(
			2751,
			{answer: '月日竹一', englishKey: 'BAHM', id: 2751, target: '腥'}),
			_Utils_Tuple2(
			2752,
			{answer: '土金弓中', englishKey: 'GCNL', id: 2752, target: '郝'}),
			_Utils_Tuple2(
			2753,
			{answer: '戈竹戈', englishKey: 'IHI', id: 2753, target: '戍'}),
			_Utils_Tuple2(
			2754,
			{answer: '日一一心', englishKey: 'AMMP', id: 2754, target: '曬'}),
			_Utils_Tuple2(
			2755,
			{answer: '手木田中月', englishKey: 'QDWLB', id: 2755, target: '耦'}),
			_Utils_Tuple2(
			2756,
			{answer: '口一卜月月', englishKey: 'RMYBB', id: 2756, target: '蹄'}),
			_Utils_Tuple2(
			2757,
			{answer: '金心戈一', englishKey: 'CPIM', id: 2757, target: '鈞'}),
			_Utils_Tuple2(
			2758,
			{answer: '心山大', englishKey: 'PUK', id: 2758, target: '匈'}),
			_Utils_Tuple2(
			2759,
			{answer: '尸心心', englishKey: 'SPP', id: 2759, target: '屁'}),
			_Utils_Tuple2(
			2760,
			{answer: '日一戈', englishKey: 'AMI', id: 2760, target: '戥'}),
			_Utils_Tuple2(
			2761,
			{answer: '木手大難', englishKey: 'DQKX', id: 2761, target: '樁'}),
			_Utils_Tuple2(
			2762,
			{answer: '月山人土', englishKey: 'BUOG', id: 2762, target: '瞿'}),
			_Utils_Tuple2(
			2763,
			{answer: '卜口弓戈月', englishKey: 'YRNIB', id: 2763, target: '誦'}),
			_Utils_Tuple2(
			2764,
			{answer: '人火手山', englishKey: 'OFQU', id: 2764, target: '倦'}),
			_Utils_Tuple2(
			2765,
			{answer: '山竹難金', englishKey: 'UHXC', id: 2765, target: '嶼'}),
			_Utils_Tuple2(
			2766,
			{answer: '手弓戈弓', englishKey: 'QNIN', id: 2766, target: '抒'}),
			_Utils_Tuple2(
			2767,
			{answer: '水山弓水', englishKey: 'EUNE', id: 2767, target: '涵'}),
			_Utils_Tuple2(
			2768,
			{answer: '中心口山', englishKey: 'LPRU', id: 2768, target: '袍'}),
			_Utils_Tuple2(
			2769,
			{answer: '金心戈', englishKey: 'CPI', id: 2769, target: '釣'}),
			_Utils_Tuple2(
			2770,
			{answer: '口月尸一口', englishKey: 'RBSMR', id: 2770, target: '嗣'}),
			_Utils_Tuple2(
			2771,
			{answer: '金尸竹心', englishKey: 'CSHP', id: 2771, target: '忿'}),
			_Utils_Tuple2(
			2772,
			{answer: '戈尸人大', englishKey: 'ISOK', id: 2772, target: '敷'}),
			_Utils_Tuple2(
			2773,
			{answer: '水日一人', englishKey: 'EAMO', id: 2773, target: '湜'}),
			_Utils_Tuple2(
			2774,
			{answer: '尸十竹竹中', englishKey: 'SJHHL', id: 2774, target: '聊'}),
			_Utils_Tuple2(
			2775,
			{answer: '中戈一', englishKey: 'LIM', id: 2775, target: '虹'}),
			_Utils_Tuple2(
			2776,
			{answer: '口一月竹難', englishKey: 'RMBHX', id: 2776, target: '蹈'}),
			_Utils_Tuple2(
			2777,
			{answer: '卜田戈竹口', englishKey: 'YWIHR', id: 2777, target: '鹹'}),
			_Utils_Tuple2(
			2778,
			{answer: '口田大心', englishKey: 'RWKP', id: 2778, target: '嗯'}),
			_Utils_Tuple2(
			2779,
			{answer: '女尸中中', englishKey: 'VSLL', id: 2779, target: '姬'}),
			_Utils_Tuple2(
			2780,
			{answer: '水十中女', englishKey: 'EJLV', id: 2780, target: '淒'}),
			_Utils_Tuple2(
			2781,
			{answer: '火卜水木', englishKey: 'FYED', id: 2781, target: '燦'}),
			_Utils_Tuple2(
			2782,
			{answer: '大竹卜金大', englishKey: 'KHYCK', id: 2782, target: '狡'}),
			_Utils_Tuple2(
			2783,
			{answer: '火木卜竹口', englishKey: 'FDYHR', id: 2783, target: '糙'}),
			_Utils_Tuple2(
			2784,
			{answer: '口一弓人廿', englishKey: 'RMNOT', id: 2784, target: '蹬'}),
			_Utils_Tuple2(
			2785,
			{answer: '人金田日', englishKey: 'OCWA', id: 2785, target: '僧'}),
			_Utils_Tuple2(
			2786,
			{answer: '口水人卜', englishKey: 'REOY', id: 2786, target: '嗨'}),
			_Utils_Tuple2(
			2787,
			{answer: '木一金田', englishKey: 'DMCW', id: 2787, target: '栖'}),
			_Utils_Tuple2(
			2788,
			{answer: '竹木一', englishKey: 'HDM', id: 2788, target: '笨'}),
			_Utils_Tuple2(
			2789,
			{answer: '十口卜廿十', englishKey: 'JRYTJ', id: 2789, target: '辜'}),
			_Utils_Tuple2(
			2790,
			{answer: '木一土', englishKey: 'DMG', id: 2790, target: '枉'}),
			_Utils_Tuple2(
			2791,
			{answer: '十十人尸一', englishKey: 'JJOSM', id: 2791, target: '翰'}),
			_Utils_Tuple2(
			2792,
			{answer: '廿戈一人', englishKey: 'TIMO', id: 2792, target: '茨'}),
			_Utils_Tuple2(
			2793,
			{answer: '卜口竹弓戈', englishKey: 'YRHNI', id: 2793, target: '諷'}),
			_Utils_Tuple2(
			2794,
			{answer: '口竹女人', englishKey: 'RHVO', id: 2794, target: '呱'}),
			_Utils_Tuple2(
			2795,
			{answer: '山十水', englishKey: 'UJE', id: 2795, target: '岐'}),
			_Utils_Tuple2(
			2796,
			{answer: '山十十中', englishKey: 'UJJL', id: 2796, target: '嶄'}),
			_Utils_Tuple2(
			2797,
			{answer: '木月木月', englishKey: 'DBDB', id: 2797, target: '棗'}),
			_Utils_Tuple2(
			2798,
			{answer: '口十口', englishKey: 'RJR', id: 2798, target: '咕'}),
			_Utils_Tuple2(
			2799,
			{answer: '手尸田山', englishKey: 'QSWU', id: 2799, target: '攬'}),
			_Utils_Tuple2(
			2800,
			{answer: '水心山大', englishKey: 'EPUK', id: 2800, target: '洶'}),
			_Utils_Tuple2(
			2801,
			{answer: '水火火尸', englishKey: 'EFFS', id: 2801, target: '澇'}),
			_Utils_Tuple2(
			2802,
			{answer: '木木火', englishKey: 'DDF', id: 2802, target: '焚'}),
			_Utils_Tuple2(
			2803,
			{answer: '大竹人弓大', englishKey: 'KHONK', id: 2803, target: '猴'}),
			_Utils_Tuple2(
			2804,
			{answer: '一月女', englishKey: 'MBV', id: 2804, target: '耍'}),
			_Utils_Tuple2(
			2805,
			{answer: '土人火月口', englishKey: 'GOFBR', id: 2805, target: '趟'}),
			_Utils_Tuple2(
			2806,
			{answer: '人卜月尸', englishKey: 'OYBS', id: 2806, target: '傍'}),
			_Utils_Tuple2(
			2807,
			{answer: '尸十尸竹', englishKey: 'SJSH', id: 2807, target: '劈'}),
			_Utils_Tuple2(
			2808,
			{answer: '月田中戈', englishKey: 'BWLI', id: 2808, target: '爵'}),
			_Utils_Tuple2(
			2809,
			{answer: '一土卜廿十', englishKey: 'MGYTJ', id: 2809, target: '璋'}),
			_Utils_Tuple2(
			2810,
			{answer: '卜心田大尸', englishKey: 'YPWKS', id: 2810, target: '虜'}),
			_Utils_Tuple2(
			2811,
			{answer: '金戈廿水', englishKey: 'CITE', id: 2811, target: '鍍'}),
			_Utils_Tuple2(
			2812,
			{answer: '廿日', englishKey: 'TA', id: 2812, target: '昔'}),
			_Utils_Tuple2(
			2813,
			{answer: '月山竹木火', englishKey: 'BUHDF', id: 2813, target: '瞅'}),
			_Utils_Tuple2(
			2814,
			{answer: '口一月木', englishKey: 'RMBD', id: 2814, target: '踩'}),
			_Utils_Tuple2(
			2815,
			{answer: '卜人弓', englishKey: 'YON', id: 2815, target: '迄'}),
			_Utils_Tuple2(
			2816,
			{answer: '金人一月', englishKey: 'COMB', id: 2816, target: '鑰'}),
			_Utils_Tuple2(
			2817,
			{answer: '一水', englishKey: 'ME', id: 2817, target: '汞'}),
			_Utils_Tuple2(
			2818,
			{answer: '戈火廿一金', englishKey: 'IFTMC', id: 2818, target: '祺'}),
			_Utils_Tuple2(
			2819,
			{answer: '卜口弓一山', englishKey: 'YRNMU', id: 2819, target: '詭'}),
			_Utils_Tuple2(
			2820,
			{answer: '竹日竹山戈', englishKey: 'HAHUI', id: 2820, target: '魄'}),
			_Utils_Tuple2(
			2821,
			{answer: '口十十月', englishKey: 'RJJB', id: 2821, target: '嘲'}),
			_Utils_Tuple2(
			2822,
			{answer: '心竹日土', englishKey: 'PHAG', id: 2822, target: '惶'}),
			_Utils_Tuple2(
			2823,
			{answer: '月金戈一尸', englishKey: 'BCIMS', id: 2823, target: '贓'}),
			_Utils_Tuple2(
			2824,
			{answer: '口人木戈', englishKey: 'RODI', id: 2824, target: '咐'}),
			_Utils_Tuple2(
			2825,
			{answer: '廿金弓人', englishKey: 'TCNO', id: 2825, target: '歉'}),
			_Utils_Tuple2(
			2826,
			{answer: '大口口山', englishKey: 'KRRU', id: 2826, target: '癌'}),
			_Utils_Tuple2(
			2827,
			{answer: '戈卜心廿', englishKey: 'IYPT', id: 2827, target: '廬'}),
			_Utils_Tuple2(
			2828,
			{answer: '手竹水', englishKey: 'QHE', id: 2828, target: '扳'}),
			_Utils_Tuple2(
			2829,
			{answer: '尸十尸十十', englishKey: 'SJSJJ', id: 2829, target: '聶'}),
			_Utils_Tuple2(
			2830,
			{answer: '廿弓人', englishKey: 'TNO', id: 2830, target: '芡'}),
			_Utils_Tuple2(
			2831,
			{answer: '竹竹尸口口', englishKey: 'HHSRR', id: 2831, target: '軀'}),
			_Utils_Tuple2(
			2832,
			{answer: '口田弓中', englishKey: 'RWNL', id: 2832, target: '鄙'}),
			_Utils_Tuple2(
			2833,
			{answer: '手十心弓', englishKey: 'QJPN', id: 2833, target: '擰'}),
			_Utils_Tuple2(
			2834,
			{answer: '火竹日土', englishKey: 'FHAG', id: 2834, target: '煌'}),
			_Utils_Tuple2(
			2835,
			{answer: '卜口口女', englishKey: 'YRRV', id: 2835, target: '襄'}),
			_Utils_Tuple2(
			2836,
			{answer: '月金竹戈人', englishKey: 'BCHIO', id: 2836, target: '貶'}),
			_Utils_Tuple2(
			2837,
			{answer: '弓中大一月', englishKey: 'NLKMB', id: 2837, target: '隋'}),
			_Utils_Tuple2(
			2838,
			{answer: '人大口', englishKey: 'OKR', id: 2838, target: '佑'}),
			_Utils_Tuple2(
			2839,
			{answer: '十卜月心', englishKey: 'JYBP', id: 2839, target: '寵'}),
			_Utils_Tuple2(
			2840,
			{answer: '心木中金', englishKey: 'PDLC', id: 2840, target: '懶'}),
			_Utils_Tuple2(
			2841,
			{answer: '木人一土', englishKey: 'DOMG', id: 2841, target: '栓'}),
			_Utils_Tuple2(
			2842,
			{answer: '水十月金', englishKey: 'EJBC', id: 2842, target: '滇'}),
			_Utils_Tuple2(
			2843,
			{answer: '火弓人', englishKey: 'FNO', id: 2843, target: '炊'}),
			_Utils_Tuple2(
			2844,
			{answer: '十廿金口', englishKey: 'JTCR', id: 2844, target: '謇'}),
			_Utils_Tuple2(
			2845,
			{answer: '心戈口心', englishKey: 'PIRP', id: 2845, target: '憾'}),
			_Utils_Tuple2(
			2846,
			{answer: '中尸大口', englishKey: 'LSKR', id: 2846, target: '裙'}),
			_Utils_Tuple2(
			2847,
			{answer: '卜十竹水金', englishKey: 'YJHEC', id: 2847, target: '贛'}),
			_Utils_Tuple2(
			2848,
			{answer: '尸火竹水口', englishKey: 'SFHER', id: 2848, target: '駱'}),
			_Utils_Tuple2(
			2849,
			{answer: '竹女竹山', englishKey: 'HVHU', id: 2849, target: '兜'}),
			_Utils_Tuple2(
			2850,
			{answer: '竹竹尸中木', englishKey: 'HHSLD', id: 2850, target: '孵'}),
			_Utils_Tuple2(
			2851,
			{answer: '日日廿水', englishKey: 'AATE', id: 2851, target: '曝'}),
			_Utils_Tuple2(
			2852,
			{answer: '水卜廿', englishKey: 'EYT', id: 2852, target: '泣'}),
			_Utils_Tuple2(
			2853,
			{answer: '大竹日日', englishKey: 'KHAA', id: 2853, target: '猖'}),
			_Utils_Tuple2(
			2854,
			{answer: '大田十口', englishKey: 'KWJR', id: 2854, target: '痼'}),
			_Utils_Tuple2(
			2855,
			{answer: '竹難月廿', englishKey: 'HXBT', id: 2855, target: '盥'}),
			_Utils_Tuple2(
			2856,
			{answer: '女口女戈火', englishKey: 'VRVIF', id: 2856, target: '絮'}),
			_Utils_Tuple2(
			2857,
			{answer: '卜日口月金', englishKey: 'YARBC', id: 2857, target: '韻'}),
			_Utils_Tuple2(
			2858,
			{answer: '口竹月大', englishKey: 'RHBK', id: 2858, target: '噢'}),
			_Utils_Tuple2(
			2859,
			{answer: '日戈廿金', englishKey: 'AITC', id: 2859, target: '曠'}),
			_Utils_Tuple2(
			2860,
			{answer: '水廿廿', englishKey: 'ETT', id: 2860, target: '洴'}),
			_Utils_Tuple2(
			2861,
			{answer: '戈戈月廿', englishKey: 'IIBT', id: 2861, target: '盞'}),
			_Utils_Tuple2(
			2862,
			{answer: '火手月山', englishKey: 'FQBU', id: 2862, target: '眷'}),
			_Utils_Tuple2(
			2863,
			{answer: '廿大尸口', englishKey: 'TKSR', id: 2863, target: '茄'}),
			_Utils_Tuple2(
			2864,
			{answer: '廿日大日', englishKey: 'TAKA', id: 2864, target: '暮'}),
			_Utils_Tuple2(
			2865,
			{answer: '木竹竹田', englishKey: 'DHHW', id: 2865, target: '榴'}),
			_Utils_Tuple2(
			2866,
			{answer: '水大大月', englishKey: 'EKKB', id: 2866, target: '淆'}),
			_Utils_Tuple2(
			2867,
			{answer: '水月金戈', englishKey: 'EBCI', id: 2867, target: '濺'}),
			_Utils_Tuple2(
			2868,
			{answer: '廿月弓火', englishKey: 'TBNF', id: 2868, target: '煎'}),
			_Utils_Tuple2(
			2869,
			{answer: '一土廿一金', englishKey: 'MGTMC', id: 2869, target: '琪'}),
			_Utils_Tuple2(
			2870,
			{answer: '土大弓田火', englishKey: 'GKNWF', id: 2870, target: '鰲'}),
			_Utils_Tuple2(
			2871,
			{answer: '人弓', englishKey: 'ON', id: 2871, target: '乞'}),
			_Utils_Tuple2(
			2872,
			{answer: '口弓木山', englishKey: 'RNDU', id: 2872, target: '吼'}),
			_Utils_Tuple2(
			2873,
			{answer: '口日戈中', englishKey: 'RAIL', id: 2873, target: '唧'}),
			_Utils_Tuple2(
			2874,
			{answer: '口卜土手', englishKey: 'RYGQ', id: 2874, target: '噠'}),
			_Utils_Tuple2(
			2875,
			{answer: '女女田木', englishKey: 'VVWD', id: 2875, target: '巢'}),
			_Utils_Tuple2(
			2876,
			{answer: '木竹山戈', englishKey: 'DHUI', id: 2876, target: '槐'}),
			_Utils_Tuple2(
			2877,
			{answer: '水十月', englishKey: 'EJB', id: 2877, target: '沛'}),
			_Utils_Tuple2(
			2878,
			{answer: '手中中一戈', englishKey: 'QLLMI', id: 2878, target: '蜇'}),
			_Utils_Tuple2(
			2879,
			{answer: '田中心中戈', englishKey: 'WLPLI', id: 2879, target: '蜀'}),
			_Utils_Tuple2(
			2880,
			{answer: '月金廿難金', englishKey: 'BCTXC', id: 2880, target: '賺'}),
			_Utils_Tuple2(
			2881,
			{answer: '弓中心心土', englishKey: 'NLPPG', id: 2881, target: '陛'}),
			_Utils_Tuple2(
			2882,
			{answer: '月廿日月', englishKey: 'BTAB', id: 2882, target: '冪'}),
			_Utils_Tuple2(
			2883,
			{answer: '口口竹弓', englishKey: 'RRHN', id: 2883, target: '咒'}),
			_Utils_Tuple2(
			2884,
			{answer: '土土土山', englishKey: 'GGGU', id: 2884, target: '堯'}),
			_Utils_Tuple2(
			2885,
			{answer: '手日一十', englishKey: 'QAMJ', id: 2885, target: '捍'}),
			_Utils_Tuple2(
			2886,
			{answer: '日竹廿', englishKey: 'AHT', id: 2886, target: '昇'}),
			_Utils_Tuple2(
			2887,
			{answer: '金卜金大', englishKey: 'CYCK', id: 2887, target: '鉸'}),
			_Utils_Tuple2(
			2888,
			{answer: '口一弓', englishKey: 'RMN', id: 2888, target: '叮'}),
			_Utils_Tuple2(
			2889,
			{answer: '火弓月大', englishKey: 'FNBK', id: 2889, target: '煥'}),
			_Utils_Tuple2(
			2890,
			{answer: '弓大火', englishKey: 'NKF', id: 2890, target: '煞'}),
			_Utils_Tuple2(
			2891,
			{answer: '尸十中月山', englishKey: 'SJLBU', id: 2891, target: '耽'}),
			_Utils_Tuple2(
			2892,
			{answer: '中土土卜', englishKey: 'LGGY', id: 2892, target: '褂'}),
			_Utils_Tuple2(
			2893,
			{answer: '廿日大尸', englishKey: 'TAKS', id: 2893, target: '募'}),
			_Utils_Tuple2(
			2894,
			{answer: '手木田火', englishKey: 'QDWF', id: 2894, target: '揀'}),
			_Utils_Tuple2(
			2895,
			{answer: '手廿手一', englishKey: 'QTQM', id: 2895, target: '搓'}),
			_Utils_Tuple2(
			2896,
			{answer: '水大中山', englishKey: 'EKLU', id: 2896, target: '淹'}),
			_Utils_Tuple2(
			2897,
			{answer: '金大一土金', englishKey: 'CKMGC', id: 2897, target: '釜'}),
			_Utils_Tuple2(
			2898,
			{answer: '金竹水口', englishKey: 'CHER', id: 2898, target: '鉻'}),
			_Utils_Tuple2(
			2899,
			{answer: '一月心口山', englishKey: 'MBPRU', id: 2899, target: '雹'}),
			_Utils_Tuple2(
			2900,
			{answer: '火心戈', englishKey: 'FPI', id: 2900, target: '灼'}),
			_Utils_Tuple2(
			2901,
			{answer: '一土竹山戈', englishKey: 'MGHUI', id: 2901, target: '瑰'}),
			_Utils_Tuple2(
			2902,
			{answer: '心山弓中', englishKey: 'PUNL', id: 2902, target: '鄒'}),
			_Utils_Tuple2(
			2903,
			{answer: '弓火卜十十', englishKey: 'NFYJJ', id: 2903, target: '鰱'}),
			_Utils_Tuple2(
			2904,
			{answer: '女竹大月', englishKey: 'VHKB', id: 2904, target: '嬌'}),
			_Utils_Tuple2(
			2905,
			{answer: '卜十竹竹竹', englishKey: 'YJHHH', id: 2905, target: '彰'}),
			_Utils_Tuple2(
			2906,
			{answer: '一卜中火', englishKey: 'MYLF', id: 2906, target: '焉'}),
			_Utils_Tuple2(
			2907,
			{answer: '廿大中木', englishKey: 'TKLD', id: 2907, target: '荐'}),
			_Utils_Tuple2(
			2908,
			{answer: '竹竹弓', englishKey: 'HHN', id: 2908, target: '躬'}),
			_Utils_Tuple2(
			2909,
			{answer: '日人心', englishKey: 'AOP', id: 2909, target: '匙'}),
			_Utils_Tuple2(
			2910,
			{answer: '口竹水口', englishKey: 'RHER', id: 2910, target: '咯'}),
			_Utils_Tuple2(
			2911,
			{answer: '戈廿火', englishKey: 'ITF', id: 2911, target: '庶'}),
			_Utils_Tuple2(
			2912,
			{answer: '廿大口心', englishKey: 'TKRP', id: 2912, target: '惹'}),
			_Utils_Tuple2(
			2913,
			{answer: '水人一月', englishKey: 'EOMB', id: 2913, target: '淪'}),
			_Utils_Tuple2(
			2914,
			{answer: '一土木木', englishKey: 'MGDD', id: 2914, target: '琳'}),
			_Utils_Tuple2(
			2915,
			{answer: '田火手', englishKey: 'WFQ', id: 2915, target: '畔'}),
			_Utils_Tuple2(
			2916,
			{answer: '中戈人一口', englishKey: 'LIOMR', id: 2916, target: '蛤'}),
			_Utils_Tuple2(
			2917,
			{answer: '十土竹日火', englishKey: 'JGHAF', id: 2917, target: '鶴'}),
			_Utils_Tuple2(
			2918,
			{answer: '火大一弓心', englishKey: 'FKMNP', id: 2918, target: '斃'}),
			_Utils_Tuple2(
			2919,
			{answer: '水手一金', englishKey: 'EQMC', id: 2919, target: '漬'}),
			_Utils_Tuple2(
			2920,
			{answer: '竹日十一山', englishKey: 'HAJMU', id: 2920, target: '皖'}),
			_Utils_Tuple2(
			2921,
			{answer: '竹中月戈', englishKey: 'HLBI', id: 2921, target: '禹'}),
			_Utils_Tuple2(
			2922,
			{answer: '一廿弓中', englishKey: 'MTNL', id: 2922, target: '邢'}),
			_Utils_Tuple2(
			2923,
			{answer: '卜人人十', englishKey: 'YOOJ', id: 2923, target: '卒'}),
			_Utils_Tuple2(
			2924,
			{answer: '戈大中山', englishKey: 'IKLU', id: 2924, target: '庵'}),
			_Utils_Tuple2(
			2925,
			{answer: '水月竹土', englishKey: 'EBHG', id: 2925, target: '淫'}),
			_Utils_Tuple2(
			2926,
			{answer: '十金竹難女', englishKey: 'JCHXV', id: 2926, target: '竄'}),
			_Utils_Tuple2(
			2927,
			{answer: '女火山月月', englishKey: 'VFUBB', id: 2927, target: '繃'}),
			_Utils_Tuple2(
			2928,
			{answer: '土山尸一一', englishKey: 'GUSMM', id: 2928, target: '翹'}),
			_Utils_Tuple2(
			2929,
			{answer: '竹口口十', englishKey: 'HRRJ', id: 2929, target: '簞'}),
			_Utils_Tuple2(
			2930,
			{answer: '弓中一日', englishKey: 'NLMA', id: 2930, target: '陌'}),
			_Utils_Tuple2(
			2931,
			{answer: '山大竹山', englishKey: 'UKHU', id: 2931, target: '兇'}),
			_Utils_Tuple2(
			2932,
			{answer: '一人人', englishKey: 'MOO', id: 2932, target: '巫'}),
			_Utils_Tuple2(
			2933,
			{answer: '木尸尸', englishKey: 'DSS', id: 2933, target: '柜'}),
			_Utils_Tuple2(
			2934,
			{answer: '一土人大', englishKey: 'MGOK', id: 2934, target: '玫'}),
			_Utils_Tuple2(
			2935,
			{answer: '月戈月戈', englishKey: 'BIBI', id: 2935, target: '膊'}),
			_Utils_Tuple2(
			2936,
			{answer: '廿十卜土手', englishKey: 'TJYGQ', id: 2936, target: '韃'}),
			_Utils_Tuple2(
			2937,
			{answer: '手中中弓', englishKey: 'QLLN', id: 2937, target: '拂'}),
			_Utils_Tuple2(
			2938,
			{answer: '水日弓田', englishKey: 'EANW', id: 2938, target: '瀾'}),
			_Utils_Tuple2(
			2939,
			{answer: '女火月女', englishKey: 'VFBV', id: 2939, target: '綏'}),
			_Utils_Tuple2(
			2940,
			{answer: '廿人土火', englishKey: 'TOGF', id: 2940, target: '蕉'}),
			_Utils_Tuple2(
			2941,
			{answer: '月金土田金', englishKey: 'BCGWC', id: 2941, target: '贖'}),
			_Utils_Tuple2(
			2942,
			{answer: '竹尸人土', englishKey: 'HSOG', id: 2942, target: '雇'}),
			_Utils_Tuple2(
			2943,
			{answer: '竹田大大', englishKey: 'HWKK', id: 2943, target: '囪'}),
			_Utils_Tuple2(
			2944,
			{answer: '十一中金', englishKey: 'JMLC', id: 2944, target: '寅'}),
			_Utils_Tuple2(
			2945,
			{answer: '竹木人土', englishKey: 'HDOG', id: 2945, target: '稚'}),
			_Utils_Tuple2(
			2946,
			{answer: '女火中中女', englishKey: 'VFLLV', id: 2946, target: '縷'}),
			_Utils_Tuple2(
			2947,
			{answer: '月金十大日', englishKey: 'BCJKA', id: 2947, target: '賭'}),
			_Utils_Tuple2(
			2948,
			{answer: '口一口口木', englishKey: 'RMRRD', id: 2948, target: '躁'}),
			_Utils_Tuple2(
			2949,
			{answer: '金月一尸', englishKey: 'CBMS', id: 2949, target: '鋤'}),
			_Utils_Tuple2(
			2950,
			{answer: '大人一月金', englishKey: 'KOMBC', id: 2950, target: '頰'}),
			_Utils_Tuple2(
			2951,
			{answer: '戈中人', englishKey: 'ILO', id: 2951, target: '庚'}),
			_Utils_Tuple2(
			2952,
			{answer: '人弓卜女人', englishKey: 'ONYVO', id: 2952, target: '氦'}),
			_Utils_Tuple2(
			2953,
			{answer: '一土月月一', englishKey: 'MGBBM', id: 2953, target: '珊'}),
			_Utils_Tuple2(
			2954,
			{answer: '廿心口', englishKey: 'TPR', id: 2954, target: '苟'}),
			_Utils_Tuple2(
			2955,
			{answer: '廿戈難火', englishKey: 'TIXF', id: 2955, target: '薦'}),
			_Utils_Tuple2(
			2956,
			{answer: '中戈一戈土', englishKey: 'LIMIG', id: 2956, target: '蛭'}),
			_Utils_Tuple2(
			2957,
			{answer: '中戈金口山', englishKey: 'LICRU', id: 2957, target: '蛻'}),
			_Utils_Tuple2(
			2958,
			{answer: '一田心戈', englishKey: 'MWPI', id: 2958, target: '酌'}),
			_Utils_Tuple2(
			2959,
			{answer: '竹戈卜十', englishKey: 'HIYJ', id: 2959, target: '魁'}),
			_Utils_Tuple2(
			2960,
			{answer: '手火月大', englishKey: 'QFBK', id: 2960, target: '撇'}),
			_Utils_Tuple2(
			2961,
			{answer: '月廿大', englishKey: 'BTK', id: 2961, target: '朕'}),
			_Utils_Tuple2(
			2962,
			{answer: '土弓一火', englishKey: 'GNMF', id: 2962, target: '燾'}),
			_Utils_Tuple2(
			2963,
			{answer: '廿日田水', englishKey: 'TAWE', id: 2963, target: '蔓'}),
			_Utils_Tuple2(
			2964,
			{answer: '一廿十弓山', englishKey: 'MTJNU', id: 2964, target: '豌'}),
			_Utils_Tuple2(
			2965,
			{answer: '卜一口廿', englishKey: 'YMRT', id: 2965, target: '逗'}),
			_Utils_Tuple2(
			2966,
			{answer: '日弓土土', englishKey: 'ANGG', id: 2966, target: '閨'}),
			_Utils_Tuple2(
			2967,
			{answer: '人田', englishKey: 'OW', id: 2967, target: '佃'}),
			_Utils_Tuple2(
			2968,
			{answer: '人一戈土', englishKey: 'OMIG', id: 2968, target: '侄'}),
			_Utils_Tuple2(
			2969,
			{answer: '木弓一山', englishKey: 'DNMU', id: 2969, target: '桅'}),
			_Utils_Tuple2(
			2970,
			{answer: '火火月火', englishKey: 'FFBF', id: 2970, target: '熒'}),
			_Utils_Tuple2(
			2971,
			{answer: '女火口尸十', englishKey: 'VFRSJ', id: 2971, target: '緝'}),
			_Utils_Tuple2(
			2972,
			{answer: '中木木火', englishKey: 'LDDF', id: 2972, target: '襟'}),
			_Utils_Tuple2(
			2973,
			{answer: '金竹山木', englishKey: 'CHUD', id: 2973, target: '鎳'}),
			_Utils_Tuple2(
			2974,
			{answer: '人尸', englishKey: 'OS', id: 2974, target: '乍'}),
			_Utils_Tuple2(
			2975,
			{answer: '口月月水', englishKey: 'RBBE', id: 2975, target: '噯'}),
			_Utils_Tuple2(
			2976,
			{answer: '尸水女', englishKey: 'SEV', id: 2976, target: '娶'}),
			_Utils_Tuple2(
			2977,
			{answer: '水一金田', englishKey: 'EMCW', id: 2977, target: '洒'}),
			_Utils_Tuple2(
			2978,
			{answer: '竹人尸十', englishKey: 'HOSJ', id: 2978, target: '聳'}),
			_Utils_Tuple2(
			2979,
			{answer: '人戈竹土', englishKey: 'OIHG', id: 2979, target: '飪'}),
			_Utils_Tuple2(
			2980,
			{answer: '口人戈心', englishKey: 'ROIP', id: 2980, target: '唸'}),
			_Utils_Tuple2(
			2981,
			{answer: '口口一金口', englishKey: 'RRMCR', id: 2981, target: '囂'}),
			_Utils_Tuple2(
			2982,
			{answer: '水日廿水', englishKey: 'EATE', id: 2982, target: '瀑'}),
			_Utils_Tuple2(
			2983,
			{answer: '大人大口', englishKey: 'KOKR', id: 2983, target: '痴'}),
			_Utils_Tuple2(
			2984,
			{answer: '竹尸一土', englishKey: 'HSMG', id: 2984, target: '筐'}),
			_Utils_Tuple2(
			2985,
			{answer: '火月口卜女', englishKey: 'FBRYV', id: 2985, target: '裳'}),
			_Utils_Tuple2(
			2986,
			{answer: '卜廿手一月', englishKey: 'YTQMB', id: 2986, target: '靖'}),
			_Utils_Tuple2(
			2987,
			{answer: '廿十日山', englishKey: 'TJAU', id: 2987, target: '靶'}),
			_Utils_Tuple2(
			2988,
			{answer: '卜日尸竹口', englishKey: 'YASHR', id: 2988, target: '韶'}),
			_Utils_Tuple2(
			2989,
			{answer: '山人土', englishKey: 'UOG', id: 2989, target: '崔'}),
			_Utils_Tuple2(
			2990,
			{answer: '廿月中戈', englishKey: 'TBLI', id: 2990, target: '繭'}),
			_Utils_Tuple2(
			2991,
			{answer: '廿十人日', englishKey: 'TJOA', id: 2991, target: '蓿'}),
			_Utils_Tuple2(
			2992,
			{answer: '金十金口', englishKey: 'CJCR', id: 2992, target: '鎔'}),
			_Utils_Tuple2(
			2993,
			{answer: '女木中弓', englishKey: 'VDLN', id: 2993, target: '剿'}),
			_Utils_Tuple2(
			2994,
			{answer: '口十月十', englishKey: 'RJBJ', id: 2994, target: '喃'}),
			_Utils_Tuple2(
			2995,
			{answer: '女竹手戈', englishKey: 'VHQI', id: 2995, target: '娥'}),
			_Utils_Tuple2(
			2996,
			{answer: '金尸竹山', englishKey: 'CSHU', id: 2996, target: '岔'}),
			_Utils_Tuple2(
			2997,
			{answer: '手戈中口', englishKey: 'QILR', id: 2997, target: '搪'}),
			_Utils_Tuple2(
			2998,
			{answer: '手日尸水', englishKey: 'QASE', id: 2998, target: '撮'}),
			_Utils_Tuple2(
			2999,
			{answer: '人弓中中', englishKey: 'ONLL', id: 2999, target: '氘'})
		]));
var $author$project$Main$getQuestion = F2(
	function (model, num) {
		if ((!(!num)) && _Utils_eq(num, model.question.id)) {
			return _Utils_Tuple2(
				model,
				$author$project$Main$generateNumber(model));
		} else {
			var _v0 = A2($elm$core$Dict$get, num, $author$project$Questions$questions);
			if (_v0.$ === 'Just') {
				var question = _v0.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{question: question}),
					$elm$core$Platform$Cmd$none);
			} else {
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}
		}
	});
var $author$project$Main$hideAnswer = function (model) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{showAnswer: false}),
		$elm$core$Platform$Cmd$none);
};
var $elm$core$Basics$not = _Basics_not;
var $author$project$Main$openSettings = function (model) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				numMaxQuestionInput: $elm$core$String$fromInt(model.numMaxQuestion)
			}),
		$elm$core$Platform$Cmd$none);
};
var $author$project$Main$showAnswer = function (model) {
	return model.showAnswer ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
		_Utils_update(
			model,
			{showAnswer: true}),
		$author$project$Main$sendPlausibleEvent('ShowAnswer'));
};
var $author$project$Main$toggleKeyboard = function (model) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{showVirtualKeyboard: !model.showVirtualKeyboard}),
		$elm$core$Platform$Cmd$none);
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'PressedLetter':
				switch (msg.a.valueOf()) {
					case ' ':
						return model.showSettings ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : $author$project$Main$checkAnswer(model);
					case '?':
						return model.showSettings ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : $author$project$Main$showAnswer(model);
					case '`':
						return $author$project$Main$toggleKeyboard(model);
					default:
						var _char = msg.a;
						return model.showSettings ? _Utils_Tuple2(model, $elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									content: A2(
										$elm$core$String$append,
										model.content,
										$elm$core$String$fromChar(_char))
								}),
							$elm$core$Platform$Cmd$none);
				}
			case 'Control':
				switch (msg.a) {
					case 'Backspace':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									content: A2($elm$core$String$dropRight, 1, model.content)
								}),
							$elm$core$Platform$Cmd$none);
					case 'Escape':
						var state = !model.showSettings;
						return state ? $author$project$Main$openSettings(
							_Utils_update(
								model,
								{showSettings: state})) : $author$project$Main$closeSettings(
							_Utils_update(
								model,
								{showSettings: state}));
					default:
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'LiftedLetter':
				if ('?' === msg.a.valueOf()) {
					return $author$project$Main$hideAnswer(model);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'NewQuestion':
				var num = msg.a;
				return A2($author$project$Main$getQuestion, model, num);
			case 'ToggleSettings':
				var state = msg.a;
				return state ? $author$project$Main$openSettings(
					_Utils_update(
						model,
						{showSettings: state})) : $author$project$Main$closeSettings(
					_Utils_update(
						model,
						{showSettings: state}));
			case 'MaxQuestionUpdated':
				var num = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{numMaxQuestionInput: num}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$MaxQuestionUpdated = function (a) {
	return {$: 'MaxQuestionUpdated', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var $rtfeldman$elm_css$Css$absolute = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'absolute'};
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Property = function (a) {
	return {$: 'Property', a: a};
};
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(
			$rtfeldman$elm_css$Css$Structure$Property(key + (':' + value)));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var first = _v2.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var $elm$core$String$fromFloat = _String_fromNumber;
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $rtfeldman$elm_css$Css$Structure$Compatible,
			calc: $rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: $rtfeldman$elm_css$Css$Structure$Compatible,
			length: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
			lineHeight: $rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var $rtfeldman$elm_css$Css$alignItems = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'alignItems',
		'align-items',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$auto = {alignItemsOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, justifyContentOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, textRendering: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'auto'};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(
			$rtfeldman$elm_css$Css$Structure$Property(key + (':' + value)));
	});
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.value);
	});
var $rtfeldman$elm_css$Css$baseline = $rtfeldman$elm_css$Css$prop1('baseline');
var $rtfeldman$elm_css$Css$center = $rtfeldman$elm_css$Css$prop1('center');
var $author$project$Main$ToggleSettings = function (a) {
	return {$: 'ToggleSettings', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $rtfeldman$elm_css$Css$batch = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles;
var $rtfeldman$elm_css$Css$borderRadius = $rtfeldman$elm_css$Css$prop1('border-radius');
var $rtfeldman$elm_css$Css$displayFlex = A2($rtfeldman$elm_css$Css$property, 'display', 'flex');
var $rtfeldman$elm_css$Css$flexGrow = $rtfeldman$elm_css$Css$prop1('flex-grow');
var $rtfeldman$elm_css$Css$manipulation = {touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'manipulation'};
var $rtfeldman$elm_css$Css$margin = $rtfeldman$elm_css$Css$prop1('margin');
var $rtfeldman$elm_css$Css$UnitlessFloat = {$: 'UnitlessFloat'};
var $rtfeldman$elm_css$Css$num = function (val) {
	return {
		lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
		lineHeight: $rtfeldman$elm_css$Css$Structure$Compatible,
		number: $rtfeldman$elm_css$Css$Structure$Compatible,
		numberOrInfinite: $rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $rtfeldman$elm_css$Css$UnitlessFloat,
		value: $elm$core$String$fromFloat(val)
	};
};
var $rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2($rtfeldman$elm_css$Css$property, key, argA.value + (' ' + argB.value));
	});
var $rtfeldman$elm_css$Css$padding2 = $rtfeldman$elm_css$Css$prop2('padding');
var $rtfeldman$elm_css$Css$RemUnits = {$: 'RemUnits'};
var $rtfeldman$elm_css$Css$rem = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$RemUnits, 'rem');
var $rtfeldman$elm_css$Css$touchAction = $rtfeldman$elm_css$Css$prop1('touch-action');
var $author$project$Main$buttonStyle = $rtfeldman$elm_css$Css$batch(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$margin(
			$rtfeldman$elm_css$Css$rem(0.1)),
			A2(
			$rtfeldman$elm_css$Css$padding2,
			$rtfeldman$elm_css$Css$rem(1),
			$rtfeldman$elm_css$Css$rem(0)),
			$rtfeldman$elm_css$Css$displayFlex,
			$rtfeldman$elm_css$Css$flexGrow(
			$rtfeldman$elm_css$Css$num(1)),
			$rtfeldman$elm_css$Css$touchAction($rtfeldman$elm_css$Css$manipulation),
			$rtfeldman$elm_css$Css$borderRadius(
			$rtfeldman$elm_css$Css$rem(0.5)),
			A2($rtfeldman$elm_css$Css$property, 'user-select', 'none'),
			A2($rtfeldman$elm_css$Css$property, '-webkit-user-select', 'none'),
			A2($rtfeldman$elm_css$Css$property, '-webkit-touch-callout', 'none')
		]));
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactDeclarations = function (declarations) {
	var _v0 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v0.a;
	var compactedDeclarations = _v0.b;
	return A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
};
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return {
		charset: charset,
		declarations: $rtfeldman$elm_css$Css$Structure$compactDeclarations(declarations),
		imports: imports,
		namespaces: namespaces
	};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $rtfeldman$elm_css$Css$String$mapJoinHelp = F4(
	function (map, sep, strs, result) {
		mapJoinHelp:
		while (true) {
			if (!strs.b) {
				return result;
			} else {
				if (!strs.b.b) {
					var first = strs.a;
					return result + (map(first) + '');
				} else {
					var first = strs.a;
					var rest = strs.b;
					var $temp$map = map,
						$temp$sep = sep,
						$temp$strs = rest,
						$temp$result = result + (map(first) + (sep + ''));
					map = $temp$map;
					sep = $temp$sep;
					strs = $temp$strs;
					result = $temp$result;
					continue mapJoinHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$Css$String$mapJoin = F3(
	function (map, sep, strs) {
		return A4($rtfeldman$elm_css$Css$String$mapJoinHelp, map, sep, strs, '');
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, ' and ', expressions);
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
		'\n',
		mediaQueries);
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		function (_v0) {
			var prop = _v0.a;
			return prop + ';';
		},
		'',
		properties);
};
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors);
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return _Utils_ap(
				str,
				A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, '', repeatableSimpleSelectors));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return $rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator) + (' ' + $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$Maybe$withDefault,
		'',
		A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement));
	return A2(
		$elm$core$String$append,
		A2($elm$core$String$join, ' ', segments),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = function (_v0) {
	var firstSelector = _v0.a;
	var otherSelectors = _v0.b;
	var properties = _v0.c;
	var selectorStr = A3(
		$rtfeldman$elm_css$Css$String$mapJoin,
		$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
		',',
		A2($elm$core$List$cons, firstSelector, otherSelectors));
	return selectorStr + ('{' + ($rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties) + '}'));
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, ', ', mediaQueries);
			var blocks = A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, '\n', styleBlocks);
			return '@media ' + (query + ('{' + (blocks + '}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + ('{' + (declaration + '}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return $rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$importToString, '\n', imports) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, '\n', namespaces) + (A3($rtfeldman$elm_css$Css$String$mapJoin, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, '\n', declarations) + '')));
};
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = function (a) {
	return {$: 'PageRule', a: a};
};
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $robinheghan$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var $robinheghan$murmur3$Murmur3$c1 = 3432918353;
var $robinheghan$murmur3$Murmur3$c2 = 461845907;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $robinheghan$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $robinheghan$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $robinheghan$murmur3$Murmur3$finalize = function (data) {
	var acc = (!(!data.hash)) ? (data.seed ^ A2(
		$robinheghan$murmur3$Murmur3$multiplyBy,
		$robinheghan$murmur3$Murmur3$c2,
		A2(
			$robinheghan$murmur3$Murmur3$rotlBy,
			15,
			A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($robinheghan$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $robinheghan$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$robinheghan$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				$robinheghan$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$robinheghan$murmur3$Murmur3$multiplyBy,
					$robinheghan$murmur3$Murmur3$c2,
					A2(
						$robinheghan$murmur3$Murmur3$rotlBy,
						15,
						A2($robinheghan$murmur3$Murmur3$multiplyBy, $robinheghan$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var $robinheghan$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & $elm$core$Char$toCode(c)) << data.shift);
		var _v0 = data.shift;
		if (_v0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2($robinheghan$murmur3$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var $robinheghan$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return $robinheghan$murmur3$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$robinheghan$murmur3$Murmur3$hashFold,
				A4($robinheghan$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$initialSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2($robinheghan$murmur3$Murmur3$hashString, $rtfeldman$elm_css$Hash$initialSeed, str)));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_v14.a.$ === 'Just') && (_v14.b.$ === 'Just')) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$PageRule(properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = $rtfeldman$elm_css$Css$Structure$Property('animation-name:' + name);
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$PageRule(properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin = '\u0007';
var $rtfeldman$elm_css$VirtualDom$Styled$templateSelector = $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$ClassSelector($rtfeldman$elm_css$VirtualDom$Styled$classnameStandin)
		]));
var $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate = function (styles) {
	if (!styles.b) {
		return '';
	} else {
		var otherwise = styles;
		return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$VirtualDom$Styled$makeSnippet, styles, $rtfeldman$elm_css$VirtualDom$Styled$templateSelector)
					])));
	}
};
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var cssTemplate = $rtfeldman$elm_css$VirtualDom$Styled$getCssTemplate(styles);
	var classProperty = A2($elm$virtual_dom$VirtualDom$attribute, '', '');
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, true, cssTemplate);
};
var $rtfeldman$elm_css$Html$Styled$Attributes$css = $rtfeldman$elm_css$Html$Styled$Internal$css;
var $rtfeldman$elm_css$Css$margin2 = $rtfeldman$elm_css$Css$prop2('margin');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Html$Styled$span = $rtfeldman$elm_css$Html$Styled$node('span');
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $author$project$Main$closeSettingsBtn = A2(
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Events$onClick(
			$author$project$Main$ToggleSettings(false)),
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[$author$project$Main$buttonStyle]))
		]),
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$span,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Css$margin2,
							$rtfeldman$elm_css$Css$rem(0.5),
							$rtfeldman$elm_css$Css$rem(1))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('✖')
				]))
		]));
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.value);
};
var $rtfeldman$elm_css$Css$row = {flexDirection: $rtfeldman$elm_css$Css$Structure$Compatible, flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'row'};
var $rtfeldman$elm_css$Css$column = _Utils_update(
	$rtfeldman$elm_css$Css$row,
	{value: 'column'});
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $rtfeldman$elm_css$Css$flexDirection = $rtfeldman$elm_css$Css$prop1('flex-direction');
var $rtfeldman$elm_css$Css$flexWrap = $rtfeldman$elm_css$Css$prop1('flex-wrap');
var $rtfeldman$elm_css$Css$fontSize = $rtfeldman$elm_css$Css$prop1('font-size');
var $rtfeldman$elm_css$Css$height = $rtfeldman$elm_css$Css$prop1('height');
var $rtfeldman$elm_css$Html$Styled$input = $rtfeldman$elm_css$Html$Styled$node('input');
var $rtfeldman$elm_css$Css$justifyContent = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'justifyContent',
		'justify-content',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$marginTop = $rtfeldman$elm_css$Css$prop1('margin-top');
var $rtfeldman$elm_css$Css$Media$feature = F2(
	function (key, _v0) {
		var value = _v0.value;
		return {
			feature: key,
			value: $elm$core$Maybe$Just(value)
		};
	});
var $rtfeldman$elm_css$Css$Media$maxWidth = function (value) {
	return A2($rtfeldman$elm_css$Css$Media$feature, 'max-width', value);
};
var $rtfeldman$elm_css$Css$minHeight = $rtfeldman$elm_css$Css$prop1('min-height');
var $rtfeldman$elm_css$Html$Styled$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $rtfeldman$elm_css$Html$Styled$Events$onInput = function (tagger) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$rtfeldman$elm_css$Html$Styled$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $rtfeldman$elm_css$Html$Styled$Events$targetValue)));
};
var $rtfeldman$elm_css$Css$Structure$OnlyQuery = F2(
	function (a, b) {
		return {$: 'OnlyQuery', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Media$only = $rtfeldman$elm_css$Css$Structure$OnlyQuery;
var $author$project$Main$outputBox = function (model) {
	return model.showAnswer ? A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(model.question.answer + (' (' + (model.question.englishKey + ')')))
			])) : A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(model.content)
			]));
};
var $rtfeldman$elm_css$Html$Styled$p = $rtfeldman$elm_css$Html$Styled$node('p');
var $rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
var $rtfeldman$elm_css$Css$pct = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PercentageUnits, '%');
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlJson(value));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			false,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$placeholder = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('placeholder');
var $rtfeldman$elm_css$Css$position = $rtfeldman$elm_css$Css$prop1('position');
var $rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PxUnits, 'px');
var $rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2($elm$core$String$join, ',', args) + ')'));
	});
var $rtfeldman$elm_css$Css$rgb = F3(
	function (r, g, b) {
		return {
			alpha: 1,
			blue: b,
			color: $rtfeldman$elm_css$Css$Structure$Compatible,
			green: g,
			red: r,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'rgb',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					_List_fromArray(
						[r, g, b])))
		};
	});
var $rtfeldman$elm_css$Css$right = $rtfeldman$elm_css$Css$prop1('right');
var $rtfeldman$elm_css$Css$Structure$Screen = {$: 'Screen'};
var $rtfeldman$elm_css$Css$Media$screen = $rtfeldman$elm_css$Css$Structure$Screen;
var $author$project$Main$settingsBtn = A2(
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Events$onClick(
			$author$project$Main$ToggleSettings(true)),
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[$author$project$Main$buttonStyle]))
		]),
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$span,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Css$margin2,
							$rtfeldman$elm_css$Css$rem(0.5),
							$rtfeldman$elm_css$Css$rem(1))
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('⚙️')
				]))
		]));
var $rtfeldman$elm_css$Css$spaceAround = $rtfeldman$elm_css$Css$prop1('space-around');
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles = function (a) {
	return {$: 'UnscopedStyles', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				return styles;
			} else {
				return A3(
					$elm$core$Dict$insert,
					cssTemplate,
					$rtfeldman$elm_css$Hash$fromString(cssTemplate),
					styles);
			}
		} else {
			return styles;
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				var classname = _v1.a;
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string(classname));
			} else {
				return A2(
					$elm$virtual_dom$VirtualDom$property,
					'className',
					$elm$json$Json$Encode$string('_unstyled'));
			}
		} else {
			return val;
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS = F2(
	function (styles, _v0) {
		var val = _v0.a;
		var isCssStyles = _v0.b;
		var cssTemplate = _v0.c;
		if (isCssStyles) {
			var _v1 = A2($elm$core$Dict$get, cssTemplate, styles);
			if (_v1.$ === 'Just') {
				var classname = _v1.a;
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', classname);
			} else {
				return A2($elm$virtual_dom$VirtualDom$attribute, 'class', '_unstyled');
			}
		} else {
			return val;
		}
	});
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(finalStyles),
						properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration = F3(
	function (template, classname, declaration) {
		return declaration + ('\n' + A3($elm$core$String$replace, $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin, classname, template));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return A3($elm$core$Dict$foldl, $rtfeldman$elm_css$VirtualDom$Styled$styleToDeclaration, '', dict);
};
var $rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration = F2(
	function (scopingPrefix, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (template, classname, declaration) {
					return declaration + ('\n' + A3($elm$core$String$replace, '.' + $rtfeldman$elm_css$VirtualDom$Styled$classnameStandin, '#' + (scopingPrefix + ('.' + classname)), template));
				}),
			'',
			dict);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = F2(
	function (maybeNonce, accumulatedStyles) {
		var cssText = function () {
			if (accumulatedStyles.$ === 'UnscopedStyles') {
				var allStyles = accumulatedStyles.a;
				return $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(allStyles);
			} else {
				var scope = accumulatedStyles.a.a;
				var rootStyles = accumulatedStyles.b;
				var descendantStyles = accumulatedStyles.c;
				return A2($rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration, scope, rootStyles) + ('\n' + A2($rtfeldman$elm_css$VirtualDom$Styled$toScopedDeclaration, scope + ' ', descendantStyles));
			}
		}();
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			'span',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'style', 'display: none;'),
					A2($elm$virtual_dom$VirtualDom$attribute, 'class', 'elm-css-style-wrapper')
				]),
			_List_fromArray(
				[
					A3(
					$elm$virtual_dom$VirtualDom$node,
					'style',
					function () {
						if (maybeNonce.$ === 'Just') {
							var nonce = maybeNonce.a.a;
							return _List_fromArray(
								[
									A2($elm$virtual_dom$VirtualDom$attribute, 'nonce', nonce)
								]);
						} else {
							return _List_Nil;
						}
					}(),
					$elm$core$List$singleton(
						$elm$virtual_dom$VirtualDom$text(cssText)))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F4(
	function (maybeNonce, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2(
			$rtfeldman$elm_css$VirtualDom$Styled$toStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles));
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F3(
	function (maybeNonce, accumulatedStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toStyleNode, maybeNonce, accumulatedStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F4(
	function (maybeNonce, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3(
			$rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles),
			keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute(styles),
			properties);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F5(
	function (maybeNonce, ns, elemType, properties, keyedChildren) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A3(
			$rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles),
			keyedChildNodes);
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F5(
	function (maybeNonce, ns, elemType, properties, children) {
		var initialStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, $elm$core$Dict$empty, properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = A2(
			$rtfeldman$elm_css$VirtualDom$Styled$toStyleNode,
			maybeNonce,
			$rtfeldman$elm_css$VirtualDom$Styled$UnscopedStyles(styles));
		var unstyledProperties = A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttributeNS(styles),
			properties);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyle, $elm$core$Maybe$Nothing, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, $elm$core$Maybe$Nothing, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A5($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, $elm$core$Maybe$Nothing, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $rtfeldman$elm_css$Css$top = $rtfeldman$elm_css$Css$prop1('top');
var $rtfeldman$elm_css$Html$Styled$Attributes$type_ = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('type');
var $rtfeldman$elm_css$Html$Styled$Attributes$value = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
var $rtfeldman$elm_css$Css$VhUnits = {$: 'VhUnits'};
var $rtfeldman$elm_css$Css$vh = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$VhUnits, 'vh');
var $author$project$Main$virtualBackspace = A2(
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Events$onClick(
			$author$project$Main$Control('Backspace')),
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[$author$project$Main$buttonStyle]))
		]),
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$span,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto)
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('←')
				]))
		]));
var $author$project$Main$virtualKeyboardBtn = function (_char) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Events$onClick(
				$author$project$Main$PressedLetter(_char)),
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[$author$project$Main$buttonStyle]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$span,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto)
							]))
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						$elm$core$String$fromChar(_char))
					]))
			]));
};
var $rtfeldman$elm_css$Html$Styled$Attributes$class = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('className');
var $author$project$Main$virtualQuestionMark = A2(
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$Events$on,
			'pointerdown',
			$elm$json$Json$Decode$succeed(
				$author$project$Main$PressedLetter(
					_Utils_chr('?')))),
			A2(
			$rtfeldman$elm_css$Html$Styled$Events$on,
			'pointerup',
			$elm$json$Json$Decode$succeed(
				$author$project$Main$LiftedLetter(
					_Utils_chr('?')))),
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[$author$project$Main$buttonStyle])),
			$rtfeldman$elm_css$Html$Styled$Attributes$class('plausible-event-name=Hint')
		]),
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$span,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto)
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('？')
				]))
		]));
var $rtfeldman$elm_css$Css$width = $rtfeldman$elm_css$Css$prop1('width');
var $author$project$Main$virtualSpace = A2(
	$rtfeldman$elm_css$Html$Styled$button,
	_List_fromArray(
		[
			$rtfeldman$elm_css$Html$Styled$Events$onClick(
			$author$project$Main$PressedLetter(
				_Utils_chr(' '))),
			$rtfeldman$elm_css$Html$Styled$Attributes$css(
			_List_fromArray(
				[
					$author$project$Main$buttonStyle,
					$rtfeldman$elm_css$Css$width(
					$rtfeldman$elm_css$Css$pct(100))
				]))
		]),
	_List_fromArray(
		[
			A2(
			$rtfeldman$elm_css$Html$Styled$span,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto)
						]))
				]),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text('Space')
				]))
		]));
var $author$project$Main$virtualKeyboard = function (model) {
	return model.showVirtualKeyboard ? A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
						$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$center),
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$pct(100))
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$row),
								$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(100))
							]))
					]),
				_List_fromArray(
					[
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('手')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('田')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('水')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('口')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('廿')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('卜')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('山')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('戈')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('人')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('心')),
						$author$project$Main$virtualBackspace
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$row),
								$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(82))
							]))
					]),
				_List_fromArray(
					[
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('日')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('尸')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('木')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('火')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('土')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('竹')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('十')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('大')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('中'))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$row),
								$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(72))
							]))
					]),
				_List_fromArray(
					[
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('重')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('難')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('金')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('女')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('月')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('弓')),
						$author$project$Main$virtualKeyboardBtn(
						_Utils_chr('一')),
						$author$project$Main$virtualQuestionMark
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$width(
								$rtfeldman$elm_css$Css$pct(60))
							]))
					]),
				_List_fromArray(
					[$author$project$Main$virtualSpace]))
			])) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
};
var $rtfeldman$elm_css$Css$VwUnits = {$: 'VwUnits'};
var $rtfeldman$elm_css$Css$vw = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$VwUnits, 'vw');
var $rtfeldman$elm_css$Css$Preprocess$WithMedia = F2(
	function (a, b) {
		return {$: 'WithMedia', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Media$withMedia = $rtfeldman$elm_css$Css$Preprocess$WithMedia;
var $rtfeldman$elm_css$Css$wrap = {flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'wrap'};
var $author$project$Main$view = function (model) {
	var content = (!model.showSettings) ? A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$vw(100.0)),
						$rtfeldman$elm_css$Css$height(
						$rtfeldman$elm_css$Css$vh(90)),
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
						$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$spaceAround)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[$rtfeldman$elm_css$Css$displayFlex]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$p,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto),
										$rtfeldman$elm_css$Css$fontSize(
										$rtfeldman$elm_css$Css$rem(3))
									]))
							]),
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text(model.question.target)
							]))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$minHeight(
								$rtfeldman$elm_css$Css$rem(3))
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto),
										$rtfeldman$elm_css$Css$fontSize(
										$rtfeldman$elm_css$Css$rem(1.5))
									]))
							]),
						_List_fromArray(
							[
								$author$project$Main$outputBox(model)
							]))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[$rtfeldman$elm_css$Css$displayFlex]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Css$Media$withMedia,
										_List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Media$only,
												$rtfeldman$elm_css$Css$Media$screen,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$Media$maxWidth(
														$rtfeldman$elm_css$Css$px(900))
													]))
											]),
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$width(
												$rtfeldman$elm_css$Css$pct(100))
											])),
										$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto),
										$rtfeldman$elm_css$Css$width(
										$rtfeldman$elm_css$Css$px(900))
									]))
							]),
						_List_fromArray(
							[
								$author$project$Main$virtualKeyboard(model),
								A2(
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$marginTop(
												$rtfeldman$elm_css$Css$rem(1)),
												$rtfeldman$elm_css$Css$displayFlex,
												$rtfeldman$elm_css$Css$color(
												A3($rtfeldman$elm_css$Css$rgb, 196, 196, 196)),
												$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
												$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
												$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$baseline),
												$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center)
											]))
									]),
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Html$Styled$span,
										_List_Nil,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Html$Styled$text('按空白鍵檢查答案。按問號鍵顯示答案。')
											])),
										A2(
										$rtfeldman$elm_css$Html$Styled$span,
										_List_Nil,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Html$Styled$text('Press space to check your answer. Press ? to show the answer.')
											]))
									]))
							]))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
								$rtfeldman$elm_css$Css$top(
								$rtfeldman$elm_css$Css$rem(1)),
								$rtfeldman$elm_css$Css$right(
								$rtfeldman$elm_css$Css$rem(1))
							]))
					]),
				_List_fromArray(
					[$author$project$Main$settingsBtn]))
			])) : A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$width(
						$rtfeldman$elm_css$Css$vw(100.0)),
						$rtfeldman$elm_css$Css$minHeight(
						$rtfeldman$elm_css$Css$vh(100.0)),
						$rtfeldman$elm_css$Css$displayFlex,
						$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column)
					]))
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
								$rtfeldman$elm_css$Css$top(
								$rtfeldman$elm_css$Css$rem(1)),
								$rtfeldman$elm_css$Css$right(
								$rtfeldman$elm_css$Css$rem(1))
							]))
					]),
				_List_fromArray(
					[$author$project$Main$closeSettingsBtn])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$marginTop(
								$rtfeldman$elm_css$Css$rem(5)),
								$rtfeldman$elm_css$Css$minHeight(
								$rtfeldman$elm_css$Css$vh(10.0)),
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column),
								$rtfeldman$elm_css$Css$color(
								A3($rtfeldman$elm_css$Css$rgb, 196, 196, 196)),
								$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$center)
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$displayFlex,
										$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
										$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
										$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$baseline)
									]))
							]),
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('在鍵盤上輸入與答案相應的英文字母。')
									])),
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Input the corresponding English letters on your keyboard.')
									]))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$displayFlex,
										$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
										$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
										$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$baseline)
									]))
							]),
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('按空白鍵檢查答案。')
									])),
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Press space to check your answer.')
									]))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$displayFlex,
										$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
										$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
										$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$baseline)
									]))
							]),
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('按問號鍵顯示答案。')
									])),
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Press ? to show the answer.')
									]))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$displayFlex,
										$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
										$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
										$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$baseline)
									]))
							]),
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('按 Escape 鍵顯示/隠藏設定。')
									])),
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Press Escape to show/hide the settings page.')
									]))
							])),
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$displayFlex,
										$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
										$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
										$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$baseline)
									]))
							]),
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('按 ` 鍵顯示/隠藏鍵盤。')
									])),
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_Nil,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Press ` to show/hide the keyboard.')
									]))
							]))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$marginTop(
								$rtfeldman$elm_css$Css$rem(5)),
								$rtfeldman$elm_css$Css$displayFlex,
								$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$column)
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$displayFlex,
										$rtfeldman$elm_css$Css$flexDirection($rtfeldman$elm_css$Css$row),
										$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center)
									]))
							]),
						_List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Html$Styled$span,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$margin(
												$rtfeldman$elm_css$Css$rem(1))
											]))
									]),
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text('Number of Questions: ')
									])),
								A2(
								$rtfeldman$elm_css$Html$Styled$div,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$css(
										_List_fromArray(
											[
												$rtfeldman$elm_css$Css$margin(
												$rtfeldman$elm_css$Css$rem(1)),
												$rtfeldman$elm_css$Css$displayFlex,
												$rtfeldman$elm_css$Css$flexWrap($rtfeldman$elm_css$Css$wrap),
												$rtfeldman$elm_css$Css$justifyContent($rtfeldman$elm_css$Css$center),
												$rtfeldman$elm_css$Css$alignItems($rtfeldman$elm_css$Css$baseline)
											]))
									]),
								_List_fromArray(
									[
										A2(
										$rtfeldman$elm_css$Html$Styled$span,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Html$Styled$input,
												_List_fromArray(
													[
														$rtfeldman$elm_css$Html$Styled$Attributes$type_('number'),
														$rtfeldman$elm_css$Html$Styled$Attributes$placeholder(''),
														$rtfeldman$elm_css$Html$Styled$Attributes$value(model.numMaxQuestionInput),
														$rtfeldman$elm_css$Html$Styled$Events$onInput($author$project$Main$MaxQuestionUpdated)
													]),
												_List_Nil)
											])),
										A2(
										$rtfeldman$elm_css$Html$Styled$span,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Html$Styled$Attributes$css(
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$margin(
														$rtfeldman$elm_css$Css$rem(0.2)),
														$rtfeldman$elm_css$Css$color(
														A3($rtfeldman$elm_css$Css$rgb, 196, 196, 196))
													]))
											]),
										_List_fromArray(
											[
												$rtfeldman$elm_css$Html$Styled$text(
												'(range is 1 - ' + ($elm$core$String$fromInt($author$project$Questions$maxQuestions + 1) + ')'))
											]))
									]))
							]))
					]))
			]));
	return {
		body: _List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$toUnstyled(content)
			]),
		title: '繁體中文倉頡練習'
	};
};
var $author$project$Main$main = $elm$browser$Browser$document(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));