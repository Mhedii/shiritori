import "./App.css";
import GameCard from "./components/GameCard";

function App() {
  return (
    <>
      <div className="mx-[10rem] ">
        <p className="text-5xl font-semibold mt-[3rem]">Shiritori Game</p>
        <GameCard />
      </div>
    </>
  );
}

export default App;
