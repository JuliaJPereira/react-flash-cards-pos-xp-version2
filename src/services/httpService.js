import axios from 'axios';

export async function get(url) {
  const { data } = await axios.get(url);
  return data;
}
