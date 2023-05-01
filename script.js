const keyboardLayouts = {
    russian: [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
      'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'shift',
      'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl'
    ],
    english: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift',
      'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl'
    ]
  };

  // Текущая раскладка
  let currentLayout = 'english';

  // Создание клавиатуры
  function createKeyboard() {
    const keyboardElement = document.getElementById('keyboard');
    const layout = keyboardLayouts[currentLayout];
    
    layout.forEach(key => {
      const keyElement = document.createElement("button");
      keyElement.setAttribute("type", "button");
      keyElement.textContent = key;
      
      const specialKeys = ["Backspace", "CapsLock", "Enter", " ", "]", "ъ", "?", "Ctrl"];
      const isSpecialKey = specialKeys.includes(key);
      
      keyElement.classList.add("keyboard__key");
      
      if (isSpecialKey) {
        keyElement.classList.add("keyboard__key--wide");
      }
      
      if (key === "Shift"  || key === "Ctrl" || key === "shift") {
        keyElement.classList.add("keyboard__key--change_lang");
      }
      if (key === "shift") {
        keyElement.textContent="Shift";
      }
      
      if (key === " ") {
        keyElement.classList.add("keyboard__key--extra-wide");
      }
      
      keyboardElement.appendChild(keyElement);
      
      const insertLineBreak = ["Backspace", "]", "Enter", "?", "shift", "ъ"].includes(key);
      if (insertLineBreak) {
        keyboardElement.appendChild(document.createElement("br"));
      }
    });
  }
  
  



  // Обработчик нажатия на физическую клавишу
  function handleKeyPress(event) {
    const key = event.key;
    const keyboardElement = document.getElementById('keyboard');
    const keyElements = keyboardElement.getElementsByClassName('keyboard__key');

    switch (key) {
      case "Control":
        for (let i = 0; i < keyElements.length; i++) {
          const keyElement = keyElements[i];
          if (keyElement.textContent === 'Ctrl') {
            keyElement.classList.add('active');
          }
        }
      default:
        for (let i = 0; i < keyElements.length; i++) {
          const keyElement = keyElements[i];
  
          if (keyElement.textContent.toLowerCase() === key.toLowerCase()) {
            keyElement.classList.add('active');
          }
        }
          break;    
        }
  }

  // Обработчик отпускания физической клавиши
  function handleKeyRelease(event) {
    const key = event.key;
    const keyboardElement = document.getElementById('keyboard');
    const keyElements = keyboardElement.getElementsByClassName('keyboard__key');
    switch (key) {
      case "Control":
        for (let i = 0; i < keyElements.length; i++) {
          const keyElement = keyElements[i];
          if (keyElement.textContent === 'Ctrl') {
            keyElement.classList.remove('active');
          }
        }
  
          break;

      default:
        for (let i = 0; i < keyElements.length; i++) {
          const keyElement = keyElements[i];
  
          if (keyElement.textContent.toLowerCase() === key.toLowerCase()) {
            keyElement.classList.remove('active');
          }
        }
          break;    }
  }
    
    

    // Переключение раскладки
    function toggleLayout() {
      currentLayout = currentLayout === 'english' ? 'russian' : 'english';
      const keyboardElement = document.getElementById('keyboard');
      keyboardElement.innerHTML = '';
      createKeyboard();
    }

    // Создание клавиатуры
    createKeyboard();

    // Назначение обработчиков событий
    const keyElements = document.getElementsByClassName('key');
    for (let i = 0; i < keyElements.length; i++) {
      const keyElement = keyElements[i];
      keyElement.addEventListener('click', handleKeyClick);
    }

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyRelease);

    // Добавление обработчика для переключения раскладки по нажатию на клавишу Shift
    let ctrlPressed = false;
    let shiftPressed = false;
    
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Control') {
        ctrlPressed = true;
      }
      
      if (event.key === 'Shift') {
        shiftPressed = true;
      }
      
      if (ctrlPressed && shiftPressed) {
        toggleLayout();
      }
    });
    
    document.addEventListener('keyup', function(event) {
      if (event.key === 'Control') {
        ctrlPressed = false;
      }
      
      if (event.key === 'Shift') {
        shiftPressed = false;
      }
    });
    