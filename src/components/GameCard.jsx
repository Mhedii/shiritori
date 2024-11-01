import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const GameCard = () => {
  const [p1history, setP1History] = useState([]);
  const [p2history, setP2History] = useState([]);
  const [activePlayer, setActivePlayer] = useState();
  const [defval, setDefVal] = useState();
  const [p1score, p1SetScore] = useState(0);
  const [p2score, p2SetScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data && data?.firstData) {
      setP1History((prev) => [...prev, data.firstData]);
      setActivePlayer("player2");
      setDefVal(data.firstData.at(-1));
      if (data.firstData.at(0) === defval) {
        p1SetScore((prev) => prev + 10);
      } else {
        p1SetScore((prev) => prev - 2);
      }
    } else if (data && data?.secondData) {
      if (data.secondData.at(0) === defval) {
        p2SetScore((prev) => prev + 10);
      } else {
        p2SetScore((prev) => prev - 2);
      }
      setP2History((prev) => [...prev, data.secondData]);
      setActivePlayer("player1");
      setDefVal(data.secondData.at(-1));
      reset({ secondData: null });
    }
    reset();
  };

  useEffect(() => {
    setTimeRemaining(10);
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activePlayer]);
  //   useEffect(() => {
  //     fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${activePlayer===}`)
  //       .then((res) => {
  //         console.log(res);
  //         // return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   }, [activePlayer]);
  return (
    <div className="grid grid-cols-12 gap-4 mt-[2rem]">
      {/* Left Side */}

      <div
        className={`col-start-3  col-span-4 border ${
          activePlayer === "player1"
            ? "border-blue-600 shadow-md shadow-blue-500 border-2"
            : "border-white"
        }  h-[400px] w-full rounded-md`}
      >
        <div className="flex justify-between px-2">
          <div>
            <p className="text-lg font-medium">Guest 1</p>
            <p>Score: {p1score}</p>
          </div>
          <p>{activePlayer === "player1" ? timeRemaining : null}</p>
        </div>
        <hr className="my-2" />
        <div className="m-2 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="w-full p-2 text-black  rounded-md"
              id="firstInput"
              defaultValue={activePlayer === "player1" ? defval : null}
              {...register("firstData")}
            />

            {errors.exampleRequired && <span>This field is required</span>}
          </form>
        </div>
        <div className="px-2  ">
          History
          <div className="overflow-y-scroll h-[250px] mt-2">
            {p1history.reverse().map((history) => (
              <>
                <ul className="my-2 border border-current rounded-md">
                  <li className="px-2 py-1 break-words">{history}</li>
                </ul>
              </>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div
        className={`col-start-7  col-span-4 border ${
          activePlayer === "player2"
            ? "border-blue-600 shadow-md shadow-blue-500 border-2"
            : "border-white"
        } h-[400px] w-full rounded-md`}
      >
        <div className="flex justify-between px-2">
          <div>
            <p className="text-lg font-medium">Guest 2</p>
            <p>Score: {p2score}</p>
          </div>
          <p>{activePlayer === "player2" ? timeRemaining : null}</p>
        </div>
        <hr className="my-2" />
        <div className="m-2 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="w-full p-2 text-black  rounded-md"
              id="secondInput"
              defaultValue={activePlayer === "player2" ? defval : null}
              {...register("secondData")}
            />

            {errors.exampleRequired && <span>This field is required</span>}
          </form>
        </div>
        <div className="px-2  ">
          History
          <div className="overflow-y-scroll h-[250px] mt-2">
            {p2history.reverse().map((history) => (
              <>
                <ul className="my-2 border border-current rounded-md">
                  <li className="px-2 py-1 break-words">{history}</li>
                </ul>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
