export const createSlug = project =>
  `/blog/${project.date}-${project.title
    .toLowerCase()
    .split(" ")
    .join("-")}`
