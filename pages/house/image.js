const http = require('../../utils/http');
const gconfig = require('../../utils/config');
Page({
    data: {
        id: null,
        typeList: [
            {
                text: '小区环境',
                value: '1'
            },
            {
                text: '客厅',
                value: '2'
            },
            {
                text: '卧室',
                value: '3'
            },
            {
                text: '主卧',
                value: '4'
            },
            {
                text: '次卧',
                value: '5'
            },
            {
                text: '厨房',
                value: '6'
            },
            {
                text: '卫生间',
                value: '7'
            },
            {
                text: '阳台',
                value: '8'
            },
        ],
        photos: []
    },
    onLoad(options) {
        this.setData({
            ...options
        });
    },
    onReady() {
        http.get(`/api/house/${this.data.id}/photos`, (res) => {
            if (res.code === 0) {
                this.setData({
                    photos: res.data
                })
            }
        });
    },
    onAdd(e) {
        console.log(e);
        const type = this.data.typeList[~~e.detail.value];
        wx.chooseMedia({
          camera: "back",
          sourceType: ['album', 'camera'],
          success: (res) => {
              console.log(res);
              if (res.tempFiles.length == 0) {
                return;
              }
              wx.uploadFile({
                filePath: res.tempFiles[0].tempFilePath,
                name: 'file',
                url: gconfig.apiDomain + '/api/uploadImage',
                header: {
                    'X-ACCESS-TOKEN' : wx.getStorageSync('access_token')
                },
                success: (result) => {
                    console.log(result);
                    if (result.statusCode !== 200) {
                        return;
                    }
                    result = JSON.parse(result.data);
                    if (result.code === 0) {
                        this.data.photos.push({
                            url: result.data,
                            type: type.value,
                            typeName: type.text
                        });
                        this.setData({
                            photos: this.data.photos
                        });
                    }
                }
              })
          },
          fail: (res) => {
              console.log(res);
          }
        })
    },
    onSave() {
        if (this.data.photos.length > 0) {
            http.post(`/api/house/${this.data.id}/photos`, this.data.photos,(res) => {
                if (res.code === 0) {
                    wx.showToast({
                      title: '保存成功',
                    });
                    wx.navigateBack({
                      delta: 0,
                    });
                }
            })
        }
    },
    onShowImage(e) {
        const urls = this.data.photos.map(photo => photo.url);
        wx.previewImage({
          urls: urls,
          current: e.currentTarget.dataset.src
        })
    },
    onDel(e) {
        console.log(e);
        this.data.photos.splice(~~e.currentTarget.dataset.index, 1);
        this.setData({
            photos: this.data.photos
        })
    }

})