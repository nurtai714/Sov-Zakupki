import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [infor, setInfor] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/user/infor`, {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          response.data.role === 0 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(response.data.cart);
          setInfor([
            response.data.name,
            response.data.mobile,
            response.data.address,
          ]);
        } catch (err) {
          Swal.fire('Error', err.response.data.msg, 'error');
        }
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const response = await axios.get(
            `http://localhost:5000/api/payment`,
            {
              headers: { Authorization: token },
            }
          );
          setHistory(response.data);
        } else {
          const response = await axios.get(
            `http://localhost:5000/user/history`,
            {
              headers: { Authorization: token },
            }
          );
          setHistory(response.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin]);

  const addCart = async (product) => {
    if (!isLogged) {
      Swal.fire(
        'Ошибка!',
        'Войдите в систему чтобы совершать покупки',
        'error'
      );
    }

    const check = cart.every((item) => {
      return item._id !== product._id;
    });
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        'http://localhost:5000/user/addcart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      Swal.fire(
        'Спасибо!',
        'Этот товар уже добавлен в ваши заказы!',
        'успешно'
      );
    } else {
      Swal.fire('Спасибо!', 'Этот товар уже добавлен в ваши заказы!', 'info');
    }
  };

  return {
    addCart: addCart,
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    callback: [callback, setCallback],
    history: [history, setHistory],
    infor: [infor, setInfor],
    cart: [cart, setCart],
  };
}
