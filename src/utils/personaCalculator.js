export const calculatePersona = (user, repos) => {
  const langCounts = {};
  
  repos.forEach(repo => {
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    }
  });

  const sortedLangs = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  const topLang = sortedLangs[0] || 'Markdown';
  const allLangsStr = sortedLangs.join(' ').toLowerCase();

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  const frontendLangs = ['javascript', 'typescript', 'html', 'css', 'vue', 'svelte'];
  const backendLangs = ['python', 'go', 'rust', 'c++', 'java', 'c#', 'php', 'ruby'];
  
  const hasFrontend = frontendLangs.some(l => allLangsStr.includes(l));
  const hasBackend = backendLangs.some(l => allLangsStr.includes(l));

  if (totalStars > 500 && repos.length > 30) {
    return {
      title: "The Open Source Warrior",
      emoji: "⚔️",
      description: "High repo count with massive community impact and stars."
    };
  }

  if (topLang.toLowerCase() === 'python' || topLang.toLowerCase() === 'jupyter notebook') {
    return {
      title: "The Data Whisperer",
      emoji: "📊",
      description: "Python-heavy and likely training models or crunching data."
    };
  }

  if (hasFrontend && hasBackend && sortedLangs.length >= 4) {
    return {
      title: "The Full Stack Ghost",
      emoji: "👻",
      description: "Appears everywhere. Mixes frontend and backend seamlessly."
    };
  }

  if (hasBackend && !hasFrontend) {
    return {
      title: "The Silent Architect",
      emoji: "🏗️",
      description: "Mostly backend languages. Building the robust foundations."
    };
  }

  if (hasFrontend && !hasBackend) {
    return {
      title: "The UI Wizard",
      emoji: "🪄",
      description: "Master of the DOM. Making things look beautiful and interactive."
    };
  }

  return {
    title: "The Weekend Hacker",
    emoji: "🚀",
    description: "Building cool side projects whenever time permits."
  };
};
