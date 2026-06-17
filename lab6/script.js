
document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('musicGenre');
    const selectOutput = document.getElementById('selectOutput');
    
    selectOutput.innerHTML = `
        <strong>Текущее значение:</strong> ${select.value}<br>
        <strong>Текущий текст:</strong> ${select.options[select.selectedIndex].text}
    `;
    
    const newOption = new Option('Классика', 'Classic');
    select.add(newOption);
    select.value = 'Classic';
    
    select.addEventListener('change', function() {
        selectOutput.innerHTML = `
            <strong>Текущее значение:</strong> ${this.value}<br>
            <strong>Текущий текст:</strong> ${this.options[this.selectedIndex].text}
        `;
    });
});

(function() {
    const input = document.getElementById('placeholderInput');
    const hint = document.createElement('div');
    hint.className = 'hint';
    input.parentNode.insertBefore(hint, input);

    input.value = input.dataset.placeholder;

    input.addEventListener('focus', function() {
        if (this.value === this.dataset.placeholder) {
            this.value = '';
            this.classList.remove('placeholder');
        }
        hint.textContent = this.dataset.placeholder;
    });

    input.addEventListener('blur', function() {
        hint.textContent = '';
        if (this.value === '') {
            this.value = this.dataset.placeholder;
            this.classList.add('placeholder');
        }
    });

    if (input.value === input.dataset.placeholder) {
        input.classList.add('placeholder');
    }
})();

