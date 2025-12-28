import { NextResponse } from 'next/server';
import { getAssets, createAsset } from '@/lib/storage';
import { Asset } from '@/types';

export async function GET() {
    const assets = await getAssets();
    return NextResponse.json(assets);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, type, status, assignedTo, health } = body;

        if (!name || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newAsset: Asset = {
            id: `${type.substring(0, 1)}-${Math.floor(Math.random() * 1000)}`, // Simple ID generation
            name,
            type,
            status: status || "Active",
            assignedTo: assignedTo || "Depot",
            health: health || 100
        };

        const savedAsset = await createAsset(newAsset);
        return NextResponse.json({ success: true, asset: savedAsset });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create asset' }, { status: 500 });
    }
}
