// NOTE: This file should not be edited
export default {
  Common: {
    language: '中文',
    hello: '你好',
  },
  ExampleIntro: {
    title: '国际化示例',
    list: [
      '根据页面布局应用语言设置的示例',
      '不使用外部库（<code>next-intl</code>, <code>react-i18next</code> 等）自建',
      '使用 <code>getDictionary(lang)</code> 检索和使用语言数据',
      '只有部分页面可以国际化',
    ],
  },
} as const;