(function() {
    const div = document.getElementById('editableDiv');
    let textarea;
    const STORAGE_KEY = 'editableDivContent';

    function loadSavedContent() {
        const savedContent = localStorage.getItem(STORAGE_KEY);
        if (savedContent !== null) {
            div.textContent = savedContent;
        }
    }

    function saveContentToStorage() {
        localStorage.setItem(STORAGE_KEY, div.textContent);
    }

    loadSavedContent();

    window.addEventListener('beforeunload', function() {
        saveContentToStorage();
    });

    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            textarea = document.createElement('textarea');
            textarea.value = div.textContent;
            textarea.style.width = div.offsetWidth + 'px';
            textarea.style.height = div.offsetHeight + 'px';
            textarea.className = 'edit-area';

            div.replaceWith(textarea);
            textarea.focus();
            
        } else if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (textarea) {
                div.textContent = textarea.value;
                textarea.replaceWith(div);
                saveContentToStorage();
            }
        } else if (e.key === 'Escape') {
            if (textarea) {
                textarea.replaceWith(div);
                textarea = null;
            }
        }
    });
})();
(function() {
    const table = document.getElementById('editableTable');
    let activeCell = null;
    const SESSION_KEY = 'editableTableContent';
    const RELOAD_KEY = 'isPageReloading';
    let initialTableData = null;

    // Функция сохранения таблицы в sessionStorage
    function saveTableToSession() {
        const tableData = [];
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                rowData.push(cell.textContent);
            });
            tableData.push(rowData);
        });
        
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(tableData));
        console.log('Таблица сохранена в sessionStorage');
    }

    // Функция загрузки таблицы из sessionStorage
    function loadTableFromSession() {
        const savedData = sessionStorage.getItem(SESSION_KEY);
        if (!savedData) return;
        
        const tableData = JSON.parse(savedData);
        const rows = table.querySelectorAll('tr');
        
        rows.forEach((row, rowIndex) => {
            if (rowIndex < tableData.length) {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, cellIndex) => {
                    if (cellIndex < tableData[rowIndex].length) {
                        cell.textContent = tableData[rowIndex][cellIndex];
                    }
                });
            }
        });
        console.log('Таблица загружена из sessionStorage');
    }

    // Сохраняем начальное состояние таблицы
    function saveInitialTableState() {
        const tableData = [];
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                rowData.push(cell.textContent);
            });
            tableData.push(rowData);
        });
        
        initialTableData = JSON.parse(JSON.stringify(tableData));
        console.log('Начальное состояние сохранено');
    }

    // Восстанавливаем начальное состояние таблицы
    function restoreInitialTableState() {
        if (!initialTableData) return;
        
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, rowIndex) => {
            if (rowIndex < initialTableData.length) {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, cellIndex) => {
                    if (cellIndex < initialTableData[rowIndex].length) {
                        cell.textContent = initialTableData[rowIndex][cellIndex];
                    }
                });
            }
        });
        console.log('Таблица восстановлена до начального состояния');
    }

    // Инициализация
    saveInitialTableState();
    
    const isReload = sessionStorage.getItem(RELOAD_KEY) === 'true';
    
    if (isReload) {
        // При перезагрузке загружаем сохранённые данные из sessionStorage
        loadTableFromSession();
        console.log('Перезагрузка: загружаем сохранённые данные из sessionStorage');
        sessionStorage.setItem(RELOAD_KEY, 'false');
    } else {
        // При новом открытии показываем исходную таблицу
        console.log('Новое открытие: показываем исходную таблицу');
        // Очищаем sessionStorage при новом открытии
        sessionStorage.removeItem(SESSION_KEY);
    }

    // Обработчик редактирования ячеек
    table.addEventListener('click', function(e) {
        const td = e.target.closest('td');
        if (!td || activeCell || e.target.tagName === 'BUTTON') return;

        activeCell = td;
        const originalContent = td.innerHTML;
        const originalText = td.textContent;
        
        const textarea = document.createElement('textarea');
        textarea.value = originalText;
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'edit-buttons';
        
        const okBtn = document.createElement('button');
        okBtn.textContent = 'Ok';       
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Отмена';
        
        td.innerHTML = '';
        td.appendChild(textarea);
        buttonsDiv.appendChild(okBtn);
        buttonsDiv.appendChild(cancelBtn);
        td.appendChild(buttonsDiv);
        textarea.focus();
        
        okBtn.addEventListener('click', function() {
            td.innerHTML = textarea.value;
            activeCell = null;
            console.log('Ячейка изменена');
        });
        
        cancelBtn.addEventListener('click', function() {
            td.innerHTML = originalContent;
            activeCell = null;
        });
    });

    // Отслеживаем перезагрузку страницы
    window.addEventListener('load', function() {
        if (performance.navigation && performance.navigation.type === 1) {
            // Перезагрузка через F5 или Ctrl+R
            sessionStorage.setItem(RELOAD_KEY, 'true');
            console.log('Обнаружена перезагрузка страницы');
        } else if (performance.getEntriesByType('navigation')[0]?.type === 'reload') {
            // Современный способ определения перезагрузки
            sessionStorage.setItem(RELOAD_KEY, 'true');
            console.log('Обнаружена перезагрузка страницы (modern API)');
        }
    });

    // Сохраняем ТОЛЬКО при перезагрузке страницы
    window.addEventListener('beforeunload', function() {
        const isReloading = sessionStorage.getItem(RELOAD_KEY) === 'true';
        
        if (isReloading) {
            // При перезагрузке сохраняем в sessionStorage
            saveTableToSession();
            console.log('Перезагрузка: сохраняем таблицу в sessionStorage');
        } else {
            // При закрытии не сохраняем
            console.log('Закрытие: не сохраняем изменения');
        }
    });

    // При закрытии страницы восстанавливаем начальное состояние
    window.addEventListener('pagehide', function() {
        const isReloading = sessionStorage.getItem(RELOAD_KEY) === 'true';
        
        if (!isReloading) {
            // Только при закрытии (не при перезагрузке) восстанавливаем
            restoreInitialTableState();
           
            sessionStorage.removeItem(SESSION_KEY);
            console.log('Закрытие: таблица восстановлена, sessionStorage очищен');
        }
    });
})();
(function() {
    const showPromptBtn = document.getElementById('showPromptBtn');
    const promptModal = document.getElementById('promptModal');
    const promptMessage = document.getElementById('promptMessage');
    const promptInput = document.getElementById('promptInput');
    const promptOkBtn = document.getElementById('promptOkBtn');
    const promptCancelBtn = document.getElementById('promptCancelBtn');
    const promptResult = document.getElementById('promptResult');

    window.showPrompt = function(html, callback) {

        promptMessage.innerHTML = html;
        promptInput.value = '';
        promptModal.style.display = 'flex';
        promptInput.focus();

        function complete(value) {
            promptModal.style.display = 'none';
            document.removeEventListener('keydown', handleKeyDown);
            callback(value);
        }
        function handleKeyDown(e) {
            if (e.key === 'Enter') {
                complete(promptInput.value);
            } else if (e.key === 'Escape') {
                complete(null);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const focusable = [promptInput, promptOkBtn, promptCancelBtn];
                const currentIndex = focusable.indexOf(document.activeElement);
                const nextIndex = (currentIndex + 1) % focusable.length;
                focusable[nextIndex].focus();
            }
        }
        promptOkBtn.onclick = function() { complete(promptInput.value); };
        promptCancelBtn.onclick = function() { complete(null); };
        document.addEventListener('keydown', handleKeyDown);
    };

    showPromptBtn.addEventListener('click', function() {
        showPrompt("Введите что-нибудь<br>... умное :)", function(value) {
            if (value !== null) {
                promptResult.innerHTML = `<strong>Вы ввели:</strong> ${value}`;
                promptResult.style.color = 'green';
            } else {
                promptResult.textContent = 'Вы отменили ввод';
                promptResult.style.color = 'red';
            }
        });
    });
})();