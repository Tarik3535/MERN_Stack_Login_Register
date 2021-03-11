import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  
	constructor(props) {
    super(props);
    this.state = {
    	username: '',
			password: '',
			
			loginUsername: '',
			loginPassword: '',
			
	  };

    this.usernameChange = this.usernameChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
		
		this.loginUsernameChange = this.loginUsernameChange.bind(this);
		this.loginPasswordChange = this.loginPasswordChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  usernameChange(event) {
    this.setState({username: event.target.value});
  }
	
	passwordChange(event) {
    this.setState({password: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
		
		const registered = {
			username: this.state.username,
			password: this.state.password,
		}
		
		console.log(registered)
		
		axios.post('https://mongodb-lessons-backend.run-eu-central1.goorm.io/signup', registered)
			.then(response => {
				
				//alert("api result: " + response.data);
				
				if(response.data == null){
					document.getElementById('registerAlert').innerHTML='Kayıt Başarılı. Lütfen giriş yapınız.';
					
					document.getElementById('registerAlert').style.backgroundColor='#77dd77';
					document.getElementById('registerAlert').style.color='#ffffff';
					
				}else{
					document.getElementById('registerAlert').innerHTML=this.state.username + ' kullanıcı adı zaten kullanılmakta. ';
					document.getElementById('registerAlert').style.backgroundColor='#ff3333';
					document.getElementById('registerAlert').style.color='#ffffff';
					document.getElementById('registerAlert').style.backgroundColor='#ff0033';
				}
			/*	
				if(response.data === null){
					
					this.setState({loginedUserData: {loginedUsername: response.data.username}});
					document.getElementById('registerAlert').innerHTML="Kayıt Başarılı. Lütfen giriş yapınız.";
					
					document.getElementById('registerAlert').style.backgroundColor="#77dd77";
					document.getElementById('registerAlert').style.color="#ffffff";
					
				}else{
					document.getElementById('registerAlert').innerHTML="Bu Kullanıcı  adı zaten kullanılmakta. ";
					
					document.getElementById('registerAlert').style.backgroundColor="#ff3333";
					document.getElementById('registerAlert').style.color="#ffffff";
					
					
				}
			*/
			
				console.log('User Registered.')
			})
			.catch(error => {
				console.log("Error: " + error)
				alert(error);
			});
		
		
	}
	
	//LOGIN
	
	loginUsernameChange(event) {
    this.setState({loginUsername: event.target.value});
  }
	
	loginPasswordChange(event) {
    this.setState({loginPassword: event.target.value});
  }
	
	loginSubmit(event) {
    event.preventDefault();
		
		const logined = {
			username: this.state.loginUsername,
			password: this.state.loginPassword,
			
		}
		
		axios.post('https://mongodb-lessons-backend.run-eu-central1.goorm.io/login', logined)
			.then(response => {
				//alert(response.data);
				
				if(response.data == null){
					
					document.getElementById('loginAlert').innerHTML='Kullanıcı Adı veya Şifreniz yanlış.';
					document.getElementById('loginAlert').style.backgroundColor='#ff3333';
					document.getElementById('loginAlert').style.color='#ffffff';
					
					
				}else if(response.data !== null){
					document.getElementById('loginAlert').innerHTML='Tekrar hoşgeldiniz ' + response.data.username;
					document.getElementById('loginAlert').style.backgroundColor='#77dd77';
					document.getElementById('loginAlert').style.color='#ffffff';
					
				}
			})
		
	}

  render() {
    return (
      <div className="App">
				<center>
					<h1>Register</h1>

					<form onSubmit={this.onSubmit}>
						<label>
							Kullanıcı Adı:
							<input type="username" value={this.state.username} onChange={this.usernameChange} />
						</label>

						<label>
							Şifreniz:
							<input type="password" value={this.state.password} onChange={this.passwordChange} />
						</label>
						<input type="submit" value="Submit" />

							<h1 id="registerAlert" className="registerAlert"></h1>
				</form>

					<br/>
					<hr/>
					<br/>

					<h1>Login</h1>

					<form onSubmit={this.loginSubmit}>
						<label>
							Kullanıcı Adı:
							<input type="username" value={this.state.loginUsername} onChange={this.loginUsernameChange} />
						</label>

						<label>
							Şifreniz:
							<input type="password" value={this.state.loginPassword} onChange={this.loginPasswordChange} />
						</label>
						<input type="submit" value="Submit" />

						
						<h1 id='loginAlert' className='loginAlert'>username: { this.state.loginedUsername }</h1>
						
						
					</form>
				</center>
				
			</div>
    );
  }
	
}

export default App;

