import { getData } from "./dbService";


export const getCardWardMapping=(cardNo) => {
    return new Promise((resolve) => {
      const path="CardWardMapping/MNZ"+cardNo
      getData(path).then((response) => {
        if(response!==null){
            resolve(response)
        }
        else{
            resolve (null)
        }
      })
        .catch((error) => {
            resolve(null)
        });
    });
  }