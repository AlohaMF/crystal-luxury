import fs from 'fs/promises';
import path from 'path';
import { Booking, Team, Asset } from '@/types';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

interface DB {
    teams: Team[];
    bookings: Booking[];
    assets: Asset[];
}

async function readDB(): Promise<DB> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty structure or default
        return { teams: [], bookings: [], assets: [] };
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

export async function getAssets(): Promise<Asset[]> {
    const db = await readDB();
    return db.assets || [];
}

export async function createAsset(asset: Asset): Promise<Asset> {
    const db = await readDB();
    if (!db.assets) db.assets = [];
    db.assets.push(asset);
    await writeDB(db);
    return asset;
}
