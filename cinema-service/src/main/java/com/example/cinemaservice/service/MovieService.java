package com.example.cinemaservice.service;

import com.example.cinemaservice.dtos.FilmPersonelDTO;
import com.example.cinemaservice.dtos.GenreDTO;
import com.example.cinemaservice.dtos.MovieDTO;
import com.example.cinemaservice.entity.FilmPersonel;
import com.example.cinemaservice.entity.Genres;
import com.example.cinemaservice.entity.Movie;
import com.example.cinemaservice.entity.Showtime;
import com.example.cinemaservice.entity.enums.MovieStatus;
import com.example.cinemaservice.repository.MovieRepository;
import com.example.cinemaservice.repository.ShowtimeRepository;
import com.example.cinemaservice.service.Imp.MovieServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MovieService implements MovieServiceImp {
    private final MovieRepository repository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    public MovieService(MovieRepository repository) {
        this.repository = repository;
    }

    @Override
    public Movie create(Movie entity) {
        validateShowtimesWithDuration(entity);
        return repository.save(entity);
    }

    @Override
    public MovieDTO getById(Integer id) {
        Movie movie = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));

        MovieDTO result = convertToDTO(movie);

        return result;
    }

    @Override
    public List<Movie> getAll() {
        return repository.findAll();
    }

    @Override
    public Page<MovieDTO> getByStatus(String status, int page, int size) {
        List<Movie> movies;
        if (status == null || status.isEmpty()) {
            movies = repository.findAll();
        } else {
            try {
                MovieStatus movieStatus = MovieStatus.valueOf(status.toUpperCase());
                movies = repository.findByStatus(movieStatus);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid movie status: " + status);
            }
        }

        List<MovieDTO> movieDTOS = new ArrayList<>();

        for(Movie movie : movies) {
            MovieDTO dto = convertToDTO(movie);
            movieDTOS.add(dto);
        }

        int totalElements = movieDTOS.size();
        int start = Math.min(page * size, totalElements);
        int end = Math.min(start + size, totalElements);
        List<MovieDTO> subList = movieDTOS.subList(start, end);

        Page<MovieDTO> result = new PageImpl<>(subList, PageRequest.of(page, size), totalElements);
        return result;
    }

    private MovieDTO convertToDTO(Movie movie) {
        MovieDTO dto = new MovieDTO();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setSynopsis(movie.getSynopsis());

        List<Genres> genres = movie.getGenres();
        List<GenreDTO> genreDTOS = new ArrayList<>();

        for(Genres genre : genres) {
            GenreDTO genreDTO = new GenreDTO();
            genreDTO.setId(genre.getId());
            genreDTO.setName(genre.getName());
            genreDTOS.add(genreDTO);
        }

        List<FilmPersonel> personels = movie.getPersonels();
        List<FilmPersonelDTO> filmPersonelDTOS = new ArrayList<>();

        for(FilmPersonel personel : personels) {
            FilmPersonelDTO filmPersonelDTO = new FilmPersonelDTO();
            filmPersonelDTO.setId(personel.getId());
            filmPersonelDTO.setName(personel.getName());
            filmPersonelDTO.setRole(personel.getRole().toString());
            filmPersonelDTOS.add(filmPersonelDTO);
        }

        dto.setGenres(genreDTOS);
        dto.setDuration(movie.getDuration());
        dto.setAgeRanging(movie.getAgeRanging());
        dto.setImageUrl(movie.getImageUrl());
        dto.setPersonels(filmPersonelDTOS);
        dto.setTrailerUrl(movie.getTrailerUrl());

        dto.setStatus(movie.getStatus().toString());
        return dto;
    }

    @Override
    public Movie update(Integer id, Movie entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Movie not found: " + id);
        }
        entity.setId(id);
        validateShowtimesWithDuration(entity);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public MovieDTO getByTicketId(Integer bookingId) {
    Movie movie = repository.findByShowtimeList_Id(bookingId);

    return convertToDTO(movie);
    }

    @Override
    public MovieDTO getMovieByShowtimeID(int showtimeID) {
        try{
            Showtime showtime = showtimeRepository.getShowtimesById(showtimeID);
            Movie movie = repository.getMovieById(showtime.getMovie().getId());
            return convertToDTO(movie);
        }catch (Exception e){
            return null;
        }
    }

    private void validateShowtimesWithDuration(Movie movie) {
        if (movie.getShowtimeList() != null && movie.getDuration() != 0) {
            for (Showtime showtime : movie.getShowtimeList()) {
                long now = LocalDate.now().atStartOfDay().toInstant(java.time.ZoneOffset.UTC).toEpochMilli();
                long start = showtime.getStartTime().getTime();
                long end = showtime.getEndTime().getTime();
                long maxEnd = start + movie.getDuration() * 60 * 1000L;
                if (end < maxEnd) {
                    throw new IllegalArgumentException("Showtime (start: " + showtime.getStartTime() + ", end: " + showtime.getEndTime() + ") vượt quá duration của phim (" + movie.getDuration() + " phút)");
                }
                if( start < now) {
                    throw new IllegalArgumentException("Showtime (start: " + showtime.getStartTime() + ") không được trước thời điểm hiện tại");
                }
            }
        }
    }
}
