  // 四年级随机题
  import { getRandomNum, count, twoCount, decimalCount, titlePush } from './count';
  var topicList = []
  var resultList = []
 export function fourRandomQuestion(stage) {
    topicList = []
    resultList = []
    for(let i = 0;i < 50;i++) {
      //阶段判断控制
      let modMin,modMax,mulMin,mulMax,max,num,A,
      several = getRandomNum(1,3),
      multiple
      switch(stage) {
        case 1:{
          modMin = 300
          modMax = 1000
          mulMin = 50
          mulMax = 100
          max = 1000
          num = 2//小数等级，简单运算和乘法运算
          several = several == 2 ? 1 : several
          break;
        }
        case 2:{ 
          modMin = 300
          modMax = 1000
          mulMin = 50
          mulMax = 100
          max = 3000
          num = 3
          several = several == 1 ? 2 : several
          break;
        }
        case 3:{
          modMin = 500
          modMax = 2000
          mulMin = 120
          mulMax = 200
          max = 6000
          num = 4
          several = several == 1 ? 2 : several
          break;
        }
      }
      
      switch(several) {
        case 1:{
          A = count(4,modMin,modMax,mulMin,mulMax,multiple,max)
          break;
        }
        case 2:{
          A = twoCount(4,modMin,modMax,mulMin,mulMax,max,multiple);
          break;
        }
        case 3:{
          //含有小数
          A = decimalCount(num)
          break;
        }
        case 4:{
          //含有分数
          A = fractionCount()
          break;
        }
      }     
      console.log(A);
      
      [i,topicList,resultList] = titlePush(A,i,topicList,resultList)
    }
    console.log(topicList,resultList);
    return [topicList,resultList]
  }
