import { product } from "@/data/product";
import ProductDetail from "@/components/shop/product/ProductDetail";

export default function ProductDetailPage() {
  return <ProductDetail product={product} />;
}