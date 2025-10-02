import { useState } from "react";
import { Card, Image, Text, Button, Group, ActionIcon, NumberInput } from "@mantine/core";
import { IconShoppingCart, IconMinus, IconPlus } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/index";
import { addToCart, updateCartQuantity } from "../../store/cartSlice";
import "./ProductCard.scss"

type ProductProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export function ProductCard({ id, name, price, image }: ProductProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, weight] = name.split(" - ");

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(i => i.id === id)
  );

  const [localCount, setLocalCount] = useState(1);

  const count = cartItem?.quantity ?? localCount;

  const handleChange = (val: number | string | undefined) => {
    if (val === undefined) return;
    const newCount = typeof val === "string" ? parseInt(val, 10) : val;
    const finalCount = Math.max(1, newCount);

    if (cartItem) {
      dispatch(updateCartQuantity({ id, quantity: finalCount }));
    } else {
      setLocalCount(finalCount);
    }
  };

  const handleAddToCart = () => {
    if (!cartItem) {
      dispatch(addToCart({ id, name, price, image, quantity: localCount }));
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} height={200} alt={name} fit="contain" />
      </Card.Section>

      <Group mt="md" align="center" justify="space-between">
        <Group gap={4} align="center">
          <Text style={{ fontSize: 14, fontWeight: 600 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: "#6c757d", marginLeft: 4 }}>{weight}</Text>
        </Group>

        <Group gap={0} align="center" justify="center">
          <ActionIcon
            aria-label="Decrease quantity"
            variant="light"
            color="dark"
            size={20}
            onClick={() => handleChange(count - 1)}
            disabled={count <= 1}
          >
            <IconMinus size={10} radius="sm" />
          </ActionIcon>

          <NumberInput
            value={count}
            onChange={handleChange}
            min={1}
            hideControls
            w={30}
            variant="unstyled"
            styles={{ input: { textAlign: "center", padding: 0 } }}
          />

          <ActionIcon
            aria-label="Increase quantity"
            variant="light"
            color="dark"
            size={20}
            onClick={() => handleChange(count + 1)}
          >
            <IconPlus size={10} radius="sm" />
          </ActionIcon>
        </Group>
      </Group>

      <Group mt="md" justify="space-between">
        <Text fw={700} size="lg">$ {price}</Text>
        <Button
          className="button"
          variant="light"
          color="green"
          rightSection={<IconShoppingCart size={16} />}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
}
