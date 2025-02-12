import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number | undefined) {
  if (!bytes) return "0 B";
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export function formatSpeed(bytesPerSecond: number | undefined) {
  if (!bytesPerSecond) return "0 B/s";
  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
  let speed = bytesPerSecond;
  let unitIndex = 0;

  while (speed >= 1024 && unitIndex < units.length - 1) {
    speed /= 1024;
    unitIndex++;
  }

  return `${speed.toFixed(1)} ${units[unitIndex]}`;
}


export const mapperPackageColor = {
  kernel: { bg: "#b3994d", font: "#000000" },
  apache: { bg: "#7ab34d", font: "#000000" },
  bash: { bg: "#4db37a", font: "#000000" },
  bun: { bg: "#4db3b3", font: "#000000" },
  deno: { bg: "#4d7ab3", font: "#ffffff" },
  docker: { bg: "#4d4db3", font: "#ffffff" },
  dotnet: { bg: "#7a4db3", font: "#ffffff" },
  fish: { bg: "#b34d7a", font: "#ffffff" },
  gcc: { bg: "#b34d4d", font: "#ffffff" },
  git: { bg: "#b34d99", font: "#ffffff" },
  grunt: { bg: "#4d99b3", font: "#000000" },
  gulp: { bg: "#99b34d", font: "#000000" },
  homebrew: { bg: "#b34d7a", font: "#ffffff" },
  java: { bg: "#4db34d", font: "#000000" },
  mongodb: { bg: "#b37a4d", font: "#000000" },
  mysql: { bg: "#7ab34d", font: "#000000" },
  nginx: { bg: "#4db37a", font: "#000000" },
  node: { bg: "#4db3b3", font: "#000000" },
  npm: { bg: "#4d7ab3", font: "#ffffff" },
  openssl: { bg: "#4d4db3", font: "#ffffff" },
  perl: { bg: "#7a4db3", font: "#ffffff" },
  php: { bg: "#b34d7a", font: "#ffffff" },
  pip3: { bg: "#b34d4d", font: "#ffffff" },
  pip: { bg: "#b34d99", font: "#ffffff" },
  pm2: { bg: "#4d99b3", font: "#000000" },
  postfix: { bg: "#99b34d", font: "#000000" },
  postgresql: { bg: "#b34d7a", font: "#ffffff" },
  powershell: { bg: "#4db34d", font: "#000000" },
  python3: { bg: "#b37a4d", font: "#000000" },
  python: { bg: "#7ab34d", font: "#000000" },
  redis: { bg: "#4db37a", font: "#000000" },
  systemOpenssl: { bg: "#4db3b3", font: "#000000" },
  systemOpensslLib: { bg: "#4d7ab3", font: "#ffffff" },
  tsc: { bg: "#4d4db3", font: "#ffffff" },
  v8: { bg: "#7a4db3", font: "#ffffff" },
  virtualbox: { bg: "#b34d7a", font: "#ffffff" },
  yarn: { bg: "#b34d4d", font: "#ffffff" },
  zsh: { bg: "#b34d99", font: "#ffffff" },
};
