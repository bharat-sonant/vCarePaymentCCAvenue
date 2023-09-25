import {ref,get,update,set,remove} from 'firebase/database';
import {database} from '../Firebase.jsx';

export const getData=(path) => {
    
    return new Promise((resolve) => {
        get(ref(database,path)).then((snapshot) => {
            let data=snapshot.val();   
            resolve(data);
        });
    });
}

export const saveData=(path,data) => {
    return new Promise((resolve) => {
        update(ref(database,path),data);
        resolve("success");
    });
}

export const setData=(path,value) => {
    return new Promise((resolve) => {
        set(ref(database,path),value);
        resolve("success");
    });
}
export const RemoveData=(path) => {
    return new Promise((resolve) => {
        remove(ref(database,path));
        resolve("success");
    });
}