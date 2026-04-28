import axios from 'axios';

const BACKLOG_API_BASE_URL = import.meta.env.VITE_API_URL + '/backlog' || 'http://localhost:3000/backlog';

class BacklogService {
  getBacklogEntries() {
    return axios.get(BACKLOG_API_BASE_URL + "/");
  }

  createBacklogEntry(backlogEntry) {
    return axios.post(BACKLOG_API_BASE_URL + "/", backlogEntry);
  }

  getBacklogEntryById(id) {
    return axios.get(`${BACKLOG_API_BASE_URL}/${id}`);
  }

  updateBacklogEntry(id, updatedEntry) {
    return axios.put(`${BACKLOG_API_BASE_URL}/${id}`, updatedEntry);
  }

  deleteBacklogEntry(id) {
    return axios.delete(`${BACKLOG_API_BASE_URL}/${id}`);
  }
}

export default new BacklogService();