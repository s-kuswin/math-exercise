// pages/grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
    bestScore:wx.getStorageSync('bestScore'),
    list:[],
    excellent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var score = options.score
    var postId = options.postId
    // 页面显示数据
    this.setData({
      excellent:options.excellent,
      score:score,
      scoreClass: score>60?'score':'lowscore'
    })

    //最好成绩
    let bestScore = wx.getStorageSync('bestScore') || 0
    if(bestScore < score) {
      wx.setStorageSync('bestScore', score)
      bestScore = score
    }
    this.setData({
      bestScore:bestScore || 0
    })

    //获取日期
    let date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;

    var day = `${y}-${m}-${d}`


    //获取历史记录
    // list = Array.from(list)
    var list = wx.getStorageSync('list') ? JSON.parse(wx.getStorageSync('list')) : []
    console.log(list,list.length);
    let item = {
      name: postId ==0?'一年级': postId ==1?'二年级':postId ==2?'三年级': postId ==3?'四年级':'',
      score:score,
      stage:options.stage ==1?'初级': options.stage ==2?'中级': options.stage ==3?'高级':'',
      day:day
    }
    if(list.length) {
      list.unshift(item)
    } else {
      list.push(item)
    }
    wx.setStorageSync('list', JSON.stringify(list))


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

    
      //测试天数收集
      let getDay = wx.getStorageSync('day')
      let dayNum = wx.getStorageSync('dayNum') || 0

      if(getDay !== day) {
        dayNum++
        wx.setStorageSync('day', day)
        wx.setStorageSync('dayNum', dayNum)
      }

      //练习试卷数量Number of 
      let practiceNum = wx.getStorageSync('practiceNum') || 0
      wx.setStorageSync('practiceNum', practiceNum+1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '成绩'
    })

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