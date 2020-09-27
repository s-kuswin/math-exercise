// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayNum:0,
    practiceNumbestScore:0,
    practiceNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    this.setData({
      dayNum: wx.getStorageSync('dayNum') || 0,
      bestScore: wx.getStorageSync('bestScore') || 0,
      practiceNum: wx.getStorageSync('practiceNum') || 0,
    })
    
  },

  historyClick:function () {
    wx.navigateTo({
      url:"../history/history"
    });
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