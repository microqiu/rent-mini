const http = require('../../utils/http');
Page({

    data: {
        id: null,
        bets: [[
            0,1,2,3,4,5,6,7,8,9,10,11,12,24
        ],[
            1,2,3,4,5,6,7,8,9,10,11,12,24
        ]],
        priceInfo: {
            betAmount: 0
        },
    },

    onLoad(options) {
        this.setData({
            ...options
        })
    },

    onReady() {
        http.get(`/api/house/${this.data.id}/price`, res => {
            if (res.code === 0) {
                this.setData({
                    priceInfo: res.data
                })
            }
        })
    },
    onWayChange(e) {
        console.log(e);
        this.setData({
            priceInfo: {
                ...this.data.priceInfo,
                betPeriod: this.data.bets[0][e.detail.value[0]],
                payPeriod: this.data.bets[1][e.detail.value[1]],
            }
        })
        if (this.data.priceInfo.amount) {
            this.setData({
                priceInfo : {
                    ...this.data.priceInfo,
                    betAmount: this.data.priceInfo.amount * this.data.priceInfo.betPeriod
                }
            })
        }
    },

    onAmountChange(e) {
        console.log(e);
        const { betPeriod } = this.data.priceInfo;
        let betAmount = 0;
        if (betPeriod && betPeriod >= 0) {
            betAmount = betPeriod * parseInt(e.detail.value);
        }
        this.setData({
            priceInfo: {
                ...this.data.priceInfo,
                amount: e.detail.value,
                betAmount
            }
        })
    },

    onSave() {
        console.log(this.data.priceInfo);
        const { betAmount, betPeriod, payPeriod, amount } = this.data.priceInfo;
        if (!payPeriod) {
            wx.showToast({
                title: '请选择付款方式',
                icon: 'none'
              })
              return;
        }
        if (!betAmount) {
            wx.showToast({
              title: '请先输入月租金',
              icon: 'none'
            })
            return;
        }
        http.post(`/api/house/${this.data.id}/price`, {
            betAmount,betPeriod, payPeriod, amount
        }, res => {
            console.log(res);
            if (res.code === 0) {
                wx.navigateBack({
                  delta: 0,
                })
            }
        })
    }
})