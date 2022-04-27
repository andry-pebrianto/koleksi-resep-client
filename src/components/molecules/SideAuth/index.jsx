import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../atoms/Logo';

function SideAuth() {
  return (
    <div className="side col-sm-5 col-md-6 d-none d-sm-flex">
      <div className="icon text-center w-100">
        <Link to="/">
          <Logo width="100px" height="120px" color="#fff" />
        </Link>
      </div>
    </div>
  );
}

export default SideAuth;
