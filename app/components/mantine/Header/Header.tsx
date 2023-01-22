import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Text,
  Burger,
  Drawer,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { NavLink } from "@remix-run/react"
import { IconChevronDown } from "@tabler/icons"
import { HyperLink } from "~/components/atoms/Link"
//import { theme } from "~/theme"

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  header: {
    borderBottom: `2px solid ${theme.colors.yellow[5]} !important`,
  },
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}))

interface HeaderActionProps {
  button: boolean
  links: {
    link: string
    label: string
    links?: { link: string; label: string }[]
  }[]
}

export function HeaderMenu({ links, button }: HeaderActionProps) {
  const { classes } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)

  const activeStyle = {
    textDecoration: "underline",
    fontWeight: "bold",
  }

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ))

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <NavLink
              to={link.link}
              className={classes.link}
              style={({ isActive }) => (isActive ? activeStyle : {})}
              // onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </NavLink>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    if (opened) {
      return (
        <NavLink
          key={link.label}
          to={link.link}
          style={({ isActive }) => (isActive ? activeStyle : {})}
          className={classes.link}
          onClick={toggle}
        >
          {link.label}
        </NavLink>
      )
    }
    return (
      <NavLink
        key={link.label}
        to={link.link}
        style={({ isActive }) => (isActive ? activeStyle : {})}
        className={classes.link}
      >
        {link.label}
      </NavLink>
    )
  })

  return (
    <Header
      className={classes.header}
      height={HEADER_HEIGHT}
      sx={{ borderBottom: 0 }}
      mb={120}
    >
      <Container className={classes.inner} fluid>
        <Group>
          <Text>
            <HyperLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <>
                <img
                  src="/crown.svg"
                  width={32}
                  style={{ marginRight: "12px" }}
                />
                {"Game of Nodes"}
              </>
            </HyperLink>
          </Text>
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Group spacing={16} className={classes.links}>
          {items}
        </Group>
        {opened && (
          <Drawer opened={opened} onClose={toggle} size={"100%"} padding="lg">
            <div style={{ width: "100%" }}>{items}</div>
          </Drawer>
        )}
      </Container>
    </Header>
  )
}
