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
    var score = options.score
    var postId = options.postId
    this.setData({
      score:score,
      list:JSON.parse(options.answerList),
      scoreClass: score>60?'score':'lowscore'
    })
    let bestScore = wx.getStorageSync('bestScore')
    
    
    (bestScore&&bestScore < this.data.score) || !bestScore?wx.setStorageSync('bestScore', score):''
    bestScore?this.setData({bestScore:bestScore}):''
    var list = wx.getStorageSync('list') || []
    list.unshife({
      name: postId ==0?'一年级': postId ==1?'二年级':postId ==2?'三年级': postId ==3?'四年级':'',
      score:score,
      stage:options.stage ==1?'初级': options.stage ==2?'中级': options.stage ==3?'高级':''
    })
    //大于60 ,存储，阶段判断依据
    if(score >=60) {
      switch (postId) {
        case '0':{
          var onePassGrade = wx.getStorageSync('onePassGrade') || 0
          wx.setStorageSync('onePassGrade', onePassGrade+1)
          break;
        }
        case '1':{
          var twoPassGrade = wx.getStorageSync('twoPassGrade') || 0
          wx.setStorageSync('twoPassGrade', twoPassGrade+1)
          break;
        }
        case '2':{
          var threePassGrade = wx.getStorageSync('threePassGrade') || 0
          wx.setStorageSync('threePassGrade', threePassGrade+1)
          break;
        }
        case '3':{
          var fourPassGrade = wx.getStorageSync('fourPassGrade') || 0
          wx.setStorageSync('fourPassGrade', fourPassGrade+1)
          break;
        }
      }
    
    }
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