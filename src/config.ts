import { Config } from "./types";

const requiredEnvVars: string[] = [
  "VITE_FORMBLADE_CONTACT",
  "VITE_FORMBLADE_HIREME",
  "VITE_PHONE_NUMBER",
  "VITE_PHONEHref",
  "VITE_EMAIL",
];

if (import.meta.env.MODE === "development") {
  const missing = requiredEnvVars.filter((key) => !import.meta.env[key]);
  if (missing.length > 0) {
    console.warn(
      `[Portfolio] Missing required environment variables: ${missing.join(", ")}. ` +
      `Copy .env.example to .env and fill in the values.`
    );
  }
}

const config: Config = {
  formbladeContact: import.meta.env.VITE_FORMBLADE_CONTACT || "",
  formbladeHireMe: import.meta.env.VITE_FORMBLADE_HIREME || "",
  phone: import.meta.env.VITE_PHONE_NUMBER || "",
  phoneHref: import.meta.env.VITE_PHONEHref || "",
  email: import.meta.env.VITE_EMAIL || "",
  socials: {
    linkedin: "https://www.linkedin.com/in/gemachis-tesfaye-137196318",
    twitter: "https://x.com/GemachisTesfaye",
    instagram: "https://www.instagram.com/gemachistesfaye1",
    facebook: "https://www.facebook.com/urjiiko1",
    telegram: "https://t.me/urjiiko1",
    telegramCommunity: "https://t.me/UrjiikoLabs",
    github: "https://github.com/gemachistesfaye",
  },
  cvDownload:
    "https://drive.google.com/uc?export=download&id=1cT-SqZjRCFm9ZLcBJzgBAXnq9D5chWpe",
  cvView:
    "https://drive.google.com/file/d/1cT-SqZjRCFm9ZLcBJzgBAXnq9D5chWpe/view",
};

export default config;
