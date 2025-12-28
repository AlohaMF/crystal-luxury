import { AssetTracker } from "@/components/admin/AssetTracker";

export default function AssetsPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-serif text-white">Assets & Inventory</h1>
                <p className="text-marble-200/50 mt-1">Track high-value equipment and uniforms</p>
            </div>
            <AssetTracker />
        </div>
    );
}
