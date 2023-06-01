import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [salary, setSalary] = React.useState('');
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        phone,
        company,
        salary,
        tags,
        text,
      };

      const { data } = isEditing
      ? await axios.patch(`/posts/${id}`, fields)
      : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании статьи!")
    }
  };

  React.useEffect(() => {
    if(id){
      axios
      .get(`/posts/${id}`)
      .then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setSalary(data.salary);
        setPhone(data.phone);
        setCompany(data.company);
        setTags(data.tags.join(","));
      }).catch(err =>{
        console.warn(err);
        alert("Ошибка при получении статьи!")
      });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!window.localStorage.getItem('token') && !isAuth){
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}> 
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Вакансия"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      classes={{ root: styles.salary }}
      variant="standard"
      placeholder="Зарплата"
      fullWidth
      />
      <TextField
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        classes={{ root: styles.company }}
        variant="standard"
        placeholder="Компания"
        fullWidth
      />  
    <TextField
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      classes={{ root: styles.phone }}
      variant="standard"
      placeholder="Телефон"
      fullWidth
    />
      <TextField 
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        fullWidth 
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
