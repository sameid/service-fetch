import { getServices } from "service-fetch" ;
import MyUserService from "./MyUserService.mjs";
const { UserService } = getServices();

let main = async () => {
	let { response, error } = await UserService.login();
	console.log(response, error);
}

main();