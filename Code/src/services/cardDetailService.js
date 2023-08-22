import { getData } from "./dbService";

export const getCardDetail=(ward,line,card) => {
    return new Promise((resolve) => {
      const path="Houses/"+ward+"/"+line+"/MNZ"+card
      getData(path).then((response) => {
        console.log(response)
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