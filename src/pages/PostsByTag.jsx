// ./pages/PostsByTag.js
import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post";

export const PostsByTag = () => {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const { tag } = useParams();

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`/posts?tag=${tag}`)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении книг по тегу");
      });
  }, [tag]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h1>Книги в жанре: {tag}</h1>
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          imageUrl={post.imageUrl ? `http://localhost:5500${post.imageUrl}` : ''}
          price={post.price}
          user={post.user}
          createdAt={post.createdAt}
          viewsCount={post.viewsCount}
          commentsCount={post.commentsCount}
          tags={post.tags}
        />
      ))}
    </div>
  );
};
