import Products from "@/components/ProductsComopnents/Products";
import ProductsHero from "@/components/ProductsComopnents/ProductsHero";

// Dynamic per-category page. Any slug supplied by an admin-created category
// (e.g. "mosquito-net") renders here without code changes.
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  return (
    <div>
      <ProductsHero />
      <Products category={slug} />
    </div>
  );
}
