// js/stats.js - Statistics tracking, achievements and stats screen renderer
import { safeGet, safeSet, safeRemove } from './storage.js';
import { getProgress, getEndlessStats, ENDLESS_DIFFICULTIES } from './levels.js';
import { sfx, vibrate } from './settings.js';
import { toast } from './animations.js';

const STATS_KEY = 'stats.story';

export function getStoryStats() {
  return safeGet(STATS_KEY, {
    totalPlayTime: 0,
    currentStreak: 0,
    bestStreak: 0,
    bestTimes: { easy: null, medium: null, hard: null, expert: null }
  });
}

export function updateStoryStats(tier, timeSec, noMistakes) {
  const stats = getStoryStats();
  stats.totalPlayTime += timeSec;
  
  if (noMistakes) {
    stats.currentStreak += 1;
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }
  } else {
    stats.currentStreak = 0;
  }

  if (stats.bestTimes[tier] === null || timeSec < stats.bestTimes[tier]) {
    stats.bestTimes[tier] = timeSec;
  }

  safeSet(STATS_KEY, stats);
  return stats;
}

export function checkAchievementsOnWin(game, timeSec) {
  const progress = getProgress();
  const completedCount = Object.keys(progress).length;

  if (game.mode === 'story') {
    if (game.levelId === 1 && completedCount === 1) {
      toast("🏆 First Win!");
      sfx.achievement();
      vibrate([15, 30, 15]);
    }
    if (completedCount === 100) {
      toast("🏆 Halfway There!");
      sfx.achievement();
      vibrate([15, 30, 15]);
    }
    if (completedCount === 200) {
      toast("🏆 Sudoku Master!");
      sfx.achievement();
      vibrate([15, 30, 15]);
    }
  }

  if (game.mistakes === 0) {
    toast("⭐ No Mistakes!");
    sfx.achievement();
    vibrate([15, 30, 15]);
  }

  if (timeSec < 180) {
    toast("⚡ Speed Demon!");
    sfx.achievement();
    vibrate([15, 30, 15]);
  }

  const storyStats = getStoryStats();
  if (storyStats.currentStreak === 5) {
    toast("🔥 5 Level Streak!");
    sfx.achievement();
    vibrate([15, 30, 15]);
  }
}

