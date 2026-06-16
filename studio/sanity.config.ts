import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { assist } from "@sanity/assist";
import post from "./schemas/post";

export default defineConfig({
  name: "my-portfolio-blog",
  title: "My Portfolio Blog",
  projectId: "dx08sfs5",
  dataset: "production",
  plugins: [structureTool(), visionTool(), assist()],
  schema: {
    types: [post],
  },
});
