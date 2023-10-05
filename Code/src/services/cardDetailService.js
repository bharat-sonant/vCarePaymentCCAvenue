import axios from "axios";
import { getStoragePath } from "./commonService";
import { getData } from "./dbService";

export const getCardDetail=(ward,line,card) => {
    return new Promise((resolve) => {
      const path="Houses/"+ward+"/"+line+"/MNZ"+card
      getData(path).then((response) => {
        if(response!==null){
          const servingCount=response.servingCount!=""?response.servingCount:1;
          localStorage.setItem('name',response.name);
          localStorage.setItem('cardType',response.cardType);
          localStorage.setItem('houseTypeId',response.houseType);
          localStorage.setItem('servingCount',servingCount)
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

  export const getHouseTypeJson=() => {
    return new Promise((resolve) => {
      const path=getStoragePath()+"Defaults%2FFinalHousesType.json?alt=media";

      axios.get(path).then((response) => {
        if(response.data!==null){
            resolve(response.data)
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