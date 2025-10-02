import { SimpleGrid, Loader, Center, Text } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState, AppDispatch } from "../../store/index";
import { ProductCard } from "../productCard/ProductCard";
import { fetchProducts } from "../../store/productsSlice";

export function Catalog() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Center mt="xl"><Loader color="green" data-testid="loader" /></Center>;
  if (error) return <Center mt="xl"><Text c="red">{error}</Text></Center>;
  if (!products || products.length === 0) 
    return <Center mt="xl"><Text>Нет доступных овощей</Text></Center>;

  return (
    <>
      <Text
        mb="md"
        style={{
          fontSize: 22,
          fontWeight: 600,
          textAlign: "left"
        }}
      >
        Catalog
      </Text>

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing="lg"
      >
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </SimpleGrid>
    </>
  );
}
