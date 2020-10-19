  //二年级随机题
  import { count, twoCount, titlePush } from './count'

  var topicList = []
  var resultList = []
  export function twoRandomQuestion (stage) {
    topicList = []
    resultList = []
    let modMin,modMax,mulMin,mulMax,max,multiple,several,A,level
    switch(stage) {
      case 1:{
        modMin = 30
        modMax = 100
        mulMin = 2
        mulMax = 10
        max = 150
        several = 1;
        level = 1
        break;
      }
      case 2:{
        modMin = 30
        modMax = 100
        mulMin = 2
        mulMax = 10
        max = 200
        several = 1;
        level = 2
        break;
      }
      case 3:{
        modMin = 30
        modMax = 100
        mulMin = 2
        mulMax = 10
        max = 200
        several = 2;
        level = 2
        break;
      }
    }
    for(let i = 0;i < 50;i++) {      
      switch(several) {
        case 1:{
          A = count(level,modMin,modMax,mulMin,mulMax,multiple,max);
          break;
        }
        case 2:{
          A = twoCount(2,modMin,modMax,mulMin,mulMax,max,multiple);
          break;
        }
      }      
      console.log(A);
      [i,topicList,resultList] = titlePush(A,i,topicList,resultList)
    }
    console.log(topicList,resultList);
    return [topicList,resultList]
  }
