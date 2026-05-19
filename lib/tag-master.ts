/** 管理画面で選択可能なタグのマスターデータ */
export const TAG_MASTER = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "Django",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Frontend",
  "Backend",
  "Testing",
  "E2E",
  "Docker",
  "Kubernetes",
  "AWS",
  "Infra",
  "DevOps",
  "AI Tools",
  "Productivity",
  "Career",
] as const

export type TagMaster = (typeof TAG_MASTER)[number]

const masterSet = new Set<string>(TAG_MASTER)

export function isMasterTag(tag: string): boolean {
  return masterSet.has(tag)
}

/** マスターに含まれるタグだけを返す（編集時の初期値用） */
export function filterMasterTags(tags: string[]): string[] {
  return tags.filter(isMasterTag)
}
