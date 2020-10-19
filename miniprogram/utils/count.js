  //简单运算
  // export function count(level,mulMin,mulMax,maxBits,multiple) {
  export function count(level,modMin,modMax,mulMin,mulMax,multiple,max) {
    let Arr = ['+','-','*','/']
    let n = level == 1?getRandomNum(0,1) : getRandomNum(0,3)
    let a,b,sum
    switch(Arr[n]) {
      case '+':{
        while(!sum || sum>max) {
          a = getRandomNum(modMin,modMax)
          b = getRandomNum(modMin,modMax)
          a = addMultiple(a,multiple)
          b = addMultiple(b,multiple)
          sum = a + b
        }
        
        return `${a} + ${b}=${sum}`;
        break;
      }
      case '-':{
        while(!sum || sum>max || b<modMin) {
          sum = getRandomNum(modMax/2,modMax)
          a = getRandomNum(modMin,sum-1)
          b = sum - a
          a = addMultiple(a,multiple)
          b = addMultiple(b,multiple)
          sum = addMultiple(sum,multiple)
        }
        return `${sum} - ${a}=${b}`
        break;
      }
      case '*':{
        while(!sum || sum>max) { 
          a = getRandomNum(2,10);
          b = getRandomNum(mulMin,mulMax);
          sum = a*b
  
          if(mulMax >=100) {
            let N = getRandomNum(0,1)
            if(N == 1) {
              a = getRandomNum(10,15);
              b = getRandomNum(10,15);
            }
          }
          
          a = multipleFun(a,level)
          sum = a*b
        }
        
        return `${b} × ${a}=${sum}`
        break;
      }
      case '/':{
        while(!sum || sum>max) {
          b = getRandomNum(2,10);
          a = getRandomNum(mulMin,mulMax);
          sum = b*a
        }
        
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
  //  export function twoCount(level,minBits,mulMax,maxBits,multiple) {
   export function twoCount(level,modMin,modMax,mulMin,mulMax,max,multiple) {
      let Arr = ['++','+-','+*','+/','--','-*','-/','-+','*+','*-','/+','/*','//','**']
      // ,'/-'
      let a,b,c,n,sum,d,
      minProduct = addMultiple(modMin,multiple),
      maxProduct = mulMax*mulMax*10

      if(level == 2) {
        maxProduct = parseInt(maxProduct/10) 
        n = getRandomNum(0,10)
      } else {
        n = getRandomNum(0,Arr.length-1)
      }
      //乘积最小值限制
      minProduct = minProduct > maxProduct ? modMin : minProduct
      switch(Arr[n]) {
        //++
        case '++':{
          console.log('1');
          a = getRandomNum(modMin,modMax - 1 - modMin);
          b = getRandomNum(modMin,modMax - a);
          c = getRandomNum(modMin,modMax);

          a = addMultiple(a,multiple)
          b = addMultiple(b,multiple)
          c = addMultiple(c,multiple)

          sum = a+b+c
          return `${a} + ${b} + ${c}=${sum}`
          break;
        }
         //+-
        case '+-':{
          while (!sum || sum < modMin) {
            console.log(2);
            a = getRandomNum(modMin,modMax);
            b = getRandomNum(modMin,modMax);
            c = getRandomNum(modMin,a+b > modMax?modMax:a+b);
            
            a = addMultiple(a,multiple)
            b = addMultiple(b,multiple)
            c = addMultiple(c,multiple)
  
            sum = a+b-c
          }
          
          return `${a} + ${b} - ${c}=${sum}`
          break;
        }
         //+*
        case '+*':{
          console.log(3);

          d = 0
          while(!d || d>max || d < minProduct) {
            b = getRandomNum(mulMin,mulMax);
            c = getRandomNum(2,10);
            c = multipleFun(c,level)
            d = b*c
          }

          //双位数相乘
          if(mulMax >=100 && getRandomNum(0,1) == 1) {
            b = getRandomNum(10,15);
            c = getRandomNum(10,15);
          }

          a = getRandomNum(modMin,modMax);
          a = addMultiple(a,multiple)
  
          sum = a+ (b*c)
          return `${a} + ${b} × ${c}=${sum}`
          break;
        }
        // +/
        case '+/':{
          console.log(4);
          d = 0
          while(!d || d>max || d < minProduct) {
            b = getRandomNum(mulMin,mulMax);
            c = getRandomNum(2,10);
            c = multipleFun(c,level)
            d = b*c
          }

          a = getRandomNum(modMin,modMax);
          a = addMultiple(a,multiple)
  
          sum = a+ (d/c)
          return `${a} + ${d} ÷ ${c}=${sum}`
          break;
        }
        // --
        case '--':{
          console.log(5);
          while (!sum || sum < modMin) { 
            b = getRandomNum(modMin,modMax - 2 - modMin);
            c = getRandomNum(modMin,modMax - 1 - b);
            a = getRandomNum(c+b,modMax);
  
            a = addMultiple(a,multiple)
            b = addMultiple(b,multiple)
            c = addMultiple(c,multiple)
  
            sum = a-b-c
          }
     
          return `${a} - ${b} - ${c}=${sum}`
          break;
        }
        //   -*
        case '-*':{
          while(!sum || sum<modMin) {
            console.log(6);
            d = 0
            while(!d || d>max || d < minProduct) {
              b = getRandomNum(mulMin,mulMax);
              c = getRandomNum(2,10);
              c = multipleFun(c,level)
              d = b*c
            }
  
            //双位数相乘
            if(mulMax >=100 && getRandomNum(0,1) == 1) {
              b = getRandomNum(10,15);
              c = getRandomNum(10,15);
              c = multipleFun(c,level)
            }
          
            const a_min = b*c > modMax ? b*c/10<modMin?modMin:parseInt(b*c/10) : b*c 
            a = getRandomNum(a_min ,modMax);
            a = addMultiple(a,multiple);
    
            sum = a-(b*c);
          }
          
          return `${a} - ${b} × ${c}=${sum}`
          break;
        }
        // -/
        case '-/':{
          console.log(7);
          while(!sum || sum < modMin) {
            d = 0
            while(!d || d>max || d < minProduct) {
              b = getRandomNum(mulMin,mulMax);
              c = getRandomNum(2,10);
              c = multipleFun(c,level)
              d = b*c
            }          
  
            a = getRandomNum(d/c < modMin?modMin:d/c,modMax);
            a = addMultiple(a,multiple);
          
            sum = a-(d/c);
          }
          
          return `${a} - ${d} ÷ ${c}=${sum}`
          break;
        }
        //-+
        case '-+':{
          console.log(8);
          while (!sum || sum < modMin) { 
            a = getRandomNum(modMin,modMax);
            b = getRandomNum(modMin,modMax);
            c = getRandomNum(modMin,a+b > modMax?modMax:a+b);
       
            a = addMultiple(a,multiple)
            b = addMultiple(b,multiple)
            c = addMultiple(c,multiple)
  
            sum = a-c+b
          }
          
          return `${a} - ${c} + ${b}=${sum}`;
          break;
        }
        //*+
        case '*+':{
          console.log(9);
          d = 0
          while(!d || d>max || d < minProduct) {
            b = getRandomNum(mulMin,mulMax);
            c = getRandomNum(2,10);
            c = multipleFun(c,level)
            d = b*c
          }

          //双位数相乘
          if(mulMax >=100 && getRandomNum(0,1) == 1) {
            b = getRandomNum(10,15);
            c = getRandomNum(10,15);
            c = multipleFun(c,level)
          }

          a = getRandomNum(modMin,modMax);
          a = addMultiple(a,multiple)
          sum = (b*c) + a
          
          return `${b} × ${c} + ${a}=${sum}`
          break;
        }
        // *-
        case '*-':{
          console.log(10);
          while(!sum || sum < modMin ) {
            d = 0
            while(!d || d>max || d < minProduct) {
              b = getRandomNum(mulMin,mulMax);
              c = getRandomNum(2,10);
              c = multipleFun(c,level)
              d = b*c
            }
            console.log(99999999999);
            
            // //双位数相乘
            // if(mulMax >=100 && getRandomNum(0,1) == 1) {
            //  b = getRandomNum(10,15);
            //  c = getRandomNum(10,15);
            //  d = b*c
            // }
            
            while(!a || a > d) {  
              a = getRandomNum(modMin,d > modMax ? modMax : d);
              a =  minProduct < modMin*10? a : addMultiple(a,multiple)
            }
            sum = (b*c) - a; 
          }
                
          return `${b} × ${c} - ${a}=${sum}`
          break;
        }
        //   /+
        case '/+':{
          console.log(11);

          d = 0
          while(!d || d>max || d < minProduct) {
            b = getRandomNum(mulMin,mulMax);
            c = getRandomNum(2,10);
            c = multipleFun(c,level)
            d = b*c
          }

          a = getRandomNum(modMin,modMax);
          a = addMultiple(a,multiple)

          sum = (d/c) + a
          return `${d} ÷ ${c} + ${a}=${sum}`
        }
        // // /-
        // case '/-':{
        //   console.log(12);
        //   d = 0
        //   b = 0
        //   console.log(d,modMin);
          
        //   while(!d || d>max || b<modMin) {
        //     b = getRandomNum(mulMin,mulMax);
        //     c = getRandomNum(2,10);
        //     c = multipleFun(c,level)
        //     d = b*c
        //   }

        //   a = getRandomNum(modMin,d/c);

        //   sum=(d/c) - a;
        //   return `${d} ÷ ${c} - ${a}=${sum}`
        //   break;
        // }
        // /*
        case '/*':{
          console.log(13);
          d = 0
          while(!d || d>max || d < minProduct) {
            b = getRandomNum(mulMin,mulMax);
            c = getRandomNum(2,10);
            c = multipleFun(c,level)
            d = b*c
          }
  
          a = getRandomNum(2,10);

          sum = (d/c) * a
          return `${d} ÷ ${c} × ${a}=${sum}`
        }
  
        // //
        case '//':{
          console.log(14);
          while(!d || d>max || d < minProduct) {
            b = getRandomNum(mulMin,mulMax);
            c = getRandomNum(2,10);
            c = multipleFun(c,level);
            a = getRandomNum(2,10);
            d = b*c*a
          }
          // b = addMultiple(b,multiple)
          return `${d} ÷ ${c} ÷ ${a}=${b}`
        }
        
        // **
        case '**':{
          console.log(15);

          d = 0
          while(!d || d>max) {
            b = getRandomNum(mulMin,mulMax);
            c = getRandomNum(2,10);
            c = multipleFun(c,level)
            d = b*c
          }

          //双位数相乘
          if(mulMax >=100 && getRandomNum(0,1) == 1) {
           b = getRandomNum(10,15);
           c = getRandomNum(10,15);
          }

          a = getRandomNum(2,10);
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
      // n = getRandomNum(0,2)
      n = 2
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

    
  //题目获取
  export function titlePush(A,i,topicList,resultList) {
     let arr = A.split('=')
     if(topicList.indexOf(arr[0]) == -1) {
       topicList.push(arr[0])
       resultList.push(arr[1])   
     } else{
       i--
     }
     return [i,topicList,resultList]
   }