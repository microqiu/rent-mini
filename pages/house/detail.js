const http = require('../../utils/http');
const moment = require('moment')
Page({

    data: {
        id: null,
        detail: null
    },

    onLoad(options) {
        this.setData({
            id: options.id,
        })
    },

    onShow() {
        http.get(`/api/house/${this.data.id}`, res => {
            if (res.code === 0) {
                res.data.expireDate = moment(res.data.expireDate).format('yyyy-MM-DD');
                this.setData({
                    detail: res.data
                })
            }
        });
    },

    onPhotoEdit(e) {
        wx.navigateTo({
          url: `/pages/house/image?id=${this.data.id}`
        });
    },
    
    onShowImage(e) {
        const urls = this.data.detail.photos.map(photo => photo.url);
        wx.previewImage({
          urls: urls,
          current: e.currentTarget.dataset.src
        })
    },

    onPriceEdit(e) {
        wx.navigateTo({
            url: `/pages/house/price?id=${this.data.id}`
          });
    },

    onInfoEdit(e) {
        wx.navigateTo({
            url: `/pages/house/info?id=${this.data.id}&detail=${JSON.stringify(this.data.detail)}`
          });
    },

    onRoomEdit(e) {
        wx.navigateTo({
          url: `/pages/house/room?id=${e.currentTarget.dataset.id}&houseId=${this.data.id}`,
        })
    }
})