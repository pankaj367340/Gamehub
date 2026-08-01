// Simple localStorage leaderboard
const Leaderboard = {
  KEY: 'gamehub_scores',

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY) || '{}');
    } catch {
      return {};
    }
  },

  // higherIsBetter: true for score games, false for reaction time (lower is better)
  submit(game, score, higherIsBetter = true) {
    const data = this.getAll();
    if (!data[game]) data[game] = [];

    data[game].push({
      score,
      date: new Date().toISOString().slice(0, 10)
    });

    data[game].sort((a, b) => higherIsBetter ? b.score - a.score : a.score - b.score);
    data[game] = data[game].slice(0, 5); // keep top 5

    localStorage.setItem(this.KEY, JSON.stringify(data));
    return data[game];
  },

  get(game) {
    return this.getAll()[game] || [];
  },

  clear() {
    localStorage.removeItem(this.KEY);
  }
};
