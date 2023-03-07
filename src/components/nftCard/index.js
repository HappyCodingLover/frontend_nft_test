import { Box } from "@mui/material";
import { ipfsGateWay } from "../../constants";
import { styled } from "@mui/material/styles";

const StyledImage = styled("img")(() => ({
  objectFit: "cover",
  width: "100%",
  borderRadius: 2,
  "&:hover": {
    transform: "translateY(0) scale(1.05)",
  },
  // , border: selected ? "1px solid black" : "none"
}));

const NftCard = ({ nft, handler, selected }) => {
  const { tokenId, metaData } = nft;
  return (
    <Box sx={{ cursor: "pointer" }} onClick={handler}>
      <StyledImage
        src={metaData.image.replace("ipfs://", ipfsGateWay)}
        alt={`${tokenId} - ${tokenId}`}
      />
    </Box>
  );
};

export default NftCard;
