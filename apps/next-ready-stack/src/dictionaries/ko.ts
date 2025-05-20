// NOTE: This file should not be edited
export default {
  Common: {
    language: '한국어',
    hello: '안녕하세요',
  },
  ExampleIntro: {
    title: '국제화 예제',
    list: [
      '페이지 레이아웃에 따라 언어 설정을 적용하는 예제',
      '외부 라이브러리(<code>next-intl</code>, <code>react-i18next</code> 등) 사용 안하고 자체 구축',
      '<code>getDictionary(lang)</code>를 통해 언어 데이터를 조회 및 사용',
      '일부 페이지만 국제화 적용 가능',
    ],
  },
} as const;
