const login = require('./auth');
const gconfig = require('./config');

const request = (params) => {
    let fetchCount = getApp().globalData.fetchCount || 0;
    params.url = gconfig.apiDomain + params.url;
    if (fetchCount === 0) {
        wx.showLoading({
            title: '加载中...',
        })
    }
    getApp().globalData.fetchCount = ++fetchCount;
    const accessToken = wx.getStorageSync('access_token');
    if (accessToken != null) {
        params.header = {
            'X-ACCESS-TOKEN': accessToken
        }
    }
    wx.request({
        ...params,
        fail: (res) => {
            console.log(res);
        },
        complete: (res) => {
            if (getApp().globalData.fetchCount - 1 === 0) {
                wx.hideLoading({
                    success: (res) => {
                        console.log(res)
                    },
                })
            }
            getApp().globalData.fetchCount = getApp().globalData.fetchCount - 1;
        },
        success: (res) => {
            console.log(res.data);
            if (res.data.code === 401) {
                login('/pages/index/index');
                return;
            }
            if (res.statusCode === 200) {
                params.success && params.success(res.data);
                return;
            }
        },
    })
}

module.exports.get = (url, success) => {
    const params = {
        url,
        method: 'GET',
        success
    };
    request(params);
};
module.exports.post = (url, data, success) => {
    const params = {
        url,
        method: 'POST',
        data,
        success
    };
    request(params);
};
module.exports.put = (url, data, success) => {
    const params = {
        url,
        data,
        method: 'PUT',
        success
    };
    request(params);
};
module.exports.delete = (url, success) => {
    const params = {
        url,
        method: 'DELETE',
        success
    };
    request(params);
};