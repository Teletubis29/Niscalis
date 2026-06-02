import PropertyForm from "@/components/admin/PropertyForm";

export default function CreatePropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Property</h1>
        <p className="text-gray-600">Add a new property to your listing</p>
      </div>
      <PropertyForm />
    </div>
  );
}
