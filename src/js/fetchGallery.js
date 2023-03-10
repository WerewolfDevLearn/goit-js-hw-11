import axios from 'axios';
import key from './key';
import { Notify } from 'notiflix';

export async function getImages(string, page) {
  try {
    const respons = await axios.get(
      `https://pixabay.com/api/?key=${key}&q=${string}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    const data = await respons.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
