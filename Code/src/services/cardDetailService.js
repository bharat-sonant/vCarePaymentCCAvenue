import axios from "axios";
import dayjs from "dayjs";
import { getStoragePath, setAlertMessage } from "./commonService";
import { getData, saveData } from "./dbService";

export const getCardDetail = (ward, line, card) => {
  return new Promise((resolve) => {
    const path = "Houses/" + ward + "/" + line + "/MNZ" + card
    getData(path).then((response) => {
      if (response !== null) {
        const servingCount = response.servingCount != "" ? response.servingCount : 1;
        localStorage.setItem('name', response.name);
        localStorage.setItem('cardType', response.cardType);
        localStorage.setItem('houseTypeId', response.houseType);
        localStorage.setItem('servingCount', servingCount)
        resolve(response)
      }
      else {
        resolve(null)
      }
    })
      .catch((error) => {
        resolve(null)
      });
  });
}

export const getEntitiesCardDetail = (ward, line, card) => {
  return new Promise((resolve) => {
    const path = "Houses/" + ward + "/" + line + "/MNZ" + card + "/Entities"
    getData(path).then((response) => {
      if (response !== null) {
        resolve(response)
      }
      else {
        resolve(null)
      }
    })
      .catch((error) => {
        resolve(null)
      });
  });
}

export const saveEntityModifieRequestHistory = (preEntity, newEntity) => {
  return new Promise(async(resolve) => {
    const cardNo = localStorage.getItem('cardNo');
    const ward = localStorage.getItem('ward')
    // let newKey = 1;
    let path = "PaymentCollectionInfo/EntityModifieRequest/" + cardNo+"/";
    
    // const response = await getData(path);
    // if (response !== null) {
    //   let keyArray = Object.keys(response);
    //   newKey = Math.max(...keyArray) + 1;
    // }


    let dataObj = {
      preEntity: preEntity,
      reqEntity: newEntity,
      ward:ward,
      dateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      status:'Pending'
    }
    console.log(dataObj)
    localStorage.setItem('removePath', path);
    await saveData(path , dataObj).then(response => {
      console.log(response)
      resolve(response)
    });


  });
}

export const getHouseTypeJson = () => {
  return new Promise((resolve) => {
    const path = getStoragePath() + "Defaults%2FFinalHousesType.json?alt=media";
    axios.get(path).then((response) => {
      if (response.data !== null) {
        resolve(response.data)
      }
      else {
        resolve(null)
      }
    })
      .catch((error) => {
        resolve(null)
      });
  });
}