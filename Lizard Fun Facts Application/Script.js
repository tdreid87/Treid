// Unsplash image genorator linked to the expole page

const requestUrl =
'https://api.unsplash.com/search/photos?query=Lizards&client_id=He5j-MPsWPOUiPYEDBghqliC-l_LFdiRzL2ogTOcICg';
const getImagesButton = document.querySelector('.getImagesButton');
const imageToDisplay = document.querySelector('.imageToDisplay');

getImagesButton.addEventListener('click', async () => {
let randomImage = await getNewImage();
imageToDisplay.src = randomImage;
});

async function getNewImage() {
let randomNumber = Math.floor(Math.random() * 10);
return fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    let allImages = data.results[randomNumber];
    return allImages.urls.regular;
  });
}

// Image Hunter Flickr Generator linked to search page


let flickrData = null;

var searchButton = document.getElementById('searchButton');
searchButton.onclick = function() {
  let searchValue = document.getElementById("searchBox").value;
  search(searchValue);
};

//Search
async function search(searchValue) {
  try{
    var url = new URL('https://api.flickr.com/services/rest');
  
    let params = {
          method: 'flickr.photos.search',
          api_key: 'e8650f6c42271fe9fb709448e6710787',
          tags: searchValue,
          extras: 'url_n, owner_name, date_taken, views',
          page: 1,
          format: 'json',
          nojsoncallback: 1,
          per_page: 30,
        }
      //Adds the params to the url string
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      let response = await fetch(url);
      let data = await response.json();
      if(data){
        flickrData = data.photos.photo;
        displayData(flickrData);
      }
  }catch(err){
    console.log(err);
  }
}
//Display Data
function displayData(data) {
  let output = "";
  data.forEach(function(element, index) {
    output += `<div class="col-12 col-md-6 col-lg-4 mb-4" id="${index}">
      <div class="card w-100">
          <div class="mask">
          <img class="card-img-top" src="${element.url_n}" alt="Card image cap">
          </div>
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">
              <b>Owner: </b>${element.title}<br/>
              <b>Date Taken: </b>${element.datetaken}<br/>
              <b>Views: </b>${element.views}
            </p>
            <!-- Button trigger modal -->
            <button onclick="populateModal(${index})" type="button" class="btn btn-primary w-100" data-toggle="modal">
              View Image
            </button>
          </div>
      </div>
    </div>`;
  })
  if(output != null){
   document.getElementById("content").innerHTML = output;
  }       
}