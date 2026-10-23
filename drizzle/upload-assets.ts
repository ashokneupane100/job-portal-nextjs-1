import fs from "fs";
import path from "path";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const OUT_JSON = path.resolve(process.cwd(), "drizzle/uploadthing-urls.json");

const FILES_TO_UPLOAD: { key: string; relPath: string; mime: string }[] = [
  // Brand assets
  { key: "job-sewa-icon", relPath: "job-sewa-icon.png", mime: "image/png" },
  { key: "job-sewa-logo", relPath: "job-sewa-logo.png", mime: "image/png" },
  { key: "job-sewa-banner", relPath: "job-sewa-banner.png", mime: "image/png" },

  // Company Logos (512x512)
  { key: "f1soft-logo", relPath: "companies/logos/f1soft-logo.png", mime: "image/png" },
  { key: "leapfrog-logo", relPath: "companies/logos/leapfrog-logo.png", mime: "image/png" },
  { key: "cloudfactory-logo", relPath: "companies/logos/cloudfactory-logo.png", mime: "image/png" },
  { key: "daraz-logo", relPath: "companies/logos/daraz-logo.png", mime: "image/png" },
  { key: "fusemachines-logo", relPath: "companies/logos/fusemachines-logo.png", mime: "image/png" },
  { key: "khalti-logo", relPath: "companies/logos/khalti-logo.png", mime: "image/png" },
  { key: "verisk-logo", relPath: "companies/logos/verisk-logo.png", mime: "image/png" },
  { key: "cotiviti-logo", relPath: "companies/logos/cotiviti-logo.png", mime: "image/png" },

  // Company Banners (1520x400)
  { key: "f1soft-banner", relPath: "companies/banners/f1soft-banner.png", mime: "image/png" },
  { key: "leapfrog-banner", relPath: "companies/banners/leapfrog-banner.png", mime: "image/png" },
  { key: "cloudfactory-banner", relPath: "companies/banners/cloudfactory-banner.png", mime: "image/png" },
  { key: "daraz-banner", relPath: "companies/banners/daraz-banner.png", mime: "image/png" },
  { key: "fusemachines-banner", relPath: "companies/banners/fusemachines-banner.png", mime: "image/png" },
  { key: "khalti-banner", relPath: "companies/banners/khalti-banner.png", mime: "image/png" },
  { key: "verisk-banner", relPath: "companies/banners/verisk-banner.png", mime: "image/png" },
  { key: "cotiviti-banner", relPath: "companies/banners/cotiviti-banner.png", mime: "image/png" },

  // Applicant Portraits (512x512)
  { key: "aarav-sharma-avatar", relPath: "applicants/avatars/aarav-sharma.png", mime: "image/png" },
  { key: "sita-gurung-avatar", relPath: "applicants/avatars/sita-gurung.png", mime: "image/png" },
  { key: "bikash-karki-avatar", relPath: "applicants/avatars/bikash-karki.png", mime: "image/png" },
  { key: "priya-shrestha-avatar", relPath: "applicants/avatars/priya-shrestha.png", mime: "image/png" },

  // Applicant Resumes (PDF)
  { key: "aarav-sharma-cv", relPath: "applicants/resumes/aarav-sharma-cv.pdf", mime: "application/pdf" },
  { key: "sita-gurung-cv", relPath: "applicants/resumes/sita-gurung-cv.pdf", mime: "application/pdf" },
  { key: "bikash-karki-cv", relPath: "applicants/resumes/bikash-karki-cv.pdf", mime: "application/pdf" },
  { key: "priya-shrestha-cv", relPath: "applicants/resumes/priya-shrestha-cv.pdf", mime: "application/pdf" },
];

async function main() {
  console.log(`🚀 Uploading ${FILES_TO_UPLOAD.length} files to UploadThing...`);
  const urlMap: Record<string, string> = {};

  const batchSize = 5;
  for (let i = 0; i < FILES_TO_UPLOAD.length; i += batchSize) {
    const batch = FILES_TO_UPLOAD.slice(i, i + batchSize);
    const fileObjs = batch.map((item) => {
      const fullPath = path.join(PUBLIC_DIR, item.relPath);
      const buf = fs.readFileSync(fullPath);
      const fileName = path.basename(item.relPath);
      return new File([buf], fileName, { type: item.mime });
    });

    const responses = await utapi.uploadFiles(fileObjs);
    responses.forEach((res, idx) => {
      const item = batch[idx];
      if (res.data) {
        const uploadedUrl = res.data.ufsUrl || res.data.url;
        urlMap[item.key] = uploadedUrl;
        console.log(`✅ Uploaded ${item.key}: ${uploadedUrl}`);
      } else {
        console.error(`❌ Failed ${item.key}:`, res.error);
      }
    });
  }

  if (Object.keys(urlMap).length === 0) {
    throw new Error("No files were uploaded (network may be blocked in sandbox).");
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(urlMap, null, 2));
  console.log(`🎉 Saved all ${Object.keys(urlMap).length} UploadThing URLs to ${OUT_JSON}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

