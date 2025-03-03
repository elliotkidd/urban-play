export type IconProps = JSX.IntrinsicElements["svg"] & {
  direction?: "up" | "right" | "down" | "left";
};

export function Icon({
  children,
  className,
  fill = "currentColor",
  stroke,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      {...props}
      fill={fill}
      stroke={stroke}
      className={`flex h-6 w-6 fill-current ${className}`}
    >
      {children}
    </svg>
  );
}
export function AsteriskIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Asterisk</title>
      <path d="M4.28906 14.7899C5.70364 13.3768 7.19071 12.0288 8.68196 10.7072C6.78532 10.5816 4.89081 10.5 3 10.5V8.5C4.32658 8.5 5.65566 8.5393 6.9831 8.60518C6.13288 7.79891 5.27122 7.0173 4.3623 6.27706L5.61343 4.72266C7.16302 5.98467 8.57933 7.35952 9.95801 8.70709V2.5H11.9463V7.82356C13.4192 6.50942 14.8556 5.18622 16.2098 3.79883L17.6285 5.20001C16.3112 6.5497 14.9235 7.83538 13.5215 9.09113C14.1987 9.15257 14.8736 9.21551 15.5457 9.27818L15.5462 9.27823C16.3687 9.35493 17.187 9.43123 18 9.50393L17.824 11.4961C16.9947 11.4219 16.1654 11.3447 15.3361 11.2674H15.3361C14.3342 11.174 13.3323 11.0807 12.3307 10.9929C13.3528 11.9457 14.398 12.8576 15.5218 13.697L14.3365 15.3027C13.4997 14.6777 12.7079 14.0179 11.9463 13.3411V17.5H9.95801V12.2418C8.49159 13.542 7.0546 14.8459 5.69007 16.209L4.28906 14.7899Z" />
    </Icon>
  );
}
export function IconClose(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Close</title>

      <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
    </Icon>
  );
}
export function IconAsterisk(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Asterisk</title>
      <path d="M8 0V15" strokeWidth="2" />
      <path d="M0 7C5.01188 7 10.0545 7.5604 15 8" strokeWidth="2" />
      <path d="M14 2C10.2205 5.84946 5.83572 9.19092 2 13" strokeWidth="2" />
      <path d="M2 3C5.51115 5.84277 8.33175 9.27632 12 12" strokeWidth="2" />
    </Icon>
  );
}

