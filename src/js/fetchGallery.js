import axios from 'axios';
import key from './key';

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
