import { Button, VStack } from "@chakra-ui/react"
import axios from "axios"

export const Test: React.VFC<{}> = (props) => {
  const postClub = () => {
    const data = {
      name: "club2",
      description: "desc1",
      short_description: "desc2",
      campus: 0,
      club_type: 0,
      visible: true,
      contents: [
        { content: "content1" },
        { content: "content2" },
        { content: "content3" },
      ],
      links: [{ label: "email", url: "kash@hytus.net" }],
      schedules: [{ month: 12, schedule: "hai" }],
      achievements: [],
      activity_details: [
        {
          time_id: 100,
          time: "19:00~",
          date: "Mon",
          time_remark: "naidesu",
          place_id: 255,
          place: "dokka1",
          place_remark: "nai",
        },
        {
          time_id: 1010,
          time: "19:10~",
          date: "Mon",
          time_remark: "naidesu",
          place_id: 2515,
          place: "dokka2",
        },
      ],
    }
    axios
      .post("/api/v1/clubs", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const postUser = () => {
    const data = {
      email: "c0119304bd@edu.teu.ac.jp",
      name: "caffeine TUT",
    }
    axios
      .post("/api/v1/users", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <VStack>
      <Button onClick={postClub}>new club POST</Button>
      <Button onClick={postUser}>new user POST</Button>
    </VStack>
  )
}