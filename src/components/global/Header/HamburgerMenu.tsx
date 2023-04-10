import { Icon } from "@chakra-ui/react"
import { BsList } from "react-icons/bs"

import { useMobileMediaQuery } from "../../../hooks/useMobileQuery"
import { BrowserHamburgerMenu } from "./BrowserHamburgerMenu"
import { MobileHamburgerMenu } from "./MobileHamburgerMenu"

// label: url
// TODO: ここの形式を変更する
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

export const HamburgerIcon: React.FC<{}> = () => {
  return <Icon as={BsList} boxSize="2em" color="text.title.main" />
}

export const HamburgerMenu: React.FC<{}> = () => {
  // TODO: 独自BreakPoint化
  const isMobile = useMobileMediaQuery()

  return <>{isMobile ? <MobileHamburgerMenu /> : <BrowserHamburgerMenu />}</>
}
