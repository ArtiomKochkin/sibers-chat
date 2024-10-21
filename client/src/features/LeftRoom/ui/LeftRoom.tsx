import { useNavigate } from "react-router-dom";
import { socket } from "@shared/api";
import { IParams } from "@shared/types";
import { Button } from "@shared/ui";

interface Props {
  params: IParams
}

export const LeftRoom = ({ params }: Props) => {
  const navigate = useNavigate();

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  return (
    <Button 
      onClick={leftRoom}
    >
      Left the room
    </Button>
  )
}