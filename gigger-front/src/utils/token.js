export const token = () => {
    const user = localStorage.getItem('user')
    if(user){
        const parseUser = JSON.parse(user)
        return parseUser.token
    }
}

export const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };