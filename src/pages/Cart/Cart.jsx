import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Post } from '../../components/Post/index';
import { CheckoutForm } from './CheckoutForm';
import { removeItemFromCart } from '../../redux/slices/cart';
import { SideBlock } from "../../components/SideBlock/index";

export const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const totalCost = items.reduce((acc, item) => acc + item.price, 0);

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  if (items.length === 0) {
    return <div>Ваша корзина пуста</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h1>Сумма товаров в корзине: {totalCost} рублей</h1>
        <Grid container spacing={0}>
          {items.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={4}>
              <Post
                id={item._id}
                title={item.title}
                imageUrl={item.imageUrl ? `http://localhost:5500${item.imageUrl}` : ''}
                price={item.price}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.comments.length}
                tags={item.tags}
                isEditable={false}
              >
                <button onClick={() => handleRemoveFromCart(item._id)} style={{ padding: '10px 20px', fontSize: '16px' }}>
                  Удалить из корзины
                </button>
              </Post>
            </Grid>
          ))}
        </Grid>
      </div>
      <div style={{ marginTop: '90px' }}>
        <CheckoutForm />
      </div>
    </div>
  );
};
