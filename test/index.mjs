import { getServices } from "react-kichiri";
import MyUserService from "./MyUserService.mjs";
const { UserService } = getServices();

let main = async () => {

	// setAuthToken("my-special-token");

	let content = "Default";

	let { response, error } = await UserService.login();


}

main();


// demandhub.test.device@gmail.com
// !_DemandHub2020

// "react-native-sound": "0.11.2",
