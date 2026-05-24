import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Product</h1>
        <p className="text-gray-600">Add a new product to your store</p>
      </div>
      <ProductForm />
    </div>
  );
}
