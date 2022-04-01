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