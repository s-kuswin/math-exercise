// miniprogram/pages/home.js
let num = 12 //计时几秒
let t ='' //延时器
let topicList = [] //问题列表
let resultList = [] //答案列表
let answerList = [] //回答的结果列表
let excellent = 0 //在6秒内打完题的
let score = 0 //分数
let stage = 1
let postId  //年级id
let totalTime = 300000  //全程总时间
let time
let className = '一年级'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topicItem:'',
    index:1,
    // items: [],
    defaultVal:'',
    title:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    num = 12
    excellent = 0 //在6秒内打完题的
    score = 0 //分数
    stage = 1
    postId = options.postId
    //根据缓存中的记录超过60的分数阶段判断
    switch(postId) {
      case '0':{
        className = '一年级'
        let onePassGrade = wx.getStorageSync('onePassGrade')
        stage = 1
        if(onePassGrade) {
          stage = onePassGrade >= 50?3: onePassGrade >= 10 ?2:1
        }
        
        this.oneRandomQuestion()
        break;
      }
      case '1':{
        className = '二年级'
        let twoPassGrade = wx.getStorageSync('twoPassGrade')
        stage = 1
        if(twoPassGrade) {
          stage = twoPassGrade > 50 ? 3 : twoPassGrade > 10 ? 2 : 1
        }
        this.twoRandomQuestion()
        break;
      }
      case '2': {
        className = '三年级'
        let threePassGrade = wx.getStorageSync('threePassGrade')
        stage = 1
        if(threePassGrade) {
          stage = threePassGrade > 50 ? 3 : threePassGrade > 10 ? 2 : 1
        }
        this.threeRandomQuestion()
        break;
      }
      case '3': {
        className = '四年级'
        let fourPassGrade = wx.getStorageSync('fourPassGrade')
        stage = 1
        if(fourPassGrade) {
          stage = fourPassGrade > 50?3: fourPassGrade > 10 ?2:1
        }
        this.fourRandomQuestion()
        break;
      }
    }
  },
  // 四年级随机题
  fourRandomQuestion: function() {
    topicList = []
    resultList = []
    for(var i = 0;i < 50;i++) {
      //阶段判断控制
      var minNum1,minNum2,maxNum,several,num,maxNum2
      switch(stage) {
        case 1:{
          minNum1 = 100
          minNum2 = 100
          maxNum = 1000
          maxNum2 = 5000
          num = 1//小数等级，只有简单运算
          several = this.getRandomNum(2,3)
          if(several == 2) several = 1
          break;
        }
        case 2:{ 
          minNum1 = 100
          minNum2 = 1000
          maxNum = 1000
          maxNum2 = 10000
          num = 2
          several = this.getRandomNum(2,3)
          break;
        }
        case 3:{
          minNum1 = 1000
          minNum2 = 1000
          maxNum = 10000
          maxNum2 = 20000
          num = 3
          several = this.getRandomNum(2,3)
          break;
        }
      }

      var son_a = this.getRandomNum(minNum1,maxNum);
      var par_b = this.getRandomNum(minNum1,maxNum);
      var son_c = this.getRandomNum(minNum1,maxNum);
      var par_d = this.getRandomNum(minNum1,maxNum);

      var A
      
      switch(several) {
        case 1:{
          A = this.count(son_a,par_b,4,minNum1,minNum2,maxNum,maxNum2)
          break;
        }
        case 2:{
          A = this.twoCount(son_a,par_b,son_c,par_d,4,minNum1,minNum2,maxNum);
          break;
        }
        case 3:{
          //含有小数
          A = this.decimalCount(num)
          break;
        }
        case 4:{
          //含有分数
          A = this.fractionCount()
          break;
        }
      }     
      i = this.titlePush(A,i)
    }
    console.log(topicList,resultList);
  },

  //三年级随机题
  threeRandomQuestion: function() {
    topicList = []
    resultList = []
    for(var i = 0;i < 50;i++) {
      var minNum1,minNum2,maxNum,several,num,maxNum2
      
      switch(stage) {
        case 1:{
          minNum1 = 10
          minNum2 = 100
          maxNum = 1000
          maxNum2 = 1000
          num = 1//小数等级，只有简单运算
          several = this.getRandomNum(2,3)
          if(several == 2) several = 1
          break;
        }
        case 2:{
          minNum1 = 10
          minNum2 = 100
          maxNum = 1000
          maxNum2 = 2000
          several = this.getRandomNum(2,3)
          num = 1
          break;
        }
        case 3:{
          minNum1 = 10
          minNum2 = 100
          maxNum = 1000
          maxNum2 = 5000
          several = this.getRandomNum(2,3)
          num = 1
          break;
        }
      }

      var son_a = this.getRandomNum(minNum1,maxNum);
      var par_b = this.getRandomNum(minNum1,maxNum);
      var son_c = this.getRandomNum(minNum1,maxNum);
      var par_d = this.getRandomNum(minNum1,maxNum);
      var A
      
      switch(several) {
        case 1:{
          //一位运算
          A = this.count(son_a,par_b,3,minNum1,minNum2,maxNum,maxNum2);
          break;
        }
        case 2:{
          //混合运算
          A = this.twoCount(son_a,par_b,son_c,par_d,3,minNum1,minNum2,maxNum);
          break;
        }
        case 3:{
          //含有小数
          
          A = this.decimalCount(num)
          break;
        }
        case 4:{
          //含有分数
          A = this.fractionCount()
          break;
        }
        
      }
      i = this.titlePush(A,i)
    }

    console.log(topicList,resultList);
  },

  //二年级随机题
  twoRandomQuestion: function() {
    topicList = []
    resultList = []
    for(var i = 0;i < 50;i++) {
      var minNum1,minNum2,maxNum,several,maxNum2
      
      switch(stage) {
        case 1:{
          minNum1 = 10;
          minNum2 = 10;
          maxNum = 100;
          maxNum2 = 100;
          several = 1;
          break;
        }
        case 2:{;
          minNum1 = 10;
          minNum2 = 10;
          maxNum = 100;
          maxNum2 = 300;
          several = 2;
          break;
        }
        case 3:{
          minNum1 = 10;
          minNum2 = 100;
          maxNum = 1000;
          maxNum2 = 1000;
          several = 2;
          break;
        }
      }
      
      var son_a = this.getRandomNum(minNum1,maxNum);
      var par_b = this.getRandomNum(minNum1,maxNum);
      var son_c = this.getRandomNum(minNum1,maxNum);
      var par_d = this.getRandomNum(minNum1,maxNum);
      
      var A
      switch(several) {
        case 1:{
          A = this.count(son_a,par_b,2,minNum1,minNum2,maxNum,maxNum2);
          break;
        }
        case 2:{
          A = this.twoCount(son_a,par_b,son_c,par_d,2,minNum1,minNum2,maxNum);
          break;
        }
      }      
      i = this.titlePush(A,i)
    }
    console.log(topicList,resultList);
  },

  //小数运算
  decimalCount:function(level) {
    var Arr = ['+','-','*','+-','++','--']
    var shifting = [10,100,1000]
    var a,b,n,sum
    var m = this.getRandomNum(0,2)
    var a = this.getRandomNum(1,100)
    var sum = 0
    if(level == 1)  {
      n = this.getRandomNum(0,1)
    }

    if(level == 2)  {
      n = this.getRandomNum(0,2)
    }

    if(level ==3) {
      n = this.getRandomNum(3,4)
    }    
    
    switch(Arr[n]){
        case '+':{
          b = this.getRandomNum(1,100);
          sum = a+b;
          return `${a/shifting[m]} + ${b/shifting[m]}=${sum/shifting[m]}`;
          break;
        }
        case '-':{
          b = this.getRandomNum(1,a);
          sum = a-b;
          return `${a/shifting[m]} - ${b/shifting[m]}=${sum/shifting[m]}`;
          break;
        }
        case '+-':{
          b = this.getRandomNum(1,100-a);
          var c = this.getRandomNum(1,a+b);
          sum = a+b-c;
          return `${a/shifting[m]} + ${b/shifting[m]} - ${c/shifting[m]}=${sum/shifting[m]}`;
          break;
        }
        case '++':{
          b = this.getRandomNum(1,100);
          var c = this.getRandomNum(1,100);
          sum = a+b+c;
          return `${a/shifting[m]} + ${b/shifting[m]} + ${c/shifting[m]}=${sum/shifting[m]}`;
          break;
        }
        case '--':{
          if(a == 1) {
            b = this.getRandomNum(2,100);
          }
          b = this.getRandomNum(1,a-1);
          var c = this.getRandomNum(1,a-b);
          sum = a-b-c;
          return `${a/shifting[m]} - ${b/shifting[m]} - ${c/shifting[m]}=${sum/shifting[m]}`;
          break;
        }
        case '*':{
          return `${a/shifting[m]} × ${shifting[m]}=${a}`;
          break;
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
        return sum == a? `${b}/${a} + ${c}/${a}=1` : `${b}/${a} + ${c}/${a}=${sum}/${a}`
        break;
      }
      case '-':{
        if(b<c) {
          var d = c
          c = b
          b = d
        }
        var sum = b-c
        return sum?`${b}/${a} - ${c}/${a}=${sum}/${a}`:`${b}/${a} - ${c}/${a}=0`
        break;
      }
    }
  },

  //混合运算
  twoCount:function(a,b,c,d,level,minBits,minBits2,maxBits) {
    var Arr = ['+','-','*','/']

    var n = this.getRandomNum(0,3)
    var m = this.getRandomNum(0,3)
    while(n >= 2 && m >= 2) {
      //随机哪两种运算
      n = this.getRandomNum(0,3)
      m = this.getRandomNum(0,3)
    }
    const nm = `${n}${m}`
    switch(nm) {
      case '00':{
        //++
        var sum = a+b+c
        return `${a} + ${b} + ${c}=${sum}`
        break;
      }
      case '01':{
        //+-
        var sum = a+b-c
        if(sum<0) {
          var c = this.getRandomNum(1,a+b);
          var sum=a+b-c;
        }
        return `${a} + ${b} - ${c}=${sum}`
        break;
      }
      case '02':{
        //+*
        var b = this.getRandomNum(1,minBits);
        var c = this.getRandomNum(1,minBits2);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = a+ (b*c)
        return `${a} + ${b} × ${c}=${sum}`
        break;
      }
      case '03':{
        //   +/
        var b = this.getRandomNum(1,minBits);
        var c = this.getRandomNum(1,minBits2);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = a+ (d/c)
        return `${a} + ${d} ÷ ${c}=${sum}`
        break;
      }
      case '11':{
        // --
        var sum = a-b-c
        while(sum<0) {
          var a = this.getRandomNum(c+b,maxBits);
          var sum=a-b-c;
        }
        return `${a} - ${b} - ${c}=${sum}`
        break;
      }
      case '12':{
        //   -*
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
        return `${a} - ${b} × ${c}=${sum}`
        break;
      }
      case '13':{
        //-/
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
        return `${a} - ${d} ÷ ${c}=${sum}`
        break;
      }
      case '10':{
        //-+
        var sum = a-c+b
        if(sum<0) {
          var c = this.getRandomNum(1,a+b);
          var sum=a-c+b;
        }
        return `${a} - ${c} + ${b}=${sum}`;
        break;
      }
      case '20':{
        //*+
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = (b*c) + a
        return `${b} × ${c} + ${a}=${sum}`
        break;
      }
      case '21':{
        // *-
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
        return `${b} × ${c} - ${a}=${sum}`
        break;
      }
      case '30':{
        //   /+
        var b = this.getRandomNum(1,minBits2);
        var c = this.getRandomNum(1,minBits);
        var d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(1,minBits2);
          c = this.getRandomNum(1,minBits);
          d = b*c
        }
        var sum = (d/c) + a
        return `${d} ÷ ${c} + ${a}=${sum}`
      }
      case '31':{
        // /-
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
        return `${d} ÷ ${c} - ${a}=${sum}`
        break;
      }
    }

  },

  count:function(a,b,level,minBits1,minBits2,maxBits,maxBits2) {
    var Arr = ['+','-','*','/']
    var n = this.getRandomNum(0,3)
    if(level == 1) n = this.getRandomNum(0,1)
    switch(Arr[n]) {
      case '+':{
        a = this.getRandomNum(minBits2,maxBits2)
        a = this.getRandomNum(minBits2,maxBits2)
        var sum = a + b
        return `${a} + ${b}=${sum}`;
        break;
      }
      case '-':{
        var sum = a + b
        if(sum >maxBits) {
          sum = this.getRandomNum(maxBits/2,maxBits)
          a = this.getRandomNum(minBits1,sum-1)
          b = sum - a
        }
        return `${sum} - ${a}=${b}`
        break;
      }
      case '*':{
        var a = this.getRandomNum(2,minBits1);
        var b = this.getRandomNum(2,minBits2);
        var sum = a*b
        return `${a} × ${b}=${sum}`
        break;
      }
      case '/':{
        var b = this.getRandomNum(2,minBits1);
        var c = this.getRandomNum(2,minBits2);
        a = b*c
        while(a>maxBits) {
          b = this.getRandomNum(2,minBits1);
          c = this.getRandomNum(2,minBits2);
          a = b*c
        }
        var sum = a/b
        return `${a} ÷ ${b}=${sum}`
        break;
      }
    }
  },

  // 一年级随机题
  oneRandomQuestion:function() {
    topicList = []
    resultList = []
    for(var i = 0;i < 50;i++) {
      var minNum, maxNum, minNum2,maxNum2
      switch (stage) {
        case 1:
          minNum = 1;
          minNum2 = 1;
          maxNum = 10;
          maxNum2 = 10
          break;
        case 2:
          minNum = 5;
          minNum2 = 10;
          maxNum = 30;
          maxNum2 = 60
          break;
        case 3:
          minNum = 5;
          minNum2 = 30;
          maxNum = 100;
          maxNum2 = 100
          break;
      }
      var son_a = this.getRandomNum(minNum2,maxNum)
      var par_b = this.getRandomNum(minNum,maxNum)
      var A = this.count(son_a,par_b,1,minNum,minNum2,maxNum,maxNum2);
      i = this.titlePush(A,i)
    }
    // console.log(topicList);
  },

  //题目获取
  titlePush(A,i) {
    let arr = A.split('=')
    if(topicList.indexOf(arr[0]) == -1) {
      topicList.push(arr[0])
      resultList.push(arr[1])   
    } else{
      i--
    }
    return i
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
    wx.showModal({
      title: '提示',
      content: '开始'+className+'测试，50道题全程5分钟，每道题最长12秒，是否立即开始？',
      success (res) {
        if (res.confirm) {
            // this.randomRes(0)
            var topic = topicList[0]
            _this.setData({
              topicItem:topic,
              index:1
            }) 
            _this.nextTopic(1)
            // this.timerFun(1)
            totalTime = 300
            // totalTime = setTimeout(function(){
            //   _this.over()
            // },300000)
        
            _this.setTotal()
        } else if (res.cancel) {
          wx.switchTab({
            url: "../test/test",
          })
        }
      }
    })

  },

  totalFun:function (){
    //要执行的操作
    let _this = this
    time = setTimeout(function(){
      _this.setTotal()
    },1000)
  },

  setTotal() {
    let min = parseInt(totalTime/60)
      let sec = totalTime%60
      if(sec == 0) {
        wx.setNavigationBarTitle({
          title: `总时间剩余${min}分钟`
          })
      }

      if(min == 0 && sec <= 6) {
        wx.setNavigationBarTitle({
        title: `总时间剩余  0${min}:${sec >9?sec:'0'+sec}`
        })
      }
      
      totalTime--
      if(!totalTime) {
        clearInterval(time)
        this.over()
      } else {
        this.totalFun()
      }
  },


  //结束答题
  over() {
    clearTimeout(t)
    clearInterval(time)
    // clearTimeout(totalTime)
    wx.redirectTo({
      url: '../grade/grade?score='+score + '&postId='+postId+ '&stage='+stage+ '&excellent='+excellent,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    
  },


timerFun:function (index){
  //要执行的操作
  let _this = this
  t = setTimeout(function(){
    _this.nextTopic(index)
  },1000)
},

  nextTopic:function (index) {
    this.setData({
      title: index+'/'+'50题'+'  '+"00:"+`${num>=10?num:'0'+num}`
    })
    // wx.setNavigationBarTitle({
    //   title: index+'/'+'50题'+'  '+"00:"+`${num>=10?num:'0'+num}`
    // })

    num--
    this.setData({
      num : num
    })
    if(num == -1) {
      // let _this = this
      clearTimeout(t)
      this.getAnswer(this.data.defaultVal)
      // setTimeout(function(){
     
      // },100)
    } else {
      this.timerFun(index)
    }
  },

  // randomRes:function(i) {
  //   let item = []
  //   let res = {
  //     value: resultList[i],
  //     checked:false
  //   }
  //   item.push(res)
  //   var rand = Number(res.value) + 50
  //   for(var j=0;j<3;j++) {
  //     var it = {
  //       value : Math.round(Math.random()*rand),
  //       checked :false
  //     }
  //     item.push(it)
  //   }
  //   item = item.sort(function() {
  //     return .5 - Math.random();
  //   });
  //   this.setData({
  //     items:item
  //   })
  // },

  //获取答案列表
  getAnswer(value) {
    let index = this.data.index
    const resValue = resultList[index-1]
    let check = {
      trueResult: resValue,
      checkResult:value,
      verdict:resValue==value
    }
    score = check.verdict? score+2:score
    if(answerList.length === index && !answerList[index - 1].checkResult) answerList.pop()
    answerList.length !== index?answerList.push(check):''
    this.setData({
      inputValue:'',
      defaultVal:''
    })
    
    clearTimeout(t)

    //如果在6秒内完题并且正确
    if(num >= 6 && check.verdict) {
      excellent++
    }
    
    //答完50道题
    if(index >= 50) {
      this.over()
      return
    }

    num = 12
    index++
    let _this = this
    // wx.setNavigationBarTitle({
    //   title: "倒计时 00:0"+ 6
    // })
    // this.randomRes(index-1)
    var topic = topicList[index - 1]
    this.setData({
      topicItem:topic,
      index:index
    })
    // this.nextTopic(index)
    this.nextTopic(index)
  },

  // //随机选项点击，弃
  // radioChange(e) {
  //   const items = this.data.items
    
  //   for (let i = 0, len = items.length; i < len; ++i) {
  //     items[i].checked = items[i].value === e.detail.value
  //   }
  //   this.getAnswer(e.detail.value)
  // },


  //按键输入
  onButton(e) {
    let value  = e.target.dataset.number
    if(value ==undefined) return
    let defaultVal = this.data.defaultVal
    var numList = ['0','1','2','3','4','5','6','7','8','9','.','/']
    if(numList.indexOf(value) !== -1) {
      this.setData({
        defaultVal: `${defaultVal}${value}`
      })
    }  

    if(value == 'x') {
      this.setData({
        defaultVal: defaultVal.substr(0,defaultVal.length-1)
      })
    }

    if(value == 'next') {
      this.getAnswer(this.data.defaultVal)
    }
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
    clearTimeout(t)
    clearInterval(time)
    // clearTimeout(totalTime)
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