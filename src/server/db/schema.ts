// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `google-map-contrib_${name}`,
);

export const contributor = createTable("contributor", {
  id: serial("id").primaryKey(),
  name: text("name"),
  url: text("url"),
  profileImageUrl: text("profileImageUrl"),
  contributorId: text("contributorId"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const place = createTable("place", {
  id: serial("id").primaryKey(),
  name: text("name"),
  url: text("url"),
  profileImageUrl: text("profileImageUrl"),
  address: text("address"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const review = createTable("review", {
  id: serial("id").primaryKey(),
  contributorId: integer("contributor_id")
    .references(() => contributor.id)
    .notNull(),
  placeId: integer("place_id")
    .references(() => place.id)
    .notNull(),
  url: text("url"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const batchStatusEnum = pgEnum("batch_status_enum", [
  "waiting",
  "in_progress",
  "completed",
  "error",
]);

export const batchStatusTypeEnum = pgEnum("batch_status_type", [
  "contrib",
  "contrib-place",
  "place",
  "place-contrib",
]);

export const batchStatus = createTable("batch_status", {
  id: serial("id").primaryKey(),
  contributorId: text("contributorId").notNull(),
  type: batchStatusTypeEnum("type").default("contrib"),
  status: batchStatusEnum("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
