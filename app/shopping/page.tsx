import CatalogPage from "@/components/catalog/CatalogPage";
import { SHOPPING_CONFIG } from "@/config/catalog-configs";

export default function ShoppingPage() {
  return <CatalogPage catalogConfig={SHOPPING_CONFIG} />;
}
