import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">מוצר חדש</h1>
        <p className="text-gray-600 mt-1">הוסף מוצר חדש לחנות</p>
      </div>

      <ProductForm />
    </div>
  );
}

