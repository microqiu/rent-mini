const http  = require('../../utils/http');

Page({
    data: {
        type: 1,
        typeActive: null,
        types: [
            {
                text: '整租',
                value: 1
            },
            {
                text: '合租',
                value: 2
            }
        ],
        steps: [
            {
              text: '步骤一',
            },
            {
              text: '步骤二',
            }
          ],
          houseStatusActive: null,
          houseStatusSelect: [
            {
                text: '空房',
                value: 1
            },
            {
                text: '自用',
                value: 2
            },
            {
                text: '装修',
                value: 3
            },
            {
                text: '保留',
                value: 4
            }
          ],

          bedroomActive: null,
          bedroomSelect: [
              {
                  text: '1室',
                  value: 1
              },
              {
                  text: '2室',
                  value: 2
              },
              {
                  text: '3室',
                  value: 3
              },
              {
                  text: '4室',
                  value: 4
              },
              {
                  text: '5室',
                  value: 5
              }
          ],

          livingroomActive: null,
          livingroomSelect: [
              {
                  text: '0厅',
                  value: 0
              },
              {
                  text: '1厅',
                  value: 1
              },
              {
                  text: '2厅',
                  value: 2
              },
          ],

          kitchenActive: null,
          kitchenSelect: [
              {
                  text: '0厨',
                  value: 0
              },
              {
                  text: '1厨',
                  value: 1
              },
              {
                  text: '2厨',
                  value: 2
              },
          ],

          bathroomActive: null,
          bathroomSelect: [
              {
                  text: '0卫',
                  value: 0
              },
              {
                  text: '1卫',
                  value: 1
              },
              {
                  text: '2卫',
                  value: 2
              },
          ],

          active: 0,

          cities: [],
          cityActive: null,

          cityAreas: [],
          cityAreaActive: null,

          stores: [],
          storeActive: 0,

          community: null,

          // 楼幢
          buildingNumber: null,
          // 单元号
          unitNumber: null,
          // 房间号
          roomNumber: null,

          remode: 0,

          expireDate: null
    },

    onLoad(options) {
        this.setData({
            type: options.type || 1
        })
    },

    async getCity() {
        return new Promise((resolve, reject) => {
            http.get('/api/city', res => {
                if (res.code === 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },

    async getStore() {
        return new Promise((resolve, reject) => {
            http.get('/api/store', res => {
                if (res.code === 0) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
        });
    },

    async initData() {
        try {
            const cities = await this.getCity();
            const stores = await this.getStore();
            this.setData({
                cities,
                stores
            })
        } catch (e) {
            wx.showToast({
              title: '网络错误',
              icon: 'error'
            })
        }
    },

    onShow() {
        this.initData();
    },

    onCityChange(e) {
        this.setData({
            cityActive: ~~e.detail.value
        })
        http.get(`/api/city/${this.data.cities[~~e.detail.value].id}/children`, res => {
            this.setData({
                cityAreas: res.data
            })
        })
    },

    onCityAreaChange(e) {
        this.setData({
            cityAreaActive: ~~e.detail.value
        })
    },

    onStoreChange(e) {
        this.setData({
            storeActive: ~~e.detail.value
        })
    },

    onCommuityTap() {
        const { cities, cityActive, cityAreas, cityAreaActive } = this.data;
        if (cities.length > 0 && cityActive !== null && cityAreas.length > 0 && cityAreaActive !== null) {
            wx.navigateTo({
              url: `/pages/house/community-search?city=${cities[cityActive].name}&area=${cityAreas[cityAreaActive].name}`,
            });
            return;
        }
        wx.showToast({
          title: '请先选择城市',
          icon: 'none',
          mask: true
        });
    },

    bindBuildingNumber(e) {
        this.setData({
            buildingNumber: ~~e.detail.value
        })
    },

    bindUnitNumber(e) {
        this.setData({
            unitNumber: ~~e.detail.value
        })
    },

    bindRoomNumber(e) {
        this.setData({
            roomNumber: ~~e.detail.value
        })
    },

    getData() {
        let data = {};
        const { cities, cityActive, cityAreas, cityAreaActive, community,  buildingNumber, unitNumber, roomNumber} = this.data;
        if (cities.length === 0 || cityActive === null) {
            throw new Error('请先选择城市');
        }
        if (cityAreas.length === 0 || cityAreaActive === null) {
            throw new Error('请先选择区域');
        }
        if (community === null) {
            throw new Error('请先选择小区');
        }
        if (!buildingNumber) {
            throw new Error('请先输入楼幢号');
        }
        if (!unitNumber) {
            throw new Error('请先输入单元号');
        }
        if (!roomNumber) {
            throw new Error('请先输入房间号');
        }
    },

    bindNext() {
        console.log('next');
        try {
            this.getData();
            this.setData({
                active: 1
            })
        } catch(e) {
            wx.showToast({
              title: e.message,
              icon: 'none'
            })
        }
    },

    // 是否改造更改
    onRemode(e) {
        console.log(e);
        this.setData({
            remode: e.detail.value ? 1 : 0
        })
    },

    onBedroomChange(e) {
        console.log(e);
        this.setData({
            bedroomActive: ~~e.detail.value
        })
    },

    onLivingroomChange(e) {
        console.log(e);
        this.setData({
            livingroomActive: ~~e.detail.value
        });
    },

    onKitchenChange(e) {
        console.log(e);
        this.setData({
            kitchenActive: ~~e.detail.value
        });
    },

    onBathroomChange(e) {
        console.log(e);
        this.setData({
            bathroomActive: ~~e.detail.value
        });
    },

    onHouseStatusChange(e) {
        console.log(e);
        this.setData({
            houseStatusActive: ~~e.detail.value
        })
    },

    onPreStemp() {
        this.setData({
            active: 0
        })
    },

    onExpireDateChange(e) {
        console.log(e);
        this.setData({
            expireDate: e.detail.value
        });
    },

    onTypeChange(e) {
        this.setData({
            type: this.data.types[e.detail.value].value,
            typeActive: e.detail.value
        })
    },

    // 保存
    onSave() {
        const { bedroomActive, livingroomActive, kitchenActive, bathroomActive, houseStatusActive,
            bedroomSelect, livingroomSelect, kitchenSelect, bathroomSelect, houseStatusSelect,
            remode, expireDate
        } = this.data;
        if (bedroomActive === null) {
            wx.showToast({
              title: '请选择卧室数量',
              icon: 'none'
            })
            return;
        }
        if (livingroomActive === null) {
            wx.showToast({
              title: '请选择客厅数量',
              icon: 'none'
            })
            return;
        }
        if (kitchenActive === null) {
            wx.showToast({
              title: '请选择厨房数量',
              icon: 'none'
            })
            return;
        }
        if (bathroomActive === null) {
            wx.showToast({
              title: '请选择卫生间数量',
              icon: 'none'
            })
            return;
        }
        if (houseStatusActive === null) {
            wx.showToast({
              title: '请选择房态类型',
              icon: 'none'
            })
        }
        if (expireDate === null) {
            wx.showToast({
              title: '请选择到期时间',
              icon: 'none'
            })
        }
        const data = {
            bedroomCount: bedroomSelect[bedroomActive].value,
            livingroomCount: livingroomSelect[livingroomActive].value,
            kitchenCount: kitchenSelect[kitchenActive].value,
            bathroomCount: bathroomSelect[bathroomActive].value,
            houseStatus: houseStatusSelect[houseStatusActive].value,
            remode,
            cityId: this.data.cities[this.data.cityActive].id,
            areaId: this.data.cityAreas[this.data.cityAreaActive].id,
            community: this.data.community,
            buildingNumber: this.data.buildingNumber,
            unitNumber: this.data.unitNumber,
            roomNumber: this.data.roomNumber,
            type: this.data.type,
            expireDate: this.data.expireDate
        };
        console.log(data);
        http.post('/api/house', data, (res) => {
            if (res.code === 0) {
                wx.navigateBack({
                  delta: 0,
                })
            } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                });
            }
        })
    }
})