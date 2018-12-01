import {axiosReqGet,getToken} from '../../assets/js/public.js'


const state = {
  identificaImgUrl:{}
}

const getters = {
  identificaImgData : state => state.identificaImgUrl
}

const actions ={
  pushIdentificaImgUrl({commit},imgurlArr){
    commit('getIdentificaImgUrl',imgurlArr)
  },
}
const mutations = {
  getIdentificaImgUrl(state,imgurlArr){
    console.log(imgurlArr)
    if(imgurlArr[0] != null&& imgurlArr[1] !=null){
      state.identificaImgUrl[imgurlArr[0]] = imgurlArr[1];
    }
    if(imgurlArr[2] == '2'){
      console.log('111')
    }


  },
}

export default{
  state,
  getters,
  actions,
  mutations
}
