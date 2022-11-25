// Get All Usable Elments 
const searchForm = document.querySelector('#search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    
    const searchTerm = searchInput.value;
    
    const searchLimit = document.getElementById('limit').value;
    
    if(searchTerm == ''){
        showMessage('Please Enter A Valid Search...', 'alert-danger');
    }
    searchInput.value='';

    fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
    .then(response => response.json())
    .then(data => {
        return data.data.children.map(data => data.data);
    })
    .then(results => {
        console.log(results);
        let output = '<div class="card card-columns">';

        results.forEach(post => {
            // Check For Image 
            let image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

            output += `<div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.selftext}</p>
              <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
              <hr>
              <span class="badge bg-secondary">Subreddit: ${post.subreddit}</span>
              <span class="badge bg-dark">Score: ${post.score}</span>
            </div>
          </div>
                `
          ;
        });

        output += '</div>';
        document.getElementById('results').innerHTML = output;
    })


});

function showMessage(message, className){
    const div = document.createElement('div');

    div.className = `alert mt-2 text-center ${className}`;

    div.appendChild(document.createTextNode(message));

    const section = document.getElementById('section');
    const create = document.getElementById('create');

    section.insertBefore(div, create);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2000);   
};