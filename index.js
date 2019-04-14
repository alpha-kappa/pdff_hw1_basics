
const utils = {
    debounce: (func, delay) => {
        let timeout;
        
        return (...params) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...params), delay);
        }
    },
    
    colorGenerator: (function ColorGenerator() {
        const getRandomHex = () => {
            const min = 50, max = 255; // value  of "min" is 50 is for more brightly colors
            const rand = Math.floor(Math.random() * (max - min) + min);
            
            return rand.toString(16).padStart(2, '0');
        };
        
        const getRandomHexColor = () => `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
        
        return {
            getHex: getRandomHexColor,
        };
    })(),
    
    
    publisher: (function Publisher() {
        const subscribers = [];
        
        const addSubscriber = subscriber => subscribers.push(subscriber);
        
        const updateSubscribers = newValue => {
            subscribers.forEach(subscriber => subscriber(newValue));
        };
        
        return {
            subscribe: addSubscriber,
            update: updateSubscribers,
        }
    })()
};



class GridRenderer {
    constructor(selector, data) {
        const scene = document.querySelector(selector);
        if (!scene) throw Error(`Could not find element by selector: ${selector}`);
        
        this.debounceDelay = 50;
        this.scene = scene;
        this.data = data;
    }
    
    init () {
        const length = this.data.length;
        const initialRowHeight = GridRenderer.calcRowHeight(length);
        const rowsHeightUpdater = utils.debounce((e) => utils.publisher.update(GridRenderer.calcRowHeight(length)), this.debounceDelay);
        
        window.addEventListener('resize', rowsHeightUpdater);
        
        GridRenderer.appender(this.scene, this.data, (element) => this.rowBuilder(element, initialRowHeight));
    }
    
    static appender (target, elements, generator) {
        for(let i = 0, j = elements.length; i < j; i++ ) {
            target.append(generator(elements[i]));
        }
    }
    
    static calcRowHeight (length) {
        return (document.documentElement.clientHeight / length)
    }
    
    static cellBuilder ({background = "#000", width = 0}) {
        const cell = document.createElement('div');
        
        cell.style.backgroundColor = background;
        cell.style.width = `${width}%`;
        cell.style.height = `100%`;
        cell.style.opacity = '.5';
        
        return cell;
    };
    
    rowBuilder ({background = "#000", updateTime = null, elements = []}, height) {
        const row = document.createElement('div');
        
        row.style.backgroundColor = background;
        row.style.height = `${height}px`;
        row.style.display = 'flex';
        if (+updateTime) setInterval(() => (row.style.backgroundColor = utils.colorGenerator.getHex()), updateTime);
    
        GridRenderer.appender(row, elements, GridRenderer.cellBuilder);
        
        utils.publisher.subscribe(height => row.style.height = `${height}px`);
        
        return row;
    }
}



const params = {
    lines: [
        {
            background: '#f0d',
            updateTime: 1000,
            elements: [
                {
                    background: '#0da',
                    width: 30,
                },
                {
                    background: '#b0a',
                    width: 20,
                },
                {
                    background: '#0b0',
                    width: 30,
                },
                {
                    background: '#00a',
                    width: 10,
                },
            ]
        },
        {
            background: '#99d',
            updateTime: 800,
            elements: [
                {
                    background: '#00a',
                    width: 10,
                },
                {
                    background: '#b0a',
                    width: 20,
                },
                {
                    background: '#b0a',
                    width: 30,
                },
            ]
        },
        {
            background: '#fff57a',
            updateTime: 300,
            elements: [
                {
                    background: '#d00',
                    width: 30,
                },
            ]
        },
        {
            background: '#99d',
            updateTime: 800,
            elements: [
                {
                    background: '#00a',
                    width: 10,
                },
                {
                    background: '#b0a',
                    width: 20,
                },
                {
                    background: '#0b0',
                    width: 30,
                },
                {
                    background: '#00a',
                    width: 10,
                },
                {
                    background: '#b0a',
                    width: 5,
                },
                {
                    background: '#0b0',
                    width: 10,
                },
                {
                    background: '#00a',
                    width: 5,
                },
                {
                    background: '#b0a',
                    width: 10,
                },
            ]
        },
    ]
};


const gridRenderer = new GridRenderer('.scene', params.lines);

gridRenderer.init();




