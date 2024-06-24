import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../axios';
import { Post } from '../components/Post';
import { AddComment } from '../components/AddComment/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { addItemToCart } from '../redux/slices/cart';

export const FullPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setPost(res.data);
    }).catch((err) => {
      console.warn(err);
      alert('Error while fetching the post');
    });

    axios.get(`/posts/${id}/comments`).then((res) => {
      setComments(res.data);
    }).catch((err) => {
      console.warn(err);
      alert('Error while fetching the comments');
    });
  }, [id]);

  const handleAddComment = (comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(post));
    alert('Товар добавлен в корзину');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        imageUrl={post.imageUrl}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={comments.length}
        tags={post.tags}
        price={post.price} // Добавляем цену
        isFullPost
      >
        <p>{post.text}</p>
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleAddToCart} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Добавить в корзину
          </button>
        </div>
      </Post>
      <CommentsBlock items={comments} isLoading={false}>
        <AddComment postId={id} onAddComment={handleAddComment} />
      </CommentsBlock>
    </>
  );
};
