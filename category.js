const SERVER_URL = "http://127.0.00.1:8000"

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function postCategory(post) {
    let token = getCookie('access_token');
    let response = await fetch(`${SERVER_URL}/blog/category`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    })
    let data = await response.json();
    return data
}

async function submitCategory() {
    let category = {
        name: document.getElementById('category').value,
    }
    let result = await postCategory(category);
    console.log(result);
}

