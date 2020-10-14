  //二年级随机题
  import { count, twoCount, titlePush } from './count'

  var topicList = []
  var resultList = []
  export function twoRandomQuestion (stage) {
    topicList = []
    resultList = []
    let minNum1,minNum2,maxNum,several,multiple,A
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
        minNum2 = 10;
        maxNum = 100;
        several = 2;
        multiple = 10
        break;
      }
    }
    for(let i = 0;i < 50;i++) {      
      switch(several) {
        case 1:{
          A = count(2,minNum1,minNum2,maxNum,multiple);
          break;
        }
        case 2:{
          A = twoCount(2,minNum1,minNum2,maxNum,multiple);
          break;
        }
      }      
      [i,topicList,resultList] = titlePush(A,i,topicList,resultList)
    }
    console.log(topicList,resultList);
    return [topicList,resultList]
  }
