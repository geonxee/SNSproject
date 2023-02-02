const SERVER_URL = 'http://127.0.0.1:8000'
const postModal = document.getElementById("postModal")
const showModal = document.getElementById("showModal")
const closeModal = document.getElementById("closeModal")
const show = () => {
    postModal.style.display = 'flex';
}
const close = () => {
    postModal.style.display = 'none';
}
showModal.addEventListener('click', show);
closeModal.addEventListener('click', close);


async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


async function insertPosts() {
    let posts = await getPosts();
    posts.forEach(post => {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="${post.id}">
                <h2>${post.id}
                <h2>${post.title}</h2>
                <p>${post.content}</p>    
                <p>${post.author}</p>
            </div>
        `)
    })
}
insertPosts()


async function postArticle(article) {
    let token = getCookie('access_token');
    
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: article,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    let data = await response.json();
    return data
}

async function submitArticle() {
    let form = document.getElementById('form');
    let formData = new FormData(form);
    let result = await postArticle(formData);
    console.log(result);
}