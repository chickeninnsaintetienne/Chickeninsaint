import { OfferForm } from '@/components/admin/offer-form'

export default function NewOfferPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Add New Offer</h1>
            <OfferForm />
        </div>
    )
}
