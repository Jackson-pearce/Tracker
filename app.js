// Habit Tracker App - Dark Anime Aesthetic with Analytics
// Theme Presets
const THEMES = {
    crimson: {
        name: 'Crimson Black',
        voidBlack: '#000000',
        primary: '#dc2626',
        secondary: '#ffffff',
        tertiary: '#991b1b',
        textWhite: '#ffffff',
        textDim: '#e5e5e5'
    },
    ocean: {
        name: 'Ocean Blue',
        voidBlack: '#001f3f',
        primary: '#0077be',
        secondary: '#7fdbff',
        tertiary: '#003d5c',
        textWhite: '#ffffff',
        textDim: '#b3d9ff'
    },
    toxic: {
        name: 'Toxic Green',
        voidBlack: '#0a0a0a',
        primary: '#39ff14',
        secondary: '#ccff00',
        tertiary: '#1a5c00',
        textWhite: '#ffffff',
        textDim: '#ccffcc'
    },
    royal: {
        name: 'Royal Purple',
        voidBlack: '#2d0052',
        primary: '#8b00ff',
        secondary: '#e0b0ff',
        tertiary: '#4b0082',
        textWhite: '#ffffff',
        textDim: '#dda0ff'
    }
};

const RANKS = [
    { name: 'BRONZE', threshold: 0, color: '#cd7f32' },
    { name: 'SILVER', threshold: 500, color: '#c0c0c0' },
    { name: 'GOLD', threshold: 1500, color: '#ffd700' },
    { name: 'PLATINUM', threshold: 3000, color: '#e5e4e2' },
    { name: 'DIAMOND', threshold: 6000, color: '#b9f2ff' },
    { name: 'EMERALD', threshold: 10000, color: '#50c878' },
    { name: 'MASTER', threshold: 20000, color: '#ff00ff' },
    { name: 'DEVIL', threshold: 40000, color: '#ff0000' },
    { name: 'MONSTER', threshold: 80000, color: '#8b0000' },
    { name: 'GRANDMASTER', threshold: 150000, color: '#ffffff' },
    { name: 'THE DISCIPLINE', threshold: 500000, color: '#00ffff' }
];

const BOSS_ROSTER = [
    { name: "THE VOID TITAN", hp: 1000, color: "#dc2626" },
    { name: "ABYSSAL LEVIATHAN", hp: 2500, color: "#0077be" },
    { name: "CELESTIAL DRAGON", hp: 5000, color: "#ffd700" },
    { name: "CHRONOS KEEPER", hp: 10000, color: "#ffffff" },
    { name: "CHAOS EMPEROR", hp: 25000, color: "#991b1b" }
];

class HabitTracker {
    constructor() {
        this.habits = this.loadHabits();
        this.completionHistory = this.loadCompletionHistory();
        this.userProfile = this.loadUserProfile();
        this.currentQuoteIndex = 0;
        this.quotesDatabase = this.getQuotesDatabase();
        this.tipsDatabase = this.getTipsDatabase();

        // Boss Data
        this.boss = {
            name: "THE VOID TITAN",
            hp: 1000,
            maxHp: 1000,
            active: false
        };

        this.init();
    }

