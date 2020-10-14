  // 四年级随机题
  import { getRandomNum, count, twoCount, decimalCount } from './count';
  var topicList = []
  var resultList = []
 export function fourRandomQuestion(stage) {
    topicList = []
    resultList = []
    for(let i = 0;i < 50;i++) {
      //阶段判断控制
      let minNum1,minNum2,maxNum,num,A,
      several = getRandomNum(1,3),
      multiple = 10
      switch(stage) {
        case 1:{
          minNum1 = 10
          minNum2 = 100
          maxNum = 200
          num = 1//小数等级，只有简单运算
          several = several == 2 ? 1 : several
          break;
        }
        case 2:{ 
          minNum1 = 10
          minNum2 = 120
          maxNum = 240
          num = 2
          several = several == 1 ? 2 : several
          break;
        }
        case 3:{
          minNum1 = 10
          minNum2 = 200
          maxNum = 500
          num = 3
          several = several == 1 ? 2 : several
          break;
        }
      }
      
      switch(several) {
        case 1:{
          A = count(4,minNum1,minNum2,maxNum,multiple)
          break;
        }
        case 2:{
          A = twoCount(4,minNum1,minNum2,maxNum,multiple);
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
      i = titlePush(A,i)
    }
    console.log(topicList,resultList);
    return [topicList,resultList]
  }

  //题目获取
  function titlePush(A,i) {
    console.log(A);
    
    let arr = A.split('=')
    if(topicList.indexOf(arr[0]) == -1) {
      topicList.push(arr[0])
      resultList.push(arr[1])   
    } else{
      i--
    }
    return i
  }