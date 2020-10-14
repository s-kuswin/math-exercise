  // 一年级随机题(完成)
  import { getRandomNum, titlePush } from './count'
  var topicList = []
  var resultList = []
  export function oneRandomQuestion(stage) {
    topicList = []
    resultList = []
    let minNum, maxNum, minNum2, A
    switch (stage) {
      case 1:
        minNum = 1;
        maxNum = 10;
        break;
      case 2:
        minNum = 10;
        maxNum = 30;
        break;
      case 3:
        minNum = 30;
        maxNum = 100;
        break;
    }
    for(let i = 0;i < 50;i++) {
      A = count(minNum,maxNum);
      [i,topicList,resultList] = titlePush(A,i,topicList,resultList)
    }
    return [topicList,resultList]
  }

  //简单运算
  function count(minBits,maxBits) {
    let a,b,sum
    let Arr = ['+','-']
    let n = getRandomNum(0,1)
    switch(Arr[n]) {
      case '+':{
        a = getRandomNum(minBits,maxBits)
        b = getRandomNum(minBits,maxBits)
        sum = a + b
        return `${a} + ${b}=${sum}`;
        break;
      }
      case '-':{
        sum = getRandomNum(maxBits/2,maxBits)
        a = getRandomNum(minBits,sum-1)
        b = sum - a
        return `${sum} - ${a}=${b}`
        break;
      }
    }
  }