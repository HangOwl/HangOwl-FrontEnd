import { useHistory } from 'react-router-dom'

function Logout() {

    let history = useHistory();
    window.Auth = null;
    window.Role = null;
    window.ID = null;
    window.Reserveid = null;
    window.barID = null;
    window.cusID = null;
    window.Name = null;
    window.Email = null;
    history.push('/');
    
    return (
        <div>
        </div>
    );

  }
  
  
  export default Logout;