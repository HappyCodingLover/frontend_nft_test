import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { contractAddress } from "../../constants";
import AttributeCard from "../attributeCard";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(() => ({
  textTransform: "capitalize",
}));

const StyledTypography = styled(Typography)(() => ({
  whiteSpace: "nowrap",
  color: "black",
  fontSize: "16px",
  fontWeight: 500,
  padding: "4px 0px",
}));

export default function DetailsDialog({ nft, collectionName, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const purchaseHandler = () => {
    window.open(
      `https://opensea.io/assets/ethereum/${contractAddress}/${nft.tokenId}`,
      "_blank"
    );
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="details-dialog-title"
    >
      <DialogTitle id="details-dialog-title">{"Details"}</DialogTitle>
      <DialogContent sx={{ overflowY: "auto" }}>
        <StyledTypography>{`By ${collectionName}`}</StyledTypography>
        <StyledTypography>{`Owner: ${nft?.ownerAddress}`}</StyledTypography>
        <StyledTypography>Attributes</StyledTypography>
        <Grid container spacing={2}>
          {nft?.metaData?.attributes
            .sort((a, b) => {
              const traitA = a.trait_type.toUpperCase();
              const traitB = b.trait_type.toUpperCase();
              if (traitA < traitB) {
                return -1;
              }
              if (traitA > traitB) {
                return 1;
              }
              return 0;
            })
            .map((attribute, idx) => {
              return (
                <Grid item xs={4} key={idx}>
                  <AttributeCard attribute={attribute} />
                </Grid>
              );
            })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <StyledButton autoFocus onClick={handleClose}>
          Close
        </StyledButton>
        <StyledButton onClick={purchaseHandler} autoFocus>
          Purchase
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
}
