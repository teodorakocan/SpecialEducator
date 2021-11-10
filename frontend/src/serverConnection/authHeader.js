export function authHeader(){
    const token = localStorage.getItem('loggedIn');
    if(token){
        return {Authorization: `Bearer ${token}`};
    } else{
        return {};
    }
}