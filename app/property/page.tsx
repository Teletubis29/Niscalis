import CatalogPage from "@/components/catalog/CatalogPage";
import { PROPERTY_CONFIG } from "@/config/catalog-configs";

export default function PropertyPage() {
  return <CatalogPage catalogConfig={PROPERTY_CONFIG} />;
}
