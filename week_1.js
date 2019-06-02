/** 
 * Реализовать такие методы работы над массивами
 */

/**
 * метод создает новый массив элементов, состоящий из элементов массива array за вычетом элементов массива itemsToExclude
 */
 function difference(arr, itemsToExclude) {
   return arr.filter(num => !itemsToExclude.some(exc => num === exc));
 }

difference([2, 1, 5], [2, 3]) 
// => [1, 5]

/**
 * метод принимает массив обьектов array и ключ value по которому нужно эти обьекты сгруппировать
 */
function groupBy(array, value) {
  const grouped = {};

  array.forEach(child => {
    const groupKey = child[value];

    if (!grouped[groupKey]) grouped[groupKey] = []; // кля каждого первого уникального значения поля, по которому группируем, создаём массив

    grouped[groupKey].push(child);
  })

  return grouped;
}

groupBy([{ gender: 'male', name: 'Max'}, { gender: 'male', name: 'Fred'}, { gender: 'female', name: 'Jane'}], 'gender'); 
/**
 * => {
 *  male: [{ gender: 'male', name: 'Max'}, { gender: 'male', name: 'Fred'}],
 *  female: [{ gender: 'female', name: 'Jane'}]
 * }
 */

/**
 *  если метод принимет многомерный массив, он должен "сплюснуть" его на одно измерение 
 */
function flatten(array) {
  return [].concat(...array);

/* 
  // Альтернативное решение с mdn (без спред-оператора)
  return array.reduce((flattened, element) => flatten.concat(element), [])
 */

/* 
  // Альтернативное решение перебором:
  const flattened = [];
  
  array.forEach(element => {
    const isArray = Array.isArray(element);
  
    // Вариант через spread оператор
    isArray 
      ? flattened.push(...element) 
      : flattened.push(element);
     
    // // Вариант без spread оператора:
    // if (Array.isArray(element)) {
    //   // если элемент являестся вложенным массивом, то каждое значение из него записываем как отдельное в итоговый массив
    //   element.forEach(subElement => flattened.push(subElement)); 
    // } else {
    //   flattened.push(element);
    // }
  });
  
  return flattened;
 */
}

flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]

flatten([1, 2, 3, 4, 5]);
// => [1, 2, 3, 4, 5]

flatten([1, [2, 3], 4, 5]);
// => [1, 2, 3, 4, 5]

/**
 * метод должен убрать все повторяющиеся элементы из массива
 */
function uniq(array) {
  return array.filter((el, i, arr) => !arr.indexOf(el) < i);
}

uniq([2, 1, 2]);
// => [2, 1]

/**
 * метод должен собирать элементы массива в группы с заданным размером
 */
function chunk(array, size) {
  const temp = []; 
  for (let i = 0, l = array.length; i < l; i += size) {
    temp.push(array.slice(i, i + size));
  }
  return temp;
}

chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]