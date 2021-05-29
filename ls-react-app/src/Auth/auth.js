class Auth {
	constructor() {
		let res = localStorage.getItem('cookie');

		this.cookie = !res ? null : JSON.parse(res);

		this.authenticated = !res ? false : true;
	}

	login(data) {
		this.authenticated = true;
		this.cookie = data;

		localStorage.setItem('cookie', JSON.stringify(this.cookie));
	}

	logout() {
		this.authenticated = false;
		this.cookie = null;
		localStorage.removeItem('cookie');
	}

	isAuthenticated() {
		return this.authenticated;
	}

	getData() {
		return this.cookie;
	}
}

export default new Auth();
