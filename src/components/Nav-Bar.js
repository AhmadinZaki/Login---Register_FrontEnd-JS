import { Link, useNavigate } from 'react-router-dom';
import SideBar from './Side-Bar';
import { useState } from 'react';

export default function NavBar() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const navigate = useNavigate();

	const handleSignOut = () => {
		localStorage.removeItem('TOKEN');
		navigate('/login');
	};

	

	return (
		<>
			<nav
				className="navbar navbar-expand-lg "
			>
				<div className="container">
					<button
						className="btn btn-outline-danger"
						onClick={() => handleSignOut()}
					>
						kembali
					</button>
				</div>
			</nav>

			<SideBar
				show={show}
				handleClose={handleClose}
			/>
		</>
	);
}
