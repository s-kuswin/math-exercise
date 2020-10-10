let num = 12 //计时几秒
let t ='' //延时器
let topicList = [] //问题列表
let resultList = [] //答案列表
let answerList = [] //回答的结果列表
let excellent = 0 //在6秒内打完题的
let score = 0 //分数
let stage = 1 //阶段
let postId  //年级id
let totalTime = 300000  //全程总时间
let time //总时间延时器
let className = '一年级'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topicItem:'',
    index:1,
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
    //1为初级阶段，2为中级阶段，3为高级阶段
    //初级到中级60分以上10次，中级到高级60分以上50次
    switch(postId) {
      case '0':{
        className = '一年级'
        let onePassGrade = wx.getStorageSync('onePassGrade') || 0
        stage = 1
        if(onePassGrade) {
          stage = onePassGrade >= 50 ? 3 : onePassGrade >= 10 ? 2 : 1
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
          stage = fourPassGrade > 50 ? 3 : fourPassGrade > 10 ? 2 : 1
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
    for(let i = 0;i < 50;i++) {
      //阶段判断控制
      let minNum1,minNum2,maxNum,several,num
      switch(stage) {
        case 1:{
          minNum1 = 10
          minNum2 = 200
          maxNum = 5000
          num = 1//小数等级，只有简单运算
          several = this.getRandomNum(1,3)
          if(several == 2) several = 1
          break;
        }
        case 2:{ 
          minNum1 = 10
          minNum2 = 1000
          maxNum = 5000
          num = 2
          several = this.getRandomNum(1,3)
          if(several == 1) several = 2
          break;
        }
        case 3:{
          minNum1 = 10
          minNum2 = 1000
          maxNum = 10000
          num = 3
          several = this.getRandomNum(1,3)
          if(several == 1) several = 2
          break;
        }
      }

      let son_a = this.getRandomNum(minNum1,maxNum);
      let par_b = this.getRandomNum(minNum1,maxNum);
      let son_c = this.getRandomNum(minNum1,maxNum);
      let A
      
      switch(several) {
        case 1:{
          A = this.count(son_a,par_b,4,minNum1,minNum2,maxNum)
          break;
        }
        case 2:{
          A = this.twoCount(son_a,par_b,son_c,4,minNum1,minNum2,maxNum);
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
    for(let i = 0;i < 50;i++) {
      let minNum1,minNum2,maxNum,several,num
      
      switch(stage) {
        case 1:{
          minNum1 = 10
          minNum2 = 100
          maxNum = 1000
          num = 1//小数等级，只有简单加减运算
          several = this.getRandomNum(1,3)
          if(several == 2) several = 1
          break;
        }
        case 2:{
          minNum1 = 10
          minNum2 = 100
          maxNum = 1000
          several = this.getRandomNum(1,3)
          if(several == 1) several = 2 //混合运算
          num = 1
          break;
        }
        case 3:{
          minNum1 = 10
          minNum2 = 100
          maxNum = 2000
          several = this.getRandomNum(1,3)
          if(several == 1) several = 2
          num = 1
          break;
        }
      }

      let son_a = this.getRandomNum(minNum1,maxNum);
      let par_b = this.getRandomNum(minNum1,maxNum);
      let son_c = this.getRandomNum(minNum1,maxNum);
      let A

      switch(several) {
        case 1:{
          //一位运算
          A = this.count(son_a,par_b,3,minNum1,minNum2,maxNum);
          break;
        }
        case 2:{
          //混合运算
          A = this.twoCount(son_a,par_b,son_c,3,minNum1,minNum2,maxNum);
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
    let minNum1,minNum2,maxNum,several
    switch(stage) {
      case 1:{
        minNum1 = 10;
        minNum2 = 10;
        maxNum = 100;
        several = 1;
        break;
      }
      case 2:{
        minNum1 = 10;
        minNum2 = 10;
        maxNum = 100;
        several = 2;
        break;
      }
      case 3:{
        minNum1 = 10;
        minNum2 = 100;
        maxNum = 500;
        several = 1;
        break;
      }
    }
    for(let i = 0;i < 50;i++) {      
      let son_a = this.getRandomNum(minNum1,maxNum);
      let par_b = this.getRandomNum(minNum1,maxNum);
      let son_c = this.getRandomNum(minNum1,maxNum);
      let A
      switch(several) {
        case 1:{
          A = this.count(son_a,par_b,2,minNum1,minNum2,maxNum);
          break;
        }
        case 2:{
          A = this.twoCount(son_a,par_b,son_c,2,minNum1,minNum2,maxNum);
          break;
        }
      }      
      i = this.titlePush(A,i)
    }
    console.log(topicList,resultList);
  },

  // 一年级随机题(完成)
  oneRandomQuestion:function() {
    topicList = []
    resultList = []
    let minNum, maxNum, minNum2, maxNum2
    switch (stage) {
      case 1:
        minNum = 1;
        minNum2 = 1;
        maxNum = 10;
        maxNum2 = 10;
        break;
      case 2:
        minNum = 5;
        minNum2 = 10;
        maxNum = 30;
        maxNum2 = 60;
        break;
      case 3:
        minNum = 5;
        minNum2 = 30;
        maxNum = 100;
        maxNum2 = 100;
        break;
    }
    for(let i = 0;i < 50;i++) {
      let son_a = this.getRandomNum(minNum2,maxNum)
      let par_b = this.getRandomNum(minNum,maxNum)
      let A = this.count(son_a,par_b,1,minNum,minNum2,maxNum,maxNum2);
      i = this.titlePush(A,i)
    }
    console.log(topicList);
  },

  //小数运算
  decimalCount:function(level) {
    let Arr = ['+','-','*','+-','++','--']
    let shifting = [10,100,1000]
    let m = this.getRandomNum(0,2)
    var a,b,n,sum
    a = this.getRandomNum(1,100)
    sum = 0
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
        let c = this.getRandomNum(1,a+b);
        sum = a+b-c;
        return `${a/shifting[m]} + ${b/shifting[m]} - ${c/shifting[m]}=${sum/shifting[m]}`;
        break;
      }
      case '++':{
        b = this.getRandomNum(1,100);
        let c = this.getRandomNum(1,100);
        sum = a+b+c;
        return `${a/shifting[m]} + ${b/shifting[m]} + ${c/shifting[m]}=${sum/shifting[m]}`;
        break;
      }
      case '--':{
        if(a == 1) {
          b = this.getRandomNum(2,100);
        }
        b = this.getRandomNum(1,a-1);
        let c = this.getRandomNum(1,a-b);
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
    let a = this.getRandomNum(2,10)
    let b = this.getRandomNum(1,a-1)
    let c = this.getRandomNum(1,a-b)
    let Arr = ['+','-']
    let n = this.getRandomNum(0,1)
    switch(Arr[n]) {
      case '+':{
        let sum = b+c
        return sum == a? `${b}/${a} + ${c}/${a}=1` : `${b}/${a} + ${c}/${a}=${sum}/${a}`
        break;
      }
      case '-':{
        if(b<c) {
          let d = c
          c = b
          b = d
        }
        let sum = b-c
        return sum?`${b}/${a} - ${c}/${a}=${sum}/${a}`:`${b}/${a} - ${c}/${a}=0`
        break;
      }
    }
  },

  //混合运算
  twoCount:function(a,b,c,level,minBits,minBits2,maxBits) {
    let Arr = ['++','+-','+*','+/','--','-*','-/','-+','*+','*-','/+','/-','/*','//','**']

    let n = this.getRandomNum(0,Arr.length-1)
    if(level == 2) {
      n = this.getRandomNum(0,11)
    }
    switch(Arr[n]) {
      //++
      case '++':{
        let sum = a+b+c
        while(a+b > maxBits) {
          a = this.getRandomNum(minBits,maxBits - 1 - minBits);
          b = this.getRandomNum(minBits,maxBits - a);
          sum = a+b+c
        }
        return `${a} + ${b} + ${c}=${sum}`
        break;
      }
       //+-
      case '+-':{
        let sum = a+b-c
        if(sum<0) {
          //结果不为负数
          c = this.getRandomNum(2,a+b);
          sum=a+b-c;
        }
        return `${a} + ${b} - ${c}=${sum}`
        break;
      }
       //+*
      case '+*':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c
        while(d>maxBits) {
          //不超过最大范围
          b = this.getRandomNum(min,minBits);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        let sum = a+ (b*c)
        return `${a} + ${b} × ${c}=${sum}`
        break;
      }
      // +/
      case '+/':{
        //其中乘法的一个因数在minBits2/2 ~ minBits之间
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        let sum = a+ (d/c)
        return `${a} + ${d} ÷ ${c}=${sum}`
        break;
      }
      // --
      case '--':{
        console.log(maxBits);
        b = this.getRandomNum(minBits,maxBits - 2 - minBits);
        c = this.getRandomNum(minBits,maxBits - 1 - b);
        let sum = a-b-c
        while(sum<0) {
          a = this.getRandomNum(c+b,maxBits);
          sum=a-b-c;
        }
        return `${a} - ${b} - ${c}=${sum}`
        break;
      }
      //   -*
      case '-*':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let sum = a-(b*c)
        let d = b*c
        
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        if(sum<0) {
          a = this.getRandomNum(b*c,maxBits);
          sum=a-(b*c);
        }
        return `${a} - ${b} × ${c}=${sum}`
        break;
      }
      // -/
      case '-/':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        let sum = a-(d/c)
 
        if(sum<0) {
          a = this.getRandomNum(d/c,maxBits);
          sum=a-(d/c);
        }
        return `${a} - ${d} ÷ ${c}=${sum}`
        break;
      }
      //-+
      case '-+':{
        let sum = a-c+b
        if(sum<0) {
          c = this.getRandomNum(2,a+b);
          sum=a-c+b;
        }
        return `${a} - ${c} + ${b}=${sum}`;
        break;
      }
      //*+
      case '*+':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        let sum = (b*c) + a
        return `${b} × ${c} + ${a}=${sum}`
        break;
      }
      // *-
      case '*-':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        let sum = (b*c) - a
        if(sum<0) {
          a = this.getRandomNum(1,b*c);
          sum = (b*c) - a;
        }        
        return `${b} × ${c} - ${a}=${sum}`
        break;
      }
      //   /+
      case '/+':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        let sum = (d/c) + a
        return `${d} ÷ ${c} + ${a}=${sum}`
      }
      // /-
      case '/-':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        
        let d = b*c
        
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          // c = this.getRandomNum(2,minBits);
          d = b*c
        }
        let sum = (d/c) - a
        if(sum<0) {
          a = this.getRandomNum(1,d/c);
          sum=(d/c) - a;
        }
        return `${d} ÷ ${c} - ${a}=${sum}`
        break;
      }
      // /*
      case '/*':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        a = this.getRandomNum(2,minBits);
        let sum = (d/c) * a
        return `${d} ÷ ${c} × ${a}=${sum}`
      }

      // //
      case '//':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        let a = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c*a
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          a = this.getRandomNum(2,minBits);
          d = b*c*a
        }
        let sum = d/c/a
        return `${d} ÷ ${c} ÷ ${a}=${sum}`
      }
      // **
      case '**':{
        let min = minBits == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let c = this.getRandomNum(2,minBits);
        c = this.multiple(c,level)
        let d = b*c
        while(d>maxBits) {
          b = this.getRandomNum(min,minBits2);
          c = this.getRandomNum(2,minBits);
          c = this.multiple(c,level)
          d = b*c
        }
        a = this.getRandomNum(2,minBits);
        let sum = d * a
      
        return `${b} × ${c} × ${a}=${sum}`
        break;
      }
    }

  },

  //乘法倍数添加三年级和四年级
  multiple(num,level) {
    if(level >= 3) {
      //倍数
      let list = [1,10]
      let r = this.getRandomNum(0,1);
      num = num*list[r]
    }

    return num 
  },

  //简单运算
  count:function(a,b,level,minBits1,minBits2,maxBits) {
    let Arr = ['+','-','*','/']
    let n = this.getRandomNum(0,3)
    if(level == 1) n = this.getRandomNum(0,1)
    switch(Arr[n]) {
      case '+':{
        a = this.getRandomNum(minBits2,maxBits)
        b = this.getRandomNum(minBits1,maxBits)
        let sum = a + b
        return `${a} + ${b}=${sum}`;
        break;
      }
      case '-':{
        let  sum = this.getRandomNum(maxBits/2,maxBits)
        a = this.getRandomNum(minBits1,sum-1)
        b = sum - a
        return `${sum} - ${a}=${b}`
        break;
      }
      case '*':{
        let a = this.getRandomNum(2,minBits1);
        let min = minBits1 == minBits2 ? 2 : minBits2/2
        let b = this.getRandomNum(min,minBits2);
        let sum = a*b
        
        a = this.multiple(a,level)
        return `${b} × ${a}=${sum}`
        break;
      }
      case '/':{
        let b = this.getRandomNum(2,minBits1);
        let min = minBits1 == minBits2 ? 2 : minBits2/2
        let c = this.getRandomNum(min,minBits2);
        a = b*c
        while(a>maxBits) {
          b = this.getRandomNum(2,minBits1);
          c = this.getRandomNum(min,minBits2);
          a = b*c
        }
        c = a/b
        return `${a} ÷ ${b}=${c}`
        break;
      }
    }
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
    let range = max - min    
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
            let topic = topicList[0]
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

  //开始总时间计算
  totalFun:function (){
    let _this = this
    time = setTimeout(function(){
      _this.setTotal()
    },1000)
  },

  //更换标题头 时间结束
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
      //时间结束
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
    /**
     * score  分数  
     * postId 几年级 
     * stage 阶段 
     * excellent 优秀答题数
    */    
    wx.redirectTo({
      url: '../grade/grade?score='+score + '&postId='+postId+ '&stage='+stage+ '&excellent='+excellent,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    
  },

   //单个题时间计算
  timerFun:function (index){
    let _this = this
    t = setTimeout(function(){
      _this.nextTopic(index)
    },1000)
  },

  /**
   * 切换下一题
   */
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
      //倒计时结束
      clearTimeout(t)
      this.getAnswer(this.data.defaultVal)
    } else {
      //倒计时尚未结束
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
  //   let rand = Number(res.value) + 50
  //   for(let j=0;j<3;j++) {
  //     let it = {
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

  /**
   * 收集答案列表
   */
  getAnswer(value) {
    let index = this.data.index
    const resValue = resultList[index-1]
    let check = {
      trueResult: resValue,
      checkResult:value,
      verdict:resValue==value
    }
    // 分数收集
    score = check.verdict? score+2:score

    //防止在点击确定和自动切换下一题同时都生效获取答案，以有答案的为准
    if(answerList.length === index && !answerList[index - 1].checkResult) answerList.pop()
    answerList.length !== index?answerList.push(check):''

    //清空输入的答案框
    this.setData({
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
    // this.randomRes(index-1)
    let topic = topicList[index - 1]
    this.setData({
      topicItem:topic,
      index:index
    })
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
    let numList = ['0','1','2','3','4','5','6','7','8','9','.','/']
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