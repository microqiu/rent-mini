// pages/house/community-search.js.js
const http =  require('../../utils/http');
Page({

    data: {
        keyword: '',
        list: [],
        city: null,
        area: null,
    },

    onLoad(options) {
        this.setData({
            city: options.city,
            area: options.area
        })
    },

    onReady() {

    },

    onShow() {

    },

    bindKeywordChange(e) {
        console.log(e);
        this.setData({
            keyword: e.detail.value
        })
    },

    bindSearch() {
        console.log(this.data.keyword);
        http.get(`/api/city/community?area=${this.data.area}&city=${this.data.city}&keyword=${this.data.keyword}`, (res) => {
            if (res.code === 0) {
                this.setData({
                    list: res.data
                })
            }
        })
    },

    bindRestSearch() {
        this.setData({
            keyword: '',
            list: []
        })
    },

    binSelect(e) {
        const index = e.currentTarget.dataset.index;
        const pages = getCurrentPages();
        let add = pages[pages.length - 2];
        const community = this.data.list[index];
        if (community.businessArea === '[]') {
            community.businessArea = this.data.area;
        }
        add.setData({
            community
        });
        wx.navigateBack({
          delta: 0,
        })
    }
})