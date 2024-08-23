window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post_id')|| urlParams.get('postId');
    
    if (postId) {
        fetchPostDetails(postId);
    } else {
        console.error('No post ID provided in the URL.');
    }
};

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
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }
function fetchPostDetails(postId) {
    const token = localStorage.getItem('authToken');

    fetch(`http://127.0.0.1:8000/api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status && data.post) {
            const post = data.post;
            const imageUrl = post.image ? `http://127.0.0.1:8000/storage/${post.image}` : 'file:///C:/sportsBlogPost/updatedBlogPost/updatedBlogPost/storage/app/public/postsImage/upTIZcbNZSfDyQVfZCL7RcGUMsMlR7gp7f5BXw2I.jpg';
            
            document.getElementById('post-image').src = imageUrl;
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-content').textContent = post.content;
            document.getElementById('post-tag').textContent = post.tag;
            if (post.created_at) {
                document.getElementById('post-createAt').textContent = getTime(post.created_at); 
                document.querySelector(".label1").style.visibility="visible";
            } else {
                document.getElementById('post-createAt').textContent = " ";
                document.querySelector(".label1").style.visibility="hidden";
                document.querySelector(".label2").style.visibility="hidden";
            }
           
           
        } else {
            console.error('Post not found.');
        }
    })
    .catch(error => {
        console.error('Error fetching post details:', error);
    });
}
