-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phonneNumber" TEXT,
    "photoUrl" TEXT
);
INSERT INTO "new_Users" ("email", "firstName", "id", "lastName", "phonneNumber", "photoUrl") SELECT "email", "firstName", "id", "lastName", "phonneNumber", "photoUrl" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
