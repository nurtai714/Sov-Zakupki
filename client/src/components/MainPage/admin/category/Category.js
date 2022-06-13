import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GlobalState } from '../../../../GlobalState';
import { Button } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Category() {
  const state = React.useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;
  const [callback, setCallback] = state.userAPI.callback;
  const [category, setCategory] = useState('');
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');

  const createCategory = async () => {
    try {
      if (edit) {
        const response = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire('Успешно!', response.data.msg, 'успешно');
      } else {
        const response = await axios.post(
          `/api/category`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire('Успешно!', response.data.msg, 'успешно');
      }
      setCallback(!callback);
      setEdit(false);
      setCategory('');
    } catch (err) {
      Swal.fire('Error', err.response.data.msg);
    }
  };
  const editCategory = (id, name) => {
    setEdit(true);
    setId(id);
    setCategory(name);
  };
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      Swal.fire('Успешно!', response.data.msg);
    } catch (err) {
      Swal.fire('Error', err.response.data.msg, 'error');
    }
  };

  return (
    <div className="order__item">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Название категории
        </label>
        <input
          type="text"
          name="category"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="..."
          style={{ fontSize: '2rem' }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          type="submit"
          className="create__category--btn"
          onClick={createCategory}
        >
          {edit ? 'ОБНОВИТЬ' : 'СОЗДАТЬ'}
        </button>
      </div>
      <div>
        <React.Fragment>
          <h2>Таблица категории</h2>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell className="order__item">Название</TableCell>
                <TableCell className="order__item">Создано</TableCell>
                <TableCell className="order__item">Обновлено</TableCell>
                <TableCell className="order__item">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="order__item">{item.name}</TableCell>
                  <TableCell className="order__item">
                    {item.createdAt}
                  </TableCell>
                  <TableCell className="order__item">
                    {item.updatedAt}
                  </TableCell>
                  <TableCell className="order__item flexrow">
                    <Button
                      className="admin__btn"
                      variant="contained"
                      color="primary"
                      onClick={() => editCategory(item._id, item.name)}
                    >
                      Изменить
                    </Button>
                    &nbsp;
                    <Button
                      className="admin__btn"
                      variant="contained"
                      color="primary"
                      onClick={() => deleteCategory(item._id)}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </div>
    </div>
  );
}