    // Content Databases
    getQuotesDatabase() {
        return [
            // Anime Quotes - Discipline & Willpower
            { text: "THE STRONG DON'T NEED REASONS TO FIGHT", author: "YUJIRO HANMA", source: "BAKI", category: "ANIME" },
            { text: "I'M NOT TALENTED, I JUST WORK HARDER THAN ANYONE ELSE", author: "IPPO MAKUNOUCHI", source: "HAJIME NO IPPO", category: "ANIME" },
            { text: "THE ULTIMATE FORM OF STRENGTH IS BORN FROM THE ULTIMATE FORM OF CONCENTRATION", author: "MIYAMOTO MUSASHI", source: "VAGABOND", category: "ANIME" },
            { text: "I'LL LEAVE TOMORROW'S PROBLEMS TO TOMORROW'S ME", author: "SAITAMA", source: "ONE PUNCH MAN", category: "ANIME" },
            { text: "100 PUSH-UPS, 100 SIT-UPS, 100 SQUATS, AND 10KM RUN. EVERY SINGLE DAY", author: "SAITAMA", source: "ONE PUNCH MAN", category: "ANIME" },
            { text: "THE ONLY THING WE'RE ALLOWED TO DO IS BELIEVE THAT WE WON'T REGRET THE CHOICE WE MADE", author: "LEVI ACKERMAN", source: "ATTACK ON TITAN", category: "ANIME" },
            { text: "IF YOU DON'T TAKE RISKS, YOU CAN'T CREATE A FUTURE", author: "MONKEY D. LUFFY", source: "ONE PIECE", category: "ANIME" },
            { text: "HARD WORK IS WORTHLESS FOR THOSE THAT DON'T BELIEVE IN THEMSELVES", author: "NARUTO UZUMAKI", source: "NARUTO", category: "ANIME" },
            { text: "A PERSON GROWS UP WHEN THEY OVERCOME HARDSHIPS", author: "JIRAIYA", source: "NARUTO", category: "ANIME" },
            { text: "THE WORLD ISN'T PERFECT. BUT IT'S THERE FOR US, DOING THE BEST IT CAN", author: "ROY MUSTANG", source: "FMA", category: "ANIME" },

            // Bodybuilding & Discipline
            { text: "DISCIPLINE IS DOING WHAT NEEDS TO BE DONE, EVEN WHEN YOU DON'T WANT TO", author: "UNKNOWN", source: "FITNESS", category: "BODYBUILDING" },
            { text: "THE PAIN YOU FEEL TODAY WILL BE THE STRENGTH YOU FEEL TOMORROW", author: "ARNOLD SCHWARZENEGGER", source: "BODYBUILDING", category: "BODYBUILDING" },
            { text: "YOUR BODY CAN STAND ALMOST ANYTHING. IT'S YOUR MIND YOU HAVE TO CONVINCE", author: "ANDREW MURPHY", source: "FITNESS", category: "BODYBUILDING" },
            { text: "THE ONLY BAD WORKOUT IS THE ONE THAT DIDN'T HAPPEN", author: "FITNESS WISDOM", source: "GYM", category: "BODYBUILDING" },
            { text: "CONSISTENCY IS WHAT TRANSFORMS AVERAGE INTO EXCELLENCE", author: "UNKNOWN", source: "FITNESS", category: "BODYBUILDING" },

            // Monster Discipline Theme
            { text: "MONSTERS AREN'T BORN. THEY'RE FORGED THROUGH DISCIPLINE", author: "DISCIPLINE", source: "MINDSET", category: "DISCIPLINE" },
            { text: "THE PAIN OF DISCIPLINE OR THE PAIN OF REGRET - CHOOSE WISELY", author: "JIM ROHN", source: "MINDSET", category: "DISCIPLINE" },
            { text: "DISCIPLINE IS THE BRIDGE BETWEEN GOALS AND ACCOMPLISHMENT", author: "JIM ROHN", source: "MINDSET", category: "DISCIPLINE" },
            { text: "ORDINARY PEOPLE WITH EXTRAORDINARY DISCIPLINE BECOME LEGENDS", author: "MINDSET", source: "DISCIPLINE", category: "DISCIPLINE" },
            { text: "EVERY MONSTER WAS ONCE WEAK. WHAT CHANGED? DAILY DISCIPLINE", author: "UNKNOWN", source: "MINDSET", category: "DISCIPLINE" }
        ];
    }

    getTipsDatabase() {
        return {
            bodybuilding: {
                title: "BODYBUILDING ARSENAL",
                tips: [
                    {
                        title: "Progressive Overload",
                        content: "Increase weight, reps, or sets gradually. Your muscles adapt only when challenged consistently. Track every workout."
                    },
                    {
                        title: "Compound Movements First",
                        content: "Start with squats, deadlifts, bench press, overhead press. These build the foundation of strength and mass."
                    },
                    {
                        title: "Protein Timing",
                        content: "0.8-1g protein per lb bodyweight. Spread across 4-6 meals. Post-workout window is crucial for recovery."
                    },
                    {
                        title: "Rest & Recovery",
                        content: "Muscles grow during rest, not training. 7-9 hours sleep minimum. Take deload weeks every 6-8 weeks."
                    }
                ]
            },
            skincare: {
                title: "SKINCARE PROTOCOL",
                tips: [
                    {
                        title: "Daily Cleansing Ritual",
                        content: "Morning: Gentle cleanser → Vitamin C serum → Moisturizer → SPF 50. Night: Double cleanse → Retinol → Night cream."
                    },
                    {
                        title: "Sun Protection Always",
                        content: "SPF 50+ every single day. Reapply every 2 hours outdoors. UV damage is permanent and cumulative."
                    },
                    {
                        title: "Retinol Integration",
                        content: "Start 0.025% twice weekly. Build to daily 0.1%. Game-changer for anti-aging and skin texture."
                    }
                ]
            },
            looksmaxxing: {
                title: "LOOKSMAXXING STRATEGIES",
                tips: [
                    {
                        title: "Facial Structure Enhancement",
                        content: "Mewing (proper tongue posture). Chew hard foods. Low body fat reveals bone structure. 10-12% for men."
                    },
                    {
                        title: "Posture Maximization",
                        content: "Chin tucked, chest up, shoulders back. Practice wall angels daily. Walk like you own the room."
                    }
                ]
            },
            icons: {
                title: "ICON ROUTINES - BARRETT & CHICO",
                tips: [
                    {
                        title: "Jordan Barrett Aesthetic",
                        content: "Lean physique (8-10% BF). Model bone structure emphasis. Minimal grooming, natural look. Confidence through discipline."
                    },
                    {
                        title: "Chico Lachowski Method",
                        content: "Symmetrical focus. Natural aesthetics. Low body fat reveals features. Effortless appearance through hidden effort."
                    }
                ]
            },
            nutrition: {
                title: "NUTRITION PROTOCOL",
                tips: [
                    {
                        title: "Macro Accuracy",
                        content: "Protein 1g/lb bodyweight. Fats 0.3g/lb. Carbs fill the rest. Scale food raw. Precision is key."
                    },
                    {
                        title: "Hydration Strategy",
                        content: "4L water daily minimum. Electrolytes (Salt/Potassium) upon waking. Hydrated muscles are strong muscles."
                    },
                    {
                        title: "Meal Prep Discipline",
                        content: "Cook 3-4 days in bulk. Tupperware life. No missed meals. No 'emergency' fast food."
                    }
                ]
            },
            sleep: {
                title: "SLEEP & RECOVERY",
                tips: [
                    {
                        title: "Sleep Hygiene",
                        content: "Pitch black room. 65°F (18°C). No screens 1h before bed. Your muscles grow while you sleep."
                    },
                    {
                        title: "Magnesium Protocol",
                        content: "400mg Magnesium Glycinate before bed. Deep REM sleep support and nervous system recovery."
                    }
                ]
            }
        };
    }


