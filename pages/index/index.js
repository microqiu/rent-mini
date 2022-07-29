const http = require('../../utils/http');
const app = getApp();
Page({

	data: {
        active: 1,
        list: [],


        type: 1, // 1 整租 2 合租
    },

    initData() {
        http.get('/api/house', res => {
            if (res.code === 0) {
                console.log(res.data);
                this.setData({
                    list: res.data
                })
            } else {
                wx.showToast({
                  title: res.msg,
                })
            }
        })
    },

    onLoad(options) {
        this.setData({
            ...options
        });
        this.initData();
    },
    
    onDetail(e) {
        wx.navigateTo({
          url: `/pages/house/detail?id=${e.currentTarget.dataset.id}`,
        })
    }

})