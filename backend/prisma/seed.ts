import 'dotenv/config';
import {
  PrismaClient,
  NoteType,
  Color,
  ReviewGrade,
} from '../src/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Очистити всі дані перед сідом
  await prisma.reviewHistory.deleteMany();
  await prisma.reviewCard.deleteMany();
  await prisma.noteTag.deleteMany();
  await prisma.note.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  // ─── User ────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('password123456', 12);

  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      passwordHash,
      name: 'Test User',
    },
  });

  console.log(`✅ Created user: ${user.email}`);

  // ─── Tags ────────────────────────────────────────────────
  const [tagJS, tagDB, tagAlgo] = await Promise.all([
    prisma.tag.create({
      data: { name: 'JavaScript', color: Color.YELLOW, userId: user.id },
    }),
    prisma.tag.create({
      data: { name: 'Database', color: Color.BLUE, userId: user.id },
    }),
    prisma.tag.create({
      data: { name: 'Algorithms', color: Color.GREEN, userId: user.id },
    }),
  ]);

  console.log('✅ Created tags');

  // ─── Notes ───────────────────────────────────────────────
  const notesData = [
    {
      title: 'JavaScript Event Loop',
      content:
        'The event loop is the mechanism that allows JavaScript to perform non-blocking operations. It works by offloading operations to the system kernel whenever possible. The call stack processes synchronous code, while the event queue handles async callbacks.',
      noteType: NoteType.TEXT,
      tagId: tagJS.id,
    },
    {
      title: 'PostgreSQL Indexes',
      content:
        'Indexes in PostgreSQL are special lookup tables that the database search engine can use to speed up data retrieval. B-tree indexes work well for equality and range queries. GIN indexes are designed for composite values like arrays and full-text search vectors.',
      noteType: NoteType.TEXT,
      tagId: tagDB.id,
    },
    {
      title: 'Binary Search Algorithm',
      content:
        'Binary search is an efficient algorithm for finding an item from a sorted list. It works by repeatedly dividing the search interval in half. Time complexity is O(log n), making it much faster than linear search for large datasets.',
      noteType: NoteType.TEXT,
      tagId: tagAlgo.id,
    },
    {
      title: 'NestJS Dependency Injection',
      content:
        'NestJS uses a powerful DI container. Providers decorated with @Injectable() can be injected into other classes via constructor injection. The module system controls the scope and lifetime of providers.',
      noteType: NoteType.TEXT,
      tagId: tagJS.id,
    },
    {
      title: 'SQL Transactions and ACID',
      content:
        'ACID stands for Atomicity, Consistency, Isolation, Durability. Transactions ensure that a series of operations either all succeed or all fail. This prevents data corruption in concurrent environments.',
      noteType: NoteType.TEXT,
      tagId: tagDB.id,
    },
  ];

  const notes = await Promise.all(
    notesData.map((data) =>
      prisma.note.create({
        data: {
          title: data.title,
          content: data.content,
          noteType: data.noteType,
          userId: user.id,
          tag: {
            create: [{ tagId: data.tagId }],
          },
        },
      }),
    ),
  );

  console.log(`✅ Created ${notes.length} notes`);

  // ─── Review Cards ─────────────────────────────────────────
  const cards = await Promise.all(
    notes.map((note) =>
      prisma.reviewCard.create({
        data: {
          noteId: note.id,
          userId: user.id,
          easeFactor: 2.5,
          interval: 1,
          repetitions: 0,
          nextReviewAt: new Date(),
        },
      }),
    ),
  );

  console.log(`✅ Created ${cards.length} review cards`);

  // ─── Review History (для тесту streak) ───────────────────
  const historyEntries = [];

  for (let daysAgo = 0; daysAgo < 5; daysAgo++) {
    const reviewedAt = new Date();
    reviewedAt.setDate(reviewedAt.getDate() - daysAgo);
    reviewedAt.setHours(10, 0, 0, 0);

    historyEntries.push({
      reviewCardId: cards[0].id,
      grade: ReviewGrade.GOOD,
      easeFactor: 2.5,
      interval: daysAgo + 1,
      reviewedAt,
    });
  }

  await prisma.reviewHistory.createMany({ data: historyEntries });

  console.log(
    `✅ Created ${historyEntries.length} review history entries (streak = 5)`,
  );

  console.log('\n🎉 Seed completed!');
  console.log('─────────────────────────────────');
  console.log(`Email:    test@test.com`);
  console.log(`Password: password123456`);
  console.log(`Notes:    ${notes.length}`);
  console.log(`Cards:    ${cards.length} (всі доступні сьогодні)`);
  console.log(`Streak:   5 днів`);
  console.log('─────────────────────────────────');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
