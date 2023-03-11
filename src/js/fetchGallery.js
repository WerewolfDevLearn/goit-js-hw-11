import axios from 'axios';
const key = '17822127-e9a9a0a140ac0dca1ff979a25';

export async function getImages(string, page, prePage) {
  try {
    const respons = await axios.get(
      `https://pixabay.com/api/?key=${key}&q=${string}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${prePage}`
    );
    const data = await respons.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
