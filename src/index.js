/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
 function forEach(array, fn) {
     for (var i = 0; i < array.length; i++) {
         fn(array[i], i, array);

         console.log(i, array[i], array);
     }
 }
 var array = ["a", "b", "c", "d"];
 const fn = (item, i, array) => {
   return item + 1;
 }
 forEach(array, fn);
/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
 function map(array, fn) {
     var array2 = [];
     for (let i = 0; i < array.length; i++) {
         array2[i] = fn(array[i], i, array);
     }
     console.log(array2);
     return array2;
 }
 var array = ["a", "b", "c", "d"];
 const fn = function(item, i, array2) {
     return item;
 }
 map(array, fn);
 console.log(array);

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
 function reduce(array, fn, initial) {
   let i = 0;
   let result = initial || array[i++];

   while (i < array.length) {
     result = fn(result, array[i], i, array);
     i++;
   }
   console.log(result);
   return result;
 }
 var array = ["a", "b", "c", "d"];

 const fn = function(result, array[i], i, array) {
   return previousValue;
 }

 reduce(array, fn, initial)


/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
 function upperProps(obj) {
   var arr = [];
   for (var item in obj) {
     item = item.toUpperCase();
     arr.push(item);
   }
   console.log(arr);
   return arr;
 }
 var obj = {
   name: 'man',
   eyesColor: 'brown',
   hairColor: 'black'
 };
 upperProps(obj)
/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
