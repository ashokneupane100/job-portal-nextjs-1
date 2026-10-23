import { db } from "@/config/db";
import {
  users,
  employers,
  applicants,
  jobs,
  resumes,
  jobApplications,
} from "@/drizzle/schema";
import argon2 from "argon2";

const daysFromNow = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);

const daysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000);

async function seed() {
  console.log("🌱 Starting Nepal Job Portal database seed...");

  // Clear existing data in reverse foreign-key order
  await db.delete(jobApplications);
  await db.delete(resumes);
  await db.delete(jobs);
  await db.delete(employers);
  await db.delete(applicants);
  await db.delete(users);

  // Common password for all dummy accounts: Password@123
  const hashedPassword = await argon2.hash("Password@123");

  // 1. Seed Employer Users + Employer Profiles (8 Leading Companies in Nepal)
  const employerSeedData = [
    {
      user: {
        name: "F1Soft International",
        userName: "f1soft_nepal",
        email: "hr@f1soft.com.np",
        password: hashedPassword,
        role: "employer" as const,
        phoneNumber: "+977-01-5439151",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tg4jE4hYejF6tgVCPToIDNSqAXUczb2yk5lh7O",
      },
      employer: {
        name: "F1Soft International",
        description: `<p><strong>F1Soft International</strong> is Nepal's leading FinTech conglomerate, powering the digital financial ecosystem across all 7 provinces of Nepal since 2004. Through flagship platforms including <strong>eSewa</strong>, <strong>Fonepay</strong>, and mobile banking solutions used by over 50+ banks and financial institutions, F1Soft connects more than 18 million Nepalis to seamless digital banking and payments.</p><p>Headquartered at Pulchowk, Lalitpur, our engineering teams build high-throughput, mission-critical distributed transaction systems, fraud detection engines, and consumer financial products tailored for Nepal.</p>`,
        bannerImageUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tg6PWg8icL4fVDZyEK0jHIG21FOTYlxk9nS3pJ",
        organizationType: "it & software",
        teamSize: "501-1000",
        yearOfEstablishment: 2004,
        websiteUrl: "https://www.f1soft.com",
        location: "Pulchowk, Lalitpur, Nepal",
      },
    },
    {
      user: {
        name: "Leapfrog Technology Nepal",
        userName: "leapfrog_nepal",
        email: "careers@lftechnology.com.np",
        password: hashedPassword,
        role: "employer" as const,
        phoneNumber: "+977-01-4519766",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgBeK3S7xx1GraKJNmXRe0HvspYWlIiwfLtAqo",
      },
      employer: {
        name: "Leapfrog Technology Nepal",
        description: `<p><strong>Leapfrog Technology Nepal</strong> is a premier software engineering and AI innovation partner with its main engineering hub in Dillibazar, Kathmandu. We partner with fast-growing healthcare, life sciences, and EdTech companies globally to design and ship AI-first digital products.</p><p>Known across Nepal for our people-first engineering culture, mentorship programs, and technical excellence, Leapfrog empowers Nepali engineers and designers to solve complex global challenges from Kathmandu.</p>`,
        bannerImageUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgCRZo8RLFLUPz5SkAxE9lI6oYmdGpgJ2Wirsv",
        organizationType: "development",
        teamSize: "201-500",
        yearOfEstablishment: 2010,
        websiteUrl: "https://www.lftechnology.com",
        location: "Dillibazar, Kathmandu, Nepal",
      },
    },
    {
      user: {
        name: "CloudFactory Nepal",
        userName: "cloudfactory_np",
        email: "talent.np@cloudfactory.com",
        password: hashedPassword,
        role: "employer" as const,
        phoneNumber: "+977-01-5592561",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgYYWlVHcBLKEP4j0ZOz9uVbFHDI16iWs2GyCt",
      },
      employer: {
        name: "CloudFactory Nepal",
        description: `<p>Born in Kathmandu, <strong>CloudFactory Nepal</strong> is a global leader in human-in-the-loop AI data lifecycle solutions, accelerating computer vision, autonomous driving, medical imaging, and LLM workflows for the world's top AI innovators.</p><p>From our campus in Bhaisepati, Lalitpur, our software engineering, data operations, and cloud platform teams build scalable SaaS tools that combine people and technology to create meaningful digital work across Nepal.</p>`,
        bannerImageUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tg0sOWyamuWp8b5yALBkK94iqJzSTZOFncv2e7",
        organizationType: "it & software",
        teamSize: "1001+",
        yearOfEstablishment: 2010,
        websiteUrl: "https://www.cloudfactory.com",
        location: "Bhaisepati, Lalitpur, Nepal",
      },
    },
    {
      user: {
        name: "Daraz Nepal",
        userName: "daraz_nepal",
        email: "jobs@daraz.com.np",
        password: hashedPassword,
        role: "employer" as const,
        phoneNumber: "+977-01-5970597",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgQdhK77ndU3u0D2ZpOBNLyjFhvcsKJeM4ikz8",
      },
      employer: {
        name: "Daraz Nepal",
        description: `<p><strong>Daraz Nepal</strong> (part of Alibaba International Digital Commerce Group) is Nepal's #1 online marketplace and e-commerce logistics network. Headquartered in Naxal, Kathmandu, we connect tens of thousands of Nepali SMEs and brands with millions of consumers from Mechi to Mahakali.</p><p>Our teams span e-commerce engineering, data analytics, growth marketing, supply chain automation, and last-mile logistics across 100+ cities and towns in Nepal.</p>`,
        bannerImageUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgjuEaBty18iZM7IR6DaJcFQGXVEn0UmSzdepu",
        organizationType: "retail",
        teamSize: "501-1000",
        yearOfEstablishment: 2016,
        websiteUrl: "https://www.daraz.com.np",
        location: "Naxal, Kathmandu, Nepal",
      },
    },
    {
      user: {
        name: "Fusemachines Nepal",
        userName: "fusemachines_np",
        email: "careers.nepal@fusemachines.com",
        password: hashedPassword,
        role: "employer" as const,
        phoneNumber: "+977-01-4425250",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgSMmFaX9yAQNujSUeMk58YLPR4qvnf19rIWTg",
      },
      employer: {
        name: "Fusemachines Nepal",
        description: `<p><strong>Fusemachines Nepal</strong> is a pioneer in enterprise AI products and services, with a deep engineering presence in Hattisar, Kathmandu. Founded with the mission to democratize AI, our flagship <strong>Fusemachines AI Fellowship</strong> has trained hundreds of top machine learning engineers across Nepal.</p><p>We build enterprise AI studio platforms, generative AI copilots, and deep learning pipelines for global enterprises while nurturing Nepal's AI talent ecosystem.</p>`,
        bannerImageUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgqdi4hcGg3YemhP06vrjqOZJAMwkaV9ybszfN",
        organizationType: "it & software",
        teamSize: "201-500",
        yearOfEstablishment: 2013,
        websiteUrl: "https://www.fusemachines.com",
        location: "Hattisar, Kathmandu, Nepal",
      },
    },
    {
      user: {
        name: "Khalti Digital Wallet",
        userName: "khalti_nepal",
        email: "careers@khalti.com",
        password: hashedPassword,
        role: "employer" as const,
        phoneNumber: "+977-01-5970017",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgApS5bvBZmVulxeNLFy7Jr6gWSDH4BvXiOICf",
      },
      employer: {
        name: "Khalti Digital Wallet",
        description: `<p><strong>Khalti Digital Wallet (Sparrow Pay Pvt. Ltd.)</strong> is one of Nepal's fastest-growing payment service providers, making financial services accessible, instant, and rewarding for millions of users and merchants across Nepal.</p><p>From utility payments, domestic flight ticketing, and movie bookings to QR merchant settlements and API payment gateways, our engineering and product teams in Bakhundole, Lalitpur build next-generation financial products for Nepal.</p>`,
        bannerImageUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgg5w8I3q6sCr3DY7eJqNB1A2cX9dFTEbSLUou",
        organizationType: "finance & accounting",
        teamSize: "201-500",
        yearOfEstablishment: 2017,
        websiteUrl: "https://khalti.com",
        location: "Bakhundole, Lalitpur, Nepal",
      },
    },
    {
      user: {
        name: "Verisk Nepal",
        userName: "verisk_nepal",
        email: "recruitment@verisknepal.com.np",
        password: hashedPassword,
        role: "employer" as const,
        phoneNumber: "+977-01-4435622",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgjKfmpnCy18iZM7IR6DaJcFQGXVEn0UmSzdep",
      },
      employer: {
        name: "Verisk Nepal",
        description: `<p><strong>Verisk Nepal</strong> operates as a strategic software development and advanced data analytics center in Hattisar, Kathmandu for Verisk Analytics. Since 2009, our teams of cloud architects, full-stack engineers, and data scientists have built petabyte-scale risk assessment and insurance analytics platforms.</p>`,
        bannerImageUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgRfN0RRiVd8scDuXmb7Q4hwKp2zNSfIHZU36A",
        organizationType: "it & software",
        teamSize: "201-500",
        yearOfEstablishment: 2009,
        websiteUrl: "https://www.verisknepal.com.np",
        location: "Hattisar, Kathmandu, Nepal",
      },
    },
    {
      user: {
        name: "Infinite Cotiviti Nepal",
        userName: "cotiviti_nepal",
        email: "hr.nepal@cotiviti.com",
        password: hashedPassword,
        role: "employer" as const,
        phoneNumber: "+977-01-4536325",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgXUjq2irEwqGjUBkI4HoYrlbLpWFS6ePuaz3t",
      },
      employer: {
        name: "Infinite Cotiviti Nepal",
        description: `<p><strong>Infinite Cotiviti Nepal</strong> in Baluwatar, Kathmandu is a premier healthcare data analytics and enterprise software engineering center in Nepal. Our engineers work on high-impact healthcare payment accuracy, clinical analytics, and big-data platforms processing billions of healthcare records.</p>`,
        bannerImageUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgDobmzIJeAc7n9Ix6dgrs5JBWMizQaqb4GwHj",
        organizationType: "healthcare",
        teamSize: "201-500",
        yearOfEstablishment: 2004,
        websiteUrl: "https://www.cotiviti.com.np",
        location: "Baluwatar, Kathmandu, Nepal",
      },
    },
  ];

  const createdEmployerIds: Record<string, number> = {};

  for (const item of employerSeedData) {
    const [newUser] = await db
      .insert(users)
      .values(item.user)
      .returning({ id: users.id });

    await db.insert(employers).values({
      id: newUser.id,
      ...item.employer,
    });

    createdEmployerIds[item.user.userName] = newUser.id;
  }

  console.log(`✅ Seeded ${employerSeedData.length} Nepali employers.`);

  // 2. Seed Applicant Users + Applicant Profiles + Resumes
  const applicantSeedData = [
    {
      user: {
        name: "Aarav Sharma",
        userName: "aarav_sharma",
        email: "aarav@jobsewa.com.np",
        password: hashedPassword,
        role: "applicant" as const,
        phoneNumber: "+977-9841234567",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgSCyy87Y9yAQNujSUeMk58YLPR4qvnf19rIWT",
      },
      applicant: {
        biography: `<p>Full-Stack Software Engineer based in Kathmandu with 3+ years of hands-on experience building scalable FinTech and SaaS web applications using <strong>Next.js, React, TypeScript, Node.js, and PostgreSQL</strong>. Computer Engineering graduate from IOE Pulchowk Campus.</p>`,
        dateOfBirth: new Date("1999-04-15"),
        nationality: "Nepali",
        maritalStatus: "single" as const,
        gender: "male" as const,
        education: "undergraduate" as const,
        experience: "3 Years",
        websiteUrl: "https://aaravsharma.com.np",
        location: "Baneshwor, Kathmandu, Nepal",
      },
      resume: {
        fileUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgfXD3sJ2aDLjTzSr7KvxHZkY0d5I9OWegJFQc",
        fileName: "Aarav_Sharma_FullStack_Engineer_CV.pdf",
        fileSize: 131273,
        isPrimary: true,
      },
    },
    {
      user: {
        name: "Sita Gurung",
        userName: "sita_gurung",
        email: "sita@jobsewa.com.np",
        password: hashedPassword,
        role: "applicant" as const,
        phoneNumber: "+977-9802345678",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tghEeq0s9p4kj9dcqAybKlpCUDfu7QiJZLaNV3",
      },
      applicant: {
        biography: `<p>Machine Learning Engineer and Data Scientist from Pokhara with 4 years of experience in NLP for Nepali & English languages, computer vision pipelines, and LLM fine-tuning. M.Sc. in Computer Science from Kathmandu University.</p>`,
        dateOfBirth: new Date("1998-09-22"),
        nationality: "Nepali",
        maritalStatus: "single" as const,
        gender: "female" as const,
        education: "masters" as const,
        experience: "4 Years",
        websiteUrl: "https://sitagurung.ai",
        location: "Lakeside, Pokhara, Nepal",
      },
      resume: {
        fileUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgAk18sFBZmVulxeNLFy7Jr6gWSDH4BvXiOICf",
        fileName: "Sita_Gurung_AI_ML_Engineer_Resume.pdf",
        fileSize: 119891,
        isPrimary: true,
      },
    },
    {
      user: {
        name: "Bikash Karki",
        userName: "bikash_karki",
        email: "bikash@jobsewa.com.np",
        password: hashedPassword,
        role: "applicant" as const,
        phoneNumber: "+977-9851098765",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgJf4UjliWiIte0UhQpSbczyBDs1PafHKvWgT7",
      },
      applicant: {
        biography: `<p>Product Designer (UI/UX) and Frontend Developer based in Lalitpur. Passionate about crafting accessible, mobile-first digital banking and e-commerce interfaces tailored for Nepali users across urban and rural regions.</p>`,
        dateOfBirth: new Date("2000-11-08"),
        nationality: "Nepali",
        maritalStatus: "single" as const,
        gender: "male" as const,
        education: "undergraduate" as const,
        experience: "2.5 Years",
        websiteUrl: "https://bikashkarki.design",
        location: "Jhamsikhel, Lalitpur, Nepal",
      },
      resume: {
        fileUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgMOY2nyTjNJ1CGKo8i7EDVaz4qrSBAmctY3hk",
        fileName: "Bikash_Karki_Product_Designer_CV.pdf",
        fileSize: 125979,
        isPrimary: true,
      },
    },
    {
      user: {
        name: "Priya Shrestha",
        userName: "priya_shrestha",
        email: "priya@jobsewa.com.np",
        password: hashedPassword,
        role: "applicant" as const,
        phoneNumber: "+977-9849876543",
        avatarUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgsdAcUl4FQ4xpXRaqL2BU3lCHoK6vJdwegMhI",
      },
      applicant: {
        biography: `<p>DevOps & Cloud Infrastructure Lead with 5 years of experience architecting high-availability Kubernetes clusters, CI/CD pipelines, and PCI-DSS compliant cloud infrastructure for financial institutions in Nepal.</p>`,
        dateOfBirth: new Date("1997-02-19"),
        nationality: "Nepali",
        maritalStatus: "married" as const,
        gender: "female" as const,
        education: "masters" as const,
        experience: "5 Years",
        websiteUrl: "https://priyashrestha.dev",
        location: "Kupondole, Lalitpur, Nepal",
      },
      resume: {
        fileUrl:
          "https://dfmb7dp8wq.ufs.sh/f/4fIxZ5ejF6tgK66lcEMXpR465gXDn02TIeb7aPlrJBhAMiwv",
        fileName: "Priya_Shrestha_DevOps_Cloud_Lead_CV.pdf",
        fileSize: 123406,
        isPrimary: true,
      },
    },
  ];

  const createdApplicants: { userId: number; resumeId: number; userName: string }[] = [];

  for (const item of applicantSeedData) {
    const [newUser] = await db
      .insert(users)
      .values(item.user)
      .returning({ id: users.id });

    await db.insert(applicants).values({
      id: newUser.id,
      ...item.applicant,
    });

    const [newResume] = await db
      .insert(resumes)
      .values({
        applicantId: newUser.id,
        ...item.resume,
      })
      .returning({ id: resumes.id });

    createdApplicants.push({
      userId: newUser.id,
      resumeId: newResume.id,
      userName: item.user.userName,
    });
  }

  console.log(`✅ Seeded ${applicantSeedData.length} Nepali applicants & resumes.`);

  // 3. Seed 12 Realistic Nepal Jobs across the 8 Companies
  const jobsSeedData = [
    {
      title: "Senior Full-Stack Engineer (Next.js & FinTech Core)",
      employerId: createdEmployerIds["f1soft_nepal"],
      description: `
        <p><strong>F1Soft International</strong> is looking for a <strong>Senior Full-Stack Engineer</strong> to join our Core Payment & Digital Banking platform team in Pulchowk, Lalitpur. You will architect and scale high-volume merchant and consumer web portals serving millions of daily active users across Nepal.</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Architect, build, and maintain modern web applications using <strong>Next.js 16, React 19, TypeScript, and Node.js</strong>.</li>
          <li>Collaborate with Fonepay and eSewa core banking teams to integrate real-time QR settlement and Nepal Rastra Bank (NRB) compliant reporting APIs.</li>
          <li>Optimize PostgreSQL database queries, caching strategies, and API response times for high-traffic festival campaigns (Dashain & Tihar).</li>
          <li>Mentor junior and mid-level engineers through code reviews and architectural design sessions.</li>
        </ul>
        <h3>Requirements</h3>
        <ul>
          <li>4+ years of professional software development experience with TypeScript, React/Next.js, and Node.js/NestJS.</li>
          <li>Strong understanding of relational databases (PostgreSQL), ORM tools (Drizzle / Prisma), and microservice security.</li>
          <li>Experience with financial transaction systems, idempotency, and secure API design is a strong plus.</li>
        </ul>
        <h3>Benefits at F1Soft</h3>
        <ul>
          <li>Competitive salary in NPR + Festival Bonus + Performance Incentives</li>
          <li>Social Security Fund (SSF), comprehensive medical & accidental insurance for family</li>
          <li>In-house cafeteria with complimentary lunch, snacks, and barista coffee at Pulchowk campus</li>
        </ul>
      `,
      tags: "Next.js, TypeScript, React, Node.js, PostgreSQL, FinTech, Drizzle ORM",
      minSalary: 140000,
      maxSalary: 220000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Pulchowk, Lalitpur, Nepal",
      jobType: "hybrid" as const,
      workType: "full-time" as const,
      jobLevel: "senior level" as const,
      experience: "4+ Years in Full-Stack Web Development",
      minEducation: "undergraduate" as const,
      isFeatured: true,
      expiresAt: daysFromNow(45),
      createdAt: daysAgo(1),
    },
    {
      title: "AI / Machine Learning Engineer (GenAI & Healthcare)",
      employerId: createdEmployerIds["leapfrog_nepal"],
      description: `
        <p><strong>Leapfrog Technology Nepal</strong> is seeking an experienced <strong>AI / Machine Learning Engineer</strong> at our Dillibazar, Kathmandu office to build production-grade Generative AI and clinical intelligence systems for global healthcare partners.</p>
        <h3>What You Will Do</h3>
        <ul>
          <li>Design and deploy RAG (Retrieval-Augmented Generation) pipelines, multi-agent workflows, and fine-tuned LLMs for clinical documentation.</li>
          <li>Build scalable Python microservices using FastAPI, PyTorch, LangChain, and vector databases.</li>
          <li>Establish robust evaluation benchmarks for accuracy, latency, and HIPAA-compliant data privacy.</li>
          <li>Partner with product designers and full-stack engineers in Kathmandu and the US.</li>
        </ul>
        <h3>Qualifications</h3>
        <ul>
          <li>3+ years of hands-on experience in Machine Learning, NLP, or Data Engineering.</li>
          <li>Strong proficiency in Python, PyTorch/TensorFlow, SQL, and cloud deployment on AWS or GCP.</li>
          <li>Bachelor's or Master's degree in Computer Engineering, CSIT, or related quantitative field.</li>
        </ul>
        <h3>Perks & Culture</h3>
        <ul>
          <li>5-day work week (Monday – Friday) with flexible hybrid work policy</li>
          <li>Annual learning & certification stipend, conference sponsorships, and hackathons</li>
          <li>Health insurance, wellness allowance, and vibrant office culture in Dillibazar</li>
        </ul>
      `,
      tags: "Python, Machine Learning, GenAI, PyTorch, FastAPI, NLP, AWS",
      minSalary: 130000,
      maxSalary: 200000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Dillibazar, Kathmandu, Nepal",
      jobType: "hybrid" as const,
      workType: "full-time" as const,
      jobLevel: "mid level" as const,
      experience: "3+ Years in AI/ML Engineering",
      minEducation: "undergraduate" as const,
      isFeatured: true,
      expiresAt: daysFromNow(50),
      createdAt: daysAgo(2),
    },
    {
      title: "Cloud Platform & DevOps Engineer (Kubernetes / AWS)",
      employerId: createdEmployerIds["cloudfactory_np"],
      description: `
        <p>Join <strong>CloudFactory Nepal</strong> at our Bhaisepati, Lalitpur hub (or remotely across Nepal) as a <strong>Cloud Platform & DevOps Engineer</strong> supporting our global AI data labeling and workforce platform.</p>
        <h3>Responsibilities</h3>
        <ul>
          <li>Manage and scale multi-region AWS infrastructure using <strong>Terraform, EKS (Kubernetes), and Helm</strong>.</li>
          <li>Build automated CI/CD pipelines with GitHub Actions and ArgoCD for zero-downtime deployments.</li>
          <li>Enhance platform observability and incident response using Prometheus, Grafana, and OpenTelemetry.</li>
          <li>Collaborate with security and backend teams to enforce SOC2 and ISO-27001 compliance controls.</li>
        </ul>
        <h3>Requirements</h3>
        <ul>
          <li>3–5 years of experience in DevOps, SRE, or Cloud Infrastructure Engineering.</li>
          <li>Deep familiarity with AWS services (EKS, RDS, S3, IAM, VPC), Docker, and Terraform.</li>
          <li>Strong scripting skills in Bash, Python, or Go.</li>
        </ul>
      `,
      tags: "AWS, Kubernetes, Terraform, Docker, CI/CD, DevOps, Linux",
      minSalary: 125000,
      maxSalary: 185000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Bhaisepati, Lalitpur, Nepal",
      jobType: "remote" as const,
      workType: "full-time" as const,
      jobLevel: "mid level" as const,
      experience: "3-5 Years in DevOps & Cloud",
      minEducation: "undergraduate" as const,
      isFeatured: true,
      expiresAt: daysFromNow(40),
      createdAt: daysAgo(3),
    },
    {
      title: "Senior Product Designer (UI/UX — E-Commerce & Mobile)",
      employerId: createdEmployerIds["daraz_nepal"],
      description: `
        <p><strong>Daraz Nepal</strong> is hiring a <strong>Senior Product Designer (UI/UX)</strong> at our headquarters in Naxal, Kathmandu to lead buyer and seller experience design across Nepal's largest e-commerce app.</p>
        <h3>What You Will Do</h3>
        <ul>
          <li>Lead end-to-end UX research, wireframing, interactive prototyping, and usability testing with Nepali shoppers and SME sellers.</li>
          <li>Design intuitive bilingual (English & Nepali) user flows for checkout, Daraz Mall, live commerce, and logistics tracking.</li>
          <li>Maintain and evolve our Figma design system in collaboration with mobile and web engineering squads.</li>
        </ul>
        <h3>Requirements</h3>
        <ul>
          <li>3+ years of product design experience for high-traffic consumer mobile and web applications.</li>
          <li>Mastery of Figma, component-driven design systems, and quantitative/qualitative user research.</li>
          <li>Strong portfolio demonstrating measurable improvements in conversion and user retention.</li>
        </ul>
      `,
      tags: "Figma, UI/UX, Product Design, Mobile App, Design Systems, E-Commerce",
      minSalary: 95000,
      maxSalary: 150000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Naxal, Kathmandu, Nepal",
      jobType: "on-site" as const,
      workType: "full-time" as const,
      jobLevel: "senior level" as const,
      experience: "3+ Years in Product Design",
      minEducation: "undergraduate" as const,
      isFeatured: true,
      expiresAt: daysFromNow(35),
      createdAt: daysAgo(4),
    },
    {
      title: "Deep Learning & Computer Vision Lead",
      employerId: createdEmployerIds["fusemachines_np"],
      description: `
        <p><strong>Fusemachines Nepal</strong> is looking for a <strong>Deep Learning & Computer Vision Lead</strong> in Hattisar, Kathmandu to spearhead enterprise AI product development and mentor fellows in the Fusemachines AI Fellowship.</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Architect and train deep learning models for document intelligence, medical imaging, and multimodal AI products.</li>
          <li>Lead a squad of 6–8 ML engineers in Kathmandu, driving technical roadmap and model deployment to production.</li>
          <li>Optimize model inference latency using ONNX, TensorRT, and vLLM on GPU clusters.</li>
        </ul>
        <h3>Requirements</h3>
        <ul>
          <li>5+ years of industry experience in Deep Learning, Computer Vision, or NLP.</li>
          <li>Track record of shipping production ML models with PyTorch, Docker, and Kubernetes.</li>
          <li>Master's degree or equivalent research/industry experience in Artificial Intelligence.</li>
        </ul>
      `,
      tags: "Deep Learning, Computer Vision, PyTorch, LLMs, MLOps, Python",
      minSalary: 180000,
      maxSalary: 260000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Hattisar, Kathmandu, Nepal",
      jobType: "hybrid" as const,
      workType: "full-time" as const,
      jobLevel: "lead" as const,
      experience: "5+ Years in Machine Learning",
      minEducation: "masters" as const,
      isFeatured: true,
      expiresAt: daysFromNow(60),
      createdAt: daysAgo(5),
    },
    {
      title: "Mobile App Engineer (Flutter — Digital Wallet)",
      employerId: createdEmployerIds["khalti_nepal"],
      description: `
        <p><strong>Khalti Digital Wallet</strong> is hiring a passionate <strong>Mobile App Engineer (Flutter)</strong> in Bakhundole, Lalitpur to build fast, secure, and delightful payment experiences for millions of Nepali users on Android and iOS.</p>
        <h3>What You Will Do</h3>
        <ul>
          <li>Develop and optimize core features of the Khalti consumer & merchant apps using <strong>Flutter and Dart</strong>.</li>
          <li>Implement biometric authentication, offline QR scanning, NFC payments, and real-time socket notifications.</li>
          <li>Ensure smooth 60fps performance even on entry-level smartphones across 4G/3G networks in Nepal.</li>
        </ul>
        <h3>Requirements</h3>
        <ul>
          <li>2+ years of production mobile development experience with Flutter (or native Android/iOS).</li>
          <li>Solid grasp of state management (Bloc / Riverpod), RESTful APIs, encryption, and automated widget testing.</li>
        </ul>
      `,
      tags: "Flutter, Dart, Android, iOS, Mobile Payments, FinTech",
      minSalary: 85000,
      maxSalary: 135000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Bakhundole, Lalitpur, Nepal",
      jobType: "on-site" as const,
      workType: "full-time" as const,
      jobLevel: "mid level" as const,
      experience: "2+ Years in Mobile App Development",
      minEducation: "undergraduate" as const,
      isFeatured: true,
      expiresAt: daysFromNow(42),
      createdAt: daysAgo(6),
    },
    {
      title: "Senior Data Engineer (Spark / Snowflake / Python)",
      employerId: createdEmployerIds["verisk_nepal"],
      description: `
        <p><strong>Verisk Nepal</strong> is seeking a <strong>Senior Data Engineer</strong> at our Hattisar, Kathmandu office to build high-throughput data pipelines and lakehouse architectures for global insurance and catastrophe risk analytics.</p>
        <h3>Responsibilities</h3>
        <ul>
          <li>Design and maintain distributed ETL/ELT pipelines using <strong>Apache Spark, PySpark, Snowflake, and Airflow</strong>.</li>
          <li>Process terabytes of geospatial, weather, and actuarial datasets on AWS cloud infrastructure.</li>
          <li>Collaborate with data scientists and actuaries to productionize analytical models.</li>
        </ul>
        <h3>Requirements</h3>
        <ul>
          <li>4+ years of experience in Data Engineering with Python, SQL, Spark, and modern cloud data warehouses.</li>
          <li>Strong analytical mindset and experience tuning complex SQL queries.</li>
        </ul>
      `,
      tags: "Python, PySpark, Snowflake, SQL, AWS, Airflow, Data Engineering",
      minSalary: 145000,
      maxSalary: 210000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Hattisar, Kathmandu, Nepal",
      jobType: "hybrid" as const,
      workType: "full-time" as const,
      jobLevel: "senior level" as const,
      experience: "4+ Years in Data Engineering",
      minEducation: "undergraduate" as const,
      isFeatured: false,
      expiresAt: daysFromNow(48),
      createdAt: daysAgo(7),
    },
    {
      title: "Backend Software Engineer (.NET Core & Microservices)",
      employerId: createdEmployerIds["cotiviti_nepal"],
      description: `
        <p><strong>Infinite Cotiviti Nepal</strong> is hiring a <strong>Backend Software Engineer</strong> at our Baluwatar, Kathmandu campus to engineer scalable healthcare analytics and payment integrity services.</p>
        <h3>Key Responsibilities</h3>
        <ul>
          <li>Develop resilient backend services using <strong>C#, .NET 8, SQL Server, PostgreSQL, and Kafka</strong>.</li>
          <li>Write clean, well-tested code following SOLID principles and enterprise security standards.</li>
          <li>Participate in Agile sprint planning, peer code reviews, and architecture discussions.</li>
        </ul>
        <h3>Requirements</h3>
        <ul>
          <li>2–4 years of backend software development experience in .NET Core or Java.</li>
          <li>Strong database design and query optimization skills.</li>
        </ul>
      `,
      tags: "C#, .NET Core, SQL, Microservices, Kafka, Healthcare IT",
      minSalary: 100000,
      maxSalary: 160000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Baluwatar, Kathmandu, Nepal",
      jobType: "hybrid" as const,
      workType: "full-time" as const,
      jobLevel: "mid level" as const,
      experience: "2-4 Years in Backend Engineering",
      minEducation: "undergraduate" as const,
      isFeatured: false,
      expiresAt: daysFromNow(38),
      createdAt: daysAgo(8),
    },
    {
      title: "Frontend React / Next.js Developer",
      employerId: createdEmployerIds["leapfrog_nepal"],
      description: `
        <p><strong>Leapfrog Technology Nepal</strong> is looking for a <strong>Frontend React / Next.js Developer</strong> to craft accessible, responsive web applications for international SaaS and digital health products.</p>
        <h3>Responsibilities</h3>
        <ul>
          <li>Build pixel-perfect, high-performance user interfaces using <strong>React 19, Next.js, TypeScript, and Tailwind CSS</strong>.</li>
          <li>Work closely with UI/UX designers to translate Figma designs into reusable component libraries.</li>
          <li>Write unit and integration tests using Vitest and Playwright.</li>
        </ul>
        <h3>Requirements</h3>
        <ul>
          <li>1.5–3 years of experience with modern JavaScript/TypeScript, React, and Next.js.</li>
          <li>Strong understanding of web accessibility (WCAG), Core Web Vitals, and state management.</li>
        </ul>
      `,
      tags: "React, Next.js, TypeScript, Tailwind CSS, Frontend",
      minSalary: 70000,
      maxSalary: 110000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Dillibazar, Kathmandu, Nepal",
      jobType: "hybrid" as const,
      workType: "full-time" as const,
      jobLevel: "junior" as const,
      experience: "1.5-3 Years in Frontend Development",
      minEducation: "undergraduate" as const,
      isFeatured: false,
      expiresAt: daysFromNow(30),
      createdAt: daysAgo(9),
    },
    {
      title: "Information Security & Compliance Analyst (NRB / ISO 27001)",
      employerId: createdEmployerIds["f1soft_nepal"],
      description: `
        <p><strong>F1Soft International</strong> is recruiting an <strong>Information Security & Compliance Analyst</strong> in Pulchowk, Lalitpur to strengthen security posture across our digital banking and payment platforms.</p>
        <h3>Responsibilities</h3>
        <ul>
          <li>Conduct vulnerability assessments, penetration testing coordination, and security code reviews.</li>
          <li>Ensure compliance with Nepal Rastra Bank (NRB) IT Guidelines, PCI-DSS, and ISO/IEC 27001 standards.</li>
          <li>Monitor SIEM alerts and lead incident response drills across engineering teams.</li>
        </ul>
      `,
      tags: "Cybersecurity, PCI-DSS, ISO 27001, AppSec, FinTech, Network Security",
      minSalary: 110000,
      maxSalary: 165000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Pulchowk, Lalitpur, Nepal",
      jobType: "on-site" as const,
      workType: "full-time" as const,
      jobLevel: "mid level" as const,
      experience: "3+ Years in InfoSec / Cybersecurity",
      minEducation: "undergraduate" as const,
      isFeatured: false,
      expiresAt: daysFromNow(45),
      createdAt: daysAgo(10),
    },
    {
      title: "Growth & Digital Marketing Manager (Dashain & Mega Campaigns)",
      employerId: createdEmployerIds["daraz_nepal"],
      description: `
        <p><strong>Daraz Nepal</strong> is looking for a data-driven <strong>Growth & Digital Marketing Manager</strong> in Naxal, Kathmandu to lead user acquisition, retention, and mega sale campaigns (11.11, Dashain Dhamaka, New Year Sale) across Nepal.</p>
        <h3>Responsibilities</h3>
        <ul>
          <li>Plan and execute full-funnel digital marketing campaigns across Meta, Google, TikTok, YouTube, and in-app channels.</li>
          <li>Collaborate with top Nepali creators, brands, and media partners to drive nationwide engagement.</li>
          <li>Analyze cohort retention, CAC, and ROAS metrics to optimize marketing budget allocation.</li>
        </ul>
      `,
      tags: "Digital Marketing, Growth, E-Commerce, SEO, Performance Marketing, Analytics",
      minSalary: 90000,
      maxSalary: 140000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Naxal, Kathmandu, Nepal",
      jobType: "on-site" as const,
      workType: "full-time" as const,
      jobLevel: "manager" as const,
      experience: "4+ Years in Growth / Digital Marketing",
      minEducation: "undergraduate" as const,
      isFeatured: false,
      expiresAt: daysFromNow(32),
      createdAt: daysAgo(11),
    },
    {
      title: "Software Engineering Intern / Fellowship Trainee",
      employerId: createdEmployerIds["fusemachines_np"],
      description: `
        <p><strong>Fusemachines Nepal</strong> invites final-year CSIT / Computer Engineering students and fresh graduates in Kathmandu Valley to apply for our paid <strong>Software & AI Engineering Internship</strong>.</p>
        <h3>What You Will Gain</h3>
        <ul>
          <li>Hands-on mentorship from senior engineers working on Python, TypeScript, React, and Machine Learning pipelines.</li>
          <li>Opportunity to transition into a full-time Software / ML Engineer role upon successful completion.</li>
          <li>Monthly stipend, lunch at our Hattisar office, and access to Fusemachines AI courses.</li>
        </ul>
      `,
      tags: "Internship, Python, JavaScript, React, AI Fellowship, Freshers",
      minSalary: 25000,
      maxSalary: 35000,
      salaryCurrency: "NPR" as const,
      salaryPeriod: "monthly" as const,
      location: "Hattisar, Kathmandu, Nepal",
      jobType: "on-site" as const,
      workType: "full-time" as const,
      jobLevel: "internship" as const,
      experience: "Final Year / Fresh Graduate (B.E. / B.Sc. CSIT / BIT)",
      minEducation: "undergraduate" as const,
      isFeatured: false,
      expiresAt: daysFromNow(28),
      createdAt: daysAgo(12),
    },
  ];

  const insertedJobs = await db
    .insert(jobs)
    .values(jobsSeedData)
    .returning({ id: jobs.id, title: jobs.title });

  console.log(`✅ Seeded ${insertedJobs.length} Nepal jobs.`);

  // 4. Seed Realistic Job Applications
  const aarav = createdApplicants.find((a) => a.userName === "aarav_sharma")!;
  const sita = createdApplicants.find((a) => a.userName === "sita_gurung")!;
  const bikash = createdApplicants.find((a) => a.userName === "bikash_karki")!;
  const priya = createdApplicants.find((a) => a.userName === "priya_shrestha")!;

  const applicationsSeedData = [
    {
      jobId: insertedJobs[0].id, // F1Soft Senior Full-Stack Engineer
      applicantId: aarav.userId,
      resumeId: aarav.resumeId,
      coverLetter:
        "Namaste Hiring Team at F1Soft,\n\nWith over 3 years of full-stack experience building Next.js, TypeScript, and PostgreSQL applications in Kathmandu, including merchant payment integrations with eSewa and Fonepay APIs, I am excited to apply for the Senior Full-Stack Engineer role at Pulchowk.",
      appliedAt: daysAgo(1),
    },
    {
      jobId: insertedJobs[8].id, // Leapfrog Frontend React / Next.js Developer
      applicantId: aarav.userId,
      resumeId: aarav.resumeId,
      coverLetter:
        "Hello Leapfrog Recruitment Team,\n\nI have long admired Leapfrog's engineering culture in Kathmandu. I would love to contribute my React 19, Next.js, and TypeScript expertise to your healthcare SaaS teams.",
      appliedAt: daysAgo(3),
    },
    {
      jobId: insertedJobs[1].id, // Leapfrog AI / ML Engineer
      applicantId: sita.userId,
      resumeId: sita.resumeId,
      coverLetter:
        "Namaste Leapfrog AI Team,\n\nAs an M.Sc. Computer Science graduate from Kathmandu University with 4 years of production experience in NLP, RAG pipelines, and PyTorch, I am eager to join your GenAI & Healthcare engineering group.",
      appliedAt: daysAgo(2),
    },
    {
      jobId: insertedJobs[4].id, // Fusemachines Deep Learning Lead
      applicantId: sita.userId,
      resumeId: sita.resumeId,
      coverLetter:
        "Dear Fusemachines Nepal Team,\n\nHaving followed the Fusemachines AI Fellowship closely and led computer vision & LLM deployments over the past 4 years, I am thrilled to apply for the Deep Learning & Computer Vision Lead role in Hattisar.",
      appliedAt: daysAgo(4),
    },
    {
      jobId: insertedJobs[3].id, // Daraz Senior Product Designer
      applicantId: bikash.userId,
      resumeId: bikash.resumeId,
      coverLetter:
        "Hello Daraz Design Team,\n\nI specialize in designing bilingual mobile-first e-commerce and fintech interfaces for Nepali users. I would love to bring my Figma design system and UX research experience to Daraz Nepal in Naxal.",
      appliedAt: daysAgo(2),
    },
    {
      jobId: insertedJobs[5].id, // Khalti Mobile App Engineer
      applicantId: bikash.userId,
      resumeId: bikash.resumeId,
      coverLetter:
        "Namaste Khalti Team,\n\nAs a daily user of Khalti in Lalitpur with hands-on experience building mobile UI and frontend experiences, I am excited to apply for the Mobile App Engineer position.",
      appliedAt: daysAgo(5),
    },
    {
      jobId: insertedJobs[2].id, // CloudFactory Cloud Platform & DevOps Engineer
      applicantId: priya.userId,
      resumeId: priya.resumeId,
      coverLetter:
        "Hello CloudFactory Platform Team,\n\nWith 5 years of experience managing multi-region AWS EKS clusters, Terraform modules, and GitHub Actions CI/CD pipelines in Nepal, I am excited to apply for the Cloud Platform & DevOps Engineer role.",
      appliedAt: daysAgo(1),
    },
    {
      jobId: insertedJobs[0].id, // F1Soft Senior Full-Stack Engineer
      applicantId: priya.userId,
      resumeId: priya.resumeId,
      coverLetter:
        "Dear F1Soft Engineering Team,\n\nI bring 5 years of experience in high-availability FinTech infrastructure, PCI-DSS compliance, and backend platform engineering in Lalitpur.",
      appliedAt: daysAgo(3),
    },
  ];

  await db.insert(jobApplications).values(applicationsSeedData);
  console.log(`✅ Seeded ${applicationsSeedData.length} job applications.`);
  console.log("🎉 Nepal Job Portal database seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

