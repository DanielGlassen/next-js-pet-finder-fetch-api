import React, { useState } from "react";
import { NextPage } from "next";
import Button from "../../components/ui/button/button";
import Container from "../../components/container/container";
import ContainerHeader from "../../components/containerHeader/containerHeader";
import Grid from "../../components/grid/grid";
import GridItem from "../../components/grid/gridItem";
import Loader from "../../components/ui/loader/loader";
import { Smile, Sad, Heart } from "../../assets/svg";
import { useDogContext } from "../../context/DogContext";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addLike, addDislike, addFavourite } from "../../store/reducers/voteSlice";
import Snackbar from "../../components/ui/snackbar/snackbar";

const Breed: NextPage = () => {
  const { selectedDog } = useDogContext();
  const dispatch = useAppDispatch();
  const {likes, dislikes ,favourites} = useAppSelector((state) => state.votes);
  

  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  if (!selectedDog) {
    return <Loader centered />;
  }

  const handleLike = () => {
    if (likes.find(item => item.id === selectedDog.id)) {
      showSnackbar(`Already added ${selectedDog.name} to Likes!`);
    } else {
      dispatch(addLike(selectedDog));
      showSnackbar(`Added ${selectedDog.name} to Likes!`);
    }
  };

  const handleDislike = () => {
    if (dislikes.find(item => item.id === selectedDog.id)) {
      showSnackbar(`Already added ${selectedDog.name} to Likes!`);
    } else {
      dispatch(addDislike(selectedDog));
      showSnackbar(`Added ${selectedDog.name} to Dislikes!`);
    }
  };

  const handleFavourite = () => {
    if (favourites.find(item => item.id === selectedDog.id)) {
      showSnackbar(`Already added ${selectedDog.name} to Likes!`);
    } else {
      dispatch(addFavourite(selectedDog));
      showSnackbar(`Added ${selectedDog.name} to Favorites!`);
    }
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <ContainerHeader
        className="flex-wrap"
        title={selectedDog.name}
        titleVariant="primarySoft"
      />
      <Grid className="mt-[20px] w-full">
        <GridItem component="a">
          <img src={selectedDog.img} alt={selectedDog.name} />
        </GridItem>
        <div>
          <p><strong>Name:</strong> {selectedDog.name}</p>
          <p><strong>Age:</strong> {selectedDog.age}</p>
          <p><strong>Breed:</strong> {selectedDog.breed}</p>
          <p><strong>Zip:</strong> {selectedDog.zip_code}</p>
          <p><strong>ID:</strong> {selectedDog.id}</p>
        </div>
        <GridItem component="b">
          <Button onClick={handleLike} variant="default" aria-label="like">
            <Smile />
          </Button>
          <Button onClick={handleFavourite} variant="default" aria-label="favourites">
            <Heart />
          </Button>
          <Button onClick={handleDislike} variant="default" aria-label="dislike">
            <Sad />
          </Button>
        </GridItem>
      </Grid>

      <Snackbar
        message={snackbarMessage}
        isOpen={snackbarOpen}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default Breed;
