import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Components/login/Login.jsx';
import Register from './Components/register/Register.jsx';
import NavBar from './Components/navBar/NavBar.jsx';
import ProtectedRoute from './Components/routing/ProtectedRoute';
import EmployeeManagement from './Components/employees/EmployeeManagement';
import NotAuthorizedRoute from './Components/routing/NotAuthorizedRoute';

function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<Switch>
					<ProtectedRoute exact path="/" component={EmployeeManagement} />
					<NotAuthorizedRoute exact path="/login" component={Login} />
					<NotAuthorizedRoute exact path="/register" component={Register} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
