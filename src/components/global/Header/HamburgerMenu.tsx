import { Icon, useMediaQuery } from "@chakra-ui/react"
import { BsList } from "react-icons/bs"
import { MobileHamburgerMenu } from "./MobileHamburgerMenu"
import { BrowserHamburgerMenu } from "./BrowserHamburgerMenu"

// label: url
export const menuItems: { [key: string]: string } = {
  TOP: "/",
  サークル検索: "/clubs",
  //  お知らせ:       "",
  //  履歴:           "",
  お気に入り: "",
  //  通知:           "",
  //  プロフィール:   "",
  //  設定:           "",
  編集者用ページ: "",
}

export const HamburgerIcon: React.VFC<{}> = () => {
  return <Icon as={BsList} boxSize="2em" color="text.title.main" />
}

export const HamburgerMenu: React.VFC<{}> = () => {
  // TODO: 独自BreakPoint化
  const [isMobile] = useMediaQuery("(max-width: 500px)")

  return (
    <>
      {isMobile && <MobileHamburgerMenu />}
      {!isMobile && <BrowserHamburgerMenu />}
    </>
  )
}
