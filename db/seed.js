import db from "#db/client";
import { faker } from "@faker-js/faker";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  const folderNames = ["projects", "media", "documents"];

  for (const name of folderNames) {
    const {
      rows: [folder],
    } = await db.query(`INSERT INTO folders (name) VALUES ($1) RETURNING *`, [
      name,
    ]);

    for (let i = 0; i < 5; i++) {
      await db.query(
        `INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3)`,
        [
          faker.system.fileName(),
          faker.number.int({ min: 100, max: 10000 }),
          folder.id,
        ]
      );
    }
  }
}
