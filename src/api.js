import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

export const getNotes = async () => {
  const { data } = await api.get('/notes');
  return data.data ?? data;
};

export const createNoteApi = async (note) => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNoteApi = async (id) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

export const getNoteStats = async () => {
  const { data } = await api.get('/notes/stats');
  return data.data ?? data;
};
