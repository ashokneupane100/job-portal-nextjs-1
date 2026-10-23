import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Building2,
  ArrowRight,
  Briefcase,
  Banknote,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { db } from "@/config/db";
import { jobs, employers, users } from "@/drizzle/schema";
import { desc, eq, sql } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";

async function getFeaturedJobs() {
  return await db
    .select({
      job: jobs,
      employer: employers,
      companyLogo: users.avatarUrl,
    })
    .from(jobs)
    .leftJoin(employers, eq(jobs.employerId, employers.id))
    .leftJoin(users, eq(employers.id, users.id))
    .orderBy(desc(jobs.isFeatured), desc(jobs.createdAt))
    .limit(6);
}

async function getTopEmployers() {
  return await db
    .select({
      employer: employers,
      companyLogo: users.avatarUrl,
      openJobsCount: sql<number>`count(${jobs.id})`.mapWith(Number),
    })
    .from(employers)
    .innerJoin(users, eq(employers.id, users.id))
    .leftJoin(jobs, eq(employers.id, jobs.employerId))
    .groupBy(employers.id, users.avatarUrl)
    .orderBy(desc(sql`count(${jobs.id})`), employers.name)
    .limit(8);
}

export default async function HomePage() {
  const [featuredJobs, topEmployers] = await Promise.all([
    getFeaturedJobs(),
    getTopEmployers(),
  ]);

  const popularKeywords = [
    "Next.js",
    "F1Soft",
    "Leapfrog",
    "Flutter",
    "Machine Learning",
    "DevOps",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-gray-50 to-white py-14 lg:py-20 border-b">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            {/* Job Sewa (जब सेवा) Official Brand Banner */}
            <div className="max-w-5xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-lg border border-blue-100 bg-slate-900">
              <div className="relative w-full aspect-[1520/420]">
                <Image
                  src="https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgFvbiSlIR2PX7z3pO8KjUG16MEcsYBCfqLStk"
                  alt="Job Sewa (जब सेवा) — Hand Briefcase Official Banner"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Job Sewa • जब सेवा — Nepal&apos;s Premier Job Portal 🇳🇵</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Find a job that suits <br className="hidden md:block" />
              your interest &amp; skills🔥
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover verified job opportunities with top companies across
              Kathmandu, Lalitpur, Pokhara, and remote teams in Nepal.
            </p>

            <form
              action="/jobs"
              method="GET"
              className="max-w-3xl mx-auto bg-white p-2 rounded-full shadow-lg flex flex-col sm:flex-row items-center gap-2 border border-gray-200"
            >
              <div className="flex-1 flex items-center pl-4 w-full">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <Input
                  name="search"
                  type="text"
                  placeholder="Job title, skill, or company in Nepal (e.g., Next.js, F1Soft, Leapfrog)..."
                  className="border-0 focus-visible:ring-0 shadow-none text-base"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8"
              >
                Search Jobs
              </Button>
            </form>

            {/* Popular Search Tags */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-600">Popular in Nepal:</span>
              {popularKeywords.map((keyword) => (
                <Link
                  key={keyword}
                  href={`/jobs?search=${encodeURIComponent(keyword)}`}
                  className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Featured Jobs in Nepal
                </h2>
                <p className="text-gray-500 mt-2">
                  Explore open roles from verified leading employers in Nepal
                </p>
              </div>
              <Button
                variant="outline"
                className="hidden sm:flex gap-2"
                asChild
              >
                <Link href="/jobs">
                  View All Jobs <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map(({ job, employer, companyLogo }) => {
                const logoSrc = companyLogo || employer?.bannerImageUrl;
                const salaryText =
                  job.minSalary && job.maxSalary
                    ? `${job.salaryCurrency || "NPR"} ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()} / ${job.salaryPeriod || "monthly"}`
                    : "Competitive Salary";

                return (
                  <Card
                    key={job.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-200 group border-gray-200 flex flex-col py-0 gap-0"
                  >
                    {/* Company Banner Strip */}
                    {employer?.bannerImageUrl && (
                      <div className="relative h-28 w-full overflow-hidden bg-gray-100 border-b">
                        <Image
                          src={employer.bannerImageUrl}
                          alt={`${employer.name || "Company"} Banner`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          {job.isFeatured && (
                            <Badge className="bg-amber-500 hover:bg-amber-500 text-white border-0 text-[11px]">
                              Featured
                            </Badge>
                          )}
                          <Badge
                            variant="secondary"
                            className="bg-white/95 text-gray-800 capitalize text-[11px]"
                          >
                            {job.jobType}
                          </Badge>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex gap-4 mb-4 items-start">
                        <div className="h-14 w-14 rounded-xl bg-white border border-gray-200 shadow-xs flex items-center justify-center overflow-hidden relative shrink-0">
                          {logoSrc ? (
                            <Image
                              src={logoSrc}
                              alt={employer?.name || "Company Logo"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Building2 className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {job.title}
                          </h3>
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {employer?.name || "Company"}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span className="capitalize">
                              {job.workType?.replace("-", " ")}
                            </span>
                            <span>•</span>
                            <span>
                              {formatDistanceToNow(new Date(job.createdAt))} ago
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="truncate">
                            {job.location || "Kathmandu, Nepal"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-medium text-gray-800">
                          <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">{salaryText}</span>
                        </div>
                      </div>

                      <Button
                        className="mt-auto w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors font-semibold"
                        asChild
                      >
                        <Link href={`/jobs/${job.id}`}>Apply Now</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top Companies Hiring in Nepal Section */}
        {topEmployers.length > 0 && (
          <section id="top-employers" className="py-20 bg-gray-50 border-t">
            <div className="container mx-auto max-w-7xl px-4">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Top Companies Hiring in Nepal
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Discover leading FinTech, AI, E-Commerce, and Software
                    employers across Nepal
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="hidden sm:flex gap-2"
                  asChild
                >
                  <Link href="/jobs">
                    Browse All Roles <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {topEmployers.map(({ employer, companyLogo, openJobsCount }) => (
                  <Link
                    key={employer.id}
                    href={`/jobs?search=${encodeURIComponent(employer.name || "")}`}
                    className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-blue-500/50 transition-all flex flex-col"
                  >
                    {/* Banner */}
                    <div className="relative h-28 w-full bg-gray-100 overflow-hidden border-b">
                      {employer.bannerImageUrl ? (
                        <Image
                          src={employer.bannerImageUrl}
                          alt={`${employer.name || "Company"} Banner`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-blue-600 to-indigo-700" />
                      )}
                    </div>

                    {/* Company Info + Overlapping Logo */}
                    <div className="p-5 pt-0 flex-1 flex flex-col">
                      <div className="-mt-7 mb-3 flex items-end justify-between">
                        <div className="relative h-14 w-14 rounded-xl border-2 border-white bg-white shadow-md overflow-hidden shrink-0">
                          {companyLogo ? (
                            <Image
                              src={companyLogo}
                              alt={employer.name || "Company Logo"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-blue-50 font-bold text-blue-600">
                              {employer.name?.slice(0, 2).toUpperCase() || "NP"}
                            </div>
                          )}
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 font-medium text-xs"
                        >
                          {openJobsCount}{" "}
                          {openJobsCount === 1 ? "Open Job" : "Open Jobs"}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {employer.name}
                      </h3>

                      <p className="text-xs font-medium text-gray-500 capitalize mt-0.5">
                        {employer.organizationType || "IT & Software"}
                      </p>

                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">
                            {employer.location || "Kathmandu, Nepal"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          {employer.teamSize && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-gray-400" />
                              {employer.teamSize} employees
                            </span>
                          )}
                          {employer.yearOfEstablishment && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              Est. {employer.yearOfEstablishment}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-white/20 shrink-0">
              <Image
                src="https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgBwoHE6xx1GraKJNmXRe0HvspYWlIiwfLtAqo"
                alt="Job Sewa (जब सेवा) Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 font-bold text-xl text-white">
                <span>Job Sewa</span>
                <span className="rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                  जब सेवा
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                नेपालको भरपर्दो रोजगारी र करियर सेवा प्लेटफर्म
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Job Sewa (जब सेवा) — Nepal&apos;s
            Career &amp; Job Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
