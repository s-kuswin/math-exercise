  //简单运算
  export function count(level,minBits1,minBits2,maxBits,multiple) {
    let Arr = ['+','-','*','/']
    let n = getRandomNum(0,3)
    let min = minBits1 == minBits2 ? 2 : minBits2/2
    let a,b,sum
    switch(Arr[n]) {
      case '+':{
        a = getRandomNum(minBits2,maxBits)
        b = getRandomNum(minBits1,maxBits)
        a = addMultiple(a,multiple)
        b = addMultiple(b,multiple)
        sum = a + b
        return `${a} + ${b}=${sum}`;
        break;
      }
      case '-':{
        sum = getRandomNum(maxBits/2,maxBits)
        a = getRandomNum(minBits1,sum-1)
        b = sum - a
        a = addMultiple(a,multiple)
        b = addMultiple(b,multiple)
        sum = addMultiple(sum,multiple)
        return `${sum} - ${a}=${b}`
        break;
      }
      case '*':{
        a = getRandomNum(2,minBits1);
        b = getRandomNum(min,minBits2);
        sum = a*b

        if(minBits2 >=100) {
          let N = getRandomNum(0,1)
          if(N == 1) {
            a = getRandomNum(10,15);
            b = getRandomNum(10,15);
          }
        }
        
        a = multipleFun(a,level)
        sum = a*b
        return `${b} × ${a}=${sum}`
        break;
      }
      case '/':{
        b = getRandomNum(2,minBits1);
        a = getRandomNum(min,minBits2);
        sum = b*a
        return `${sum} ÷ ${b}=${a}`
        break;
      }
    }
  }

    //获取随机数
  export function getRandomNum(min,max) {
    let range = max - min    
    return (min + Math.round(Math.random() * range))
  }

    //加减法倍数
  function addMultiple(e,mul) {
    return mul?e*mul:e
  }

    //乘法倍数添加三年级和四年级
  function multipleFun(num,level) {
    if(level >= 3) {
      //倍数
      let list = [1,10]
      let r = getRandomNum(0,1);
      num = num*list[r]
    }
    return num 
  }


    //混合运算
   export function twoCount(level,minBits,minBits2,maxBits,multiple) {
      let Arr = ['++','+-','+*','+/','--','-*','-/','-+','*+','*-','/+','/-','/*','//','**']
      let max = addMultiple(maxBits,multiple)
      
      let min = minBits == minBits2 ? 2 : minBits2/2
      let a,b,c,n,sum,d

      if(level == 2) {
        n = getRandomNum(0,11)
      } else {
        n = getRandomNum(0,Arr.length-1)
      }
      switch(Arr[n]) {
        //++
        case '++':{
          console.log('++');
          a = getRandomNum(minBits,maxBits - 1 - minBits);
          b = getRandomNum(minBits,maxBits - a);
          c = getRandomNum(minBits,maxBits);

          a = addMultiple(a,multiple)
          b = addMultiple(b,multiple)
          c = addMultiple(c,multiple)

          sum = a+b+c
          return `${a} + ${b} + ${c}=${sum}`
          break;
        }
         //+-
        case '+-':{
          console.log('+-');
          a = getRandomNum(minBits,maxBits);
          b = getRandomNum(minBits,maxBits);
          c = getRandomNum(2,a+b);
          
          a = addMultiple(a,multiple)
          b = addMultiple(b,multiple)
          c = addMultiple(c,multiple)

          sum = a+b-c
          return `${a} + ${b} - ${c}=${sum}`
          break;
        }
         //+*
        case '+*':{
          console.log(3);

          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          //双位数相乘
          if(minBits2 >=100 && getRandomNum(0,1) == 1) {
            b = getRandomNum(10,15);
            c = getRandomNum(10,15);
          }

          a = getRandomNum(minBits,maxBits);
          a = addMultiple(a,multiple)
  
          sum = a+ (b*c)
          return `${a} + ${b} × ${c}=${sum}`
          break;
        }
        // +/
        case '+/':{
          console.log(4);
          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          a = getRandomNum(minBits,maxBits);
          a = addMultiple(a,multiple)
  
          sum = a+ (d/c)
          return `${a} + ${d} ÷ ${c}=${sum}`
          break;
        }
        // --
        case '--':{
          console.log(5);

          b = getRandomNum(minBits,maxBits - 2 - minBits);
          c = getRandomNum(minBits,maxBits - 1 - b);
          a = getRandomNum(c+b,maxBits);
          
    
          a = addMultiple(a,multiple)
          b = addMultiple(b,multiple)
          c = addMultiple(c,multiple)

          sum = a-b-c
          return `${a} - ${b} - ${c}=${sum}`
          break;
        }
        //   -*
        case '-*':{
          console.log(6);
          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          //双位数相乘
          if(minBits2 >=100 && getRandomNum(0,1) == 1) {
            b = getRandomNum(10,15);
            c = getRandomNum(10,15);
          }

          a = getRandomNum(b*c,maxBits);
          a = addMultiple(a,multiple);
  
          sum = a-(b*c);
          return `${a} - ${b} × ${c}=${sum}`
          break;
        }
        // -/
        case '-/':{
          console.log(7);
          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          a = getRandomNum(d/c,maxBits);
          a = addMultiple(a,multiple);
        
          sum = a-(d/c);
          return `${a} - ${d} ÷ ${c}=${sum}`
          break;
        }
        //-+
        case '-+':{
          console.log(8);
          a = getRandomNum(minBits,maxBits);
          b = getRandomNum(minBits,maxBits);
          c = getRandomNum(2,a+b);
     
          a = addMultiple(a,multiple)
          b = addMultiple(b,multiple)
          c = addMultiple(c,multiple)

          sum = a-c+b
          return `${a} - ${c} + ${b}=${sum}`;
          break;
        }
        //*+
        case '*+':{
          console.log(9);
          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          //双位数相乘
          if(minBits2 >=100 && getRandomNum(0,1) == 1) {
            b = getRandomNum(10,15);
            c = getRandomNum(10,15);
          }

          a = getRandomNum(minBits,maxBits);
          a = addMultiple(a,multiple)
          sum = (b*c) + a
          
          return `${b} × ${c} + ${a}=${sum}`
          break;
        }
        // *-
        case '*-':{
          console.log(10);

          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          //双位数相乘
          if(minBits2 >=100 && getRandomNum(0,1) == 1) {
           b = getRandomNum(10,15);
           c = getRandomNum(10,15);
          }

          a = getRandomNum(1,b*c);

          sum = (b*c) - a;       
          return `${b} × ${c} - ${a}=${sum}`
          break;
        }
        //   /+
        case '/+':{
          console.log(11);

          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          a = getRandomNum(minBits,maxBits);
          a = addMultiple(a,multiple)

          sum = (d/c) + a
          return `${d} ÷ ${c} + ${a}=${sum}`
        }
        // /-
        case '/-':{
          console.log(12);
          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          a = getRandomNum(1,d/c);

          sum=(d/c) - a;
          return `${d} ÷ ${c} - ${a}=${sum}`
          break;
        }
        // /*
        case '/*':{
          console.log(13);
          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }
  
          a = getRandomNum(2,minBits);
          sum = (d/c) * a
          return `${d} ÷ ${c} × ${a}=${sum}`
        }
  
        // //
        case '//':{
          console.log(14);
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          a = getRandomNum(2,minBits);
          sum = b*c*a
          return `${sum} ÷ ${c} ÷ ${a}=${b}`
        }
        
        // **
        case '**':{
          console.log(15);

          d = 0
          while(!d || d>max) {
            b = getRandomNum(min,minBits2);
            c = getRandomNum(2,minBits);
            c = multipleFun(c,level)
            d = b*c
          }

          //双位数相乘
          if(minBits2 >=100 && getRandomNum(0,1) == 1) {
           b = getRandomNum(10,15);
           c = getRandomNum(10,15);
          }

          a = getRandomNum(2,minBits);
          sum = b * c * a
        
          return `${b} × ${c} × ${a}=${sum}`
          break;
        }
      }
  
    }
    
     //小数运算
    export function decimalCount(level) {
    let Arr = ['+','-','*','+-','++','--']
    let shifting = [10,100,1000]
    let m = getRandomNum(0,2)
    var a,b,n,sum
    a = getRandomNum(1,100)
    sum = 0
    if(level == 1)  {
      n = getRandomNum(0,1)
    }

    if(level == 2)  {
      n = getRandomNum(0,2)
    }

    if(level ==3) {
      n = getRandomNum(3,4)
    }    
    
    switch(Arr[n]){
      case '+':{
        b = getRandomNum(1,100);
        sum = a+b;
        return `${a/shifting[m]} + ${b/shifting[m]}=${sum/shifting[m]}`;
        break;
      }
      case '-':{
        b = getRandomNum(1,a);
        sum = a-b;
        return `${a/shifting[m]} - ${b/shifting[m]}=${sum/shifting[m]}`;
        break;
      }
      case '+-':{
        b = getRandomNum(1,100-a);
        let c = getRandomNum(1,a+b);
        sum = a+b-c;
        return `${a/shifting[m]} + ${b/shifting[m]} - ${c/shifting[m]}=${sum/shifting[m]}`;
        break;
      }
      case '++':{
        b = getRandomNum(1,100);
        let c = getRandomNum(1,100);
        sum = a+b+c;
        return `${a/shifting[m]} + ${b/shifting[m]} + ${c/shifting[m]}=${sum/shifting[m]}`;
        break;
      }
      case '--':{
        if(a == 1) {
          b = getRandomNum(2,100);
        }
        b = getRandomNum(1,a-1);
        let c = getRandomNum(1,a-b);
        sum = a-b-c;
        return `${a/shifting[m]} - ${b/shifting[m]} - ${c/shifting[m]}=${sum/shifting[m]}`;
        break;
      }
      case '*':{
        return `${a/shifting[m]} × ${shifting[m]}=${a}`;
        break;
      }
    }
  }

    // 分数运算
    export function fractionCount() {
      let a = getRandomNum(2,10)
      let b = getRandomNum(1,a-1)
      let c = getRandomNum(1,a-b)
      let Arr = ['+','-']
      let n = getRandomNum(0,1)
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
    }