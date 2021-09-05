import { useToast } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';

function isEmpty(obj) {
  return Array.from(obj).length === 0;
}

// export const useTypeForm = () => {
//   const toast = useToast()

//   const [typeFormData, setTypeFormData] = useState(() => {
//     const saved = getFormData();
//     const initialValue = saved || [];
//     return initialValue;
//   });

//   useEffect(() => {
//     const localFormEmpty = isEmpty(typeFormData);

//     if (localFormEmpty) {
//       const data = fetchFormData(typeFormData);

//       setTypeFormData(data);
//     }
//   }, [
//     typeFormData,
//     setTypeFormData,
//     toast
//   ]);

//   return typeFormData;
// }