export function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function renderStats() {
  const container = document.getElementById('stats-container');
  if (!container) return;
  container.innerHTML = '';

  const progress = getProgress();
  const storyStats = getStoryStats();
  const endlessStats = getEndlessStats();

  const completedCount = Object.keys(progress).length;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (completedCount / 200) * circumference;

  // 1. Progress Card with Circular Ring (FIX 5.1 & 5.2)
  const progressCard = document.createElement('div');
  progressCard.className = 'stats-card';
  progressCard.innerHTML = `
    <div class="stats-card-header">
      <svg><use href="#icon-trophy"/></svg>
      <span>Progress</span>
    </div>
    <div class="progress-ring-container">
      <div class="progress-ring-wrapper">
        <svg class="progress-ring-svg" viewBox="0 0 120 120">
          <circle class="progress-ring-bg" cx="60" cy="60" r="${radius}" stroke-width="8" fill="none"/>
          <circle class="progress-ring-bar" cx="60" cy="60" r="${radius}" stroke-width="8" fill="none"
            stroke-dasharray="${circumference}" stroke-dashoffset="${progressOffset}" stroke-linecap="round"/>
        </svg>
        <div class="progress-ring-text">
          <span class="ring-val">${completedCount}</span>
          <span class="ring-total">/ 200</span>
        </div>
      </div>
      <div class="progress-ring-caption">Levels Completed</div>
    </div>
  `;
  container.appendChild(progressCard);

  // 2. Streaks Card (FIX 5.2 & 5.3)
  const streaksCard = document.createElement('div');
  streaksCard.className = 'stats-card';
  streaksCard.innerHTML = `
    <div class="stats-card-header">
      <svg><use href="#icon-flame"/></svg>
      <span>Streaks</span>
    </div>
    <div class="stats-row"><span>Current Win Streak</span><span>${storyStats.currentStreak}</span></div>
    <div class="stats-row"><span>Best Win Streak</span><span>${storyStats.bestStreak}</span></div>
  `;
  container.appendChild(streaksCard);

  // 3. Best Times Card with Horizontal Bar Charts (FIX 5.2 & 5.4)
  const timesCard = document.createElement('div');
  timesCard.className = 'stats-card';

  const validTimes = Object.values(storyStats.bestTimes).filter(t => t !== null);
  const minTime = validTimes.length > 0 ? Math.min(...validTimes) : 1;

  let timesHTML = `
    <div class="stats-card-header">
      <svg><use href="#icon-clock"/></svg>
      <span>Best Times</span>
    </div>
  `;

  const tiers = [
    { key: 'easy', label: 'Easy', fillClass: 'fill-easy' },
    { key: 'medium', label: 'Medium', fillClass: 'fill-medium' },
    { key: 'hard', label: 'Hard', fillClass: 'fill-hard' },
    { key: 'expert', label: 'Expert', fillClass: 'fill-expert' }
  ];

  tiers.forEach(tier => {
    const timeVal = storyStats.bestTimes[tier.key];
    const timeStr = timeVal ? formatTime(timeVal) : '--:--';
    const barPct = timeVal ? Math.min(100, Math.max(15, Math.round((minTime / timeVal) * 100))) : 0;

    timesHTML += `
      <div class="time-bar-row">
        <div class="time-bar-label">
          <span>${tier.label}</span>
          <span>${timeStr}</span>
        </div>
        <div class="time-bar-track">
          <div class="time-bar-fill ${tier.fillClass}" style="width: ${barPct}%;"></div>
        </div>
      </div>
    `;
  });

  timesCard.innerHTML = timesHTML;
  container.appendChild(timesCard);

  // 4. Endless Mode Card (FIX 5.2)
  const endlessCard = document.createElement('div');
  endlessCard.className = 'stats-card';
  let endlessHTML = `
    <div class="stats-card-header">
      <svg><use href="#icon-star"/></svg>
      <span>Endless Mode</span>
    </div>
  `;

  const endlessDiffs = [
    { key: 'easy', label: 'Easy', color: '#22c55e' },
    { key: 'medium', label: 'Medium', color: '#4f8cff' },
    { key: 'hard', label: 'Hard', color: '#f59e0b' },
    { key: 'expert', label: 'Expert', color: '#ef4444' }
  ];

  endlessDiffs.forEach(d => {
    const st = endlessStats[d.key] || { played: 0, won: 0, bestTime: null };
    const timeStr = st.bestTime ? formatTime(st.bestTime) : '--:--';
    endlessHTML += `
      <div class="stats-row">
        <span><span class="diff-dot" style="background-color: ${d.color};"></span>${d.label}</span>
        <span>${st.won}/${st.played} won (Best: ${timeStr})</span>
      </div>
    `;
  });

  endlessCard.innerHTML = endlessHTML;
  container.appendChild(endlessCard);

  // 5. Reset Stats Button (FIX 5.5)
  const resetBtnContainer = document.createElement('div');
  resetBtnContainer.style.marginTop = '10px';
  resetBtnContainer.innerHTML = `
    <button id="btn-reset-stats-page" class="btn btn-outline-danger btn-lg">
      <svg style="width: 18px; height: 18px; stroke: currentColor; fill: none; margin-right: 8px;"><use href="#icon-warning"/></svg>
      <span>Reset Statistics</span>
    </button>
  `;
  container.appendChild(resetBtnContainer);

  const resetBtn = resetBtnContainer.querySelector('#btn-reset-stats-page');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      sfx.tap();
      document.getElementById('reset-confirm-modal').classList.remove('hidden');
    });
  }
}
