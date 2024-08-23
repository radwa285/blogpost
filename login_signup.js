const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');
const showBtns = document.getElementsByClassName('eye-btn');
const bioTextarea = document.getElementById('signup-bio');
const bioMessage = document.getElementById('bio-message');
function showHidePassword(showBtn) {
    const passwordFields = Array.from(showBtn.parentNode.querySelectorAll('input[type="password"], input[type="text"]'));
    passwordFields.forEach(field => {
        if (field.type === 'password') {
            field.type = 'text';
            showBtn.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            field.type = 'password';
            showBtn.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
}
showBtns[0].addEventListener('click', function() {
    showHidePassword(this);
});
showBtns[1].addEventListener('click', function() {
    showHidePassword(this);
});

signupBtn.addEventListener('click', function() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

loginBtn.addEventListener('click', function() {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});
async function handleLogin(email, password) {
    const messageElement = document.getElementById('login-message');
    let token = localStorage.getItem('authToken');
    let userId = localStorage.getItem('userId');
    let mail = localStorage.getItem('mail');
    let name = localStorage.getItem('name');
    let img = localStorage.getItem('image');
    let bio = localStorage.getItem('bio');
    let full = localStorage.getItem('full_image');

    if (token && userId) {
        messageElement.textContent = 'Login Successful!';
        messageElement.className = 'text-success';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            });

            console.log('Fetch request sent.');
            const data = await response.json();
            // console.log('Response received:', data);

            if (response.ok && data.data) {
                token = data.data.token;
                userId = data.data.user.id;
                mail = data.data.user.email;
                name = data.data.user.name;
                img = data.data.user.image;
                bio = data.data.user.bio;

                // console.log('Token received:', token);
                localStorage.setItem('authToken', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('email', mail);
                localStorage.setItem('username', name);
                
                localStorage.setItem('image', img);
                const full_image = `http://127.0.0.1:8000/storage/${img}`
                localStorage.setItem('full_image',full_image);
                localStorage.setItem('bio', bio);

                messageElement.textContent = 'Login Successful!';
                messageElement.className = 'text-success';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                handleLoginErrors(data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            messageElement.textContent = 'An error occurred. Please try again.';
            messageElement.className = 'text-danger';
        }
    }
}
function handleLoginErrors(errors) {
    const messageElement = document.getElementById('login-message');
    let errorMessage = '';

    if (typeof errors === 'string') {
        errorMessage = errors;
    } else if (typeof errors === 'object') {
        if (errors.email && errors.email.includes("The email field is required.")) {
            errorMessage += "Email: The email field is required.\n";
        }
        if (errors.password && errors.password.includes("The password field is required.")) {
            errorMessage += "Password: The password field is required.\n";
        }
    }
    messageElement.textContent = errorMessage.trim() || 'Login Failed!';
    messageElement.className = 'text-danger';
}

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Login form submitted.');
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        handleLogin(email, password);
});
signupForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    console.log('Signup form submitted.');
    
    const formData = new FormData();
    formData.append('name', document.getElementById('signup-name').value);
    formData.append('email', document.getElementById('signup-email').value);
    formData.append('bio', document.getElementById('signup-bio').value);
    formData.append('password', document.getElementById('signup-password').value);
    formData.append('image', document.getElementById('signup-image').files[0]);
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            body: formData
        });
        console.log('Fetch request sent.');
        const data = await response.json();
        console.log('Response received:', data);
        
        const messageElement = document.getElementById('signup-message');

        if (data.status && data.data && data.data.token) {
            const token = data.data.token;
            const userId = data.data.user && data.data.user.id;
          const img = data.data && data.data.user &&  data.data.user.image;
          const bio =data.data && data.data.user &&  data.data.user.bio;
          const mail=data.data&&data.data.user&&data.data.user.email;
          const name =data.data&&data.data.user&&data.data.user.name;

            console.log('Token received:', token);
            console.log('id received:', userId);
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('image',img );
            localStorage.setItem('bio',bio );
            localStorage.setItem("mail",mail);
             localStorage.setItem("name",name);
            
            messageElement.textContent = 'Sign Up Successful!';
            messageElement.className = 'text-success';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            console.log('Sign Up failed:', data.message);
            
            if (data.message && typeof data.message === 'object') {
                const errors = data.message;
                let errorMessages = '';
                
                for (const field in errors) {
                    if (errors.hasOwnProperty(field)) {
                        const fieldErrors = errors[field].filter(errorMessage => 
                            !errorMessage.includes('must be a string')
                        ).join(', ');

                        if (fieldErrors) {
                            errorMessages += `<p><strong>${field}:</strong> ${fieldErrors}</p>`;
                        }
                    }
                }
                
                messageElement.innerHTML = errorMessages || 'Sign Up Failed!';
            } else if (typeof data.message === 'string') {
                messageElement.textContent = data.message;
            } else {
                messageElement.textContent = 'Sign Up Failed!';
            }
            
            messageElement.className = 'text-danger';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        const messageElement = document.getElementById('signup-message');
        messageElement.textContent = 'An error occurred. Please try again later.';
        messageElement.className = 'text-danger';
    }
});