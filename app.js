// app.js
App({
  onLaunch({ scene }) {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(scene);
  },
  globalData: {
    userInfo: null
  }
})
