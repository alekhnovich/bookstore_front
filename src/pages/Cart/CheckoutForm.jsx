import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SideBlock } from '../../components/SideBlock/index';
import { useSelector } from 'react-redux';

export const CheckoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cardNumber: '',
    address: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const cartItems = useSelector((state) => state.cart.items);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const response = await fetch('http://localhost:5500/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, items: cartItems }),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setErrors(data.errors || [{ msg: 'Ошибка при создании заказа' }]);
      }
    } catch (error) {
      setErrors([{ msg: 'Ошибка при отправке запроса' }]);
    }
  };

  return (
    <SideBlock title="Оформление заказа">
      <Box component="form" onSubmit={handleSubmit} maxWidth="400px">
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Имя"
          variant="outlined"
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.find(error => error.param === 'name')}
          helperText={errors.find(error => error.param === 'name')?.msg}
        />
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Телефон"
          variant="outlined"
          margin="normal"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.find(error => error.param === 'phone')}
          helperText={errors.find(error => error.param === 'phone')?.msg}
        />
        <TextField
          fullWidth
          id="cardNumber"
          name="cardNumber"
          label="Номер карты (16 цифр)"
          variant="outlined"
          margin="normal"
          value={formData.cardNumber}
          onChange={handleChange}
          inputProps={{ maxLength: 16 }}
          error={!!errors.find(error => error.param === 'cardNumber')}
          helperText={errors.find(error => error.param === 'cardNumber')?.msg}
        />
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Адрес"
          variant="outlined"
          margin="normal"
          value={formData.address}
          onChange={handleChange}
          error={!!errors.find(error => error.param === 'address')}
          helperText={errors.find(error => error.param === 'address')?.msg}
        />
        <Button type="submit" variant="contained" color="primary">
          Оформить заказ
        </Button>
        {isSubmitted && <p style={{ marginTop: '10px', color: 'green' }}>Спасибо, ваш заказ оформлен!</p>}
        {errors.length > 0 && (
          <Box mt={2}>
            {errors.map((error, index) => (
              <p key={index} style={{ color: 'red' }}>
                {error.msg}
              </p>
            ))}
          </Box>
        )}
      </Box>
    </SideBlock>
  );
};

export default CheckoutForm;
