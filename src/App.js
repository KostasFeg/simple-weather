import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import AcUnitSharpIcon from '@material-ui/icons/AcUnitSharp';
import ImportExportSharpIcon from '@material-ui/icons/ImportExportSharp';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import drop from './icons/drop.png';
import thermometer from './icons/thermometer.png';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import Snackbar from '@material-ui/core/Snackbar';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import cloud from './icons/cloud.png';
import weatherIcon from './icons/weather.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  },
  centerSearch: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    justifyItems: 'center',
    marginTop: '10px',
  },
  paperi: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'textSecondary',
  },
  countryImage: {
    width: '10%',
  },
  img: {
    width: theme.spacing(3.2),
  },
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  flexing: {
    display: 'flex',

    alignContent: 'center',
    justifyContent: 'center',
  },
  currentInfo: {
    alignContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  margined: {
    marginBottom: '2px',
  },
  marginTop: {
    marginTop: '10px',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  centerSaved: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
  },
  divider: {
    marginTop: '15px',
  },
  heading: {
    color: 'primary',
  },
}));

const App = () => {
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState([]);
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem('locations'))
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackBarClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  dayjs.extend(utc);
  dayjs.extend(timezone);

  useEffect(() => {
    if (!location) return;

    const FULL_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}
      &appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    axios
      .get(FULL_API_URL)
      .then((response) => {
        let country = response.data.sys.country;
        let name = response.data.name;

        return axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
          )
          .then((response) => {
            setData([
              ...data,
              {
                data: response.data,
                location: name,
                country: country,
              },
            ]);
            console.log(response);
          });
      })
      .catch((error) => console.log('Error', error));
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(text);
  };

  const handleSave = (x) => {
    let a = [];
    a = JSON.parse(localStorage.getItem('locations')) || [];
    a.push(x);
    alert(a);
    localStorage.setItem('locations', JSON.stringify(a));

    saved === null ? setSaved([x]) : saved.push(x);
    console.log(saved);
  };

  const classes = useStyles();

  const showSavedLocations = () =>
    saved
      ? saved.map((savedLocation) => (
          <MenuItem onClick={() => setLocation(savedLocation)}>
            {savedLocation}
          </MenuItem>
        ))
      : '';

  console.log(dayjs.utc(1606200259).format());

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3" color="primary" className={classes.paperi}>
              Simple Weather
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.paper}>
              <form onSubmit={handleSubmit} className={classes.centerSearch}>
                <TextField
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  id="outlined-basic"
                  label="Search..."
                  color="secondary"
                />
              </form>
              {saved ? (
                <div className={classes.centerSearch}>
                  <Button
                    startIcon={<SaveSharpIcon />}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    variant="outlined"
                    color="secondary"
                    onClick={handleClick}
                  >
                    Saved
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {showSavedLocations()}
                  </Menu>
                </div>
              ) : (
                ''
              )}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.paper}>
              {data
                ? data.map((data) => (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <img
                          alt="country-img"
                          className={classes.countryImage}
                          src={`https://www.countryflags.io/${data.country}/flat/64.png`}
                        ></img>
                        <div className={classes.centerSearch}>
                          <Typography
                            className={classes.heading}
                            color="primary"
                          >
                            {data.location} {Math.floor(data.data.current.temp)}
                            °{' '}
                            {dayjs().tz(data.data.timezone).format('HH:mm:ss')}
                          </Typography>
                        </div>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Grid container>
                          <Grid item xs={12} sm={6}>
                            <List>
                              <ListItem>
                                <ListItemAvatar>
                                  <img
                                    src={`http://openweathermap.org/img/wn/${data.data.current.weather[0].icon}@2x.png`}
                                    alt="weather icon"
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    data.data.current.weather[0].description
                                  }
                                />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    color="primary"
                                    edge="end"
                                    aria-label="delete"
                                    onClick={
                                      JSON.parse(
                                        localStorage.getItem('locations')
                                      ) !== null &&
                                      JSON.parse(
                                        localStorage.getItem('locations')
                                      ).includes(data.location)
                                        ? () => handleSnackBarClick()
                                        : () => handleSave(data.location)
                                    }
                                  >
                                    <SaveSharpIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            </List>
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sm={6}
                            className={classes.currentInfo}
                          >
                            <Chip
                              avatar={
                                <Avatar>
                                  <img src={thermometer} alt="weather icon" />
                                </Avatar>
                              }
                              label={`Feels like: ${data.data.current.feels_like}°`}
                              color="primary"
                              className={classes.margined}
                            />
                            <Chip
                              avatar={
                                <Avatar>
                                  <img src={drop} alt="weather icon" />
                                </Avatar>
                              }
                              label={`Humidity: ${data.data.current.humidity}%`}
                              color="primary"
                              className={classes.margined}
                            />
                            <Chip
                              avatar={
                                <Avatar>
                                  <img src={cloud} alt="weather icon" />
                                </Avatar>
                              }
                              label={`Clouds ${data.data.current.clouds}% `}
                              color="primary"
                              className={classes.margined}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Divider
                              className={classes.divider}
                              variant="middle"
                            />
                            <Typography
                              variant="body2"
                              color="primary"
                              className={classes.centerSearch}
                            >
                              Next 4 hours
                            </Typography>
                            <Stepper alternativeLabel>
                              {data.data.hourly
                                .slice(0, 4)
                                .map((hour, index) => (
                                  <Step key={index}>
                                    <StepLabel>
                                      {hour.temp}°
                                      <img
                                        className={classes.img}
                                        src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                                      />
                                    </StepLabel>
                                  </Step>
                                ))}
                            </Stepper>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid item className={classes.flexing}>
                              <Timeline className={classes.left}>
                                {data.data.daily.map((day, index) => (
                                  <TimelineItem>
                                    <TimelineOppositeContent>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                      >
                                        {day.temp.day}°
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                      >
                                        {dayjs()
                                          .tz(data.data.timezone)
                                          .add(index, 'day')
                                          .format('DD/MM/YYYY')}
                                      </Typography>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                      <TimelineDot>
                                        <img
                                          className={classes.img}
                                          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                        />
                                      </TimelineDot>
                                      <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                      <Typography variant="body2" color="error">
                                        humidity:{day.humidity}%
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="primary"
                                      >
                                        min:{day.temp.min}°
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="secondary"
                                      >
                                        max:{day.temp.max}°
                                      </Typography>
                                    </TimelineContent>
                                  </TimelineItem>
                                ))}
                              </Timeline>
                            </Grid>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))
                : ''}
            </div>
          </Grid>
          {open ? (
            <Snackbar
              open={open}
              message="Location already saved!"
              autoHideDuration={6000}
            />
          ) : (
            ''
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default App;

//setLocationToUpdate([
//  ...locationToUpdate,
//  locationToUpdate.includes(response.data.name)
//    ? ''
//    : response.data.name,
//]);
