let kontainerModala = document.querySelector('.kontainer-modala');
let modalnoeOkno = document.querySelector('.modalnoe-okno');
let isDragging = false;
let isResizing = false;
let offsetX, offsetY;
let startWidth, startHeight;

// Перетаскиваемое модальное окно
modalnoeOkno.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('knopka')) {
        return;
    }
    
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.tagName === 'BUTTON' ||
        e.target.classList.contains('dobavit-obnovlenie')) {
        return;
    }
    
    const handleSize = 10;
    const isNearRight = e.offsetX >= modalnoeOkno.offsetWidth - handleSize;
    const isNearBottom = e.offsetY >= modalnoeOkno.offsetHeight - handleSize;
    
    if (isNearRight && isNearBottom) {
        isResizing = true;
        startWidth = modalnoeOkno.offsetWidth;
        startHeight = modalnoeOkno.offsetHeight;
        modalnoeOkno.style.cursor = 'nwse-resize';
        e.preventDefault();
        return;
    }
    
    isDragging = true;
    offsetX = e.clientX - kontainerModala.offsetLeft;
    offsetY = e.clientY - kontainerModala.offsetTop;
    kontainerModala.style.transition = 'none';
    document.body.style.userSelect = 'none';
    kontainerModala.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', function () {
    isDragging = false;
    isResizing = false;
    document.body.style.userSelect = '';
    kontainerModala.style.cursor = '';
    modalnoeOkno.style.cursor = '';
});

document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        kontainerModala.style.left = `${e.clientX - offsetX}px`;
        kontainerModala.style.top = `${e.clientY - offsetY}px`;
    }
    
    if (isResizing) {
        const newWidth = Math.max(300, startWidth + (e.clientX - (modalnoeOkno.getBoundingClientRect().left + startWidth)));
        const newHeight = Math.max(250, startHeight + (e.clientY - (modalnoeOkno.getBoundingClientRect().top + startHeight)));
        
        modalnoeOkno.style.width = `${newWidth}px`;
        modalnoeOkno.style.height = `${newHeight}px`;
        
        document.querySelector('.knopka').style.left = `calc(${newWidth}px - 202px)`;
    }
});

let schetchikObnovleniy = 1;

function addUpdate() {
    schetchikObnovleniy++;
    const container = document.getElementById('updates-section');
    const row = document.createElement('div');
    row.className = 'ryad-obnovleniya';

    const number = document.createElement('div');
    number.className = 'nomer-obnovleniya';
    number.textContent = `Обновление ${schetchikObnovleniy}`;

    const textareaWrapper = document.createElement('div');
    textareaWrapper.className = 'obl-polya-vvoda';
    
    const textarea = document.createElement('textarea');
    const removeBtn = document.createElement('button');
    removeBtn.className = 'knopka-udaleniya';
    removeBtn.innerHTML = '×';
    removeBtn.onclick = function() {
        row.remove();
    };

    textareaWrapper.appendChild(textarea);
    textareaWrapper.appendChild(removeBtn);
    
    row.appendChild(number);
    row.appendChild(textareaWrapper);
    container.appendChild(row);
}