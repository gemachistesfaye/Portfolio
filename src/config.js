const config = {
  formspreeEndpoint: process.env.REACT_APP_FORMSPREE_ENDPOINT || "",
  phone: process.env.REACT_APP_PHONE_NUMBER || "",
  phoneHref: process.env.REACT_APP_PHONEHref || "",
  email: process.env.REACT_APP_EMAIL || "",
  socials: {
    linkedin: "https://www.linkedin.com/in/gemachis-tesfaye-137196318",
    twitter: "https://x.com/GemachisTe79854",
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
