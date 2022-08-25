const http = require('../../utils/http');
Page({
    data: {
        id: 1,
        status: [{
                label: '待租',
                value: '0'
            },
            {
                label: '已租',
                value: '1'
            }
        ],
        directions: [{
                label: '东',
                value: '东'
            },
            {
                label: '西',
                value: '西'
            },
            {
                label: '南',
                value: '南'
            },
            {
                label: '北',
                value: '北'
            }
        ],
        statusVisibel: false,
        dateVisible: false,
        directionVisible: false,
        years: [{
                label: '2024年',
                value: '2024'
            },
            {
                label: '2023年',
                value: '2023'
            },
            {
                label: '2022年',
                value: '2022'
            },
        ],
        months: Array.from(new Array(12), (_, index) => ({
            label: `${index + 1}月`,
            value: index + 1,
        })),
        days: Array.from(new Array(31), (_, index) => ({
            label: `${index + 1}日`,
            value: index + 1
        })),
        dateCurrentValue: null,
        statusCurrentValue: null,
        directionCurrentValue: null
    },

    onClickPicker(e) {
        const {
            key
        } = e?.currentTarget?.dataset;
        console.log(key);
        this.setData({
            [`${key}Visible`]: true,
        });
    },
    onPickerChange(e) {
        const {
            key
        } = e?.currentTarget?.dataset;
        console.log(key);
        if (key === 'status') {
            this.setData({
                statusCurrentValue: e.detail.value
            })
        } else if (key === 'date') {
            let date = e.detail.value.join('-');
            this.setData({
                dateCurrentValue: date
            });
        } else if (key === 'direction') {
            this.setData({
                directionCurrentValue: e.detail.value
            })
        }
    },

    onInputChange(e) {
        const {
            key
        } = e?.currentTarget?.dataset;
        console.log(key);
        this.setData({
            [key]: e.detail.value
        })
    },

    onLoad(options) {
        this.setData({
            id: options.id
        });
        http.get(`/api/house/${options.houseId}/rooms/${options.id}`, res => {
            if (res.code === 0) {
                const {data} = res;
                this.setData({
                    name: data.name,
                    price: data.price || '',
                    dateCurrentValue: data.expireTime,
                    statusCurrentValue: data.statusCurrentValue,
                    area: data.area || ''
                })
            }
        });
    },

    showHint(message) {
        wx.showToast({
            title: message,
            icon: "none"
          })
    },

    onSubmit() {
        let {name, price, area, directionCurrentValue, statusCurrentValue, dateCurrentValue} = this.data;
        if (!name) return this.showHint("请输入房间名");
        if (!price) return this.showHint("请输入价格");
        if (!area) return this.showHint("请输入面积");
        if (!directionCurrentValue) return this.showHint("请选择朝向");
        if (!statusCurrentValue) return this.showHint("请选择房间状态");
        
        let data = {
            name, price, area, direction: directionCurrentValue[0], status: statusCurrentValue[0], expireTime: dateCurrentValue
        }
        console.log(data);
    }

})