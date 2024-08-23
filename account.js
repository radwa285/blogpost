const email = localStorage.getItem('email');
const name = localStorage.getItem('username');
const img = localStorage.getItem('full_image');
const bio =localStorage.getItem('bio');
const token = localStorage.getItem('authToken');
const userId = localStorage.getItem('userId');
    document.getElementById('email').value = email || 'No email found';
    document.getElementById('public-author-name').value = name || 'No name found';
    document.getElementById('avatar').src = img || 'file:///C:/sportsBlogPost/updatedBlogPost/updatedBlogPost/storage/app/public/avatars/OoOMO8H3lh8NnTekbDkr1GscwEu7Z3qpX9Gm6WUB.png';
    document.getElementById("Bio").value = bio || 'this user has no bio';
    document.getElementById('upload-btn').addEventListener('click', function() {
        document.getElementById('edit-image').click();
    });
    
    document.getElementById('upload-btn').addEventListener('click', function() {
        document.getElementById('avatar-input').click();
    });

    document.getElementById('avatar-input').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('avatar').src = e.target.result;
                localStorage.setItem('image', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    document.getElementById('profile-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const updatedEmail = document.getElementById('email').value;
        const updatedName = document.getElementById('public-author-name').value;
        const updateBio =document.getElementById('Bio').value;
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: updatedEmail, name: updatedName ,bio:updateBio})
            });
            const data = await response.json();
            console.log('Update response:', data);

            if (data.status) {
                // alert('Profile updated successfully!');
                location.reload();
                localStorage.setItem('email', updatedEmail);
                localStorage.setItem('username', updatedName);
                localStorage.setItem('bio', updateBio);
            } else {
                alert('Failed to update profile: ' + data.message);
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('An error occurred. Please try again.');
        }
    });
    let my_posts = document.querySelector(".My_Posts");
    my_posts.addEventListener("click", myposts);
    function myposts(){
        setTimeout(() => {
            window.location.href = "userPost.html";
        }, 500);
    }
   
