//useGenre is use to convert all the selected genres into string so that they can we passed to movie url as a value of with_genres which takes input as a string

const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
    const GenreIds = selectedGenres.map((g) => g.id);
    return GenreIds.reduce((acc, curr) => acc + ',' + curr);
    
}

export default useGenre;
