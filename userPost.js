document.getElementById('confirm-delete').addEventListener('click', confirmDelete);
document.querySelector('.close').addEventListener('click', hideModal);
let postIdToDelete = null;

async function fetchUserPosts() {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}/posts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const postsData = await response.json();

        if (response.ok) {
            if (postsData.posts && Array.isArray(postsData.posts)) {
                displayPosts(postsData.posts);
            } else {
                console.error('Invalid posts data:', postsData);
            }
        } else {
            console.error('Failed to fetch posts:', postsData.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts found.</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'col-md-4 mb-4'; 
        postElement.innerHTML = `
            <div class="post-card" data-id="${post.id}">
                <h4><strong>${post.title}</strong></h4>
                <img src="${post.image ? `http://127.0.0.1:8000/storage/${post.image}` : 'default-image-url'}" alt="Post Image">
                <div class="post-content">${post.content}</div>
                <div class="tag">${post.tag ? `<strong><p>${post.tag}</p></strong>` : ''}</div>
                <div class="buttons">
                    <button class="btn del" onclick="showDeleteModal(${post.id})">Delete</button>
                    <button class="btn edit" onclick="editPost(${post.id})">Edit</button>
                </div>
            </div>
        `;
        postElement.querySelector('.post-card').addEventListener('click', function(event) {
            if (!event.target.classList.contains('btn')) {
                window.location.href = `displayPost.html?postId=${post.id}`;
            }
        });

        postsContainer.appendChild(postElement);
    });
}

function showDeleteModal(postId) {
    postIdToDelete = postId;
    document.getElementById('confirm-delete-modal').style.display = 'block';
}

async function confirmDelete() {
    if (postIdToDelete !== null) {
        await deletePost(postIdToDelete);
        postIdToDelete = null;
    }
    hideModal();
}

function hideModal() {
    document.getElementById('confirm-delete-modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === document.getElementById('confirm-delete-modal')) {
        hideModal();
    }
};

async function deletePost(postId) {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Post deleted successfully!');
            fetchUserPosts();
        } else {
            const errorData = await response.json();
            console.error('Delete error:', errorData);
            alert('Failed to delete post: ' + (errorData.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert('An error occurred. Please try again.');
    }
}

function editPost(postId) {
    const postElement = document.querySelector(`.post-card[data-id='${postId}']`);

    if (!postElement) {
        return;
    }

    const title = postElement.querySelector('h4').textContent;
    const content = postElement.querySelector('.post-content').textContent;
    document.getElementById('edit-post-id').value = postId;
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-content').value = content;
    document.getElementById('edit-post-modal').style.display = 'block';
}

function hideEditModal() {
    document.getElementById('edit-post-modal').style.display = 'none';
}
async function submitEditPost() {
    const postId = document.getElementById('edit-post-id').value;
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;
    const imageUrl = document.getElementById('edit-image').value;
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append('title', title);
    urlEncodedData.append('postContent', content);
    urlEncodedData.append('image', imageUrl); 

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}/post/${postId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlEncodedData.toString()
        });

        if (response.ok) {
            alert('Post updated successfully!');
            fetchUserPosts(); 
            hideEditModal(); 
        } else {
            const errorData = await response.json();
            console.error('Update error:', errorData);
            alert('Failed to update post: ' + (errorData.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Update error:', error);
        alert('An error occurred. Please try again.');
    }
}
fetchUserPosts();
