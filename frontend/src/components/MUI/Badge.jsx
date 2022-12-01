import { Avatar, Badge } from '@mui/material';
import { BetterIconButton } from './Button/IconButton';

export function BadgeIconButton(props) {
  const { badgeConfig = {}, iconButtonConfig = {} } = props;

  return (
    <Badge
      {...badgeConfig}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          fontSize: '1.4rem',
          top: '0.4rem',
          right: '0.4rem',
        },
      }}
    >
      <BetterIconButton hasBackground {...iconButtonConfig}>
        {props.children}
      </BetterIconButton>
    </Badge>
  );
}

export function AvatarWithBadge(props) {
  const { avatarConfig = {} } = props;
  return (
    <div style={{ position: 'relative' }}>
      <Avatar {...avatarConfig}></Avatar>

      <BetterIconButton
        hasBackground
        sx={{
          pointerEvents: 'none',
          width: '3rem',
          height: '3rem',
          position: 'absolute',
          backgroundColor: 'var(--primary-color) !important',
          color: 'white !important',
          bottom: '-0.4rem',
          right: '-0.4rem',
          '& svg': {
            fontSize: '2rem',
          },
        }}
      >
        {props.children}
      </BetterIconButton>
    </div>
  );
}
