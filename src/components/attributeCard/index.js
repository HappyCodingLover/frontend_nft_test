import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardContainer = styled(Box)(() => ({
  backgroundColor: "rgba(21, 178, 229, 0.06)",
  borderRadius: "6px",
  border: "1px solid rgb(21, 178, 229)",
  padding: "10px",
  textAlign: "center",
}));

const TraitTypeText = styled(Typography)(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "rgb(21, 178, 229)",
  fontSize: "11px",
  fontWeight: 500,
  textTransform: "uppercase",
}));

const TraitValueText = styled(Typography)(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: 500,
  textTransform: "uppercase",
  color: "rgb(53, 56, 64)",
  fontSize: "15px",
  lineHeight: "30px",
}));

export default function AttributeCard({ attribute }) {
  return (
    <CardContainer>
      <TraitTypeText>{attribute?.trait_type}</TraitTypeText>
      <TraitValueText>{attribute?.value}</TraitValueText>
    </CardContainer>
  );
}
