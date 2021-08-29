module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends表示加载哪些规则做校验
  extends: [
    // 'plugin:vue/essential'表示引入的插件是eskint-plugin-vue
    'plugin:vue/essential',
    // @vue/standard表示引入的是@vue/eslint-config-standard
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 自定义编码规则设置
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
