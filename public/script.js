document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;

        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, author })
        });

        if (response.ok) {
            const post = await response.json();
            addPostToDOM(post);
            form.reset();
        }
    });

    async function fetchPosts() {
        const response = await fetch('/posts');
        const posts = await response.json();
        posts.forEach(addPostToDOM);
    }

    function addPostToDOM(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>Author: ${post.author}</small>
            <button class="delete" data-id="${post._id}">Delete</button>
        `;

        postDiv.querySelector('.delete').addEventListener('click', async (e) => {
            const postId = e.target.getAttribute('data-id');

            const response = await fetch(`/posts/${postId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                postsDiv.removeChild(postDiv);
            }
        });

        postsDiv.appendChild(postDiv);
    }

    fetchPosts();
});
