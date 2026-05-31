import api from "./BaseApi";

// GET /products?category=&subcategory=&badge=&inStock=&sale=&minPrice=&maxPrice=&sort=&order=&page=&limit=
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

// GET /products/subcategory → { success, data: string[] }
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
