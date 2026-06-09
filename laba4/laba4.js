/**
 * Класс Book представляет книгу с названием, годом публикации и ценой
 */
export class Book {
  #price; // Приватное поле
  _pubYear // защищенное поле
  titLe // открытое поле

  /**
   * Создает экземпляр книги
   * @param {string} titLe - Название книги
   * @param {number} pubYear - Год публикации
   * @param {number} price - Цена книги
   */
  constructor(title, pubYear, price) {
    this.titLe = title;
    this._pubYear = pubYear;
    this.#price = price;
  }

  /**
   * Выводит в консоль название и цену книги
   */
  show() {
    console.log(`Название: ${this.title}, Цена: ${this.#price}`);
  }

  // Геттеры и сеттеры
  get title() {
    return this._title;
  }

  set title(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('Название книги не может быть пустым');
    }
    this._title = value;
  }

  get pubYear() {
    return this._pubYear;
  }

  set pubYear(value) {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error('Год публикации должен быть положительным числом');
    }
    this._pubYear = value;
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    if (typeof value !== 'number' || value <= 0) {
      throw new Error('Цена должна быть положительным числом');
    }
    this.#price = value;
  }

  /**
   * Статический метод для сравнения книг по году публикации
   * @param {Book} a - Первая книга
   * @param {Book} b - Вторая книга
   * @returns {number} Результат сравнения
   */
  static compare(a, b) {
    return a._pubYear - b._pubYear;
  }
}

/**
 * Проверяет, является ли объект пустым
 * @param {object} obj - Проверяемый объект
 * @returns {boolean} true если объект пустой
 */
export function isEmpty(obj) {
  if (Object.getOwnPropertyNames(obj).length != 0) {
    return false;
  }
  return Object.getOwnPropertySymbols(obj).length === 0;
}

/**
 * Объект с методами для работы с классами
 */
export const obj = {
  className: 'open menu',

  /**
   * Добавляет класс, если его нет
   * @param {string} cls - Добавляемый класс
   * @returns {object} Возвращает this
   */
  addClass(cls) {
    const classes = this.className.split(' ');
    if (!classes.includes(cls)) {
      this.className = [...classes, cls].join(' ').trim();
    }
    return this;
  },

  /**
   * Удаляет класс, если он есть
   * @param {string} cls - Удаляемый класс
   * @returns {object} Возвращает this
   */
  removeClass(cls) {
    const classes = this.className.split(' ');
    this.className = classes.filter(c => c !== cls).join(' ').trim();
    return this;
  }
};
/**
 * Возвращает количество секунд с начала текущего дня
 * @returns {number} Количество секунд
 */
export function getSecondsToday() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((now - today) / 1000);
}
/**
 * Форматирует дату в строку "дд.мм.гг"
 * @param {Date} date - Объект Date
 * @returns {string} Отформатированная дата
 */
export function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}