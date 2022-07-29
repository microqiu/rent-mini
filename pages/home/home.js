const http = require('../../utils/http');

Page({
  data: {
    showController: 0,
    searchConfig: null,
    searchIndex: 0,
    currSearchData: null,
    regions: [],
    regionMainIndex: 0,
    regionActiveId: [],
    regionActiveText: '',
    houses: [],

    priceChecked: null,

    allRentData: [
      {
        text: '不限',
        id: 0
      },
      {
        text: '1居',
        id: 1
      },
      {
        text: '2居',
        id: 2
      },
      {
        text: '3居+',
        id: 3
      },
    ],
    subRentData: [
      {
        text: '不限',
        id: 0
      },
      {
        text: '2居',
        id: 2
      },
      {
        text: '3居',
        id: 3
      },
      {
        text: '4居+',
        id: 4
      },
    ],

    allRent: [],
    subRent: [],
  },

  onShow: function () {
    http.get('/api/search/config', res => {
      if (res.code === 200) {
        console.log(res);
        let id = 0;
        let districts = [];
        res.data.district.forEach(item => {
          districts.push({
            text: item.name,
            children: [{text: '全部', id: id++}, ...(item.roads.map((i) => ({text: i, id: id++})))]
          });
        })
        this.setData({
          regions: districts
        })
        return;
      }
    });
  },

  onDocumentTap: function (event) {
    if (this.data.showController) {
      this.setData({
        showController: 0
      })
    }
    console.log(event);
  },

  onClickItem: function (event) {
    console.log(event);
    if (this.data.regionActiveId.includes(event.detail.id)) {
      this.setData({
        regionActiveId: this.data.regionActiveId.filter(r => r != event.detail.id)
      })
      return;
    }
    if (event.detail.text === '全部') {
      let ids = this.data.regions[this.data.regionMainIndex].children.map(child => child.id);
      console.log(ids);
      this.setData({
        regionActiveId: [ ...(this.data.regionActiveId.filter(r => !ids.includes(r))), event.detail.id]
      });
    } else {
      let allId = 0;
      this.data.regions[this.data.regionMainIndex].children.forEach(item => {
          if (item.text === '全部') {
            allId = item.id;
          }
      });
      let newRai = this.data.regionActiveId.filter((item) => item != allId);
      newRai.push(event.detail.id);
      this.setData({
        regionActiveId: newRai
      });
    }
  },

  onClickNav: function (event) {
    this.setData({
      regionMainIndex: event.detail.index
    })
  },

  onSeachIndexChange: function (event) {
    console.log(event);
    const id = event.currentTarget.id;
    console.log(id);
    if (id === 'area') {
      this.setData({showController: this.data.showController === 1 ? 0 : 1});
    } else if (id === 'way') {
      this.setData({showController: this.data.showController === 2 ? 0 : 2});
    } else if (id === 'amount') {
      this.setData({showController: this.data.showController === 3 ? 0 : 3});
    } else if (id === 'filter') {
      this.setData({showController: this.data.showController === 4 ? 0 : 4});
    }
  },

  onSearch: function(e) {
    console.log(this.data.searchConfig, this.data.activeIds);
    let regionText = '';
    let districtMap = [];
    this.data.regions.forEach(region => {
      let searchList = region.children.filter(item => this.data.regionActiveId.includes(item.id)).map(item => item.text);
      if (searchList.length > 0) {
        districtMap.push({
          name: region.text,
          roads: searchList
        })
      }
    });

    let allRentSearch = this.data.allRentData.filter(item => item.checked).map(item => item.id);
    let subRentSearch = this.data.subRentData.filter(item => item.checked).map(item => item.id);


    http.post('/api/search', {
      district: districtMap,
      allRent: allRentSearch,
      subRent: subRentSearch
    }, res => {
      console.log(res);
      this.data.houses = [];
      res.data.forEach(item => {this.data.houses.push(item)});
      this.setData({
        showController: false,
        houses: this.data.houses
      })
    })
  },

  onResetSearch: function (e) {
    console.log(this.data.searchConfig);
    // let initActiveIds = this.data.activeIds.map(() => -1);
    this.setData({
      activeIds: initActiveIds
    })
  },

  onAllRent: function (e) {
    let value = ~~(e.target.dataset.value);
    this.data.allRentData.forEach(item => {
        if (item.id == value) {
          item.checked = !item.checked;
        }
    });
    if (value === 0 && this.data.allRentData[0].checked) {
      this.data.allRentData.forEach(item => {
        if (item.id !== 0) {
          item.checked = false;
        }
      })
    } else {
      this.data.allRentData[0].checked = false;
    }
    this.setData({
      allRentData: this.data.allRentData
    })
  },

  onSubRent: function (e) {
    let value = ~~(e.target.dataset.value);
    this.data.subRentData.forEach(item => {
        if (item.id == value) {
          item.checked = !item.checked;
        }
    });
    if (value === 0 && this.data.subRentData[0].checked) {
      this.data.subRentData.forEach(item => {
        if (item.id !== 0) {
          item.checked = false;
        }
      })
    } else {
      this.data.subRentData[0].checked = false;
    }
    this.setData({
      subRentData: this.data.subRentData
    })
  },

  onPriceChecked: function (e) {
    let value = ~~(e.target.dataset.value);
    this.setData({
      priceChecked: value
    })
  }
})