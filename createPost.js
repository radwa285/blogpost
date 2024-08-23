
let add = document.querySelector(".add");
function format(command) {
    document.execCommand(command, false, null);
}
document.getElementById('file-input').addEventListener('change', function () {
    const fileName = this.files[0].name;
    document.getElementById('file-name').textContent = fileName;
    add.style.visibility = "hidden";
});

let text = document.querySelector(".post-title");
text.addEventListener("input", change);

function change() {
    text.style.color = "black";
    text.style.opacity = "1";
    text.style.fontSize = "25px";
    text.style.transition = "0.8s";
}
let publish = document.querySelector(".btn-publish");
publish.addEventListener('click', createPost);

async function createPost() {
    const token = localStorage.getItem('authToken'); 
    const userId = localStorage.getItem('userId'); 
    const formData = new FormData();
    const title = document.querySelector('#inside').value;
    const postContent = document.querySelector('.text-editor').innerHTML;
    const tagComment = document.querySelector('.comment').value;
    const imageFile = document.querySelector('#file-input').files[0];

    if (!title || !postContent) {
        alert("Title and content are required.");
        return;
    }

    console.log('User ID from localStorage:', userId); 

    if (!userId) {
        console.error('User ID is missing.');
        alert('User ID is missing. Please log in again.');
        return; 
    }

    formData.append('title', title);
    formData.append('postContent', postContent);
    if (imageFile) {
        formData.append('image', imageFile);
    }
    formData.append('tagComment', tagComment);
    formData.append('user_id', parseInt(userId, 10)); 

    const loadingLine = document.getElementById('loading-line');

    try {
        publish.textContent = 'Publishing...'; 
        loadingLine.style.width = '0%'; 
        loadingLine.style.display = 'block'; 

        setTimeout(() => { loadingLine.style.width = '50%'; }, 100);
        setTimeout(() => { loadingLine.style.width = '80%'; }, 300);

        const response = await fetch('http://127.0.0.1:8000/api/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Server Response:', errorText);
            throw new Error(`${response.status}`);
        }

        const data = await response.json();
        console.log('Post created:', data);

        loadingLine.style.width = '100%'; 
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    } finally {
        publish.textContent = 'Publish'; 
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
        setTimeout(() => { 
            loadingLine.style.display = 'none'; 
        }, 1000);
    }
}


let save = document.querySelector(".btn-close-save");
let clear = document.querySelector(".btn-clear-draft");
save.addEventListener("click", saveAndDraft);
clear.addEventListener("click", clearDraftFunction);

function saveAndDraft() {
    const title = document.querySelector('#inside').value;
    const postContent = document.querySelector('.text-editor').innerHTML;
    const tagComment = document.querySelector('.comment').value;
    const imageFile = document.querySelector('#file-input').files[0];

    localStorage.setItem('draftTitle', title);
    localStorage.setItem('draftContent', postContent);
    localStorage.setItem('draftComment', tagComment);

    if (imageFile) {
      
        localStorage.setItem('draftImageName', imageFile.name);
        const imageNameElement = document.querySelector('#file-name');
        imageNameElement.textContent = imageFile.name;
    } else {
        localStorage.removeItem('draftImageName');
    }

    alert('Draft saved!');
}
function clearDraftFunction() {
    localStorage.removeItem('draftTitle');
    localStorage.removeItem('draftContent');
    localStorage.removeItem('draftComment');
    localStorage.removeItem('draftImageName');

    document.querySelector('#inside').value = '';
    document.querySelector('.text-editor').innerHTML = '';
    document.querySelector('.comment').value = '';
    document.querySelector('#file-input').value = ''; 
    document.querySelector('#file-name').textContent = ''; 
    add.style.visibility = "visible";
    alert('Draft cleared!');
}

window.addEventListener('load', () => {
    const savedTitle = localStorage.getItem('draftTitle');
    const savedContent = localStorage.getItem('draftContent');
    const savedComment = localStorage.getItem('draftComment');
    const savedImageName = localStorage.getItem('draftImageName');

    if (savedTitle) {
        document.querySelector('#inside').value = savedTitle;
        change();
    }
    if (savedContent) {
        document.querySelector('.text-editor').innerHTML = savedContent;
    }
    if (savedComment) {
        document.querySelector('.comment').value = savedComment;
    }

    if (savedImageName) {
        const imageNameElement = document.querySelector('#file-name');
        imageNameElement.textContent = savedImageName;
        add.style.visibility = "hidden";
    }
});


