  // 一年级随机题(完成)
  var topicList = []
  var resultList = []
  export function oneRandomQuestion(stage) {
    topicList = []
    resultList = []
    let minNum, maxNum, minNum2, maxNum2, A
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
      A = count(son_a,par_b,1,minNum,minNum2,maxNum,maxNum2);
      i = titlePush(A,i)
    }
    return [topicList,resultList]
  }

  //简单运算
  function count(minBits1,minBits2,maxBits) {
    let a,b,sum
    let Arr = ['+','-']
    let n = getRandomNum(0,1)
    switch(Arr[n]) {
      case '+':{
        a = getRandomNum(minBits2,maxBits)
        b = getRandomNum(minBits1,maxBits)
        sum = a + b
        return `${a} + ${b}=${sum}`;
        break;
      }
      case '-':{
        sum = getRandomNum(maxBits/2,maxBits)
        a = getRandomNum(minBits1,sum-1)
        b = sum - a
        return `${sum} - ${a}=${b}`
        break;
      }
    }
  }

  //题目获取
  function titlePush(A,i) {
    let arr = A.split('=')
    if(topicList.indexOf(arr[0]) == -1) {
      topicList.push(arr[0])
      resultList.push(arr[1])   
    } else{
      i--
    }
    return i
  }

  //获取随机数
  function getRandomNum(min,max) {
    let range = max - min    
    return (min + Math.round(Math.random() * range))
  }