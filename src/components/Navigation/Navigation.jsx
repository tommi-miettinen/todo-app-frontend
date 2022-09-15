import reactLogo from "../../assets/react.png";
import angularLogo from "../../assets/angular.png";
import vueLogo from "../../assets/vue.png";

const Navigation = () => {
  return (
    <div className="bg-base-100 rounded-xl mx-auto p-2 flex justify-evenly mt-4">
      <a
        className="rounded-lg flex justify-center items-center btn-square btn-ghost"
        href="https://rest-back.herokuapp.com/vue"
      >
        <img style={{ height: 30 }} src={vueLogo} />
      </a>
      <a
        className="flex justify-center items-center rounded-lg btn-square btn-ghost mx-1"
        href="https://rest-back.herokuapp.com/angular"
      >
        <img style={{ height: 44 }} src={angularLogo} />
      </a>
      <a
        className="rounded-lg flex justify-center items-center btn-square bg-slate-700"
        href="https://rest-back.herokuapp.com/react"
      >
        <img className="m-auto" style={{ height: 30 }} src={reactLogo} />
      </a>
    </div>
  );
};

export default Navigation;
