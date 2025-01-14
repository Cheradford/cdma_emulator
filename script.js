var chart;

function generateWalshCodes(n) {
    if (n === 1) return [[1], [-1]];

    const smaller = generateWalshCodes(n / 2);
    
    const topHalf = smaller.map(row => [...row, ...row]);
    const bottomHalf = smaller.map(row => [...row, ...row.map(bit => -bit)]);

    for (let i = 1; i < bottomHalf.length; i += 2) {
        [topHalf[i], bottomHalf[i]] = [bottomHalf[i], topHalf[i]];
    }

    return topHalf.concat(bottomHalf);
}

// CDMA передача данных
function encodeData(words, walshCodes) {
    return words.map((word, index) => {
        const binaryWord = textToBinary(word);
        const code = walshCodes[index];
        return binaryWord.flatMap(bit => code.map(chip => chip * bit));
    });
}

// Сумма сигналов от всех передатчиков
function multiplexData(encodedData, walshCode) {
    const totalLength = encodedData[0].length;
    const rawData = Array.from({ length: totalLength }, (_, i) => encodedData.reduce((sum, signal) => sum + signal[i], 0));
    const chunks = Array.from({ length: rawData.length / walshCode }, (_, i) => rawData.slice(i * walshCode, (i + 1) * walshCode));
    return chunks;
}

// Декодирование данных для конкретной станции
function decodeData(chunks, walshCode) {
    const decoded = chunks.map(chunk => chunk.reduce((sum, bit, index) => sum + bit * walshCode[index], 0) / walshCode.length);
    return decoded.map(bit => (bit > 0 ? 1 : 0)).join('');
}


function binaryToText(binary) {
    return binary.match(/.{8}/g).map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
}

function textToBinary(text) {
    return text
        .split('')
        .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('')
        .split('')
        .map(bit => parseInt(bit));
}

// Обновление графика
function renderChart(datasets) {
    let element = document.getElementById('myChart');
    const ctx = element.getContext('2d');

    const data = {
        labels: datasets[0].map((_, index) => index+1),
        datasets: datasets.map((data, i) => ({
            label: i+1 != datasets.length ? `Сигнал ${i + 1}` : "Суммируемый сигнал",
            data: data,
            borderColor: getRandomColor(),
            fill: false
        }))
    };

    if(chart != null){
        chart.data = data;
        chart.update();
        return;
    }
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'График сигналов' }
            }
        }
    };

    chart = new Chart(ctx, config);
}

// Функция для генерации случайного цвета
function getRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
}

// Обновление графика и декодированных слов при изменении
function update() {
    const words = [
        document.getElementById('word1').value,
        document.getElementById('word2').value,
        document.getElementById('word3').value,
        document.getElementById('word4').value
    ];

    const walshCodes = generateWalshCodes(8);
    const encodedData = encodeData(words, walshCodes);
    const multiplexedSignal = multiplexData(encodedData, 8);
    const signals = words.map(word => textToBinary(word));
    signals.push(multiplexedSignal.map(chunk => 
        chunk.reduce((sum, bit, index) => sum + bit, 0) / 8
    ));

    words.forEach((word, index) => {
        const decodedBinary = decodeData(multiplexedSignal, walshCodes[index]);
        const decodedWord = binaryToText(decodedBinary);
        document.getElementById(`decoded${index + 1}`).textContent = decodedWord;
    });

    renderChart(signals);
}

// Инициализация
document.querySelectorAll('input').forEach(input => input.addEventListener('input', update));
update();