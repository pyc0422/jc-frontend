import bigLogo from '../assets/Vector.png';
import Button from '../Utilities/Button';
import Google from '../Components/Google';
// type eventType = {
//   target: HTMLElement,
//   preventDefault: () => void,
// }
function HomePage() {

  // const buttonOnclick=(e:eventType) => {
  //   e.preventDefault();
  //   console.log("button clicked!", e.target.innerHTML)
  // }

  return (
    <div className="relative top-30 p-5 mx-auto">
      <div className="flex flex-col justify-center">
        <img className="logo" src={bigLogo} alt="logo"/>

        <a href="/signup">
          <Button type="dark" class="w-full" text="Sign Up"/>
        </a>

        <Button type="light" class="" text="Log in"/>
      </div>
      <Google />

    </div>

  )
}

export default HomePage;