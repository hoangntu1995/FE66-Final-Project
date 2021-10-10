
import axios from "axios"
import { DOMAIN, USER_LOGIN, CYBERSOFTTOKEN ,ACCESS_TOKEN} from '../Util/Setting'

export class baseService {
    // get1 =(url)=>{
    //     return axios({
    //         url:`${DOMAIN}/${url}`,
    //         method:'GET',
    //         headers:{
    //             'Authorization':`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    //             'TokenCybersoft':CYBERSOFTTOKEN
    //        }
    //     })
    // }
    get = (url, data, maNhom) => {
        if (maNhom === null) {
            return axios({
                url: `${DOMAIN}/${url}${data}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    'TokenCybersoft': CYBERSOFTTOKEN
                }
            })
        } else {
            return axios({
                url: `${DOMAIN}/${url}${data}&maNhom=${maNhom}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                    'TokenCybersoft': CYBERSOFTTOKEN
                }
            })
        }
    }
    post = (url, data) => {
        return axios({
            url:`${DOMAIN}/${url}`,
            data:data,
            method:'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
               'TokenCybersoft':CYBERSOFTTOKEN
            }
        })
    }
    put = (url, data) => {
        return axios({
            url:`${DOMAIN}/${url}`,
            data:data,
            method:'PUT',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                'TokenCybersoft':CYBERSOFTTOKEN
           }
        })
    }
    delete = (url, data) => {
        return axios({
            url: `${DOMAIN}/${url}${data}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(USER_LOGIN)}`,
                'TokenCybersoft': CYBERSOFTTOKEN
            }
        })
    }
}