module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'rules': {
      'no-console': 0,
      'no-unused-vars': ["error", { "vars": "all", "args": "after-used" }],
      'no-use-before-define': [2, 'nofunc'],
      'indent': ["error", 2],
      'max-len': [0, 100, 4],
    },
};
