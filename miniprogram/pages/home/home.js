// miniprogram/pages/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList:[],
    resultList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.oneRandomQuestion()
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
    }

    // this.setData({
    //   topicList:topicList,
    //   resultList:resultList
    // })
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
    let t = setInterval(()=> {
      wx.setNavigationBarTitle({
        title: "倒计时 00:0"+ num
      })
      if(!num) {
        clearInterval(t)
      }
      num-- 
    },1000)
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