import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import DetailsDialog from "../components/detailPage";
import NftCard from "../components/nftCard";
import PageLoader from "../components/pageLoader";
import { limit } from "../constants";
import { getCollectionName, getNfts, getTotalSupply } from "../utils/nfts";
import toast from "react-hot-toast";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCounts, setPageCounts] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [collectionName, setCollectionName] = useState("");
  const [curNft, setCurNft] = useState(null);
  const [open, setOpen] = useState(false);

  const init = useCallback(async () => {
    setLoading(true);
    const toastLoading = toast.loading("Loading NFTs");
    const supplyRes = await getTotalSupply();
    const nameRes = await getCollectionName();
    setTotalSupply(supplyRes.data);
    setCollectionName(nameRes.data);
    const nftsRes = await getNfts(supplyRes.data, 0);
    if (nftsRes.success) {
      setNfts(nftsRes.data);
      toast.success(nftsRes.msg, { id: toastLoading });
    } else {
      setNfts([]);
      toast.error(nftsRes.msg, { id: toastLoading });
    }
    setPageCounts(Math.floor(supplyRes.data / limit) + 1);
    setLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const paginationHandler = async (event, page) => {
    event.preventDefault();
    console.log("clicked");
    setLoading(true);
    setPageNumber(page);
    const toastLoading = toast.loading("Loading NFTs");
    const nftsRes = await getNfts(totalSupply, page);
    if (nftsRes.success) {
      setNfts(nftsRes.data);
      toast.success(nftsRes.msg, { id: toastLoading });
    } else {
      setNfts([]);
      toast.error(nftsRes.msg, { id: toastLoading });
    }
    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h6" align="center" sx={{ py: 4 }}>
        {collectionName}
      </Typography>
      {!loading ? (
        <Grid container spacing={2}>
          {nfts?.map((nft, idx) => {
            return (
              <Grid item xs={4} md={3} key={idx}>
                <NftCard
                  nft={nft}
                  selected={curNft === nft}
                  handler={() => {
                    setCurNft(nft);
                    setOpen(true);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <PageLoader />
      )}
      {pageCounts !== 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Pagination
            page={pageNumber}
            count={pageCounts}
            color="primary"
            onChange={paginationHandler}
            hideNextButton={pageNumber === pageCounts}
          />
        </Box>
      )}

      <DetailsDialog
        nft={curNft}
        collectionName={collectionName}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
};

export default Home;
