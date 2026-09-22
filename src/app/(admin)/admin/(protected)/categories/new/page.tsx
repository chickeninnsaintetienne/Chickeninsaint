import { CategoryForm } from '@/components/admin/category-form'

export default function NewCategoryPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Category</h1>
            <CategoryForm />
        </div>
    )
}

