import { Icon } from "@chakra-ui/react"
import { BsList } from "react-icons/bs"
import { MobileHamburgerMenu } from "./MobileHamburgerMenu"
import { BrowserHamburgerMenu } from "./BrowserHamburgerMenu"
import { useIsMobile } from "../../../utils/functions"

// label: url
export const menuItems: { [key: string]: string } = {
  TOP: "/",
  サークル検索: "/clubs",
  //  お知らせ:       "",
  //  履歴:           "",
  お気に入り: "/users/favs",
  //  通知:           "",
  //  プロフィール:   "",
  //  設定:           "",
}

export const HamburgerIcon: React.VFC<{}> = () => {
  return <Icon as={BsList} boxSize="2em" color="text.title.main" />
}

export const HamburgerMenu: React.VFC<{}> = () => {
  // TODO: 独自BreakPoint化
  const isMobile = useIsMobile()

  return (
    <>
      {isMobile && <MobileHamburgerMenu />}
      {!isMobile && <BrowserHamburgerMenu />}
    </>
  )
}
