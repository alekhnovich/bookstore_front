import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import styles from "./AddComment.module.scss";

export const AddComment = ({ postId, onAddComment }) => {
  const userData = useSelector((state) => state.auth.data);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(`/posts/${postId}/comments`, {
        text,
      });

      onAddComment(data);
      setText("");
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <div className={styles.root}>
      <Avatar src={userData?.avatarUrl} />
      <div className={styles.form}>
        <TextField
          label="Напишите комментарий"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
        />
        <Button variant="contained" onClick={handleSubmit}>
          Опубликовать
        </Button>
      </div>
    </div>
  );
};
