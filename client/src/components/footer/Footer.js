import Visa from './images/visa.png';
import MasterCard from './images/master-card.png';
import Paypal from './images/paypal.png';
import Email__image from './images/email__image.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="follow__container">
        <h2>Мы есть на</h2>
        <div>
          <ul className="follow__list">
            <li className="follow__icon">
              <i className="fab fa-facebook"></i>
            </li>
            <li className="follow__icon">
              <i className="fab fa-instagram"></i>
            </li>
          </ul>
        </div>
        <div className="category__list--container">
          <ul>
            <li>
              <Link to="/products">
                <h3>ДЛЯ ДОМА</h3>
              </Link>
            </li>
            <li>
              <Link to="/products">Для дома</Link>
            </li>
            <li>
              <Link to="/products">Декор</Link>
            </li>
            <li>
              <Link to="/products">Посуды</Link>
            </li>
            <li>
              <Link to="/products">Подушки</Link>
            </li>
            <li>
              <Link to="/products">Интерьер</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products">
                <h3>ХОЗТОВАРЫ</h3>
              </Link>
            </li>
            <li>
              <Link to="/products">Чистящие средства</Link>
            </li>
            <li>
              <Link to="/products">Для уборки</Link>
            </li>
            <li>
              <Link to="/products">Прочие товары</Link>
            </li>
            <li>
              <Link to="/products">Мыло, жидкое мыло</Link>
            </li>
            <li>
              <Link to="/products">Гигиена</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/products">
                <h3>ОДЕЖДА</h3>
              </Link>
            </li>
            <li>
              <Link to="/products">Обувь</Link>
            </li>
            <li>
              <Link to="/products">Верхняя одежда</Link>
            </li>
            <li>
              <Link to="/products">Шорты</Link>
            </li>
            <li>
              <Link to="/products">Джинсы</Link>
            </li>
            <li>
              <Link to="/products"></Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="infor__container">
        <div className="infor__title">
          <h3>Свяжитесь с нами</h3>
        </div>
        <div>
          <p style={{ fontSize: '1.7rem' }}>Подписаться на рассылку ...</p>
        </div>
        <div className="email__container">
          <div>
            <img src={Email__image} alt="email" className="email__image" />
          </div>
          <div className="email__content">
            <input
              placeholder="Ваша эл. почта..."
              type="email"
              name="email"
              className="email__input"
            />
            <button>ПОДПИСАТЬСЯ</button>
          </div>
        </div>
        <div>
          <h2 style={{ padding: '1.3rem' }}>
            Поддерживаемые платежные системы
          </h2>
          <ul className="payment__list">
            <li>
              <img src={Visa} alt="" />
            </li>
            <li>
              <img src={MasterCard} alt="" />
            </li>
            <li>
              <img src={Paypal} alt="" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