    init() {
        this.renderHabits();
        this.renderAnalytics();
        this.attachEventListeners();
        this.createRainEffect();
        this.checkBossSpawn();
        this.checkDecay(); // NEW: Check for inactivity
    }

    checkDecay() {
        const now = Date.now();
        const lastLogin = this.userProfile.lastLogin || now;
        const diff = now - lastLogin;
        const daysMissed = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (daysMissed >= 1) {
            const decayAmount = daysMissed * 500;
            if (this.userProfile.totalXP > 0) {
                this.userProfile.totalXP = Math.max(0, this.userProfile.totalXP - decayAmount);
                this.showComboEffect(`DECAY: -${decayAmount} XP`);
                this.saveUserProfile();

                // Visual Warning
                const overlay = document.createElement('div');
                overlay.className = 'decay-overlay';
                overlay.innerHTML = `
                    <div class="decay-message">
                        <h1>WARNING: DISCIPLINE FADING</h1>
                        <p>You missed ${daysMissed} day(s).</p>
                        <p class="decay-loss">-${decayAmount} XP</p>
                    </div>
                `;
                document.body.appendChild(overlay);
                setTimeout(() => overlay.remove(), 4000);
            }
        }

        // Update last login
        this.userProfile.lastLogin = now;
        this.saveUserProfile();
    }

    // Boss Raid Logic
    checkBossSpawn() {
        const day = new Date().getDay();
        // Spawn on Friday (5), Saturday (6), Sunday (0)
        if (day === 5 || day === 6 || day === 0) {
            const bossIndex = this.userProfile.bossProgress || 0;
            const bossData = BOSS_ROSTER[bossIndex % BOSS_ROSTER.length];

            // Initialize boss if not active or if switching bosses
            if (!this.boss.active || this.boss.name !== bossData.name) {
                this.boss = {
                    name: bossData.name,
                    hp: bossData.hp,
                    maxHp: bossData.hp,
                    active: true,
                    color: bossData.color
                };
            }

            if (this.boss.hp <= 0) {
                this.boss.active = false;
                document.getElementById('bossContainer').style.display = 'none';
                return;
            }

            this.boss.active = true;
            document.getElementById('bossContainer').style.display = 'block';
            this.renderBoss();
        } else {
            this.boss.active = false;
            document.getElementById('bossContainer').style.display = 'none';
        }
    }

    damageBoss(amount) {
        if (!this.boss.active) return;

        this.boss.hp = Math.max(0, this.boss.hp - amount);
        this.renderBoss();

        if (this.boss.hp === 0) {
            this.bossDefeated();
        } else {
            // Boss Hit Effect
            const container = document.getElementById('bossContainer');
            container.style.transform = "translateX(-50%) scale(0.95)";
            setTimeout(() => container.style.transform = "translateX(-50%) scale(1)", 100);
        }
    }

    bossDefeated() {
        this.boss.active = false;
        document.getElementById('bossContainer').style.display = 'none';
        this.showComboEffect("TITAN SLAIN! +1000 XP");
        this.userProfile.totalXP += 1000;
        this.levelUp();
        this.saveUserProfile();

        // Celebration visual
        document.body.style.backgroundColor = 'var(--gold)';
        setTimeout(() => document.body.style.backgroundColor = '', 500);
    }

    renderBoss() {
        const fill = document.getElementById('bossHealthFill');
        const hpText = document.getElementById('bossHP');
        const maxHpText = document.getElementById('bossMaxHP');
        const nameText = document.getElementById('bossName');

        if (fill && hpText) {
            const pct = (this.boss.hp / this.boss.maxHp) * 100;
            fill.style.width = `${pct}%`;
            fill.style.background = this.boss.color ? `linear-gradient(90deg, ${this.boss.color}, #000)` : '';
            fill.style.boxShadow = `0 0 20px ${this.boss.color}`;

            hpText.textContent = this.boss.hp;
            if (maxHpText) maxHpText.textContent = this.boss.maxHp;
            if (nameText) {
                nameText.textContent = this.boss.name;
                nameText.style.color = this.boss.color;
                nameText.style.textShadow = `0 0 10px ${this.boss.color}`;
            }
        }
    }

