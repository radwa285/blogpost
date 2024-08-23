
let profBtn = document.querySelector(".btn");
let form = document.querySelector(".profile");
let close = document.querySelector(".fa-times");
let create = document.querySelector(".create");
let account = document.querySelector(".account");
const userImage = localStorage.getItem('full_image');
const userImgButton = document.getElementById('user_img');

if (userImage) {
    userImgButton.style.backgroundImage = `url(${userImage})`;
    userImgButton.style.backgroundSize = 'cover'; 
    userImgButton.style.backgroundPosition = 'center'; 
    userImgButton.style.backgroundRepeat = 'no-repeat';
    userImgButton.style.padding = '0'; 
    userImgButton.style.border = 'none';
    userImgButton.style.height="40px";
    userImgButton.style.width="60px";
    userImgButton.style.borderRadius="50px"
     
}

close.addEventListener("click", disapper);
function disapper() {
    form.style.visibility = "hidden";
}

profBtn.addEventListener("click", appear);
function appear() {
    form.style.visibility = "visible";
}

document.addEventListener('click', function(event) {
    const isClickInsideForm = form.contains(event.target);
    const isClickInsideButton = profBtn.contains(event.target);

    if (!isClickInsideForm && !isClickInsideButton) {
        form.style.visibility = "hidden";
    }
});



create.addEventListener("click", creatPost);
function creatPost() {
    window.location = "createPost.html"; 
}

account.addEventListener("click", profile);
function profile() {
    window.location = "account.html"; 
}

document.getElementById('logoutBtn').addEventListener('click', async function() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        const data = await response.json();
        
        if (data.status) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('mail');
            localStorage.removeItem('name');
            window.location.href = 'login_signup.html'; 
        } else {
            console.error('Logout failed:', data.message);
        }
    } catch (error) {
        console.error('An error occurred during logout:', error);
    }
});


function fetchPosts() {
    const token = localStorage.getItem('authToken');
    const img = localStorage.getItem('image');

    if (!token) {
        console.error('No token found. User might not be logged in.');
        return;
    }

    fetch('http://127.0.0.1:8000/api/posts', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Token stored:', localStorage.getItem('authToken'));
        console.log('Fetched posts:', data);
        if (data.status && Array.isArray(data.posts) && data.posts.length > 0) {
            const postsContainer = document.getElementById('posts-container');
            user_img.src = localStorage.getItem('image');
            postsContainer.innerHTML = '';
        
            data.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post-card');
                postElement.dataset.postId = post.id; 
                
             function getTime(dateString) {
                    const now = new Date();
                    const postDate = new Date(dateString);
                    const diffInSeconds = Math.floor((now - postDate) / 1000);
                    const diffInMinutes = Math.floor(diffInSeconds / 60);
                    const diffInHours = Math.floor(diffInMinutes / 60);
                    const diffInDays = Math.floor(diffInHours / 24);
                    const diffInMonths = Math.floor(diffInDays / 30);
                    const diffInYears = Math.floor(diffInDays / 365);
        
                    if (diffInYears > 0) {
                        return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
                    } else if (diffInMonths > 0) {
                        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
                    } else if (diffInDays > 0) {
                        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
                    } else if (diffInHours > 0) {
                        return `${diffInHours} h${diffInHours > 1 ? 's' : ''} ago`;
                    } else if (diffInMinutes > 0) {
                        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
                    } else {
                        return 'Just now';
                    }
                }
              
                const createdAtDate = post.created_at ? getTime(post.created_at) : '';
                const imageUrl = post.image ? `http://127.0.0.1:8000/storage/${post.image}` : 'file:///C:/sportsBlogPost/updatedBlogPost/updatedBlogPost/storage/app/public/postsImage/upTIZcbNZSfDyQVfZCL7RcGUMsMlR7gp7f5BXw2I.jpg';
                postElement.innerHTML = `
                 <img src="${imageUrl}" alt="Post Image" >
                    <h2>${post.title}</h2>
                    ${post.tag ? `<p><strong>tag :</strong> ${post.tag}</p>` : ''}
                    ${createdAtDate ? `<p> <strong>date:</strong>${createdAtDate}</p>` : ''}
                `;
                postElement.addEventListener('click', function() {
                    const postId = this.dataset.postId;
                    window.location.href = `displayPost.html?post_id=${postId}`;
                });

                postsContainer.appendChild(postElement);
            });
        } else {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = 'No posts available.';
        }
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
}

fetchPosts();
 
 
