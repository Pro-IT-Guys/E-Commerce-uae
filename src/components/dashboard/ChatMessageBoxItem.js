import PropTypes from 'prop-types'
import { formatDistanceToNowStrict } from 'date-fns'
// material
import { styled } from '@mui/material/styles'
import { Avatar, Box, Typography } from '@mui/material'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '10px',
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}))

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}))

const MessageImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  cursor: 'pointer',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    height: 200,
    minWidth: 296,
  },
}))

// ----------------------------------------------------------------------

ChatMessageBoxItem.propTypes = {
  message: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
}

export default function ChatMessageBoxItem({ message, chat, user }) {
  const receiver = chat

  const isValidURL = message => {
    const urlPattern =
      /^(https?:\/\/)?([\w.-]+\.[a-zA-Z]{2,}|localhost)(\/\S*)?$/
    return urlPattern.test(message)
  }

  const senderDetails =
    message.senderId === user?._id
      ? { type: 'me' }
      : {
          avatar: receiver?.avatar,
          name: `${receiver?.name?.firstName} ${receiver?.name?.lastName}`,
        }

  const isMe = senderDetails.type === 'me'
  const isImage = false

  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto',
          }),
        }}
      >
        {senderDetails.type !== 'me' && (
          <Avatar
            alt={senderDetails.name}
            src={senderDetails.avatar}
            sx={{ width: 32, height: 32, mr: 2 }}
          />
        )}

        <div>
          <InfoStyle
            variant="caption"
            sx={{ ...(isMe && { justifyContent: 'flex-end' }) }}
          >
            {!isMe && `${receiver?.name?.firstName},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </InfoStyle>

          <ContentStyle
            sx={{
              ...(isMe && { color: 'grey.800', bgcolor: 'primary.lighter' }),
              ...(isImage && { p: 0 }),
            }}
          >
            {isImage ? (
              <MessageImgStyle alt="attachment" src={message.body} />
            ) : (
              <>
                {isValidURL(message.text) ? (
                  <Typography
                    onClick={() => window.open(message.text, '_blank')}
                    variant="body2"
                    sx={{ color: 'blue', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {message.text}
                  </Typography>
                ) : (
                  <Typography variant="body2">{message.text}</Typography>
                )}
              </>
            )}
          </ContentStyle>
        </div>
      </Box>
    </RootStyle>
  )
}
