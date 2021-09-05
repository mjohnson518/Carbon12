import React, {  useEffect, useState, useToast } from 'react'
import axios from "axios";

export const useTypeForm = () => {
  const toast = useToast()

  const [typeFormData, setTypeFormData] = useState(() => {
    const saved = localStorage.getItem("typeFormData");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    // curl --request GET \
    //   --url https://api.typeform.com/me \
    //   --header 'Authorization: Bearer {your_access_token}'
    axios.get('https://api.typeform.com/me')
      .then((response) => setTypeFormData(response))
      .catch((error) => {
        toast({
          title: `error recieved: ${error.message}`,
          status: 'error',
          isClosable: true,
        });

        setTypeFormData(typeFormData || {})
      })
      .then(() => {
        localStorage.setItem("typeFormData", JSON.stringify(typeFormData));
      });
  }, [typeFormData, setTypeFormData]);

  return {
    typeFormData,
    setTypeFormData,
  }
}
