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
    score:0,
    inputTypew:'digit',
    inputValue:'',
    defaultVal:''
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
    var topicList = []
    var resultList = []
    for(var i = 0;i < 50;i++) {
      let several = this.getRandomNum(1,4)
      var son_a = this.getRandomNum(1,10000);
      var par_b = this.getRandomNum(1,10000);
      var son_c = this.getRandomNum(1,10000);
      var par_d = this.getRandomNum(1,10000);
      var A
      switch(several) {
        case 1:{
          A = this.count(son_a,par_b,4,100,10000,10000)
        }
        case 2:{
          A = this.twoCount(son_a,par_b,son_c,par_d,4,100,10000,10000);
        }
        case 3:{
          //含有分数
          A = this.fractionCount()
        }
        case 4:{
          //含有小数
          A = this.decimalCount(4)
        }
      }     
      let arr = A.split('=')
      topicList.push(arr[0])
      resultList.push(arr[1])     
    }
    this.setData({
      topicList:topicList,
      resultList:resultList
    })
  },
  //三年级随机题
  threeRandomQuestion: function() {
    var topicList = []
    var resultList = []
    for(var i = 0;i < 50;i++) {
      let several = this.getRandomNum(1,4)
      var son_a = this.getRandomNum(1,1000);
      var par_b = this.getRandomNum(1,1000);
      var son_c = this.getRandomNum(1,1000);
      var par_d = this.getRandomNum(1,1000);
      var A
      switch(several) {
        case 1:{
          //一位运算
          A = this.count(son_a,par_b,3,10,1000,1000);
          break;
        }
        case 2:{
          //混合运算
          A = this.twoCount(son_a,par_b,son_c,par_d,3,10,1000,1000);
          break;
        }
        case 3:{
          //含有分数
          A = this.fractionCount()
        }
        case 4:{
          //含有小数
          A = this.decimalCount(3)
        }
      }
      let arr = A.split('=')
      topicList.push(arr[0])
      resultList.push(arr[1])      
    }
    this.setData({
      topicList:topicList,
      resultList:resultList
    })

  },

  //二年级随机题
  twoRandomQuestion: function() {
    var topicList = []
    var resultList = []
    for(var i = 0;i < 50;i++) {
      let several = this.getRandomNum(1,2)
      var son_a = this.getRandomNum(1,100);
      var par_b = this.getRandomNum(1,100);
      var son_c = this.getRandomNum(1,100);
      var par_d = this.getRandomNum(1,100);
      var A
      switch(several) {
        case 1:{
          A = this.count(son_a,par_b,2,10,10,100);
         
        }
        case 2:{
          A = this.twoCount(son_a,par_b,son_c,par_d,2,10,10,100);
        }
      }
      let arr = A.split('=')
      topicList.push(arr[0])
      resultList.push(arr[1])      
    }
    this.setData({
      topicList:topicList,
      resultList:resultList
    })
  },

  //小数运算
  decimalCount:function(level) {
    var Arr = ['+','-','*','+-','++','--']
    var shifting = [10,100,1000]
    var a,b,n,sum
    var m = this.getRandomNum(0,2)
    var a = this.getRandomNum(0,100)
    var sum = 0
    if(level == 3)  {
      n = this.getRandomNum(0,1)
    }

    if(level = 4) {
      n = this.getRandomNum(0,5)
    }    
    switch(Arr[n]){
        case '+':{
          b = this.getRandomNum(0,100)
          sum = a+b
          return `${a/shifting[m]}+${b/shifting[m]}=${sum/shifting[m]}`
        }
        case '-':{
          b = this.getRandomNum(0,a)
          sum = a-b
          return `${a/shifting[m]}-${b/shifting[m]}=${sum/shifting[m]}`
        }
        case '+-':{
          b = this.getRandomNum(0,100-a)
          var c = this.getRandomNum(0,a+b)
          sum = a+b-c
          return `${a/shifting[m]}+${b/shifting[m]}-${c/shifting[m]}=${sum/shifting[m]}`

        }
        case '++':{
          b = this.getRandomNum(0,100)
          var c = this.getRandomNum(0,100)
          sum = a+b+c
          return `${a/shifting[m]}+${b/shifting[m]}+${c/shifting[m]}=${sum/shifting[m]}`

        }
        case '--':{
          b = this.getRandomNum(0,a)
          var c = this.getRandomNum(0,a-b)
          sum = a-b-c
          return `${a/shifting[m]}-${b/shifting[m]}-${c/shifting[m]}=${sum/shifting[m]}`
        }
        case '*':{
          return `${a/shifting[m]}×${shifting[m]}=${a}`
        }
      }
  },

  // 分数运算
  fractionCount:function() {
    var a = this.getRandomNum(2,10)
    var b = this.getRandomNum(1,a-1)
    var c = this.getRandomNum(1,a-b)
    var Arr = ['+','-']
    var n = this.getRandomNum(0,1)
    switch(Arr[n]) {
      case '+':{
        var sum = b+c
        return `${b}/${a}+${c}/${a}=${sum}/${a}`
      }
      case '-':{
        if(b<c) {
          var d = c
          c = b
          b = d
        }
        return `${b}/${a}-${c}/${a}=${sum}/${a}`
      }
    }
  },

  //混合运算
  twoCount:function(a,b,c,d,level,minBits,minBits2,maxBits) {
    var Arr = ['+','-','*','/']

    var n = this.getRandomNum(0,3)
    var m = this.getRandomNum(0,3)
    while(n>=2&&m>=2) {
      n = this.getRandomNum(0,3)
      m = this.getRandomNum(0,3)
    }
    const nm = `${n}${m}`
    switch(nm) {
      case '00':{
        var sum = a+b+c
        return `${a}+${b}+${c}=${sum}`
      }
      case '01':{
        var sum = a+b-c
        if(sum<0) {
          var c = this.getRandomNum(1,a+b);
          var sum=a+b-c;
        }
        return `${a}+${b}-${c}=${sum}`
      }
      case '02':{
        var b = this.getRandomNum(1,minBits);
        var c = this.getRandomNum(1,minBits2);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = a+ (b*c)
        return `${a}+${b}×${c}=${sum}`
      }
      case '03':{
        var b = this.getRandomNum(1,minBits);
        var c = this.getRandomNum(1,minBits2);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = a+ (d/c)
        return `${a}+${d}÷${c}=${sum}`
      }
      case '11':{
        var sum = a-b-c
        while(sum<0) {
          var a = this.getRandomNum(c+b,maxBits);
          var sum=a-b-c;
        }
        return `${a}-${b}-${c}=${sum}`
      }
      case '12':{
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var sum = a-(b*c)
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        if(sum<0) {
          var a = this.getRandomNum(b*c,maxBits);
          var sum=a-(b*c);
        }
        return `${a}-${b}×${c}=${sum}`
      }
      case '13':{
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = a-(d/c)
 
        if(sum<0) {
          var a = this.getRandomNum(d/c,maxBits);
          var sum=a-(d/c);
        }
        return `${a}-${d}÷${c}=${sum}`
      }
      case '10':{
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = (d/c) - a
        if(sum<0) {
          var a = this.getRandomNum(1,d/c);
          var sum=(d/c) - a;
        }
        return `${d}÷${c}-a=${sum}`
      }
      case '20':{
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = (b*c) + a
        return `${b}×${c}+${a}=${sum}`
      }
      case '21':{
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = (b*c) - a
        if(sum<0) {
          var a = this.getRandomNum(1,b*c);
          var sum=(b*c) - a;
        }
        return `${b}×${c}-${a}=${sum}`
      }
      case '30':{
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = (d/c) + a
        return `${d}÷${c}+${a}=${sum}`
      }
      case '31':{
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = (d/c) - a
        if(sum<0) {
          var a = this.getRandomNum(1,d/c);
          var sum=(d/c) - a;
        }
        return `${d}÷${c}-${a}=${sum}`
      }
    }

  },

  count:function(a,b,level,minBits1,minBits2,maxBits) {
    var Arr = ['+','-','*','/']
    var n = this.getRandomNum(0,3)
    switch(Arr[n]) {
      case '+':{
        var sum = a + b
        return a +'+'+b +'='+sum;
        break;
      }
      case '-':{
        var sum = a-b
        while(sum<0) {
          var b = this.getRandomNum(1,a);
          var sum=a-b;
        }
        return `${a}-${b}=${sum}`
      }
      case '*':{
        var a = this.getRandomNum(1,minBits1);
        var b = this.getRandomNum(1,minBits2);
        var sum = a*b
        return `${a}×${b}=${sum}`
      }
      case '/':{
        var b = this.getRandomNum(1,minBits1);
        var c = this.getRandomNum(1,minBits2);
        a = b*c
        while(a>maxBits) {
          b = this.getRandomNum(1,minBits1);
          c = this.getRandomNum(1,minBits2);
          a = b*c
        }
        var sum = a/b
        return `${a}÷${b}=${sum}`
      }
    }
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
    console.log(topicList,resultList);
    
    this.setData({
      topicList:topicList,
      resultList:resultList
    })
  },
  //获取随机数
  getRandomNum(min,max) {
    var range = max - min    
    return (min + Math.round(Math.random() * range))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this = this
    // this.randomRes(0)
    var topic = this.data.topicList[0]
    this.setData({
      inputTypew:topic.indexOf('/') !== -1?'text':'digit',
      topicItem:topic,
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
      this.getAnswer(this.data.inputValue)
    }
  },

  randomRes:function(i) {
    let item = []
    let res = {
      value: this.data.resultList[i],
      checked:false
    }
    item.push(res)
    var rand = Number(res.value) + 50
    for(var j=0;j<3;j++) {
      var it = {
        value : Math.round(Math.random()*rand),
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
      score:score,
      inputValue:'',
      defaultVal:''
    })
    
    clearInterval(this.data.t)
    
    if(index >= 5) {
      wx.redirectTo({
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
    // this.randomRes(index-1)
    var topic = this.data.topicList[index - 1]
    this.setData({
      inputTypew:topic.indexOf('/') !== -1?'text':'digit',
      topicItem:topic,
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

  //input框輸入值获取
  bindHideKeyboard(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //下一题
  onButton() {
    this.getAnswer(this.data.inputValue)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('隐藏');
    

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.t)
    console.log('卸载');
    
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