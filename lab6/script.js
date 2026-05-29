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
    input.parentNode.insertBefore(hint, input.nextSibling);


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
            }
        } else if (e.key === 'Escape') {
            if (textarea) {

                textarea.replaceWith(div);
            }
        }
    });
})();

(function() {
    const table = document.getElementById('editableTable');
    let activeCell = null;

    table.addEventListener('click', function(e) {
        const td = e.target.closest('td');
        if (!td || activeCell || e.target.tagName === 'BUTTON') return;

        activeCell = td;
        const originalContent = td.innerHTML;
        
        const textarea = document.createElement('textarea');
        textarea.value = td.textContent;
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'edit-buttons';
        
        const okBtn = document.createElement('button');
        okBtn.textContent = 'OK';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'ОТМЕНА';
        
        td.innerHTML = '';
        td.appendChild(textarea);
        buttonsDiv.appendChild(okBtn);
        buttonsDiv.appendChild(cancelBtn);
        td.appendChild(buttonsDiv);
        
        textarea.focus();

        okBtn.addEventListener('click', function() {
            td.innerHTML = textarea.value;
            activeCell = null;
        });

        cancelBtn.addEventListener('click', function() {
            td.innerHTML = originalContent;
            activeCell = null;
        });
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