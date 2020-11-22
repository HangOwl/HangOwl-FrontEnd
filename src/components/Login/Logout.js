import { useHistory } from 'react-router-dom'

function Logout() {

    let history = useHistory();
    localStorage.removeItem("user");
    history.push('/');
    
    return (
        <div>
        </div>
    );

  }
  
  
  export default Logout;