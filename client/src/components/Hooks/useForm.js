import  { useState } from 'react'

const useForm = () => {
  const [state, setState] = useState({});
  const onChangeHandle = (e) => {
    e.preventDefault();
    setState({...state, [e.target.name]: e.target.value});
  }

  return [state, onChangeHandle, setState];
}

export default useForm