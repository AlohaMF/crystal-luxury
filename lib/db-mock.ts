export type Location = "Tampa" | "St. Petersburg" | "Clearwater" | "Sarasota";

export interface Team {
    id: string;
    name: string;
    skills: string[];
    homeBase: Location;
}

export interface Job {
    id: string;
    teamId: string;
    startTime: Date; // ISO string
    endTime: Date;   // ISO string
    location: Location;
}

// Mock Data
export const TEAMS: Team[] = [
    { id: "t1", name: "Alpha Team", skills: ["Deep", "Move-In"], homeBase: "Tampa" },
    { id: "t2", name: "Gold Team", skills: ["Standard", "Windows"], homeBase: "St. Petersburg" },
];

export const JOBS: Job[] = [
    {
        id: "j1",
        teamId: "t1",
        startTime: new Date("2025-01-10T09:00:00"), // Friday 9 AM
        endTime: new Date("2025-01-10T13:00:00"),   // Friday 1 PM
        location: "Tampa",
    },
    {
        id: "j2",
        teamId: "t2",
        startTime: new Date("2025-01-10T14:00:00"),
        endTime: new Date("2025-01-10T16:00:00"),
        location: "St. Petersburg",
    }
];

// Helper to simulate DB queries
export const db = {
    teams: {
        findMany: async () => TEAMS,
    },
    jobs: {
        findMany: async (teamId: string) => JOBS.filter(j => j.teamId === teamId),
    }
};
