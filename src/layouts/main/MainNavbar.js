// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, AppBar, Toolbar, Container } from "@mui/material";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
// components
import Logo from "../../components/Logo";
import Label from "../../components/Label";
import { MHidden } from "../../components/@material-extend";
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
import logo from "../../assets/logo/Main Website Logo.jpg";
import Image from "next/image";
import LoginFormModal from "src/components/AuthModal/LoginModal";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import SignUpModal from "src/components/AuthModal/SignUpModal";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const isOffset = useOffSetTop(100);
  const { pathname } = useRouter();
  const isHome = pathname === "/";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSignUpOpen = () => {
    setSignupOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSignupOpen(false);
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: "background.default",
            height: { md: APP_BAR_DESKTOP - 16 },
          }),
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <NextLink href="/">
            {/* <Logo /> */}
            <Image
              src={logo}
              alt="Picture of the logo"
              width={100}
              height={40}
              className="cursor-pointer"
            />
          </NextLink>
          {/* <Label color="info" sx={{ ml: 1 }}>
            E-commerce UAE
          </Label> */}
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              // isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>

          {/* <Button variant="contained" onClick={handleClickOpen}>
            Login
          </Button> */}
          <div className="flex gap-2 items-center">
            <div>
              <HiOutlineUser className="text-black text-xl" />
            </div>
            <div className="text-black text-xs uppercase">
              <h1 onClick={handleClickOpen} className="cursor-pointer">
                Login
              </h1>
              <h1 onClick={handleSignUpOpen} className="cursor-pointer">
                Signup
              </h1>
            </div>
          </div>

          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>

          <LoginFormModal
            open={open}
            onClose={handleClose}
          />
          <SignUpModal
            open={signupOpen}
            onClose={handleClose}
          />
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
