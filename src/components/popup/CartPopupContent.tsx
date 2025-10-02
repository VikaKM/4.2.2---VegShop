import { Stack, Group, Image, Text, ActionIcon, NumberInput, Divider } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import emptyCartImg from "../../assets/cart_empty.png";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/index";
import { updateCartQuantity } from "../../store/cartSlice";

export function CartPopupContent() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  if (items.length === 0) {
    return (
      <Stack align="center" p="md">
        <Image src={emptyCartImg} alt="Пустая корзина" w={117} h={106} />
        <Text size="sm" c="dimmed">Your cart is empty</Text>
      </Stack>
    );
  }

  const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <Stack p="md" gap="sm">
      {items.map((item, index) => {
        const [title, weight] = item.name.split(" - ");
        return (
          <Stack key={item.id} gap={4}>
            <Group align="flex-start" gap="sm">
              <Image src={item.image} alt={item.name} w={50} h={50} radius="sm"/>
              <Stack gap={2} style={{ flex: 1 }}>
                <Group gap={12} align="center">
                  <Text size="sm" fw={500}>{title}</Text>
                  <Text size="xs" c="dimmed">{weight}</Text>
                </Group>
                <Text fw={600}>$ {item.quantity * item.price}</Text>
              </Stack>

              <Group gap={0} align="center" justify="center">
                <ActionIcon 
                  aria-label="Decrease quantity" 
                  variant="light" 
                  color="dark" 
                  size={20} 
                  onClick={() => 
                    dispatch(updateCartQuantity({ ...item, quantity: Math.max(1, item.quantity - 1) }))}
                >
                  <IconMinus size={10}/>
                </ActionIcon>

                <NumberInput
                  value={item.quantity}
                  min={1}
                  hideControls
                  w={30}
                  variant="unstyled"
                  styles={{ input: { textAlign: "center", padding: 0 } }}
                  onChange={(val) => {
                    if (val === undefined) return;
                    const newCount = typeof val === "string" ? parseInt(val, 10) : val;
                    dispatch(updateCartQuantity({ id: item.id, quantity: Math.max(1, newCount) }));
                  }}
/>

                <ActionIcon
                  aria-label="Increase quantity" 
                  variant="light" 
                  color="dark" 
                  size={20} 
                  onClick={() => dispatch(updateCartQuantity({ ...item, quantity: item.quantity + 1 }))}
                >
                  <IconPlus size={10}/>
                </ActionIcon>
              </Group>
            </Group>

            {index < items.length - 1 && <Divider color="gray.3" style={{ marginLeft: 58, marginRight: 0 }}/>}
          </Stack>
        );
      })}

      <Divider my="sm"/>
      <Group justify="space-between">
        <Text fw={600}>Total</Text>
        <Text fw={700}>$ {total}</Text>
      </Group>
    </Stack>
  );
}
