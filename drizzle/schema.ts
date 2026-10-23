import { relations } from "drizzle-orm";
import {
  JOB_LEVEL,
  JOB_TYPE,
  MIN_EDUCATION,
  SALARY_CURRENCY,
  SALARY_PERIOD,
  WORK_TYPE,
} from "@/config/constant";
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "applicant", "employer"]);
export const maritalStatusEnum = pgEnum("marital_status", [
  "single",
  "married",
  "divorced",
]);
export const genderEnum = pgEnum("gender", ["male", "female", "other"]);
export const educationEnum = pgEnum("education", [
  "none",
  "high school",
  "undergraduate",
  "masters",
  "phd",
]);
export const salaryCurrencyEnum = pgEnum("salary_currency", SALARY_CURRENCY);
export const salaryPeriodEnum = pgEnum("salary_period", SALARY_PERIOD);
export const jobTypeEnum = pgEnum("job_type", JOB_TYPE);
export const workTypeEnum = pgEnum("work_type", WORK_TYPE);
export const jobLevelEnum = pgEnum("job_level", JOB_LEVEL);
export const minEducationEnum = pgEnum("min_education", MIN_EDUCATION);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userName: varchar("username", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: roleEnum("role").default("applicant").notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }),
  avatarUrl: text("avatar_url"),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  userAgent: text("user_agent").notNull(),
  ip: varchar("ip", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const employers = pgTable("employers", {
  id: integer("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 255 }),
  description: text("description"),
  bannerImageUrl: text("banner_image_url"),
  organizationType: varchar("organization_type", { length: 100 }),
  teamSize: varchar("team_size", { length: 50 }),
  yearOfEstablishment: integer("year_of_establishment"),
  websiteUrl: varchar("website_url", { length: 255 }),
  location: varchar("location", { length: 255 }),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const applicants = pgTable("applicants", {
  id: integer("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),

  biography: text("biography"),
  dateOfBirth: date("date_of_birth", { mode: "date" }),
  nationality: varchar("nationality", { length: 100 }),

  maritalStatus: maritalStatusEnum("marital_status"),

  gender: genderEnum("gender"),

  education: educationEnum("education"),

  experience: text("experience"),
  websiteUrl: varchar("website_url", { length: 255 }),
  location: varchar("location", { length: 255 }),
  deletedAt: timestamp("deleted_at", { mode: "string" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  employerId: integer("employer_id")
    .notNull()
    .references(() => employers.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  tags: text("tags"),
  minSalary: integer("min_salary"),
  maxSalary: integer("max_salary"),
  salaryCurrency: salaryCurrencyEnum("salary_currency"),
  salaryPeriod: salaryPeriodEnum("salary_period"),
  location: varchar("location", { length: 255 }),
  jobType: jobTypeEnum("job_type"),
  workType: workTypeEnum("work_type"),
  jobLevel: jobLevelEnum("job_level"),
  experience: text("experience"),
  minEducation: minEducationEnum("min_education"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  expiresAt: timestamp("expires_at"),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  applicantId: integer("applicant_id")
    .notNull()
    .references(() => applicants.id, { onDelete: "cascade" }),

  fileUrl: text("file_url").notNull(), // The UploadThing URL
  fileName: varchar("file_name", { length: 255 }).notNull(),

  fileSize: integer("file_size"),
  isPrimary: boolean("is_primary").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),

  jobId: integer("job_id")
    .notNull()
    .references(() => jobs.id, { onDelete: "cascade" }),

  applicantId: integer("applicant_id")
    .notNull()
    .references(() => applicants.id, { onDelete: "cascade" }),

  resumeId: integer("resume_id")
    .notNull()
    .references(() => resumes.id, { onDelete: "restrict" }), // They can't delete a resume if it's used in an application

  coverLetter: text("cover_letter"),

  // You can add a status enum later if you want employers to "accept/reject"
  // status: statusEnum("status").default("pending"),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
});

export const jobApplicationsRelations = relations(
  jobApplications,
  ({ one }) => ({
    job: one(jobs, {
      fields: [jobApplications.jobId],
      references: [jobs.id],
    }),
    applicant: one(applicants, {
      fields: [jobApplications.applicantId],
      references: [applicants.id],
    }),
    resume: one(resumes, {
      fields: [jobApplications.resumeId],
      references: [resumes.id],
    }),
  }),
);

export const resumesRelations = relations(resumes, ({ one }) => ({
  applicant: one(applicants, {
    fields: [resumes.applicantId],
    references: [applicants.id],
  }),
}));

export const applicantsRelations = relations(applicants, ({ many }) => ({
  resumes: many(resumes),
}));

export const jobsRelations = relations(jobs, ({ one }) => ({
  // Each job belongs to one employer
  employer: one(employers, {
    fields: [jobs.employerId],
    references: [employers.id],
  }),
}));

// Relations definitions
export const usersRelations = relations(users, ({ one, many }) => ({
  // One user can have one employer profile (if role is employer)
  employer: one(employers, {
    fields: [users.id],
    references: [employers.id],
  }),
  // One user can have one applicant profile (if role is applicant)
  applicant: one(applicants, {
    fields: [users.id],
    references: [applicants.id],
  }),
  // One user can have many sessions
  sessions: many(sessions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  // Each session belongs to one user
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
