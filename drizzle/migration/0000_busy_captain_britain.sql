CREATE TYPE "public"."education" AS ENUM('none', 'high school', 'undergraduate', 'masters', 'phd');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."job_level" AS ENUM('internship', 'entry level', 'junior', 'mid level', 'senior level', 'lead', 'manager', 'director', 'executive');--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('remote', 'hybrid', 'on-site');--> statement-breakpoint
CREATE TYPE "public"."marital_status" AS ENUM('single', 'married', 'divorced');--> statement-breakpoint
CREATE TYPE "public"."min_education" AS ENUM('none', 'high school', 'undergraduate', 'masters', 'phd');--> statement-breakpoint
DROP TYPE IF EXISTS "public"."role";--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'applicant', 'employer');--> statement-breakpoint
CREATE TYPE "public"."salary_currency" AS ENUM('USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'NPR');--> statement-breakpoint
CREATE TYPE "public"."salary_period" AS ENUM('hourly', 'monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."work_type" AS ENUM('full-time', 'part-time', 'contract', 'temporary', 'freelance');--> statement-breakpoint
CREATE TABLE "applicants" (
	"id" integer PRIMARY KEY NOT NULL,
	"biography" text,
	"date_of_birth" date,
	"nationality" varchar(100),
	"marital_status" "marital_status",
	"gender" "gender",
	"education" "education",
	"experience" text,
	"website_url" varchar(255),
	"location" varchar(255),
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employers" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" text,
	"banner_image_url" text,
	"organization_type" varchar(100),
	"team_size" varchar(50),
	"year_of_establishment" integer,
	"website_url" varchar(255),
	"location" varchar(255),
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_id" integer NOT NULL,
	"applicant_id" integer NOT NULL,
	"resume_id" integer NOT NULL,
	"cover_letter" text,
	"applied_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"employer_id" integer NOT NULL,
	"description" text NOT NULL,
	"tags" text,
	"min_salary" integer,
	"max_salary" integer,
	"salary_currency" "salary_currency",
	"salary_period" "salary_period",
	"location" varchar(255),
	"job_type" "job_type",
	"work_type" "work_type",
	"job_level" "job_level",
	"experience" text,
	"min_education" "min_education",
	"is_featured" boolean DEFAULT false NOT NULL,
	"expires_at" timestamp,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicant_id" integer NOT NULL,
	"file_url" text NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_size" integer,
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"user_agent" text NOT NULL,
	"ip" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'applicant' NOT NULL,
	"phone_number" varchar(255),
	"avatar_url" text,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employers" ADD CONSTRAINT "employers_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_applicant_id_applicants_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."applicants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employer_id_employers_id_fk" FOREIGN KEY ("employer_id") REFERENCES "public"."employers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_applicant_id_applicants_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."applicants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;