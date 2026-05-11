export const calculateScore = (user, repos) => {
  const followers = user.followers || 0;
  const publicRepos = user.public_repos || 0;
  
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
  // Calculate a weighted score
  const score = (followers * 2) + (totalStars * 3) + (publicRepos * 1);
  
  let grade = 'C';
  let color = 'text-anchovy';
  let message = 'Keep building and sharing!';

  if (score > 10000) {
    grade = 'S';
    color = 'text-dusty'; 
    message = 'Legendary developer status.';
  } else if (score > 5000) {
    grade = 'A+';
    color = 'text-dusty';
    message = 'Outstanding open source contributions.';
  } else if (score > 1000) {
    grade = 'A';
    color = 'text-dusty';
    message = 'Excellent community presence.';
  } else if (score > 500) {
    grade = 'B+';
    color = 'text-sphinx';
    message = 'Strong developer profile.';
  } else if (score > 100) {
    grade = 'B';
    color = 'text-sphinx';
    message = 'Solid foundational profile.';
  }

  return { grade, score, message, color, totalStars };
};
