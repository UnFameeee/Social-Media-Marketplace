import { Avatar, Badge } from '@mui/material';
import { BetterIconButton } from './Button/IconButton';

export function BadgeIconButton(props) {
  const { badgeConfig, iconButtonConfig } = props;

  const { location = 'top' } = badgeConfig;

  return (
    <Badge
      anchorOrigin={{
        vertical: location,
        horizontal: 'right',
      }}
      {...badgeConfig}
    >
      <BetterIconButton hasBackground {...iconButtonConfig}>
        {props.children}
      </BetterIconButton>
    </Badge>
  );
}

export function AvatarWithBadge(props) {
  const { badgeConfig, avatarConfig } = props;

  const { location = 'top' } = badgeConfig;
  return (
    <Badge
      anchorOrigin={{
        vertical: location,
        horizontal: 'right',
      }}
      {...badgeConfig}
    >
      <Avatar {...avatarConfig} />
    </Badge>
  );
}
