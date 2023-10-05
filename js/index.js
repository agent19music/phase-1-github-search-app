const form = document.querySelector('#github-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  let searchBox = document.getElementById('search');
let searchInfo = searchBox.value;
  displayData(searchInfo);
});


function displayData(searchInfo){
  let url = `https://api.github.com/search/users?q=${searchInfo}`
  fetch(url,{Headers:{'Accept': 'application/vnd.github.v3+json'}}
    )
  
  .then(res => res.json())
  .then (data =>{
    console.log(data);
    let userDetails = document.getElementById('user-list')
    userDetails.innerHTML = ``;
    if(data.items.length === 0){
      userDetails.innerHTML = `<p>Error:   No users Found !</p>`;
      return;
    }
    for (let item of data.items){
      const li = document.createElement('li')
      li.innerHTML =`
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src ="${item.avatar_url}" alt="User avatar" style="width: 50px; height: 50px; border-radius: 50%;">
        <div>
          <p><a id="userName" href="${item.html_url}">${item.login}</a></p>
          <p>ID: ${item.id}</p>
          <p><a href ="${item.html_url}" target ="blank">Link to profile</a></p>
        </div>
      </div>
      `
      userDetails.appendChild(li);
      li.querySelector('#userName').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('repo-header').textContent = `${item.login}'s repo list`;
        displayRepos(item.repos_url); 
      });
    }
  })

}

function displayRepos(reposUrl) {
  fetch(reposUrl)
  .then(res => res.json())
  .then(repos => {
    const ul = document.getElementById('repos-list');
    ul.innerHTML = '';
    for (let repo of repos) {
      const li = document.createElement('li');
      li.textContent = repo.name;
      ul.appendChild(li);
    }
    document.getElementById('repo-container').appendChild(ul);
  });
}

