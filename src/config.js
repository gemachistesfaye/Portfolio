const config = {
  formspreeEndpoint: process.env.REACT_APP_FORMSPREE_ENDPOINT || "",
  phone: process.env.REACT_APP_PHONE_NUMBER || "",
  phoneHref: process.env.REACT_APP_PHONEHref || "",
  email: process.env.REACT_APP_EMAIL || "",
  socials: {
    linkedin: "https://www.linkedin.com/in/gemachis-tesfaye-137196318",
    twitter: "https://x.com/GemachisTe79854",
    telegram: "https://t.me/GemachisTesfaye",
    github: "https://github.com/gemachistesfaye",
  },
  cvDownload:
    "https://drive.google.com/uc?export=download&id=1lzpGC9a6dJs0dpBdCpnrxz-MbdPwNuK3",
  cvView:
    "https://drive.google.com/file/d/1lzpGC9a6dJs0dpBdCpnrxz-MbdPwNuK3/view",
};

export default config;
