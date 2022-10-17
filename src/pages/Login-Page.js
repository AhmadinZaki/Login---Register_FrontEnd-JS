import { useState } from 'react';
import { Link } from 'react-router-dom';
import { logIn } from '../api/Authentication';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function LoginPage() {
	const [credential, setCredential] = useState({
		username: '',
		password: '',
	});

	const [showToast, setShowToast] = useState(false);
	const [errorLoginMessage, setErrorLoginMessage] = useState('');

	const navigate = useNavigate();

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setCredential({
			...credential,
			[key]: value,
		});
	};

	const handleLogIn = async (e) => {
		e.preventDefault();

		const response = await logIn(credential);
		// console.log(response);
		setTimeout(() => {
			if (response.token) {
				localStorage.setItem('TOKEN', `JWT ${response.token}`);
				navigate('/');
			} else {
				setErrorLoginMessage(response.message);
				setShowToast(true);
				setTimeout(() => {
					setShowToast(false);
				});
			}
		});
	};



	return (
		<div
			className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
		>
			<div className="col-md-6 col-sm-12">
				<h3 className="mb-md-5 mb-sm-3 text-center">
					Login
				</h3>
				<form onSubmit={handleLogIn}>
					<div className="mb-3">
						<label htmlFor="username" className="form-label">
							Username
						</label>
						<input type="text" className="form-control" id="username" name="username" value={credential.username || ''} onChange={handleChange} placeholder="input your username" />
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input type="password" className="form-control" id="password" name="password" autoComplete="on" value={credential.password || ''} onChange={handleChange} placeholder="input your password" />
					</div>

					<div className="d-grid gap-2">
						<button type="submit" className="btn shadow" disabled={credential.username === '' || credential.password === ''}>Login</button>
					</div>

				</form>
				<div className="mt-md-5 mt-sm-3 text-center">
					Don't have an account?{' '}
					<Link to="/signup">Sign Up</Link>
				</div>
			</div>
			<ToastContainer className="p-3" position="bottom-end">
				<Toast show={showToast} onClose={() => setShowToast(false)}>
					<Toast.Header>
						<strong className="me-auto">Error</strong>
					</Toast.Header>
					<Toast.Body>Message: {errorLoginMessage}</Toast.Body>
				</Toast>
			</ToastContainer>
		</div>
	);
}
