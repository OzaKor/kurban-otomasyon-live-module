import axios from '@/lib/axios';

// Types for our API responses
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

// 1. GET Example - Fetching data
async function fetchUsers(token?: string): Promise<User[]> {
  try {
    // With token
    const response = await axios.get<User[]>('/users', { headers: { Authorization: `Bearer ${token}` } });
    
    // Without token
    // const response = await axios.get<User[]>('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// 2. GET with Query Parameters Example
async function searchUsers(query: string, token?: string): Promise<User[]> {
  try {
    const response = await axios.get<User[]>('/users/search', {
      params: { q: query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

// 3. POST Example - Creating data
async function createUser(userData: CreateUserDto, token?: string): Promise<User> {
  try {
    const response = await axios.post<User>('/users', userData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// 4. PUT Example - Full update
async function updateUser(id: number, userData: Partial<CreateUserDto>, token?: string): Promise<User> {
  try {
    const response = await axios.put<User>(`/users/${id}`, userData, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// 5. PATCH Example - Partial update
async function updateUserEmail(id: number, email: string, token?: string): Promise<User> {
  try {
    const response = await axios.patch<User>(
      `/users/${id}/email`,
      { email },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user email:', error);
    throw error;
  }
}

// 6. DELETE Example
async function deleteUser(id: number, token?: string): Promise<void> {
  try {
    await axios.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// 7. Example with custom headers
async function uploadFile(file: File, token: string): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post<{ url: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// 8. Example with response type and custom config
async function getUserProfile(userId: number, token: string): Promise<User> {
  try {
    const response = await axios.get<User>(`/users/${userId}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000, // 5 seconds timeout
      params: {
        include: 'posts,comments',
        fields: 'id,name,email,posts'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

// Login Example
async function login(email: string, password: string): Promise<User> {
  try {
    const response = await axios.post<User>(`/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// Logout Example
async function logout(token: string): Promise<void> {
  try {
    await axios.post('/users/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Example usage in a React component
/*
async function ExampleComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const token = 'your-auth-token';

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(token);
        setUsers(data);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // ... rest of your component
}
*/

export {
  fetchUsers,
  searchUsers,
  createUser,
  updateUser,
  updateUserEmail,
  deleteUser,
  uploadFile,
  getUserProfile,
  login,
  logout
};

export type { User, CreateUserDto };
