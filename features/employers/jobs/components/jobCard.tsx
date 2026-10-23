import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns"; // npm i date-fns
import { MapPin, Clock, Briefcase, Banknote } from "lucide-react";
import { JobCardType } from "../server/jobs.queries"; // Import the inferred type

interface JobCardProps {
  job: JobCardType;
}

export const JobCard = ({ job }: JobCardProps) => {
  // Helper to format salary safely
  const formatSalary = () => {
    if (!job.minSalary || !job.maxSalary) return "Not Disclosed";
    return `${job.salaryCurrency} ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}`;
  };

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-500/50 hover:shadow-md"
    >
      {/* Company Banner Strip */}
      {job.companyBanner && (
        <div className="relative h-24 w-full overflow-hidden bg-gray-100 border-b border-gray-100">
          <Image
            src={job.companyBanner}
            alt={`${job.companyName || "Company"} Banner`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {job.jobType && (
            <span className="absolute top-2.5 right-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-medium capitalize text-gray-800 shadow-sm backdrop-blur-sm">
              {job.jobType}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Header: Logo & Title */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 items-center">
            {/* Company Logo with Fallback */}
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xs">
              {job.companyLogo ? (
                <Image
                  src={job.companyLogo}
                  alt={job.companyName || "Company Logo"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 font-bold text-gray-400">
                  {job.companyName?.slice(0, 2).toUpperCase() || "CO"}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="line-clamp-1 font-semibold text-gray-900 group-hover:text-blue-600">
                {job.title}
              </h3>
              <p className="text-sm font-medium text-gray-500 truncate">
                {job.companyName}
              </p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">
            <MapPin className="h-3 w-3 text-blue-600" />
            {job.location || "Remote"}
          </div>
          <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1">
            <Briefcase className="h-3 w-3 text-gray-500" />
            {job.workType?.replace("-", " ").toUpperCase() || "Full Time"}
          </div>
          <div className="flex items-center gap-1 rounded-md bg-blue-50 text-blue-700 font-medium px-2 py-1">
            <Banknote className="h-3 w-3" />
            {formatSalary()}
          </div>
        </div>

        {/* Footer: Time Ago */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Posted{" "}
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </span>

          <span className="font-medium text-blue-600 group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};
