import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../api/Authentication';


export default function SignupPage() {
	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		passwordconfirm: '',
	});

	const [toastState, setToastState] = useState({
		show: false,
		title: '',
		message: '',
	});

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;

		setUser({
			...user,
			[key]: value,
		});
	};

	const handleSignUp = async (e) => {
		e.preventDefault();

		const { passwordconfirm, ...data } = user;
		// console.log(data);
		const response = await signUp(data);

		setTimeout(() => {
			if (response.status.includes('201')) {
				setToastState({
					...toastState,
					show: true,
					title: 'SUCCESS',
					message: response.message + ' \n' + 'Login To Continue',
				});
				setUser({
					username: '',
					email: '',
					password: '',
					passwordconfirm: '',
				});
			} else {
				setToastState({
					...toastState,
					show: true,
					title: 'ERROR',
					message: response.message,
				});
			}
			setTimeout(() => {
				setToastState({
					...toastState,
					show: false,
					title: '',
					message: '',
				});
			});
		});
	};



	return (
		<div className="card">
			<div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
				<div className="col-md-6 col-sm-12">
					<h3 className="mb-md-5 mb-sm-3 text-center">Register</h3>
					<form onSubmit={handleSignUp}>
						<div className="mb-3">
							<label htmlFor="username" className="form-label">Username</label>
							<input type="text" className="form-control" id="username" name="username" value={user.username || ''} onChange={handleChange} placeholder="input your username" />
						</div>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">Email</label>
							<input type="text" className="form-control" id="email" name="email" value={user.email || ''} onChange={handleChange} placeholder="input your email" />
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="form-label">Password</label>
							<input type="password" className="form-control" id="password" name="password" autoComplete="on" value={user.password || ''} onChange={handleChange} placeholder="input your password"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="form-label">Password Confirmation</label>
							<input type="password" className="form-control" id="passwordconfirm" name="passwordconfirm" autoComplete="on" value={user.passwordconfirm || ''} onChange={handleChange} placeholder="re-input your password" />
						</div>

						<div className="d-grid gap-2">
							<button type="submit" className="btn shadow" disabled={user.username === '' || user.role === '' || user.email === '' || user.password === '' || user.passwordconfirm === '' || user.password !== user.passwordconfirm} > Sign Up </button>
						</div>

					</form>
					<div
						className="mt-md-5 mt-sm-3 text-center">
						Already have an account?{' '}
						<Link to="/login" >Login</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
