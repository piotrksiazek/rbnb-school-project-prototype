module.exports = {
	ifeq: function (a, b, options) {
		if (a === b) {
			return options.fn(this);
		}
		return options.inverse(this);
	},
	times: function (n, block) {
		let accum = '';
		for (let i = 0; i < n; ++i) accum += block.fn(i);
		return accum;
	},
};
