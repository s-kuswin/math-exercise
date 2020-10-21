  //三年级随机题
  import { getRandomNum, count, twoCount, decimalCount, titlePush } from './count';
  var topicList = []
  var resultList = []
  export function threeRandomQuestion(stage) {
    console.log(stage);
    
    topicList = []
    resultList = []
    for(let i = 0;i < 50;i++) {
      let modMin,modMax,mulMin,mulMax,max,num,A,
      multiple,
      several
      switch(stage) {
        case 1:{
          modMin = 50
          modMax = 180
          mulMin = 10
          mulMax = 30
          max = 250
          num = 1//小数等级，只有简单加减运算
          several = 1
          break;
        }
        case 2:{
          modMin = 100
          modMax = 500
          mulMin = 30
          mulMax = 50
          max = 1500
          several = 1
          num = 1
          break;
        }
        case 3:{
          modMin = 100
          modMax = 500
          mulMin = 30
          mulMax = 50
          max = 1500
          // multiple = 10
          several = getRandomNum(1,3)
          several = 2
          // num = 1
          break;
        }
      }
      console.log(several);
      
      switch(several) {
        case 1:{
          //一位运算
          A = count(3,modMin,modMax,mulMin,mulMax,multiple,max);
          console.log(A);
          
          break;
        }
        case 2:{
          //混合运算
          A = twoCount(3,modMin,modMax,mulMin,mulMax,max,multiple);
          console.log(A);
          
          break;
        }
        case 3:{
          //含有小数
          A = decimalCount(num)
          console.log(A);
          
          break;
        }
        case 4:{
          //含有分数
          A = fractionCount()
          break;
        }
        
      }
      [i,topicList,resultList] = titlePush(A,i,topicList,resultList)
    }

    console.log(topicList,resultList);
    return [topicList,resultList]
  }