    // ... (rest of methods)



    // Local Storage Management
    loadHabits() {
        const stored = localStorage.getItem('darkHabits');
        return stored ? JSON.parse(stored) : [];
    }

    saveHabits() {
        localStorage.setItem('darkHabits', JSON.stringify(this.habits));
    }

    loadCompletionHistory() {
        const stored = localStorage.getItem('completionHistory');
        return stored ? JSON.parse(stored) : {};
    }

    saveCompletionHistory() {
        localStorage.setItem('completionHistory', JSON.stringify(this.completionHistory));
    }

    loadUserProfile() {
        const stored = localStorage.getItem('userProfile');
        return stored ? JSON.parse(stored) : {
            level: 1,
            totalXP: 0,
            achievements: [],
            currentTheme: 'crimson'
        };
    }

    saveUserProfile() {
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    }

    // Utility Methods
    getDefaultColor(category) {
        const colors = {
            fitness: '#dc2626', mental: '#8b00ff', health: '#22c55e',
            productivity: '#f59e0b', learning: '#0077be', social: '#ec4899',
            creative: '#a855f7', custom: '#ffffff'
        };
        return colors[category] || '#ffffff';
    }

    calculateXP(streak) {
        const baseXP = 10;
        const streakBonus = Math.floor(streak / 7) * 5;
        return baseXP + streakBonus;
    }

    levelUp() {
        const newLevel = Math.floor(Math.sqrt(this.userProfile.totalXP / 100));
        if (newLevel > this.userProfile.level) {
            this.userProfile.level = newLevel;
            this.showLevelUpEffect(newLevel);
            this.saveUserProfile();
        }
    }

    applyTheme(themeName) {
        const theme = THEMES[themeName];
        if (!theme) return;
        const root = document.documentElement.style;
        root.setProperty('--void-black', theme.voidBlack);
        root.setProperty('--electric-cyan', theme.primary);
        root.setProperty('--crimson-red', theme.secondary);
        root.setProperty('--neon-blue', theme.tertiary);
        root.setProperty('--text-white', theme.textWhite);
        root.setProperty('--text-dim', theme.textDim);
        this.userProfile.currentTheme = themeName;
        this.saveUserProfile();
    }

