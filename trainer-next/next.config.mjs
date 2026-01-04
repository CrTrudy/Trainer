/** @type {import('next').NextConfig} */
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Entfernt ein führendes Slash, damit basePath wie "Trainer" wird
const basePath = repoName ? `/${repoName.replace(/^\//, "")}` : "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: basePath || undefined,
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
