import api from "./BaseApi";

// GET /products?category=&subcategory=&badge=&minPrice=&maxPrice=&sort=&order=&page=&limit=
// Returns: { success, total, page, pages, data: Product[] }
export const getProducts = async (filters = {}) => {
  const { data } = await api.get("/products", { params: filters });
  return {
    products: data?.data ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    pages: data?.pages ?? 1,
  };
};

// GET /products/:slug → { success, data: Product }
export const getProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/${slug}`);
  return data?.data ?? null;
};

// GET /categories → [{ _id, name, slug, ... }]
export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data?.data ?? [];
};

// GET /categories/:slug/subcategories → [{ _id, name, slug, parent }]
export const getSubcategoriesBySlug = async (slug) => {
  if (!slug) return [];
  const { data } = await api.get(`/categories/${slug}/subcategories`);
  return data?.data ?? [];
};

// Legacy: GET /products/subcategory → string[] (kept for back-compat)
export const getSubcategories = async () => {
  const { data } = await api.get("/products/subcategory");
  return data?.data ?? [];
};

// Latest N products across the whole catalog (newest first).
export const getLatestProducts = async (limit = 8) => {
  const { products } = await getProducts({
    sort: "createdAt",
    order: "desc",
    limit,
  });
  return products;
};
