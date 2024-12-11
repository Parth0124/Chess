import { useNavigate } from "react-router-dom";
import chessboard from '/chessboard.jpeg'
import { Button } from "../components/Button";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img
              src={chessboard}
              alt="Chess Board"
              className="max-w-96"
            />
          </div>
          <div className="pt-16">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold text-white">
                Play chess online on the #1 Site!
              </h1>
            </div>
            <div className="mt-4 flex justify-center">
              <Button onClick={() => {
                navigate('/game')
              }}>
                Play Online
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;