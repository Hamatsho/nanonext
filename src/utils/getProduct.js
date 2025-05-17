// utils/getProduct.js

export async function getProduct(id, language = "ar") {
  const res = await fetch(`https://account.now-ye.com/api/v1/shop/products/${id}?include=currency,seostorm_options`, {
    headers: {
      "Accept-Language": language,
    },
    cache: 'no-store', // اختياري: لتعطيل التخزين المؤقت
  });

  if (!res.ok) throw new Error("فشل في جلب المنتج");

  const data = await res.json();

  if (data.image) {
    data.images = [...(data.images || []), data.image];
  }

  return data;
}
