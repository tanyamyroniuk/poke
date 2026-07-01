export type AppUser = { username: string; password: string }

export const USERS: AppUser[] = [
  { username: "tanya", password: "tanya" },
  { username: "michal", password: "michal" },
  { username: "demo", password: "demo" },
]

export function findUser(username: string, password: string): AppUser | null {
  return USERS.find(u => u.username === username && u.password === password) ?? null
}
