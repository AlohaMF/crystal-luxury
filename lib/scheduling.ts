import { db, Job, Location } from "./db-mock";

const TRAVEL_BUFFER_MINUTES = 45;

// Mock distance matrix (in minutes)
const TRAVEL_TIMES: Record<string, Record<string, number>> = {
    "Tampa": { "Tampa": 15, "St. Petersburg": 45, "Clearwater": 45, "Sarasota": 60 },
    "St. Petersburg": { "Tampa": 45, "St. Petersburg": 15, "Clearwater": 30, "Sarasota": 45 },
    "Clearwater": { "Tampa": 45, "St. Petersburg": 30, "Clearwater": 15, "Sarasota": 60 },
    "Sarasota": { "Tampa": 60, "St. Petersburg": 45, "Clearwater": 60, "Sarasota": 15 },
};

export async function checkAvailability(
    requestedStart: Date,
    requestedEnd: Date,
    location: Location,
    requiredskills: string[] = []
): Promise<{ available: boolean; teamId?: string; reason?: string }> {

    const teams = await db.teams.findMany();

    for (const team of teams) {
        // 1. Skill Check (Simple version)
        // if (requiredSkills.some(skill => !team.skills.includes(skill))) continue;

        const teamJobs = await db.jobs.findMany(team.id);
        let isTeamAvailable = true;

        for (const job of teamJobs) {
            // 2. Direct Overlap Check
            if (
                (requestedStart < job.endTime && requestedEnd > job.startTime) // Standard overlap logic
            ) {
                isTeamAvailable = false;
                break;
            }

            // 3. Travel Buffer Logic
            // Calculate time gap between jobs
            const timeGapBefore = (requestedStart.getTime() - job.endTime.getTime()) / 1000 / 60; // minutes
            const timeGapAfter = (job.startTime.getTime() - requestedEnd.getTime()) / 1000 / 60; // minutes

            // If the job is BEFORE the request
            if (timeGapBefore >= 0 && timeGapBefore < TRAVEL_BUFFER_MINUTES) {
                // Check if locations are different enough to warrant buffer?
                // For safety, we enforce buffer if locations are NOT identical, or just always enforce base buffer.
                // Using Travel Matrix:
                const travelTime = TRAVEL_TIMES[job.location]?.[location] || 45;
                if (timeGapBefore < travelTime) {
                    isTeamAvailable = false;
                    break; // Not enough time to travel FROM job TO request
                }
            }

            // If the job is AFTER the request
            if (timeGapAfter >= 0 && timeGapAfter < TRAVEL_BUFFER_MINUTES) {
                const travelTime = TRAVEL_TIMES[location]?.[job.location] || 45;
                if (timeGapAfter < travelTime) {
                    isTeamAvailable = false;
                    break; // Not enough time to travel FROM request TO job
                }
            }
        }

        if (isTeamAvailable) {
            return { available: true, teamId: team.id };
        }
    }

    return { available: false, reason: "No teams available during this slot with sufficient travel time." };
}
