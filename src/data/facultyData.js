export { FACULTY_DATA as FACULTIES } from "./privateData"

import { FACULTY_DATA } from "./privateData"

export const DEPARTMENTS = [...new Set(FACULTY_DATA.map((f) => f.department))].sort()
