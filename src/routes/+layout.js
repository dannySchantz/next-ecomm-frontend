export const ssr = false;
import { isLoggedIn, loggedIn} from '../utils/auth';
export async function load() {
    await isLoggedIn()
}

