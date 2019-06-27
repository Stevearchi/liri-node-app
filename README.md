# liri-node-app

Liri is a CLI app written in Javascript which has four options.  The options are as follows:
1. `concert-this <band name>`
    This will search for upcoming concerts from the given band.  It displays information for all of these concerts.
2. `spotify-this-song <song name>`
    This searches spotify for a song. Optionally, the band name can be put in as well.  Information for the song is displayed.
3. `movie-this <movie name>`
    Searches OMDB for the given movie.  Displays information for the movie
4. `do-what-it-says`
    This reads the file 'random.txt' located in the parent directory.  It then runs whatever command and search term are
    in that file.  They must be in the format `<command>,<search term>`.



Demo: https://www.youtube.com/watch?v=jcrCwnN5PEg

Github: https://github.com/Stevearchi/liri-node-app

Technologies used:
1. node.js
2. fs
3. Axios
4. npm

Developed by Steve Archibald
