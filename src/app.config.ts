export default defineAppConfig({
  pages: [
    'pages/DaysImg/index',
    'pages/About/index',
    'pages/SummaryLog/index',
    'pages/Memory/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  lazyCodeLoading: "requiredComponents",
  tabBar: {
    list: [
      {
        text: '今日',
        pagePath: 'pages/DaysImg/index',
        iconPath: './assets/icons/home.png',
        selectedIconPath: './assets/icons/home_c.png',
      },
      {
        text: '记录',
        pagePath: 'pages/Memory/index',
        iconPath: './assets/icons/photo.png',
        selectedIconPath: './assets/icons/photo_c.png',
      },
      {
        text: '关于',
        pagePath: 'pages/About/index',
        iconPath: './assets/icons/user.png',
        selectedIconPath: './assets/icons/user_c.png',
      },
    ]
  }
})
