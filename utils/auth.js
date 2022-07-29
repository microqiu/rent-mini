const http = require('./http');
module.exports = (callback) => {
  wx.login({
    timeout: 3000,
    success: ({
      code
    }) => {
      http.post('/auth/login?code=' + code, {
      }, res => {
        const {
          data,
          code
        } = res;
        if (code === 0) {
          wx.setStorageSync('access_token', data);
          if (typeof callback === 'function') {
            callback();
            return;
          }
          var pages = getCurrentPages()    //获取加载的页面
          var currentPage = pages[pages.length - 1]    //获取当前页面的对象
          currentPage.onShow();
          return;
        }
        wx.showToast({
          title: '登录失败',
        })
      });
    }
  });
}