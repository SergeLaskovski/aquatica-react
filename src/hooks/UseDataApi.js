import {useEffect, useState} from 'react';
import axios from 'axios';

const useDataApi = (url) => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  let axiosData = {};

  useEffect(() => {
    let isMounted = true;
    axios
      .get(url)
      .then((res) => {
        if(isMounted){
          setData(res.data);
          setLoad(true);
        }
      })
      .catch((err) => {
        if(isMounted){
          console.log(err.message);
          setError(true);
          setLoad(true);
        }
      });
      return () => { isMounted = false };
  }, [url]);


    axiosData = {data: data, load: load, error: error};
    return axiosData;

};

export default useDataApi;
