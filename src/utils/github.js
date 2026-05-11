const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error('An error occurred while fetching user data');
  }
  
  return response.json();
};

export const fetchUserRepos = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100&sort=stars`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('User not found');
    }
    if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to fetch repositories');
  }
  
  return response.json();
};

export const fetchAllUserData = async (username) => {
  // Fetch user first to catch 404s accurately before fetching repos
  const user = await fetchUserData(username);
  const repos = await fetchUserRepos(username);
  return { user, repos };
};
