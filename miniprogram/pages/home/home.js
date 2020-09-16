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
    items: [],
    t:'',
    num:6,
    answerList:[],
    score:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    switch(options.postId) {
      case '0':{
        this.oneRandomQuestion()
        break;
      }
      case '1':{
        this.twoRandomQuestion()
        break;
      }
      case '2': {
        this.threeRandomQuestion()
        break;
      }
      case '3': {
        this.fourRandomQuestion()
        break;
      }
    }
  },
  // 四年级随机题
  fourRandomQuestion: function() {

  },
  //三年级随机题
  threeRandomQuestion: function() {

  },

  //二年级随机题
  twoRandomQuestion: function() {

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
      topicList.push(question)
    }
    this.setData({
      topicList:topicList,
      resultList:resultList
    })
  },
  //获取随机数
  getRandomNum(min,max) {
    var range = max - min
    return (min + Math.round(Math.random * range))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this
    this.randomRes(0)
    this.setData({
      topicItem:this.data.topicList[0],
      index:1
    })
    this.setData({
      t:setInterval(function(){_this.nextTopic(1)},1000)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    
  },

  nextTopic:function (index) {
    let topicList  = this.data.topicList
    let num = this.data.num
    wx.setNavigationBarTitle({
      title: "倒计时 00:0"+ num
    })

    num--
    this.setData({
      num : num
    })
    if(num == -1) {
      clearInterval(this.data.t)
      this.getAnswer()
    }
  },

  randomRes:function(i) {
    let item = []
    let res = {
      value: this.data.resultList[i],
      checked:false
    }
    
    item.push(res)
    for(var j=0;j<3;j++) {
      var it = {
        value : Math.round(Math.random()*200),
        checked :false
      }
      item.push(it)
    }
    item = item.sort(function() {
      return .5 - Math.random();
    });
    this.setData({
      items:item
    })
  },

  //获取答案列表
  getAnswer(value) {
    let index = this.data.index
    let score = this.data.score
    const resValue = this.data.resultList[index-1]
    let answerList = this.data.answerList
    let check = {
      trueResult: resValue,
      checkResult:value,
      verdict:resValue==value
    }
    score = check.verdict? score+2:score
    if(answerList.length === index && !answerList[index - 1].checkResult) answerList.pop()
    answerList.length !== index?answerList.push(check):''
    this.setData({
      answerList:answerList,
      score:score
    })
    
    clearInterval(this.data.t)
    
    if(index >= 5) {
      wx.navigateTo({
        url: '../grade/grade?answerList='+ JSON.stringify(this.data.answerList) +'&score='+score,
      })
      return
    }
    this.setData({
      num:6,
    })
    index++
    let _this = this
    // wx.setNavigationBarTitle({
    //   title: "倒计时 00:0"+ 6
    // })
    this.randomRes(index-1)
    this.setData({
      topicItem:this.data.topicList[index - 1],
      index:index
    })
    this.setData({
      t:setInterval(function(){_this.nextTopic(index)},1000)
    })
  },

  radioChange(e) {
    const items = this.data.items
    
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.getAnswer(e.detail.value)
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
    clearInterval(this.data.t)
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