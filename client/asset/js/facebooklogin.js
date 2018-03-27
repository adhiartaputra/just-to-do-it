function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if (response.status === 'connected') {
      localStorage.setItem('facebookId', response.authResponse.userID)

  testAPI(response)
  } else {
  document.getElementById('status').innerHTML = 'login use facebook';
  }
}
function checkLoginState() {
  FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
  });
}
function logout () {
  window.FB.logout(function (response) {
    localStorage.clear()
    window.location = 'login.html'
  })
}

window.fbAsyncInit = function() {
  FB.init({
  appId      : 394969447581828,
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.8' // use graph api version 2.8
  });
  FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
  });
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI(token) {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('me', {fields: ['id', 'name', 'email', 'picture.width(150).height(150)']} ,function(response) {
  console.log('Successful login for: ' + response.name);
  console.log(response);
      localStorage.setItem('name', response.name)
      axios.post('http://localhost:3000/login', {
          idFB: response.id,
          email: response.email,
          fbToken: token.authResponse.accessToken,
          imgUrl: response.picture.data.url,
          name: response.name
      })
        .then(function (response_login) {
          // console.log(response_login,'<<<<<<<');
          console.log(response_login,'<<<<<<<<<< ');
          if(response_login.status === 200 && window.location.pathname === '/login.html') {
            localStorage.setItem('token', response_login.data.token);
            console.log('done - ' + localStorage.getItem('token'));
            window.location = 'index.html'
          }        
        })
  // document.getElementById('status').innerHTML =
  //     'Thanks for logging in, ' + response.name + '!';
  });
}