    showLevelUpEffect(level) {
        const overlay = document.createElement('div');
        overlay.className = 'level-up-overlay';
        overlay.innerHTML = `<div class="level-up-content"><div class="level-up-text">LEVEL UP!</div><div class="level-up-number">${level}</div></div>`;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 3000);
    }



    checkAchievements(habit) {
        const achievements = [
            { id: 'streak_7', name: '7 DAY WARRIOR', desc: 'Maintain a 7 day streak', condition: h => h.streak >= 7 },
            { id: 'streak_30', name: '30 DAY LEGEND', desc: 'Maintain a 30 day streak', condition: h => h.streak >= 30 },
            { id: 'expert', name: 'EXPERT', desc: 'Complete 100 total reps', condition: h => h.totalCompletions >= 100 }
        ];

        achievements.forEach(ach => {
            if (ach.condition(habit) && !this.userProfile.achievements.includes(ach.id)) {
                this.userProfile.achievements.push(ach.id);
                this.showAchievementUnlock(ach);
                this.userProfile.totalXP += 500; // Bonus XP
                this.saveUserProfile();
            }
        });
    }

    showAchievementUnlock(achievement) {
        const div = document.createElement('div');
        div.className = 'achievement-toast';
        div.innerHTML = `
            <div style="font-size:2rem">🏆</div>
            <div>
                <div style="font-weight:bold; color:var(--electric-cyan)">ACHIEVEMENT UNLOCKED</div>
                <div style="font-size:0.8rem">${achievement.name}</div>
            </div>
        `;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 4000);
    }





    // Habit CRUD Operations
    addHabit(name, category) {
        if (!name.trim()) return;

        const habit = {
            id: Date.now(),
            name: name.trim(),
            category: category,
            streak: 0,
            totalCompletions: 0,
            lastCompleted: null,
            createdAt: new Date().toISOString(),
            completionDates: [],
            xp: 0
        };

        this.habits.push(habit);
        this.saveHabits();
        this.renderHabits();
        this.renderAnalytics();
        this.showComboEffect('NEW BATTLE!');
    }

    deleteHabit(id) {
        this.habits = this.habits.filter(h => h.id !== id);
        this.saveHabits();
        this.renderHabits();
        this.renderAnalytics();
    }

    completeHabit(id) {
        const habit = this.habits.find(h => h.id === id);
        if (!habit) return;

        const today = new Date().toDateString();
        const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted).toDateString() : null;

        if (lastCompleted === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastCompleted === yesterdayStr) {
            habit.streak++;
        } else if (lastCompleted !== today) {
            habit.streak = 1;
        }

        habit.totalCompletions++;
        habit.lastCompleted = new Date().toISOString();
        habit.completionDates.push(new Date().toISOString());

        // Award XP (Gamification)
        const xpEarned = this.calculateXP(habit.streak);
        habit.xp += xpEarned;
        this.userProfile.totalXP += xpEarned;
        this.levelUp(); // Check for level-up

        // Damage Boss
        if (this.boss.active) {
            const dmg = 50 + (habit.streak * 10);
            this.damageBoss(dmg);
        }

        const dateKey = new Date().toISOString().split('T')[0];
        if (!this.completionHistory[dateKey]) {
            this.completionHistory[dateKey] = 0;
        }
        this.completionHistory[dateKey]++;

        this.saveHabits();
        this.saveCompletionHistory();
        this.saveUserProfile(); // NEW: Save XP/level changes
        this.renderHabits();
        this.renderAnalytics();
        this.showComboEffect(`${habit.streak} COMBO! +${xpEarned}XP`);
    }

    // UI Rendering
    renderHabits() {
        const grid = document.getElementById('habitsGrid');
        const emptyState = document.getElementById('emptyState');

        if (this.habits.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        grid.innerHTML = this.habits.map(habit => this.createHabitCard(habit)).join('');
    }

    createHabitCard(habit) {
        const today = new Date().toDateString();
        const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted).toDateString() : null;
        const isCompletedToday = lastCompleted === today;

        const categoryEmojis = {
            fitness: '💪',
            mental: '🧠',
            health: '❤️',
            productivity: '⚡',
            learning: '📚',
            social: '👥',
            creative: '🎨',
            custom: '⭐'
        };



        return `
      <div class="habit-card ${isCompletedToday ? 'completed' : ''}" data-id="${habit.id}">
        <div class="habit-header-row" style="display:flex; justify-content:space-between; align-items:center;">
             <div class="habit-category">${categoryEmojis[habit.category]} ${habit.category}</div>
        </div>
        
        <div class="habit-header">
          <h3 class="habit-name">${this.escapeHtml(habit.name)}</h3>
          <button class="habit-delete" onclick="tracker.deleteHabit(${habit.id})" title="Delete habit">×</button>
        </div>
        
        <div class="habit-stats">
          <div class="stat">
            <div class="stat-label">Streak</div>
            <div class="stat-value combo">${habit.streak}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Total</div>
            <div class="stat-value">${habit.totalCompletions}</div>
          </div>
           <div class="stat">
            <div class="stat-label">XP</div>
            <div class="stat-value" style="color:var(--electric-cyan)">${habit.xp || 0}</div>
          </div>
        </div>

        ${this.renderWeekCalendar(habit)}
        
        <div class="habit-actions">
          <button 
            class="btn-complete ${isCompletedToday ? 'completed' : ''}" 
            onclick="tracker.completeHabit(${habit.id})"
            ${isCompletedToday ? 'disabled' : ''}
          >
            ${isCompletedToday ? '✓ COMPLETED TODAY' : 'COMPLETE'}
          </button>
        </div>
      </div>
    `;
    }

    renderWeekCalendar(habit) {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const today = new Date();
        const weekDays = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            weekDays.push(date);
        }

        const completionDates = habit.completionDates.map(d => new Date(d).toDateString());

        return `
      <div class="habit-calendar">
        ${weekDays.map((date, index) => {
            const isCompleted = completionDates.includes(date.toDateString());
            const isToday = date.toDateString() === today.toDateString();
            return `
            <div class="calendar-day">
              <div class="day-label">${days[date.getDay()]}</div>
              <div class="day-tick ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}">
                ${isCompleted ? '✓' : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Analytics Rendering
    renderAnalytics() {
        const analyticsSection = document.getElementById('analyticsSection');

        if (this.habits.length === 0) {
            analyticsSection.style.display = 'none';
            return;
        }

        analyticsSection.style.display = 'block';
        this.updateStats();
        // Delay chart rendering slightly to ensure layout is ready
        setTimeout(() => {
            this.renderColumnChart();
            this.renderDailyProgressPie();
            this.renderCategoryMixPie();
            this.renderCompletionGraph();
        }, 0);
    }

    updateStats() {
        const today = new Date().toDateString();
        const completedToday = this.habits.filter(h =>
            h.lastCompleted && new Date(h.lastCompleted).toDateString() === today
        ).length;
        const longestStreak = Math.max(...this.habits.map(h => h.streak), 0);
        const totalCompletions = this.habits.reduce((sum, h) => sum + h.totalCompletions, 0);

        document.getElementById('totalHabits').textContent = this.habits.length;
        document.getElementById('completedToday').textContent = completedToday;
        document.getElementById('longestStreak').textContent = longestStreak;
        document.getElementById('totalCompletions').textContent = totalCompletions;
    }

    // New Chart Palette (Black/White/Crimson Theme)
    getChartColors() {
        return {
            primary: '#dc2626', // Crimson Red
            success: '#22c55e', // Green (Status)
            white: '#ffffff',   // White (Contrast)
            black: '#000000',   // Back
            warning: '#f59e0b', // Amber 500
            danger: '#7f1d1d', // Red 900
            secondary: '#ffffff', // White
            tertiary: '#991b1b', // Red 800
            slate: '#d4d4d4', // Grey 300
            slateDark: '#171717', // Neutral 900
            text: '#ffffff' // White
        };
    }

    renderDailyProgressPie() {
        const canvas = document.getElementById('dailyProgressPie');
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 40;
        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();

        const today = new Date().toDateString();
        const completedCount = this.habits.filter(h =>
            h.lastCompleted && new Date(h.lastCompleted).toDateString() === today
        ).length;
        const totalCount = this.habits.length;
        const remainingCount = totalCount - completedCount;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 30;

        // Draw Remaining Slice (Base)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = colors.slateDark; // Dark Grey/Black
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = colors.slate; // Grey Border
        ctx.stroke();

        // Draw Completed Slice
        if (completedCount > 0) {
            const startAngle = -Math.PI / 2;
            const endAngle = startAngle + (completedCount / totalCount) * 2 * Math.PI;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.fillStyle = colors.primary; // Crimson
            ctx.fill();

            // White Border for contrast
            ctx.lineWidth = 2;
            ctx.strokeStyle = colors.white;
            ctx.stroke();

            // Glow Effect for Completion
            ctx.shadowColor = colors.primary;
            ctx.shadowBlur = 15;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset
        }

        // Draw Center Info
        ctx.fillStyle = colors.text;
        ctx.font = 'bold 24px Bebas Neue';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${completedCount} / ${totalCount}`, centerX, centerY - 10);

        ctx.font = '14px Rajdhani';
        ctx.fillStyle = colors.slate;
        ctx.fillText('COMPLETED', centerX, centerY + 15);
    }

    renderCategoryMixPie() {
        const canvas = document.getElementById('categoryPieChart');
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 40;
        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();

        const categoryCounts = {};
        this.habits.forEach(habit => {
            categoryCounts[habit.category] = (categoryCounts[habit.category] || 0) + 1;
        });

        const categories = Object.keys(categoryCounts);
        // Crimson, White, Dark Red, Grey cycle
        const palette = [colors.primary, colors.white, colors.tertiary, colors.slate, colors.danger];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let currentAngle = -Math.PI / 2;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;

        categories.forEach((category, index) => {
            const sliceAngle = (categoryCounts[category] / this.habits.length) * 2 * Math.PI;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = palette[index % palette.length];
            ctx.fill();

            ctx.strokeStyle = colors.black;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

            // Contrast text color based on background
            const bgColor = palette[index % palette.length];
            ctx.fillStyle = (bgColor === colors.white || bgColor === colors.slate) ? colors.black : colors.white;

            ctx.font = 'bold 12px Rajdhani';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(category.substring(0, 4).toUpperCase(), labelX, labelY);

            currentAngle += sliceAngle;
        });
    }

    renderColumnChart() {
        const canvas = document.getElementById('weeklyColumnChart');
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 40;
        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();

        const categories = [...new Set(this.habits.map(h => h.category))];
        const categoryStats = categories.map(cat => {
            const habits = this.habits.filter(h => h.category === cat);
            const total = habits.length;
            const completed = habits.filter(h =>
                h.lastCompleted && new Date(h.lastCompleted).toDateString() === new Date().toDateString()
            ).length;
            return { category: cat, total, completed };
        });

        const maxTotal = Math.max(...categoryStats.map(s => s.total), 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 40;
        const graphWidth = canvas.width - padding * 2;
        const graphHeight = canvas.height - padding * 2;
        const columnWidth = graphWidth / (categories.length || 1);

        categoryStats.forEach((stat, index) => {
            const x = padding + index * columnWidth + 10;
            const width = columnWidth - 20;

            // Draw Total Bar (Background)
            const totalHeight = (stat.total / maxTotal) * graphHeight;
            const totalY = canvas.height - padding - totalHeight;

            ctx.fillStyle = colors.slateDark; // Dark Grey/Black
            ctx.fillRect(x, totalY, width, totalHeight);
            ctx.strokeStyle = colors.slate;
            ctx.strokeRect(x, totalY, width, totalHeight);

            // Draw Completed Bar (Foreground)
            if (stat.completed > 0) {
                const completedHeight = (stat.completed / maxTotal) * graphHeight;
                const completedY = canvas.height - padding - completedHeight;

                // Red to White Gradient for intense contrast
                const gradient = ctx.createLinearGradient(x, completedY, x, canvas.height - padding);
                gradient.addColorStop(0, colors.white);
                gradient.addColorStop(0.3, colors.primary); // Crimson
                gradient.addColorStop(1, colors.danger); // Dark Red
                ctx.fillStyle = gradient;

                ctx.fillRect(x, completedY, width, completedHeight);

                // Add soft glow
                ctx.shadowColor = colors.primary;
                ctx.shadowBlur = 10;
                ctx.fillRect(x, completedY, width, completedHeight);
                ctx.shadowBlur = 0;
            }

            // Labels
            ctx.fillStyle = colors.white;
            ctx.font = '12px Rajdhani';
            ctx.textAlign = 'center';
            ctx.fillText(stat.category.substring(0, 8), x + width / 2, canvas.height - 15);

            // Count Label
            ctx.fillStyle = colors.white;
            ctx.fillText(`${stat.completed}/${stat.total}`, x + width / 2, totalY - 10);
        });

        // Axis
        ctx.strokeStyle = colors.white;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
    }

    renderCompletionGraph() {
        const canvas = document.getElementById('completionGraph');
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 40;
        const ctx = canvas.getContext('2d');
        const colors = this.getChartColors();

        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            days.push(date);
        }

        const completions = days.map(date => {
            const dateKey = date.toISOString().split('T')[0];
            return this.completionHistory[dateKey] || 0;
        });

        const maxCompletions = Math.max(...completions, 1);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 40;
        const graphWidth = canvas.width - padding * 2;
        const graphHeight = canvas.height - padding * 2;
        const barWidth = graphWidth / 7;

        completions.forEach((count, index) => {
            const barHeight = (count / maxCompletions) * graphHeight;
            const x = padding + index * barWidth;
            const y = canvas.height - padding - barHeight;

            // Gradient for "Creative" look
            const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding);
            gradient.addColorStop(0, colors.white);
            gradient.addColorStop(1, colors.primary); // Red
            ctx.fillStyle = gradient;

            ctx.fillRect(x + 5, y, barWidth - 10, barHeight);

            const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            ctx.fillStyle = colors.slate;
            ctx.font = '12px Rajdhani';
            ctx.textAlign = 'center';
            ctx.fillText(dayLabels[days[index].getDay()], x + barWidth / 2, canvas.height - 15);

            if (count > 0) {
                ctx.fillStyle = colors.white;
                ctx.font = 'bold 16px Bebas Neue';
                ctx.fillText(count, x + barWidth / 2, y - 10);
            }
        });

        ctx.strokeStyle = colors.white;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
    }

    // Visual Effects
    showComboEffect(text) {
        const comboDiv = document.getElementById('comboEffect');
        comboDiv.textContent = text;
        comboDiv.className = 'combo-effect';
        void comboDiv.offsetWidth;
        setTimeout(() => {
            comboDiv.className = '';
            comboDiv.textContent = '';
        }, 1000);
    }

    createRainEffect() {
        const rainContainer = document.getElementById('rainContainer');
        const rainDropCount = 80;

        for (let i = 0; i < rainDropCount; i++) {
            const rain = document.createElement('div');
            rain.className = 'rain';
            rain.style.left = `${Math.random() * 100}%`;

            const duration = Math.random() * 0.8 + 0.3; // FASTER rain
            rain.style.animationDuration = `${duration}s`;
            rain.style.animationDelay = `${Math.random() * 2}s`;
            rain.style.height = `${Math.random() * 60 + 40}px`;

            // Mix of Red and White drops for "Blood & Ash"
            if (Math.random() > 0.8) {
                rain.style.background = 'linear-gradient(transparent, #ffffff)';
                rain.style.opacity = `${Math.random() * 0.5 + 0.3}`;
                rain.style.width = '1px'; // Thinner ash
            } else {
                rain.style.opacity = `${Math.random() * 0.5 + 0.2}`;
            }

            rainContainer.appendChild(rain);
        }
    }

    // Quote Management
    displayQuote() {
        const quote = this.quotesDatabase[this.currentQuoteIndex];
        document.getElementById('quoteText').innerHTML = quote.text.replace(/\n/g, '<br>');
        document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
        document.getElementById('quoteCategory').textContent = quote.category;
    }

    nextQuote() {
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotesDatabase.length;
        this.displayQuote();
    }

    prevQuote() {
        this.currentQuoteIndex = (this.currentQuoteIndex - 1 + this.quotesDatabase.length) % this.quotesDatabase.length;
        this.displayQuote();
    }

    startQuoteRotation() {
        setInterval(() => {
            this.nextQuote();
        }, 10000);
    }

    // Tips Modal Management
    openTipsModal(category) {
        const modal = document.getElementById('tipsModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        const categoryData = this.tipsDatabase[category];
        if (!categoryData) return;

        modalTitle.textContent = categoryData.title;

        modalBody.innerHTML = categoryData.tips.map(tip => `
            <div class="tip-card">
                <h3 class="tip-card-title">${tip.title}</h3>
                <p class="tip-card-content">${tip.content}</p>
            </div>
        `).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeTipsModal() {
        const modal = document.getElementById('tipsModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event Listeners
    attachEventListeners() {
        const addBtn = document.getElementById('addHabitBtn');
        const input = document.getElementById('habitInput');
        const categorySelect = document.getElementById('categorySelect');

        // Helper to add habit with all fields
        const submitHabit = () => {
            this.addHabit(
                input.value,
                categorySelect.value,
                this.currentHabitType || 'good'
            );
            input.value = '';
        };

        addBtn.addEventListener('click', submitHabit);

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitHabit();
            }
        });

        document.getElementById('nextQuote').addEventListener('click', () => this.nextQuote());
        document.getElementById('prevQuote').addEventListener('click', () => this.prevQuote());

        // Theme Selector
        const themeSelector = document.getElementById('themeSelector');
        if (themeSelector) {
            themeSelector.value = this.userProfile.currentTheme;
            themeSelector.addEventListener('change', (e) => {
                this.applyTheme(e.target.value);
            });
        }

        document.querySelectorAll('.tip-category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                this.openTipsModal(category);
            });
        });

        document.getElementById('closeModal').addEventListener('click', () => this.closeTipsModal());

        document.getElementById('tipsModal').addEventListener('click', (e) => {
            if (e.target.id === 'tipsModal') {
                this.closeTipsModal();
            }
        });




        window.addEventListener('resize', () => {
            if (this.habits.length > 0) {
                this.renderAnalytics();
            }
        });

        this.displayQuote();
        this.startQuoteRotation();
        this.renderUserProfile(); // Render XP/Level on load
    }

    renderUserProfile() {
        // Update XP Bar
        const xpFill = document.getElementById('xpFill');
        const currentXP = document.getElementById('currentXP');
        const nextLevelXP = document.getElementById('nextLevelXP');
        const playerLevel = document.getElementById('playerLevel');

        // Simple linear progression: Level * 100 XP per level
        const xpForNextLevel = (this.userProfile.level + 1) * 100; // Simplified for MVP
        const xpProgress = (this.userProfile.totalXP % 100) / 100 * 100; // Just visual percentage of 100 block

        // Better logic: Total XP determines level. 
        // Lvl 1: 0-100. Lvl 2: 101-200. etc.
        const levelBase = this.userProfile.level * 100;
        const levelCeiling = (this.userProfile.level + 1) * 100;
        // let currentLevelXP = this.userProfile.totalXP - (this.userProfile.level * 100); 
        // simplified: 

        if (xpFill && currentXP) {
            // For now, just show total XP vs next milestone
            const nextMilestone = (Math.floor(this.userProfile.totalXP / 100) + 1) * 100;
            const progress = (this.userProfile.totalXP % 100);

            xpFill.style.width = `${progress}%`;
            currentXP.textContent = this.userProfile.totalXP;
            nextLevelXP.textContent = nextMilestone;
            playerLevel.textContent = this.userProfile.level;
        }

        // Apply saved theme
        this.applyTheme(this.userProfile.currentTheme);

        // Update Rank
        const currentRank = this.getRank();
        const rankDisplay = document.getElementById('rankDisplay');
        if (rankDisplay) {
            rankDisplay.textContent = currentRank.name;
            rankDisplay.style.color = currentRank.color;
            rankDisplay.style.textShadow = `0 0 20px ${currentRank.color}`;
        }
    }

    getRank() {
        const xp = this.userProfile.totalXP;
        // Find the highest rank threshold met
        for (let i = RANKS.length - 1; i >= 0; i--) {
            if (xp >= RANKS[i].threshold) {
                return RANKS[i];
            }
        }
        return RANKS[0]; // Default to Bronze
    }


    // Data Persistence
    loadUserProfile() {
        const stored = localStorage.getItem('userProfile');
        if (stored) {
            return JSON.parse(stored);
        }
        return {
            level: 1,
            totalXP: 0,
            achievements: [],
            currentTheme: 'crimson',
            bossProgress: 0,
            lastLogin: Date.now()
        };
    }

    saveUserProfile() {
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    }

    loadHabits() {
        const stored = localStorage.getItem('habits');
        return stored ? JSON.parse(stored) : [];
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    loadCompletionHistory() {
        const stored = localStorage.getItem('completionHistory');
        return stored ? JSON.parse(stored) : {};
    }

    saveCompletionHistory() {
        localStorage.setItem('completionHistory', JSON.stringify(this.completionHistory));
    }
}

// Initialize app
let tracker;
document.addEventListener('DOMContentLoaded', () => {
    tracker = new HabitTracker();
});

// Wallet Copy Function
function copyWallet() {
    const walletAddress = document.getElementById('walletAddress').innerText;

    navigator.clipboard.writeText(walletAddress).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅';

        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);

        if (typeof tracker !== 'undefined') {
            tracker.showComboEffect('COPIED!');
        }
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}
