  // 一年级随机题(完成)
  import { getRandomNum, titlePush } from './count'
  var topicList = []
  var resultList = []
  export function oneRandomQuestion(stage) {
    topicList = []
    resultList = []
    let minNum, maxNum, minNum2, A, max
    switch (stage) {
      case 1:
        minNum = 1;
        maxNum = 10;
        max = 10;
        break;
      case 2:
        minNum = 5;
        maxNum = 30;
        max = 30
        break;
      case 3:
        minNum = 30;
        maxNum = 100;
        max = 100
        break;
    }
    for(let i = 0;i < 50;i++) {
      A = count(minNum,maxNum,max);
      [i,topicList,resultList] = titlePush(A,i,topicList,resultList)
    }
    return [topicList,resultList]
  }

  //简单运算
  function count(minBits,maxBits,max) {
    let a,b,sum
    let Arr = ['+','-']
    let n = getRandomNum(0,1)
    switch(Arr[n]) {
      case '+':{
        while (!sum || sum > max) {
          a = getRandomNum(minBits,maxBits)
          b = getRandomNum(minBits,maxBits)
          sum = a + b
        }
       
        return `${a} + ${b}=${sum}`;
        break;
      }
      case '-':{
        sum = getRandomNum(parseInt(maxBits/2),maxBits)
        a = getRandomNum(minBits,sum)
        b = sum - a
        return `${sum} - ${a}=${b}`
        break;
      }
    }
  }