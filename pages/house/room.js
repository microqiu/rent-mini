Page({
    data: {
        status: [
            {
                label: '待租',
                value: '0'
            },
            {
                label: '已租',
                value: '1'
            }
        ],
        directions: [
            {
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
        years: [
            { label: '2024年', value: '2024' },
            { label: '2023年', value: '2023' },
            { label: '2022年', value: '2022' },
          ],
          months: Array.from(new Array(12), (_, index) => ({
            label: `${index + 1}月`,
            value: index + 1,
          })),
          days: Array.from(new Array(31), (_, index) => ({ label: `${index + 1}日`, value: index + 1 })),
          dateCurrentValue: null,
          statusCurrentValue: null,
          directionCurrentValue: null
    },

    onClickPicker(e) {
        const { key } = e?.currentTarget?.dataset;
        console.log(key);
        this.setData({
          [`${key}Visible`]: true,
        });
      },
      onPickerChange(e) {
        const { key } = e?.currentTarget?.dataset;
        if (key === 'status') {
            this.setData({
                statusCurrentValue: e.detail.value
            })
        } else if (key === 'date') {
            let date = e.detail.value.join('-');
            this.setData({
                dateCurrentValue: date
            });
        }
      },

    onLoad(options) {

    },
    onReady() {

    },
    onShow() {

    },
    onHide() {

    },
    onUnload() {

    },
    onPullDownRefresh() {

    },
    onReachBottom() {

    },
    onShareAppMessage() {

    }
})