// pages/grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
    bestScore:wx.getStorageSync('bestScore'),
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      score:options.score,
      list:JSON.parse(options.answerList),
      scoreClass: options.score>6?'score':'lowscore'
    })
    let bestScore = wx.getStorageSync('bestScore')
    
    
    (bestScore&&bestScore < this.data.score) || !bestScore?wx.setStorageSync('bestScore', options.score):''
    bestScore?this.setData({bestScore:bestScore}):''
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
    wx.navigateBack({
      delta: 2,
 })

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