export function IconArrow({ direction = "right", className }: IconProps) {
  let rotate;

  switch (direction) {
    case "right":
      rotate = "rotate-0";
      break;
    case "left":
      rotate = "rotate-180";
      break;
    case "up":
      rotate = "-rotate-90";
      break;
    case "down":
      rotate = "rotate-90";
      break;
    default:
      rotate = "rotate-0";
  }

  return (
    <Icon className={`${className} ${rotate}`}>
      <title>Arrow</title>
      <path d="M7 3L14 10L7 17" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconChevron({ direction = "right", className }: IconProps) {
  let rotate;

  switch (direction) {
    case "right":
      rotate = "rotate-0";
      break;
    case "left":
      rotate = "rotate-180";
      break;
    case "up":
      rotate = "-rotate-90";
      break;
    case "down":
      rotate = "rotate-90";
      break;
    default:
      rotate = "rotate-0";
  }

  return (
    <Icon className={`${className} ${rotate}`}>
      <title>Chevron</title>
      <path d="M10.9497 10.364L6 15.3138L7.41421 16.728L13.7782 10.364L7.41421 4L6 5.41422L10.9497 10.364Z" />
    </Icon>
  );
}
export function IconDoubleChevron({
  direction = "right",
  className,
}: IconProps) {
  let rotate;

  switch (direction) {
    case "right":
      rotate = "rotate-0";
      break;
    case "left":
      rotate = "rotate-180";
      break;
    case "up":
      rotate = "-rotate-90";
      break;
    case "down":
      rotate = "rotate-90";
      break;
    default:
      rotate = "rotate-0";
  }

  return (
    <Icon className={`${className} ${rotate}`}>
      <title>Double Chevron</title>
      <path d="M16.3337 9.62331L10.877 4.16667L9.63379 5.4099L13.8472 9.62331L9.63379 13.8367L10.877 15.08L16.3337 9.62331ZM11.3668 9.62331L5.91022 4.16667L4.66699 5.4099L8.88041 9.62331L4.66699 13.8367L5.91022 15.08L11.3668 9.62331Z" />
    </Icon>
  );
}

export function IconCarat({
  direction = "right",
  className,
  fill,
  stroke,
}: IconProps) {
  let rotate;

  switch (direction) {
    case "right":
      rotate = "rotate-0";
      break;
    case "left":
      rotate = "rotate-180";
      break;
    case "up":
      rotate = "-rotate-90";
      break;
    case "down":
      rotate = "rotate-90";
      break;
    default:
      rotate = "rotate-0";
  }

  return (
    <svg
      viewBox="0 0 20 20"
      fill={fill}
      stroke={stroke}
      className={`h-5 w-5 fill-current ${className} ${rotate}`}
    >
      <title>Carat</title>
      <path d="M10.9724 10.0006L6.84766 5.87577L8.02616 4.69727L13.3295 10.0006L8.02616 15.3038L6.84766 14.1253L10.9724 10.0006Z" />
    </svg>
  );
}

export function IconSelectCarat({
  direction = "right",
  className,
  fill,
  stroke,
}: IconProps) {
  let rotate;

  switch (direction) {
    case "right":
      rotate = "rotate-0";
      break;
    case "left":
      rotate = "rotate-180";
      break;
    case "up":
      rotate = "-rotate-90";
      break;
    case "down":
      rotate = "rotate-90";
      break;
    default:
      rotate = "rotate-0";
  }

  return (
    <svg
      viewBox="0 0 20 20"
      fill={fill}
      stroke={stroke}
      className={`h-5 w-5 fill-current ${className} ${rotate}`}
    >
      <title>Select Carat</title>
      <g clipPath="url(#clip0_4125_2878)">
        <path d="M10 14L2 6H18L10 14Z" />
      </g>
      <defs>
        <clipPath id="clip0_4125_2878">
          <rect width="20" height="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function IconCaret({
  direction = "down",
  stroke = "currentColor",
  className,
  ...props
}: IconProps) {
  let rotate;

  switch (direction) {
    case "down":
      rotate = "rotate-0";
      break;
    case "up":
      rotate = "rotate-180";
      break;
    case "left":
      rotate = "-rotate-90";
      break;
    case "right":
      rotate = "rotate-90";
      break;
    default:
      rotate = "rotate-0";
  }

  return (
    <Icon
      {...props}
      className={`${className} ${rotate}`}
      fill="transparent"
      stroke={stroke}
    >
      <title>Caret</title>
      <path d="M14 8L10 12L6 8" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconSelect(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Select</title>
      <path d="M7 8.5L10 6.5L13 8.5" strokeWidth="1.25" />
      <path d="M13 11.5L10 13.5L7 11.5" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconBag(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Bag</title>

      <path d="M7.00488 7.99951V5.99951C7.00488 3.23809 9.24346 0.999512 12.0049 0.999512C14.7663 0.999512 17.0049 3.23809 17.0049 5.99951V7.99951H20.0049C20.5572 7.99951 21.0049 8.44723 21.0049 8.99951V20.9995C21.0049 21.5517 20.5572 21.9995 20.0049 21.9995H4.00488C3.4526 21.9995 3.00488 21.5517 3.00488 20.9995V8.99951C3.00488 8.44723 3.4526 7.99951 4.00488 7.99951H7.00488ZM7.00488 9.99951H5.00488V19.9995H19.0049V9.99951H17.0049V11.9995H15.0049V9.99951H9.00488V11.9995H7.00488V9.99951ZM9.00488 7.99951H15.0049V5.99951C15.0049 4.34266 13.6617 2.99951 12.0049 2.99951C10.348 2.99951 9.00488 4.34266 9.00488 5.99951V7.99951Z" />
    </Icon>
  );
}

export function IconLogin(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Login</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M8,10.6928545 C10.362615,10.6928545 12.4860225,11.7170237 13.9504747,13.3456144 C12.4860225,14.9758308 10.362615,16 8,16 C5.63738499,16 3.51397752,14.9758308 2.04952533,13.3472401 C3.51397752,11.7170237 5.63738499,10.6928545 8,10.6928545 Z"
          fill="currentColor"
        ></path>
        <path
          d="M8,3.5 C6.433,3.5 5.25,4.894 5.25,6.5 C5.25,8.106 6.433,9.5 8,9.5 C9.567,9.5 10.75,8.106 10.75,6.5 C10.75,4.894 9.567,3.5 8,3.5 Z"
          fill="currentColor"
          fillRule="nonzero"
        ></path>
      </g>
    </Icon>
  );
}

export function IconAccount(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Account</title>
      <path
        fillRule="evenodd"
        d="M9.9998 12.625c-1.9141 0-3.6628.698-5.0435 1.8611C3.895 13.2935 3.25 11.7221 3.25 10c0-3.728 3.022-6.75 6.75-6.75 3.7279 0 6.75 3.022 6.75 6.75 0 1.7222-.645 3.2937-1.7065 4.4863-1.3807-1.1632-3.1295-1.8613-5.0437-1.8613ZM10 18c-2.3556 0-4.4734-1.0181-5.9374-2.6382C2.7806 13.9431 2 12.0627 2 10c0-4.4183 3.5817-8 8-8s8 3.5817 8 8-3.5817 8-8 8Zm0-12.5c-1.567 0-2.75 1.394-2.75 3s1.183 3 2.75 3 2.75-1.394 2.75-3-1.183-3-2.75-3Z"
      />
    </Icon>
  );
}

export function IconHelp(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Help</title>
      <path d="M3.375 10a6.625 6.625 0 1 1 13.25 0 6.625 6.625 0 0 1-13.25 0ZM10 2.125a7.875 7.875 0 1 0 0 15.75 7.875 7.875 0 0 0 0-15.75Zm.699 10.507H9.236V14h1.463v-1.368ZM7.675 7.576A3.256 3.256 0 0 0 7.5 8.67h1.245c0-.496.105-.89.316-1.182.218-.299.553-.448 1.005-.448a1 1 0 0 1 .327.065c.124.044.24.113.35.208.108.095.2.223.272.383.08.154.12.34.12.558a1.3 1.3 0 0 1-.076.471c-.044.131-.11.252-.197.361-.08.102-.174.197-.283.285-.102.087-.212.182-.328.284a3.157 3.157 0 0 0-.382.383c-.102.124-.19.27-.262.438a2.476 2.476 0 0 0-.164.591 6.333 6.333 0 0 0-.043.81h1.179c0-.263.021-.485.065-.668a1.65 1.65 0 0 1 .207-.47c.088-.139.19-.263.306-.372.117-.11.244-.223.382-.34l.35-.306c.116-.11.218-.23.305-.361.095-.139.168-.3.219-.482.058-.19.087-.412.087-.667 0-.35-.062-.664-.186-.942a1.881 1.881 0 0 0-.513-.689 2.07 2.07 0 0 0-.753-.427A2.721 2.721 0 0 0 10.12 6c-.4 0-.764.066-1.092.197a2.36 2.36 0 0 0-.83.536c-.225.234-.4.515-.523.843Z" />
    </Icon>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Icon {...props}>
      <title>Search</title>
      <path d="M11.0888 4C15.0018 4 18.1776 7.17579 18.1776 11.0888C18.1776 15.0018 15.0018 18.1776 11.0888 18.1776C7.17579 18.1776 4 15.0018 4 11.0888C4 7.17579 7.17579 4 11.0888 4ZM11.0888 16.6023C14.135 16.6023 16.6023 14.135 16.6023 11.0888C16.6023 8.04259 14.135 5.57529 11.0888 5.57529C8.04259 5.57529 5.57529 8.04259 5.57529 11.0888C5.57529 14.135 8.04259 16.6023 11.0888 16.6023ZM17.7722 16.6583L20 18.8861L18.8861 20L16.6583 17.7722L17.7722 16.6583Z" />
    </Icon>
  );
}

export function IconCheck({
  stroke = "currentColor",
  ...props
}: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <title>Check</title>

      <path d="M18.5807 5.00003L8.70693 14.8738C8.5194 15.0613 8.26504 15.1667 7.99983 15.1667C7.73461 15.1667 7.48025 15.0613 7.29272 14.8738L2.41895 10L3.83316 8.58582L7.99983 12.7525L17.1665 3.58582L18.5807 5.00003Z" />
    </Icon>
  );
}

