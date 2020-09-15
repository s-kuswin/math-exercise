// miniprogram/pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList:[],
    resultList:[],
    topicItem:'',
    index:1,
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.oneRandomQuestion()
    this.randomRes(0)
  },

  // 一年级随机题
  oneRandomQuestion:function() {
    var topicList = []
    var resultList = []
    for(var i = 0;i < 50;i++) {
      var first = Math.round(Math.random()*100);
      var symbol = ['+','-']
      var second = symbol[Math.floor(Math.random()*symbol.length)];
      var three
      switch(second) {
        case "+":{
          three = Math.round(Math.random()*100);
          resultList.push(first + three);
          break;
        }
        case "-": {
          three = Math.round(Math.random()*first);
          resultList.push(first - three);
          break;
        }
      }
      var question = first + second + three + "=";
      topicList.push(question);
      this.setData({
          topicItem:topicList[0],
          index:1
      })
    }
    this.setData({
      topicList:topicList,
      resultList:resultList
    })
    console.log(topicList,resultList);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let num = 6
    let t = setInterval(nextTopic,1000)
    let index = this.data.index
    let topicList  = this.data.topicList
    let _this = this
    function nextTopic () {
      wx.setNavigationBarTitle({
        title: "倒计时 00:0"+ num
      })
      num--
      if(num == -1) {
        clearInterval(t)
        if(index < 50) {
          index++
          _this.setData({
            topicItem:topicList[index - 1],
            index:index
          })
          _this.randomRes(index-1)
          num = 6
          t = setInterval(nextTopic,1000)
        }
      }
    }
  },

  randomRes:function(i) {
    let item = []

    let res = this.data.resultList[i]
    item.push(res)
    for(var j=0;j<3;j++) {
      var number = Math.round(Math.random()*200);
      item.push(number)
    }
    item = item.sort(function() {
      return .5 - Math.random();
    });
    this.setData({
      items:item
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})