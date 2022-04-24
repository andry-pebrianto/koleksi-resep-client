import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getList } from '../redux/actions/users';

export default function Landing() {  
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <div>Landing</div>
  )
}
