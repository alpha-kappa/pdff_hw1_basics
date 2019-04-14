const colorGenerator = (function ColorGenerator() {
  const getRandomHex = () => {
    const min = 0, max = 255;
    const rand = Math.floor(Math.random() * max - min);
    
    return rand.toString(16).padStart(2, '0');
  };
  
  const getRandomHexColor = () => `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
  
  return {
    getHex: getRandomHexColor,
  };
})();


const cellBuilder = ({background = "#000", width = 0}) => {
  const cell = document.createElement('div');
  
  cell.style.backgroundColor = background;
  cell.style.width = `${width}%`;
  cell.style.height = `100%`;
  cell.style.opacity = '.5';
  
  return cell;
};


const rowBuilder = ({background = "#000", updateTime = null, elements = []}, height) => {
  const row = document.createElement('div');
  console.log('height:', height);
  
  row.style.backgroundColor = background;
  row.style.height = `${height}px`;
  row.style.display = 'flex';
  if (+updateTime) setInterval(() => (row.style.backgroundColor = colorGenerator.getHex()), updateTime);
  
  appender(row, elements, cellBuilder);
  
  return row;
};


const appender = (target, elements, generator) => {
  for (let i = 0, j = elements.length; i < j; i++) {
    target.append(generator(elements[i]));
  }
};

const getRowHeight = (length) => (document.documentElement.clientHeight / length);

const start = (data) => {
  const scene = document.querySelector(".scene");
  
  appender(scene, data, (element) => rowBuilder(element, getRowHeight(data.length)));
};


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
      ]
    },
    {
      background: '#99d',
      updateTime: 800,
      elements: [
        {
          background: '#00a',
          width: 30,
        },
        {
          background: '#b0a',
          width: 30,
        },
        {
          background: '#0b0',
          width: 40,
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
    }
  ]
};

start(params.lines);
