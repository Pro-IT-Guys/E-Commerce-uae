import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import Logo from './Logo';
import logoImg from '../assets/logo/aymi-logo.png'
import Image from 'next/image'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9998,
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function CustomLoadingScreen({ ...other }) {



    return (
      <RootStyle {...other}>
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity,
          }}
        >
          {/* <Logo sx={{ width: 64, height: 64 }} /> */}
          <Image
            src={logoImg}
            alt="logo"
            width={84}
            height={50}
          />
        </motion.div>

        <Box
          component={motion.div}
          animate={{
            scale: [1.2, 1, 1, 1.2, 1.2],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          }}
          transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) =>
              `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
          }}
        />

        <Box
          component={motion.div}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          }}
          transition={{
            ease: 'linear',
            duration: 3.2,
            repeat: Infinity,
          }}
          sx={{
            width: 120,
            height: 120,
            borderRadius: '25%',
            position: 'absolute',
            border: (theme) =>
              `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
          }}
        />
      </RootStyle>
    );
  }
