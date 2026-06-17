const API_BASE_URL = 'http://localhost:8000';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token') || sessionStorage.getItem('token') || null;
    this.user = null;
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
      } catch (e) {
        this.user = null;
      }
    }
  }

  setToken(token, remember = false) {
    this.token = token;
    if (token) {
      if (remember) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
    } else {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }

  setUser(user, remember = false) {
    this.user = user;
    if (user) {
      if (remember) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    } else {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    }
  }

  logout() {
    this.setToken(null);
    this.setUser(null);
  }

  isAuthenticated() {
    return !!this.token;
  }

  async request(path, options = {}) {
    const url = `${API_BASE_URL}${path}`;
    const headers = {
      ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        // Token expired or invalid, clear session
        this.logout();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error on ${path}:`, error);
      throw error;
    }
  }

  // Auth API
  async login(username, password, remember = false) {
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    this.setToken(data.access_token, remember);
    this.setUser(data.user, remember);
    return data.user;
  }

  async register(username, email, fullName, password) {
    return await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        full_name: fullName,
        password,
      }),
    });
  }

  async getMe() {
    const user = await this.request('/api/auth/me');
    this.setUser(user, !!localStorage.getItem('token'));
    return user;
  }

  async updateMe(fullName, password) {
    const body = {};
    if (fullName) body.full_name = fullName;
    if (password) body.password = password;
    
    const user = await this.request('/api/auth/me', {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    this.setUser(user, !!localStorage.getItem('token'));
    return user;
  }

  // Inventory API
  async getInventoryItems(category = null) {
    let path = '/api/inventory/items?limit=100';
    if (category) {
      path += `&category=${encodeURIComponent(category)}`;
    }
    return await this.request(path);
  }

  async getInventoryItem(id) {
    return await this.request(`/api/inventory/items/${id}`);
  }

  async createInventoryItem(item) {
    return await this.request('/api/inventory/items', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  async updateInventoryItem(id, item) {
    return await this.request(`/api/inventory/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  }

  async deleteInventoryItem(id) {
    return await this.request(`/api/inventory/items/${id}`, {
      method: 'DELETE',
    });
  }

  async recordInventoryMovement(itemId, type, quantity, reference = '', notes = '') {
    return await this.request('/api/inventory/movements', {
      method: 'POST',
      body: JSON.stringify({
        item_id: parseInt(itemId),
        movement_type: type,
        quantity: parseInt(quantity),
        reference,
        notes,
      }),
    });
  }

  async getInventoryMovements(itemId) {
    return await this.request(`/api/inventory/movements/${itemId}`);
  }

  async getLowStockItems() {
    return await this.request('/api/inventory/low-stock');
  }

  // Predictions API
  async getPredictions(statusFilter = null) {
    let path = '/api/predictions/models';
    if (statusFilter) {
      path += `?status_filter=${statusFilter}`;
    }
    return await this.request(path);
  }

  async createPredictionModel(model) {
    return await this.request('/api/predictions/models', {
      method: 'POST',
      body: JSON.stringify(model),
    });
  }

  async activatePredictionModel(id) {
    return await this.request(`/api/predictions/models/${id}/activate`, {
      method: 'POST',
    });
  }

  async archivePredictionModel(id) {
    return await this.request(`/api/predictions/models/${id}/archive`, {
      method: 'POST',
    });
  }

  async makePrediction(inputData, modelId = null) {
    const body = { input_data: inputData };
    if (modelId) body.prediction_id = parseInt(modelId);
    
    return await this.request('/api/predictions/predict', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // Analytics API
  async getReports(dataType = null) {
    let path = '/api/analytics/reports';
    if (dataType) {
      path += `?data_type=${dataType}`;
    }
    return await this.request(path);
  }

  async createReport(report) {
    return await this.request('/api/analytics/reports', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  }

  async deleteReport(id) {
    return await this.request(`/api/analytics/reports/${id}`, {
      method: 'DELETE',
    });
  }

  async getDashboardSummary() {
    return await this.request('/api/analytics/dashboard/summary');
  }

  async getInventoryByCategory() {
    return await this.request('/api/analytics/inventory/by-category');
  }

  async getInventoryValuation() {
    return await this.request('/api/analytics/inventory/valuation');
  }

  // Users API (Admin Only)
  async getUsers(role = null) {
    let path = '/api/users/';
    if (role) {
      path += `?role=${role}`;
    }
    return await this.request(path);
  }

  async updateUserRole(userId, role) {
    return await this.request(`/api/users/${userId}/role?role=${role}`, {
      method: 'PUT',
    });
  }

  async deactivateUser(userId) {
    return await this.request(`/api/users/${userId}/deactivate`, {
      method: 'POST',
    });
  }

  async activateUser(userId) {
    return await this.request(`/api/users/${userId}/activate`, {
      method: 'POST',
    });
  }

  async deleteUser(userId) {
    return await this.request(`/api/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async chatAI(message, history = [], onChunk = null) {
    const url = `${API_BASE_URL}/api/ai/chat`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    headers['Content-Type'] = 'application/json';

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulated = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      // SSE events are separated by double newline
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const text = line.slice(6);
          if (text) {
            accumulated += text;
            if (onChunk) {
              onChunk(text, accumulated);
            }
          }
        }
      }
    }

    return { content: accumulated };
  }

  async getKPIs() {
    return await this.request('/api/analytics/kpis');
  }

  async getSalesDaily(days = 30, sku = null) {
    let path = `/api/analytics/sales/daily?days=${days}`;
    if (sku) path += `&sku=${sku}`;
    return await this.request(path);
  }

  async getSalesByCategory(days = 30) {
    return await this.request(`/api/analytics/sales/by-category?days=${days}`);
  }

  async uploadSalesCSV(file) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.request('/api/upload/sales-csv', {
      method: 'POST',
      body: formData,
    });
  }

  async getForecast(sku, days = 7) {
    return await this.request(`/api/predictions/predict?sku=${sku}&days=${days}`);
  }
}

export const api = new ApiClient();
export default api;
