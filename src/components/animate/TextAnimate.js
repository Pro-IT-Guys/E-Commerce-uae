// import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
//
import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------

TextAnimate.propTypes = {
  text: PropTypes.string,
  variants: PropTypes.object,
  sx: PropTypes.object,
};

export default function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Typography
      component={h1}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <span key={index} variants={variants || varFadeInUp}>
          {letter}
        </span>
      ))}
    </Typography>
  );
}
