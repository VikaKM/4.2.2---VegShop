import { Group, Text, Button, Box } from "@mantine/core";

interface CartButtonProps {
  onClick?: () => void;
  totalCount: number;  
  totalPrice: number;   
}

export default function CartButton({ onClick, totalCount, totalPrice }: CartButtonProps) {
  return (
    <Button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#54B46A",
        color: "white",
        padding: "8px 12px",
      }}
    >
      <Group gap={8} align="center">
        <Box
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: "50%",
            width: 18,
            height: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 400,
          }}
        >
          {totalCount}
        </Box>
        <Text style={{ fontWeight: 700 }}>Cart</Text>
        <Box
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: 8,
            padding: "4px 8px",
            fontWeight: 400,
            fontSize: 12,
          }}
        >
          ${totalPrice.toFixed(2)}
        </Box>
      </Group>
    </Button>
  );
}
