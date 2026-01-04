/** @type {import('next').NextConfig} */
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Entfernt ein führendes Slash, damit basePath wie "Trainer" wird
const basePath = repoName ? `/${repoName.replace(/^\//, "")}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? `/${repo}` : "",
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repo}/` : "",
  images: { unoptimized: true },
};

export default nextConfig;
