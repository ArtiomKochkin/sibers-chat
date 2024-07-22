import { Button, Input } from '@shared/ui';
import styles from './JoinForm.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

export const JoinForm = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);

    if (isDisabled) e.preventDefault();
  };

  return (
    <form className={styles.form}>
      <Input
        name="name"
        placeholder="Name"
        autoComplete="off"
        value={values[NAME]}
        onChange={handleChange}
        required
      />
      <Input
        name="room"
        placeholder="Chat"
        autoComplete="off"
        value={values[ROOM]}
        onChange={handleChange}
        required
      />
      <Link
        onClick={handleClick}
        to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
      >
        <Button type="submit">Join</Button>
      </Link>
  </form>
  )
}