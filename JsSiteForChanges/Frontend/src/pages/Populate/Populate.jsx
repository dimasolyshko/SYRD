import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import { Link } from "react-router-dom";
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { fetchTags, fetchPopularPosts } from '../../redux/slices/posts';
import { CommentsBlock } from '../../components/CommentsBlock';

export const Populate = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(()=>{
    dispatch(fetchTags());
    dispatch(fetchPopularPosts());
  }, []);

  return (  
    <>
      <Tabs style={{ marginBottom: 30 }} value={1} aria-label="basic tabs example">
      <Link to="/">
        <Tab label="Новые" />
      </Link>
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
          isPostsLoading ? (
          <Post key = {index} isLoading={true} />
          ) :(
            <Post
              id={obj._id}
              title={obj.title}
              company={"Компания: " + obj.company}
              salary={"Зарплата: " + obj.salary}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
