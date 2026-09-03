import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [summitStriders, coreCrew, trailBlazers] = await Team.create([
      {
        name: 'Summit Striders',
        description: 'Runners and hikers stacking steady weekly miles.',
      },
      {
        name: 'Core Crew',
        description: 'Strength-focused athletes building durable habits.',
      },
      {
        name: 'Trail Blazers',
        description: 'Outdoor cardio fans chasing new personal records.',
      },
    ]);

    const [maya, jordan, priya, theo] = await User.create([
      {
        username: 'maya-miles',
        email: 'maya@example.com',
        displayName: 'Maya Chen',
        teamId: summitStriders._id,
      },
      {
        username: 'jordan-lifts',
        email: 'jordan@example.com',
        displayName: 'Jordan Rivera',
        teamId: coreCrew._id,
      },
      {
        username: 'priya-paces',
        email: 'priya@example.com',
        displayName: 'Priya Shah',
        teamId: trailBlazers._id,
      },
      {
        username: 'theo-tracks',
        email: 'theo@example.com',
        displayName: 'Theo Morgan',
        teamId: summitStriders._id,
      },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(summitStriders._id, { memberIds: [maya._id, theo._id] }),
      Team.findByIdAndUpdate(coreCrew._id, { memberIds: [jordan._id] }),
      Team.findByIdAndUpdate(trailBlazers._id, { memberIds: [priya._id] }),
    ]);

    await Activity.create([
      {
        userId: maya._id,
        type: 'Running',
        durationMinutes: 42,
        caloriesBurned: 410,
        completedAt: new Date('2026-08-30T07:15:00Z'),
      },
      {
        userId: jordan._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 360,
        completedAt: new Date('2026-08-31T18:30:00Z'),
      },
      {
        userId: priya._id,
        type: 'Cycling',
        durationMinutes: 68,
        caloriesBurned: 620,
        completedAt: new Date('2026-09-01T12:00:00Z'),
      },
      {
        userId: theo._id,
        type: 'Yoga',
        durationMinutes: 35,
        caloriesBurned: 160,
        completedAt: new Date('2026-09-02T06:45:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { userId: priya._id, teamId: trailBlazers._id, points: 1280, rank: 1 },
      { userId: maya._id, teamId: summitStriders._id, points: 1165, rank: 2 },
      { userId: jordan._id, teamId: coreCrew._id, points: 1090, rank: 3 },
      { userId: theo._id, teamId: summitStriders._id, points: 875, rank: 4 },
    ]);

    await Workout.create([
      {
        title: '5K Tempo Builder',
        description: 'Warm up, alternate tempo intervals with easy jogs, and finish with relaxed strides.',
        difficulty: 'intermediate',
        durationMinutes: 38,
      },
      {
        title: 'Foundational Strength Circuit',
        description: 'A balanced full-body session with squats, rows, presses, carries, and core work.',
        difficulty: 'beginner',
        durationMinutes: 45,
      },
      {
        title: 'Hill Climb Intervals',
        description: 'Short uphill efforts with full recovery to build power for trail and road athletes.',
        difficulty: 'advanced',
        durationMinutes: 50,
      },
      {
        title: 'Mobility Reset Flow',
        description: 'Low-impact mobility and breath work for recovery days between harder sessions.',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
