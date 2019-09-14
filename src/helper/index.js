export const createSlug = project =>
  `/blog/${project.date}-${project.title
    .toLowerCase()
    .replace('ö', 'o')
    .split(" ")
    .join("-")}`
