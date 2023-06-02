import React from "react";
import axios from '../../axios'
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "./index.jsx";
import { Index } from "../AddComment";
import { CommentsBlock } from "../CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {id} = useParams();

  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then(res => {
      setData(res.data);
      setLoading(false);
    })
    .catch((err) =>{
      console.warn(err);
      alert('Ошибка при получении статьи');
    });
  }, []);

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>;
  }
  
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        salary={data.salary}
        phone={data.phone}
        company={data.company}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
    </>
  );
};
