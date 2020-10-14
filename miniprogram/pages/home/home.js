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
import { oneRandomQuestion } from '../../utils/one';
import { twoRandomQuestion } from '../../utils/two';
import { threeRandomQuestion } from '../../utils/three';
import { fourRandomQuestion } from '../../utils/four';

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
    //初级到中级90分以上1次，中级到高级90分以上2次
    switch(postId) {
      case '0':{
        className = '一年级'
        let onePassGrade = wx.getStorageSync('onePassGrade') || 0
        stage = 1
        if(onePassGrade) {
          stage = onePassGrade >= 2 ? 3 : onePassGrade >= 1 ? 2 : 1
        }
        [ topicList, resultList ] = oneRandomQuestion(stage)
        console.log(topicList, resultList);
        
        break;
      }
      case '1':{
        className = '二年级'
        let twoPassGrade = wx.getStorageSync('twoPassGrade')
        stage = 1
        if(twoPassGrade) {
          stage = twoPassGrade >= 2 ? 3 : twoPassGrade >= 1 ? 2 : 1
        }
        [ topicList, resultList ] = twoRandomQuestion(stage)
        break;
      }
      case '2': {
        className = '三年级'
        let threePassGrade = wx.getStorageSync('threePassGrade')
        stage = 1
        if(threePassGrade) {
          stage = threePassGrade >= 2 ? 3 : threePassGrade >= 1 ? 2 : 1
        }
        [ topicList, resultList ] = threeRandomQuestion(stage)
        break;
      }
      case '3': {
        className = '四年级'
        let fourPassGrade = wx.getStorageSync('fourPassGrade')
        stage = 1
        if(fourPassGrade) {
          stage = fourPassGrade >= 2 ? 3 : fourPassGrade >= 1 ? 2 : 1
        }
        [ topicList, resultList ] = fourRandomQuestion(stage)
        break;
      }
    }
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