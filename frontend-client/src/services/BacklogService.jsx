import axios from 'axios';

const BACKLOG_API_BASE_URL =
  (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/backlog';

class BacklogService {

  getBacklogEntries() {
    return axios.get(`${BACKLOG_API_BASE_URL}/`, {
      withCredentials: true
    });
  }

  createBacklogEntry(backlogEntry) {
    return axios.post(`${BACKLOG_API_BASE_URL}/`, backlogEntry, {
      withCredentials: true
    });
  }

  getBacklogEntryById(id) {
    return axios.get(`${BACKLOG_API_BASE_URL}/${id}`, {
      withCredentials: true
    });
  }

  updateBacklogEntry(id, updatedEntry) {
    return axios.put(`${BACKLOG_API_BASE_URL}/${id}`, updatedEntry, {
      withCredentials: true
    });
  }

  deleteBacklogEntry(id) {
    return axios.delete(`${BACKLOG_API_BASE_URL}/${id}`, {
      withCredentials: true
    });
  }
}

export default new BacklogService();