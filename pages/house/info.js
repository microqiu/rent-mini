const http = require('../../utils/http');
Page({
    data: {
        id: null,
        houseConfigArr: [
        ],
        houseConfig: [
            'WIFI',
            '电梯',
            '健身房',
            '游泳池',
            '停车位',
            '超市',
            '厨房',
            '电磁炉',
            '厨柜',
            '油烟机',
            '洗衣机',
            '烘干机',
            '空调',
            '冰箱',
            '热水器',
            '电视',
            '微波炉',
            '烤箱',
            '吹风机',
            '床',
            '宽带',
            '沙发',
            '茶几',
            '书桌',
            '餐桌',
            '独卫'
        ],
        houseSpecialArr: [
        ],
        'houseSpecial': [
            '有厨房',
            '有阳台',
            '带飘窗',
            '智能门锁',
            '近地铁',
            '独卫'
        ],
        checkConfigAll: false,
        checkSpeckalAll: false,

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

        directionActive: null,
        direction: [
            '东', '西', '南', '北'
        ],
        furnishActive: null,
        furnish: [
            '精装',
            '简装'
        ],
        

        totalFloorActive: null, 
        floorActive: null,
        floor:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],

        houseTypeActive: null,
        houseType: [
            '普通',
            '复式'
        ]
    },
    onLoad(options) {
        console.log(options);
        let configArray = this.data.houseConfig.map(e => ({
            text: e,
            checked: false
        }));
        let specialArray = this.data.houseSpecial.map(e => ({
            text: e,
            checked: false
        }));
        this.setData({
            id: options.id,
            houseConfigArr: configArray,
            houseSpecialArr: specialArray
        });
        const detail = JSON.parse(options.detail);
        console.log(detail);

        const originConfig = detail.originConfig;
        if (originConfig.bedroomCount) {
            this.data.bedroomSelect.forEach((item, index) => {
                if (item.value === originConfig.bedroomCount) {
                    this.data.bedroomActive = index;
                }
            })
        }
        if (originConfig.livingroomCount) {
            this.data.livingroomSelect.forEach((item, index) => {
                if (item.value === originConfig.livingroomCount) {
                    this.data.livingroomActive = index;
                }
            })
        }
        if (originConfig.kitchenCount) {
            this.data.kitchenSelect.forEach((item, index) => {
                if (item.value === originConfig.kitchenCount) {
                    this.data.kitchenActive = index;
                }
            })
        }
        if (originConfig.bathroomCount) {
            this.data.bathroomSelect.forEach((item, index) => {
                if (item.value === originConfig.bathroomCount) {
                    this.data.bathroomActive = index;
                }
            })
        }
        this.setData({
            ...this.data
        })
    },

    onReady() {
        
    },

    onInputChange(e) {
        console.log(e.currentTarget.dataset);
        const name = e.currentTarget.dataset.name;
        this.setData({
            [name]: e.detail.value
        })
    },

    onSelectChange(e) {
        console.log(e.currentTarget.dataset);
        this.setData({
            [e.currentTarget.dataset.name]: e.detail.value 
        })
    },

    onCheckConfig(e) {
        console.log(e);
        this.data.houseConfigArr[~~e.currentTarget.dataset.index].checked = !this.data.houseConfigArr[~~e.currentTarget.dataset.index].checked;
        let c = this.data.houseConfigArr.filter(item => !item.checked)
        this.setData({
            houseConfigArr: [...this.data.houseConfigArr],
            checkConfigAll: c.length === 0
        })
    },

    onCheckSpecial(e) {
        console.log(e);
        this.data.houseSpecialArr[~~e.currentTarget.dataset.index].checked = !this.data.houseSpecialArr[~~e.currentTarget.dataset.index].checked;
        let c = this.data.houseSpecialArr.filter(item => !item.checked)
        this.setData({
            houseSpecialArr: [...this.data.houseSpecialArr],
            checkSpecialAll: c.length === 0
        })
    },

    onCheckSpecialAll() {
        this.data.houseSpecialArr.forEach(item => {
            item.checked = !this.data.checkSpecialAll
        })
        this.setData({
            houseSpecialArr: [...this.data.houseSpecialArr],
            checkSpecialAll: !this.data.checkSpecialAll
        })
    },

    onCheckConfigAll() {
        this.data.houseConfigArr.forEach(item => {
            item.checked = !this.data.checkConfigAll
        })
        this.setData({
            houseConfigArr: [...this.data.houseConfigArr],
            checkConfigAll: !this.data.checkConfigAll
        })
    },

    onSave() {
        let data = {};
        const { bedroomActive, bedroomSelect, livingroomActive, livingroomSelect, 
            kitchenActive, kitchenSelect, bathroomActive, bathroomSelect,
            area, directionActive, direction, furnishActive, furnish, totalFloorActive, floorActive, floor,
            houseConfigArr, houseSpecialArr
        } = this.data;
        if (bedroomActive !== null) {
            data.bedroomCount = bedroomSelect[bedroomActive].value;
        }
        if (livingroomActive !== null) {
            data.livingroomCount = livingroomSelect[livingroomActive].value;
        }
        if (kitchenActive !== null) {
            data.kitchenCount = kitchenSelect[kitchenActive].value;
        }
        if (bathroomActive !== null) {
            data.bathroomCount = bathroomSelect[bathroomActive].value;
        }
        if (area) {
            data.area = area;
        }
        if (directionActive !== null) {
            data.direction = direction[directionActive];
        }
        if (furnishActive !== null) {
            data.furnishActive = furnish[furnishActive];
        }
        if (floorActive !== null) {
            data.floor = floor[floorActive];
        }
        if (totalFloorActive !== null) {
            data.totalFloor = floor[totalFloorActive];
        }
        let c = houseConfigArr.filter(item => item.checked);
        if (c.length > 0) {
            data.houseConfig = (c.map(item => item.text)).join(',');
        } else {
            data.houseConfig = '';
        }
        c = houseSpecialArr.filter(item => item.checked);
        if (c.length > 0) {
            data.houseSpecial = (c.map(item => item.text)).join(',');
        } else {
            data.houseSpecial = '';
        }
        console.log(data);
    }
})