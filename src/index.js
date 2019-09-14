/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
 function returnFirstArgument(x) {
   return x;
 }

 var result1 = returnFirstArgument('Hello world');
 console.log(result1);

/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6
*/

function sumWithDefaults(a, b = 100) {
  /*b = typeof b !== 'undefined' ?  b : 100;*/
  return a + b;
}
var result21 = sumWithDefaults(1, 10);
console.log(result21);

/*
2.1 *: Значение по умолчанию для второго аргумента должно быть равно 100
Пример:
 sumWithDefaults(10) вернет 110
*/

var result22 = sumWithDefaults(10);
console.log(result22);

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */

 function returnFnResult(fn) {
   return fn();
 }
 returnFnResult(() => console.log ('Hello world'));
/*
 returnFnResult(function()  {
   console.log ('Hello world')
 });

 Задание 4:

 Функция должна принимать число и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter(10);

   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */

 function returnCounter(number=0) {
 var count = 0;
   return function F () {
     ++count;
     return number + count;
   }
 }
 var f = returnCounter(10);

 console.log(f());
 console.log(f());
 console.log(f());

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */
function returnArgumentsArray(...a) {
    return a;
}
console.log(returnArgumentsArray(1, 2, 3, 4, 5, 'Hello world'));
/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */
function bindFunction(fn, ...a) {
  fn = fn.bind(null, ...a);
  return fn;
}

export {
    returnFirstArgument,
    sumWithDefaults,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
