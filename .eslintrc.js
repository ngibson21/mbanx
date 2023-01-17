module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': 'error',
    'no-useless-catch': 'off',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true
      }
    ],
    camelcase: [
      2,
      {
        properties: 'always'
      }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'vue/mustache-interpolation-spacing': [
      2,
      'always'
    ],
    'vue/no-v-html': 'error',
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'import/extensions': [
      'error',
      'always',
      {
        ignorePackages: true
      }
    ],
    'vue/max-attributes-per-line': 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
