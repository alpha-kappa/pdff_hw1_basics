function runHomework(weekNum) {
    switch (weekNum) {
        case 1:
            init_1();
            break;
        default:
            alert('Еще  не задано/не сделано');
    }
}

// window.addEventListener('DOMContentLoaded',()=>init_1());

// Хелперы для стилизации
const groupStyles = 'color: orange; font-size: 16px;';
const captionStyles = 'color: green; font-style: italic;';
const commandStyles = captionStyles;
const command = text => [`%c${text}`, commandStyles];
const logCommand = text => console.log(...command(text));
const groupTitle = label => [`%c======= %c${label}%c =======`, captionStyles, groupStyles, captionStyles];
const startGroup = label => console.group(...groupTitle(label));
const endGroup = () => console.groupEnd();


function init_1() {
    console.clear();

    startGroup('difference');
    logCommand('difference([2, 1, 5], [2, 3])');
    console.log(difference([2, 1, 5], [2, 3]) );
    // => [1, 5]
    endGroup();


    startGroup('groupBy');
    logCommand(`groupBy([{ gender: 'male', name: 'Max'}, { gender: 'male', name: 'Fred'}, { gender: 'female', name: 'Jane'}], 'gender')`)
    console.log(groupBy([{ gender: 'male', name: 'Max'}, { gender: 'male', name: 'Fred'}, { gender: 'female', name: 'Jane'}], 'gender') );
    /**
     * => {
     *  male: [{ gender: 'male', name: 'Max'}, { gender: 'male', name: 'Fred'}],
     *  female: [{ gender: 'female', name: 'Jane'}]
     * }
     */
    endGroup();


    startGroup('flatten');
    logCommand('flatten([1, [2, [3, [4]], 5]])');
    console.log(flatten([1, [2, [3, [4]], 5]]) );
    // => [1, 2, [3, [4]], 5]
    logCommand('flatten([1, 2, 3, 4, 5])');
    console.log(flatten([1, 2, 3, 4, 5]) );
    // => [1, 2, 3, 4, 5]
    logCommand('flatten([1, [2, 3], 4, 5])');
    console.log(flatten([1, [2, 3], 4, 5]) );
    // => [1, 2, 3, 4, 5]
    endGroup();


    startGroup('uniq');
    logCommand('uniq([2, 1, 2])')
    console.log(uniq([2, 1, 2]) );
    // => [2, 1]
    endGroup();


    startGroup('chunk');
    logCommand(`chunk(['a', 'b', 'c', 'd'], 2)`)
    console.log(chunk(['a', 'b', 'c', 'd'], 2) );
    // => [['a', 'b'], ['c', 'd']]
    logCommand(`chunk(['a', 'b', 'c', 'd'], 3)`)
    console.log(chunk(['a', 'b', 'c', 'd'], 3) );
    // => [['a', 'b', 'c'], ['d']]
    endGroup();

    alert('Результат в консоли');
}