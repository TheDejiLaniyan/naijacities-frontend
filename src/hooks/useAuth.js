import {useSelector} from 'react-redux'
import {selectCurrentToken} from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'


const useAuth = () => {
  let token = useSelector(selectCurrentToken)
  let isTier2 = false
  let isTier3 = false
  let status = 'Tier1'

  if(token){
    const decoded = jwtDecode(token)
    const {username, roles} = decoded.UserInfo

    isTier2 = roles.includes('Tier2')
    isTier3 = roles.includes('Tier3')

    if(isTier2) status = 'Tier2'
    if(isTier3) status = 'Tier3'
    return {username, roles, status, isTier3,isTier2}
  }
  return {username:'', roles:[],isTier3, isTier2, status}

}

export default useAuth