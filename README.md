# Визуализация кодов Уолша в CDMA
Этот проект визуализирует передачу данных в CDMA с использованием кодов Уолша. Он предоставляет интерактивную HTML-страницу, где вы можете вводить слова, наблюдать закодированные и мультиплексированные данные, а также видеть результаты, отображенные на графике.
## Возможности
- Ввод до 4 слов для симуляции кодирования CDMA.
- Автоматическое декодирование и отображение переданных слов.
- Визуализация закодированных данных на интерактивном графике.
- Обновление в реальном времени при изменении введённых слов.
## Использование
1. Клонируйте репозиторий или скачайте файл `index.html`.
2. Откройте файл `index.html` в любом современном веб-браузере (например, Chrome, Firefox, Edge).
3. Введите слова в поля ввода и наблюдайте обновлённый график и декодированные результаты.
## Технические детали
Проект использует:
- **JavaScript** для реализации кодирования CDMA, декодирования и мультиплексирования данных.
- **Chart.js** для визуализации данных.
- Генерацию кодов Уолша для кодирования сигналов.
## Основные функции
1. `generateWalshCodes(n)` - Генерирует коды Уолша размера `n`.
2. `textToBinary(text)` - Преобразует строку в бинарное представление.
3. `encodeData(words, walshCodes)` - Кодирует вводимые слова с использованием кодов Уолша.
4. `multiplexData(encodedData, walshCode)` - Объединяет закодированные сигналы в один мультиплексированный сигнал.
5. `decodeData(chunks, walshCode)` - Декодирует мультиплексированные данные обратно в исходные бинарные сигналы.
6. `binaryToText(binary)` - Преобразует бинарные данные обратно в читаемый текст.