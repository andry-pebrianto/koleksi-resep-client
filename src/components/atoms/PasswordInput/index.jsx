import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

function PasswordInput({
  password, setPassword, id, placeholder,
}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="mb-3">
        <label
          htmlFor={id}
          className="form-label"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Required"
        >
          *
          {' '}
          {placeholder}
        </label>
        <div className="input-group mb-3">
          <input
            type={`${show ? 'text' : 'password'}`}
            className="form-control form-control-sm p-3"
            id={id}
            onChange={setPassword}
            required
            placeholder={placeholder}
            value={password}
          />
          <span className="input-group-text show-password" onClick={() => setShow(!show)}>
            {!show && <BsEyeFill />}
            {show && <BsEyeSlashFill />}
          </span>
        </div>
      </div>
    </>
  );
}

export default PasswordInput;
