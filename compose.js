function compose() {
	var args = arguments;
	var source = args[0];
	if (source == undefined) { return; }
	if (args.length <= 1) { return source; }

	for (let i = 1; i < args.length; i++) {
		let obj = args[i];
		if (typeof obj != 'object') {
			console.warn('Invalid parameter type "' + (typeof obj) + '" for the parameter #' + i);
			continue;
		}
		Object.defineProperties(source, Object.getOwnPropertyDescriptors(obj));
	}
	return source;
}

function inherit() {
	var args = arguments;
	if (args[0] == undefined) {args[0] = null;}
	args[0] = Object.create(args[0]);
	if (args.length == 1) {return args[0];}
	return compose.apply(this, args);
}

if (!Object.hasOwnProperty('getOwnPropertyDescriptors')) {
	let supportsSymbol = Object.hasOwnProperty('getOwnPropertySymbols');
	Object.defineProperty(
		Object,
		'getOwnPropertyDescriptors',
		{
			configurable: true,
			writable: true,
			value: function getOwnPropertyDescriptors(object) {
				var keys = Object.getOwnPropertyNames(object);
				if (supportsSymbol) {
					keys = keys.concat(Object.getOwnPropertySymbols(object));
				}

				return keys.reduce(function (descriptors, key) {
					return Object.defineProperty(
						descriptors,
						key,
						{
							configurable: true,
							enumerable: true,
							writable: true,
							value: Object.getOwnPropertyDescriptor(object, key)
						}
					);
				}, {});
			}
		}
	);
}