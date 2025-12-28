import fs from 'fs/promises';
import path from 'path';
import { Booking, Team } from '@/types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

interface DB {
    teams: Team[];
    bookings: Booking[];
}

async function readDB(): Promise<DB> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty structure or default
        return { teams: [], bookings: [] };
    }
}

async function writeDB(data: DB): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 4), 'utf-8');
}

export async function getTeams(): Promise<Team[]> {
    const db = await readDB();
    return db.teams;
}

export async function getBookings(): Promise<Booking[]> {
    const db = await readDB();
    return db.bookings;
}

export async function createBooking(booking: Booking): Promise<Booking> {
    const db = await readDB();
    db.bookings.push(booking);
    await writeDB(db);
    return booking;
}
