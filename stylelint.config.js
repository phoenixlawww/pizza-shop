module.exports = {
  extends: ['stylelint-config-twbs-bootstrap/scss'],
  rules: {
    'block-no-empty': null,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute', 'class']
      }
    ],
    'no-empty-source': null
  }
}
