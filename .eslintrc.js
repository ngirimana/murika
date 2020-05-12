module.exports = {
	extends: [ "airbnb-base" ],
	parser: "babel-eslint",
	env: {
			mocha: true
	},
	rules: {
			"linebreak-style": [
					"error",
					process.env.NODE_ENV === "prod" ? "unix" : "windows"
			],
			"no-restricted-globals": "off",
			"consistent-return": "off",
			"import/prefer-default-export": "off",
			"import/prefer-default-export": "off",
			"prefer-const": "off",
			"no-underscore-dangle": "off",
			"array-bracket-spacing": "off",
			"no-return-await":"off",
			"no-await-in-loop":"off",
			"guard-for-in":"off",
			"no-restricted-syntax":"off"
	}
};