export function IconCheckCircle({
  stroke = "currentColor",
  ...props
}: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props}>
      <title>Check</title>
      <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM9.0026 14L16.0737 6.92893L14.6595 5.51472L9.0026 11.1716L6.17421 8.3431L4.75999 9.7574L9.0026 14Z" />
    </Icon>
  );
}

export function IconXMark({
  stroke = "currentColor",
  ...props
}: React.ComponentProps<typeof Icon>) {
  return (
    <Icon {...props} fill="transparent" stroke={stroke}>
      <title>Delete</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </Icon>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <Icon {...props} fill="transparent">
      <title>Play</title>
      <path d="M17.2335 11.1362C17.895 11.5221 17.895 12.4779 17.2335 12.8638L6.50387 19.1227C5.83721 19.5116 5 19.0308 5 18.259L5 5.74104C5 4.96925 5.83721 4.48838 6.50387 4.87726L17.2335 11.1362Z" />
    </Icon>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Icon {...props} fill="transparent">
      <title>ArrowUpRight</title>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 13L13 1" stroke="white" strokeWidth="1.35" />
        <path
          d="M1 0.999999L13 1L13 13"
          stroke="white"
          strokeWidth="1.35"
          strokeLinecap="square"
        />
      </svg>
    </Icon>
  );
}
