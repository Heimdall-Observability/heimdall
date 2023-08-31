module.exports = {
	extends: ['@heimdall/eslint-config/react-internal'],
	plugins: ['tailwindcss'],
	settings: {
		tailwindcss: {
			callees: ['cn'],
		},
	},
};
